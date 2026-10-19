import { getCollection } from 'astro:content';
import { filterPublishedModels, type ModelProject } from './schema';

/**
 * Loads all 3D model entries from the Astro `models` content collection
 * and filters out drafts and development fixtures in production builds.
 */
export async function getPublishedModels(
  options: { includeDevFixtures?: boolean } = {}
): Promise<ModelProject[]> {
  const entries = await getCollection('models');
  const rawModels = entries.map((entry) => entry.data);
  return filterPublishedModels(rawModels, options);
}
