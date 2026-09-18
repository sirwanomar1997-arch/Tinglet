export type BackgroundGroup =
  | "gradient"
  | "stone"
  | "nature"
  | "solid"
  | "festive"
  | "moody";

export type Background = {
  id: string;
  name: { en: string; sv: string };
  group: BackgroundGroup;
  /** Whether foreground text should be light or dark. */
  tone: "light" | "dark";
  /** Layered CSS background (topmost layer first). */
  image: string;
  color: string;
};

export const BACKGROUND_GROUPS: { id: BackgroundGroup; name: { en: string; sv: string } }[] = [
  { id: "gradient", name: { en: "Soft gradients", sv: "Mjuka gradienter" } },
  { id: "stone", name: { en: "Marble & stone", sv: "Marmor & sten" } },
  { id: "nature", name: { en: "Nature", sv: "Natur" } },
  { id: "solid", name: { en: "Minimal colours", sv: "Minimala färger" } },
  { id: "festive", name: { en: "Festive", sv: "Festligt" } },
  { id: "moody", name: { en: "Dark & moody", sv: "Mörkt & stämningsfullt" } },
];

export const BACKGROUNDS: Background[] = [
  // ---- Soft gradients ----
  {
    id: "champagne-mist",
    name: { en: "Champagne Mist", sv: "Champagnedimma" },
    group: "gradient",
    tone: "dark",
    color: "#f6ecdd",
    image:
      "radial-gradient(120% 80% at 50% 8%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 60%), radial-gradient(90% 70% at 80% 100%, #e7cfa8 0%, rgba(231,207,168,0) 70%), linear-gradient(160deg, #fbf2e6 0%, #f0dfc6 55%, #e3cdaa 100%)",
  },
  {
    id: "blush-silk",
    name: { en: "Blush Silk", sv: "Rosenskimmer" },
    group: "gradient",
    tone: "dark",
    color: "#f8e9ec",
    image:
      "radial-gradient(100% 70% at 20% 0%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 60%), radial-gradient(90% 80% at 90% 90%, #e9b8c6 0%, rgba(233,184,198,0) 70%), linear-gradient(150deg, #fdf2f4 0%, #f3d9e0 60%, #e6bfcc 100%)",
  },
  {
    id: "azure-dawn",
    name: { en: "Azure Dawn", sv: "Azurgryning" },
    group: "gradient",
    tone: "dark",
    color: "#e8f1f8",
    image:
      "radial-gradient(110% 70% at 50% 0%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 65%), linear-gradient(165deg, #f2f8fc 0%, #dbeaf5 50%, #bfd6e8 100%)",
  },
  {
    id: "golden-hour",
    name: { en: "Golden Hour", sv: "Gyllene timmen" },
    group: "gradient",
    tone: "light",
    color: "#7a4a2a",
    image:
      "radial-gradient(80% 60% at 50% 95%, rgba(255,214,148,0.65) 0%, rgba(255,214,148,0) 70%), linear-gradient(170deg, #4a2b1c 0%, #8a4f2b 45%, #d98f4e 100%)",
  },
  {
    id: "pearl-grey",
    name: { en: "Pearl Grey", sv: "Perlgrå" },
    group: "gradient",
    tone: "dark",
    color: "#eceef1",
    image:
      "radial-gradient(100% 80% at 50% 10%, #ffffff 0%, rgba(255,255,255,0) 60%), linear-gradient(160deg, #f6f7f9 0%, #e4e7ec 55%, #cfd4db 100%)",
  },

  // ---- Marble & stone ----
  {
    id: "carrara",
    name: { en: "Carrara Marble", sv: "Carraramarmor" },
    group: "stone",
    tone: "dark",
    color: "#f2f1ee",
    image:
      "linear-gradient(115deg, rgba(160,162,165,0.35) 0%, rgba(160,162,165,0) 18%), linear-gradient(97deg, rgba(120,124,130,0.28) 0%, rgba(120,124,130,0) 12%), linear-gradient(72deg, rgba(150,152,156,0.25) 0%, rgba(150,152,156,0) 22%), radial-gradient(80% 60% at 30% 20%, #ffffff 0%, rgba(255,255,255,0) 70%), linear-gradient(160deg, #f8f8f6 0%, #e9e8e4 100%)",
  },
  {
    id: "nero-marble",
    name: { en: "Nero Marble", sv: "Svart marmor" },
    group: "stone",
    tone: "light",
    color: "#15171a",
    image:
      "linear-gradient(105deg, rgba(212,190,140,0.5) 0%, rgba(212,190,140,0) 10%), linear-gradient(80deg, rgba(220,225,232,0.22) 0%, rgba(220,225,232,0) 14%), radial-gradient(90% 70% at 70% 15%, rgba(90,96,104,0.55) 0%, rgba(90,96,104,0) 70%), linear-gradient(160deg, #1d2024 0%, #0c0e10 100%)",
  },
  {
    id: "travertine",
    name: { en: "Warm Travertine", sv: "Varm travertin" },
    group: "stone",
    tone: "dark",
    color: "#ece0cd",
    image:
      "repeating-linear-gradient(92deg, rgba(180,155,120,0.12) 0px, rgba(180,155,120,0) 6px, rgba(180,155,120,0.12) 14px), radial-gradient(90% 70% at 40% 15%, #fbf3e6 0%, rgba(251,243,230,0) 70%), linear-gradient(160deg, #f0e4d1 0%, #d9c6a8 100%)",
  },
  {
    id: "slate",
    name: { en: "Blue Slate", sv: "Blå skiffer" },
    group: "stone",
    tone: "light",
    color: "#2b3540",
    image:
      "repeating-linear-gradient(100deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0) 9px), radial-gradient(90% 70% at 60% 10%, rgba(120,140,165,0.5) 0%, rgba(120,140,165,0) 70%), linear-gradient(165deg, #3a4653 0%, #1b222a 100%)",
  },

  // ---- Nature ----
  {
    id: "rose-garden",
    name: { en: "Rose Garden", sv: "Rosenträdgård" },
    group: "nature",
    tone: "dark",
    color: "#f3dfe3",
    image:
      "radial-gradient(14% 10% at 18% 78%, rgba(226,138,163,0.75) 0%, rgba(226,138,163,0) 70%), radial-gradient(12% 9% at 76% 86%, rgba(214,120,148,0.65) 0%, rgba(214,120,148,0) 70%), radial-gradient(18% 12% at 50% 96%, rgba(150,180,140,0.55) 0%, rgba(150,180,140,0) 70%), linear-gradient(170deg, #fbf1f2 0%, #f0d9dd 60%, #d9bcc4 100%)",
  },
  {
    id: "forest-light",
    name: { en: "Forest Light", sv: "Skogsljus" },
    group: "nature",
    tone: "light",
    color: "#1f3327",
    image:
      "radial-gradient(40% 60% at 25% 0%, rgba(214,231,180,0.45) 0%, rgba(214,231,180,0) 70%), repeating-linear-gradient(88deg, rgba(0,0,0,0.12) 0px, rgba(0,0,0,0) 22px), linear-gradient(170deg, #3c5a3f 0%, #1d2f23 70%, #121c15 100%)",
  },
  {
    id: "fresh-snow",
    name: { en: "Fresh Snow", sv: "Nyfallen snö" },
    group: "nature",
    tone: "dark",
    color: "#eef3f7",
    image:
      "radial-gradient(2% 1.5% at 20% 30%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 70%), radial-gradient(2% 1.5% at 70% 20%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 70%), radial-gradient(100% 70% at 50% 100%, #cfdfec 0%, rgba(207,223,236,0) 70%), linear-gradient(170deg, #fbfdff 0%, #e6eef6 100%)",
  },
  {
    id: "autumn-leaves",
    name: { en: "Autumn Leaves", sv: "Höstlöv" },
    group: "nature",
    tone: "light",
    color: "#5a2f12",
    image:
      "radial-gradient(16% 11% at 22% 82%, rgba(230,150,60,0.7) 0%, rgba(230,150,60,0) 70%), radial-gradient(14% 10% at 78% 70%, rgba(190,80,40,0.65) 0%, rgba(190,80,40,0) 70%), radial-gradient(20% 14% at 50% 100%, rgba(150,95,30,0.7) 0%, rgba(150,95,30,0) 70%), linear-gradient(170deg, #7d4418 0%, #4a2610 70%, #2d160a 100%)",
  },
  {
    id: "soft-sky",
    name: { en: "Soft Sky", sv: "Mjuk himmel" },
    group: "nature",
    tone: "dark",
    color: "#e6effa",
    image:
      "radial-gradient(35% 22% at 25% 30%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 70%), radial-gradient(28% 18% at 75% 48%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%), linear-gradient(175deg, #cfe2f5 0%, #eaf2fb 60%, #fdf6ea 100%)",
  },

  // ---- Minimal colours ----
  {
    id: "ivory",
    name: { en: "Ivory", sv: "Elfenben" },
    group: "solid",
    tone: "dark",
    color: "#f7f3ec",
    image: "linear-gradient(180deg, #f9f6f0 0%, #f2ece1 100%)",
  },
  {
    id: "sand",
    name: { en: "Sand", sv: "Sand" },
    group: "solid",
    tone: "dark",
    color: "#e6d7c1",
    image: "linear-gradient(180deg, #ecdfcb 0%, #dccdb4 100%)",
  },
  {
    id: "sage-solid",
    name: { en: "Sage", sv: "Salvia" },
    group: "solid",
    tone: "light",
    color: "#7b8f79",
    image: "linear-gradient(180deg, #8b9e88 0%, #66795f 100%)",
  },
  {
    id: "navy",
    name: { en: "Deep Navy", sv: "Djup marinblå" },
    group: "solid",
    tone: "light",
    color: "#16223b",
    image: "linear-gradient(180deg, #1d2c4a 0%, #0f1829 100%)",
  },
  {
    id: "charcoal",
    name: { en: "Charcoal", sv: "Kolgrå" },
    group: "solid",
    tone: "light",
    color: "#1a1b1d",
    image: "linear-gradient(180deg, #232427 0%, #121314 100%)",
  },

  // ---- Festive ----
  {
    id: "christmas-velvet",
    name: { en: "Christmas Velvet", sv: "Julsammet" },
    group: "festive",
    tone: "light",
    color: "#54101c",
    image:
      "radial-gradient(70% 50% at 50% 10%, rgba(255,200,120,0.35) 0%, rgba(255,200,120,0) 70%), repeating-linear-gradient(96deg, rgba(0,0,0,0.12) 0px, rgba(0,0,0,0) 8px), linear-gradient(170deg, #7c1c2b 0%, #4a0e19 70%, #2b070e 100%)",
  },
  {
    id: "winter-gold",
    name: { en: "Winter Gold", sv: "Vinterguld" },
    group: "festive",
    tone: "light",
    color: "#2b2415",
    image:
      "radial-gradient(1.6% 1.2% at 30% 25%, rgba(255,226,150,0.9) 0%, rgba(255,226,150,0) 70%), radial-gradient(1.4% 1% at 68% 40%, rgba(255,226,150,0.8) 0%, rgba(255,226,150,0) 70%), radial-gradient(90% 60% at 50% 100%, rgba(206,168,86,0.45) 0%, rgba(206,168,86,0) 70%), linear-gradient(170deg, #3a3018 0%, #1d1809 100%)",
  },
  {
    id: "spring-festive",
    name: { en: "Pastel Celebration", sv: "Pastellfest" },
    group: "festive",
    tone: "dark",
    color: "#f6eef8",
    image:
      "radial-gradient(60% 40% at 15% 10%, rgba(255,214,231,0.8) 0%, rgba(255,214,231,0) 70%), radial-gradient(60% 40% at 90% 30%, rgba(214,232,255,0.8) 0%, rgba(214,232,255,0) 70%), radial-gradient(70% 50% at 50% 100%, rgba(235,225,255,0.9) 0%, rgba(235,225,255,0) 70%), linear-gradient(170deg, #fdf7fb 0%, #f1ebf7 100%)",
  },
  {
    id: "halloween-dusk",
    name: { en: "Halloween Dusk", sv: "Halloweenskymning" },
    group: "festive",
    tone: "light",
    color: "#2a1533",
    image:
      "radial-gradient(45% 30% at 78% 18%, rgba(255,170,70,0.5) 0%, rgba(255,170,70,0) 70%), radial-gradient(80% 60% at 30% 100%, rgba(90,40,120,0.6) 0%, rgba(90,40,120,0) 70%), linear-gradient(170deg, #3a1d47 0%, #1b0d23 100%)",
  },

  // ---- Dark & moody ----
  {
    id: "obsidian",
    name: { en: "Obsidian", sv: "Obsidian" },
    group: "moody",
    tone: "light",
    color: "#0b0c0e",
    image:
      "radial-gradient(70% 50% at 50% 0%, rgba(120,130,145,0.25) 0%, rgba(120,130,145,0) 70%), linear-gradient(170deg, #16181b 0%, #07080a 100%)",
  },
  {
    id: "smoked-emerald",
    name: { en: "Smoked Emerald", sv: "Rökig smaragd" },
    group: "moody",
    tone: "light",
    color: "#0d2620",
    image:
      "radial-gradient(70% 50% at 50% 5%, rgba(120,220,180,0.22) 0%, rgba(120,220,180,0) 70%), linear-gradient(170deg, #143a30 0%, #061512 100%)",
  },
  {
    id: "midnight-plum",
    name: { en: "Midnight Plum", sv: "Midnattsplommon" },
    group: "moody",
    tone: "light",
    color: "#1b1026",
    image:
      "radial-gradient(70% 50% at 50% 8%, rgba(190,150,240,0.25) 0%, rgba(190,150,240,0) 70%), linear-gradient(170deg, #2a1a3c 0%, #100a18 100%)",
  },
  {
    id: "candlelit",
    name: { en: "Candlelit", sv: "Levande ljus" },
    group: "moody",
    tone: "light",
    color: "#1a1208",
    image:
      "radial-gradient(45% 35% at 50% 35%, rgba(255,196,110,0.32) 0%, rgba(255,196,110,0) 70%), linear-gradient(170deg, #241a0d 0%, #0d0904 100%)",
  },
];

export const DEFAULT_BACKGROUND: Background = BACKGROUNDS[0]!;
export const DEFAULT_BACKGROUND_ID = DEFAULT_BACKGROUND.id;

export function getBackground(id: string): Background {
  return BACKGROUNDS.find((b) => b.id === id) ?? DEFAULT_BACKGROUND;
}
