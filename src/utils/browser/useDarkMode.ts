import { useCallback, useState } from 'react';

/**
 * @returns [isDarkMode, setIsDarkMode]
 */
export function useDarkMode() {
  const colorThmeFromDocument = getColorThemeFromDocument();
  const darkModeFromWindow = getDarkModeFromWindow();
  const darkMode = colorThmeFromDocument
    ? colorThmeFromDocument === 'dark'
    : darkModeFromWindow;
  const [uncontrolledDarkMode, setUncontrolledDarkMode] = useState(darkMode);

  if (colorThmeFromDocument == null) {
    setDarkModeToDocument(darkMode);
  }

  const setDarkMode = useCallback(
    (newDarkMode: boolean) => {
      const colorThemeFromDocument = getColorThemeFromDocument();
      if (colorThemeFromDocument === getColorTheme(newDarkMode)) {
        return;
      }
      setUncontrolledDarkMode(newDarkMode);
      setDarkModeToDocument(newDarkMode);
    },
    [setUncontrolledDarkMode]
  );

  return [uncontrolledDarkMode, setDarkMode] as const;
}

function getDarkModeFromWindow() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function getColorThemeFromDocument() {
  return document.documentElement.getAttribute('color-theme') as
    | 'dark'
    | 'light'
    | undefined;
}

function setDarkModeToDocument(newDarkMode: boolean) {
  if (newDarkMode) {
    document.documentElement.setAttribute('color-theme', 'dark');
  } else {
    document.documentElement.setAttribute('color-theme', 'light');
  }
}

function getColorTheme(darkMode: boolean) {
  return darkMode ? 'dark' : 'light';
}
