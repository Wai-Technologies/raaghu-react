import { useState, useEffect, useRef, type ReactNode } from 'react';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { useRdsTokens } from '../shared/hooks/useRdsTokens';
import clsx from 'clsx';
import './rds-carousel.scss';

const EMPTY_TITLES: string[] = [];
const EMPTY_SUBTITLES: string[] = [];

export interface RdsCarouselProps {
  children: ReactNode[];
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
  titles,
  subtitles,
  title,
  subtitle,
}:RdsCarouselProps) => {
  const resolvedTitles = titles ?? EMPTY_TITLES;
  const resolvedSubtitles = subtitles ?? EMPTY_SUBTITLES;
  const [currentIndex, setCurrentIndex] = useState(0);
  const prevStateRef = useRef(state);
  if (state !== prevStateRef.current) {
    prevStateRef.current = state;
    if (state && !isNaN(parseInt(state))) {
      const newStateIndex = parseInt(state) - 1;
      if (newStateIndex >= 0 && newStateIndex < children.length) {
        setCurrentIndex(newStateIndex);
      }
    }
  }
  const tokens = useRdsTokens();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const hasTitleLayout = style === 'with title' || style === 'full width image';

  const getInactiveIndicatorColor = () => {
    if (style === 'full width image') {
      return tokens.cssVar('neutral-0');
    }
    return isDarkMode
      ? 'rgba(255, 255, 255, 0.55)'
      : tokens.cssVar('carousel-indicator-bg');
  };

  const getInactiveIndicatorHoverColor = () => {
    if (style === 'full width image') {
      return tokens.cssVar('neutral-0');
    }
    return isDarkMode
      ? 'rgba(255, 255, 255, 0.75)'
      : tokens.cssVar('neutral-500');
  };

  useEffect(() => {
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

  const carouselClassName = clsx(
    'rds-carousel',
    `rds-carousel--${style.replace(' ', '-')}`,
    className,
  );

  return (
    <Box 
      className={carouselClassName}
      sx={{ 
        position: 'relative', 
        height: height, 
        overflow: 'hidden',
        width: 'min(100%, 100vw)',
        maxWidth: '100vw',
        minWidth: 0,
        boxSizing: 'border-box',
        borderRadius: tokens.radius.md,
        backgroundColor: style === 'full width image' ? tokens.color.surface : 'transparent',
      }}
    >
      <Box
        className="rds-carousel__track"
        sx={{
          display: 'flex',
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: 'transform 0.3s ease-in-out',
          height: '100%',
          width: '100%',
          maxWidth: '100%',
          minWidth: 0,
        }}
      >
        {children.map((child, index) => {
          const displayTitle = resolvedTitles[index] ?? title ?? `Card Title`;
          const displaySubtitle = resolvedSubtitles[index] ?? subtitle ?? `In a laoreet purus. Integer turpis quam, laoreet id`;

          return (
            <Box
              key={`${displayTitle}-${displaySubtitle}`}
              className="rds-carousel__slide"
              sx={{
                flex: '0 0 100%',
                minWidth: 0,
                width: '100%',
                maxWidth: '100%',
                height: '100%',
                position: 'relative',
                display: 'flex',
                flexDirection: hasTitleLayout ? 'column' : 'row',
                boxSizing: 'border-box',
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
                  minWidth: 0,
                  width: '100%',
                  maxWidth: '100%',
                  position: 'relative',
                  order: 1,
                  boxSizing: 'border-box',
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
          {children.map((child, index) => (
            <Box
              key={(typeof child === 'object' && child !== null && 'key' in child && (child as { key?: string | number }).key != null)
                ? String((child as { key?: string | number }).key)
                : `${title || subtitle || 'indicator'}`}
              onClick={() => goToSlide(index)}
              className={clsx(
                'rds-carousel__indicator',
                `rds-carousel__indicator--${type}`,
                currentIndex === index && 'rds-carousel__indicator__active',
              )}
              sx={{
                width: type === 'circle' ? tokens.space(1.5) : tokens.space(3),
                height: type === 'circle' ? tokens.space(1.5) : tokens.space(0.5),
                borderRadius: type === 'circle' ? tokens.radius.full : tokens.radius.sm,
                backgroundColor:
                  currentIndex === index
                    ? tokens.color.primary
                    : getInactiveIndicatorColor(),
                opacity: currentIndex === index || style !== 'full width image' ? 1 : 0.8,
                border:
                  style === 'full width image'
                    ? `1px solid ${currentIndex === index ? tokens.color.primary : tokens.cssVar('border-opacity-light')}`
                    : isDarkMode && currentIndex !== index
                      ? '1px solid rgba(255, 255, 255, 0.25)'
                      : 'none',
                cursor: 'pointer',
                transition: 'background-color 0.2s, opacity 0.2s',
                '&:hover': {
                  backgroundColor:
                    currentIndex === index
                      ? tokens.color.primary
                      : getInactiveIndicatorHoverColor(),
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