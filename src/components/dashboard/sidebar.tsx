import { Icon } from "@iconify/react";
import { Link, useLocation } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "#/context/AuthContext";

export type SectionId = "home" | "repos" | "guide";

// Mapa de cada ruta del dashboard con su id de sección para saber cuál resaltar
const pathToSection: Record<string, SectionId> = {
	"/dashboard": "home",
	"/dashboard/": "home",
	"/dashboard/repositorios": "repos",
	"/dashboard/primeros-pasos": "guide",
};

interface NavItem {
	id: SectionId;
	label: string;
	icon: string;
	to: string;
}

const navItems: NavItem[] = [
	{
		id: "home",
		label: "Dashboard",
		icon: "lucide:layout-dashboard",
		to: "/dashboard",
	},
	{
		id: "repos",
		label: "Repositorios",
		icon: "lucide:folder-git-2",
		to: "/dashboard/repositorios",
	},
	{
		id: "guide",
		label: "Guía Rápida",
		icon: "lucide:book-open",
		to: "/dashboard/primeros-pasos",
	},
];

export function Sidebar() {
	const [collapsed, setCollapsed] = useState(false);
	const { user } = useAuth();
	const location = useLocation();

	// Determinar la sección activa según la ruta actual
	const activeSection = pathToSection[location.pathname] ?? "home";

	return (
		<aside
			className={`flex flex-col border-r border-border bg-card transition-all duration-300 shrink-0 ${
				collapsed ? "w-16" : "w-60"
			}`}
		>
			<div className="flex items-center h-14 px-3 border-b border-border">
				<button
					type="button"
					onClick={() => setCollapsed(!collapsed)}
					className="flex items-center justify-center size-8 rounded-lg text-muted hover:text-foreground hover:bg-card/80 transition-all duration-200 cursor-pointer"
				>
					<Icon
						icon={collapsed ? "lucide:chevron-right" : "lucide:chevron-left"}
						className="size-4"
					/>
				</button>
				{!collapsed && (
					<span className="ml-2 text-sm font-semibold font-plus-jakarta-sans text-foreground truncate">
						DevInspector
					</span>
				)}
			</div>

			<nav className="flex-1 flex flex-col gap-1 p-3">
				{navItems.map((item) => {
					const isActive = activeSection === item.id;

					return (
						<Link
							key={item.id}
							to={item.to}
							className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
								isActive
									? "bg-primary/10 text-primary"
									: "text-muted hover:text-foreground hover:bg-card/80"
							}`}
						>
							<Icon icon={item.icon} className="size-5 shrink-0" />
							{!collapsed && <span className="truncate">{item.label}</span>}
						</Link>
					);
				})}
			</nav>

			{user && (
				<div className="border-t border-border p-3">
					<div className="flex items-center gap-3 px-1">
						<img
							src={user.user_metadata.avatar_url}
							alt={user.user_metadata.user_name}
							className="size-8 rounded-full border border-border shrink-0"
						/>
						{!collapsed && (
							<div className="flex flex-col min-w-0">
								<span className="text-sm font-medium text-foreground truncate">
									{user.user_metadata.user_name}
								</span>
								<span className="text-xs text-muted truncate">
									{user.email ?? ""}
								</span>
							</div>
						)}
					</div>
				</div>
			)}
		</aside>
	);
}
