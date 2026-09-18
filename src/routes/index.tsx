import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useCallback, useState } from "react";

import { BellScene3D, type BellImpulse } from "@/components/BellScene3D";
import { SettingsSheet } from "@/components/SettingsSheet";
import { ringBell, unlockAudio, vibrate } from "@/lib/bell-audio";
import { useAppState } from "@/lib/app-state";
import { useShake } from "@/lib/use-shake";

export const Route = createFileRoute("/")({
  ssr: false,
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
  const [glow, setGlow] = useState(0);
  const [impulse, setImpulse] = useState<BellImpulse>({ id: 0, intensity: 0, direction: 1 });

  const ring = useCallback(({ intensity, x }: { intensity: number; x: number }) => {
    void unlockAudio();
    ringBell(bell.tone, volume, intensity);
    if (haptics) vibrate(Math.round(5 + intensity * 8));

    setGlow((g) => g + 1);
    const direction = x >= 0 ? 1 : -1;
    setImpulse((current) => ({ id: current.id + 1, intensity, direction }));
  }, [bell.tone, haptics, volume]);

  const { permission, requestPermission } = useShake(ring, shakeEnabled);
  const needsPermission = shakeEnabled && permission === "needs-permission";

  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden px-5 pb-24 pt-[max(1.25rem,env(safe-area-inset-top))]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,color-mix(in_oklab,var(--primary)_14%,transparent),transparent_48%)]" />
      <header className="relative z-10 flex justify-end">
        <SettingsSheet onOpen={() => { void unlockAudio(); if (needsPermission) void requestPermission(); }} />
      </header>

      <div className="relative flex flex-1 flex-col items-center justify-center">
        <div className="relative h-[min(70vh,42rem)] w-full max-w-[30rem]" aria-hidden="true">
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
          <BellScene3D bell={bell} impulse={impulse} />
        </div>
        <div className="pointer-events-none absolute bottom-[12%] h-8 w-52 rounded-full bg-background/55 blur-xl" />
      </div>
    </main>
  );
}
