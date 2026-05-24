export async function loginWithGitHub() {
	const { getSupabaseClient } = await import("#/utils/supabase-server");
	const { data } = await getSupabaseClient().auth.signInWithOAuth({
		provider: "github",
		options: {
			scopes: "repo",
			redirectTo: `${window.location.origin}/api/auth/callback`,
		},
	});
	if (data?.url) {
		window.location.href = data.url;
	}
}
