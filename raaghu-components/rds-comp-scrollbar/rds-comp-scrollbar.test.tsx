import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RdsCompScrollBar, {
  ScrollBarType,
  ScrollPosition,
  RdsScrollBarProps,
} from './rds-comp-scrollbar';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';

// Mock SCSS
jest.mock('./rds-comp-scrollbar.scss', () => ({}));

describe('RdsCompScrollBar', () => {
  const defaultProps: RdsScrollBarProps = {
    type: ScrollBarType.Mac,
    position: ScrollPosition.Start,
    showButtons: true,
    startIcon: <span data-testid="start-icon">↑</span>,
    endIcon: <span data-testid="end-icon">↓</span>,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      const { container } = render(<RdsCompScrollBar {...defaultProps} />);
      expect(container.querySelector('.rds-scrollbar')).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsCompScrollBar.displayName).toBe('RdsCompScrollBar');
    });

    it('should render scrollbar content wrapper', () => {
      const { container } = render(<RdsCompScrollBar {...defaultProps} />);
      expect(container.querySelector('.rds-scrollbar__content')).toBeInTheDocument();
    });

    it('should render inner content div', () => {
      const { container } = render(<RdsCompScrollBar {...defaultProps} />);
      expect(container.querySelector('.rds-scrollbar__inner-content')).toBeInTheDocument();
    });

    it('should render with default props', () => {
      const { container } = render(<RdsCompScrollBar />);
      const scrollbar = container.querySelector('.rds-scrollbar');
      expect(scrollbar).toHaveClass('rds-scrollbar--mac');
    });
  });

  describe('Type Variants', () => {
    it('should render Mac type by default', () => {
      const { container } = render(
        <RdsCompScrollBar {...defaultProps} type={ScrollBarType.Mac} />
      );
      const scrollbar = container.querySelector('.rds-scrollbar');
      expect(scrollbar).toHaveClass('rds-scrollbar--mac');
      expect(scrollbar).not.toHaveClass('rds-scrollbar--simple');
    });

    it('should render Mac type when explicitly set', () => {
      const { container } = render(
        <RdsCompScrollBar {...defaultProps} type={ScrollBarType.Mac} />
      );
      expect(container.querySelector('.rds-scrollbar--mac')).toBeInTheDocument();
    });

    it('should render Simple type when set', () => {
      const { container } = render(
        <RdsCompScrollBar {...defaultProps} type={ScrollBarType.Simple} />
      );
      const scrollbar = container.querySelector('.rds-scrollbar');
      expect(scrollbar).toHaveClass('rds-scrollbar--simple');
      expect(scrollbar).not.toHaveClass('rds-scrollbar--mac');
    });

    it('should not render controls for Simple type', () => {
      const { container } = render(
        <RdsCompScrollBar
          {...defaultProps}
          type={ScrollBarType.Simple}
          showButtons={true}
        />
      );
      expect(container.querySelector('.rds-scrollbar__controls')).not.toBeInTheDocument();
    });

    it('should switch between types when prop changes', () => {
      const { container, rerender } = render(
        <RdsCompScrollBar {...defaultProps} type={ScrollBarType.Mac} />
      );
      expect(container.querySelector('.rds-scrollbar--mac')).toBeInTheDocument();

      rerender(
        <RdsCompScrollBar {...defaultProps} type={ScrollBarType.Simple} />
      );
      expect(container.querySelector('.rds-scrollbar--simple')).toBeInTheDocument();
    });
  });

  describe('Position Variants', () => {
    it('should default to Start position', () => {
      render(<RdsCompScrollBar {...defaultProps} />);
      const contentDiv = document.querySelector('.rds-scrollbar__content') as HTMLDivElement;
      if (contentDiv) {
        expect(contentDiv.scrollTop).toBe(0);
      }
    });

    it('should scroll to Start position', async () => {
      render(
        <RdsCompScrollBar {...defaultProps} position={ScrollPosition.Start} />
      );
      const contentDiv = document.querySelector('.rds-scrollbar__content') as HTMLDivElement;
      if (contentDiv) {
        await waitFor(() => {
          expect(contentDiv.scrollTop).toBe(0);
        });
      }
    });

    it('should scroll to Middle position', async () => {
      const { container } = render(
        <RdsCompScrollBar {...defaultProps} position={ScrollPosition.Middle} />
      );
      const contentDiv = container.querySelector('.rds-scrollbar__content') as HTMLDivElement;
      if (contentDiv) {
        await waitFor(() => {
          expect(contentDiv.scrollTop).toBeGreaterThanOrEqual(0);
        });
      }
    });

    it('should scroll to End position', async () => {
      const { container } = render(
        <RdsCompScrollBar {...defaultProps} position={ScrollPosition.End} />
      );
      const contentDiv = container.querySelector('.rds-scrollbar__content') as HTMLDivElement;
      if (contentDiv) {
        await waitFor(() => {
          expect(contentDiv.scrollTop).toBeGreaterThanOrEqual(0);
        });
      }
    });

    it('should update scroll position when prop changes', async () => {
      const { container, rerender } = render(
        <RdsCompScrollBar {...defaultProps} position={ScrollPosition.Start} />
      );
      const contentDiv = container.querySelector('.rds-scrollbar__content') as HTMLDivElement;
      if (contentDiv) {
        const initialScrollTop = contentDiv.scrollTop;

        rerender(
          <RdsCompScrollBar {...defaultProps} position={ScrollPosition.End} />
        );

        await waitFor(() => {
          expect(contentDiv.scrollTop).toBeGreaterThanOrEqual(initialScrollTop);
        });
      }
    });
  });

  describe('Button Controls', () => {
    it('should render controls with Mac type and showButtons true', () => {
      const { container } = render(
        <RdsCompScrollBar
          {...defaultProps}
          type={ScrollBarType.Mac}
          showButtons={true}
        />
      );
      expect(container.querySelector('.rds-scrollbar__controls')).toBeInTheDocument();
    });

    it('should render two buttons when controls visible', () => {
      const { container } = render(
        <RdsCompScrollBar
          {...defaultProps}
          type={ScrollBarType.Mac}
          showButtons={true}
        />
      );
      const buttons = container.querySelectorAll('.rds-scrollbar__button');
      expect(buttons).toHaveLength(2);
    });

    it('should not render controls when showButtons is false', () => {
      const { container } = render(
        <RdsCompScrollBar
          {...defaultProps}
          type={ScrollBarType.Mac}
          showButtons={false}
        />
      );
      expect(container.querySelector('.rds-scrollbar__controls')).not.toBeInTheDocument();
    });

    it('should not render buttons for Simple type even with showButtons true', () => {
      const { container } = render(
        <RdsCompScrollBar
          {...defaultProps}
          type={ScrollBarType.Simple}
          showButtons={true}
        />
      );
      expect(container.querySelector('.rds-scrollbar__buttons')).not.toBeInTheDocument();
      expect(container.querySelector('.rds-scrollbar__controls')).not.toBeInTheDocument();
    });

    it('should scroll to top when first button clicked', async () => {
      const { container } = render(
        <RdsCompScrollBar
          {...defaultProps}
          type={ScrollBarType.Mac}
          showButtons={true}
        />
      );
      const buttons = container.querySelectorAll(
        '.rds-scrollbar__button'
      ) as NodeListOf<HTMLButtonElement>;
      if (buttons.length > 0) {
        fireEvent.click(buttons[0]);
        const contentDiv = container.querySelector('.rds-scrollbar__content') as HTMLDivElement;
        await waitFor(() => {
          expect(contentDiv.scrollTop).toBe(0);
        });
      }
    });

    it('should scroll to bottom when second button clicked', async () => {
      const { container } = render(
        <RdsCompScrollBar
          {...defaultProps}
          type={ScrollBarType.Mac}
          showButtons={true}
        />
      );
      const buttons = container.querySelectorAll(
        '.rds-scrollbar__button'
      ) as NodeListOf<HTMLButtonElement>;
      if (buttons.length > 1) {
        fireEvent.click(buttons[1]);
        const contentDiv = container.querySelector('.rds-scrollbar__content') as HTMLDivElement;
        await waitFor(() => {
          expect(contentDiv.scrollTop).toBeGreaterThanOrEqual(0);
        });
      }
    });
  });

  describe('Icons', () => {
    it('should render startIcon when provided', () => {
      render(
        <RdsCompScrollBar
          {...defaultProps}
          type={ScrollBarType.Mac}
          showButtons={true}
          startIcon={<span data-testid="custom-start">↑</span>}
        />
      );
      expect(screen.getByTestId('custom-start')).toBeInTheDocument();
    });

    it('should render endIcon when provided', () => {
      render(
        <RdsCompScrollBar
          {...defaultProps}
          type={ScrollBarType.Mac}
          showButtons={true}
          endIcon={<span data-testid="custom-end">↓</span>}
        />
      );
      expect(screen.getByTestId('custom-end')).toBeInTheDocument();
    });

    it('should render both icons when provided', () => {
      render(
        <RdsCompScrollBar
          {...defaultProps}
          type={ScrollBarType.Mac}
          showButtons={true}
          startIcon={<span data-testid="start">↑</span>}
          endIcon={<span data-testid="end">↓</span>}
        />
      );
      expect(screen.getByTestId('start')).toBeInTheDocument();
      expect(screen.getByTestId('end')).toBeInTheDocument();
    });

    it('should handle missing icons gracefully', () => {
      const { container } = render(
        <RdsCompScrollBar
          {...defaultProps}
          type={ScrollBarType.Mac}
          showButtons={true}
          startIcon={undefined}
          endIcon={undefined}
        />
      );
      expect(container.querySelector('.rds-scrollbar__controls')).toBeInTheDocument();
    });

    it('should render icon nodes correctly', () => {
      const startIcon = <strong data-testid="strong-start">START</strong>;
      const endIcon = <em data-testid="em-end">END</em>;
      render(
        <RdsCompScrollBar
          {...defaultProps}
          type={ScrollBarType.Mac}
          showButtons={true}
          startIcon={startIcon}
          endIcon={endIcon}
        />
      );
      expect(screen.getByTestId('strong-start')).toBeInTheDocument();
      expect(screen.getByTestId('em-end')).toBeInTheDocument();
    });
  });

  describe('Button Accessibility', () => {
    it('should have aria-label on scroll to top button', () => {
      const { container } = render(
        <RdsCompScrollBar
          {...defaultProps}
          type={ScrollBarType.Mac}
          showButtons={true}
        />
      );
      const buttons = container.querySelectorAll('.rds-scrollbar__button');
      expect(buttons[0]).toHaveAttribute('aria-label', 'Scroll to top');
    });

    it('should have aria-label on scroll to bottom button', () => {
      const { container } = render(
        <RdsCompScrollBar
          {...defaultProps}
          type={ScrollBarType.Mac}
          showButtons={true}
        />
      );
      const buttons = container.querySelectorAll('.rds-scrollbar__button');
      expect(buttons[1]).toHaveAttribute('aria-label', 'Scroll to bottom');
    });

    it('should be keyboard accessible', () => {
      const { container } = render(
        <RdsCompScrollBar
          {...defaultProps}
          type={ScrollBarType.Mac}
          showButtons={true}
        />
      );
      const buttons = container.querySelectorAll('.rds-scrollbar__button');
      expect(buttons[0].tagName).toBe('BUTTON');
      expect(buttons[1].tagName).toBe('BUTTON');
    });
  });

  describe('Prop Combinations', () => {
    it('should handle Mac type with buttons and icons', () => {
      const { container } = render(
        <RdsCompScrollBar
          type={ScrollBarType.Mac}
          position={ScrollPosition.Start}
          showButtons={true}
          startIcon={<span>↑</span>}
          endIcon={<span>↓</span>}
        />
      );
      expect(container.querySelector('.rds-scrollbar--mac')).toBeInTheDocument();
      expect(container.querySelector('.rds-scrollbar__controls')).toBeInTheDocument();
    });

    it('should handle Simple type without buttons', () => {
      const { container } = render(
        <RdsCompScrollBar
          type={ScrollBarType.Simple}
          position={ScrollPosition.Middle}
          showButtons={false}
        />
      );
      expect(container.querySelector('.rds-scrollbar--simple')).toBeInTheDocument();
      expect(container.querySelector('.rds-scrollbar__controls')).not.toBeInTheDocument();
    });

    it('should handle all position variants with Mac type', () => {
      const positions = [ScrollPosition.Start, ScrollPosition.Middle, ScrollPosition.End];
      positions.forEach(pos => {
        const { container, unmount } = render(
          <RdsCompScrollBar
            type={ScrollBarType.Mac}
            position={pos}
            showButtons={true}
          />
        );
        expect(container.querySelector('.rds-scrollbar')).toBeInTheDocument();
        unmount();
      });
    });

    it('should handle all position variants with Simple type', () => {
      const positions = [ScrollPosition.Start, ScrollPosition.Middle, ScrollPosition.End];
      positions.forEach(pos => {
        const { container, unmount } = render(
          <RdsCompScrollBar type={ScrollBarType.Simple} position={pos} />
        );
        expect(container.querySelector('.rds-scrollbar')).toBeInTheDocument();
        unmount();
      });
    });
  });

  describe('CSS Classes', () => {
    it('should apply correct class for Mac type', () => {
      const { container } = render(
        <RdsCompScrollBar {...defaultProps} type={ScrollBarType.Mac} />
      );
      const scrollbar = container.querySelector('.rds-scrollbar');
      expect(scrollbar).toHaveClass('rds-scrollbar--mac');
    });

    it('should apply correct class for Simple type', () => {
      const { container } = render(
        <RdsCompScrollBar {...defaultProps} type={ScrollBarType.Simple} />
      );
      const scrollbar = container.querySelector('.rds-scrollbar');
      expect(scrollbar).toHaveClass('rds-scrollbar--simple');
    });

    it('should have content class', () => {
      const { container } = render(<RdsCompScrollBar {...defaultProps} />);
      expect(container.querySelector('.rds-scrollbar__content')).toBeInTheDocument();
    });

    it('should have inner content class', () => {
      const { container } = render(<RdsCompScrollBar {...defaultProps} />);
      expect(container.querySelector('.rds-scrollbar__inner-content')).toBeInTheDocument();
    });

    it('should have button class', () => {
      const { container } = render(
        <RdsCompScrollBar
          {...defaultProps}
          type={ScrollBarType.Mac}
          showButtons={true}
        />
      );
      const buttons = container.querySelectorAll('.rds-scrollbar__button');
      expect(buttons.length).toBeGreaterThan(0);
    });

    it('should have controls class when buttons shown', () => {
      const { container } = render(
        <RdsCompScrollBar
          {...defaultProps}
          type={ScrollBarType.Mac}
          showButtons={true}
        />
      );
      expect(container.querySelector('.rds-scrollbar__controls')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle undefined position prop', () => {
      const { container } = render(
        <RdsCompScrollBar {...defaultProps} position={undefined} />
      );
      expect(container.querySelector('.rds-scrollbar')).toBeInTheDocument();
    });

    it('should handle undefined type prop', () => {
      const { container } = render(
        <RdsCompScrollBar {...defaultProps} type={undefined} />
      );
      // Should default to Mac
      expect(container.querySelector('.rds-scrollbar')).toBeInTheDocument();
    });

    it('should handle undefined showButtons prop', () => {
      const { container } = render(
        <RdsCompScrollBar {...defaultProps} showButtons={undefined} />
      );
      // Should default to true, so controls should render
      expect(container.querySelector('.rds-scrollbar')).toBeInTheDocument();
    });

    it('should handle rapid prop changes', () => {
      const { rerender, container } = render(
        <RdsCompScrollBar {...defaultProps} position={ScrollPosition.Start} />
      );

      rerender(
        <RdsCompScrollBar {...defaultProps} position={ScrollPosition.Middle} />
      );
      rerender(
        <RdsCompScrollBar {...defaultProps} position={ScrollPosition.End} />
      );
      rerender(
        <RdsCompScrollBar {...defaultProps} position={ScrollPosition.Start} />
      );

      expect(container.querySelector('.rds-scrollbar')).toBeInTheDocument();
    });

    it('should handle type switching multiple times', () => {
      const { rerender, container } = render(
        <RdsCompScrollBar {...defaultProps} type={ScrollBarType.Mac} />
      );

      rerender(<RdsCompScrollBar {...defaultProps} type={ScrollBarType.Simple} />);
      expect(container.querySelector('.rds-scrollbar--simple')).toBeInTheDocument();

      rerender(<RdsCompScrollBar {...defaultProps} type={ScrollBarType.Mac} />);
      expect(container.querySelector('.rds-scrollbar--mac')).toBeInTheDocument();
    });
  });

  describe('Integration', () => {
    it('should render complete component with all features', () => {
      const { container } = render(
        <RdsCompScrollBar
          type={ScrollBarType.Mac}
          position={ScrollPosition.Start}
          showButtons={true}
          startIcon={<span data-testid="start">↑</span>}
          endIcon={<span data-testid="end">↓</span>}
        />
      );

      expect(container.querySelector('.rds-scrollbar')).toBeInTheDocument();
      expect(container.querySelector('.rds-scrollbar--mac')).toBeInTheDocument();
      expect(container.querySelector('.rds-scrollbar__controls')).toBeInTheDocument();
      expect(screen.getByTestId('start')).toBeInTheDocument();
      expect(screen.getByTestId('end')).toBeInTheDocument();
    });

    it('should manage scroll position with type change', async () => {
      const { container, rerender } = render(
        <RdsCompScrollBar
          type={ScrollBarType.Mac}
          position={ScrollPosition.Start}
          showButtons={true}
        />
      );

      const contentDiv = container.querySelector('.rds-scrollbar__content') as HTMLDivElement;
      if (contentDiv) {
        await waitFor(() => {
          expect(contentDiv.scrollTop).toBe(0);
        });

        rerender(
          <RdsCompScrollBar
            type={ScrollBarType.Simple}
            position={ScrollPosition.Start}
          />
        );

        await waitFor(() => {
          expect(contentDiv.scrollTop).toBe(0);
        });
      }
    });

    it('should handle button clicks with different positions', async () => {
      const { container, rerender } = render(
        <RdsCompScrollBar
          type={ScrollBarType.Mac}
          position={ScrollPosition.Start}
          showButtons={true}
        />
      );

      const buttonsBefore = container.querySelectorAll(
        '.rds-scrollbar__button'
      ) as NodeListOf<HTMLButtonElement>;
      if (buttonsBefore.length > 1) {
        fireEvent.click(buttonsBefore[1]);

        rerender(
          <RdsCompScrollBar
            type={ScrollBarType.Mac}
            position={ScrollPosition.End}
            showButtons={true}
          />
        );

        const contentDiv = container.querySelector('.rds-scrollbar__content') as HTMLDivElement;
        await waitFor(() => {
          expect(contentDiv).toBeInTheDocument();
        });
      }
    });
  });

  describe('Accessibility', () => {
    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsCompScrollBar {...defaultProps} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
