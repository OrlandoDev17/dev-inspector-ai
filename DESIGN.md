# DESIGN.md — Reglas de Diseño Estrictas (DevInspector AI)

Este documento contiene las reglas de diseño inquebrantables para el desarrollo de la interfaz. Todo componente en Figma, Stitch o Tailwind CSS debe cumplir estrictamente con estas especificaciones para mantener la coherencia visual.

---

## 1. Paleta de Colores (Deep Midnight-KuCoin)

Los colores se aplican con una jerarquía estricta para mantener el enfoque de una herramienta de ingeniería de software ultra premium, limpia y madura.

### 1. Fondo Principal (Base de la App)
* **Hexadecimal:** `#04101A`
* **Variante sutil:** `#091C2D`
* **Tokens Tailwind:** `bg-background` / `bg-background-subtle`
* **Uso:** El lienzo oscuro profundo con tinte verde-azulado. La variante sutil se usa para tarjetas o elementos destacados.

### 2. Superficies y Contenedores (Capas Secundarias)
* **Hexadecimal:** `#0A2033`
* **Borde:** `#153A5A`
* **Tokens Tailwind:** `bg-card` / `border-card-border`
* **Uso:** Estructuras que contienen información directa. Se aplica en las tarjetas de repositorios de GitHub, el panel del reporte de la IA, modales de confirmación y menús flotantes.

### 3. Acento Principal (Esmeralda — "El Foco" de la IA)
* **Hexadecimal:** `#10B981` (Verde Esmeralda)
* **Foreground:** `#FFFFFF`
* **Tokens Tailwind:** `text-primary` / `bg-primary` / `text-primary-foreground`
* **Uso:** **Reservado exclusivamente para elementos de alta jerarquía.** Botones de acción principal (ej: "Analizar Proyecto"), el puntaje numérico del reporte final, bordes de elementos en estado activo o seleccionado, y los pines interactivos de UX/UI sobre la captura de pantalla.

### 4. Estado de Éxito / Clean Code (Cian Eléctrico)
* **Hexadecimal:** `#06B6D4` (Cian Eléctrico)
* **Foreground:** `#FFFFFF`
* **Tokens Tailwind:** `text-success` / `bg-success` / `text-success-foreground`
* **Uso:** Indicadores visuales de código correcto, ramas óptimas en el árbol de carga, badges de validación, confirmaciones exitosas de TypeScript y elementos secundarios importantes.

### 5. Bordes y Separadores (Líneas Estructurales Milimétricas)
* **Hexadecimal:** `#153A5A`
* **Token Tailwind:** `border-border`
* **Uso:** Separadores de tablas de archivos, contornos de inputs y divisiones sutiles entre paneles de código para mantener el orden sintáctico.

### 6. Textos (Lectura y Jerarquía Cognitiva)
* **Texto Principal (Blanco Puro):** `#FFFFFF` (`text-foreground`) -> Para títulos principales, código fuente y texto de alto contraste.
* **Texto Muted (Slate Gray):** `#94A3B8` (`text-muted`) -> Para descripciones secundarias, fechas de commits, subtítulos y metadatos.

---

## 2. Sistema Tipográfico

Distribución de fuentes basada en la función del texto. Solo usamos dos familias: **Inter** y **Geist Mono** (eliminando fuentes redondeadas o monoespaciadas en bloques largos).

### Headings (Títulos Principales e Importantes)
* **Fuente:** **Inter**
* **Peso:** `font-bold` (700) o `font-extrabold` (800)
* **Modificadores:** `tracking-tight` (Letras compactas para dar peso estructural e imponente).
* **Uso:** Títulos de vistas, nombres de las secciones del dashboard y títulos de las tarjetas de reportes.

### Párrafos Grandes y Textos de Lectura (Sugerencias e Informes de la IA)
* **Fuente:** **Inter**
* **Peso:** `font-normal` (400) o `font-medium` (500)
* **Modificadores:** `leading-relaxed` (Espaciado de línea generoso para evitar la fatiga al leer informes largos).
* **Uso:** Explicaciones semánticas, recomendaciones de Clean Code detalladas y respuestas narrativas generadas por el modelo de IA.

### Código y Resaltados Especiales (Estética Técnica de Ingeniería)
* **Fuente:** **Geist Mono**
* **Peso:** `font-normal` (400) o `font-semibold` (600) para números.
* **Uso:** * Todos los bloques de código TypeScript analizados.
    * Rutas y nombres de archivos (ej: `src/components/fade.tsx`).
    * El número gigante del score de la IA (ej: `94/100`).
    * Identificadores de Git (Commit SHAs, estados de ramas).

---

## 3. Sistema de Redondeado (Borders Rounded Fluido)

Reglas estrictas para lograr una interfaz altamente fluida y "bien redondeada" pero con estructura sólida de software moderno de ingeniería.

### El Estándar (La regla general para la UI)
* **Medida:** `16px`
* **Token Tailwind:** `rounded-2xl`
* **Uso:** Tarjetas de repositorios de GitHub, contenedor principal del informe de la IA, el visualizador del código fuente y los modales. Es la identidad geométrica de la aplicación.

### El Mínimo (Para elementos pequeños o anidados)
* **Medida:** `8px` o `12px`
* **Token Tailwind:** `rounded-lg` / `rounded-xl`
* **Uso:** Inputs de texto individuales (como el campo de la URL), botones secundarios, badges de lenguajes y globos de texto (*tooltips*) informativos. No se permite ninguna esquina completamente recta (0px) en la app.

### El Máximo (Para elementos circulares o interactivos)
* **Medida:** `9999px` (Efecto Cápsula / Círculo Perfecto)
* **Token Tailwind:** `rounded-full`
* **Uso:** Los pines interactivos de diseño que flotan sobre las capturas de pantalla, botones de tipo pastilla (*pills*) para selectores de pestañas y avatares de perfil del usuario de GitHub.
