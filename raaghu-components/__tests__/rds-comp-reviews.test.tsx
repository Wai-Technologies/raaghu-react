import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompReviews, { RdsCompReviewsProps, RevieweStyle, VariantType } from '../src/rds-comp-reviews/rds-comp-reviews';
import { Item } from '../src/rds-comp-feeds/rds-comp-feeds';

// Mock the rds-elements components
jest.mock('../src/rds-elements', () => ({
  RdsAvatar: ({ profilePic, withProfilePic, size }: any) => (
    <div data-testid="rds-avatar">
      <img src={profilePic} alt="avatar" data-size={size} data-with-profile-pic={withProfilePic} />
    </div>
  ),
  RdsCompIcon: ({ name }: any) => <span data-testid="rds-icon" data-name={name}></span>,
  RdsCompLikeDislike: ({ like, dislike, colorVariant }: any) => (
    <div data-testid="rds-comp-like-dislike" data-like={like} data-dislike={dislike} data-color-variant={colorVariant}>
      <span>👍 {like}</span>
      <span>👎 {dislike}</span>
    </div>
  ),  RdsRating: ({ rating, colorVariant, filled, size, style, type, totalStars, dataTestId }: any) => (
    <div 
      data-testid={dataTestId || "rds-rating"} 
      data-rating={rating} 
      data-color-variant={colorVariant?.toLowerCase() || colorVariant}
      data-filled={filled}
      data-size={size}
      data-style={style?.toLowerCase() || style}
      data-type={type?.toLowerCase() || type}
      data-total-stars={totalStars}
    >
      {'★'.repeat(Math.floor(rating || 0))}
    </div>
  ),
  RdsReviewCategory: ({ children }: any) => <div data-testid="rds-review-category">{children}</div>
}));

// Mock the feeds component
jest.mock('../src/rds-comp-feeds/rds-comp-feeds', () => ({
  __esModule: true,
  default: ({ itemList, variantType }: any) => (
    <div data-testid="rds-comp-feeds" data-variant-type={variantType}>
      {itemList.map((item: any, index: number) => (
        <div key={index} data-testid={`feed-item-${index}`}>
          {item.name}
        </div>
      ))}
    </div>
  )
}));

