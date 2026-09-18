import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useCallback, useState } from "react";

import signatureGoldBell from "@/assets/signature-gold-bell.png";
import { BellScene3D } from "@/components/BellScene3D";
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
  const [impulse, setImpulse] = useState({ id: 0, intensity: 0, direction: 1 });

  const ring = useCallback(({ intensity, x }: { intensity: number; x: number }) => {
    void unlockAudio();
    ringBell(bell.tone, volume, intensity);
    if (haptics) vibrate(Math.round(5 + intensity * 8));

    setGlow((g) => g + 1);
    const direction = x >= 0 ? 1 : -1;
    setImpulse((current) => ({ id: current.id + 1, intensity, direction }));
  }, [bell.tone, haptics, volume]);

  useShake(ring, shakeEnabled);

  return (
    <main className="relative flex min-h-[calc(100svh-7.25rem)] flex-col overflow-hidden pb-3">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,color-mix(in_oklab,var(--stage-glow)_88%,transparent),transparent_54%)]" />
      <div className="relative flex flex-1 flex-col items-center justify-center">
        <div className="relative h-[min(78svh,46rem)] w-full max-w-[34rem]" aria-hidden="true">
          <motion.span
            key={`glow-${glow}`}
            className="absolute size-[72%] rounded-full blur-xl"
            style={{
              background: `radial-gradient(circle, ${bell.finish.accent}55 0%, transparent 70%)`,
            }}
            initial={{ opacity: 0.65, scale: 0.8 }}
            animate={{ opacity: 0, scale: 1.35 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
          />
          {bell.id === "aurum" ? (
            <motion.img
              key={`bell-${impulse.id}`}
              src={signatureGoldBell}
              alt=""
              width={1024}
              height={1280}
              className="absolute inset-0 m-auto h-auto w-[92%] max-h-full object-contain drop-shadow-[0_24px_22px_color-mix(in_oklab,var(--foreground)_22%,transparent)]"
              initial={{ rotate: impulse.direction * impulse.intensity * 8, x: impulse.direction * impulse.intensity * 8 }}
              animate={{ rotate: [impulse.direction * impulse.intensity * 8, -impulse.direction * impulse.intensity * 5, impulse.direction * impulse.intensity * 2, 0], x: 0 }}
              transition={{ duration: 0.58, ease: [0.22, 0.8, 0.3, 1] }}
            />
          ) : (
            <BellScene3D bell={bell} impulse={impulse} />
          )}
        </div>
      </div>
    </main>
  );
}
