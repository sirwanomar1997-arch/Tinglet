/**
 * Real in-app purchase layer.
 *
 * Native builds (Google Play / App Store) use the store billing APIs through
 * @capgo/native-purchases, so the store collects the money, keeps its share and
 * pays out the rest to the app owner. No third-party billing service is used.
 *
 * In the browser preview there is no store, so the purchase falls back to a
 * local demo unlock (nothing is charged).
 */

export const PREMIUM_PRODUCT_ID = "tringlet_premium_unlock";

export type PurchaseOutcome =
  | { status: "purchased" }
  | { status: "restored" }
  | { status: "cancelled" }
  | { status: "unavailable" }
  | { status: "demo" }
  | { status: "error"; message: string };

async function plugin() {
  if (typeof window === "undefined") return null;
  try {
    const { Capacitor } = await import("@capacitor/core");
    if (!Capacitor.isNativePlatform()) return null;
    const mod = await import("@capgo/native-purchases");
    return { api: mod.NativePurchases, inapp: mod.PURCHASE_TYPE.INAPP };
  } catch {
    return null;
  }
}

export async function isStoreAvailable(): Promise<boolean> {
  const p = await plugin();
  if (!p) return false;
  try {
    const res = await p.api.isBillingSupported();
    return Boolean(res?.isBillingSupported);
  } catch {
    return false;
  }
}

/** Localised store price (e.g. "39,00 kr"), or null when unavailable. */
export async function premiumPrice(): Promise<string | null> {
  const p = await plugin();
  if (!p) return null;
  try {
    const { product } = await p.api.getProduct({
      productIdentifier: PREMIUM_PRODUCT_ID,
      productType: p.inapp,
    });
    const info = product as { priceString?: string; price?: number; currencyCode?: string };
    if (info?.priceString) return info.priceString;
    if (typeof info?.price === "number") return `${info.price} ${info.currencyCode ?? ""}`.trim();
    return null;
  } catch {
    return null;
  }
}

export async function buyPremium(): Promise<PurchaseOutcome> {
  const p = await plugin();
  if (!p) return { status: "demo" };
  try {
    if (!(await isStoreAvailable())) return { status: "unavailable" };
    await p.api.purchaseProduct({
      productIdentifier: PREMIUM_PRODUCT_ID,
      productType: p.inapp,
      quantity: 1,
    });
    return { status: "purchased" };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    if (/cancel/i.test(message)) return { status: "cancelled" };
    return { status: "error", message };
  }
}

export async function restorePremium(): Promise<PurchaseOutcome> {
  const p = await plugin();
  if (!p) return { status: "demo" };
  try {
    const { purchases } = await p.api.getPurchases({ productType: p.inapp });
    const owned = (purchases ?? []).some((tx) => {
      const t = tx as { productIdentifier?: string; productId?: string };
      return t.productIdentifier === PREMIUM_PRODUCT_ID || t.productId === PREMIUM_PRODUCT_ID;
    });
    return owned ? { status: "restored" } : { status: "unavailable" };
  } catch (err) {
    return { status: "error", message: err instanceof Error ? err.message : String(err) };
  }
}
