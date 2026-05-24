import {
	fade,
	Marquee,
	parentVariants,
	TextAnimate,
} from "@blaze-motion/motion";
import { Icon } from "@iconify/react";
import { motion } from "motion/react";
import { GlowButton } from "#/components/ui/glow-button";
import { features } from "#/data/hero";
import { loginWithGitHub } from "#/lib/auth";

export function Hero() {
	return (
		<section className="relative min-h-dvh">
			<div className="absolute inset-0 flex items-center justify-center -z-10">
				<div className="size-128 rounded-full bg-primary/20 blur-3xl opacity-50" />
			</div>
			<motion.div
				variants={parentVariants({ delayChildren: 0.2, startDelay: 2.5 })}
				initial="initial"
				animate="animate"
				className="flex flex-col items-center justify-center gap-8 max-w-7xl mx-auto w-full min-h-dvh"
			>
				<TextAnimate
					as="h1"
					text="Audita tu código y tu UX/UI en un solo pipeline"
					type="typeWriter"
					by="letter"
					cursor
					highlight={["código", "UX/UI"]}
					highlightClassName="text-primary"
					className="font-extrabold text-6xl text-center max-w-xl"
				/>
				<motion.p
					variants={fade({
						direction: "up",
						ease: "backOut",
						excludeDelay: true,
						blur: 10,
					})}
					className="text-muted text-center max-w-xl"
				>
					Conecta tu repositorio de GitHub y deja que nuestro inspector
					inteligente analice la calidad de tu código y renderice tu interfaz en
					tiempo real. Detecta errores de Clean Code y desbordamientos visuales
					antes de que lleguen a produccion.
				</motion.p>
				<motion.div
					variants={fade({
						direction: "up",
						ease: "backOut",
						excludeDelay: true,
						blur: 10,
					})}
				>
					<GlowButton color="primary" onClick={loginWithGitHub} target="_blank">
						<Icon icon="simple-icons:github" className="size-5" />
						Conectar con GitHub
					</GlowButton>
				</motion.div>
			</motion.div>
			<footer className="absolute bottom-2 2xl:bottom-16 left-0 w-full overflow-hidden">
				<Marquee className="bg-card">
					{features.map(({ name, icon, color }) => (
						<div className="flex items-center gap-2 mx-6" key={name}>
							<Icon icon={icon} className={`${color} size-3 2xl:size-4`} />
							<span className="text-xs 2xl:text-base text-muted font-medium font-jetbrains-mono whitespace-nowrap">
								{name}
							</span>
						</div>
					))}
				</Marquee>
			</footer>
		</section>
	);
}
