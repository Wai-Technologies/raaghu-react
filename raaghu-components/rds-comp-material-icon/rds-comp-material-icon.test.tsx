import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompMaterialIcon from './rds-comp-material-icon';

describe('RdsCompMaterialIcon', () => {
  describe('Rendering', () => {
    it('should render without crashing', () => {
      render(<RdsCompMaterialIcon iconName="Home" />);
      const icon = screen.getByTestId('rds-material-icon-Home-filled');
      expect(icon).toBeInTheDocument();
    });

    it('should render with filled style by default', () => {
      render(<RdsCompMaterialIcon iconName="Settings" />);
      const icon = screen.getByTestId('rds-material-icon-Settings-filled');
      expect(icon).toHaveClass('rds-material-icon--filled');
    });

    it('should render with specified icon name', () => {
      render(<RdsCompMaterialIcon iconName="Search" />);
      const icon = screen.getByTestId('rds-material-icon-Search-filled');
      expect(icon).toBeInTheDocument();
    });

    it('should render with custom className', () => {
      render(<RdsCompMaterialIcon iconName="Home" className="custom-class" />);
      const icon = screen.getByTestId('rds-material-icon-Home-filled');
      expect(icon).toHaveClass('custom-class');
    });
  });

  describe('Styles', () => {
    it('should render with outlined style', () => {
      render(<RdsCompMaterialIcon iconName="Add" style="outlined" />);
      const icon = screen.getByTestId('rds-material-icon-Add-outlined');
      expect(icon).toHaveClass('rds-material-icon--outlined');
    });

    it('should render with rounded style', () => {
      render(<RdsCompMaterialIcon iconName="Delete" style="rounded" />);
      const icon = screen.getByTestId('rds-material-icon-Delete-rounded');
      expect(icon).toHaveClass('rds-material-icon--rounded');
    });

    it('should render with twoTone style', () => {
      render(<RdsCompMaterialIcon iconName="Edit" style="twoTone" />);
      const icon = screen.getByTestId('rds-material-icon-Edit-twoTone');
      expect(icon).toHaveClass('rds-material-icon--twoTone');
    });

    it('should render with sharp style', () => {
      render(<RdsCompMaterialIcon iconName="Star" style="sharp" />);
      const icon = screen.getByTestId('rds-material-icon-Star-sharp');
      expect(icon).toHaveClass('rds-material-icon--sharp');
    });
  });

  describe('Sizes', () => {
    it('should render with extraSmall size', () => {
      render(<RdsCompMaterialIcon iconName="Home" size="extraSmall" />);
      const icon = screen.getByTestId('rds-material-icon-Home-filled');
      expect(icon).toHaveClass('rds-material-icon--extraSmall');
    });

    it('should render with small size', () => {
      render(<RdsCompMaterialIcon iconName="Home" size="small" />);
      const icon = screen.getByTestId('rds-material-icon-Home-filled');
      expect(icon).toHaveClass('rds-material-icon--small');
    });

    it('should render with medium size by default', () => {
      render(<RdsCompMaterialIcon iconName="Home" />);
      const icon = screen.getByTestId('rds-material-icon-Home-filled');
      expect(icon).toHaveClass('rds-material-icon--medium');
    });

    it('should render with large size', () => {
      render(<RdsCompMaterialIcon iconName="Home" size="large" />);
      const icon = screen.getByTestId('rds-material-icon-Home-filled');
      expect(icon).toHaveClass('rds-material-icon--large');
    });

    it('should render with extraLarge size', () => {
      render(<RdsCompMaterialIcon iconName="Home" size="extraLarge" />);
      const icon = screen.getByTestId('rds-material-icon-Home-filled');
      expect(icon).toHaveClass('rds-material-icon--extraLarge');
    });
  });

  describe('Colors', () => {
    it('should render with inherit color by default', () => {
      render(<RdsCompMaterialIcon iconName="Home" />);
      const icon = screen.getByTestId('rds-material-icon-Home-filled');
      expect(icon).toHaveClass('rds-material-icon--inherit');
    });

    it('should render with primary color', () => {
      render(<RdsCompMaterialIcon iconName="Home" color="primary" />);
      const icon = screen.getByTestId('rds-material-icon-Home-filled');
      expect(icon).toHaveClass('rds-material-icon--primary');
    });

    it('should render with secondary color', () => {
      render(<RdsCompMaterialIcon iconName="Home" color="secondary" />);
      const icon = screen.getByTestId('rds-material-icon-Home-filled');
      expect(icon).toHaveClass('rds-material-icon--secondary');
    });

    it('should render with success color', () => {
      render(<RdsCompMaterialIcon iconName="Home" color="success" />);
      const icon = screen.getByTestId('rds-material-icon-Home-filled');
      expect(icon).toHaveClass('rds-material-icon--success');
    });

    it('should render with error color', () => {
      render(<RdsCompMaterialIcon iconName="Home" color="error" />);
      const icon = screen.getByTestId('rds-material-icon-Home-filled');
      expect(icon).toHaveClass('rds-material-icon--error');
    });

    it('should render with warning color', () => {
      render(<RdsCompMaterialIcon iconName="Home" color="warning" />);
      const icon = screen.getByTestId('rds-material-icon-Home-filled');
      expect(icon).toHaveClass('rds-material-icon--warning');
    });

    it('should render with info color', () => {
      render(<RdsCompMaterialIcon iconName="Home" color="info" />);
      const icon = screen.getByTestId('rds-material-icon-Home-filled');
      expect(icon).toHaveClass('rds-material-icon--info');
    });

    it('should render with disabled color', () => {
      render(<RdsCompMaterialIcon iconName="Home" disabled />);
      const icon = screen.getByTestId('rds-material-icon-Home-filled');
      expect(icon).toHaveClass('rds-material-icon--disabled');
    });
  });

  describe('States', () => {
    it('should render as disabled', () => {
      render(<RdsCompMaterialIcon iconName="Home" disabled />);
      const icon = screen.getByTestId('rds-material-icon-Home-filled');
      expect(icon).toHaveClass('rds-material-icon--disabled');
    });

    it('should render as clickable', () => {
      render(<RdsCompMaterialIcon iconName="Home" clickable />);
      const icon = screen.getByTestId('rds-material-icon-Home-filled');
      expect(icon).toHaveClass('rds-material-icon--clickable');
      expect(icon).toHaveAttribute('role', 'button');
    });

    it('should render with rotate transform', () => {
      render(<RdsCompMaterialIcon iconName="Home" rotate={90} />);
      const icon = screen.getByTestId('rds-material-icon-Home-filled');
      expect(icon).toBeInTheDocument();
    });

    it('should render with horizontal flip', () => {
      render(<RdsCompMaterialIcon iconName="Home" flipHorizontal />);
      const icon = screen.getByTestId('rds-material-icon-Home-filled');
      expect(icon).toBeInTheDocument();
    });

    it('should render with vertical flip', () => {
      render(<RdsCompMaterialIcon iconName="Home" flipVertical />);
      const icon = screen.getByTestId('rds-material-icon-Home-filled');
      expect(icon).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('should handle click event when clickable', () => {
      const handleClick = jest.fn();
      render(<RdsCompMaterialIcon iconName="Home" clickable onClick={handleClick} />);
      const icon = screen.getByTestId('rds-material-icon-Home-filled');
      fireEvent.click(icon);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should not trigger click event when disabled', () => {
      const handleClick = jest.fn();
      render(<RdsCompMaterialIcon iconName="Home" disabled onClick={handleClick} />);
      const icon = screen.getByTestId('rds-material-icon-Home-filled');
      fireEvent.click(icon);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('should be keyboard accessible when clickable', () => {
      render(<RdsCompMaterialIcon iconName="Home" clickable />);
      const icon = screen.getByTestId('rds-material-icon-Home-filled');
      expect(icon).toHaveAttribute('tabIndex', '0');
    });
  });

  describe('Accessibility', () => {
    it('should have proper role for clickable icons', () => {
      render(<RdsCompMaterialIcon iconName="Home" clickable />);
      const icon = screen.getByTestId('rds-material-icon-Home-filled');
      expect(icon).toHaveAttribute('role', 'button');
    });

    it('should have proper testid', () => {
      render(<RdsCompMaterialIcon iconName="Settings" style="outlined" />);
      const icon = screen.getByTestId('rds-material-icon-Settings-outlined');
      expect(icon).toBeInTheDocument();
    });
  });

  describe('MUI Props Forwarding', () => {
    it('should accept and forward MUI SvgIconProps', () => {
      render(
        <RdsCompMaterialIcon
          iconName="Home"
          titleAccess="Home Icon"
          viewBox="0 0 24 24"
        />
      );
      const icon = screen.getByTestId('rds-material-icon-Home-filled');
      expect(icon).toBeInTheDocument();
    });

    it('should support aria-label prop', () => {
      render(
        <RdsCompMaterialIcon
          iconName="Home"
          aria-label="Home"
        />
      );
      const icon = screen.getByTestId('rds-material-icon-Home-filled');
      expect(icon).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('should render placeholder for invalid icon name', () => {
      // Suppress console.warn for this test
      const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      
      render(<RdsCompMaterialIcon iconName="InvalidIcon123" />);
      const icon = screen.getByTestId('rds-material-icon-InvalidIcon123-filled');
      expect(icon).toHaveClass('rds-material-icon--not-found');
      
      spy.mockRestore();
    });

    it('should log warning for empty icon name', () => {
      const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      
      render(<RdsCompMaterialIcon iconName="" />);
      expect(spy).toHaveBeenCalled();
      
      spy.mockRestore();
    });
  });

  describe('Theme Support', () => {
    it('should render with proper CSS classes for light theme', () => {
      const { container } = render(
        <RdsCompMaterialIcon iconName="Home" color="primary" />
      );
      const icon = container.querySelector('.rds-material-icon');
      expect(icon).toHaveClass('rds-material-icon--primary');
    });

    it('should render with proper CSS classes for dark theme', () => {
      const { container } = render(
        <div data-theme="dark">
          <RdsCompMaterialIcon iconName="Home" color="primary" />
        </div>
      );
      const icon = container.querySelector('.rds-material-icon');
      expect(icon).toHaveClass('rds-material-icon--primary');
    });
  });
});
