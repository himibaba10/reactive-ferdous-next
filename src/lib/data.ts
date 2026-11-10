import { cacheLife, cacheTag } from 'next/cache';
import { CACHE_TAGS } from '@/lib/cache';
import { COLLECTIONS, getDb } from '@/lib/mongodb';
import { serializeDocs } from '@/lib/serialize';

export type ProjectDoc = {
  _id: string;
  id: string;
  title: string;
  category: string;
  img: string;
  live?: string;
  frontendCodeLink?: string;
  backendCodeLink?: string;
  technologies?: string[];
};

export type ReviewDoc = {
  _id: string;
  id: string;
  quote?: string;
  author?: string;
  role?: string;
  rating?: number | null;
  img?: string;
};

export type LogoDoc = {
  _id: string;
  id: string;
  imgUrl: string;
  name?: string;
  company?: string;
  title?: string;
};

/**
 * Mongo content: long TTL + tag. Admin APIs call `revalidateContent` so
 * updates show up immediately instead of waiting for the profile window.
 */
export async function getProjects(category?: string): Promise<ProjectDoc[]> {
  'use cache';
  cacheTag(CACHE_TAGS.projects);
  cacheLife('hours');

  try {
    const db = await getDb();
    const filter = category ? { category } : {};
    const docs = await db
      .collection(COLLECTIONS.projects)
      .find(filter)
      .sort({ createdAt: -1 })
      .toArray();
    return serializeDocs(docs) as ProjectDoc[];
  } catch (error) {
    console.error('getProjects', error);
    return [];
  }
}

export async function getWebProjects(): Promise<ProjectDoc[]> {
  const all = await getProjects();
  const excluded = ['Graphic Design', 'Figma Design', 'Logo Design'];
  return all.filter((p) => p.category && !excluded.includes(p.category));
}

export async function getReviews(): Promise<ReviewDoc[]> {
  'use cache';
  cacheTag(CACHE_TAGS.reviews);
  cacheLife('hours');

  try {
    const db = await getDb();
    const docs = await db
      .collection(COLLECTIONS.reviews)
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    return serializeDocs(docs) as ReviewDoc[];
  } catch (error) {
    console.error('getReviews', error);
    return [];
  }
}

export async function getLogos(): Promise<LogoDoc[]> {
  'use cache';
  cacheTag(CACHE_TAGS.logos);
  cacheLife('hours');

  try {
    const db = await getDb();
    const docs = await db
      .collection(COLLECTIONS.logos)
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    return serializeDocs(docs) as LogoDoc[];
  } catch (error) {
    console.error('getLogos', error);
    return [];
  }
}
