import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, Check, ChevronRight, Lock, Sparkles } from "lucide-react";
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

type CatalogView = "bells" | "backgrounds";

function StatusBadge({ selected, locked }: { selected: boolean; locked: boolean }) {
  if (selected && !locked) return <span className="absolute right-2 top-2 z-10 grid size-6 place-items-center rounded-full bg-primary text-primary-foreground shadow"><Check className="size-3" strokeWidth={3} /></span>;
  if (locked) return <span className="absolute right-2 top-2 z-10 grid size-6 place-items-center rounded-full bg-foreground/60 text-background backdrop-blur-sm"><Lock className="size-3" /></span>;
  return null;
}

function BellCard({ bell, locked }: { bell: Bell; locked: boolean }) {
  const { bell: current, setBell, volume, haptics, lang } = useAppState();
  const selected = current.id === bell.id;
  return (
    <motion.button type="button" onClick={() => {
      if (locked) return;
      setBell(bell.id);
      void unlockAudio();
      ringBell(bell.tone, volume * 0.8);
      if (haptics) vibrate(8);
    }} whileTap={{ scale: locked ? 1 : 0.97 }} className={`relative min-w-0 overflow-hidden rounded-lg border bg-card/90 p-2 pb-3 text-center shadow-[0_10px_28px_color-mix(in_oklab,var(--foreground)_8%,transparent)] ${selected ? "border-primary/70" : "border-border"}`}>
      <StatusBadge selected={selected} locked={locked} />
      <img src={bell.image} alt="" width={1024} height={1024} loading="lazy" decoding="async" className={`aspect-square w-full object-contain drop-shadow-[0_8px_7px_color-mix(in_oklab,var(--foreground)_13%,transparent)] ${locked ? "opacity-60" : ""}`} />
      <span className="block truncate font-serif text-[14px] text-card-foreground/85">{bell.name[lang]}</span>
    </motion.button>
  );
}

function BackgroundCard({ item, locked }: { item: Background; locked: boolean }) {
  const { background, setBackground, haptics, lang } = useAppState();
  const selected = background.id === item.id;
  return (
    <motion.button type="button" onClick={() => {
      if (locked) return;
      setBackground(item.id);
      if (haptics) vibrate(6);
    }} whileTap={{ scale: locked ? 1 : 0.97 }} className={`relative min-w-0 overflow-hidden rounded-lg border bg-card/90 text-left shadow-[0_10px_28px_color-mix(in_oklab,var(--foreground)_8%,transparent)] ${selected ? "border-primary/70" : "border-border"}`}>
      <StatusBadge selected={selected} locked={locked} />
      <BackgroundSwatch background={item} className={`aspect-[4/5] w-full ${locked ? "opacity-65" : ""}`} />
      <span className="block truncate bg-card/95 px-3 py-2 font-serif text-[14px] text-card-foreground/85">{item.name[lang]}</span>
    </motion.button>
  );
}

function SelectedBell() {
  const { bell, lang } = useAppState();
  return <div className="space-y-2.5"><h2 className="ml-1 font-serif text-xl text-foreground">{useAppState().t("handBells")}</h2><div className="relative aspect-square overflow-hidden rounded-xl border border-primary/25 bg-card/90 p-2 shadow-[0_8px_24px_color-mix(in_oklab,var(--foreground)_8%,transparent)]"><StatusBadge selected locked={false} /><img src={bell.image} alt="" width={1024} height={1024} className="size-full object-contain drop-shadow-[0_7px_6px_color-mix(in_oklab,var(--foreground)_12%,transparent)]" /><span className="absolute inset-x-0 bottom-0 truncate bg-card/95 px-2 py-2 text-center font-serif text-[13px] text-card-foreground/80">{bell.name[lang]}</span></div></div>;
}

function SelectedBackground() {
  const { background, lang, t } = useAppState();
  return <div className="space-y-2.5"><h2 className="ml-1 font-serif text-xl text-foreground">{t("backgrounds")}</h2><div className="relative aspect-square overflow-hidden rounded-xl border border-primary/25 bg-card/90 shadow-[0_8px_24px_color-mix(in_oklab,var(--foreground)_8%,transparent)]"><StatusBadge selected locked={false} /><BackgroundSwatch background={background} className="size-full" /><span className="absolute inset-x-0 bottom-0 truncate bg-card/95 px-2 py-2 text-center font-serif text-[13px] text-card-foreground/80">{background.name[lang]}</span></div></div>;
}

