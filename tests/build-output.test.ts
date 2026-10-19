import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

const DIST_DIR = path.resolve(process.cwd(), 'dist');

const REQUIRED_ROUTES = [
  'index.html',
  'repos/index.html',
  'models/index.html',
  'about/index.html',
  'pl/index.html',
  'pl/repos/index.html',
  'pl/models/index.html',
  'pl/about/index.html',
  '404.html',
];

describe('Production Build Output & Accessibility / SEO Verification', () => {
  it('generates all required English and Polish static routes', () => {
    if (!fs.existsSync(DIST_DIR)) {
      // Skip if dist hasn't been built yet (run via npm run validate)
      return;
    }

    for (const relPath of REQUIRED_ROUTES) {
      const fullPath = path.join(DIST_DIR, relPath);
      expect(fs.existsSync(fullPath), `Missing built file: ${relPath}`).toBe(true);
    }
  });

  it('does not leak development 3D model fixtures into production build', () => {
    if (!fs.existsSync(DIST_DIR)) return;

    const enFixtureDir = path.join(DIST_DIR, 'models', 'dev-calibration-block');
    const plFixtureDir = path.join(DIST_DIR, 'pl', 'models', 'dev-calibration-block');
    expect(fs.existsSync(enFixtureDir)).toBe(false);
    expect(fs.existsSync(plFixtureDir)).toBe(false);

    const modelsHtml = fs.readFileSync(path.join(DIST_DIR, 'models/index.html'), 'utf8');
    expect(modelsHtml).not.toContain('DEV FIXTURE');
  });

  it('contains no client websites section or fabricated corporate content', () => {
    if (!fs.existsSync(DIST_DIR)) return;

    for (const relPath of REQUIRED_ROUTES) {
      const html = fs.readFileSync(path.join(DIST_DIR, relPath), 'utf8');
      expect(html.toLowerCase()).not.toContain('client websites');
      expect(html.toLowerCase()).not.toContain('client portfolio');
    }
  });

  it('validates lang attribute, canonical URL, hreflang links, single h1, and internal links on all pages', () => {
    if (!fs.existsSync(DIST_DIR)) return;

    for (const relPath of REQUIRED_ROUTES) {
      const html = fs.readFileSync(path.join(DIST_DIR, relPath), 'utf8');
      const expectedLang = relPath.startsWith('pl/') ? 'pl' : 'en';

      expect(html).toContain(`lang="${expectedLang}"`);
      expect(html).toContain('rel="canonical"');
      expect(html).toContain('hreflang="en"');
      expect(html).toContain('hreflang="pl"');
      expect(html).toContain('hreflang="x-default"');

      // Verify exactly one <h1> tag per page
      const h1Matches = html.match(/<h1[\s>]/gi) ?? [];
      expect(h1Matches.length, `Expected 1 <h1> in ${relPath}`).toBe(1);

      // Verify internal hrefs resolve to existing files in dist/
      const hrefRegex = /href="(\/[^"#?]*)"/g;
      let match: RegExpExecArray | null;
      while ((match = hrefRegex.exec(html)) !== null) {
        const href = match[1]!;
        if (href === '/') {
          expect(fs.existsSync(path.join(DIST_DIR, 'index.html'))).toBe(true);
          continue;
        }
        const cleanRel = href.replace(/^\/+/, '');
        const asFile = path.join(DIST_DIR, cleanRel);
        const asIndex = path.join(DIST_DIR, cleanRel, 'index.html');
        const exists = fs.existsSync(asFile) || fs.existsSync(asIndex);
        expect(exists, `Broken internal link ${href} in ${relPath}`).toBe(true);
      }
    }
  });
});
