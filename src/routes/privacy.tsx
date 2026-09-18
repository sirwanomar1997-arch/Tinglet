import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Integritetspolicy — Tringlet" },
      { name: "description", content: "Privacy policy for Tringlet — we do not collect, store or share any personal data." },
      { property: "og:title", content: "Integritetspolicy — Tringlet" },
      { property: "og:description", content: "Tringlet does not collect, store or share any personal data." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PrivacyPage,
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-2">
      <h2 className="font-serif text-lg text-foreground">{title}</h2>
      <div className="space-y-2 text-sm leading-relaxed text-foreground/75">{children}</div>
    </section>
  );
}

function PrivacyPage() {
  return (
    <main className="mx-auto min-h-dvh w-full max-w-2xl px-6 py-14">
      <p className="text-xs uppercase tracking-[0.25em] text-foreground/45">Tringlet</p>
      <h1 className="mt-2 font-serif text-3xl text-foreground">Integritetspolicy</h1>
      <p className="mt-1 text-sm text-foreground/55">Privacy Policy · Senast uppdaterad: september 2026</p>

      <div className="mt-10 space-y-8">
        <Section title="Sammanfattning">
          <p>
            Tringlet samlar inte in, lagrar eller delar några personuppgifter. Ingen information om dig lämnar
            din telefon.
          </p>
        </Section>

        <Section title="Vilka data samlas in?">
          <p>Inga. Appen har inga konton, ingen inloggning, ingen analys och inga spårningsverktyg.</p>
        </Section>

        <Section title="Rörelsesensorer">
          <p>
            Appen använder telefonens rörelsesensor (accelerometer) för att känna av när du skakar telefonen och
            låta klockan ringa. Sensordatan används endast lokalt på din enhet i realtid och skickas aldrig
            någonstans.
          </p>
        </Section>

        <Section title="Köp">
          <p>
            Köp inuti appen hanteras säkert och fullständigt av App Store (Apple) respektive Google Play
            (Google). Tringlet ser aldrig dina betalningsuppgifter.
          </p>
        </Section>

        <Section title="Lagring på din enhet">
          <p>
            Dina val av klocka, bakgrund och inställningar sparas bara lokalt på din egen telefon. Appen fungerar
            helt offline.
          </p>
        </Section>

        <Section title="Barn">
          <p>Tringlet riktar sig inte till barn under 13 år och samlar inte in some form av data från någon.</p>
        </Section>

        <Section title="Kontakt">
          <p>
            Frågor om denna policy? Kontakta Sirwan Omar på{" "}
            <a className="underline underline-offset-2" href="mailto:sirwanomar@hotmail.com">sirwanomar@hotmail.com</a>.
          </p>
        </Section>

        <hr className="border-border" />

        <Section title="Privacy Policy (English)">
          <p>Tringlet does not collect, store or share any personal data. The app works fully offline after purchase.</p>
          <p>
            Motion sensors (accelerometer) are used only locally on your device to detect shaking and ring the
            bell — this data never leaves your phone. Your purchases are processed securely by the App Store /
            Google Play.
          </p>
          <p>Contact: Sirwan Omar, sirwanomar@hotmail.com</p>
        </Section>
      </div>
    </main>
  );
}
