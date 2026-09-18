import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "app.tringlet.bell",
  appName: "Tringlet",
  // The native shell loads the published Tringlet site, so the app always has
  // the latest bells and backgrounds. Purchases run through the native store
  // billing plugin, not through the website.
  webDir: "public",
  server: {
    url: "https://tringlet.lovable.app",
    cleartext: false,
  },
  android: {
    backgroundColor: "#f6efe4",
  },
  ios: {
    backgroundColor: "#f6efe4",
  },
};

export default config;
