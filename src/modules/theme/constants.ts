import type { Theme } from "./types";

export const STORAGE_KEY = "theme";
export const THEMES: readonly Theme[] = ["light", "dark"] as const;
