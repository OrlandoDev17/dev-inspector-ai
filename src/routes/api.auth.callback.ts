import { createFileRoute } from "@tanstack/react-router";
import { createSupabaseServerClient } from "#/utils/supabase";

export const Route = createFileRoute("/api/auth/callback")({
	server: {
		handlers: {
			GET: async ({ request }) => {
				const requestUrl = new URL(request.url);
				const code = requestUrl.searchParams.get("code");
				const next = requestUrl.searchParams.get("next") ?? "/";

				if (code) {
					const { client, responseHeaders } =
						createSupabaseServerClient(request);

					const { error } = await client.auth.exchangeCodeForSession(code);

					if (!error) {
						return new Response(null, {
							status: 302,
							headers: {
								...Object.fromEntries(responseHeaders.entries()),
								Location: next,
							},
						});
					}
				}

				return new Response(null, {
					status: 302,
					headers: { Location: "/" },
				});
			},
		},
	},
});
