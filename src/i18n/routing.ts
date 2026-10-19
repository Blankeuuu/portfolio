import type { Locale } from '@/data/site';

/**
 * Normalizes a base path (e.g. "/" or "/Portfolio" or "/Portfolio/")
 * into a clean prefix without a trailing slash ("" for root, "/Portfolio" for subpath).
 */
export function normalizeBasePrefix(base = '/'): string {
  const trimmed = base.trim();
  if (!trimmed || trimmed === '/') {
    return '';
  }
  const withLeading = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  return withLeading.replace(/\/+$/, '');
}

/**
 * Ensures internal route paths always start and end with a slash (e.g. "/repos/").
 * File asset paths (containing a file extension like ".webp", ".glb", ".svg") are NOT given a trailing slash.
 */
export function ensureTrailingSlash(path: string): string {
  if (!path || path === '/') {
    return '/';
  }
  const [pathname = '/', suffix = ''] = path.split(/(?=[?#])/);
  const withLeading = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const lastSegment = withLeading.split('/').filter(Boolean).pop() ?? '';
  const isFileAsset = /\.[a-z0-9]{2,8}$/i.test(lastSegment);

  if (isFileAsset) {
    return `${withLeading.replace(/\/+$/, '')}${suffix}`;
  }

  const normalizedPath = withLeading.endsWith('/') ? withLeading : `${withLeading}/`;
  return `${normalizedPath}${suffix}`;
}

/**
 * Prepends the Astro base path to a site-relative path, preserving trailing slashes for routes
 * and exact file paths for static assets.
 */
export function withBase(path: string, base = import.meta.env?.BASE_URL ?? '/'): string {
  if (/^(https?:|mailto:|tel:|#)/i.test(path)) {
    return path;
  }
  const prefix = normalizeBasePrefix(base);
  const formatted = ensureTrailingSlash(path);
  return `${prefix}${formatted}`;
}

/**
 * Strips the configured base prefix from a URL pathname so locale detection
 * and route equivalence work identically on root domains and project subdirectories.
 */
export function stripBase(pathname: string, base = import.meta.env?.BASE_URL ?? '/'): string {
  const prefix = normalizeBasePrefix(base);
  let clean = pathname || '/';
  if (prefix && (clean === prefix || clean.startsWith(`${prefix}/`))) {
    clean = clean.slice(prefix.length) || '/';
  }
  return ensureTrailingSlash(clean);
}

/**
 * Detects locale from a pathname (after stripping base).
 */
export function getLocaleFromPath(
  pathname: string,
  base = import.meta.env?.BASE_URL ?? '/'
): Locale {
  const route = stripBase(pathname, base);
  if (route === '/pl/' || route.startsWith('/pl/')) {
    return 'pl';
  }
  return 'en';
}

/**
 * Extracts the locale-neutral route path (e.g. "/pl/repos/" -> "/repos/", "/pl/" -> "/").
 */
export function getCanonicalRouteKey(
  pathname: string,
  base = import.meta.env?.BASE_URL ?? '/'
): string {
  const route = stripBase(pathname, base);
  if (route === '/pl/') {
    return '/';
  }
  if (route.startsWith('/pl/')) {
    return ensureTrailingSlash(route.slice(3));
  }
  return route;
}

/**
 * Builds a localized path for the given locale and route key, including the site base path.
 */
export function getLocalizedPath(
  routeKey: string,
  targetLocale: Locale,
  base = import.meta.env?.BASE_URL ?? '/'
): string {
  const neutral = getCanonicalRouteKey(routeKey, base);
  if (targetLocale === 'pl') {
    const plPath = neutral === '/' ? '/pl/' : `/pl${neutral}`;
    return withBase(plPath, base);
  }
  return withBase(neutral, base);
}

/**
 * Computes equivalent EN and PL paths for any current pathname.
 */
export function getEquivalentLocalePaths(
  currentPathname: string,
  base = import.meta.env?.BASE_URL ?? '/'
): Record<Locale, string> {
  const neutral = getCanonicalRouteKey(currentPathname, base);
  return {
    en: getLocalizedPath(neutral, 'en', base),
    pl: getLocalizedPath(neutral, 'pl', base),
  };
}

/**
 * Formats a date string (ISO or YYYY-MM-DD) in the requested locale.
 */
export function formatDate(dateInput: string | Date, locale: Locale): string {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  if (Number.isNaN(date.getTime())) {
    return String(dateInput);
  }
  return new Intl.DateTimeFormat(locale === 'pl' ? 'pl-PL' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}
