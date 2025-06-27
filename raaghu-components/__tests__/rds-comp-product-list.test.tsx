import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompProductList from '../src/rds-comp-product-list/rds-comp-product-list';
import { Item } from '../src/rds-comp-product-image/rds-comp-product-image';

// Mock the dependencies
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock('../src/rds-elements', () => ({
  RdsLabel: ({ label, multiline }: any) => (
    <div data-testid="rds-label" data-multiline={multiline}>{label}</div>
  ),
  RdsIcon: ({ name, colorVariant, height, width, fill, stroke }: any) => (
    <div 
      data-testid={`rds-icon-${name}`} 
      data-color={colorVariant}
      data-fill={fill}
    >
      {name}
    </div>
  ),
  RdsButton: ({ colorVariant, type, label, block, onClick }: any) => (
    <button 
      data-testid={`button-${label.toLowerCase().replace(/\s+/g, '-')}`}
      data-color={colorVariant}
      data-block={block}
      type={type}
      onClick={onClick}
    >
      {label}
    </button>
  )
}));

// Mock the RdsCompProductImage component
jest.mock('../src/rds-comp-product-image/rds-comp-product-image', () => {
  return {
    __esModule: true,
    default: ({ item }: { item: Item }) => (
      <div data-testid="product-image" data-product-title={item.productTitle}>
        Product Image: {item.productTitle}
      </div>
    )
  };
});

describe('RdsCompProductList', () => {
  // Sample items for testing
  const sampleItems: Item[] = [
    {
      imgUrl: '/path/to/image1.jpg',
      productTitle: 'Product 1',
      rating: 4,
      reviews: '24 reviews',
      productDescription: 'Description for product 1',
      colorLabel: 'Available Colors',
      cost: '$25',
      showAddToBagButton: true,
      showBuyNowButton: true,
      bordered: true
    },
    {
      imgUrl: '/path/to/image2.jpg',
      productTitle: 'Product 2',
      rating: 5,
      reviews: '36 reviews',
      productDescription: 'Description for product 2',
      colorLabel: 'Colors',
      cost: '$35',
      showAddToBagButton: true,
      showBuyNowButton: true,
      bordered: false
    },
    {
      imgUrl: '/path/to/image3.jpg',
      productTitle: 'Product 3',
      rating: 3,
      reviews: '12 reviews',
      productDescription: 'Description for product 3',
      colorLabel: 'Available Colors',
      cost: '$45',
      showAddToBagButton: false,
      showBuyNowButton: true,
      bordered: true
    },
    {
      imgUrl: '/path/to/image4.jpg',
      productTitle: 'Product 4',
      rating: 4,
      reviews: '18 reviews',
      productDescription: 'Description for product 4',
      colorLabel: 'Colors',
      cost: '$55',
      showAddToBagButton: true,
      showBuyNowButton: true,
      bordered: false
    },
    {
      imgUrl: '/path/to/image5.jpg',
      productTitle: 'Product 5',
      rating: 5,
      reviews: '42 reviews',
      productDescription: 'Description for product 5',
      colorLabel: 'Available Colors',
      cost: '$65',
      showAddToBagButton: true,
      showBuyNowButton: true,
      bordered: true
    },
    {
      imgUrl: '/path/to/image6.jpg',
      productTitle: 'Product 6',
      rating: 4,
      reviews: '30 reviews',
      productDescription: 'Description for product 6',
      colorLabel: 'Colors',
      cost: '$75',
      showAddToBagButton: false,
      showBuyNowButton: true,
      bordered: false
    },
    {
      imgUrl: '/path/to/image7.jpg',
      productTitle: 'Product 7',
      rating: 3,
      reviews: '10 reviews',
      productDescription: 'Description for product 7',
      colorLabel: 'Available Colors',
      cost: '$85',
      showAddToBagButton: true,
      showBuyNowButton: true,
      bordered: true
    },
    {
      imgUrl: '/path/to/image8.jpg',
      productTitle: 'Product 8',
      rating: 5,
      reviews: '48 reviews',
      productDescription: 'Description for product 8',
      colorLabel: 'Colors',
      cost: '$95',
      showAddToBagButton: true,
      showBuyNowButton: true,
      bordered: false
    }
  ];

  it('should render all products for default type', () => {
    render(<RdsCompProductList items={sampleItems} />);
    
    // Check if all products are rendered
    const productElements = screen.getAllByTestId('product-image');
    expect(productElements.length).toBe(sampleItems.length);
    
    // No header should be rendered for default type
    expect(screen.queryByText('Trending Products')).not.toBeInTheDocument();
    
    // No "Load More" button for default type
    expect(screen.queryByTestId('button-load-more')).not.toBeInTheDocument();
  });

  it('should render with tall images and CTA link', () => {
    render(<RdsCompProductList items={sampleItems} type="With Tall Images And CTA Link" />);
    
    // Check header content
    expect(screen.getByText('Trending Products')).toBeInTheDocument();
    expect(screen.getByText('Shop the collection')).toBeInTheDocument();
    expect(screen.getByTestId('rds-icon-right')).toBeInTheDocument();
    
    // Check if all products are rendered
    const productElements = screen.getAllByTestId('product-image');
    expect(productElements.length).toBe(sampleItems.length);
  });

  it('should render with color swatches and horizontal scrolling', () => {
    render(<RdsCompProductList items={sampleItems} type="With Color Swatches and Horizontal Scrolling" />);
    
    // Check header content
    expect(screen.getByText('Trending Products')).toBeInTheDocument();
    expect(screen.getByText('Shop everything')).toBeInTheDocument();
    expect(screen.getByTestId('rds-icon-right')).toBeInTheDocument();
    
    // Check if all products are rendered
    const productElements = screen.getAllByTestId('product-image');
    expect(productElements.length).toBe(sampleItems.length);
  });

  it('should render infinite list with load more button', () => {
    render(<RdsCompProductList items={sampleItems} type="Infinite List" />);
    
    // Initially only the first 6 products should be visible
    const initialProducts = screen.getAllByTestId('product-image');
    expect(initialProducts.length).toBe(6);
    
    // Load More button should be visible
    const loadMoreButton = screen.getByTestId('button-load-more');
    expect(loadMoreButton).toBeInTheDocument();
    
    // Click the load more button
    fireEvent.click(loadMoreButton);
    
    // After clicking, all products should be visible
    const allProducts = screen.getAllByTestId('product-image');
    expect(allProducts.length).toBe(sampleItems.length);
    
    // Load More button should no longer be visible
    expect(screen.queryByTestId('button-load-more')).not.toBeInTheDocument();
  });

  it('should not render any headers for unrecognized type', () => {
    render(<RdsCompProductList items={sampleItems} type="Unknown Type" />);
    
    // No header should be rendered
    expect(screen.queryByText('Trending Products')).not.toBeInTheDocument();
    expect(screen.queryByText('Shop the collection')).not.toBeInTheDocument();
    expect(screen.queryByText('Shop everything')).not.toBeInTheDocument();
    
    // Still all products should be rendered
    const productElements = screen.getAllByTestId('product-image');
    expect(productElements.length).toBe(sampleItems.length);
  });

  it('should handle empty items array', () => {
    render(<RdsCompProductList items={[]} />);
    
    // No products should be rendered
    const productElements = screen.queryAllByTestId('product-image');
    expect(productElements.length).toBe(0);
  });
});