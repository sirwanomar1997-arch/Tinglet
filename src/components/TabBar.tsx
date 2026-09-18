import { Link } from "@tanstack/react-router";
import { useAppState } from "@/lib/app-state";

export function TabBar() {
  const { t } = useAppState();

  const items = [
    { to: "/", label: t("home") },
    { to: "/bells", label: t("bells") },
    { to: "/backgrounds", label: t("backgrounds") },
  ] as const;

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex justify-center border-t border-border bg-card/92 px-7 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 shadow-[0_-12px_40px_color-mix(in_oklab,var(--foreground)_8%,transparent)] backdrop-blur-2xl">
      <div className="flex w-full max-w-sm items-center justify-between">
        {items.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            activeOptions={{ exact: to === "/" }}
            className="group relative flex min-w-20 items-center justify-center px-2 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground transition-colors data-[status=active]:text-primary"
          >
            <span>{label}</span>
            <span className="absolute -bottom-2 size-1 rounded-full bg-transparent shadow-none transition-all group-data-[status=active]:bg-primary group-data-[status=active]:shadow-[0_0_10px_var(--primary)]" />
          </Link>
        ))}
      </div>
    </nav>
  );
}
