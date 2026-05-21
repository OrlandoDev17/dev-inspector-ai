# DESIGN.md — Reglas de Diseño Estrictas (DevInspector AI)

Este documento contiene las reglas de diseño inquebrantables para el desarrollo de la interfaz. Todo componente en Figma, Stitch o Tailwind CSS debe cumplir estrictamente con estas especificaciones para mantener la coherencia visual.

---

## 1. Paleta de Colores (Deep Midnight-Ruby)

Los colores se aplican con una jerarquía estricta para mantener el enfoque de una herramienta de ingeniería de software ultra premium, limpia y madura.

### 1. Fondo Principal (Base de la App)
* **Hexadecimal:** `#090c11`
* **Tokens Tailwind:** `bg-background`
* **Uso:** El lienzo oscuro profundo. Base de toda la aplicación.

### 2. Superficies y Contenedores (Capas Secundarias)
* **Tarjeta Default:** `#121824`
* **Tarjeta Sutil:** `rgba(9, 12, 17, 0.8)`
* **Tokens Tailwind:** `bg-card` / `bg-card-subtle`
* **Uso:** Estructuras que contienen información directa. Se aplica en las tarjetas de repositorios de GitHub, el panel del reporte de la IA, modales de confirmación y menús flotantes.

### 3. Acento Principal (Rojo Coral — "El Foco" de la IA)
* **Hexadecimal:** `#f67a7e` (Rojo Coral)
* **Foreground:** `#090c11`
* **Tokens Tailwind:** `text-primary` / `bg-primary` / `text-primary-foreground`
* **Uso:** **Reservado exclusivamente para elementos de alta jerarquía.** Botones de acción principal (ej: "Analizar Proyecto"), el puntaje numérico del reporte final, bordes de elementos en estado activo o seleccionado, y el agente activo.

### 4. Secundario (Azul Eléctrico — Estados y Clean Code)
* **Hexadecimal:** `#1b71e9` (Azul Eléctrico)
* **Foreground:** `#ffffff`
* **Tokens Tailwind:** `text-secondary` / `bg-secondary` / `text-secondary-foreground`
* **Uso:** Ramas correctas en el árbol de carga, bordes de inputs y estados secundarios importantes.

### 5. Acento de Efecto (Morado — Glows y Gradientes)
* **Hexadecimal:** `#7024eb` (Morado)
* **Token Tailwind:** `bg-accent`
* **Uso:** Efectos de glow, gradientes decorativos y estados visuales especiales.

### 6. Bordes y Separadores (Líneas Estructurales Milimétricas)
* **Hexadecimal:** `#1f293d`
* **Token Tailwind:** `border-border`
* **Uso:** Separadores de tablas de archivos, contornos de inputs y divisiones sutiles entre paneles de código para mantener el orden sintáctico.

### 7. Estado de Éxito (Verde Esmeralda)
* **Hexadecimal:** `#10B981` (Verde Esmeralda)
* **Token Tailwind:** `text-success` / `bg-success`
* **Uso:** Exclusivo para badges de "Fixed" o estados de éxito rotundo. No usar como acento principal.

### 8. Textos (Lectura y Jerarquía Cognitiva)
* **Texto Principal (Blanco Puro):** `#FFFFFF` (`text-primary`) -> Para títulos principales, código fuente y texto de alto contraste.
* **Texto Muted (Slate Gray):** `#94A3B8` (`text-muted`)-> Para descripciones secundarias, fechas de commits, subtítulos y metadatos.

---

## 2. Sistema Tipográfico

Distribución de fuentes basada en la función del texto. Usamos tres familias: **Plus Jakarta Sans**, **DM Sans** y **JetBrains Mono**.

### Headings (Títulos Principales e Importantes)
* **Fuente:** **Plus Jakarta Sans**
* **Peso:** `font-bold` (700) o `font-extrabold` (800)
* **Modificadores:** `tracking-tight` (Letras compactas para dar peso estructural e imponente).
* **Tokens Tailwind:** `font-plus-jakarta-sans`
* **Uso:** Títulos de vistas, nombres de las secciones del dashboard y títulos de las tarjetas de reportes.

### Párrafos Grandes y Textos de Lectura (Sugerencias e Informes de la IA)
* **Fuente:** **DM Sans**
* **Peso:** `font-normal` (400) o `font-medium` (500)
* **Modificadores:** `leading-relaxed` (Espaciado de línea generoso para evitar la fatiga al leer informes largos).
* **Tokens Tailwind:** `font-dm-sans`
* **Uso:** Cuerpo de texto general, explicaciones semánticas, recomendaciones de Clean Code detalladas y respuestas narrativas generadas por el modelo de IA.

### Código y Resaltados Especiales (Estética Técnica de Ingeniería)
* **Fuente:** **JetBrains Mono**
* **Peso:** `font-normal` (400) o `font-semibold` (600) para números.
* **Tokens Tailwind:** `font-jetbrains-mono`
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
