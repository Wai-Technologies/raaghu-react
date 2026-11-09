import { useState, useEffect, useCallback, isValidElement, type ReactNode, type KeyboardEvent, type CSSProperties } from 'react';
import { Box, IconButton, Typography, useMediaQuery, type BoxProps } from '@mui/material';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import { warnDeprecatedProp } from '../shared/utils/deprecation';
import { useRdsTokens } from '../shared/hooks/useRdsTokens';
import clsx from 'clsx';
import './rds-carousel.scss';
import { DEFAULT_RDS_CAROUSEL_LOCALE_TEXT, type RdsCarouselLocaleText } from './rds-carousel-locale';
import { mergeLocaleText } from '../shared/utils/locale-text';

const EMPTY_TITLES: string[] = [];
const EMPTY_SUBTITLES: string[] = [];

type CarouselVariant = 'default' | 'with title' | 'full width image';

/**
 * Root props are forwarded to the outer `Box` (`sx`, `ref`, `id`, `aria-*`, `data-*`, event handlers…).
 * `style`, `type`, `title` and `height` are carousel props here, not the native attributes / system props.
 */
export interface RdsCarouselProps
  extends Omit<BoxProps, 'children' | 'component' | 'style' | 'type' | 'title' | 'height'> {
  /** The slides. A single child, an array or a fragment are all accepted. */
  children?: ReactNode;
  /** Advances slides automatically. @default false */
  autoPlay?: boolean;
  /** Extra CSS class applied to the root element. */
  className?: string;
  /** Delay between automatic slides, in ms. @default 3000 */
  autoPlayInterval?: number;
  /** Shows the previous and next arrows. @default true */
  showArrows?: boolean;
  /** Shows the slide indicators. Defaults to `true`. */
  showIndicators?: boolean;
  /** @deprecated Use `showIndicators` instead. */
  showDots?: boolean;
  /** Height of the carousel. @default '400px' */
  height?: string | number;
  /** Indicator shape (Figma "Type"). */
  type?: 'circle' | 'line';
  /** Indicator shape. Takes precedence over `type`. */
  indicatorVariant?: 'circle' | 'line';
  /** Slide shown first (0-based). Read on mount only. */
  defaultIndex?: number;
  /** Active slide index (0-based). When set, changing it moves the carousel to that slide. */
  activeIndex?: number;
  /** Called with the new index whenever the slide changes (navigation or autoplay). */
  onActiveIndexChange?: (index: number) => void;
  /** Visual variant (Figma "Style"). */
  variant?: CarouselVariant;
  /** @deprecated Passing a variant string is deprecated; use `variant`. Pass CSSProperties for inline styles. */
  style?: CarouselVariant | CSSProperties;
  /** Per-slide title and subtitle; they win over `titles`/`subtitles`. */
  items?: { title?: ReactNode; subtitle?: ReactNode }[];
  /** @deprecated Use `items` instead. */
  titles?: string[];
  /** @deprecated Use `items` instead. */
  subtitles?: string[];
  /** Title shown on the slides. */
  title?: string;
  /** Subtitle shown on the slides. */
  subtitle?: string;
  /** Overrides for the built-in English strings (aria-labels of the carousel, slides, arrows and indicators). `goToSlideLabel` receives the 1-based slide number. */
  localeText?: Partial<RdsCarouselLocaleText>;
}

