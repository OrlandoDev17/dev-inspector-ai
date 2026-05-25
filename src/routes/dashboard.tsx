import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Sidebar } from "#/components/dashboard/sidebar";
import { DashboardSkeleton } from "#/components/skeletons/dashboard-skeleton";
import { useAuth } from "#/context/AuthContext";

export const Route = createFileRoute("/dashboard")({
	component: RouteComponent,
});

function RouteComponent() {
	const { loading, user } = useAuth();

	if (loading) {
		return (
			<div className="flex min-h-dvh pt-14">
				<div className="w-60 shrink-0 border-r border-border bg-card" />
				<main className="flex-1 p-6 overflow-auto">
					<DashboardSkeleton />
				</main>
			</div>
		);
	}

	if (!user) {
		return (
			<div className="flex min-h-dvh pt-14 items-center justify-center">
				<p className="text-muted">Inicia sesión para acceder al dashboard.</p>
			</div>
		);
	}

	return (
		<div className="flex min-h-dvh pt-14">
			<Sidebar />
			<main className="flex-1 p-6 overflow-auto">
				<Outlet />
			</main>
		</div>
	);
}
