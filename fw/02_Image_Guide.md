# Tranquil Bay · Image Generation Guide

Re-render brief for the e-brochure. Every image in this guide comes out at **16:9 landscape**, so it can run full-bleed behind text.

Built on the studio master prompt (*Architectural Visualization from Collages*). Photographic images follow it section by section. Marketing illustrations (the AM and WK series) keep the same JSON order but swap `camera_gear` for `illustration_medium`, because they are drawings, not photographs.

---

## 0. Before you start

### 0.1 What gets re-rendered

| ID | Source file (in `Design/`) | Output file name | Used in brochure section |
|---|---|---|---|
| IMG-01 | `Villa Typologies/2BHK Front View.jpeg` | `TB_IMG01_Cove_front_16x9.jpg` | 05 The Homes · The Cove |
| IMG-02 | `Villa Typologies/3BHK Front View.jpeg` | `TB_IMG02_Lagoon_front_16x9.jpg` | 05 The Homes · The Lagoon |
| IMG-03 | `Villa Typologies/4BHK Front View.jpeg` | `TB_IMG03_Estuary_front_16x9.jpg` | 05 The Homes · The Estuary |
| IMG-04 | `Cluster/WhatsApp … 11.25.49 AM.jpeg` | `TB_IMG04_Moorings_street_16x9.jpg` | 06 The Moorings (opener) |
| IMG-05 | `Cluster/WhatsApp … 11.25.49 AM (1).jpeg` | `TB_IMG05_Moorings_aerial_court_16x9.jpg` | 06 The Moorings |
| IMG-06 | `Cluster/WhatsApp … 11.25.49 AM (2).jpeg` | `TB_IMG06_Moorings_court_16x9.jpg` | 06 The Moorings (events) |
| IMG-07 | `Incoming/WhatsApp … 10.45.41 AM.jpeg` (watercolour masterplan, 1:1) | `TB_IMG07_Masterplan_illustrated_16x9.jpg` | 04 Masterplan base layer |
| IMG-08 | Concept presentation p.48 (tower render) | `TB_IMG08_Lookout_16x9.jpg` | 12 The Lookout |
| AM-01 to AM-11 | New marketing illustrations | `TB_AM01_…_16x9.jpg` | 07 Amenities + map pop-ups |
| WK-01 to WK-09 | New story illustrations for the weekend timeline | `TB_WK01_16x9.jpg` … `TB_WK09_16x9.jpg` | 03 A weekend here |

The renders in `Conceptual Renders/` (interiors, court, pool, rain verandah) are already 16:9 (1672 x 941). They are used as lifestyle imagery as they are. Re-render them only if you want 4K output.

### 0.2 Rules that apply to every image in this set

1. **Aspect 16:9, landscape, minimum 3840 x 2160.** Export JPG at quality 90, sRGB.
2. **Front elevations stay front elevations.** IMG-01 to IMG-03 are head-on views on purpose, so a buyer can compare the three façades side by side. Keep the camera square to the façade, verticals vertical, horizon at the same height in all three.
3. **Same camera for the three villas.** Same lens, same height (1.5 m), same distance logic, same light, same wet ground. When they sit next to each other in the comparison module, only the house should change.
4. **Widen, don't crop.** The sources are narrower than 16:9. Gain the width by showing more of the street edge and the neighbouring garden on both sides. Never cut the roof ridge or the plinth.
5. **Leave a quiet zone for type.** The left 35% of the frame (villas, Moorings, Lookout) or the lower 30% (masterplan, amenities) should be calm: sky, soft foliage, wet paving. Headlines sit there.
6. **No people facing the camera, no crowds.** One or two motion-blurred figures at most, at the frame edge, at least one cropped.
7. **Nothing off-site that isn't there.** No sea, no beach, no hills that don't exist. The real context is coconut and areca groves, paddy edges, mango and jackfruit canopy, and the river valley to the north.
8. **Avoid the postcard.** Laterite and clay tile are in the design; they don't need to be the subject. Let rain, shade, planting and the court do the work.

### 0.3 Shared light and weather (use for IMG-01 to IMG-06)

Early evening in the monsoon break: rain has just stopped, sky a soft pewter overcast with one brighter patch low on the west, ambient 5600K. Warm interior and landscape uplights on (2700K). Ground wet, puddles in paving joints. This is the "arrived on the evening flight" moment the brochure is built on.

IMG-06 is the exception: bright late morning, for the events and gathering story.

### 0.4 Workflow

1. Load the source image as the image reference / composition guide.
2. Paste the JSON prompt for that image.
3. Set aspect 16:9. If the model supports outpainting, place the source centred (or at the stated offset) and let it extend the sides.
4. Check against the **Test** at the end of this guide before accepting a result.
5. Name the file as in 0.1 and drop it in `Web Assets/Rerenders/`.

---

## 1. Villa elevations

### IMG-01 · The Cove (2 BHK) · front elevation

```json
{
  "shot_type": "Real architectural photograph of a two-storey 2 bedroom villa, shot square-on to the front façade. Fujifilm GFX 100S, GF 45mm (35mm equivalent), f/8, ISO 400, 1/15s, tripod. Not a render.",
  "source_image": "The attached image is a SUGGESTIVE reference. It shows: a low mono-pitch clay-tile roof on the left sloping down over an open carport, held by a single rough laterite pier at the far left; a timber-finish soffit under that roof; a cream lime-plaster ground-floor volume with one timber-framed window (a table lamp glowing inside); a recessed entrance with a tall solid hardwood door, flanked by two slim timber posts; a cantilevered cream first-floor balcony box with a thin grey concrete fascia band; a small timber-framed window in the upper gable behind it; on the right a tall laterite-block volume with a full-height screen of vertical timber battens and a steep mono-pitch clay-tile roof rising to the right; a raised stone plinth with three grey stone steps; grey stone planter boxes with heliconia, calathea and fern planting; a wet grey stone-paved forecourt; coconut palms and dense mango and jackfruit canopy behind. Proportions and perspective must be CORRECTED. Every element must be fully three-dimensional.",
  "output_format": {"aspect_ratio": "16:9", "orientation": "landscape", "resolution": "3840x2160 minimum"},
  "camera_gear": {"lens": "45mm on medium format (35mm equivalent), rectilinear, shift used to keep verticals parallel", "aperture": "f/8", "iso": 400, "shutter": "1/15s", "support": "tripod at 1.5 m", "lens_character": "natural vignetting in the corners, faint chromatic aberration on the roof edge against the bright sky and on the timber battens against the lit window"},
  "composition": {
    "angle": "Square-on frontal elevation. Correct the source perspective so the ridge line, balcony fascia and plinth are perfectly horizontal and all verticals are parallel. Horizon at 38% from the bottom.",
    "framing": "House occupies the centre-right 60% of the frame, its right edge at 88% of the width. Extend the scene to the left with more wet forecourt, the carport, a low laterite garden wall and a frangipani tree; extend to the right with the neighbour's garden hedge and a coconut trunk. Left 35% of the frame stays calm for headline text.",
    "depth_layers": "wet stone road surface with a granite kerb (foreground, soft) → stone-paved forecourt with puddles → planters and steps → house façade (sharp focal plane) → coconut palms and canopy → pewter sky",
    "focus": "Façade and steps sharp; foreground road surface softens slightly; canopy softens at the top corners"
  },
  "materials": {
    "laterite": "Rough-hewn laterite blocks with visible pores and iron-rich speckle, uneven block faces, darker where rain has soaked in at the base, lit from below so each pore throws a micro-shadow",
    "plaster": "Warm off-white lime plaster with a soft trowel texture, faint grey rain streaks under the balcony drip edge, slightly darker damp band at the plinth",
    "timber": "Teak-toned vertical battens, each batten a separate square section with its own shadow on the laterite behind; hardwood door with vertical grain and a slim steel pull handle",
    "roof": "Clay tiles in rows with slight colour variation between tiles, a few tiles darker with moss, dark painted fascia with a half-round gutter and a visible downpipe on the right",
    "stone": "Grey granite paving and steps, wet and reflective, darker in the joints; stone planter boxes with water stains",
    "glass": "Windows reflect the pewter sky faintly, with the warm lamp visible behind"
  },
  "furniture_and_objects": {
    "planting": "Heliconia, calathea, bird-of-paradise and ferns in the planters, each leaf casting its own shadow on the plaster behind; a young frangipani on the left with a curved trunk",
    "lighting_fixtures": "Recessed downlights in the entrance soffit, small ground uplights in the planters washing the laterite and battens, each with a visible housing",
    "paired_shadows": "Each timber post casts a thin contact shadow on the step and a softer projection shadow on the wall; the laterite pier casts a tight contact shadow on the paving",
    "details": "A black umbrella leaning by the door, a pair of chappals on the top step, a doormat with a worn centre"
  },
  "life_elements": {
    "figures": "None in the house. Optionally one figure walking out of the right edge of the frame on the road, motion-blurred at 1/15s, cotton kurta, carrying a small travel bag, partly cropped",
    "animals": "None"
  },
  "lighting": {
    "time": "Early evening, rain just stopped, pewter overcast with a brighter patch low on the left",
    "sources": "Cool ambient sky light 5600K on all upward faces and the wet ground; warm 2700K interior lamp through the ground-floor window; warm 3000K soffit downlights over the door; warmer 2400K uplights grazing the laterite and battens",
    "gradient": "Brightest at the entrance and on the lit laterite; façade falls off to cooler grey at the roof; forecourt reflects the warm door light as long soft streaks",
    "bounce": "Warm glow from the entrance bounces onto the steps and the underside of the balcony box"
  },
  "photographic_quality": {
    "grain": "ISO 400 fine grain visible in the sky and in the shadow under the carport roof",
    "reflections": "Wet paving reflects the door, the uplit battens and the window as soft distorted warm shapes, broken by puddle edges",
    "imperfections": ["hairline crack in the plaster under the balcony", "algae line on the planter base", "a few fallen leaves stuck to the wet paving", "slight warping on two timber battens", "rust trace at the downpipe bracket", "chipped corner on one laterite block", "water droplets hanging from the gutter"]
  },
  "style_reference": "Sebastian Zachariah and Bharath Ramamrutham for AD India: a real photograph, not a render. The house seen the moment you arrive after rain, warm light against a cool wet evening."
}
```

