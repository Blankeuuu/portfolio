import { describe, expect, it, vi, beforeEach } from 'vitest';
import {
  clearRepositoryCache,
  extractAvailableLanguages,
  fetchPublicRepositories,
  filterAndNormalizeRepositories,
  filterRepositoriesByQuery,
  sortRepositories,
} from '@/lib/github/client';
import { buildRecentWorkItems } from '@/lib/projects/recent';
import type { RawGitHubRepository } from '@/lib/github/types';

const SAMPLE_RAW_REPOS: RawGitHubRepository[] = [
  {
    id: 1,
    name: 'cyd-deck',
    full_name: 'Blankeuu/cyd-deck',
    description: 'CYD-DECK Stream Deck Hardware & Companion',
    html_url: 'https://github.com/Blankeuu/cyd-deck',
    homepage: null,
    fork: false,
    archived: false,
    language: 'C#',
    stargazers_count: 3,
    topics: ['esp32', 'stream-deck'],
    created_at: '2026-09-26T00:31:07Z',
    updated_at: '2026-10-19T21:42:34Z',
    pushed_at: '2026-10-19T18:37:39Z',
  },
  {
    id: 2,
    name: 'Server-Helper',
    full_name: 'Blankeuu/Server-Helper',
    description: 'MicroPython OTA server monitor for Raspberry Pi Pico',
    html_url: 'https://github.com/Blankeuu/Server-Helper',
    homepage: null,
    fork: false,
    archived: false,
    language: 'Python',
    stargazers_count: 8,
    topics: ['micropython', 'rp2040'],
    created_at: '2025-06-19T22:15:40Z',
    updated_at: '2025-06-22T17:31:44Z',
    pushed_at: '2025-06-22T17:31:40Z',
  },
  {
    id: 3,
    name: 'some-forked-repo',
    full_name: 'Blankeuu/some-forked-repo',
    description: 'Should be excluded because fork is true',
    html_url: 'https://github.com/Blankeuu/some-forked-repo',
    fork: true,
    archived: false,
    language: 'TypeScript',
    stargazers_count: 99,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-02T00:00:00Z',
    pushed_at: '2026-01-02T00:00:00Z',
  },
  {
    id: 4,
    name: 'old-archived-project',
    full_name: 'Blankeuu/old-archived-project',
    description: 'Should be excluded because archived is true',
    html_url: 'https://github.com/Blankeuu/old-archived-project',
    fork: false,
    archived: true,
    language: 'C++',
    stargazers_count: 15,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-05-01T00:00:00Z',
    pushed_at: '2024-05-01T00:00:00Z',
  },
];

