import type { Tone } from "./bells";

let ctx: AudioContext | null = null;
let master: GainNode | null = null;

type Ctor = typeof AudioContext;

function ensureContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (ctx) return ctx;
  const AC: Ctor | undefined =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: Ctor }).webkitAudioContext;
  if (!AC) return null;
  ctx = new AC();
  master = ctx.createGain();
  master.gain.value = 1;
  // Gentle limiter-ish curve so loud rings stay rich instead of clipping harshly.
  const shaper = ctx.createWaveShaper();
  const curve = new Float32Array(1024);
  for (let i = 0; i < curve.length; i++) {
    const x = (i / (curve.length - 1)) * 2 - 1;
    curve[i] = Math.tanh(x * 1.6) / Math.tanh(1.6);
  }
  shaper.curve = curve;
  master.connect(shaper);
  shaper.connect(ctx.destination);
  return ctx;
}

/** Call from a user gesture so iOS/Android allow audio. */
export async function unlockAudio(): Promise<void> {
  const context = ensureContext();
  if (!context) return;
  if (context.state === "suspended") {
    try {
      await context.resume();
    } catch {
      /* ignore */
    }
  }
}

function strikeNoise(context: AudioContext, target: AudioNode, when: number, gain: number) {
  const length = Math.floor(context.sampleRate * 0.045);
  const buffer = context.createBuffer(1, length, context.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) {
    const env = Math.pow(1 - i / length, 7);
    data[i] = (Math.random() * 2 - 1) * env;
  }
  const src = context.createBufferSource();
  src.buffer = buffer;
  const bp = context.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = 1850;
  bp.Q.value = 0.75;
  const g = context.createGain();
  g.gain.value = gain;
  src.connect(bp);
  bp.connect(g);
  g.connect(target);
  src.start(when);
}

/**
 * Plays a struck-metal bell: a set of inharmonic partials with individual
 * decay times plus a short strike transient.
 */
export function ringBell(tone: Tone, volume = 1, intensity = 0.7): void {
  const context = ensureContext();
  if (!context || !master) return;
  if (context.state === "suspended") void context.resume();

  const now = context.currentTime + 0.005;
  const bus = context.createGain();
  const force = Math.max(0.14, Math.min(1, intensity));
  bus.gain.value = Math.max(0, Math.min(1, volume)) * (0.28 + force * 0.42);
  const warmth = context.createBiquadFilter();
  warmth.type = "lowpass";
  warmth.frequency.value = 4200 + force * 1800;
  warmth.Q.value = 0.3;
  bus.disconnect();
  bus.connect(warmth);
  warmth.connect(master);
  bus.connect(master);

  strikeNoise(context, bus, now, 0.04 + force * 0.055);

  tone.partials.forEach((ratio, index) => {
    const handBellBase = Math.max(540, Math.min(920, tone.base * 1.16));
    const freq = handBellBase * ratio;
    if (freq > 16000) return;

    const partialGain =
      (1 / (1 + index * 1.75)) * (index === 0 ? 0.5 : 0.2 + tone.brightness * 0.34) * force;
    const decay = Math.min(3.8, tone.decay * 0.48) * (index === 0 ? 1 : Math.pow(0.62, index) + 0.07);

    const osc = context.createOscillator();
    osc.type = "sine";
    osc.frequency.value = freq;
    // Slight downward drift gives the shimmer of a real casting.
    osc.frequency.setValueAtTime(freq * 1.0015, now);
    osc.frequency.exponentialRampToValueAtTime(freq, now + 0.18);

    const g = context.createGain();
    g.gain.setValueAtTime(0, now);
    g.gain.linearRampToValueAtTime(partialGain, now + 0.004);
    g.gain.exponentialRampToValueAtTime(0.0001, now + decay);

    // Beating: a detuned twin per partial, like a real bell's warble.
    const twin = context.createOscillator();
    twin.type = "sine";
    twin.frequency.value = freq * 1.0007;
    const twinGain = context.createGain();
    twinGain.gain.setValueAtTime(0, now);
    twinGain.gain.linearRampToValueAtTime(partialGain * 0.32, now + 0.006);
    twinGain.gain.exponentialRampToValueAtTime(0.0001, now + decay * 0.95);

    osc.connect(g);
    g.connect(bus);
    twin.connect(twinGain);
    twinGain.connect(bus);

    osc.start(now);
    twin.start(now);
    osc.stop(now + decay + 0.1);
    twin.stop(now + decay + 0.1);
  });
}

export function vibrate(pattern: number | number[] = [12, 24, 8]): void {
  if (typeof navigator === "undefined") return;
  const nav = navigator as Navigator & { vibrate?: (p: number | number[]) => boolean };
  try {
    nav.vibrate?.(pattern);
  } catch {
    /* ignore */
  }
}