### IMG-02 · The Lagoon (3 BHK) · front elevation

```json
{
  "shot_type": "Real architectural photograph of a two-storey 3 bedroom villa, square-on to the front façade. Fujifilm GFX 100S, GF 45mm, f/8, ISO 400, 1/15s, tripod. Not a render.",
  "source_image": "The attached image is a SUGGESTIVE reference. It shows: on the left a two-storey laterite-clad volume framed by slim cream plaster edge piers, with a full-height screen of vertical timber battens over the windows on both floors; timber-framed windows on the far left; a cream plaster first-floor balcony box with a grey fascia band at the centre; a covered ground-floor entrance with a solid hardwood door and a large timber-mullioned window, set back under the balcony; on the right a long low mono-pitch clay-tile roof sloping down to the right over an open carport, held on a slim timber post, ending at a low laterite wall with a timber slatted screen; a grey stone planter plinth in front of the left volume; three grey stone steps; tropical planting; wet stone forecourt; coconut palms behind. Proportions and perspective must be CORRECTED. All elements fully three-dimensional.",
  "output_format": {"aspect_ratio": "16:9", "orientation": "landscape", "resolution": "3840x2160 minimum"},
  "camera_gear": {"lens": "45mm medium format (35mm equivalent), shift for parallel verticals", "aperture": "f/8", "iso": 400, "shutter": "1/15s", "support": "tripod at 1.5 m, same position logic as IMG-01", "lens_character": "natural vignetting, faint chromatic aberration on the roof edge and batten edges against lit glass"},
  "composition": {
    "angle": "Square-on frontal elevation, identical camera height and horizon (38%) to IMG-01. Correct any converging verticals and tilted fascia lines from the source.",
    "framing": "House occupies the centre-right 65%, right edge at 92%. Extend left with wet forecourt, a low planted garden wall and part of a neighbour's frangipani. Left third calm for text.",
    "depth_layers": "wet road with granite kerb → paved forecourt with puddles → planters and steps → façade (sharp) → palms and canopy → pewter sky",
    "focus": "Façade sharp; foreground softens; top corners soften into canopy"
  },
  "materials": {
    "laterite": "Coarse porous laterite blocks, rust and ochre variation, darker at the damp base, pores catching uplight",
    "plaster": "Off-white lime plaster with soft trowel marks, faint grey drip streaks under the balcony and window sills",
    "timber": "Teak-toned battens as separate square sections, each shadowing the laterite behind; hardwood door; timber post under the carport roof with a steel shoe at its base",
    "roof": "Clay tiles with tonal variation and some moss on the lower rows, timber-finish soffit visible under the carport, dark fascia and half-round gutter",
    "stone": "Wet granite paving and steps, grey stone planter plinth with water staining",
    "glass": "Large window reflects the sky and the palm silhouettes faintly; warm interior visible behind with a pendant light"
  },
  "furniture_and_objects": {
    "planting": "Areca palms in the planter, heliconia and fern, a young champak tree near the carport; each leaf shadows the wall behind",
    "lighting_fixtures": "Soffit downlights at the entrance; planter uplights on the laterite; a wall-mounted bollard by the steps",
    "paired_shadows": "Timber carport post: tight contact shadow on paving plus a longer soft shadow toward the house; planters: contact shadow line on the paving",
    "details": "A child's bicycle leaning under the carport, a folded umbrella by the door, a brass bell by the doorframe"
  },
  "life_elements": {
    "figures": "One figure under the carport lifting a bag out of a car boot (car mostly out of frame on the right), motion-blurred at 1/15s, partly cropped by the right edge, not facing camera",
    "animals": "None"
  },
  "lighting": {
    "time": "Early evening after rain, same sky as IMG-01",
    "sources": "Cool 5600K overcast ambient; warm 2700K interior pendant visible through the glass; 3000K soffit downlights; 2400K uplights on laterite",
    "gradient": "Brightest at the entrance and the lit window, cooler towards the carport roof and the top of the laterite volume",
    "bounce": "Warm light from the window bounces onto the stone steps and the carport soffit"
  },
  "photographic_quality": {
    "grain": "ISO 400 fine grain in sky and under the carport roof",
    "reflections": "Puddles reflect the lit window and uplit battens as soft warm streaks",
    "imperfections": ["algae line along the planter plinth", "hairline plaster crack at a window corner", "leaves stuck to the wet paving", "moss in the lower roof tiles", "slight weathering on the timber post base", "a paint chip on the fascia", "droplets on the gutter lip"]
  },
  "style_reference": "Bharath Ramamrutham for AD India: a real photograph, not a render. A family house seen as the car pulls in on a wet evening."
}
```

### IMG-03 · The Estuary (4 BHK) · front elevation

```json
{
  "shot_type": "Real architectural photograph of a two-storey 4 bedroom villa with a roof pavilion, square-on to the front façade. Fujifilm GFX 100S, GF 45mm, f/8, ISO 400, 1/15s, tripod. Not a render.",
  "source_image": "The attached image is a SUGGESTIVE reference. It shows: on the left a low mono-pitch clay-tile carport roof sloping down to the left, held by a laterite pier; a cream plaster ground floor with a solid hardwood door and a timber-framed window; a cream first-floor balcony box with trailing creepers over its edge; a central laterite volume with a full-height screen of vertical timber battens; on the right a large cream plaster volume with a steep mono-pitch roof rising to the right and a big picture window on the upper floor with warm light inside; a lower clay-tile lean-to canopy over the ground-floor windows on the right; grey stone planters with tropical planting; stone steps; wet stone forecourt; coconut palms and canopy behind. Proportions and perspective must be CORRECTED. All elements fully three-dimensional.",
  "output_format": {"aspect_ratio": "16:9", "orientation": "landscape", "resolution": "3840x2160 minimum"},
  "camera_gear": {"lens": "45mm medium format (35mm equivalent), shift for parallel verticals", "aperture": "f/8", "iso": 400, "shutter": "1/15s", "support": "tripod at 1.5 m, same position logic as IMG-01 and IMG-02", "lens_character": "natural vignetting, faint chromatic aberration on the roof edges and on the picture window frame"},
  "composition": {
    "angle": "Square-on frontal elevation, same horizon (38%) and camera height as IMG-01 and IMG-02. Correct converging verticals and any tilt in the balcony and canopy lines.",
    "framing": "House occupies the centre-right 70%, right edge at 95%. Extend left with wet forecourt, the carport pier and a low garden wall with creeper. Left 30% calm for text.",
    "depth_layers": "wet road with granite kerb → paved forecourt → planters and steps → façade (sharp) → palms and canopy → sky",
    "focus": "Façade sharp; foreground and top corners soften gently"
  },
  "materials": {
    "laterite": "Porous laterite blocks with rust-ochre variation and damp dark base",
    "plaster": "Lime plaster, warm white, soft trowel texture, grey drip streaks under the picture window sill",
    "timber": "Vertical battens as individual square sections with their own shadows; hardwood door; timber-finish soffit under the carport and lean-to canopy",
    "roof": "Clay tile rows with tonal variation and a little moss; dark fascias and half-round gutters with downpipes",
    "stone": "Wet granite paving and steps; grey stone planters with water marks",
    "glass": "Upper picture window shows a warm interior with a floor lamp and bookshelves, faint sky reflection across the pane"
  },
  "furniture_and_objects": {
    "planting": "Creepers trailing from the balcony box, heliconia and ferns in the planters, a young mango tree at the right edge",
    "lighting_fixtures": "Soffit downlights at the door and under the lean-to canopy, planter uplights on laterite and battens",
    "paired_shadows": "Carport pier and planters cast contact shadows on the paving and softer projection shadows on the plaster",
    "details": "A pair of slippers on the step, a watering can by the planter, a parcel on the bench by the door"
  },
  "life_elements": {
    "figures": "One figure seen through the upper picture window, motion-blurred, crossing the room, partly cut by the window frame",
    "animals": "Optionally a pariah dog resting under the carport, soft blur, at the left frame edge"
  },
  "lighting": {
    "time": "Early evening after rain, same sky as IMG-01",
    "sources": "Cool 5600K ambient; warm 2700K interior through the picture window; 3000K soffit downlights; 2400K uplights on laterite",
    "gradient": "Brightest at the picture window and entrance, falling off to cooler grey at the roof edges and the left carport",
    "bounce": "Warm window light spills onto the lean-to canopy tiles and the paving below"
  },
  "photographic_quality": {
    "grain": "ISO 400 fine grain in the sky and under the carport",
    "reflections": "Puddles reflect the picture window and uplit battens as warm distorted shapes",
    "imperfections": ["creeper tendrils uneven over the balcony edge", "algae at the planter base", "leaves on the wet paving", "moss on lower roof tiles", "hairline crack in plaster beside the door", "rust mark at a gutter bracket", "a slightly faded door threshold"]
  },
  "style_reference": "Sebastian Zachariah for AD India: a real photograph, not a render. The largest of the three houses, lit from within on a wet evening."
}
```

