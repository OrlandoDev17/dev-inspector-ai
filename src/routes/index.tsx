import { Hero } from "#/components/home/hero";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <main className="min-h-dvh">
      <Hero />
    </main>
  );
}
