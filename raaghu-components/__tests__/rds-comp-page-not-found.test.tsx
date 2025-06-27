import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompPageNotFound from '../src/rds-comp-page-not-found/rds-comp-page-not-found';

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  Link: ({ children, to, ...props }: any) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}));

// Mock the rds-elements components
jest.mock('../src/rds-elements', () => ({
  RdsCompLabel: ({ label, class: className }: any) => (
    <span data-testid="rds-comp-label" className={className}>
      {label}
    </span>
  ),
  RdsCompIcon: ({ name, width, height, fill, stroke }: any) => (
    <span
      data-testid={`rds-icon-${name}`}
      className={`icon-${name}`}
      style={{ width, height }}
    >
      {name}
    </span>
  ),
}));

describe('RdsCompPageNotFound', () => {
  describe('Component Rendering', () => {
    it('should render without crashing', () => {
      expect(() => {
        render(<RdsCompPageNotFound />);
      }).not.toThrow();
    });

    it('should render the main heading', () => {
      render(<RdsCompPageNotFound />);
      
      const heading = screen.getByText('Page not found');
      expect(heading).toBeInTheDocument();
    });

    it('should render the descriptive message', () => {
      render(<RdsCompPageNotFound />);
      
      const message = screen.getByText("Sorry, we couldn't find the page you were looking for.");
      expect(message).toBeInTheDocument();
    });

    it('should render the "Go back home" link', () => {
      render(<RdsCompPageNotFound />);
      
      const homeLink = screen.getByText('Go back home');
      expect(homeLink).toBeInTheDocument();
    });

    it('should render the right arrow icon', () => {
      render(<RdsCompPageNotFound />);
      
      const icon = screen.getByTestId('rds-icon-right');
      expect(icon).toBeInTheDocument();
    });
  });

  describe('Component Structure', () => {
    it('should have correct layout structure with two columns', () => {
      const { container } = render(<RdsCompPageNotFound />);
      
      const row = container.querySelector('.row');
      expect(row).toBeInTheDocument();
      
      const columns = container.querySelectorAll('[class*="col-"]');
      expect(columns).toHaveLength(2);
    });

    it('should have correct CSS classes for the main content column', () => {
      const { container } = render(<RdsCompPageNotFound />);
      
      const contentColumn = container.querySelector('.col-xxl-6.col-xl-6.col-lg-12.col-md-12.col-12.text-center.p-4');
      expect(contentColumn).toBeInTheDocument();
      expect(contentColumn).toHaveClass('d-flex', 'justify-content-center', 'align-items-center', 'vh-100');
    });

    it('should have correct CSS classes for the background image column', () => {
      const { container } = render(<RdsCompPageNotFound />);
      
      const imageColumn = container.querySelector('.countdown-col');
      expect(imageColumn).toBeInTheDocument();
      expect(imageColumn).toHaveClass('vh-100', 'd-xl-block', 'd-none');
    });

    it('should have centered content wrapper', () => {
      const { container } = render(<RdsCompPageNotFound />);
      
      const contentWrapper = container.querySelector('.mt-mb-custom.text-center');
      expect(contentWrapper).toBeInTheDocument();
    });
  });

  describe('Styling and Layout', () => {
    it('should apply correct styling to the main heading', () => {
      const { container } = render(<RdsCompPageNotFound />);
      
      const heading = container.querySelector('h1.pb-1');
      expect(heading).toBeInTheDocument();
      
      const boldElement = heading?.querySelector('b');
      expect(boldElement).toBeInTheDocument();
    });

    it('should apply correct styling to the descriptive message', () => {
      render(<RdsCompPageNotFound />);
      
      const message = screen.getByText("Sorry, we couldn't find the page you were looking for.");
      expect(message).toHaveClass('text-muted', 'fw-medium', 'mb-3');
    });

    it('should have correct styling for the "Go back home" link', () => {
      const { container } = render(<RdsCompPageNotFound />);
      
      const linkParagraph = container.querySelector('p.mb-0.pt-4');
      expect(linkParagraph).toBeInTheDocument();
      
      const link = container.querySelector('.go-back-home.text-primary');
      expect(link).toBeInTheDocument();
    });

    it('should apply background image styles to the image column', () => {
      const { container } = render(<RdsCompPageNotFound />);
      
      const imageColumn = container.querySelector('.countdown-col');
      expect(imageColumn).toHaveStyle({
        backgroundImage: 'url("https://cdn.pixabay.com/photo/2012/10/10/11/18/weightless-60632_960_720.jpg")',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      });
    });
  });

  describe('Icon Properties', () => {
    it('should render icon with correct properties', () => {
      render(<RdsCompPageNotFound />);
      
      const icon = screen.getByTestId('rds-icon-right');
      expect(icon).toHaveStyle({
        width: '16px',
        height: '16px'
      });
      expect(icon).toHaveClass('icon-right');
    });

    it('should have icon positioned correctly with margin', () => {
      const { container } = render(<RdsCompPageNotFound />);
      
      const iconSpan = container.querySelector('.me-2');
      expect(iconSpan).toBeInTheDocument();
      expect(iconSpan).toHaveTextContent('Go back home');
    });
  });

  describe('Link Functionality', () => {
    it('should render link with correct href attribute', () => {
      const { container } = render(<RdsCompPageNotFound />);
      
      const link = container.querySelector('a.go-back-home');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '#');
    });

    it('should have accessible link text', () => {
      render(<RdsCompPageNotFound />);
      
      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAccessibleName();
    });
  });

  describe('Responsive Design', () => {
    it('should have responsive column classes for different screen sizes', () => {
      const { container } = render(<RdsCompPageNotFound />);
      
      const contentColumn = container.querySelector('[class*="col-xxl-6"]');
      expect(contentColumn).toHaveClass(
        'col-xxl-6',
        'col-xl-6', 
        'col-lg-12',
        'col-md-12',
        'col-12'
      );
    });

    it('should hide image column on smaller screens', () => {
      const { container } = render(<RdsCompPageNotFound />);
      
      const imageColumn = container.querySelector('.countdown-col');
      expect(imageColumn).toHaveClass('d-xl-block', 'd-none');
    });

    it('should have full viewport height for both columns', () => {
      const { container } = render(<RdsCompPageNotFound />);
      
      const columns = container.querySelectorAll('.vh-100');
      expect(columns).toHaveLength(2);
    });
  });

  describe('Component Props', () => {
    it('should handle empty props interface', () => {
      expect(() => {
        render(<RdsCompPageNotFound />);
      }).not.toThrow();
    });

    it('should work without any props', () => {
      render(<RdsCompPageNotFound />);
      
      expect(screen.getByText('Page not found')).toBeInTheDocument();
      expect(screen.getByText("Sorry, we couldn't find the page you were looking for.")).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      render(<RdsCompPageNotFound />);
      
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
    });

    it('should have accessible link element', () => {
      render(<RdsCompPageNotFound />);
      
      const link = screen.getByRole('link');
      expect(link).toBeVisible();
      expect(link).toBeInTheDocument();
    });

    it('should have descriptive text for screen readers', () => {
      render(<RdsCompPageNotFound />);
      
      const description = screen.getByText("Sorry, we couldn't find the page you were looking for.");
      expect(description).toBeInTheDocument();
    });
  });

  describe('Mocked Components Integration', () => {
    it('should render RdsCompLabel components with correct props', () => {
      render(<RdsCompPageNotFound />);
      
      const labels = screen.getAllByTestId('rds-comp-label');
      expect(labels).toHaveLength(2);
      
      expect(labels[0]).toHaveTextContent('Page not found');
      expect(labels[1]).toHaveTextContent("Sorry, we couldn't find the page you were looking for.");
      expect(labels[1]).toHaveClass('text-muted', 'fw-medium', 'mb-3');
    });

    it('should render RdsCompIcon with correct props', () => {
      render(<RdsCompPageNotFound />);
      
      const icon = screen.getByTestId('rds-icon-right');
      expect(icon).toHaveTextContent('right');
      expect(icon).toHaveClass('icon-right');
    });
  });

  describe('Component Stability', () => {
    it('should not crash on multiple renders', () => {
      const { rerender } = render(<RdsCompPageNotFound />);
      
      expect(() => {
        rerender(<RdsCompPageNotFound />);
        rerender(<RdsCompPageNotFound />);
      }).not.toThrow();
    });

    it('should maintain consistent content across re-renders', () => {
      const { rerender } = render(<RdsCompPageNotFound />);
      
      expect(screen.getByText('Page not found')).toBeInTheDocument();
      
      rerender(<RdsCompPageNotFound />);
      
      expect(screen.getByText('Page not found')).toBeInTheDocument();
      expect(screen.getByText("Sorry, we couldn't find the page you were looking for.")).toBeInTheDocument();
      expect(screen.getByText('Go back home')).toBeInTheDocument();
    });

    it('should have consistent DOM structure', () => {
      const { container: container1 } = render(<RdsCompPageNotFound />);
      const { container: container2 } = render(<RdsCompPageNotFound />);
      
      expect(container1.innerHTML).toBe(container2.innerHTML);
    });
  });
});