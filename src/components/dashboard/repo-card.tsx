import { Icon } from "@iconify/react";
import { timeAgo } from "#/lib/utils";
import type { Repo } from "./repo-list";

// Mapa de colores para los lenguajes más comunes
const langColors: Record<string, string> = {
	TypeScript: "bg-secondary",
	Rust: "bg-accent",
	Python: "bg-primary",
	Go: "bg-success",
	JavaScript: "bg-yellow-500",
	HTML: "bg-orange-500",
	CSS: "bg-blue-500",
};

interface RepoCardProps {
	repo: Repo;
	selected: boolean;
	onSelect: () => void;
}

export function RepoCard({ repo, selected, onSelect }: RepoCardProps) {
	return (
		<button
			type="button"
			onClick={onSelect}
			className={`group relative text-left rounded-2xl bg-card border p-5 transition-all duration-300 cursor-pointer ${
				selected
					? "border-primary/50 shadow-[0_0_30px_-8px_#f67a7e50]"
					: "border-border hover:border-primary/30 hover:shadow-[0_0_25px_-10px_#f67a7e30]"
			}`}
		>
			<div className="flex items-start justify-between mb-3">
				<div className="flex items-center gap-2 min-w-0">
					<Icon
						icon={repo.isPrivate ? "lucide:lock" : "lucide:globe"}
						className={`size-3.5 shrink-0 ${
							repo.isPrivate ? "text-muted" : "text-success"
						}`}
					/>
					<h3 className="text-sm font-semibold text-foreground truncate font-plus-jakarta-sans">
						{repo.name}
					</h3>
				</div>
				<Icon
					icon="lucide:external-link"
					className="size-3.5 text-muted opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0"
				/>
			</div>

			{repo.description && (
				<p className="text-xs text-muted leading-relaxed mb-3 line-clamp-2">
					{repo.description}
				</p>
			)}

			<div className="flex items-center gap-3 text-xs text-muted">
				{repo.language && (
					<div className="flex items-center gap-1.5">
						<span
							className={`size-2 rounded-full ${
								langColors[repo.language] ?? "bg-muted"
							}`}
						/>
						<span className="font-medium">{repo.language}</span>
					</div>
				)}
				<div className="flex items-center gap-1">
					<Icon icon="lucide:star" className="size-3" />
					<span>{repo.stargazers_count ?? 0}</span>
				</div>
				<div className="flex items-center gap-1">
					<Icon icon="lucide:git-fork" className="size-3" />
					<span>{repo.forks_count ?? 0}</span>
				</div>
				<span className="ml-auto">{timeAgo(repo.updated_at)}</span>
			</div>
		</button>
	);
}