function PremiumAd({ onOpen }: { onOpen: () => void }) {
  const { t } = useAppState();
  const previewBells = [BELLS[10], BELLS[40], BELLS[70]].filter((item): item is Bell => Boolean(item));
  const previewBackgrounds = [BACKGROUNDS[5], BACKGROUNDS[13]].filter((item): item is Background => Boolean(item));
  return (
    <motion.button type="button" onClick={onOpen} whileTap={{ scale: 0.985 }} className="group relative w-full overflow-hidden rounded-2xl border border-nav-border bg-nav px-5 pb-5 pt-6 text-nav-foreground shadow-[0_24px_50px_color-mix(in_oklab,var(--nav)_30%,transparent)]">
      <div className="absolute -right-20 -top-20 size-48 rounded-full bg-primary/20 blur-3xl" />
      <div className="relative flex flex-col items-center text-center">
        <span className="rounded-full border border-nav-border bg-background/5 px-3 py-1 text-[9px] uppercase tracking-[0.22em] text-nav-active">{t("premiumCatalogTag")}</span>
        <h2 className="mt-3 font-serif text-4xl leading-[0.88] text-nav-foreground">Premium<br /><span className="italic text-nav-active">Catalog</span></h2>
        <p className="mt-3 max-w-[17rem] text-xs leading-relaxed text-nav-foreground/60">{t("premiumCatalogPitch")}</p>
        <div className="relative my-4 h-28 w-full" aria-hidden="true">
          {previewBackgrounds.map((item, index) => <BackgroundSwatch key={item.id} background={item} className={`absolute top-4 h-20 w-24 overflow-hidden rounded-lg border border-nav-border shadow-xl ${index === 0 ? "left-[18%] -rotate-6" : "right-[18%] rotate-6"}`} />)}
          <div className="absolute left-1/2 top-0 flex h-28 w-32 -translate-x-1/2 items-center justify-center rounded-xl border border-nav-border bg-background/5 shadow-2xl backdrop-blur-md">
            {previewBells.map((item, index) => <img key={item.id} src={item.image} alt="" className={`absolute size-24 object-contain drop-shadow-lg ${index === 0 ? "-translate-x-11 scale-75 opacity-70" : index === 1 ? "translate-x-11 scale-75 opacity-70" : "z-10"}`} />)}
          </div>
        </div>
        <span className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary-foreground shadow-lg">{t("openPremiumCatalog")} <ChevronRight className="size-4" /></span>
        <span className="mt-3 text-[9px] uppercase tracking-[0.18em] text-nav-foreground/45">{t("allPremiumIncluded")}</span>
      </div>
    </motion.button>
  );
}

function CollectionPage() {
  const { t, isUnlocked, unlockPack, haptics } = useAppState();
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [view, setView] = useState<CatalogView>("bells");
  const premiumUnlocked = isUnlocked("christmas");
  const premiumBells = BELLS.filter((item) => isPremiumBell(item.id));
  const premiumBackgrounds = BACKGROUNDS.filter((item) => isPremiumBackground(item.id));

  const unlockPremium = () => {
    unlockPack("christmas");
    if (haptics) vibrate([8, 30, 8]);
  };

  if (!catalogOpen) {
    return <main className="min-h-screen px-4 pb-28 pt-[max(1.5rem,env(safe-area-inset-top))] sm:px-6"><div className="pointer-events-none fixed inset-0 -z-10 bg-background/94 backdrop-blur-2xl" /><div className="mx-auto max-w-md space-y-9"><div className="grid grid-cols-2 gap-3"><SelectedBell /><SelectedBackground /></div><PremiumAd onOpen={() => setCatalogOpen(true)} /></div></main>;
  }

  return (
    <main className="min-h-screen px-4 pb-28 pt-[max(1rem,env(safe-area-inset-top))] sm:px-6">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-background/94 backdrop-blur-2xl" />
      <div className="mx-auto max-w-3xl">
        <header className="mb-5 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3">
          <Button type="button" variant="ghost" size="icon" onClick={() => setCatalogOpen(false)} aria-label={t("backToSelection")} className="shrink-0 rounded-full"><ArrowLeft /></Button>
          <div className="min-w-0"><p className="text-[9px] uppercase tracking-[0.25em] text-primary">{t("premiumCatalogTag")}</p><h1 className="truncate font-serif text-3xl text-foreground">{t("premiumCatalog")}</h1></div>
        </header>

        {!premiumUnlocked && <section className="mb-5 overflow-hidden rounded-xl border border-nav-border bg-nav p-5 text-nav-foreground shadow-xl"><div className="flex items-start gap-3"><Sparkles className="mt-1 size-5 shrink-0 text-nav-active" /><div><p className="font-serif text-2xl leading-none">{t("premiumEverything")}</p><p className="mt-2 text-xs leading-relaxed text-nav-foreground/60">{t("premiumEverythingSub")}</p></div></div><Button type="button" onClick={unlockPremium} className="mt-4 h-12 w-full rounded-lg font-serif text-base"><Sparkles /> {t("unlockPremium")}</Button><Button type="button" variant="ghost" onClick={unlockPremium} className="mt-1 h-8 w-full text-xs text-nav-foreground/55 hover:bg-background/5 hover:text-nav-foreground">{t("restorePurchase")}</Button></section>}

        <div className="mb-5 grid grid-cols-2 gap-2 rounded-lg border border-border bg-card/60 p-1.5">
          <Button type="button" variant={view === "bells" ? "default" : "ghost"} onClick={() => setView("bells")} className="h-11 rounded-md font-serif text-base">{t("handBells")}</Button>
          <Button type="button" variant={view === "backgrounds" ? "default" : "ghost"} onClick={() => setView("backgrounds")} className="h-11 rounded-md font-serif text-base">{t("backgrounds")}</Button>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {view === "bells" ? premiumBells.map((item) => <BellCard key={item.id} bell={item} locked={!premiumUnlocked} />) : premiumBackgrounds.map((item) => <BackgroundCard key={item.id} item={item} locked={!premiumUnlocked} />)}
        </div>
      </div>
    </main>
  );
}