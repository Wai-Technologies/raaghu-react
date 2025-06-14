import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompSkeleton from '../src/rds-comp-skeleton/rds-comp-skeleton';

// Mock the RdsSkeleton component from raaghu-elements
jest.mock('../../raaghu-elements/src/rds-skeleton/rds-skeleton', () => {
  const RdsSkeleton = ({ shape, isAnimated, width, height, dataTestId }: any) => (
    <div 
      data-testid={dataTestId || 'rds-skeleton-element'}
      data-shape={shape}
      data-animated={isAnimated ? 'true' : 'false'}
      data-width={width}
      data-height={height}
      className={`rds-skeleton ${isAnimated ? 'animated' : ''} ${shape.toLowerCase()}`}
      style={{ width, height }}
    ></div>
  );
  
  // Export the enum used by the component
  RdsSkeleton.RECTANGLE = 'RECTANGLE';
  RdsSkeleton.CIRCLE = 'CIRCLE';
  
  return {
    __esModule: true,
    default: RdsSkeleton,
    RdsSkeletonShape: {
      RECTANGLE: 'RECTANGLE',
      CIRCLE: 'CIRCLE'
    }
  };
});

describe('RdsCompSkeleton Component', () => {
  describe('Pagination Skeleton', () => {
    it('should render pagination skeleton with default count', () => {
      render(<RdsCompSkeleton type="pagination" isAnimated={true} />);
      
      // Default count is 5
      const skeletonElements = document.querySelectorAll('.rds-skeleton');
      expect(skeletonElements.length).toBe(5);
      
      // Check if the elements are inside the correct container
      const paginationContainer = document.querySelector('.pagination-skeleton');
      expect(paginationContainer).toBeInTheDocument();
    });
    
    it('should render pagination skeleton with custom count', () => {
      render(<RdsCompSkeleton type="pagination" isAnimated={true} count={8} />);
      
      const skeletonElements = document.querySelectorAll('.rds-skeleton');
      expect(skeletonElements.length).toBe(8);
    });
    
    it('should respect minimum count of 1', () => {
      render(<RdsCompSkeleton type="pagination" isAnimated={true} count={0} />);
      
      // Even with count=0, should render at least 1
      const skeletonElements = document.querySelectorAll('.rds-skeleton');
      expect(skeletonElements.length).toBe(1);
    });
    
    it('should apply animation based on isAnimated prop', () => {
      const { rerender } = render(<RdsCompSkeleton type="pagination" isAnimated={true} count={3} />);
      
      let skeletonElements = document.querySelectorAll('.rds-skeleton');
      skeletonElements.forEach(element => {
        expect(element).toHaveAttribute('data-animated', 'true');
      });
      
      // Rerender with animation disabled
      rerender(<RdsCompSkeleton type="pagination" isAnimated={false} count={3} />);
      
      skeletonElements = document.querySelectorAll('.rds-skeleton');
      skeletonElements.forEach(element => {
        expect(element).toHaveAttribute('data-animated', 'false');
      });
    });
  });
  
  describe('Dropdown Skeleton', () => {
    it('should render dropdown skeleton with default count', () => {
      render(<RdsCompSkeleton type="dropdown" isAnimated={true} />);
      
      // Default count is 5, and each dropdown item has 2 skeleton elements (circle and rectangle)
      const dropdownItems = document.querySelectorAll('.dropdown-item-skeleton');
      expect(dropdownItems.length).toBe(5);
      
      const skeletonElements = document.querySelectorAll('.rds-skeleton');
      expect(skeletonElements.length).toBe(10); // 5 items × 2 skeletons per item
    });
    
    it('should render dropdown skeleton with custom count', () => {
      render(<RdsCompSkeleton type="dropdown" isAnimated={true} count={3} />);
      
      const dropdownItems = document.querySelectorAll('.dropdown-item-skeleton');
      expect(dropdownItems.length).toBe(3);
      
      const skeletonElements = document.querySelectorAll('.rds-skeleton');
      expect(skeletonElements.length).toBe(6); // 3 items × 2 skeletons per item
    });
    
    it('should have both circle and rectangle shapes', () => {
      render(<RdsCompSkeleton type="dropdown" isAnimated={true} count={1} />);
      
      const circleSkeletons = document.querySelectorAll('.rds-skeleton.circle');
      const rectangleSkeletons = document.querySelectorAll('.rds-skeleton.rectangle');
      
      expect(circleSkeletons.length).toBe(1);
      expect(rectangleSkeletons.length).toBe(1);
    });
  });
  
  describe('Card Skeleton', () => {
    it('should render card skeleton with default card count', () => {
      render(<RdsCompSkeleton type="card" isAnimated={true} />);
      
      // Default cardCount is 1, and each card has 5 skeleton elements
      const cardContainers = document.querySelectorAll('.card-width');
      expect(cardContainers.length).toBe(1);
      
      const skeletonElements = document.querySelectorAll('.rds-skeleton');
      expect(skeletonElements.length).toBe(5); // 1 card × 5 skeletons per card
    });
    
    it('should render card skeleton with custom card count', () => {
      render(<RdsCompSkeleton type="card" isAnimated={true} cardCount={3} />);
      
      const cardContainers = document.querySelectorAll('.card-width');
      expect(cardContainers.length).toBe(3);
      
      const skeletonElements = document.querySelectorAll('.rds-skeleton');
      expect(skeletonElements.length).toBe(15); // 3 cards × 5 skeletons per card
    });
    
    it('should have rectangle shapes with different dimensions', () => {
      render(<RdsCompSkeleton type="card" isAnimated={true} cardCount={1} />);
      
      const rectangleSkeletons = document.querySelectorAll('.rds-skeleton');
      
      // All card skeleton elements should be rectangles
      rectangleSkeletons.forEach(element => {
        expect(element).toHaveAttribute('data-shape', 'RECTANGLE');
      });
      
      // Verify that there are skeletons with different widths
      const widths = new Set();
      rectangleSkeletons.forEach(element => {
        widths.add(element.getAttribute('data-width'));
      });
      
      // Should have at least 2 different widths (100% and others)
      expect(widths.size).toBeGreaterThan(1);
    });
  });
  
  describe('Invalid Type', () => {
    it('should render nothing for invalid type', () => {
      // @ts-ignore - Deliberately testing invalid type
      render(<RdsCompSkeleton type="invalid" isAnimated={true} />);
      
      const skeletonElements = document.querySelectorAll('.rds-skeleton');
      expect(skeletonElements.length).toBe(0);
    });
  });
  
  describe('Prop Validation', () => {
    it('should ensure count is at least 1', () => {
      render(<RdsCompSkeleton type="pagination" isAnimated={true} count={-5} />);
      
      // Even with negative count, should render at least 1
      const skeletonElements = document.querySelectorAll('.rds-skeleton');
      expect(skeletonElements.length).toBe(1);
    });
    
    it('should ensure cardCount is at least 1', () => {
      render(<RdsCompSkeleton type="card" isAnimated={true} cardCount={-3} />);
      
      // Even with negative cardCount, should render at least 1 card
      const cardContainers = document.querySelectorAll('.card-width');
      expect(cardContainers.length).toBe(1);
    });
    
    // Rows and columns are not currently used in the component
    // but we can still test that they're validated correctly
    it('should validate rows and columns', () => {
      render(<RdsCompSkeleton type="card" isAnimated={true} rows={-2} columns={-3} />);
      
      // The component should render without errors
      expect(document.querySelector('.cards-container')).toBeInTheDocument();
    });
  });
});
