import { useCallback, useEffect, useRef, useState } from "react";

type PermissionState = "unsupported" | "needs-permission" | "granted" | "denied";

type MotionEventCtor = {
  requestPermission?: () => Promise<"granted" | "denied">;
};

export type ShakeImpulse = {
  intensity: number;
  x: number;
  y: number;
  angle: number;
  impact: boolean;
};

/**
 * Detects a phone shake via the device motion sensor.
 * On iOS, permission must be requested from a user gesture.
 */
export function useShake(onShake: (impulse: ShakeImpulse) => void, enabled: boolean) {
  const [permission, setPermission] = useState<PermissionState>("unsupported");
  const lastRing = useRef(0);
  const previous = useRef({ x: 0, y: 0, z: 0 });
  const filtered = useRef({ x: 0, y: 0 });
  const angle = useRef(0);
  const velocity = useRef(0);
  const lastTime = useRef(0);
  const lastDirection = useRef(0);
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
      const a = event.acceleration ?? event.accelerationIncludingGravity;
      if (!a) return;
      const x = a.x ?? 0;
      const y = a.y ?? 0;
      const z = a.z ?? 0;
      const change = Math.hypot(x - previous.current.x, y - previous.current.y, z - previous.current.z);
      previous.current = { x, y, z };
      const now = performance.now();
      const dt = Math.min(0.05, Math.max(0.008, (now - (lastTime.current || now - 16)) / 1000));
      lastTime.current = now;

      // Follow the hand continuously: filtered lateral acceleration drives a
      // damped pendulum, rather than replaying a canned animation.
      filtered.current.x += (x - filtered.current.x) * 0.34;
      filtered.current.y += (y - filtered.current.y) * 0.25;
      const drive = Math.max(-18, Math.min(18, filtered.current.x));
      velocity.current += drive * 2.15 * dt;
      velocity.current += -angle.current * 14 * dt;
      velocity.current *= Math.exp(-3.4 * dt);
      angle.current = Math.max(-17, Math.min(17, angle.current + velocity.current * 58 * dt));

      const direction = Math.sign(drive);
      const impact =
        change > 3.1 &&
        direction !== 0 &&
        direction !== lastDirection.current &&
        now - lastRing.current > 72;
      if (impact) lastRing.current = now;
      if (direction !== 0 && Math.abs(drive) > 1.2) lastDirection.current = direction;
      handler.current({
        intensity: Math.min(1, Math.max(0.08, change / 18)),
        x: Math.max(-1, Math.min(1, x / 16)),
        y: Math.max(-1, Math.min(1, y / 16)),
        angle: angle.current,
        impact,
      });
    };

    window.addEventListener("devicemotion", onMotion);
    return () => window.removeEventListener("devicemotion", onMotion);
  }, [enabled, permission]);

  return { permission, requestPermission };
}
