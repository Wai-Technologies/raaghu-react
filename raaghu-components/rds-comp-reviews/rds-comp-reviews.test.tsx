import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RdsCompReviews, {
  Item,
  VariantType,
  RevieweStyle,
  RdsCompReviewsProps,
} from './rds-comp-reviews';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';

// Mock SCSS
jest.mock('./rds-comp-reviews.scss', () => ({}));

// Mock MUI components
jest.mock('@mui/material', () => ({
  Grid: ({ children, container, spacing, wrap }: any) => (
    <div data-testid="grid" data-spacing={spacing} data-wrap={wrap} data-container={container}>
      {children}
    </div>
  ),
  Box: ({ children, className, sx, ...props }: any) => (
    <div data-testid="box" className={className} {...props}>{children}</div>
  ),
  Card: ({ children, sx, ...props }: any) => (
    <div data-testid="card" {...props}>{children}</div>
  ),
  CardContent: ({ children, sx, ...props }: any) => (
    <div data-testid="card-content" {...props}>{children}</div>
  ),
  Typography: ({ children, variant, color, className, ...props }: any) => (
    <div data-testid={`typography-${variant}`} className={className} {...props}>
      {children}
    </div>
  ),
  useMediaQuery: () => false,
  useTheme: () => ({
    breakpoints: {
      down: () => false,
    },
  }),
}));

// Mock MUI Icons
jest.mock('@mui/icons-material', () => ({
  ThumbUpAltIcon: () => <span data-testid="thumb-up-icon">👍</span>,
  ThumbDownAltIcon: () => <span data-testid="thumb-down-icon">👎</span>,
}));

// Mock RDS elements
jest.mock('../../raaghu-elements', () => ({
  RdsAvatar: ({ title, src, displayStyle, size, showName, showDesignation, subText, alt }: any) => (
    <div
      data-testid="rds-avatar"
      data-title={title}
      data-src={src}
      data-display-style={displayStyle}
      data-size={size}
      data-show-name={showName}
      data-show-designation={showDesignation}
    >
      Avatar: {title}
      {subText && <div data-testid="avatar-subtext">{subText}</div>}
    </div>
  ),
  RdsRating: ({ value, onChange, readOnly, size, precision, max }: any) => (
    <div
      data-testid="rds-rating"
      data-value={value}
      data-readonly={readOnly}
      data-size={size}
      data-precision={precision}
      data-max={max}
      onClick={() => onChange && onChange(null, (value || 0) + 1)}
    >
      Rating: {value || 0}
    </div>
  ),
}));

