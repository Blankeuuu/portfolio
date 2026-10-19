import { SITE_CONFIG } from '@/data/site';
import type {
  GitHubFetchResult,
  NormalizedRepository,
  RawGitHubRepository,
  RepoSortOption,
} from './types';

const PER_PAGE = 100;
const MAX_PAGES = 10;

let cachedBuildResult: GitHubFetchResult | null = null;

/**
 * Type guard verifying a raw JSON item from the GitHub API has the required repository fields.
 */
export function isValidRawRepo(item: unknown): item is RawGitHubRepository {
  if (!item || typeof item !== 'object') return false;
  const r = item as Record<string, unknown>;
  return (
    typeof r.id === 'number' &&
    typeof r.name === 'string' &&
    typeof r.full_name === 'string' &&
    typeof r.html_url === 'string' &&
    typeof r.fork === 'boolean' &&
    typeof r.archived === 'boolean' &&
    typeof r.stargazers_count === 'number' &&
    typeof r.created_at === 'string'
  );
}

/**
 * Filters out forked, archived, disabled, or private repositories and normalizes the remaining items.
 */
export function filterAndNormalizeRepositories(
  rawItems: unknown[]
): NormalizedRepository[] {
  const normalized: NormalizedRepository[] = [];

  for (const item of rawItems) {
    if (!isValidRawRepo(item)) continue;
    if (item.fork === true || item.archived === true || item.disabled === true || item.private === true) {
      continue;
    }

    const description =
      typeof item.description === 'string' && item.description.trim().length > 0
        ? item.description.trim()
        : null;

    const homepage =
      typeof item.homepage === 'string' && item.homepage.trim().length > 0
        ? item.homepage.trim()
        : null;

    const language =
      typeof item.language === 'string' && item.language.trim().length > 0
        ? item.language.trim()
        : null;

    const topics = Array.isArray(item.topics)
      ? item.topics.filter((t): t is string => typeof t === 'string' && t.trim().length > 0)
      : [];

    const pushedAt =
      typeof item.pushed_at === 'string' && item.pushed_at.trim().length > 0
        ? item.pushed_at
        : item.updated_at || item.created_at;

    normalized.push({
      id: item.id,
      name: item.name,
      fullName: item.full_name,
      description,
      htmlUrl: item.html_url,
      homepage,
      language,
      stargazersCount: Math.max(0, item.stargazers_count),
      topics,
      createdAt: item.created_at,
      updatedAt: item.updated_at || item.created_at,
      pushedAt,
    });
  }

  return sortRepositories(normalized, 'activity');
}

/**
 * Sorts normalized repositories by:
 * - 'activity': pushedAt descending (newest push first)
 * - 'stars': stargazersCount descending, tie-broken by pushedAt descending
 * - 'name': case-insensitive alphabetical A-Z
 */
export function sortRepositories(
  repos: readonly NormalizedRepository[],
  sortBy: RepoSortOption = 'activity'
): NormalizedRepository[] {
  const copy = [...repos];

  switch (sortBy) {
    case 'stars':
      return copy.sort((a, b) => {
        if (b.stargazersCount !== a.stargazersCount) {
          return b.stargazersCount - a.stargazersCount;
        }
        return new Date(b.pushedAt).getTime() - new Date(a.pushedAt).getTime();
      });

    case 'name':
      return copy.sort((a, b) =>
        a.name.localeCompare(b.name, 'en', { sensitivity: 'base' })
      );

    case 'activity':
    default:
      return copy.sort(
        (a, b) => new Date(b.pushedAt).getTime() - new Date(a.pushedAt).getTime()
      );
  }
}

/**
 * Filters repositories by search query (matching name, description, or topics) and programming language.
 */
export function filterRepositoriesByQuery(
  repos: readonly NormalizedRepository[],
  query = '',
  language = 'all'
): NormalizedRepository[] {
  const normalizedQuery = query.trim().toLowerCase();
  const normalizedLang = language.trim().toLowerCase();

  return repos.filter((repo) => {
    if (normalizedLang && normalizedLang !== 'all') {
      if ((repo.language ?? '').toLowerCase() !== normalizedLang) {
        return false;
      }
    }

    if (!normalizedQuery) {
      return true;
    }

    const nameMatch = repo.name.toLowerCase().includes(normalizedQuery);
    const descMatch = (repo.description ?? '').toLowerCase().includes(normalizedQuery);
    const topicMatch = repo.topics.some((t) => t.toLowerCase().includes(normalizedQuery));
    const langMatch = (repo.language ?? '').toLowerCase().includes(normalizedQuery);

    return nameMatch || descMatch || topicMatch || langMatch;
  });
}

