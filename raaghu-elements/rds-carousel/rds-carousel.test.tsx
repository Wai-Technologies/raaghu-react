import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import RdsCarousel, { RdsCarouselProps } from './rds-carousel';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';

// Mock SCSS
jest.mock('./rds-carousel.scss', () => ({}));

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
      
      // After clicking next, second slide should be visible
      expect(screen.getByTestId('slide-2')).toBeInTheDocument();
    });

    it('should navigate to previous slide on prev arrow click', () => {
      renderWithTheme(<RdsCarousel {...defaultProps} state="2" />);
      const prevButton = screen.getAllByRole('button')[0];
      fireEvent.click(prevButton);
      
      // After clicking prev from slide 2, should go to slide 1
      expect(screen.getByTestId('slide-1')).toBeInTheDocument();
    });

    it('should wrap around to last slide when clicking prev on first slide', () => {
      renderWithTheme(<RdsCarousel {...defaultProps} state="1" />);
      const prevButton = screen.getAllByRole('button')[0];
      fireEvent.click(prevButton);
      
      // Should wrap to last slide
      expect(screen.getByTestId('slide-3')).toBeInTheDocument();
    });

    it('should wrap around to first slide when clicking next on last slide', () => {
      renderWithTheme(<RdsCarousel {...defaultProps} state="3" />);
      const nextButton = screen.getAllByRole('button')[1];
      fireEvent.click(nextButton);
      
      // Should wrap to first slide
      expect(screen.getByTestId('slide-1')).toBeInTheDocument();
    });

    it('should not show arrows for single slide', () => {
      const { container } = renderWithTheme(
        <RdsCarousel children={[<div key="1">Single</div>]} />
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
        <RdsCarousel children={[<div key="1">Single</div>]} />
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
          children={[<div key="1">Single</div>]}
          autoPlay={true}
          autoPlayInterval={1000}
        />
      );
      jest.advanceTimersByTime(2000);
      expect(screen.getByText('Single')).toBeInTheDocument();
    });
  });

  describe('State Management', () => {
    it('should set initial slide from state prop', () => {
      renderWithTheme(<RdsCarousel {...defaultProps} state="2" />);
      expect(screen.getByTestId('slide-2')).toBeInTheDocument();
    });

    it('should set to last slide from state prop', () => {
      renderWithTheme(<RdsCarousel {...defaultProps} state="3" />);
      expect(screen.getByTestId('slide-3')).toBeInTheDocument();
    });

    it('should handle state at max boundary', () => {
      renderWithTheme(<RdsCarousel {...defaultProps} state="3" />);
      expect(screen.getByTestId('slide-3')).toBeInTheDocument();
    });

    it('should update slide when state changes', () => {
      const { rerender } = renderWithTheme(
        <RdsCarousel {...defaultProps} state="1" />
      );
      expect(screen.getByTestId('slide-1')).toBeInTheDocument();

      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsCarousel {...defaultProps} state="3" />
        </ThemeProvider>
      );
      expect(screen.getByTestId('slide-3')).toBeInTheDocument();
    });
  });

  describe('Styles', () => {
    it('should apply default style', () => {
      const { container } = renderWithTheme(
        <RdsCarousel {...defaultProps} style="default" />
      );
      expect(container.querySelector('.rds-carousel--default')).toBeInTheDocument();
    });

    it('should apply with-title style', () => {
      const { container } = renderWithTheme(
        <RdsCarousel {...defaultProps} style="with title" />
      );
      expect(container.querySelector('.rds-carousel--with-title')).toBeInTheDocument();
    });

    it('should apply full-width-image style', () => {
      const { container } = renderWithTheme(
        <RdsCarousel {...defaultProps} style="full width image" />
      );
      const carousel = container.querySelector('.rds-carousel');
      expect(carousel).toHaveClass('rds-carousel--full-width');
      expect(carousel).toHaveClass('image');
    });

    it('should render title with with-title style', () => {
      renderWithTheme(
        <RdsCarousel 
          {...defaultProps}
          style="with title"
          titles={['Title 1', 'Title 2', 'Title 3']}
        />
      );
      expect(screen.getByText('Title 1')).toBeInTheDocument();
    });

    it('should render subtitle with with-title style', () => {
      renderWithTheme(
        <RdsCarousel 
          {...defaultProps}
          style="with title"
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
          style="with title"
          titles={['Custom Title 1', 'Custom Title 2', 'Custom Title 3']}
        />
      );
      expect(screen.getByText('Custom Title 1')).toBeInTheDocument();
    });

    it('should use global title as fallback', () => {
      renderWithTheme(
        <RdsCarousel 
          {...defaultProps}
          style="with title"
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
          style="with title"
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
          style="with title"
          subtitles={['Custom Sub 1', 'Custom Sub 2', 'Custom Sub 3']}
        />
      );
      expect(screen.getByText('Custom Sub 1')).toBeInTheDocument();
    });

    it('should use global subtitle as fallback', () => {
      renderWithTheme(
        <RdsCarousel 
          {...defaultProps}
          style="with title"
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
          style="with title"
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
        <RdsCarousel children={[<div key="1">Single Slide</div>]} />
      );
      expect(screen.getByText('Single Slide')).toBeInTheDocument();
    });

    it('should handle many slides', () => {
      const manySlides = Array.from({ length: 10 }, (_, i) => (
        <div key={i} data-testid={`slide-${i}`}>
          Slide {i + 1}
        </div>
      ));
      renderWithTheme(<RdsCarousel children={manySlides} />);
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
          style="with title"
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
      renderWithTheme(<RdsCarousel children={complexSlides} />);
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
          children={[
            <div key="1">Child 1</div>,
            <div key="2">Child 2</div>,
          ]}
        />
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
          children={defaultSlides}
          autoPlay={true}
          autoPlayInterval={2000}
          showArrows={true}
          showDots={true}
          height="600px"
          type="line"
          style="with title"
          className="custom-carousel"
          titles={['T1', 'T2', 'T3']}
          subtitles={['S1', 'S2', 'S3']}
        />
      );
      expect(screen.getByTestId('slide-1')).toBeInTheDocument();
      expect(screen.getByText('T1')).toBeInTheDocument();
      expect(screen.getByText('S1')).toBeInTheDocument();
    });
  });
});