---

## 2. The Moorings (Block C cluster)

### IMG-04 · The Moorings · street view

```json
{
  "shot_type": "Real architectural photograph of a pair of courtyard homes seen from the lane, with a canopy tree in the gap between them. Sony A7R V, 35mm, f/8, ISO 400, 1/15s, tripod. Not a render.",
  "source_image": "The attached image is a SUGGESTIVE reference. It shows: two mirrored two-storey homes on either side of a central opening; each has a laterite volume with vertical timber battens, a cream plaster volume with a first-floor terrace parapet, a small clay-tile lean-to porch roof on timber posts over the entrance, grey stone planter plinths and low planting; between them a raised planter with a large spreading canopy tree visible behind a low wall, marking the entrance to a shared court; a paved footpath and an asphalt lane in the foreground; coconut palms behind. Proportions and perspective must be CORRECTED. All elements fully three-dimensional.",
  "output_format": {"aspect_ratio": "16:9", "orientation": "landscape", "resolution": "3840x2160 minimum"},
  "camera_gear": {"lens": "35mm", "aperture": "f/8", "iso": 400, "shutter": "1/15s", "support": "tripod at 1.5 m", "lens_character": "natural vignetting, faint chromatic aberration on the tree canopy edge against the sky"},
  "composition": {
    "angle": "Frontal, symmetrical, centred on the gap and the tree. Correct the slight upward tilt in the source so verticals are parallel.",
    "framing": "Both homes fully in frame with their outer edges at 12% and 88%. Tree canopy centred and rising above the rooflines. Lower 25% is the wet lane, calm for text.",
    "depth_layers": "wet asphalt lane with a granite kerb → paved footpath → planters and porch steps → the two façades → the shared court and tree in the gap → palms → sky",
    "focus": "Façades and gateway sharp; lane softens in the foreground"
  },
  "materials": {
    "laterite": "Porous laterite with rust and ochre variation, damp at the base",
    "plaster": "Warm white lime plaster with soft trowel marks and faint rain streaks",
    "timber": "Vertical battens as separate sections; timber porch posts with steel base shoes",
    "roof": "Clay-tile lean-to porches with tonal variation, dark fascias and gutters",
    "ground": "Wet asphalt lane, granite kerb, grey stone footpath with a gap into the court paved in warm sandstone"
  },
  "furniture_and_objects": {
    "tree": "A large rain tree or mango with a broad, layered canopy; the trunk visible through the gateway with a laterite-edged raised bed at its base; the canopy casts dappled shade on the court floor",
    "planting": "Low hedges, heliconia and ferns in the planters",
    "lighting_fixtures": "Porch downlights, bollards at the gateway, tree uplight",
    "paired_shadows": "Porch posts and planters cast contact shadows on the footpath and projection shadows on the plaster",
    "details": "A string of paper lanterns strung across the court beyond the gateway (dark, not lit), a stack of folding chairs just visible behind the low wall, a bicycle at one porch"
  },
  "life_elements": {
    "figures": "Two figures walking into the gateway carrying a large steel vessel between them, motion-blurred at 1/15s, backs to camera, small in frame",
    "animals": "None"
  },
  "lighting": {
    "time": "Early evening after rain",
    "sources": "Cool 5600K overcast ambient; warm 2700K porch lights; 2400K uplight in the tree; a warm glow from the court beyond the gateway",
    "gradient": "The gateway and the court beyond are the brightest, warmest point; façades cooler towards the outer edges",
    "bounce": "Court glow bounces onto the underside of the canopy"
  },
  "photographic_quality": {
    "grain": "ISO 400 fine grain in the sky and shaded porch soffits",
    "reflections": "Wet lane reflects the gateway glow and porch lights as broken warm streaks",
    "imperfections": ["patched asphalt near the kerb", "algae on the planter plinths", "fallen leaves in the gutter line", "a faded house number plate", "hairline cracks in plaster", "a dented downpipe"]
  },
  "style_reference": "Iwan Baan documentary register: a real photograph, not a render. The moment before a family gathering, seen from the lane."
}
```

### IMG-05 · The Moorings · aerial into the shared court

```json
{
  "shot_type": "Real elevated photograph looking down into a shared court between four homes. DJI Mavic 3 Pro Hasselblad camera, 24mm equivalent, f/5.6, ISO 200, 1/250s, hovering at 12 m. Not a render.",
  "source_image": "The attached image is a SUGGESTIVE reference. It shows: an elevated view down a central paved court; two clay-tile pitched porch roofs in the near foreground framing the view; cream plaster L-shaped homes on both sides with upper-floor windows and flat roof terraces with parapets; laterite accent walls; a large tree in a raised laterite-edged planter at the centre of the court; warm sandstone paving; coconut palms and canopy beyond. Proportions and perspective must be CORRECTED. All elements fully three-dimensional.",
  "output_format": {"aspect_ratio": "16:9", "orientation": "landscape", "resolution": "3840x2160 minimum"},
  "camera_gear": {"lens": "24mm equivalent", "aperture": "f/5.6", "iso": 200, "shutter": "1/250s", "support": "drone, hovering", "lens_character": "natural vignetting, very slight barrel distortion corrected, faint chromatic aberration on white parapets against dark foliage"},
  "composition": {
    "angle": "Elevated, looking down the axis of the court at about 35 degrees. Keep the court axis centred; correct any keystone so the parapets read level.",
    "framing": "Extend both sides to show all four homes and a strip of the lanes outside the cluster. Upper 25% is canopy and horizon haze, calm for text.",
    "depth_layers": "near porch roofs (soft) → court floor and tree (sharp) → far pair of homes → coconut and areca groves → hazy ridgeline",
    "focus": "Court and tree sharp; foreground roofs slightly soft"
  },
  "materials": {
    "roof": "Clay tiles with tonal variation, moss in the valleys, dark gutters",
    "plaster": "Warm white parapets with rain streaks and algae at the drip edges",
    "laterite": "Accent walls and the planter edge, porous and rust-toned",
    "paving": "Warm sandstone slabs, some darker where damp, fine gaps with grass"
  },
  "furniture_and_objects": {
    "tree": "Spreading canopy tree with a visible branch structure, casting a large dappled shadow across the court",
    "setting": "A long timber dining table under the tree with benches, a few cane chairs pulled around it, a service trolley near one door",
    "paired_shadows": "Table and benches: each leg casts a separate thin shadow on the sandstone"
  },
  "life_elements": {
    "figures": "One adult laying a cloth on the table, one child running across the court, both small, slightly motion-blurred, not facing camera",
    "animals": "None"
  },
  "lighting": {
    "time": "Late afternoon, clear with scattered cloud",
    "sources": "Warm 4500K raking sun from the west; cool 7000K sky fill in the shadows; warm interior light visible in one doorway",
    "gradient": "West-facing walls warm and bright, court floor half in dappled shade, far homes softer in haze",
    "bounce": "Sunlit sandstone bounces warm light into the undersides of the porch roofs"
  },
  "photographic_quality": {
    "grain": "ISO 200, minimal, visible in shadowed roof valleys",
    "imperfections": ["moss in roof valleys", "a few dry leaves on the court", "algae streaks on parapets", "uneven wear on the sandstone near doorways", "one cane chair slightly frayed", "a hose coiled by a tap"]
  },
  "style_reference": "Iwan Baan aerial register: a real photograph, not a render. Four homes and one tree, ready for a family lunch."
}
```

### IMG-06 · The Moorings · eye level in the court (gathering)

