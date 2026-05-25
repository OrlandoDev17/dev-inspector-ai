import { createFileRoute } from "@tanstack/react-router";
import { createSupabaseServerClient } from "#/utils/supabase-server";

export const Route = createFileRoute("/api/github/repos")({
	server: {
		handlers: {
			GET: async ({ request }) => {
				// Inicializar el cliente SSR y capturar responseHeaders (necesario para
				// que si getSession() refresca el token internamente, las nuevas cookies
				// lleguen al navegador).
				const { client, responseHeaders } = createSupabaseServerClient(request);

				// Recuperar la sesión desde las cookies de la request
				const {
					data: { session },
					error: sessionError,
				} = await client.auth.getSession();

				if (sessionError || !session || !session.provider_token) {
					return new Response(
						JSON.stringify({
							error: "Sesión no encontrada o expirada en GitHub",
						}),
						{
							status: 401,
							headers: { "Content-Type": "application/json" },
						},
					);
				}

				try {
					// 3. Petición directa a la API de GitHub
					const githubResponse = await fetch(
						"https://api.github.com/user/repos?per_page=50&sort=updated",
						{
							headers: {
								Authorization: `Bearer ${session.provider_token}`,
								Accept: "application/vnd.github+json",
								"User-Agent": "DevInspectorAI",
							},
						},
					);

					if (!githubResponse.ok) {
						return new Response(
							JSON.stringify({ error: "GitHub rechazó el acceso" }),
							{
								status: githubResponse.status,
								headers: { "Content-Type": "application/json" },
							},
						);
					}

					const data = (await githubResponse.json()) as Array<
						Record<string, unknown>
					>;

					// 4. Mapear los datos limpios para tu interfaz
					const filteredRepos = data.map((repo) => ({
						id: repo.id,
						name: repo.name,
						fullName: repo.full_name,
						isPrivate: repo.private,
						description: repo.description || "",
						language: repo.language || null,
						stargazers_count: repo.stargazers_count || 0,
						forks_count: repo.forks_count || 0,
						updated_at: repo.updated_at,
						html_url: repo.html_url,
					}));

					return new Response(JSON.stringify(filteredRepos), {
						status: 200,
						headers: {
							"Content-Type": "application/json",
							// Reenviar cookies por si el token se refrescó internamente
							...Object.fromEntries(responseHeaders.entries()),
						},
					});
				} catch (_err) {
					return new Response(
						JSON.stringify({ error: "Error interno al conectar con GitHub" }),
						{
							status: 500,
							headers: { "Content-Type": "application/json" },
						},
					);
				}
			},
		},
	},
});
