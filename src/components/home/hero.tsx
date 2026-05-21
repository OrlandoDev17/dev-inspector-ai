import { parentVariants, TextAnimate, fade } from "@blaze-motion/motion";
import { Icon } from "@iconify/react";
import { GlowButton } from "#/components/ui/glow-button";
import { motion } from "motion/react";

export function Hero() {
  return (
    <motion.section
      variants={parentVariants({ delayChildren: 0.2, startDelay: 2.5 })}
      initial="initial"
      animate="animate"
      className="flex flex-col items-center justify-center gap-4 max-w-7xl mx-auto w-full min-h-dvh"
    >
      <div className="flex flex-col gap-8">
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
      </div>
    </motion.section>
  );
}
