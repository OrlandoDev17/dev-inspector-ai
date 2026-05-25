import { createFileRoute } from "@tanstack/react-router";
import { QuickGuide } from "#/components/dashboard/quick-guide";

export const Route = createFileRoute("/dashboard/primeros-pasos")({
	component: () => <QuickGuide />,
});
