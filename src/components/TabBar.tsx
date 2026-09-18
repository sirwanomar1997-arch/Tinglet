import { Link } from "@tanstack/react-router";
import { Bell, House } from "lucide-react";
import { useAppState } from "@/lib/app-state";

export function TabBar() {
  const { t } = useAppState();

  const items = [
    { to: "/", label: t("home"), icon: House },
    { to: "/bells", label: t("bellAndBackground"), icon: Bell },
  ] as const;

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex h-[4.75rem] justify-center border-t border-nav-border bg-nav/98 px-5 pb-[max(.55rem,env(safe-area-inset-bottom))] pt-2.5 shadow-[0_-12px_34px_color-mix(in_oklab,var(--nav)_32%,transparent)] backdrop-blur-xl">
      <div className="grid w-full max-w-sm grid-cols-2 gap-2 rounded-lg border border-nav-border bg-background/5 p-1">
        {items.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            activeOptions={{ exact: to === "/" }}
            className="group relative flex min-w-0 items-center justify-center gap-2 rounded-md px-2 py-2 font-serif text-[12px] font-medium uppercase tracking-[0.12em] text-nav-foreground transition-all data-[status=active]:bg-background/8 data-[status=active]:text-nav-active"
          >
            <Icon className="size-3.5 shrink-0" strokeWidth={1.5} aria-hidden="true" />
            <span className="truncate">{label}</span>
            <span className="absolute inset-x-5 bottom-0 h-px bg-transparent transition-all group-data-[status=active]:bg-nav-active group-data-[status=active]:shadow-[0_0_10px_var(--nav-active)]" />
          </Link>
        ))}
      </div>
    </nav>
  );
}
