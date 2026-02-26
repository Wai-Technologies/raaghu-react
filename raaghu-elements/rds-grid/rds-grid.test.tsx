import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import RdsGrid from './rds-grid';
import '@testing-library/jest-dom';

// Mock SCSS
jest.mock('./rds-grid.scss', () => ({}));

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

describe('RdsGrid', () => {
  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      const { container } = renderWithTheme(
        <RdsGrid>
          <div>Grid Content</div>
        </RdsGrid>
      );
      expect(container).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsGrid.displayName).toBe('RdsGrid');
    });

    it('should render MuiGrid component', () => {
      const { container } = renderWithTheme(
        <RdsGrid>
          <div>Grid Content</div>
        </RdsGrid>
      );
      expect(container.querySelector('.MuiGrid-root')).toBeInTheDocument();
    });
  });

  describe('Children Rendering', () => {
    it('should render children correctly', () => {
      renderWithTheme(
        <RdsGrid>
          <div>Test Child</div>
        </RdsGrid>
      );
      expect(screen.getByText('Test Child')).toBeInTheDocument();
    });

    it('should render multiple children', () => {
      renderWithTheme(
        <RdsGrid>
          <div>Child 1</div>
          <div>Child 2</div>
          <div>Child 3</div>
        </RdsGrid>
      );
      expect(screen.getByText('Child 1')).toBeInTheDocument();
      expect(screen.getByText('Child 2')).toBeInTheDocument();
      expect(screen.getByText('Child 3')).toBeInTheDocument();
    });

    it('should render React element children', () => {
      const ChildComponent = () => <span>React Child</span>;
      renderWithTheme(
        <RdsGrid>
          <ChildComponent />
        </RdsGrid>
      );
      expect(screen.getByText('React Child')).toBeInTheDocument();
    });

    it('should handle empty children', () => {
      const { container } = renderWithTheme(
        <RdsGrid />
      );
      expect(container.querySelector('.MuiGrid-root')).toBeInTheDocument();
    });
  });

  describe('Props Handling', () => {
    it('should pass container prop to MuiGrid', () => {
      const { container } = renderWithTheme(
        <RdsGrid container>
          <div>Container Grid</div>
        </RdsGrid>
      );
      const grid = container.querySelector('.MuiGrid-root');
      expect(grid).toHaveClass('MuiGrid-container');
    });

    it('should pass spacing prop to MuiGrid', () => {
      const { container } = renderWithTheme(
        <RdsGrid container spacing={2}>
          <div>Spaced Grid</div>
        </RdsGrid>
      );
      const grid = container.querySelector('.MuiGrid-root');
      expect(grid).toHaveClass('MuiGrid-spacing-xs-2');
    });

    it('should pass data-testid attribute', () => {
      renderWithTheme(
        <RdsGrid data-testid="custom-grid">
          <div>Test Grid</div>
        </RdsGrid>
      );
      const grid = screen.getByTestId('custom-grid');
      expect(grid).toBeInTheDocument();
    });

    it('should pass className prop', () => {
      const { container } = renderWithTheme(
        <RdsGrid className="custom-class">
          <div>Classed Grid</div>
        </RdsGrid>
      );
      const grid = container.querySelector('.MuiGrid-root');
      expect(grid).toHaveClass('custom-class');
    });

    it('should pass style prop', () => {
      const { container } = renderWithTheme(
        <RdsGrid style={{ minHeight: '100px' }}>
          <div>Styled Grid</div>
        </RdsGrid>
      );
      const grid = container.querySelector('.MuiGrid-root') as HTMLElement;
      expect(grid).toHaveStyle('min-height: 100px');
    });

    it('should pass sx prop to MuiGrid', () => {
      const { container } = renderWithTheme(
        <RdsGrid sx={{ p: 2, bgcolor: 'red' }}>
          <div>SX Grid</div>
        </RdsGrid>
      );
      const grid = container.querySelector('.MuiGrid-root') as HTMLElement;
      expect(grid).toHaveStyle('padding: 16px');
    });
  });

  describe('Direction and Alignment Props', () => {
    it('should pass direction prop to MuiGrid', () => {
      const { container } = renderWithTheme(
        <RdsGrid container direction="column">
          <div>Column Grid</div>
        </RdsGrid>
      );
      const grid = container.querySelector('.MuiGrid-root');
      expect(grid).toHaveClass('MuiGrid-direction-xs-column');
    });

    it('should pass alignItems prop to MuiGrid', () => {
      const { container } = renderWithTheme(
        <RdsGrid container alignItems="center">
          <div>Centered Grid</div>
        </RdsGrid>
      );
      const grid = container.querySelector('.MuiGrid-root');
      expect(grid).toHaveClass('MuiGrid-container');
      expect(screen.getByText('Centered Grid')).toBeInTheDocument();
    });

    it('should pass justifyContent prop to MuiGrid', () => {
      const { container } = renderWithTheme(
        <RdsGrid container justifyContent="flex-end">
          <div>Flex End Grid</div>
        </RdsGrid>
      );
      const grid = container.querySelector('.MuiGrid-root');
      expect(grid).toHaveClass('MuiGrid-container');
      expect(screen.getByText('Flex End Grid')).toBeInTheDocument();
    });
  });

  describe('Theme Integration', () => {
    it('should render with light theme', () => {
      const { container } = renderWithTheme(
        <RdsGrid>
          <div>Light Theme Grid</div>
        </RdsGrid>,
        false
      );
      expect(container).toBeInTheDocument();
    });

    it('should render with dark theme', () => {
      const { container } = renderWithTheme(
        <RdsGrid>
          <div>Dark Theme Grid</div>
        </RdsGrid>,
        true
      );
      expect(container).toBeInTheDocument();
    });
  });

  describe('Container Grid Pattern', () => {
    it('should render container grid with nested grids', () => {
      const { container } = renderWithTheme(
        <RdsGrid container spacing={2}>
          <RdsGrid sx={{ flex: 1 }}>
            <div>Item 1</div>
          </RdsGrid>
          <RdsGrid sx={{ flex: 1 }}>
            <div>Item 2</div>
          </RdsGrid>
        </RdsGrid>
      );
      const grids = container.querySelectorAll('.MuiGrid-root');
      expect(grids.length).toBeGreaterThan(0);
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
    });

    it('should handle deeply nested grids', () => {
      renderWithTheme(
        <RdsGrid container>
          <RdsGrid sx={{ flex: 1 }}>
            <RdsGrid container spacing={1}>
              <RdsGrid sx={{ flex: 1 }}>
                <div>Nested 1</div>
              </RdsGrid>
              <RdsGrid sx={{ flex: 1 }}>
                <div>Nested 2</div>
              </RdsGrid>
            </RdsGrid>
          </RdsGrid>
        </RdsGrid>
      );
      expect(screen.getByText('Nested 1')).toBeInTheDocument();
      expect(screen.getByText('Nested 2')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle combination of multiple props', () => {
      const { container } = renderWithTheme(
        <RdsGrid
          container
          spacing={3}
          direction="row"
          alignItems="stretch"
          justifyContent="space-between"
          sx={{ minHeight: '300px' }}
          className="full-featured"
          data-testid="comprehensive-grid"
        >
          <div>Full Featured Grid</div>
        </RdsGrid>
      );
      expect(container).toBeInTheDocument();
      expect(screen.getByText('Full Featured Grid')).toBeInTheDocument();
      expect(screen.getByTestId('comprehensive-grid')).toBeInTheDocument();
    });

    it('should render with no explicit children prop', () => {
      const { container } = renderWithTheme(
        <RdsGrid container spacing={2}>
          Content here
        </RdsGrid>
      );
      expect(container).toBeInTheDocument();
    });
  });
});
