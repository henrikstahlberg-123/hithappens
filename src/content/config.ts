import { defineCollection, z } from 'astro:content';

const seriesCollection = defineCollection({
  type: 'data',
  schema: z.object({
    num: z.string(),
    nameSv: z.string(),
    nameEn: z.string(),
    color: z.string(),
    descSv: z.string(),
    descEn: z.string(),
    headerImage: z.string().optional(),
    models: z.array(z.object({
      name: z.string(),
      code: z.string().optional(),
      images: z.array(z.string()).default([]),
      descSv: z.string(),
      descEn: z.string(),
      length: z.string(),
      material: z.string(),
      shaftDiam: z.string(),
      diam: z.string(),
      hardness: z.enum(['Super soft', 'Soft', 'Medium', 'Hard', 'Wood']),
      priceSek: z.number(),
      status: z.enum(['instock', 'order']),
    })),
  }),
});

const artistsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    num: z.string(),
    initials: z.string(),
    nameSv: z.string(),
    nameEn: z.string(),
    orgSv: z.string(),
    orgEn: z.string(),
    roleSv: z.string(),
    roleEn: z.string(),
    quoteSv: z.string(),
    quoteEn: z.string(),
    bioSv: z.string(),
    bioEn: z.string(),
    modelSv: z.string(),
    modelEn: z.string(),
    photo: z.string().optional(),
  }),
});

const merchCollection = defineCollection({
  type: 'data',
  schema: z.object({
    num: z.string(),
    nameSv: z.string(),
    nameEn: z.string(),
    descSv: z.string(),
    descEn: z.string(),
    detailsSv: z.array(z.string()),
    detailsEn: z.array(z.string()),
    image: z.string().optional(),
    reverse: z.boolean().default(false),
  }),
});

// Manufacturing-process video windows — host adds/edits these in creator mode.
const videosCollection = defineCollection({
  type: 'data',
  schema: z.object({
    order: z.string(),                  // sort order, e.g. "01" (lowest = featured)
    title: z.string(),
    descSv: z.string(),
    videoUrl: z.string().default(''),   // paste a YouTube / Vimeo link or a direct .mp4 URL
    poster: z.string().optional(),      // optional thumbnail image
    relatedModel: z.string().optional(),// optional tag, e.g. "Kork — Marcato"
  }),
});

/* ─────────── BUILD YOUR MALLET — fully data-driven ───────────
   Layers, categories, parts, measurements and all copy live in CMS so the
   owner can add/edit/remove anything (and upload photos) with zero code. */

// The stack layers (core / wrap / stick … add more later). Order = stacking + step order.
const builderLayersCollection = defineCollection({
  type: 'data',
  schema: z.object({
    key: z.string(),                 // machine id, e.g. "core" (referenced by parts)
    label: z.string(),               // shown in the UI, e.g. "Kärna"
    order: z.number(),               // step + z-stack order (low = behind / earlier)
    hint: z.string().default(''),    // one-line "?" explanation of what this layer does
    zHint: z.enum(['core', 'wrap', 'stick']).default('core'), // how it stacks in the visual
  }),
});

// Categories / series (Flannel, Leather, Cork …) — determine which wraps appear.
const builderCategoriesCollection = defineCollection({
  type: 'data',
  schema: z.object({
    key: z.string(),
    label: z.string(),
    order: z.number(),
    description: z.string().default(''),
    color: z.string().default('#c8893f'),  // material accent — themes the builder when chosen
    enabled: z.boolean().default(true),
  }),
});

// Individual parts the owner adds/uploads. One file = one selectable option.
const malletPartsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    layer: z.string(),                          // -> builderLayers.key
    categories: z.array(z.string()).default([]),// -> builderCategories.key (empty = all)
    image: z.string().default(''),              // uploaded photo (consistent framing)
    character: z.string().default(''),          // short sound/character blurb (shown on card)
    effect: z.string().default(''),             // "?" — how this part affects the sound/feel
    enabled: z.boolean().default(true),
    order: z.number().default(1),
  }),
});

// Measurement sliders — each with min/max/step + a recommended default + explanation.
const builderMeasurementsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    key: z.string(),
    label: z.string(),
    unit: z.string().default(''),
    min: z.number(),
    max: z.number(),
    step: z.number().default(1),
    recommended: z.number(),
    effect: z.string().default(''),  // "?" — how this measurement affects the sound/feel
    enabled: z.boolean().default(true),
    order: z.number().default(1),
  }),
});

// Single config file: page copy, beginner defaults note, and the sound-description lookup.
const builderSettingsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    heading: z.string().default('Bygg din stock'),
    accent: z.string().default('din stock'),
    lead: z.string().default(''),
    beginnerCta: z.string().default('Inte säker? Använd vår standard'),
    standardNote: z.string().default('Standardmått — perfekt om du är osäker.'),
    summaryHeading: z.string().default('Din stock'),
    // Sound description: a template with tokens, plus optional combo overrides.
    // Tokens: {category} {core} {wrap} {stick} {coreEffect} {wrapEffect} {stickEffect} {length} {head}
    soundTemplate: z.string().default('En {category}-stock med {core}-kärna och {stick}-skaft. {wrapChar}'),
    soundOverrides: z.array(z.object({
      category: z.string().default(''),  // match (blank = any)
      wrap: z.string().default(''),      // match part name (blank = any)
      text: z.string(),
    })).default([]),
  }),
});

const settingsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    siteName: z.string(),
    taglineSv: z.string(),
    taglineEn: z.string(),
    email: z.string(),
    instagramHandle: z.string(),
    rehabPriceSek: z.number(),
    shippingCostSek: z.number(),
    freeShippingPairs: z.number(),
    vatPercent: z.number(),
    eurRate: z.number(),
    heroImage: z.string(),
    // Editable homepage copy (Decap CMS). Accent = the word rendered in the highlight colour.
    heroHeading: z.string().default('Känslan börjar i handen'),
    heroAccent: z.string().default('handen'),
    heroLead: z.string().default('Fem serier. Handtillverkade i Sverige. Varje stock unik — som spelaren bakom den.'),
    rehabHeading: z.string().default('Ge dina stockar nytt liv'),
    rehabAccent: z.string().default('nytt liv'),
    rehabLead: z.string().default('Slitna stockar behöver inte bytas ut. Vi klär om, balanserar och återställer — som nya igen.'),
    // Editable copy for the manufacturing-video section (Tillverkningen page)
    craftVideoHeading: z.string().default('Tillverkningen i rörelse'),
    craftVideoAccent: z.string().default('i rörelse'),
    craftVideoLead: z.string().default('Se hur varje stock växer fram för hand — från råmaterial till färdig modell.'),
  }),
});

export const collections = {
  series: seriesCollection,
  artists: artistsCollection,
  merch: merchCollection,
  videos: videosCollection,
  settings: settingsCollection,
  builderLayers: builderLayersCollection,
  builderCategories: builderCategoriesCollection,
  malletParts: malletPartsCollection,
  builderMeasurements: builderMeasurementsCollection,
  builderSettings: builderSettingsCollection,
};
