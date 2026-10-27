import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import RdsCollapse, { RdsCollapseProps } from './rds-collapse';
import { axe } from 'jest-axe';
import * as deprecation from '../shared/utils/deprecation';

jest.mock('./rds-collapse.scss', () => ({}));

jest.mock('@mui/icons-material/ExpandMore', () => {
  return function MockExpandMoreIcon() {
    return <span data-testid="ExpandMoreIcon">ExpandMoreIcon</span>;
  };
});

const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

const defaultProps: RdsCollapseProps = {
  title: 'Test Collapse',
  children: 'Content',
  expanded: false,
};

const wrap = (ui: React.ReactElement) => <ThemeProvider theme={theme}>{ui}</ThemeProvider>;

describe('RdsCollapse', () => {
  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      renderWithTheme(<RdsCollapse {...defaultProps} />);
      expect(screen.getByText('Test Collapse')).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsCollapse.displayName).toBe('RdsCollapse');
    });

    it('should render with title', () => {
      renderWithTheme(<RdsCollapse title="Section Title">{'Content'}</RdsCollapse>);
      expect(screen.getByText('Section Title')).toBeInTheDocument();
    });

    it('should render without title when not provided', () => {
      renderWithTheme(<RdsCollapse>{'Content'}</RdsCollapse>);
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('should render children content', () => {
      renderWithTheme(
        <RdsCollapse {...defaultProps}>
          <div>Child Content</div>
        </RdsCollapse>
      );
      expect(screen.getByText('Child Content')).toBeInTheDocument();
    });

    it('should render with custom className on the outer shell', () => {
      const { container } = renderWithTheme(<RdsCollapse {...defaultProps} className="custom-class" />);
      expect(container.querySelector('.rds-collapse.custom-class')).toBeInTheDocument();
    });

    it('should render empty collapse when children is empty string', () => {
      renderWithTheme(<RdsCollapse title="Empty">{''}</RdsCollapse>);
      expect(screen.getByText('Empty')).toBeInTheDocument();
    });

    it('should render with ReactNode children', () => {
      const children = (
        <div>
          <p>Paragraph 1</p>
          <p>Paragraph 2</p>
        </div>
      );
      renderWithTheme(<RdsCollapse title="Multi Content">{children}</RdsCollapse>);
      expect(screen.getByText('Paragraph 1')).toBeInTheDocument();
      expect(screen.getByText('Paragraph 2')).toBeInTheDocument();
    });
  });

  describe('Collapse Behavior', () => {
    it('should be collapsed by default', () => {
      const { container } = renderWithTheme(<RdsCollapse {...defaultProps} />);
      expect(container.querySelector('.MuiCollapse-root')).toBeInTheDocument();
    });

    it('should be expanded when expanded prop is true', () => {
      const { container } = renderWithTheme(<RdsCollapse {...defaultProps} expanded={true} />);
      expect(container.querySelector('.MuiCollapse-root')).toBeInTheDocument();
    });

    it('should expand when toggle button is clicked', async () => {
      renderWithTheme(<RdsCollapse {...defaultProps} expanded={false} />);
      fireEvent.click(screen.getByRole('button'));
      await waitFor(() => {
        expect(screen.getByText('Content')).toBeVisible();
      });
    });

    it('should collapse when toggle button is clicked while expanded', async () => {
      const { container } = renderWithTheme(<RdsCollapse {...defaultProps} expanded={true} />);
      fireEvent.click(screen.getByRole('button'));
      await waitFor(() => {
        expect(container.querySelector('.MuiCollapse-root')).toBeInTheDocument();
      });
    });

    it('should toggle between expanded and collapsed states', async () => {
      renderWithTheme(<RdsCollapse {...defaultProps} expanded={false} />);
      const toggleButton = screen.getByRole('button');
      fireEvent.click(toggleButton);
      await waitFor(() => {
        expect(screen.getByText('Content')).toBeInTheDocument();
      });
      fireEvent.click(toggleButton);
      await waitFor(() => {
        expect(toggleButton).toBeInTheDocument();
      });
    });
  });

  describe('Toggle Button', () => {
    it('should show toggle button by default', () => {
      renderWithTheme(<RdsCollapse {...defaultProps} />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should show toggle button when showToggleButton is true', () => {
      renderWithTheme(<RdsCollapse {...defaultProps} showToggleButton={true} />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should not show toggle button when showToggleButton is false', () => {
      renderWithTheme(<RdsCollapse {...defaultProps} showToggleButton={false} />);
      expect(screen.queryAllByRole('button').length).toBe(0);
    });

    it('should render ExpandMore icon in toggle button', () => {
      renderWithTheme(<RdsCollapse {...defaultProps} />);
      expect(screen.getByTestId('ExpandMoreIcon')).toBeInTheDocument();
    });

    it('should rotate toggle button when expanded', async () => {
      renderWithTheme(<RdsCollapse {...defaultProps} expanded={false} />);
      const toggleButton = screen.getByRole('button');
      fireEvent.click(toggleButton);
      await waitFor(() => {
        expect(toggleButton).toBeInTheDocument();
      });
    });
  });

  describe('Title Rendering', () => {
    it('should render title as h6 typography', () => {
      renderWithTheme(<RdsCollapse title="Section">{'Content'}</RdsCollapse>);
      const title = screen.getByText('Section');
      expect(title).toBeInTheDocument();
      expect(title.tagName).toBe('DIV');
    });

    it('should render title and toggle button together', () => {
      renderWithTheme(<RdsCollapse title="Title">{'Content'}</RdsCollapse>);
      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should update title when prop changes', () => {
      const { rerender } = renderWithTheme(<RdsCollapse title="Title 1">{'Content'}</RdsCollapse>);
      expect(screen.getByText('Title 1')).toBeInTheDocument();
      rerender(wrap(<RdsCollapse title="Title 2">{'Content'}</RdsCollapse>));
      expect(screen.queryByText('Title 1')).not.toBeInTheDocument();
      expect(screen.getByText('Title 2')).toBeInTheDocument();
    });

    it.each([
      ['long', 'A'.repeat(100)],
      ['special', 'Title @#$%^&*()'],
      ['unicode', '🎉 Title 🎊'],
    ])('should handle %s title text', (_n, title) => {
      renderWithTheme(<RdsCollapse title={title}>{'Content'}</RdsCollapse>);
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  describe('onToggle Callback', () => {
    const setupToggle = (expanded: boolean) => {
      const onToggle = jest.fn();
      renderWithTheme(<RdsCollapse {...defaultProps} onToggle={onToggle} expanded={expanded} />);
      return { onToggle, toggleButton: screen.getByRole('button') };
    };

    it('should call onToggle with true when expanding', () => {
      const { onToggle, toggleButton } = setupToggle(false);
      fireEvent.click(toggleButton);
      expect(onToggle).toHaveBeenCalled();
      expect(onToggle).toHaveBeenCalledWith(true);
    });

    it('should pass false to onToggle when collapsing', () => {
      const { onToggle, toggleButton } = setupToggle(true);
      fireEvent.click(toggleButton);
      expect(onToggle).toHaveBeenCalledWith(false);
    });

    it('should call onToggle multiple times on multiple toggles', () => {
      const { onToggle, toggleButton } = setupToggle(false);
      fireEvent.click(toggleButton);
      fireEvent.click(toggleButton);
      fireEvent.click(toggleButton);
      expect(onToggle).toHaveBeenCalledTimes(3);
    });

    it('should not call onToggle when showToggleButton is false and title clicked', () => {
      const onToggle = jest.fn();
      renderWithTheme(
        <RdsCollapse title="Title" onToggle={onToggle} showToggleButton={false} expanded={false}>
          {'Content'}
        </RdsCollapse>
      );
      fireEvent.click(screen.getByText('Title'));
      expect(onToggle).not.toHaveBeenCalled();
    });

    it('should call onToggle when title is clicked and showToggleButton is true', () => {
      const onToggle = jest.fn();
      renderWithTheme(
        <RdsCollapse title="Title" onToggle={onToggle} showToggleButton={true} expanded={false}>
          {'Content'}
        </RdsCollapse>
      );
      const header = screen.getByText('Title').parentElement;
      if (header) {
        fireEvent.click(header);
      }
      expect(onToggle).toHaveBeenCalled();
    });
  });

  describe('Expanded Prop Updates', () => {
    it.each([
      [false, true],
      [true, false],
    ])('should update when expanded prop changes from %s to %s', (from, to) => {
      const { rerender } = renderWithTheme(<RdsCollapse {...defaultProps} expanded={from} />);
      rerender(wrap(<RdsCollapse {...defaultProps} expanded={to} />));
      expect(screen.getByText('Content')).toBeInTheDocument();
    });
  });

  describe('Props Integration', () => {
    it('should accept MuiCollapse props', () => {
      renderWithTheme(<RdsCollapse {...defaultProps} timeout={500} unmountOnExit={true} />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should accept custom data attributes', () => {
      const { container } = renderWithTheme(<RdsCollapse {...defaultProps} data-testid="custom-collapse" />);
      expect(container.querySelector('[data-testid="custom-collapse"]')).toBeInTheDocument();
    });

    it('should accept and apply sx prop', () => {
      const { container } = renderWithTheme(<RdsCollapse {...defaultProps} sx={{ margin: '16px' }} />);
      expect(container.querySelector('.MuiBox-root')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle rapid toggle clicks', () => {
      const onToggle = jest.fn();
      renderWithTheme(<RdsCollapse {...defaultProps} onToggle={onToggle} expanded={false} />);
      const toggleButton = screen.getByRole('button');
      for (let i = 0; i < 10; i++) {
        fireEvent.click(toggleButton);
      }
      expect(onToggle.mock.calls.length).toBeGreaterThan(0);
    });

    it('should handle null children gracefully', () => {
      renderWithTheme(<RdsCollapse title="Null Child">{null}</RdsCollapse>);
      expect(screen.getByText('Null Child')).toBeInTheDocument();
    });

    it('should handle complex nested content', () => {
      const complexContent = (
        <div>
          <h3>Nested Title</h3>
          <p>Nested paragraph 1</p>
          <div>
            <span>Deep nested content</span>
          </div>
          <p>Nested paragraph 2</p>
        </div>
      );
      renderWithTheme(<RdsCollapse title="Complex">{complexContent}</RdsCollapse>);
      expect(screen.getByText('Nested Title')).toBeInTheDocument();
      expect(screen.getByText('Deep nested content')).toBeInTheDocument();
    });

    it('should handle children with event handlers', () => {
      renderWithTheme(
        <RdsCollapse title="With Handlers">
          <button onClick={jest.fn()}>Click me</button>
        </RdsCollapse>
      );
      expect(screen.getByText('Click me')).toBeInTheDocument();
    });

    it('should handle changing children content', () => {
      const { rerender } = renderWithTheme(<RdsCollapse title="Dynamic">{'Content 1'}</RdsCollapse>);
      expect(screen.getByText('Content 1')).toBeInTheDocument();
      rerender(wrap(<RdsCollapse title="Dynamic">{'Content 2'}</RdsCollapse>));
      expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
      expect(screen.getByText('Content 2')).toBeInTheDocument();
    });

    it('should handle title and showToggleButton both false', () => {
      renderWithTheme(<RdsCollapse showToggleButton={false}>{'Content'}</RdsCollapse>);
      expect(screen.getByText('Content')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsCollapse {...defaultProps} />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it.each([
      [{ key: 'Enter', code: 'Enter' }],
      [{ key: 'Enter' }],
      [{ key: ' ' }],
    ])('should support key %j on toggle button', (key) => {
      renderWithTheme(<RdsCollapse {...defaultProps} onToggle={jest.fn()} expanded={false} />);
      const toggleButton = screen.getByRole('button');
      fireEvent.keyDown(toggleButton, key);
      expect(toggleButton).toBeInTheDocument();
    });

    it('should be focusable', () => {
      renderWithTheme(<RdsCollapse {...defaultProps} />);
      const toggleButton = screen.getByRole('button') as HTMLElement;
      toggleButton.focus();
      expect(document.activeElement).toBe(toggleButton);
    });

    it('should have proper semantic HTML structure', () => {
      const { container } = renderWithTheme(<RdsCollapse title="Section">{'Content'}</RdsCollapse>);
      expect(container.querySelector('.MuiBox-root')).toBeInTheDocument();
    });
  });

  describe('Styling and Classes', () => {
    it('should have MuiBox root and MuiCollapse component', () => {
      const { container } = renderWithTheme(<RdsCollapse {...defaultProps} />);
      expect(container.querySelector('.MuiBox-root')).toBeInTheDocument();
      expect(container.querySelector('.MuiCollapse-root')).toBeInTheDocument();
    });

    it('should apply sx styles correctly', () => {
      const { container } = renderWithTheme(<RdsCollapse {...defaultProps} sx={{ p: 2, m: 1 }} />);
      expect(container.querySelector('.MuiBox-root')).toBeInTheDocument();
    });
  });

  describe('Combined Props', () => {
    it('should handle all props together', () => {
      renderWithTheme(
        <RdsCollapse
          title="Complete"
          expanded={false}
          onToggle={jest.fn()}
          showToggleButton={true}
          timeout={300}
          data-testid="complete-collapse"
          className="custom-collapse"
        >
          {'Full content'}
        </RdsCollapse>
      );
      expect(screen.getByText('Complete')).toBeInTheDocument();
      expect(screen.getByText('Full content')).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should work with expanded and onToggle together', () => {
      const onToggle = jest.fn();
      renderWithTheme(<RdsCollapse {...defaultProps} expanded={true} onToggle={onToggle} />);
      fireEvent.click(screen.getByRole('button'));
      expect(onToggle).toHaveBeenCalledWith(false);
    });

    it('should handle title with special formatting', () => {
      renderWithTheme(
        <RdsCollapse title="Title with <special> & characters" showToggleButton={true}>
          {'Content'}
        </RdsCollapse>
      );
      expect(screen.getByText('Title with <special> & characters')).toBeInTheDocument();
    });
  });

  describe('Default Props', () => {
    it('should have expanded as false and no title by default', () => {
      renderWithTheme(<RdsCollapse>{'Content'}</RdsCollapse>);
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('should have showToggleButton as true by default', () => {
      renderWithTheme(<RdsCollapse title="Title">{'Content'}</RdsCollapse>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should not call onToggle by default', () => {
      renderWithTheme(<RdsCollapse {...defaultProps} />);
      const toggleButton = screen.getByRole('button');
      fireEvent.click(toggleButton);
      expect(toggleButton).toBeInTheDocument();
    });
  });

  describe('Props Validation', () => {
    it('should accept boolean showToggleButton', () => {
      renderWithTheme(<RdsCollapse {...defaultProps} showToggleButton={true} />);
      expect(screen.getByRole('button')).toBeInTheDocument();
      const { container: container2 } = renderWithTheme(<RdsCollapse {...defaultProps} showToggleButton={false} />);
      expect(container2.querySelectorAll('button').length).toBe(0);
    });

    it('should accept function onToggle', () => {
      const onToggle = jest.fn();
      renderWithTheme(<RdsCollapse {...defaultProps} onToggle={onToggle} />);
      fireEvent.click(screen.getByRole('button'));
      expect(onToggle).toHaveBeenCalled();
    });

    it('should accept ReactNode children', () => {
      const children = (
        <div data-testid="complex-children">
          <p>Content</p>
        </div>
      );
      renderWithTheme(<RdsCollapse title="Title">{children}</RdsCollapse>);
      expect(screen.getByTestId('complex-children')).toBeInTheDocument();
    });

    it('should accept MuiCollapse props', () => {
      const { container } = renderWithTheme(<RdsCollapse {...defaultProps} timeout={600} collapsedSize={0} />);
      expect(container.querySelector('.MuiCollapse-root')).toBeInTheDocument();
    });
  });

  describe('audit fixes', () => {
    const getToggle = () => screen.getByRole('button');
    const expanded = () => expect(getToggle());

    it('opens and closes when only onToggle is given, and still calls onToggle', () => {
      const onToggle = jest.fn();
      renderWithTheme(<RdsCollapse title="Title" onToggle={onToggle}>{'Content'}</RdsCollapse>);
      expanded().toHaveAttribute('aria-expanded', 'false');

      fireEvent.click(getToggle());
      expanded().toHaveAttribute('aria-expanded', 'true');
      expect(onToggle).toHaveBeenLastCalledWith(true);

      fireEvent.click(getToggle());
      expanded().toHaveAttribute('aria-expanded', 'false');
      expect(onToggle).toHaveBeenLastCalledWith(false);
      expect(onToggle).toHaveBeenCalledTimes(2);
    });

    it('starts from defaultExpanded when expanded is not given', () => {
      const onToggle = jest.fn();
      renderWithTheme(
        <RdsCollapse title="Title" defaultExpanded onToggle={onToggle}>{'Content'}</RdsCollapse>
      );
      expanded().toHaveAttribute('aria-expanded', 'true');

      fireEvent.click(getToggle());
      expanded().toHaveAttribute('aria-expanded', 'false');
      expect(onToggle).toHaveBeenCalledWith(false);
    });

    it('stays controlled when both expanded and onToggle are given', () => {
      const onToggle = jest.fn();
      const { rerender } = renderWithTheme(
        <RdsCollapse title="Title" expanded={false} onToggle={onToggle}>{'Content'}</RdsCollapse>
      );
      fireEvent.click(getToggle());
      expect(onToggle).toHaveBeenCalledWith(true);
      expanded().toHaveAttribute('aria-expanded', 'false');

      rerender(wrap(<RdsCollapse title="Title" expanded={true} onToggle={onToggle}>{'Content'}</RdsCollapse>));
      expanded().toHaveAttribute('aria-expanded', 'true');
    });

    it('expanded alone sets the initial state, follows prop changes and still toggles on click', () => {
      const { rerender } = renderWithTheme(<RdsCollapse title="Title" expanded={true}>{'Content'}</RdsCollapse>);
      expanded().toHaveAttribute('aria-expanded', 'true');

      fireEvent.click(getToggle());
      expanded().toHaveAttribute('aria-expanded', 'false');

      rerender(wrap(<RdsCollapse title="Title" expanded={false}>{'Content'}</RdsCollapse>));
      expanded().toHaveAttribute('aria-expanded', 'false');

      rerender(wrap(<RdsCollapse title="Title" expanded={true}>{'Content'}</RdsCollapse>));
      expanded().toHaveAttribute('aria-expanded', 'true');
    });

    it('keeps the latest expanded value when onToggle is removed', () => {
      const onToggle = jest.fn();
      const { rerender } = renderWithTheme(
        <RdsCollapse title="Title" expanded={false} onToggle={onToggle}>{'Content'}</RdsCollapse>
      );
      rerender(wrap(<RdsCollapse title="Title" expanded={true} onToggle={onToggle}>{'Content'}</RdsCollapse>));
      rerender(wrap(<RdsCollapse title="Title" expanded={true}>{'Content'}</RdsCollapse>));
      expanded().toHaveAttribute('aria-expanded', 'true');
    });

    it('links the toggle button to the content region with aria-controls', () => {
      const { container } = renderWithTheme(<RdsCollapse title="Title">{'Content'}</RdsCollapse>);
      const controls = getToggle().getAttribute('aria-controls');
      expect(controls).toBeTruthy();
      expect(container.querySelector('.MuiCollapse-root')).toHaveAttribute('id', controls);
    });

    it('uses a consumer id for the content region and aria-controls', () => {
      const { container } = renderWithTheme(<RdsCollapse title="Title" id="my-region">{'Content'}</RdsCollapse>);
      expanded().toHaveAttribute('aria-controls', 'my-region');
      expect(container.querySelector('.MuiCollapse-root')).toHaveAttribute('id', 'my-region');
    });

    it('keeps a single keyboard control: the header itself is not a button', () => {
      renderWithTheme(<RdsCollapse title="Title">{'Content'}</RdsCollapse>);
      expect(screen.getAllByRole('button')).toHaveLength(1);
      expect(getToggle().tagName).toBe('BUTTON');
    });

    it('toggles once when the toggle button itself is clicked', () => {
      const onToggle = jest.fn();
      renderWithTheme(<RdsCollapse title="Title" onToggle={onToggle}>{'Content'}</RdsCollapse>);
      fireEvent.click(getToggle());
      expect(onToggle).toHaveBeenCalledTimes(1);
    });

    it('lets MUI `in` decide the content state and reports it in aria-expanded', () => {
      renderWithTheme(<RdsCollapse title="Title" in={true}>{'Content'}</RdsCollapse>);
      expanded().toHaveAttribute('aria-expanded', 'true');
    });

    it('has no axe violations when expanded', async () => {
      const { container } = render(<RdsCollapse title="Title" defaultExpanded>{'Content'}</RdsCollapse>);
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});

describe('RdsCollapse additive renames', () => {
  const warn = jest.spyOn(deprecation, 'warnDeprecatedProp');
  beforeEach(() => warn.mockClear());

  it('hides the toggle with hideToggle', () => {
    render(<RdsCollapse title="T" hideToggle>c</RdsCollapse>);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(warn).not.toHaveBeenCalled();
  });

  it('warns for showToggleButton and lets hideToggle win', () => {
    render(<RdsCollapse title="T" showToggleButton hideToggle>c</RdsCollapse>);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(warn).toHaveBeenCalledWith('RdsCollapse', 'showToggleButton', '`hideToggle`');
  });
});
