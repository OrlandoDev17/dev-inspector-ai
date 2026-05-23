import {
  parentVariants,
  TextAnimate,
  fade,
  Marquee,
} from "@blaze-motion/motion";
import { Icon } from "@iconify/react";
import { GlowButton } from "#/components/ui/glow-button";
import { motion } from "motion/react";

export function Hero() {
  const features = [
    {
      name: "UX/UI Audit",
      icon: "lucide:eye",
      color: "text-primary",
    },
    {
      name: "Code Audit",
      icon: "lucide:code",
      color: "text-secondary",
    },
    {
      name: "Agentic AI Insights",
      icon: "lucide:bot",
      color: "text-accent",
    },
    {
      name: "Responsive Validation",
      icon: "lucide:smartphone",
      color: "text-green-500",
    },
    {
      name: "Automated Code Review",
      icon: "lucide:git-pull-request",
      color: "text-yellow-500",
    },
    {
      name: "Performance Score",
      icon: "lucide:activity",
      color: "text-red-500",
    },
  ];

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
        <motion.button
          className="flex items-center justify-center"
          variants={fade({
            direction: "up",
            ease: "backOut",
            excludeDelay: true,
            blur: 10,
          })}
        >
          <GlowButton href="/" color="primary">
            Conectar con GitHub{" "}
            <Icon icon="simple-icons:github" className="size-6" />
          </GlowButton>
        </motion.button>
      </motion.div>
      <footer className="absolute bottom-16 left-0 w-full overflow-hidden">
        <Marquee className="bg-card">
          {features.map(({ name, icon, color }) => (
            <div className="flex items-center gap-2 mx-6" key={name}>
              <Icon icon={icon} className={`${color} size-4`} />
              <span className="text-muted font-medium font-jetbrains-mono whitespace-nowrap">
                {name}
              </span>
            </div>
          ))}
        </Marquee>
      </footer>
    </section>
  );
}
