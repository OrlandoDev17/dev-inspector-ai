import { Icon } from "@iconify/react";
import { Link } from "@tanstack/react-router";
import { GlowButton } from "#/components/ui/glow-button";
import { useAuth } from "#/context/AuthContext";
import { loginWithGitHub } from "#/lib/auth";

export function Header() {
	const { user, loading, logout } = useAuth();

	interface NavItem {
		id: string;
		label: string;
		href: string;
	}

	const navItems: NavItem[] = [
		{
			id: "home",
			label: "Inicio",
			href: "/",
		},
		{
			id: "dashboard",
			label: "Dashboard",
			href: "/dashboard",
		},
		{
			id: "ux-audit",
			label: "UX Audit",
			href: "/ux-audit",
		},
	];

	return (
		<header className="fixed top-0 left-0 w-full border-b border-border bg-background/80 backdrop-blur-xl z-50">
			<div className="flex items-center justify-between max-w-7xl mx-auto w-full h-14 px-6">
				<div>
					<Link
						to="/"
						className="text-xl font-bold font-plus-jakarta-sans bg-linear-to-r from-primary to-secondary text-transparent bg-clip-text"
					>
						DevInspector AI
					</Link>
				</div>
				<nav>
					<ul className="flex items-center gap-2">
						{navItems.map(({ id, label, href }) => (
							<li key={id}>
								<Link
									className="relative px-4 py-2 text-muted font-medium rounded-lg transition-all duration-300 hover:text-foreground hover:bg-card/60 after:absolute after:bottom-1 after:left-4 after:right-4 after:h-[2px] after:rounded-full after:bg-primary after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
									to={href}
									activeProps={{
										className: "text-foreground bg-card/60 after:scale-x-100",
									}}
									inactiveProps={{}}
								>
									{label}
								</Link>
							</li>
						))}
					</ul>
				</nav>
				<aside className="flex items-center gap-3">
					{loading ? (
						<div className="size-8 rounded-full bg-card animate-pulse" />
					) : user ? (
						<div className="flex items-center gap-3">
							<div className="flex items-center gap-2">
								<img
									src={user.user_metadata.avatar_url}
									alt={user.user_metadata.user_name}
									className="size-8 rounded-full border border-border"
								/>
								<span className="text-sm font-medium text-foreground hidden sm:inline">
									{user.user_metadata.user_name}
								</span>
							</div>
							<button
								type="button"
								onClick={logout}
								className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-muted hover:text-foreground hover:bg-card/60 rounded-lg transition-all duration-300"
							>
								<Icon icon="lucide:log-out" className="size-3.5" />
								Salir
							</button>
						</div>
					) : (
						<GlowButton color="primary" onClick={loginWithGitHub}>
							<Icon icon="simple-icons:github" className="size-4" />
							Iniciar con GitHub
						</GlowButton>
					)}
				</aside>
			</div>
		</header>
	);
}
