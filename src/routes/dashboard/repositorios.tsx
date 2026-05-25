import { createFileRoute } from "@tanstack/react-router";
import { RepoList } from "#/components/dashboard/repo-list";

export const Route = createFileRoute("/dashboard/repositorios")({
	component: () => <RepoList />,
});
