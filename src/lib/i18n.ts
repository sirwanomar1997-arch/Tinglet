export type Lang = "en" | "sv";

const dict = {
  appName: { en: "Tringlet", sv: "Tringlet" },
  home: { en: "Home", sv: "Hem" },
  bells: { en: "Bells", sv: "Klockor" },
  backgrounds: { en: "Backgrounds", sv: "Bakgrunder" },
  bellAndBackground: { en: "Bell & background", sv: "Klocka & bakgrund" },
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
  chooseCollection: { en: "Choose your hand bell & background", sv: "Välj din handklocka & bakgrund" },
  chooseCollectionSub: {
    en: "Create your own combination. Your choices are applied instantly.",
    sv: "Skapa din egen kombination. Dina val används direkt.",
  },
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
  unlockPremium: { en: "Unlock everything · SEK 39", sv: "Lås upp allt · 39 kr" },
  premiumBundle: {
    en: "One purchase unlocks every premium design.",
    sv: "Ett köp låser upp alla premiumdesigner.",
  },
  restorePurchase: { en: "Restore purchase", sv: "Återställ köp" },
  unlocked: { en: "Unlocked", sv: "Upplåst" },
  packUnlocked: { en: "Pack unlocked", sv: "Paketet är upplåst" },
  freeForNow: { en: "One purchase", sv: "Ett köp" },
  freeCollection: { en: "Free bell", sv: "Gratis klocka" },
  premiumCollection: { en: "Premium bells", sv: "Premiumklockor" },
  premiumCollectionSub: { en: "All premium designs · SEK 39", sv: "Alla premiumdesigner · 39 kr" },
  premiumEverything: { en: "The complete Tringlet collection", sv: "Hela Tringlet-kollektionen" },
  premiumEverythingSub: {
    en: "Unlock every premium hand bell and background. Available to choose immediately.",
    sv: "Lås upp alla premiumklockor och bakgrunder. Kan väljas direkt efter köpet.",
  },
  handBells: { en: "Hand bells", sv: "Handklockor" },
  viewCollection: { en: "View collection", sv: "Visa samlingen" },
  closeCollection: { en: "Back to collections", sv: "Tillbaka till samlingar" },
  freeBackgrounds: { en: "Free background", sv: "Gratis bakgrund" },
  deluxeBackgrounds: { en: "Deluxe backgrounds", sv: "Deluxebakgrunder" },
  deluxeBackgroundsSub: { en: "30 exclusive backgrounds · included in Premium", sv: "30 exklusiva bakgrunder · ingår i Premium" },
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
