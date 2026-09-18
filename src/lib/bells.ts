export type PackId =
  | "classic"
  | "christmas"
  | "spring"
  | "autumn"
  | "halloween"
  | "exclusive";

export type BellShape =
  | "classic"
  | "slim"
  | "dome"
  | "tulip"
  | "faceted"
  | "fluted"
  | "pagoda"
  | "teardrop"
  | "cathedral"
  | "lotus";

export type HandleKind = "loop" | "knob" | "stem" | "spire";

export type Decoration = "none" | "ribbon" | "holly" | "flower" | "leaf" | "web" | "crown";

export type Finish = {
  /** Gradient stops for the bell body, light -> dark. */
  stops: [string, string, string, string];
  /** Specular highlight colour. */
  highlight: string;
  /** Inner shadow / mouth colour. */
  shadow: string;
  /** Accent used for handle, bands and clapper. */
  accent: string;
  /** Colour used for ribbons / decorations. */
  trim: string;
};

export type Tone = {
  /** Fundamental frequency in Hz. */
  base: number;
  /** Inharmonic partial ratios of a struck metal bell. */
  partials: number[];
  /** Overall decay in seconds. */
  decay: number;
  /** 0..1, how much high partial energy survives. */
  brightness: number;
};

export type Bell = {
  id: string;
  pack: PackId;
  name: { en: string; sv: string };
  shape: BellShape;
  handle: HandleKind;
  decoration: Decoration;
  /** Engraved band near the rim. */
  band: boolean;
  finish: Finish;
  tone: Tone;
};

export const PACKS: {
  id: PackId;
  name: { en: string; sv: string };
  premium: boolean;
}[] = [
  { id: "classic", name: { en: "Classic Collection", sv: "Klassiska samlingen" }, premium: false },
  { id: "christmas", name: { en: "Christmas", sv: "Jul" }, premium: true },
  { id: "spring", name: { en: "Spring & Summer", sv: "Vår & sommar" }, premium: true },
  { id: "autumn", name: { en: "Autumn", sv: "Höst" }, premium: true },
  { id: "halloween", name: { en: "Halloween", sv: "Halloween" }, premium: true },
  { id: "exclusive", name: { en: "Exclusive", sv: "Exklusivt" }, premium: true },
];

const gold: Finish = {
  stops: ["#fff6da", "#f0cd7a", "#c2932f", "#6f4f11"],
  highlight: "#fffdf4",
  shadow: "#3b2807",
  accent: "#e3bd5f",
  trim: "#9e1b2f",
};
const roseGold: Finish = {
  stops: ["#fff0e8", "#f3c3ab", "#cd8f74", "#75462f"],
  highlight: "#fff8f4",
  shadow: "#3d2016",
  accent: "#e6b39a",
  trim: "#e7a7b4",
};
const silver: Finish = {
  stops: ["#ffffff", "#e2e8ee", "#a5b0ba", "#59626c"],
  highlight: "#ffffff",
  shadow: "#282e34",
  accent: "#ccd4dc",
  trim: "#b8c2cc",
};
const porcelain: Finish = {
  stops: ["#ffffff", "#f8f7f4", "#ded9d0", "#9d978f"],
  highlight: "#ffffff",
  shadow: "#6b665f",
  accent: "#dcc79a",
  trim: "#d8cfbf",
};
const onyx: Finish = {
  stops: ["#767b82", "#3b4046", "#1c2024", "#08090b"],
  highlight: "#cbd3dc",
  shadow: "#000000",
  accent: "#8d959e",
  trim: "#5c636b",
};
const bronze: Finish = {
  stops: ["#f7e2bd", "#d7a763", "#98672a", "#48300f"],
  highlight: "#fff6e3",
  shadow: "#291806",
  accent: "#c6904b",
  trim: "#8a5a22",
};
const champagne: Finish = {
  stops: ["#fffbf2", "#eeddc0", "#c6b08a", "#786745"],
  highlight: "#fffdf8",
  shadow: "#3d321d",
  accent: "#ddc8a0",
  trim: "#cdb488",
};
const emerald: Finish = {
  stops: ["#d9f5ea", "#79c7a8", "#1f6f52", "#08331f"],
  highlight: "#f1fff9",
  shadow: "#041c11",
  accent: "#e0c173",
  trim: "#8fb884",
};
const ruby: Finish = {
  stops: ["#ffe2e4", "#e5858f", "#a32c3e", "#4c0d18"],
  highlight: "#fff4f5",
  shadow: "#280610",
  accent: "#e0b060",
  trim: "#9e1b2f",
};
const sapphire: Finish = {
  stops: ["#e2ecff", "#8fadec", "#37589f", "#111e42"],
  highlight: "#f4f8ff",
  shadow: "#0a1128",
  accent: "#dcc07a",
  trim: "#9db6ee",
};
const copperLeaf: Finish = {
  stops: ["#ffe9d1", "#e0a466", "#a25b23", "#4f260a"],
  highlight: "#fff4e6",
  shadow: "#2a1205",
  accent: "#d99a5c",
  trim: "#c05f1c",
};
const pearl: Finish = {
  stops: ["#ffffff", "#f7effa", "#ded0e4", "#978a9f"],
  highlight: "#ffffff",
  shadow: "#544961",
  accent: "#e5d7ea",
  trim: "#cbb9d4",
};
const blush: Finish = {
  stops: ["#fff5f8", "#fbd3de", "#dc9cb0", "#814d60"],
  highlight: "#fffafc",
  shadow: "#42222e",
  accent: "#e8c07f",
  trim: "#f2bdcc",
};
const sage: Finish = {
  stops: ["#f2f7e9", "#c8d8b4", "#87a077", "#3d4d33"],
  highlight: "#fbfdf4",
  shadow: "#212b1b",
  accent: "#d9c68d",
  trim: "#a8bf92",
};
const pumpkin: Finish = {
  stops: ["#ffeacd", "#f5a94f", "#c06414", "#582b05"],
  highlight: "#fff6e8",
  shadow: "#2c1403",
  accent: "#e8a055",
  trim: "#3a2a12",
};
const violet: Finish = {
  stops: ["#f1e6ff", "#c0a0ef", "#6c43ad", "#291648"],
  highlight: "#f9f4ff",
  shadow: "#150b26",
  accent: "#c4a7f0",
  trim: "#8a6dbd",
};
const crystal: Finish = {
  stops: ["#ffffff", "#eef6fb", "#cfe0ea", "#8fa3b1"],
  highlight: "#ffffff",
  shadow: "#7d8f9c",
  accent: "#dcc78f",
  trim: "#cfe0ea",
};

