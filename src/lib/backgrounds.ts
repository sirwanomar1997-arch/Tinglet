import { PREMIUM_BACKGROUND_IMAGES } from "@/lib/background-assets";

export type BackgroundGroup = "minimal" | "couture" | "nature" | "seasonal" | "heritage";

export type Background = {
  id: string;
  name: { en: string; sv: string };
  group: BackgroundGroup;
  tone: "light" | "dark";
  image: string;
  asset?: string;
  color: string;
};

const free = (
  id: string,
  en: string,
  sv: string,
  tone: Background["tone"],
  color: string,
  image: string,
): Background => ({ id, name: { en, sv }, group: "minimal", tone, color, image });

export const FREE_BACKGROUND_IDS = ["soft-ivory"] as const;

const FREE_BACKGROUNDS: Background[] = [
  free("soft-ivory", "Soft Ivory", "Mjuk elfenben", "dark", "#f4ede2", "linear-gradient(165deg,#fbf7f0 0%,#eee2d2 100%)"),
  free("powder-pink", "Powder Pink", "Puderrosa", "dark", "#ead2d7", "radial-gradient(circle at 50% 18%,#fff7f7 0%,transparent 54%),linear-gradient(165deg,#f6e5e7,#dbb8c0)"),
  free("quiet-sage", "Quiet Sage", "Lugn salvia", "dark", "#bac3ae", "radial-gradient(circle at 50% 12%,rgba(255,255,255,.5),transparent 55%),linear-gradient(165deg,#d5dbc9,#9eaa91)"),
  free("deep-garnet", "Deep Garnet", "Djup granat", "light", "#52131f", "radial-gradient(circle at 50% 15%,rgba(255,213,185,.18),transparent 48%),linear-gradient(165deg,#76253a,#310913)"),
  free("dark-emerald", "Dark Emerald", "Mörk smaragd", "light", "#17392d", "radial-gradient(circle at 50% 13%,rgba(221,233,203,.16),transparent 52%),linear-gradient(165deg,#285442,#0b241b)"),
];

const premiumDetails: Array<[
  keyof typeof PREMIUM_BACKGROUND_IMAGES,
  string,
  string,
  BackgroundGroup,
  Background["tone"],
  string,
]> = [
  ["champagne-gold", "Champagne Gold", "Champagneguld", "couture", "dark", "#d9c49a"],
  ["ivory-marble", "Floral Ivory Marble", "Blommig elfenbensmarmor", "heritage", "dark", "#e8e0d4"],
  ["blush-panel", "Blush Panel", "Rosapanel", "heritage", "dark", "#ddc2c3"],
  ["silver-relief", "Silver Relief", "Silverrelief", "heritage", "dark", "#cdd0cf"],
  ["cognac-leather", "Cognac Leather", "Cognacsläder", "heritage", "light", "#6b3d2c"],
  ["dark-leather", "Midnight Leather", "Midnattsskinn", "heritage", "light", "#2d211d"],
  ["alabaster-panel", "Alabaster Panel", "Alabasterpanel", "heritage", "dark", "#e3ded3"],
  ["ivory-nouveau", "Ivory Nouveau", "Elfenben nouveau", "heritage", "dark", "#e9e1d4"],
  ["celadon-porcelain", "Celadon Porcelain", "Celadonporslin", "heritage", "dark", "#bac8bd"],
  ["emerald-stone", "Emerald Stone", "Smaragdsten", "heritage", "light", "#315145"],
  ["forest-relief", "Forest Relief", "Skogsrelief", "heritage", "light", "#344c3b"],
  ["moonstone", "Moonstone", "Månsten", "couture", "dark", "#ccd3d3"],
  ["rose-quartz", "Rose Quartz", "Rosenkvarts", "couture", "dark", "#dfc4c6"],
  ["blush-pearl", "Blush Pearl", "Rosa pärla", "couture", "dark", "#e4cdd0"],
  ["petal-linen", "Petal Linen", "Kronbladslinne", "couture", "dark", "#dfc8c2"],
  ["dusky-rose", "Dusky Rose", "Skymningsros", "couture", "dark", "#b88e92"],
  ["lavender-dawn", "Lavender Dawn", "Lavendelgryning", "couture", "dark", "#d1c9d7"],
  ["smoky-quartz", "Smoky Quartz", "Rökkvarts", "couture", "light", "#796e68"],
  ["sandstone", "Sculpted Sandstone", "Skulpterad sandsten", "heritage", "dark", "#d5c1a6"],
  ["sage-embroidery", "Sage Embroidery", "Salviabroderi", "nature", "dark", "#b8c0aa"],
  ["wildflower-linen", "Wildflower Linen", "Vildblomslinne", "nature", "dark", "#ded6c6"],
  ["pressed-fern", "Pressed Fern", "Pressad ormbunke", "nature", "dark", "#c6c8ae"],
  ["floral-dawn", "Floral Dawn", "Blomgryning", "nature", "dark", "#e3d4ce"],
  ["blossom-dawn", "Blossom Dawn", "Blomstergryning", "nature", "dark", "#e5d6d3"],
  ["mist-woodland", "Mist Woodland", "Dimmig skog", "nature", "light", "#677469"],
  ["autumn-frame", "Autumn Frame", "Höstram", "seasonal", "dark", "#d6c3a5"],
  ["evergreen-border", "Evergreen Noël", "Vintergrön jul", "seasonal", "dark", "#d9d4c2"],
  ["winter-ivory", "Winter Ivory", "Vinterelfenben", "seasonal", "dark", "#e5e4df"],
  ["snow-crystal", "Snow Crystal", "Snökristall", "seasonal", "dark", "#dce2e3"],
  ["halloween-moon", "Halloween Moon", "Halloweenmåne", "seasonal", "light", "#34323a"],
];

const PREMIUM_BACKGROUNDS: Background[] = premiumDetails.map(
  ([id, en, sv, group, tone, color]) => ({
    id,
    name: { en, sv },
    group,
    tone,
    color,
    image: "linear-gradient(180deg,transparent,transparent)",
    asset: PREMIUM_BACKGROUND_IMAGES[id],
  }),
);

export const BACKGROUNDS: Background[] = [...FREE_BACKGROUNDS, ...PREMIUM_BACKGROUNDS];
export const DEFAULT_BACKGROUND = FREE_BACKGROUNDS[0]!;
export const DEFAULT_BACKGROUND_ID = DEFAULT_BACKGROUND.id;

export function isPremiumBackground(id: string): boolean {
  return !(FREE_BACKGROUND_IDS as readonly string[]).includes(id);
}

export function getBackground(id: string): Background {
  return BACKGROUNDS.find((background) => background.id === id) ?? DEFAULT_BACKGROUND;
}