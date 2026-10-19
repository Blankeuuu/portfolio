import type { Locale } from '@/data/site';
import { getLocalizedPath } from '@/i18n/routing';
import type { NormalizedRepository } from '@/lib/github/types';
import type { ModelProject } from '@/lib/models/schema';

export interface UnifiedProjectItem {
  id: string;
  kind: 'repository' | 'model';
  title: string;
  description: string | null;
  /**
   * Normalized publication/creation date ISO string used for chronological sorting.
   * Maps `createdAt` for GitHub repositories and `publishedAt` for 3D models.
   */
  publishedDate: string;
  /**
   * Secondary activity timestamp (e.g. `pushedAt` for repositories, `publishedAt` for models).
   */
  activityDate: string;
  href: string;
  isExternal: boolean;
  primaryTag: string | null;
  tags: string[];
  starsCount?: number;
  coverImage?: string;
}

/**
 * Combines public GitHub repositories and published 3D models into a single chronologically
 * sorted list of recent work.
 *
 * Normalization strategy:
 * - GitHub repository `createdAt` and 3D model `publishedAt` are mapped to `publishedDate`.
 * - Items are sorted by `publishedDate` descending (newest first), with `activityDate` as tie-breaker.
 */
export function buildRecentWorkItems(
  repositories: readonly NormalizedRepository[],
  models: readonly ModelProject[],
  locale: Locale,
  options: { limit?: number; base?: string } = {}
): UnifiedProjectItem[] {
  const limit = options.limit ?? 6;
  const base = options.base ?? import.meta.env?.BASE_URL ?? '/';

  const repoItems: UnifiedProjectItem[] = repositories.map((repo) => ({
    id: `repo-${repo.id}`,
    kind: 'repository',
    title: repo.name,
    description: repo.description,
    publishedDate: repo.createdAt,
    activityDate: repo.pushedAt,
    href: repo.htmlUrl,
    isExternal: true,
    primaryTag: repo.language,
    tags: repo.topics.slice(0, 4),
    starsCount: repo.stargazersCount,
  }));

  const modelItems: UnifiedProjectItem[] = models.map((model) => ({
    id: `model-${model.slug}`,
    kind: 'model',
    title: model.title,
    description: model.description[locale] ?? model.description.en,
    publishedDate: model.publishedAt,
    activityDate: model.publishedAt,
    href: getLocalizedPath(`/models/${model.slug}/`, locale, base),
    isExternal: false,
    primaryTag: model.categories[0] ?? 'CAD',
    tags: model.tags.slice(0, 4),
    coverImage: model.cover,
  }));

  const combined = [...repoItems, ...modelItems].sort((a, b) => {
    const dateDiff =
      new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
    if (dateDiff !== 0) {
      return dateDiff;
    }
    return new Date(b.activityDate).getTime() - new Date(a.activityDate).getTime();
  });

  return combined.slice(0, limit);
}
