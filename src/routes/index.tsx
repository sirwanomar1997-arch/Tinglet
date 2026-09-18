import { createFileRoute } from "@tanstack/react-router";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { ringBell, unlockAudio, vibrate } from "@/lib/bell-audio";
import { useAppState } from "@/lib/app-state";
import { useShake } from "@/lib/use-shake";

export const Route = createFileRoute("/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Tringlet — Ring a beautiful hand bell" },
      {
        name: "description",
        content:
          "A premium hand bell for your phone. Shake naturally to play a soft, realistic hand-bell tone.",
      },
      { property: "og:title", content: "Tringlet" },
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

  const { permission, requestPermission } = useShake(ring, shakeEnabled);

  useEffect(() => {
    // iOS only grants motion access from a direct, synchronous user gesture,
    // and it must run on the top-level document (not inside a preview
    // iframe). Keep listening — rather than a one-shot listener — so a tap
    // that lands on a non-propagating control still gets a retry, and so we
    // keep asking until permission is actually granted.
    if (!shakeEnabled || permission === "granted" || permission === "unsupported") return;
    const prepare = () => {
      void unlockAudio();
      void requestPermission();
    };
    window.addEventListener("pointerdown", prepare, { capture: true });
    window.addEventListener("touchend", prepare, { capture: true });
    return () => {
      window.removeEventListener("pointerdown", prepare, { capture: true });
      window.removeEventListener("touchend", prepare, { capture: true });
    };
  }, [permission, requestPermission, shakeEnabled]);

  return (
    <main className="relative flex min-h-[calc(100svh-4.75rem)] flex-col overflow-hidden pb-2">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,color-mix(in_oklab,var(--stage-glow)_88%,transparent),transparent_54%)]" />
      {shakeEnabled && (permission === "needs-permission" || permission === "denied") && (
        <Button
          type="button"
          onClick={() => {
            void unlockAudio();
            void requestPermission();
          }}
          variant="outline"
          className="absolute inset-x-4 top-4 z-10 h-auto rounded-2xl border-primary/40 bg-background/70 px-4 py-3 text-center text-sm text-foreground/85 backdrop-blur-md"
        >
          {t("enableShake")}
        </Button>
      )}
      <div className="relative flex flex-1 flex-col items-center justify-center">
        <div className="relative h-[min(78svh,46rem)] w-full max-w-[34rem]" aria-hidden="true">
          {/* Soft vignette luxury frame — dissolves into the beige background */}
          <div className="absolute inset-0 m-auto size-[88%] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--stage-glow)_80%,transparent)_0%,transparent_70%)] blur-3xl" />
          <div className="absolute inset-0 m-auto size-[74%] rounded-full shadow-[0_30px_70px_-34px_color-mix(in_oklab,var(--foreground)_10%,transparent),inset_0_2px_3px_color-mix(in_oklab,white_65%,transparent),inset_0_-18px_36px_-24px_color-mix(in_oklab,var(--foreground)_7%,transparent)]" />
          <div className="absolute inset-0 m-auto size-[74%] rounded-full border border-color-mix(in_oklab,var(--gilt)_20%,transparent) blur-[1.5px]" />
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
