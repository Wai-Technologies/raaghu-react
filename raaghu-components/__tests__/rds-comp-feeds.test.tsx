import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompFeeds, { Item } from '../src/rds-comp-feeds/rds-comp-feeds';

// Mock RDS elements
jest.mock('../src/rds-elements', () => ({
  RdsAvatar: ({ profilePic, withProfilePic, height, size }: any) => (
    <div data-testid="rds-avatar" data-profile-pic={profilePic} data-height={height}>
      Avatar
    </div>
  ),
  RdsIcon: ({ name, width, height, fill, stroke }: any) => (
    <div data-testid="rds-icon" data-name={name} data-width={width} data-height={height}>
      Icon
    </div>
  ),
  RdsLikeDislike: ({ like, dislike }: any) => (
    <div data-testid="rds-like-dislike" data-like={like} data-dislike={dislike}>
      Like: {like} Dislike: {dislike}
    </div>
  ),
  RdsRating: ({ rating, colorVariant, dataTestId, size }: any) => (
    <div data-testid={dataTestId || 'rds-rating'} data-rating={rating} data-size={size}>
      Rating: {rating}
    </div>
  ),
}));

describe('RdsCompFeeds', () => {
  const mockFeeds: Item[] = [
    {
      name: 'John Doe',
      username: 'johndoe',
      date: new Date('2024-06-10'),
      description: 'This is a test feed description that is long enough to be truncated.',
      hashtags: '#test',
      reviews: '5',
      reviewTitle: 'Great!',
      reviewSubTitle: 'Awesome',
      replies: '2 replies',
      rating: 4,
      likes: 10,
      dislikes: 2,
      imageUrl: 'test-image.jpg',
      feedIcon: 'test-icon',
    },
    {
      name: 'Jane Smith',
      username: 'janesmith',
      date: new Date('2024-06-09'),
      description: 'Another feed for testing purposes.',
      hashtags: '#another',
      reviews: '3',
      reviewTitle: 'Good',
      reviewSubTitle: 'Nice',
      replies: '1 reply',
      rating: 5,
      likes: 20,
      dislikes: 1,
      imageUrl: 'test-image2.jpg',
    },
  ];

  it('renders all feed items with Basic variant', () => {
    render(<RdsCompFeeds itemList={mockFeeds} variantType="Basic" />);

    // Check if names are rendered
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();

    // Check if descriptions are rendered (truncated for Basic variant)
    expect(screen.getByText('This is a test feed description that is long enough to be truncated.')).toBeInTheDocument();
    expect(screen.getByText('Another feed for testing purposes.')).toBeInTheDocument();

    // Check if dates are formatted correctly
    expect(screen.getByText('10 June, 2024')).toBeInTheDocument();
    expect(screen.getByText('09 June, 2024')).toBeInTheDocument();

    // Check if avatars are rendered
    expect(screen.getAllByTestId('rds-avatar')).toHaveLength(2);
  });

  it('renders all feed items with Advanced variant', () => {
    render(<RdsCompFeeds itemList={mockFeeds} variantType="Advanced" />);

    // Check if names are rendered
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();

    // Check if full descriptions are rendered (not truncated for Advanced variant)
    expect(screen.getByText('This is a test feed description that is long enough to be truncated.')).toBeInTheDocument();
    expect(screen.getByText('Another feed for testing purposes.')).toBeInTheDocument();

    // Check if usernames are rendered
    expect(screen.getByText('johndoe')).toBeInTheDocument();
    expect(screen.getByText('janesmith')).toBeInTheDocument();

    // Check if hashtags are rendered
    expect(screen.getByText('#test')).toBeInTheDocument();
    expect(screen.getByText('#another')).toBeInTheDocument();

    // Check if replies are rendered
    expect(screen.getByText('2 replies')).toBeInTheDocument();
    expect(screen.getByText('1 reply')).toBeInTheDocument();

    // Check if ratings are rendered
    expect(screen.getAllByTestId('rating')).toHaveLength(2);

    // Check if like/dislike components are rendered
    expect(screen.getAllByTestId('rds-like-dislike')).toHaveLength(2);

    // Check if icons are rendered (only for John Doe who has feedIcon)
    expect(screen.getByTestId('rds-icon')).toBeInTheDocument();
  });

  it('renders empty state if itemList is empty', () => {
    render(<RdsCompFeeds itemList={[]} variantType="Basic" />);
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
    expect(screen.queryByTestId('rds-avatar')).not.toBeInTheDocument();
  });

  it('renders hashtags and replies if present in Advanced variant', () => {
    render(<RdsCompFeeds itemList={mockFeeds} variantType="Advanced" />);

    // Check hashtags
    expect(screen.getByText('#test')).toBeInTheDocument();
    expect(screen.getByText('#another')).toBeInTheDocument();

    // Check replies
    expect(screen.getByText('2 replies')).toBeInTheDocument();
    expect(screen.getByText('1 reply')).toBeInTheDocument();
  });

  it('renders feed without optional fields', () => {
    const minimalFeed: Item[] = [
      {
        name: 'Minimal User',
        description: 'Basic description',
      },
    ];

    render(<RdsCompFeeds itemList={minimalFeed} variantType="Basic" />);

    expect(screen.getByText('Minimal User')).toBeInTheDocument();
    expect(screen.getByText('Basic description')).toBeInTheDocument();
    expect(screen.getByTestId('rds-avatar')).toBeInTheDocument();
  });

  it('does not render hashtags and replies in Basic variant', () => {
    render(<RdsCompFeeds itemList={mockFeeds} variantType="Basic" />);

    // Basic variant should not show hashtags and replies
    expect(screen.queryByText('#test')).not.toBeInTheDocument();
    expect(screen.queryByText('2 replies')).not.toBeInTheDocument();
  });
  it('renders username and date with separator in Advanced variant', () => {
    render(<RdsCompFeeds itemList={mockFeeds} variantType="Advanced" />);

    // Check if username and date separator is rendered
    expect(screen.getByText('johndoe')).toBeInTheDocument();
    expect(screen.getByText('10 June, 2024')).toBeInTheDocument();

    // Check if separator middle dot is rendered between username and date
    const separators = screen.getAllByText('⋅');
    expect(separators.length).toBeGreaterThan(0);
  });
});
