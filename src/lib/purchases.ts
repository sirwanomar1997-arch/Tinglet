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

async function nativeApi() {
  if (typeof window === "undefined") return null;
  try {
    const { Capacitor } = await import("@capacitor/core");
    if (!Capacitor.isNativePlatform()) return null;
    const { NativePurchases } = await import("@capgo/native-purchases");
    return NativePurchases;
  } catch {
    return null;
  }
}

export async function isStoreAvailable(): Promise<boolean> {
  const api = await nativeApi();
  if (!api) return false;
  try {
    const res = await api.isBillingSupported();
    return Boolean(res?.isBillingSupported);
  } catch {
    return false;
  }
}

/** Localised store price (e.g. "39,00 kr"), or null when unavailable. */
export async function premiumPrice(): Promise<string | null> {
  const api = await nativeApi();
  if (!api) return null;
  try {
    const res = await api.getProduct({ productIdentifier: PREMIUM_PRODUCT_ID });
    const p = res?.product as { priceString?: string; price?: number; currencyCode?: string } | undefined;
    if (p?.priceString) return p.priceString;
    if (typeof p?.price === "number") return `${p.price} ${p.currencyCode ?? ""}`.trim();
    return null;
  } catch {
    return null;
  }
}

export async function buyPremium(): Promise<PurchaseOutcome> {
  const api = await nativeApi();
  if (!api) return { status: "demo" };
  try {
    if (!(await isStoreAvailable())) return { status: "unavailable" };
    await api.purchaseProduct({
      productIdentifier: PREMIUM_PRODUCT_ID,
      productType: "inapp",
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
  const api = await nativeApi();
  if (!api) return { status: "demo" };
  try {
    const res = await api.restorePurchases();
    const list = (res as { customerInfo?: { activeSubscriptions?: unknown[] }; purchases?: unknown[] } | undefined);
    const owned =
      Array.isArray(list?.purchases) && list.purchases.length > 0
        ? true
        : JSON.stringify(res ?? {}).includes(PREMIUM_PRODUCT_ID);
    return owned ? { status: "restored" } : { status: "unavailable" };
  } catch (err) {
    return { status: "error", message: err instanceof Error ? err.message : String(err) };
  }
}
