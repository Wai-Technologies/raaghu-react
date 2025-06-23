import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompShoppingCart from '../src/rds-comp-shopping-cart/rds-comp-shopping-cart';

// Mock the rds-elements components
jest.mock('../src/rds-elements', () => ({
  RdsIcon: ({ name, height, width, colorVariant, fill, stroke, dataTestId }: any) => (
    <div 
      data-testid={dataTestId || `icon-${name}`}
      data-name={name}
      data-height={height}
      data-width={width}
      data-color-variant={colorVariant}
      data-fill={fill}
      data-stroke={stroke}
    >
      {name}
    </div>
  ),
  RdsIconLabel: ({ colorVariant, icon, label, size, fill, iconposition, dataTestId }: any) => (
    <div 
      data-testid={dataTestId || `icon-label-${label?.replace(/\s+/g, '-').toLowerCase()}`}
      data-color-variant={colorVariant}
      data-icon={icon}
      data-label={label}
      data-size={size}
      data-fill={fill}
      data-iconposition={iconposition}
    >
      {label}
    </div>
  ),
  RdsLabel: ({ fontWeight, label, dataTestId }: any) => (
    <div 
      data-testid={dataTestId || `label-${fontWeight}`}
      data-font-weight={fontWeight}
    >
      {label}
    </div>
  ),
  RdsSelectList: ({ id, isSearchable, onChange, placeholder, selectItems, selectedValue, dataTestId }: any) => (
    <div 
      data-testid={dataTestId || `select-${id}`}
      data-id={id}
      data-is-searchable={isSearchable}
      data-placeholder={placeholder}
      data-selected-value={selectedValue}
    >
      <select value={selectedValue} onChange={onChange}>
        {selectItems?.map((item: any, index: number) => (
          <option key={index} value={item.value}>
            {item.option}
          </option>
        ))}
      </select>
    </div>
  )
}));

