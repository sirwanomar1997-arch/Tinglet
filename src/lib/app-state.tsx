import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { DEFAULT_BELL_ID, getBell, type PackId, type Bell } from "./bells";
import { DEFAULT_BACKGROUND_ID, getBackground, type Background } from "./backgrounds";
import { detectLang, t as translate, type Lang, type TKey } from "./i18n";

type Persisted = {
  bellId: string;
  backgroundId: string;
  unlocked: PackId[];
  volume: number;
  haptics: boolean;
  shakeEnabled: boolean;
  lang: Lang | null;
};

const STORAGE_KEY = "elegant-hand-bell:v1";

const defaults: Persisted = {
  bellId: DEFAULT_BELL_ID,
  backgroundId: DEFAULT_BACKGROUND_ID,
  unlocked: [],
  volume: 0.9,
  haptics: true,
  shakeEnabled: true,
  lang: null,
};

type AppState = {
  hydrated: boolean;
  bell: Bell;
  background: Background;
  unlocked: PackId[];
  volume: number;
  haptics: boolean;
  shakeEnabled: boolean;
  lang: Lang;
  setBell: (id: string) => void;
  setBackground: (id: string) => void;
  unlockPack: (pack: PackId) => void;
  isUnlocked: (pack: PackId) => boolean;
  setVolume: (v: number) => void;
  setHaptics: (v: boolean) => void;
  setShakeEnabled: (v: boolean) => void;
  setLang: (l: Lang) => void;
  t: (key: TKey) => string;
};

const AppStateContext = createContext<AppState | null>(null);

function read(): Persisted {
  if (typeof window === "undefined") return defaults;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaults;
    const parsed = JSON.parse(raw) as Partial<Persisted>;
    return { ...defaults, ...parsed };
  } catch {
    return defaults;
  }
}

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Persisted>(defaults);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = read();
    setState({ ...stored, lang: stored.lang ?? detectLang() });
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage unavailable */
    }
  }, [state, hydrated]);

  const patch = useCallback((next: Partial<Persisted>) => {
    setState((prev) => ({ ...prev, ...next }));
  }, []);

  const lang: Lang = state.lang ?? "en";

  const value = useMemo<AppState>(
    () => ({
      hydrated,
      bell: getBell(state.bellId),
      background: getBackground(state.backgroundId),
      unlocked: state.unlocked,
      volume: state.volume,
      haptics: state.haptics,
      shakeEnabled: state.shakeEnabled,
      lang,
      setBell: (id) => patch({ bellId: id }),
      setBackground: (id) => patch({ backgroundId: id }),
      unlockPack: (pack) =>
        setState((prev) =>
          prev.unlocked.includes(pack)
            ? prev
            : { ...prev, unlocked: [...prev.unlocked, pack] },
        ),
      isUnlocked: (pack) => pack === "classic" || state.unlocked.includes(pack),
      setVolume: (v) => patch({ volume: v }),
      setHaptics: (v) => patch({ haptics: v }),
      setShakeEnabled: (v) => patch({ shakeEnabled: v }),
      setLang: (l) => patch({ lang: l }),
      t: (key) => translate(key, lang),
    }),
    [hydrated, state, lang, patch],
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState(): AppState {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error("useAppState must be used inside AppStateProvider");
  return ctx;
}
