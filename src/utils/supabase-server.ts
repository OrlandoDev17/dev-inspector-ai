import type { CookieOptions } from "@supabase/ssr";
import {
	createBrowserClient,
	createServerClient,
	parseCookieHeader,
	serializeCookieHeader,
} from "@supabase/ssr";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey =
	import.meta.env.VITE_SUPABASE_ANON_KEY ?? import.meta.env.VITE_SUPABASE_KEY;

// Lazy singleton para el navegador (usado por loginWithGitHub).
// Usa createBrowserClient para que el PKCE code verifier se almacene en cookies
// (consistente con el callback que usa createServerClient).
let _supabaseClient: ReturnType<typeof createBrowserClient> | null = null;
export function getSupabaseClient() {
	if (!_supabaseClient) {
		_supabaseClient = createBrowserClient(supabaseUrl, supabaseAnonKey);
	}
	return _supabaseClient;
}

// Para el servidor (Server Functions de TanStack)
export function createSupabaseServerClient(request: Request) {
	const responseHeaders = new Headers();

	const client = createServerClient(supabaseUrl, supabaseAnonKey, {
		cookies: {
			getAll() {
				return parseCookieHeader(request.headers.get("Cookie") ?? "").map(
					({ name, value }) => ({ name, value: value ?? "" }),
				);
			},
			setAll(
				cookiesToSet: { name: string; value: string; options: CookieOptions }[],
			) {
				for (const { name, value, options } of cookiesToSet) {
					responseHeaders.append(
						"Set-Cookie",
						serializeCookieHeader(name, value, options),
					);
				}
			},
		},
	});

	return { client, responseHeaders };
}
