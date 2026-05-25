// Devuelve un texto relativo ("Hace 5min", "Hace 2d", etc.)
// usado en los componentes del dashboard.
export function timeAgo(dateStr?: string): string {
	if (!dateStr) return "---";
	const now = Date.now();
	const date = new Date(dateStr).getTime();
	const diff = now - date;
	const minutes = Math.floor(diff / 60000);
	const hours = Math.floor(diff / 3600000);
	const days = Math.floor(diff / 86400000);

	if (minutes < 1) return "Ahora";
	if (minutes < 60) return `Hace ${minutes}min`;
	if (hours < 24) return `Hace ${hours}h`;
	if (days < 30) return `Hace ${days}d`;
	return new Date(dateStr).toLocaleDateString("es-ES", {
		day: "numeric",
		month: "short",
	});
}
