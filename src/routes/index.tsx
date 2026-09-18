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
          "A premium hand bell for your phone. Shake naturally to play a soft, realistic hand-bell tone.",
      },
      { property: "og:title", content: "Elegant Hand Bell" },
      {
        property: "og:description",
        content: "Shake naturally to ring a beautifully crafted hand bell.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { bell, volume, haptics, shakeEnabled } = useAppState();
  const controls = useAnimationControls();
  const [clapper, setClapper] = useState(0);
  const [glow, setGlow] = useState(0);

  const ring = useCallback(({ intensity, x }: { intensity: number; x: number }) => {
    void unlockAudio();
    ringBell(bell.tone, volume, intensity);
    if (haptics) vibrate(Math.round(5 + intensity * 8));

    setGlow((g) => g + 1);
    const direction = x >= 0 ? 1 : -1;
    setClapper(direction * (4 + intensity * 9));
    window.setTimeout(() => setClapper(-direction * (2 + intensity * 5)), 95);
    window.setTimeout(() => setClapper(0), 220);

    void controls.start({
      rotate: [direction * intensity * 13, -direction * intensity * 8, direction * intensity * 3, 0],
      x: [direction * intensity * 9, -direction * intensity * 4, 0],
      transition: { duration: 0.58, ease: "easeOut" },
    });
  }, [bell.tone, controls, haptics, volume]);

  const { permission, requestPermission } = useShake(ring, shakeEnabled);
  const needsPermission = shakeEnabled && permission === "needs-permission";

  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden px-5 pb-24 pt-[max(1.25rem,env(safe-area-inset-top))]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,color-mix(in_oklab,var(--primary)_14%,transparent),transparent_48%)]" />
      <header className="relative z-10 flex justify-end">
        <SettingsSheet onOpen={() => { void unlockAudio(); if (needsPermission) void requestPermission(); }} />
      </header>

      <div className="relative flex flex-1 flex-col items-center justify-center">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[62%] w-[76%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-foreground/10 bg-background/10 shadow-[inset_0_1px_0_color-mix(in_oklab,var(--foreground)_12%,transparent),0_38px_90px_color-mix(in_oklab,var(--background)_72%,transparent)] backdrop-blur-[2px]" />
        <div className="relative flex w-full max-w-[25rem] items-center justify-center" aria-hidden="true">
          <motion.span
            key={glow}
            className="absolute size-[72%] rounded-full blur-xl"
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
            className="w-full drop-shadow-[0_36px_34px_color-mix(in_oklab,var(--background)_65%,transparent)]"
          >
            <BellArt bell={bell} clapperOffset={clapper} className="h-auto w-full" />
          </motion.div>
        </div>
        <div className="pointer-events-none absolute bottom-[12%] h-8 w-52 rounded-full bg-background/55 blur-xl" />
      </div>
    </main>
  );
}
