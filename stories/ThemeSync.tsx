import { useEffect } from 'react';

function getMode(): 'light' | 'dark' {
  const params = new URLSearchParams(window.location.search);
  const g = decodeURIComponent(params.get('globals') || '');
  return g.includes('theme:dark') ? 'dark' : 'light';
}

function applyMode(mode: 'light' | 'dark') {
  const dark = mode === 'dark';
  document.documentElement.setAttribute('data-theme', mode);
  document.documentElement.classList.toggle('rds-theme--dark', dark);
  document.documentElement.classList.toggle('theme-dark', dark);
  document.documentElement.classList.toggle('theme-light', !dark);
  document.body?.classList.toggle('dark-theme', dark);
  document.body?.classList.toggle('theme-dark', dark);
}

export default function ThemeSync() {
  useEffect(() => {
    let last = getMode();
    applyMode(last);

    const id = setInterval(() => {
      const current = getMode();
      if (current !== last) {
        last = current;
        applyMode(current);
      }
    }, 300);

    return () => clearInterval(id);
  }, []);

  return null;
}
