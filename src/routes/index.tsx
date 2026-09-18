import { createFileRoute } from "@tanstack/react-router";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useCallback, useEffect, useState } from "react";

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
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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
  const rotation = useMotionValue(0);
  const smoothRotation = useSpring(rotation, { stiffness: 320, damping: 24, mass: 0.55 });

  const ring = useCallback(({ intensity, angle, impact }: { intensity: number; angle: number; impact: boolean }) => {
    rotation.set(angle);
    if (!impact) return;
    void unlockAudio();
    ringBell(bell.tone, volume, intensity);
    if (haptics) vibrate(Math.round(4 + intensity * 7));
    setGlow((g) => g + 1);
  }, [bell.tone, haptics, rotation, volume]);

  const { requestPermission } = useShake(ring, shakeEnabled);

  useEffect(() => {
    const prepare = () => {
      void unlockAudio();
      void requestPermission();
    };
    // Capture the first touch anywhere before another control can stop the
    // event. iOS requires this direct gesture for motion and audio permission.
    window.addEventListener("pointerdown", prepare, { once: true, capture: true });
    return () => window.removeEventListener("pointerdown", prepare, { capture: true });
  }, [requestPermission]);

  return (
    <main className="relative flex min-h-[calc(100svh-5.25rem)] flex-col overflow-hidden pb-2">
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
          <motion.img
            key={`bell-${bell.id}`}
            src={bell.image}
            alt=""
            width={2048}
            height={2048}
            className="absolute inset-0 m-auto size-[64%] origin-[50%_10%] object-contain drop-shadow-[0_18px_16px_color-mix(in_oklab,var(--foreground)_18%,transparent)]"
            style={{ rotate: smoothRotation }}
          />
        </div>
      </div>
    </main>
  );
}
