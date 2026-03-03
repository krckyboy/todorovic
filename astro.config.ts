import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import pagefind from 'astro-pagefind';
import rehypeExternalLinks from './src/modules/blog/services/rehypeExternalLinks';
import remarkCodeFenceTitles from './src/modules/blog/services/remarkCodeFenceTitles';

// https://astro.build/config
export default defineConfig({
  site: 'https://todorovic.dev',
  build: {
    format: 'directory',
  },
  integrations: [sitemap(), react(), pagefind()],
  markdown: {
    remarkPlugins: [remarkCodeFenceTitles],
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          siteOrigin: 'https://todorovic.dev',
        },
      ],
    ],
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});
