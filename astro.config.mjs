// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
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
