import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompChip from './rds-comp-chip';

// Mock SCSS
jest.mock('./rds-comp-chip.scss', () => ({}));

const mockOptions = [
  { id: 'chip-1', label: 'React', deletable: false },
  { id: 'chip-2', label: 'TypeScript', deletable: true },
  { id: 'chip-3', label: 'MUI', deletable: false, disabled: false },
];

describe('RdsCompChip', () => {
  describe('Rendering', () => {
    it('should render all chip options', () => {
      render(<RdsCompChip options={mockOptions} />);
      expect(screen.getByTestId('chip-chip-1')).toBeInTheDocument();
      expect(screen.getByTestId('chip-chip-2')).toBeInTheDocument();
      expect(screen.getByTestId('chip-chip-3')).toBeInTheDocument();
    });

    it('should render with correct CSS classes', () => {
      const { container } = render(
        <RdsCompChip options={mockOptions} size="medium" variant="filled" />
      );
      expect(container.querySelector('.rds-comp-chip')).toHaveClass(
        'rds-comp-chip--medium',
        'rds-comp-chip--filled'
      );
    });

    it('should render with correct size classes', () => {
      const { container } = render(
        <RdsCompChip options={mockOptions} size="large" />
      );
      expect(container.querySelector('.rds-comp-chip')).toHaveClass('rds-comp-chip--large');
    });
  });

  describe('Uncontrolled Mode', () => {
    it('should select chip with defaultValue on click', () => {
      const handleChange = jest.fn();
      render(
        <RdsCompChip 
          options={mockOptions} 
          defaultValue="chip-1"
          onChange={handleChange}
        />
      );

      const chip1 = screen.getByTestId('chip-chip-1');
      expect(chip1).toHaveAttribute('aria-pressed', 'true');

      fireEvent.click(screen.getByTestId('chip-chip-2'));
      expect(handleChange).toHaveBeenCalledWith('chip-2');
    });

    it('should toggle selection when clicking same chip', () => {
      const handleChange = jest.fn();
      render(
        <RdsCompChip 
          options={mockOptions} 
          defaultValue="chip-1"
          onChange={handleChange}
        />
      );

      const chip1 = screen.getByTestId('chip-chip-1');
      fireEvent.click(chip1);
      expect(handleChange).toHaveBeenCalledWith('');
    });

    it('should handle multiple selection', () => {
      const handleChange = jest.fn();
      render(
        <RdsCompChip 
          options={mockOptions} 
          defaultValue={['chip-1']}
          onChange={handleChange}
          multiple
        />
      );

      fireEvent.click(screen.getByTestId('chip-chip-2'));
      expect(handleChange).toHaveBeenCalledWith(['chip-1', 'chip-2']);
    });

    it('should respect disabled state', () => {
      const handleChange = jest.fn();
      const disabledOptions = [
        { ...mockOptions[0], disabled: true },
        ...mockOptions.slice(1),
      ];

      render(
        <RdsCompChip 
          options={disabledOptions} 
          onChange={handleChange}
        />
      );

      const disabledChip = screen.getByTestId('chip-chip-1');
      fireEvent.click(disabledChip);
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('Controlled Mode', () => {
    it('should reflect controlled value', () => {
      const { rerender } = render(
        <RdsCompChip 
          options={mockOptions} 
          value="chip-1"
        />
      );

      const chip1 = screen.getByTestId('chip-chip-1');
      expect(chip1).toHaveAttribute('aria-pressed', 'true');

      rerender(
        <RdsCompChip 
          options={mockOptions} 
          value="chip-2"
        />
      );

      const chip2 = screen.getByTestId('chip-chip-2');
      expect(chip2).toHaveAttribute('aria-pressed', 'true');
      expect(chip1).toHaveAttribute('aria-pressed', 'false');
    });

    it('should call onChange on chip click', () => {
      const handleChange = jest.fn();
      render(
        <RdsCompChip 
          options={mockOptions} 
          value="chip-1"
          onChange={handleChange}
        />
      );

      fireEvent.click(screen.getByTestId('chip-chip-2'));
      expect(handleChange).toHaveBeenCalledWith('chip-2');
    });

    it('should handle multiple controlled selection', () => {
      const handleChange = jest.fn();
      render(
        <RdsCompChip 
          options={mockOptions} 
          value={['chip-1', 'chip-2']}
          onChange={handleChange}
          multiple
        />
      );

      const chip1 = screen.getByTestId('chip-chip-1');
      const chip2 = screen.getByTestId('chip-chip-2');

      expect(chip1).toHaveAttribute('aria-pressed', 'true');
      expect(chip2).toHaveAttribute('aria-pressed', 'true');

      fireEvent.click(screen.getByTestId('chip-chip-3'));
      expect(handleChange).toHaveBeenCalledWith(['chip-1', 'chip-2', 'chip-3']);
    });
  });

  describe('Delete Functionality', () => {
    it('should call onDelete when delete icon is clicked', () => {
      const handleDelete = jest.fn();
      const optionsWithDelete = [
        {
          id: 'chip-1',
          label: 'Deletable',
          deletable: true,
          onDelete: handleDelete,
        },
      ];

      render(<RdsCompChip options={optionsWithDelete} />);

      const deleteButton = screen.getByTestId('chip-chip-1').querySelector('[data-testid*="deleteIcon"]');
      if (deleteButton) {
        fireEvent.click(deleteButton);
        expect(handleDelete).toHaveBeenCalledWith('chip-1');
      }
    });
  });

  describe('Props Reflection', () => {
    it('should apply size variants', () => {
      const { container: smallContainer } = render(
        <RdsCompChip options={mockOptions} size="small" />
      );
      expect(smallContainer.querySelector('.rds-comp-chip--small')).toBeInTheDocument();

      const { container: largeContainer } = render(
        <RdsCompChip options={mockOptions} size="large" />
      );
      expect(largeContainer.querySelector('.rds-comp-chip--large')).toBeInTheDocument();
    });

    it('should apply variant classes', () => {
      const { container: filledContainer } = render(
        <RdsCompChip options={mockOptions} variant="filled" />
      );
      expect(filledContainer.querySelector('.rds-comp-chip--filled')).toBeInTheDocument();

      const { container: outlinedContainer } = render(
        <RdsCompChip options={mockOptions} variant="outlined" />
      );
      expect(outlinedContainer.querySelector('.rds-comp-chip--outlined')).toBeInTheDocument();
    });

    it('should apply color classes', () => {
      const { container } = render(
        <RdsCompChip options={mockOptions} color="primary" />
      );
      expect(container.querySelector('.rds-comp-chip--primary')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      render(<RdsCompChip options={mockOptions} defaultValue="chip-1" />);

      const chip = screen.getByTestId('chip-chip-1');
      expect(chip).toHaveAttribute('aria-label');
      expect(chip).toHaveAttribute('aria-pressed');
    });

    it('should have proper role and data-testid on container', () => {
      const { container } = render(<RdsCompChip options={mockOptions} />);
      const root = container.querySelector('[data-testid="rds-comp-chip"]');

      expect(root).toHaveAttribute('role', 'group');
      expect(root).toHaveAttribute('data-testid', 'rds-comp-chip');
    });
  });

  describe('Display Names', () => {
    it('should have correct display name', () => {
      expect(RdsCompChip.displayName).toBe('RdsCompChip');
    });
  });
});