const RdsCarousel = ({
  children,
  className,
  autoPlay = false,
  autoPlayInterval = 3000,
  showArrows = true,
  showIndicators,
  showDots,
  height = '400px',
  type,
  indicatorVariant,
  defaultIndex,
  activeIndex,
  onActiveIndexChange,
  style: styleProp,
  variant,
  items,
  titles,
  subtitles,
  title,
  subtitle,
  localeText,
  sx,
  ref,
  ...rest
}: RdsCarouselProps) => {
  const text = mergeLocaleText(DEFAULT_RDS_CAROUSEL_LOCALE_TEXT, localeText);
  if (showDots !== undefined) warnDeprecatedProp('RdsCarousel', 'showDots', '`showIndicators`');
  if (titles !== undefined) warnDeprecatedProp('RdsCarousel', 'titles', '`items`');
  if (subtitles !== undefined) warnDeprecatedProp('RdsCarousel', 'subtitles', '`items`');
  const legacyVariant = typeof styleProp === 'string' ? styleProp : undefined;
  if (legacyVariant !== undefined) warnDeprecatedProp('RdsCarousel', 'style', '`variant`');
  const style = variant ?? legacyVariant ?? 'default';
  const indicatorType = indicatorVariant ?? type ?? 'circle';
  const indicatorsVisible = showIndicators ?? showDots ?? true;
  const slides: ReactNode[] = Array.isArray(children) ? children : children == null ? [] : [children];
  const slideCount = slides.length;
  const resolvedTitles = titles ?? EMPTY_TITLES;
  const resolvedSubtitles = subtitles ?? EMPTY_SUBTITLES;
  const initialIndex = defaultIndex ?? 0;
  const [uncontrolledIndex, setUncontrolledIndex] = useState(
    Number.isInteger(initialIndex) && initialIndex >= 0 && initialIndex < slideCount ? initialIndex : 0
  );
  const currentIndex =
    activeIndex !== undefined && Number.isInteger(activeIndex) && activeIndex >= 0 && activeIndex < slideCount
      ? activeIndex
      : uncontrolledIndex;
  const changeIndex = useCallback((index: number) => {
    if (activeIndex === undefined) setUncontrolledIndex(index);
    onActiveIndexChange?.(index);
  }, [activeIndex, onActiveIndexChange]);
  const tokens = useRdsTokens();
  const hasTitleLayout = style === 'with title' || style === 'full width image';

  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)', { noSsr: true });
  const paused = hovered || focused;

  useEffect(() => {
    if (autoPlay && !paused && !prefersReducedMotion && slideCount > 1) {
      const interval = setInterval(() => {
        changeIndex((currentIndex + 1) % slideCount);
      }, autoPlayInterval);
      return () => clearInterval(interval);
    }
  }, [autoPlay, autoPlayInterval, changeIndex, currentIndex, paused, prefersReducedMotion, slideCount]);

  const nextSlide = () => {
    changeIndex((currentIndex + 1) % slideCount);
  };

  const prevSlide = () => {
    changeIndex((currentIndex - 1 + slideCount) % slideCount);
  };

  const goToSlide = (index: number) => {
    changeIndex(index);
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
      aria-label={text.carouselLabel}
      {...rest}
      onMouseEnter={(event) => { setHovered(true); rest.onMouseEnter?.(event); }}
      onMouseLeave={(event) => { setHovered(false); rest.onMouseLeave?.(event); }}
      onFocus={(event) => { setFocused(true); rest.onFocus?.(event); }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false);
        rest.onBlur?.(event);
      }}
      ref={ref}
      style={typeof styleProp === 'object' ? styleProp : undefined}
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
          transition: 'transform var(--rds-motion-duration-moderate) ease-in-out',
          height: '100%',
          width: '100%',
          maxWidth: '100%',
          minWidth: 0,
        }}
      >
        {slides.map((child, index) => {
          const displayTitle = items?.[index]?.title ?? resolvedTitles[index] ?? title ?? `Card Title`;
          const displaySubtitle = items?.[index]?.subtitle ?? resolvedSubtitles[index] ?? subtitle ?? `In a laoreet purus. Integer turpis quam, laoreet id`;
          const slideKey = isValidElement(child) && child.key != null ? child.key : `rds-carousel-slide-${index}`;
          const isActive = index === currentIndex;

          return (
            <Box
              key={slideKey}
              role="group"
              aria-roledescription="slide"
              aria-label={text.slideLabel(index + 1, slideCount)}
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
            aria-label={text.previousSlideLabel}
            onClick={prevSlide}
            className="rds-carousel__navigation rds-carousel__navigation--prev"
            sx={{
              position: 'absolute',
              left: tokens.space(1),
              top:
                style === 'with title'
                  ? 'calc(50% + var(--rds-spacing-50))'
                  : style === 'full width image'
                    ? 'calc(50% - var(--rds-spacing-50))'
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
            aria-label={text.nextSlideLabel}
            onClick={nextSlide}
            className="rds-carousel__navigation rds-carousel__navigation--next"
            sx={{
              position: 'absolute',
              right: tokens.space(1),
              top:
                style === 'with title'
                  ? 'calc(50% + var(--rds-spacing-50))'
                  : style === 'full width image'
                    ? 'calc(50% - var(--rds-spacing-50))'
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

      {indicatorsVisible && slideCount > 1 && (
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
              aria-label={text.goToSlideLabel(index + 1)}
              aria-current={currentIndex === index ? 'true' : undefined}
              onClick={() => goToSlide(index)}
              onKeyDown={(event: KeyboardEvent<HTMLDivElement>) => handleIndicatorKeyDown(event, index)}
              className={clsx(
                'rds-carousel__indicator',
                `rds-carousel__indicator--${indicatorType}`,
                currentIndex === index && 'rds-carousel__indicator__active',
              )}
              sx={{
                width: indicatorType === 'circle' ? tokens.space(1.5) : tokens.space(3),
                height: indicatorType === 'circle' ? tokens.space(1.5) : tokens.space(0.5),
                borderRadius: indicatorType === 'circle' ? tokens.radius.full : tokens.radius.sm,
                backgroundColor:
                  currentIndex === index
                    ? tokens.color.primary
                    : tokens.cssVar('carousel-indicator-bg'),
                opacity: currentIndex === index || style !== 'full width image' ? 1 : 0.8,
                border:
                  style === 'full width image'
                    ? `var(--rds-border-width-thin) solid ${currentIndex === index ? tokens.color.primary : tokens.cssVar('carousel-indicator-bg')}`
                    : 'none',
                cursor: 'pointer',
                transition: 'background-color var(--rds-motion-duration-quick), opacity var(--rds-motion-duration-quick)',
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
