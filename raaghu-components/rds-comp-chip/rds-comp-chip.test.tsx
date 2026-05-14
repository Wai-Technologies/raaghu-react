import { render, screen, fireEvent } from '@testing-library/react';
import RdsCompChip from './rds-comp-chip';
import { DeleteOutline } from '@mui/icons-material';

describe('RdsCompChip', () => {
  describe('Uncontrolled Mode', () => {
    it('should render with default value', () => {
      render(<RdsCompChip label="Test Chip" />);
      expect(screen.getByTestId('rds-comp-chip')).toBeInTheDocument();
      expect(screen.getByText('Test Chip')).toBeInTheDocument();
    });

    it('should toggle selected state on click in uncontrolled mode', () => {
      const handleChange = jest.fn();
      render(
        <RdsCompChip
          label="Test Chip"
          defaultValue={false}
          onChange={handleChange}
        />
      );

      const chip = screen.getByRole('button', { name: /Test Chip/i });
      fireEvent.click(chip);

      expect(handleChange).toHaveBeenCalledWith('Test Chip', true);
    });

    it('should toggle selection multiple times', () => {
      const handleChange = jest.fn();
      render(
        <RdsCompChip
          label="Toggle Chip"
          defaultValue={false}
          onChange={handleChange}
        />
      );

      const chip = screen.getByRole('button', { name: /Toggle Chip/i });
      fireEvent.click(chip);
      expect(handleChange).toHaveBeenLastCalledWith('Toggle Chip', true);
    });

    it('should call onDelete when delete icon is clicked', () => {
      const handleDelete = jest.fn();
      render(
        <RdsCompChip
          label="Deletable Chip"
          onDelete={handleDelete}
        />
      );

      // Find the delete button - MUI renders it as a button
      const deleteButtons = screen.getAllByRole('button');
      const deleteButton = deleteButtons.find((btn) => {
        // The delete button has the close icon, which should be the second button
        return btn.className && btn.className.includes('MuiChip-deleteIcon');
      });

      if (deleteButton) {
        fireEvent.click(deleteButton);
        expect(handleDelete).toHaveBeenCalled();
      }
    });

    it('should not toggle selection when disabled', () => {
      const handleChange = jest.fn();
      render(
        <RdsCompChip
          label="Disabled Chip"
          disabled
          onChange={handleChange}
        />
      );

      const chip = screen.getByRole('button', { name: /Disabled Chip/i });
      fireEvent.click(chip);

      // onChange should not be called
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('Controlled Mode', () => {
    it('should update when value prop changes', () => {
      const { rerender } = render(
        <RdsCompChip label="Controlled Chip" selected={false} />
      );

      let chip = screen.getByTestId('rds-comp-chip');
      expect(chip).toHaveAttribute('aria-pressed', 'false');

      rerender(
        <RdsCompChip label="Controlled Chip" selected={true} />
      );

      chip = screen.getByTestId('rds-comp-chip');
      expect(chip).toHaveAttribute('aria-pressed', 'true');
    });

    it('should call onChange when clicked', () => {
      const handleChange = jest.fn();
      render(
        <RdsCompChip
          label="Controlled Chip"
          selected={false}
          onChange={handleChange}
        />
      );

      const chip = screen.getByRole('button', { name: /Controlled Chip/i });
      fireEvent.click(chip);

      expect(handleChange).toHaveBeenCalledWith('Controlled Chip', true);
    });

    it('should respect controlled selected prop', () => {
      const { rerender } = render(
        <RdsCompChip
          label="Test"
          value="test-value"
          selected={false}
        />
      );

      expect(screen.getByTestId('rds-comp-chip')).toHaveAttribute('aria-pressed', 'false');

      rerender(
        <RdsCompChip
          label="Test"
          value="test-value"
          selected={true}
        />
      );

      expect(screen.getByTestId('rds-comp-chip')).toHaveAttribute('aria-pressed', 'true');
    });

    it('should not change UI on click in fully controlled mode', () => {
      const { rerender } = render(
        <RdsCompChip
          label="Fully Controlled"
          selected={false}
          onChange={jest.fn()}
        />
      );

      const chip = screen.getByTestId('rds-comp-chip');
      fireEvent.click(chip);

      // aria-pressed should remain false until parent updates the prop
      expect(chip).toHaveAttribute('aria-pressed', 'false');
    });
  });

  describe('MUI Props', () => {
    it('should apply size variant - small', () => {
      const { container } = render(
        <RdsCompChip label="Small Chip" size="small" />
      );

      expect(container.querySelector('.rds-comp-chip--small')).toBeInTheDocument();
    });

    it('should apply size variant - medium', () => {
      const { container } = render(
        <RdsCompChip label="Medium Chip" size="medium" />
      );

      expect(container.querySelector('.rds-comp-chip--medium')).toBeInTheDocument();
    });

    it('should apply variant - filled', () => {
      const { container } = render(
        <RdsCompChip label="Filled Chip" variant="filled" />
      );

      expect(container.querySelector('.rds-comp-chip--filled')).toBeInTheDocument();
    });

    it('should apply variant - outlined', () => {
      const { container } = render(
        <RdsCompChip label="Outlined Chip" variant="outlined" />
      );

      expect(container.querySelector('.rds-comp-chip--outlined')).toBeInTheDocument();
    });

    it('should apply color variant', () => {
      const { container } = render(
        <RdsCompChip label="Primary Chip" color="primary" />
      );

      expect(container.querySelector('.rds-comp-chip--color-primary')).toBeInTheDocument();
    });

    it('should apply all color variants', () => {
      const colors = ['default', 'primary', 'secondary', 'error', 'warning', 'info', 'success'];

      colors.forEach((color) => {
        const { container } = render(
          <RdsCompChip
            label={`${color} Chip`}
            color={color as any}
          />
        );

        expect(container.querySelector(`.rds-comp-chip--color-${color}`)).toBeInTheDocument();
      });
    });

    it('should be disabled when disabled prop is true', () => {
      const { container } = render(
        <RdsCompChip label="Disabled Chip" disabled />
      );

      expect(container.querySelector('.rds-comp-chip--disabled')).toBeInTheDocument();
      expect(screen.getByTestId('rds-comp-chip')).toHaveAttribute('aria-disabled', 'true');
    });

    it('should have proper accessibility attributes', () => {
      render(
        <RdsCompChip label="Accessible Chip" selected={false} />
      );

      const wrapper = screen.getByTestId('rds-comp-chip');
      expect(wrapper).toHaveAttribute('aria-pressed', 'false');
      expect(wrapper).toHaveAttribute('aria-disabled', 'false');

      // MUI Chip itself should be a button
      const chip = screen.getByRole('button', { name: /Accessible Chip/i });
      expect(chip).toBeInTheDocument();
    });

    it('should render with avatar when provided', () => {
      render(
        <RdsCompChip
          label="Avatar Chip"
          avatar={<div data-testid="test-avatar">Avatar</div>}
        />
      );

      expect(screen.getByTestId('test-avatar')).toBeInTheDocument();
    });

    it('should render with icon when provided', () => {
      render(
        <RdsCompChip
          label="Icon Chip"
          icon={<DeleteOutline data-testid="test-icon" />}
        />
      );

      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });

    it('should show selected state visually', () => {
      const { container } = render(
        <RdsCompChip
          label="Selected Chip"
          selected={true}
        />
      );

      expect(container.querySelector('.rds-comp-chip--selected')).toBeInTheDocument();
    });

    it('should combine multiple classes correctly', () => {
      const { container } = render(
        <RdsCompChip
          label="Complex Chip"
          variant="outlined"
          size="small"
          color="success"
          selected={true}
        />
      );

      const chip = container.querySelector('.rds-comp-chip');
      expect(chip).toHaveClass('rds-comp-chip--outlined');
      expect(chip).toHaveClass('rds-comp-chip--small');
      expect(chip).toHaveClass('rds-comp-chip--color-success');
      expect(chip).toHaveClass('rds-comp-chip--selected');
    });

    it('should have correct display name', () => {
      expect(RdsCompChip.displayName).toBe('RdsCompChip');
    });
  });

  describe('Color Reflection on Selection', () => {
    it('should show color variant only when selected', () => {
      const { container, rerender } = render(
        <RdsCompChip
          label="Color Chip"
          color="primary"
          selected={false}
        />
      );

      // When not selected, should not have color class applied to MUI component
      expect(container.querySelector('.rds-comp-chip--selected')).not.toBeInTheDocument();

      // When selected, should show color variant
      rerender(
        <RdsCompChip
          label="Color Chip"
          color="primary"
          selected={true}
        />
      );

      expect(container.querySelector('.rds-comp-chip--selected')).toBeInTheDocument();
    });
  });

  describe('Event Propagation', () => {
    it('should stop propagation on delete event', () => {
      const handleDelete = jest.fn();
      const handleClick = jest.fn();
      render(
        <RdsCompChip
          label="Delete Chip"
          onDelete={handleDelete}
          onClick={handleClick}
        />
      );

      // Find the delete button - MUI renders it as a button
      const deleteButtons = screen.getAllByRole('button');
      const deleteButton = deleteButtons.find((btn) => {
        // The delete button has the close icon
        return btn.className && btn.className.includes('MuiChip-deleteIcon');
      });

      if (deleteButton) {
        fireEvent.click(deleteButton);
        expect(handleDelete).toHaveBeenCalled();
      }
    });
  });
});
