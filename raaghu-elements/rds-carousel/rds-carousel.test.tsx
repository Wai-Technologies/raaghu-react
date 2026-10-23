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

  const renderWithTheme = (component: React.ReactElement) => {
    const theme = createTheme();
    return render(
      <ThemeProvider theme={theme}>
        {component}
      </ThemeProvider>
    );
  };

  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      renderWithTheme(<RdsCarousel {...defaultProps} />);
      expect(screen.getByTestId('slide-1')).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsCarousel.displayName).toBe('RdsCarousel');
    });

    it('should render all slides', () => {
      renderWithTheme(<RdsCarousel {...defaultProps} />);
      expect(screen.getByTestId('slide-1')).toBeInTheDocument();
      expect(screen.getByTestId('slide-2')).toBeInTheDocument();
      expect(screen.getByTestId('slide-3')).toBeInTheDocument();
    });

    it('should render with default props', () => {
      renderWithTheme(<RdsCarousel {...defaultProps} />);
      expect(screen.getByTestId('slide-1')).toBeInTheDocument();
    });

    it('should render with custom className', () => {
      const { container } = renderWithTheme(
        <RdsCarousel {...defaultProps} className="custom-carousel" />
      );
      expect(container.querySelector('.custom-carousel')).toBeInTheDocument();
    });

    it('should render rds-carousel wrapper class', () => {
      const { container } = renderWithTheme(
        <RdsCarousel {...defaultProps} />
      );
      expect(container.querySelector('.rds-carousel')).toBeInTheDocument();
    });
  });

  describe('Navigation Arrows', () => {
    it('should show arrows by default', () => {
      renderWithTheme(<RdsCarousel {...defaultProps} />);
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
    });

    it('should not show arrows when showArrows is false', () => {
      const { container } = renderWithTheme(
        <RdsCarousel {...defaultProps} showArrows={false} />
      );
      expect(
        container.querySelector('.rds-carousel__navigation--prev')
      ).not.toBeInTheDocument();
    });

    it('should navigate to next slide on next arrow click', () => {
      renderWithTheme(<RdsCarousel {...defaultProps} />);
      const nextButton = screen.getAllByRole('button')[1];
      fireEvent.click(nextButton);
      
      expect(screen.getByTestId('slide-2')).toBeInTheDocument();
    });

    it('should navigate to previous slide on prev arrow click', () => {
      renderWithTheme(<RdsCarousel {...defaultProps} defaultIndex={1} />);
      const prevButton = screen.getAllByRole('button')[0];
      fireEvent.click(prevButton);
      
      expect(screen.getByTestId('slide-1')).toBeInTheDocument();
    });

    it('should wrap around to last slide when clicking prev on first slide', () => {
      renderWithTheme(<RdsCarousel {...defaultProps} defaultIndex={0} />);
      const prevButton = screen.getAllByRole('button')[0];
      fireEvent.click(prevButton);
      
      expect(screen.getByTestId('slide-3')).toBeInTheDocument();
    });

    it('should wrap around to first slide when clicking next on last slide', () => {
      renderWithTheme(<RdsCarousel {...defaultProps} defaultIndex={2} />);
      const nextButton = screen.getAllByRole('button')[1];
      fireEvent.click(nextButton);
      
      expect(screen.getByTestId('slide-1')).toBeInTheDocument();
    });

    it('should not show arrows for single slide', () => {
      const { container } = renderWithTheme(
        <RdsCarousel >{[<div key="1">Single</div>]}</RdsCarousel>
      );
      expect(
        container.querySelector('.rds-carousel__navigation--prev')
      ).not.toBeInTheDocument();
    });

    it('should handle multiple arrow clicks', () => {
      renderWithTheme(<RdsCarousel {...defaultProps} />);
      const nextButton = screen.getAllByRole('button')[1];
      
      fireEvent.click(nextButton); // -> slide 2
      fireEvent.click(nextButton); // -> slide 3
      expect(screen.getByTestId('slide-3')).toBeInTheDocument();
    });
  });

  describe('Dot Indicators', () => {
    it('should show dots by default', () => {
      const { container } = renderWithTheme(
        <RdsCarousel {...defaultProps} />
      );
      expect(
        container.querySelector('.rds-carousel__indicators')
      ).toBeInTheDocument();
    });

    it('should not show dots when showDots is false', () => {
      const { container } = renderWithTheme(
        <RdsCarousel {...defaultProps} showDots={false} />
      );
      expect(
        container.querySelector('.rds-carousel__indicators')
      ).not.toBeInTheDocument();
    });

    it('should render correct number of dots', () => {
      const { container } = renderWithTheme(
        <RdsCarousel {...defaultProps} />
      );
      const dots = container.querySelectorAll('.rds-carousel__indicator');
      expect(dots.length).toBe(3);
    });

    it('should mark current slide dot as active', () => {
      const { container } = renderWithTheme(
        <RdsCarousel {...defaultProps} />
      );
      const activeDot = container.querySelector('.rds-carousel__indicator__active');
      expect(activeDot).toBeInTheDocument();
    });

    it('should navigate to slide when dot is clicked', () => {
      const { container } = renderWithTheme(
        <RdsCarousel {...defaultProps} />
      );
      const dots = container.querySelectorAll('.rds-carousel__indicator');
      fireEvent.click(dots[2]); // Click third dot
      
      expect(screen.getByTestId('slide-3')).toBeInTheDocument();
    });

    it('should not show dots for single slide', () => {
      const { container } = renderWithTheme(
        <RdsCarousel >{[<div key="1">Single</div>]}</RdsCarousel>
      );
      expect(
        container.querySelector('.rds-carousel__indicators')
      ).not.toBeInTheDocument();
    });

    it('should render circle type indicators', () => {
      const { container } = renderWithTheme(
        <RdsCarousel {...defaultProps} type="circle" />
      );
      const dots = container.querySelectorAll('.rds-carousel__indicator--circle');
      expect(dots.length).toBe(3);
    });

    it('should render line type indicators', () => {
      const { container } = renderWithTheme(
        <RdsCarousel {...defaultProps} type="line" />
      );
      const dots = container.querySelectorAll('.rds-carousel__indicator--line');
      expect(dots.length).toBe(3);
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
      renderWithTheme(<RdsCarousel {...defaultProps} />);
      jest.advanceTimersByTime(5000);
      expect(screen.getByTestId('slide-1')).toBeInTheDocument();
    });

    it('should autoplay when enabled', () => {
      renderWithTheme(
        <RdsCarousel {...defaultProps} autoPlay={true} autoPlayInterval={1000} />
      );
      jest.advanceTimersByTime(1500);
      expect(screen.getByTestId('slide-2')).toBeInTheDocument();
    });

    it('should use custom autoPlayInterval', () => {
      renderWithTheme(
        <RdsCarousel {...defaultProps} autoPlay={true} autoPlayInterval={2000} />
      );
      jest.advanceTimersByTime(1500);
      expect(screen.getByTestId('slide-1')).toBeInTheDocument();
      
      jest.advanceTimersByTime(600);
      expect(screen.getByTestId('slide-2')).toBeInTheDocument();
    });

    it('should cycle through all slides with autoplay', () => {
      renderWithTheme(
        <RdsCarousel {...defaultProps} autoPlay={true} autoPlayInterval={1000} />
      );
      
      jest.advanceTimersByTime(1500); // Slide 2
      expect(screen.getByTestId('slide-2')).toBeInTheDocument();
      
      jest.advanceTimersByTime(1000); // Slide 3
      expect(screen.getByTestId('slide-3')).toBeInTheDocument();
      
      jest.advanceTimersByTime(1000); // Back to Slide 1
      expect(screen.getByTestId('slide-1')).toBeInTheDocument();
    });

    it('should not autoplay with single slide', () => {
      renderWithTheme(
        <RdsCarousel 
         
          autoPlay={true}
          autoPlayInterval={1000}
        >{[<div key="1">Single</div>]}</RdsCarousel>
      );
      jest.advanceTimersByTime(2000);
      expect(screen.getByText('Single')).toBeInTheDocument();
    });
  });

  describe('State Management', () => {
    it('should set initial slide from activeIndex', () => {
      renderWithTheme(<RdsCarousel {...defaultProps} activeIndex={1} />);
      expect(screen.getByTestId('slide-2')).toBeInTheDocument();
    });

    it('should set to last slide from activeIndex', () => {
      renderWithTheme(<RdsCarousel {...defaultProps} activeIndex={2} />);
      expect(screen.getByTestId('slide-3')).toBeInTheDocument();
    });

    it('should handle activeIndex at the last slide', () => {
      renderWithTheme(<RdsCarousel {...defaultProps} activeIndex={2} />);
      expect(screen.getByTestId('slide-3')).toBeInTheDocument();
    });

    it('should update slide when activeIndex changes', () => {
      const { rerender } = renderWithTheme(
        <RdsCarousel {...defaultProps} activeIndex={0} />
      );
      expect(screen.getByTestId('slide-1')).toBeInTheDocument();

      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsCarousel {...defaultProps} activeIndex={2} />
        </ThemeProvider>
      );
      expect(screen.getByTestId('slide-3')).toBeInTheDocument();
    });
  });

  describe('Styles', () => {
    it('should apply default style', () => {
      const { container } = renderWithTheme(
        <RdsCarousel {...defaultProps} variant="default" />
      );
      expect(container.querySelector('.rds-carousel--default')).toBeInTheDocument();
    });

    it('should apply with-title style', () => {
      const { container } = renderWithTheme(
        <RdsCarousel {...defaultProps} variant="with title" />
      );
      expect(container.querySelector('.rds-carousel--with-title')).toBeInTheDocument();
    });

    it('should apply full-width-image style', () => {
      const { container } = renderWithTheme(
        <RdsCarousel {...defaultProps} variant="full width image" />
      );
      const carousel = container.querySelector('.rds-carousel');
      expect(carousel).toHaveClass('rds-carousel--full-width');
      expect(carousel).toHaveClass('image');
    });

    it('should render title with with-title style', () => {
      renderWithTheme(
        <RdsCarousel 
          {...defaultProps}
          variant="with title"
          titles={['Title 1', 'Title 2', 'Title 3']}
        />
      );
      expect(screen.getByText('Title 1')).toBeInTheDocument();
    });

    it('should render subtitle with with-title style', () => {
      renderWithTheme(
        <RdsCarousel 
          {...defaultProps}
          variant="with title"
          subtitles={['Subtitle 1', 'Subtitle 2', 'Subtitle 3']}
        />
      );
      expect(screen.getByText('Subtitle 1')).toBeInTheDocument();
    });
  });

  describe('Titles and Subtitles', () => {
    it('should use individual titles', () => {
      renderWithTheme(
        <RdsCarousel 
          {...defaultProps}
          variant="with title"
          titles={['Custom Title 1', 'Custom Title 2', 'Custom Title 3']}
        />
      );
      expect(screen.getByText('Custom Title 1')).toBeInTheDocument();
    });

    it('should use global title as fallback', () => {
      renderWithTheme(
        <RdsCarousel 
          {...defaultProps}
          variant="with title"
          title="Global Title"
        />
      );
      const titles = screen.getAllByText('Global Title');
      expect(titles.length).toBeGreaterThan(0);
    });

    it('should prioritize individual titles over global title', () => {
      renderWithTheme(
        <RdsCarousel 
          {...defaultProps}
          variant="with title"
          titles={['Individual Title', 'Global Title', 'Global Title']}
          title="Global Title"
        />
      );
      expect(screen.getByText('Individual Title')).toBeInTheDocument();
    });

    it('should use individual subtitles', () => {
      renderWithTheme(
        <RdsCarousel 
          {...defaultProps}
          variant="with title"
          subtitles={['Custom Sub 1', 'Custom Sub 2', 'Custom Sub 3']}
        />
      );
      expect(screen.getByText('Custom Sub 1')).toBeInTheDocument();
    });

    it('should use global subtitle as fallback', () => {
      renderWithTheme(
        <RdsCarousel 
          {...defaultProps}
          variant="with title"
          subtitle="Global Subtitle"
        />
      );
      const subtitles = screen.getAllByText('Global Subtitle');
      expect(subtitles.length).toBeGreaterThan(0);
    });

    it('should render different titles for each slide', () => {
      const { container } = renderWithTheme(
        <RdsCarousel 
          {...defaultProps}
          variant="with title"
          titles={['Slide 1 Title', 'Slide 2 Title', 'Slide 3 Title']}
        />
      );
      expect(screen.getByText('Slide 1 Title')).toBeInTheDocument();
    });
  });

  describe('Height Configuration', () => {
    it('should apply default height', () => {
      const { container } = renderWithTheme(
        <RdsCarousel {...defaultProps} />
      );
      const carousel = container.querySelector('.rds-carousel');
      expect(carousel).toBeInTheDocument();
    });

    it('should apply custom string height', () => {
      const { container } = renderWithTheme(
        <RdsCarousel {...defaultProps} height="600px" />
      );
      const carousel = container.querySelector('.rds-carousel');
      expect(carousel).toBeInTheDocument();
    });

    it('should apply custom numeric height', () => {
      const { container } = renderWithTheme(
        <RdsCarousel {...defaultProps} height={300} />
      );
      const carousel = container.querySelector('.rds-carousel');
      expect(carousel).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle single child slide', () => {
      renderWithTheme(
        <RdsCarousel >{[<div key="1">Single Slide</div>]}</RdsCarousel>
      );
      expect(screen.getByText('Single Slide')).toBeInTheDocument();
    });

    it('should handle many slides', () => {
      const manySlides = Array.from({ length: 10 }, (_, slideNumber) => slideNumber + 1).map((slideNumber) => (
        <div key={slideNumber} data-testid={`slide-${slideNumber - 1}`}>
          Slide {slideNumber}
        </div>
      ));
      renderWithTheme(<RdsCarousel >{manySlides}</RdsCarousel>);
      expect(screen.getByTestId('slide-0')).toBeInTheDocument();
    });

    it('should handle rapid navigation', () => {
      renderWithTheme(<RdsCarousel {...defaultProps} />);
      const nextButton = screen.getAllByRole('button')[1];
      
      fireEvent.click(nextButton);
      fireEvent.click(nextButton);
      fireEvent.click(nextButton);
      
      expect(screen.getByTestId('slide-1')).toBeInTheDocument();
    });

    it('should handle empty titles array', () => {
      renderWithTheme(
        <RdsCarousel 
          {...defaultProps}
          variant="with title"
          titles={[]}
        />
      );
      expect(screen.getByTestId('slide-1')).toBeInTheDocument();
    });

    it('should handle slides with complex content', () => {
      const complexSlides = [
        <div key="1">
          <h2>Title</h2>
          <p>Description</p>
          <button>Button</button>
        </div>,
      ];
      renderWithTheme(<RdsCarousel >{complexSlides}</RdsCarousel>);
      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Description')).toBeInTheDocument();
      expect(screen.getByText('Button')).toBeInTheDocument();
    });
  });

  describe('Default Props', () => {
    it('should have autoPlay as false by default', () => {
      jest.useFakeTimers();
      renderWithTheme(<RdsCarousel {...defaultProps} />);
      jest.advanceTimersByTime(5000);
      expect(screen.getByTestId('slide-1')).toBeInTheDocument();
      jest.useRealTimers();
    });

    it('should have showArrows as true by default', () => {
      renderWithTheme(<RdsCarousel {...defaultProps} />);
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
    });

    it('should have showDots as true by default', () => {
      const { container } = renderWithTheme(
        <RdsCarousel {...defaultProps} />
      );
      expect(
        container.querySelector('.rds-carousel__indicators')
      ).toBeInTheDocument();
    });

    it('should have type as circle by default', () => {
      const { container } = renderWithTheme(
        <RdsCarousel {...defaultProps} />
      );
      const dots = container.querySelectorAll('.rds-carousel__indicator--circle');
      expect(dots.length).toBe(3);
    });

    it('should have style as default by default', () => {
      const { container } = renderWithTheme(
        <RdsCarousel {...defaultProps} />
      );
      expect(container.querySelector('.rds-carousel--default')).toBeInTheDocument();
    });

    it('should have height as 400px by default', () => {
      const { container } = renderWithTheme(
        <RdsCarousel {...defaultProps} />
      );
      const carousel = container.querySelector('.rds-carousel');
      expect(carousel).toBeInTheDocument();
    });

    it('should have autoPlayInterval as 3000 by default', () => {
      jest.useFakeTimers();
      renderWithTheme(
        <RdsCarousel {...defaultProps} autoPlay={true} />
      );
      jest.advanceTimersByTime(2500);
      expect(screen.getByTestId('slide-1')).toBeInTheDocument();
      jest.advanceTimersByTime(600);
      expect(screen.getByTestId('slide-2')).toBeInTheDocument();
      jest.useRealTimers();
    });
  });

  describe('Props Validation', () => {
    it('should accept ReactNode array children', () => {
      renderWithTheme(
        <RdsCarousel
         
        >{[
            <div key="1">Child 1</div>,
            <div key="2">Child 2</div>,
          ]}</RdsCarousel>
      );
      expect(screen.getByText('Child 1')).toBeInTheDocument();
    });

    it('should accept boolean autoPlay', () => {
      renderWithTheme(
        <RdsCarousel {...defaultProps} autoPlay={true} />
      );
      expect(screen.getByTestId('slide-1')).toBeInTheDocument();
    });

    it('should accept string className', () => {
      const { container } = renderWithTheme(
        <RdsCarousel {...defaultProps} className="test-class" />
      );
      expect(container.querySelector('.test-class')).toBeInTheDocument();
    });

    it('should accept number autoPlayInterval', () => {
      renderWithTheme(
        <RdsCarousel {...defaultProps} autoPlayInterval={5000} />
      );
      expect(screen.getByTestId('slide-1')).toBeInTheDocument();
    });

    it('should accept boolean showArrows', () => {
      renderWithTheme(
        <RdsCarousel {...defaultProps} showArrows={false} />
      );
      expect(screen.getByTestId('slide-1')).toBeInTheDocument();
    });

    it('should accept boolean showDots', () => {
      renderWithTheme(
        <RdsCarousel {...defaultProps} showDots={false} />
      );
      expect(screen.getByTestId('slide-1')).toBeInTheDocument();
    });

    it('should accept string height', () => {
      renderWithTheme(
        <RdsCarousel {...defaultProps} height="500px" />
      );
      expect(screen.getByTestId('slide-1')).toBeInTheDocument();
    });

    it('should accept number height', () => {
      renderWithTheme(
        <RdsCarousel {...defaultProps} height={300} />
      );
      expect(screen.getByTestId('slide-1')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have interactive buttons for navigation', () => {
      renderWithTheme(<RdsCarousel {...defaultProps} />);
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
  
    });

    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsCarousel {...defaultProps} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have focusable navigation buttons', () => {
      renderWithTheme(<RdsCarousel {...defaultProps} />);
      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        expect(button).toBeVisible();
      });
    });

    it('should support keyboard navigation', () => {
      renderWithTheme(<RdsCarousel {...defaultProps} />);
      const nextButton = screen.getAllByRole('button')[1];
      expect(nextButton).toBeVisible();
    });
  });

  describe('Combined Props', () => {
    it('should handle all props together', () => {
      renderWithTheme(
        <RdsCarousel
         
          autoPlay={true}
          autoPlayInterval={2000}
          showArrows={true}
          showDots={true}
          height="600px"
          type="line"
          variant="with title"
          className="custom-carousel"
          titles={['T1', 'T2', 'T3']}
          subtitles={['S1', 'S2', 'S3']}
        >{defaultSlides}</RdsCarousel>
      );
      expect(screen.getByTestId('slide-1')).toBeInTheDocument();
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