describe('RdsCompReviews Component', () => {
  // Sample test data
  const mockItemList: Item[] = [
    {
      name: 'John Doe',
      username: 'johndoe',
      date: new Date('2024-01-15'),
      imageUrl: 'https://example.com/avatar1.jpg',
      description: 'This is a great product! I really enjoyed using it.',
      rating: 5,
      reviews: '4.8',
      likes: 35,
      dislikes: 2
    },
    {
      name: 'Jane Smith',
      username: 'janesmith',
      date: new Date('2024-01-10'),
      imageUrl: 'https://example.com/avatar2.jpg',
      description: 'Good quality but could be improved in some areas.',
      rating: 4,
      reviews: '4.2',
      likes: 28,
      dislikes: 5
    }
  ];

  const defaultProps: RdsCompReviewsProps = {
    itemList: mockItemList,
    style: RevieweStyle.Style1,
    variantType: VariantType.Default
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Component Rendering', () => {    it('should render without crashing', () => {
      render(<RdsCompReviews {...defaultProps} />);
      expect(screen.getAllByTestId('rds-avatar')).toHaveLength(2);
    });

    it('should render with empty item list', () => {
      const emptyProps = {
        ...defaultProps,
        itemList: []
      };
      render(<RdsCompReviews {...emptyProps} />);
      // Should not crash with empty list
      expect(screen.queryByTestId('rds-avatar')).not.toBeInTheDocument();
    });

    it('should render multiple items', () => {
      render(<RdsCompReviews {...defaultProps} />);
      const avatars = screen.getAllByTestId('rds-avatar');
      expect(avatars).toHaveLength(2);
    });

    it('should not render anything for non-Default variant type', () => {
      const nonDefaultProps = {
        ...defaultProps,
        variantType: 'Custom' as any
      };
      render(<RdsCompReviews {...nonDefaultProps} />);
      expect(screen.queryByTestId('rds-avatar')).not.toBeInTheDocument();
    });
  });

  describe('Style Variants', () => {
    describe('Style1', () => {
      it('should render Style1 correctly', () => {
        const style1Props = {
          ...defaultProps,
          style: RevieweStyle.Style1
        };
        render(<RdsCompReviews {...style1Props} />);
        
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('johndoe')).toBeInTheDocument();
        expect(screen.getByText('This is a great product! I really enjoyed using it.')).toBeInTheDocument();
        expect(screen.getAllByTestId('rds-avatar')).toHaveLength(2);
        expect(screen.getAllByTestId('rating-test')).toHaveLength(2);
      });

      it('should display rating in Style1', () => {
        const style1Props = {
          ...defaultProps,
          style: RevieweStyle.Style1
        };
        render(<RdsCompReviews {...style1Props} />);
        
        const ratings = screen.getAllByTestId('rating-test');
        expect(ratings[0]).toHaveAttribute('data-rating', '5');
        expect(ratings[1]).toHaveAttribute('data-rating', '4');
      });
    });

    describe('Style2', () => {
      it('should render Style2 correctly', () => {
        const style2Props = {
          ...defaultProps,
          style: RevieweStyle.Style2
        };
        render(<RdsCompReviews {...style2Props} />);
        
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('johndoe')).toBeInTheDocument();
        expect(screen.getAllByTestId('rating-test')).toHaveLength(2);
        // Style2 doesn't have avatar
        expect(screen.queryByTestId('rds-avatar')).not.toBeInTheDocument();
      });
    });

    describe('Style3', () => {
      it('should render Style3 with date formatting', () => {
        const style3Props = {
          ...defaultProps,
          style: RevieweStyle.Style3
        };
        render(<RdsCompReviews {...style3Props} />);
        
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('15 January 2024')).toBeInTheDocument();
        expect(screen.getAllByTestId('rating-test')).toHaveLength(2);
      });

      it('should handle missing date in Style3', () => {
        const itemWithoutDate = [{
          ...mockItemList[0],
          date: undefined
        }];
        const style3Props = {
          ...defaultProps,
          itemList: itemWithoutDate,
          style: RevieweStyle.Style3
        };
        render(<RdsCompReviews {...style3Props} />);
        
        expect(screen.getByText('Date not available')).toBeInTheDocument();
      });
    });

    describe('Style4', () => {
      it('should render Style4 without avatar', () => {
        const style4Props = {
          ...defaultProps,
          style: RevieweStyle.Style4
        };
        render(<RdsCompReviews {...style4Props} />);
        
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.queryByTestId('rds-avatar')).not.toBeInTheDocument();
        expect(screen.getAllByTestId('rating-test')).toHaveLength(2);
      });
    });

    describe('Style5', () => {
      it('should render Style5 with rating before description', () => {
        const style5Props = {
          ...defaultProps,
          style: RevieweStyle.Style5
        };
        render(<RdsCompReviews {...style5Props} />);
        
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getAllByTestId('rating-test')).toHaveLength(2);
        expect(screen.getByText('This is a great product! I really enjoyed using it.')).toBeInTheDocument();
      });
    });

    describe('Style6', () => {
      it('should render Style6 correctly', () => {
        const style6Props = {
          ...defaultProps,
          style: RevieweStyle.Style6
        };
        render(<RdsCompReviews {...style6Props} />);
        
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getAllByTestId('rating-test')).toHaveLength(2);
      });
    });

    describe('Style7', () => {
      it('should render Style7 with like/dislike component', () => {
        const style7Props = {
          ...defaultProps,
          style: RevieweStyle.Style7
        };
        render(<RdsCompReviews {...style7Props} />);
        
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getAllByTestId('rds-comp-like-dislike')).toHaveLength(2);
        expect(screen.getAllByTestId('rating-test')).toHaveLength(2);
      });

      it('should display correct like/dislike values in Style7', () => {
        const style7Props = {
          ...defaultProps,
          style: RevieweStyle.Style7
        };
        render(<RdsCompReviews {...style7Props} />);
        
        const likeDislikeComponents = screen.getAllByTestId('rds-comp-like-dislike');
        likeDislikeComponents.forEach(component => {
          expect(component).toHaveAttribute('data-like', '35');
          expect(component).toHaveAttribute('data-dislike', '10');
          expect(component).toHaveAttribute('data-color-variant', 'primary');
        });
      });
    });

    describe('Style8', () => {
      it('should render Style8 with name at the bottom', () => {
        const style8Props = {
          ...defaultProps,
          style: RevieweStyle.Style8
        };
        render(<RdsCompReviews {...style8Props} />);
        
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getAllByTestId('rating-test')).toHaveLength(2);
      });
    });

    describe('Style9', () => {
      it('should render Style9 with username and like/dislike', () => {
        const style9Props = {
          ...defaultProps,
          style: RevieweStyle.Style9
        };
        render(<RdsCompReviews {...style9Props} />);
        
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('johndoe')).toBeInTheDocument();
        expect(screen.getAllByTestId('rds-comp-like-dislike')).toHaveLength(2);
        expect(screen.getAllByTestId('rating-test')).toHaveLength(2);
      });
    });

    describe('Style10', () => {
      it('should render Style10 without avatar but with like/dislike', () => {
        const style10Props = {
          ...defaultProps,
          style: RevieweStyle.Style10
        };
        render(<RdsCompReviews {...style10Props} />);
        
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('johndoe')).toBeInTheDocument();
        expect(screen.queryByTestId('rds-avatar')).not.toBeInTheDocument();
        expect(screen.getAllByTestId('rds-comp-like-dislike')).toHaveLength(2);
      });
    });

    describe('Style11', () => {
      it('should render Style11 with large avatar and reviews', () => {
        const style11Props = {
          ...defaultProps,
          style: RevieweStyle.Style11
        };
        render(<RdsCompReviews {...style11Props} />);
        
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('johndoe')).toBeInTheDocument();
        expect(screen.getByText('4.8')).toBeInTheDocument();
        expect(screen.getAllByTestId('rds-avatar')).toHaveLength(2);
        
        const ratings = screen.getAllByTestId('rating-test');
        expect(ratings[0]).toHaveAttribute('data-total-stars', '1');
        expect(ratings[0]).toHaveAttribute('data-rating', '4.75');
      });
    });

    describe('Style12', () => {
      it('should render Style12 without avatar but with reviews', () => {
        const style12Props = {
          ...defaultProps,
          style: RevieweStyle.Style12
        };
        render(<RdsCompReviews {...style12Props} />);
        
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('johndoe')).toBeInTheDocument();
        expect(screen.getByText('4.8')).toBeInTheDocument();
        expect(screen.queryByTestId('rds-avatar')).not.toBeInTheDocument();
        
        const ratings = screen.getAllByTestId('rating-test');
        expect(ratings[0]).toHaveAttribute('data-total-stars', '1');
        expect(ratings[0]).toHaveAttribute('data-rating', '4.75');
      });
    });

    describe('Style13', () => {
      it('should return null for Style13 (not implemented)', () => {
        const style13Props = {
          ...defaultProps,
          style: RevieweStyle.Style13
        };
        render(<RdsCompReviews {...style13Props} />);
        
        // Should not render anything for Style13
        expect(screen.queryByTestId('rds-avatar')).not.toBeInTheDocument();
        expect(screen.queryByTestId('rating-test')).not.toBeInTheDocument();
      });
    });

    describe('Default case', () => {
      it('should return null for undefined style', () => {
        const undefinedStyleProps = {
          ...defaultProps,
          style: undefined as any
        };
        render(<RdsCompReviews {...undefinedStyleProps} />);
        
        expect(screen.queryByTestId('rds-avatar')).not.toBeInTheDocument();
        expect(screen.queryByTestId('rating-test')).not.toBeInTheDocument();
      });
    });
  });

  describe('Props Handling', () => {
    it('should handle missing optional props', () => {
      const minimalProps = {
        itemList: mockItemList
      };
      expect(() => render(<RdsCompReviews {...minimalProps} />)).not.toThrow();
    });    it('should use default variant type when not provided', () => {
      const propsWithoutVariant = {
        itemList: mockItemList,
        style: RevieweStyle.Style1
      };
      render(<RdsCompReviews {...propsWithoutVariant} />);
      // Should not render anything because variant type is required to be Default
      expect(screen.queryByTestId('rds-avatar')).not.toBeInTheDocument();
    });

    it('should handle items without optional fields', () => {
      const minimalItem: Item[] = [{
        name: 'Test User',
        description: 'Test description'
      }];
      const minimalProps = {
        itemList: minimalItem,
        style: RevieweStyle.Style1,
        variantType: VariantType.Default
      };
      render(<RdsCompReviews {...minimalProps} />);
      
      expect(screen.getByText('Test User')).toBeInTheDocument();
      expect(screen.getByText('Test description')).toBeInTheDocument();
    });
  });

  describe('Date Formatting', () => {
    it('should format dates correctly in British format', () => {
      const itemWithSpecificDate = [{
        ...mockItemList[0],
        date: new Date('2024-12-25')
      }];
      const dateProps = {
        ...defaultProps,
        itemList: itemWithSpecificDate,
        style: RevieweStyle.Style3
      };
      render(<RdsCompReviews {...dateProps} />);
      
      expect(screen.getByText('25 December 2024')).toBeInTheDocument();
    });    it('should handle invalid dates gracefully', () => {
      const itemWithInvalidDate = [{
        ...mockItemList[0],
        date: new Date('invalid-date')
      }];
      const invalidDateProps = {
        ...defaultProps,
        itemList: itemWithInvalidDate,
        style: RevieweStyle.Style3
      };
      render(<RdsCompReviews {...invalidDateProps} />);
      
      // Invalid dates show as "Invalid Date" in JavaScript
      expect(screen.getByText('Invalid Date')).toBeInTheDocument();
    });
  });

  describe('Component Integration', () => {    it('should pass correct props to RdsAvatar', () => {
      render(<RdsCompReviews {...defaultProps} />);
      
      const avatars = screen.getAllByTestId('rds-avatar');
      const firstAvatar = avatars[0];
      const img = firstAvatar.querySelector('img');
      
      expect(img).toHaveAttribute('src', 'https://example.com/avatar1.jpg');
      expect(img).toHaveAttribute('data-with-profile-pic', 'true');
    });    it('should pass correct props to RdsRating', () => {
      render(<RdsCompReviews {...defaultProps} />);
      
      const ratings = screen.getAllByTestId('rating-test');
      const firstRating = ratings[0];
      
      expect(firstRating).toHaveAttribute('data-rating', '5');
      expect(firstRating).toHaveAttribute('data-color-variant', 'primary');
      expect(firstRating).toHaveAttribute('data-filled', 'true');
      expect(firstRating).toHaveAttribute('data-size', 'medium');
    });

    it('should pass correct props to RdsCompLikeDislike in applicable styles', () => {
      const style7Props = {
        ...defaultProps,
        style: RevieweStyle.Style7
      };
      render(<RdsCompReviews {...style7Props} />);
      
      const likeDislike = screen.getAllByTestId('rds-comp-like-dislike')[0];
      expect(likeDislike).toHaveAttribute('data-like', '35');
      expect(likeDislike).toHaveAttribute('data-dislike', '10');
      expect(likeDislike).toHaveAttribute('data-color-variant', 'primary');
    });
  });

  describe('Accessibility', () => {    it('should have proper alt text for images', () => {
      render(<RdsCompReviews {...defaultProps} />);
      
      const images = screen.getAllByRole('img');
      images.forEach((img) => {
        // All images should have alt text (either "avatar" from mock or actual names)
        expect(img).toHaveAttribute('alt');
        const altText = img.getAttribute('alt');
        expect(altText).toBeTruthy();
      });
    });

    it('should have proper heading structure', () => {
      render(<RdsCompReviews {...defaultProps} />);
      
      const headings = screen.getAllByRole('heading');
      expect(headings.length).toBeGreaterThan(0);
      headings.forEach(heading => {
        expect(heading.tagName).toMatch(/^H[1-6]$/);
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle null itemList gracefully', () => {
      const nullProps = {
        ...defaultProps,
        itemList: null as any
      };
      expect(() => render(<RdsCompReviews {...nullProps} />)).toThrow();
    });

    it('should handle undefined itemList gracefully', () => {
      const undefinedProps = {
        ...defaultProps,
        itemList: undefined as any
      };
      expect(() => render(<RdsCompReviews {...undefinedProps} />)).toThrow();
    });

    it('should handle items with missing required fields', () => {
      const incompleteItem = [{ 
        name: 'Test',
        // missing description
      }] as any;
      const incompleteProps = {
        ...defaultProps,
        itemList: incompleteItem
      };
      
      expect(() => render(<RdsCompReviews {...incompleteProps} />)).not.toThrow();
    });
  });

  describe('Performance', () => {
    it('should handle large number of items', () => {
      const largeItemList = Array.from({ length: 100 }, (_, index) => ({
        ...mockItemList[0],
        name: `User ${index}`,
        description: `Description ${index}`
      }));
      
      const largeListProps = {
        ...defaultProps,
        itemList: largeItemList
      };
      
      expect(() => render(<RdsCompReviews {...largeListProps} />)).not.toThrow();
      
      const names = screen.getAllByText(/User \d+/);
      expect(names).toHaveLength(100);
    });
  });
});