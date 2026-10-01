# Tranquil Bay · Instructions for Claude Design

**Deliverable:** one interactive e-brochure, a single responsive HTML page for buyers.
**Project:** Tranquil Bay, Marakada, Mangaluru (eNV.2026.018)
**Developer:** N Properties & Developers ("N Developers") · **Design consultancy:** [INSD]e*
**Read with:** `01_Database/tranquil_bay_data.json` (all numbers and copy), `04_Interactive_Modules/` (working modules), `02_TranquilBay_Image_Generation_Guide.md` (which images are coming).

---

## 1. What this brochure has to do

A buyer in Bengaluru, Dubai or Pune opens a link on their phone. In three minutes they should know:

1. **Where it is and why that matters.** A short drive from Mangaluru International Airport. You land on Friday evening and you are on your verandah before dinner.
2. **What the place feels like.** Quiet, green, monsoon-proof. Verandahs, courts, a shaded walk, a still river reach nearby.
3. **What they can buy.** Pick a plot, pick a villa (2, 3 or 4 BHK), compare, see a starting price.
4. **That someone looks after it.** The Home Keeper service keeps the house ready when they are away.
5. **How to take the next step.** Book a site visit, message on WhatsApp.

### Non-negotiables

- **Name:** always *Tranquil Bay*. Never "Monsoon Verandah", never "Marakada Housing Scheme" in client-facing copy (Marakada is the locality only).
- **No design-strategy content.** The concept deck was written for the developer. Do not carry over precedents (Over the Rainbow, Malhar Octave, Barefoot, SkyVille), the "three pillars", "what transfers", "decisions for the next stage", "conditions attached", or captions like "conceptual visualisation · not verified". Keep only what a buyer needs.
- **Prices:** show only the "starting from" figure per type (from `pricing.starting_from.*.display`). Never show the cost matrix, land rate or construction rate. Every price carries the exclusions line.
- **Apartment (The Lookout):** one teaser section only. No unit plans, no price.
- **Regional voice without clichés.** Do not open with laterite, Mangalore tiles, coconut palms or "coastal charm" as selling points. They are in the architecture; let rain, shade, courts, the river and the airport do the talking.

---

## 2. Brand and design system

### 2.1 Logos and credits
- N Developers logo: `Web Assets/Logos/n_developers.png` (red N on white, raster, square). Use on a white or paper plate; do not recolour. Ask for a vector before launch.
- [INSD]e*: no logo file in the folder. Typeset it: bold geometric sans, `[INSD]e` with a superscript asterisk in `#0000FF`. Request the vector.
- Credit line (footer and closing section): *Developed by N Properties & Developers · Design consultancy [INSD]e\**.
- The Tranquil Bay wordmark is set in the display face (below). No separate logo exists yet. Treat the typeset name as the wordmark.

### 2.2 Colour (tokens in `tb-core.css`)
Named for what they are on site, not for "coastal" moods.

| Token | Hex | Use |
|---|---|---|
| `--tb-ink` | #1C2321 | Wet basalt. Body text on paper, dark section grounds |
| `--tb-paper` | #F2EEE6 | Lime wash. Page ground |
| `--tb-paper-2` | #E6E0D4 | Shaded lime wash. Secondary ground, bars |
| `--tb-river` | #56706B | The still reach. Primary accent, links, interactive fills |
| `--tb-grove` | #2E4636 | Areca canopy. Open space on maps |
| `--tb-clay` | #A9502F | Roof tile. Used sparingly: The Moorings, one emphasis per screen |
| `--tb-lamp` | #D8A657 | Verandah lamp. Selection, active state, primary CTA on dark |
| Type colours | Cove #8FAAA1 · Lagoon #4E7C74 · Estuary #1F4A52 · Moorings #A9502F | Consistent everywhere a type appears: maps, tabs, bars, chips |

Rule: dark, image-led sections alternate with paper sections. Never more than two accents on one screen.

### 2.3 Type
- **Display:** Instrument Serif (Google Fonts). Big, loose, used for section titles, type names, prices, the weekend timeline.
- **UI / body:** Inter Tight 300 to 600.
- **Data:** JetBrains Mono for numbers, areas, eyebrows, plot IDs, disclaimers. Numbers always tabular.
- Scale: section titles `clamp(48px, 7vw, 120px)`; body 16 to 18px, line-height 1.55; eyebrows 11px, 0.14em tracking, uppercase.

