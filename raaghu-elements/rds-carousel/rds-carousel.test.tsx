import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import RdsCarousel, { RdsCarouselProps } from './rds-carousel';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';
import { warnDeprecatedProp } from '../shared/utils/deprecation';

jest.mock('./rds-carousel.scss', () => ({}));
jest.mock('../shared/utils/deprecation', () => ({ warnDeprecatedProp: jest.fn() }));

describe('RdsCarousel', () => {
  const defaultSlides = [
    <div key="1" data-testid="slide-1">Slide 1</div>,
    <div key="2" data-testid="slide-2">Slide 2</div>,
    <div key="3" data-testid="slide-3">Slide 3</div>,
  ];

  const defaultProps: RdsCarouselProps = {
    children: defaultSlides,
  };

  const renderWithTheme = (component: React.ReactElement) =>
    render(<ThemeProvider theme={createTheme()}>{component}</ThemeProvider>);
  const setup = (p: any = {}) => renderWithTheme(<RdsCarousel {...defaultProps} {...p} />);
  const single = (p: any = {}) => renderWithTheme(<RdsCarousel {...p}>{[<div key="1">Single</div>]}</RdsCarousel>);
  const slide = (n: number) => screen.getByTestId(`slide-${n}`);
  const nextBtn = () => screen.getAllByRole('button')[1];
  const prevBtn = () => screen.getAllByRole('button')[0];

  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      setup();
      expect(slide(1)).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsCarousel.displayName).toBe('RdsCarousel');
    });

    it('should render all slides', () => {
      setup();
      [1, 2, 3].forEach((n) => expect(slide(n)).toBeInTheDocument());
    });

    it('should render with custom className', () => {
      const { container } = setup({ className: 'custom-carousel' });
      expect(container.querySelector('.custom-carousel')).toBeInTheDocument();
    });

    it('should render rds-carousel wrapper class', () => {
      const { container } = setup();
      expect(container.querySelector('.rds-carousel')).toBeInTheDocument();
    });
  });

  describe('Navigation Arrows', () => {
    it('should show arrows by default', () => {
      setup();
      expect(screen.getAllByRole('button').length).toBeGreaterThan(0);
    });

    it('should not show arrows when showArrows is false', () => {
      const { container } = setup({ showArrows: false });
      expect(container.querySelector('.rds-carousel__navigation--prev')).not.toBeInTheDocument();
    });

    it.each([
      ['next from first', undefined, nextBtn, 2],
      ['prev from second', 1, prevBtn, 1],
      ['wrap to last on prev from first', 0, prevBtn, 3],
      ['wrap to first on next from last', 2, nextBtn, 1],
    ])('should navigate: %s', (_n, defaultIndex, btn, expected) => {
      setup(defaultIndex === undefined ? {} : { defaultIndex });
      fireEvent.click(btn());
      expect(slide(expected)).toBeInTheDocument();
    });

    it('should not show arrows for single slide', () => {
      const { container } = single();
      expect(container.querySelector('.rds-carousel__navigation--prev')).not.toBeInTheDocument();
    });

    it('should handle multiple arrow clicks', () => {
      setup();
      fireEvent.click(nextBtn());
      fireEvent.click(nextBtn());
      expect(slide(3)).toBeInTheDocument();
    });
  });

  describe('Dot Indicators', () => {
    it('should show dots by default', () => {
      const { container } = setup();
      expect(container.querySelector('.rds-carousel__indicators')).toBeInTheDocument();
    });

    it('should not show dots when showDots is false', () => {
      const { container } = setup({ showDots: false });
      expect(container.querySelector('.rds-carousel__indicators')).not.toBeInTheDocument();
    });

    it('should render correct number of dots', () => {
      const { container } = setup();
      expect(container.querySelectorAll('.rds-carousel__indicator').length).toBe(3);
    });

    it('should mark current slide dot as active', () => {
      const { container } = setup();
      expect(container.querySelector('.rds-carousel__indicator__active')).toBeInTheDocument();
    });

    it('should navigate to slide when dot is clicked', () => {
      const { container } = setup();
      fireEvent.click(container.querySelectorAll('.rds-carousel__indicator')[2]);
      expect(slide(3)).toBeInTheDocument();
    });

    it('should not show dots for single slide', () => {
      const { container } = single();
      expect(container.querySelector('.rds-carousel__indicators')).not.toBeInTheDocument();
    });

    it.each([[undefined, 'circle'], ['circle', 'circle'], ['line', 'line']])('type=%s renders %s indicators', (type, cls) => {
      const { container } = setup(type ? { type } : {});
      expect(container.querySelectorAll(`.rds-carousel__indicator--${cls}`).length).toBe(3);
    });
  });

  describe('AutoPlay', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runOnlyPendingTimers();
      jest.useRealTimers();
    });

    it('should not autoplay by default', () => {
      setup();
      jest.advanceTimersByTime(5000);
      expect(slide(1)).toBeInTheDocument();
    });

    it('should autoplay when enabled', () => {
      setup({ autoPlay: true, autoPlayInterval: 1000 });
      jest.advanceTimersByTime(1500);
      expect(slide(2)).toBeInTheDocument();
    });

    it('should use custom autoPlayInterval', () => {
      setup({ autoPlay: true, autoPlayInterval: 2000 });
      jest.advanceTimersByTime(1500);
      expect(slide(1)).toBeInTheDocument();
      jest.advanceTimersByTime(600);
      expect(slide(2)).toBeInTheDocument();
    });

    it('should cycle through all slides with autoplay', () => {
      setup({ autoPlay: true, autoPlayInterval: 1000 });
      jest.advanceTimersByTime(1500);
      expect(slide(2)).toBeInTheDocument();
      jest.advanceTimersByTime(1000);
      expect(slide(3)).toBeInTheDocument();
      jest.advanceTimersByTime(1000);
      expect(slide(1)).toBeInTheDocument();
    });

    it('should not autoplay with single slide', () => {
      single({ autoPlay: true, autoPlayInterval: 1000 });
      jest.advanceTimersByTime(2000);
      expect(screen.getByText('Single')).toBeInTheDocument();
    });

    it('should have autoPlayInterval as 3000 by default', () => {
      setup({ autoPlay: true });
      jest.advanceTimersByTime(2500);
      expect(slide(1)).toBeInTheDocument();
      jest.advanceTimersByTime(600);
      expect(slide(2)).toBeInTheDocument();
    });
  });

  describe('State Management', () => {
    it.each([1, 2])('should set initial slide from activeIndex %s', (activeIndex) => {
      setup({ activeIndex });
      expect(slide(activeIndex + 1)).toBeInTheDocument();
    });

    it('should update slide when activeIndex changes', () => {
      const { rerender } = setup({ activeIndex: 0 });
      expect(slide(1)).toBeInTheDocument();
      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsCarousel {...defaultProps} activeIndex={2} />
        </ThemeProvider>
      );
      expect(slide(3)).toBeInTheDocument();
    });
  });

  describe('Styles', () => {
    it.each([
      [undefined, '.rds-carousel--default'],
      ['default', '.rds-carousel--default'],
      ['with title', '.rds-carousel--with-title'],
    ])('variant=%s applies %s', (variant, sel) => {
      const { container } = setup(variant ? { variant } : {});
      expect(container.querySelector(sel)).toBeInTheDocument();
    });

    it('should apply full-width-image style', () => {
      const { container } = setup({ variant: 'full width image' });
      const carousel = container.querySelector('.rds-carousel');
      expect(carousel).toHaveClass('rds-carousel--full-width');
      expect(carousel).toHaveClass('image');
    });

    it('should render title with with-title style', () => {
      setup({ variant: 'with title', titles: ['Title 1', 'Title 2', 'Title 3'] });
      expect(screen.getByText('Title 1')).toBeInTheDocument();
    });

    it('should render subtitle with with-title style', () => {
      setup({ variant: 'with title', subtitles: ['Subtitle 1', 'Subtitle 2', 'Subtitle 3'] });
      expect(screen.getByText('Subtitle 1')).toBeInTheDocument();
    });
  });

  describe('Titles and Subtitles', () => {
    it('should use individual titles', () => {
      setup({ variant: 'with title', titles: ['Custom Title 1', 'Custom Title 2', 'Custom Title 3'] });
      expect(screen.getByText('Custom Title 1')).toBeInTheDocument();
    });

    it('should use global title as fallback', () => {
      setup({ variant: 'with title', title: 'Global Title' });
      expect(screen.getAllByText('Global Title').length).toBeGreaterThan(0);
    });

    it('should prioritize individual titles over global title', () => {
      setup({ variant: 'with title', titles: ['Individual Title', 'Global Title', 'Global Title'], title: 'Global Title' });
      expect(screen.getByText('Individual Title')).toBeInTheDocument();
    });

    it('should use individual subtitles', () => {
      setup({ variant: 'with title', subtitles: ['Custom Sub 1', 'Custom Sub 2', 'Custom Sub 3'] });
      expect(screen.getByText('Custom Sub 1')).toBeInTheDocument();
    });

    it('should use global subtitle as fallback', () => {
      setup({ variant: 'with title', subtitle: 'Global Subtitle' });
      expect(screen.getAllByText('Global Subtitle').length).toBeGreaterThan(0);
    });
  });

  describe('Height Configuration', () => {
    it.each([[undefined], ['600px'], [300]])('should render carousel with height %p', (height) => {
      const { container } = setup(height === undefined ? {} : { height });
      expect(container.querySelector('.rds-carousel')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle single child slide', () => {
      renderWithTheme(<RdsCarousel>{[<div key="1">Single Slide</div>]}</RdsCarousel>);
      expect(screen.getByText('Single Slide')).toBeInTheDocument();
    });

    it('should handle many slides', () => {
      const manySlides = Array.from({ length: 10 }, (_, i) => (
        <div key={i} data-testid={`slide-${i}`}>Slide {i + 1}</div>
      ));
      renderWithTheme(<RdsCarousel>{manySlides}</RdsCarousel>);
      expect(slide(0)).toBeInTheDocument();
    });

    it('should handle rapid navigation', () => {
      setup();
      fireEvent.click(nextBtn());
      fireEvent.click(nextBtn());
      fireEvent.click(nextBtn());
      expect(slide(1)).toBeInTheDocument();
    });

    it('should handle empty titles array', () => {
      setup({ variant: 'with title', titles: [] });
      expect(slide(1)).toBeInTheDocument();
    });

    it('should handle slides with complex content', () => {
      renderWithTheme(
        <RdsCarousel>
          {[
            <div key="1">
              <h2>Title</h2>
              <p>Description</p>
              <button>Button</button>
            </div>,
          ]}
        </RdsCarousel>
      );
      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Description')).toBeInTheDocument();
      expect(screen.getByText('Button')).toBeInTheDocument();
    });
  });

  describe('Props Validation', () => {
    it('should accept ReactNode array children', () => {
      renderWithTheme(<RdsCarousel>{[<div key="1">Child 1</div>, <div key="2">Child 2</div>]}</RdsCarousel>);
      expect(screen.getByText('Child 1')).toBeInTheDocument();
    });

    it.each([
      [{ autoPlay: true }],
      [{ autoPlayInterval: 5000 }],
      [{ showArrows: false }],
      [{ showDots: false }],
      [{ height: '500px' }],
      [{ height: 300 }],
    ])('should accept %j', (props) => {
      setup(props);
      expect(slide(1)).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsCarousel {...defaultProps} />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('should have focusable navigation buttons', () => {
      setup();
      screen.getAllByRole('button').forEach(button => expect(button).toBeVisible());
    });
  });

  describe('Combined Props', () => {
    it('should handle all props together', () => {
      setup({
        autoPlay: true,
        autoPlayInterval: 2000,
        showArrows: true,
        showDots: true,
        height: '600px',
        type: 'line',
        variant: 'with title',
        className: 'custom-carousel',
        titles: ['T1', 'T2', 'T3'],
        subtitles: ['S1', 'S2', 'S3'],
      });
      expect(slide(1)).toBeInTheDocument();
      expect(screen.getByText('T1')).toBeInTheDocument();
      expect(screen.getByText('S1')).toBeInTheDocument();
    });
  });
});

describe('audit fixes', () => {
  const slides = [
    <div key="a" data-testid="slide-a">Slide A</div>,
    <div key="b" data-testid="slide-b">Slide B</div>,
    <div key="c" data-testid="slide-c">Slide C</div>,
  ];

  const getSlides = (container: HTMLElement) =>
    Array.from(container.querySelectorAll('.rds-carousel__slide'));

  describe('G1-187 children', () => {
    it('renders a single non-array child without crashing', () => {
      const { container } = render(
        <RdsCarousel>
          <div>Only slide</div>
        </RdsCarousel>
      );
      expect(screen.getByText('Only slide')).toBeInTheDocument();
      expect(getSlides(container)).toHaveLength(1);
      expect(container.querySelector('.rds-carousel__indicators')).not.toBeInTheDocument();
      expect(container.querySelector('.rds-carousel__navigation')).not.toBeInTheDocument();
    });

    it('renders JSX children written inline (not an array)', () => {
      const { container } = render(
        <RdsCarousel>
          <div>One</div>
          <div>Two</div>
        </RdsCarousel>
      );
      expect(getSlides(container)).toHaveLength(2);
      expect(container.querySelectorAll('.rds-carousel__indicator')).toHaveLength(2);
    });

    it('renders nothing for empty children', () => {
      const { container } = render(<RdsCarousel>{[]}</RdsCarousel>);
      expect(getSlides(container)).toHaveLength(0);
    });
  });

  describe('G1-183 keys', () => {
    it('does not warn about duplicate keys when slides share a title', () => {
      const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      render(
        <RdsCarousel variant="with title" title="Same">
          <div>One</div>
          <div>Two</div>
          <div>Three</div>
        </RdsCarousel>
      );
      const keyWarnings = errorSpy.mock.calls.filter((args) =>
        args.some((arg) => typeof arg === 'string' && arg.includes('same key'))
      );
      expect(keyWarnings).toHaveLength(0);
      errorSpy.mockRestore();
    });
  });

  describe('G1-186 root props', () => {
    it('forwards ref, id, data-* and event handlers to the root', () => {
      const ref = React.createRef<HTMLDivElement>();
      const onMouseEnter = jest.fn();
      const { container } = render(
        <RdsCarousel ref={ref} id="hero" data-testid="carousel-root" onMouseEnter={onMouseEnter}>
          {slides}
        </RdsCarousel>
      );
      const root = container.querySelector('.rds-carousel') as HTMLElement;
      expect(ref.current).toBe(root);
      expect(root).toHaveAttribute('id', 'hero');
      expect(screen.getByTestId('carousel-root')).toBe(root);
      fireEvent.mouseEnter(root);
      expect(onMouseEnter).toHaveBeenCalled();
    });

    it('merges className with the built-in classes', () => {
      const { container } = render(
        <RdsCarousel className="extra" variant="with title">{slides}</RdsCarousel>
      );
      const root = container.querySelector('.rds-carousel');
      expect(root).toHaveClass('rds-carousel', 'rds-carousel--with-title', 'extra');
    });

    it('forwards CSSProperties style to the root', () => {
      const { container } = render(
        <RdsCarousel style={{ marginTop: '12px' }}>{slides}</RdsCarousel>
      );
      const root = container.querySelector('.rds-carousel') as HTMLElement;
      expect(root.style.marginTop).toBe('12px');
    });

    it('merges sx (object and array) after the base styles', () => {
      const { container, rerender } = render(
        <RdsCarousel sx={{ marginTop: '7px' }}>{slides}</RdsCarousel>
      );
      let root = container.querySelector('.rds-carousel') as HTMLElement;
      expect(getComputedStyle(root).marginTop).toBe('7px');
      expect(getComputedStyle(root).overflow).toBe('hidden');

      rerender(<RdsCarousel sx={[{ marginTop: '9px' }, { marginBottom: '3px' }]}>{slides}</RdsCarousel>);
      root = container.querySelector('.rds-carousel') as HTMLElement;
      expect(getComputedStyle(root).marginTop).toBe('9px');
      expect(getComputedStyle(root).marginBottom).toBe('3px');
    });
  });

  describe('G1-188 indicators', () => {
    it('exposes the dots as labelled, focusable buttons with aria-current on the active one', () => {
      const { container } = render(<RdsCarousel>{slides}</RdsCarousel>);
      const dots = Array.from(container.querySelectorAll('.rds-carousel__indicator'));
      expect(dots).toHaveLength(3);
      dots.forEach((dot, index) => {
        expect(dot).toHaveAttribute('role', 'button');
        expect(dot).toHaveAttribute('tabindex', '0');
        expect(dot).toHaveAttribute('aria-label', `Go to slide ${index + 1}`);
      });
      expect(dots[0]).toHaveAttribute('aria-current', 'true');
      expect(dots[1]).not.toHaveAttribute('aria-current');
      expect(screen.getByRole('button', { name: 'Go to slide 2' })).toBe(dots[1]);
    });

    it('navigates with Enter and Space', () => {
      const { container } = render(<RdsCarousel>{slides}</RdsCarousel>);
      const dots = container.querySelectorAll('.rds-carousel__indicator');
      fireEvent.keyDown(dots[2], { key: 'Enter' });
      expect(dots[2]).toHaveAttribute('aria-current', 'true');
      expect(dots[2]).toHaveClass('rds-carousel__indicator__active');
      fireEvent.keyDown(dots[1], { key: ' ' });
      expect(dots[1]).toHaveAttribute('aria-current', 'true');
      fireEvent.keyDown(dots[0], { key: 'a' });
      expect(dots[1]).toHaveAttribute('aria-current', 'true');
    });

    it('keeps the prev/next arrow labels', () => {
      render(<RdsCarousel>{slides}</RdsCarousel>);
      expect(screen.getByRole('button', { name: 'Previous slide' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Next slide' })).toBeInTheDocument();
    });
  });

  describe('G1-192 carousel pattern', () => {
    it('labels the root as a carousel region (overridable)', () => {
      const { container, rerender } = render(<RdsCarousel>{slides}</RdsCarousel>);
      const root = container.querySelector('.rds-carousel');
      expect(root).toHaveAttribute('role', 'region');
      expect(root).toHaveAttribute('aria-roledescription', 'carousel');
      expect(root).toHaveAttribute('aria-label', 'Carousel');

      rerender(<RdsCarousel aria-label="Featured products">{slides}</RdsCarousel>);
      expect(screen.getByRole('region', { name: 'Featured products' })).toBe(root);
    });

    it('marks slides as groups and makes off-screen slides inert', () => {
      const { container } = render(<RdsCarousel>{slides}</RdsCarousel>);
      const slideEls = getSlides(container);
      slideEls.forEach((slide, index) => {
        expect(slide).toHaveAttribute('role', 'group');
        expect(slide).toHaveAttribute('aria-roledescription', 'slide');
        expect(slide).toHaveAttribute('aria-label', `${index + 1} of 3`);
      });
      expect(slideEls[0]).not.toHaveAttribute('inert');
      expect(slideEls[1]).toHaveAttribute('inert');
      expect(slideEls[2]).toHaveAttribute('inert');

      fireEvent.click(screen.getByRole('button', { name: 'Next slide' }));
      expect(slideEls[0]).toHaveAttribute('inert');
      expect(slideEls[1]).not.toHaveAttribute('inert');
    });

    it('has no axe violations in every variant', async () => {
      for (const variant of ['default', 'with title', 'full width image'] as const) {
        const { container, unmount } = render(<RdsCarousel variant={variant}>{slides}</RdsCarousel>);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
        unmount();
      }
    });
  });

  describe('controlled activeIndex sync', () => {
    it('notifies the parent when a controlled slide change is requested', () => {
      const onActiveIndexChange = jest.fn();
      render(<RdsCarousel activeIndex={0} onActiveIndexChange={onActiveIndexChange}>{slides}</RdsCarousel>);
      fireEvent.click(screen.getAllByRole('button')[1]);
      expect(onActiveIndexChange).toHaveBeenCalledWith(1);
      expect(getSlides(document.body)[0]).not.toHaveAttribute('inert');
    });

    it('moves to the slide given by a changed activeIndex prop', () => {
      const { container, rerender } = render(<RdsCarousel activeIndex={0}>{slides}</RdsCarousel>);
      rerender(<RdsCarousel activeIndex={2}>{slides}</RdsCarousel>);
      const dots = container.querySelectorAll('.rds-carousel__indicator');
      expect(dots[2]).toHaveAttribute('aria-current', 'true');
      expect(getSlides(container)[2]).not.toHaveAttribute('inert');
    });

    it('ignores an activeIndex outside the slide range', () => {
      const { container, rerender } = render(<RdsCarousel activeIndex={0}>{slides.slice(0, 2)}</RdsCarousel>);
      rerender(<RdsCarousel activeIndex={3}>{slides.slice(0, 2)}</RdsCarousel>);
      const dots = container.querySelectorAll('.rds-carousel__indicator');
      expect(dots[0]).toHaveAttribute('aria-current', 'true');
    });
  });
});

describe('RdsCarousel additive renames', () => {
  const slides = [<div key="a">A</div>, <div key="b">B</div>, <div key="c">C</div>];
  const dots = (c: HTMLElement) => c.querySelectorAll('.rds-carousel__indicator');

  beforeEach(() => {
    (warnDeprecatedProp as jest.Mock).mockClear();
  });

  it('showIndicators wins over showDots and the old prop warns', () => {
    const { container } = render(<RdsCarousel showIndicators showDots={false}>{slides}</RdsCarousel>);
    expect(dots(container)).toHaveLength(3);
    expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsCarousel', 'showDots', '`showIndicators`');
  });

  it('defaultIndex seeds the starting slide', () => {
    const { container } = render(<RdsCarousel defaultIndex={2}>{slides}</RdsCarousel>);
    expect(dots(container)[2]).toHaveAttribute('aria-current', 'true');
  });

  it('variant wins over style', () => {
    const { container } = render(<RdsCarousel variant="with title" style="default">{slides}</RdsCarousel>);
    expect(container.firstElementChild).toHaveClass('rds-carousel--with-title');
  });

  it('items win over titles and subtitles, which warn', () => {
    render(
      <RdsCarousel variant="with title" items={[{ title: 'New T', subtitle: 'New S' }]} titles={['Old T']} subtitles={['Old S']}>
        {slides}
      </RdsCarousel>,
    );
    expect(screen.getByText('New T')).toBeInTheDocument();
    expect(screen.getByText('New S')).toBeInTheDocument();
    expect(screen.queryByText('Old T')).not.toBeInTheDocument();
    expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsCarousel', 'titles', '`items`');
    expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsCarousel', 'subtitles', '`items`');
  });

  it('indicatorVariant wins over type', () => {
    const { container } = render(<RdsCarousel indicatorVariant="line" type="circle">{slides}</RdsCarousel>);
    expect(dots(container)[0]).toHaveClass('rds-carousel__indicator--line');
  });
});