```json
{
  "shot_type": "Real photograph at eye level inside a shared residential court set for a family event. Canon EOS R5, RF 28mm, f/5.6, ISO 200, 1/60s, handheld documentary. Not a render.",
  "source_image": "The attached image is a SUGGESTIVE reference. It shows: a court paved in warm sandstone; a large spreading tree in a raised planter edged in laterite with dense low planting; cream plaster homes on both sides with clay-tile lean-to canopies, large windows and upper terraces; palms and blue sky. Proportions and perspective must be CORRECTED. All elements fully three-dimensional.",
  "output_format": {"aspect_ratio": "16:9", "orientation": "landscape", "resolution": "3840x2160 minimum"},
  "camera_gear": {"lens": "28mm", "aperture": "f/5.6", "iso": 200, "shutter": "1/60s (1/15s for the moving figure)", "support": "handheld at 1.5 m", "lens_character": "natural vignetting, faint chromatic aberration on bright plaster edges against leaves"},
  "composition": {
    "angle": "Eye level from one corner of the court, looking diagonally across the tree to the far homes. Correct leaning verticals from the source.",
    "framing": "Tree at the right third, open court floor in the left half for text. Extend the right side to include the dining pavilion edge.",
    "depth_layers": "foreground planting (soft) → sandstone court with a long table → tree and planter (sharp) → far homes and pavilion → palms → sky",
    "focus": "Tree and table sharp; foreground leaves soft"
  },
  "materials": {
    "paving": "Warm sandstone slabs with natural variation and slight wear",
    "planter": "Laterite-edged raised bed with a concrete coping, porous blocks, moss at the base",
    "plaster": "Warm white with soft trowel texture",
    "canopies": "Clay-tile lean-to on timber rafters, underside visible"
  },
  "furniture_and_objects": {
    "table": "A long hardwood table with a handloom cotton runner, steel tumblers, banana leaves laid as plates at each seat, a brass lamp at one end",
    "seating": "Cane chairs and timber benches; each leg casts its own thin shadow",
    "pavilion": "Edge of an open timber dining pavilion with a service counter, large steel vessels on it",
    "lights": "Strings of warm bulbs hung between the tree and the canopies, off in daylight, with visible cable and hooks",
    "paired_shadows": "Brass lamp: highlight on its curved body, contact shadow on the runner"
  },
  "life_elements": {
    "figures": "One person in a cotton sari carrying a stack of banana leaves, motion-blurred at 1/15s, at the left edge and partly cropped; one child under the tree, soft",
    "lived_in": "A folded newspaper on a bench, a pair of chappals by the planter"
  },
  "lighting": {
    "time": "Bright late morning",
    "sources": "Warm 5000K sun from high east; cool 7500K sky fill; dappled light through the canopy onto table and paving",
    "gradient": "Sunlit far façades bright, court floor under the tree in cooler dappled shade",
    "bounce": "Sunlit sandstone bounces warm light onto the underside of the canopy and table"
  },
  "photographic_quality": {
    "grain": "ISO 200, minimal, in shaded plaster",
    "imperfections": ["a wine-coloured stain on the runner", "dry leaves on the paving", "wear on the bench top", "a chipped coping stone", "moss at the planter base", "a tangled light cable"]
  },
  "style_reference": "Raghu Rai colour documentary: a real photograph, not a render. The court as the family's room for the day."
}
```

---

## 3. Masterplan and apartment

### IMG-07 · Illustrated masterplan (16:9 base for the map module)

This one is an illustration, not a photograph. It sits under the interactive plot and amenity layers, so **geometry matters more than mood**. Use the sanctioned layout (`Web Assets/Masterplan/sanctioned_layout_crop.jpg`) as the geometric reference and the existing watercolour masterplan as the style reference.

```json
{
  "shot_type": "Top-down (orthographic) watercolour masterplan illustration of a gated villa neighbourhood with one apartment tower. Not a photograph, not a 3D render.",
  "source_image": "Two references. GEOMETRY: the sanctioned layout, which must be followed for road alignment, plot divisions and open spaces: a 12 m road entering from the top and curving down; 9 m roads branching to four villa blocks (D top-left with three plots, C in the middle with four plots arranged 2x2 around a shared court, B left with three plots, A along the right with six plots in a row); open-space pockets at the entry, beside the 12 m road, a teardrop island, a strip along the north edge of block C, a pocket east of plot 1 and a garden at the southern entry; the apartment tower parcel to the upper left with parking. STYLE: the existing watercolour masterplan: soft ink linework, watercolour washes, clay-tile roofs seen from above, deep green tree canopy masses around the edges, grey roads with white centre lines, paper texture border.",
  "output_format": {"aspect_ratio": "16:9", "orientation": "landscape", "resolution": "3840x2160 minimum"},
  "illustration_medium": {"technique": "Ink line on cold-press watercolour paper with transparent washes", "palette": "Muted greens for canopy, warm terracotta for roofs, warm grey for roads, pale sandstone for paths, one cool slate-blue for water in the rain garden", "line": "Fine sepia ink, slightly wobbly, hand-drawn"},
  "composition": {
    "angle": "Pure top-down plan view, north up. Rotate the site so its long axis runs diagonally from upper left to lower right and the whole site fits with margin.",
    "framing": "Site occupies the central 70% of the width. Surroundings: areca and coconut groves to the east, paddy fields with water in the furrows to the north-east, scrub and trees to the west, the access road entering at the top.",
    "calm_zone": "Leave the lower-left 30% as soft paper and pale wash for the legend and title",
    "labels": "NO text, NO numbers, NO plot labels. The interactive layer adds them."
  },
  "materials": {"roofs": "Clay-tile pitched roofs from above with ridge lines; the tower roof flat with solar panels", "courts": "Each villa shows a small open-to-sky court as a darker square in the roof; block C shows one larger shared court with a tree", "ground": "Lawns in light green wash, paths in sandstone, the rain garden as a slate-blue wash with stepping stones"},
  "furniture_and_objects": {"trees": "Canopy trees as layered watercolour blobs with a darker shadow on the lower right of each; a single large tree on the teardrop island; a tree in the Moorings court", "pools": "Small turquoise plunge pools in the villas on the larger plots (1, 2, 5, 14)", "cars": "A few cars parked under carports, drawn simply"},
  "life_elements": {"figures": "None at this scale"},
  "lighting": {"time": "Implied late-morning light from the upper left", "shadows": "Every building and tree casts a soft wash shadow to the lower right, consistent direction"},
  "photographic_quality": {"texture": "Visible paper grain, pigment granulation in the green washes, slight bleeding at wash edges", "imperfections": ["uneven wash density in large lawns", "a small water bloom in one corner", "slight pencil guidelines visible under the ink in places", "ink line breaks at some roof ridges", "paper edge slightly deckled"]},
  "style_reference": "Hand-drawn landscape architecture presentation plans in the tradition of Geoffrey Bawa's studio drawings and contemporary Indian landscape offices: calm, accurate, legible from a distance."
}
```

### IMG-08 · The Lookout · apartment tower (teaser)

```json
{
  "shot_type": "Real architectural photograph of a slender residential tower seen from a tree-lined street, with a clay-tile-roofed villa in the foreground left. Sony A7R V, 24mm tilt-shift, f/8, ISO 800, 1/8s, tripod. Not a render.",
  "source_image": "The concept presentation render (p.48) is a SUGGESTIVE reference. It shows: a tall slender tower in warm white concrete frame with deep recessed balconies and vertical terracotta screen panels; planting on some balconies; a glazed lit ground-floor lobby; a street with palms and street trees framing it; a villa roof in the left foreground. Proportions must be CORRECTED; the tower has 22 residential floors above a podium; do not add floors.",
  "output_format": {"aspect_ratio": "16:9", "orientation": "landscape", "resolution": "3840x2160 minimum"},
  "camera_gear": {"lens": "24mm tilt-shift, shifted up to keep the tower vertical", "aperture": "f/8", "iso": 800, "shutter": "1/8s", "support": "tripod", "lens_character": "natural vignetting, faint chromatic aberration at the tower edge against the sky"},
  "composition": {
    "angle": "From the internal road, looking up at the tower with verticals kept parallel.",
    "framing": "Tower at the right third, full height with sky above. Left 40% is the villa roofline, canopy and dusk sky, calm for text.",
    "depth_layers": "wet road (foreground) → laterite boundary wall and planting → villa roof at left → tower (sharp) → sky"
  },
  "materials": {"frame": "Board-marked warm white concrete with rain streaks below balcony edges", "screens": "Terracotta baguette screens with slight colour variation", "balconies": "Deep balconies with timber-finish soffits and planters, some with cane chairs visible"},
  "furniture_and_objects": {"details": "Some balconies lit, some dark, curtains at different positions, a bicycle on one balcony, planters with trailing plants; street light on a slim pole with its cable housing visible"},
  "life_elements": {"figures": "One figure on a mid-level balcony, small and still; a car's tail-light streak on the road at the lower right"},
  "lighting": {"time": "Blue hour after rain", "sources": "Cool 8000K blue-hour sky; warm 2700K lit homes; 3000K lobby glow; 4000K street light", "gradient": "Tower top catches the last cool light, lower floors warmer and brighter; road reflects the lobby glow"},
  "photographic_quality": {"grain": "ISO 800, pronounced in the sky and shadowed balconies", "imperfections": ["rain streaks on the concrete", "a few balconies with drying clothes", "uneven curtain positions", "algae at the boundary wall base", "puddles with floating leaves", "a slightly misaligned screen panel"]},
  "style_reference": "Iwan Baan urban register: a real photograph, not a render. A tower with verandahs, not a glass box."
}
```

---

## 4. Amenity marketing illustrations (AM series)

These are **illustrations**, one per amenity, used on the amenity cards and as map pop-ups. They share one visual language with the two existing watercolour illustrations in `Conceptual Renders/` (the neighbourhood lane and the neighbourhood verandah).

**Shared style block** (already included in each prompt below):

- Ink line on cold-press paper with transparent watercolour washes; soft vignette where the painting fades to white paper at the edges.
- Eye-level or gentle three-quarter view, 16:9, subject in the right two-thirds, the left third fading to paper for text.
- Monsoon-season greens, warm clay roofs, sandstone paths, one cool slate-blue for water and sky shadows.
- Two to three small figures at most, never facing the viewer, at least one cropped by the vignette edge.
- No text, no signage wording, no logos.

### AM-01 · Arrival Court and Gatehouse

