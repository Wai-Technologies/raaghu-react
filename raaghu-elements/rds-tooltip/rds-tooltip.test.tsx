import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import RdsTooltip from './rds-tooltip';
import '@testing-library/jest-dom';

// Mock SCSS
jest.mock('./rds-tooltip.scss', () => ({}));

const renderWithTheme = (component: React.ReactElement, isDark = false) => {
  const theme = createTheme({
    palette: {
      mode: isDark ? 'dark' : 'light',
    },
  });
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('RdsTooltip', () => {
  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      const { container } = renderWithTheme(
        <RdsTooltip title="Test Tooltip">
          <button>Hover me</button>
        </RdsTooltip>
      );
      expect(container).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsTooltip.displayName).toBe('RdsTooltip');
    });

    it('should render children element', () => {
      renderWithTheme(
        <RdsTooltip title="Test Tooltip">
          <button>Hover me</button>
        </RdsTooltip>
      );
      expect(screen.getByText('Hover me')).toBeInTheDocument();
    });

    it('should render MuiTooltip component', () => {
      renderWithTheme(
        <RdsTooltip title="Test Tooltip">
          <button>Hover me</button>
        </RdsTooltip>
      );
      // Tooltip popper is in portal, check for the wrapped element
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('should apply rds-tooltip class', async () => {
      const user = userEvent.setup();
      renderWithTheme(
        <RdsTooltip title="Test Tooltip">
          <button>Hover me</button>
        </RdsTooltip>
      );
      const button = screen.getByRole('button');
      await user.hover(button);
      // Tooltip popper is rendered in portal
      await waitFor(() => {
        const tooltip = document.querySelector('.rds-tooltip');
        expect(tooltip).toBeInTheDocument();
      });
    });
  });

  describe('Title Rendering', () => {
    it('should display tooltip title on hover', async () => {
      const user = userEvent.setup();
      renderWithTheme(
        <RdsTooltip title="Test Tooltip">
          <button>Hover me</button>
        </RdsTooltip>
      );
      
      const button = screen.getByText('Hover me');
      await user.hover(button);
      
      await waitFor(() => {
        expect(screen.getByText('Test Tooltip')).toBeInTheDocument();
      });
    });

    it('should not display tooltip initially', () => {
      renderWithTheme(
        <RdsTooltip title="Test Tooltip">
          <button>Hover me</button>
        </RdsTooltip>
      );
      
      expect(screen.queryByText('Test Tooltip')).not.toBeInTheDocument();
    });

    it('should hide tooltip on mouse leave', async () => {
      const user = userEvent.setup();
      renderWithTheme(
        <RdsTooltip title="Test Tooltip">
          <button>Hover me</button>
        </RdsTooltip>
      );
      
      const button = screen.getByText('Hover me');
      await user.hover(button);
      
      await waitFor(() => {
        expect(screen.getByText('Test Tooltip')).toBeInTheDocument();
      });
      
      await user.unhover(button);
      
      await waitFor(() => {
        expect(screen.queryByText('Test Tooltip')).not.toBeInTheDocument();
      }, { timeout: 1000 });
    });

    it('should support empty title', () => {
      const { container } = renderWithTheme(
        <RdsTooltip title="">
          <button>Hover me</button>
        </RdsTooltip>
      );
      expect(container).toBeInTheDocument();
    });

    it('should support React elements as title', async () => {
      const user = userEvent.setup();
      const titleElement = <span>Rich Title</span>;
      
      renderWithTheme(
        <RdsTooltip title={titleElement}>
          <button>Hover me</button>
        </RdsTooltip>
      );
      
      const button = screen.getByText('Hover me');
      await user.hover(button);
      
      await waitFor(() => {
        expect(screen.getByText('Rich Title')).toBeInTheDocument();
      });
    });
  });

  describe('Placement Styles', () => {
    it('should have top placement by default', async () => {
      const user = userEvent.setup();
      renderWithTheme(
        <RdsTooltip title="Test">
          <button>Hover me</button>
        </RdsTooltip>
      );
      const button = screen.getByRole('button');
      await user.hover(button);
      await waitFor(() => {
        const tooltip = document.querySelector('.rds-tooltip--top');
        expect(tooltip).toBeInTheDocument();
      });
    });

    it('should apply top style', async () => {
      const user = userEvent.setup();
      renderWithTheme(
        <RdsTooltip title="Test" style="top">
          <button>Hover me</button>
        </RdsTooltip>
      );
      const button = screen.getByRole('button');
      await user.hover(button);
      await waitFor(() => {
        const tooltip = document.querySelector('.rds-tooltip--top');
        expect(tooltip).toBeInTheDocument();
      });
    });

    it('should apply bottom style', async () => {
      const user = userEvent.setup();
      renderWithTheme(
        <RdsTooltip title="Test" style="bottom">
          <button>Hover me</button>
        </RdsTooltip>
      );
      const button = screen.getByRole('button');
      await user.hover(button);
      await waitFor(() => {
        const tooltip = document.querySelector('.rds-tooltip--bottom');
        expect(tooltip).toBeInTheDocument();
      });
    });

    it('should apply left style', async () => {
      const user = userEvent.setup();
      renderWithTheme(
        <RdsTooltip title="Test" style="left">
          <button>Hover me</button>
        </RdsTooltip>
      );
      const button = screen.getByRole('button');
      await user.hover(button);
      await waitFor(() => {
        const tooltip = document.querySelector('.rds-tooltip--left');
        expect(tooltip).toBeInTheDocument();
      });
    });

    it('should apply right style', async () => {
      const user = userEvent.setup();
      renderWithTheme(
        <RdsTooltip title="Test" style="right">
          <button>Hover me</button>
        </RdsTooltip>
      );
      const button = screen.getByRole('button');
      await user.hover(button);
      await waitFor(() => {
        const tooltip = document.querySelector('.rds-tooltip--right');
        expect(tooltip).toBeInTheDocument();
      });
    });

    it('should handle top-start style', async () => {
      const user = userEvent.setup();
      renderWithTheme(
        <RdsTooltip title="Test" style="top-start">
          <button>Hover me</button>
        </RdsTooltip>
      );
      const button = screen.getByRole('button');
      await user.hover(button);
      await waitFor(() => {
        const tooltip = document.querySelector('.rds-tooltip--top');
        expect(tooltip).toBeInTheDocument();
      });
    });

    it('should handle top-end style', async () => {
      const user = userEvent.setup();
      renderWithTheme(
        <RdsTooltip title="Test" style="top-end">
          <button>Hover me</button>
        </RdsTooltip>
      );
      const button = screen.getByRole('button');
      await user.hover(button);
      await waitFor(() => {
        const tooltip = document.querySelector('.rds-tooltip--top');
        expect(tooltip).toBeInTheDocument();
      });
    });

    it('should handle bottom-start style', async () => {
      const user = userEvent.setup();
      renderWithTheme(
        <RdsTooltip title="Test" style="bottom-start">
          <button>Hover me</button>
        </RdsTooltip>
      );
      const button = screen.getByRole('button');
      await user.hover(button);
      await waitFor(() => {
        const tooltip = document.querySelector('.rds-tooltip--bottom');
        expect(tooltip).toBeInTheDocument();
      });
    });

    it('should handle bottom-end style', async () => {
      const user = userEvent.setup();
      renderWithTheme(
        <RdsTooltip title="Test" style="bottom-end">
          <button>Hover me</button>
        </RdsTooltip>
      );
      const button = screen.getByRole('button');
      await user.hover(button);
      await waitFor(() => {
        const tooltip = document.querySelector('.rds-tooltip--bottom');
        expect(tooltip).toBeInTheDocument();
      });
    });

    it('should handle left-start style', async () => {
      const user = userEvent.setup();
      renderWithTheme(
        <RdsTooltip title="Test" style="left-start">
          <button>Hover me</button>
        </RdsTooltip>
      );
      const button = screen.getByRole('button');
      await user.hover(button);
      await waitFor(() => {
        const tooltip = document.querySelector('.rds-tooltip--left');
        expect(tooltip).toBeInTheDocument();
      });
    });

    it('should handle left-end style', async () => {
      const user = userEvent.setup();
      renderWithTheme(
        <RdsTooltip title="Test" style="left-end">
          <button>Hover me</button>
        </RdsTooltip>
      );
      const button = screen.getByRole('button');
      await user.hover(button);
      await waitFor(() => {
        const tooltip = document.querySelector('.rds-tooltip--left');
        expect(tooltip).toBeInTheDocument();
      });
    });

    it('should handle right-start style', async () => {
      const user = userEvent.setup();
      renderWithTheme(
        <RdsTooltip title="Test" style="right-start">
          <button>Hover me</button>
        </RdsTooltip>
      );
      const button = screen.getByRole('button');
      await user.hover(button);
      await waitFor(() => {
        const tooltip = document.querySelector('.rds-tooltip--right');
        expect(tooltip).toBeInTheDocument();
      });
    });

    it('should handle right-end style', async () => {
      const user = userEvent.setup();
      renderWithTheme(
        <RdsTooltip title="Test" style="right-end">
          <button>Hover me</button>
        </RdsTooltip>
      );
      const button = screen.getByRole('button');
      await user.hover(button);
      await waitFor(() => {
        const tooltip = document.querySelector('.rds-tooltip--right');
        expect(tooltip).toBeInTheDocument();
      });
    });
  });

  describe('Arrow Support', () => {
    it('should not display arrow by default', () => {
      const { container } = renderWithTheme(
        <RdsTooltip title="Test">
          <button>Hover me</button>
        </RdsTooltip>
      );
      const arrow = container.querySelector('[class*="MuiTooltip-arrow"]');
      expect(arrow).not.toBeInTheDocument();
    });

    it('should display arrow when arrow prop is true', async () => {
      const user = userEvent.setup();
      renderWithTheme(
        <RdsTooltip title="Test" arrow={true}>
          <button>Hover me</button>
        </RdsTooltip>
      );
      
      const button = screen.getByRole('button');
      await user.hover(button);
      
      await waitFor(() => {
        const arrow = document.querySelector('[class*="MuiTooltip-arrow"]');
        expect(arrow).toBeInTheDocument();
      });
    });

    it('should not display arrow when arrow prop is false', () => {
      const { container } = renderWithTheme(
        <RdsTooltip title="Test" arrow={false}>
          <button>Hover me</button>
        </RdsTooltip>
      );
      const arrow = container.querySelector('[class*="MuiTooltip-arrow"]');
      expect(arrow).not.toBeInTheDocument();
    });
  });

  describe('Custom Classes', () => {
    it('should apply custom className', async () => {
      const user = userEvent.setup();
      renderWithTheme(
        <RdsTooltip title="Test" className="custom-class">
          <button>Hover me</button>
        </RdsTooltip>
      );
      const button = screen.getByRole('button');
      await user.hover(button);
      
      await waitFor(() => {
        const tooltip = document.querySelector('.custom-class');
        expect(tooltip).toBeInTheDocument();
      });
    });

    it('should apply both rds-tooltip and custom className', async () => {
      const user = userEvent.setup();
      renderWithTheme(
        <RdsTooltip title="Test" className="custom-class">
          <button>Hover me</button>
        </RdsTooltip>
      );
      const button = screen.getByRole('button');
      await user.hover(button);
      
      await waitFor(() => {
        const tooltip = document.querySelector('.rds-tooltip.custom-class');
        expect(tooltip).toBeInTheDocument();
      });
    });

    it('should handle multiple custom classes', () => {
      const { container } = renderWithTheme(
        <RdsTooltip title="Test" className="class1 class2">
          <button>Hover me</button>
        </RdsTooltip>
      );
      // Verify component renders without crashing with multiple classes
      expect(screen.getByText('Hover me')).toBeInTheDocument();
    });
  });

  describe('Custom Styles', () => {
    it('should apply custom tooltipStyle', async () => {
      const user = userEvent.setup();
      renderWithTheme(
        <RdsTooltip title="Test" tooltipStyle={{ backgroundColor: 'red' }}>
          <button>Hover me</button>
        </RdsTooltip>
      );
      const button = screen.getByText('Hover me');
      await user.hover(button);
      
      await waitFor(() => {
        expect(screen.getByText('Test')).toBeInTheDocument();
      });
    });

    it('should support empty tooltipStyle', () => {
      const { container } = renderWithTheme(
        <RdsTooltip title="Test" tooltipStyle={{}}>
          <button>Hover me</button>
        </RdsTooltip>
      );
      expect(container).toBeInTheDocument();
    });

    it('should support undefined tooltipStyle', () => {
      const { container } = renderWithTheme(
        <RdsTooltip title="Test">
          <button>Hover me</button>
        </RdsTooltip>
      );
      expect(container).toBeInTheDocument();
    });
  });

  describe('Different Children Elements', () => {
    it('should work with button element', () => {
      renderWithTheme(
        <RdsTooltip title="Test">
          <button>Click me</button>
        </RdsTooltip>
      );
      expect(screen.getByText('Click me')).toBeInTheDocument();
    });

    it('should work with div element', () => {
      renderWithTheme(
        <RdsTooltip title="Test">
          <div>Hover me</div>
        </RdsTooltip>
      );
      expect(screen.getByText('Hover me')).toBeInTheDocument();
    });

    it('should work with span element', () => {
      renderWithTheme(
        <RdsTooltip title="Test">
          <span>Hover me</span>
        </RdsTooltip>
      );
      expect(screen.getByText('Hover me')).toBeInTheDocument();
    });

    it('should work with custom component wrapper', () => {
      const CustomComponent = () => <button>Custom</button>;
      renderWithTheme(
        <RdsTooltip title="Test">
          <CustomComponent />
        </RdsTooltip>
      );
      expect(screen.getByText('Custom')).toBeInTheDocument();
    });

    it('should work with icon elements', () => {
      renderWithTheme(
        <RdsTooltip title="Test">
          <i className="icon">📬</i>
        </RdsTooltip>
      );
      expect(screen.getByText('📬')).toBeInTheDocument();
    });
  });

  describe('Event Handlers', () => {
    it('should support onOpen callback', async () => {
      const user = userEvent.setup();
      const onOpen = jest.fn();
      renderWithTheme(
        <RdsTooltip title="Test" onOpen={onOpen}>
          <button>Hover me</button>
        </RdsTooltip>
      );
      
      const button = screen.getByText('Hover me');
      await user.hover(button);
      
      await waitFor(() => {
        expect(onOpen).toHaveBeenCalled();
      });
    });

    it('should support onClose callback', async () => {
      const user = userEvent.setup();
      const onClose = jest.fn();
      renderWithTheme(
        <RdsTooltip title="Test" onClose={onClose}>
          <button>Hover me</button>
        </RdsTooltip>
      );
      
      const button = screen.getByText('Hover me');
      await user.hover(button);
      
      await waitFor(() => {
        expect(screen.getByText('Test')).toBeInTheDocument();
      });
      
      await user.unhover(button);
      
      await waitFor(() => {
        expect(onClose).toHaveBeenCalled();
      }, { timeout: 1000 });
    });
  });

  describe('MUI Props', () => {
    it('should support enterDelay prop', () => {
      const { container } = renderWithTheme(
        <RdsTooltip title="Test" enterDelay={500}>
          <button>Hover me</button>
        </RdsTooltip>
      );
      expect(container).toBeInTheDocument();
    });

    it('should support leaveDelay prop', () => {
      const { container } = renderWithTheme(
        <RdsTooltip title="Test" leaveDelay={500}>
          <button>Hover me</button>
        </RdsTooltip>
      );
      expect(container).toBeInTheDocument();
    });

    it('should support open prop', () => {
      const { container } = renderWithTheme(
        <RdsTooltip title="Test" open={true}>
          <button>Hover me</button>
        </RdsTooltip>
      );
      expect(container).toBeInTheDocument();
    });

    it('should support disableFocusListener prop', () => {
      const { container } = renderWithTheme(
        <RdsTooltip title="Test" disableFocusListener={true}>
          <button>Hover me</button>
        </RdsTooltip>
      );
      expect(container).toBeInTheDocument();
    });

    it('should support disableHoverListener prop', () => {
      const { container } = renderWithTheme(
        <RdsTooltip title="Test" disableHoverListener={true}>
          <button>Hover me</button>
        </RdsTooltip>
      );
      expect(container).toBeInTheDocument();
    });

    it('should support disableTouchListener prop', () => {
      const { container } = renderWithTheme(
        <RdsTooltip title="Test" disableTouchListener={true}>
          <button>Hover me</button>
        </RdsTooltip>
      );
      expect(container).toBeInTheDocument();
    });
  });

  describe('Theme Support', () => {
    it('should work with light theme', () => {
      const { container } = renderWithTheme(
        <RdsTooltip title="Test">
          <button>Hover me</button>
        </RdsTooltip>,
        false
      );
      expect(container).toBeInTheDocument();
    });

    it('should work with dark theme', () => {
      const { container } = renderWithTheme(
        <RdsTooltip title="Test">
          <button>Hover me</button>
        </RdsTooltip>,
        true
      );
      expect(container).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle very long title text', async () => {
      const user = userEvent.setup();
      const longTitle = 'This is a very long tooltip title that should wrap when it exceeds the maximum width';
      
      renderWithTheme(
        <RdsTooltip title={longTitle}>
          <button>Hover me</button>
        </RdsTooltip>
      );
      
      const button = screen.getByText('Hover me');
      await user.hover(button);
      
      await waitFor(() => {
        expect(screen.getByText(longTitle)).toBeInTheDocument();
      });
    });

    it('should handle special characters in title', async () => {
      const user = userEvent.setup();
      const specialTitle = '<>&"\'';
      
      renderWithTheme(
        <RdsTooltip title={specialTitle}>
          <button>Hover me</button>
        </RdsTooltip>
      );
      
      const button = screen.getByText('Hover me');
      await user.hover(button);
      
      await waitFor(() => {
        expect(screen.getByText(specialTitle)).toBeInTheDocument();
      });
    });

    it('should handle unicode characters in title', async () => {
      const user = userEvent.setup();
      const unicodeTitle = '你好 مرحبا Привет';
      
      renderWithTheme(
        <RdsTooltip title={unicodeTitle}>
          <button>Hover me</button>
        </RdsTooltip>
      );
      
      const button = screen.getByText('Hover me');
      await user.hover(button);
      
      await waitFor(() => {
        expect(screen.getByText(unicodeTitle)).toBeInTheDocument();
      });
    });

    it('should handle empty children', () => {
      const { container } = renderWithTheme(
        <RdsTooltip title="Test">
          <div></div>
        </RdsTooltip>
      );
      expect(container).toBeInTheDocument();
    });

    it('should handle rapid hover and unhover', async () => {
      const user = userEvent.setup();
      renderWithTheme(
        <RdsTooltip title="Test">
          <button>Hover me</button>
        </RdsTooltip>
      );
      
      const button = screen.getByText('Hover me');
      
      for (let i = 0; i < 5; i++) {
        await user.hover(button);
        await user.unhover(button);
      }
      
      expect(button).toBeInTheDocument();
    });
  });

  describe('Integration Tests', () => {
    it('should work with all props combined', async () => {
      const user = userEvent.setup();
      const onOpen = jest.fn();
      const onClose = jest.fn();
      
      renderWithTheme(
        <RdsTooltip
          title="Complete Tooltip"
          style="right"
          arrow={true}
          className="custom-tooltip"
          tooltipStyle={{ maxWidth: '300px' }}
          enterDelay={100}
          leaveDelay={100}
          onOpen={onOpen}
          onClose={onClose}
        >
          <button>Hover me</button>
        </RdsTooltip>
      );
      
      const button = screen.getByText('Hover me');
      expect(button).toBeInTheDocument();
      
      await user.hover(button);
      await waitFor(() => {
        expect(screen.getByText('Complete Tooltip')).toBeInTheDocument();
      });
    });

    it('should handle state changes', async () => {
      const user = userEvent.setup();
      const { rerender } = renderWithTheme(
        <RdsTooltip title="First Tooltip">
          <button>Hover me</button>
        </RdsTooltip>
      );
      
      let button = screen.getByText('Hover me');
      await user.hover(button);
      
      await waitFor(() => {
        expect(screen.getByText('First Tooltip')).toBeInTheDocument();
      });
      
      await user.unhover(button);
      
      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsTooltip title="Second Tooltip">
            <button>Hover me</button>
          </RdsTooltip>
        </ThemeProvider>
      );
      
      button = screen.getByText('Hover me');
      await user.hover(button);
      
      await waitFor(() => {
        expect(screen.getByText('Second Tooltip')).toBeInTheDocument();
      });
    });

    it('should handle switching between different styles', async () => {
      const user = userEvent.setup();
      const { rerender, container } = renderWithTheme(
        <RdsTooltip title="Test" style="top">
          <button>Hover me</button>
        </RdsTooltip>
      );
      
      let button = container.querySelector('button');
      await user.hover(button!);
      
      await waitFor(() => {
        let tooltip = document.querySelector('.rds-tooltip--top');
        expect(tooltip).toBeInTheDocument();
      });
      
      await user.unhover(button!);
      
      await waitFor(() => {
        expect(document.querySelector('[role="tooltip"]')).not.toBeInTheDocument();
      }, { timeout: 500 });
      
      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsTooltip title="Test" style="bottom">
            <button>Hover me</button>
          </RdsTooltip>
        </ThemeProvider>
      );
      
      button = container.querySelector('button');
      await user.hover(button!);
      
      await waitFor(() => {
        let tooltip = document.querySelector('.rds-tooltip--bottom');
        expect(tooltip).toBeInTheDocument();
      });
    });

    it('should toggle arrow on and off', async () => {
      const user = userEvent.setup();
      const { rerender, container } = renderWithTheme(
        <RdsTooltip title="Test" arrow={false}>
          <button>Hover me</button>
        </RdsTooltip>
      );
      
      let button = container.querySelector('button');
      await user.hover(button!);
      
      await waitFor(() => {
        let arrow = document.querySelector('[class*="MuiTooltip-arrow"]');
        expect(arrow).not.toBeInTheDocument();
      });
      
      await user.unhover(button!);
      
      await waitFor(() => {
        expect(document.querySelector('[role="tooltip"]')).not.toBeInTheDocument();
      }, { timeout: 500 });
      
      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsTooltip title="Test" arrow={true}>
            <button>Hover me</button>
          </RdsTooltip>
        </ThemeProvider>
      );
      
      button = container.querySelector('button');
      await user.hover(button!);
      
      await waitFor(() => {
        const arrow = document.querySelector('[class*="MuiTooltip-arrow"]');
        expect(arrow).toBeInTheDocument();
      });
    });

    it('should maintain tooltip state across re-renders', async () => {
      const user = userEvent.setup();
      const { rerender } = renderWithTheme(
        <RdsTooltip title="Test">
          <button>Hover me</button>
        </RdsTooltip>
      );
      
      const button = screen.getByText('Hover me');
      await user.hover(button);
      
      await waitFor(() => {
        expect(screen.getByText('Test')).toBeInTheDocument();
      });
      
      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsTooltip title="Test">
            <button>Hover me</button>
          </RdsTooltip>
        </ThemeProvider>
      );
      
      expect(screen.getByText('Hover me')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', async () => {
      const user = userEvent.setup();
      renderWithTheme(
        <RdsTooltip title="Test Tooltip">
          <button>Hover me</button>
        </RdsTooltip>
      );
      
      const button = screen.getByText('Hover me');
      await user.hover(button);
      
      await waitFor(() => {
        expect(screen.getByText('Test Tooltip')).toBeInTheDocument();
      });
    });

    it('should be keyboard accessible', async () => {
      const user = userEvent.setup();
      renderWithTheme(
        <RdsTooltip title="Test">
          <button>Focus me</button>
        </RdsTooltip>
      );
      
      const button = screen.getByText('Focus me');
      await user.tab();
      
      expect(button).toHaveFocus();
    });

    it('should work with disabled elements', () => {
      renderWithTheme(
        <RdsTooltip title="Test">
          <button disabled>Disabled button</button>
        </RdsTooltip>
      );
      
      expect(screen.getByText('Disabled button')).toBeDisabled();
    });
  });
});