const tone = (base: number, decay: number, brightness: number, partials?: number[]): Tone => ({
  base,
  decay,
  brightness,
  partials: partials ?? [1, 2.02, 2.68, 3.47, 4.16, 5.43, 6.79, 8.21],
});

export const BELLS: Bell[] = [
  // ---- Classic (included) ----
  {
    id: "aurum",
    pack: "classic",
    name: { en: "Aurum Gold", sv: "Aurum guld" },
    shape: "classic",
    handle: "loop",
    decoration: "none",
    band: true,
    finish: gold,
    tone: tone(523, 6.5, 0.85),
  },
  {
    id: "rosalie",
    pack: "classic",
    name: { en: "Rosalie", sv: "Rosalie" },
    shape: "tulip",
    handle: "knob",
    decoration: "none",
    band: true,
    finish: roseGold,
    tone: tone(587, 5.8, 0.78),
  },
  {
    id: "lumen",
    pack: "classic",
    name: { en: "Lumen Silver", sv: "Lumen silver" },
    shape: "slim",
    handle: "stem",
    decoration: "none",
    band: false,
    finish: silver,
    tone: tone(698, 5.2, 0.92),
  },
  {
    id: "ivoire",
    pack: "classic",
    name: { en: "Ivoire", sv: "Ivoire" },
    shape: "dome",
    handle: "knob",
    decoration: "none",
    band: true,
    finish: porcelain,
    tone: tone(440, 4.6, 0.6),
  },
  {
    id: "noir",
    pack: "classic",
    name: { en: "Noir Onyx", sv: "Noir onyx" },
    shape: "faceted",
    handle: "loop",
    decoration: "none",
    band: false,
    finish: onyx,
    tone: tone(392, 6.9, 0.7),
  },
  {
    id: "vesper",
    pack: "classic",
    name: { en: "Vesper Bronze", sv: "Vesper brons" },
    shape: "cathedral",
    handle: "loop",
    decoration: "none",
    band: true,
    finish: bronze,
    tone: tone(311, 8.5, 0.66),
  },
  {
    id: "champagne",
    pack: "classic",
    name: { en: "Champagne", sv: "Champagne" },
    shape: "fluted",
    handle: "stem",
    decoration: "none",
    band: true,
    finish: champagne,
    tone: tone(622, 6.0, 0.82),
  },
  {
    id: "perle",
    pack: "classic",
    name: { en: "Perle", sv: "Perle" },
    shape: "teardrop",
    handle: "knob",
    decoration: "none",
    band: false,
    finish: pearl,
    tone: tone(784, 4.4, 0.88),
  },
  {
    id: "cristal",
    pack: "classic",
    name: { en: "Cristal", sv: "Kristall" },
    shape: "lotus",
    handle: "spire",
    decoration: "none",
    band: true,
    finish: crystal,
    tone: tone(932, 4.0, 0.96),
  },
  {
    id: "salvia",
    pack: "classic",
    name: { en: "Salvia", sv: "Salvia" },
    shape: "pagoda",
    handle: "knob",
    decoration: "none",
    band: true,
    finish: sage,
    tone: tone(494, 5.4, 0.7),
  },

  // ---- Christmas ----
  {
    id: "noel",
    pack: "christmas",
    name: { en: "Noël Ribbon", sv: "Noël band" },
    shape: "classic",
    handle: "knob",
    decoration: "ribbon",
    band: true,
    finish: ruby,
    tone: tone(466, 6.2, 0.8),
  },
  {
    id: "holly",
    pack: "christmas",
    name: { en: "Holly & Berry", sv: "Järnek & bär" },
    shape: "dome",
    handle: "knob",
    decoration: "holly",
    band: true,
    finish: emerald,
    tone: tone(440, 5.6, 0.74),
  },
  {
    id: "starlight",
    pack: "christmas",
    name: { en: "Starlight", sv: "Stjärnljus" },
    shape: "pagoda",
    handle: "spire",
    decoration: "ribbon",
    band: false,
    finish: silver,
    tone: tone(880, 4.8, 0.95),
  },
  {
    id: "advent",
    pack: "christmas",
    name: { en: "Advent Gold", sv: "Adventsguld" },
    shape: "cathedral",
    handle: "loop",
    decoration: "holly",
    band: true,
    finish: gold,
    tone: tone(349, 8.0, 0.68),
  },

  // ---- Spring & Summer ----
  {
    id: "rosier",
    pack: "spring",
    name: { en: "Rosier", sv: "Rosier" },
    shape: "tulip",
    handle: "stem",
    decoration: "flower",
    band: true,
    finish: blush,
    tone: tone(659, 5.0, 0.86),
  },
  {
    id: "blossom",
    pack: "spring",
    name: { en: "Blossom", sv: "Blomning" },
    shape: "lotus",
    handle: "knob",
    decoration: "flower",
    band: true,
    finish: porcelain,
    tone: tone(740, 4.6, 0.9),
  },
  {
    id: "meadow",
    pack: "spring",
    name: { en: "Meadow", sv: "Ängsklocka" },
    shape: "slim",
    handle: "stem",
    decoration: "leaf",
    band: false,
    finish: sage,
    tone: tone(698, 5.4, 0.8),
  },
  {
    id: "azure",
    pack: "spring",
    name: { en: "Azure Summer", sv: "Azurblå sommar" },
    shape: "teardrop",
    handle: "knob",
    decoration: "ribbon",
    band: true,
    finish: sapphire,
    tone: tone(831, 4.2, 0.93),
  },

  // ---- Autumn ----
  {
    id: "amber",
    pack: "autumn",
    name: { en: "Amber Leaf", sv: "Ambrablad" },
    shape: "classic",
    handle: "knob",
    decoration: "leaf",
    band: true,
    finish: copperLeaf,
    tone: tone(415, 6.6, 0.72),
  },
  {
    id: "harvest",
    pack: "autumn",
    name: { en: "Harvest", sv: "Skörd" },
    shape: "dome",
    handle: "loop",
    decoration: "leaf",
    band: true,
    finish: bronze,
    tone: tone(370, 7.4, 0.66),
  },
  {
    id: "ember",
    pack: "autumn",
    name: { en: "Ember", sv: "Glöd" },
    shape: "fluted",
    handle: "stem",
    decoration: "none",
    band: true,
    finish: pumpkin,
    tone: tone(554, 5.9, 0.78),
  },

  // ---- Halloween ----
  {
    id: "hollowmoon",
    pack: "halloween",
    name: { en: "Hollow Moon", sv: "Ihålig måne" },
    shape: "faceted",
    handle: "spire",
    decoration: "web",
    band: false,
    finish: violet,
    tone: tone(277, 9.0, 0.6),
  },
  {
    id: "lantern",
    pack: "halloween",
    name: { en: "Lantern", sv: "Lykta" },
    shape: "pagoda",
    handle: "knob",
    decoration: "none",
    band: true,
    finish: pumpkin,
    tone: tone(330, 7.8, 0.64),
  },
  {
    id: "midnight",
    pack: "halloween",
    name: { en: "Midnight", sv: "Midnatt" },
    shape: "cathedral",
    handle: "loop",
    decoration: "web",
    band: false,
    finish: onyx,
    tone: tone(233, 10.0, 0.55),
  },

  // ---- Exclusive ----
  {
    id: "regina",
    pack: "exclusive",
    name: { en: "Regina", sv: "Regina" },
    shape: "cathedral",
    handle: "spire",
    decoration: "crown",
    band: true,
    finish: gold,
    tone: tone(262, 11.0, 0.7),
  },
  {
    id: "smaragd",
    pack: "exclusive",
    name: { en: "Smaragd", sv: "Smaragd" },
    shape: "lotus",
    handle: "spire",
    decoration: "crown",
    band: true,
    finish: emerald,
    tone: tone(588, 7.2, 0.88),
  },
  {
    id: "obsidienne",
    pack: "exclusive",
    name: { en: "Obsidienne", sv: "Obsidian" },
    shape: "faceted",
    handle: "loop",
    decoration: "crown",
    band: true,
    finish: onyx,
    tone: tone(311, 9.6, 0.62),
  },
];

export const DEFAULT_BELL: Bell = BELLS[0]!;
export const DEFAULT_BELL_ID = DEFAULT_BELL.id;

export function getBell(id: string): Bell {
  return BELLS.find((b) => b.id === id) ?? DEFAULT_BELL;
}

export function bellsByPack(pack: PackId): Bell[] {
  return BELLS.filter((b) => b.pack === pack);
}
