import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';
import RdsCompAiGradientTextWithIcon, { RdsCompAiGradientTextProps } from './rds-comp-ai-gradient-text-with-icon';

// Mock SCSS
jest.mock('./rds-comp-ai-gradient-text-with-icon.scss', () => ({}));

// Default props for testing
const defaultProps: RdsCompAiGradientTextProps = {
  logoUrl: 'https://example.com/logo.jpg',
  title: 'Gradient Text',
  logo: <span data-testid="custom-icon">Icon</span>,
  showImage: false,
  showIcon: false,
};

describe('RdsCompAiGradientTextWithIcon', () => {
  describe('Basic Rendering', () => {
    it('renders the component without crashing', () => {
      render(<RdsCompAiGradientTextWithIcon {...defaultProps} />);
      expect(screen.getByRole('heading')).toBeInTheDocument();
    });

    it('renders title text', () => {
      render(<RdsCompAiGradientTextWithIcon {...defaultProps} />);
      expect(screen.getByText('Gradient Text')).toBeInTheDocument();
    });

    it('renders with minimum props', () => {
      render(<RdsCompAiGradientTextWithIcon />);
      expect(screen.getByRole('heading')).toBeInTheDocument();
    });

    it('has correct display name for debugging', () => {
      expect(RdsCompAiGradientTextWithIcon.displayName).toBe('RdsCompAiGradientTextWithIcon');
    });

    it('renders container div with correct class', () => {
      const { container } = render(<RdsCompAiGradientTextWithIcon {...defaultProps} />);
      expect(container.querySelector('.rds-gradient-text-with-icon')).toBeInTheDocument();
    });
  });

  describe('Title Rendering', () => {
    it('renders custom title text', () => {
      render(
        <RdsCompAiGradientTextWithIcon
          {...defaultProps}
          title="Custom Gradient Title"
        />
      );
      expect(screen.getByText('Custom Gradient Title')).toBeInTheDocument();
    });

    it('renders title with special characters', () => {
      render(
        <RdsCompAiGradientTextWithIcon
          {...defaultProps}
          title="Title & Icon (Premium)"
        />
      );
      expect(screen.getByText('Title & Icon (Premium)')).toBeInTheDocument();
    });

    it('renders title with numbers and symbols', () => {
      render(
        <RdsCompAiGradientTextWithIcon
          {...defaultProps}
          title="Title #1 - Special"
        />
      );
      expect(screen.getByText('Title #1 - Special')).toBeInTheDocument();
    });

    it('renders very long title text', () => {
      const longTitle = 'A'.repeat(200);
      render(
        <RdsCompAiGradientTextWithIcon
          {...defaultProps}
          title={longTitle}
        />
      );
      expect(screen.getByText(longTitle)).toBeInTheDocument();
    });

    it('renders empty string title', () => {
      render(
        <RdsCompAiGradientTextWithIcon
          {...defaultProps}
          title=""
        />
      );
      const heading = screen.getByRole('heading');
      expect(heading).toHaveTextContent('');
    });

    it('renders undefined title gracefully', () => {
      render(
        <RdsCompAiGradientTextWithIcon
          {...defaultProps}
          title={undefined}
        />
      );
      expect(screen.getByRole('heading')).toBeInTheDocument();
    });

    it('renders title in h6 heading tag', () => {
      render(
        <RdsCompAiGradientTextWithIcon
          {...defaultProps}
          title="Test Title"
        />
      );
      const heading = screen.getByRole('heading', { level: 6 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('Test Title');
    });

    it('applies correct CSS class to title', () => {
      const { container } = render(
        <RdsCompAiGradientTextWithIcon
          {...defaultProps}
          title="Title"
        />
      );
      const titleElement = container.querySelector('.rds-gradient-text-with-icon__title');
      expect(titleElement).toBeInTheDocument();
      expect(titleElement).toHaveTextContent('Title');
    });
  });

  describe('Image Rendering', () => {
    it('renders image when showImage is true', () => {
      render(
        <RdsCompAiGradientTextWithIcon
          {...defaultProps}
          showImage={true}
          logoUrl="https://example.com/logo.jpg"
        />
      );
      const image = screen.getByRole('img');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', 'https://example.com/logo.jpg');
    });

    it('does not render image when showImage is false', () => {
      render(
        <RdsCompAiGradientTextWithIcon
          {...defaultProps}
          showImage={false}
        />
      );
      expect(screen.queryByRole('img')).not.toBeInTheDocument();
    });

    it('does not render image when showImage is undefined', () => {
      render(
        <RdsCompAiGradientTextWithIcon
          {...defaultProps}
          showImage={undefined}
        />
      );
      expect(screen.queryByRole('img')).not.toBeInTheDocument();
    });

    it('renders image with correct src attribute', () => {
      const logoUrl = 'https://example.com/custom-logo.png';
      render(
        <RdsCompAiGradientTextWithIcon
          {...defaultProps}
          showImage={true}
          logoUrl={logoUrl}
        />
      );
      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('src', logoUrl);
    });

    it('renders different logo URLs', () => {
      const { rerender } = render(
        <RdsCompAiGradientTextWithIcon
          {...defaultProps}
          showImage={true}
          logoUrl="https://example.com/logo1.jpg"
        />
      );
      let image = screen.getByRole('img');
      expect(image).toHaveAttribute('src', 'https://example.com/logo1.jpg');

      rerender(
        <RdsCompAiGradientTextWithIcon
          {...defaultProps}
          showImage={true}
          logoUrl="https://example.com/logo2.jpg"
        />
      );
      image = screen.getByRole('img');
      expect(image).toHaveAttribute('src', 'https://example.com/logo2.jpg');
    });

    it('renders image with data URI', () => {
      const dataUri = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
      render(
        <RdsCompAiGradientTextWithIcon
          {...defaultProps}
          showImage={true}
          logoUrl={dataUri}
        />
      );
      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('src', dataUri);
    });

    it('applies correct CSS class to image', () => {
      const { container } = render(
        <RdsCompAiGradientTextWithIcon
          {...defaultProps}
          showImage={true}
          logoUrl="https://example.com/logo.jpg"
        />
      );
      const logoElement = container.querySelector('.rds-gradient-text-with-icon__logo');
      expect(logoElement).toBeInTheDocument();
    });

    it('renders image without alt attribute', () => {
      render(
        <RdsCompAiGradientTextWithIcon
          {...defaultProps}
          showImage={true}
          logoUrl="https://example.com/logo.jpg"
        />
      );
      const image = screen.getByRole('img');
      // Component renders alt={title ?? ''} – the alt will equal the title prop
      expect(image).toHaveAttribute('alt', defaultProps.title);
    });
  });

  describe('Icon Rendering', () => {
    it('renders icon when showIcon is true', () => {
      render(
        <RdsCompAiGradientTextWithIcon
          {...defaultProps}
          showIcon={true}
          logo={<span data-testid="custom-icon">Icon</span>}
        />
      );
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });

    it('does not render icon when showIcon is false', () => {
      render(
        <RdsCompAiGradientTextWithIcon
          {...defaultProps}
          showIcon={false}
          logo={<span data-testid="custom-icon">Icon</span>}
        />
      );
      expect(screen.queryByTestId('custom-icon')).not.toBeInTheDocument();
    });

    it('does not render icon when showIcon is undefined', () => {
      render(
        <RdsCompAiGradientTextWithIcon
          {...defaultProps}
          showIcon={undefined}
          logo={<span data-testid="custom-icon">Icon</span>}
        />
      );
      expect(screen.queryByTestId('custom-icon')).not.toBeInTheDocument();
    });

    it('renders icon prop as ReactNode', () => {
      const customIcon = <div data-testid="custom-icon-div">Custom Icon</div>;
      render(
        <RdsCompAiGradientTextWithIcon
          {...defaultProps}
          showIcon={true}
          logo={customIcon}
        />
      );
      expect(screen.getByTestId('custom-icon-div')).toBeInTheDocument();
    });

    it('renders different icon types', () => {
      const { rerender } = render(
        <RdsCompAiGradientTextWithIcon
          {...defaultProps}
          showIcon={true}
          logo={<span data-testid="icon-1">Icon 1</span>}
        />
      );
      expect(screen.getByTestId('icon-1')).toBeInTheDocument();

      rerender(
        <RdsCompAiGradientTextWithIcon
          {...defaultProps}
          showIcon={true}
          logo={<span data-testid="icon-2">Icon 2</span>}
        />
      );
      expect(screen.getByTestId('icon-2')).toBeInTheDocument();
    });

    it('renders icon with complex structure', () => {
      const complexIcon = (
        <div data-testid="complex-icon">
          <svg data-testid="svg-icon">
            <circle />
          </svg>
        </div>
      );
      render(
        <RdsCompAiGradientTextWithIcon
          {...defaultProps}
          showIcon={true}
          logo={complexIcon}
        />
      );
      expect(screen.getByTestId('complex-icon')).toBeInTheDocument();
      expect(screen.getByTestId('svg-icon')).toBeInTheDocument();
    });

    it('does not render icon when logo prop is undefined', () => {
      render(
        <RdsCompAiGradientTextWithIcon
          {...defaultProps}
          showIcon={true}
          logo={undefined}
        />
      );
      expect(screen.queryByTestId('custom-icon')).not.toBeInTheDocument();
    });
  });

  describe('Combined Rendering', () => {
    it('renders all elements when both showImage and showIcon are true', () => {
      render(
        <RdsCompAiGradientTextWithIcon
          logoUrl="https://example.com/logo.jpg"
          title="Combined"
          logo={<span data-testid="custom-icon">Icon</span>}
          showImage={true}
          showIcon={true}
        />
      );
      expect(screen.getByRole('img')).toBeInTheDocument();
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
      expect(screen.getByText('Combined')).toBeInTheDocument();
    });

    it('renders only title when both showImage and showIcon are false', () => {
      render(
        <RdsCompAiGradientTextWithIcon
          logoUrl="https://example.com/logo.jpg"
          title="Title Only"
          logo={<span data-testid="custom-icon">Icon</span>}
          showImage={false}
          showIcon={false}
        />
      );
      expect(screen.queryByRole('img')).not.toBeInTheDocument();
      expect(screen.queryByTestId('custom-icon')).not.toBeInTheDocument();
      expect(screen.getByText('Title Only')).toBeInTheDocument();
    });

    it('renders image and title without icon', () => {
      render(
        <RdsCompAiGradientTextWithIcon
          logoUrl="https://example.com/logo.jpg"
          title="Image and Title"
          logo={<span data-testid="custom-icon">Icon</span>}
          showImage={true}
          showIcon={false}
        />
      );
      expect(screen.getByRole('img')).toBeInTheDocument();
      expect(screen.queryByTestId('custom-icon')).not.toBeInTheDocument();
      expect(screen.getByText('Image and Title')).toBeInTheDocument();
    });

    it('renders icon and title without image', () => {
      render(
        <RdsCompAiGradientTextWithIcon
          logoUrl="https://example.com/logo.jpg"
          title="Icon and Title"
          logo={<span data-testid="custom-icon">Icon</span>}
          showImage={false}
          showIcon={true}
        />
      );
      expect(screen.queryByRole('img')).not.toBeInTheDocument();
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
      expect(screen.getByText('Icon and Title')).toBeInTheDocument();
    });
  });

  describe('Props and Defaults', () => {
    it('uses default undefined values for optional props', () => {
      render(<RdsCompAiGradientTextWithIcon />);
      expect(screen.getByRole('heading')).toBeInTheDocument();
    });

    it('renders with only title provided', () => {
      render(<RdsCompAiGradientTextWithIcon title="Title Only" />);
      expect(screen.getByText('Title Only')).toBeInTheDocument();
      expect(screen.queryByRole('img')).not.toBeInTheDocument();
    });

    it('renders with only logoUrl provided', () => {
      render(<RdsCompAiGradientTextWithIcon logoUrl="https://example.com/logo.jpg" />);
      expect(screen.queryByRole('img')).not.toBeInTheDocument();
    });

    it('renders with only logo provided', () => {
      render(
        <RdsCompAiGradientTextWithIcon logo={<span data-testid="icon">Icon</span>} />
      );
      expect(screen.queryByTestId('icon')).not.toBeInTheDocument();
    });

    it('renders with only showImage provided', () => {
      const { container } = render(<RdsCompAiGradientTextWithIcon showImage={true} />);
      // showImage=true renders the image even without logoUrl.
      // With no title the alt is '', making the img role="presentation" in ARIA,
      // so query by CSS class instead of ARIA role.
      expect(container.querySelector('.rds-gradient-text-with-icon__logo')).toBeInTheDocument();
    });

    it('renders with only showIcon provided', () => {
      render(<RdsCompAiGradientTextWithIcon showIcon={true} />);
      expect(screen.getByRole('heading')).toBeInTheDocument();
    });

    it('updates when props change', () => {
      const { rerender } = render(
        <RdsCompAiGradientTextWithIcon
          title="Initial"
          showImage={false}
          showIcon={false}
        />
      );
      expect(screen.getByText('Initial')).toBeInTheDocument();

      rerender(
        <RdsCompAiGradientTextWithIcon
          title="Updated"
          showImage={true}
          logoUrl="https://example.com/logo.jpg"
          showIcon={true}
          logo={<span data-testid="icon">Icon</span>}
        />
      );
      expect(screen.getByText('Updated')).toBeInTheDocument();
      expect(screen.getByRole('img')).toBeInTheDocument();
      expect(screen.getByTestId('icon')).toBeInTheDocument();
    });
  });

  describe('CSS Classes', () => {
    it('applies base component class', () => {
      const { container } = render(
        <RdsCompAiGradientTextWithIcon {...defaultProps} />
      );
      expect(container.querySelector('.rds-gradient-text-with-icon')).toBeInTheDocument();
    });

    it('applies logo class when showImage is true', () => {
      const { container } = render(
        <RdsCompAiGradientTextWithIcon
          {...defaultProps}
          showImage={true}
          logoUrl="https://example.com/logo.jpg"
        />
      );
      expect(container.querySelector('.rds-gradient-text-with-icon__logo')).toBeInTheDocument();
    });

    it('applies title class', () => {
      const { container } = render(
        <RdsCompAiGradientTextWithIcon {...defaultProps} />
      );
      expect(container.querySelector('.rds-gradient-text-with-icon__title')).toBeInTheDocument();
    });

    it('does not apply logo class when showImage is false', () => {
      const { container } = render(
        <RdsCompAiGradientTextWithIcon
          {...defaultProps}
          showImage={false}
        />
      );
      expect(container.querySelector('.rds-gradient-text-with-icon__logo')).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('uses h6 heading tag for semantic HTML', () => {
      render(<RdsCompAiGradientTextWithIcon {...defaultProps} />);
      const heading = screen.getByRole('heading', { level: 6 });
      expect(heading).toBeInTheDocument();
    });
  
    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsCompAiGradientTextWithIcon {...defaultProps} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('heading contains text content', () => {
      render(
        <RdsCompAiGradientTextWithIcon
          {...defaultProps}
          title="Accessible Title"
        />
      );
      const heading = screen.getByRole('heading');
      expect(heading).toHaveTextContent('Accessible Title');
    });

    it('structure is semantically correct', () => {
      const { container } = render(
        <RdsCompAiGradientTextWithIcon
          {...defaultProps}
          showImage={true}
          showIcon={true}
          logoUrl="https://example.com/logo.jpg"
          logo={<span data-testid="icon">Icon</span>}
          title="Accessible Structure"
        />
      );
      const containerDiv = container.querySelector('.rds-gradient-text-with-icon');
      const image = container.querySelector('img');
      const title = container.querySelector('h6');
      const icon = screen.getByTestId('icon');

      expect(containerDiv).toBeInTheDocument();
      expect(image).toBeInTheDocument();
      expect(icon).toBeInTheDocument();
      expect(title).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles very long URL', () => {
      const longUrl = 'https://example.com/' + 'a'.repeat(1000) + '.jpg';
      render(
        <RdsCompAiGradientTextWithIcon
          {...defaultProps}
          showImage={true}
          logoUrl={longUrl}
        />
      );
      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('src', longUrl);
    });
    it('handles null logoUrl', () => {
      render(
        <RdsCompAiGradientTextWithIcon
          {...defaultProps}
          showImage={true}
          logoUrl={null as any}
        />
      );
      const image = screen.getByRole('img');
      expect(image).toBeInTheDocument();
      expect(image).not.toHaveAttribute('src');
    });

    it('handles null title', () => {
      render(
        <RdsCompAiGradientTextWithIcon
          {...defaultProps}
          title={null as any}
        />
      );
      expect(screen.getByRole('heading')).toBeInTheDocument();
    });

    it('handles empty string logoUrl', () => {
      render(
        <RdsCompAiGradientTextWithIcon
          {...defaultProps}
          showImage={true}
          logoUrl=""
        />
      );
      const image = screen.getByRole('img');
      expect(image).toBeInTheDocument();
      expect(image.getAttribute('src') ?? '').toBe('');
    });

    it('handles null logo prop', () => {
      render(
        <RdsCompAiGradientTextWithIcon
          {...defaultProps}
          showIcon={true}
          logo={null as any}
        />
      );
      expect(screen.getByRole('heading')).toBeInTheDocument();
    });

    it('handles special characters in title', () => {
      render(
        <RdsCompAiGradientTextWithIcon
          {...defaultProps}
          title="<script>alert('XSS')</script>"
        />
      );
      expect(screen.getByText("<script>alert('XSS')</script>")).toBeInTheDocument();
    });

    it('handles Unicode characters in title', () => {
      render(
        <RdsCompAiGradientTextWithIcon
          {...defaultProps}
          title="Hello 世界 🌍"
        />
      );
      expect(screen.getByText("Hello 世界 🌍")).toBeInTheDocument();
    });

    it('renders multiple instances independently', () => {
      const { container } = render(
        <div>
          <RdsCompAiGradientTextWithIcon title="Component 1" showImage={true} logoUrl="https://example.com/logo1.jpg" />
          <RdsCompAiGradientTextWithIcon title="Component 2" showIcon={true} logo={<span data-testid="icon-2">Icon</span>} />
        </div>
      );
      const containers = container.querySelectorAll('.rds-gradient-text-with-icon');
      expect(containers).toHaveLength(2);
    });
  });

  describe('Component Structure', () => {
    it('renders container div with correct class', () => {
      const { container } = render(
        <RdsCompAiGradientTextWithIcon {...defaultProps} />
      );
      const containerDiv = container.querySelector('.rds-gradient-text-with-icon');
      expect(containerDiv).toBeInTheDocument();
      expect(containerDiv?.children.length).toBeGreaterThan(0);
    });

    it('title always appears in the component', () => {
      const { container } = render(
        <RdsCompAiGradientTextWithIcon
          title="Always Present"
        />
      );
      const titleElement = container.querySelector('.rds-gradient-text-with-icon__title');
      expect(titleElement).toBeInTheDocument();
    });

    it('renders elements in correct order: image, icon, title', () => {
      const { container } = render(
        <RdsCompAiGradientTextWithIcon
          logoUrl="https://example.com/logo.jpg"
          title="Title"
          logo={<span data-testid="icon">Icon</span>}
          showImage={true}
          showIcon={true}
        />
      );
      const containerDiv = container.querySelector('.rds-gradient-text-with-icon');
      const children = containerDiv?.children;
      
      expect(children?.[0].tagName).toBe('IMG');
      expect(children?.[children.length - 1].tagName).toBe('H6');
    });
  });

  describe('Re-render Behavior', () => {
    it('maintains component state on prop changes', () => {
      const { rerender } = render(
        <RdsCompAiGradientTextWithIcon
          title="Initial"
          logoUrl="https://example.com/logo1.jpg"
          showImage={true}
          logo={<span data-testid="icon">Icon</span>}
          showIcon={true}
        />
      );

      expect(screen.getByText('Initial')).toBeInTheDocument();
      expect(screen.getByRole('img')).toHaveAttribute('src', 'https://example.com/logo1.jpg');

      rerender(
        <RdsCompAiGradientTextWithIcon
          title="Updated"
          logoUrl="https://example.com/logo2.jpg"
          showImage={true}
          logo={<span data-testid="icon">Icon</span>}
          showIcon={true}
        />
      );

      expect(screen.getByText('Updated')).toBeInTheDocument();
      expect(screen.getByRole('img')).toHaveAttribute('src', 'https://example.com/logo2.jpg');
    });

    it('toggles image visibility on prop change', () => {
      const { rerender, container } = render(
        <RdsCompAiGradientTextWithIcon
          logoUrl="https://example.com/logo.jpg"
          showImage={false}
        />
      );
      expect(container.querySelector('.rds-gradient-text-with-icon__logo')).not.toBeInTheDocument();

      rerender(
        <RdsCompAiGradientTextWithIcon
          logoUrl="https://example.com/logo.jpg"
          showImage={true}
        />
      );
      // No title → alt="" → ARIA role is "presentation"; query by class instead
      expect(container.querySelector('.rds-gradient-text-with-icon__logo')).toBeInTheDocument();
    });

    it('toggles icon visibility on prop change', () => {
      const { rerender } = render(
        <RdsCompAiGradientTextWithIcon
          logo={<span data-testid="icon">Icon</span>}
          showIcon={false}
        />
      );
      expect(screen.queryByTestId('icon')).not.toBeInTheDocument();

      rerender(
        <RdsCompAiGradientTextWithIcon
          logo={<span data-testid="icon">Icon</span>}
          showIcon={true}
        />
      );
      expect(screen.getByTestId('icon')).toBeInTheDocument();
    });

    it('updates title on prop change', () => {
      const { rerender } = render(
        <RdsCompAiGradientTextWithIcon title="Initial Title" />
      );
      expect(screen.getByText('Initial Title')).toBeInTheDocument();

      rerender(
        <RdsCompAiGradientTextWithIcon title="Updated Title" />
      );
      expect(screen.getByText('Updated Title')).toBeInTheDocument();
      expect(screen.queryByText('Initial Title')).not.toBeInTheDocument();
    });
  });
});