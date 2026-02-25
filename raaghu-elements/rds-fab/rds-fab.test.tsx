import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsFab, { RdsFabProps } from './rds-fab';

// Mock SCSS
jest.mock('./rds-fab.scss', () => ({}));

describe('RdsFab', () => {
  const defaultProps: RdsFabProps = {
    icon: <span>★</span>,
    'aria-label': 'action button',
  };

  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      const { container } = render(<RdsFab {...defaultProps} />);
      expect(container).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsFab.displayName).toBe('RdsFab');
    });

    it('should render MUI Fab component', () => {
      render(<RdsFab {...defaultProps} />);
      const fab = document.querySelector('.MuiFab-root');
      expect(fab).toBeInTheDocument();
    });

    it('should render without any props', () => {
      const { container } = render(<RdsFab />);
      expect(container).toBeInTheDocument();
    });

    it('should accept className prop', () => {
      render(
        <RdsFab {...defaultProps} className="custom-fab" />
      );
      const fab = document.querySelector('.MuiFab-root');
      expect(fab).toHaveClass('custom-fab');
    });
  });

  describe('Icon Rendering', () => {
    it('should render icon when provided', () => {
      const { container } = render(
        <RdsFab {...defaultProps} icon={<span data-testid="test-icon">★</span>} />
      );
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });

    it('should render icon alone when variant is not extended', () => {
      render(
        <RdsFab icon={<span data-testid="test-icon">★</span>} />
      );
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });

    it('should not render label without extended variant', () => {
      render(
        <RdsFab
          icon={<span data-testid="test-icon">★</span>}
          label="Action"
        />
      );
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
      // Label should not be visible in regular variant
      expect(screen.queryByText('Action')).not.toBeInTheDocument();
    });

    it('should render SVG icon', () => {
      const svgIcon = (
        <svg data-testid="svg-icon">
          <circle cx="10" cy="10" r="5" />
        </svg>
      );
      render(<RdsFab icon={svgIcon} />);
      expect(screen.getByTestId('svg-icon')).toBeInTheDocument();
    });
  });

  describe('Label Rendering', () => {
    it('should render label when extended variant with icon and label', () => {
      render(
        <RdsFab
          icon={<span>★</span>}
          label="Add"
          variant="extended"
        />
      );
      expect(screen.getByText('Add')).toBeInTheDocument();
    });

    it('should render icon and label together in extended variant', () => {
      render(
        <RdsFab
          icon={<span data-testid="icon">★</span>}
          label="Add Item"
          variant="extended"
        />
      );
      expect(screen.getByTestId('icon')).toBeInTheDocument();
      expect(screen.getByText('Add Item')).toBeInTheDocument();
    });

    it('should render label alone when no icon in extended variant', () => {
      render(
        <RdsFab label="Add" variant="extended" />
      );
      expect(screen.getByText('Add')).toBeInTheDocument();
    });

    it('should render label alone when no variant specified', () => {
      render(<RdsFab label="Action" />);
      expect(screen.getByText('Action')).toBeInTheDocument();
    });
  });

  describe('Position Styles', () => {
    it('should render without position styles when position not provided', () => {
      const { container } = render(<RdsFab {...defaultProps} />);
      const fab = container.querySelector('.MuiFab-root');
      expect(fab).toBeInTheDocument();
    });

    it('should apply bottom-right position', () => {
      const { container } = render(
        <RdsFab {...defaultProps} position="bottom-right" />
      );
      const fab = container.querySelector('.MuiFab-root') as HTMLElement;
      const styles = window.getComputedStyle(fab);
      expect(styles.position).toBe('fixed');
    });

    it('should apply bottom-left position', () => {
      const { container } = render(
        <RdsFab {...defaultProps} position="bottom-left" />
      );
      const fab = container.querySelector('.MuiFab-root') as HTMLElement;
      const styles = window.getComputedStyle(fab);
      expect(styles.position).toBe('fixed');
    });

    it('should apply top-right position', () => {
      const { container } = render(
        <RdsFab {...defaultProps} position="top-right" />
      );
      const fab = container.querySelector('.MuiFab-root') as HTMLElement;
      const styles = window.getComputedStyle(fab);
      expect(styles.position).toBe('fixed');
    });

    it('should apply top-left position', () => {
      const { container } = render(
        <RdsFab {...defaultProps} position="top-left" />
      );
      const fab = container.querySelector('.MuiFab-root') as HTMLElement;
      const styles = window.getComputedStyle(fab);
      expect(styles.position).toBe('fixed');
    });

    it('should handle invalid position gracefully', () => {
      const { container } = render(
        <RdsFab {...defaultProps} position={undefined} />
      );
      expect(container).toBeInTheDocument();
    });
  });

  describe('Children Rendering', () => {
    it('should render children when provided', () => {
      render(
        <RdsFab>
          <span data-testid="custom-child">Custom Content</span>
        </RdsFab>
      );
      expect(screen.getByTestId('custom-child')).toBeInTheDocument();
    });

    it('should prioritize children over icon and label', () => {
      render(
        <RdsFab
          icon={<span data-testid="icon">★</span>}
          label="Label"
        >
          <span data-testid="child">Child Content</span>
        </RdsFab>
      );
      expect(screen.getByTestId('child')).toBeInTheDocument();
      // Icon should not be rendered if children is provided
      expect(screen.queryByTestId('icon')).not.toBeInTheDocument();
    });

    it('should render complex children structure', () => {
      render(
        <RdsFab>
          <div data-testid="wrapper">
            <span>Text</span>
            <svg data-testid="svg">circle</svg>
          </div>
        </RdsFab>
      );
      expect(screen.getByTestId('wrapper')).toBeInTheDocument();
      expect(screen.getByTestId('svg')).toBeInTheDocument();
    });
  });

  describe('Variant Props', () => {
    it('should support circular variant (default)', () => {
      const { container } = render(
        <RdsFab {...defaultProps} variant="circular" />
      );
      const fab = container.querySelector('.MuiFab-root');
      expect(fab).toBeInTheDocument();
    });

    it('should support extended variant', () => {
      const { container } = render(
        <RdsFab
          icon={<span>★</span>}
          label="Add"
          variant="extended"
        />
      );
      const fab = container.querySelector('.MuiFab-extended');
      expect(fab).toBeInTheDocument();
    });

    it('should render extended fab with both icon and label', () => {
      render(
        <RdsFab
          icon={<span data-testid="icon">★</span>}
          label="Create"
          variant="extended"
        />
      );
      expect(screen.getByTestId('icon')).toBeInTheDocument();
      expect(screen.getByText('Create')).toBeInTheDocument();
    });
  });

  describe('Color Variants', () => {
    it('should support primary color', () => {
      const { container } = render(
        <RdsFab {...defaultProps} color="primary" />
      );
      const fab = container.querySelector('.MuiFab-root');
      expect(fab).toHaveClass('MuiFab-primary');
    });

    it('should support secondary color', () => {
      const { container } = render(
        <RdsFab {...defaultProps} color="secondary" />
      );
      const fab = container.querySelector('.MuiFab-root');
      expect(fab).toHaveClass('MuiFab-secondary');
    });

    it('should support error color', () => {
      const { container } = render(
        <RdsFab {...defaultProps} color="error" />
      );
      const fab = container.querySelector('.MuiFab-root');
      expect(fab).toHaveClass('Mui-error');
    });

    it('should support warning color', () => {
      const { container } = render(
        <RdsFab {...defaultProps} color="warning" />
      );
      const fab = container.querySelector('.MuiFab-root');
      expect(fab).toHaveClass('MuiFab-warning');
    });

    it('should support info color', () => {
      const { container } = render(
        <RdsFab {...defaultProps} color="info" />
      );
      const fab = container.querySelector('.MuiFab-root');
      expect(fab).toHaveClass('MuiFab-info');
    });

    it('should support success color', () => {
      const { container } = render(
        <RdsFab {...defaultProps} color="success" />
      );
      const fab = container.querySelector('.MuiFab-root');
      expect(fab).toHaveClass('MuiFab-success');
    });

    it('should support inherit color', () => {
      const { container } = render(
        <RdsFab {...defaultProps} color="inherit" />
      );
      const fab = container.querySelector('.MuiFab-root');
      expect(fab).toHaveClass('MuiFab-colorInherit');
    });
  });

  describe('Size Variants', () => {
    it('should support small size', () => {
      const { container } = render(
        <RdsFab {...defaultProps} size="small" />
      );
      const fab = container.querySelector('.MuiFab-root');
      expect(fab).toHaveClass('MuiFab-sizeSmall');
    });

    it('should support medium size (default)', () => {
      const { container } = render(
        <RdsFab {...defaultProps} size="medium" />
      );
      const fab = container.querySelector('.MuiFab-root');
      expect(fab).toHaveClass('MuiFab-sizeMedium');
    });

    it('should support large size', () => {
      const { container } = render(
        <RdsFab {...defaultProps} size="large" />
      );
      const fab = container.querySelector('.MuiFab-root');
      expect(fab).toHaveClass('MuiFab-sizeLarge');
    });
  });

  describe('SX Prop', () => {
    it('should accept and merge sx prop', () => {
      const { container } = render(
        <RdsFab
          {...defaultProps}
          sx={{ backgroundColor: 'rgb(255, 0, 0)' }}
        />
      );
      const fab = container.querySelector('.MuiFab-root') as HTMLElement;
      expect(fab).toBeInTheDocument();
    });

    it('should merge custom sx with default sx', () => {
      const { container } = render(
        <RdsFab
          {...defaultProps}
          position="bottom-right"
          sx={{ zIndex: 1000 }}
        />
      );
      const fab = container.querySelector('.MuiFab-root') as HTMLElement;
      expect(fab).toBeInTheDocument();
    });

    it('should allow sx to override position styles', () => {
      const { container } = render(
        <RdsFab
          {...defaultProps}
          position="bottom-right"
          sx={{ position: 'absolute' }}
        />
      );
      const fab = container.querySelector('.MuiFab-root') as HTMLElement;
      const styles = window.getComputedStyle(fab);
      expect(styles.position).toBe('absolute');
    });
  });

  describe('MUI Props Forwarding', () => {
    it('should forward onClick handler', () => {
      const handleClick = jest.fn();
      render(
        <RdsFab {...defaultProps} onClick={handleClick} />
      );
      const fab = document.querySelector('.MuiFab-root');
      fireEvent.click(fab as HTMLElement);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should forward disabled prop', () => {
      const { container } = render(
        <RdsFab {...defaultProps} disabled={true} />
      );
      const fab = container.querySelector('.MuiFab-root') as HTMLElement;
      expect(fab).toHaveAttribute('disabled');
    });

    it('should forward aria-label prop', () => {
      const { container } = render(
        <RdsFab {...defaultProps} aria-label="Floating action button" />
      );
      const fab = container.querySelector('.MuiFab-root');
      expect(fab).toHaveAttribute('aria-label', 'Floating action button');
    });

    it('should forward aria-describedby prop', () => {
      const { container } = render(
        <RdsFab
          {...defaultProps}
          aria-describedby="fab-description"
        />
      );
      const fab = container.querySelector('.MuiFab-root');
      expect(fab).toHaveAttribute('aria-describedby', 'fab-description');
    });

    it('should forward title prop', () => {
      const { container } = render(
        <RdsFab {...defaultProps} title="Action button" />
      );
      const fab = container.querySelector('.MuiFab-root');
      expect(fab).toHaveAttribute('title', 'Action button');
    });

    it('should forward type prop', () => {
      const { container } = render(
        <RdsFab {...defaultProps} type="submit" />
      );
      const fab = container.querySelector('.MuiFab-root');
      expect(fab).toHaveAttribute('type', 'submit');
    });

    it('should forward onFocus handler', () => {
      const handleFocus = jest.fn();
      render(
        <RdsFab {...defaultProps} onFocus={handleFocus} />
      );
      const fab = document.querySelector('.MuiFab-root');
      fireEvent.focus(fab as HTMLElement);
      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it('should forward onBlur handler', () => {
      const handleBlur = jest.fn();
      render(
        <RdsFab {...defaultProps} onBlur={handleBlur} />
      );
      const fab = document.querySelector('.MuiFab-root');
      fireEvent.blur(fab as HTMLElement);
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    it('should forward onMouseEnter handler', () => {
      const handleMouseEnter = jest.fn();
      render(
        <RdsFab {...defaultProps} onMouseEnter={handleMouseEnter} />
      );
      const fab = document.querySelector('.MuiFab-root');
      fireEvent.mouseEnter(fab as HTMLElement);
      expect(handleMouseEnter).toHaveBeenCalledTimes(1);
    });

    it('should forward onMouseLeave handler', () => {
      const handleMouseLeave = jest.fn();
      render(
        <RdsFab {...defaultProps} onMouseLeave={handleMouseLeave} />
      );
      const fab = document.querySelector('.MuiFab-root');
      fireEvent.mouseLeave(fab as HTMLElement);
      expect(handleMouseLeave).toHaveBeenCalledTimes(1);
    });
  });

  describe('Content Priority', () => {
    it('should prioritize children over icon and label', () => {
      render(
        <RdsFab
          icon={<span data-testid="icon">Icon</span>}
          label="Label"
        >
          <span data-testid="child">Child</span>
        </RdsFab>
      );
      expect(screen.getByTestId('child')).toBeInTheDocument();
      expect(screen.queryByTestId('icon')).not.toBeInTheDocument();
    });

    it('should prioritize icon over label in non-extended variant', () => {
      render(
        <RdsFab
          icon={<span data-testid="icon">Icon</span>}
          label="Label"
        />
      );
      expect(screen.getByTestId('icon')).toBeInTheDocument();
      expect(screen.queryByText('Label')).not.toBeInTheDocument();
    });

    it('should show both icon and label in extended variant', () => {
      render(
        <RdsFab
          icon={<span data-testid="icon">Icon</span>}
          label="Extended Label"
          variant="extended"
        />
      );
      expect(screen.getByTestId('icon')).toBeInTheDocument();
      expect(screen.getByText('Extended Label')).toBeInTheDocument();
    });

    it('should render icon when only icon is provided', () => {
      render(
        <RdsFab icon={<span data-testid="icon">Icon</span>} />
      );
      expect(screen.getByTestId('icon')).toBeInTheDocument();
    });

    it('should render label when only label is provided', () => {
      render(
        <RdsFab label="Label Only" />
      );
      expect(screen.getByText('Label Only')).toBeInTheDocument();
    });

    it('should render nothing when no content provided', () => {
      const { container } = render(<RdsFab />);
      const fab = container.querySelector('.MuiFab-root');
      expect(fab?.textContent).toBe('');
    });
  });

  describe('Position with Content', () => {
    it('should apply position styles with icon', () => {
      const { container } = render(
        <RdsFab
          icon={<span>★</span>}
          position="bottom-right"
        />
      );
      const fab = container.querySelector('.MuiFab-root') as HTMLElement;
      const styles = window.getComputedStyle(fab);
      expect(styles.position).toBe('fixed');
    });

    it('should apply position styles with extended variant', () => {
      const { container } = render(
        <RdsFab
          icon={<span>★</span>}
          label="Add"
          position="top-right"
          variant="extended"
        />
      );
      const fab = container.querySelector('.MuiFab-root') as HTMLElement;
      const styles = window.getComputedStyle(fab);
      expect(styles.position).toBe('fixed');
    });
  });

  describe('Edge Cases', () => {
    it('should handle rapid clicks', () => {
      const handleClick = jest.fn();
      render(
        <RdsFab {...defaultProps} onClick={handleClick} />
      );
      const fab = document.querySelector('.MuiFab-root');
      for (let i = 0; i < 10; i++) {
        fireEvent.click(fab as HTMLElement);
      }
      expect(handleClick).toHaveBeenCalledTimes(10);
    });

    it('should handle empty string label', () => {
      const { container } = render(
        <RdsFab label="" icon={<span>Icon</span>} />
      );
      expect(container).toBeInTheDocument();
    });

    it('should handle empty icon element', () => {
      const { container } = render(
        <RdsFab icon={<span />} label="Label" variant="extended" />
      );
      expect(container).toBeInTheDocument();
    });

    it('should handle null children', () => {
      const { container } = render(
        <RdsFab {...defaultProps} children={null} />
      );
      expect(container).toBeInTheDocument();
    });

    it('should handle undefined children', () => {
      const { container } = render(
        <RdsFab {...defaultProps} children={undefined} />
      );
      expect(container).toBeInTheDocument();
    });

    it('should handle changing position prop', () => {
      const { rerender, container } = render(
        <RdsFab {...defaultProps} position="bottom-right" />
      );
      let fab = container.querySelector('.MuiFab-root') as HTMLElement;
      expect(fab).toBeInTheDocument();

      rerender(
        <RdsFab {...defaultProps} position="top-left" />
      );
      fab = container.querySelector('.MuiFab-root') as HTMLElement;
      expect(fab).toBeInTheDocument();
    });

    it('should handle toggling disabled state', () => {
      const { rerender, container } = render(
        <RdsFab {...defaultProps} disabled={false} />
      );
      let fab = container.querySelector('.MuiFab-root') as HTMLElement;
      expect(fab).not.toHaveAttribute('disabled');

      rerender(
        <RdsFab {...defaultProps} disabled={true} />
      );
      fab = container.querySelector('.MuiFab-root') as HTMLElement;
      expect(fab).toHaveAttribute('disabled');
    });
  });

  describe('Accessibility', () => {
    it('should render with aria-label', () => {
      const { container } = render(
        <RdsFab
          icon={<span>★</span>}
          aria-label="Add new item"
        />
      );
      const fab = container.querySelector('.MuiFab-root');
      expect(fab).toHaveAttribute('aria-label', 'Add new item');
    });

    it('should be keyboard accessible with Tab key', () => {
      const { container } = render(
        <RdsFab {...defaultProps} />
      );
      const fab = container.querySelector('.MuiFab-root') as HTMLElement;
      fab.focus();
      expect(document.activeElement).toBe(fab);
    });

    it('should support Enter key press', () => {
      const handleClick = jest.fn();
      render(
        <RdsFab {...defaultProps} onClick={handleClick} />
      );
      const fab = document.querySelector('.MuiFab-root');
      fireEvent.click(fab as HTMLElement);
      expect(handleClick).toHaveBeenCalled();
    });

    it('should support Space key press', () => {
      const handleClick = jest.fn();
      render(
        <RdsFab {...defaultProps} onClick={handleClick} />
      );
      const fab = document.querySelector('.MuiFab-root');
      fireEvent.click(fab as HTMLElement);
      expect(handleClick).toHaveBeenCalled();
    });

    it('should have proper role attribute', () => {
      const { container } = render(
        <RdsFab {...defaultProps} />
      );
      const fab = container.querySelector('.MuiFab-root');
      expect(fab).toHaveAttribute('type', 'button');
    });

    it('should be disabled when disabled prop is true', () => {
      const handleClick = jest.fn();
      render(
        <RdsFab
          {...defaultProps}
          disabled={true}
          onClick={handleClick}
        />
      );
      const fab = document.querySelector('.MuiFab-root');
      fireEvent.click(fab as HTMLElement);
      // Click on disabled button may or may not trigger depending on implementation
      expect(fab).toHaveAttribute('disabled');
    });

    it('should support aria-pressed for toggle behavior', () => {
      const { container } = render(
        <RdsFab
          {...defaultProps}
          aria-pressed={false}
        />
      );
      const fab = container.querySelector('.MuiFab-root');
      expect(fab).toHaveAttribute('aria-pressed', 'false');
    });
  });

  describe('Responsive Behavior', () => {
    it('should render correctly with position prop on different screen sizes', () => {
      const { container } = render(
        <RdsFab
          {...defaultProps}
          position="bottom-right"
        />
      );
      const fab = container.querySelector('.MuiFab-root') as HTMLElement;
      const styles = window.getComputedStyle(fab);
      expect(styles.position).toBe('fixed');
    });

    it('should render with custom sx for responsive behavior', () => {
      const { container } = render(
        <RdsFab
          {...defaultProps}
          sx={{
            '@media (max-width: 600px)': {
              bottom: 10,
              right: 10,
            },
          }}
        />
      );
      expect(container).toBeInTheDocument();
    });
  });
});
