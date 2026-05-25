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
	loggingOut: boolean;
	logout: () => Promise<void>;
	checkUserStatus: (currentUser: User) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [hasAudited, setHasAudited] = useState(false);
	const [loading, setLoading] = useState(true);
	const [loggingOut, setLoggingOut] = useState(false);

	const logout = useCallback(async () => {
		setLoggingOut(true);
		try {
			await supabase.auth.signOut();
			setUser(null);
			setHasAudited(false);

			const { queryClient } = await import("#/utils/query");
			await queryClient.clear();
			window.location.replace("/");
		} catch (err) {
			console.error("Error al cerrar sesión:", err);
		} finally {
			setLoggingOut(false);
		}
	}, []);

	const checkUserStatus = useCallback(async (currentUser: User) => {
		try {
			const { data: profile, error } = await supabase
				.from("profiles")
				.select("has_audited, github_connected_at")
				.eq("id", currentUser.id)
				.single();

			if (error || !profile) {
				setHasAudited(false);
				return;
			}

			if (!profile.github_connected_at) {
				setHasAudited(profile.has_audited);
				return;
			}

			const connectedAt = new Date(profile.github_connected_at).getTime();
			const now = Date.now();
			const fiveDaysInMs = 5 * 24 * 60 * 60 * 1000;

			if (now - connectedAt > fiveDaysInMs) {
				await supabase.auth.signOut();
				setHasAudited(false);
			} else {
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
		supabase.auth
			.getSession()
			.then(async ({ data: { session: currentSession } }) => {
				const currentUser = currentSession?.user ?? null;
				setUser(currentUser);

				if (currentUser) {
					await checkUserStatus(currentUser);
				} else {
					setLoading(false);
				}
			});

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange(async (_event, currentSession) => {
			const currentUser = currentSession?.user ?? null;
			setUser(currentUser);

			if (currentUser) {
				await checkUserStatus(currentUser);
			} else {
				setHasAudited(false);
				setLoading(false);
			}
		});

		const handleMessage = (event: MessageEvent) => {
			if (event.data?.type === "auth-callback-complete") {
				supabase.auth.getSession().then(({ data: { session } }) => {
					if (session?.user) {
						setUser(session.user);
						checkUserStatus(session.user);
					}
				});
			}
		};

		window.addEventListener("message", handleMessage);

		return () => {
			subscription.unsubscribe();
			window.removeEventListener("message", handleMessage);
		};
	}, [checkUserStatus]);

	const value = useMemo(
		() => ({
			user,
			hasAudited,
			loading,
			loggingOut,
			logout,
			checkUserStatus,
		}),
		[user, hasAudited, loading, loggingOut, logout, checkUserStatus],
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