```json
{
  "shot_type": "Watercolour marketing illustration of a shaded arrival court and small gatehouse at the entrance to a villa neighbourhood.",
  "source_image": "No source. Build from this description.",
  "output_format": {"aspect_ratio": "16:9", "orientation": "landscape"},
  "illustration_medium": {"technique": "Ink line and transparent watercolour on cold-press paper, soft white vignette at the edges", "palette": "Monsoon greens, warm clay roof, sandstone paving, slate-blue shadows"},
  "composition": {"angle": "Three-quarter view from just inside the gate", "layers": "sandstone paving with inset granite bands (foreground) → a low gatehouse with a clay-tile pitched roof and a deep verandah, a timber counter and a bench → two large rain trees arching over the drive → a glimpse of the first villas down the lane", "calm_zone": "Left third fades to paper"},
  "materials": {"gatehouse": "Lime-plaster walls, laterite plinth, timber louvred shutters, clay-tile roof with deep eaves", "ground": "Sandstone slabs with granite bands, a slight camber and a drain channel with a grate"},
  "furniture_and_objects": {"objects": "A timber parcel shelf with a few wrapped parcels, a potted areca palm, a slim bollard light, a low laterite wall with a planted top", "shadows": "Every object casts a soft wash shadow to the lower right"},
  "life_elements": {"figures": "A guard in a light uniform lifting the boom, seen from the side; a traveller with a wheeled suitcase walking away from the viewer into the lane, cropped by the vignette"},
  "lighting": {"time": "Early evening after rain", "light": "Cool grey sky wash, warm lamplight in the gatehouse window, wet paving shown with broken reflections"},
  "photographic_quality": {"texture": "Paper grain, pigment granulation in foliage, small blooms in the sky wash", "imperfections": ["uneven wash on the wall", "a few leaves on the paving", "ink line breaks", "slight bleed at the canopy edges", "a pencil guide visible under the roof"]},
  "style_reference": "Contemporary Indian architectural watercolour, in the same hand as the existing Tranquil Bay neighbourhood illustrations: calm, accurate, lived-in."
}
```

### AM-02 · The Shaded Walk

```json
{
  "shot_type": "Watercolour marketing illustration of a tree-lined footpath running between villa gardens, with seating pockets.",
  "source_image": "Use Conceptual Renders/Marakada_visualisation 6.png (the lane) as a loose reference for materials only; re-draw as a footpath, not a road.",
  "output_format": {"aspect_ratio": "16:9", "orientation": "landscape"},
  "illustration_medium": {"technique": "Ink line and transparent watercolour, soft white vignette", "palette": "Monsoon greens, sandstone, slate-blue shadow"},
  "composition": {"angle": "Eye level, looking along the path as it curves gently away", "layers": "a stone bench set into a planted laterite edge (foreground) → a 2 m sandstone path with a granite edge and a planted swale beside it → villa garden walls with creepers and gates → a continuous canopy of mango, jackfruit and rain trees overhead → light at the far end", "calm_zone": "Left third fades to paper"},
  "materials": {"path": "Sandstone slabs, level, with grass in the joints", "edges": "Laterite coping, low planted walls, timber gates"},
  "furniture_and_objects": {"objects": "A second bench further along, a bollard light at the curve, a small drinking-water tap on a stone post", "shadows": "Dappled canopy shadows across the path, consistent direction"},
  "life_elements": {"figures": "An older couple walking away from the viewer, one with a walking stick; a child on a small bicycle far ahead, partly cropped"},
  "lighting": {"time": "Early morning", "light": "Low warm sun raking through the canopy, cool blue shade on the path"},
  "photographic_quality": {"texture": "Paper grain, granulation in the canopy", "imperfections": ["uneven wash on the path", "fallen leaves", "a small bloom in the shade", "ink breaks", "slight bleed at canopy edges"]},
  "style_reference": "Same hand as the existing Tranquil Bay neighbourhood illustrations."
}
```

### AM-03 · The Neighbourhood Verandah

The existing illustration `Conceptual Renders/Marakada_illustration 2.png` already shows this (tiled pavilion, reading room, lawn with children). Re-render to 16:9 only if needed:

```json
{
  "shot_type": "Watercolour marketing illustration of an open-sided community pavilion with a reading room, a long table and a lawn in front.",
  "source_image": "The attached illustration (Marakada_illustration 2.png) is the reference. Keep: the long clay-tile roof on white piers, the laterite end wall, the bookshelves, the lanterns, the stepped seating to the lawn, the ramp with a steel rail on the right, the frangipani on the left. CORRECT the perspective of the steps and ramp. Widen to 16:9 by extending the lawn to the left.",
  "output_format": {"aspect_ratio": "16:9", "orientation": "landscape"},
  "illustration_medium": {"technique": "Ink line and transparent watercolour, soft white vignette", "palette": "As source"},
  "composition": {"angle": "As source, slightly lower and wider", "layers": "lawn with children (foreground) → stepped laterite seating → pavilion floor with tables → bookshelves and end wall → palms", "calm_zone": "Extended lawn on the left fades to paper"},
  "furniture_and_objects": {"objects": "Cane chairs around long tables, board games on one table, cotton cushions on the steps, three woven lanterns hanging on visible cords", "shadows": "Wash shadows under the roof and from each pier"},
  "life_elements": {"figures": "Reduce to three: one reader at a table, two children on the lawn, none facing the viewer"},
  "lighting": {"time": "Late afternoon", "light": "Warm sun from the left, cool shade under the roof"},
  "photographic_quality": {"imperfections": ["uneven lawn wash", "a book left open on the steps", "ink breaks", "granulation in the roof", "a bloom in the sky"]},
  "style_reference": "Same hand as the source."
}
```

### AM-04 · The Tree Circle

```json
{
  "shot_type": "Watercolour marketing illustration of a raised circular planted bed around one large canopy tree, with a ring bench, on a traffic island inside a residential estate.",
  "source_image": "No source.",
  "output_format": {"aspect_ratio": "16:9", "orientation": "landscape"},
  "illustration_medium": {"technique": "Ink line and transparent watercolour, soft white vignette", "palette": "Deep greens, laterite, sandstone, slate-blue shadow"},
  "composition": {"angle": "Gentle three-quarter view from the road edge", "layers": "grey road with a white edge line (foreground) → a laterite ring wall with a sandstone coping forming a bench → low planting of ferns and spider lilies → a single broad rain tree with a wide umbrella canopy filling the upper frame → the gatehouse roof glimpsed behind", "calm_zone": "Left third fades to paper"},
  "furniture_and_objects": {"objects": "A brass bell hung from a low branch, a small uplight at the base, a cyclist's bicycle leaning on the ring bench", "shadows": "Large dappled canopy shadow over the ring and road"},
  "life_elements": {"figures": "One person sitting on the ring bench reading, seen from behind"},
  "lighting": {"time": "Mid-morning", "light": "Bright sun through the canopy, cool shade under it"},
  "photographic_quality": {"imperfections": ["uneven ring wall wash", "leaves on the road", "ink breaks", "granulation in the canopy", "slight bleed at edges"]},
  "style_reference": "Same hand as the existing Tranquil Bay neighbourhood illustrations."
}
```

### AM-05 · Play Garden and Sand Court

```json
{
  "shot_type": "Watercolour marketing illustration of a small play garden with grass mounds, a sand court and a shallow splash channel, overlooked by villas.",
  "source_image": "No source.",
  "output_format": {"aspect_ratio": "16:9", "orientation": "landscape"},
  "illustration_medium": {"technique": "Ink line and transparent watercolour, soft white vignette", "palette": "Fresh greens, warm sand, slate-blue water"},
  "composition": {"angle": "Three-quarter view from a raised edge", "layers": "stone seat on the edge (foreground) → two grass mounds with stone slides set into them → a round sand court with a timber edge → a narrow stone channel with a few centimetres of water → villa garden walls and upper windows behind", "calm_zone": "Left third fades to paper"},
  "furniture_and_objects": {"objects": "A timber play frame with a rope, a few buckets and spades in the sand, a shade tree over the sand court", "shadows": "Consistent soft wash shadows"},
  "life_elements": {"figures": "Two children: one sliding down a mound, one squatting at the channel; a parent seated at the far edge, small, cropped"},
  "lighting": {"time": "Late afternoon", "light": "Warm low sun, long shadows from the mounds"},
  "photographic_quality": {"imperfections": ["footprints in the sand", "splashes on the stone", "ink breaks", "uneven grass wash", "a bloom in the sky"]},
  "style_reference": "Same hand as the existing Tranquil Bay neighbourhood illustrations."
}
```

### AM-06 · The Quiet Lawn

```json
{
  "shot_type": "Watercolour marketing illustration of a long, calm lawn along a boundary edge with a timber yoga deck and hammock posts.",
  "source_image": "No source.",
  "output_format": {"aspect_ratio": "16:9", "orientation": "landscape"},
  "illustration_medium": {"technique": "Ink line and transparent watercolour, soft white vignette", "palette": "Soft greens, pale timber, morning mist blue"},
  "composition": {"angle": "Eye level along the length of the lawn", "layers": "tall grass tufts (foreground) → mown lawn → a low timber deck with two rolled mats → timber posts with a cotton hammock → a boundary hedge and beyond it the tops of areca palms in mist", "calm_zone": "Left third fades to paper"},
  "furniture_and_objects": {"objects": "A brass water pot on the deck, a folded shawl, a small lamp post at the far end", "shadows": "Long soft shadows from the posts"},
  "life_elements": {"figures": "One person seated cross-legged on the deck, back to viewer"},
  "lighting": {"time": "Dawn", "light": "Pale warm light low on the horizon, cool mist in the background"},
  "photographic_quality": {"imperfections": ["dew suggested with lifted-out highlights", "uneven lawn wash", "ink breaks", "granulation", "a small pencil guide on the deck"]},
  "style_reference": "Same hand as the existing Tranquil Bay neighbourhood illustrations."
}
```

