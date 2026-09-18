import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, Check, FolderLock, Lock, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useAppState } from "@/lib/app-state";
import { ringBell, unlockAudio, vibrate } from "@/lib/bell-audio";
import { PACKS, bellsByPack, type Bell } from "@/lib/bells";

export const Route = createFileRoute("/bells")({
  head: () => ({
    meta: [
      { title: "Bell Collection — Elegant Hand Bell" },
      {
        name: "description",
        content:
          "Browse the bell collection: gold, rose gold, silver, porcelain and onyx bells, plus seasonal Christmas, spring, autumn and Halloween packs.",
      },
      { property: "og:title", content: "Bell Collection — Elegant Hand Bell" },
      {
        property: "og:description",
        content: "Choose your favourite bell. Each one has its own shape, finish and tone.",
      },
    ],
  }),
  component: BellsPage,
});

function BellCard({ bell, locked }: { bell: Bell; locked: boolean }) {
  const { bell: current, setBell, volume, haptics, lang } = useAppState();
  const selected = current.id === bell.id;

  const choose = () => {
    if (locked) return;
    setBell(bell.id);
    void unlockAudio();
    ringBell(bell.tone, volume * 0.8);
    if (haptics) vibrate(8);
  };

  return (
    <motion.button
      onClick={choose}
      whileTap={{ scale: locked ? 1 : 0.97 }}
      className={`relative flex flex-col items-center gap-2 overflow-hidden rounded-xl border p-3 pt-4 text-center shadow-[0_12px_28px_color-mix(in_oklab,var(--foreground)_9%,transparent)] transition-colors ${
        selected
          ? "border-primary/55 bg-card"
          : "border-border bg-card/74 hover:bg-card"
      }`}
    >
      {selected && (
          <span className="absolute right-2.5 top-2.5 rounded-full bg-primary p-1 text-primary-foreground">
          <Check className="size-3" strokeWidth={3} />
        </span>
      )}
      {locked && (
        <span className="absolute right-2.5 top-2.5 rounded-full bg-foreground/55 p-1.5 text-background/80">
          <Lock className="size-3" strokeWidth={2} />
        </span>
      )}
      <div className={`aspect-square w-full ${locked ? "opacity-55" : ""}`}>
        <img
          src={bell.image}
          alt=""
          className="size-full object-contain drop-shadow-[0_12px_10px_color-mix(in_oklab,var(--foreground)_16%,transparent)]"
        />
      </div>
      <span className="font-serif text-[15px] text-foreground/80">{bell.name[lang]}</span>
    </motion.button>
  );
}

function BellsPage() {
  const { t, lang, isUnlocked, unlockPack, haptics } = useAppState();
  const premiumUnlocked = isUnlocked("christmas");
  const [showPremium, setShowPremium] = useState(false);

  const unlockPremium = () => {
    unlockPack("christmas");
    if (haptics) vibrate([8, 30, 8]);
  };

  return (
    <main className="min-h-screen px-5 pb-32 pt-[max(1.5rem,env(safe-area-inset-top))]">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-background/92 backdrop-blur-2xl" />
      <header className="mb-7">
        <h1 className="font-serif text-3xl text-foreground">{t("chooseBell")}</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">{t("chooseBellSub")}</p>
      </header>

      {!showPremium ? (
        <div className="space-y-9">
          <section>
            <div className="mb-3">
              <h2 className="font-serif text-xl text-foreground/90">{t("freeCollection")}</h2>
              <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">{t("included")}</p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {bellsByPack("classic").map((bell) => <BellCard key={bell.id} bell={bell} locked={false} />)}
            </div>
          </section>

          <button
            onClick={() => setShowPremium(true)}
            className="relative flex w-full items-center gap-5 overflow-hidden rounded-xl border border-primary/30 bg-card p-5 text-left shadow-[0_18px_38px_color-mix(in_oklab,var(--foreground)_12%,transparent)]"
          >
            <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-secondary text-primary"><FolderLock className="size-6" /></span>
            <span className="min-w-0 flex-1">
              <span className="block font-serif text-2xl text-foreground">{t("premiumCollection")}</span>
              <span className="mt-1 block text-[11px] uppercase tracking-[0.17em] text-muted-foreground">{t("premiumCollectionSub")}</span>
            </span>
            <span className="font-serif text-xl text-primary">›</span>
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          <Button variant="ghost" onClick={() => setShowPremium(false)} className="-ml-3 text-muted-foreground">
            <ArrowLeft /> {t("closeCollection")}
          </Button>

          {!premiumUnlocked && (
            <section className="border-y border-border bg-card/55 px-1 py-5">
              <p className="font-serif text-xl text-foreground">{t("premiumBundle")}</p>
              <div className="mt-4 flex items-center gap-3">
                <Button onClick={unlockPremium} className="h-11 flex-1 rounded-full">
                  <Sparkles aria-hidden="true" /> {t("unlockPremium")}
                </Button>
                <Button variant="ghost" size="sm" onClick={unlockPremium}>{t("restorePurchase")}</Button>
              </div>
            </section>
          )}

          {PACKS.filter((pack) => pack.premium).map((pack) => {
          const unlocked = isUnlocked(pack.id);
          const bells = bellsByPack(pack.id);
          if (bells.length === 0) return null;

          return (
            <section key={pack.id}>
              <div className="mb-3 flex items-center justify-between gap-3">
                <div>
                  <h2 className="font-serif text-xl text-foreground/90">{pack.name[lang]}</h2>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                    {pack.premium
                      ? unlocked
                        ? t("unlocked")
                        : `${t("premium")} · ${t("freeForNow")}`
                      : t("included")}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                {bells.map((bell) => (
                  <BellCard key={bell.id} bell={bell} locked={!unlocked} />
                ))}
              </div>
            </section>
          );
          })}
        </div>
      )}
    </main>
  );
}
