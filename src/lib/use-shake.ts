import { useCallback, useEffect, useRef, useState } from "react";

type PermissionState = "unsupported" | "needs-permission" | "granted" | "denied";

type MotionEventCtor = {
  requestPermission?: () => Promise<"granted" | "denied">;
};

export type ShakeImpulse = {
  intensity: number;
  x: number;
  y: number;
};

/**
 * Detects a phone shake via the device motion sensor.
 * On iOS, permission must be requested from a user gesture.
 */
export function useShake(onShake: (impulse: ShakeImpulse) => void, enabled: boolean) {
  const [permission, setPermission] = useState<PermissionState>("unsupported");
  const lastRing = useRef(0);
  const previous = useRef({ x: 0, y: 0, z: 0 });
  const handler = useRef(onShake);
  handler.current = onShake;

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("DeviceMotionEvent" in window)) {
      setPermission("unsupported");
      return;
    }
    const ctor = window.DeviceMotionEvent as unknown as MotionEventCtor;
    setPermission(typeof ctor.requestPermission === "function" ? "needs-permission" : "granted");
  }, []);

  const requestPermission = useCallback(async () => {
    if (typeof window === "undefined" || !("DeviceMotionEvent" in window)) return;
    const ctor = window.DeviceMotionEvent as unknown as MotionEventCtor;
    if (typeof ctor.requestPermission !== "function") {
      setPermission("granted");
      return;
    }
    try {
      const result = await ctor.requestPermission();
      setPermission(result === "granted" ? "granted" : "denied");
    } catch {
      setPermission("denied");
    }
  }, []);

  useEffect(() => {
    if (!enabled || permission !== "granted") return;

    const onMotion = (event: DeviceMotionEvent) => {
      const a = event.accelerationIncludingGravity ?? event.acceleration;
      if (!a) return;
      const x = a.x ?? 0;
      const y = a.y ?? 0;
      const z = a.z ?? 0;
      const change = Math.hypot(x - previous.current.x, y - previous.current.y, z - previous.current.z);
      previous.current = { x, y, z };
      if (change < 7.5) return;
      const now = performance.now();
      if (now - lastRing.current < 105) return;
      lastRing.current = now;
      handler.current({
        intensity: Math.min(1, Math.max(0.18, (change - 6) / 22)),
        x: Math.max(-1, Math.min(1, x / 16)),
        y: Math.max(-1, Math.min(1, y / 16)),
      });
    };

    window.addEventListener("devicemotion", onMotion);
    return () => window.removeEventListener("devicemotion", onMotion);
  }, [enabled, permission]);

  return { permission, requestPermission };
}
