import { createFileRoute } from "@tanstack/react-router";
import { motion, useAnimationControls } from "motion/react";
import { useCallback, useState } from "react";

import { BellArt } from "@/components/BellArt";
import { SettingsSheet } from "@/components/SettingsSheet";
import { ringBell, unlockAudio, vibrate } from "@/lib/bell-audio";
import { useAppState } from "@/lib/app-state";
import { useShake } from "@/lib/use-shake";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Elegant Hand Bell — Ring a beautiful bell" },
      {
        name: "description",
        content:
          "A premium hand bell for your phone. Shake or tap to ring a rich, realistic bell, and choose from elegant bells and backgrounds.",
      },
      { property: "og:title", content: "Elegant Hand Bell" },
      {
        property: "og:description",
        content: "Shake or tap to ring a beautifully crafted hand bell.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { bell, background, volume, haptics, shakeEnabled, t } = useAppState();
  const controls = useAnimationControls();
  const [clapper, setClapper] = useState(0);
  const [glow, setGlow] = useState(0);

  const ring = useCallback(() => {
    void unlockAudio();
    ringBell(bell.tone, volume);
    if (haptics) vibrate([10, 22, 8]);

    setGlow((g) => g + 1);
    setClapper(7);
    window.setTimeout(() => setClapper(-5), 150);
    window.setTimeout(() => setClapper(3), 320);
    window.setTimeout(() => setClapper(0), 520);

    void controls.start({
      rotate: [0, 11, -9, 6, -4, 2, 0],
      transition: { duration: 1.25, ease: "easeOut" },
    });
  }, [bell.tone, controls, haptics, volume]);

  const { permission, requestPermission } = useShake(ring, shakeEnabled);
  const needsPermission = shakeEnabled && permission === "needs-permission";
  const light = background.tone === "light";

  return (
    <main className="relative flex min-h-screen flex-col px-5 pb-32 pt-[max(1.25rem,env(safe-area-inset-top))]">
      <header className="flex items-start justify-between">
        <div>
          <p
            className={`text-[10px] uppercase tracking-[0.34em] ${light ? "text-white/45" : "text-black/40"}`}
          >
            {t("currentBell")}
          </p>
          <h1
            className={`font-serif text-2xl leading-tight ${light ? "text-white" : "text-black/80"}`}
          >
            {bell.name[useAppState().lang]}
          </h1>
        </div>
        <SettingsSheet />
      </header>

      <div className="flex flex-1 flex-col items-center justify-center">
        <button
          onClick={ring}
          aria-label={t("tapToRing")}
          className="relative flex w-full max-w-[22rem] items-center justify-center outline-none"
        >
          <motion.span
            key={glow}
            className="absolute size-[68%] rounded-full"
            style={{
              background: `radial-gradient(circle, ${bell.finish.accent}55 0%, transparent 70%)`,
            }}
            initial={{ opacity: 0.65, scale: 0.8 }}
            animate={{ opacity: 0, scale: 1.35 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
          />
          <motion.div
            animate={controls}
            style={{ transformOrigin: "50% 12%" }}
            whileTap={{ scale: 0.97 }}
            className="w-full drop-shadow-[0_28px_45px_rgba(0,0,0,0.35)]"
          >
            <BellArt bell={bell} clapperOffset={clapper} className="h-auto w-full" />
          </motion.div>
        </button>
      </div>

      <div className="flex flex-col items-center gap-3 pb-4">
        {needsPermission ? (
          <button
            onClick={() => void requestPermission()}
            className="rounded-full border border-[color:var(--gilt)]/50 bg-black/35 px-5 py-2.5 text-sm text-[color:var(--gilt)] backdrop-blur-md"
          >
            {t("enableShake")}
          </button>
        ) : null}
        <p
          className={`text-[11px] uppercase tracking-[0.3em] ${light ? "text-white/45" : "text-black/40"}`}
        >
          {shakeEnabled && permission === "granted" ? t("tapOrShake") : t("tapToRing")}
        </p>
      </div>
    </main>
  );
}
