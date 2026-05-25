import { createSupabaseServerClient } from "./supabase-server";

export async function verifyGitHubConnection(request: Request) {
	const { client } = createSupabaseServerClient(request);

	// 1. Obtener la sesion activa de Supabase Auth
	const {
		data: { session },
	} = await client.auth.getSession();
	if (!session) return { isValid: false, reason: "no_session" };

	// 2. Consultar el perfil del usuario en la base de datos
	const { data: profile, error } = await client
		.from("profiles")
		.select("github_connected_at, has_audited")
		.eq("id", session.user.id)
		.single();

	if (error || !profile) return { isValid: false, reason: "profile_not_found" };

	// 3. Logica matematica para que el usuario permanezca logueado por 5 dias mientras este activo
	const connectedAt = new Date(profile.github_connected_at).getTime();
	const now = Date.now();
	const fiveDaysInMs = 5 * 24 * 60 * 60 * 1000;

	if (now - connectedAt > fiveDaysInMs) {
		// Si pasaron mas de 5 dias, devolvemos que ya no es valido para forzar re-login
		return {
			isValid: false,
			reason: "connection_expired",
			hasAudited: profile.has_audited,
		};
	}

	// Si todo esta en orden devolvemos el estado actual de el usuario
	return { isValid: true, hasAudited: profile.has_audited, session };
}
