import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import RdsLayout from './rds-layout';
import '@testing-library/jest-dom';

// Mock SCSS
jest.mock('./rds-layout.scss', () => ({}));

// Mock RdsHeader component
jest.mock('../rds-header/rds-header', () => {
  return function DummyHeader(props: any) {
    return (
      <div data-testid="rds-header" className="rds-header-mock">
        <span>{props.title}</span>
        {props.showMenuButton && (
          <button 
            data-testid="menu-button"
            onClick={props.onMenuClick}
          >
            Menu
          </button>
        )}
        {props.actions && <div data-testid="header-actions">{props.actions}</div>}
      </div>
    );
  };
});

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

describe('RdsLayout', () => {
  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      const { container } = renderWithTheme(
        <RdsLayout>
          <div>Content</div>
        </RdsLayout>
      );
      expect(container).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsLayout.displayName).toBe('RdsLayout');
    });

    it('should render main Box component with flex layout', () => {
      const { container } = renderWithTheme(
        <RdsLayout>
          <div>Content</div>
        </RdsLayout>
      );
      const mainBox = container.querySelector('main');
      expect(mainBox).toBeInTheDocument();
    });

    it('should render children content', () => {
      renderWithTheme(
        <RdsLayout>
          <div>Test Content</div>
        </RdsLayout>
      );
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('should render Container component for main content', () => {
      const { container } = renderWithTheme(
        <RdsLayout>
          <div>Content</div>
        </RdsLayout>
      );
      const muiContainer = container.querySelector('.MuiContainer-root');
      expect(muiContainer).toBeInTheDocument();
    });
  });

  describe('Header Rendering', () => {
    it('should render header when showHeader is true', () => {
      renderWithTheme(
        <RdsLayout showHeader={true} header={{ title: 'Test Header' }}>
          <div>Content</div>
        </RdsLayout>
      );
      expect(screen.getByTestId('rds-header')).toBeInTheDocument();
    });

    it('should not render header when showHeader is false', () => {
      renderWithTheme(
        <RdsLayout showHeader={false} header={{ title: 'Test Header' }}>
          <div>Content</div>
        </RdsLayout>
      );
      expect(screen.queryByTestId('rds-header')).not.toBeInTheDocument();
    });

    it('should not render header when header prop is undefined', () => {
      renderWithTheme(
        <RdsLayout showHeader={true}>
          <div>Content</div>
        </RdsLayout>
      );
      expect(screen.queryByTestId('rds-header')).not.toBeInTheDocument();
    });

    it('should render header with title', () => {
      renderWithTheme(
        <RdsLayout header={{ title: 'My Title' }}>
          <div>Content</div>
        </RdsLayout>
      );
      expect(screen.getByText('My Title')).toBeInTheDocument();
    });

    it('should render header with default showHeader true', () => {
      renderWithTheme(
        <RdsLayout header={{ title: 'Header' }}>
          <div>Content</div>
        </RdsLayout>
      );
      expect(screen.getByTestId('rds-header')).toBeInTheDocument();
    });

    it('should render menu button when showMenuButton is true', () => {
      renderWithTheme(
        <RdsLayout header={{ title: 'Header', showMenuButton: true }}>
          <div>Content</div>
        </RdsLayout>
      );
      expect(screen.getByTestId('menu-button')).toBeInTheDocument();
    });

    it('should not render menu button when showMenuButton is false', () => {
      renderWithTheme(
        <RdsLayout header={{ title: 'Header', showMenuButton: false }}>
          <div>Content</div>
        </RdsLayout>
      );
      expect(screen.queryByTestId('menu-button')).not.toBeInTheDocument();
    });

    it('should render header actions', () => {
      const actions = <button>Action Button</button>;
      renderWithTheme(
        <RdsLayout header={{ title: 'Header', actions }}>
          <div>Content</div>
        </RdsLayout>
      );
      expect(screen.getByTestId('header-actions')).toBeInTheDocument();
      expect(screen.getByText('Action Button')).toBeInTheDocument();
    });

    it('should call onMenuClick when menu button is clicked', () => {
      const onMenuClick = jest.fn();
      renderWithTheme(
        <RdsLayout header={{ title: 'Header', showMenuButton: true, onMenuClick }}>
          <div>Content</div>
        </RdsLayout>
      );
      const menuButton = screen.getByTestId('menu-button');
      fireEvent.click(menuButton);
      expect(onMenuClick).toHaveBeenCalled();
    });
  });

  describe('Header Height', () => {
    it('should apply default header height of 64px to main content', () => {
      const { container } = renderWithTheme(
        <RdsLayout header={{ title: 'Header' }}>
          <div>Content</div>
        </RdsLayout>
      );
      const mainContent = container.querySelector('main');
      expect(mainContent).toHaveStyle('margin-top: 64px');
    });

    it('should apply custom header height', () => {
      const { container } = renderWithTheme(
        <RdsLayout header={{ title: 'Header' }} headerHeight={80}>
          <div>Content</div>
        </RdsLayout>
      );
      const mainContent = container.querySelector('main');
      expect(mainContent).toHaveStyle('margin-top: 80px');
    });

    it('should not apply margin-top when header is not shown', () => {
      const { container } = renderWithTheme(
        <RdsLayout showHeader={false} header={{ title: 'Header' }}>
          <div>Content</div>
        </RdsLayout>
      );
      const mainContent = container.querySelector('main');
      expect(mainContent).toHaveStyle('margin-top: 0px');
    });

    it('should handle different header heights', () => {
      const { container: container1 } = renderWithTheme(
        <RdsLayout header={{ title: 'Header' }} headerHeight={100}>
          <div>Content</div>
        </RdsLayout>
      );
      let mainContent = container1.querySelector('main');
      expect(mainContent).toHaveStyle('margin-top: 100px');

      const { container: container2 } = renderWithTheme(
        <RdsLayout header={{ title: 'Header' }} headerHeight={120}>
          <div>Content</div>
        </RdsLayout>
      );
      mainContent = container2.querySelector('main');
      expect(mainContent).toHaveStyle('margin-top: 120px');
    });
  });

  describe('Padding', () => {
    it('should apply default padding of 3', () => {
      const { container } = renderWithTheme(
        <RdsLayout>
          <div>Content</div>
        </RdsLayout>
      );
      const mainContent = container.querySelector('main');
      expect(mainContent).toHaveStyle('padding: 24px');
    });

    it('should apply custom padding', () => {
      const { container } = renderWithTheme(
        <RdsLayout padding={4}>
          <div>Content</div>
        </RdsLayout>
      );
      const mainContent = container.querySelector('main');
      expect(mainContent).toHaveStyle('padding: 32px');
    });

    it('should apply custom padding value', () => {
      const { container } = renderWithTheme(
        <RdsLayout padding={5}>
          <div>Content</div>
        </RdsLayout>
      );
      const mainContent = container.querySelector('main');
      expect(mainContent).toHaveStyle('padding: 40px');
    });
  });

  describe('Container Max Width', () => {
    it('should apply default maxWidth of lg', () => {
      const { container } = renderWithTheme(
        <RdsLayout>
          <div>Content</div>
        </RdsLayout>
      );
      const muiContainer = container.querySelector('.MuiContainer-root');
      expect(muiContainer).toHaveClass('MuiContainer-maxWidthLg');
    });

    it('should apply custom maxWidth xs', () => {
      const { container } = renderWithTheme(
        <RdsLayout maxWidth="xs">
          <div>Content</div>
        </RdsLayout>
      );
      const muiContainer = container.querySelector('.MuiContainer-root');
      expect(muiContainer).toHaveClass('MuiContainer-maxWidthXs');
    });

    it('should apply custom maxWidth sm', () => {
      const { container } = renderWithTheme(
        <RdsLayout maxWidth="sm">
          <div>Content</div>
        </RdsLayout>
      );
      const muiContainer = container.querySelector('.MuiContainer-root');
      expect(muiContainer).toHaveClass('MuiContainer-maxWidthSm');
    });

    it('should apply custom maxWidth md', () => {
      const { container } = renderWithTheme(
        <RdsLayout maxWidth="md">
          <div>Content</div>
        </RdsLayout>
      );
      const muiContainer = container.querySelector('.MuiContainer-root');
      expect(muiContainer).toHaveClass('MuiContainer-maxWidthMd');
    });

    it('should apply custom maxWidth xl', () => {
      const { container } = renderWithTheme(
        <RdsLayout maxWidth="xl">
          <div>Content</div>
        </RdsLayout>
      );
      const muiContainer = container.querySelector('.MuiContainer-root');
      expect(muiContainer).toHaveClass('MuiContainer-maxWidthXl');
    });

    it('should apply false maxWidth to disable max width', () => {
      const { container } = renderWithTheme(
        <RdsLayout maxWidth={false}>
          <div>Content</div>
        </RdsLayout>
      );
      const muiContainer = container.querySelector('.MuiContainer-root');
      expect(muiContainer).toBeInTheDocument();
    });
  });

  describe('Children', () => {
    it('should render single child', () => {
      renderWithTheme(
        <RdsLayout>
          <div data-testid="single-child">Single Child</div>
        </RdsLayout>
      );
      expect(screen.getByTestId('single-child')).toBeInTheDocument();
    });

    it('should render multiple children', () => {
      renderWithTheme(
        <RdsLayout>
          <div>Child 1</div>
          <div>Child 2</div>
          <div>Child 3</div>
        </RdsLayout>
      );
      expect(screen.getByText('Child 1')).toBeInTheDocument();
      expect(screen.getByText('Child 2')).toBeInTheDocument();
      expect(screen.getByText('Child 3')).toBeInTheDocument();
    });

    it('should render React elements as children', () => {
      const ChildComponent = () => <span>Component Child</span>;
      renderWithTheme(
        <RdsLayout>
          <ChildComponent />
        </RdsLayout>
      );
      expect(screen.getByText('Component Child')).toBeInTheDocument();
    });

    it('should render complex nested elements', () => {
      renderWithTheme(
        <RdsLayout>
          <div>
            <h1>Title</h1>
            <p>Paragraph</p>
            <button>Button</button>
          </div>
        </RdsLayout>
      );
      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Paragraph')).toBeInTheDocument();
      expect(screen.getByText('Button')).toBeInTheDocument();
    });
  });

  describe('Layout Structure', () => {
    it('should have flex column layout', () => {
      const { container } = renderWithTheme(
        <RdsLayout>
          <div>Content</div>
        </RdsLayout>
      );
      const rootBox = container.querySelector('.MuiBox-root');
      expect(rootBox).toHaveStyle('display: flex');
      expect(rootBox).toHaveStyle('flex-direction: column');
    });

    it('should have minimum height of 100vh', () => {
      const { container } = renderWithTheme(
        <RdsLayout>
          <div>Content</div>
        </RdsLayout>
      );
      const rootBox = container.querySelector('.MuiBox-root');
      expect(rootBox).toHaveStyle('min-height: 100vh');
    });

    it('should have flexGrow on main content', () => {
      const { container } = renderWithTheme(
        <RdsLayout>
          <div>Content</div>
        </RdsLayout>
      );
      const mainContent = container.querySelector('main');
      expect(mainContent).toHaveStyle('flex-grow: 1');
    });
  });

  describe('Theme Integration', () => {
    it('should render with light theme', () => {
      const { container } = renderWithTheme(
        <RdsLayout header={{ title: 'Header' }}>
          <div>Content</div>
        </RdsLayout>,
        false
      );
      expect(container).toBeInTheDocument();
    });

    it('should render with dark theme', () => {
      const { container } = renderWithTheme(
        <RdsLayout header={{ title: 'Header' }}>
          <div>Content</div>
        </RdsLayout>,
        true
      );
      expect(container).toBeInTheDocument();
    });
  });

  describe('Props Spreading', () => {
    it('should accept additional Container props', () => {
      const { container } = renderWithTheme(
        <RdsLayout data-testid="custom-layout" className="custom-class">
          <div>Content</div>
        </RdsLayout>
      );
      expect(screen.getByTestId('custom-layout')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
      const { container } = renderWithTheme(
        <RdsLayout className="my-layout">
          <div>Content</div>
        </RdsLayout>
      );
      const muiContainer = container.querySelector('.MuiContainer-root');
      expect(muiContainer).toHaveClass('my-layout');
    });

    it('should apply style prop', () => {
      const { container } = renderWithTheme(
        <RdsLayout style={{ backgroundColor: 'red' }}>
          <div>Content</div>
        </RdsLayout>
      );
      const muiContainer = container.querySelector('.MuiContainer-root') as HTMLElement;
      expect(muiContainer).toHaveStyle('background-color: red');
    });
  });

  describe('Complex Scenarios', () => {
    it('should render full layout with header and content', () => {
      renderWithTheme(
        <RdsLayout
          header={{
            title: 'Dashboard',
            showMenuButton: true,
            actions: <button>Settings</button>,
          }}
          showHeader={true}
          headerHeight={70}
          padding={4}
          maxWidth="md"
        >
          <div>Main Content</div>
        </RdsLayout>
      );

      expect(screen.getByTestId('rds-header')).toBeInTheDocument();
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
      expect(screen.getByTestId('menu-button')).toBeInTheDocument();
      expect(screen.getByText('Settings')).toBeInTheDocument();
      expect(screen.getByText('Main Content')).toBeInTheDocument();
    });

    it('should render layout without header', () => {
      const { container } = renderWithTheme(
        <RdsLayout showHeader={false} padding={3} maxWidth="lg">
          <div>Content Only</div>
        </RdsLayout>
      );

      expect(screen.queryByTestId('rds-header')).not.toBeInTheDocument();
      expect(screen.getByText('Content Only')).toBeInTheDocument();
      const mainContent = container.querySelector('main');
      expect(mainContent).toHaveStyle('margin-top: 0px');
    });

    it('should handle header and content updates', () => {
      const { rerender } = renderWithTheme(
        <RdsLayout header={{ title: 'Old Title' }}>
          <div>Old Content</div>
        </RdsLayout>
      );

      expect(screen.getByText('Old Title')).toBeInTheDocument();
      expect(screen.getByText('Old Content')).toBeInTheDocument();

      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsLayout header={{ title: 'New Title' }}>
            <div>New Content</div>
          </RdsLayout>
        </ThemeProvider>
      );

      expect(screen.getByText('New Title')).toBeInTheDocument();
      expect(screen.getByText('New Content')).toBeInTheDocument();
    });

    it('should handle toggling header visibility', () => {
      const { rerender } = renderWithTheme(
        <RdsLayout showHeader={true} header={{ title: 'Header' }}>
          <div>Content</div>
        </RdsLayout>
      );

      expect(screen.getByTestId('rds-header')).toBeInTheDocument();

      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsLayout showHeader={false} header={{ title: 'Header' }}>
            <div>Content</div>
          </RdsLayout>
        </ThemeProvider>
      );

      expect(screen.queryByTestId('rds-header')).not.toBeInTheDocument();
    });
  });

  describe('Layout Flexibility', () => {
    it('should support different maxWidth options', () => {
      const widths: Array<'xs' | 'sm' | 'md' | 'lg' | 'xl' | false> = ['xs', 'sm', 'md', 'lg', 'xl'];

      widths.forEach((width) => {
        const { container } = renderWithTheme(
          <RdsLayout maxWidth={width}>
            <div>Content</div>
          </RdsLayout>
        );
        const muiContainer = container.querySelector('.MuiContainer-root');
        expect(muiContainer).toBeInTheDocument();
      });
    });

    it('should support various padding values', () => {
      const paddings = [0, 1, 2, 3, 4, 5];

      paddings.forEach((p) => {
        const { container } = renderWithTheme(
          <RdsLayout padding={p}>
            <div>Content</div>
          </RdsLayout>
        );
        const mainContent = container.querySelector('main');
        expect(mainContent).toHaveStyle(`padding: ${p * 8}px`);
      });
    });
  });

  describe('Accessibility', () => {
    it('should have semantic main element for content', () => {
      const { container } = renderWithTheme(
        <RdsLayout>
          <div>Content</div>
        </RdsLayout>
      );
      const main = container.querySelector('main');
      expect(main).toBeInTheDocument();
    });

    it('should render proper semantic structure', () => {
      const { container } = renderWithTheme(
        <RdsLayout header={{ title: 'Header' }}>
          <h1>Page Title</h1>
          <p>Content</p>
        </RdsLayout>
      );
      const main = container.querySelector('main');
      expect(main).toBeInTheDocument();
      expect(screen.getByText('Page Title')).toBeInTheDocument();
    });
  });
});
