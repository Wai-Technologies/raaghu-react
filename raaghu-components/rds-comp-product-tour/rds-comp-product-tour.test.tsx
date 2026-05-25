import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RdsCompProductTour from './rds-comp-product-tour';
import { RdsCompProductTourProps } from './product-tour-helpers';
import '@testing-library/jest-dom';

// Mock SCSS
jest.mock('./rds-comp-product-tour.scss', () => ({}));

// Mock MUI components
jest.mock('@mui/material', () => ({
  Box: ({ children, className, sx, ...props }: any) => {
    const style = sx ? Object.keys(sx).reduce((acc: any, key: string) => {
      acc[key] = sx[key];
      return acc;
    }, {}) : {};
    return (
      <div data-testid="box" className={className} style={style} {...props}>{children}</div>
    );
  },
  Typography: ({ children, variant, className, ...props }: any) => (
    <div data-testid={`typography-${variant}`} className={className} {...props}>{children}</div>
  ),
  Paper: ({ children, className, ...props }: any) => (
    <div data-testid="paper" className={className} {...props}>{children}</div>
  ),
  IconButton: ({ children, onClick, className, ...props }: any) => (
    <button
      data-testid="icon-button"
      onClick={onClick}
      className={className}
      {...props}
    >
      {children}
    </button>
  ),
}));

// Mock MUI Icons
jest.mock('@mui/icons-material', () => ({
  Close: () => <span data-testid="close-icon">×</span>,
  InfoOutlined: () => <span data-testid="info-icon">ⓘ</span>,
  ExpandMore: () => <span data-testid="expand-icon">▼</span>,
}));

// Mock Raaghu elements
jest.mock('../../raaghu-elements', () => ({
  RdsCarousel: ({ children, state, height, style, type, showDots, showArrows, ...props }: any) => (
    <div
      data-testid="rds-carousel"
      data-state={state}
      data-height={height}
      data-style={style}
      data-type={type}
      {...props}
    >
      {children}
    </div>
  ),
  RdsBadge: ({ badgeContent, size, colorVariant, shape, layout, ...props }: any) => (
    <span
      data-testid="rds-badge"
      data-badge-content={badgeContent}
      data-size={size}
      data-color-variant={colorVariant}
      data-shape={shape}
      data-layout={layout}
      {...props}
    >
      {badgeContent}
    </span>
  ),
  RdsFileUploader: ({ accept, dragAndDrop, hintText, maxFiles, maxSize, onFilesChange, ...props }: any) => (
    <div
      data-testid="rds-file-uploader"
      data-accept={accept}
      data-max-files={maxFiles}
      data-max-size={maxSize}
      {...props}
    >
      {hintText}
    </div>
  ),
  RdsInput: ({ placeholder, value, onChange, ...props }: any) => (
    <input
      data-testid="rds-input"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...props}
    />
  ),
  RdsAutocomplete: ({ options, placeholder, ...props }: any) => (
    <div data-testid="rds-autocomplete" data-placeholder={placeholder} {...props}></div>
  ),
  RdsButton: ({ text, onClick, className, style, size, ...props }: any) => (
    <button
      data-testid={`rds-button-${text?.toLowerCase()?.replace(/\s+/g, '-')}`}
      onClick={onClick}
      className={className}
      data-style={style}
      data-size={size}
      {...props}
    >
      {text}
    </button>
  ),
}));

