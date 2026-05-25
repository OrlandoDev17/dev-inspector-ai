import { fade } from "@blaze-motion/motion";
import { Icon } from "@iconify/react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";

export const Route = createFileRoute("/dashboard/")({
	component: DashboardHome,
});

const quickActions = [
	{
		to: "/dashboard/repositorios",
		icon: "lucide:folder-git-2",
		label: "Mis Repositorios",
		desc: "Explora y selecciona repositorios para auditar",
		color: "text-primary",
		bg: "bg-primary/10",
	},
	{
		to: "/dashboard/primeros-pasos",
		icon: "lucide:book-open",
		label: "Guía Rápida",
		desc: "Aprende cómo funciona DevInspector paso a paso",
		color: "text-secondary",
		bg: "bg-secondary/10",
	},
];

const stats = [
	{ icon: "lucide:github", label: "Repositorios conectados", value: "—" },
	{ icon: "lucide:search-check", label: "Auditorías realizadas", value: "—" },
	{ icon: "lucide:star", label: "Score promedio", value: "—" },
];

function DashboardHome() {
	return (
		<div className="flex flex-col gap-6">
			<motion.div
				variants={fade({ direction: "down", distance: 20, blur: 5 })}
				initial="initial"
				animate="animate"
			>
				<h1 className="text-2xl font-extrabold font-plus-jakarta-sans text-foreground">
					Dashboard
				</h1>
				<p className="text-sm text-muted mt-1">
					Resumen de tu actividad y accesos rápidos.
				</p>
			</motion.div>

			{/* Métricas rápidas */}
			<motion.div
				variants={fade({ direction: "up", distance: 20, blur: 5 })}
				initial="initial"
				animate="animate"
				className="grid grid-cols-3 gap-4"
			>
				{stats.map((stat) => (
					<div
						key={stat.label}
						className="rounded-2xl bg-card border border-border p-5"
					>
						<Icon icon={stat.icon} className="size-8 text-muted mb-3" />
						<p className="text-2xl font-bold font-plus-jakarta-sans text-foreground">
							{stat.value}
						</p>
						<p className="text-xs text-muted mt-1">{stat.label}</p>
					</div>
				))}
			</motion.div>

			{/* Accesos directos */}
			<motion.div
				variants={fade({ direction: "up", distance: 20, blur: 5 })}
				initial="initial"
				animate="animate"
				className="grid grid-cols-2 gap-4"
			>
				{quickActions.map((action) => (
					<Link
						key={action.to}
						to={action.to}
						className="group rounded-2xl bg-card border border-border p-6 hover:border-primary/30 hover:shadow-[0_0_30px_-8px_#f67a7e40] transition-all duration-300"
					>
						<div
							className={`flex items-center justify-center size-12 rounded-xl ${action.bg} mb-4 group-hover:scale-110 transition-transform duration-300`}
						>
							<Icon icon={action.icon} className={`size-6 ${action.color}`} />
						</div>
						<h3 className="text-base font-semibold text-foreground mb-1">
							{action.label}
						</h3>
						<p className="text-sm text-muted">{action.desc}</p>
					</Link>
				))}
			</motion.div>
		</div>
	);
}
