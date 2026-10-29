import { Box } from '@mui/material';

export const CarouselFigmaSampleSlide = ({ image, text }: { image: string; text: string }) => (
  <Box
    sx={{
      backgroundImage: `url(${image})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--rds-color-white)',
      fontSize: 'var(--rds-font-size-display-sm)',
      fontWeight: 'var(--rds-font-weight-bold)',
      textShadow: '0 var(--rds-spacing-xxs) var(--rds-spacing-sm-px) color-mix(in srgb, var(--rds-color-black) 50%, transparent)',
    }}
  >
    {text}
  </Box>
);
