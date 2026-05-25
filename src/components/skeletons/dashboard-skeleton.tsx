import { fade, parentVariants } from "@blaze-motion/motion";
import { motion } from "motion/react";

const skeletonCard = "rounded-2xl bg-card animate-pulse";

interface SkeletonCard {
	id: string;
	className: string;
}

const gridCards: SkeletonCard[] = [
	{ id: "a", className: "h-28 col-span-1" },
	{ id: "b", className: "h-28 col-span-1" },
	{ id: "c", className: "h-28 col-span-1" },
	{ id: "d", className: "h-48 col-span-2" },
	{ id: "e", className: "h-48 col-span-1" },
	{ id: "f", className: "h-36 col-span-1" },
	{ id: "g", className: "h-36 col-span-2" },
];

const sidebarItems = ["s1", "s2", "s3", "s4"];

export function DashboardSkeleton() {
	return (
		<motion.div
			variants={parentVariants({
				delayChildren: 0.05,
				startDelay: 0.1,
			})}
			initial="initial"
			animate="animate"
			className="flex gap-6 h-full"
		>
			<aside className="w-60 shrink-0 flex flex-col gap-3 pt-2">
				<div className="flex items-center gap-3 px-4 py-3">
					<div className="size-8 rounded-lg bg-card animate-pulse" />
				</div>
				<div className="flex flex-col gap-1 px-3">
					{sidebarItems.map((id, i) => (
						<motion.div
							key={id}
							variants={fade({ direction: "left", distance: 20 })}
							className="flex items-center gap-3 px-3 py-2.5"
						>
							<div className="size-5 rounded bg-card animate-pulse" />
							<div
								className="h-3 bg-card animate-pulse rounded"
								style={{ width: `${60 + i * 15}px` }}
							/>
						</motion.div>
					))}
				</div>
			</aside>

			<div className="flex-1 flex flex-col gap-6">
				<div className="flex items-center justify-between">
					<div className="h-7 w-44 rounded-lg bg-card animate-pulse" />
					<div className="h-9 w-56 rounded-lg bg-card animate-pulse" />
				</div>

				<div className="grid grid-cols-3 gap-4">
					{gridCards.map((card, i) => (
						<motion.div
							key={card.id}
							variants={fade({ direction: "up", distance: 20 })}
							className={`${skeletonCard} ${card.className}`}
							style={{ animationDelay: `${i * 0.1}s` }}
						/>
					))}
				</div>
			</div>
		</motion.div>
	);
}
