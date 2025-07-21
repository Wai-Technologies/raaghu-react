import React, { useState } from 'react';
import { Box, IconButton, useTheme } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

export interface RdsCarouselProps {
  children: React.ReactNode[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  height?: string | number;
}

const RdsCarousel: React.FC<RdsCarouselProps> = ({
  children,
  autoPlay = false,
  autoPlayInterval = 3000,
  showArrows = true,
  showDots = true,
  height = '400px',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const theme = useTheme();

  React.useEffect(() => {
    if (autoPlay && children.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % children.length);
      }, autoPlayInterval);
      return () => clearInterval(interval);
    }
  }, [autoPlay, autoPlayInterval, children.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % children.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + children.length) % children.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <Box sx={{ position: 'relative', height, overflow: 'hidden' }}>
      {/* Slides */}
      <Box
        sx={{
          display: 'flex',
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: 'transform 0.3s ease-in-out',
          height: '100%',
        }}
      >
        {children.map((child, index) => (
          <Box
            key={index}
            sx={{
              minWidth: '100%',
              height: '100%',
            }}
          >
            {child}
          </Box>
        ))}
      </Box>

      {/* Navigation Arrows */}
      {showArrows && children.length > 1 && (
        <>
          <IconButton
            onClick={prevSlide}
            sx={{
              position: 'absolute',
              left: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
              },
            }}
          >
            <ChevronLeft />
          </IconButton>
          <IconButton
            onClick={nextSlide}
            sx={{
              position: 'absolute',
              right: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
              },
            }}
          >
            <ChevronRight />
          </IconButton>
        </>
      )}

      {/* Dots */}
      {showDots && children.length > 1 && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 16,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 1,
          }}
        >
          {children.map((_, index) => (
            <Box
              key={index}
              onClick={() => goToSlide(index)}
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: currentIndex === index ? theme.palette.primary.main : 'rgba(255, 255, 255, 0.5)',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                '&:hover': {
                  backgroundColor: currentIndex === index ? theme.palette.primary.main : 'rgba(255, 255, 255, 0.8)',
                },
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default RdsCarousel;
