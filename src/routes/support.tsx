import { createFileRoute } from '@tanstack/react-router'
import { useId } from 'react'
import { Helmet } from 'react-helmet-async'

export const Route = createFileRoute('/support')({
  component: SupportPage,
})

const CONTENT = {
  en: {
    title: 'Tinglet Support',
    intro: 'Need help with Tinglet? We are here for you.',
    howTitle: 'How the app works',
    how: [
      'Open Tinglet — a beautiful hand bell appears.',
      'Shake your phone and the bell swings and rings.',
      'You can also tap the bell to ring it.',
    ],
    audioTitle: 'No sound?',
    audio: 'On iPhone, the first tap on the screen turns the sound on. Touch the screen once, then shake — the bell will ring.',
    premiumTitle: 'Premium unlock',
    premium: 'Tinglet Premium unlocks all 70 bells and every background with a single one-time purchase. If you bought it on a new phone, tap "Restore purchase" in the app.',
    contactTitle: 'Contact us',
    contactText: 'Email us and we will answer within a couple of days:',
    email: 'sirwanomar@hotmail.com',
    back: '← Back to Tinglet',
  },
  sv: {
    title: 'Tinglet Support',
    intro: 'Behöver du hjälp med Tinglet? Vi finns här för dig.',
    howTitle: 'Så fungerar appen',
    how: [
      'Öppna Tinglet — en vacker handklocka visas.',
      'Skaka telefonen så svingar klockan och plinga.',
      'Du kan också trycka på klockan för att plinga.',
    ],
    audioTitle: 'Inget ljud?',
    audio: 'På iPhone slås ljudet på första gången du rör skärmen. Rör skärmen en gång, skaka sedan — klockan ringer.',
    premiumTitle: 'Premium-upplåsning',
    premium: 'Tinglet Premium låser upp alla 70 klockor och alla bakgrunder med ett engångsköp. Köpte du på en ny telefon — tryck "Återställ köp" i appen.',
    contactTitle: 'Kontakta oss',
    contactText: 'Mejla oss så svarar vi inom ett par dagar:',
    email: 'sirwanomar@hotmail.com',
    back: '← Tillbaka till Tinglet',
  },
} as const

function SupportPage() {
  const id = useId()
  const t = CONTENT.en
  return (
    <div className="min-h-screen bg-[#faf6ef] text-[#2b2118]">
      <Helmet>
        <title>Tinglet Support</title>
        <meta name="description" content="Support for Tinglet — shake your phone and ring the bell." />
      </Helmet>
      <main className="mx-auto max-w-2xl px-6 py-14">
        <a href="/" className="text-sm text-[#9a7337] hover:underline">{t.back}</a>
        <h1 className="mt-6 font-serif text-4xl">{t.title}</h1>
        <p className="mt-3 text-lg">{t.intro}</p>

        <section className="mt-10">
          <h2 className="text-xl font-semibold">{t.howTitle}</h2>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            {t.how.map((line) => (
              <li key={`${id}-${line.slice(0, 8)}`}>{line}</li>
            ))}
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold">{t.audioTitle}</h2>
          <p className="mt-3">{t.audio}</p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold">{t.premiumTitle}</h2>
          <p className="mt-3">{t.premium}</p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold">{t.contactTitle}</h2>
          <p className="mt-3">{t.contactText}</p>
          <a href={`mailto:${t.email}`} className="mt-2 inline-block font-semibold text-[#9a7337] underline">{t.email}</a>
        </section>
      </main>
    </div>
  )
}
