import React, { useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { useRdsTokens } from '../shared/hooks/useRdsTokens';
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
  titles?: string[];
  subtitles?: string[];
  title?: string;
  subtitle?: string;
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
  const tokens = useRdsTokens();
  const hasTitleLayout = style === 'with title' || style === 'full width image';

  React.useEffect(() => {
    if (state && !Number.isNaN(Number.parseInt(state))) {
      const stateIndex = Number.parseInt(state) - 1;
      if (stateIndex >= 0 && stateIndex < children.length) {
        setCurrentIndex(stateIndex);
      }
    }
  }, [state, children.length]);

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
        borderRadius: tokens.radius.md,
        backgroundColor: style === 'full width image' ? tokens.color.surface : 'transparent',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: 'transform 0.3s ease-in-out',
          height: '100%',
        }}
      >
        {children.map((child, index) => {
          const displayTitle = (titles && titles[index]) ?? title ?? `Card Title`;
          const displaySubtitle = (subtitles && subtitles[index]) ?? subtitle ?? `In a laoreet purus. Integer turpis quam, laoreet id`;

          const slideKey = (titles && titles[index]) ?? `carousel-slide-${index + 1}`;

          return (
            <Box
              key={slideKey}
              className="rds-carousel__slide"
              sx={{
                minWidth: '100%',
                height: '100%',
                position: 'relative',
                display: 'flex',
                flexDirection: hasTitleLayout ? 'column' : 'row',
                backgroundColor: style === 'full width image' ? tokens.color.surface : 'transparent',
              }}
            >
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
                  height: hasTitleLayout ? 'auto' : '100%',
                  flex: hasTitleLayout ? 1 : 'unset',
                  minHeight: 0,
                  width: '100%',
                  position: 'relative',
                  order: 1,
                }}
              >
                {child}
              </Box>

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

      {showArrows && children.length > 1 && (
        <>
          <IconButton
            aria-label="Previous slide"
            onClick={prevSlide}
            className="rds-carousel__navigation rds-carousel__navigation--prev"
            sx={{
              position: 'absolute',
              left: tokens.space(1),
              top:
                style === 'with title'
                  ? 'calc(50% + 50px)'
                  : style === 'full width image'
                    ? 'calc(50% - 50px)'
                    : '50%',
              transform: 'translateY(-50%)',
              backgroundColor: tokens.cssVar('overlay-dark'),
              color: tokens.cssVar('neutral-0'),
              zIndex: tokens.zIndex.layer2,
              '&:hover': {
                backgroundColor: tokens.cssVar('overlay-darker'),
              },
            }}
          >
            <ChevronLeft />
          </IconButton>
          <IconButton
            aria-label="Next slide"
            onClick={nextSlide}
            className="rds-carousel__navigation rds-carousel__navigation--next"
            sx={{
              position: 'absolute',
              right: tokens.space(1),
              top:
                style === 'with title'
                  ? 'calc(50% + 50px)'
                  : style === 'full width image'
                    ? 'calc(50% - 50px)'
                    : '50%',
              transform: 'translateY(-50%)',
              backgroundColor: tokens.cssVar('overlay-dark'),
              color: tokens.cssVar('neutral-0'),
              zIndex: tokens.zIndex.layer2,
              '&:hover': {
                backgroundColor: tokens.cssVar('overlay-darker'),
              },
            }}
          >
            <ChevronRight />
          </IconButton>
        </>
      )}

      {showDots && children.length > 1 && (
        <Box
          className="rds-carousel__indicators"
          sx={{
            position: 'absolute',
            bottom: tokens.space(2),
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: tokens.space(1),
            zIndex: tokens.zIndex.layer2,
          }}
        >
          {children.map((_, index) => (
            <Box
              key={`carousel-indicator-${index + 1}`}
              onClick={() => goToSlide(index)}
              className={`rds-carousel__indicator rds-carousel__indicator--${type} ${
                currentIndex === index ? 'rds-carousel__indicator__active' : ''
              }`}
              sx={{
                width: type === 'circle' ? tokens.space(1.5) : tokens.space(3),
                height: type === 'circle' ? tokens.space(1.5) : tokens.space(0.5),
                borderRadius: type === 'circle' ? tokens.radius.full : tokens.radius.sm,
                backgroundColor:
                  currentIndex === index
                    ? tokens.color.primary
                    : style === 'full width image'
                      ? tokens.cssVar('neutral-0')
                      : tokens.cssVar('neutral-400'),
                opacity: currentIndex === index || style !== 'full width image' ? 1 : 0.8,
                border:
                  style === 'full width image'
                    ? `1px solid ${currentIndex === index ? tokens.color.primary : tokens.cssVar('border-opacity-light')}`
                    : 'none',
                cursor: 'pointer',
                transition: 'background-color 0.2s, opacity 0.2s',
                '&:hover': {
                  backgroundColor:
                    currentIndex === index
                      ? tokens.color.primary
                      : style === 'full width image'
                        ? tokens.cssVar('neutral-0')
                        : tokens.cssVar('neutral-500'),
                  opacity: 1,
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