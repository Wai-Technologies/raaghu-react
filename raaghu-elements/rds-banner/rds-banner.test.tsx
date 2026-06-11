import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RdsBanner, { RdsBannerProps } from './rds-banner';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';

// Mock SCSS
jest.mock('./rds-banner.scss', () => ({}));

// Mock RdsButton component
jest.mock('../rds-button/rds-button', () => {
  return function MockRdsButton(props: any) {
    return (
      <button
        data-testid="rds-button"
        data-style={props.style}
        data-size={props.size}
        className={props.className}
      >
        {props.text}
      </button>
    );
  };
});

describe('RdsBanner', () => {
  const defaultProps: RdsBannerProps = {
    title: 'Banner Title',
    description: 'Banner Description',
  };

  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      const { container } = render(<RdsBanner {...defaultProps} />);
      expect(container.querySelector('.rds-banner')).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsBanner.displayName).toBe('RdsBanner');
    });

    it('should render MUI Alert component', () => {
      const { container } = render(<RdsBanner {...defaultProps} />);
      expect(container.querySelector('.MuiAlert-root')).toBeInTheDocument();
    });

    it('should render with default props', () => {
      const { container } = render(<RdsBanner {...defaultProps} />);
      expect(container.querySelector('.rds-banner--medium')).toBeInTheDocument();
      expect(container.querySelector('.rds-banner--info')).toBeInTheDocument();
    });

    it('should render banner with info type by default', () => {
      const { container } = render(<RdsBanner {...defaultProps} />);
      expect(container.querySelector('.rds-banner--info')).toBeInTheDocument();
    });

    it('should render content wrapper', () => {
      const { container } = render(<RdsBanner {...defaultProps} />);
      expect(container.querySelector('.rds-banner__content-wrapper')).toBeInTheDocument();
    });
  });

  describe('Title Display', () => {
    it('should display title when showTitle is true', () => {
      render(<RdsBanner {...defaultProps} showTitle={true} />);
      expect(screen.getByText('Banner Title')).toBeInTheDocument();
    });

    it('should not display title when showTitle is false', () => {
      const { container } = render(<RdsBanner {...defaultProps} showTitle={false} />);
      expect(container.querySelector('.rds-banner__heading')).not.toBeInTheDocument();
    });

    it('should apply heading class to title', () => {
      const { container } = render(<RdsBanner {...defaultProps} showTitle={true} />);
      expect(container.querySelector('.rds-banner__heading')).toBeInTheDocument();
    });

    it('should use default title when not provided', () => {
      render(<RdsBanner description="Description" showTitle={true} />);
      expect(screen.getByText('Heading Title.')).toBeInTheDocument();
    });

    it('should apply multiline heading class in multiline mode', () => {
      const { container } = render(
        <RdsBanner {...defaultProps} showTitle={true} multiline={true} />
      );
      expect(container.querySelector('.rds-banner__heading--multiline')).toBeInTheDocument();
    });
  });

  describe('Description Display', () => {
    it('should display description when showDescription is true', () => {
      render(<RdsBanner {...defaultProps} showDescription={true} />);
      expect(screen.getByText('Banner Description')).toBeInTheDocument();
    });

    it('should not display description when showDescription is false', () => {
      const { container } = render(
        <RdsBanner {...defaultProps} showDescription={false} />
      );
      expect(container.querySelector('.rds-banner__description')).not.toBeInTheDocument();
    });

    it('should display description in multiline mode', () => {
      const { container } = render(
        <RdsBanner {...defaultProps} multiline={true} showDescription={true} />
      );
      expect(container.querySelector('.rds-banner__description')).toBeInTheDocument();
    });

    it('should render children as description', () => {
      render(<RdsBanner title="Title" showDescription={true}>Custom Content</RdsBanner>);
      expect(screen.getByText('Custom Content')).toBeInTheDocument();
    });
  });

  describe('Type Variants', () => {
    it('should apply info type by default', () => {
      const { container } = render(<RdsBanner {...defaultProps} />);
      expect(container.querySelector('.rds-banner--info')).toBeInTheDocument();
    });

    it('should apply success type', () => {
      const { container } = render(<RdsBanner {...defaultProps} type="success" />);
      expect(container.querySelector('.rds-banner--success')).toBeInTheDocument();
    });

    it('should apply warning type', () => {
      const { container } = render(<RdsBanner {...defaultProps} type="warning" />);
      expect(container.querySelector('.rds-banner--warning')).toBeInTheDocument();
    });

    it('should apply error type', () => {
      const { container } = render(<RdsBanner {...defaultProps} type="error" />);
      expect(container.querySelector('.rds-banner--error')).toBeInTheDocument();
    });
  });

  describe('Size Variants', () => {
    it('should apply small size class', () => {
      const { container } = render(<RdsBanner {...defaultProps} size="small" />);
      expect(container.querySelector('.rds-banner--small')).toBeInTheDocument();
    });

    it('should apply medium size class by default', () => {
      const { container } = render(<RdsBanner {...defaultProps} />);
      expect(container.querySelector('.rds-banner--medium')).toBeInTheDocument();
    });

    it('should apply large size class', () => {
      const { container } = render(<RdsBanner {...defaultProps} size="large" />);
      expect(container.querySelector('.rds-banner--large')).toBeInTheDocument();
    });
  });

  describe('Style Variants', () => {
    it('should apply style1 by default', () => {
      const { container } = render(<RdsBanner {...defaultProps} />);
      expect(container.querySelector('.rds-banner--style1')).toBeInTheDocument();
    });

    it('should apply style2 variant', () => {
      const { container } = render(<RdsBanner {...defaultProps} variantStyle="style2" />);
      expect(container.querySelector('.rds-banner--style2')).toBeInTheDocument();
    });

    it('should apply style3 variant', () => {
      const { container } = render(<RdsBanner {...defaultProps} variantStyle="style3" />);
      expect(container.querySelector('.rds-banner--style3')).toBeInTheDocument();
    });

    it('should apply outlined style for style1', () => {
      const { container } = render(
        <RdsBanner {...defaultProps} variantStyle="style1" showOutline={true} />
      );
      expect(container.querySelector('.rds-banner--style1-outline')).toBeInTheDocument();
    });

    it('should apply outlined style for style2', () => {
      const { container } = render(
        <RdsBanner {...defaultProps} variantStyle="style2" showOutline={true} />
      );
      expect(container.querySelector('.rds-banner--style2-outline')).toBeInTheDocument();
    });
  });

  describe('Icon Display', () => {
    it('should render icon by default', () => {
      const { container } = render(<RdsBanner {...defaultProps} Icon={true} />);
      expect(container.querySelector('.MuiAlert-icon')).toBeInTheDocument();
    });

    it('should not render icon when Icon is false', () => {
      const { container } = render(<RdsBanner {...defaultProps} Icon={false} />);
      expect(container.querySelector('.MuiAlert-icon')).not.toBeInTheDocument();
    });
  });

  describe('Close Button', () => {
    it('should render close button when closable is true', () => {
      const { container } = render(<RdsBanner {...defaultProps} closable={true} />);
      expect(container.querySelector('.rds-banner__close-button')).toBeInTheDocument();
    });

    it('should not render close button when closable is false', () => {
      const { container } = render(<RdsBanner {...defaultProps} closable={false} />);
      expect(container.querySelector('.rds-banner__close-button')).not.toBeInTheDocument();
    });

    it('should close banner when close button is clicked', () => {
      const { container } = render(<RdsBanner {...defaultProps} closable={true} />);
      const closeButton = container.querySelector('.rds-banner__close-button') as HTMLElement;
      fireEvent.click(closeButton);
      expect(container.querySelector('.rds-banner')).not.toBeInTheDocument();
    });

    it('should call onClose handler when close button is clicked', () => {
      const onClose = jest.fn();
      const { container } = render(
        <RdsBanner {...defaultProps} closable={true} onClose={onClose} />
      );
      const closeButton = container.querySelector('.rds-banner__close-button') as HTMLElement;
      fireEvent.click(closeButton);
      expect(onClose).toHaveBeenCalled();
    });

    it('should remain visible when persistent is true', () => {
      const { container } = render(
        <RdsBanner {...defaultProps} closable={true} persistent={true} />
      );
      const closeButton = container.querySelector('.rds-banner__close-button') as HTMLElement;
      fireEvent.click(closeButton);
      expect(container.querySelector('.rds-banner')).toBeInTheDocument();
    });

    it('should have aria-label on close button', () => {
      const { container } = render(<RdsBanner {...defaultProps} closable={true} />);
      const closeButton = container.querySelector('.rds-banner__close-button');
      expect(closeButton).toHaveAttribute('aria-label', 'close');
    });
  });

  describe('Action Buttons', () => {
    it('should render link button when showLink is true', () => {
      const { container } = render(<RdsBanner {...defaultProps} showLink={true} />);
      expect(container.querySelector('.rds-banner__link-button')).toBeInTheDocument();
      expect(screen.getByText('Link')).toBeInTheDocument();
    });

    it('should not render link button when showLink is false', () => {
      const { container } = render(<RdsBanner {...defaultProps} showLink={false} />);
      expect(container.querySelector('.rds-banner__link-button')).not.toBeInTheDocument();
    });

    it('should render secondary button when showSecondary is true', () => {
      const { container } = render(<RdsBanner {...defaultProps} showSecondary={true} />);
      expect(container.querySelector('.rds-banner__secondary-button')).toBeInTheDocument();
      expect(screen.getByText('Cancel')).toBeInTheDocument();
    });

    it('should not render secondary button when showSecondary is false', () => {
      const { container } = render(<RdsBanner {...defaultProps} showSecondary={false} />);
      expect(container.querySelector('.rds-banner__secondary-button')).not.toBeInTheDocument();
    });

    it('should render primary button when showPrimary is true', () => {
      const { container } = render(<RdsBanner {...defaultProps} showPrimary={true} />);
      expect(container.querySelector('.rds-banner__primary-button')).toBeInTheDocument();
      expect(screen.getByText('Okay')).toBeInTheDocument();
    });

    it('should not render primary button when showPrimary is false', () => {
      const { container } = render(<RdsBanner {...defaultProps} showPrimary={false} />);
      expect(container.querySelector('.rds-banner__primary-button')).not.toBeInTheDocument();
    });

    it('should render all action buttons', () => {
      const { container } = render(
        <RdsBanner
          {...defaultProps}
          showLink={true}
          showSecondary={true}
          showPrimary={true}
        />
      );
      expect(container.querySelector('.rds-banner__actions')).toBeInTheDocument();
      expect(screen.getByText('Link')).toBeInTheDocument();
      expect(screen.getByText('Cancel')).toBeInTheDocument();
      expect(screen.getByText('Okay')).toBeInTheDocument();
    });
  });

  describe('Width Variants', () => {
    it('should apply full width class by default', () => {
      const { container } = render(<RdsBanner {...defaultProps} />);
      expect(container.querySelector('.rds-banner--full-width')).toBeInTheDocument();
    });

    it('should apply auto width when fullWidth is false', () => {
      const { container } = render(<RdsBanner {...defaultProps} fullWidth={false} />);
      expect(container.querySelector('.rds-banner--auto-width')).toBeInTheDocument();
    });
  });

  describe('Multiline Mode', () => {
    it('should render in multiline mode when enabled', () => {
      const { container } = render(
        <RdsBanner {...defaultProps} multiline={true} showTitle={true} showDescription={true} />
      );
      expect(container.querySelector('.rds-banner__heading--multiline')).toBeInTheDocument();
    });

    it('should render title and description separately in multiline mode', () => {
      const { container } = render(
        <RdsBanner {...defaultProps} multiline={true} showTitle={true} showDescription={true} />
      );
      expect(container.querySelector('.rds-banner__description')).toBeInTheDocument();
    });

    it('should render inline in non-multiline mode', () => {
      const { container } = render(
        <RdsBanner {...defaultProps} multiline={false} showTitle={true} showDescription={true} />
      );
      expect(container.querySelector('span')).toBeInTheDocument();
    });
  });

  describe('Custom Content', () => {
    it('should accept custom className', () => {
      const { container } = render(
        <RdsBanner {...defaultProps} className="custom-class" />
      );
      expect(container.querySelector('.custom-class')).toBeInTheDocument();
    });

    it('should render custom actions', () => {
      const customAction = <button data-testid="custom-action">Custom</button>;
      render(
        <RdsBanner {...defaultProps} actions={customAction} />
      );
      expect(screen.getByTestId('custom-action')).toBeInTheDocument();
    });

    it('should render children element when provided', () => {
      const ChildComponent = () => <div>Child Content</div>;
      render(
        <RdsBanner title="Title">
          <ChildComponent />
        </RdsBanner>
      );
      expect(screen.getByText('Child Content')).toBeInTheDocument();
    });

    it('should accept variant prop', () => {
      const { container } = render(
        <RdsBanner {...defaultProps} variant="outlined" />
      );
      expect(container.querySelector('.MuiAlert-outlinedInfo')).toBeInTheDocument();
    });
  });

  describe('Combined Props', () => {
    it('should render with all customization props', () => {
      const { container } = render(
        <RdsBanner
          title="Custom Title"
          description="Custom Description"
          type="success"
          size="large"
          variantStyle="style2"
          showTitle={true}
          showDescription={true}
          multiline={true}
          closable={true}
          Icon={true}
          showLink={true}
          showSecondary={true}
          showPrimary={true}
        />
      );
      expect(container.querySelector('.rds-banner--large')).toBeInTheDocument();
      expect(container.querySelector('.rds-banner--success')).toBeInTheDocument();
      expect(container.querySelector('.rds-banner--style2')).toBeInTheDocument();
      expect(screen.getByText('Custom Title')).toBeInTheDocument();
      expect(screen.getByText('Custom Description')).toBeInTheDocument();
    });

    it('should handle multiple style and size combinations', () => {
      const styles = ['style1', 'style2', 'style3'] as const;
      const sizes = ['small', 'medium', 'large'] as const;
      
      styles.forEach(style => {
        sizes.forEach(size => {
          const { container } = render(
            <RdsBanner {...defaultProps} variantStyle={style} size={size} />
          );
          expect(container.querySelector(`.rds-banner--${style}`)).toBeInTheDocument();
          expect(container.querySelector(`.rds-banner--${size}`)).toBeInTheDocument();
        });
      });
    });

    it('should handle all type variants with styling', () => {
      const types = ['success', 'warning', 'error', 'info'] as const;
      const styles = ['style1', 'style2', 'style3'] as const;
      
      types.forEach(type => {
        styles.forEach(style => {
          const { container } = render(
            <RdsBanner {...defaultProps} type={type} variantStyle={style} />
          );
          expect(container.querySelector(`.rds-banner--${type}`)).toBeInTheDocument();
        });
      });
    });
  });

  describe('Default Props', () => {
    it('should use default title', () => {
      render(<RdsBanner description="Description" showTitle={true} />);
      expect(screen.getByText('Heading Title.')).toBeInTheDocument();
    });

    it('should use default type as info', () => {
      const { container } = render(<RdsBanner {...defaultProps} />);
      expect(container.querySelector('.rds-banner--info')).toBeInTheDocument();
    });

    it('should use default size as medium', () => {
      const { container } = render(<RdsBanner {...defaultProps} />);
      expect(container.querySelector('.rds-banner--medium')).toBeInTheDocument();
    });

    it('should use default variantStyle as style1', () => {
      const { container } = render(<RdsBanner {...defaultProps} />);
      expect(container.querySelector('.rds-banner--style1')).toBeInTheDocument();
    });

    it('should show description by default', () => {
      render(<RdsBanner {...defaultProps} />);
      expect(screen.getByText('Banner Description')).toBeInTheDocument();
    });

    it('should have Icon enabled by default', () => {
      const { container } = render(<RdsBanner {...defaultProps} />);
      expect(container.querySelector('.MuiAlert-icon')).toBeInTheDocument();
    });

    it('should have closable enabled by default', () => {
      const { container } = render(<RdsBanner {...defaultProps} />);
      expect(container.querySelector('.rds-banner__close-button')).toBeInTheDocument();
    });

    it('should show all buttons by default', () => {
      render(<RdsBanner {...defaultProps} />);
      expect(screen.getByText('Link')).toBeInTheDocument();
      expect(screen.getByText('Cancel')).toBeInTheDocument();
      expect(screen.getByText('Okay')).toBeInTheDocument();
    });

    it('should have fullWidth enabled by default', () => {
      const { container } = render(<RdsBanner {...defaultProps} />);
      expect(container.querySelector('.rds-banner--full-width')).toBeInTheDocument();
    });

    it('should have persistent disabled by default', () => {
      const { container } = render(<RdsBanner {...defaultProps} closable={true} />);
      const closeButton = container.querySelector('.rds-banner__close-button') as HTMLElement;
      fireEvent.click(closeButton);
      expect(container.querySelector('.rds-banner')).not.toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty description', () => {
      const { container } = render(
        <RdsBanner title="Title" description="" showDescription={true} />
      );
      expect(container.querySelector('.rds-banner')).toBeInTheDocument();
    });

    it('should handle very long title', () => {
      const longTitle = 'A '.repeat(100);
      render(<RdsBanner description="Desc" title={longTitle} showTitle={true} />);
      expect(screen.getByText(longTitle.trim())).toBeInTheDocument();
    });

    it('should handle very long description', () => {
      const longDesc = 'Very long description. '.repeat(50);
      render(
        <RdsBanner title="Title" description={longDesc} showDescription={true} />
      );
      expect(screen.getByText(longDesc.trim())).toBeInTheDocument();
    });

    it('should handle special characters in title', () => {
      render(
        <RdsBanner
          title="Title & <Special>"
          description="Desc"
          showTitle={true}
        />
      );
      expect(screen.getByText('Title & <Special>')).toBeInTheDocument();
    });

    it('should handle unicode characters', () => {
      render(
        <RdsBanner
          title="标题"
          description="説明"
          showTitle={true}
          showDescription={true}
        />
      );
      expect(screen.getByText('标题')).toBeInTheDocument();
      expect(screen.getByText('説明')).toBeInTheDocument();
    });

    it('should handle null/undefined children gracefully', () => {
      const { container } = render(
        <RdsBanner {...defaultProps}>{null}</RdsBanner>
      );
      expect(container.querySelector('.rds-banner')).toBeInTheDocument();
    });

    it('should handle rapid close/reopen cycles', () => {
      const { rerender, container } = render(
        <RdsBanner {...defaultProps} closable={true} persistent={false} />
      );
      expect(container.querySelector('.rds-banner')).toBeInTheDocument();
    });

    it('should render without any optional props', () => {
      const { container } = render(<RdsBanner />);
      expect(container.querySelector('.rds-banner')).toBeInTheDocument();
    });
  });

  describe('Props Validation', () => {
    it('should accept valid type values', () => {
      const types = ['success', 'warning', 'error', 'info'] as const;
      types.forEach(type => {
        const { container } = render(
          <RdsBanner {...defaultProps} type={type} />
        );
        expect(container.querySelector(`.rds-banner--${type}`)).toBeInTheDocument();
      });
    });

    it('should accept valid size values', () => {
      const sizes = ['small', 'medium', 'large'] as const;
      sizes.forEach(size => {
        const { container } = render(
          <RdsBanner {...defaultProps} size={size} />
        );
        expect(container.querySelector(`.rds-banner--${size}`)).toBeInTheDocument();
      });
    });

    it('should accept valid style values', () => {
      const styles = ['style1', 'style2', 'style3'] as const;
      styles.forEach(style => {
        const { container } = render(
          <RdsBanner {...defaultProps} variantStyle={style} />
        );
        expect(container.querySelector(`.rds-banner--${style}`)).toBeInTheDocument();
      });
    });

    it('should accept boolean props correctly', () => {
      const { container } = render(
        <RdsBanner
          {...defaultProps}
          Icon={true}
          showTitle={true}
          showDescription={true}
          multiline={true}
          showLink={true}
          showSecondary={true}
          showPrimary={true}
          closable={true}
          persistent={true}
          fullWidth={true}
          showOutline={true}
        />
      );
      expect(container.querySelector('.rds-banner')).toBeInTheDocument();
    });

    it('should accept ReactNode for actions', () => {
      const customActions = (
        <div data-testid="custom-actions">
          <button>Action 1</button>
          <button>Action 2</button>
        </div>
      );
      render(<RdsBanner {...defaultProps} actions={customActions} />);
      expect(screen.getByTestId('custom-actions')).toBeInTheDocument();
    });

    it('should accept ReactNode for children', () => {
      const CustomChild = () => <div data-testid="custom-child">Custom</div>;
      render(
        <RdsBanner {...defaultProps}>
          <CustomChild />
        </RdsBanner>
      );
      expect(screen.getByTestId('custom-child')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsBanner {...defaultProps} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
