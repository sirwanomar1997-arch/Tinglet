import { createFileRoute } from "@tanstack/react-router";
import { MoveHorizontal, Smartphone } from "lucide-react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useCallback, useEffect, useState } from "react";

import { ringBell, unlockAudio, vibrate } from "@/lib/bell-audio";
import { useAppState } from "@/lib/app-state";
import { useShake } from "@/lib/use-shake";

export const Route = createFileRoute("/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Tinglet — Ring a beautiful hand bell" },
      {
        name: "description",
        content:
          "A premium hand bell for your phone. Shake naturally to play a soft, realistic hand-bell tone.",
      },
      { property: "og:title", content: "Tinglet" },
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
  const { t, bell, volume, haptics, shakeEnabled } = useAppState();
  const [glow, setGlow] = useState(0);
  const [showShakeHint, setShowShakeHint] = useState(true);
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

  useShake(ring, shakeEnabled);

  const tapRing = useCallback(() => {
    void unlockAudio();
    rotation.set(11);
    window.setTimeout(() => rotation.set(0), 220);
    ringBell(bell.tone, volume, 0.72);
    if (haptics) vibrate(8);
    setGlow((g) => g + 1);
  }, [bell.tone, haptics, rotation, volume]);

  useEffect(() => {
    const timeout = window.setTimeout(() => setShowShakeHint(false), 3600);
    return () => window.clearTimeout(timeout);
  }, []);

  // Mobile browsers and WebViews keep audio muted until the first touch.
  useEffect(() => {
    const prime = () => {
      void unlockAudio();
    };
    window.addEventListener("pointerdown", prime, { capture: true, once: true });
    window.addEventListener("touchstart", prime, { capture: true, once: true });
    return () => {
      window.removeEventListener("pointerdown", prime, { capture: true });
      window.removeEventListener("touchstart", prime, { capture: true });
    };
  }, []);

  return (
    <main className="relative flex min-h-[calc(100svh-4.75rem)] flex-col overflow-hidden pb-2">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,color-mix(in_oklab,var(--stage-glow)_88%,transparent),transparent_54%)]" />
      {shakeEnabled && showShakeHint && (
        <motion.div
          className="pointer-events-none absolute inset-x-0 top-[max(1rem,env(safe-area-inset-top))] z-10 flex justify-center px-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          aria-hidden="true"
        >
          <div className="flex items-center gap-3 rounded-full border border-primary/25 bg-background/55 px-4 py-2.5 text-sm font-medium text-foreground/80 shadow-[0_14px_34px_color-mix(in_oklab,var(--foreground)_10%,transparent)] backdrop-blur-md">
            <span className="relative flex size-8 items-center justify-center text-primary">
              <motion.span
                className="absolute inset-0 rounded-full border border-primary/25"
                animate={{ scale: [0.9, 1.14, 0.9], opacity: [0.45, 0.16, 0.45] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.span
                className="relative"
                animate={{ rotate: [-8, 8, -7, 7, 0], x: [-1, 1, -1, 1, 0] }}
                transition={{ duration: 0.9, repeat: Infinity, repeatDelay: 0.24, ease: "easeInOut" }}
              >
                <Smartphone size={22} strokeWidth={1.8} />
              </motion.span>
            </span>
            <span>{t("shakeYourPhone")}</span>
            <MoveHorizontal className="text-primary/70" size={18} strokeWidth={1.8} />
          </div>
        </motion.div>
      )}
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
