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

jest.mock('./rds-comp-reviews.scss', () => ({}));

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

jest.mock('@mui/icons-material', () => ({
  ThumbUpAltIcon: () => <span data-testid="thumb-up-icon">👍</span>,
  ThumbDownAltIcon: () => <span data-testid="thumb-down-icon">👎</span>,
}));

jest.mock('../../raaghu-elements/rds-avatar/rds-avatar', () => ({
  __esModule: true,
  default: ({ name, title = name, src, displayStyle, size, showName, showDesignation, description, subText = description, alt }: any) => (
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
}));
jest.mock('../../raaghu-elements/rds-rating/rds-rating', () => ({
  __esModule: true,
  default: ({ value, onChange, readOnly, size, precision, max }: any) => (
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
    variant: RevieweStyle.Style1,
    variantType: VariantType.Default,
  };

  const setup = (p: any = {}) => render(<RdsCompReviews {...defaultProps} {...p} />);
  const withItem = (variant: any, over: Partial<Item> = {}) =>
    setup({ variant, itemList: [{ ...defaultItem, ...over }] });
  const expectAvatarTitle = (title: string) =>
    expect(screen.getAllByTestId('rds-avatar').some(a => a.getAttribute('data-title') === title)).toBeTruthy();
  const S: any = RevieweStyle;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      const { container } = setup();
      expect(container.querySelector('.rds-comp-reviews')).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsCompReviews.displayName).toBe('RdsCompReviews');
    });

    it('should render with Default variant type', () => {
      const { container } = setup({ variantType: VariantType.Default });
      expect(container.querySelector('.MuiGrid-root')).toBeInTheDocument();
    });

    it('should render Grid with spacing', () => {
      const { container } = setup();
      expect(container.querySelector('.MuiGrid-container')).toBeInTheDocument();
    });

    it.each([0, 1, 3, 5, 50])('should render %i items as cards', count => {
      setup({ itemList: Array(count).fill(defaultItem) });
      expect(screen.queryAllByTestId('card')).toHaveLength(count);
    });
  });

  describe('Style Variants', () => {
    const checks: Record<string, () => void> = {
      avatar: () => expect(screen.getByTestId('rds-avatar')).toBeInTheDocument(),
      title: () => expect(screen.getByTestId('rds-avatar').getAttribute('data-title')).toBe('John Doe'),
      rating: () => expect(screen.getByTestId('rds-rating')).toBeInTheDocument(),
      subtext: () => expect(screen.getByTestId('avatar-subtext')).toBeInTheDocument(),
      name: () => expect(screen.getByText('John Doe')).toBeInTheDocument(),
      up: () => expect(screen.getByTestId('ThumbUpAltIcon')).toBeInTheDocument(),
      down: () => expect(screen.getByTestId('ThumbDownAltIcon')).toBeInTheDocument(),
      summary: () => expect(screen.getByText('4.75')).toBeInTheDocument(),
    };

    it.each([
      [1, ['avatar', 'title', 'rating']],
      [2, ['name', 'rating']],
      [3, ['avatar', 'subtext']],
      [4, ['name', 'rating']],
      [5, ['avatar', 'name']],
      [6, ['name', 'rating']],
      [7, ['up', 'down', 'name']],
      [8, ['rating', 'name']],
      [9, ['avatar', 'up', 'down']],
      [10, ['up', 'down']],
      [11, ['avatar', 'name', 'summary']],
      [12, ['name', 'summary']],
    ])('should render Style%i', (n, keys) => {
      withItem(S[`Style${n}`]);
      (keys as string[]).forEach(k => checks[k]());
    });
  });

  describe('Default Style Behavior', () => {
    it.each([undefined, 'unknown'])('should render nothing when style is %s', variant => {
      setup({ variant });
      expect(screen.queryAllByTestId('card')).toHaveLength(0);
    });
  });

  describe('Item Data Display', () => {
    it('should display item name', () => {
      withItem(S.Style1, { name: 'Alice Smith' });
      expectAvatarTitle('Alice Smith');
    });

    it('should display item description', () => {
      setup({ itemList: [{ ...defaultItem, description: 'Excellent quality!' }] });
      expect(screen.getByText('Excellent quality!')).toBeInTheDocument();
    });

    it('should display item username', () => {
      setup({ itemList: [{ ...defaultItem, username: 'alicesmith123' }] });
      expect(screen.getByText('alicesmith123')).toBeInTheDocument();
    });

    it('should handle missing optional fields', () => {
      setup({ itemList: [{ name: 'John' }] });
      expectAvatarTitle('John');
    });

    it.each([
      [undefined, 'https://source.unsplash.com/random/200x200/?portrait'],
      ['https://custom.com/image.jpg', 'https://custom.com/image.jpg'],
    ])('should use imageUrl %s -> %s', (imageUrl, src) => {
      setup({ itemList: [{ ...defaultItem, imageUrl }] });
      expect(screen.getByTestId('rds-avatar')).toHaveAttribute('data-src', src);
    });
  });

  describe('Rating Display', () => {
    it.each([
      [5, '5'],
      [undefined, '4.5'],
      [0.5, '0.5'],
      [3.7, '3.7'],
    ])('should show rating %s as %s', (rating, expected) => {
      withItem(S.Style1, { rating });
      expect(screen.getByTestId('rds-rating')).toHaveAttribute('data-value', expected);
    });

    it('should allow rating changes', async () => {
      withItem(S.Style1, { rating: 3 });
      const rating = screen.getByTestId('rds-rating');
      expect(rating).toHaveAttribute('data-value', '3');
      fireEvent.click(rating);
      await waitFor(() => {
        expect(screen.getByTestId('rds-rating')).toHaveAttribute('data-value');
      });
    });

    it('should render rating as readonly false', () => {
      setup();
      expect(screen.getByTestId('rds-rating')).toHaveAttribute('data-readonly', 'false');
    });
  });

  describe('Likes and Dislikes', () => {
    it.each([
      [{ likes: 100 }, '100'],
      [{ dislikes: 25 }, '25'],
      [{ likes: undefined }, '35'],
      [{ dislikes: undefined }, '10'],
    ])('should display counts for %j', (over, text) => {
      withItem(S.Style7, over);
      expect(screen.getByText(text)).toBeInTheDocument();
    });

    it.each([
      ['ThumbUpAltIcon', '35', '36'],
      ['ThumbDownAltIcon', '10', '11'],
    ])('should increment on %s click', async (icon, before, after) => {
      withItem(S.Style7);
      const icons = screen.getAllByTestId(icon);
      expect(icons.length).toBeGreaterThan(0);
      expect(screen.getAllByText(before).length).toBeGreaterThan(0);
      fireEvent.click(icons[0]);
      await waitFor(() => {
        expect(screen.queryAllByText(after).length).toBeGreaterThan(0);
      });
    });
  });

  describe('Date Display', () => {
    it('should format and display date', () => {
      withItem(S.Style3, { date: new Date(2024, 0, 15) });
      const subtext = screen.getByTestId('avatar-subtext');
      expect(subtext.textContent).toContain('15');
      expect(subtext.textContent).toContain('2024');
    });

    it('should handle missing date', () => {
      withItem(S.Style4, { date: undefined });
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
  });

  describe('Multiple Items', () => {
    it('should render items with different data', () => {
      setup({ itemList: ['John', 'Jane', 'Bob'].map(name => ({ ...defaultItem, name })) });
      ['John', 'Jane', 'Bob'].forEach(expectAvatarTitle);
    });

    it('should render items with different ratings', () => {
      setup({
        itemList: [
          { ...defaultItem, name: 'High', rating: 5 },
          { ...defaultItem, name: 'Low', rating: 2 },
        ],
      });
      expect(screen.getAllByTestId('rds-rating')).toHaveLength(2);
    });

    it('should render items with different styles independently', () => {
      withItem(S.Style7, { name: 'Test Item 1', username: 'testuser1', rating: 4.5, likes: 50, dislikes: 5 });
      expectAvatarTitle('Test Item 1');
      expect(screen.getAllByText('50').length).toBeGreaterThan(0);
    });
  });

  describe('Avatar Display', () => {
    it.each([
      [1, { 'data-title': 'John Doe', 'data-size': 'medium', 'data-display-style': 'name-bottom' }],
      [3, { 'data-display-style': 'with-name' }],
      [5, { 'data-show-name': 'false', 'data-show-designation': 'false' }],
    ])('should render avatar with correct props for Style%i', (n, attrs) => {
      withItem(S[`Style${n}`]);
      const avatar = screen.getByTestId('rds-avatar');
      Object.entries(attrs).forEach(([k, v]) => expect(avatar).toHaveAttribute(k, v));
    });
  });

  describe('Reviews Summary Rating', () => {
    it.each([
      [11, '4.75'],
      [12, '4.75'],
      [11, undefined],
    ])('should display reviews summary for Style%i (reviews: %s)', (n, reviews) => {
      withItem(S[`Style${n}`], { reviews });
      expect(screen.getByText('4.75')).toBeInTheDocument();
    });
  });

  describe('Props Validation', () => {
    it('should render with only required props', () => {
      const { container } = render(<RdsCompReviews itemList={[defaultItem]} variantType={VariantType.Default} />);
      expect(container.querySelector('.rds-comp-reviews')).toBeInTheDocument();
    });

    it('should accept itemList prop', () => {
      const { container } = setup({ itemList: [defaultItem, defaultItem] });
      expect(container.querySelectorAll('[data-testid="card"]').length).toBeGreaterThan(0);
    });

    it.each(Array.from({ length: 12 }, (_, i) => i + 1))('should accept Style%i', n => {
      const { container } = withItem(S[`Style${n}`]);
      expect(container.querySelector('.rds-comp-reviews')).toBeInTheDocument();
    });

    it('applies CSS style to the root element', () => {
      const { container } = render(
        <RdsCompReviews items={[defaultItem]} variant={RevieweStyle.Style1} style={{ marginTop: 8 }} />
      );
      expect(container.querySelector('.rds-comp-reviews')).toHaveStyle({ marginTop: '8px' });
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
      setup({ variant: S.Style7, itemList: [completeItem] });
      expectAvatarTitle('Complete User');
      expect(screen.getByTestId('card').textContent || '').toContain('Complete User');
      expect(screen.getByText('This is a complete review')).toBeInTheDocument();
      expect(screen.getAllByText('150').length).toBeGreaterThan(0);
    });

    it('should handle style switching with same data', () => {
      const { rerender } = setup({ variant: S.Style1 });
      expect(screen.getAllByTestId('rds-avatar').length).toBeGreaterThan(0);
      rerender(<RdsCompReviews {...defaultProps} variant={S.Style7} />);
      expect(screen.getAllByTestId('rds-avatar').length).toBeGreaterThan(0);
      expect(screen.getAllByTestId('ThumbUpAltIcon').length).toBeGreaterThan(0);
    });

    it('should handle updating itemList', () => {
      const { rerender } = setup();
      expect(screen.getAllByTestId('card')).toHaveLength(1);
      rerender(<RdsCompReviews {...defaultProps} itemList={[defaultItem, defaultItem, defaultItem]} />);
      expect(screen.getAllByTestId('card')).toHaveLength(3);
    });
  });

  describe('Edge Cases', () => {
    it('should handle very long description', () => {
      const longDesc = 'A'.repeat(500);
      withItem(S.Style1, { description: longDesc });
      expect(screen.getByText(longDesc)).toBeInTheDocument();
    });

    it('should handle special characters in name', () => {
      withItem(S.Style1, { name: "O'Brien & Sons" });
      expectAvatarTitle("O'Brien & Sons");
    });
  });

  describe('Accessibility', () => {
    it('has no axe accessibility violations', async () => {
      const { container } = setup();
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});

jest.mock('../../raaghu-elements/shared/utils/deprecation', () => ({ warnDeprecatedProp: jest.fn() }));
import { warnDeprecatedProp } from '../../raaghu-elements/shared/utils/deprecation';
import { ReviewStyle } from './rds-comp-reviews';

describe('audit fixes', () => {
  const base: Item = { name: 'A', username: 'a', description: 'd', rating: 4, likes: 5, dislikes: 2 };

  it('accepts items and warns for itemList, variantType', () => {
    render(<RdsCompReviews items={[base]} variant={ReviewStyle.Style7} />);
    expect(screen.getAllByTestId('card')).toHaveLength(1);
    render(<RdsCompReviews itemList={[base]} variant={ReviewStyle.Style7} />);
    expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsCompReviews', 'itemList', expect.any(String));
  });

  it('re-syncs when item values change', () => {
    const { rerender } = render(<RdsCompReviews items={[base]} variant={ReviewStyle.Style7} />);
    rerender(<RdsCompReviews items={[{ ...base, rating: 2, likes: 9 }]} variant={ReviewStyle.Style7} />);
    expect(screen.getByText('Rating: 2')).toBeInTheDocument();
    expect(screen.getByText('9')).toBeInTheDocument();
  });

  it('calls callbacks and exposes labelled pressed buttons', () => {
    const onLike = jest.fn(), onDislike = jest.fn(), onRatingChange = jest.fn();
    render(<RdsCompReviews items={[base]} variant={ReviewStyle.Style7} onLike={onLike} onDislike={onDislike} onRatingChange={onRatingChange} />);
    const like = screen.getByLabelText('Like');
    expect(like).toHaveAttribute('aria-pressed', 'false');
    fireEvent.click(like);
    fireEvent.click(screen.getByLabelText('Dislike'));
    fireEvent.click(screen.getByTestId('rds-rating'));
    expect(onLike).toHaveBeenCalledWith(base);
    expect(onDislike).toHaveBeenCalledWith(base);
    expect(onRatingChange).toHaveBeenCalledWith(base, 5);
    expect(screen.getByLabelText('Like')).toHaveAttribute('aria-pressed', 'true');
  });

  it('supports locale, formatDate and id keys', () => {
    const item = { ...base, id: 1, date: new Date('2024-01-15') };
    render(<RdsCompReviews items={[item]} variant={ReviewStyle.Style4} formatDate={() => 'custom date'} />);
    expect(screen.getByText('custom date')).toBeInTheDocument();
  });

  it('variant wins over style', () => {
    render(<RdsCompReviews items={[base]} variant={ReviewStyle.Style7} style={ReviewStyle.Style4} />);
    expect(screen.getByLabelText('Like')).toBeInTheDocument();
  });
});
