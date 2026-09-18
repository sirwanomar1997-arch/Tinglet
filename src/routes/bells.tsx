import { createFileRoute } from "@tanstack/react-router";
import { Bell as BellIcon, Check, Image, Lock, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

import { BackgroundSwatch } from "@/components/BackgroundLayer";
import { Button } from "@/components/ui/button";
import { useAppState } from "@/lib/app-state";
import { ringBell, unlockAudio, vibrate } from "@/lib/bell-audio";
import { BACKGROUNDS, isPremiumBackground, type Background } from "@/lib/backgrounds";
import { BELLS, isPremiumBell, type Bell } from "@/lib/bells";

export const Route = createFileRoute("/bells")({
  head: () => ({
    meta: [
      { title: "Hand Bells & Backgrounds — Tringlet" },
      { name: "description", content: "Choose your Tringlet hand bell and background, or unlock the complete premium collection." },
      { property: "og:title", content: "Hand Bells & Backgrounds — Tringlet" },
      { property: "og:description", content: "Create your own Tringlet combination from beautiful hand bells and backgrounds." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CollectionPage,
});

type CollectionView = "bells" | "backgrounds";

function StatusBadge({ selected, locked }: { selected: boolean; locked: boolean }) {
  if (selected && !locked) {
    return <span className="absolute right-2.5 top-2.5 grid size-7 place-items-center rounded-full bg-primary text-primary-foreground shadow"><Check className="size-3.5" strokeWidth={3} /></span>;
  }
  if (locked) {
    return <span className="absolute right-2.5 top-2.5 grid size-7 place-items-center rounded-full bg-foreground/60 text-background backdrop-blur-sm"><Lock className="size-3.5" strokeWidth={2} /></span>;
  }
  return null;
}

function BellCard({ bell, locked }: { bell: Bell; locked: boolean }) {
  const { bell: current, setBell, volume, haptics, lang } = useAppState();
  const selected = current.id === bell.id;
  return (
    <motion.button
      type="button"
      onClick={() => {
        if (locked) return;
        setBell(bell.id);
        void unlockAudio();
        ringBell(bell.tone, volume * 0.8);
        if (haptics) vibrate(8);
      }}
      whileTap={{ scale: locked ? 1 : 0.97 }}
      className={`relative min-w-0 overflow-hidden rounded-lg border bg-card/88 p-2.5 pb-3 text-center shadow-[0_10px_28px_color-mix(in_oklab,var(--foreground)_8%,transparent)] transition-colors ${selected ? "border-primary/70" : "border-border"}`}
    >
      <StatusBadge selected={selected} locked={locked} />
      <div className={`aspect-square w-full ${locked ? "opacity-60" : ""}`}>
        <img src={bell.image} alt="" width={1024} height={1024} loading="lazy" decoding="async" className="size-full object-contain drop-shadow-[0_8px_7px_color-mix(in_oklab,var(--foreground)_13%,transparent)]" />
      </div>
      <span className="block truncate font-serif text-[15px] text-card-foreground/85">{bell.name[lang]}</span>
    </motion.button>
  );
}

function BackgroundCard({ item, locked }: { item: Background; locked: boolean }) {
  const { background, setBackground, haptics, lang } = useAppState();
  const selected = background.id === item.id;
  return (
    <motion.button
      type="button"
      onClick={() => {
        if (locked) return;
        setBackground(item.id);
        if (haptics) vibrate(6);
      }}
      whileTap={{ scale: locked ? 1 : 0.97 }}
      className={`relative min-w-0 overflow-hidden rounded-lg border bg-card/88 text-left shadow-[0_10px_28px_color-mix(in_oklab,var(--foreground)_8%,transparent)] ${selected ? "border-primary/70" : "border-border"}`}
    >
      <StatusBadge selected={selected} locked={locked} />
      <BackgroundSwatch background={item} className={`aspect-[4/5] w-full ${locked ? "opacity-65" : ""}`} />
      <span className="block truncate bg-card/95 px-3 py-2.5 font-serif text-[14px] text-card-foreground/85">{item.name[lang]}</span>
    </motion.button>
  );
}

function CollectionPage() {
  const { t, isUnlocked, unlockPack, haptics } = useAppState();
  const [view, setView] = useState<CollectionView>("bells");
  const premiumUnlocked = isUnlocked("christmas");
  const freeBells = BELLS.filter((item) => !isPremiumBell(item.id));
  const premiumBells = BELLS.filter((item) => isPremiumBell(item.id));
  const freeBackgrounds = BACKGROUNDS.filter((item) => !isPremiumBackground(item.id));
  const premiumBackgrounds = BACKGROUNDS.filter((item) => isPremiumBackground(item.id));

  const unlockPremium = () => {
    unlockPack("christmas");
    if (haptics) vibrate([8, 30, 8]);
  };

  return (
    <main className="min-h-screen px-4 pb-28 pt-[max(1.5rem,env(safe-area-inset-top))] sm:px-6">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-background/94 backdrop-blur-2xl" />
      <header className="mb-6">
        <p className="mb-1 text-[10px] uppercase tracking-[0.28em] text-primary">Tringlet collection</p>
        <h1 className="max-w-sm font-serif text-4xl leading-[1.02] text-foreground">{t("chooseCollection")}</h1>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">{t("chooseCollectionSub")}</p>
      </header>

      <div className="mb-7 grid grid-cols-2 gap-2 rounded-lg border border-border bg-card/55 p-1.5 shadow-[0_12px_32px_color-mix(in_oklab,var(--foreground)_8%,transparent)]">
        <Button type="button" variant={view === "bells" ? "default" : "ghost"} onClick={() => setView("bells")} className="h-12 min-w-0 rounded-md font-serif text-base"><BellIcon /> <span className="truncate">{t("handBells")}</span></Button>
        <Button type="button" variant={view === "backgrounds" ? "default" : "ghost"} onClick={() => setView("backgrounds")} className="h-12 min-w-0 rounded-md font-serif text-base"><Image /> <span className="truncate">{t("backgrounds")}</span></Button>
      </div>

      <section className="mb-8">
        <div className="mb-3 flex items-end justify-between gap-3">
          <h2 className="font-serif text-2xl text-foreground">{view === "bells" ? t("freeCollection") : t("freeBackgrounds")}</h2>
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{t("included")}</span>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {view === "bells"
            ? freeBells.map((item) => <BellCard key={item.id} bell={item} locked={false} />)
            : freeBackgrounds.map((item) => <BackgroundCard key={item.id} item={item} locked={false} />)}
        </div>
      </section>

      <section className="mb-8 overflow-hidden rounded-lg border border-primary/30 bg-card/92 shadow-[0_20px_46px_color-mix(in_oklab,var(--foreground)_13%,transparent)]">
        <div className="border-b border-border px-5 py-5">
          <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-secondary text-primary"><Sparkles className="size-5" /></span>
            <div className="min-w-0">
              <p className="font-serif text-2xl leading-none text-foreground">{t("premiumEverything")}</p>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{t("premiumEverythingSub")}</p>
            </div>
          </div>
        </div>
        <div className="px-5 py-4">
          {premiumUnlocked ? (
            <div className="flex items-center gap-2 text-sm font-medium text-primary"><Check className="size-4" /> {t("unlocked")}</div>
          ) : (
            <div className="space-y-2.5">
              <Button type="button" onClick={unlockPremium} className="h-12 w-full rounded-md font-serif text-base"><Sparkles /> {t("unlockPremium")}</Button>
              <Button type="button" variant="ghost" onClick={unlockPremium} className="h-9 w-full text-xs text-muted-foreground">{t("restorePurchase")}</Button>
            </div>
          )}
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-end justify-between gap-3">
          <h2 className="font-serif text-2xl text-foreground">{view === "bells" ? t("premiumCollection") : t("deluxeBackgrounds")}</h2>
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{premiumUnlocked ? t("unlocked") : t("locked")}</span>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {view === "bells"
            ? premiumBells.map((item) => <BellCard key={item.id} bell={item} locked={!premiumUnlocked} />)
            : premiumBackgrounds.map((item) => <BackgroundCard key={item.id} item={item} locked={!premiumUnlocked} />)}
        </div>
      </section>
    </main>
  );
}