export const SITE_CONFIG = {
  owner: 'Szymon Potyra',
  role: 'Maker',
  githubUsername: 'Blankeuuu',
  githubFallbackUsernames: ['Blankeuu'] as const,
  githubUrl: 'https://github.com/Blankeuuu',
  email: 'potyraszymon@gmail.com',
  siteUrl: 'https://blankeuuu.github.io',
  defaultLocale: 'en' as const,
  locales: ['en', 'pl'] as const,
  localAvatarPath: '/images/profile.webp',
  githubAvatarFallback: 'https://avatars.githubusercontent.com/u/159267382?v=4',
} as const;

export type Locale = (typeof SITE_CONFIG.locales)[number];
