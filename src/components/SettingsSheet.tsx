import { Settings2 } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useAppState } from "@/lib/app-state";

export function SettingsSheet() {
  const {
    t,
    volume,
    setVolume,
    haptics,
    setHaptics,
    shakeEnabled,
    setShakeEnabled,
    lang,
    setLang,
  } = useAppState();

  return (
    <Sheet>
      <SheetTrigger
        aria-label={t("settings")}
        className="rounded-full border border-white/12 bg-white/8 p-2.5 text-white/70 backdrop-blur-md transition-colors hover:text-white"
      >
        <Settings2 className="size-5" strokeWidth={1.6} />
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className="rounded-t-3xl border-white/10 bg-[#101114]/95 text-white backdrop-blur-xl"
      >
        <SheetHeader>
          <SheetTitle className="font-serif text-2xl font-normal text-white">
            {t("settings")}
          </SheetTitle>
          <SheetDescription className="text-white/50">{t("appName")}</SheetDescription>
        </SheetHeader>

        <div className="space-y-7 px-4 pb-8">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/75">{t("volume")}</span>
              <span className="text-white/45">{Math.round(volume * 100)}%</span>
            </div>
            <Slider
              value={[volume * 100]}
              max={100}
              step={1}
              onValueChange={([v]) => setVolume((v ?? 90) / 100)}
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-white/75">{t("haptics")}</span>
            <Switch checked={haptics} onCheckedChange={setHaptics} />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-white/75">{t("shake")}</span>
            <Switch checked={shakeEnabled} onCheckedChange={setShakeEnabled} />
          </div>

          <div className="space-y-3">
            <span className="text-sm text-white/75">{t("language")}</span>
            <div className="flex gap-2">
              {(["en", "sv"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`flex-1 rounded-full border px-4 py-2 text-sm transition-colors ${
                    lang === l
                      ? "border-[color:var(--gilt)]/60 bg-[color:var(--gilt)]/15 text-[color:var(--gilt)]"
                      : "border-white/12 text-white/60"
                  }`}
                >
                  {l === "en" ? "English" : "Svenska"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