### 2.4 Layout principles ("not boxy")
- **Full-bleed first.** Every chapter opens on an edge-to-edge 16:9 image or video. Text sits in the calm zone (left 35% or lower 30%) on a soft gradient, never in a card.
- **No card grids.** Lists are hairline-separated rows. Choices are text chips with an underline, not bordered pills (exception: the enquiry form, where pills make tapping easier).
- **Panels slide over images** instead of pushing layout: the plot sheet, the plan drawer and the quick-reference dock all overlay.
- **Asymmetry.** Text left, subject right. Offset headings. Let images run under the fold.
- **Rounded corners** only on floating UI (dock, sheets, buttons). Images stay square-edged and full-bleed.
- **Motion:** slow cross-fades (0.6 to 0.9 s, `cubic-bezier(.2,.7,.1,1)`), line-draw on the access road, count-up on key numbers. Respect `prefers-reduced-motion`.
- **Gutter:** `clamp(16px, 4vw, 64px)`. Phone width with a 16px gutter and no horizontal scroll.

---

## 3. Page structure

The brochure is one long page in 13 chapters. Each chapter is a `<section data-tb-section="Title">` so the dock can build its contents list. Module IDs refer to the files in `04_Interactive_Modules/`.

| # | Chapter | Purpose | Module | Main images |
|---|---|---|---|---|
| 01 | **Tranquil Bay** (hero) | Name, tagline, one line | M01 (top) | `Drone/marakada_drone_hero_loop_12s.mp4`, poster `Drone/drone_still_02.jpg` |
| 02 | **Why Tranquil Bay** | The name story | M01 (middle) | none, paper ground, big type |
| 03 | **A weekend here** | Scroll-driven timeline: land, unwind, gather, return | M01 (bottom) | renders + drone stills, one per beat |
| 04 | **Minutes from arrivals** | Location, access roads, drive times | M02 | `Satellite/*` |
| 05 | **The land** | Drone film with chapters, stills | M03 | `Drone/marakada_drone_1080p_web.mp4`, `drone_still_01..04` |
| 06 | **Masterplan** | Choose a plot; see what fits; layers | M04 | schematic SVG from data; later IMG-07 as base |
| 07 | **The homes** | Cove, Lagoon, Estuary: render + plan together; compare | M05 | IMG-01..03, `Plans/*` |
| 08 | **The Moorings** | Block C cluster of four; three modes | M06 | IMG-04..06 |
| 09 | **Inside** | Lifestyle interiors, no captions about design | static gallery | `Renders/vis_03, vis_07, vis_04, vis_10, vis_08, vis_09` |
| 10 | **Shared ground** | Amenities with illustrations + map | M07 | AM-01..AM-11 |
| 11 | **Home Keeper** | Care while away, rental option | static | AM-11 / `vis_09_rain_verandah_dusk` |
| 12 | **The Lookout** | Apartment teaser | static | IMG-08 (re-render of concept p.48) or `ill_neighbourhood_lane` crop |
| 13 | **Visit** | Shortlist, payment schedule, enquiry | M08 | `vis_09` |
| — | Footer | Specs (accordion), credits, disclaimers, RERA | static | — |

Plus the **persistent dock (M00, `tb-dock.js`)** on every screen.

### Chapter notes and copy

Copy is in `narrative` and elsewhere in the JSON. Headlines below are suggestions; body copy should come from the data so it stays in one place.

**01 Hero.** Full-bleed muted drone loop. Wordmark bottom-left, huge. Tagline *Land. Unwind. Return.* in italic display. One line: *A weekend-home neighbourhood of sixteen villas, a short drive from Mangaluru International Airport.* N Developers logo top-left on a small white plate, [INSD]e* top-right. Scroll cue.

**02 Why Tranquil Bay.** Paper ground. Two-column: title left, `narrative.name_story` right at 20 to 23px. The name comes from the still reach of the Phalguni behind the vented dam (seen in the drone film). *Verify river name and walking access before publishing* (open item).

