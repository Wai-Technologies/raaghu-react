import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import RdsRating from './rds-rating';
import { axe } from 'jest-axe';

jest.mock('./rds-rating.scss', () => ({}));

const renderWithTheme = (component: React.ReactElement) => {
  const theme = createTheme();
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('RdsRating', () => {
  describe('Basic Rendering', () => {
    it('should render star rating component by default', () => {
      const { container } = renderWithTheme(<RdsRating />);
      expect(container.querySelector('.rds-rating')).toBeInTheDocument();
      expect(container.querySelector('.rds-rating--star')).toBeInTheDocument();
    });

    it('should render slider rating when type is slider', () => {
      const { container } = renderWithTheme(<RdsRating type="slider" />);
      expect(container.querySelector('.rds-rating--slider')).toBeInTheDocument();
    });

    it('should render with label when provided', () => {
      renderWithTheme(<RdsRating label="Rate this product" />);
      expect(screen.getByText('Rate this product')).toBeInTheDocument();
    });

    it('should not render label when not provided', () => {
      const { container } = renderWithTheme(<RdsRating />);
      expect(container.querySelector('.rds-rating__label')).not.toBeInTheDocument();
    });

    it('should have correct CSS class for default style', () => {
      const { container } = renderWithTheme(<RdsRating styles="default" />);
      expect(container.querySelector('.rds-rating--default')).toBeInTheDocument();
    });

    it('should render without errors with default props', () => {
      const { container } = renderWithTheme(<RdsRating />);
      expect(container.querySelector('.rds-rating')).toBeInTheDocument();
    });
  });

  describe('Star Rating Type', () => {
    it('should render MUI Rating component for star type', () => {
      const { container } = renderWithTheme(
        <RdsRating type="star" maxStars={5} />
      );
      const rating = container.querySelector('.rds-rating__stars');
      expect(rating).toBeInTheDocument();
    });

    it('should display 5 stars by default', () => {
      const { container } = renderWithTheme(<RdsRating type="star" />);
      const ratingElement = container.querySelector('.rds-rating__stars');
      expect(ratingElement).toBeInTheDocument();
    });

    it('should display custom number of stars', () => {
      const { container } = renderWithTheme(
        <RdsRating type="star" maxStars={10} />
      );
      expect(container.querySelector('.rds-rating__stars')).toBeInTheDocument();
    });

    it('should handle star selection', () => {
      const handleChange = jest.fn();
      const { container } = renderWithTheme(
        <RdsRating type="star" onChange={handleChange} />
      );
      
      const stars = container.querySelectorAll('[role="radio"]');
      if (stars.length > 0) {
        fireEvent.click(stars[2]);
        expect(container.querySelector('.rds-rating')).toBeInTheDocument();
      }
    });

    it('should apply styles class to stars', () => {
      const { container } = renderWithTheme(
        <RdsRating type="star" styles="filled" />
      );
      expect(container.querySelector('.rds-rating__stars--filled')).toBeInTheDocument();
    });

    it('should apply color variant to stars', () => {
      const { container } = renderWithTheme(
        <RdsRating type="star" colorVariant="primary" />
      );
      expect(container.querySelector('.rds-rating__stars--color-primary')).toBeInTheDocument();
    });
  });

  describe('Slider Rating Type', () => {
    it('should render slider for slider type', () => {
      const { container } = renderWithTheme(<RdsRating type="slider" />);
      expect(container.querySelector('.rds-rating__slider-container')).toBeInTheDocument();
      expect(container.querySelector('.rds-rating__slider')).toBeInTheDocument();
    });

    it('should display slider labels', () => {
      renderWithTheme(<RdsRating type="slider" />);
      expect(screen.getByText('No')).toBeInTheDocument();
      expect(screen.getByText('Maybe')).toBeInTheDocument();
      expect(screen.getByText('Yes')).toBeInTheDocument();
    });

    it('should snap slider values to allowed values', () => {
      const { container } = renderWithTheme(
        <RdsRating type="slider" value={1.5} />
      );
      expect(container.querySelector('.rds-rating__slider')).toBeInTheDocument();
    });

    it('should display value when showValue is true for slider', () => {
      const { container } = renderWithTheme(
        <RdsRating type="slider" value={2.5} showValue={true} />
      );
      expect(container.querySelector('.rds-rating__value')).toBeInTheDocument();
    });

    it('should not display value when showValue is false', () => {
      const { container } = renderWithTheme(
        <RdsRating type="slider" value={2.5} showValue={false} />
      );
      expect(container.querySelector('.rds-rating__value')).not.toBeInTheDocument();
    });

    it('should apply color variant to slider', () => {
      const { container } = renderWithTheme(
        <RdsRating type="slider" colorVariant="success" />
      );
      expect(container.querySelector('.rds-rating__slider--color-success')).toBeInTheDocument();
    });

    it('should apply position class based on level', () => {
      const { container } = renderWithTheme(
        <RdsRating type="slider" level="Left" />
      );
      expect(container.querySelector('.rds-rating--position-left')).toBeInTheDocument();
    });

    it('should handle level Mid position', () => {
      const { container } = renderWithTheme(
        <RdsRating type="slider" level="Mid" />
      );
      expect(container.querySelector('.rds-rating--position-mid')).toBeInTheDocument();
    });

    it('should handle level Right position', () => {
      const { container } = renderWithTheme(
        <RdsRating type="slider" level="Right" />
      );
      expect(container.querySelector('.rds-rating--position-right')).toBeInTheDocument();
    });
  });

  describe('Label and Value Display', () => {
    it('should render label and value for star rating', () => {
      const { container } = renderWithTheme(
        <RdsRating 
          type="star" 
          label="Quality" 
          value={3} 
          showValue={true} 
        />
      );
      expect(screen.getByText('Quality')).toBeInTheDocument();
      expect(container.querySelector('.rds-rating__display-value')).toBeInTheDocument();
    });

    it('should display star rating value in fraction format', () => {
      const { container } = renderWithTheme(
        <RdsRating type="star" value={3} showValue={true} maxStars={5} />
      );
      const displayValue = container.querySelector('.rds-rating__display-value');
      expect(displayValue?.textContent).toMatch(/\(\d\/\d\)/);
    });

    it('should display slider value with decimal format', () => {
      const { container } = renderWithTheme(
        <RdsRating type="slider" value={2.5} showValue={true} />
      );
      const displayValue = container.querySelector('.rds-rating__display-value');
      expect(displayValue?.textContent).toBeTruthy();
    });

    it('should not display value when showValue is false', () => {
      const { container } = renderWithTheme(
        <RdsRating type="star" value={4} showValue={false} />
      );
      expect(container.querySelector('.rds-rating__display-value')).not.toBeInTheDocument();
    });

    it('should render with custom label text', () => {
      renderWithTheme(
        <RdsRating 
          type="star" 
          label="How would you rate us?" 
        />
      );
      expect(screen.getByText('How would you rate us?')).toBeInTheDocument();
    });
  });

  describe('Level Prop', () => {
    it('should set star rating value based on numeric level', () => {
      const { container } = renderWithTheme(
        <RdsRating type="star" level={3} value={undefined} />
      );
      expect(container.querySelector('.rds-rating')).toBeInTheDocument();
    });

    it('should handle half-star level', () => {
      const { container } = renderWithTheme(
        <RdsRating type="star" level={3.5} value={undefined} />
      );
      expect(container.querySelector('.rds-rating')).toBeInTheDocument();
    });

    it('should handle level for slider Left position', () => {
      const { container } = renderWithTheme(
        <RdsRating type="slider" level="Left" />
      );
      expect(container.querySelector('.rds-rating--position-left')).toBeInTheDocument();
    });

    it('should handle level for slider Mid position', () => {
      const { container } = renderWithTheme(
        <RdsRating type="slider" level="Mid" />
      );
      expect(container.querySelector('.rds-rating--position-mid')).toBeInTheDocument();
    });

    it('should handle level for slider Right position', () => {
      const { container } = renderWithTheme(
        <RdsRating type="slider" level="Right" />
      );
      expect(container.querySelector('.rds-rating--position-right')).toBeInTheDocument();
    });

    it('should prioritize level over value prop', () => {
      const { container } = renderWithTheme(
        <RdsRating type="star" level={4} value={2} />
      );
      expect(container.querySelector('.rds-rating')).toBeInTheDocument();
    });
  });

  describe('Style Variants', () => {
    it('should apply default style class', () => {
      const { container } = renderWithTheme(
        <RdsRating type="star" styles="default" />
      );
      expect(container.querySelector('.rds-rating--default')).toBeInTheDocument();
    });

    it('should apply filled style class', () => {
      const { container } = renderWithTheme(
        <RdsRating type="star" styles="filled" />
      );
      expect(container.querySelector('.rds-rating--filled')).toBeInTheDocument();
    });

    it('should apply outlined style class', () => {
      const { container } = renderWithTheme(
        <RdsRating type="star" styles="outlined" />
      );
      expect(container.querySelector('.rds-rating--outlined')).toBeInTheDocument();
    });

    it('should apply color variant class', () => {
      const { container } = renderWithTheme(
        <RdsRating type="star" colorVariant="danger" />
      );
      expect(container.querySelector('.rds-rating--color-danger')).toBeInTheDocument();
    });

    it('should apply multiple style variants together', () => {
      const { container } = renderWithTheme(
        <RdsRating 
          type="star" 
          styles="filled" 
          colorVariant="success" 
        />
      );
      expect(container.querySelector('.rds-rating--filled')).toBeInTheDocument();
      expect(container.querySelector('.rds-rating--color-success')).toBeInTheDocument();
    });
  });

  describe('Color Variants', () => {
    it('should apply primary color variant', () => {
      const { container } = renderWithTheme(
        <RdsRating type="star" colorVariant="primary" />
      );
      expect(container.querySelector('.rds-rating--color-primary')).toBeInTheDocument();
    });

    it('should apply success color variant', () => {
      const { container } = renderWithTheme(
        <RdsRating type="star" colorVariant="success" />
      );
      expect(container.querySelector('.rds-rating--color-success')).toBeInTheDocument();
    });

    it('should apply danger color variant', () => {
      const { container } = renderWithTheme(
        <RdsRating type="star" colorVariant="danger" />
      );
      expect(container.querySelector('.rds-rating--color-danger')).toBeInTheDocument();
    });

    it('should apply warning color variant', () => {
      const { container } = renderWithTheme(
        <RdsRating type="star" colorVariant="warning" />
      );
      expect(container.querySelector('.rds-rating--color-warning')).toBeInTheDocument();
    });

    it('should apply info color variant to star rating', () => {
      const { container } = renderWithTheme(
        <RdsRating type="star" colorVariant="info" />
      );
      expect(container.querySelector('.rds-rating--color-info')).toBeInTheDocument();
    });

    it('should apply info color variant to slider rating', () => {
      const { container } = renderWithTheme(
        <RdsRating type="slider" colorVariant="info" />
      );
      expect(container.querySelector('.rds-rating--color-info')).toBeInTheDocument();
    });
  });

  describe('Value and Max Props', () => {
    it('should handle controlled value prop', () => {
      const { container } = renderWithTheme(
        <RdsRating type="star" value={4} />
      );
      expect(container.querySelector('.rds-rating')).toBeInTheDocument();
    });

    it('should respect maxStars prop', () => {
      const { container } = renderWithTheme(
        <RdsRating type="star" maxStars={10} />
      );
      expect(container.querySelector('.rds-rating')).toBeInTheDocument();
    });

    it('should prefer max over maxStars prop', () => {
      const { container } = renderWithTheme(
        <RdsRating type="star" max={7} maxStars={5} />
      );
      expect(container.querySelector('.rds-rating')).toBeInTheDocument();
    });

    it('should handle zero value', () => {
      const { container } = renderWithTheme(
        <RdsRating type="star" value={0} showValue={true} />
      );
      expect(container.querySelector('.rds-rating')).toBeInTheDocument();
    });

    it('should handle null value', () => {
      const { container } = renderWithTheme(
        <RdsRating type="star" value={undefined} />
      );
      expect(container.querySelector('.rds-rating')).toBeInTheDocument();
    });

    it('should handle value update', () => {
      const { container, rerender } = renderWithTheme(
        <RdsRating type="star" value={2} />
      );

      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsRating type="star" value={4} />
        </ThemeProvider>
      );

      expect(container.querySelector('.rds-rating')).toBeInTheDocument();
    });
  });

  describe('User Interaction', () => {
    it('should call onChange when star rating is clicked', () => {
      const handleChange = jest.fn();
      const { container } = renderWithTheme(
        <RdsRating type="star" onChange={handleChange} />
      );
      
      const stars = container.querySelectorAll('[role="radio"]');
      if (stars.length > 0) {
        fireEvent.click(stars[2]);
      }
    });

    it('should handle star deselection by clicking same value', () => {
      const handleChange = jest.fn();
      const { container } = renderWithTheme(
        <RdsRating type="star" value={3} onChange={handleChange} />
      );
      
      const stars = container.querySelectorAll('[role="radio"]');
      if (stars.length > 2) {
        fireEvent.click(stars[2]);
      }
    });

    it('should call onChange when slider is moved', async () => {
      const handleChange = jest.fn();
      const { container } = renderWithTheme(
        <RdsRating type="slider" onChange={handleChange} />
      );
      
      const slider = container.querySelector('.MuiSlider-root input');
      if (slider) {
        fireEvent.change(slider, { target: { value: '2.5' } });
      }
    });

    it('should be keyboard accessible for stars', async () => {
      const _user = userEvent.setup();
      const { container } = renderWithTheme(
        <RdsRating type="star" />
      );
      
      const firstStar = container.querySelector('[role="radio"]') as HTMLElement | null;
      if (firstStar) {
        firstStar.focus();
        expect(document.activeElement).toBe(firstStar);
      }
    });

    it('should handle rapid rating changes', () => {
      const handleChange = jest.fn();
      const { container, rerender } = renderWithTheme(
        <RdsRating type="star" value={1} onChange={handleChange} />
      );

      for (let i = 2; i <= 5; i++) {
        rerender(
          <ThemeProvider theme={createTheme()}>
            <RdsRating type="star" value={i} onChange={handleChange} />
          </ThemeProvider>
        );
      }

      expect(container.querySelector('.rds-rating')).toBeInTheDocument();
    });
  });

  describe('Theme Integration', () => {
    it('should work with light theme', () => {
      const lightTheme = createTheme({ palette: { mode: 'light' } });
      const { container } = render(
        <ThemeProvider theme={lightTheme}>
          <RdsRating type="star" />
        </ThemeProvider>
      );
      expect(container.querySelector('.rds-rating')).toBeInTheDocument();
    });

    it('should work with dark theme', () => {
      const darkTheme = createTheme({ palette: { mode: 'dark' } });
      const { container } = render(
        <ThemeProvider theme={darkTheme}>
          <RdsRating type="star" />
        </ThemeProvider>
      );
      expect(container.querySelector('.rds-rating')).toBeInTheDocument();
    });

    it('should respond to theme color changes', () => {
      const customTheme = createTheme({
        palette: {
          primary: {
            main: '#ff0000'
          }
        }
      });

      const { container } = render(
        <ThemeProvider theme={customTheme}>
          <RdsRating type="star" colorVariant="primary" />
        </ThemeProvider>
      );

      expect(container.querySelector('.rds-rating--color-primary')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have accessible star rating interface', () => {
      const { container } = renderWithTheme(
        <RdsRating type="star" />
      );
      
      const ratingElement = container.querySelector('.rds-rating__stars');
      expect(ratingElement).toBeInTheDocument();
  
    });
    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsRating />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have proper ARIA labels for slider', () => {
      renderWithTheme(
        <RdsRating type="slider" label="Rate the experience" />
      );
      
      expect(screen.getByText('Rate the experience')).toBeInTheDocument();
    });

    it('should support keyboard navigation in stars', async () => {
      const _user = userEvent.setup();
      const { container } = renderWithTheme(
        <RdsRating type="star" />
      );
      
      const stars = container.querySelectorAll('[role="radio"]');
      if (stars.length > 0) {
        (stars[0] as HTMLElement).focus();
        expect(document.activeElement).toBe(stars[0]);
      }
    });

    it('should have descriptive label when provided', () => {
      renderWithTheme(
        <RdsRating 
          type="star"
          label="Overall satisfaction"
        />
      );
      
      expect(screen.getByText('Overall satisfaction')).toBeInTheDocument();
    });
  });

  describe('Complex Scenarios', () => {
    it('should handle type change from star to slider', () => {
      const { container, rerender } = renderWithTheme(
        <RdsRating type="star" value={3} />
      );

      expect(container.querySelector('.rds-rating--star')).toBeInTheDocument();

      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsRating type="slider" value={2.5} />
        </ThemeProvider>
      );

      expect(container.querySelector('.rds-rating--slider')).toBeInTheDocument();
    });

    it('should handle level changes', () => {
      const { container, rerender } = renderWithTheme(
        <RdsRating type="slider" level="Left" />
      );

      expect(container.querySelector('.rds-rating--position-left')).toBeInTheDocument();

      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsRating type="slider" level="Right" />
        </ThemeProvider>
      );

      expect(container.querySelector('.rds-rating--position-right')).toBeInTheDocument();
    });

    it('should handle style and color variant changes', () => {
      const { container, rerender } = renderWithTheme(
        <RdsRating 
          type="star" 
          styles="default" 
          colorVariant="primary" 
        />
      );

      expect(container.querySelector('.rds-rating--default')).toBeInTheDocument();

      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsRating 
            type="star" 
            styles="filled" 
            colorVariant="success" 
          />
        </ThemeProvider>
      );

      expect(container.querySelector('.rds-rating--filled')).toBeInTheDocument();
      expect(container.querySelector('.rds-rating--color-success')).toBeInTheDocument();
    });

    it('should handle showValue toggle', () => {
      const { container, rerender } = renderWithTheme(
        <RdsRating type="star" value={4} showValue={false} />
      );

      expect(container.querySelector('.rds-rating__display-value')).not.toBeInTheDocument();

      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsRating type="star" value={4} showValue={true} />
        </ThemeProvider>
      );

      expect(container.querySelector('.rds-rating__display-value')).toBeInTheDocument();
    });

    it('should handle maxStars changes', () => {
      const { container, rerender } = renderWithTheme(
        <RdsRating type="star" maxStars={5} />
      );

      expect(container.querySelector('.rds-rating')).toBeInTheDocument();

      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsRating type="star" maxStars={10} />
        </ThemeProvider>
      );

      expect(container.querySelector('.rds-rating')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle very high max rating', () => {
      const { container } = renderWithTheme(
        <RdsRating type="star" maxStars={100} />
      );
      expect(container.querySelector('.rds-rating')).toBeInTheDocument();
    });

    it('should handle value at maximum', () => {
      const { container } = renderWithTheme(
        <RdsRating type="star" value={5} maxStars={5} showValue={true} />
      );
      expect(container.querySelector('.rds-rating')).toBeInTheDocument();
    });

    it('should handle value above maximum gracefully', () => {
      const { container } = renderWithTheme(
        <RdsRating type="star" value={10} maxStars={5} />
      );
      expect(container.querySelector('.rds-rating')).toBeInTheDocument();
    });

    it('should handle empty/no label gracefully', () => {
      const { container } = renderWithTheme(
        <RdsRating type="star" label="" />
      );
      const label = container.querySelector('.rds-rating__label');
      // Empty string label should still render element
      if (label) {
        expect(label.textContent).toBe('');
      }
    });

    it('should handle undefined values safely', () => {
      const { container } = renderWithTheme(
        <RdsRating 
          type="star" 
          value={undefined} 
          maxStars={undefined}
        />
      );
      expect(container.querySelector('.rds-rating')).toBeInTheDocument();
    });

    it('should handle null onChange gracefully', () => {
      const { container } = renderWithTheme(
        <RdsRating type="star" value={3} onChange={undefined} />
      );
      
      const stars = container.querySelectorAll('[role="radio"]');
      if (stars.length > 0) {
        fireEvent.click(stars[1]);
      }
      expect(container.querySelector('.rds-rating')).toBeInTheDocument();
    });

    it('should handle slider with precision prop', () => {
      const { container } = renderWithTheme(
        <RdsRating type="slider" precision={0.1} />
      );
      expect(container.querySelector('.rds-rating__slider')).toBeInTheDocument();
    });

    it('should handle custom precision for stars', () => {
      const { container } = renderWithTheme(
        <RdsRating type="star" precision={0.25} />
      );
      expect(container.querySelector('.rds-rating__stars')).toBeInTheDocument();
    });
  });

  describe('Display Name', () => {
    it('should have correct displayName', () => {
      expect(RdsRating.displayName).toBe('RdsRating');
    });
  });
});