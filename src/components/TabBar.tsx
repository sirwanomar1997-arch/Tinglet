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
    <nav className="fixed inset-x-0 bottom-0 z-40 flex h-[5.25rem] justify-center border-t border-nav-border bg-nav px-8 pb-[max(.65rem,env(safe-area-inset-bottom))] pt-4 shadow-[0_-10px_28px_color-mix(in_oklab,var(--nav)_28%,transparent)]">
      <div className="flex w-full max-w-sm items-start justify-between">
        {items.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            activeOptions={{ exact: to === "/" }}
            className="group relative flex min-w-16 items-center justify-center px-1 py-1 font-serif text-[13px] font-medium uppercase tracking-[0.16em] text-nav-foreground transition-colors data-[status=active]:text-nav-active"
          >
            <span>{label}</span>
            <span className="absolute -bottom-2.5 h-px w-5 bg-transparent shadow-none transition-all group-data-[status=active]:bg-nav-active group-data-[status=active]:shadow-[0_0_10px_var(--nav-active)]" />
          </Link>
        ))}
      </div>
    </nav>
  );
}
