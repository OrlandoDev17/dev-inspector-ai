import { createFileRoute } from "@tanstack/react-router";
import { createSupabaseServerClient } from "#/utils/supabase-server";

export const Route = createFileRoute("/auth/callback")({
	server: {
		handlers: {
			GET: async ({ request }) => {
				const url = new URL(request.url);
				const code = url.searchParams.get("code");

				// Si no hay código de autorización de GitHub, redirigimos al Home directamente
				if (!code) {
					return new Response(null, {
						status: 303,
						headers: { Location: "/" },
					});
				}

				// Inicializamos el cliente de Supabase del servidor usando la request nativa
				const { client, responseHeaders } = createSupabaseServerClient(request);

				try {
					// 1. Intercambiamos síncronamente el código por la sesión real en el servidor
					// Esto inyectará automáticamente las cookies de sesión en 'responseHeaders'
					await client.auth.exchangeCodeForSession(code);

					// 2. Redirección HTTP nativa hacia el Home ("/")
					// Adjuntamos las cabeceras de respuesta que contienen las nuevas Set-Cookie de Supabase
					responseHeaders.set("Location", "/");

					return new Response(null, {
						status: 303, // Status standard para redirecciones tras solicitudes exitosas
						headers: responseHeaders,
					});
				} catch (error) {
					console.error("Error crítico en el backend de auth.callback:", error);

					// En caso de fallo, limpiamos y mandamos al Home igualmente para no dejar la pantalla rota
					return new Response(null, {
						status: 303,
						headers: { Location: "/" },
					});
				}
			},
		},
	},
	component: () => null,
});
