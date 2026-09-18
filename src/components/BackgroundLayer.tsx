import { AnimatePresence, motion } from "motion/react";

import type { Background } from "@/lib/backgrounds";

export function BackgroundLayer({ background }: { background: Background }) {
  const backgroundImage = background.asset
    ? `url(${background.asset}), ${background.image}`
    : background.image;

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.div
          key={background.id}
          className="absolute inset-0"
          style={{
            backgroundColor: background.color,
            backgroundImage,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: background.asset ? "cover" : "auto",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_120%,rgba(0,0,0,0.28),transparent_60%)]" />
    </div>
  );
}

export function BackgroundSwatch({
  background,
  className,
}: {
  background: Background;
  className?: string;
}) {
  const backgroundImage = background.asset
    ? `url(${background.asset}), ${background.image}`
    : background.image;

  return (
    <div
      className={className}
      style={{
        backgroundColor: background.color,
        backgroundImage,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: background.asset ? "cover" : "auto",
      }}
    />
  );
}
