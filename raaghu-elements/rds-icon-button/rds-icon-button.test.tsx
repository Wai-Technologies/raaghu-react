import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import RdsIconButton, { RdsIconButtonProps } from './rds-icon-button';
import { Favorite, FavoriteBorder, Delete, Edit, Add, Home, Settings } from '@mui/icons-material';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';

// Mock SCSS
jest.mock('./rds-icon-button.scss', () => ({}));

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

describe('RdsIconButton', () => {
  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      const { container } = renderWithTheme(
        <RdsIconButton>
          <Favorite />
        </RdsIconButton>
      );
      expect(container).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsIconButton.displayName).toBe('RdsIconButton');
    });

    it('should render MuiIconButton component', () => {
      const { container } = renderWithTheme(
        <RdsIconButton>
          <Favorite />
        </RdsIconButton>
      );
      expect(container.querySelector('.MuiIconButton-root')).toBeInTheDocument();
    });

    it('should render button element', () => {
      const { container } = renderWithTheme(
        <RdsIconButton>
          <Favorite />
        </RdsIconButton>
      );
      const button = container.querySelector('button');
      expect(button).toBeInTheDocument();
    });
  });

  describe('Icon Rendering', () => {
    it('should render icon from children', () => {
      const { container } = renderWithTheme(
        <RdsIconButton>
          <Favorite data-testid="favorite-icon" />
        </RdsIconButton>
      );
      expect(screen.getByTestId('favorite-icon')).toBeInTheDocument();
    });

    it('should render iconFilled when variant is filled', () => {
      const { container } = renderWithTheme(
        <RdsIconButton
          variant="filled"
          iconFilled={<Favorite data-testid="filled-icon" />}
          iconOutlined={<FavoriteBorder data-testid="outlined-icon" />}
        />
      );
      expect(screen.getByTestId('filled-icon')).toBeInTheDocument();
      expect(screen.queryByTestId('outlined-icon')).not.toBeInTheDocument();
    });

    it('should render iconOutlined when variant is outlined', () => {
      const { container } = renderWithTheme(
        <RdsIconButton
          variant="outlined"
          iconFilled={<Favorite data-testid="filled-icon" />}
          iconOutlined={<FavoriteBorder data-testid="outlined-icon" />}
        />
      );
      expect(screen.getByTestId('outlined-icon')).toBeInTheDocument();
      expect(screen.queryByTestId('filled-icon')).not.toBeInTheDocument();
    });

    it('should fallback to icon prop when variant icons are not available', () => {
      const { container } = renderWithTheme(
        <RdsIconButton
          variant="filled"
          icon={<Edit data-testid="edit-icon" />}
        />
      );
      expect(screen.getByTestId('edit-icon')).toBeInTheDocument();
    });

    it('should prioritize variant-specific icons over generic icon prop', () => {
      const { container } = renderWithTheme(
        <RdsIconButton
          variant="filled"
          iconFilled={<Favorite data-testid="filled-icon" />}
          icon={<Edit data-testid="edit-icon" />}
        />
      );
      expect(screen.getByTestId('filled-icon')).toBeInTheDocument();
      expect(screen.queryByTestId('edit-icon')).not.toBeInTheDocument();
    });

    it('should render children as fallback when no other icons are provided', () => {
      const { container } = renderWithTheme(
        <RdsIconButton>
          <Settings />
        </RdsIconButton>
      );
      const svgs = container.querySelectorAll('svg');
      expect(svgs.length).toBeGreaterThan(0);
    });
  });

  describe('Variant Prop', () => {
    it('should apply filled variant class by default', () => {
      const { container } = renderWithTheme(
        <RdsIconButton>
          <Favorite />
        </RdsIconButton>
      );
      const button = container.querySelector('.MuiIconButton-root');
      expect(button).not.toHaveClass('rds-icon-button--outlined');
    });

    it('should apply outlined variant class when variant is outlined', () => {
      const { container } = renderWithTheme(
        <RdsIconButton variant="outlined">
          <Favorite />
        </RdsIconButton>
      );
      const button = container.querySelector('.MuiIconButton-root');
      expect(button).toHaveClass('rds-icon-button--outlined');
    });

    it('should always have rds-icon-button class', () => {
      const { container } = renderWithTheme(
        <RdsIconButton>
          <Favorite />
        </RdsIconButton>
      );
      const button = container.querySelector('.MuiIconButton-root');
      expect(button).toHaveClass('rds-icon-button');
    });
  });

  describe('Size Prop', () => {
    it('should handle small size', () => {
      const { container } = renderWithTheme(
        <RdsIconButton size="small">
          <Favorite />
        </RdsIconButton>
      );
      const button = container.querySelector('.MuiIconButton-root');
      expect(button).toHaveClass('MuiIconButton-sizeSmall');
    });

    it('should handle medium size', () => {
      const { container } = renderWithTheme(
        <RdsIconButton size="medium">
          <Favorite />
        </RdsIconButton>
      );
      const button = container.querySelector('.MuiIconButton-root');
      expect(button).toHaveClass('MuiIconButton-sizeMedium');
    });

    it('should handle large size', () => {
      const { container } = renderWithTheme(
        <RdsIconButton size="large">
          <Favorite />
        </RdsIconButton>
      );
      const button = container.querySelector('.MuiIconButton-root');
      expect(button).toHaveClass('MuiIconButton-sizeLarge');
    });
  });

  describe('Color Prop', () => {
    it('should handle primary color', () => {
      const { container } = renderWithTheme(
        <RdsIconButton color="primary">
          <Home />
        </RdsIconButton>
      );
      const button = container.querySelector('.MuiIconButton-root');
      expect(button).toHaveClass('MuiIconButton-colorPrimary');
    });

    it('should handle secondary color', () => {
      const { container } = renderWithTheme(
        <RdsIconButton color="secondary">
          <Settings />
        </RdsIconButton>
      );
      const button = container.querySelector('.MuiIconButton-root');
      expect(button).toHaveClass('MuiIconButton-colorSecondary');
    });

    it('should handle error color', () => {
      const { container } = renderWithTheme(
        <RdsIconButton color="error">
          <Delete />
        </RdsIconButton>
      );
      const button = container.querySelector('.MuiIconButton-root');
      expect(button).toHaveClass('MuiIconButton-colorError');
    });
  });

  describe('Disabled State', () => {
    it('should render enabled button by default', () => {
      const { container } = renderWithTheme(
        <RdsIconButton>
          <Favorite />
        </RdsIconButton>
      );
      const button = container.querySelector('button') as HTMLButtonElement;
      expect(button.disabled).toBe(false);
    });

    it('should disable button when disabled prop is true', () => {
      const { container } = renderWithTheme(
        <RdsIconButton disabled>
          <Favorite />
        </RdsIconButton>
      );
      const button = container.querySelector('button') as HTMLButtonElement;
      expect(button.disabled).toBe(true);
    });

    it('should apply disabled class when disabled', () => {
      const { container } = renderWithTheme(
        <RdsIconButton disabled>
          <Favorite />
        </RdsIconButton>
      );
      const button = container.querySelector('.MuiIconButton-root');
      expect(button).toHaveClass('Mui-disabled');
    });
  });

  describe('Tooltip Prop', () => {
    it('should set title attribute when tooltip is provided', () => {
      const { container } = renderWithTheme(
        <RdsIconButton tooltip="Like this">
          <Favorite />
        </RdsIconButton>
      );
      const button = container.querySelector('button') as HTMLButtonElement;
      expect(button.title).toBe('Like this');
    });

    it('should not set title when tooltip is not provided', () => {
      const { container } = renderWithTheme(
        <RdsIconButton>
          <Favorite />
        </RdsIconButton>
      );
      const button = container.querySelector('button') as HTMLButtonElement;
      expect(button.title).toBe('');
    });
  });

  describe('Click Handler', () => {
    it('should call onClick handler when clicked', () => {
      const handleClick = jest.fn();
      const { container } = renderWithTheme(
        <RdsIconButton onClick={handleClick}>
          <Favorite />
        </RdsIconButton>
      );
      const button = container.querySelector('button') as HTMLButtonElement;
      fireEvent.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should not call onClick when disabled', () => {
      const handleClick = jest.fn();
      const { container } = renderWithTheme(
        <RdsIconButton onClick={handleClick} disabled>
          <Favorite />
        </RdsIconButton>
      );
      const button = container.querySelector('button') as HTMLButtonElement;
      fireEvent.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('should pass event object to onClick handler', () => {
      const handleClick = jest.fn();
      const { container } = renderWithTheme(
        <RdsIconButton onClick={handleClick}>
          <Favorite />
        </RdsIconButton>
      );
      const button = container.querySelector('button') as HTMLButtonElement;
      fireEvent.click(button);
      expect(handleClick).toHaveBeenCalledWith(expect.any(Object));
    });
  });

  describe('Custom ClassName', () => {
    it('should apply custom className', () => {
      const { container } = renderWithTheme(
        <RdsIconButton className="custom-class">
          <Favorite />
        </RdsIconButton>
      );
      const button = container.querySelector('button');
      const classAttr = button?.getAttribute('class') || '';
      expect(classAttr).toContain('custom-class');
    });

    it('should handle multiple custom classes', () => {
      const { container } = renderWithTheme(
        <RdsIconButton className="class1 class2">
          <Favorite />
        </RdsIconButton>
      );
      const button = container.querySelector('button');
      const classAttr = button?.getAttribute('class') || '';
      expect(classAttr).toContain('class1');
      expect(classAttr).toContain('class2');
    });
  });

  describe('Icon Sizing', () => {
    it('should apply size to MUI icons', () => {
      const { container } = renderWithTheme(
        <RdsIconButton size="small">
          <Favorite />
        </RdsIconButton>
      );
      expect(container).toBeInTheDocument();
    });

    it('should handle different icon sizes', () => {
      const { container: containerSmall } = renderWithTheme(
        <RdsIconButton size="small">
          <Favorite />
        </RdsIconButton>
      );

      const { container: containerLarge } = renderWithTheme(
        <RdsIconButton size="large">
          <Favorite />
        </RdsIconButton>
      );

      expect(containerSmall.querySelectorAll('svg').length).toBeGreaterThan(0);
      expect(containerLarge.querySelectorAll('svg').length).toBeGreaterThan(0);
    });
  });

  describe('Theme Integration', () => {
    it('should render with light theme', () => {
      const { container } = renderWithTheme(
        <RdsIconButton>
          <Favorite />
        </RdsIconButton>,
        false
      );
      expect(container.querySelector('.MuiIconButton-root')).toBeInTheDocument();
    });

    it('should render with dark theme', () => {
      const { container } = renderWithTheme(
        <RdsIconButton>
          <Favorite />
        </RdsIconButton>,
        true
      );
      expect(container.querySelector('.MuiIconButton-root')).toBeInTheDocument();
    });
  });

  describe('Complex Scenarios', () => {
    it('should render toggle button with variant switching', () => {
      const { container, rerender } = renderWithTheme(
        <RdsIconButton
          variant="outlined"
          iconFilled={<Favorite data-testid="filled-icon" />}
          iconOutlined={<FavoriteBorder data-testid="outlined-icon" />}
        />
      );
      expect(screen.getByTestId('outlined-icon')).toBeInTheDocument();

      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsIconButton
            variant="filled"
            iconFilled={<Favorite data-testid="filled-icon" />}
            iconOutlined={<FavoriteBorder data-testid="outlined-icon" />}
          />
        </ThemeProvider>
      );
      expect(screen.getByTestId('filled-icon')).toBeInTheDocument();
    });

    it('should handle icon button with all common props', () => {
      const handleClick = jest.fn();
      const { container } = renderWithTheme(
        <RdsIconButton
          variant="outlined"
          size="medium"
          color="primary"
          tooltip="Delete item"
          onClick={handleClick}
          className="custom-delete-btn"
          iconOutlined={<Delete data-testid="delete-outlined" />}
          iconFilled={<Delete data-testid="delete-filled" />}
        />
      );
      expect(screen.getByTestId('delete-outlined')).toBeInTheDocument();
      expect(container.querySelector('.custom-delete-btn')).toBeInTheDocument();
      const button = container.querySelector('button') as HTMLButtonElement;
      expect(button.title).toBe('Delete item');
      fireEvent.click(button);
      expect(handleClick).toHaveBeenCalled();
    });

    it('should render add button with large size', () => {
      const { container } = renderWithTheme(
        <RdsIconButton size="large" color="primary">
          <Add />
        </RdsIconButton>
      );
      const button = container.querySelector('.MuiIconButton-root');
      expect(button).toHaveClass('MuiIconButton-sizeLarge');
      expect(button).toHaveClass('MuiIconButton-colorPrimary');
    });

    it('should render disabled edit button', () => {
      const handleClick = jest.fn();
      const { container } = renderWithTheme(
        <RdsIconButton
          disabled
          tooltip="Cannot edit"
          onClick={handleClick}
        >
          <Edit />
        </RdsIconButton>
      );
      const button = container.querySelector('button') as HTMLButtonElement;
      fireEvent.click(button);
      expect(button.disabled).toBe(true);
      expect(handleClick).not.toHaveBeenCalled();
      expect(button.title).toBe('Cannot edit');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty button', () => {
      const { container } = renderWithTheme(
        <RdsIconButton />
      );
      expect(container.querySelector('.MuiIconButton-root')).toBeInTheDocument();
    });

    it('should handle undefined props gracefully', () => {
      const { container } = renderWithTheme(
        <RdsIconButton
          iconOutlined={undefined}
          iconFilled={undefined}
          tooltip={undefined}
        >
          <Favorite />
        </RdsIconButton>
      );
      expect(container.querySelector('.MuiIconButton-root')).toBeInTheDocument();
    });

    it('should handle rapid clicks', () => {
      const handleClick = jest.fn();
      const { container } = renderWithTheme(
        <RdsIconButton onClick={handleClick}>
          <Favorite />
        </RdsIconButton>
      );
      const button = container.querySelector('button') as HTMLButtonElement;
      fireEvent.click(button);
      fireEvent.click(button);
      fireEvent.click(button);
      expect(handleClick).toHaveBeenCalledTimes(3);
    });

    it('should handle data attributes', () => {
      const { container } = renderWithTheme(
        <RdsIconButton data-testid="custom-button">
          <Favorite />
        </RdsIconButton>
      );
      expect(screen.getByTestId('custom-button')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has no axe accessibility violations', async () => {
      const { container } = renderWithTheme(<RdsIconButton aria-label="delete"><Delete /></RdsIconButton>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
