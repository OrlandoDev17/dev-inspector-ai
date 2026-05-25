export async function loginWithGitHub() {
	const { getSupabaseClient } = await import("#/utils/supabase-server");

	// Redirección directa en la misma ventana para máxima estabilidad de cookies
	await getSupabaseClient().auth.signInWithOAuth({
		provider: "github",
		options: {
			scopes: "repo read:user",
			redirectTo: `${window.location.origin}/auth/callback`,
		},
	});
}
