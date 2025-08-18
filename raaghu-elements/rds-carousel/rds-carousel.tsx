import React, { useState } from 'react';
import { Box, IconButton, useTheme, Typography } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import './rds-carousel.scss';

export interface RdsCarouselProps {
  children: React.ReactNode[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  height?: string | number;
  type?: 'circle' | 'line';
  state?: '1' | '2' | '3' | '4';
  style?: 'default' | 'with title' | 'full width image';
  titles?: string[]; // Optional titles for 'with title' style
  subtitles?: string[]; // Optional subtitles for 'with title' style
}

const RdsCarousel = ({
  children,
  autoPlay = false,
  autoPlayInterval = 3000,
  showArrows = true,
  showDots = true,
  height = '400px',
  type = 'circle',
  state,
  style = 'default',
  titles = [],
  subtitles = [],
}:RdsCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const theme = useTheme();

  // Use state prop as initial value, but allow currentIndex to override it
  const activeIndex = currentIndex;

  React.useEffect(() => {
    // If state prop is provided, update internal state to match (only initially)
    if (state && !isNaN(parseInt(state))) {
      const stateIndex = parseInt(state) - 1;
      if (stateIndex >= 0 && stateIndex < children.length) {
        setCurrentIndex(stateIndex);
      }
    }
  }, [state, children.length]);

  React.useEffect(() => {
    // Run autoplay regardless of state prop, but only if autoPlay is enabled
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

  // Get CSS class names based on style prop
  const getCarouselClasses = () => {
    const baseClass = 'rds-carousel';
    const styleClass = `${baseClass}--${style.replace(' ', '-')}`;
    const autoPlayClass = autoPlay ? `${baseClass}--auto-play` : '';
    
    return [baseClass, styleClass, autoPlayClass].filter(Boolean).join(' ');
  };

  return (
    <Box 
      className={getCarouselClasses()}
      sx={{ 
        position: 'relative', 
        height: style === 'full width image' ? height : height, 
        overflow: 'hidden',
        width: style === 'full width image' ? '100vw' : '100%',
        marginLeft: style === 'full width image' ? 'calc(-50vw + 50%)' : 0,
      }}
    >
      {/* Slides */}
      <Box
        sx={{
          display: 'flex',
          transform: `translateX(-${activeIndex * 100}%)`,
          transition: 'transform 0.3s ease-in-out',
          height: '100%',
        }}
      >
        {children.map((child, index) => (
          <Box
            key={index}
            className="rds-carousel__slide"
            sx={{
              minWidth: '100%',
              height: '100%',
              position: 'relative',
            }}
          >
            {child}
            
            {/* Title overlay for 'with title' style */}
            {style === 'with title' && (
              <Box className="rds-carousel__title">
                {(titles[index] || `Card Title ${index + 1}`) && (
                  <Typography className="rds-carousel__title-text" variant="h6" component="h3">
                    {titles[index] || `Card Title ${index + 1}`}
                  </Typography>
                )}
                {(subtitles[index] || `In a laoreet purus, Integer turpis, laoreet id ${index + 1}`) && (
                  <Typography className="rds-carousel__title-subtitle" variant="body2">
                    {subtitles[index] || `In a laoreet purus, Integer turpis, laoreet id ${index + 1}`}
                  </Typography>
                )}
              </Box>
            )}
          </Box>
        ))}
      </Box>

      {/* Navigation Arrows */}
      {showArrows && children.length > 1 && (
        <>
          <IconButton
            onClick={prevSlide}
            className="rds-carousel__navigation rds-carousel__navigation--prev"
            sx={{
              position: 'absolute',
              left: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              zIndex: 2,
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
              },
            }}
          >
            <ChevronLeft />
          </IconButton>
          <IconButton
            onClick={nextSlide}
            className="rds-carousel__navigation rds-carousel__navigation--next"
            sx={{
              position: 'absolute',
              right: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              zIndex: 2,
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
          className="rds-carousel__indicators"
          sx={{
            position: 'absolute',
            bottom: 16,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 1,
            zIndex: 2,
          }}
        >
          {children.map((_, index) => (
            <Box
              key={index}
              onClick={() => goToSlide(index)}
              className={`rds-carousel__indicator rds-carousel__indicator--${type} ${
                activeIndex === index ? 'rds-carousel__indicator__active' : ''
              }`}
              sx={{
                width: type === 'circle' ? 12 : 24,
                height: type === 'circle' ? 12 : 4,
                borderRadius: type === 'circle' ? '50%' : 2,
                backgroundColor: activeIndex === index ? theme.palette.primary.main : 'rgba(255, 255, 255, 0.5)',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                '&:hover': {
                  backgroundColor: activeIndex === index ? theme.palette.primary.main : 'rgba(255, 255, 255, 0.8)',
                },
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

RdsCarousel.displayName = 'RdsCarousel';
export default RdsCarousel;
