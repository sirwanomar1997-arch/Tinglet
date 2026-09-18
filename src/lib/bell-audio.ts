import type { Tone } from "./bells";
import handBellAsset from "@/assets/audio/signature-handbell.mp3.asset.json";

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let handBellBuffer: AudioBuffer | null = null;
let handBellLoading: Promise<void> | null = null;

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

function loadHandBell(context: AudioContext): Promise<void> {
  if (handBellBuffer) return Promise.resolve();
  if (handBellLoading) return handBellLoading;
  handBellLoading = fetch(handBellAsset.url)
    .then((response) => {
      if (!response.ok) throw new Error(`Bell audio failed: ${response.status}`);
      return response.arrayBuffer();
    })
    .then((data) => context.decodeAudioData(data))
    .then((buffer) => {
      handBellBuffer = buffer;
    })
    .catch(() => {
      handBellBuffer = null;
    });
  return handBellLoading;
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
  await loadHandBell(context);
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
  const force = Math.max(0.14, Math.min(1, intensity));

  if (handBellBuffer) {
    const source = context.createBufferSource();
    source.buffer = handBellBuffer;
    source.playbackRate.value = 0.985 + force * 0.025;

    const presence = context.createBiquadFilter();
    presence.type = "peaking";
    presence.frequency.value = 2300;
    presence.Q.value = 0.7;
    presence.gain.value = 2.2;

    const compressor = context.createDynamicsCompressor();
    compressor.threshold.value = -12;
    compressor.knee.value = 8;
    compressor.ratio.value = 3;
    compressor.attack.value = 0.004;
    compressor.release.value = 0.18;

    const gain = context.createGain();
    const level = Math.max(0, Math.min(1, volume)) * (0.72 + force * 0.58);
    gain.gain.setValueAtTime(level, now);
    gain.gain.exponentialRampToValueAtTime(Math.max(0.0001, level * 0.72), now + 2.3);

    source.connect(presence);
    presence.connect(compressor);
    compressor.connect(gain);
    gain.connect(master);
    source.start(now);
    return;
  }

  void loadHandBell(context);
  const bus = context.createGain();
  bus.gain.value = Math.max(0, Math.min(1, volume)) * (0.2 + force * 0.34);
  const warmth = context.createBiquadFilter();
  warmth.type = "lowpass";
  warmth.frequency.value = 3100 + force * 1200;
  warmth.Q.value = 0.42;
  bus.disconnect();
  bus.connect(warmth);
  warmth.connect(master);

  strikeNoise(context, bus, now, 0.018 + force * 0.025);

  tone.partials.slice(0, 6).forEach((ratio, index) => {
    // Every visual design uses the same carefully voiced, soft hand-bell timbre.
    const handBellBase = 784;
    const softPartials = [1, 2.01, 2.58, 3.44, 4.09, 5.2];
    const freq = handBellBase * (softPartials[index] ?? ratio);
    if (freq > 16000) return;

    const partialGain =
      (1 / (1 + index * 2.15)) * (index === 0 ? 0.52 : 0.25) * force;
    const decay = 1.9 * (index === 0 ? 1 : Math.pow(0.58, index) + 0.08);

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