### AM-07 · Rain Garden at the South Gate

```json
{
  "shot_type": "Watercolour marketing illustration of a planted rain garden hollow partly filled with water after monsoon rain, with stepping stones and a stone bench.",
  "source_image": "No source.",
  "output_format": {"aspect_ratio": "16:9", "orientation": "landscape"},
  "illustration_medium": {"technique": "Ink line and transparent watercolour, soft white vignette", "palette": "Deep wet greens, slate-blue water, grey sky"},
  "composition": {"angle": "Three-quarter view from the path edge", "layers": "a laterite-edged path (foreground) → a shallow hollow with reeds, canna and spider lily, water mirroring the sky → a line of flat stepping stones across it → a granite bench on the far side → the south gate wall and a villa roof beyond", "calm_zone": "Left third fades to paper"},
  "furniture_and_objects": {"objects": "A stone spout where a channel enters the hollow, a small timber footbridge, rain chains from a nearby canopy", "shadows": "Soft, overcast"},
  "life_elements": {"figures": "A child in a raincoat on the stepping stones, seen from behind, with an adult holding an umbrella at the edge, cropped"},
  "lighting": {"time": "Monsoon afternoon, light drizzle", "light": "Flat grey light, drizzle suggested with fine diagonal lifted lines"},
  "photographic_quality": {"imperfections": ["ripples in the water", "wet leaves on the stones", "ink breaks", "blooms in the wet sky wash", "granulation in the reeds"]},
  "style_reference": "Same hand as the existing Tranquil Bay neighbourhood illustrations."
}
```

### AM-08 · Kitchen Garden and Orchard

```json
{
  "shot_type": "Watercolour marketing illustration of raised vegetable beds, a potting shed and young fruit trees on a narrow garden strip.",
  "source_image": "No source.",
  "output_format": {"aspect_ratio": "16:9", "orientation": "landscape"},
  "illustration_medium": {"technique": "Ink line and transparent watercolour, soft white vignette", "palette": "Leaf greens, laterite, terracotta pots"},
  "composition": {"angle": "Three-quarter view along the beds", "layers": "a bed of chillies and brinjal (foreground) → laterite-edged raised beds with gourds on a bamboo trellis → a small clay-tile potting shed with tools → young mango, chikoo and guava trees → a boundary hedge", "calm_zone": "Left third fades to paper"},
  "furniture_and_objects": {"objects": "A woven basket of harvested greens, a coiled hose, terracotta pots, a timber noticeboard with no text", "shadows": "Consistent soft wash shadows"},
  "life_elements": {"figures": "A gardener bending over a bed, side view; a resident holding the basket, back to viewer, cropped"},
  "lighting": {"time": "Early morning", "light": "Warm low sun, dew highlights"},
  "photographic_quality": {"imperfections": ["soil splash on the bed edges", "a yellowing leaf", "ink breaks", "uneven wash", "granulation in foliage"]},
  "style_reference": "Same hand as the existing Tranquil Bay neighbourhood illustrations."
}
```

### AM-09 · The Moorings Court (event evening)

```json
{
  "shot_type": "Watercolour marketing illustration of a shared court between four homes set up for an evening family celebration.",
  "source_image": "Use Web Assets/Cluster/moorings_court_eye.jpg as the spatial reference: sandstone court, large tree in a laterite-edged planter, cream plaster homes with clay-tile lean-tos on both sides.",
  "output_format": {"aspect_ratio": "16:9", "orientation": "landscape"},
  "illustration_medium": {"technique": "Ink line and transparent watercolour, soft white vignette", "palette": "Warm lamp gold, deep evening blue, sandstone, greens"},
  "composition": {"angle": "Eye level from a corner of the court", "layers": "a stack of banana leaves on a side table (foreground) → a long table under the tree with brass lamps → strings of warm bulbs from the tree to the eaves → the dining pavilion with steel vessels → homes with lit doorways", "calm_zone": "Left third fades to paper"},
  "furniture_and_objects": {"objects": "Cane chairs, a rangoli pattern in white on the sandstone near the tree, marigold strings on the doorways", "shadows": "Warm pools of light under the bulbs, cool blue between"},
  "life_elements": {"figures": "Three small figures at most: one lighting a lamp, two seated at the table, none facing the viewer"},
  "lighting": {"time": "Blue hour", "light": "Deep blue sky wash, warm lamp and bulb light pooling on the table and court"},
  "photographic_quality": {"imperfections": ["uneven rangoli line", "a petal trail on the paving", "ink breaks", "blooms in the sky", "granulation in the tree"]},
  "style_reference": "Same hand as the existing Tranquil Bay neighbourhood illustrations."
}
```

### AM-10 · Clubhouse and Lap Pool (phase 2)

```json
{
  "shot_type": "Watercolour marketing illustration of a lap pool on the podium of a residential tower with a shaded café terrace and gym behind glass.",
  "source_image": "Loose material reference: Conceptual Renders/Marakada_visualisation 8.png (pool against a long wall).",
  "output_format": {"aspect_ratio": "16:9", "orientation": "landscape"},
  "illustration_medium": {"technique": "Ink line and transparent watercolour, soft white vignette", "palette": "Turquoise water, warm white concrete, terracotta screens, greens"},
  "composition": {"angle": "Eye level along the pool length", "layers": "pool edge with a folded towel on a timber lounger (foreground) → a 25 m lap pool along a planted laterite wall → a shaded terrace with a timber pergola and café tables → glazed gym behind → the tower base rising out of frame", "calm_zone": "Left third fades to paper"},
  "furniture_and_objects": {"objects": "Loungers with separate legs and shadows, a potted frangipani, an outdoor shower on a timber panel", "shadows": "Pergola slats cast striped shadows on the terrace"},
  "life_elements": {"figures": "One swimmer mid-length, one person at a café table reading, back to viewer"},
  "lighting": {"time": "Morning", "light": "Warm sun from the east, cool reflections on the water"},
  "photographic_quality": {"imperfections": ["ripples and caustic lines", "wet footprints on the deck", "ink breaks", "uneven wash on the concrete", "granulation in the planting"]},
  "style_reference": "Same hand as the existing Tranquil Bay neighbourhood illustrations. Caption in brochure must say 'Phase 2'."
}
```

### AM-11 · Home Keeper (service illustration)

```json
{
  "shot_type": "Watercolour marketing illustration of a villa being prepared for its owners' arrival: shutters opened, verandah swept, lamp lit.",
  "source_image": "Loose reference: Conceptual Renders/Marakada_visualisation 9.png (rain verandah at dusk).",
  "output_format": {"aspect_ratio": "16:9", "orientation": "landscape"},
  "illustration_medium": {"technique": "Ink line and transparent watercolour, soft white vignette", "palette": "Warm lamp gold, cool dusk blue, laterite, greens"},
  "composition": {"angle": "Three-quarter view of a villa entrance verandah", "layers": "wet paving with a small electric service buggy parked (foreground) → verandah with a built-in seat and a lamp being lit → open timber shutters → a court glimpsed through the door with its tree", "calm_zone": "Left third fades to paper"},
  "furniture_and_objects": {"objects": "A folded stack of fresh linen on the seat, a basket with fruit and milk, a broom leaning by the door, a set of keys on a hook", "shadows": "Warm light pool on the verandah floor"},
  "life_elements": {"figures": "One Home Keeper in a simple uniform opening a shutter, side view"},
  "lighting": {"time": "Dusk after rain", "light": "Cool blue ambient, warm lamp inside"},
  "photographic_quality": {"imperfections": ["drips from the eaves", "a leaf on the seat", "ink breaks", "blooms in the sky", "granulation in the planting"]},
  "style_reference": "Same hand as the existing Tranquil Bay neighbourhood illustrations."
}
```

---

## 5. A weekend at Tranquil Bay · story illustrations (WK series)

Nine illustrations for the scroll-driven weekend in chapter 03. They replace the renders and drone stills that were used as placeholders. The section now sits on the paper ground (`#F2EEE6`), so every illustration must dissolve into paper on its left side; the clock, chapter title and caption sit there.

### 5.1 Series bible (applies to every WK prompt)

**Medium.** Ink line with transparent watercolour on cold-press paper, the same hand as the AM series and the two existing neighbourhood illustrations. Loose where it is far, precise where it matters (eaves, railings, a teacup). The left 38% of the frame fades to bare paper through a soft, uneven wash edge, never a hard vignette.

**One family, one weekend.** The same people appear across the series so it reads as one story:
- *The owners:* a couple in their early forties who fly in from Bengaluru. She wears a cotton kurta and carries a canvas tote; he wears a linen shirt and has a small wheeled cabin bag.
- *Their daughter:* about nine, yellow raincoat, often running ahead.
- *The grandmother:* joins on Saturday; cotton sari, a shawl, walks with a cane.
- *The Home Keeper:* a man in his thirties in a simple olive uniform shirt.
Faces are never shown in detail: figures are small, turned away or in profile, drawn with a few strokes. No more than three figures per frame except WK-06.

