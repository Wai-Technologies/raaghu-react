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
      color: 'white',
      fontSize: '2rem',
      fontWeight: 'bold',
      textShadow: '0 2px 8px rgba(0,0,0,0.5)',
    }}
  >
    {text}
  </Box>
);
