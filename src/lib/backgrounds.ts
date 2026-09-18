export type BackgroundGroup =
  | "gradient"
  | "stone"
  | "nature"
  | "solid"
  | "festive"
  | "moody";

import { DELUXE_BACKGROUND_IMAGES } from "@/lib/background-assets";

export type Background = {
  id: string;
  name: { en: string; sv: string };
  group: BackgroundGroup;
  /** Whether foreground text should be light or dark. */
  tone: "light" | "dark";
  /** Layered CSS background (topmost layer first). */
  image: string;
  /** Optional high-resolution artwork used by deluxe backgrounds. */
  asset?: string;
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

export const FREE_BACKGROUND_IDS = [
  "champagne-mist",
  "blush-silk",
  "azure-dawn",
  "pearl-grey",
  "carrara",
  "ivory",
  "smoked-emerald",
  "christmas-velvet",
  "navy",
  "charcoal",
] as const;

const DELUXE_BACKGROUNDS: Background[] = [
  { id: "emerald-silk", name: { en: "Emerald Silk", sv: "Smaragdsiden" }, group: "moody", tone: "light", color: "#092b24", image: "radial-gradient(ellipse at 50% 22%,rgba(231,211,157,.38),transparent 32%),repeating-linear-gradient(104deg,rgba(255,255,255,.025) 0 1px,transparent 1px 13px),linear-gradient(150deg,#174d40,#041914 78%)" },
  { id: "garnet-velvet", name: { en: "Garnet Velvet", sv: "Granatsammet" }, group: "moody", tone: "light", color: "#4d0c18", image: "radial-gradient(ellipse at 50% 30%,rgba(255,192,160,.28),transparent 48%),repeating-linear-gradient(95deg,rgba(0,0,0,.08) 0 2px,transparent 2px 10px),linear-gradient(155deg,#831f35,#2c0710 80%)" },
  { id: "rose-satin", name: { en: "Rose Satin", sv: "Rosensatin" }, group: "gradient", tone: "dark", color: "#e9cbd3", image: "radial-gradient(ellipse at 35% 12%,rgba(255,255,255,.95),transparent 38%),radial-gradient(ellipse at 80% 85%,rgba(192,107,135,.3),transparent 42%),linear-gradient(145deg,#fff3f5,#d6abb9)" },
  { id: "champagne-drape", name: { en: "Champagne Drape", sv: "Champagnedrapering" }, group: "gradient", tone: "dark", color: "#ead8b7", image: "radial-gradient(ellipse at 22% 0%,rgba(255,255,255,.9),transparent 40%),repeating-linear-gradient(82deg,rgba(122,83,32,.045) 0 3px,transparent 3px 24px),linear-gradient(155deg,#fff5df,#d7b982)" },
  { id: "midnight-atelier", name: { en: "Midnight Atelier", sv: "Midnattsateljé" }, group: "moody", tone: "light", color: "#111924", image: "radial-gradient(ellipse at 50% 28%,rgba(151,179,207,.34),transparent 43%),linear-gradient(135deg,rgba(212,175,92,.18) 0 1px,transparent 1px),linear-gradient(155deg,#25364b,#080d14 78%)" },
  { id: "pearl-shell", name: { en: "Pearl Shell", sv: "Pärlemorsskal" }, group: "gradient", tone: "dark", color: "#ebe8e2", image: "radial-gradient(circle at 18% 20%,rgba(244,189,214,.5),transparent 32%),radial-gradient(circle at 82% 70%,rgba(166,221,221,.5),transparent 35%),radial-gradient(circle at 52% 40%,#fff,transparent 50%),linear-gradient(145deg,#f5efe7,#d8e3e0)" },
  { id: "onyx-gold", name: { en: "Onyx & Gold", sv: "Onyx och guld" }, group: "stone", tone: "light", color: "#101112", image: "linear-gradient(112deg,transparent 38%,rgba(218,177,88,.46) 39%,transparent 40%),linear-gradient(72deg,transparent 58%,rgba(242,220,166,.22) 59%,transparent 60%),radial-gradient(circle at 50% 28%,#36383a,#08090a 72%)" },
  { id: "rose-marble", name: { en: "Rose Marble", sv: "Rosenmarmor" }, group: "stone", tone: "dark", color: "#ead7d4", image: "linear-gradient(118deg,transparent 28%,rgba(137,91,93,.22) 29%,transparent 31%),linear-gradient(68deg,transparent 62%,rgba(187,135,137,.25) 63%,transparent 65%),radial-gradient(circle at 45% 25%,#fff8f5,#d7b8b6)" },
  { id: "jade-lacquer", name: { en: "Jade Lacquer", sv: "Jadelack" }, group: "moody", tone: "light", color: "#123b35", image: "radial-gradient(ellipse at 48% 22%,rgba(235,218,166,.42),transparent 38%),linear-gradient(115deg,rgba(255,255,255,.08),transparent 28%),linear-gradient(155deg,#28665a,#081d1a 78%)" },
  { id: "porcelain-botanical", name: { en: "Porcelain Botanical", sv: "Porslinsbotanik" }, group: "nature", tone: "dark", color: "#f0eee7", image: "radial-gradient(ellipse at 8% 82%,rgba(81,119,84,.32),transparent 24%),radial-gradient(ellipse at 91% 17%,rgba(126,151,105,.26),transparent 25%),radial-gradient(circle at 17% 87%,rgba(191,116,135,.25),transparent 12%),linear-gradient(#fffdf8,#e3e2d8)" },
  { id: "burgundy-brocade", name: { en: "Burgundy Brocade", sv: "Bordeauxbrokad" }, group: "festive", tone: "light", color: "#4b101b", image: "repeating-radial-gradient(ellipse at 50% 50%,rgba(221,182,111,.12) 0 2px,transparent 3px 21px),radial-gradient(circle at 50% 25%,#81263a,#30070f 72%)" },
  { id: "ivory-damask", name: { en: "Ivory Damask", sv: "Elfenbensdamast" }, group: "festive", tone: "dark", color: "#eee4d1", image: "repeating-radial-gradient(ellipse at 50% 50%,rgba(147,112,61,.09) 0 2px,transparent 3px 24px),radial-gradient(circle at 50% 25%,#fffdf4,#ddd0b7)" },
  { id: "plum-silk", name: { en: "Plum Silk", sv: "Plommonsiden" }, group: "moody", tone: "light", color: "#29152f", image: "radial-gradient(ellipse at 48% 24%,rgba(224,167,207,.3),transparent 42%),repeating-linear-gradient(101deg,rgba(255,255,255,.025) 0 1px,transparent 1px 12px),linear-gradient(150deg,#542c5e,#170b1b 80%)" },
  { id: "powder-rose", name: { en: "Powder Rose", sv: "Puderrosa" }, group: "gradient", tone: "dark", color: "#e8cbd0", image: "radial-gradient(circle at 50% 18%,#fffaf9,transparent 40%),linear-gradient(155deg,#f9e8ea,#cfabb2)" },
  { id: "cobalt-glass", name: { en: "Cobalt Glass", sv: "Koboltglas" }, group: "moody", tone: "light", color: "#10274d", image: "radial-gradient(ellipse at 45% 22%,rgba(146,196,255,.38),transparent 42%),linear-gradient(118deg,rgba(255,255,255,.09),transparent 24%),linear-gradient(155deg,#24528b,#08142b 80%)" },
  { id: "alabaster-relief", name: { en: "Alabaster Relief", sv: "Alabasterrelief" }, group: "stone", tone: "dark", color: "#ece7dc", image: "repeating-linear-gradient(35deg,rgba(128,111,79,.05) 0 1px,transparent 1px 16px),radial-gradient(circle at 50% 28%,#fffdf8,#d8d0c1)" },
  { id: "forest-brocade", name: { en: "Forest Brocade", sv: "Skogsbrokad" }, group: "nature", tone: "light", color: "#183525", image: "radial-gradient(ellipse at 8% 88%,rgba(158,185,118,.35),transparent 30%),radial-gradient(ellipse at 92% 13%,rgba(206,185,112,.25),transparent 28%),linear-gradient(150deg,#315940,#0b1e13 80%)" },
  { id: "moonstone", name: { en: "Moonstone", sv: "Månsten" }, group: "gradient", tone: "dark", color: "#dce2e5", image: "radial-gradient(circle at 38% 22%,rgba(255,255,255,.95),transparent 34%),radial-gradient(circle at 76% 75%,rgba(163,184,208,.38),transparent 40%),linear-gradient(145deg,#f1f4f4,#c4cdd3)" },
  { id: "antique-mirror", name: { en: "Antique Mirror", sv: "Antikspegel" }, group: "stone", tone: "dark", color: "#d5c7ae", image: "linear-gradient(110deg,transparent 25%,rgba(255,255,255,.4) 27%,transparent 29%),radial-gradient(circle at 50% 30%,#eee5d5,#b9a789 74%)" },
  { id: "black-satin", name: { en: "Black Satin", sv: "Svart satin" }, group: "moody", tone: "light", color: "#111113", image: "radial-gradient(ellipse at 42% 15%,rgba(255,255,255,.22),transparent 35%),repeating-linear-gradient(100deg,rgba(255,255,255,.018) 0 1px,transparent 1px 10px),linear-gradient(150deg,#29292d,#060607 80%)" },
  { id: "winter-palace", name: { en: "Winter Palace", sv: "Vinterpalats" }, group: "festive", tone: "dark", color: "#e8eef1", image: "radial-gradient(circle at 15% 20%,rgba(255,255,255,.95) 0 2px,transparent 3px),radial-gradient(circle at 80% 30%,rgba(255,255,255,.9) 0 2px,transparent 3px),radial-gradient(ellipse at 50% 80%,rgba(132,168,196,.38),transparent 45%),linear-gradient(#f8fbfc,#cbdce7)" },
  { id: "gilded-holiday", name: { en: "Gilded Holiday", sv: "Förgylld högtid" }, group: "festive", tone: "light", color: "#332714", image: "radial-gradient(circle at 18% 22%,rgba(255,223,138,.75) 0 2px,transparent 5px),radial-gradient(circle at 83% 35%,rgba(255,226,152,.65) 0 2px,transparent 5px),radial-gradient(ellipse at 50% 35%,rgba(214,170,80,.35),transparent 45%),linear-gradient(#51401e,#181106)" },
  { id: "spring-atelier", name: { en: "Spring Atelier", sv: "Vårateljé" }, group: "nature", tone: "dark", color: "#e8e4d3", image: "radial-gradient(ellipse at 8% 80%,rgba(132,166,117,.35),transparent 26%),radial-gradient(circle at 17% 87%,rgba(230,155,178,.38),transparent 12%),radial-gradient(ellipse at 92% 15%,rgba(173,190,130,.28),transparent 25%),linear-gradient(#fffaf0,#d8d8c0)" },
  { id: "terracotta-villa", name: { en: "Terracotta Villa", sv: "Terrakottavilla" }, group: "stone", tone: "light", color: "#7b3e2f", image: "repeating-linear-gradient(90deg,rgba(255,236,204,.05) 0 1px,transparent 1px 18px),radial-gradient(circle at 50% 25%,#b8684d,#4a211b)" },
  { id: "aqua-crystal", name: { en: "Aqua Crystal", sv: "Akvakristall" }, group: "gradient", tone: "dark", color: "#cce3e2", image: "linear-gradient(125deg,transparent 30%,rgba(255,255,255,.5) 31%,transparent 33%),radial-gradient(circle at 48% 23%,#f9ffff,#a9cdcc)" },
  { id: "copper-patina", name: { en: "Copper Patina", sv: "Kopparpatina" }, group: "stone", tone: "light", color: "#22564f", image: "radial-gradient(circle at 22% 18%,rgba(200,136,85,.34),transparent 30%),radial-gradient(circle at 78% 72%,rgba(71,158,141,.45),transparent 35%),linear-gradient(145deg,#39776c,#12342f)" },
  { id: "lilac-couture", name: { en: "Lilac Couture", sv: "Syrencouture" }, group: "gradient", tone: "dark", color: "#ded1e5", image: "radial-gradient(ellipse at 35% 12%,rgba(255,255,255,.95),transparent 38%),radial-gradient(ellipse at 78% 84%,rgba(153,113,177,.32),transparent 40%),linear-gradient(145deg,#f8eff9,#c4add1)" },
  { id: "mahogany-panel", name: { en: "Mahogany Panel", sv: "Mahognypanel" }, group: "moody", tone: "light", color: "#35140e", image: "repeating-linear-gradient(93deg,rgba(255,205,150,.035) 0 2px,transparent 2px 20px),radial-gradient(ellipse at 50% 20%,rgba(214,139,91,.3),transparent 45%),linear-gradient(150deg,#642a1c,#1e0906 80%)" },
  { id: "silver-filigree", name: { en: "Silver Filigree", sv: "Silverfiligran" }, group: "festive", tone: "dark", color: "#d9dde0", image: "repeating-radial-gradient(ellipse at 50% 50%,rgba(93,109,119,.09) 0 2px,transparent 3px 22px),radial-gradient(circle at 50% 25%,#fbfcfc,#bdc5ca)" },
  { id: "gold-leaf", name: { en: "Gold Leaf", sv: "Bladguld" }, group: "festive", tone: "dark", color: "#d5b569", image: "linear-gradient(118deg,transparent 30%,rgba(255,245,193,.56) 31%,transparent 34%),linear-gradient(62deg,transparent 60%,rgba(117,75,18,.18) 61%,transparent 63%),radial-gradient(circle at 48% 25%,#f4dc93,#ae812e)" },
  { id: "cognac-leather", name: { en: "Cognac Leather", sv: "Cognacsläder" }, group: "moody", tone: "light", color: "#4b1d10", image: "linear-gradient(155deg,#7d3520,#281008)" },
];

DELUXE_BACKGROUNDS.forEach((background) => {
  const asset = DELUXE_BACKGROUND_IMAGES[background.id];
  if (asset) background.asset = asset;
});

const freeBackgrounds = BACKGROUNDS.filter((background) =>
  (FREE_BACKGROUND_IDS as readonly string[]).includes(background.id),
);
BACKGROUNDS.splice(0, BACKGROUNDS.length, ...freeBackgrounds, ...DELUXE_BACKGROUNDS);

export function isPremiumBackground(id: string): boolean {
  return !(FREE_BACKGROUND_IDS as readonly string[]).includes(id);
}

export function getBackground(id: string): Background {
  return BACKGROUNDS.find((b) => b.id === id) ?? DEFAULT_BACKGROUND;
}
