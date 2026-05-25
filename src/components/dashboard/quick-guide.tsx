import { fade, parentVariants } from "@blaze-motion/motion";
import { Icon } from "@iconify/react";
import { motion } from "motion/react";
import { GlowButton } from "#/components/ui/glow-button";

const steps = [
	{
		number: 1,
		title: "Conecta tu repositorio",
		description:
			"Vincula tu cuenta de GitHub y selecciona cualquier repositorio público o privado para analizar.",
		icon: "lucide:github",
		color: "text-primary",
		bg: "bg-primary/10",
	},
	{
		number: 2,
		title: "Ejecuta una auditoría",
		description:
			"Nuestro agente inteligente analiza tu código fuente y captura tu interfaz en tiempo real.",
		icon: "lucide:play-circle",
		color: "text-secondary",
		bg: "bg-secondary/10",
	},
	{
		number: 3,
		title: "Revisa los reportes",
		description:
			"Obtén un score detallado con nodos expandibles de aciertos y fallos en Clean Code y UX.",
		icon: "lucide:file-text",
		color: "text-accent",
		bg: "bg-accent/10",
	},
	{
		number: 4,
		title: "Mejora tu calidad",
		description:
			"Sigue las recomendaciones generadas por IA para llevar tu código y diseño al siguiente nivel.",
		icon: "lucide:trending-up",
		color: "text-success",
		bg: "bg-success/10",
	},
];

const features = [
	{
		title: "Análisis de Código",
		icon: "lucide:code-2",
		desc: "Detección automática de malas prácticas, code smells y violaciones de Clean Code en tu código TypeScript.",
	},
	{
		title: "Auditoría Visual",
		icon: "lucide:monitor-smartphone",
		desc: "Capturas headless con pines interactivos que detectan desbordamientos, errores de layout y fallos de accesibilidad.",
	},
	{
		title: "Score Automatizado",
		icon: "lucide:award",
		desc: "Puntuación numérica en tiempo real con desglose por categorías: calidad de código, UX, rendimiento y accesibilidad.",
	},
	{
		title: "Reportes Detallados",
		icon: "lucide:bar-chart-3",
		desc: "Panel asimétrico con mapa de nodos expandibles y ramas vectoriales interactivas para cada auditoría.",
	},
];

export function QuickGuide() {
	return (
		<motion.div
			variants={parentVariants({ delayChildren: 0.08 })}
			initial="initial"
			animate="animate"
			className="flex flex-col gap-8"
		>
			<motion.div
				variants={fade({ direction: "down", distance: 30, blur: 10 })}
			>
				<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-4">
					<Icon icon="lucide:sparkles" className="size-3.5" />
					Primeros pasos
				</div>
				<h1 className="text-3xl font-extrabold font-plus-jakarta-sans text-foreground">
					Bienvenido a DevInspector AI
				</h1>
				<p className="text-muted mt-2 max-w-2xl">
					Descubre todo lo que puedes hacer para auditar y mejorar la calidad de
					tu código y experiencia de usuario en un solo lugar.
				</p>
			</motion.div>

			<motion.div
				variants={fade({ direction: "up", distance: 30, blur: 10 })}
				className="grid grid-cols-2 gap-4"
			>
				{steps.map((step) => (
					<div
						key={step.number}
						className="group relative rounded-2xl bg-card border border-border p-6 hover:border-primary/30 hover:shadow-[0_0_30px_-8px_#f67a7e40] transition-all duration-300"
					>
						<div className="flex items-start gap-4">
							<div
								className={`flex items-center justify-center size-12 rounded-xl ${step.bg} shrink-0 group-hover:scale-110 transition-transform duration-300`}
							>
								<Icon icon={step.icon} className={`size-6 ${step.color}`} />
							</div>
							<div className="flex-1 min-w-0">
								<div className="flex items-center gap-2 mb-1">
									<span className="text-xs font-bold font-jetbrains-mono text-muted">
										PASO {step.number}
									</span>
								</div>
								<h3 className="text-base font-semibold text-foreground mb-1">
									{step.title}
								</h3>
								<p className="text-sm text-muted leading-relaxed">
									{step.description}
								</p>
							</div>
						</div>
						<div
							className={`absolute top-0 left-0 w-1 h-full rounded-l-2xl ${step.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
						/>
					</div>
				))}
			</motion.div>

			<motion.div variants={fade({ direction: "up", distance: 30, blur: 10 })}>
				<div className="rounded-2xl bg-card border border-border p-6">
					<h2 className="text-xl font-bold font-plus-jakarta-sans text-foreground mb-4">
						¿Qué puedes hacer?
					</h2>
					<div className="grid grid-cols-4 gap-4">
						{features.map((feat) => (
							<div
								key={feat.title}
								className="rounded-xl bg-background/50 p-4 hover:bg-card/80 transition-all duration-300 hover:shadow-[0_0_20px_-8px_#7024eb40]"
							>
								<Icon icon={feat.icon} className="size-8 text-primary mb-3" />
								<h3 className="text-sm font-semibold text-foreground mb-1">
									{feat.title}
								</h3>
								<p className="text-xs text-muted leading-relaxed">
									{feat.desc}
								</p>
							</div>
						))}
					</div>
				</div>
			</motion.div>

			<motion.div
				variants={fade({ direction: "up", distance: 20, blur: 5 })}
				className="flex items-center justify-center gap-4 pb-8"
			>
				<GlowButton color="primary">
					<Icon icon="lucide:github" className="size-4" />
					Conectar mi primer repositorio
				</GlowButton>
			</motion.div>
		</motion.div>
	);
}
