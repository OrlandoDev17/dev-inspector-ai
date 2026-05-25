// Cliente de Supabase para el navegador. Usa createBrowserClient de @supabase/ssr
// para leer/escribir la sesión desde cookies (donde la deja el callback OAuth).
// Si usáramos createClient de @supabase/supabase-js buscaría en localStorage
// y nunca encontraría la sesión.
import { createBrowserClient } from "@supabase/ssr";

export const supabase = createBrowserClient(
	import.meta.env.VITE_SUPABASE_URL,
	import.meta.env.VITE_SUPABASE_ANON_KEY ?? import.meta.env.VITE_SUPABASE_KEY,
);