**Time drives the palette.** Each frame's light is the time on the clock:

| Frame | Time | Light |
|---|---|---|
| WK-01 to WK-04 | Friday 18:40 to 19:25 | Monsoon dusk: slate-blue wash, warm lamp gold in pools |
| WK-05 | Saturday 06:30 | Pale mist, first warm light low on the horizon |
| WK-06 | Saturday 12:30 | Bright, dappled, the greens at full strength |
| WK-07 | Sunday 17:00 | Golden hour, long shadows |
| WK-08 | Monday 06:45 | Cool dawn, lamps being switched off |
| WK-09 | Monday 07:05 | Clean morning light through tall glass |

**Recurring motifs** (one or two per frame, never all): the yellow raincoat, the canvas tote, a steel tumbler of tea, the tree in The Moorings court, deep eaves dripping, the still reach of the river.

**Avoid.** Stock coastal imagery (beaches, fishing boats, temple towers, Yakshagana), airline or airport logos and signage, readable text of any kind, faces turned to the viewer, and the laterite-and-tile postcard as the subject. The architecture is present but is the setting, not the hero.

**Output.** 16:9, 3840 x 2160 minimum, sRGB JPG quality 90. File names `TB_WK01_16x9.jpg` to `TB_WK09_16x9.jpg` in `Web Assets/Rerenders/`. The module picks them up automatically.

### WK-01 · Friday 18:40 · Land at Mangaluru International

```json
{
  "shot_type": "Watercolour story illustration: view from an aircraft window during the evening descent over a river valley in coastal Karnataka.",
  "source_image": "Loose geographic reference: Web Assets/Drone/drone_still_01.jpg (the river held behind a vented dam, groves on both banks). Redraw from the air at a much higher altitude.",
  "output_format": {"aspect_ratio": "16:9", "orientation": "landscape"},
  "illustration_medium": {"technique": "Ink line and transparent watercolour on cold-press paper; left 38% dissolves into bare paper through an uneven wash edge", "palette": "Slate blue, deep canopy green, a thread of river silver, scattered warm lamp dots"},
  "composition": {
    "angle": "From inside the cabin, looking down and out through an oval aircraft window set in the right two-thirds of the frame; the window's curved frame and the edge of the seat back drawn in a few ink lines",
    "layers": "window frame and wing tip (foreground, simple line) → river winding through dark groves with the pale line of a dam across it → scattered village lights and a road → low hills fading into cloud",
    "calm_zone": "Left 38% bare paper; the window's outer edge fades into it"
  },
  "materials": {"cloud": "Soft wet-in-wet grey with a torn edge of warmer light low on the horizon", "river": "Left as white paper with a faint silver wash"},
  "furniture_and_objects": {"objects": "The girl's small hand and yellow raincoat sleeve on the window ledge, a boarding pass tucked in the seat pocket (no readable text)"},
  "life_elements": {"figures": "Only the child's sleeve and hand, cropped by the frame"},
  "lighting": {"time": "Dusk", "light": "Cool blue world below, a warm band of last light along the horizon, pinpricks of lamp gold in the villages"},
  "photographic_quality": {"texture": "Paper grain, granulation in the groves", "imperfections": ["water blooms in the cloud", "an ink line that breaks on the window curve", "uneven wash on the wing", "a small pencil guide under the dam", "pigment pooling at the river bend"]},
  "style_reference": "Same hand as the Tranquil Bay neighbourhood illustrations. A quiet opening frame: the first sight of home from the air."
}
```

### WK-02 · Friday 18:55 · The Home Keeper lights the verandah

```json
{
  "shot_type": "Watercolour story illustration of a villa verandah at dusk being readied for its owners: shutters open, a lamp being lit.",
  "source_image": "Spatial reference: Conceptual Renders/Marakada_visualisation 9.png (deep verandah, built-in seat, timber shutters, a court beyond). Redraw as illustration, widen to 16:9.",
  "output_format": {"aspect_ratio": "16:9", "orientation": "landscape"},
  "illustration_medium": {"technique": "Ink line and transparent watercolour; left 38% dissolves into paper", "palette": "Lamp gold, slate-blue dusk, damp laterite rust, deep greens"},
  "composition": {
    "angle": "Three-quarter view from the garden path, looking into the verandah",
    "layers": "wet stepping stones (foreground, loose) → verandah edge with a line of drips from the eave → built-in seat with folded linen and a basket of fruit and milk → tall timber shutters, one being folded back → the court beyond with a small tree",
    "calm_zone": "Left 38% paper"
  },
  "materials": {"eaves": "Clay-tile edge with a gutter and a chain of drips caught as dots of white", "floor": "Polished red oxide with a soft reflection of the lamp"},
  "furniture_and_objects": {"objects": "A brass lamp on a low stool, a folded stack of fresh linen, a set of keys on a hook, a broom leaning by the door", "shadows": "Warm pool of lamp light on the floor, the shutter throwing a long shadow into the room"},
  "life_elements": {"figures": "The Home Keeper in profile folding back a shutter"},
  "lighting": {"time": "Dusk after rain", "light": "Cool blue ambient, one warm lamp inside, a second glow from the court"},
  "photographic_quality": {"texture": "Paper grain, granulation in the planting", "imperfections": ["blooms in the dusk sky", "a leaf stuck to the seat", "ink breaks on the shutter slats", "uneven floor wash", "a stray drip mark"]},
  "style_reference": "Same hand as the Tranquil Bay neighbourhood illustrations. The house waking up before anyone arrives."
}
```

### WK-03 · Friday 19:15 · Through the gate

```json
{
  "shot_type": "Watercolour story illustration of a car's headlights entering a tree-lined arrival court past a small gatehouse on a wet evening.",
  "source_image": "No source. Setting matches AM-01 (Arrival Court and Gatehouse).",
  "output_format": {"aspect_ratio": "16:9", "orientation": "landscape"},
  "illustration_medium": {"technique": "Ink line and transparent watercolour; left 38% dissolves into paper", "palette": "Deep blue-green night, headlight white, lamp gold, wet road reflections"},
  "composition": {
    "angle": "Eye level from beside the gatehouse, the car arriving from the right and turning into the lane",
    "layers": "a raised boom barrier and the gatehouse verandah with a lit window (right foreground) → wet sandstone drive with long headlight reflections → a small car, simply drawn, headlights on → two large rain trees arching over → the first villa roofs down the lane",
    "calm_zone": "Left 38% paper"
  },
  "materials": {"road": "Wet paving shown with broken, streaked reflections of the headlights and the gatehouse window"},
  "furniture_and_objects": {"objects": "The boom barrier, a bollard light, the Tree Circle's ring bench glimpsed ahead", "shadows": "Tree trunks throw long shadows across the drive in the headlights"},
  "life_elements": {"figures": "The guard at the gatehouse raising a hand, side-on; the child's yellow raincoat just visible in the car's rear window"},
  "lighting": {"time": "Night after rain", "light": "Headlights as the brightest white, warm gatehouse lamp, cool blue everywhere else"},
  "photographic_quality": {"texture": "Paper grain, lifted-out highlights for the headlight beams", "imperfections": ["blooms in the dark canopy", "uneven road wash", "ink breaks on the car outline", "splatter for rain on the windscreen", "a pencil guide under the gatehouse roof"]},
  "style_reference": "Same hand as the Tranquil Bay neighbourhood illustrations. Arriving, slowly, under trees."
}
```

### WK-04 · Friday 19:25 · Tea on the verandah

```json
{
  "shot_type": "Watercolour story illustration of a couple having tea on a deep verandah facing a wet open-to-sky court.",
  "source_image": "Spatial reference: Conceptual Renders/Marakada_visualisation 3.png and 10.png (living room opening to a planted court, red oxide floor, timber folding doors).",
  "output_format": {"aspect_ratio": "16:9", "orientation": "landscape"},
  "illustration_medium": {"technique": "Ink line and transparent watercolour; left 38% dissolves into paper", "palette": "Lamp gold, wet court green, red oxide, blue dusk"},
  "composition": {
    "angle": "From inside the living area looking out past the two figures to the court",
    "layers": "the back of a cane chair and a low table with two steel tumblers and a plate of banana chips (foreground) → the couple seen from behind on a built-in seat → open timber folding doors → the court with a small tree, stones still wet, water in the channel",
    "calm_zone": "Left 38% paper"
  },
  "furniture_and_objects": {"objects": "The canvas tote dropped on the floor, the cabin bag still standing by the door, a folded shawl, a hanging pendant lamp on a visible cord", "shadows": "Lamp throws the chairs' shadows long across the floor"},
  "life_elements": {"figures": "The couple from behind, shoulders relaxed; the daughter's yellow raincoat hung on a hook"},
  "lighting": {"time": "Evening", "light": "Warm pendant inside, cool blue court, the wet stones catching the lamp"},
  "photographic_quality": {"texture": "Paper grain", "imperfections": ["steam from the tumblers as a lifted-out curl", "uneven floor wash", "ink breaks on the door frames", "blooms in the court sky", "a crumb on the plate"]},
  "style_reference": "Same hand as the Tranquil Bay neighbourhood illustrations. The first quiet ten minutes."
}
```

### WK-05 · Saturday 06:30 · Morning walk to the river

