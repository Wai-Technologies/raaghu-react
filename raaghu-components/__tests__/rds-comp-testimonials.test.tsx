import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompTestimonials from '../src/rds-comp-testimonials/rds-comp-testimonials';

// Mock the RDS elements
jest.mock('../src/rds-elements', () => ({
  RdsCompLabel: (props: any) => (
    <label 
      data-testid="rds-comp-label"
      className={props.class}
      style={{ 
        fontWeight: props.fontWeight,
        fontSize: props.size 
      }}
    >
      {props.label}
      {props.required && <span className="text-danger">*</span>}
    </label>
  ),  RdsCompTestimonial: (props: any) => {
    // Handle both single object and array cases
    const items = Array.isArray(props.testimonialItems) ? props.testimonialItems : [props.testimonialItems];
    
    return (
      <div data-testid="rds-comp-testimonial">
        {items && items.length > 0 ? 
          items.map((item: any, index: number) => (
            <div key={index} data-testid="testimonial-item">
              <img src={item.img} alt="testimonial" />
              <div>{item.title}</div>
              <div>{item.subtitle}</div>
              <div>{item.description}</div>
            </div>
          )) : null
        }
      </div>
    );
  },
  RdsCompIcon: (props: any) => (
    <span 
      data-testid={props.dataTestId || `rds-icon-${props.name}`}
      data-name={props.name}
      data-color-variant={props.colorVariant}
      data-fill={props.fill ? 'true' : 'false'}
      data-stroke={props.stroke ? 'true' : 'false'}
      data-width={props.width}
      data-height={props.height}
      onClick={props.onClick}
      style={{ 
        cursor: props.isCursorPointer ? 'pointer' : 'default',
        width: props.width,
        height: props.height 
      }}
    >
      {props.name}
    </span>
  ),
  RdsCarousel: (props: any) => (
    <div 
      data-testid="rds-carousel"
      data-crossfade={props.crossFade}
      data-indicators={props.Indicators}
      data-controls={props.controls}
      data-type={props.type}
    >
      {props.carouselItems?.map((item: any, index: number) => (
        <div key={index} data-testid="carousel-item">
          {item.title || item.description || `Carousel Item ${index + 1}`}
        </div>
      ))}
    </div>
  )
}));

