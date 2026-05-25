import { fade, parentVariants } from "@blaze-motion/motion";
import { Icon } from "@iconify/react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { GlowButton } from "#/components/ui/glow-button";

// Definimos la interfaz tipada en base a lo que mapea tu backend real
export interface Repo {
  id: number;
  name: string;
  fullName: string;
  isPrivate: boolean;
  description: string | null;
  language: string | null;
  stargazers_count?: number; // Opcionales por si GitHub no los trae en la primera página
  forks_count?: number;
  updated_at?: string;
  html_url?: string;
}

type FilterType = "all" | "public" | "private";

function timeAgo(dateStr?: string): string {
  if (!dateStr) return "---";
  const now = Date.now();
  const date = new Date(dateStr).getTime();
  const diff = now - date;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "Ahora";
  if (minutes < 60) return `Hace ${minutes}min`;
  if (hours < 24) return `Hace ${hours}h`;
  if (days < 30) return `Hace ${days}d`;
  return new Date(dateStr).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
  });
}

function RepoCard({
  repo,
  selected,
  onSelect,
}: {
  repo: Repo;
  selected: boolean;
  onSelect: () => void;
}) {
  const langColors: Record<string, string> = {
    TypeScript: "bg-secondary",
    Rust: "bg-accent",
    Python: "bg-primary",
    Go: "bg-success",
    JavaScript: "bg-yellow-500",
    HTML: "bg-orange-500",
    CSS: "bg-blue-500",
  };

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group relative text-left rounded-2xl bg-card border p-5 transition-all duration-300 ${
        selected
          ? "border-primary/50 shadow-[0_0_30px_-8px_#f67a7e50]"
          : "border-border hover:border-primary/30 hover:shadow-[0_0_25px_-10px_#f67a7e30]"
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2 min-w-0">
          <Icon
            icon={repo.isPrivate ? "lucide:lock" : "lucide:globe"}
            className={`size-3.5 shrink-0 ${
              repo.isPrivate ? "text-muted" : "text-success"
            }`}
          />
          <h3 className="text-sm font-semibold text-foreground truncate font-plus-jakarta-sans">
            {repo.name}
          </h3>
        </div>
        <Icon
          icon="lucide:external-link"
          className="size-3.5 text-muted opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0"
        />
      </div>

      {repo.description && (
        <p className="text-xs text-muted leading-relaxed mb-3 line-clamp-2">
          {repo.description}
        </p>
      )}

      <div className="flex items-center gap-3 text-xs text-muted">
        {repo.language && (
          <div className="flex items-center gap-1.5">
            <span
              className={`size-2 rounded-full ${
                langColors[repo.language] ?? "bg-muted"
              }`}
            />
            <span className="font-medium">{repo.language}</span>
          </div>
        )}
        <div className="flex items-center gap-1">
          <Icon icon="lucide:star" className="size-3" />
          <span>{repo.stargazers_count ?? 0}</span>
        </div>
        <div className="flex items-center gap-1">
          <Icon icon="lucide:git-fork" className="size-3" />
          <span>{repo.forks_count ?? 0}</span>
        </div>
        <span className="ml-auto">{timeAgo(repo.updated_at)}</span>
      </div>
    </button>
  );
}

function RepoDetail({ repo, onClose }: { repo: Repo; onClose: () => void }) {
  return (
    <motion.div
      variants={fade({ direction: "up", distance: 20, blur: 5 })}
      initial="initial"
      animate="animate"
      className="rounded-2xl bg-card border border-border p-6"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Icon
              icon={repo.isPrivate ? "lucide:lock" : "lucide:globe"}
              className={`size-4 ${
                repo.isPrivate ? "text-muted" : "text-success"
              }`}
            />
            <h2 className="text-xl font-bold font-plus-jakarta-sans text-foreground">
              {repo.name}
            </h2>
          </div>
          {repo.html_url && (
            <a
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium text-muted hover:text-foreground hover:bg-card/80 transition-all duration-200"
            >
              <Icon icon="lucide:external-link" className="size-3" />
              GitHub
            </a>
          )}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex items-center justify-center size-8 rounded-lg text-muted hover:text-foreground hover:bg-background/50 transition-all duration-200"
        >
          <Icon icon="lucide:x" className="size-4" />
        </button>
      </div>

      {repo.description && (
        <p className="text-sm text-muted mb-4 max-w-2xl">{repo.description}</p>
      )}

      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background/50">
          <Icon icon="lucide:star" className="size-4 text-muted" />
          <span className="text-sm font-medium text-foreground">
            {repo.stargazers_count ?? 0}
          </span>
          <span className="text-xs text-muted">estrellas</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background/50">
          <Icon icon="lucide:git-fork" className="size-4 text-muted" />
          <span className="text-sm font-medium text-foreground">
            {repo.forks_count ?? 0}
          </span>
          <span className="text-xs text-muted">forks</span>
        </div>
        {repo.language && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background/50">
            <span className="size-2.5 rounded-full bg-secondary" />
            <span className="text-sm font-medium text-foreground">
              {repo.language}
            </span>
          </div>
        )}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background/50">
          <Icon icon="lucide:clock" className="size-4 text-muted" />
          <span className="text-xs text-muted">
            Actualizado {timeAgo(repo.updated_at)}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <GlowButton color="primary">
          <Icon icon="lucide:play" className="size-4" />
          Auditar Código
        </GlowButton>
        <GlowButton color="secondary">
          <Icon icon="lucide:eye" className="size-4" />
          Auditar UX
        </GlowButton>
        <button
          type="button"
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-muted border border-border hover:text-foreground hover:border-primary/30 hover:bg-card/80 transition-all duration-200 active:scale-[0.97]"
        >
          <Icon icon="lucide:file-text" className="size-4" />
          Ver Reportes
        </button>
      </div>
    </motion.div>
  );
}

