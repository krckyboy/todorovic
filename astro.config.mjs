// @ts-check
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import pagefind from 'astro-pagefind';

// https://astro.build/config
export default defineConfig({
  site: 'https://todorovic.dev',
  build: {
    format: 'directory',
  },
  integrations: [sitemap(), react(), pagefind()],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});
