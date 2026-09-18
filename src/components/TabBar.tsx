import { Link } from "@tanstack/react-router";
import { Bell as BellIcon, Home, Image } from "lucide-react";

import { useAppState } from "@/lib/app-state";

export function TabBar() {
  const { t } = useAppState();

  const items = [
    { to: "/", label: t("home"), Icon: Home },
    { to: "/bells", label: t("bells"), Icon: BellIcon },
    { to: "/backgrounds", label: t("backgrounds"), Icon: Image },
  ] as const;

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <div className="flex w-full max-w-sm items-center gap-1 rounded-full border border-white/12 bg-black/45 p-1.5 backdrop-blur-xl">
        {items.map(({ to, label, Icon }) => (
          <Link
            key={to}
            to={to}
            activeOptions={{ exact: to === "/" }}
            className="group flex flex-1 flex-col items-center gap-1 rounded-full px-3 py-2 text-[11px] font-medium tracking-wide text-white/55 transition-colors data-[status=active]:bg-white/10 data-[status=active]:text-[color:var(--gilt)]"
          >
            <Icon className="size-5" strokeWidth={1.6} />
            <span>{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
