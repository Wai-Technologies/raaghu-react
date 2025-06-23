import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompBenefit from '../src/rds-comp-benefit/rds-comp-benefit';
import { RdsBenefitItem } from '../src/rds-comp-benefit/rds-comp-benefit';

// Define interfaces for better type checking
interface BenefitItemProps {
  item: RdsBenefitItem;
  displayType: string;
}

// Mock the rds-elements components
jest.mock('../src/rds-elements', () => ({
  RdsBenefit: ({ displayType, item }: BenefitItemProps) => {
    let testId = '';
    switch (displayType) {
      case 'default':
        testId = 'defaultAligned';
        break;
      case 'Left Aligned':
        testId = 'leftAligned';
        break;
      case 'Center Aligned':
        testId = 'centerAligned';
        break;
      case 'With Label':
      case 'Without Label':
      case 'Heading With Icon':
        testId = displayType.toLowerCase().replace(/\s/g, '-');
        break;
      default:
        testId = 'default-benefit';
    }

    return (
      <div data-testid={testId} className="benefit-item">
        <div data-testid="benefit-icon">{item.icon}</div>
        <div data-testid="benefit-title">{item.title}</div>
        <div data-testid="benefit-description">{item.description}</div>
      </div>
    );
  },
}));

describe('RdsCompBenefit', () => {
  // Sample data for testing
  const sampleBenefitItems: RdsBenefitItem[] = [
    {
      id: 1,
      title: 'Fast Performance',
      description: 'Get your blood tests delivered at your home collect a sample from the news get your blood tests.',
      icon: 'speed',
      iconHeight: '30px',
      iconWidth: '30px',
      iconFill: false,
      iconstroke: true,
      iconColorVarient: 'primary'
    },
    {
      id: 2,
      title: 'Prototyping',
      description: 'Get your blood tests delivered at your home collect a sample from the news get your blood tests.',
      icon: 'design_services',
      iconHeight: '30px',
      iconWidth: '30px',
      iconFill: false,
      iconstroke: true,
      iconColorVarient: 'primary'
    },
    {
      id: 3,
      title: 'Vector Editing',
      description: 'Get your blood tests delivered at your home collect a sample from the news get your blood tests.',
      icon: 'edit',
      iconHeight: '30px',
      iconWidth: '30px',
      iconFill: false,
      iconstroke: true,
      iconColorVarient: 'primary'
    }
  ];

  it('renders without crashing', () => {
    const { container } = render(
      <RdsCompBenefit 
        displayType="default" 
        colsize={4} 
        itemList={sampleBenefitItems} 
      />
    );
    expect(container).toBeTruthy();
  });

  it('renders correct number of benefit items', () => {
    render(
      <RdsCompBenefit 
        displayType="default" 
        colsize={4} 
        itemList={sampleBenefitItems} 
      />
    );
    
    const benefitElements = screen.getAllByTestId('rds-benefit');
    expect(benefitElements).toHaveLength(sampleBenefitItems.length);
  });

  it('applies correct column size', () => {
    const colsize = 4;
    render(
      <RdsCompBenefit 
        displayType="default" 
        colsize={colsize} 
        itemList={sampleBenefitItems} 
      />
    );
    
    const firstBenefitElement = screen.getAllByTestId('rds-benefit')[0];
    expect(firstBenefitElement).toHaveClass(`col-md-${colsize}`);
  });

  it('renders with default display type', () => {
    render(
      <RdsCompBenefit 
        displayType="default" 
        colsize={4} 
        itemList={sampleBenefitItems} 
      />
    );
    
    // The RdsBenefit mock should render with defaultAligned testId
    const defaultAlignedElements = screen.getAllByTestId('defaultAligned');
    expect(defaultAlignedElements).toHaveLength(sampleBenefitItems.length);
  });

  it('renders with Left Aligned display type', () => {
    render(
      <RdsCompBenefit 
        displayType="Left Aligned" 
        colsize={4} 
        itemList={sampleBenefitItems} 
      />
    );
    
    const leftAlignedElements = screen.getAllByTestId('leftAligned');
    expect(leftAlignedElements).toHaveLength(sampleBenefitItems.length);
  });

  it('renders with Center Aligned display type', () => {
    render(
      <RdsCompBenefit 
        displayType="Center Aligned" 
        colsize={4} 
        itemList={sampleBenefitItems} 
      />
    );
    
    const centerAlignedElements = screen.getAllByTestId('centerAligned');
    expect(centerAlignedElements).toHaveLength(sampleBenefitItems.length);
  });

  it('passes correct props to child RdsBenefit components', () => {
    render(
      <RdsCompBenefit 
        displayType="default" 
        colsize={4} 
        itemList={sampleBenefitItems} 
      />
    );
    
    const titles = screen.getAllByTestId('benefit-title');
    const descriptions = screen.getAllByTestId('benefit-description');
    const icons = screen.getAllByTestId('benefit-icon');
    
    // Check first item props
    expect(titles[0]).toHaveTextContent(sampleBenefitItems[0].title);
    expect(descriptions[0]).toHaveTextContent(sampleBenefitItems[0].description);
    expect(icons[0]).toHaveTextContent(sampleBenefitItems[0].icon as string);
    
    // Check second item props
    expect(titles[1]).toHaveTextContent(sampleBenefitItems[1].title);
    expect(descriptions[1]).toHaveTextContent(sampleBenefitItems[1].description);
    expect(icons[1]).toHaveTextContent(sampleBenefitItems[1].icon as string);
  });

  it('handles empty itemList gracefully', () => {
    render(
      <RdsCompBenefit 
        displayType="default" 
        colsize={4} 
        itemList={[]} 
      />
    );
    
    const benefitElements = screen.queryAllByTestId('rds-benefit');
    expect(benefitElements).toHaveLength(0);
  });
});