type Theme = "light" | "dark";

/**
 * Reads the stored theme from localStorage or falls back to system preference
 */
function readStoredTheme(): Theme {
  if (typeof window === "undefined") return "light";
  
  const stored = localStorage.getItem("theme") as Theme | null;
  if (stored === "light" || stored === "dark") return stored;
  
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

let currentTheme: Theme = readStoredTheme();
const listeners = new Set<(theme: Theme) => void>();

/**
 * Gets the current theme snapshot
 */
export function getThemeSnapshot(): Theme {
  return currentTheme;
}

/**
 * Sets the theme and persists it to localStorage
 */
export function setTheme(theme: Theme): void {
  if (currentTheme === theme) return;
  
  currentTheme = theme;
  localStorage.setItem("theme", theme);
  
  // Update DOM class asynchronously to prevent layout thrashing
  requestAnimationFrame(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  });
  
  // Notify all subscribers
  listeners.forEach((listener) => listener(theme));
}

/**
 * Subscribes to theme changes
 * @returns Unsubscribe function
 */
export function subscribe(listener: (theme: Theme) => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/**
 * Toggles between light and dark theme
 */
export function toggleTheme(): void {
  setTheme(currentTheme === "dark" ? "light" : "dark");
}