# Replace every low-quality bell asset

## Goal
Make all 69 bells besides the approved gold-and-pink `free-01` match its professional standard: crisp detail, natural transparent edges, consistent size, and no white/grey matte fringe on any app background.

## What will change
- Keep the approved gold-and-pink bell unchanged as the visual and technical reference.
- Replace each remaining bell from a full-resolution individual source rather than enlarging the old contact-sheet crops.
- Preserve all existing bell IDs, names, categories, free/premium grouping, selection behavior, and purchase behavior.
- Export every replacement on a transparent 1024×1024 canvas with consistent visible height and spacing matching the reference.
- Remove generated shadows, glow, white matte, and background remnants from the image pixels; the app will provide the natural shadow separately.

## Quality gate
- Compare all 70 images against the reference for resolution, visible bounds, alpha transparency, edge color contamination, and detail sharpness.
- Reject and redo any bell with halos, jagged edges, missing parts, background pixels, blur, or inconsistent scale.
- Visually inspect representative light, porcelain, metallic, ribboned, seasonal, and dark bells on both pale and dark backgrounds.
- Check the home screen and full catalogue at mobile size before publishing.

## Technical details
- The current 69 failing assets originate from roughly 316×336-pixel cells in contact sheets and were enlarged; post-processing cannot restore the missing detail.
- New assets will be created or re-rendered individually at final resolution with transparent output, then normalized without enlarging low-resolution pixels.
- Existing filenames remain unchanged, so no app behavior or saved user selection breaks.
