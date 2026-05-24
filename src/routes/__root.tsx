import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { Header } from "#/components/layout/header";
import { GridBackground } from "#/components/ui/grid-background";
import { AuthProvider } from "#/context/AuthContext";
import appCss from "../styles.css?url";

const title = "DevInspector AI — Auditoría de código con IA";
const description =
	"Plataforma SaaS de automatización de auditorías de software. Evalúa la robustez del código fuente y el comportamiento visual con un agente interactivo guiado por IA.";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ title },
			{ name: "description", content: description },
			{ name: "robots", content: "index, follow" },
			{ name: "theme-color", content: "#0B0F19" },
			{ property: "og:title", content: title },
			{ property: "og:description", content: description },
			{ property: "og:type", content: "website" },
			{ name: "twitter:card", content: "summary_large_image" },
			{ name: "twitter:title", content: title },
			{ name: "twitter:description", content: description },
		],
		links: [
			{ rel: "canonical", href: "https://devinspector.ai" },
			{ rel: "stylesheet", href: appCss },
		],
	}),
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<AuthProvider>
			<html lang="es">
				<head>
					<HeadContent />
				</head>
				<body>
					<GridBackground />
					<Header />
					{children}
					<TanStackDevtools
						config={{
							position: "bottom-right",
						}}
						plugins={[
							{
								name: "Tanstack Router",
								render: <TanStackRouterDevtoolsPanel />,
							},
						]}
					/>
					<Scripts />
				</body>
			</html>
		</AuthProvider>
	);
}
