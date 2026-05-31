import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import RdsSkeleton from './rds-skeleton';
import { axe } from 'jest-axe';

// Mock the SCSS file
jest.mock('./rds-skeleton.scss');

// Helper function to render with theme
const renderWithTheme = (component: React.ReactElement) => {
  const theme = createTheme();
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('RdsSkeleton', () => {
  describe('Basic Rendering', () => {
    it('should render skeleton component', () => {
      const { container } = renderWithTheme(
        <RdsSkeleton data-testid="skeleton" />
      );
      expect(container.querySelector('.rds-skeleton')).toBeInTheDocument();
    });

    it('should render without errors with default props', () => {
      expect(() => {
        renderWithTheme(
          <RdsSkeleton />
        );
      }).not.toThrow();
    });

    it('should have MuiSkeleton class', () => {
      const { container } = renderWithTheme(
        <RdsSkeleton data-testid="skeleton" />
      );
      const skeleton = container.querySelector('.rds-skeleton');
      expect(skeleton).toBeInTheDocument();
      expect(skeleton).toHaveClass('MuiSkeleton-root');
    });

    it('should accept custom className', () => {
      const { container } = renderWithTheme(
        <RdsSkeleton className="custom-skeleton" />
      );
      expect(container.querySelector('.custom-skeleton')).toBeInTheDocument();
      expect(container.querySelector('.rds-skeleton')).toBeInTheDocument();
    });

    it('should have both rds-skeleton and variant classes', () => {
      const { container } = renderWithTheme(
        <RdsSkeleton shape="rectangular" />
      );
      const skeleton = container.querySelector('.rds-skeleton');
      expect(skeleton).toHaveClass('rds-skeleton--rectangular');
    });
  });

  describe('Shape Variants', () => {
    it('should render text shape by default', () => {
      const { container } = renderWithTheme(
        <RdsSkeleton />
      );
      expect(container.querySelector('.rds-skeleton--text')).toBeInTheDocument();
    });

    it('should render text shape variant', () => {
      const { container } = renderWithTheme(
        <RdsSkeleton shape="text" />
      );
      expect(container.querySelector('.rds-skeleton--text')).toBeInTheDocument();
    });

    it('should render rectangular shape variant', () => {
      const { container } = renderWithTheme(
        <RdsSkeleton shape="rectangular" />
      );
      expect(container.querySelector('.rds-skeleton--rectangular')).toBeInTheDocument();
    });

    it('should render rounded shape variant', () => {
      const { container } = renderWithTheme(
        <RdsSkeleton shape="rounded" />
      );
      expect(container.querySelector('.rds-skeleton--rounded')).toBeInTheDocument();
    });

    it('should render circular shape variant', () => {
      const { container } = renderWithTheme(
        <RdsSkeleton shape="circular" />
      );
      expect(container.querySelector('.rds-skeleton--circular')).toBeInTheDocument();
    });

    it('should update shape class when shape prop changes', () => {
      const { container, rerender } = renderWithTheme(
        <RdsSkeleton shape="text" />
      );
      expect(container.querySelector('.rds-skeleton--text')).toBeInTheDocument();

      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsSkeleton shape="rectangular" />
        </ThemeProvider>
      );
      expect(container.querySelector('.rds-skeleton--rectangular')).toBeInTheDocument();
    });
  });

  describe('Animation', () => {
    it('should have pulse animation by default', () => {
      const { container } = renderWithTheme(
        <RdsSkeleton data-testid="skeleton" />
      );
      const skeleton = container.querySelector('.rds-skeleton');
      expect(skeleton).toHaveClass('MuiSkeleton-pulse');
    });

    it('should have pulse animation when animated=true', () => {
      const { container } = renderWithTheme(
        <RdsSkeleton animated={true} data-testid="skeleton" />
      );
      const skeleton = container.querySelector('.rds-skeleton');
      expect(skeleton).toHaveClass('MuiSkeleton-pulse');
    });

    it('should have no animation when animated=false', () => {
      const { container } = renderWithTheme(
        <RdsSkeleton animated={false} data-testid="skeleton" />
      );
      const skeleton = container.querySelector('.rds-skeleton');
      expect(skeleton).not.toHaveClass('MuiSkeleton-pulse');
      expect(skeleton).not.toHaveClass('MuiSkeleton-wave');
    });

    it('should use animation prop when provided', () => {
      const { container } = renderWithTheme(
        <RdsSkeleton animation="wave" data-testid="skeleton" />
      );
      const skeleton = container.querySelector('.rds-skeleton');
      expect(skeleton).toHaveClass('MuiSkeleton-wave');
    });

    it('should use wave animation when animation="wave"', () => {
      const { container } = renderWithTheme(
        <RdsSkeleton animation="wave" />
      );
      const skeleton = container.querySelector('.rds-skeleton');
      expect(skeleton).toHaveClass('MuiSkeleton-wave');
    });

    it('should have no animation when animation=false', () => {
      const { container } = renderWithTheme(
        <RdsSkeleton animation={false} data-testid="skeleton" />
      );
      const skeleton = container.querySelector('.rds-skeleton');
      expect(skeleton).not.toHaveClass('MuiSkeleton-pulse');
      expect(skeleton).not.toHaveClass('MuiSkeleton-wave');
    });

    it('should prefer animation prop over animated prop', () => {
      const { container } = renderWithTheme(
        <RdsSkeleton animated={true} animation="wave" data-testid="skeleton" />
      );
      const skeleton = container.querySelector('.rds-skeleton');
      expect(skeleton).toHaveClass('MuiSkeleton-wave');
      expect(skeleton).not.toHaveClass('MuiSkeleton-pulse');
    });
  });

  describe('Multiple Frames', () => {
    it('should render single frame by default', () => {
      const { container } = renderWithTheme(
        <RdsSkeleton />
      );
      const skeletons = container.querySelectorAll('.rds-skeleton');
      expect(skeletons.length).toBe(1);
    });

    it('should render frames=1', () => {
      const { container } = renderWithTheme(
        <RdsSkeleton frames={1} />
      );
      const skeletons = container.querySelectorAll('.rds-skeleton');
      expect(skeletons.length).toBe(1);
    });

    it('should render multiple frames when frames > 1', () => {
      const { container } = renderWithTheme(
        <RdsSkeleton frames={3} />
      );
      const skeletons = container.querySelectorAll('.MuiSkeleton-root');
      expect(skeletons.length).toBe(3);
    });

    it('should render 5 frames when frames=5', () => {
      const { container } = renderWithTheme(
        <RdsSkeleton frames={5} />
      );
      const skeletons = container.querySelectorAll('.MuiSkeleton-root');
      expect(skeletons.length).toBe(5);
    });

    it('should wrap multiple frames in Box container', () => {
      const { container } = renderWithTheme(
        <RdsSkeleton frames={3} />
      );
      const boxContainer = container.querySelector('.rds-skeleton');
      expect(boxContainer).toHaveStyle('display: flex');
    });

    it('should use column direction for text shape with multiple frames', () => {
      const { container } = renderWithTheme(
        <RdsSkeleton frames={3} shape="text" />
      );
      const boxContainer = container.querySelector('.rds-skeleton');
      expect(boxContainer).toHaveStyle('flex-direction: column');
    });

    it('should use row direction for non-text shape with multiple frames', () => {
      const { container } = renderWithTheme(
        <RdsSkeleton frames={3} shape="rectangular" />
      );
      const boxContainer = container.querySelector('.rds-skeleton');
      expect(boxContainer).toHaveStyle('flex-direction: row');
    });

    it('should have gap between frames', () => {
      const { container } = renderWithTheme(
        <RdsSkeleton frames={3} />
      );
      const boxContainer = container.querySelector('.rds-skeleton');
      expect(boxContainer).toHaveStyle('gap: 12px');
    });

    it('should set flex-start alignment for text frames', () => {
      const { container } = renderWithTheme(
        <RdsSkeleton frames={3} shape="text" />
      );
      const boxContainer = container.querySelector('.rds-skeleton');
      expect(boxContainer).toHaveStyle('align-items: flex-start');
    });

    it('should set center alignment for non-text frames', () => {
      const { container } = renderWithTheme(
        <RdsSkeleton frames={3} shape="rectangular" />
      );
      const boxContainer = container.querySelector('.rds-skeleton');
      expect(boxContainer).toHaveStyle('align-items: center');
    });

    it('should pass props to each frame', () => {
      const { container } = renderWithTheme(
        <RdsSkeleton frames={2} shape="circular" />
      );
      const skeletons = container.querySelectorAll('.rds-skeleton--circular');
      // Count only the MuiSkeleton-root elements, not the parent
      const muiSkeletons = Array.from(skeletons).filter(el => el.classList.contains('MuiSkeleton-root'));
      expect(muiSkeletons.length).toBe(2);
    });

    it('should render each frame with unique key', () => {
      const { container } = renderWithTheme(
        <RdsSkeleton frames={3} data-testid="multi-skeleton" />
      );
      const skeletons = container.querySelectorAll('.MuiSkeleton-root');
      expect(skeletons.length).toBe(3);
      // Verify each skeleton is a separate element
      skeletons.forEach(skeleton => {
        expect(skeleton).toBeInTheDocument();
      });
    });
  });

  describe('Dimensions', () => {
    it('should accept height prop', () => {
      const { container } = renderWithTheme(
        <RdsSkeleton height={100} />
      );
      const skeleton = container.querySelector('.rds-skeleton');
      expect(skeleton).toHaveStyle('height: 100px');
    });

    it('should accept height as string', () => {
      const { container } = renderWithTheme(
        <RdsSkeleton height="100px" />
      );
      const skeleton = container.querySelector('.rds-skeleton');
      expect(skeleton).toHaveStyle('height: 100px');
    });

    it('should accept width prop', () => {
      const { container } = renderWithTheme(
        <RdsSkeleton width={200} />
      );
      const skeleton = container.querySelector('.rds-skeleton');
      expect(skeleton).toHaveStyle('width: 200px');
    });

    it('should accept width as string', () => {
      const { container } = renderWithTheme(
        <RdsSkeleton width="200px" />
      );
      const skeleton = container.querySelector('.rds-skeleton');
      expect(skeleton).toHaveStyle('width: 200px');
    });

    it('should accept both height and width', () => {
      const { container } = renderWithTheme(
        <RdsSkeleton height={50} width={200} />
      );
      const skeleton = container.querySelector('.rds-skeleton');
      expect(skeleton).toHaveStyle('height: 50px');
      expect(skeleton).toHaveStyle('width: 200px');
    });

    it('should apply height to all frames', () => {
      const { container } = renderWithTheme(
        <RdsSkeleton frames={3} height={60} />
      );
      const skeletons = container.querySelectorAll('.rds-skeleton:not(.rds-skeleton)');
      // The parent has the class, individual skeletons should have the height
      const individualSkeletons = Array.from(container.querySelectorAll('.MuiSkeleton-root'));
      individualSkeletons.forEach(skeleton => {
        expect(skeleton).toHaveStyle('height: 60px');
      });
    });

    it('should apply width to multiple frames', () => {
      const { container } = renderWithTheme(
        <RdsSkeleton frames={2} width={150} />
      );
      const individualSkeletons = Array.from(container.querySelectorAll('.MuiSkeleton-root'));
      individualSkeletons.forEach(skeleton => {
        expect(skeleton).toHaveStyle('width: 150px');
      });
    });
  });

  describe('Custom Styling', () => {
    it('should accept sx prop', () => {
      const { container } = renderWithTheme(
        <RdsSkeleton sx={{ backgroundColor: 'red' }} data-testid="skeleton" />
      );
      const skeleton = container.querySelector('.rds-skeleton');
      expect(skeleton).toHaveStyle('background-color: red');
    });

    it('should merge sx prop with default styles', () => {
      const { container } = renderWithTheme(
        <RdsSkeleton height={100} sx={{ backgroundColor: 'blue' }} data-testid="skeleton" />
      );
      const skeleton = container.querySelector('.rds-skeleton');
      expect(skeleton).toHaveStyle('height: 100px');
      expect(skeleton).toHaveStyle('background-color: blue');
    });

    it('should apply sx to multiple frames', () => {
      const { container } = renderWithTheme(
        <RdsSkeleton frames={2} sx={{ opacity: 0.5 }} />
      );
      const individualSkeletons = Array.from(container.querySelectorAll('.MuiSkeleton-root'));
      individualSkeletons.forEach(skeleton => {
        expect(skeleton).toHaveStyle('opacity: 0.5');
      });
    });

    it('should accept custom className and maintain BEM structure', () => {
      const { container } = renderWithTheme(
        <RdsSkeleton className="my-custom-class" />
      );
      expect(container.querySelector('.rds-skeleton')).toBeInTheDocument();
      expect(container.querySelector('.my-custom-class')).toBeInTheDocument();
    });

    it('should combine custom className with shape variant', () => {
      const { container } = renderWithTheme(
        <RdsSkeleton shape="circular" className="avatar-skeleton" />
      );
      const skeleton = container.querySelector('.rds-skeleton');
      expect(skeleton).toHaveClass('rds-skeleton--circular');
      expect(skeleton).toHaveClass('avatar-skeleton');
    });
  });

  describe('Props Propagation', () => {
    it('should pass through MUI Skeleton props', () => {
      const { container } = renderWithTheme(
        <RdsSkeleton variant="text" data-testid="skeleton" />
      );
      const skeleton = container.querySelector('.rds-skeleton');
      expect(skeleton).toBeInTheDocument();
    });

    it('should pass aria attributes', () => {
      const { container } = renderWithTheme(
        <RdsSkeleton aria-label="Loading content" data-testid="skeleton" />
      );
      const skeleton = container.querySelector('[aria-label="Loading content"]');
      expect(skeleton).toBeInTheDocument();
    });

    it('should pass data attributes', () => {
      const { container } = renderWithTheme(
        <RdsSkeleton data-testid="custom-skeleton" data-custom="value" />
      );
      const skeleton = screen.getByTestId('custom-skeleton');
      expect(skeleton).toHaveAttribute('data-custom', 'value');
    });

    it('should handle data-testid on multiple frames', () => {
      renderWithTheme(
        <RdsSkeleton frames={2} data-testid="frame-skeleton" />
      );
      const skeletons = screen.getAllByTestId('frame-skeleton');
      expect(skeletons.length).toBe(2);
    });
  });

  describe('Integration Tests', () => {
    it('should render complete profile skeleton', () => {
      const { container } = renderWithTheme(
        <div>
          <RdsSkeleton shape="circular" height={100} width={100} />
          <RdsSkeleton frames={3} height={20} />
        </div>
      );
      const circular = container.querySelector('.rds-skeleton--circular');
      const textFrames = container.querySelectorAll('.rds-skeleton');
      
      expect(circular).toBeInTheDocument();
      expect(textFrames.length).toBeGreaterThan(1);
    });

    it('should render content skeleton with mixed shapes', () => {
      const { container } = renderWithTheme(
        <div>
          <RdsSkeleton shape="rectangular" width="100%" height={200} />
          <RdsSkeleton frames={2} height={15} />
        </div>
      );
      expect(container.querySelector('.rds-skeleton--rectangular')).toBeInTheDocument();
      const textSkeletons = Array.from(container.querySelectorAll('.rds-skeleton')).filter(
        el => el.textContent === '' || el.className.includes('--text')
      );
      expect(textSkeletons.length).toBeGreaterThan(0);
    });

    it('should render list skeleton pattern', () => {
      const { container } = renderWithTheme(
        <div>
          {[1, 2, 3].map(i => (
            <RdsSkeleton key={i} frames={2} height={15} />
          ))}
        </div>
      );
      const allSkeletons = container.querySelectorAll('.rds-skeleton');
      // 3 parents + 6 individual skeletons = 9 total
      expect(allSkeletons.length).toBe(9);
    });

    it('should combine animation and multiple frames', () => {
      const { container } = renderWithTheme(
        <RdsSkeleton frames={3} animation="wave" />
      );
      const skeletons = container.querySelectorAll('.MuiSkeleton-wave');
      expect(skeletons.length).toBe(3);
    });

    it('should render with all props at once', () => {
      const { container } = renderWithTheme(
        <RdsSkeleton
          frames={2}
          shape="rectangular"
          animation="pulse"
          height={80}
          width={100}
          className="custom-loader"
          sx={{ backgroundColor: '#f0f0f0' }}
          data-testid="full-skeleton"
        />
      );
      const skeletons = screen.getAllByTestId('full-skeleton');
      expect(skeletons.length).toBe(2);
      expect(skeletons[0]).toHaveClass('rds-skeleton--rectangular');
      expect(skeletons[0]).toHaveClass('custom-loader');
      expect(skeletons[0]).toHaveStyle('background-color: rgb(240, 240, 240)');
    });
  });

  describe('Display Name', () => {
    it('should have correct display name', () => {
      expect(RdsSkeleton.displayName).toBe('RdsSkeleton');
    });
  });

  describe('Edge Cases', () => {
    it('should handle frames=0', () => {
      const { container } = renderWithTheme(
        <RdsSkeleton frames={0} />
      );
      // When frames is 0, should still render something singular
      const skeletons = container.querySelectorAll('.rds-skeleton');
      expect(skeletons.length).toBeGreaterThan(0);
    });

    it('should handle very large number of frames', () => {
      const { container } = renderWithTheme(
        <RdsSkeleton frames={100} />
      );
      const skeletons = container.querySelectorAll('.MuiSkeleton-root');
      expect(skeletons.length).toBe(100);
    });

    it('should render with empty className', () => {
      const { container } = renderWithTheme(
        <RdsSkeleton className="" />
      );
      expect(container.querySelector('.rds-skeleton')).toBeInTheDocument();
    });

    it('should handle responsive height strings', () => {
      const { container } = renderWithTheme(
        <RdsSkeleton height="100%" />
      );
      const skeleton = container.querySelector('.rds-skeleton');
      expect(skeleton).toHaveStyle('height: 100%');
    });

    it('should handle responsive width strings', () => {
      const { container } = renderWithTheme(
        <RdsSkeleton width="100%" />
      );
      const skeleton = container.querySelector('.rds-skeleton');
      expect(skeleton).toHaveStyle('width: 100%');
    });

    it('should render without animation when animation is explicitly false', () => {
      const { container } = renderWithTheme(
        <RdsSkeleton animation={false} />
      );
      const skeleton = container.querySelector('.rds-skeleton');
      expect(skeleton).not.toHaveClass('MuiSkeleton-pulse');
      expect(skeleton).not.toHaveClass('MuiSkeleton-wave');
    });
  });

  describe('Accessibility', () => {
    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsSkeleton />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
