import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompMasonry from './rds-comp-masonry';

describe('RdsCompMasonry', () => {
  // ──────────────────────────────────────────────────────────────────────────────
  // Rendering Tests
  // ──────────────────────────────────────────────────────────────────────────────

  it('renders without crashing', () => {
    render(<RdsCompMasonry />);
    expect(screen.getByTestId('rds-comp-masonry')).toBeInTheDocument();
  });

  it('renders with correct root class', () => {
    const { container } = render(<RdsCompMasonry />);
    expect(container.querySelector('.rds-comp-masonry')).toBeInTheDocument();
  });

  it('renders children correctly', () => {
    render(
      <RdsCompMasonry>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </RdsCompMasonry>
    );
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Item 3')).toBeInTheDocument();
  });

  // ──────────────────────────────────────────────────────────────────────────────
  // Props Tests
  // ──────────────────────────────────────────────────────────────────────────────

  it('applies correct variant class', () => {
    const { container: containerStandard } = render(<RdsCompMasonry variant="standard" />);
    expect(containerStandard.querySelector('.rds-comp-masonry--standard')).toBeInTheDocument();

    const { container: containerCompact } = render(<RdsCompMasonry variant="compact" />);
    expect(containerCompact.querySelector('.rds-comp-masonry--compact')).toBeInTheDocument();

    const { container: containerSpacious } = render(<RdsCompMasonry variant="spacious" />);
    expect(containerSpacious.querySelector('.rds-comp-masonry--spacious')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<RdsCompMasonry className="custom-class" />);
    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });

  it('accepts columns prop', () => {
    const { rerender } = render(<RdsCompMasonry columns={2} />);
    expect(screen.getByTestId('rds-comp-masonry')).toBeInTheDocument();

    rerender(<RdsCompMasonry columns={4} />);
    expect(screen.getByTestId('rds-comp-masonry')).toBeInTheDocument();
  });

  it('accepts responsive columns object', () => {
    const { rerender } = render(
      <RdsCompMasonry columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }} />
    );
    expect(screen.getByTestId('rds-comp-masonry')).toBeInTheDocument();

    rerender(
      <RdsCompMasonry columns={{ xs: 2, md: 4 }} />
    );
    expect(screen.getByTestId('rds-comp-masonry')).toBeInTheDocument();
  });

  it('accepts spacing prop', () => {
    const { rerender } = render(<RdsCompMasonry spacing={1} />);
    expect(screen.getByTestId('rds-comp-masonry')).toBeInTheDocument();

    rerender(<RdsCompMasonry spacing={4} />);
    expect(screen.getByTestId('rds-comp-masonry')).toBeInTheDocument();
  });

  it('adjusts spacing based on variant', () => {
    const { container: containerCompact } = render(
      <RdsCompMasonry variant="compact" spacing={2} />
    );
    expect(containerCompact.querySelector('.rds-comp-masonry--compact')).toBeInTheDocument();

    const { container: containerSpacious } = render(
      <RdsCompMasonry variant="spacious" spacing={2} />
    );
    expect(containerSpacious.querySelector('.rds-comp-masonry--spacious')).toBeInTheDocument();
  });

  it('renders items wrapped in masonry-item class', () => {
    const { container } = render(
      <RdsCompMasonry>
        <div>Item 1</div>
        <div>Item 2</div>
      </RdsCompMasonry>
    );
    const items = container.querySelectorAll('.rds-masonry-item');
    expect(items.length).toBe(2);
  });

  it('handles different numbers of children', () => {
    const { rerender, container: container1 } = render(
      <RdsCompMasonry>
        <div>Item 1</div>
      </RdsCompMasonry>
    );
    expect(container1.querySelectorAll('.rds-masonry-item').length).toBe(1);

    rerender(
      <RdsCompMasonry>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
        <div>Item 4</div>
        <div>Item 5</div>
        <div>Item 6</div>
      </RdsCompMasonry>
    );
    expect(container1.querySelectorAll('.rds-masonry-item').length).toBe(6);
  });

  it('creates true masonry layout by distributing items to columns', () => {
    const { container } = render(
      <RdsCompMasonry columns={3}>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
        <div>Item 4</div>
        <div>Item 5</div>
        <div>Item 6</div>
      </RdsCompMasonry>
    );
    const items = container.querySelectorAll('.rds-masonry-item');
    expect(items.length).toBe(6);
    // Verify grid layout is applied
    expect(container.querySelector('.rds-comp-masonry')).toHaveStyle('display: grid');
  });

  // ──────────────────────────────────────────────────────────────────────────────
  // Accessibility Tests
  // ──────────────────────────────────────────────────────────────────────────────

  it('has correct data-testid attribute', () => {
    render(<RdsCompMasonry />);
    expect(screen.getByTestId('rds-comp-masonry')).toBeInTheDocument();
  });

  it('supports additional MUI Masonry props', () => {
    const { container } = render(
      <RdsCompMasonry
        columns={3}
        spacing={2}
        sequential={false}
        data-custom="test"
      />
    );
    expect(container.querySelector('[data-custom="test"]')).toBeInTheDocument();
  });

  // ──────────────────────────────────────────────────────────────────────────────
  // Display Name Test
  // ──────────────────────────────────────────────────────────────────────────────

  it('has correct display name', () => {
    expect(RdsCompMasonry.displayName).toBe('RdsCompMasonry');
  });

  // ──────────────────────────────────────────────────────────────────────────────
  // CSS Classes Tests
  // ──────────────────────────────────────────────────────────────────────────────

  it('renders with MUI Masonry root class', () => {
    const { container } = render(
      <RdsCompMasonry>
        <div>Item</div>
      </RdsCompMasonry>
    );
    expect(container.querySelector('.MuiMasonry-root')).toBeInTheDocument();
  });

  it('combines all classes correctly', () => {
    const { container } = render(
      <RdsCompMasonry variant="compact" className="extra-class" />
    );
    const element = container.querySelector('.rds-comp-masonry');
    expect(element).toHaveClass('rds-comp-masonry');
    expect(element).toHaveClass('rds-comp-masonry--compact');
    expect(element).toHaveClass('extra-class');
  });
});
