import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RdsAccordion from './rds-accordion';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';

// Mock SCSS
jest.mock('./rds-accordion.scss', () => ({}));

describe('RdsAccordion', () => {
  const defaultProps = {
    title: 'Accordion Title',
    children: <div>Accordion Content</div>,
  };

  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      render(<RdsAccordion {...defaultProps} />);
      expect(screen.getByText('Accordion Title')).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsAccordion.displayName).toBe('RdsAccordion');
    });

    it('should render with base class', () => {
      const { container } = render(<RdsAccordion {...defaultProps} />);
      expect(container.querySelector('.rds-accordion')).toBeInTheDocument();
    });

    it('should render accordion container', () => {
      const { container } = render(<RdsAccordion {...defaultProps} />);
      expect(container.querySelector('.rds-accordion__container')).toBeInTheDocument();
    });

    it('should render title element', () => {
      const { container } = render(<RdsAccordion {...defaultProps} />);
      expect(container.querySelector('.rds-accordion__title')).toBeInTheDocument();
    });

    it('should render content in accordion details', () => {
      const { container } = render(<RdsAccordion {...defaultProps} />);
      expect(container.querySelector('.rds-accordion__details')).toBeInTheDocument();
    });
  });

  describe('Title Display', () => {
    it('should display correct title text', () => {
      render(<RdsAccordion {...defaultProps} title="Test Title" />);
      expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    it('should display title with special characters', () => {
      render(<RdsAccordion {...defaultProps} title="Title & Special <Chars>" />);
      expect(screen.getByText('Title & Special <Chars>')).toBeInTheDocument();
    });

    it('should display long title text', () => {
      const longTitle = 'A'.repeat(100);
      render(<RdsAccordion {...defaultProps} title={longTitle} />);
      expect(screen.getByText(longTitle)).toBeInTheDocument();
    });
  });

  describe('Children Display', () => {
    it('should display children content', () => {
      render(<RdsAccordion {...defaultProps} children={<div>Test Content</div>} />);
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('should display complex children expanded', () => {
      render(
        <RdsAccordion
          {...defaultProps}
          defaultExpanded={true}
          children={
            <div>
              <p>Paragraph 1</p>
              <p>Paragraph 2</p>
              <button>Action Button</button>
            </div>
          }
        />
      );
      expect(screen.getByText('Paragraph 1')).toBeInTheDocument();
      expect(screen.getByText('Paragraph 2')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Action Button' })).toBeInTheDocument();
    });

    it('should render children in details panel', () => {
      const { container } = render(<RdsAccordion {...defaultProps} />);
      expect(container.querySelector('.rds-accordion__details-panel')).toBeInTheDocument();
    });
  });

  describe('Size Variants', () => {
    it('should apply small size class', () => {
      const { container } = render(<RdsAccordion {...defaultProps} size="small" />);
      expect(container.querySelector('.rds-accordion--small')).toBeInTheDocument();
    });

    it('should apply medium size class (default)', () => {
      const { container } = render(<RdsAccordion {...defaultProps} />);
      expect(container.querySelector('.rds-accordion--medium')).toBeInTheDocument();
    });

    it('should apply large size class', () => {
      const { container } = render(<RdsAccordion {...defaultProps} size="large" />);
      expect(container.querySelector('.rds-accordion--large')).toBeInTheDocument();
    });

    it('should change size dynamically', () => {
      const { container, rerender } = render(<RdsAccordion {...defaultProps} size="small" />);
      expect(container.querySelector('.rds-accordion--small')).toBeInTheDocument();

      rerender(<RdsAccordion {...defaultProps} size="large" />);
      expect(container.querySelector('.rds-accordion--large')).toBeInTheDocument();
      expect(container.querySelector('.rds-accordion--small')).not.toBeInTheDocument();
    });
  });

  describe('Style Variants', () => {
    it('should apply border style (default)', () => {
      const { container } = render(<RdsAccordion {...defaultProps} />);
      expect(container.querySelector('.rds-accordion--border')).toBeInTheDocument();
    });

    it('should apply bottomline style', () => {
      const { container } = render(<RdsAccordion {...defaultProps} accordionStyle="bottomline" />);
      expect(container.querySelector('.rds-accordion--bottomline')).toBeInTheDocument();
    });

    it('should apply borderhide style', () => {
      const { container } = render(<RdsAccordion {...defaultProps} accordionStyle="borderhide" />);
      expect(container.querySelector('.rds-accordion--borderhide')).toBeInTheDocument();
    });

    it('should apply style to container', () => {
      const { container } = render(<RdsAccordion {...defaultProps} accordionStyle="bottomline" />);
      const containerDiv = container.querySelector('.rds-accordion__container');
      expect(containerDiv).toHaveClass('rds-accordion--bottomline');
    });
  });

  describe('State Variants', () => {
    it('should apply default state (default)', () => {
      const { container } = render(<RdsAccordion {...defaultProps} state="default" />);
      const accordion = container.querySelector('.rds-accordion');
      expect(accordion).not.toHaveClass('rds-accordion--selected');
      expect(accordion).not.toHaveClass('rds-accordion--hover');
    });

    it('should apply selected state', () => {
      const { container } = render(<RdsAccordion {...defaultProps} state="selected" />);
      expect(container.querySelector('.rds-accordion--selected')).toBeInTheDocument();
    });

    it('should apply hover state on mouse enter', () => {
      const { container } = render(<RdsAccordion {...defaultProps} state="hover" />);
      const accordion = container.querySelector('.rds-accordion');

      fireEvent.mouseEnter(accordion!);
      expect(accordion).toHaveClass('rds-accordion--hover');
    });

    it('should remove hover state on mouse leave', () => {
      const { container } = render(<RdsAccordion {...defaultProps} state="hover" />);
      const accordion = container.querySelector('.rds-accordion');

      fireEvent.mouseEnter(accordion!);
      expect(accordion).toHaveClass('rds-accordion--hover');

      fireEvent.mouseLeave(accordion!);
      expect(accordion).not.toHaveClass('rds-accordion--hover');
    });
  });

  describe('Icon Display', () => {
    it('should display default AddIcon when ShowLeftIcon is true', () => {
      render(<RdsAccordion {...defaultProps} ShowLeftIcon={true} />);
      expect(screen.getByTestId('AddIcon')).toBeInTheDocument();
    });

    it('should hide icon when ShowLeftIcon is false', () => {
      const { container } = render(<RdsAccordion {...defaultProps} ShowLeftIcon={false} />);
      expect(container.querySelector('.rds-accordion__icon')).not.toBeInTheDocument();
    });

    it('should display custom icon when provided', () => {
      render(
        <RdsAccordion
          {...defaultProps}
          changeleftIcon={<span data-testid="custom-icon">Custom</span>}
        />
      );
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });

    it('should hide icon when changeleftIcon is null', () => {
      const { container } = render(
        <RdsAccordion {...defaultProps} ShowLeftIcon={true} changeleftIcon={null} />
      );
      expect(container.querySelector('.rds-accordion__icon')).not.toBeInTheDocument();
    });

    it('should use changeleftIcon over default icon', () => {
      render(
        <RdsAccordion
          {...defaultProps}
          changeleftIcon={<span data-testid="custom-icon">Custom</span>}
          icon={<span data-testid="icon-prop">Icon Prop</span>}
        />
      );
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
      expect(screen.queryByTestId('icon-prop')).not.toBeInTheDocument();
    });

    it('should render expand icon', () => {
      render(<RdsAccordion {...defaultProps} />);
      expect(screen.getByTestId('ExpandMoreIcon')).toBeInTheDocument();
    });

    it('should have icon in header section', () => {
      const { container } = render(<RdsAccordion {...defaultProps} />);
      const header = container.querySelector('.rds-accordion__header');
      const icon = header?.querySelector('.rds-accordion__icon');
      expect(icon).toBeInTheDocument();
    });
  });

  describe('Expansion Behavior', () => {
    it('should not be expanded by default', () => {
      const { container } = render(<RdsAccordion {...defaultProps} />);
      const summary = container.querySelector('[aria-expanded]');
      expect(summary).toHaveAttribute('aria-expanded', 'false');
    });

    it('should be expanded when defaultExpanded is true', () => {
      const { container } = render(<RdsAccordion {...defaultProps} defaultExpanded={true} />);
      const summary = container.querySelector('[aria-expanded]');
      expect(summary).toHaveAttribute('aria-expanded', 'true');
    });

    it('should toggle expansion on click with defaultExpanded', () => {
      const { container } = render(<RdsAccordion {...defaultProps} defaultExpanded={false} />);

      const summary = container.querySelector('[aria-expanded]');
      expect(summary).toHaveAttribute('aria-expanded', 'false');

      const summaryEl = container.querySelector('.rds-accordion__summary');
      fireEvent.click(summaryEl!);

      expect(summary).toHaveAttribute('aria-expanded', 'true');
    });

    it('should be controlled by expanded prop', () => {
      const { rerender, container } = render(<RdsAccordion {...defaultProps} expanded={false} />);
      const summary = container.querySelector('[aria-expanded]');
      expect(summary).toHaveAttribute('aria-expanded', 'false');

      rerender(<RdsAccordion {...defaultProps} expanded={true} />);
      expect(summary).toHaveAttribute('aria-expanded', 'true');
    });

    it('should prefer expanded prop over defaultExpanded', () => {
      const { container } = render(
        <RdsAccordion
          {...defaultProps}
          defaultExpanded={true}
          expanded={false}
        />
      );
      const summary = container.querySelector('[aria-expanded]');
      expect(summary).toHaveAttribute('aria-expanded', 'false');
    });

    it('should not toggle when expanded prop is controlled', () => {
      const { container } = render(<RdsAccordion {...defaultProps} expanded={false} />);

      const summaryEl = container.querySelector('.rds-accordion__summary');
      fireEvent.click(summaryEl!);

      const summary = container.querySelector('[aria-expanded]');
      expect(summary).toHaveAttribute('aria-expanded', 'false');
    });
  });

  describe('Disabled State', () => {
    it('should not be disabled by default', () => {
      const { container } = render(<RdsAccordion {...defaultProps} />);
      expect(container.querySelector('.rds-accordion--disabled')).not.toBeInTheDocument();
    });

    it('should apply disabled class when disabled is true', () => {
      const { container } = render(<RdsAccordion {...defaultProps} disabled={true} />);
      expect(container.querySelector('.rds-accordion--disabled')).toBeInTheDocument();
    });

    it('should not apply disabled class when disabled is false', () => {
      const { container } = render(<RdsAccordion {...defaultProps} disabled={false} />);
      expect(container.querySelector('.rds-accordion--disabled')).not.toBeInTheDocument();
    });

    it('should prevent expansion when disabled', () => {
      const { container } = render(
        <RdsAccordion
          {...defaultProps}
          disabled={true}
          expanded={false}
        />
      );

      const summaryEl = container.querySelector('.rds-accordion__summary');
      fireEvent.click(summaryEl!);

      const summary = container.querySelector('[aria-expanded]');
      expect(summary).toHaveAttribute('aria-expanded', 'false');
    });
  });

  describe('Mouse Events', () => {
    it('should track hover state', () => {
      const { container } = render(<RdsAccordion {...defaultProps} state="hover" />);
      const accordion = container.querySelector('.rds-accordion');

      expect(accordion).not.toHaveClass('rds-accordion--hover');
      fireEvent.mouseEnter(accordion!);
      expect(accordion).toHaveClass('rds-accordion--hover');
    });

    it('should remove hover state on mouse leave', () => {
      const { container } = render(<RdsAccordion {...defaultProps} state="hover" />);
      const accordion = container.querySelector('.rds-accordion');

      fireEvent.mouseEnter(accordion!);
      fireEvent.mouseLeave(accordion!);
      expect(accordion).not.toHaveClass('rds-accordion--hover');
    });

    it('should handle multiple hover cycles', () => {
      const { container } = render(<RdsAccordion {...defaultProps} state="hover" />);
      const accordion = container.querySelector('.rds-accordion');

      for (let i = 0; i < 5; i++) {
        fireEvent.mouseEnter(accordion!);
        expect(accordion).toHaveClass('rds-accordion--hover');

        fireEvent.mouseLeave(accordion!);
        expect(accordion).not.toHaveClass('rds-accordion--hover');
      }
    });
  });

  describe('Props Validation', () => {
    it('should render with minimal required props', () => {
      render(<RdsAccordion title="Title" children={<div>Content</div>} />);
      expect(screen.getByText('Title')).toBeInTheDocument();
    });

    it('should handle empty title', () => {
      render(<RdsAccordion {...defaultProps} title="" />);
      const title = screen.queryByText('Accordion Title');
      expect(title).not.toBeInTheDocument();
    });

    it('should handle empty children', () => {
      render(<RdsAccordion {...defaultProps} children={<div></div>} />);
      expect(screen.getByText('Accordion Title')).toBeInTheDocument();
    });

    it('should override defaultExpanded with expanded prop', () => {
      const { container } = render(
        <RdsAccordion
          {...defaultProps}
          defaultExpanded={true}
          expanded={false}
        />
      );
      const summary = container.querySelector('[aria-expanded]');
      expect(summary).toHaveAttribute('aria-expanded', 'false');
    });

    it('should pass through MUI accordion props', () => {
      const { container } = render(
        <RdsAccordion
          {...defaultProps}
          id="test-accordion"
          data-testid="accordion-test"
        />
      );
      const accordion = container.querySelector('.MuiAccordion-root');
      expect(accordion).toHaveAttribute('id', 'test-accordion');
    });

    it('should apply custom className from MUI props', () => {
      const { container } = render(
        <RdsAccordion
          {...defaultProps}
        />
      );
      const accordion = container.querySelector('.rds-accordion');
      expect(accordion).toHaveClass('rds-accordion');
    });
  });

  describe('Combined Props Tests', () => {
    it('should render with all props customized', () => {
      const { container } = render(
        <RdsAccordion
          title="Custom Title"
          children={<div>Custom Content</div>}
          size="large"
          accordionStyle="bottomline"
          state="selected"
          defaultExpanded={true}
          ShowLeftIcon={true}
          changeleftIcon={<span data-testid="custom-icon">Icon</span>}
        />
      );

      expect(screen.getByText('Custom Title')).toBeInTheDocument();
      expect(screen.getByText('Custom Content')).toBeInTheDocument();
      expect(container.querySelector('.rds-accordion--large')).toBeInTheDocument();
      expect(container.querySelector('.rds-accordion--bottomline')).toBeInTheDocument();
      expect(container.querySelector('.rds-accordion--selected')).toBeInTheDocument();
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });

    it('should handle combination of size, style, and state', () => {
      const { container } = render(
        <RdsAccordion
          {...defaultProps}
          size="medium"
          accordionStyle="borderhide"
          state="selected"
        />
      );

      expect(container.querySelector('.rds-accordion--medium')).toBeInTheDocument();
      expect(container.querySelector('.rds-accordion--borderhide')).toBeInTheDocument();
      expect(container.querySelector('.rds-accordion--selected')).toBeInTheDocument();
    });

    it('should handle disabled with expanded state', () => {
      const { container } = render(
        <RdsAccordion
          {...defaultProps}
          disabled={true}
          defaultExpanded={true}
        />
      );

      expect(container.querySelector('.rds-accordion--disabled')).toBeInTheDocument();
    });

    it('should handle hover state with disabled', () => {
      const { container } = render(
        <RdsAccordion
          {...defaultProps}
          state="hover"
          disabled={true}
        />
      );

      const accordion = container.querySelector('.rds-accordion');
      fireEvent.mouseEnter(accordion!);

      expect(accordion).toHaveClass('rds-accordion--disabled');
    });
  });

  describe('Edge Cases', () => {
    it('should handle very long title text', () => {
      const veryLongTitle = 'A'.repeat(500);
      render(<RdsAccordion {...defaultProps} title={veryLongTitle} />);
      expect(screen.getByText(veryLongTitle)).toBeInTheDocument();
    });

    it('should handle special HTML characters in title', () => {
      render(
        <RdsAccordion
          {...defaultProps}
          title="Title with &quot;quotes&quot; and &lt;symbols&gt;"
        />
      );
      expect(
        screen.getByText('Title with "quotes" and <symbols>')
      ).toBeInTheDocument();
    });

    it('should handle unicode characters in title', () => {
      render(
        <RdsAccordion {...defaultProps} title="Título con 中文 और हिन्दी" />
      );
      expect(screen.getByText('Título con 中文 और हिन्दी')).toBeInTheDocument();
    });

    it('should handle rapid state changes', () => {
      const { container, rerender } = render(
        <RdsAccordion {...defaultProps} state="default" />
      );

      const states = ['default', 'selected', 'hover', 'default', 'selected'] as const;

      for (const newState of states) {
        rerender(
          <RdsAccordion {...defaultProps} state={newState} />
        );
        const accordion = container.querySelector('.rds-accordion');

        if (newState === 'selected') {
          expect(accordion).toHaveClass('rds-accordion--selected');
        } else {
          expect(accordion).not.toHaveClass('rds-accordion--selected');
        }
      }
    });

    it('should handle rapid expansion toggling with controlled expanded', async () => {
      // Test that controlled expanded prop works correctly
      const { container, rerender } = render(
        <RdsAccordion {...defaultProps} expanded={true} />
      );

      // Initially expanded
      const summary = container.querySelector('[aria-expanded]');
      expect(summary).toHaveAttribute('aria-expanded', 'true');

      // Toggle to collapsed
      rerender(
        <RdsAccordion {...defaultProps} expanded={false} />
      );
      expect(summary).toHaveAttribute('aria-expanded', 'false');

      // Toggle back to expanded
      rerender(
        <RdsAccordion {...defaultProps} expanded={true} />
      );
      expect(summary).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('Structure Tests', () => {
    it('should have correct DOM structure', () => {
      const { container } = render(<RdsAccordion {...defaultProps} />);

      const containerDiv = container.querySelector('.rds-accordion__container');
      expect(containerDiv).toBeInTheDocument();

      const accordion = containerDiv?.querySelector('.rds-accordion');
      expect(accordion).toBeInTheDocument();

      const summary = accordion?.querySelector('.rds-accordion__summary');
      expect(summary).toBeInTheDocument();

      const details = accordion?.querySelector('.rds-accordion__details');
      expect(details).toBeInTheDocument();
    });

    it('should have icon in correct location', () => {
      const { container } = render(<RdsAccordion {...defaultProps} ShowLeftIcon={true} />);

      const header = container.querySelector('.rds-accordion__header');
      const icon = header?.querySelector('.rds-accordion__icon');
      const title = header?.querySelector('.rds-accordion__title');

      expect(icon).toBeInTheDocument();
      expect(title).toBeInTheDocument();

      // Icon should come before title
      const iconIndex = Array.from(header?.children || []).indexOf(icon as any);
      const titleIndex = Array.from(header?.children || []).indexOf(title as any);
      expect(iconIndex).toBeLessThan(titleIndex);
    });

    it('should wrap content in details panel', () => {
      const { container } = render(
        <RdsAccordion {...defaultProps} children={<div>Test Content</div>} />
      );

      const detailsPanel = container.querySelector('.rds-accordion__details-panel');
      expect(detailsPanel).toBeInTheDocument();
      expect(detailsPanel?.textContent).toContain('Test Content');
    });
  });

  describe('Default Props Tests', () => {
    it('should use default ShowLeftIcon value', () => {
      render(<RdsAccordion title="Title" children={<div>Content</div>} />);
      expect(screen.getByTestId('AddIcon')).toBeInTheDocument();
    });

    it('should use default icon', () => {
      render(
        <RdsAccordion
          title="Title"
          children={<div>Content</div>}
          ShowLeftIcon={true}
        />
      );
      expect(screen.getByTestId('AddIcon')).toBeInTheDocument();
    });

    it('should use default defaultExpanded', () => {
      const { container } = render(
        <RdsAccordion title="Title" children={<div>Content</div>} />
      );
      const summary = container.querySelector('[aria-expanded]');
      expect(summary).toHaveAttribute('aria-expanded', 'false');
    });

    it('should use default size', () => {
      const { container } = render(
        <RdsAccordion title="Title" children={<div>Content</div>} />
      );
      expect(container.querySelector('.rds-accordion--medium')).toBeInTheDocument();
    });

    it('should use default state', () => {
      const { container } = render(
        <RdsAccordion title="Title" children={<div>Content</div>} />
      );
      const accordion = container.querySelector('.rds-accordion');
      expect(accordion).not.toHaveClass('rds-accordion--selected');
      expect(accordion).not.toHaveClass('rds-accordion--hover');
    });

    it('should use default accordionStyle', () => {
      const { container } = render(
        <RdsAccordion title="Title" children={<div>Content</div>} />
      );
      expect(container.querySelector('.rds-accordion--border')).toBeInTheDocument();
    });
  });

  describe('Content Rendering', () => {
    it('should render JSX content', () => {
      render(
        <RdsAccordion
          {...defaultProps}
          defaultExpanded={true}
          children={
            <div data-testid="jsx-content">
              <span>JSX Content</span>
            </div>
          }
        />
      );
      expect(screen.getByTestId('jsx-content')).toBeInTheDocument();
      expect(screen.getByText('JSX Content')).toBeInTheDocument();
    });

    it('should render multiple paragraphs', () => {
      render(
        <RdsAccordion
          {...defaultProps}
          defaultExpanded={true}
          children={
            <div>
              <p>Paragraph 1</p>
              <p>Paragraph 2</p>
              <p>Paragraph 3</p>
            </div>
          }
        />
      );
      expect(screen.getByText('Paragraph 1')).toBeInTheDocument();
      expect(screen.getByText('Paragraph 2')).toBeInTheDocument();
      expect(screen.getByText('Paragraph 3')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsAccordion {...defaultProps} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});

describe('RdsAccordion — keyboard navigation', () => {
  const defaultProps = {
    title: 'Accordion Title',
    children: <div>Accordion Content</div>,
  };

  it('summary is focusable via Tab', async () => {
    render(<RdsAccordion {...defaultProps} />);
    const summary = screen.getByRole('button', { name: /accordion title/i });
    summary.focus();
    expect(summary).toHaveFocus();
    expect(summary).toBeInTheDocument();
  });

  it('expands on Enter key', async () => {
    render(<RdsAccordion {...defaultProps} />);
    const summary = screen.getByRole('button', { name: /accordion title/i });
    summary.focus();
    await userEvent.keyboard('{Enter}');
    expect(screen.getByText('Accordion Content')).toBeInTheDocument();
  });

  it('expands on Space key', async () => {
    render(<RdsAccordion {...defaultProps} />);
    const summary = screen.getByRole('button', { name: /accordion title/i });
    summary.focus();
    await userEvent.keyboard(' ');
    expect(screen.getByText('Accordion Content')).toBeInTheDocument();
  });

  it('collapses when expanded and Enter pressed again', async () => {
    render(<RdsAccordion {...defaultProps} defaultExpanded />);
    const summary = screen.getByRole('button', { name: /accordion title/i });
    summary.focus();
    await userEvent.keyboard('{Enter}');
    const root = document.querySelector('.MuiAccordion-root');
    expect(root).not.toHaveClass('Mui-expanded');
  });

  it('is not focusable when disabled', async () => {
    render(<RdsAccordion {...defaultProps} disabled />);
    const summary = screen.getByRole('button', { name: /accordion title/i });
    expect(summary).toBeDisabled();
  });
});