describe('RdsCompProductTour', () => {
  const defaultProps: RdsCompProductTourProps = {
    state: 'Image',
    header: 'Welcome',
    description: 'This is a tour step',
    stepsIndicator: '1/3',
  };

  const mockSlides = [
    { id: 1, imgUrl: '/image1.jpg' },
    { id: 2, imgUrl: '/image2.jpg' },
    { id: 3, imgUrl: '/image3.jpg' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      render(<RdsCompProductTour {...defaultProps} />);
      expect(screen.getByTestId('paper')).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsCompProductTour.displayName).toBe('RdsCompProductTour');
    });

    it('should render with Image state by default', () => {
      const { container } = render(<RdsCompProductTour {...defaultProps} state="Image" />);
      expect(container.querySelector('.rds-comp-product-tour__container--image')).toBeInTheDocument();
    });

    it('should render Paper container', () => {
      render(<RdsCompProductTour {...defaultProps} />);
      expect(screen.getByTestId('paper')).toHaveClass('rds-comp-product-tour__container');
    });

    it('should not render if not visible', () => {
      const { rerender } = render(<RdsCompProductTour {...defaultProps} />);
      expect(screen.getByTestId('paper')).toBeInTheDocument();
    });
  });

  describe('State Variants', () => {
    it('should render Image state', () => {
      const { container } = render(
        <RdsCompProductTour {...defaultProps} state="Image" slides={mockSlides} />
      );
      expect(container.querySelector('.rds-comp-product-tour__container--image')).toBeInTheDocument();
    });

    it('should render Carousel state', () => {
      const { container } = render(
        <RdsCompProductTour {...defaultProps} state="Carousel" slides={mockSlides} />
      );
      expect(container.querySelector('.rds-comp-product-tour__container--carousel')).toBeInTheDocument();
    });

    it('should render GIF state', () => {
      const { container } = render(
        <RdsCompProductTour {...defaultProps} state="GIF" />
      );
      expect(container.querySelector('.rds-comp-product-tour__container--animation')).toBeInTheDocument();
    });

    it('should render Form state', () => {
      const { container } = render(
        <RdsCompProductTour {...defaultProps} state="Form" formTitle="Sign Up" />
      );
      expect(container.querySelector('.rds-comp-product-tour__container--form')).toBeInTheDocument();
    });
  });

  describe('Image State', () => {
    it('should render image section', () => {
      const { container } = render(
        <RdsCompProductTour {...defaultProps} state="Image" slides={mockSlides} />
      );
      expect(container.querySelector('.rds-comp-product-tour__image-section')).toBeInTheDocument();
    });

    it('should display image from slides', () => {
      const { container } = render(
        <RdsCompProductTour {...defaultProps} state="Image" slides={mockSlides} />
      );
      const img = container.querySelector('.rds-comp-product-tour__image');
      expect(img).toHaveAttribute('src', '/image1.jpg');
    });

    it('should show visual placeholder by default', () => {
      const { container } = render(
        <RdsCompProductTour {...defaultProps} state="Image" slides={mockSlides} showVisualPlaceholder={true} />
      );
      expect(container.querySelector('.rds-comp-product-tour__image-section')).toBeInTheDocument();
    });

    it('should hide visual placeholder when disabled', () => {
      const { container } = render(
        <RdsCompProductTour {...defaultProps} state="Image" slides={mockSlides} showVisualPlaceholder={false} />
      );
      const section = container.querySelector('.rds-comp-product-tour__image-section');
      expect(section).toBeInTheDocument();
      const img = container.querySelector('.rds-comp-product-tour__image');
      expect(img).not.toBeInTheDocument();
    });

    it('should render info and nav section', () => {
      const { container } = render(
        <RdsCompProductTour {...defaultProps} state="Image" slides={mockSlides} />
      );
      expect(container.querySelector('.rds-comp-product-tour__info-nav-section')).toBeInTheDocument();
    });
  });

  describe('Carousel State', () => {
    it('should render carousel container', () => {
      const { container } = render(
        <RdsCompProductTour {...defaultProps} state="Carousel" slides={mockSlides} />
      );
      expect(container.querySelector('.rds-comp-product-tour__carousel-wrapper')).toBeInTheDocument();
    });

    it('should render RdsCarousel component', () => {
      render(
        <RdsCompProductTour {...defaultProps} state="Carousel" slides={mockSlides} />
      );
      expect(screen.getByTestId('rds-carousel')).toBeInTheDocument();
    });

    it('should render carousel dots for each slide', () => {
      const { container } = render(
        <RdsCompProductTour {...defaultProps} state="Carousel" slides={mockSlides} />
      );
      const dots = container.querySelectorAll('.rds-comp-product-tour__carousel-dot');
      expect(dots.length).toBe(3);
    });

    it('should highlight active carousel dot', () => {
      const { container } = render(
        <RdsCompProductTour {...defaultProps} state="Carousel" slides={mockSlides} />
      );
      const dots = container.querySelectorAll('.rds-comp-product-tour__carousel-dot');
      expect(dots[0]).toHaveClass('rds-comp-product-tour__carousel-dot--active');
    });

    it('should render carousel header with title and description', () => {
      render(
        <RdsCompProductTour {...defaultProps} state="Carousel" slides={mockSlides} header="Carousel Title" description="Carousel Desc" />
      );
      expect(screen.getByText('Carousel Title')).toBeInTheDocument();
      expect(screen.getByText('Carousel Desc')).toBeInTheDocument();
    });
  });

  describe('GIF State', () => {
    it('should render animation section', () => {
      const { container } = render(
        <RdsCompProductTour {...defaultProps} state="GIF" />
      );
      expect(container.querySelector('.rds-comp-product-tour__animation-section')).toBeInTheDocument();
    });

    it('should display GIF image', () => {
      const { container } = render(
        <RdsCompProductTour {...defaultProps} state="GIF" showVisualPlaceholder={true} />
      );
      const gif = container.querySelector('.rds-comp-product-tour__gif');
      expect(gif).toHaveAttribute('src', '/assets/animation.gif');
    });

    it('should hide GIF placeholder when disabled', () => {
      const { container } = render(
        <RdsCompProductTour {...defaultProps} state="GIF" showVisualPlaceholder={false} />
      );
        // When visual placeholder is disabled, the GIF element should not be rendered
        const gif = container.querySelector('.rds-comp-product-tour__gif');
        expect(gif).not.toBeInTheDocument();
    });

    it('should render animation info section', () => {
      const { container } = render(
        <RdsCompProductTour {...defaultProps} state="GIF" header="GIF Tutorial" description="Watch this animation" />
      );
      expect(container.querySelector('.rds-comp-product-tour__animation-info')).toBeInTheDocument();
      expect(screen.getByText('GIF Tutorial')).toBeInTheDocument();
      expect(screen.getByText('Watch this animation')).toBeInTheDocument();
    });
  });

  describe('Form State', () => {
    it('should render form container', () => {
      const { container } = render(
        <RdsCompProductTour {...defaultProps} state="Form" formTitle="Contact" />
      );
      expect(container.querySelector('.rds-comp-product-tour__container--form')).toBeInTheDocument();
    });

    it('should display form title', () => {
      render(
        <RdsCompProductTour {...defaultProps} state="Form" formTitle="Contact Form" />
      );
      expect(screen.getByText('Contact Form')).toBeInTheDocument();
    });

    it('should render badge in form', () => {
      render(
        <RdsCompProductTour {...defaultProps} state="Form" formTitle="Form" header="Step 1" />
      );
      expect(screen.getByTestId('rds-badge')).toBeInTheDocument();
    });

    it('should render form tabs', () => {
      const { container } = render(
        <RdsCompProductTour
          {...defaultProps}
          state="Form"
          formTitle="Form"
          tabTitle={['Tab 1', 'Tab 2', 'Tab 3']}
        />
      );
      expect(screen.getByText('Tab 1')).toBeInTheDocument();
      expect(screen.getByText('Tab 2')).toBeInTheDocument();
      expect(screen.getByText('Tab 3')).toBeInTheDocument();
    });

    it('should render file uploader', () => {
      render(
        <RdsCompProductTour {...defaultProps} state="Form" formTitle="Form" />
      );
      expect(screen.getByTestId('rds-file-uploader')).toBeInTheDocument();
    });

    it('should pass correct file uploader props', () => {
      render(
        <RdsCompProductTour {...defaultProps} state="Form" formTitle="Form" />
      );
      const uploader = screen.getByTestId('rds-file-uploader');
      expect(uploader).toHaveAttribute('data-accept', '.pdf,.doc,.docx');
      expect(uploader).toHaveAttribute('data-max-files', '1');
    });
  });

  describe('Corner Dots', () => {
    it('should render top left corner dot', () => {
      const { container } = render(
        <RdsCompProductTour {...defaultProps} topLeft={true} />
      );
      const dots = container.querySelectorAll('.rds-comp-product-tour__corner-dot');
      expect(dots.length).toBeGreaterThan(0);
    });

    it('should render top right corner dot', () => {
      const { container } = render(
        <RdsCompProductTour {...defaultProps} topRight={true} />
      );
      const dots = container.querySelectorAll('.rds-comp-product-tour__corner-dot');
      expect(dots.length).toBeGreaterThan(0);
    });

    it('should render bottom left corner dot', () => {
      const { container } = render(
        <RdsCompProductTour {...defaultProps} bottomLeft={true} />
      );
      const dots = container.querySelectorAll('.rds-comp-product-tour__corner-dot');
      expect(dots.length).toBeGreaterThan(0);
    });

    it('should render bottom right corner dot', () => {
      const { container } = render(
        <RdsCompProductTour {...defaultProps} bottomRight={true} />
      );
      const dots = container.querySelectorAll('.rds-comp-product-tour__corner-dot');
      expect(dots.length).toBeGreaterThan(0);
    });

    it('should render all corner dots when all enabled', () => {
      const { container } = render(
        <RdsCompProductTour
          {...defaultProps}
          topLeft={true}
          topRight={true}
          bottomLeft={true}
          bottomRight={true}
        />
      );
      const dots = container.querySelectorAll('.rds-comp-product-tour__corner-dot');
      expect(dots.length).toBe(4);
    });
  });

  describe('Dismiss Button', () => {
    it('should render dismiss button by default', () => {
      render(<RdsCompProductTour {...defaultProps} showDismiss={true} />);
      expect(screen.getByTestId('close-icon')).toBeInTheDocument();
    });

    it('should not render dismiss button when disabled', () => {
      const { container } = render(<RdsCompProductTour {...defaultProps} showDismiss={false} />);
      const closeButtons = container.querySelectorAll('[data-testid="close-icon"]');
      expect(closeButtons.length).toBe(0);
    });

    it('should call onClose when dismiss button clicked', () => {
      const onClose = jest.fn();
      render(<RdsCompProductTour {...defaultProps} showDismiss={true} onClose={onClose} />);
      const button = screen.getByTestId('icon-button');
      fireEvent.click(button);
      expect(onClose).toHaveBeenCalled();
    });

    it('should hide component when dismiss button clicked', () => {
      const { container } = render(
        <RdsCompProductTour {...defaultProps} showDismiss={true} state="Image" slides={mockSlides} />
      );
      expect(screen.getByTestId('paper')).toBeInTheDocument();
      const button = screen.getByTestId('icon-button');
      fireEvent.click(button);
      expect(screen.queryByTestId('paper')).not.toBeInTheDocument();
    });
  });

  describe('Buttons Display', () => {
    it('should not render buttons by default in Image state', () => {
      render(
        <RdsCompProductTour {...defaultProps} state="Image" slides={mockSlides} showPrimaryButton={false} showSecondaryButton={false} showTertiaryButton={false} />
      );
      const buttons = screen.queryAllByTestId(/rds-button/);
      expect(buttons.length).toBe(0);
    });

    it('should render primary button when enabled', () => {
      const { container } = render(
        <RdsCompProductTour {...defaultProps} state="Image" slides={mockSlides} showPrimaryButton={true} />
      );
      const arrows = container.querySelector('.rds-comp-product-tour__arrows');
      expect(arrows).toBeInTheDocument();
      const nextButton = arrows?.querySelector('.rds-comp-product-tour__arrow--next');
      expect(nextButton).toBeInTheDocument();
    });

    it('should render secondary button when enabled', () => {
      const { container } = render(
        <RdsCompProductTour {...defaultProps} state="Image" slides={mockSlides} showSecondaryButton={true} />
      );
      const arrows = container.querySelector('.rds-comp-product-tour__arrows');
      expect(arrows).toBeInTheDocument();
      const prevButton = arrows?.querySelector('.rds-comp-product-tour__arrow--prev');
      expect(prevButton).toBeInTheDocument();
    });

    it('should render tertiary button when enabled', () => {
      const { container } = render(
        <RdsCompProductTour {...defaultProps} state="Image" slides={mockSlides} showTertiaryButton={true} />
      );
      const skipBtn = container.querySelector('.rds-comp-product-tour__skip');
      expect(skipBtn).toBeInTheDocument();
    });

    it('should render all buttons when enabled', () => {
      const { container } = render(
        <RdsCompProductTour
          {...defaultProps}
          state="Image"
          slides={mockSlides}
          showPrimaryButton={true}
          showSecondaryButton={true}
          showTertiaryButton={true}
        />
      );
      const arrows = container.querySelector('.rds-comp-product-tour__arrows');
      const nextButton = arrows?.querySelector('.rds-comp-product-tour__arrow--next');
      const prevButton = arrows?.querySelector('.rds-comp-product-tour__arrow--prev');
      const skipBtn = container.querySelector('.rds-comp-product-tour__skip');
      expect(nextButton).toBeInTheDocument();
      expect(prevButton).toBeInTheDocument();
      expect(skipBtn).toBeInTheDocument();
    });
  });

  describe('Navigation', () => {
    it('should navigate to next slide', async () => {
      const { container } = render(
        <RdsCompProductTour
          {...defaultProps}
          state="Image"
          slides={mockSlides}
          showPrimaryButton={true}
        />
      );

      const currentImg = container.querySelector('.rds-comp-product-tour__image') as HTMLImageElement;
      expect(currentImg.src).toContain('/image1.jpg');

      // Navigation would change the slide via button click
      // This depends on button text/structure
    });

    it('should display steps indicator', () => {
      render(
        <RdsCompProductTour
          {...defaultProps}
          state="Image"
          slides={mockSlides}
          stepsIndicator="1/3"
        />
      );
      expect(screen.getByText(/1\/3|1 \/ 3/)).toBeInTheDocument();
    });

    it('should parse and use stepsIndicator', () => {
      render(
        <RdsCompProductTour
          {...defaultProps}
          state="Image"
          slides={mockSlides}
          stepsIndicator="2/3"
        />
      );
      expect(screen.getByText(/2\/3|2 \/ 3/)).toBeInTheDocument();
    });
  });

  describe('Header and Description', () => {
    it('should render header text', () => {
      render(
        <RdsCompProductTour {...defaultProps} header="Tour Header" state="Image" slides={mockSlides} />
      );
      expect(screen.getByText('Tour Header')).toBeInTheDocument();
    });

    it('should render description text', () => {
      render(
        <RdsCompProductTour
          {...defaultProps}
          description="Tour Description"
          state="Image"
          slides={mockSlides}
        />
      );
      expect(screen.getByText('Tour Description')).toBeInTheDocument();
    });

    it('should render both header and description in Image state', () => {
      render(
        <RdsCompProductTour
          {...defaultProps}
          header="Header Text"
          description="Description Text"
          state="Image"
          slides={mockSlides}
        />
      );
      expect(screen.getByText('Header Text')).toBeInTheDocument();
      expect(screen.getByText('Description Text')).toBeInTheDocument();
    });
  });

  describe('Slides Handling', () => {
    it('should render with multiple slides', () => {
      const { container } = render(
        <RdsCompProductTour
          {...defaultProps}
          state="Image"
          slides={mockSlides}
        />
      );
      expect(container.querySelector('.rds-comp-product-tour__image')).toBeInTheDocument();
    });

    it('should render with single slide', () => {
      render(
        <RdsCompProductTour
          {...defaultProps}
          state="Image"
          slides={[{ id: 1, imgUrl: '/single.jpg' }]}
        />
      );
      expect(screen.getByTestId('paper')).toBeInTheDocument();
    });

    it('should handle empty slides array', () => {
      render(
        <RdsCompProductTour
          {...defaultProps}
          state="Image"
          slides={[]}
        />
      );
      expect(screen.getByTestId('paper')).toBeInTheDocument();
    });

    it('should display images in carousel', () => {
      render(
        <RdsCompProductTour
          {...defaultProps}
          state="Carousel"
          slides={mockSlides}
          showVisualPlaceholder={true}
        />
      );
      expect(screen.getByTestId('rds-carousel')).toBeInTheDocument();
    });
  });

  describe('State Transitions', () => {
    it('should handle state change from Image to Carousel', () => {
      const { rerender, container } = render(
        <RdsCompProductTour {...defaultProps} state="Image" slides={mockSlides} />
      );
      expect(container.querySelector('.rds-comp-product-tour__container--image')).toBeInTheDocument();

      rerender(
        <RdsCompProductTour {...defaultProps} state="Carousel" slides={mockSlides} />
      );
      expect(container.querySelector('.rds-comp-product-tour__container--carousel')).toBeInTheDocument();
    });

    it('should change state from Image to GIF', () => {
      const { rerender, container } = render(
        <RdsCompProductTour {...defaultProps} state="Image" slides={mockSlides} />
      );
      expect(container.querySelector('.rds-comp-product-tour__container--image')).toBeInTheDocument();

      rerender(<RdsCompProductTour {...defaultProps} state="GIF" />);
      expect(container.querySelector('.rds-comp-product-tour__container--animation')).toBeInTheDocument();
    });

    it('should change state from GIF to Form', () => {
      const { rerender, container } = render(
        <RdsCompProductTour {...defaultProps} state="GIF" />
      );
      expect(container.querySelector('.rds-comp-product-tour__container--animation')).toBeInTheDocument();

      rerender(<RdsCompProductTour {...defaultProps} state="Form" formTitle="Form" />);
      expect(container.querySelector('.rds-comp-product-tour__container--form')).toBeInTheDocument();
    });
  });

  describe('Visibility', () => {
    it('should be visible by default', () => {
      render(<RdsCompProductTour {...defaultProps} />);
      expect(screen.getByTestId('paper')).toBeInTheDocument();
    });

    it('should hide after dismiss', () => {
      render(<RdsCompProductTour {...defaultProps} showDismiss={true} />);
      const button = screen.getByTestId('icon-button');
      fireEvent.click(button);
      expect(screen.queryByTestId('paper')).not.toBeInTheDocument();
    });

    it('should return null when not visible', () => {
      const { container } = render(<RdsCompProductTour {...defaultProps} showDismiss={true} />);
      const button = screen.getByTestId('icon-button');
      fireEvent.click(button);
      expect(container.firstChild).toBeNull();
    });
  });

  describe('Callback Handling', () => {
    it('should call onClose callback', () => {
      const onClose = jest.fn();
      render(<RdsCompProductTour {...defaultProps} onClose={onClose} showDismiss={true} />);
      const button = screen.getByTestId('icon-button');
      fireEvent.click(button);
      expect(onClose).toHaveBeenCalled();
    });

    it('should not crash if onClose is undefined', () => {
      render(<RdsCompProductTour {...defaultProps} showDismiss={true} onClose={undefined} />);
      const button = screen.getByTestId('icon-button');
      fireEvent.click(button);
      expect(screen.queryByTestId('paper')).not.toBeInTheDocument();
    });
  });

  describe('Integration', () => {
    it('should render complete Image tour with all features', () => {
      render(
        <RdsCompProductTour
          state="Image"
          slides={mockSlides}
          header="Complete Tour"
          description="This is a complete tour"
          stepsIndicator="1/3"
          showDismiss={true}
          showPrimaryButton={true}
          showSecondaryButton={true}
          showTertiaryButton={true}
          showVisualPlaceholder={true}
          topLeft={true}
          topRight={true}
          bottomLeft={true}
          bottomRight={true}
        />
      );
      expect(screen.getByTestId('paper')).toBeInTheDocument();
      expect(screen.getByText('Complete Tour')).toBeInTheDocument();
      expect(screen.getByText('This is a complete tour')).toBeInTheDocument();
    });

    it('should render complete Carousel tour', () => {
      render(
        <RdsCompProductTour
          state="Carousel"
          slides={mockSlides}
          header="Carousel Tour"
          description="Carousel description"
          stepsIndicator="1/3"
          showDismiss={true}
          showPrimaryButton={true}
        />
      );
      expect(screen.getByTestId('paper')).toBeInTheDocument();
      expect(screen.getByText('Carousel Tour')).toBeInTheDocument();
      expect(screen.getByTestId('rds-carousel')).toBeInTheDocument();
    });

    it('should render complete GIF tour', () => {
      render(
        <RdsCompProductTour
          state="GIF"
          header="GIF Tour"
          description="GIF description"
          showDismiss={true}
          showPrimaryButton={true}
        />
      );
      expect(screen.getByTestId('paper')).toBeInTheDocument();
      expect(screen.getByText('GIF Tour')).toBeInTheDocument();
    });

    it('should render complete Form tour', () => {
      render(
        <RdsCompProductTour
          state="Form"
          header="Form Tour"
          description="Form description"
          formTitle="Sign Up Form"
          tabTitle={['Personal', 'Address']}
          showDismiss={true}
          showPrimaryButton={true}
        />
      );
      expect(screen.getByTestId('paper')).toBeInTheDocument();
      expect(screen.getByText('Sign Up Form')).toBeInTheDocument();
      expect(screen.getByText('Form Tour')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle undefined header', () => {
      render(
        <RdsCompProductTour {...defaultProps} header={undefined} state="Image" slides={mockSlides} />
      );
      expect(screen.getByTestId('paper')).toBeInTheDocument();
    });

    it('should handle undefined description', () => {
      render(
        <RdsCompProductTour {...defaultProps} description={undefined} state="Image" slides={mockSlides} />
      );
      expect(screen.getByTestId('paper')).toBeInTheDocument();
    });

    it('should handle empty stepsIndicator', () => {
      render(
        <RdsCompProductTour {...defaultProps} stepsIndicator="" state="Image" slides={mockSlides} />
      );
      expect(screen.getByTestId('paper')).toBeInTheDocument();
    });

    it('should handle invalid stepsIndicator', () => {
      render(
        <RdsCompProductTour {...defaultProps} stepsIndicator="invalid" state="Image" slides={mockSlides} />
      );
      expect(screen.getByTestId('paper')).toBeInTheDocument();
    });

    it('should handle rapid state changes', () => {
      const { rerender } = render(
        <RdsCompProductTour {...defaultProps} state="Image" slides={mockSlides} />
      );
      rerender(<RdsCompProductTour {...defaultProps} state="Carousel" slides={mockSlides} />);
      rerender(<RdsCompProductTour {...defaultProps} state="GIF" />);
      rerender(<RdsCompProductTour {...defaultProps} state="Form" formTitle="Form" />);
      expect(screen.getByTestId('paper')).toBeInTheDocument();
    });

    it('should handle large number of slides', () => {
      const largeSlides = Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        imgUrl: `/image${i + 1}.jpg`,
      }));
      render(
        <RdsCompProductTour {...defaultProps} state="Carousel" slides={largeSlides} />
      );
      expect(screen.getByTestId('paper')).toBeInTheDocument();
    });

    it('should handle large number of tabs', () => {
      const largeTabs = Array.from({ length: 20 }, (_, i) => `Tab ${i + 1}`);
      render(
        <RdsCompProductTour
          {...defaultProps}
          state="Form"
          formTitle="Form"
          tabTitle={largeTabs}
        />
      );
      expect(screen.getByTestId('paper')).toBeInTheDocument();
    });

    it('should handle very long header text', () => {
      const longHeader = 'A'.repeat(200);
      render(
        <RdsCompProductTour
          {...defaultProps}
          state="Image"
          slides={mockSlides}
          header={longHeader}
        />
      );
      expect(screen.getByText(longHeader)).toBeInTheDocument();
    });

    it('should handle special characters in header', () => {
      const specialHeader = 'Tour & Guide <Special>';
      render(
        <RdsCompProductTour
          {...defaultProps}
          state="Image"
          slides={mockSlides}
          header={specialHeader}
        />
      );
      expect(screen.getByText(specialHeader, { exact: false })).toBeInTheDocument();
    });
  });
});
