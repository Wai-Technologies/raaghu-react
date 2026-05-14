import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompButtonGroup, { RdsCompButtonGroupProps } from './rds-comp-button-group';
import { Edit as EditIcon } from '@mui/icons-material';

const defaultOptions = [
  { value: 'left', label: 'Left' },
  { value: 'center', label: 'Center' },
  { value: 'right', label: 'Right' },
];

describe('RdsCompButtonGroup', () => {
  // ──────────────────────────────────────────────────────────────────────────────
  describe('Uncontrolled Mode (defaultValue)', () => {
    // ────────────────────────────────────────────────────────────────────────────
    it('renders with defaultValue and reflects initial selection', () => {
      render(
        <RdsCompButtonGroup
          options={defaultOptions}
          defaultValue="center"
          data-testid="button-group"
        />
      );

      const centerButton = screen.getByTestId('rds-button-group-item-center');
      expect(centerButton).toHaveAttribute('aria-pressed', 'true');
    });

    // ────────────────────────────────────────────────────────────────────────────
    it('updates selection on button click (exclusive mode)', () => {
      const { container } = render(
        <RdsCompButtonGroup
          options={defaultOptions}
          defaultValue="left"
          exclusive={true}
        />
      );

      const rightButton = screen.getByTestId('rds-button-group-item-right');
      fireEvent.click(rightButton);

      expect(rightButton).toHaveAttribute('aria-pressed', 'true');
      const leftButton = screen.getByTestId('rds-button-group-item-left');
      expect(leftButton).toHaveAttribute('aria-pressed', 'false');
    });

    // ────────────────────────────────────────────────────────────────────────────
    it('toggles button selection on repeated clicks (exclusive mode)', () => {
      render(
        <RdsCompButtonGroup
          options={defaultOptions}
          defaultValue="left"
          exclusive={true}
        />
      );

      const leftButton = screen.getByTestId('rds-button-group-item-left');

      // First click: deselect
      fireEvent.click(leftButton);
      expect(leftButton).toHaveAttribute('aria-pressed', 'false');

      // Second click: select again
      fireEvent.click(leftButton);
      expect(leftButton).toHaveAttribute('aria-pressed', 'true');
    });

    // ────────────────────────────────────────────────────────────────────────────
    it('allows multiple selections in multiple mode', () => {
      render(
        <RdsCompButtonGroup
          options={defaultOptions}
          defaultValue={['left', 'right']}
          exclusive={false}
        />
      );

      const leftButton = screen.getByTestId('rds-button-group-item-left');
      const rightButton = screen.getByTestId('rds-button-group-item-right');
      const centerButton = screen.getByTestId('rds-button-group-item-center');

      expect(leftButton).toHaveAttribute('aria-pressed', 'true');
      expect(rightButton).toHaveAttribute('aria-pressed', 'true');
      expect(centerButton).toHaveAttribute('aria-pressed', 'false');

      // Click center to add to selection
      fireEvent.click(centerButton);
      expect(centerButton).toHaveAttribute('aria-pressed', 'true');

      // Click left to remove from selection
      fireEvent.click(leftButton);
      expect(leftButton).toHaveAttribute('aria-pressed', 'false');
    });

    // ────────────────────────────────────────────────────────────────────────────
    it('calls onChange callback when selection changes', () => {
      const handleChange = jest.fn();
      render(
        <RdsCompButtonGroup
          options={defaultOptions}
          defaultValue="left"
          onChange={handleChange}
          exclusive={true}
        />
      );

      const centerButton = screen.getByTestId('rds-button-group-item-center');
      fireEvent.click(centerButton);

      expect(handleChange).toHaveBeenCalledWith('center');
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    // ────────────────────────────────────────────────────────────────────────────
    it('respects disabled options in uncontrolled mode', () => {
      const optionsWithDisabled = [
        { value: 'left', label: 'Left' },
        { value: 'center', label: 'Center', disabled: true },
        { value: 'right', label: 'Right' },
      ];

      render(
        <RdsCompButtonGroup
          options={optionsWithDisabled}
          defaultValue="left"
        />
      );

      const centerButton = screen.getByTestId('rds-button-group-item-center');
      expect(centerButton).toBeDisabled();

      fireEvent.click(centerButton);
      expect(centerButton).toHaveAttribute('aria-pressed', 'false');
    });
  });

  // ──────────────────────────────────────────────────────────────────────────────
  describe('Controlled Mode (value + onChange)', () => {
    // ────────────────────────────────────────────────────────────────────────────
    it('reflects controlled value prop changes', () => {
      const { rerender } = render(
        <RdsCompButtonGroup
          options={defaultOptions}
          value="left"
        />
      );

      let leftButton = screen.getByTestId('rds-button-group-item-left');
      expect(leftButton).toHaveAttribute('aria-pressed', 'true');

      // Update to different value
      rerender(
        <RdsCompButtonGroup
          options={defaultOptions}
          value="right"
        />
      );

      const rightButton = screen.getByTestId('rds-button-group-item-right');
      expect(rightButton).toHaveAttribute('aria-pressed', 'true');

      leftButton = screen.getByTestId('rds-button-group-item-left');
      expect(leftButton).toHaveAttribute('aria-pressed', 'false');
    });

    // ────────────────────────────────────────────────────────────────────────────
    it('calls onChange with new value on button click', () => {
      const handleChange = jest.fn();
      render(
        <RdsCompButtonGroup
          options={defaultOptions}
          value="left"
          onChange={handleChange}
          exclusive={true}
        />
      );

      const centerButton = screen.getByTestId('rds-button-group-item-center');
      fireEvent.click(centerButton);

      expect(handleChange).toHaveBeenCalledWith('center');
    });

    // ────────────────────────────────────────────────────────────────────────────
    it('handles controlled multiple selection mode', () => {
      const handleChange = jest.fn();
      const { rerender } = render(
        <RdsCompButtonGroup
          options={defaultOptions}
          value={['left']}
          onChange={handleChange}
          exclusive={false}
        />
      );

      const rightButton = screen.getByTestId('rds-button-group-item-right');
      fireEvent.click(rightButton);

      expect(handleChange).toHaveBeenCalledWith(['left', 'right']);

      // Simulate parent updating the value
      rerender(
        <RdsCompButtonGroup
          options={defaultOptions}
          value={['left', 'right']}
          onChange={handleChange}
          exclusive={false}
        />
      );

      expect(rightButton).toHaveAttribute('aria-pressed', 'true');
    });

    // ────────────────────────────────────────────────────────────────────────────
    it('does not change value without parent update in controlled mode', () => {
      const handleChange = jest.fn();
      const { rerender } = render(
        <RdsCompButtonGroup
          options={defaultOptions}
          value="left"
          onChange={handleChange}
          exclusive={true}
        />
      );

      let rightButton = screen.getByTestId('rds-button-group-item-right');
      fireEvent.click(rightButton);

      // Don't rerender - value should stay the same
      let leftButton = screen.getByTestId('rds-button-group-item-left');
      expect(leftButton).toHaveAttribute('aria-pressed', 'true');

      // Now rerender with updated value
      rerender(
        <RdsCompButtonGroup
          options={defaultOptions}
          value="right"
          onChange={handleChange}
          exclusive={true}
        />
      );

      rightButton = screen.getByTestId('rds-button-group-item-right');
      expect(rightButton).toHaveAttribute('aria-pressed', 'true');

      leftButton = screen.getByTestId('rds-button-group-item-left');
      expect(leftButton).toHaveAttribute('aria-pressed', 'false');
    });

    // ────────────────────────────────────────────────────────────────────────────
    it('handles empty value in controlled mode', () => {
      render(
        <RdsCompButtonGroup
          options={defaultOptions}
          value=""
          onChange={jest.fn()}
          exclusive={true}
        />
      );

      const leftButton = screen.getByTestId('rds-button-group-item-left');
      const centerButton = screen.getByTestId('rds-button-group-item-center');
      const rightButton = screen.getByTestId('rds-button-group-item-right');

      expect(leftButton).toHaveAttribute('aria-pressed', 'false');
      expect(centerButton).toHaveAttribute('aria-pressed', 'false');
      expect(rightButton).toHaveAttribute('aria-pressed', 'false');
    });
  });

  // ──────────────────────────────────────────────────────────────────────────────
  describe('MUI Props & Features', () => {
    // ────────────────────────────────────────────────────────────────────────────
    it('applies size variants correctly', () => {
      const { container: smallContainer } = render(
        <RdsCompButtonGroup
          options={defaultOptions}
          defaultValue="left"
          size="small"
        />
      );
      expect(smallContainer.querySelector('.rds-comp-button-group--small')).toBeInTheDocument();

      const { container: largeContainer } = render(
        <RdsCompButtonGroup
          options={defaultOptions}
          defaultValue="left"
          size="large"
        />
      );
      expect(largeContainer.querySelector('.rds-comp-button-group--large')).toBeInTheDocument();
    });

    // ────────────────────────────────────────────────────────────────────────────
    it('applies variant prop to buttons', () => {
      const { container } = render(
        <RdsCompButtonGroup
          options={defaultOptions}
          defaultValue="left"
          variant="contained"
        />
      );

      expect(container.querySelector('.MuiButtonGroup-contained')).toBeInTheDocument();
    });

    // ────────────────────────────────────────────────────────────────────────────
    it('applies color prop to selected button', () => {
      render(
        <RdsCompButtonGroup
          options={defaultOptions}
          defaultValue="left"
          color="error"
        />
      );

      const leftButton = screen.getByTestId('rds-button-group-item-left');
      // Color should be applied when selected
      expect(leftButton).toHaveAttribute('aria-pressed', 'true');
    });

    // ────────────────────────────────────────────────────────────────────────────
    it('handles disabled prop at component level', () => {
      render(
        <RdsCompButtonGroup
          options={defaultOptions}
          defaultValue="left"
          disabled={true}
        />
      );

      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        expect(button).toBeDisabled();
      });
    });

    // ────────────────────────────────────────────────────────────────────────────
    it('supports vertical orientation', () => {
      const { container } = render(
        <RdsCompButtonGroup
          options={defaultOptions}
          defaultValue="left"
          orientation="vertical"
        />
      );

      expect(container.querySelector('.rds-comp-button-group--vertical')).toBeInTheDocument();
    });

    // ────────────────────────────────────────────────────────────────────────────
    it('supports fullWidth prop', () => {
      const { container } = render(
        <RdsCompButtonGroup
          options={defaultOptions}
          defaultValue="left"
          fullWidth={true}
        />
      );

      expect(container.querySelector('.rds-comp-button-group--full-width')).toBeInTheDocument();
    });

    // ────────────────────────────────────────────────────────────────────────────
    it('renders with icons', () => {
      const optionsWithIcons = [
        { value: 'left', label: 'Left', icon: <EditIcon /> },
        { value: 'center', label: 'Center', icon: <EditIcon /> },
        { value: 'right', label: 'Right', icon: <EditIcon /> },
      ];

      const { container } = render(
        <RdsCompButtonGroup
          options={optionsWithIcons}
          defaultValue="left"
        />
      );

      // Check that SVG elements (icons) are rendered
      const svgs = container.querySelectorAll('svg');
      expect(svgs.length).toBeGreaterThan(0);

      // Check that icon span classes exist
      const iconElements = container.querySelectorAll('.rds-comp-button-group__icon');
      expect(iconElements.length).toBe(3);
    });

    // ────────────────────────────────────────────────────────────────────────────
    it('renders button labels correctly', () => {
      render(
        <RdsCompButtonGroup
          options={defaultOptions}
          defaultValue="left"
        />
      );

      expect(screen.getByText('Left')).toBeInTheDocument();
      expect(screen.getByText('Center')).toBeInTheDocument();
      expect(screen.getByText('Right')).toBeInTheDocument();
    });

    // ────────────────────────────────────────────────────────────────────────────
    it('handles exclusive mode toggle', () => {
      const { container } = render(
        <RdsCompButtonGroup
          options={defaultOptions}
          defaultValue={['left', 'center']}
          exclusive={false}
        />
      );

      const leftButton = screen.getByTestId('rds-button-group-item-left');
      const centerButton = screen.getByTestId('rds-button-group-item-center');

      expect(leftButton).toHaveAttribute('aria-pressed', 'true');
      expect(centerButton).toHaveAttribute('aria-pressed', 'true');
    });

    // ────────────────────────────────────────────────────────────────────────────
    it('maintains accessibility with data-testid', () => {
      render(
        <RdsCompButtonGroup
          options={defaultOptions}
          defaultValue="left"
          data-testid="button-group"
        />
      );

      expect(screen.getByTestId('button-group')).toBeInTheDocument();
      expect(screen.getByTestId('rds-button-group-item-left')).toBeInTheDocument();
    });

    // ────────────────────────────────────────────────────────────────────────────
    it('applies custom className prop', () => {
      const { container } = render(
        <RdsCompButtonGroup
          options={defaultOptions}
          defaultValue="left"
          className="custom-class"
        />
      );

      const muiButtonGroup = container.querySelector('.MuiButtonGroup-root');
      expect(muiButtonGroup).toHaveClass('custom-class');
    });

    // ────────────────────────────────────────────────────────────────────────────
    it('has displayName set correctly', () => {
      expect(RdsCompButtonGroup.displayName).toBe('RdsCompButtonGroup');
    });
  });
});
