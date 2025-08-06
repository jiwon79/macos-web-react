import { useCallback, useState } from "react";

/**
 * @returns [isDarkMode, setIsDarkMode]
 */
export function useDarkMode() {
  const colorThemeFromDocument = getColorThemeFromDocument();
  const darkModeFromWindow = getDarkModeFromWindow();
  const darkMode = colorThemeFromDocument
    ? colorThemeFromDocument === "dark"
    : darkModeFromWindow;
  const [uncontrolledDarkMode, setUncontrolledDarkMode] = useState(darkMode);

  if (colorThemeFromDocument == null) {
    setDarkModeToDocument(darkMode);
  }

  const setDarkMode = useCallback((newDarkMode: boolean) => {
    const colorThemeFromDocument = getColorThemeFromDocument();
    if (colorThemeFromDocument === getColorTheme(newDarkMode)) {
      return;
    }
    setUncontrolledDarkMode(newDarkMode);
    setDarkModeToDocument(newDarkMode);
  }, []);

  return [uncontrolledDarkMode, setDarkMode] as const;
}

function getDarkModeFromWindow() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function getColorThemeFromDocument() {
  return document.documentElement.getAttribute("color-theme") as
    | "dark"
    | "light"
    | undefined;
}

function setDarkModeToDocument(newDarkMode: boolean) {
  if (newDarkMode) {
    document.documentElement.setAttribute("color-theme", "dark");
  } else {
    document.documentElement.setAttribute("color-theme", "light");
  }
}

function getColorTheme(darkMode: boolean) {
  return darkMode ? "dark" : "light";
}
