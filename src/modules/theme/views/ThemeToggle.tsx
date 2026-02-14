import { useState, useEffect } from 'react';
import ThemeIcon from '../components/ThemeIcon';
import { useTheme } from '../services/useTheme';
import styles from './ThemeToggle.module.css';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const label =
    theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme';

  // Render placeholder during SSR to avoid hydration mismatch
  if (!mounted) {
    return (
      <button type="button" className={styles.toggle} aria-label="Toggle theme">
        <span className={styles.placeholder} />
      </button>
    );
  }

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggleTheme}
      aria-label={label}
    >
      <ThemeIcon theme={theme} />
    </button>
  );
}
