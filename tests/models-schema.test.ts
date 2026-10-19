import { describe, expect, it } from 'vitest';
import path from 'node:path';
import {
  ModelProjectSchema,
  filterPublishedModels,
  isValidAssetPath,
  resolveAvailableDownloads,
} from '@/lib/models/schema';

describe('3D Model Content Schema & Download Security Validation', () => {
  it('validates a compliant 3D model entry with optional fields', () => {
    const validEntry = {
      title: 'CYD-DECK Angled Enclosure',
      slug: 'cyd-deck-enclosure',
      description: {
        en: 'Desktop angled enclosure for ESP32-2432S028R.',
        pl: 'Biurkowa obudowa kątowa dla wyświetlacza ESP32-2432S028R.',
      },
      publishedAt: '2026-10-20',
      categories: ['Enclosures'],
      tags: ['ESP32', 'FDM'],
      cover: '/images/fixture-cover.svg',
      images: ['/images/fixture-cover.svg'],
      model: '/models/fixture-cube.glb',
      downloadEnabled: true,
      downloads: [
        {
          label: 'GLB Mesh',
          format: 'GLB',
          url: '/models/fixture-cube.glb',
          size: '1 KB',
        },
      ],
      software: 'FreeCAD',
      material: 'PETG',
    };

    const parsed = ModelProjectSchema.safeParse(validEntry);
    expect(parsed.success).toBe(true);
  });

  it('rejects non-GLB model paths, invalid slugs, or directory traversal paths', () => {
    expect(isValidAssetPath('../secret.stl')).toBe(false);
    expect(isValidAssetPath('/models/../secret.stl')).toBe(false);
    expect(isValidAssetPath('http://insecure.example.com/file.stl')).toBe(false);
    expect(isValidAssetPath('https://github.com/Blankeuuu/cyd-deck/releases/download/v1.0/case.3mf')).toBe(true);

    const invalidModelFormat = ModelProjectSchema.safeParse({
      title: 'Invalid Model',
      slug: 'invalid-model',
      description: { en: 'EN', pl: 'PL' },
      publishedAt: '2026-10-20',
      cover: '/models/test/cover.webp',
      model: '/models/test/raw.stl', // Must be .glb for interactive viewer
    });

    expect(invalidModelFormat.success).toBe(false);
  });

  it('strictly gates downloads when downloadEnabled is false or when local files do not exist', () => {
    const publicDir = path.resolve(process.cwd(), 'public');

    // Case 1: downloadEnabled is false -> returns empty array even if files exist
    const disabledResult = resolveAvailableDownloads(
      {
        downloadEnabled: false,
        downloads: [
          {
            label: 'Cube',
            format: 'GLB',
            url: '/models/fixture-cube.glb',
          },
        ],
      },
      publicDir
    );
    expect(disabledResult).toEqual([]);

    // Case 2: downloadEnabled is true -> filters out missing local files and keeps existing ones
    const enabledResult = resolveAvailableDownloads(
      {
        downloadEnabled: true,
        downloads: [
          {
            label: 'Existing Fixture GLB',
            format: 'GLB',
            url: '/models/fixture-cube.glb',
          },
          {
            label: 'Non-existent STL',
            format: 'STL',
            url: '/models/does-not-exist.stl',
          },
          {
            label: 'External Release Asset',
            format: '3MF',
            url: 'https://github.com/Blankeuuu/cyd-deck/releases/download/v1.0/enclosure.3mf',
          },
        ],
      },
      publicDir
    );

    expect(enabledResult).toHaveLength(2);
    expect(enabledResult.map((d) => d.label)).toEqual([
      'Existing Fixture GLB',
      'External Release Asset',
    ]);
  });

  it('excludes dev fixtures and drafts from production model lists by default', () => {
    const sampleModels = [
      ModelProjectSchema.parse({
        title: 'Dev Fixture',
        slug: 'dev-fixture',
        description: { en: 'EN', pl: 'PL' },
        publishedAt: '2026-10-19',
        cover: '/images/fixture-cover.svg',
        model: '/models/fixture-cube.glb',
        isDevFixture: true,
      }),
      ModelProjectSchema.parse({
        title: 'Draft Model',
        slug: 'draft-model',
        description: { en: 'EN', pl: 'PL' },
        publishedAt: '2026-10-20',
        cover: '/images/fixture-cover.svg',
        model: '/models/fixture-cube.glb',
        draft: true,
      }),
    ];

    expect(filterPublishedModels(sampleModels, { includeDevFixtures: false })).toHaveLength(0);
    expect(filterPublishedModels(sampleModels, { includeDevFixtures: true })).toHaveLength(1);
  });
});
