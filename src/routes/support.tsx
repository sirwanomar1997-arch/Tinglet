import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/support")({
  head: () => ({
    meta: [
      { title: "Support — Tinglet" },
      { name: "description", content: "Support for Tinglet — shake your phone and ring the bell. How it works, sound help and contact." },
      { property: "og:title", content: "Support — Tinglet" },
      { property: "og:description", content: "Need help with Tinglet? Shake your phone and ring the bell." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SupportPage,
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-2">
      <h2 className="font-serif text-lg text-foreground">{title}</h2>
      <div className="space-y-2 text-sm leading-relaxed text-foreground/75">{children}</div>
    </section>
  );
}

function SupportPage() {
  return (
    <main className="mx-auto min-h-dvh w-full max-w-2xl px-6 py-14">
      <a href="/" className="text-xs uppercase tracking-[0.25em] text-foreground/45 hover:text-foreground/70">
        ← Tinglet
      </a>
      <h1 className="mt-2 font-serif text-3xl text-foreground">Support</h1>
      <p className="mt-1 text-sm text-foreground/55">Support · Behöver du hjälp med Tinglet? Vi finns här.</p>

      <div className="mt-10 space-y-8">
        <Section title="Så fungerar appen">
          <ul className="list-disc space-y-1 pl-5">
            <li>Öppna Tinglet — en vacker handklocka visas.</li>
            <li>Skaka telefonen så svingar klockan och ringer.</li>
            <li>Du kan också trycka på klockan för att ringa.</li>
          </ul>
        </Section>

        <Section title="Inget ljud?">
          <p>
            På iPhone slås ljudet på första gången du rör skärmen. Rör skärmen en gång var som helst, skaka
            sedan telefonen — då ringer klockan.
          </p>
        </Section>

        <Section title="Premium-upplåsning">
          <p>
            Tinglet Premium låser upp alla 70 klockor och alla bakgrunder med ett engångsköp. Har du bytt
            telefon? Tryck på "Återställ köp" i appen så återställs ditt köp.
          </p>
        </Section>

        <Section title="Kontakta oss">
          <p>Mejla oss så svarar vi inom ett par dagar:</p>
          <p>
            <a href="mailto:sirwanomar@hotmail.com" className="font-medium text-foreground underline">
              sirwanomar@hotmail.com
            </a>
          </p>
        </Section>

        <Section title="How the app works (English)">
          <ul className="list-disc space-y-1 pl-5">
            <li>Open Tinglet — a beautiful hand bell appears.</li>
            <li>Shake your phone and the bell swings and rings.</li>
            <li>You can also tap the bell to ring it.</li>
          </ul>
          <p className="pt-2">
            No sound? On iPhone, the first touch on the screen turns the sound on. Touch the screen once, then
            shake — the bell will ring.
          </p>
          <p className="pt-2">
            Tinglet Premium unlocks all 70 bells and every background with a single one-time purchase. On a new
            phone, tap "Restore purchase" in the app.
          </p>
        </Section>
      </div>
    </main>
  );
}
