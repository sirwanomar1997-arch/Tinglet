# Elegant Hand Bell

A premium, elegant hand-bell app with three tabs: Home, Bells, Backgrounds. Everything is drawn in code and the sound is generated on the phone, so nothing needs image or audio credits and the app works fully offline.

## Home

- Large, refined bell centred on screen, sitting on the chosen background.
- Ring it by shaking the phone or tapping it.
- On ring: loud, rich metallic bell tone, a natural swing-and-settle animation of the bell and clapper, a soft glow pulse, and a light vibration.
- Shake detection uses the phone's motion sensor, with a short cooldown so one shake gives one clean ring. On iPhone, motion access needs a one-time permission tap — a discreet "Enable shake" button appears until it is granted; tapping the bell always works.
- Small settings sheet: volume, haptics on/off, shake on/off, language.

## Bells

- Grid of bells, each visibly different in shape and finish (tall slim, wide dome, tulip, faceted, fluted, ribbon-tied, etc.) with gold, rose gold, silver, polished white, matte black and other finishes.
- Each bell also has its own tone character (pitch and brightness), so switching bells changes how it sounds.
- Tapping a bell selects it instantly and remembers it.
- Seasonal packs — Christmas, Spring/Summer, Autumn, Halloween, Exclusive — are shown as locked cards with a lock badge and an "Unlock" label. They are free for now: tapping unlocks them locally. This keeps the layout ready for real paid packs later.

## Backgrounds

- Grid of backgrounds grouped by mood: soft gradients, marble and stone, nature, minimal solids, festive, dark and moody.
- All are built from gradients, subtle noise and layered shapes in code — high quality at any screen size, no image files.
- Selection applies instantly on Home with a smooth cross-fade and is remembered.

## Language

Swedish and English, auto-detected from the phone, switchable in settings. All wording in both languages.

## Design

Deep charcoal base with warm metallic accents, generous spacing, a refined serif for headings with a clean sans for the rest, soft glass-like cards, and no clutter. Mobile-first with a clean bottom tab bar; scales gracefully on larger screens.

## Technical notes

- Bells and backgrounds are SVG/CSS components driven by a typed catalogue (`src/lib/bells.ts`, `src/lib/backgrounds.ts`) with shared gradient and material definitions.
- Sound via Web Audio: a struck-metal model (multiple inharmonic partials with individual decay, plus a short strike transient) per bell tone profile; one shared AudioContext unlocked on first gesture.
- Shake via `devicemotion` with a magnitude threshold plus debounce; `DeviceMotionEvent.requestPermission()` handled for iOS. Haptics via `navigator.vibrate` where available.
- Selections, unlocked packs, volume, haptics and language persist in `localStorage`, read after hydration to avoid SSR mismatch.
- Routes: `src/routes/index.tsx` (Home), `bells.tsx`, `backgrounds.tsx`, with the tab bar in `__root.tsx`; each route gets its own title and description.
- Animation with Motion for React; no backend needed at this stage.