```json
{
  "shot_type": "Watercolour story illustration of a woman and a child walking a footpath at dawn toward a wide, still river with mist on the water.",
  "source_image": "Geographic reference: Web Assets/Drone/video_frames/frame_095s.jpg (groves, paddy edge and the river reach north of the site). Redraw at eye level.",
  "output_format": {"aspect_ratio": "16:9", "orientation": "landscape"},
  "illustration_medium": {"technique": "Ink line and very pale transparent washes; left 38% dissolves into paper", "palette": "Mist grey, pale gold, soft greens, silver water"},
  "composition": {
    "angle": "Eye level, behind the figures, the path leading into the frame",
    "layers": "wet grass and a paddy bund (foreground) → a narrow path between areca palms → the two figures → the still river, wide and flat, mist lying on it → the far bank as a soft line of palms",
    "calm_zone": "Left 38% paper; the mist continues into it"
  },
  "furniture_and_objects": {"objects": "A heron standing in the paddy, a stone marker at the path edge, the vented dam as a faint horizontal line far upstream", "shadows": "Barely any; long faint shadows toward the viewer"},
  "life_elements": {"figures": "The mother with a shawl and the daughter holding her hand, both from behind, small in the frame"},
  "lighting": {"time": "Dawn", "light": "Pale warm light low on the horizon, everything else soft and cool"},
  "photographic_quality": {"texture": "Paper grain, very wet washes", "imperfections": ["blooms in the mist", "a stray drip in the sky", "ink breaks on the palm trunks", "granulation in the water", "a pencil horizon line left visible"]},
  "style_reference": "Same hand as the Tranquil Bay neighbourhood illustrations. The stillness the place is named for."
}
```

### WK-06 · Saturday 12:30 · Lunch under the tree

```json
{
  "shot_type": "Watercolour story illustration of an extended family lunch at a long table under a large tree in a shared residential court.",
  "source_image": "Spatial reference: Web Assets/Cluster/moorings_court_eye.jpg (sandstone court, tree in a laterite-edged planter, homes with clay-tile lean-tos on both sides).",
  "output_format": {"aspect_ratio": "16:9", "orientation": "landscape"},
  "illustration_medium": {"technique": "Ink line and transparent watercolour; left 38% dissolves into paper", "palette": "Full summer greens, dappled gold, sandstone, banana-leaf green, steel grey"},
  "composition": {
    "angle": "Eye level from a corner of the court, the table running diagonally into the frame",
    "layers": "a side table with a stack of banana leaves and a steel bucket (foreground) → the long table with leaves laid as plates, steel tumblers, bowls → the tree and its dappled shade → homes around the court with open doors",
    "calm_zone": "Left 38% paper"
  },
  "furniture_and_objects": {"objects": "Cane chairs and benches, a steel vessel being carried, a folded cotton runner, a grandmother's cane leaning on a chair", "shadows": "Dappled shade across the whole table, consistent direction"},
  "life_elements": {"figures": "Up to six small figures: the grandmother seated at the head (in profile), cousins serving, the girl in the yellow raincoat, now without the hood, under the table with a cousin; nobody faces the viewer"},
  "lighting": {"time": "Midday", "light": "Bright overhead sun broken by the canopy into coins of light"},
  "photographic_quality": {"texture": "Paper grain, granulation in the canopy", "imperfections": ["a spilled splash on the runner", "leaves on the sandstone", "ink breaks on chair legs", "uneven wash in the shade", "a pencil guide on the table edge"]},
  "style_reference": "Same hand as the Tranquil Bay neighbourhood illustrations. The day everyone comes."
}
```

### WK-07 · Sunday 17:00 · Play garden and quiet lawn

```json
{
  "shot_type": "Watercolour story illustration at golden hour: children on grass mounds and a sand court in the foreground, adults resting on a long lawn beyond.",
  "source_image": "No source. Settings match AM-05 (Play Garden) and AM-06 (Quiet Lawn).",
  "output_format": {"aspect_ratio": "16:9", "orientation": "landscape"},
  "illustration_medium": {"technique": "Ink line and transparent watercolour; left 38% dissolves into paper", "palette": "Warm gold, long blue-green shadows, fresh grass"},
  "composition": {
    "angle": "Gentle three-quarter view from a raised edge",
    "layers": "a grass mound with a stone slide (foreground) → the sand court with buckets and a shallow stone channel → the long lawn with a timber deck and a cotton hammock → the boundary hedge and areca tops glowing",
    "calm_zone": "Left 38% paper"
  },
  "furniture_and_objects": {"objects": "A kite lying on the grass, a pair of chappals by the sand, a flask and two tumblers on the deck", "shadows": "Long shadows from the mounds, hammock posts and figures, all in one direction"},
  "life_elements": {"figures": "The girl mid-slide, a cousin at the channel, the couple on the deck in the distance, small"},
  "lighting": {"time": "Golden hour", "light": "Warm low sun from the right, cool shade on the far side of each mound"},
  "photographic_quality": {"texture": "Paper grain", "imperfections": ["footprints in the sand", "splashes by the channel", "ink breaks", "uneven lawn wash", "a bloom in the sky"]},
  "style_reference": "Same hand as the Tranquil Bay neighbourhood illustrations. A long Sunday afternoon."
}
```

### WK-08 · Monday 06:45 · Keys to the Home Keeper

```json
{
  "shot_type": "Watercolour story illustration at dawn: an owner handing a set of keys to the Home Keeper at the villa's entrance while shutters are being closed.",
  "source_image": "Spatial reference: Web Assets/Villas/lagoon_3bhk_front.jpg (entrance under the balcony box, timber door, steps, planters). Redraw from a closer three-quarter angle.",
  "output_format": {"aspect_ratio": "16:9", "orientation": "landscape"},
  "illustration_medium": {"technique": "Ink line and transparent watercolour; left 38% dissolves into paper", "palette": "Cool dawn blue, one lamp still gold, damp greens"},
  "composition": {
    "angle": "Three-quarter view from the forecourt",
    "layers": "a drip irrigation line with droplets in the planter (foreground) → the entrance steps → the two figures at the door → shutters half-closed on the upper window → the roof edge against a pale sky",
    "calm_zone": "Left 38% paper"
  },
  "furniture_and_objects": {"objects": "The cabin bag and canvas tote at the bottom of the steps, a small cloth bag of mangoes from the orchard, the verandah lamp being switched off", "shadows": "Soft, dawn"},
  "life_elements": {"figures": "The owner in profile holding out the keys, the Home Keeper receiving them; the girl already waiting by the car at the frame edge, cropped"},
  "lighting": {"time": "Dawn", "light": "Cool even light, the last warm lamp by the door"},
  "photographic_quality": {"texture": "Paper grain", "imperfections": ["dew lifted out on the leaves", "uneven wash on the plaster", "ink breaks on the shutters", "a bloom in the sky", "a smudge on the step"]},
  "style_reference": "Same hand as the Tranquil Bay neighbourhood illustrations. Leaving without worry."
}
```

### WK-09 · Monday 07:05 · Checked in

```json
{
  "shot_type": "Watercolour story illustration inside an airport departure hall at morning: a family seen from behind at a tall window, an aircraft on the apron beyond.",
  "source_image": "No source. The terminal is generic and unbranded.",
  "output_format": {"aspect_ratio": "16:9", "orientation": "landscape"},
  "illustration_medium": {"technique": "Ink line and transparent watercolour; left 38% dissolves into paper", "palette": "Clean morning light, pale steel, soft green hills, one yellow accent"},
  "composition": {
    "angle": "Eye level, behind the figures, facing the window",
    "layers": "a row of seats (foreground, loose) → the three figures at the glass → tall mullions → an aircraft on the apron, simply drawn, no livery → the green ridge beyond with a thin mist",
    "calm_zone": "Left 38% paper"
  },
  "furniture_and_objects": {"objects": "The canvas tote with the cloth bag of mangoes peeking out, the cabin bag, the yellow raincoat folded over the girl's arm", "shadows": "Mullion shadows falling across the floor"},
  "life_elements": {"figures": "The couple and the daughter from behind, her palm on the glass"},
  "lighting": {"time": "Morning", "light": "Bright, cool daylight through the glass, warm reflections on the floor"},
  "photographic_quality": {"texture": "Paper grain", "imperfections": ["a handprint smudge on the glass", "uneven wash on the floor", "ink breaks on the mullions", "bloom in the sky", "a pencil guide on the aircraft"]},
  "style_reference": "Same hand as the Tranquil Bay neighbourhood illustrations. No text, no logos, no signage. Already thinking of the next visit."
}
```

## 6. The Test (run on every output before accepting)

1. Would every object cast a shadow if a flashlight were pointed at it? Are those shadows there?
2. Is every curved object (tree trunks, pots, lamps, pool edges) shown with a highlight-to-shadow gradient?
3. Are all people motion-blurred (photos) or small and turned away (illustrations), and at the edges? For the WK series, is it the same family in every frame?
4. Does the lighting have at least two colour temperatures?
5. Can you see at least five imperfections?
6. Is every fabric, light and gutter attached to a visible fixture?
7. **16:9 and full-bleed ready?** Is the calm zone free for type? Are ridge and plinth uncut?
8. **Villa set consistent?** Put IMG-01, 02 and 03 side by side: same horizon, same camera height, same light?
9. **No design-strategy text or captions** left in the image, and nothing off-site invented.
10. Could it be mistaken for a real photograph (IMG-01 to 06, 08)? If not, what is missing?
