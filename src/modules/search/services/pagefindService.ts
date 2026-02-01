/**
 * Pagefind service - handles all Pagefind API interactions
 *
 * NOTE: Due to Vite's build-time import resolution, this service cannot be
 * directly imported in Astro components. The logic is inlined in SearchBar.astro
 * using `is:inline` scripts. This file serves as documentation for the service API.
 */

import type { PagefindInstance, SearchResult } from '../types';

let pagefind: PagefindInstance | null = null;

/**
 * Initialize Pagefind with lazy loading
 * @returns The Pagefind instance or null if initialization fails
 */
export async function initPagefind(): Promise<PagefindInstance | null> {
  if (pagefind) return pagefind;

  try {
    // @ts-expect-error Pagefind is loaded dynamically at runtime
    pagefind = await import('/pagefind/pagefind.js');
    await pagefind!.init();
    return pagefind;
  } catch (error) {
    console.error('Failed to load Pagefind:', error);
    return null;
  }
}

/**
 * Perform a search query
 * @param query - The search query string
 * @returns Array of search results, limited to 10
 */
export async function search(query: string): Promise<SearchResult[]> {
  const pf = await initPagefind();
  if (!pf) return [];

  try {
    const response = await pf.search(query);
    const results = await Promise.all(
      response.results.slice(0, 10).map((r) => r.data())
    );
    return results;
  } catch (error) {
    console.error('Search error:', error);
    return [];
  }
}
