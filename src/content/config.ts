import { defineCollection, z } from 'astro:content';

// Top-level product line (Pukstockar / Cymbalstockar / Övrigt). Series below belong to one of these.
const productCategoriesCollection = defineCollection({
  type: 'data',
  schema: z.object({
    key: z.string(),
    nameSv: z.string(),
    nameEn: z.string(),
    descSv: z.string(),
    descEn: z.string(),
    color: z.string(),
    order: z.number(),
  }),
});

const seriesCollection = defineCollection({
  type: 'data',
  schema: z.object({
    num: z.string(),
    category: z.string(), // -> productCategories.key
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
    roleSv: z.string(),
    roleEn: z.string(),
    quoteSv: z.string().default(''),
    quoteEn: z.string().default(''),
    bioSv: z.string(),
    bioEn: z.string(),
    modelSv: z.string(),
    modelEn: z.string(),
    photo: z.string().optional(),
  }),
});

// Simple standalone products under the "Övrigt" category (mallet holders, mounts, tips…).
// No mallet-specific spec fields (hardness, shaft/head diameter) — those don't apply here.
const otherProductsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    order: z.number(),
    nameSv: z.string(),
    nameEn: z.string(),
    descSv: z.string(),
    descEn: z.string(),
    images: z.array(z.string()).default([]),
    priceSek: z.number(), // 0 = pris på förfrågan
    priceUnit: z.string().default(''), // e.g. "/ par"
    // Variants with their own price, e.g. 5 par / 7 par; the first one is preselected
    options: z.array(z.object({ label: z.string(), priceSek: z.number() })).default([]),
    status: z.enum(['instock', 'order']),
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
    image: z.string().optional(),
    priceSek: z.number(),
    // Ingår gratis vid beställning av fler än N par mallets. 0 = ingår alltid vid beställning online.
    freeFromPairs: z.number().optional(),
  }),
});

// Rehab service tiers (e.g. Pukstocks-rehab, Mallet-rehab) — each its own price/desc/included list.
const rehabServicesCollection = defineCollection({
  type: 'data',
  schema: z.object({
    order: z.number(),
    nameSv: z.string(),
    nameEn: z.string(),
    descSv: z.string(),
    descEn: z.string(),
    priceSek: z.number(),
    includedSv: z.array(z.string()),
    includedEn: z.array(z.string()),
    imageBefore: z.string().optional(),
    imageDuring: z.string().optional(),
    imageAfter: z.string().optional(),
  }),
});

// Tillverkningen page: one craft film plus a gallery of workshop photos
const craftCollection = defineCollection({
  type: 'data',
  schema: z.object({
    heading: z.string(),
    accent: z.string().default(''),
    lead: z.string().default(''),
    videoUrl: z.string().default(''),     // YouTube / Vimeo link or a direct .mp4 URL
    videoPoster: z.string().default(''),  // still shown before the film plays
    photos: z.array(z.object({
      image: z.string(),
      caption: z.string().default(''),
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
    engravingPriceSek: z.number().default(100),
    vatPercent: z.number(),
    eurRate: z.number(),
    heroImage: z.string(),
    // Homepage copy. Accent = the word rendered in the highlight colour.
    heroEyebrow: z.string().default('Pukstockar för orkestermusiker'),
    heroHeading: z.string().default('Känslan börjar i handen'),
    heroAccent: z.string().default('handen'),
    heroLead: z.string().default('Fem serier. Handtillverkade i Sverige. Varje stock unik — som spelaren bakom den.'),
    rehabHeading: z.string().default('Ge dina stockar nytt liv'),
    rehabAccent: z.string().default('nytt liv'),
    rehabLead: z.string().default('Slitna stockar behöver inte bytas ut. Vi klär om, balanserar och återställer — som nya igen.'),
  }),
});

export const collections = {
  productCategories: productCategoriesCollection,
  series: seriesCollection,
  rehabServices: rehabServicesCollection,
  otherProducts: otherProductsCollection,
  artists: artistsCollection,
  merch: merchCollection,
  craft: craftCollection,
  settings: settingsCollection,
};
