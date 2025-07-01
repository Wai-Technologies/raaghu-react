import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompOtherSettings from '../src/rds-comp-other-settings/rds-comp-other-settings';

// Mock the rds-elements components
jest.mock('../src/rds-elements', () => ({
  RdsCompLabel: ({ label }: any) => (
    <span data-testid="rds-comp-label">{label}</span>
  ),
  RdsCheckbox: ({ labelText, checked, dataTestId, ...props }: any) => (
    <div data-testid={dataTestId}>
      <input
        type="checkbox"
        checked={checked}
        readOnly
        {...props}
      />
      <label>{labelText}</label>
    </div>
  ),
}));

describe('RdsCompOtherSettings', () => {
  describe('Component Rendering', () => {
    it('should render without crashing', () => {
      expect(() => {
        render(<RdsCompOtherSettings />);
      }).not.toThrow();
    });

    it('should render the Quick Theme Selection label', () => {
      render(<RdsCompOtherSettings />);
      
      const label = screen.getByTestId('rds-comp-label');
      expect(label).toBeInTheDocument();
      expect(label).toHaveTextContent('Quick Theme Selection');
    });

    it('should render the quick theme select checkbox', () => {
      render(<RdsCompOtherSettings />);
      
      const checkbox = screen.getByTestId('quick-theme-select');
      expect(checkbox).toBeInTheDocument();
    });

    it('should display the checkbox label text', () => {
      render(<RdsCompOtherSettings />);
      
      expect(screen.getByText('Is Quick Theme Select Enabled')).toBeInTheDocument();
    });
  });

  describe('Checkbox State', () => {
    it('should render checkbox as unchecked by default', () => {
      render(<RdsCompOtherSettings />);
      
      const checkboxInput = screen.getByRole('checkbox');
      expect(checkboxInput).not.toBeChecked();
    });

    it('should have correct data-testid for the checkbox', () => {
      render(<RdsCompOtherSettings />);
      
      const checkbox = screen.getByTestId('quick-theme-select');
      expect(checkbox).toBeInTheDocument();
    });
  });

  describe('Component Structure', () => {
    it('should have correct HTML structure', () => {
      const { container } = render(<RdsCompOtherSettings />);
      
      const list = container.querySelector('ul');
      expect(list).toBeInTheDocument();
      expect(list).toHaveClass('ps-0', 'pt-4', 'list-unstyled');
    });

    it('should have proper styling classes for the label container', () => {
      const { container } = render(<RdsCompOtherSettings />);
      
      const labelContainer = container.querySelector('.fw-medium.mb-2');
      expect(labelContainer).toBeInTheDocument();
    });

    it('should have proper styling classes for the form group', () => {
      const { container } = render(<RdsCompOtherSettings />);
      
      const formGroup = container.querySelector('.form-group.mb-2');
      expect(formGroup).toBeInTheDocument();
    });

    it('should render as a list item structure', () => {
      const { container } = render(<RdsCompOtherSettings />);
      
      const listItem = container.querySelector('li');
      expect(listItem).toBeInTheDocument();
    });
  });
  describe('Props Handling', () => {
    it('should render correctly without any props', () => {
      render(<RdsCompOtherSettings />);
      
      expect(screen.getByText('Quick Theme Selection')).toBeInTheDocument();
      expect(screen.getByText('Is Quick Theme Select Enabled')).toBeInTheDocument();
    });
  });

  describe('Component Content', () => {
    it('should display the correct heading text', () => {
      render(<RdsCompOtherSettings />);
      
      expect(screen.getByText('Quick Theme Selection')).toBeInTheDocument();
    });

    it('should display the correct checkbox label', () => {
      render(<RdsCompOtherSettings />);
      
      expect(screen.getByText('Is Quick Theme Select Enabled')).toBeInTheDocument();
    });

    it('should contain only one checkbox', () => {
      render(<RdsCompOtherSettings />);
      
      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes).toHaveLength(1);
    });
  });

  describe('Accessibility', () => {
    it('should have accessible checkbox element', () => {
      render(<RdsCompOtherSettings />);
      
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toBeVisible();
    });

    it('should have proper list structure for screen readers', () => {
      const { container } = render(<RdsCompOtherSettings />);
      
      const list = container.querySelector('ul');
      expect(list).toBeInTheDocument();
      
      const listItem = container.querySelector('li');
      expect(listItem).toBeInTheDocument();
    });

    it('should have unstyled list for better accessibility', () => {
      const { container } = render(<RdsCompOtherSettings />);
      
      const list = container.querySelector('ul');
      expect(list).toHaveClass('list-unstyled');
    });
  });

  describe('Component Stability', () => {
    it('should not crash on multiple renders', () => {
      const { rerender } = render(<RdsCompOtherSettings />);
      
      expect(() => {
        rerender(<RdsCompOtherSettings />);
        rerender(<RdsCompOtherSettings />);
      }).not.toThrow();
    });

    it('should maintain consistent content across re-renders', () => {
      const { rerender } = render(<RdsCompOtherSettings />);
      
      expect(screen.getByText('Quick Theme Selection')).toBeInTheDocument();
      
      rerender(<RdsCompOtherSettings />);
      expect(screen.getByText('Quick Theme Selection')).toBeInTheDocument();
      expect(screen.getByText('Is Quick Theme Select Enabled')).toBeInTheDocument();
    });
  });

  describe('Mocked Components Integration', () => {
    it('should render RdsCompLabel with correct props', () => {
      render(<RdsCompOtherSettings />);
      
      const label = screen.getByTestId('rds-comp-label');
      expect(label).toHaveTextContent('Quick Theme Selection');
    });

    it('should render RdsCheckbox with correct props', () => {
      render(<RdsCompOtherSettings />);
      
      const checkbox = screen.getByTestId('quick-theme-select');
      expect(checkbox).toBeInTheDocument();
      
      const checkboxInput = screen.getByRole('checkbox');
      expect(checkboxInput).not.toBeChecked();
    });
  });

  describe('Static Content Validation', () => {
    it('should always render the same static content', () => {
      render(<RdsCompOtherSettings />);
      
      // Verify that the component always renders the same content
      expect(screen.getByText('Quick Theme Selection')).toBeInTheDocument();
      expect(screen.getByText('Is Quick Theme Select Enabled')).toBeInTheDocument();
      
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).not.toBeChecked();
    });

    it('should have no dynamic content changes without props', () => {
      const { container: container1 } = render(<RdsCompOtherSettings />);
      const { container: container2 } = render(<RdsCompOtherSettings />);
      
      expect(container1.innerHTML).toBe(container2.innerHTML);
    });
  });
});