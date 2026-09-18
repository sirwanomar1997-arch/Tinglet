import { createFileRoute } from "@tanstack/react-router";
import { Check, FolderLock, Lock, Sparkles } from "lucide-react";
import { motion } from "motion/react";

import { BackgroundSwatch } from "@/components/BackgroundLayer";
import { Button } from "@/components/ui/button";
import { useAppState } from "@/lib/app-state";
import { vibrate } from "@/lib/bell-audio";
import { BACKGROUNDS, isPremiumBackground } from "@/lib/backgrounds";

export const Route = createFileRoute("/backgrounds")({
  head: () => ({
    meta: [
      { title: "Backgrounds — Tringlet" },
      {
        name: "description",
        content:
          "Pick a background for your bell: soft gradients, marble and stone, nature, minimal colours, festive scenes and dark moody tones.",
      },
      { property: "og:title", content: "Backgrounds — Tringlet" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        property: "og:description",
        content: "Choose a beautiful background. Applied instantly and remembered.",
      },
    ],
  }),
  component: BackgroundsPage,
});

function BackgroundsPage() {
  const { t, lang, background, setBackground, haptics, isUnlocked, unlockPack } = useAppState();
  const premiumUnlocked = isUnlocked("christmas");
  const free = BACKGROUNDS.filter((bg) => !isPremiumBackground(bg.id));
  const deluxe = BACKGROUNDS.filter((bg) => isPremiumBackground(bg.id));

  const cards = (items: typeof BACKGROUNDS, locked: boolean) => (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
      {items.map((bg) => {
        const selected = background.id === bg.id;
        return <motion.button key={bg.id} whileTap={{ scale: locked ? 1 : 0.97 }} onClick={() => { if (locked) return; setBackground(bg.id); if (haptics) vibrate(6); }} className={`relative overflow-hidden rounded-xl border bg-card text-left shadow-[0_12px_28px_color-mix(in_oklab,var(--foreground)_8%,transparent)] ${selected ? "border-primary/70" : "border-border"}`}>
          <BackgroundSwatch background={bg} className="aspect-[4/5] w-full" />
          {locked && <span className="absolute right-2.5 top-2.5 rounded-full bg-foreground/55 p-1.5 text-background/80"><Lock className="size-3" /></span>}
          {selected && !locked && <span className="absolute right-2.5 top-2.5 rounded-full bg-primary p-1 text-primary-foreground"><Check className="size-3" strokeWidth={3} /></span>}
          <span className="block bg-card/94 px-3 py-2 font-serif text-[14px] text-card-foreground/85">{bg.name[lang]}</span>
        </motion.button>;
      })}
    </div>
  );

  return (
    <main className="min-h-screen px-5 pb-32 pt-[max(1.5rem,env(safe-area-inset-top))]">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-background/92 backdrop-blur-2xl" />
      <header className="mb-7">
        <h1 className="font-serif text-3xl text-foreground">{t("chooseBackground")}</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">{t("chooseBackgroundSub")}</p>
      </header>

      <div className="space-y-7">
        <section><h2 className="mb-3 font-serif text-xl text-foreground/90">{t("freeBackgrounds")}</h2>{cards(free, false)}</section>
        <details className="group">
          <summary className="flex w-full cursor-pointer list-none items-center gap-5 rounded-xl border border-primary/30 bg-card p-5 text-left shadow-[0_18px_38px_color-mix(in_oklab,var(--foreground)_12%,transparent)] [&::-webkit-details-marker]:hidden">
            <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-secondary text-primary"><FolderLock className="size-6" /></span><span className="flex-1"><span className="block font-serif text-2xl text-foreground">{t("deluxeBackgrounds")}</span><span className="text-[11px] uppercase tracking-[0.17em] text-muted-foreground">{t("deluxeBackgroundsSub")}</span></span><span className="font-serif text-xl text-primary transition-transform group-open:rotate-90">›</span>
          </summary>
        {!premiumUnlocked && (
          <section className="border-y border-border bg-card/55 px-1 py-5">
            <p className="font-serif text-xl text-foreground">{t("deluxeBackgroundsSub")}</p>
            <Button onClick={() => unlockPack("christmas")} className="mt-4 h-11 w-full rounded-full"><Sparkles /> {t("unlockPremium")}</Button>
          </section>
        )}
        <section className="mt-7"><h2 className="mb-3 font-serif text-xl text-foreground/90">{t("deluxeBackgrounds")}</h2>{cards(deluxe, !premiumUnlocked)}</section>
        </details>
      </div>
    </main>
  );
}
