import type { CookieOptions } from "@supabase/ssr";
import {
	createServerClient,
	parseCookieHeader,
	serializeCookieHeader,
} from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey =
	import.meta.env.VITE_SUPABASE_ANON_KEY ?? import.meta.env.VITE_SUPABASE_KEY;

// Para el cliente (Navegador) — lazy para evitar crash al importar en server
let _supabaseClient: ReturnType<typeof createClient> | null = null;
export function getSupabaseClient() {
	if (!_supabaseClient) {
		_supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
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
