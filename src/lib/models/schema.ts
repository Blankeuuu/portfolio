import { z } from 'zod';
import fs from 'node:fs';
import path from 'node:path';

export const ALLOWED_DOWNLOAD_FORMATS = [
  'STL',
  '3MF',
  'STEP',
  'STP',
  'FCStd',
  'OBJ',
  'GLB',
  'ZIP',
  'PDF',
] as const;

export type DownloadFormat = (typeof ALLOWED_DOWNLOAD_FORMATS)[number];

/**
 * Validates that an asset path is either a safe root-relative path ("/models/...")
 * without directory traversal ("..") or an explicit https:// URL for external release assets.
 */
export function isValidAssetPath(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed || trimmed.includes('..') || trimmed.includes('\\')) {
    return false;
  }
  if (trimmed.startsWith('/')) {
    return trimmed.length > 1;
  }
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

export const ModelDownloadSchema = z.object({
  label: z.string().min(1, 'Download label is required'),
  format: z.string().min(1, 'File format is required'),
  url: z.string().refine(isValidAssetPath, {
    message: 'Download URL must be a valid root-relative path (/...) or https:// URL',
  }),
  size: z.string().optional(),
});

export const LocalizedTextSchema = z.object({
  en: z.string().min(1, 'English description is required'),
  pl: z.string().min(1, 'Polish description is required'),
});

export const ModelProjectSchema = z.object({
  title: z.string().min(1, 'Model title is required'),
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase kebab-case'),
  description: LocalizedTextSchema,
  publishedAt: z
    .string()
    .refine((val) => !Number.isNaN(Date.parse(val)), 'publishedAt must be a valid ISO/YYYY-MM-DD date'),
  categories: z.array(z.string().min(1)).default([]),
  tags: z.array(z.string().min(1)).default([]),
  cover: z.string().refine(isValidAssetPath, {
    message: 'Cover image must be a valid root-relative path (/...) or https:// URL',
  }),
  images: z
    .array(
      z.string().refine(isValidAssetPath, {
        message: 'Gallery image must be a valid root-relative path (/...) or https:// URL',
      })
    )
    .default([]),
  model: z
    .string()
    .refine(
      (val) => isValidAssetPath(val) && /\.glb($|\?)/i.test(val),
      'Interactive model path must be a valid .glb path or https:// URL'
    ),
  downloadEnabled: z.boolean().default(false),
  downloads: z.array(ModelDownloadSchema).default([]),
  // Optional technical metadata
  software: z.string().min(1).optional(),
  printer: z.string().min(1).optional(),
  material: z.string().min(1).optional(),
  printTime: z.string().min(1).optional(),
  version: z.string().min(1).optional(),
  license: z.string().min(1).optional(),
  externalRepository: z.string().url().optional(),
  // Guard flags to prevent test fixtures or drafts from appearing in production builds
  draft: z.boolean().default(false),
  isDevFixture: z.boolean().default(false),
});

export type ModelProject = z.infer<typeof ModelProjectSchema>;
export type ModelDownload = z.infer<typeof ModelDownloadSchema>;

/**
 * Checks whether a root-relative asset exists inside the local `public/` folder,
 * or allows valid `https://` release asset URLs.
 */
export function doesPublicAssetExist(
  assetUrl: string,
  publicDir = path.resolve(process.cwd(), 'public')
): boolean {
  if (!isValidAssetPath(assetUrl)) {
    return false;
  }
  if (assetUrl.startsWith('https://')) {
    return true;
  }
  const cleanRelative = assetUrl.replace(/^\/+/, '').split(/[?#]/)[0] ?? '';
  if (!cleanRelative) {
    return false;
  }
  const fullPath = path.resolve(publicDir, cleanRelative);
  if (!fullPath.startsWith(path.resolve(publicDir))) {
    return false;
  }
  return fs.existsSync(fullPath) && fs.statSync(fullPath).isFile();
}

/**
 * Returns only the downloadable files that should be shown on a model page:
 * - Returns `[]` immediately when `downloadEnabled` is false.
 * - Filters out any local file paths that do not genuinely exist on disk in `public/`.
 */
export function resolveAvailableDownloads(
  project: Pick<ModelProject, 'downloadEnabled' | 'downloads'>,
  publicDir = path.resolve(process.cwd(), 'public')
): ModelDownload[] {
  if (!project.downloadEnabled || !Array.isArray(project.downloads)) {
    return [];
  }
  return project.downloads.filter((item) => doesPublicAssetExist(item.url, publicDir));
}

/**
 * Filters a list of validated ModelProject entries for production rendering.
 * Never includes `draft: true` or `isDevFixture: true` unless `includeDevFixtures` is explicitly true.
 */
export function filterPublishedModels(
  models: readonly ModelProject[],
  options: { includeDevFixtures?: boolean } = {}
): ModelProject[] {
  const allowFixtures =
    options.includeDevFixtures ?? process.env.INCLUDE_DEV_FIXTURES === 'true';

  return models
    .filter((m) => {
      if (m.draft) return false;
      if (m.isDevFixture && !allowFixtures) return false;
      return true;
    })
    .sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

/**
 * Extracts unique sorted categories from published 3D models.
 */
export function extractModelCategories(models: readonly ModelProject[]): string[] {
  const set = new Set<string>();
  for (const model of models) {
    for (const category of model.categories) {
      if (category.trim()) {
        set.add(category.trim());
      }
    }
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }));
}