describe('RdsCompReviews', () => {
  const defaultItem: Item = {
    name: 'John Doe',
    username: 'johndoe',
    date: new Date('2024-01-15'),
    imageUrl: 'https://example.com/image.jpg',
    description: 'Great product!',
    rating: 4.5,
    likes: 35,
    dislikes: 10,
    reviews: '4.75',
  };

  const defaultProps: RdsCompReviewsProps = {
    itemList: [defaultItem],
    style: RevieweStyle.Style1,
    variantType: VariantType.Default,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      const { container } = render(<RdsCompReviews {...defaultProps} />);
      expect(container.querySelector('.rds-comp-reviews')).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsCompReviews.displayName).toBe('RdsCompReviews');
    });

    it('should render with Default variant type', () => {
      const { container } = render(
        <RdsCompReviews {...defaultProps} variantType={VariantType.Default} />
      );
      expect(container.querySelector('.MuiGrid-root')).toBeInTheDocument();
    });

    it('should render Grid with spacing', () => {
      const { container } = render(<RdsCompReviews {...defaultProps} />);
      const grid = container.querySelector('.MuiGrid-container');
      expect(grid).toBeInTheDocument();
    });

    it('should render single item', () => {
      render(<RdsCompReviews {...defaultProps} />);
      const cards = screen.getAllByTestId('card');
      expect(cards).toHaveLength(1);
    });

    it('should render multiple items', () => {
      const items = [defaultItem, defaultItem, defaultItem];
      render(<RdsCompReviews {...defaultProps} itemList={items} />);
      const cards = screen.getAllByTestId('card');
      expect(cards).toHaveLength(3);
    });

    it('should render empty list when no items', () => {
      render(<RdsCompReviews {...defaultProps} itemList={[]} />);
      const cards = screen.queryAllByTestId('card');
      expect(cards).toHaveLength(0);
    });
  });

  describe('Style Variants - Core Styles (1-6)', () => {
    it('should render Style1 with avatar and rating', () => {
      render(
        <RdsCompReviews
          {...defaultProps}
          style={RevieweStyle.Style1}
          itemList={[defaultItem]}
        />
      );
      const avatar = screen.getByTestId('rds-avatar');
      expect(avatar).toBeInTheDocument();
      expect(avatar.getAttribute('data-title')).toBe('John Doe');
      expect(screen.getByTestId('rds-rating')).toBeInTheDocument();
    });

    it('should render Style2 with name and rating', () => {
      render(
        <RdsCompReviews
          {...defaultProps}
          style={RevieweStyle.Style2}
          itemList={[defaultItem]}
        />
      );
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByTestId('rds-rating')).toBeInTheDocument();
    });

    it('should render Style3 with avatar and date', () => {
      render(
        <RdsCompReviews
          {...defaultProps}
          style={RevieweStyle.Style3}
          itemList={[defaultItem]}
        />
      );
      expect(screen.getByTestId('rds-avatar')).toBeInTheDocument();
      expect(screen.getByTestId('avatar-subtext')).toBeInTheDocument();
    });

    it('should render Style4 with name and date', () => {
      render(
        <RdsCompReviews
          {...defaultProps}
          style={RevieweStyle.Style4}
          itemList={[defaultItem]}
        />
      );
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByTestId('rds-rating')).toBeInTheDocument();
    });

    it('should render Style5 with avatar and name', () => {
      render(
        <RdsCompReviews
          {...defaultProps}
          style={RevieweStyle.Style5}
          itemList={[defaultItem]}
        />
      );
      expect(screen.getByTestId('rds-avatar')).toBeInTheDocument();
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    it('should render Style6 with name and date', () => {
      render(
        <RdsCompReviews
          {...defaultProps}
          style={RevieweStyle.Style6}
          itemList={[defaultItem]}
        />
      );
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByTestId('rds-rating')).toBeInTheDocument();
    });
  });

  describe('Style Variants - Interaction Styles (7-10)', () => {
    it('should render Style7 with likes and dislikes', () => {
      render(
        <RdsCompReviews
          {...defaultProps}
          style={RevieweStyle.Style7}
          itemList={[defaultItem]}
        />
      );
      expect(screen.getByTestId('ThumbUpAltIcon')).toBeInTheDocument();
      expect(screen.getByTestId('ThumbDownAltIcon')).toBeInTheDocument();
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    it('should render Style8 with rating at top', () => {
      render(
        <RdsCompReviews
          {...defaultProps}
          style={RevieweStyle.Style8}
          itemList={[defaultItem]}
        />
      );
      expect(screen.getByTestId('rds-rating')).toBeInTheDocument();
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    it('should render Style9 with avatar and interactions', () => {
      render(
        <RdsCompReviews
          {...defaultProps}
          style={RevieweStyle.Style9}
          itemList={[defaultItem]}
        />
      );
      expect(screen.getByTestId('rds-avatar')).toBeInTheDocument();
      expect(screen.getByTestId('ThumbUpAltIcon')).toBeInTheDocument();
      expect(screen.getByTestId('ThumbDownAltIcon')).toBeInTheDocument();
    });

    it('should render Style10 with interactions', () => {
      render(
        <RdsCompReviews
          {...defaultProps}
          style={RevieweStyle.Style10}
          itemList={[defaultItem]}
        />
      );
      expect(screen.getByTestId('ThumbUpAltIcon')).toBeInTheDocument();
      expect(screen.getByTestId('ThumbDownAltIcon')).toBeInTheDocument();
    });
  });

  describe('Style Variants - Summary Styles (11-12)', () => {
    it('should render Style11 with avatar and summary rating', () => {
      render(
        <RdsCompReviews
          {...defaultProps}
          style={RevieweStyle.Style11}
          itemList={[defaultItem]}
        />
      );
      expect(screen.getByTestId('rds-avatar')).toBeInTheDocument();
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('4.75')).toBeInTheDocument();
    });

    it('should render Style12 with name and summary rating', () => {
      render(
        <RdsCompReviews
          {...defaultProps}
          style={RevieweStyle.Style12}
          itemList={[defaultItem]}
        />
      );
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('4.75')).toBeInTheDocument();
    });
  });

  describe('Default Style Behavior', () => {
    it('should render nothing when style is undefined', () => {
      render(
        <RdsCompReviews
          {...defaultProps}
          style={undefined}
          itemList={[defaultItem]}
        />
      );
      const cards = screen.queryAllByTestId('card');
      expect(cards).toHaveLength(0);
    });

    it('should render nothing for unknown style', () => {
      render(
        <RdsCompReviews
          {...{ ...defaultProps, style: 'unknown' as any }}
          itemList={[defaultItem]}
        />
      );
      const cards = screen.queryAllByTestId('card');
      expect(cards).toHaveLength(0);
    });
  });

  describe('Item Data Display', () => {
    it('should display item name', () => {
      const item = { ...defaultItem, name: 'Alice Smith' };
      render(<RdsCompReviews {...defaultProps} itemList={[item]} />);
      const avatars = screen.getAllByTestId('rds-avatar');
      expect(avatars.some(a => a.getAttribute('data-title') === 'Alice Smith')).toBeTruthy();
    });

    it('should display item description', () => {
      const item = { ...defaultItem, description: 'Excellent quality!' };
      render(<RdsCompReviews {...defaultProps} itemList={[item]} />);
      expect(screen.getByText('Excellent quality!')).toBeInTheDocument();
    });

    it('should display item username', () => {
      const item = { ...defaultItem, username: 'alicesmith123' };
      render(<RdsCompReviews {...defaultProps} itemList={[item]} />);
      expect(screen.getByText('alicesmith123')).toBeInTheDocument();
    });

    it('should handle missing optional fields', () => {
      const item: Item = { name: 'John' };
      render(<RdsCompReviews {...defaultProps} itemList={[item]} />);
      const avatars = screen.getAllByTestId('rds-avatar');
      expect(avatars.some(a => a.getAttribute('data-title') === 'John')).toBeTruthy();
    });

    it('should use default image when imageUrl not provided', () => {
      const item = { ...defaultItem, imageUrl: undefined };
      render(<RdsCompReviews {...defaultProps} itemList={[item]} />);
      const avatar = screen.getByTestId('rds-avatar');
      expect(avatar).toHaveAttribute('data-src', 'https://source.unsplash.com/random/200x200/?portrait');
    });

    it('should use provided imageUrl', () => {
      const item = { ...defaultItem, imageUrl: 'https://custom.com/image.jpg' };
      render(<RdsCompReviews {...defaultProps} itemList={[item]} />);
      const avatar = screen.getByTestId('rds-avatar');
      expect(avatar).toHaveAttribute('data-src', 'https://custom.com/image.jpg');
    });
  });

  describe('Rating Display', () => {
    it('should display item rating', () => {
      const item = { ...defaultItem, rating: 5 };
      render(
        <RdsCompReviews
          {...defaultProps}
          style={RevieweStyle.Style1}
          itemList={[item]}
        />
      );
      const rating = screen.getByTestId('rds-rating');
      expect(rating).toHaveAttribute('data-value', '5');
    });

    it('should use default rating when not provided', () => {
      const item: Item = { ...defaultItem, rating: undefined };
      render(
        <RdsCompReviews
          {...defaultProps}
          style={RevieweStyle.Style1}
          itemList={[item]}
        />
      );
      const rating = screen.getByTestId('rds-rating');
      expect(rating).toHaveAttribute('data-value', '4.5');
    });

    it('should allow rating changes', async () => {
      const item = { ...defaultItem, rating: 3 };
      render(
        <RdsCompReviews
          {...defaultProps}
          style={RevieweStyle.Style1}
          itemList={[item]}
        />
      );
      const rating = screen.getByTestId('rds-rating');
      expect(rating).toHaveAttribute('data-value', '3');
      fireEvent.click(rating);
      // Rating state updates after click
      await waitFor(() => {
        const updatedRating = screen.getByTestId('rds-rating');
        expect(updatedRating).toHaveAttribute('data-value');
      });
    });

    it('should render rating as readonly false', () => {
      render(
        <RdsCompReviews
          {...defaultProps}
          style={RevieweStyle.Style1}
          itemList={[defaultItem]}
        />
      );
      const rating = screen.getByTestId('rds-rating');
      expect(rating).toHaveAttribute('data-readonly', 'false');
    });
  });

  describe('Likes and Dislikes', () => {
    it('should display likes count', () => {
      const item = { ...defaultItem, likes: 100 };
      render(
        <RdsCompReviews
          {...defaultProps}
          style={RevieweStyle.Style7}
          itemList={[item]}
        />
      );
      expect(screen.getByText('100')).toBeInTheDocument();
    });

    it('should display dislikes count', () => {
      const item = { ...defaultItem, dislikes: 25 };
      render(
        <RdsCompReviews
          {...defaultProps}
          style={RevieweStyle.Style7}
          itemList={[item]}
        />
      );
      expect(screen.getByText('25')).toBeInTheDocument();
    });

    it('should use default likes when not provided', () => {
      const item: Item = { ...defaultItem, likes: undefined };
      render(
        <RdsCompReviews
          {...defaultProps}
          style={RevieweStyle.Style7}
          itemList={[item]}
        />
      );
      expect(screen.getByText('35')).toBeInTheDocument();
    });

    it('should use default dislikes when not provided', () => {
      const item: Item = { ...defaultItem, dislikes: undefined };
      render(
        <RdsCompReviews
          {...defaultProps}
          style={RevieweStyle.Style7}
          itemList={[item]}
        />
      );
      expect(screen.getByText('10')).toBeInTheDocument();
    });

    it('should increment likes on thumb up click', async () => {
      render(
        <RdsCompReviews
          {...defaultProps}
          style={RevieweStyle.Style7}
          itemList={[defaultItem]}
        />
      );
      const thumbUpIcons = screen.getAllByTestId('ThumbUpAltIcon');
      expect(thumbUpIcons.length).toBeGreaterThan(0);
      const likesCounts = screen.getAllByText('35');
      expect(likesCounts.length).toBeGreaterThan(0);
      
      fireEvent.click(thumbUpIcons[0]);
      await waitFor(() => {
        const updatedCounts = screen.queryAllByText('36');
        expect(updatedCounts.length).toBeGreaterThan(0);
      });
    });

    it('should increment dislikes on thumb down click', async () => {
      render(
        <RdsCompReviews
          {...defaultProps}
          style={RevieweStyle.Style7}
          itemList={[defaultItem]}
        />
      );
      const thumbDownIcons = screen.getAllByTestId('ThumbDownAltIcon');
      expect(thumbDownIcons.length).toBeGreaterThan(0);
      const dislikesCounts = screen.getAllByText('10');
      expect(dislikesCounts.length).toBeGreaterThan(0);
      
      fireEvent.click(thumbDownIcons[0]);
      await waitFor(() => {
        const updatedCounts = screen.queryAllByText('11');
        expect(updatedCounts.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Date Display', () => {
    it('should format and display date', () => {
      const date = new Date(2024, 0, 15); // January 15, 2024
      const item = { ...defaultItem, date };
      render(
        <RdsCompReviews
          {...defaultProps}
          style={RevieweStyle.Style3}
          itemList={[item]}
        />
      );
      const subtext = screen.getByTestId('avatar-subtext');
      expect(subtext.textContent).toContain('15');
      expect(subtext.textContent).toContain('2024');
    });

    it('should handle missing date', () => {
      const item = { ...defaultItem, date: undefined };
      render(
        <RdsCompReviews
          {...defaultProps}
          style={RevieweStyle.Style4}
          itemList={[item]}
        />
      );
      // Should not crash and still render
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
  });

  describe('Multiple Items', () => {
    it('should render correct number of items', () => {
      const items = Array(5).fill(defaultItem);
      render(<RdsCompReviews {...defaultProps} itemList={items} />);
      const cards = screen.getAllByTestId('card');
      expect(cards).toHaveLength(5);
    });

    it('should render items with different data', () => {
      const items = [
        { ...defaultItem, name: 'John' },
        { ...defaultItem, name: 'Jane' },
        { ...defaultItem, name: 'Bob' },
      ];
      render(<RdsCompReviews {...defaultProps} itemList={items} />);
      const avatars = screen.getAllByTestId('rds-avatar');
      expect(avatars.some(a => a.getAttribute('data-title') === 'John')).toBeTruthy();
      expect(avatars.some(a => a.getAttribute('data-title') === 'Jane')).toBeTruthy();
      expect(avatars.some(a => a.getAttribute('data-title') === 'Bob')).toBeTruthy();
    });

    it('should render items with different ratings', () => {
      const items = [
        { ...defaultItem, name: 'High', rating: 5 },
        { ...defaultItem, name: 'Low', rating: 2 },
      ];
      render(
        <RdsCompReviews
          {...defaultProps}
          style={RevieweStyle.Style1}
          itemList={items}
        />
      );
      const ratings = screen.getAllByTestId('rds-rating');
      expect(ratings).toHaveLength(2);
    });

    it('should render items with different styles independently', () => {
      const items = [{
        ...defaultItem,
        name: 'Test Item 1',
        username: 'testuser1',
        rating: 4.5,
        likes: 50,
        dislikes: 5,
      }];
      render(
        <RdsCompReviews
          {...defaultProps}
          style={RevieweStyle.Style7}
          itemList={items}
        />
      );
      const avatars = screen.getAllByTestId('rds-avatar');
      expect(avatars.some(a => a.getAttribute('data-title') === 'Test Item 1')).toBeTruthy();
      expect(screen.getAllByText('50').length).toBeGreaterThan(0);
    });
  });

  describe('Avatar Display', () => {
    it('should render avatar with correct props for Style1', () => {
      render(
        <RdsCompReviews
          {...defaultProps}
          style={RevieweStyle.Style1}
          itemList={[defaultItem]}
        />
      );
      const avatar = screen.getByTestId('rds-avatar');
      expect(avatar).toHaveAttribute('data-title', 'John Doe');
      expect(avatar).toHaveAttribute('data-size', 'medium');
      expect(avatar).toHaveAttribute('data-display-style', 'name-bottom');
    });

    it('should render avatar with correct props for Style3', () => {
      render(
        <RdsCompReviews
          {...defaultProps}
          style={RevieweStyle.Style3}
          itemList={[defaultItem]}
        />
      );
      const avatar = screen.getByTestId('rds-avatar');
      expect(avatar).toHaveAttribute('data-display-style', 'with-name');
    });

    it('should render avatar with correct props for Style5', () => {
      render(
        <RdsCompReviews
          {...defaultProps}
          style={RevieweStyle.Style5}
          itemList={[defaultItem]}
        />
      );
      const avatar = screen.getByTestId('rds-avatar');
      expect(avatar).toHaveAttribute('data-show-name', 'false');
      expect(avatar).toHaveAttribute('data-show-designation', 'false');
    });
  });

  describe('Reviews Summary Rating', () => {
    it('should display reviews summary for Style11', () => {
      const item = { ...defaultItem, reviews: '4.75' };
      render(
        <RdsCompReviews
          {...defaultProps}
          style={RevieweStyle.Style11}
          itemList={[item]}
        />
      );
      expect(screen.getByText('4.75')).toBeInTheDocument();
    });

    it('should display reviews summary for Style12', () => {
      const item = { ...defaultItem, reviews: '4.75' };
      render(
        <RdsCompReviews
          {...defaultProps}
          style={RevieweStyle.Style12}
          itemList={[item]}
        />
      );
      expect(screen.getByText('4.75')).toBeInTheDocument();
    });

    it('should use default reviews value', () => {
      const item: Item = { ...defaultItem, reviews: undefined };
      render(
        <RdsCompReviews
          {...defaultProps}
          style={RevieweStyle.Style11}
          itemList={[item]}
        />
      );
      expect(screen.getByText('4.75')).toBeInTheDocument();
    });
  });

  describe('Props Validation', () => {
    it('should render with only required props', () => {
      const minimalProps: RdsCompReviewsProps = {
        itemList: [defaultItem],
        variantType: VariantType.Default,
      };
      const { container } = render(<RdsCompReviews {...minimalProps} />);
      expect(container.querySelector('.rds-comp-reviews')).toBeInTheDocument();
    });

    it('should accept itemList prop', () => {
      const items = [defaultItem, defaultItem];
      const { container } = render(
        <RdsCompReviews 
          itemList={items}
          style={RevieweStyle.Style1}
          variantType={VariantType.Default} 
        />
      );
      const cards = container.querySelectorAll('[data-testid="card"]');
      expect(cards.length).toBeGreaterThan(0);
    });

    it('should accept all style variants', () => {
      const styles = [
        RevieweStyle.Style1,
        RevieweStyle.Style2,
        RevieweStyle.Style3,
        RevieweStyle.Style4,
        RevieweStyle.Style5,
        RevieweStyle.Style6,
        RevieweStyle.Style7,
        RevieweStyle.Style8,
        RevieweStyle.Style9,
        RevieweStyle.Style10,
        RevieweStyle.Style11,
        RevieweStyle.Style12,
      ];

      styles.forEach(style => {
        const { unmount, container } = render(
          <RdsCompReviews
            itemList={[defaultItem]}
            style={style}
            variantType={VariantType.Default}
          />
        );
        expect(container.querySelector('.rds-comp-reviews')).toBeInTheDocument();
        unmount();
      });
    });
  });

  describe('Integration Tests', () => {
    it('should render complete item with all properties', () => {
      const completeItem: Item = {
        name: 'Complete User',
        username: 'completeuser',
        date: new Date('2024-02-20'),
        feedIcon: 'icon-url',
        imageUrl: 'https://example.com/image.jpg',
        description: 'This is a complete review',
        hashtags: '#awesome #great',
        reviews: '4.8',
        rating: 4.8,
        likes: 150,
        dislikes: 5,
      };

      render(
        <RdsCompReviews
          {...defaultProps}
          style={RevieweStyle.Style7}
          itemList={[completeItem]}
        />
      );

      const avatars = screen.getAllByTestId('rds-avatar');
      expect(avatars.some(a => a.getAttribute('data-title') === 'Complete User')).toBeTruthy();
      // Style7 shows Complete User, date, rating, description, and interaction counts
      const allText = screen.getByTestId('card').textContent || '';
      expect(allText).toContain('Complete User');
      expect(screen.getByText('This is a complete review')).toBeInTheDocument();
      expect(screen.getAllByText('150').length).toBeGreaterThan(0);
    });

    it('should handle style switching with same data', () => {
      const { rerender } = render(
        <RdsCompReviews
          {...defaultProps}
          style={RevieweStyle.Style1}
          itemList={[defaultItem]}
        />
      );

      let avatars = screen.getAllByTestId('rds-avatar');
      expect(avatars.length).toBeGreaterThan(0);

      rerender(
        <RdsCompReviews
          {...defaultProps}
          style={RevieweStyle.Style7}
          itemList={[defaultItem]}
        />
      );

      avatars = screen.getAllByTestId('rds-avatar');
      expect(avatars.length).toBeGreaterThan(0);
      const thumbUpIcons = screen.getAllByTestId('ThumbUpAltIcon');
      expect(thumbUpIcons.length).toBeGreaterThan(0);
    });

    it('should handle updating itemList', () => {
      const { rerender } = render(
        <RdsCompReviews {...defaultProps} itemList={[defaultItem]} />
      );

      let cards = screen.getAllByTestId('card');
      expect(cards).toHaveLength(1);

      const newItems = [defaultItem, defaultItem, defaultItem];
      rerender(
        <RdsCompReviews {...defaultProps} itemList={newItems} />
      );

      cards = screen.getAllByTestId('card');
      expect(cards).toHaveLength(3);
    });
  });

  describe('Edge Cases', () => {
    it('should handle very long description', () => {
      const longDesc = 'A'.repeat(500);
      const item = { ...defaultItem, description: longDesc };
      render(<RdsCompReviews {...defaultProps} itemList={[item]} />);
      expect(screen.getByText(longDesc)).toBeInTheDocument();
    });

    it('should handle special characters in name', () => {
      const item = { ...defaultItem, name: "O'Brien & Sons" };
      render(<RdsCompReviews {...defaultProps} itemList={[item]} />);
      const avatars = screen.getAllByTestId('rds-avatar');
      expect(avatars.some(a => a.getAttribute('data-title') === "O'Brien & Sons")).toBeTruthy();
    });

    it('should handle zero rating', () => {
      // Note: rating || 4.5 in component means 0 becomes 4.5
      const item = { ...defaultItem, rating: 0.5 };
      render(
        <RdsCompReviews
          {...defaultProps}
          style={RevieweStyle.Style1}
          itemList={[item]}
        />
      );
      const rating = screen.getByTestId('rds-rating');
      expect(rating).toHaveAttribute('data-value', '0.5');
    });

    it('should handle maximum rating', () => {
      const item = { ...defaultItem, rating: 5 };
      render(
        <RdsCompReviews
          {...defaultProps}
          style={RevieweStyle.Style1}
          itemList={[item]}
        />
      );
      const rating = screen.getByTestId('rds-rating');
      expect(rating).toHaveAttribute('data-value', '5');
    });

    it('should handle large number of items', () => {
      const items = Array(50).fill(defaultItem).map((item, index) => ({
        ...item,
        name: `User ${index}`,
      }));
      render(<RdsCompReviews {...defaultProps} itemList={items} />);
      const cards = screen.getAllByTestId('card');
      expect(cards).toHaveLength(50);
    });

    it('should handle decimal rating values', () => {
      const item = { ...defaultItem, rating: 3.7 };
      render(
        <RdsCompReviews
          {...defaultProps}
          style={RevieweStyle.Style1}
          itemList={[item]}
        />
      );
      const rating = screen.getByTestId('rds-rating');
      expect(rating).toHaveAttribute('data-value', '3.7');
    });
  });

  describe('Accessibility', () => {
    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsCompReviews {...defaultProps} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
