import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompProductImage, { Item } from '../src/rds-comp-product-image/rds-comp-product-image';

// Mock the ColorVariant enum
jest.mock('../../raaghu-elements/src/rds-rating/rds-rating', () => ({
  ColorVariant: {
    Warning: 'warning'
  }
}));

// Mock the dependencies
jest.mock('../src/rds-elements', () => ({
  RdsLabel: ({ label, size }: any) => <div data-testid="rds-label" data-size={size}>{label}</div>,
  RdsBadge: ({ label, size, shape, colorVariant, children }: any) => (
    <div data-testid="rds-badge" data-color={colorVariant} data-shape={shape} data-size={size}>
      {label}
      {children}
    </div>
  ),
  RdsIcon: ({ name, colorVariant, height, width, fill, stroke, onClick }: any) => (
    <div 
      data-testid={`rds-icon-${name}`} 
      data-color={colorVariant} 
      data-fill={fill}
      onClick={onClick}
    >
      {name}
    </div>
  ),
  RdsRating: ({ rating, colorVariant }: any) => (
    <div data-testid="rds-rating" data-rating={rating} data-color={colorVariant}>
      Rating: {rating}
    </div>
  ),
  RdsColorSwitcher: ({ itemList }: any) => (
    <div data-testid="rds-color-switcher">
      {itemList && itemList.map((item: any) => (
        <div key={item.id} data-color={item.color}></div>
      ))}
    </div>
  ),
  RdsButton: ({ colorVariant, type, isOutline, label, block }: any) => (
    <button 
      data-testid={`button-${label.toLowerCase().replace(/\s+/g, '-')}`}
      data-color={colorVariant}
      data-outline={isOutline}
      data-block={block}
      type={type}
    >
      {label}
    </button>
  )
}));