**03 A weekend here.** Sticky full-screen section. As the reader scrolls, the clock ticks through `narrative.weekend_timeline` (Fri 18:40 land → Mon 07:05 checked in), the background cross-fades, and the chapter label (Arrive / Unwind / Gather / Return) changes. Progress rail along the bottom. Disclaimer: *Illustrative itinerary. Drive times approximate.* This is the emotional centre of the brochure; give it room.

**04 Location.** M02. Greyscale satellite with the original overlays restyled: arterial road in lamp gold drawing itself in, dashed access link to the main entry, site outline, parcels in clay. Three camera presets (Region / The approach / The site). In "The site" view parcels are labelled (The Lookout, Block D, The Moorings, Block B, Block A). Layer toggles. Drive-time list. **Direction labels ("To the airport", "To Kavoor") are flagged `verify: true` in the data: confirm before publishing.**

**05 The land.** M03. Full-bleed drone film, muted autoplay when in view, chapter ticks along the bottom (river reach, the land from above, villa lane, green edges, approach, valley and river, plot line-up). A stills toggle opens a 2x2 grid with a lightbox. For the live site, host the 84 MB film on a video CDN and swap the `src`.

**06 Masterplan.** M04. The core tool. See section 4.1.

**07 The homes.** M05. See section 4.2.

**08 The Moorings.** M06. Split screen: renders cross-fade on the left, story on the right. Modes: *Four homes* (independent), *One family* (buy all four, compound price), *Event day* (court and pavilion). Diagram of the four plots around the tree built from real geometry. Status line: *Massing and renders only. Unit plans to be drawn.*

**09 Inside.** A horizontal, drag-to-scroll strip of full-height interiors with one-line captions written as moments, not design intent: "Tea, and the court still wet", "The long table by the open doors", "Light down the stair". **Do not use** the concept deck titles ("Drainage made visible", "A compact spine holds the plan together", etc.). Do not use `vis_05_aerial_villas` or `vis_11_arrival_garden` as villa imagery: they show an earlier hipped-roof massing that no longer matches the elevations. `vis_01_threshold_facade` is also an earlier elevation; use only as an atmospheric crop, or re-render.

**10 Shared ground.** M07. Full-bleed illustration of the selected amenity; numbered list on the left (numbers match the pins on the masterplan); mini-map bottom-right highlights the pin. Filters: Arrive, Walk, Gather, Play, Unwind, Grow. Phase 2 items (Clubhouse and lap pool) are marked and use a dashed pin.

**11 Home Keeper.** Paper section with one image. List `services` as hairline rows. Close with: "Enrol in rental management if you want the house to earn while you are away." Mark as *to be confirmed with N Developers* in the build notes until confirmed.

**12 The Lookout.** One full-bleed image, three numbers (88 homes · 22 floors · 4 homes per floor), `lookout.hook`, a "Register interest" button that pre-fills the enquiry form with type "The Lookout". Nothing else.

**13 Visit.** M08. Shortlist (type + plots), starting price, indicative payment schedule on that figure, form, WhatsApp link, PDF download. Legal disclaimer and RERA placeholder.

**Footer.** Specifications as an accordion (`specifications`), land-use summary (site area, open space percentage), credits, disclaimers: "Images are artistic impressions. Plans and areas are indicative and subject to approvals and design development. This brochure is not an offer or a contract."

---

## 4. Interactive modules in detail

All modules read `window.TB` (from `tranquil_bay_data.js`) through helpers in `tb-core.js` (`TBX`). They talk to each other through events (`TBX.emit` / `TBX.on`), which work within one page and across iframes. **In the final brochure, inline the module markup, CSS and scripts as sections of one page** rather than iframes; the event names stay the same. `index.html` is only a preview harness.

### Event map