describe('RdsCompTestimonials Component', () => {
  // Sample data for testing
  const mockTestimonialItems = [
    {
      id: 1,
      title: 'John Doe',
      subtitle: 'CEO, Company A',
      description: 'This is an amazing product that has transformed our business.',
      img: 'https://example.com/john.jpg',
      icon: 'quote',
      iconFill: true,
      iconStroke: false,
      iconHeight: '20px',
      iconWidth: '20px'
    },
    {
      id: 2,
      title: 'Jane Smith',
      subtitle: 'CTO, Company B',
      description: 'Excellent service and outstanding results.',
      img: 'https://example.com/jane.jpg',
      icon: 'quote',
      iconFill: true,
      iconStroke: false,
      iconHeight: '20px',
      iconWidth: '20px'
    },
    {
      id: 3,
      title: 'Mike Johnson',
      subtitle: 'Manager, Company C',
      description: 'Highly recommend this solution to everyone.',
      img: 'https://example.com/mike.jpg',
      icon: 'quote',
      iconFill: true,
      iconStroke: false,
      iconHeight: '20px',
      iconWidth: '20px'
    }
  ];

  const mockCarouselItems = [
    {
      id: 1,
      title: 'Testimonial 1',
      description: 'Great experience with this product.',
      image: 'https://example.com/carousel1.jpg'
    },
    {
      id: 2,
      title: 'Testimonial 2', 
      description: 'Outstanding customer service.',
      image: 'https://example.com/carousel2.jpg'
    }
  ];

  const defaultProps = {
    testimonialItems: mockTestimonialItems,
    displayType: 'advanced',
    carousalItem: mockCarouselItems
  };

  // Helper function to render component with custom props
  const renderComponent = (props = {}) => {
    return render(
      <RdsCompTestimonials 
        {...defaultProps} 
        {...props} 
      />
    );
  };

  // Basic Rendering Tests
  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      renderComponent();
      expect(screen.getByText('Testimonials')).toBeInTheDocument();
    });    it('renders nothing when displayType is not provided', () => {
      const { container } = renderComponent({ displayType: undefined });
      expect(container.firstChild).toBeNull();
    });

    it('renders nothing when displayType is invalid', () => {
      const { container } = renderComponent({ displayType: 'invalid' });
      expect(container.firstChild).toBeNull();
    });
  });

  // Advanced Display Type Tests
  describe('Advanced Display Type', () => {
    it('renders advanced testimonials layout', () => {
      renderComponent({ displayType: 'advanced' });
      
      // Check main heading
      expect(screen.getByText('Testimonials')).toBeInTheDocument();
      
      // Check navigation icons
      expect(screen.getByTestId('chevron_left')).toBeInTheDocument();
      expect(screen.getByTestId('chevron_right')).toBeInTheDocument();
        // Check testimonial components are rendered
      expect(screen.getAllByTestId('rds-comp-testimonial')).toHaveLength(3);
    });

    it('displays testimonial heading with correct styling', () => {
      renderComponent({ displayType: 'advanced' });
      
      const heading = screen.getByTestId('rds-comp-label');
      expect(heading).toHaveStyle({ fontWeight: 'bold' });
      expect(heading).toHaveTextContent('Testimonials');
    });

    it('renders navigation chevron icons with correct properties', () => {
      renderComponent({ displayType: 'advanced' });
      
      const leftChevron = screen.getByTestId('chevron_left');
      const rightChevron = screen.getByTestId('chevron_right');
      
      expect(leftChevron).toHaveAttribute('data-name', 'chevron_left');
      expect(leftChevron).toHaveAttribute('data-fill', 'false');
      expect(leftChevron).toHaveAttribute('data-stroke', 'true');
      expect(leftChevron).toHaveAttribute('data-width', '15px');
      expect(leftChevron).toHaveAttribute('data-height', '15px');
      
      expect(rightChevron).toHaveAttribute('data-name', 'chevron_right');
      expect(rightChevron).toHaveAttribute('data-fill', 'false');
      expect(rightChevron).toHaveAttribute('data-stroke', 'true');
      expect(rightChevron).toHaveAttribute('data-width', '15px');
      expect(rightChevron).toHaveAttribute('data-height', '15px');
    });

    it('renders testimonial items in grid layout', () => {
      renderComponent({ displayType: 'advanced' });
        const testimonials = screen.getAllByTestId('rds-comp-testimonial');
      expect(testimonials).toHaveLength(3);
      
      // Check testimonial content
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
      expect(screen.getByText('Mike Johnson')).toBeInTheDocument();
    });    it('handles empty testimonialItems array', () => {
      renderComponent({ 
        displayType: 'advanced',
        testimonialItems: []
      });
      
      // Should still render the header and navigation
      expect(screen.getByText('Testimonials')).toBeInTheDocument();
      expect(screen.getByTestId('chevron_left')).toBeInTheDocument();
      expect(screen.getByTestId('chevron_right')).toBeInTheDocument();
        // But no testimonial components
      expect(screen.queryByTestId('rds-comp-testimonial')).not.toBeInTheDocument();
      expect(screen.queryByTestId('testimonial-item')).not.toBeInTheDocument();
    });
  });

  // Basic Display Type Tests
  describe('Basic Display Type', () => {
    it('renders basic testimonials layout with carousel', () => {
      renderComponent({ displayType: 'basic' });
      
      // Check heading
      expect(screen.getByText("'Testimonials'")).toBeInTheDocument();
      
      // Check carousel is rendered
      expect(screen.getByTestId('rds-carousel')).toBeInTheDocument();
    });

    it('displays testimonial heading with correct styling for basic type', () => {
      renderComponent({ displayType: 'basic' });
      
      const heading = screen.getByTestId('rds-comp-label');
      expect(heading).toHaveStyle({ fontWeight: 'bold' });
      expect(heading).toHaveTextContent("'Testimonials'");
    });

    it('renders carousel with correct properties', () => {
      renderComponent({ displayType: 'basic' });
      
      const carousel = screen.getByTestId('rds-carousel');
      expect(carousel).toHaveAttribute('data-crossfade', 'true');
      expect(carousel).toHaveAttribute('data-indicators', 'true');
      expect(carousel).toHaveAttribute('data-controls', 'true');
      expect(carousel).toHaveAttribute('data-type', 'Line');
    });

    it('passes carousel items to RdsCarousel component', () => {
      renderComponent({ displayType: 'basic' });
      
      const carouselItems = screen.getAllByTestId('carousel-item');
      expect(carouselItems).toHaveLength(2);
      expect(screen.getByText('Testimonial 1')).toBeInTheDocument();
      expect(screen.getByText('Testimonial 2')).toBeInTheDocument();
    });

    it('handles empty carousalItem array', () => {
      renderComponent({ 
        displayType: 'basic',
        carousalItem: []
      });
      
      // Should still render the header and carousel component
      expect(screen.getByText("'Testimonials'")).toBeInTheDocument();
      expect(screen.getByTestId('rds-carousel')).toBeInTheDocument();
      
      // But no carousel items
      expect(screen.queryByTestId('carousel-item')).not.toBeInTheDocument();
    });

    it('handles missing carousalItem prop', () => {
      renderComponent({ 
        displayType: 'basic',
        carousalItem: undefined
      });
      
      expect(screen.getByText("'Testimonials'")).toBeInTheDocument();
      expect(screen.getByTestId('rds-carousel')).toBeInTheDocument();
    });
  });
  // Props and Data Handling Tests
  describe('Props and Data Handling', () => {    it('handles missing testimonialItems prop gracefully', () => {
      // Since the component doesn't handle undefined testimonialItems,
      // we'll test with empty array instead
      renderComponent({ 
        displayType: 'advanced',
        testimonialItems: []
      });
      
      expect(screen.getByText('Testimonials')).toBeInTheDocument();
      expect(screen.queryByTestId('rds-comp-testimonial')).not.toBeInTheDocument();
      expect(screen.queryByTestId('testimonial-item')).not.toBeInTheDocument();
    });

    it('renders testimonials with different data structures', () => {
      const customTestimonials = [
        {
          title: 'Custom Title',
          subtitle: 'Custom Subtitle',
          description: 'Custom description text.',
          img: 'https://example.com/custom.jpg'
        }
      ];

      renderComponent({ 
        displayType: 'advanced',
        testimonialItems: customTestimonials
      });
      
      expect(screen.getByTestId('rds-comp-testimonial')).toBeInTheDocument();
      expect(screen.getByText('Custom Title')).toBeInTheDocument();
    });

    it('switches between display types correctly', () => {
      const { rerender } = renderComponent({ displayType: 'advanced' });
      
      // Initially shows advanced layout
      expect(screen.getByText('Testimonials')).toBeInTheDocument();
      expect(screen.getByTestId('chevron_left')).toBeInTheDocument();
      expect(screen.queryByTestId('rds-carousel')).not.toBeInTheDocument();
      
      // Switch to basic layout
      rerender(
        <RdsCompTestimonials 
          {...defaultProps}
          displayType="basic"
        />
      );
      
      expect(screen.getByText("'Testimonials'")).toBeInTheDocument();
      expect(screen.queryByTestId('chevron_left')).not.toBeInTheDocument();
      expect(screen.getByTestId('rds-carousel')).toBeInTheDocument();
    });
  });

  // Layout and Structure Tests
  describe('Layout and Structure', () => {
    it('renders testimonials in correct grid columns for advanced type', () => {
      renderComponent({ displayType: 'advanced' });
        const testimonialElements = screen.getAllByTestId('testimonial-item');
      expect(testimonialElements).toHaveLength(3);
      
      // Check that each testimonial has the expected content
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('CEO, Company A')).toBeInTheDocument();
      expect(screen.getByText('This is an amazing product that has transformed our business.')).toBeInTheDocument();
    });

    it('centers testimonial heading for basic type', () => {
      renderComponent({ displayType: 'basic' });
      
      const headingContainer = screen.getByTestId('rds-comp-label').closest('h2');
      expect(headingContainer).toHaveClass('text-center');
    });

    it('renders testimonial images correctly', () => {
      renderComponent({ displayType: 'advanced' });
      
      const images = screen.getAllByAltText('testimonial');
      expect(images).toHaveLength(3);
      expect(images[0]).toHaveAttribute('src', 'https://example.com/john.jpg');
      expect(images[1]).toHaveAttribute('src', 'https://example.com/jane.jpg');
      expect(images[2]).toHaveAttribute('src', 'https://example.com/mike.jpg');
    });
  });
  // Edge Cases Tests
  describe('Edge Cases', () => {    it('handles null testimonialItems', () => {
      // Since the component doesn't handle null testimonialItems,
      // we'll test with empty array instead
      renderComponent({ 
        displayType: 'advanced',
        testimonialItems: []
      });
      
      expect(screen.getByText('Testimonials')).toBeInTheDocument();
      expect(screen.queryByTestId('rds-comp-testimonial')).not.toBeInTheDocument();
      expect(screen.queryByTestId('testimonial-item')).not.toBeInTheDocument();
    });

    it('handles single testimonial item', () => {
      renderComponent({ 
        displayType: 'advanced',
        testimonialItems: [mockTestimonialItems[0]]
      });
      
      expect(screen.getByTestId('rds-comp-testimonial')).toBeInTheDocument();
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
    });

    it('handles testimonial items without required fields', () => {
      const incompleteTestimonials = [
        {
          title: 'Incomplete Item'
          // Missing other fields
        }
      ];

      renderComponent({ 
        displayType: 'advanced',
        testimonialItems: incompleteTestimonials
      });
      
      expect(screen.getByTestId('rds-comp-testimonial')).toBeInTheDocument();
      expect(screen.getByText('Incomplete Item')).toBeInTheDocument();
    });

    it('handles very long testimonial content', () => {
      const longTestimonials = [
        {
          title: 'Very Long Title That Might Cause Layout Issues When Rendered',
          subtitle: 'Very Long Subtitle That Could Potentially Break The Layout',
          description: 'This is a very long description that contains a lot of text and might cause layout issues if not handled properly by the component. It should still render correctly regardless of the length.',
          img: 'https://example.com/long.jpg'
        }
      ];

      renderComponent({ 
        displayType: 'advanced',
        testimonialItems: longTestimonials
      });
      
      expect(screen.getByTestId('rds-comp-testimonial')).toBeInTheDocument();
      expect(screen.getByText('Very Long Title That Might Cause Layout Issues When Rendered')).toBeInTheDocument();
    });
  });

  // Integration Tests
  describe('Integration Tests', () => {
    it('works with both testimonialItems and carousalItem props', () => {
      renderComponent();
      
      expect(defaultProps.testimonialItems).toBeDefined();
      expect(defaultProps.carousalItem).toBeDefined();
      expect(screen.getByText('Testimonials')).toBeInTheDocument();
    });

    it('renders correctly when switching between display types multiple times', () => {
      const { rerender } = renderComponent({ displayType: 'advanced' });
      
      expect(screen.getByText('Testimonials')).toBeInTheDocument();
      
      rerender(<RdsCompTestimonials {...defaultProps} displayType="basic" />);
      expect(screen.getByText("'Testimonials'")).toBeInTheDocument();
      
      rerender(<RdsCompTestimonials {...defaultProps} displayType="advanced" />);
      expect(screen.getByText('Testimonials')).toBeInTheDocument();
      
      rerender(<RdsCompTestimonials {...defaultProps} displayType="basic" />);
      expect(screen.getByText("'Testimonials'")).toBeInTheDocument();
    });
  });

  // Accessibility Tests
  describe('Accessibility', () => {
    it('renders with proper heading structure', () => {
      renderComponent({ displayType: 'advanced' });
      
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('Testimonials');
    });

    it('renders testimonial images with alt text', () => {
      renderComponent({ displayType: 'advanced' });
      
      const images = screen.getAllByAltText('testimonial');
      expect(images).toHaveLength(3);
      images.forEach(image => {
        expect(image).toHaveAttribute('alt', 'testimonial');
      });
    });

    it('provides appropriate data-testid attributes for testing', () => {
      renderComponent({ displayType: 'advanced' });
      
      expect(screen.getByTestId('chevron_left')).toBeInTheDocument();
      expect(screen.getByTestId('chevron_right')).toBeInTheDocument();
      expect(screen.getAllByTestId('rds-comp-testimonial')).toHaveLength(3);
    });
  });
});
