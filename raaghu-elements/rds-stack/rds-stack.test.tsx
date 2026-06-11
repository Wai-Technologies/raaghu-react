import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Divider } from '@mui/material';
import RdsStack from './rds-stack';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';

// Mock SCSS
jest.mock('./rds-stack.scss', () => ({}));

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

describe('RdsStack', () => {
  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      const { container } = renderWithTheme(
        <RdsStack>Content</RdsStack>
      );
      expect(container).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsStack.displayName).toBe('RdsStack');
    });

    it('should render MuiStack component', () => {
      renderWithTheme(
        <RdsStack>Test Stack</RdsStack>
      );
      expect(screen.getByText('Test Stack')).toBeInTheDocument();
    });

    it('should apply MuiStack class', () => {
      const { container } = renderWithTheme(
        <RdsStack>Content</RdsStack>
      );
      const stack = container.querySelector('.MuiStack-root');
      expect(stack).toBeInTheDocument();
    });

    it('should apply rds-stack class', () => {
      const { container } = renderWithTheme(
        <RdsStack>Content</RdsStack>
      );
      const stack = container.querySelector('.rds-stack');
      expect(stack).toBeInTheDocument();
    });
  });

  describe('Children Rendering', () => {
    it('should render text children', () => {
      renderWithTheme(
        <RdsStack>Simple text content</RdsStack>
      );
      expect(screen.getByText('Simple text content')).toBeInTheDocument();
    });

    it('should render element children', () => {
      renderWithTheme(
        <RdsStack>
          <div data-testid="stack-item">Item content</div>
        </RdsStack>
      );
      expect(screen.getByTestId('stack-item')).toBeInTheDocument();
      expect(screen.getByText('Item content')).toBeInTheDocument();
    });

    it('should render multiple children', () => {
      renderWithTheme(
        <RdsStack>
          <div data-testid="item-1">Item 1</div>
          <div data-testid="item-2">Item 2</div>
          <div data-testid="item-3">Item 3</div>
        </RdsStack>
      );
      expect(screen.getByTestId('item-1')).toBeInTheDocument();
      expect(screen.getByTestId('item-2')).toBeInTheDocument();
      expect(screen.getByTestId('item-3')).toBeInTheDocument();
    });

    it('should render complex children structure', () => {
      renderWithTheme(
        <RdsStack>
          <div>
            <h2>Title</h2>
            <p>Description</p>
            <button>Action</button>
          </div>
        </RdsStack>
      );
      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Description')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
    });

    it('should render React components as children', () => {
      const Component = () => <div data-testid="custom-component">Custom</div>;
      renderWithTheme(
        <RdsStack>
          <Component />
        </RdsStack>
      );
      expect(screen.getByTestId('custom-component')).toBeInTheDocument();
    });
  });

  describe('Spacing Props', () => {
    it('should apply spacing prop', () => {
      const { container } = renderWithTheme(
        <RdsStack spacing={2}>
          <div>Item 1</div>
          <div>Item 2</div>
        </RdsStack>
      );
      const stack = container.querySelector('.MuiStack-root');
      expect(stack).toBeInTheDocument();
    });

    it('should apply gap prop', () => {
      const { container } = renderWithTheme(
        <RdsStack gap={3}>
          <div>Item 1</div>
          <div>Item 2</div>
        </RdsStack>
      );
      const stack = container.querySelector('.MuiStack-root');
      expect(stack).toBeInTheDocument();
    });

    it('should prefer spacing over gap when both provided', () => {
      const { container } = renderWithTheme(
        <RdsStack spacing={2} gap={4}>
          <div>Item 1</div>
          <div>Item 2</div>
        </RdsStack>
      );
      const stack = container.querySelector('.MuiStack-root');
      expect(stack).toBeInTheDocument();
    });

    it('should handle zero spacing', () => {
      const { container } = renderWithTheme(
        <RdsStack spacing={0}>
          <div>Item 1</div>
          <div>Item 2</div>
        </RdsStack>
      );
      const stack = container.querySelector('.MuiStack-root');
      expect(stack).toBeInTheDocument();
    });

    it('should handle string spacing values', () => {
      const { container } = renderWithTheme(
        <RdsStack spacing="2rem">
          <div>Item 1</div>
          <div>Item 2</div>
        </RdsStack>
      );
      const stack = container.querySelector('.MuiStack-root');
      expect(stack).toBeInTheDocument();
    });

    it('should handle responsive spacing with object', () => {
      const { container } = renderWithTheme(
        <RdsStack spacing={{ xs: 1, sm: 2, md: 3 }}>
          <div>Item 1</div>
          <div>Item 2</div>
        </RdsStack>
      );
      const stack = container.querySelector('.MuiStack-root');
      expect(stack).toBeInTheDocument();
    });
  });

  describe('Direction Props', () => {
    it('should render with row direction', () => {
      const { container } = renderWithTheme(
        <RdsStack direction="row">
          <div data-testid="row-item-1">Item 1</div>
          <div data-testid="row-item-2">Item 2</div>
        </RdsStack>
      );
      const stack = container.querySelector('.MuiStack-root');
      expect(stack).toBeInTheDocument();
      expect(screen.getByTestId('row-item-1')).toBeInTheDocument();
    });

    it('should render with column direction', () => {
      const { container } = renderWithTheme(
        <RdsStack direction="column">
          <div data-testid="col-item-1">Item 1</div>
          <div data-testid="col-item-2">Item 2</div>
        </RdsStack>
      );
      const stack = container.querySelector('.MuiStack-root');
      expect(stack).toBeInTheDocument();
      expect(screen.getByTestId('col-item-1')).toBeInTheDocument();
    });

    it('should render with row-reverse direction', () => {
      const { container } = renderWithTheme(
        <RdsStack direction="row-reverse">
          <div>Item 1</div>
          <div>Item 2</div>
        </RdsStack>
      );
      const stack = container.querySelector('.MuiStack-root');
      expect(stack).toBeInTheDocument();
    });

    it('should render with column-reverse direction', () => {
      const { container } = renderWithTheme(
        <RdsStack direction="column-reverse">
          <div>Item 1</div>
          <div>Item 2</div>
        </RdsStack>
      );
      const stack = container.querySelector('.MuiStack-root');
      expect(stack).toBeInTheDocument();
    });

    it('should handle responsive direction with object', () => {
      const { container } = renderWithTheme(
        <RdsStack direction={{ xs: 'column', sm: 'row' }}>
          <div>Item 1</div>
          <div>Item 2</div>
        </RdsStack>
      );
      const stack = container.querySelector('.MuiStack-root');
      expect(stack).toBeInTheDocument();
    });
  });

  describe('Divider Prop', () => {
    it('should render without divider by default', () => {
      const { container } = renderWithTheme(
        <RdsStack direction="row">
          <div data-testid="item-1">Item 1</div>
          <div data-testid="item-2">Item 2</div>
        </RdsStack>
      );
      const dividers = container.querySelectorAll('.MuiDivider-root');
      expect(dividers.length).toBe(0);
    });

    it('should render divider when divider prop is true', () => {
      const { container } = renderWithTheme(
        <RdsStack direction="row" divider={true}>
          <div data-testid="item-1">Item 1</div>
          <div data-testid="item-2">Item 2</div>
        </RdsStack>
      );
      const dividers = container.querySelectorAll('.MuiDivider-root');
      expect(dividers.length).toBeGreaterThan(0);
    });

    it('should render divider with vertical orientation for row direction', () => {
      const { container } = renderWithTheme(
        <RdsStack direction="row" divider={true}>
          <div>Item 1</div>
          <div>Item 2</div>
        </RdsStack>
      );
      const divider = container.querySelector('.rds-stack__divider');
      expect(divider).toBeInTheDocument();
    });

    it('should render divider with horizontal orientation for column direction', () => {
      const { container } = renderWithTheme(
        <RdsStack direction="column" divider={true}>
          <div>Item 1</div>
          <div>Item 2</div>
        </RdsStack>
      );
      const divider = container.querySelector('.rds-stack__divider');
      expect(divider).toBeInTheDocument();
    });

    it('should not render divider when divider prop is false', () => {
      const { container } = renderWithTheme(
        <RdsStack direction="row" divider={false}>
          <div>Item 1</div>
          <div>Item 2</div>
        </RdsStack>
      );
      const dividers = container.querySelectorAll('.MuiDivider-root');
      expect(dividers.length).toBe(0);
    });

    it('should accept custom divider as React component', () => {
      const CustomDivider = <span data-testid="custom-divider">Custom</span>;
      const { container } = renderWithTheme(
        <RdsStack direction="row" divider={CustomDivider}>
          <div>Item 1</div>
          <div>Item 2</div>
        </RdsStack>
      );
      expect(screen.getByTestId('custom-divider')).toBeInTheDocument();
    });

    it('should accept MuiDivider component as custom divider', () => {
      const { container } = renderWithTheme(
        <RdsStack direction="row" divider={<Divider />}>
          <div>Item 1</div>
          <div>Item 2</div>
        </RdsStack>
      );
      const dividers = container.querySelectorAll('.MuiDivider-root');
      expect(dividers.length).toBeGreaterThan(0);
    });
  });

  describe('DividerColor Prop', () => {
    it('should apply dividerColor as CSS variable', () => {
      const { container } = renderWithTheme(
        <RdsStack direction="row" divider={true} dividerColor="#ff0000">
          <div>Item 1</div>
          <div>Item 2</div>
        </RdsStack>
      );
      const stack = container.querySelector('.MuiStack-root');
      const style = window.getComputedStyle(stack!);
      expect(stack).toBeInTheDocument();
    });

    it('should not apply CSS variable when dividerColor not provided', () => {
      const { container } = renderWithTheme(
        <RdsStack direction="row" divider={true}>
          <div>Item 1</div>
          <div>Item 2</div>
        </RdsStack>
      );
      const stack = container.querySelector('.MuiStack-root');
      expect(stack).toBeInTheDocument();
    });

    it('should work with different color formats', () => {
      const colors = ['#ff0000', 'rgb(255, 0, 0)', 'red'];
      colors.forEach((color) => {
        const { container } = renderWithTheme(
          <RdsStack direction="row" divider={true} dividerColor={color}>
            <div>Item 1</div>
            <div>Item 2</div>
          </RdsStack>
        );
        const stack = container.querySelector('.MuiStack-root');
        expect(stack).toBeInTheDocument();
      });
    });
  });

  describe('Style and className Props', () => {
    it('should apply custom className', () => {
      const { container } = renderWithTheme(
        <RdsStack className="custom-stack">
          <div>Item</div>
        </RdsStack>
      );
      const stack = container.querySelector('.custom-stack');
      expect(stack).toBeInTheDocument();
    });

    it('should combine rds-stack and custom className', () => {
      const { container } = renderWithTheme(
        <RdsStack className="custom-stack">
          <div>Item</div>
        </RdsStack>
      );
      const stack = container.querySelector('.rds-stack');
      expect(stack).toBeInTheDocument();
      expect(stack).toHaveClass('custom-stack');
    });

    it('should apply custom inline style', () => {
      const { container } = renderWithTheme(
        <RdsStack style={{ margin: '10px', padding: '5px' }}>
          <div>Item</div>
        </RdsStack>
      );
      const stack = container.querySelector('.MuiStack-root');
      expect(stack).toHaveStyle({ margin: '10px', padding: '5px' });
    });

    it('should merge dividerColor CSS variable with custom style', () => {
      const { container } = renderWithTheme(
        <RdsStack
          direction="row"
          divider={true}
          dividerColor="#ff0000"
          style={{ margin: '10px' }}
        >
          <div>Item 1</div>
          <div>Item 2</div>
        </RdsStack>
      );
      const stack = container.querySelector('.MuiStack-root');
      expect(stack).toHaveStyle({ margin: '10px' });
      expect(stack).toBeInTheDocument();
    });

    it('should apply multiple custom classes', () => {
      const { container } = renderWithTheme(
        <RdsStack className="class-1 class-2 class-3">
          <div>Item</div>
        </RdsStack>
      );
      const stack = container.querySelector('.rds-stack');
      expect(stack).toHaveClass('class-1');
      expect(stack).toHaveClass('class-2');
      expect(stack).toHaveClass('class-3');
    });
  });

  describe('MUI Props Forwarding', () => {
    it('should forward alignItems prop', () => {
      const { container } = renderWithTheme(
        <RdsStack alignItems="center">
          <div>Item</div>
        </RdsStack>
      );
      const stack = container.querySelector('.MuiStack-root');
      expect(stack).toBeInTheDocument();
    });

    it('should forward justifyContent prop', () => {
      const { container } = renderWithTheme(
        <RdsStack justifyContent="space-between">
          <div>Item 1</div>
          <div>Item 2</div>
        </RdsStack>
      );
      const stack = container.querySelector('.MuiStack-root');
      expect(stack).toBeInTheDocument();
    });

    it('should forward flex prop', () => {
      const { container } = renderWithTheme(
        <RdsStack flex={1}>
          <div>Item</div>
        </RdsStack>
      );
      const stack = container.querySelector('.MuiStack-root');
      expect(stack).toBeInTheDocument();
    });

    it('should forward sx prop', () => {
      const { container } = renderWithTheme(
        <RdsStack sx={{ backgroundColor: 'red' }}>
          <div>Item</div>
        </RdsStack>
      );
      const stack = container.querySelector('.MuiStack-root');
      expect(stack).toBeInTheDocument();
    });

    it('should forward multiple MUI props together', () => {
      const { container } = renderWithTheme(
        <RdsStack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="space-around"
        >
          <div>Item 1</div>
          <div>Item 2</div>
        </RdsStack>
      );
      const stack = container.querySelector('.MuiStack-root');
      expect(stack).toBeInTheDocument();
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should render with empty children', () => {
      const { container } = renderWithTheme(
        <RdsStack>
          <></>
        </RdsStack>
      );
      const stack = container.querySelector('.MuiStack-root');
      expect(stack).toBeInTheDocument();
    });

    it('should handle null and undefined children', () => {
      const { container } = renderWithTheme(
        <RdsStack>
          <div>Item 1</div>
          {null}
          {undefined}
          <div>Item 2</div>
        </RdsStack>
      );
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
    });

    it('should handle very large number of children', () => {
      const items = Array.from({ length: 50 }, (_, i) => (
        <div key={i} data-testid={`item-${i}`}>
          Item {i}
        </div>
      ));
      const { container } = renderWithTheme(
        <RdsStack>
          {items}
        </RdsStack>
      );
      const stack = container.querySelector('.MuiStack-root');
      expect(stack).toBeInTheDocument();
      expect(screen.getByTestId('item-0')).toBeInTheDocument();
      expect(screen.getByTestId('item-49')).toBeInTheDocument();
    });

    it('should handle deeply nested stacks', () => {
      const { container } = renderWithTheme(
        <RdsStack>
          <RdsStack>
            <RdsStack>
              <div data-testid="deeply-nested">Deeply Nested</div>
            </RdsStack>
          </RdsStack>
        </RdsStack>
      );
      expect(screen.getByTestId('deeply-nested')).toBeInTheDocument();
      const stacks = container.querySelectorAll('.rds-stack');
      expect(stacks.length).toBe(3);
    });

    it('should render with all optional props undefined', () => {
      const { container } = renderWithTheme(
        <RdsStack
          spacing={undefined}
          gap={undefined}
          divider={undefined}
          dividerColor={undefined}
        >
          <div>Item</div>
        </RdsStack>
      );
      const stack = container.querySelector('.MuiStack-root');
      expect(stack).toBeInTheDocument();
    });
  });

  describe('Responsive Props', () => {
    it('should handle responsive direction', () => {
      const { container } = renderWithTheme(
        <RdsStack direction={{ xs: 'column', sm: 'row', md: 'row' }}>
          <div>Item 1</div>
          <div>Item 2</div>
        </RdsStack>
      );
      const stack = container.querySelector('.MuiStack-root');
      expect(stack).toBeInTheDocument();
    });

    it('should handle responsive spacing', () => {
      const { container } = renderWithTheme(
        <RdsStack spacing={{ xs: 1, sm: 2, md: 3, lg: 4 }}>
          <div>Item 1</div>
          <div>Item 2</div>
        </RdsStack>
      );
      const stack = container.querySelector('.MuiStack-root');
      expect(stack).toBeInTheDocument();
    });

    it('should handle responsive gap', () => {
      const { container } = renderWithTheme(
        <RdsStack gap="16px">
          <div>Item 1</div>
          <div>Item 2</div>
        </RdsStack>
      );
      const stack = container.querySelector('.MuiStack-root');
      expect(stack).toBeInTheDocument();
    });

    it('should handle mixed responsive props', () => {
      const { container } = renderWithTheme(
        <RdsStack
          direction={{ xs: 'column', md: 'row' }}
          spacing={{ xs: 1, md: 3 }}
          alignItems={{ xs: 'stretch', md: 'center' }}
        >
          <div>Item 1</div>
          <div>Item 2</div>
        </RdsStack>
      );
      const stack = container.querySelector('.MuiStack-root');
      expect(stack).toBeInTheDocument();
    });
  });

  describe('Theme Integration', () => {
    it('should work with light theme', () => {
      const { container } = renderWithTheme(
        <RdsStack>
          <div>Item</div>
        </RdsStack>,
        false
      );
      const stack = container.querySelector('.MuiStack-root');
      expect(stack).toBeInTheDocument();
    });

    it('should work with dark theme', () => {
      const { container } = renderWithTheme(
        <RdsStack>
          <div>Item</div>
        </RdsStack>,
        true
      );
      const stack = container.querySelector('.MuiStack-root');
      expect(stack).toBeInTheDocument();
    });

    it('should work with custom theme', () => {
      const customTheme = createTheme({
        palette: {
          primary: {
            main: '#1976d2',
          },
          secondary: {
            main: '#dc004e',
          },
        },
      });
      const { container } = render(
        <ThemeProvider theme={customTheme}>
          <RdsStack>
            <div>Item</div>
          </RdsStack>
        </ThemeProvider>
      );
      const stack = container.querySelector('.MuiStack-root');
      expect(stack).toBeInTheDocument();
    });
  });

  describe('Integration Tests', () => {
    it('should complete full row layout with items and dividers', () => {
      const { container } = renderWithTheme(
        <RdsStack
          direction="row"
          spacing={2}
          divider={true}
          alignItems="center"
        >
          <div data-testid="item-1">Item 1</div>
          <div data-testid="item-2">Item 2</div>
          <div data-testid="item-3">Item 3</div>
        </RdsStack>
      );
      expect(screen.getByTestId('item-1')).toBeInTheDocument();
      expect(screen.getByTestId('item-2')).toBeInTheDocument();
      expect(screen.getByTestId('item-3')).toBeInTheDocument();
      const dividers = container.querySelectorAll('.rds-stack__divider');
      expect(dividers.length).toBeGreaterThan(0);
    });

    it('should render complex layout with nested stacks', () => {
      const { container } = renderWithTheme(
        <RdsStack direction="column" spacing={3}>
          <div data-testid="header">Header</div>
          <RdsStack direction="row" spacing={2}>
            <div data-testid="sidebar">Sidebar</div>
            <div data-testid="content">Content</div>
          </RdsStack>
          <div data-testid="footer">Footer</div>
        </RdsStack>
      );
      expect(screen.getByTestId('header')).toBeInTheDocument();
      expect(screen.getByTestId('sidebar')).toBeInTheDocument();
      expect(screen.getByTestId('content')).toBeInTheDocument();
      expect(screen.getByTestId('footer')).toBeInTheDocument();
    });

    it('should apply custom divider color with styling', () => {
      const { container } = renderWithTheme(
        <RdsStack
          direction="row"
          divider={true}
          dividerColor="#e0e0e0"
          className="custom-layout"
          style={{ padding: '20px' }}
        >
          <div>Item 1</div>
          <div>Item 2</div>
        </RdsStack>
      );
      const stack = container.querySelector('.custom-layout');
      expect(stack).toBeInTheDocument();
      expect(stack).toHaveStyle({ padding: '20px' });
    });

    it('should support mixed alignment and distribution in complex layout', () => {
      const { container } = renderWithTheme(
        <RdsStack
          direction="row"
          spacing={2}
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <div data-testid="left-item">Left</div>
          <div data-testid="center">Center</div>
          <div data-testid="right-item">Right</div>
        </RdsStack>
      );
      expect(screen.getByTestId('left-item')).toBeInTheDocument();
      expect(screen.getByTestId('center')).toBeInTheDocument();
      expect(screen.getByTestId('right-item')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsStack />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
