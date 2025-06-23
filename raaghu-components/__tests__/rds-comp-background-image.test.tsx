import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompBackgroundImage from '../src/rds-comp-background-image/rds-comp-background-image';

// Mock react-i18next if needed
jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {})
      }
    };
  }
}));

describe('RdsCompBackgroundImage', () => {
  const defaultProps = {
    imageUrl: 'https://example.com/image.jpg',
    title: 'Test Title',
    subtitle: 'Test Subtitle',
    btnLabel: 'Show Image',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    const { container } = render(<RdsCompBackgroundImage {...defaultProps} />);
    expect(container).toBeTruthy();
  });

  it('renders with the correct props', () => {
    render(<RdsCompBackgroundImage {...defaultProps} />);
    
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Hide Image');
  });

  it('uses default imageHeight when not provided', () => {
    const { container } = render(<RdsCompBackgroundImage {...defaultProps} />);
    const imgDiv = container.querySelector('.bg-img');
    
    expect(imgDiv).toHaveStyle({ height: '690px' });
  });

  it('uses custom imageHeight when provided', () => {
    const customProps = {
      ...defaultProps,
      imageHeight: '500px'
    };
    
    const { container } = render(<RdsCompBackgroundImage {...customProps} />);
    const imgDiv = container.querySelector('.bg-img');
    
    expect(imgDiv).toHaveStyle({ height: '500px' });
  });

  it('applies correct background styles', () => {
    const { container } = render(<RdsCompBackgroundImage {...defaultProps} />);
    const imgDiv = container.querySelector('.bg-img');
    
    expect(imgDiv).toHaveStyle({ 
      backgroundImage: `url(${defaultProps.imageUrl})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover'
    });
  });

  it('toggles image visibility when button is clicked', () => {
    const { container } = render(<RdsCompBackgroundImage {...defaultProps} />);
    const button = screen.getByRole('button');
    const imgDiv = container.querySelector('.bg-img');
    
    // Initially the image should be shown
    expect(imgDiv).toHaveClass('show-image');
    expect(button).toHaveTextContent('Hide Image');
    
    // Click to hide the image
    fireEvent.click(button);
    
    expect(imgDiv).toHaveClass('hide-image');
    expect(imgDiv).not.toHaveClass('show-image');
    expect(button).toHaveTextContent(defaultProps.btnLabel);
    expect(imgDiv).toHaveStyle({ backgroundImage: '' });
    
    // Click to show the image again
    fireEvent.click(button);
    
    expect(imgDiv).toHaveClass('show-image');
    expect(imgDiv).not.toHaveClass('hide-image');
    expect(button).toHaveTextContent('Hide Image');
    expect(imgDiv).toHaveStyle({ backgroundImage: `url(${defaultProps.imageUrl})` });
  });
});