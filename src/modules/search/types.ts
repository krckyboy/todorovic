/**
 * Search module type definitions
 */

/** Result from Pagefind search */
export interface SearchResult {
  url: string;
  excerpt?: string;
  meta?: {
    title?: string;
    [key: string]: unknown;
  };
}

/** Raw Pagefind search result before data() is called */
export interface PagefindSearchResult {
  data: () => Promise<SearchResult>;
}

/** Pagefind search response */
export interface PagefindSearchResponse {
  results: PagefindSearchResult[];
}

/** Pagefind instance */
export interface PagefindInstance {
  init: () => Promise<void>;
  search: (query: string) => Promise<PagefindSearchResponse>;
}

/** Search modal state */
export type SearchState = 'idle' | 'loading' | 'results' | 'no-results' | 'error';
