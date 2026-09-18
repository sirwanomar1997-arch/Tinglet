import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { motion } from "motion/react";

import { BackgroundSwatch } from "@/components/BackgroundLayer";
import { useAppState } from "@/lib/app-state";
import { vibrate } from "@/lib/bell-audio";
import { BACKGROUNDS, BACKGROUND_GROUPS } from "@/lib/backgrounds";

export const Route = createFileRoute("/backgrounds")({
  head: () => ({
    meta: [
      { title: "Backgrounds — Elegant Hand Bell" },
      {
        name: "description",
        content:
          "Pick a background for your bell: soft gradients, marble and stone, nature, minimal colours, festive scenes and dark moody tones.",
      },
      { property: "og:title", content: "Backgrounds — Elegant Hand Bell" },
      {
        property: "og:description",
        content: "Choose a beautiful background. Applied instantly and remembered.",
      },
    ],
  }),
  component: BackgroundsPage,
});

function BackgroundsPage() {
  const { t, lang, background, setBackground, haptics } = useAppState();

  return (
    <main className="min-h-screen px-5 pb-32 pt-[max(1.5rem,env(safe-area-inset-top))]">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-background/92 backdrop-blur-2xl" />
      <header className="mb-7">
        <h1 className="font-serif text-3xl text-foreground">{t("chooseBackground")}</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">{t("chooseBackgroundSub")}</p>
      </header>

      <div className="space-y-9">
        {BACKGROUND_GROUPS.map((group) => (
          <section key={group.id}>
            <h2 className="mb-3 font-serif text-xl text-foreground/90">{group.name[lang]}</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {BACKGROUNDS.filter((b) => b.group === group.id).map((bg) => {
                const selected = background.id === bg.id;
                return (
                  <motion.button
                    key={bg.id}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      setBackground(bg.id);
                      if (haptics) vibrate(6);
                    }}
                    className={`relative overflow-hidden rounded-xl border bg-card text-left shadow-[0_12px_28px_color-mix(in_oklab,var(--foreground)_8%,transparent)] transition-colors ${
                      selected ? "border-primary/70" : "border-border"
                    }`}
                  >
                    <BackgroundSwatch background={bg} className="h-28 w-full" />
                    {selected && (
                        <span className="absolute right-2.5 top-2.5 rounded-full bg-primary p-1 text-primary-foreground">
                        <Check className="size-3" strokeWidth={3} />
                      </span>
                    )}
                    <span className="block bg-card/94 px-3 py-2 font-serif text-[14px] text-card-foreground/85 backdrop-blur-sm">
                      {bg.name[lang]}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