describe('RdsCompShoppingCart Component', () => {
  const mockItemList = [
    {
      prodName: 'Product 1',
      description: 'Description for product 1',
      price: '$19.99',
      highlights: 'Free shipping',
      highlightsIcon: 'truck',
      image: 'https://example.com/product1.jpg',
      quantity: [
        { option: '1', value: '1' },
        { option: '2', value: '2' },
        { option: '3', value: '3' }
      ]
    },
    {
      prodName: 'Product 2',
      description: 'Description for product 2',
      price: '$29.99',
      highlights: 'Next day delivery',
      highlightsIcon: 'clock',
      image: 'https://example.com/product2.jpg',
      quantity: [
        { option: '1', value: '1' },
        { option: '2', value: '2' },
        { option: '3', value: '3' }
      ]
    }
  ];

  const defaultProps = {
    cart: {},
    role: 'user',
    itemList: mockItemList
  };

  describe('Component Rendering', () => {
    it('should render without crashing', () => {
      render(<RdsCompShoppingCart {...defaultProps} />);
      
      const cartItems = screen.getAllByTestId('shopping-cart-item');
      expect(cartItems).toHaveLength(2);
    });

    it('should render all product images', () => {
      render(<RdsCompShoppingCart {...defaultProps} />);
      
      const profilePics = screen.getAllByTestId('profile-pic');
      expect(profilePics).toHaveLength(2);
      
      // Check image attributes
      expect(profilePics[0]).toHaveAttribute('src', 'https://example.com/product1.jpg');
      expect(profilePics[0]).toHaveAttribute('alt', 'profilePic');
      expect(profilePics[0]).toHaveAttribute('width', '130px');
      expect(profilePics[0]).toHaveAttribute('height', '130px');
      expect(profilePics[0]).toHaveClass('profil_image_Class', 'rounded-circle');
      
      expect(profilePics[1]).toHaveAttribute('src', 'https://example.com/product2.jpg');
    });

    it('should render product details with correct labels', () => {
      render(<RdsCompShoppingCart {...defaultProps} />);
      
      // Check for product names (bold labels)
      const boldLabels = screen.getAllByTestId('label-bold');
      expect(boldLabels).toHaveLength(2);
      expect(boldLabels[0]).toHaveTextContent('Product 1');
      expect(boldLabels[1]).toHaveTextContent('Product 2');
      
      // Check for product descriptions (lighter labels)
      const lighterLabels = screen.getAllByTestId('label-lighter');
      expect(lighterLabels).toHaveLength(2);
      expect(lighterLabels[0]).toHaveTextContent('Description for product 1');
      expect(lighterLabels[1]).toHaveTextContent('Description for product 2');
      
      // Check for product prices (semibold labels)
      const semiboldLabels = screen.getAllByTestId('label-semibold');
      expect(semiboldLabels).toHaveLength(2);
      expect(semiboldLabels[0]).toHaveTextContent('$19.99');
      expect(semiboldLabels[1]).toHaveTextContent('$29.99');
    });

    it('should render highlights with icon labels', () => {
      render(<RdsCompShoppingCart {...defaultProps} />);
      
      // Check for highlight icon labels
      const freeShippingLabel = screen.getByTestId('icon-label-free-shipping');
      expect(freeShippingLabel).toHaveAttribute('data-label', 'Free shipping');
      expect(freeShippingLabel).toHaveAttribute('data-icon', 'truck');
      expect(freeShippingLabel).toHaveAttribute('data-color-variant', 'success');
      
      const nextDayLabel = screen.getByTestId('icon-label-next-day-delivery');
      expect(nextDayLabel).toHaveAttribute('data-label', 'Next day delivery');
      expect(nextDayLabel).toHaveAttribute('data-icon', 'clock');
      expect(nextDayLabel).toHaveAttribute('data-color-variant', 'success');
    });

    it('should render quantity select lists for each item', () => {
      render(<RdsCompShoppingCart {...defaultProps} />);
      
      const selectLists = screen.getAllByTestId('select-story');
      expect(selectLists).toHaveLength(2);
      
      // Check select list properties
      expect(selectLists[0]).toHaveAttribute('data-is-searchable', 'true');
      expect(selectLists[0]).toHaveAttribute('data-placeholder', 'Select option');
      expect(selectLists[0]).toHaveAttribute('data-selected-value', '1');
      
      // Check select options (via rendered select element)
      const selectElements = screen.getAllByRole('combobox');
      expect(selectElements).toHaveLength(2);
      expect(selectElements[0]).toHaveValue('1');
    });

    it('should render cancel icons for each item', () => {
      render(<RdsCompShoppingCart {...defaultProps} />);
      
      const cancelIcons = screen.getAllByTestId('icon-cancel');
      expect(cancelIcons).toHaveLength(2);
      
      expect(cancelIcons[0]).toHaveAttribute('data-name', 'cancel');
      expect(cancelIcons[0]).toHaveAttribute('data-height', '14px');
      expect(cancelIcons[0]).toHaveAttribute('data-width', '14px');
      expect(cancelIcons[0]).toHaveAttribute('data-color-variant', 'dark');
      expect(cancelIcons[0]).toHaveAttribute('data-fill', 'false');
      expect(cancelIcons[0]).toHaveAttribute('data-stroke', 'true');
    });

    it('should render a horizontal rule after each item', () => {
      render(<RdsCompShoppingCart {...defaultProps} />);
      
      // Find all horizontal rules
      const horizontalRules = document.querySelectorAll('hr');
      expect(horizontalRules).toHaveLength(2);
    });
  });

  describe('Props Handling', () => {
    it('should render with an empty item list', () => {
      const emptyProps = {
        ...defaultProps,
        itemList: []
      };
      
      render(<RdsCompShoppingCart {...emptyProps} />);
      
      // No shopping cart items should be rendered
      expect(screen.queryByTestId('shopping-cart-item')).not.toBeInTheDocument();
    });

    it('should render with a single item', () => {
      const singleItemProps = {
        ...defaultProps,
        itemList: [mockItemList[0]]
      };
      
      render(<RdsCompShoppingCart {...singleItemProps} />);
      
      // Only one shopping cart item should be rendered
      const cartItems = screen.getAllByTestId('shopping-cart-item');
      expect(cartItems).toHaveLength(1);
      
      // Check that it's the correct item
      const boldLabels = screen.getAllByTestId('label-bold');
      expect(boldLabels[0]).toHaveTextContent('Product 1');
    });

    it('should handle items with missing properties', () => {
      const incompleteItemList = [
        {
          prodName: 'Incomplete Product',
          // Missing description
          price: '$9.99',
          // Missing highlights and highlightsIcon
          image: 'https://example.com/incomplete.jpg',
          quantity: [{ option: '1', value: '1' }]
        }
      ];
      
      const incompleteProps = {
        ...defaultProps,
        itemList: incompleteItemList
      };
      
      // This test mainly checks that the component doesn't crash with incomplete data
      expect(() => render(<RdsCompShoppingCart {...incompleteProps} />)).not.toThrow();
      
      const cartItems = screen.getAllByTestId('shopping-cart-item');
      expect(cartItems).toHaveLength(1);
      
      // Check that it's the correct item
      const boldLabels = screen.getAllByTestId('label-bold');
      expect(boldLabels[0]).toHaveTextContent('Incomplete Product');
    });
  });

  describe('Layout and Structure', () => {
    it('should have proper layout structure', () => {
      render(<RdsCompShoppingCart {...defaultProps} />);
      
      // Check for main container padding
      const mainContainer = document.querySelector('.p-3');
      expect(mainContainer).toBeInTheDocument();
      
      // Check for flex layout for items
      const flexContainers = document.querySelectorAll('.d-lg-flex.d-md-flex.justify-content-between');
      expect(flexContainers).toHaveLength(2);
      
      // Check for quantity select and cancel icon container
      const quantityCancelContainers = document.querySelectorAll('.d-flex');
      expect(quantityCancelContainers.length).toBeGreaterThan(0);
    });
  });
});
