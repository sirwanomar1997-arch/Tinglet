export type Lang = "en" | "sv";

const dict = {
  appName: { en: "Elegant Hand Bell", sv: "Elegant Handklocka" },
  home: { en: "Home", sv: "Hem" },
  bells: { en: "Bells", sv: "Klockor" },
  backgrounds: { en: "Backgrounds", sv: "Bakgrunder" },
  tapOrShake: { en: "Shake or tap to ring", sv: "Skaka eller tryck för att ringa" },
  tapToRing: { en: "Tap the bell to ring", sv: "Tryck på klockan för att ringa" },
  enableShake: { en: "Enable shake to ring", sv: "Aktivera skaka för att ringa" },
  shakeReady: { en: "Shake ready", sv: "Skakning aktiv" },
  settings: { en: "Settings", sv: "Inställningar" },
  volume: { en: "Volume", sv: "Volym" },
  haptics: { en: "Vibration", sv: "Vibration" },
  shake: { en: "Shake to ring", sv: "Skaka för att ringa" },
  language: { en: "Language", sv: "Språk" },
  chooseBell: { en: "Choose your bell", sv: "Välj din klocka" },
  chooseBellSub: {
    en: "Tap a bell to select it. Each one has its own tone.",
    sv: "Tryck på en klocka för att välja den. Varje klocka har sin egen klang.",
  },
  chooseBackground: { en: "Choose a background", sv: "Välj en bakgrund" },
  chooseBackgroundSub: {
    en: "Applied instantly and remembered.",
    sv: "Används direkt och sparas.",
  },
  selected: { en: "Selected", sv: "Vald" },
  included: { en: "Included", sv: "Ingår" },
  premium: { en: "Premium", sv: "Premium" },
  locked: { en: "Locked", sv: "Låst" },
  unlock: { en: "Unlock", sv: "Lås upp" },
  unlockPack: { en: "Unlock pack", sv: "Lås upp paket" },
  unlockPremium: { en: "Unlock all 40 · SEK 20", sv: "Lås upp alla 40 · 20 kr" },
  premiumBundle: {
    en: "One purchase unlocks every premium design.",
    sv: "Ett köp låser upp alla premiumdesigner.",
  },
  restorePurchase: { en: "Restore purchase", sv: "Återställ köp" },
  unlocked: { en: "Unlocked", sv: "Upplåst" },
  packUnlocked: { en: "Pack unlocked", sv: "Paketet är upplåst" },
  freeForNow: { en: "40 designs · one purchase", sv: "40 designer · ett köp" },
  freeCollection: { en: "30 free bells", sv: "30 gratis klockor" },
  premiumCollection: { en: "Premium bells", sv: "Premiumklockor" },
  premiumCollectionSub: { en: "40 designs · one purchase · SEK 20", sv: "40 designer · ett köp · 20 kr" },
  viewCollection: { en: "View collection", sv: "Visa samlingen" },
  closeCollection: { en: "Back to collections", sv: "Tillbaka till samlingar" },
  freeBackgrounds: { en: "10 free backgrounds", sv: "10 gratis bakgrunder" },
  deluxeBackgrounds: { en: "Deluxe backgrounds", sv: "Deluxebakgrunder" },
  deluxeBackgroundsSub: { en: "30 exclusive backgrounds", sv: "30 exklusiva bakgrunder" },
  preview: { en: "Preview", sv: "Förhandslyssna" },
  currentBell: { en: "Current bell", sv: "Vald klocka" },
  done: { en: "Done", sv: "Klar" },
} as const;

export type TKey = keyof typeof dict;

export function t(key: TKey, lang: Lang): string {
  return dict[key][lang];
}

export function detectLang(): Lang {
  if (typeof navigator === "undefined") return "en";
  const langs = [navigator.language, ...(navigator.languages ?? [])];
  return langs.some((l) => l?.toLowerCase().startsWith("sv")) ? "sv" : "en";
}
