# AGENTS.md — Reglas para el Asistente de Código (DevInspector AI)

## Jerarquía de Referencia

1. **DESIGN.md** — Reglas de diseño inquebrantables (colores, tipografía, redondeado)
2. **SPEC.md** — Especificación técnica del producto (rutas, stack, requerimientos)
3. **AGENTS.md** — Este archivo: convenciones operativas para el asistente

Siempre que recibas una solicitud y no tengas contexto, revisa DESIGN.md y SPEC.md primero antes de generar código.

---

## Package Manager

- Usa **bun** para todo: `bun install`, `bun run dev`, `bun run build`, `bunx <comando>`
- **Nunca uses `npm`**. Si ves `npm`, sugiere o migra a `bun`.
- Alternativa secundaria: `pnpm` (solo si bun no está disponible).

## Animaciones

- Usa **exclusivamente** `@blaze-motion/motion` para animaciones.
- **No uses `motion con initial y animate, solo usalo para las etiquetas <motion.div>`** (framer-motion/motion).
- Componentes blaze-motion: `Marquee`, `TextAnimate`, presets como `fade` o `parentVariants`.

## Estilos y UI

- **Tailwind CSS v4** con `@theme` en `styles.css` para tokens.
- Usa las variables CSS personalizadas: `bg-background`, `bg-card`, `text-foreground`, `text-muted`, `border-border`, `text-primary`, `text-success`.
- Íconos: **lucide-react**.

## Testing

- `bun run test` — Vitest.
- `bun run lint` — Biome lint.
- `bun run check` — Biome check completo.
- `bun run format` — Biome format.

## TypeScript

- Strict mode. `noUnusedLocals` y `noUnusedParameters` activos.
- Path aliases: `#/` y `@/` → `./src/`.
- `verbatimModuleSyntax: true` — usa `import type` para importaciones de tipos.

## Estructura de Rutas (TanStack Router)

```
src/routes/
  __root.tsx           # Layout raíz
  index.tsx            # Landing page
  dashboard.tsx        # Panel de gestión
  proyecto/
    $repoId/
      index.tsx        # Detalle repositorio + agente
      reporte.tsx      # Centro de reportes
```

- Server Functions en `src/server/` con `createServerFn`.
- `routeTree.gen.ts` es auto-generado — no editar manualmente.
