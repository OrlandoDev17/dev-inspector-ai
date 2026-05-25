import type { User } from "@supabase/supabase-js";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { supabase } from "#/utils/supabase";

interface AuthContextType {
  user: User | null;
  hasAudited: boolean;
  loading: boolean;
  logout: () => Promise<void>;
  checkUserStatus: (currentUser: User) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [hasAudited, setHasAudited] = useState(false);
  const [loading, setLoading] = useState(true);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  const checkUserStatus = useCallback(async (currentUser: User) => {
    try {
      // 1. Consultamos el perfil real en la base de datos
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("has_audited, github_connected_at")
        .eq("id", currentUser.id)
        .single();

      if (error || !profile) {
        setHasAudited(false);
        return;
      }

      // 2. Control de los 5 días de expiración
      const connectedAt = new Date(profile.github_connected_at).getTime();
      const now = new Date().getTime();
      const fiveDaysInMs = 5 * 24 * 60 * 60 * 1000;

      if (now - connectedAt > fiveDaysInMs) {
        console.warn("Conexión de GitHub expirada (más de 5 días).");
        await supabase.auth.signOut();
        setHasAudited(false);
      } else {
        // Si la sesión sigue vigente, asignamos el estado real de sus auditorías
        setHasAudited(profile.has_audited);
      }
    } catch (err) {
      console.error("Error verificando perfil:", err);
      setHasAudited(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // 1. Revisar la sesión inicial al cargar la aplicación
    supabase.auth
      .getSession()
      .then(async ({ data: { session: currentSession } }) => {
        const currentUser = currentSession?.user ?? null;
        setUser(currentUser);

        if (currentUser) {
          // Si hay un usuario, disparamos la verificación de la DB
          await checkUserStatus(currentUser);
        } else {
          setLoading(false);
        }
      });

    // 2. Escuchar cambios de estado en tiempo real (Logins, Logouts, etc.)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, currentSession) => {
      const currentUser = currentSession?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        // Cada vez que el usuario se loguea o refresca token, verificamos la DB
        await checkUserStatus(currentUser);
      } else {
        setHasAudited(false);
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [checkUserStatus]); // Pasamos la función como dependencia segura gracias al useCallbac

  const value = useMemo(
    () => ({ user, hasAudited, loading, logout, checkUserStatus }),
    [user, hasAudited, loading, logout, checkUserStatus],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
