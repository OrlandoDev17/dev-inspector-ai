import { fade } from "@blaze-motion/motion";
import { Icon } from "@iconify/react";
import { motion } from "motion/react";
import { GlowButton } from "#/components/ui/glow-button";
import { timeAgo } from "#/lib/utils";
import type { Repo } from "./repo-list";

interface RepoDetailProps {
	repo: Repo;
	onClose: () => void;
}

export function RepoDetail({ repo, onClose }: RepoDetailProps) {
	return (
		<motion.div
			variants={fade({ direction: "up", distance: 20, blur: 5 })}
			initial="initial"
			animate="animate"
			className="rounded-2xl bg-card border border-border p-6"
		>
			<div className="flex items-start justify-between mb-4">
				<div className="flex items-center gap-3">
					<div className="flex items-center gap-2">
						<Icon
							icon={repo.isPrivate ? "lucide:lock" : "lucide:globe"}
							className={`size-4 ${
								repo.isPrivate ? "text-muted" : "text-success"
							}`}
						/>
						<h2 className="text-xl font-bold font-plus-jakarta-sans text-foreground">
							{repo.name}
						</h2>
					</div>
					{repo.html_url && (
						<a
							href={repo.html_url}
							target="_blank"
							rel="noreferrer"
							className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium text-muted hover:text-foreground hover:bg-card/80 transition-all duration-200"
						>
							<Icon icon="lucide:external-link" className="size-3" />
							GitHub
						</a>
					)}
				</div>
				<button
					type="button"
					onClick={onClose}
					className="flex items-center justify-center size-8 rounded-lg text-muted hover:text-foreground hover:bg-background/50 transition-all duration-200 cursor-pointer"
				>
					<Icon icon="lucide:x" className="size-4" />
				</button>
			</div>

			{repo.description && (
				<p className="text-sm text-muted mb-4 max-w-2xl">{repo.description}</p>
			)}

			<div className="flex flex-wrap items-center gap-4 mb-6">
				<div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background/50">
					<Icon icon="lucide:star" className="size-4 text-muted" />
					<span className="text-sm font-medium text-foreground">
						{repo.stargazers_count ?? 0}
					</span>
					<span className="text-xs text-muted">estrellas</span>
				</div>
				<div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background/50">
					<Icon icon="lucide:git-fork" className="size-4 text-muted" />
					<span className="text-sm font-medium text-foreground">
						{repo.forks_count ?? 0}
					</span>
					<span className="text-xs text-muted">forks</span>
				</div>
				{repo.language && (
					<div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background/50">
						<span className="size-2.5 rounded-full bg-secondary" />
						<span className="text-sm font-medium text-foreground">
							{repo.language}
						</span>
					</div>
				)}
				<div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background/50">
					<Icon icon="lucide:clock" className="size-4 text-muted" />
					<span className="text-xs text-muted">
						Actualizado {timeAgo(repo.updated_at)}
					</span>
				</div>
			</div>

			<div className="flex items-center gap-3">
				<GlowButton color="primary">
					<Icon icon="lucide:play" className="size-4" />
					Auditar Código
				</GlowButton>
				<GlowButton color="secondary">
					<Icon icon="lucide:eye" className="size-4" />
					Auditar UX
				</GlowButton>
				<button
					type="button"
					className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-muted border border-border hover:text-foreground hover:border-primary/30 hover:bg-card/80 transition-all duration-200 active:scale-[0.97] cursor-pointer"
				>
					<Icon icon="lucide:file-text" className="size-4" />
					Ver Reportes
				</button>
			</div>
		</motion.div>
	);
}
