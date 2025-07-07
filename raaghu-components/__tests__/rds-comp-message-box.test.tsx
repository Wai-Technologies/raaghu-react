import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsMessageBox from '../src/rds-comp-message-box/rds-comp-message-box';
import { AvatarSize, AvatarStyle } from '../../raaghu-elements/src/rds-avatar/rds-avatar';

// Mock the rds-elements components
jest.mock('../src/rds-elements', () => ({
  RdsAvatar: ({ 
    size,
    type,
    style,
    activityRing,
    activeDotTop,
    activeDotBottom,
    showName,
    showNameDesignation,
    firstName,
    lastName,
    role,
    colorVariant,
    profilePic,
    maxVisibleAvatars
  }: any) => (
    <div 
      data-testid="avatar-component"
      data-size={size}
      data-type={type}
      data-profilepic={profilePic}
    >
      Avatar Component
    </div>
  ),
  RdsCompLabel: ({ 
    label, 
    class: className 
  }: any) => (
    <span 
      data-testid="label-component"
      className={className}
    >
      {label}
    </span>
  )
}));

describe('RdsMessageBox Component', () => {
  // Test 1: Basic rendering without image
  test('renders without image correctly', () => {
    const mockProps = {
      message: 'Hello, this is a test message',
      avtar: 'avatar-url.jpg',
      isImage: false
    };
    
    render(<RdsMessageBox {...mockProps} />);
    
    // Check if component renders the main elements
    const avatarComponent = screen.getByTestId('avatar-component');
    expect(avatarComponent).toBeInTheDocument();
    expect(avatarComponent).toHaveAttribute('data-profilepic', 'avatar-url.jpg');
    
    const labelComponent = screen.getByTestId('label-component');
    expect(labelComponent).toBeInTheDocument();
    expect(labelComponent).toHaveClass('m-2 word-wrap');
    expect(labelComponent).toHaveTextContent('Hello, this is a test message');
    
    // Check that image is not rendered
    const images = screen.queryByRole('img');
    expect(images).not.toBeInTheDocument();
  });

  // Test 2: Rendering with image
  test('renders with image correctly', () => {
    const mockProps = {
      message: 'Message with image',
      avtar: 'avatar-url.jpg',
      isImage: true,
      src: 'image-url.jpg'
    };
    
    render(<RdsMessageBox {...mockProps} />);
    
    // Check if component renders the main elements
    expect(screen.getByTestId('avatar-component')).toBeInTheDocument();
    expect(screen.getByTestId('label-component')).toBeInTheDocument();
    expect(screen.getByTestId('label-component')).toHaveTextContent('Message with image');
    
    // Check that image is rendered
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'image-url.jpg');
    expect(image).toHaveAttribute('alt', 'image');
    expect(image).toHaveClass('responsive-image');
  });

  // Test 3: Test with missing props (default behavior)
  test('renders with missing props', () => {
    // Render with no props
    render(<RdsMessageBox />);
    
    // Component should still render without errors
    expect(screen.getByTestId('avatar-component')).toBeInTheDocument();
    
    // Label should be empty or undefined
    const labelComponent = screen.getByTestId('label-component');
    expect(labelComponent).toBeInTheDocument();
    expect(labelComponent).toHaveTextContent('');
    
    // No image should be rendered
    const images = screen.queryByRole('img');
    expect(images).not.toBeInTheDocument();
  });

  // Test 4: Props propagation to child components
  test('passes props correctly to child components', () => {
    const mockProps = {
      message: 'Test message for props',
      avtar: 'custom-avatar.jpg',
      isImage: true,
      src: 'test-image.jpg'
    };
    
    render(<RdsMessageBox {...mockProps} />);
    
    // Check if avatar component receives the correct props
    const avatarComponent = screen.getByTestId('avatar-component');
    expect(avatarComponent).toHaveAttribute('data-profilepic', 'custom-avatar.jpg');
    expect(avatarComponent).toHaveAttribute('data-size', AvatarSize.medium.toString());
    expect(avatarComponent).toHaveAttribute('data-type', 'image');
    
    // Check if label component receives the correct props
    const labelComponent = screen.getByTestId('label-component');
    expect(labelComponent).toHaveTextContent('Test message for props');
    
    // Check if image has correct source
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'test-image.jpg');
  });

  // Test 5: Conditional rendering of image
  test('conditionally renders image based on isImage prop', () => {
    // First render with isImage=false
    const { rerender } = render(
      <RdsMessageBox 
        message="Test conditional rendering" 
        avtar="avatar.jpg" 
        isImage={false} 
        src="image.jpg" 
      />
    );
    
    // Image should not be present
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    
    // Re-render with isImage=true
    rerender(
      <RdsMessageBox 
        message="Test conditional rendering" 
        avtar="avatar.jpg" 
        isImage={true} 
        src="image.jpg" 
      />
    );
    
    // Now image should be present
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'image.jpg');
  });
});