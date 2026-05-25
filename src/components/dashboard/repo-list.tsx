import { fade, parentVariants } from "@blaze-motion/motion";
import { Icon } from "@iconify/react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { RepoCard } from "./repo-card";
import { RepoDetail } from "./repo-detail";

// Interfaz tipada del repositorio que devuelve nuestro backend
export interface Repo {
	id: number;
	name: string;
	fullName: string;
	isPrivate: boolean;
	description: string | null;
	language: string | null;
	stargazers_count?: number;
	forks_count?: number;
	updated_at?: string;
	html_url?: string;
}

type FilterType = "all" | "public" | "private";

export function RepoList() {
	const [search, setSearch] = useState("");
	const [filter, setFilter] = useState<FilterType>("all");
	const [selectedRepo, setSelectedRepo] = useState<Repo | null>(null);

	// Obtener repositorios desde el proxy de GitHub
	const {
		data: serverRepos = [],
		isLoading,
		error,
	} = useQuery<Repo[]>({
		queryKey: ["github-repositories"],
		queryFn: async () => {
			const res = await fetch(`${window.location.origin}/api/github/repos`, {
				method: "GET",
				credentials: "include",
				headers: {
					Accept: "application/json",
				},
			});

			if (!res.ok) throw new Error("Error cargando los repositorios");
			return res.json();
		},
		staleTime: 1000 * 60 * 5,
	});

	// Filtrar por texto y tipo (público/privado)
	const filtered = useMemo(() => {
		return serverRepos.filter((repo) => {
			const matchSearch =
				repo.name.toLowerCase().includes(search.toLowerCase()) ||
				(repo.description ?? "").toLowerCase().includes(search.toLowerCase());
			const matchFilter =
				filter === "all" ||
				(filter === "public" && !repo.isPrivate) ||
				(filter === "private" && repo.isPrivate);
			return matchSearch && matchFilter;
		});
	}, [serverRepos, search, filter]);

	const filters: { key: FilterType; label: string }[] = [
		{ key: "all", label: "Todos" },
		{ key: "public", label: "Públicos" },
		{ key: "private", label: "Privados" },
	];

	const totalStars = useMemo(
		() => serverRepos.reduce((s, r) => s + (r.stargazers_count ?? 0), 0),
		[serverRepos],
	);
	const languages = useMemo(
		() => [...new Set(serverRepos.map((r) => r.language).filter(Boolean))],
		[serverRepos],
	);

	if (isLoading) {
		return (
			<div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
				<div className="w-10 h-10 border-4 border-t-primary border-border/40 rounded-full animate-spin" />
				<p className="text-sm font-mono text-muted animate-pulse">
					Sincronizando repositorios desde GitHub...
				</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex flex-col items-center justify-center min-h-[350px] max-w-md mx-auto text-center p-6 border border-red-900/30 bg-red-950/10 rounded-2xl">
				<Icon
					icon="lucide:alert-circle"
					className="size-10 text-primary mb-3"
				/>
				<h3 className="text-sm font-semibold text-foreground font-plus-jakarta-sans">
					Sesión de GitHub desincronizada
				</h3>
				<p className="text-xs text-muted mt-2 leading-relaxed">
					No pudimos leer tus repositorios. Esto ocurre habitualmente cuando
					caduca la ventana de sesión de 5 días. Por favor, refresca la página o
					re-conecta tu cuenta.
				</p>
				<button
					type="button"
					onClick={() => window.location.reload()}
					className="mt-4 px-4 py-2 bg-foreground text-background text-xs font-bold rounded-xl hover:bg-foreground/90 transition-all cursor-pointer"
				>
					Reintentar Sincronización
				</button>
			</div>
		);
	}

	return (
		<motion.div
			variants={parentVariants({ delayChildren: 0.06 })}
			initial="initial"
			animate="animate"
			className="flex flex-col gap-6"
		>
			<motion.div
				variants={fade({ direction: "down", distance: 20, blur: 5 })}
				className="flex items-center justify-between"
			>
				<div>
					<h1 className="text-2xl font-extrabold font-plus-jakarta-sans text-foreground">
						Mis Repositorios
					</h1>
					<p className="text-sm text-muted mt-1 font-plus-jakarta-sans">
						{serverRepos.length} repositorios &middot; {totalStars} estrellas
						&middot; {languages.length} lenguajes
					</p>
				</div>
				<div className="relative">
					<Icon
						icon="lucide:search"
						className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted"
					/>
					<input
						type="text"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						placeholder="Buscar repositorio..."
						className="w-64 pl-9 pr-3 py-2 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:border-secondary/50 focus:shadow-[0_0_15px_-5px_#1b71e9] transition-all duration-300 font-mono"
					/>
				</div>
			</motion.div>

			<motion.div
				variants={fade({ direction: "up", distance: 15, blur: 3 })}
				className="flex items-center gap-2"
			>
				{filters.map(({ key, label }) => (
					<button
						key={key}
						type="button"
						onClick={() => setFilter(key)}
						className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 font-plus-jakarta-sans cursor-pointer ${
							filter === key
								? "bg-primary/10 text-primary border border-primary/20"
								: "text-muted border border-border hover:text-foreground hover:bg-card/80"
						}`}
					>
						{label}
					</button>
				))}
				{search && (
					<span className="text-xs text-muted ml-2 font-mono">
						{filtered.length} resultados
					</span>
				)}
			</motion.div>

			<motion.div
				variants={fade({ direction: "up", distance: 20, blur: 5 })}
				className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
			>
				{filtered.map((repo) => (
					<RepoCard
						key={repo.id}
						repo={repo}
						selected={selectedRepo?.id === repo.id}
						onSelect={() =>
							setSelectedRepo(selectedRepo?.id === repo.id ? null : repo)
						}
					/>
				))}
				{filtered.length === 0 && (
					<div className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col items-center justify-center py-16 text-center">
						<Icon
							icon="lucide:search-x"
							className="size-12 text-muted/30 mb-4"
						/>
						<p className="text-muted font-medium font-plus-jakarta-sans">
							No se encontraron repositorios
						</p>
						<p className="text-xs text-muted/60 mt-1 font-plus-jakarta-sans">
							Intenta con otros términos de búsqueda o filtros
						</p>
					</div>
				)}
			</motion.div>

			{selectedRepo && (
				<RepoDetail repo={selectedRepo} onClose={() => setSelectedRepo(null)} />
			)}
		</motion.div>
	);
}
