import { useState, useEffect, isValidElement, type ReactNode, type KeyboardEvent } from 'react';
import { Box, IconButton, Typography, type BoxProps } from '@mui/material';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import { useRdsTokens } from '../shared/hooks/useRdsTokens';
import clsx from 'clsx';
import './rds-carousel.scss';

const EMPTY_TITLES: string[] = [];
const EMPTY_SUBTITLES: string[] = [];

/**
 * Root props are forwarded to the outer `Box` (`sx`, `ref`, `id`, `aria-*`, `data-*`, event handlers…).
 * `style`, `type`, `title` and `height` are carousel props here, not the native attributes / system props.
 */
export interface RdsCarouselProps
  extends Omit<BoxProps, 'children' | 'component' | 'style' | 'type' | 'title' | 'height'> {
  /** The slides. A single child, an array or a fragment are all accepted. */
  children?: ReactNode;
  autoPlay?: boolean;
  className?: string;
  autoPlayInterval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  height?: string | number;
  /** Indicator shape. */
  type?: 'circle' | 'line';
  /** Active slide (1-based), mirrored from Figma. Changing it moves the carousel to that slide. */
  state?: '1' | '2' | '3' | '4';
  /** Visual variant (Figma "Style"). */
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
  sx,
  ref,
  ...rest
}: RdsCarouselProps) => {
  // Arrays are used as given (a `false` entry is still a slide, as before); a single child is one slide.
  const slides: ReactNode[] = Array.isArray(children) ? children : children == null ? [] : [children];
  const slideCount = slides.length;
  const resolvedTitles = titles ?? EMPTY_TITLES;
  const resolvedSubtitles = subtitles ?? EMPTY_SUBTITLES;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevState, setPrevState] = useState(state);
  if (state !== prevState) {
    setPrevState(state);
    if (state && !isNaN(parseInt(state))) {
      const newStateIndex = parseInt(state) - 1;
      if (newStateIndex >= 0 && newStateIndex < slideCount) {
        setCurrentIndex(newStateIndex);
      }
    }
  }
  const tokens = useRdsTokens();
  const hasTitleLayout = style === 'with title' || style === 'full width image';

  useEffect(() => {
    if (autoPlay && slideCount > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % slideCount);
      }, autoPlayInterval);
      return () => clearInterval(interval);
    }
  }, [autoPlay, autoPlayInterval, slideCount]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slideCount);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slideCount) % slideCount);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const handleIndicatorKeyDown = (event: KeyboardEvent<HTMLDivElement>, index: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      goToSlide(index);
    }
  };

  const carouselClassName = clsx(
    'rds-carousel',
    `rds-carousel--${style.replace(' ', '-')}`,
    className,
  );

  return (
    <Box
      role="region"
      aria-roledescription="carousel"
      aria-label="Carousel"
      {...rest}
      ref={ref}
      className={carouselClassName}
      sx={[
        {
          position: 'relative',
          height: height,
          overflow: 'hidden',
          width: 'min(100%, 100vw)',
          maxWidth: '100vw',
          minWidth: 0,
          boxSizing: 'border-box',
          borderRadius: tokens.radius.md,
          backgroundColor: style === 'full width image' ? tokens.color.surface : 'transparent',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
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
        {slides.map((child, index) => {
          const displayTitle = resolvedTitles[index] ?? title ?? `Card Title`;
          const displaySubtitle = resolvedSubtitles[index] ?? subtitle ?? `In a laoreet purus. Integer turpis quam, laoreet id`;
          // Keyed elements keep their own key; everything else falls back to the index.
          const slideKey = isValidElement(child) && child.key != null ? child.key : `rds-carousel-slide-${index}`;
          const isActive = index === currentIndex;

          return (
            <Box
              key={slideKey}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${slideCount}`}
              // Each slide is exactly as wide as the clipped viewport, so only the active one is visible.
              inert={!isActive}
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

      {showArrows && slideCount > 1 && (
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

      {showDots && slideCount > 1 && (
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
          {slides.map((_, index) => (
            <Box
              key={`rds-carousel-indicator-${index}`}
              role="button"
              tabIndex={0}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={currentIndex === index ? 'true' : undefined}
              onClick={() => goToSlide(index)}
              onKeyDown={(event: KeyboardEvent<HTMLDivElement>) => handleIndicatorKeyDown(event, index)}
              className={clsx(
                'rds-carousel__indicator',
                `rds-carousel__indicator--${type}`,
                currentIndex === index && 'rds-carousel__indicator__active',
              )}
              sx={{
                width: type === 'circle' ? tokens.space(1.5) : tokens.space(3),
                height: type === 'circle' ? tokens.space(1.5) : tokens.space(0.5),
                borderRadius: type === 'circle' ? tokens.radius.full : tokens.radius.sm,
                // Use carousel-indicator tokens (present in both themes). Avoid
                // --rds-neutral-* here — those light-theme-only vars are removed in dark mode.
                backgroundColor:
                  currentIndex === index
                    ? tokens.color.primary
                    : tokens.cssVar('carousel-indicator-bg'),
                opacity: currentIndex === index || style !== 'full width image' ? 1 : 0.8,
                border:
                  style === 'full width image'
                    ? `1px solid ${currentIndex === index ? tokens.color.primary : tokens.cssVar('carousel-indicator-bg')}`
                    : 'none',
                cursor: 'pointer',
                transition: 'background-color 0.2s, opacity 0.2s',
                '&:hover': {
                  backgroundColor:
                    currentIndex === index
                      ? tokens.color.primary
                      : tokens.cssVar('carousel-indicator-bg-hover'),
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
