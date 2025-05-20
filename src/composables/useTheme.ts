import { ref, watch } from 'vue';
import type { ThemeOption } from '../types';

const THEME_STORAGE_KEY = 'game-platform-theme';

export function useTheme() {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as ThemeOption || 'default';
  const currentTheme = ref<ThemeOption>(savedTheme);

  const setTheme = (theme: ThemeOption) => {
    currentTheme.value = theme;
    
    // Remove all theme classes
    document.body.classList.remove('theme-red', 'theme-blue', 'theme-green', 'theme-purple');
    
    // Add the selected theme class
    if (theme !== 'default') {
      document.body.classList.add(`theme-${theme}`);
    }
    
    // Save to localStorage
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  };

  // Initialize theme
  setTheme(currentTheme.value);

  return {
    currentTheme,
    setTheme
  };
}