| Event | Sent by | Received by | Effect |
|---|---|---|---|
| `filter-type` {type} | M05 "See plots that fit", M06 "Show on masterplan" | M04 | Filters plots, scrolls to masterplan |
| `focus-plot` {plot} | anywhere | M04 | Opens the plot sheet |
| `plot` {plot} | M04 | analytics | — |
| `plot-type` {plot, type} | M04 | M08 (optional) | Remembers the choice |
| `compare` {type} | M04 "See plans" | M05 | Opens that type with the plan drawer |
| `amenity` {id} | M04 pin click | M07 | Selects the amenity |
| `amenity-hover` {id} | M07 | M04 | Highlights the pin |
| `enquire` {type?, plot?} | M04, M06, M00 dock, Lookout | M08 | Pre-fills shortlist, scrolls to form |
| `lead` {…form} | M08 | your form endpoint | **Wire to CRM / email / Sheet** |
| `download-pdf` | M08 | — | **Wire to the PDF export** |

### 4.1 M04 Masterplan and plot selector
- Schematic SVG built from `geometry` (traced from the sanctioned layout, rotated −72° on wide screens so the site reads landscape; upright on phones).
- Plots coloured by their default villa type. Hover: plot number, sq.ft, cents. Click or Enter: plot sheet slides in from the right (bottom sheet on phones) with render, area in sq.ft and sq.m, cents, dimensions, status, and the three villa options. Types that don't fit are disabled with the reason ("Needs a plot of 2,799 sq.ft or more").
- Choosing a type recolours the plot and updates the sheet.
- Filters: All / Fits The Cove / Fits The Lagoon / Fits The Estuary / The Moorings.
- Layers: amenities (numbered pins, match M07), open spaces, The Lookout parcel.
- Booked plots: set `status: "booked"` in the data and they render hatched.
- URL params: `?plot=5` opens a plot, `?filter=estuary` pre-filters. Use these for WhatsApp share links per plot.
- **Upgrade path:** when IMG-07 (the 16:9 watercolour masterplan) is ready, place it under the SVG and set the plot fills to 35% opacity so the illustration shows through. Re-trace plot polygons from CAD when available (open item).

### 4.2 M05 The homes (explore + compare)
Explore mode, one type at a time:
- Full-bleed front elevation (renders are intentionally front-only). Tabs bottom-left: 2 BHK The Cove · 3 BHK The Lagoon · 4 BHK The Estuary.
- Left column: name, idea line, six stats (built-up sq.ft, bedrooms, car bays, court and terrace area, floors, number of plots it fits), starting price with exclusions.
- **Plan and render together:** "View plans" slides a plan drawer over the right half of the image, so the elevation stays visible on the left. Floor tabs (Ground / First / Roof). Pan, pinch or wheel zoom, fit button. Room list under the plan. Where a floor is not drawn yet, the drawer says so and shows the room list.

Compare mode:
- Pick any two to four of Cove, Lagoon, Estuary, Moorings.
- Sticky header with thumbnails and names; rows for starting price, built-up (with proportional bars), carpet, open areas, footprint, floors, plots available, then every feature from `feature_tiers` grouped (Architecture, Premium, Everyday, Sustainability, Technology). Premium rows are tinted.
- "Show differences only" toggle. sq.ft / sq.m toggle.
- Ground-floor plans side by side at the bottom.
- The bigger homes get more: 5 kW solar and full-home backup on the Estuary, private plunge pool, roof pavilion, whole-home automation. This is visible row by row.

### 4.3 M02, M03, M06, M07, M08
Described in section 3. All are production-ready in behaviour; restyle freely.

### 4.4 M00 Reference dock (`tb-dock.js`)
Floating pill at the bottom centre, always visible:
- **Contents:** every `data-tb-section`, numbered, current section highlighted.
- **Progress bar** of the scroll.
- **Plans:** thumbnails of every plan plus the sanctioned layout; tap to open full-screen.
- **Masterplan:** jumps to chapter 06.
- **Key facts:** site area, plots, types, starting price, airport time, heights.
- **Enquire:** lamp-gold button, jumps to Visit.
On phones the labels collapse to icons. `Esc` closes everything.

### 4.5 Things I would add (not in the brief)
1. **Share a plot:** a share button in the plot sheet that copies `?plot=N` or opens WhatsApp with the link.
2. **Monsoon / Summer toggle** on the hero and the three villa elevations, once the renders exist in both seasons. Buyers flying in for Diwali or for May holidays see the place as they will find it.
3. **Sun path on the masterplan:** a slider for time of day that moves a shadow across the plots. Useful for east-facing buyers.
4. **Save shortlist** in `localStorage` so a returning visitor sees their plot and type pre-filled (wrap in try/catch).
5. **PDF export** of the brochure (print stylesheet: one chapter per A4 landscape page, static states of each module).
6. **Language:** Kannada and Konkani versions of the hero and visit sections for local family decision-makers.

