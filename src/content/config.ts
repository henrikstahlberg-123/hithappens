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
  }),
});

export const collections = {
  series: seriesCollection,
  artists: artistsCollection,
  merch: merchCollection,
  settings: settingsCollection,
};
