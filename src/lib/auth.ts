export async function loginWithGitHub() {
	const { getSupabaseClient } = await import("#/utils/supabase");
	const { data } = await getSupabaseClient().auth.signInWithOAuth({
		provider: "github",
		options: {
			scopes: "repo",
			redirectTo: `${window.location.origin}/api/auth/callback`,
		},
	});
	if (data?.url) {
		window.open(data.url, "_blank", "width=600,height=700");
	}
}
