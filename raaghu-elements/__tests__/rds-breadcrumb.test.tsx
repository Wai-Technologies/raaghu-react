import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import RdsBreadcrumb, {
  BreadcrumbProps,
  BreadcrumbStyle,
  BreadcrumbSeparator,
  BreadcrumbLevel,
  BreadcrumbState,
} from '../src/rds-breadcrumb/rds-breadcrumb';

// Polyfill fetch for Jest (Node.js environment)
if (typeof global !== 'undefined' && typeof global.fetch === 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  global.fetch = require('node-fetch');
}

// Mock RdsIcon to avoid fetch and SVG loading in tests
jest.mock('../src/rds-icon/rds-icon', () => ({
  __esModule: true,
  default: (props: any) => <svg data-testid="mock-rds-icon" {...props} />,
}));

const breadcrumbItemsMock = [
  { id: 1, label: 'Home', route: '/' },
  { id: 2, label: 'Products', route: '/products' },
  { id: 3, label: 'Electronics', route: '/products/electronics' },
];

const defaultProps: BreadcrumbProps = {
  breadcrumbItems: breadcrumbItemsMock,
  separator: BreadcrumbSeparator.Slash,
  style: BreadcrumbStyle.WithoutBackground,
  showIcon: false,
};

describe('RdsBreadcrumb', () => {
  it('renders breadcrumb items correctly', () => {
    const { getByText } = render(<RdsBreadcrumb {...defaultProps} />);
    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('Products')).toBeInTheDocument();
    expect(getByText('Electronics')).toBeInTheDocument();
  });

  it('renders with icon when showIcon is true', () => {
    const { container } = render(
      <RdsBreadcrumb {...defaultProps} showIcon={true} icons={['home', 'product', 'electronics']} />
    );
    expect(container.querySelectorAll('svg').length).toBeGreaterThan(0);
  });

  it('displays separator between breadcrumb items', () => {
    const { container } = render(<RdsBreadcrumb {...defaultProps} separator={BreadcrumbSeparator.Arrow} />);
    expect(container.textContent).toContain('→');
  });

  it('respects breadcrumb level restriction', () => {
    const { queryByText } = render(<RdsBreadcrumb {...defaultProps} level={BreadcrumbLevel.Level2} />);
    expect(queryByText('Electronics')).not.toBeInTheDocument();
  });

  it('invokes click handler with correct ID', () => {
    const handleClick = jest.fn();
    const { getByText } = render(<RdsBreadcrumb {...defaultProps} onBreadcrumbClick={handleClick} />);
    fireEvent.click(getByText('Products'));
    expect(handleClick).toHaveBeenCalledWith(2);
  });

  it('applies correct state styles (Hover)', () => {
    const { getByText } = render(
      <RdsBreadcrumb {...defaultProps} state={BreadcrumbState.Hover} />
    );
    const productItem = getByText('Products');
    fireEvent.mouseEnter(productItem);
    expect(productItem.parentElement).toHaveClass('breadcrumb-hover');
  });

  it('applies correct border color and placement', () => {
    const { getByText } = render(
      <RdsBreadcrumb
        {...defaultProps}
        state={BreadcrumbState.Selected}
        borderColor="red"
        borderPlacement="top"
      />
    );
    const lastItem = getByText('Electronics').parentElement!;
    // Debug log
    // eslint-disable-next-line no-console
    console.log('Last item class:', lastItem.className, 'style:', lastItem.getAttribute('style'));
    expect(lastItem).toHaveStyle('border-top: 2px solid red');
  });

  it('renders with pill background style', () => {
    const { container, getByText } = render(
      <RdsBreadcrumb {...defaultProps} style={BreadcrumbStyle.PillBackground} />
    );
    const lastItem = getByText('Electronics').parentElement!;
    expect(lastItem.className).toContain('breadcrumb-pill');
  });

  it('renders snapshot correctly', () => {
    const { container } = render(<RdsBreadcrumb {...defaultProps} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
