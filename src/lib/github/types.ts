export interface RawGitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage?: string | null;
  fork: boolean;
  archived: boolean;
  disabled?: boolean;
  private?: boolean;
  language: string | null;
  stargazers_count: number;
  topics?: string[];
  created_at: string;
  updated_at: string;
  pushed_at: string | null;
}

export interface NormalizedRepository {
  id: number;
  name: string;
  fullName: string;
  description: string | null;
  htmlUrl: string;
  homepage: string | null;
  language: string | null;
  stargazersCount: number;
  topics: string[];
  createdAt: string;
  updatedAt: string;
  pushedAt: string;
}

export type RepoSortOption = 'activity' | 'stars' | 'name';

export interface GitHubFetchResult {
  repositories: NormalizedRepository[];
  status: 'ok' | 'rate_limited' | 'error';
  resolvedUsername: string;
  errorMessage?: string;
}
