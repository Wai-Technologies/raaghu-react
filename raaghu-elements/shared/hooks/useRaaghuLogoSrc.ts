import { useColorScheme } from '@mui/material/styles';
import { getRaaghuLogoUrlFromDark } from '../constants/raaghu-logo';

/**
 * With MUI cssVariables + colorSchemes, `theme.palette.mode` stays on the
 * default scheme. Resolve the active mode via `useColorScheme` (and DOM fallback).
 */
function resolveIsDark(
  mode: string | undefined,
  systemMode: string | undefined,
): boolean {
  if (mode === 'dark') return true;
  if (mode === 'light') return false;
  if (mode === 'system') return systemMode === 'dark';
  if (typeof document !== 'undefined') {
    return document.documentElement.getAttribute('data-theme') === 'dark';
  }
  return false;
}

export function useRaaghuLogoSrc(): string {
  const { mode, systemMode } = useColorScheme();
  return getRaaghuLogoUrlFromDark(resolveIsDark(mode, systemMode));
}