export function RepoList() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [selectedRepo, setSelectedRepo] = useState<Repo | null>(null);

  const {
    data: serverRepos = [],
    isLoading,
    error,
  } = useQuery<Repo[]>({
    queryKey: ["github-repositories"],
    queryFn: async () => {
      // Forzamos la URL completa del dominio local para asegurar que el navegador asocie las cookies
      const res = await fetch(`${window.location.origin}/api/github/repos`, {
        method: "GET",
        credentials: "include", // Obliga al navegador a empacar las cookies de Supabase
        headers: {
          Accept: "application/json",
        },
      });

      if (!res.ok) throw new Error("Error cargando los repositorios");
      return res.json();
    },
    staleTime: 1000 * 60 * 5,
  });

  // 2. Filtros computados de forma ultra fluida usando la data del servidor
  const filtered = useMemo(() => {
    return serverRepos.filter((repo) => {
      const matchSearch =
        repo.name.toLowerCase().includes(search.toLowerCase()) ||
        (repo.description ?? "").toLowerCase().includes(search.toLowerCase());
      const matchFilter =
        filter === "all" ||
        (filter === "public" && !repo.isPrivate) ||
        (filter === "private" && repo.isPrivate);
      return matchSearch && matchFilter;
    });
  }, [serverRepos, search, filter]);

  const filters: { key: FilterType; label: string }[] = [
    { key: "all", label: "Todos" },
    { key: "public", label: "Públicos" },
    { key: "private", label: "Privados" },
  ];

  const totalStars = useMemo(
    () => serverRepos.reduce((s, r) => s + (r.stargazers_count ?? 0), 0),
    [serverRepos],
  );
  const languages = useMemo(
    () => [...new Set(serverRepos.map((r) => r.language).filter(Boolean))],
    [serverRepos],
  );

  // 3. Estado de Carga con estética limpia integrada
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <div className="w-10 h-10 border-4 border-t-primary border-border/40 rounded-full animate-spin" />
        <p className="text-sm font-mono text-muted animate-pulse">
          Sincronizando repositorios desde GitHub...
        </p>
      </div>
    );
  }

  // 4. Estado de error (por ejemplo, si expira la sesión de 5 días)
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[350px] max-w-md mx-auto text-center p-6 border border-red-900/30 bg-red-950/10 rounded-2xl">
        <Icon
          icon="lucide:alert-circle"
          className="size-10 text-primary mb-3"
        />
        <h3 className="text-sm font-semibold text-foreground font-plus-jakarta-sans">
          Sesión de GitHub desincronizada
        </h3>
        <p className="text-xs text-muted mt-2 leading-relaxed">
          No pudimos leer tus repositorios. Esto ocurre habitualmente cuando
          caduca la ventana de sesión de 5 días. Por favor, refresca la página o
          re-conecta tu cuenta.
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-foreground text-background text-xs font-bold rounded-xl hover:bg-foreground/90 transition-all"
        >
          Reintentar Sincronización
        </button>
      </div>
    );
  }

  return (
    <motion.div
      variants={parentVariants({ delayChildren: 0.06 })}
      initial="initial"
      animate="animate"
      className="flex flex-col gap-6"
    >
      <motion.div
        variants={fade({ direction: "down", distance: 20, blur: 5 })}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-extrabold font-plus-jakarta-sans text-foreground">
            Mis Repositorios
          </h1>
          <p className="text-sm text-muted mt-1 font-plus-jakarta-sans">
            {serverRepos.length} repositorios &middot; {totalStars} estrellas
            &middot; {languages.length} lenguajes
          </p>
        </div>
        <div className="relative">
          <Icon
            icon="lucide:search"
            className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar repositorio..."
            className="w-64 pl-9 pr-3 py-2 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:border-secondary/50 focus:shadow-[0_0_15px_-5px_#1b71e9] transition-all duration-300 font-mono"
          />
        </div>
      </motion.div>

      <motion.div
        variants={fade({ direction: "up", distance: 15, blur: 3 })}
        className="flex items-center gap-2"
      >
        {filters.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => setFilter(key)}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 font-plus-jakarta-sans ${
              filter === key
                ? "bg-primary/10 text-primary border border-primary/20"
                : "text-muted border border-border hover:text-foreground hover:bg-card/80"
            }`}
          >
            {label}
          </button>
        ))}
        {search && (
          <span className="text-xs text-muted ml-2 font-mono">
            {filtered.length} resultados
          </span>
        )}
      </motion.div>

      {/* Grid adaptado al conteo de columnas dinámico */}
      <motion.div
        variants={fade({ direction: "up", distance: 20, blur: 5 })}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {filtered.map((repo) => (
          <RepoCard
            key={repo.id}
            repo={repo}
            selected={selectedRepo?.id === repo.id}
            onSelect={() =>
              setSelectedRepo(selectedRepo?.id === repo.id ? null : repo)
            }
          />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col items-center justify-center py-16 text-center">
            <Icon
              icon="lucide:search-x"
              className="size-12 text-muted/30 mb-4"
            />
            <p className="text-muted font-medium font-plus-jakarta-sans">
              No se encontraron repositorios
            </p>
            <p className="text-xs text-muted/60 mt-1 font-plus-jakarta-sans">
              Intenta con otros términos de búsqueda o filtros
            </p>
          </div>
        )}
      </motion.div>

      {selectedRepo && (
        <RepoDetail repo={selectedRepo} onClose={() => setSelectedRepo(null)} />
      )}
    </motion.div>
  );
}