describe('RdsCompProductImage', () => {
  // Define item object that matches the interface requirements
  const defaultItem: Item = {
    imgUrl: '/path/to/image.jpg',
    rating: 4,
    reviews: '42 reviews',
    productTitle: 'Test Product',
    productDescription: 'This is a test product description',
    colorLabel: 'Available Colors',
    cost: '$35',
    badgeWithIcon: { badge: 'Sale', icon: 'discount' },
    itemWidth: '300px',
    ColorSwitcherList: [
      { id: 1, color: 'red' },
      { id: 2, color: 'blue' },
      { id: 3, color: 'green' }
    ],
    showAddToBagButton: true,
    showBuyNowButton: true,
    bordered: true
  };

  it('should render product image with all elements', () => {
    render(<RdsCompProductImage item={defaultItem} />);
    
    // Check main product image
    const productImg = screen.getByAltText('product-img');
    expect(productImg).toBeInTheDocument();
    expect(productImg).toHaveAttribute('src', '/path/to/image.jpg');
    
    // Check product title
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    
    // Check heart icon
    expect(screen.getByTestId('rds-icon-heart')).toBeInTheDocument();
    
    // Check rating
    expect(screen.getByTestId('rds-rating')).toBeInTheDocument();
    expect(screen.getByTestId('rds-rating')).toHaveAttribute('data-rating', '4');
    
    // Check reviews
    expect(screen.getByText('42 reviews')).toBeInTheDocument();
    
    // Check product description
    expect(screen.getByText('This is a test product description')).toBeInTheDocument();
    
    // Check color label
    expect(screen.getByText('Available Colors')).toBeInTheDocument();
    
    // Check color switcher
    expect(screen.getByTestId('rds-color-switcher')).toBeInTheDocument();
    
    // Check cost
    expect(screen.getByText('$35')).toBeInTheDocument();
    
    // Check badge
    expect(screen.getByTestId('rds-badge')).toBeInTheDocument();
    expect(screen.getByText('Sale')).toBeInTheDocument();
    expect(screen.getByTestId('rds-icon-discount')).toBeInTheDocument();
    
    // Check buttons
    expect(screen.getByTestId('button-add-to-bag')).toBeInTheDocument();
    expect(screen.getByTestId('button-buy-now')).toBeInTheDocument();
  });

  it('should toggle heart icon on click', () => {
    render(<RdsCompProductImage item={defaultItem} />);
    
    const heartIcon = screen.getByTestId('rds-icon-heart');
    
    // Initial state should be unfilled (false)
    expect(heartIcon).toHaveAttribute('data-fill', 'false');
    expect(heartIcon).toHaveAttribute('data-color', 'dark');
    
    // Click the heart icon
    fireEvent.click(heartIcon);
    
    // Heart should now be filled
    expect(heartIcon).toHaveAttribute('data-fill', 'true');
    expect(heartIcon).toHaveAttribute('data-color', 'danger');
    
    // Click again to toggle back
    fireEvent.click(heartIcon);
    
    // Heart should be unfilled again
    expect(heartIcon).toHaveAttribute('data-fill', 'false');
    expect(heartIcon).toHaveAttribute('data-color', 'dark');
  });

  it('should render with border when bordered prop is true', () => {
    render(<RdsCompProductImage item={defaultItem} />);
    
    const container = screen.getByAltText('product-img').closest('.product-container');
    expect(container).toHaveClass('border');
  });

  it('should render without border when bordered prop is false', () => {
    const itemWithoutBorder = { ...defaultItem, bordered: false };
    render(<RdsCompProductImage item={itemWithoutBorder} />);
    
    const container = screen.getByAltText('product-img').closest('.product-container');
    expect(container).not.toHaveClass('border');
  });  it('should render with only Buy Now button when showAddToBagButton is not provided', () => {
    // Create a new item without showAddToBagButton (undefined)
    const { showAddToBagButton, ...restOfItem } = defaultItem;
    
    render(<RdsCompProductImage item={restOfItem} />);
    
    expect(screen.queryByTestId('button-add-to-bag')).not.toBeInTheDocument();
    expect(screen.getByTestId('button-buy-now')).toBeInTheDocument();
    expect(screen.getByTestId('button-buy-now')).toHaveAttribute('data-block', 'true');
  });
  it('should render with only Add To Bag button when showBuyNowButton is not provided', () => {
    // Create a new item without showBuyNowButton (undefined)
    const { showBuyNowButton, ...itemWithoutBuyNow } = defaultItem;
    
    render(<RdsCompProductImage item={itemWithoutBuyNow} />);
    
    expect(screen.getByTestId('button-add-to-bag')).toBeInTheDocument();
    expect(screen.queryByTestId('button-buy-now')).not.toBeInTheDocument();
    expect(screen.getByTestId('button-add-to-bag')).toHaveAttribute('data-block', 'true');
  });

  it('should not render rating when rating is not provided', () => {
    const itemWithoutRating = { ...defaultItem, rating: undefined };
    render(<RdsCompProductImage item={itemWithoutRating} />);
    
    expect(screen.queryByTestId('rds-rating')).not.toBeInTheDocument();
  });

  it('should not render reviews when reviews are not provided', () => {
    const itemWithoutReviews = { ...defaultItem, reviews: undefined };
    render(<RdsCompProductImage item={itemWithoutReviews} />);
    
    expect(screen.queryByText('42 reviews')).not.toBeInTheDocument();
  });

  it('should not render product description when not provided', () => {
    const itemWithoutDescription = { ...defaultItem, productDescription: undefined };
    render(<RdsCompProductImage item={itemWithoutDescription} />);
    
    expect(screen.queryByText('This is a test product description')).not.toBeInTheDocument();
  });

  it('should not render color label when not provided', () => {
    const itemWithoutColorLabel = { ...defaultItem, colorLabel: undefined };
    render(<RdsCompProductImage item={itemWithoutColorLabel} />);
    
    expect(screen.queryByText('Available Colors')).not.toBeInTheDocument();
  });

  it('should not render ColorSwitcher when ColorSwitcherList is not provided', () => {
    const itemWithoutColorSwitcher = { ...defaultItem, ColorSwitcherList: undefined };
    render(<RdsCompProductImage item={itemWithoutColorSwitcher} />);
    
    expect(screen.queryByTestId('rds-color-switcher')).not.toBeInTheDocument();
  });

  it('should not render badge when badgeWithIcon is not provided', () => {
    const itemWithoutBadge = { ...defaultItem, badgeWithIcon: undefined };
    render(<RdsCompProductImage item={itemWithoutBadge} />);
    
    expect(screen.queryByTestId('rds-badge')).not.toBeInTheDocument();
    expect(screen.queryByText('Sale')).not.toBeInTheDocument();
  });
  it('should not render buttons when both button flags are not provided', () => {
    // Create a new item without button flags (both undefined)
    const { showAddToBagButton, showBuyNowButton, ...itemWithoutButtons } = defaultItem;
    
    render(<RdsCompProductImage item={itemWithoutButtons} />);
    
    expect(screen.queryByTestId('button-add-to-bag')).not.toBeInTheDocument();
    expect(screen.queryByTestId('button-buy-now')).not.toBeInTheDocument();
  });
});