/**
 * Extracts a sorted list of unique programming languages from normalized repositories.
 */
export function extractAvailableLanguages(repos: readonly NormalizedRepository[]): string[] {
  const set = new Set<string>();
  for (const repo of repos) {
    if (repo.language) {
      set.add(repo.language);
    }
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }));
}

export interface FetchRepositoriesOptions {
  username?: string;
  fallbackUsernames?: readonly string[];
  token?: string;
  fetchImpl?: typeof fetch;
  useCache?: boolean;
}

/**
 * Fetches all pages of public repositories for a single GitHub username.
 */
async function fetchUserPages(
  username: string,
  headers: Record<string, string>,
  fetchImpl: typeof fetch
): Promise<{ raw: unknown[]; status: 'ok' | 'rate_limited' | 'error'; errorMessage?: string }> {
  const allRaw: unknown[] = [];

  for (let page = 1; page <= MAX_PAGES; page++) {
    const url = `https://api.github.com/users/${encodeURIComponent(username)}/repos?type=owner&sort=pushed&direction=desc&per_page=${PER_PAGE}&page=${page}`;

    let response: Response;
    try {
      response = await fetchImpl(url, { headers });
    } catch (err) {
      return {
        raw: allRaw,
        status: 'error',
        errorMessage: err instanceof Error ? err.message : 'Network error connecting to GitHub API',
      };
    }

    if (response.status === 403 || response.status === 429) {
      return {
        raw: allRaw,
        status: 'rate_limited',
        errorMessage: `GitHub API rate limit reached (HTTP ${response.status}).`,
      };
    }

    if (!response.ok) {
      return {
        raw: allRaw,
        status: 'error',
        errorMessage: `GitHub API returned HTTP ${response.status} for user ${username}.`,
      };
    }

    let data: unknown;
    try {
      data = await response.json();
    } catch {
      return {
        raw: allRaw,
        status: 'error',
        errorMessage: 'Invalid JSON response from GitHub API.',
      };
    }

    if (!Array.isArray(data)) {
      return {
        raw: allRaw,
        status: 'error',
        errorMessage: 'Unexpected non-array payload from GitHub API.',
      };
    }

    allRaw.push(...data);

    if (data.length < PER_PAGE) {
      break;
    }
  }

  return { raw: allRaw, status: 'ok' };
}

/**
 * Retrieves and normalizes public non-forked, non-archived repositories from GitHub REST API.
 * Supports pagination, optional build-time token, and automatic fallback to verified owner account
 * if the primary username has 0 public repositories.
 */
export async function fetchPublicRepositories(
  options: FetchRepositoriesOptions = {}
): Promise<GitHubFetchResult> {
  const useCache = options.useCache ?? false;
  if (useCache && cachedBuildResult) {
    return cachedBuildResult;
  }

  const primaryUsername =
    options.username ??
    process.env.PUBLIC_GITHUB_USERNAME ??
    SITE_CONFIG.githubUsername;

  const fallbackUsernames =
    options.fallbackUsernames ??
    (options.username ? [] : SITE_CONFIG.githubFallbackUsernames);

  const token =
    options.token ??
    process.env.GITHUB_TOKEN ??
    process.env.GH_TOKEN ??
    undefined;

  const fetchImpl = options.fetchImpl ?? globalThis.fetch;

  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'SzymonPotyra-Portfolio-Builder/1.0',
    'X-GitHub-Api-Version': '2022-11-28',
  };

  if (token && token.trim().length > 0) {
    headers.Authorization = `Bearer ${token.trim()}`;
  }

  const candidates = [
    primaryUsername,
    ...fallbackUsernames.filter((u) => u.toLowerCase() !== primaryUsername.toLowerCase()),
  ];

  let lastResult: GitHubFetchResult = {
    repositories: [],
    status: 'ok',
    resolvedUsername: primaryUsername,
  };

  for (const candidate of candidates) {
    const pageResult = await fetchUserPages(candidate, headers, fetchImpl);

    if (pageResult.status !== 'ok' && pageResult.raw.length === 0) {
      lastResult = {
        repositories: [],
        status: pageResult.status,
        resolvedUsername: candidate,
        errorMessage: pageResult.errorMessage,
      };
      continue;
    }

    const normalized = filterAndNormalizeRepositories(pageResult.raw);
    lastResult = {
      repositories: normalized,
      status: pageResult.status,
      resolvedUsername: candidate,
      errorMessage: pageResult.errorMessage,
    };

    if (normalized.length > 0) {
      break;
    }
  }

  if (useCache) {
    cachedBuildResult = lastResult;
  }

  return lastResult;
}

export function clearRepositoryCache(): void {
  cachedBuildResult = null;
}
