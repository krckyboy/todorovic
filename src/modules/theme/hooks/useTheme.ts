import { useState, useCallback } from "react";
import type { Theme } from "../types";
import { getStoredTheme, setStoredTheme } from "../services/themeStorage";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";

  // Read from DOM first - the inline script in <head> already set this
  const fromDom = document.documentElement.getAttribute(
    "data-theme",
  ) as Theme | null;
  if (fromDom === "light" || fromDom === "dark") return fromDom;

  const stored = getStoredTheme();
  if (stored) return stored;

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme: Theme): void {
  document.documentElement.setAttribute("data-theme", theme);
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    applyTheme(newTheme);
    setStoredTheme(newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light");
  }, [theme, setTheme]);

  return { theme, setTheme, toggleTheme };
}
