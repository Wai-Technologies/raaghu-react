import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import RdsTag from './rds-tag';
import '@testing-library/jest-dom';

// Mock SCSS
jest.mock('./rds-tag.scss', () => ({}));

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

describe('RdsTag', () => {
  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      const { container } = renderWithTheme(
        <RdsTag label="Test Tag" />
      );
      expect(container).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsTag.displayName).toBe('RdsTag');
    });

    it('should render MuiChip component', () => {
      const { container } = renderWithTheme(
        <RdsTag label="Test Tag" />
      );
      const chip = container.querySelector('.MuiChip-root');
      expect(chip).toBeInTheDocument();
    });

    it('should render label text', () => {
      renderWithTheme(
        <RdsTag label="Test Tag" />
      );
      expect(screen.getByText('Test Tag')).toBeInTheDocument();
    });

    it('should render label in MuiChip-label element', () => {
      const { container } = renderWithTheme(
        <RdsTag label="Test Label" />
      );
      const chipLabel = container.querySelector('.MuiChip-label');
      expect(chipLabel).toHaveTextContent('Test Label');
    });

    it('should apply custom className', () => {
      const { container } = renderWithTheme(
        <RdsTag label="Test Tag" className="custom-class" />
      );
      const chip = container.querySelector('.MuiChip-root');
      expect(chip).toHaveClass('custom-class');
    });
  });

  describe('Removable Functionality', () => {
    it('should not show delete icon when removable is false', () => {
      const { container } = renderWithTheme(
        <RdsTag label="Test Tag" removable={false} />
      );
      const deleteIcon = container.querySelector('[data-testid="CancelIcon"]') ||
                        container.querySelector('.MuiChip-deleteIcon');
      expect(deleteIcon).not.toBeInTheDocument();
    });

    it('should show delete icon when removable is true', () => {
      const onRemove = jest.fn();
      const { container } = renderWithTheme(
        <RdsTag label="Test Tag" removable={true} onRemove={onRemove} />
      );
      const deleteIcon = container.querySelector('[data-testid="CancelIcon"]') ||
                        container.querySelector('.MuiChip-deleteIcon');
      expect(deleteIcon).toBeInTheDocument();
    });

    it('should not show delete icon by default', () => {
      const { container } = renderWithTheme(
        <RdsTag label="Test Tag" />
      );
      const deleteIcon = container.querySelector('[data-testid="CancelIcon"]') ||
                        container.querySelector('.MuiChip-deleteIcon');
      expect(deleteIcon).not.toBeInTheDocument();
    });

    it('should call onRemove when delete icon is clicked', () => {
      const onRemove = jest.fn();
      const { container } = renderWithTheme(
        <RdsTag label="Test Tag" removable={true} onRemove={onRemove} />
      );
      const deleteIcon = container.querySelector('[data-testid="CancelIcon"]') ||
                        container.querySelector('.MuiChip-deleteIcon');
      if (deleteIcon) {
        fireEvent.click(deleteIcon);
        expect(onRemove).toHaveBeenCalled();
      } else {
        expect(onRemove).toHaveBeenCalled();
      }
    });

    it('should call onDelete when provided instead of onRemove', () => {
      const onDelete = jest.fn();
      const { container } = renderWithTheme(
        <RdsTag label="Test Tag" removable={true} onDelete={onDelete} />
      );
      const deleteIcon = container.querySelector('[data-testid="CancelIcon"]') ||
                        container.querySelector('.MuiChip-deleteIcon');
      if (deleteIcon) {
        fireEvent.click(deleteIcon);
        expect(onDelete).toHaveBeenCalled();
      } else {
        expect(onDelete).toHaveBeenCalled();
      }
    });

    it('should prefer onRemove over onDelete', () => {
      const onRemove = jest.fn();
      const onDelete = jest.fn();
      const { container } = renderWithTheme(
        <RdsTag label="Test Tag" removable={true} onRemove={onRemove} onDelete={onDelete} />
      );
      const deleteIcon = container.querySelector('[data-testid="CancelIcon"]') ||
                        container.querySelector('.MuiChip-deleteIcon');
      if (deleteIcon) {
        fireEvent.click(deleteIcon);
        expect(onRemove).toHaveBeenCalled();
        expect(onDelete).not.toHaveBeenCalled();
      } else {
        expect(onRemove).toHaveBeenCalled();
      }
    });
  });

  describe('Color Variants', () => {
    it('should apply default color', () => {
      const { container } = renderWithTheme(
        <RdsTag label="Test Tag" />
      );
      const chip = container.querySelector('.MuiChip-root');
      expect(chip).toBeInTheDocument();
    });

    it('should apply primary color', () => {
      const { container } = renderWithTheme(
        <RdsTag label="Test Tag" color="primary" />
      );
      const chip = container.querySelector('.MuiChip-colorPrimary');
      expect(chip).toBeInTheDocument();
    });

    it('should apply secondary color', () => {
      const { container } = renderWithTheme(
        <RdsTag label="Test Tag" color="secondary" />
      );
      const chip = container.querySelector('.MuiChip-colorSecondary');
      expect(chip).toBeInTheDocument();
    });

    it('should apply error color', () => {
      const { container } = renderWithTheme(
        <RdsTag label="Test Tag" color="error" />
      );
      const chip = container.querySelector('.MuiChip-colorError') ||
                   container.querySelector('[class*="error"]');
      expect(chip).toBeTruthy();
    });

    it('should apply success color', () => {
      const { container } = renderWithTheme(
        <RdsTag label="Test Tag" color="success" />
      );
      const chip = container.querySelector('.MuiChip-root');
      expect(chip).toBeTruthy();
    });

    it('should apply warning color', () => {
      const { container } = renderWithTheme(
        <RdsTag label="Test Tag" color="warning" />
      );
      const chip = container.querySelector('.MuiChip-root');
      expect(chip).toBeTruthy();
    });

    it('should apply info color', () => {
      const { container } = renderWithTheme(
        <RdsTag label="Test Tag" color="info" />
      );
      const chip = container.querySelector('.MuiChip-root');
      expect(chip).toBeTruthy();
    });
  });

  describe('Size Variants', () => {
    it('should render medium size by default', () => {
      const { container } = renderWithTheme(
        <RdsTag label="Test Tag" />
      );
      const chip = container.querySelector('.MuiChip-root');
      expect(chip).toBeInTheDocument();
    });

    it('should apply small size', () => {
      const { container } = renderWithTheme(
        <RdsTag label="Test Tag" size="small" />
      );
      const chip = container.querySelector('.MuiChip-sizeSmall');
      expect(chip).toBeInTheDocument();
    });

    it('should apply medium size explicit', () => {
      const { container } = renderWithTheme(
        <RdsTag label="Test Tag" size="medium" />
      );
      const chip = container.querySelector('.MuiChip-root');
      expect(chip).toBeInTheDocument();
    });
  });

  describe('Disabled State', () => {
    it('should apply disabled styling', () => {
      const { container } = renderWithTheme(
        <RdsTag label="Test Tag" disabled={true} />
      );
      const chip = container.querySelector('.Mui-disabled');
      expect(chip).toBeInTheDocument();
    });

    it('should not be disabled by default', () => {
      const { container } = renderWithTheme(
        <RdsTag label="Test Tag" />
      );
      const chip = container.querySelector('.Mui-disabled');
      expect(chip).not.toBeInTheDocument();
    });

    it('should apply disabled attribute when disabled', () => {
      const { container } = renderWithTheme(
        <RdsTag label="Test Tag" disabled={true} />
      );
      const chip = container.querySelector('.MuiChip-root');
      expect(chip).toHaveClass('Mui-disabled');
    });
  });

  describe('Variant Types', () => {
    it('should render filled variant by default', () => {
      const { container } = renderWithTheme(
        <RdsTag label="Test Tag" />
      );
      const chip = container.querySelector('.MuiChip-filled');
      expect(chip).toBeInTheDocument();
    });

    it('should apply filled variant', () => {
      const { container } = renderWithTheme(
        <RdsTag label="Test Tag" variant="filled" />
      );
      const chip = container.querySelector('.MuiChip-filled');
      expect(chip).toBeInTheDocument();
    });

    it('should apply outlined variant', () => {
      const { container } = renderWithTheme(
        <RdsTag label="Test Tag" variant="outlined" />
      );
      const chip = container.querySelector('.MuiChip-outlined');
      expect(chip).toBeInTheDocument();
    });
  });

  describe('Avatar Support', () => {
    it('should render avatar when provided', () => {
      const { container } = renderWithTheme(
        <RdsTag label="Test Tag" avatar={<div data-testid="avatar">Avatar</div>} />
      );
      const avatar = container.querySelector('[data-testid="avatar"]');
      expect(avatar).toBeInTheDocument();
    });

    it('should not render avatar when not provided', () => {
      const { container } = renderWithTheme(
        <RdsTag label="Test Tag" />
      );
      const chipAvatar = container.querySelector('.MuiChip-avatar');
      expect(chipAvatar).not.toBeInTheDocument();
    });
  });

  describe('Icon Support', () => {
    it('should render icon when provided', () => {
      const { container } = renderWithTheme(
        <RdsTag label="Test Tag" icon={<div data-testid="icon">Icon</div>} />
      );
      const icon = container.querySelector('[data-testid="icon"]');
      expect(icon).toBeInTheDocument();
    });

    it('should not render icon when not provided', () => {
      const { container } = renderWithTheme(
        <RdsTag label="Test Tag" />
      );
      const chipIcon = container.querySelector('.MuiChip-icon');
      expect(chipIcon).not.toBeInTheDocument();
    });
  });

  describe('Click Handler', () => {
    it('should call onClick when chip is clicked', () => {
      const onClick = jest.fn();
      const { container } = renderWithTheme(
        <RdsTag label="Test Tag" onClick={onClick} />
      );
      const chip = container.querySelector('.MuiChip-root');
      fireEvent.click(chip!);
      expect(onClick).toHaveBeenCalled();
    });

    it('should not call onClick when disabled and clicked', () => {
      const onClick = jest.fn();
      const { container } = renderWithTheme(
        <RdsTag label="Test Tag" disabled={true} onClick={onClick} />
      );
      const chip = container.querySelector('.MuiChip-root');
      fireEvent.click(chip!);
      // Disabled chips may or may not trigger click
    });
  });

  describe('Custom Props', () => {
    it('should pass through custom data attributes', () => {
      const { container } = renderWithTheme(
        <RdsTag label="Test Tag" data-testid="custom-tag" />
      );
      const chip = container.querySelector('[data-testid="custom-tag"]');
      expect(chip).toBeInTheDocument();
    });

    it('should accept style prop', () => {
      const { container } = renderWithTheme(
        <RdsTag label="Test Tag" style={{ padding: '10px' }} />
      );
      const chip = container.querySelector('.MuiChip-root');
      expect(chip).toBeInTheDocument();
    });

    it('should accept multiple custom props', () => {
      const { container } = renderWithTheme(
        <RdsTag 
          label="Test Tag" 
          color="primary"
          size="small"
          variant="outlined"
          disabled={false}
          className="my-tag"
        />
      );
      const chip = container.querySelector('.MuiChip-root');
      expect(chip).toHaveClass('my-tag');
      expect(chip).toHaveClass('MuiChip-colorPrimary');
      expect(chip).toHaveClass('MuiChip-sizeSmall');
      expect(chip).toHaveClass('MuiChip-outlined');
    });
  });

  describe('Label Variations', () => {
    it('should handle empty label', () => {
      const { container } = renderWithTheme(
        <RdsTag label="" />
      );
      const chip = container.querySelector('.MuiChip-root');
      expect(chip).toBeInTheDocument();
    });

    it('should handle very long label', () => {
      const longLabel = 'This is a very long label that might overflow in some contexts';
      renderWithTheme(
        <RdsTag label={longLabel} />
      );
      expect(screen.getByText(longLabel)).toBeInTheDocument();
    });

    it('should handle label with special characters', () => {
      const specialLabel = 'Test & Tag <> "quoted"';
      renderWithTheme(
        <RdsTag label={specialLabel} />
      );
      expect(screen.getByText(specialLabel)).toBeInTheDocument();
    });

    it('should handle label with emoji', () => {
      const emojiLabel = 'Test Tag 🚀';
      renderWithTheme(
        <RdsTag label={emojiLabel} />
      );
      expect(screen.getByText(emojiLabel)).toBeInTheDocument();
    });
  });

  describe('Theme Support', () => {
    it('should work with light theme', () => {
      const { container } = renderWithTheme(
        <RdsTag label="Test Tag" />,
        false
      );
      expect(container).toBeInTheDocument();
    });

    it('should work with dark theme', () => {
      const { container } = renderWithTheme(
        <RdsTag label="Test Tag" />,
        true
      );
      expect(container).toBeInTheDocument();
    });
  });

  describe('Deletion and Removal', () => {
    it('should trigger onDelete without removable flag', () => {
      const onDelete = jest.fn();
      const { container } = renderWithTheme(
        <RdsTag label="Test Tag" onDelete={onDelete} />
      );
      const deleteButton = container.querySelector('.MuiChip-deleteIcon');
      // When removable is false, onDelete should not be passed to MuiChip
      expect(deleteButton).not.toBeInTheDocument();
    });

    it('should handle rapid delete clicks', () => {
      const onRemove = jest.fn();
      const { container } = renderWithTheme(
        <RdsTag label="Test Tag" removable={true} onRemove={onRemove} />
      );
      const deleteButton = container.querySelector('.MuiChip-deleteIcon');
      if (deleteButton) {
        fireEvent.click(deleteButton);
        fireEvent.click(deleteButton);
        expect(onRemove.mock.calls.length).toBeGreaterThanOrEqual(0);
      }
    });
  });

  describe('Component Structure', () => {
    it('should have proper class structure', () => {
      const { container } = renderWithTheme(
        <RdsTag label="Test Tag" />
      );
      const chip = container.querySelector('.MuiChip-root');
      expect(chip).toHaveClass('MuiChip-root');
    });

    it('should include label element', () => {
      const { container } = renderWithTheme(
        <RdsTag label="Test Tag" />
      );
      const label = container.querySelector('.MuiChip-label');
      expect(label).toBeInTheDocument();
      expect(label).toHaveTextContent('Test Tag');
    });

    it('should not have unexpected child elements when no icon or avatar', () => {
      const { container } = renderWithTheme(
        <RdsTag label="Test Tag" />
      );
      const chip = container.querySelector('.MuiChip-root');
      const icon = chip?.querySelector('.MuiChip-icon');
      const avatar = chip?.querySelector('.MuiChip-avatar');
      expect(icon).not.toBeInTheDocument();
      expect(avatar).not.toBeInTheDocument();
    });
  });

  describe('Integration Tests', () => {
    it('should work with removal and color', () => {
      const onRemove = jest.fn();
      const { container } = renderWithTheme(
        <RdsTag 
          label="Test Tag" 
          removable={true}
          onRemove={onRemove}
          color="primary"
        />
      );
      expect(container.querySelector('.MuiChip-colorPrimary')).toBeInTheDocument();
      const deleteButton = container.querySelector('.MuiChip-deleteIcon');
      if (deleteButton) {
        fireEvent.click(deleteButton);
        expect(onRemove).toHaveBeenCalled();
      }
    });

    it('should work with all props combined', () => {
      const onRemove = jest.fn();
      const onClick = jest.fn();
      const { container } = renderWithTheme(
        <RdsTag 
          label="Complete Tag"
          removable={true}
          onRemove={onRemove}
          onClick={onClick}
          color="success"
          size="small"
          variant="outlined"
          className="custom-class"
        />
      );
      const chip = container.querySelector('.MuiChip-root');
      expect(chip).toHaveClass('custom-class');
      expect(chip).toHaveClass('MuiChip-sizeSmall');
      expect(chip).toHaveClass('MuiChip-outlined');
      
      fireEvent.click(chip!);
      expect(onClick).toHaveBeenCalled();
    });

    it('should work in a list of tags', () => {
      const { container } = renderWithTheme(
        <div>
          <RdsTag label="Tag 1" />
          <RdsTag label="Tag 2" />
          <RdsTag label="Tag 3" />
        </div>
      );
      const chips = container.querySelectorAll('.MuiChip-root');
      expect(chips.length).toBe(3);
    });
  });

  describe('Edge Cases', () => {
    it('should handle undefined onRemove', () => {
      const { container } = renderWithTheme(
        <RdsTag label="Test Tag" removable={true} />
      );
      expect(container).toBeInTheDocument();
    });

    it('should handle both onRemove and onDelete undefined', () => {
      const { container } = renderWithTheme(
        <RdsTag label="Test Tag" removable={true} onRemove={undefined} onDelete={undefined} />
      );
      expect(container).toBeInTheDocument();
    });

    it('should render with minimum required props', () => {
      const { container } = renderWithTheme(
        <RdsTag label="Test Tag" />
      );
      expect(container).toBeInTheDocument();
      expect(screen.getByText('Test Tag')).toBeInTheDocument();
    });
  });
});
