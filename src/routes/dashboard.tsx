import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { QuickGuide } from "#/components/dashboard/quick-guide";
import { RepoList } from "#/components/dashboard/repo-list";
import { type SectionId, Sidebar } from "#/components/dashboard/sidebar";
import { DashboardSkeleton } from "#/components/skeletons/dashboard-skeleton";
import { useAuth } from "#/context/AuthContext";

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const { loading, hasAudited, user } = useAuth();
  const [activeSection, setActiveSection] = useState<SectionId>("home");

  if (loading) {
    return (
      <div className="flex min-h-dvh pt-14">
        <div className="w-60 shrink-0 border-r border-border bg-card" />
        <main className="flex-1 p-6 overflow-auto">
          <DashboardSkeleton />
        </main>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-dvh pt-14 items-center justify-center">
        <p className="text-muted">Inicia sesión para acceder al dashboard.</p>
      </div>
    );
  }

  const showGuideOnly = !hasAudited;
  const section = showGuideOnly ? "guide" : activeSection;

  return (
    <div className="flex min-h-dvh pt-14">
      <Sidebar
        activeSection={section}
        onNavigate={(id) => {
          if (showGuideOnly && id !== "guide") return;
          setActiveSection(id);
        }}
      />
      <main className="flex-1 p-6 overflow-auto">
        {section !== "guide" ? <QuickGuide /> : <RepoList />}
      </main>
    </div>
  );
}
