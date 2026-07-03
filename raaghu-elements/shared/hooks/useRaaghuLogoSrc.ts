import { useTheme } from '@mui/material/styles';
import { getRaaghuLogoUrlFromDark } from '../constants/raaghu-logo';

export function useRaaghuLogoSrc(): string {
  const theme = useTheme();
  return getRaaghuLogoUrlFromDark(theme.palette.mode === 'dark');
}
