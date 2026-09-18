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
    <nav className="fixed inset-x-0 bottom-0 z-40 flex h-[7.25rem] justify-center border-t border-nav-border bg-nav px-7 pb-[max(1rem,env(safe-area-inset-bottom))] pt-6 shadow-[0_-14px_36px_color-mix(in_oklab,var(--nav)_35%,transparent)]">
      <div className="flex w-full max-w-md items-start justify-between">
        {items.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            activeOptions={{ exact: to === "/" }}
            className="group relative flex min-w-20 items-center justify-center px-1 py-1 font-serif text-[14px] font-medium uppercase tracking-[0.18em] text-nav-foreground transition-colors data-[status=active]:text-nav-active"
          >
            <span>{label}</span>
            <span className="absolute -bottom-4 size-1.5 rounded-full bg-transparent shadow-none transition-all group-data-[status=active]:bg-nav-active group-data-[status=active]:shadow-[0_0_12px_var(--nav-active)]" />
          </Link>
        ))}
      </div>
    </nav>
  );
}
