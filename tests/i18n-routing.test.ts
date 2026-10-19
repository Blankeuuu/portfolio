import { describe, expect, it } from 'vitest';
import { TRANSLATIONS } from '@/i18n/translations';
import {
  ensureTrailingSlash,
  getCanonicalRouteKey,
  getEquivalentLocalePaths,
  getLocaleFromPath,
  getLocalizedPath,
  withBase,
} from '@/i18n/routing';

function collectKeys(obj: Record<string, unknown>, prefix = ''): string[] {
  const keys: string[] = [];
  for (const [k, v] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      keys.push(...collectKeys(v as Record<string, unknown>, path));
    } else {
      keys.push(path);
    }
  }
  return keys;
}

describe('Internationalization (EN / PL) & Subpath Routing', () => {
  it('maintains 100% translation key parity between English and Polish dictionaries', () => {
    const enKeys = collectKeys(TRANSLATIONS.en as unknown as Record<string, unknown>);
    const plKeys = collectKeys(TRANSLATIONS.pl as unknown as Record<string, unknown>);
    expect(plKeys).toEqual(enKeys);
  });

  it('normalizes trailing slashes for routes while preserving file extensions on assets', () => {
    expect(ensureTrailingSlash('/repos')).toBe('/repos/');
    expect(ensureTrailingSlash('/pl/models/case')).toBe('/pl/models/case/');
    expect(ensureTrailingSlash('/models/fixture-cube.glb')).toBe('/models/fixture-cube.glb');
    expect(ensureTrailingSlash('/favicon.svg')).toBe('/favicon.svg');
  });

  it('maps equivalent routes between EN and PL at root domain', () => {
    expect(getEquivalentLocalePaths('/', '/')).toEqual({
      en: '/',
      pl: '/pl/',
    });
    expect(getEquivalentLocalePaths('/repos/', '/')).toEqual({
      en: '/repos/',
      pl: '/pl/repos/',
    });
    expect(getEquivalentLocalePaths('/pl/models/my-part/', '/')).toEqual({
      en: '/models/my-part/',
      pl: '/pl/models/my-part/',
    });
  });

  it('supports GitHub Pages project subdirectory base paths without breaking routes', () => {
    const base = '/Blankeuu.github.io';
    expect(getLocaleFromPath('/Blankeuu.github.io/pl/repos/', base)).toBe('pl');
    expect(getLocaleFromPath('/Blankeuu.github.io/repos/', base)).toBe('en');
    expect(getCanonicalRouteKey('/Blankeuu.github.io/pl/about/', base)).toBe('/about/');

    expect(getEquivalentLocalePaths('/Blankeuu.github.io/pl/models/', base)).toEqual({
      en: '/Blankeuu.github.io/models/',
      pl: '/Blankeuu.github.io/pl/models/',
    });

    expect(withBase('/models/fixture-cube.glb', base)).toBe(
      '/Blankeuu.github.io/models/fixture-cube.glb'
    );
    expect(getLocalizedPath('/about/', 'pl', base)).toBe('/Blankeuu.github.io/pl/about/');
  });
});