---

## 5. Data and numbers

- Single source: `tranquil_bay_data.json`. Do not type numbers into the HTML. The XLSX (`TranquilBay_Database.xlsx`) is the same data with live formulas; if a rate changes there, update the JSON too.
- **Key figures (from the MUDA sanctioned plan):** 12,677.23 sq.m site (3.13 acres, 313.25 cents) · 16 villa plots on 5,041.76 sq.m, 232 to 483 sq.m each · villa coverage 38.44% · open area 13.83% · 88 apartments on 22 floors · 233 car parks.
- **Villa types (built-up):** The Cove 2 BHK ≈ 1,619 sq.ft · The Lagoon 3 BHK ≈ 2,238 sq.ft · The Estuary 4 BHK ≈ 2,940 sq.ft · The Moorings 3 BHK ≈ 2,024 sq.ft per home. Carpet ≈ 80% of built-up.
- **Starting from (display):** Cove ₹1.00 Cr · Lagoon ₹1.30 Cr · Moorings ₹1.25 Cr per home (₹5.35 Cr for all four) · Estuary ₹1.85 Cr. **These are benchmarked, not approved.** Replace when N Developers confirms rates.
- Plot fit rule: a type fits a plot if the plot is at least the type's minimum and the type's built-up area is within the plot's FAR allowance (plot × 1.075). Block C is reserved for The Moorings.
- Units: show sq.ft first (buyers think in sq.ft), sq.m second. Cents for plots (local buyers think in cents).
- Indian number format: ₹1,30,00,000 → "₹1.30 Cr". Use `TBX.inr()`.

---

## 6. Images

- Asset root: `Web Assets/` at the project root. Modules use `TB.meta.asset_base` (`../../Web Assets/`); change it in one place if the folder moves.
- Re-rendered 16:9 images will land in `Web Assets/Rerenders/` with the names in the image guide (`TB_IMG01_Cove_front_16x9.jpg`, `TB_AM01_…`). M07 already looks there first and falls back gracefully. For other modules, swap the paths in the JSON when files arrive.
- Until then, placeholders show a quiet "render pending" panel, never a broken image.
- Every image is `object-fit: cover` in a full-bleed frame. Keep the calm zone (left 35%) clear for text.
- Lazy-load everything below the hero. Serve WebP/AVIF with JPG fallback on the live site. Hero loop ≤ 2 MB.
- Alt text: describe what is shown, e.g. "The Lagoon, front elevation at dusk after rain".

---

## 7. Responsive and accessibility

- Breakpoints: 760px (phone), 900px (split layouts stack), 1200px+ (wide).
- On phones: masterplan upright, plot sheet as a bottom sheet, compare table scrolls horizontally with the label column sticky, dock shows icons only.
- WCAG AA contrast for all text; gradients under text on images must guarantee it.
- Every interactive plot and pin is focusable and operable with Enter/Space; sheets close with Esc; `aria-live` on changing captions.
- Touch targets ≥ 44 px.

---

## 8. Before publishing (from `open_items`)

1. Replace benchmarked pricing with N Developers' approved rates.
2. Draw first-floor plans for The Lagoon and The Estuary, and unit plans for The Moorings.
3. Confirm The Estuary fits the 15.8 m wide plots in Block A with side setbacks (footprint 12.54 m).
4. Confirm the river name, access, direction labels and drive times.
5. Get vector logos for N Developers and [INSD]e*.
6. Trace plot geometry from the CAD survey.
7. Confirm the Home Keeper and rental-management offer.
8. Confirm the phase 2 clubhouse at The Lookout.
9. Add RERA registration number, WhatsApp number (`window.TB_WHATSAPP`), form endpoint.
10. Re-export plans with the Tranquil Bay title block (current plan sheet says "Marakada Housing Villas"; the web crops remove it).
