import { getCollection } from 'astro:content';

export const HARDNESS = ['Super soft', 'Soft', 'Medium', 'Hard', 'Wood'] as const;

export function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/** Every mallet model flattened with its series info, in series order. */
export async function getModels(categoryKey?: string) {
  const series = (await getCollection('series', s => !categoryKey || s.data.category === categoryKey))
    .sort((a, b) => a.data.category.localeCompare(b.data.category) || a.data.num.localeCompare(b.data.num));

  return series.flatMap(s => s.data.models.map(m => ({
    ...m,
    slug: `${slugify(s.data.nameSv)}-${slugify(m.name)}`,
    seriesName: s.data.nameSv,
    seriesColor: s.data.color,
    category: s.data.category,
  })));
}

export type Model = Awaited<ReturnType<typeof getModels>>[number];
