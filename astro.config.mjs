import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

function resolveDeployConfig(env = process.env) {
  const explicitSite = env.SITE_URL?.trim();
  const explicitBase = env.BASE_PATH?.trim();

  if (explicitSite || explicitBase) {
    return {
      site: explicitSite || 'https://blankeuuu.github.io',
      base: explicitBase || '/',
    };
  }

  const ghRepo = env.GITHUB_REPOSITORY?.trim();
  if (ghRepo && ghRepo.includes('/')) {
    const [owner, repo] = ghRepo.split('/');
    if (owner && repo) {
      const ownerLower = owner.toLowerCase();
      const repoLower = repo.toLowerCase();
      const isUserRootRepo = repoLower === `${ownerLower}.github.io`;
      return {
        site: `https://${ownerLower}.github.io`,
        base: isUserRootRepo ? '/' : `/${repo}`,
      };
    }
  }

  return {
    site: 'https://blankeuuu.github.io',
    base: '/',
  };
}

const { site, base } = resolveDeployConfig();

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  output: 'static',
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          pl: 'pl',
        },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    build: {
      chunkSizeWarningLimit: 1200,
    },
  },
});
