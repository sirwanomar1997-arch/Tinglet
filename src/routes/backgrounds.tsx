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
      <header className="mb-7">
        <h1 className="font-serif text-3xl text-white">{t("chooseBackground")}</h1>
        <p className="mt-1.5 text-sm text-white/50">{t("chooseBackgroundSub")}</p>
      </header>

      <div className="space-y-9">
        {BACKGROUND_GROUPS.map((group) => (
          <section key={group.id}>
            <h2 className="mb-3 font-serif text-xl text-white/90">{group.name[lang]}</h2>
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
                    className={`relative overflow-hidden rounded-3xl border text-left transition-colors ${
                      selected ? "border-[color:var(--gilt)]/70" : "border-white/10"
                    }`}
                  >
                    <BackgroundSwatch background={bg} className="h-28 w-full" />
                    {selected && (
                      <span className="absolute right-2.5 top-2.5 rounded-full bg-[color:var(--gilt)] p-1 text-black">
                        <Check className="size-3" strokeWidth={3} />
                      </span>
                    )}
                    <span className="block bg-black/45 px-3 py-2 text-[13px] text-white/85 backdrop-blur-sm">
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
