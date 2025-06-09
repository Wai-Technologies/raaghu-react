import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompDeliveryMethod from '../src/rds-comp-delivery-method/rds-comp-delivery-method';

describe('RdsCompDeliveryMethod Component', () => {
  // Sample delivery method data for testing
  const mockDeliveryData = [
    {
      id: 1,
      type: 'Standard Shipping',
      days: '3-5 business days',
      cost: '$5.99'
    },
    {
      id: 2,
      type: 'Express Shipping',
      days: '1-2 business days',
      cost: '$12.99'
    },
    {
      id: 3,
      type: 'Same Day Delivery',
      days: 'Today',
      cost: '$19.99'
    }
  ];

  // Basic render test
  it('renders without crashing', () => {
    const { container } = render(
      <RdsCompDeliveryMethod 
        sizeDataWithDescription={mockDeliveryData} 
        sizeType="withDescription"
      />
    );
    expect(container).toBeTruthy();
  });

  // Test if all delivery methods are rendered
  it('renders all delivery methods', () => {
    render(
      <RdsCompDeliveryMethod 
        sizeDataWithDescription={mockDeliveryData}
        sizeType="withDescription"
      />
    );

    // Check if all delivery methods are rendered
    expect(screen.getByText('Standard Shipping')).toBeInTheDocument();
    expect(screen.getByText('Express Shipping')).toBeInTheDocument();
    expect(screen.getByText('Same Day Delivery')).toBeInTheDocument();
    
    // Check if the days information is rendered
    expect(screen.getByText('3-5 business days')).toBeInTheDocument();
    expect(screen.getByText('1-2 business days')).toBeInTheDocument();
    expect(screen.getByText('Today')).toBeInTheDocument();
    
    // Check if the cost information is rendered
    expect(screen.getByText('$5.99')).toBeInTheDocument();
    expect(screen.getByText('$12.99')).toBeInTheDocument();
    expect(screen.getByText('$19.99')).toBeInTheDocument();
  });

  // Test clicking on a delivery method option
  it('selects a delivery method when clicked', () => {
    render(
      <RdsCompDeliveryMethod 
        sizeDataWithDescription={mockDeliveryData}
        sizeType="withDescription"
      />
    );

    // Initially, no delivery method is selected
    const radioInputs = document.querySelectorAll('.radio-round');
    expect(radioInputs[0]).not.toHaveClass('active');
    expect(radioInputs[1]).not.toHaveClass('active');
    expect(radioInputs[2]).not.toHaveClass('active');

    // Click on the second delivery method
    const deliveryOptions = screen.getAllByText(/Shipping|Delivery/);
    fireEvent.click(deliveryOptions[1]); // Click on Express Shipping

    // Check if only the second delivery method is selected
    const updatedRadioInputs = document.querySelectorAll('.radio-round');
    expect(updatedRadioInputs[0]).not.toHaveClass('active');
    expect(updatedRadioInputs[1]).toHaveClass('active');
    expect(updatedRadioInputs[2]).not.toHaveClass('active');
  });

  // Test selecting a different delivery method
  it('changes selection when a different delivery method is clicked', () => {
    render(
      <RdsCompDeliveryMethod 
        sizeDataWithDescription={mockDeliveryData}
        sizeType="withDescription"
      />
    );

    // Click on the first delivery method
    const deliveryOptions = screen.getAllByText(/Shipping|Delivery/);
    fireEvent.click(deliveryOptions[0]); // Click on Standard Shipping

    // Check if the first delivery method is selected
    let radioInputs = document.querySelectorAll('.radio-round');
    expect(radioInputs[0]).toHaveClass('active');
    expect(radioInputs[1]).not.toHaveClass('active');
    expect(radioInputs[2]).not.toHaveClass('active');

    // Now click on the third delivery method
    fireEvent.click(deliveryOptions[2]); // Click on Same Day Delivery

    // Check if only the third delivery method is now selected
    radioInputs = document.querySelectorAll('.radio-round');
    expect(radioInputs[0]).not.toHaveClass('active');
    expect(radioInputs[1]).not.toHaveClass('active');
    expect(radioInputs[2]).toHaveClass('active');
  });

  // Test with empty data
  it('renders nothing when no delivery methods are provided', () => {
    const { container } = render(
      <RdsCompDeliveryMethod 
        sizeDataWithDescription={[]}
        sizeType="withDescription"
      />
    );

    const list = container.querySelector('ul');
    expect(list).toBeInTheDocument();
    expect(list?.children.length).toBe(0);
  });

  // Test proper styling for selected delivery method
  it('applies correct styling to the selected delivery method', () => {
    render(
      <RdsCompDeliveryMethod 
        sizeDataWithDescription={mockDeliveryData}
        sizeType="withDescription"
      />
    );

    // Get all delivery method containers
    const deliveryContainers = document.querySelectorAll('.flex-evens > div');
    
    // Initially none should have the border-color class
    expect(deliveryContainers[0]).not.toHaveClass('border-color');
    expect(deliveryContainers[1]).not.toHaveClass('border-color');
    expect(deliveryContainers[2]).not.toHaveClass('border-color');

    // Click on the second delivery method
    fireEvent.click(deliveryContainers[1]);

    // Now the second container should have the border-color class
    expect(deliveryContainers[0]).not.toHaveClass('border-color');
    expect(deliveryContainers[1]).toHaveClass('border-color');
    expect(deliveryContainers[2]).not.toHaveClass('border-color');
  });
});