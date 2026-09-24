export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "theme";
export const DEFAULT_THEME: Theme = "dark";
export const SYSTEM_LIGHT_QUERY = "(prefers-color-scheme: light)";

const isTheme = (value: unknown): value is Theme =>
  value === "dark" || value === "light";

function initTheme(storageKey: string, fallback: Theme): Theme {
  let theme = fallback;
  try {
    const stored = localStorage.getItem(storageKey);
    if (stored === "dark" || stored === "light") theme = stored;
    else if (matchMedia("(prefers-color-scheme: light)").matches)
      theme = "light";
    else if (matchMedia("(prefers-color-scheme: dark)").matches) theme = "dark";
  } catch {}
  const root = document.documentElement;
  if (root.dataset.theme !== theme) root.dataset.theme = theme;
  return theme;
}

export const themeScript = `(${initTheme.toString()})(${JSON.stringify(
  THEME_STORAGE_KEY,
)},${JSON.stringify(DEFAULT_THEME)})`;

export const applyResolvedTheme = (): Theme =>
  initTheme(THEME_STORAGE_KEY, DEFAULT_THEME);

export function getStoredTheme(): Theme | null {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return isTheme(stored) ? stored : null;
  } catch {
    return null;
  }
}

export function readTheme(): Theme {
  const current = document.documentElement.dataset.theme;
  return isTheme(current) ? current : DEFAULT_THEME;
}

export function writeTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {}
}
