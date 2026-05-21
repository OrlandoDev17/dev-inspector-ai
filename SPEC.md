# SPEC.md — Especificación Técnica y de Producto (DevInspector AI)

> Basado en el Documento Global de Especificación Técnica y de Producto V2 — Mayo 2026

---

## 1. Definición del Producto

DevInspector AI es una plataforma SaaS de automatización de auditorías de software que evalúa dos capas críticas de cualquier producto digital web:

- **Capa interna**: robustez del código fuente (Clean Code, TypeScript, arquitectura)
- **Capa externa**: comportamiento visual/UX/UI y accesibilidad mediante auditoría interactiva

Introduce el concepto de **análisis agentico guiado**: un agente virtual interactivo acompaña al usuario durante el ciclo de vida del repositorio con feedback contextualizado y simulaciones en tiempo real.

---

## 2. Stack Tecnológico

| Capa                  | Tecnología               | Propósito                                                                     |
| --------------------- | ------------------------ | ----------------------------------------------------------------------------- |
| Framework Base        | TanStack Start + Router  | Proyecto único. Server Functions seguras, tipos compartidos extremo a extremo |
| Motor de Estilos      | Tailwind CSS v4          | Diseño atómico con variables CSS dinámicas                                    |
| Animaciones           | Blaze Motion             | Transiciones en cascada, flujos vectoriales, tooltips interactivos            |
| Base de Datos / Auth  | Supabase                 | GitHub OAuth, PostgreSQL, historial JSONB                                     |
| Automatización Visual | Puppeteer Headless       | Capturas de alta resolución (Desktop/Mobile) para IA de visión                |
| Lenguaje              | TypeScript (strict mode) | Tipado estricto extremo a extremo                                             |
| Package Manager       | bun                      | Preferido sobre pnpm o npm                                                    |
| Linter/Formatter      | Biome                    | Configuración en `biome.json`                                                 |
| Testing               | Vitest + Testing Library | Pruebas unitarias y de componentes                                            |

---

### 3.1 `/` — Introducción e Impacto

Landing page con modo oscuro, marquees de métricas y código. Botón primario de login con GitHub. Simulación interactiva de desglose sintáctico pre-autenticación.

### 3.2 `/dashboard` — Panel de Gestión

Grilla de repositorios activos del usuario (GitHub REST API) + historial de análisis (Supabase). Transiciones en cascada (stagger) para tarjetas.

### 3.3 `/proyecto/$repoId` — Detalle de Repositorio y Agente

Contiene el **Mini Agente Interactivo** con expresiones dinámicas:

- **Idle**: observa con animaciones sutiles en bucle
- **Activo**: reproduce video inmersivo de escaneo de redes neurales
- **Completado**: ramas vectoriales interactivas (verdes = correcto, índigo = fallas Clean Code)

Gatillos: "Revisar Código" y "Auditar UI".

### 3.4 `/proyecto/$repoId/reporte` — Centro de Reportes

Panel asimétrico: score global (Geist Mono) en lateral izquierdo, mapa de nodos/ramas expandibles en el centro. Pestaña UI: captura real con pines interactivos parpadeantes.

---

## 3. Server Functions

Todas corren estrictamente en servidor (TanStack Start):

| Función                  | Método | Propósito                                                                                        |
| ------------------------ | ------ | ------------------------------------------------------------------------------------------------ |
| `githubAuthSession`      | POST   | Intercambia código temporal por Token de Acceso GitHub, almacena cifrado en Supabase             |
| `getRepositories`        | GET    | Consume API GitHub, retorna listado para dashboard                                               |
| `triggerAgentInspection` | POST   | Descarga árbol en RAM, ejecuta Puppeteer, envía contexto vía MCP a IA, guarda en `audit_reports` |

---

## 4. Requerimientos Funcionales

| ID    | Descripción                                                              |
| ----- | ------------------------------------------------------------------------ |
| RF-01 | Autenticación solo mediante GitHub OAuth2                                |
| RF-02 | Listar en tiempo real repos públicos y privados del usuario              |
| RF-03 | Agente digital con transiciones Idle, Activo, Completado                 |
| RF-04 | Motor de inspección genera nodos de fallos/aciertos expandibles          |
| RF-05 | Captura de pantallas headless + mapeo de coordenadas para pines visuales |

---

## 5. Requerimientos No Funcionales

| ID     | Descripción                                                     | Estándar           |
| ------ | --------------------------------------------------------------- | ------------------ |
| RNF-01 | Código fuente solo en RAM volátil, jamás persistido en disco/DB | Seguridad estricta |
| RNF-02 | Carga inicial UI < 200ms en transiciones TanStack Router        | Rendimiento        |
| RNF-03 | Tokens de acceso cifrados AES-256 en Supabase                   | Seguridad          |
| RNF-04 | Animaciones a 60 FPS estables con Blaze Motion                  | Fluidez visual     |

---

## 6. Sistema de Diseño (Ver DESIGN.md)

Colores: `#0B0F19`, `#141B2D`, `#6366F1`, `#10B981`, `#222F4D`, `#F8FAFC`, `#94A3B8`
Tipografía: Inter (general/headings), Geist Mono (código/rutas/números)
Redondeado: 16px (`rounded-2xl`) estándar, 8-12px mínimo, 9999px máximo

---

## 7. Convenciones de Código

- **TypeScript estricto**: `strict: true`, `noUnusedLocals`, `noUnusedParameters`
- **Imports**: path alias `#/*` y `@/*` mapean a `./src/*`
- **Animaciones**: exclusivamente `@blaze-motion/motion`
- **Estilos**: Tailwind CSS v4 con clases utilitarias y variables CSS `--color-*`
