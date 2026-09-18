import { useCallback, useEffect, useRef, useState } from "react";

type PermissionState = "unsupported" | "needs-permission" | "granted" | "denied";

type MotionEventCtor = {
  requestPermission?: () => Promise<"granted" | "denied">;
};

/**
 * Detects a phone shake via the device motion sensor.
 * On iOS, permission must be requested from a user gesture.
 */
export function useShake(onShake: () => void, enabled: boolean) {
  const [permission, setPermission] = useState<PermissionState>("unsupported");
  const lastRing = useRef(0);
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
      const magnitude = Math.hypot(a.x ?? 0, a.y ?? 0, a.z ?? 0);
      // ~9.8 at rest when gravity is included; 20+ is a deliberate shake.
      if (magnitude < 22) return;
      const now = Date.now();
      if (now - lastRing.current < 650) return;
      lastRing.current = now;
      handler.current();
    };

    window.addEventListener("devicemotion", onMotion);
    return () => window.removeEventListener("devicemotion", onMotion);
  }, [enabled, permission]);

  return { permission, requestPermission };
}
