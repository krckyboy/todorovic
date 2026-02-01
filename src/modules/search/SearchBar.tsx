import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import styles from "./SearchBar.module.css";

interface SearchResult {
  url: string;
  excerpt?: string;
  meta?: {
    title?: string;
  };
}

interface PagefindInstance {
  init: () => Promise<void>;
  search: (
    query: string,
  ) => Promise<{ results: Array<{ data: () => Promise<SearchResult> }> }>;
}

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [error, setError] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const pagefindRef = useRef<PagefindInstance | null>(null);
  const debounceRef = useRef<NodeJS.Timeout>();

  const isMac =
    typeof navigator !== "undefined" &&
    navigator.platform.toUpperCase().includes("MAC");

  const initPagefind = useCallback(async () => {
    if (pagefindRef.current) return pagefindRef.current;
    try {
      // Use Function constructor to avoid Vite analyzing the import
      const importPagefind = new Function(
        'return import("/pagefind/pagefind.js")',
      );
      const pf = (await importPagefind()) as PagefindInstance;
      await pf.init();
      pagefindRef.current = pf;
      return pf;
    } catch (e) {
      console.error("Failed to load Pagefind:", e);
      setError("Search is not available");
      return null;
    }
  }, []);

  const performSearch = useCallback(
    async (searchQuery: string) => {
      if (!searchQuery.trim()) {
        setResults([]);
        setFocusedIndex(-1);
        return;
      }

      setIsLoading(true);
      setError(null);

      const pf = await initPagefind();
      if (!pf) {
        setIsLoading(false);
        return;
      }

      try {
        const search = await pf.search(searchQuery);
        const searchResults = await Promise.all(
          search.results.slice(0, 10).map((r) => r.data()),
        );
        setResults(searchResults);
        setFocusedIndex(-1);
      } catch (e) {
        console.error("Search error:", e);
        setError("Search error occurred");
      } finally {
        setIsLoading(false);
      }
    },
    [initPagefind],
  );

  const openSearch = useCallback(() => {
    setIsOpen(true);
    initPagefind();
  }, [initPagefind]);

  const closeSearch = useCallback(() => {
    setIsOpen(false);
    setQuery("");
    setResults([]);
    setFocusedIndex(-1);
    setError(null);
  }, []);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Debounced search
  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      performSearch(query);
    }, 200);
    return () => clearTimeout(debounceRef.current);
  }, [query, performSearch]);

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) {
          closeSearch();
        } else {
          openSearch();
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, openSearch, closeSearch]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      closeSearch();
      return;
    }

    if (e.key === "ArrowDown" && results.length > 0) {
      e.preventDefault();
      setFocusedIndex((i) => Math.min(i + 1, results.length - 1));
      return;
    }

    if (e.key === "ArrowUp" && results.length > 0) {
      e.preventDefault();
      setFocusedIndex((i) => Math.max(i - 1, -1));
      return;
    }

    if (e.key === "Enter" && focusedIndex >= 0 && results[focusedIndex]) {
      e.preventDefault();
      window.location.href = results[focusedIndex].url;
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeSearch();
    }
  };

  return (
    <>
      <button
        type="button"
        className={styles.searchButton}
        onClick={openSearch}
        aria-label="Search site"
        aria-haspopup="dialog"
      >
        <svg
          className={styles.searchIcon}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <span className={styles.shortcut}>
          <kbd>{isMac ? "Cmd" : "Ctrl"}</kbd>+<kbd>K</kbd>
        </span>
      </button>

      {isOpen &&
        createPortal(
          <div
            className={styles.overlay}
            onClick={handleOverlayClick}
            role="presentation"
          >
            <div
              className={styles.modal}
              role="dialog"
              aria-modal="true"
              aria-label="Site search"
              onKeyDown={handleKeyDown}
            >
              <div className={styles.header}>
                <div className={styles.inputWrapper}>
                  <svg
                    className={styles.inputIcon}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <label htmlFor="search-input" className="visually-hidden">
                    Search
                  </label>
                  <input
                    ref={inputRef}
                    type="text"
                    id="search-input"
                    className={styles.input}
                    placeholder="Search..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    autoComplete="off"
                    aria-activedescendant={
                      focusedIndex >= 0
                        ? `search-result-${focusedIndex}`
                        : undefined
                    }
                  />
                </div>
                <button
                  type="button"
                  className={styles.closeButton}
                  onClick={closeSearch}
                  aria-label="Close search"
                >
                  <svg
                    className={styles.closeIcon}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className={styles.results}>
                {!query.trim() && (
                  <p className={styles.hint}>Start typing to search...</p>
                )}

                {isLoading && <p className={styles.loading}>Searching...</p>}

                {error && <p className={styles.error}>{error}</p>}

                {!isLoading &&
                  !error &&
                  query.trim() &&
                  results.length === 0 && (
                    <p className={styles.noResults}>
                      No results found for "{query}"
                    </p>
                  )}

                {!isLoading && !error && results.length > 0 && (
                  <ul
                    className={styles.list}
                    role="listbox"
                    aria-label="Search results"
                  >
                    {results.map((result, index) => (
                      <li
                        key={result.url}
                        role="option"
                        id={`search-result-${index}`}
                        aria-selected={index === focusedIndex}
                      >
                        <a
                          href={result.url}
                          className={`${styles.item} ${index === focusedIndex ? styles.focused : ""}`}
                        >
                          <div className={styles.title}>
                            {result.meta?.title || result.url}
                          </div>
                          {result.excerpt && (
                            <div
                              className={styles.excerpt}
                              dangerouslySetInnerHTML={{
                                __html: result.excerpt,
                              }}
                            />
                          )}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
