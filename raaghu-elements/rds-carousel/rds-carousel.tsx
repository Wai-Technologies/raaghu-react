import React, { useState } from 'react';
import { Box, IconButton, useTheme, Typography } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import './rds-carousel.scss';

export interface RdsCarouselProps {
  children: React.ReactNode[];
  autoPlay?: boolean;
  className?: string;
  autoPlayInterval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  height?: string | number;
  type?: 'circle' | 'line';
  state?: '1' | '2' | '3' | '4';
  style?: 'default' | 'with title' | 'full width image';
  titles?: string[]; // Optional titles for 'with title' style
  subtitles?: string[]; // Optional subtitles for 'with title' style
  title?: string; // single title fallback for all slides (useful for Storybook controls)
  subtitle?: string; // single subtitle fallback for all slides
}

const RdsCarousel = ({
  children,
  className,
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
  title,
  subtitle,
}:RdsCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const theme = useTheme();

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
    return [baseClass, styleClass, className].filter(Boolean).join(' ');
  };

  return (
    <Box 
      className={getCarouselClasses()}
      sx={{ 
        position: 'relative', 
        height: height, 
        overflow: 'hidden',
        width: '100%',
        maxWidth: '100%',
        borderRadius: '6px',
        backgroundColor: style === 'full width image'
          ? 'var(--rds-background-paper, transparent)'
          : 'transparent',
      }}
    >
      {/* Slides */}
      <Box
        sx={{
          display: 'flex',
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: 'transform 0.3s ease-in-out',
          height: '100%',
        }}
      >
        {children.map((child, index) => {
          // compute display text: prefer per-slide arrays, fallback to single-string props, then defaults
          const displayTitle = (titles && titles[index]) ?? title ?? `Card Title`;
          const displaySubtitle = (subtitles && subtitles[index]) ?? subtitle ?? `In a laoreet purus. Integer turpis quam, laoreet id`;

          return (
            <Box
              key={index}
              className="rds-carousel__slide"
              sx={{
                minWidth: '100%',
                height: '100%',
                position: 'relative',
                display: 'flex',
                flexDirection: style === 'with title' || style === 'full width image' ? 'column' : 'row',
                backgroundColor: style === 'full width image'
                  ? 'var(--rds-background-paper, transparent)'
                  : 'transparent',
              }}
            >
              {/* Title above image for 'with title' style */}
              {style === 'with title' && (
                <Box className="rds-carousel__title-content rds-carousel__title-content--top">
                  {displayTitle && (
                    <Typography className="rds-carousel__title-text" variant="h5" component="h3">
                      {displayTitle}
                    </Typography>
                  )}
                  {displaySubtitle && (
                    <Typography className="rds-carousel__title-subtitle" variant="body2">
                      {displaySubtitle}
                    </Typography>
                  )}
                </Box>
              )}

              <Box 
                className="rds-carousel__slide-content"
                sx={{
                  height: style === 'with title' 
                    ? 'calc(100% - 100px)' 
                    : style === 'full width image' 
                      ? 'calc(100% - 100px)' 
                      : '100%',
                  width: '100%',
                  position: 'relative',
                  order: style === 'with title' || style === 'full width image' ? 1 : 1, // Image first
                }}
              >
                {child}
              </Box>

              {/* Title content after image for 'full width image' style */}
              {style === 'full width image' && (
                <Box className="rds-carousel__title-content rds-carousel__title-content--bottom">
                  {displayTitle && (
                    <Typography className="rds-carousel__title-text" variant="h5" component="h3">
                      {displayTitle}
                    </Typography>
                  )}
                  {displaySubtitle && (
                    <Typography className="rds-carousel__title-subtitle" variant="body2">
                      {displaySubtitle}
                    </Typography>
                  )}
                </Box>
              )}
            </Box>
          );
        })}
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
              top: style === 'with title' ? 'calc(50% + 50px)' : '50%', // Adjust for title area
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
              top: style === 'with title' ? 'calc(50% + 50px)' : '50%', // Adjust for title area
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
                currentIndex === index ? 'rds-carousel__indicator__active' : ''
              }`}
              sx={{
                width: type === 'circle' ? 12 : 24,
                height: type === 'circle' ? 12 : 4,
                borderRadius: type === 'circle' ? '50%' : 2,
                backgroundColor: currentIndex === index 
                  ? theme.palette.primary.main 
                  : style === 'full width image' 
                    ? 'rgba(255, 255, 255, 0.8)' 
                    : '#BDBDBD', // Gray for regular styles, white for full width image
                border: style === 'full width image' 
                  ? (currentIndex === index 
                      ? '1px solid var(--rds-color-primary, #1976d2)' 
                      : '1px solid rgba(0, 0, 0, 0.2)') 
                  : 'none',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                '&:hover': {
                  backgroundColor: currentIndex === index 
                    ? theme.palette.primary.main 
                    : style === 'full width image' 
                      ? 'rgba(255, 255, 255, 0.9)' 
                      : '#9E9E9E', // Different hover colors based on style
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