describe('GitHub Repository Filtering, Normalization & Sorting', () => {
  beforeEach(() => {
    clearRepositoryCache();
  });

  it('excludes forked and archived repositories and normalizes valid items', () => {
    const result = filterAndNormalizeRepositories(SAMPLE_RAW_REPOS);
    expect(result).toHaveLength(2);
    expect(result.map((r) => r.name)).toEqual(['cyd-deck', 'Server-Helper']);
    expect(result[0]?.topics).toEqual(['esp32', 'stream-deck']);
  });

  it('sorts repositories by recent activity, stars, and name', () => {
    const normalized = filterAndNormalizeRepositories(SAMPLE_RAW_REPOS);

    const byActivity = sortRepositories(normalized, 'activity');
    expect(byActivity.map((r) => r.name)).toEqual(['cyd-deck', 'Server-Helper']);

    const byStars = sortRepositories(normalized, 'stars');
    expect(byStars.map((r) => r.name)).toEqual(['Server-Helper', 'cyd-deck']);

    const byName = sortRepositories(normalized, 'name');
    expect(byName.map((r) => r.name)).toEqual(['cyd-deck', 'Server-Helper']);
  });

  it('filters repositories by search query and language', () => {
    const normalized = filterAndNormalizeRepositories(SAMPLE_RAW_REPOS);

    expect(filterRepositoriesByQuery(normalized, 'pico', 'all')).toHaveLength(1);
    expect(filterRepositoriesByQuery(normalized, 'esp32', 'all')[0]?.name).toBe('cyd-deck');
    expect(filterRepositoriesByQuery(normalized, '', 'Python')).toHaveLength(1);
    expect(filterRepositoriesByQuery(normalized, 'nonexistent', 'all')).toHaveLength(0);
  });

  it('extracts sorted unique programming languages', () => {
    const normalized = filterAndNormalizeRepositories(SAMPLE_RAW_REPOS);
    expect(extractAvailableLanguages(normalized)).toEqual(['C#', 'Python']);
  });

  it('handles multi-page API pagination and excludes forks/archived', async () => {
    const page1 = Array.from({ length: 100 }, (_, i) => ({
      ...SAMPLE_RAW_REPOS[0]!,
      id: 100 + i,
      name: `repo-${i}`,
      full_name: `Blankeuu/repo-${i}`,
    }));
    const page2 = [SAMPLE_RAW_REPOS[1]!, SAMPLE_RAW_REPOS[2]!];

    const mockFetch = vi
      .fn<typeof fetch>()
      .mockResolvedValueOnce(
        new Response(JSON.stringify(page1), { status: 200 })
      )
      .mockResolvedValueOnce(
        new Response(JSON.stringify(page2), { status: 200 })
      );

    const res = await fetchPublicRepositories({
      username: 'Blankeuu',
      fetchImpl: mockFetch,
    });

    expect(mockFetch).toHaveBeenCalledTimes(2);
    expect(res.status).toBe('ok');
    expect(res.repositories).toHaveLength(101);
  });

  it('handles GitHub API rate limits (HTTP 403/429) without fabricating data', async () => {
    const mockFetch = vi.fn<typeof fetch>().mockResolvedValueOnce(
      new Response(JSON.stringify({ message: 'API rate limit exceeded' }), {
        status: 403,
      })
    );

    const res = await fetchPublicRepositories({
      username: 'Blankeuu',
      fetchImpl: mockFetch,
    });

    expect(res.status).toBe('rate_limited');
    expect(res.repositories).toEqual([]);
    expect(res.errorMessage).toContain('403');
  });

  it('handles network outages gracefully without fabricating data', async () => {
    const mockFetch = vi
      .fn<typeof fetch>()
      .mockRejectedValueOnce(new Error('DNS lookup failed'));

    const res = await fetchPublicRepositories({
      username: 'Blankeuu',
      fetchImpl: mockFetch,
    });

    expect(res.status).toBe('error');
    expect(res.repositories).toEqual([]);
    expect(res.errorMessage).toContain('DNS lookup failed');
  });

  it('merges and sorts recent work across repositories and 3D models chronologically', () => {
    const repos = filterAndNormalizeRepositories(SAMPLE_RAW_REPOS);
    const models = [
      {
        title: 'Custom ESP32 Case',
        slug: 'custom-esp32-case',
        description: { en: 'Case EN', pl: 'Obudowa PL' },
        publishedAt: '2026-10-01',
        categories: ['Enclosures'],
        tags: ['CAD'],
        cover: '/models/case/cover.webp',
        images: [],
        model: '/models/case/preview.glb',
        downloadEnabled: false,
        downloads: [],
        draft: false,
        isDevFixture: false,
      },
    ];

    const recentEn = buildRecentWorkItems(repos, models, 'en');
    expect(recentEn.map((i) => i.title)).toEqual([
      'Custom ESP32 Case',
      'cyd-deck',
      'Server-Helper',
    ]);
    expect(recentEn[0]?.href).toBe('/models/custom-esp32-case/');

    const recentPl = buildRecentWorkItems(repos, models, 'pl', { base: '/Portfolio' });
    expect(recentPl[0]?.href).toBe('/Portfolio/pl/models/custom-esp32-case/');
    expect(recentPl[0]?.description).toBe('Obudowa PL');
  });
});
