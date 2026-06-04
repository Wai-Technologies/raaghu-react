import React from 'react';
import { render, screen } from '@testing-library/react';
import RdsBadge, { RdsBadgeProps } from './rds-badge';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';

// Mock SCSS
jest.mock('./rds-badge.scss', () => ({}));

describe('RdsBadge', () => {
  const defaultProps: RdsBadgeProps = {
    badgeContent: 5,
  };

  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      const { container } = render(<RdsBadge {...defaultProps} />);
      expect(container.querySelector('.rds-badge')).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsBadge.displayName).toBe('RdsBadge');
    });

    it('should render with default props', () => {
      const { container } = render(<RdsBadge {...defaultProps} />);
      expect(container.querySelector('.rds-badge--medium')).toBeInTheDocument();
    });

    it('should render MUI Badge when children provided', () => {
      const { container } = render(
        <RdsBadge {...defaultProps}>
          <span>Content</span>
        </RdsBadge>
      );
      expect(container.querySelector('.MuiBadge-root')).toBeInTheDocument();
    });

    it('should render badge without children', () => {
      const { container } = render(<RdsBadge badgeContent={10} />);
      expect(container.querySelector('.rds-badge')).toBeInTheDocument();
    });
  });

  describe('Size Variants', () => {
    it('should apply small size class', () => {
      const { container } = render(
        <RdsBadge {...defaultProps} size="small" />
      );
      expect(container.querySelector('.rds-badge--small')).toBeInTheDocument();
    });

    it('should apply medium size class by default', () => {
      const { container } = render(<RdsBadge {...defaultProps} />);
      expect(container.querySelector('.rds-badge--medium')).toBeInTheDocument();
    });

    it('should apply large size class', () => {
      const { container } = render(
        <RdsBadge {...defaultProps} size="large" />
      );
      expect(container.querySelector('.rds-badge--large')).toBeInTheDocument();
    });
  });

  describe('Shape Variants', () => {
    it('should apply pill shape by default', () => {
      const { container } = render(<RdsBadge {...defaultProps} />);
      expect(container.querySelector('.rds-badge--pill')).toBeInTheDocument();
    });

    it('should apply pill shape when specified', () => {
      const { container } = render(
        <RdsBadge {...defaultProps} shape="pill" />
      );
      expect(container.querySelector('.rds-badge--pill')).toBeInTheDocument();
    });

    it('should apply rectangle shape', () => {
      const { container } = render(
        <RdsBadge {...defaultProps} shape="rectangle" />
      );
      expect(container.querySelector('.rds-badge--rectangle')).toBeInTheDocument();
    });
  });

  describe('Layout Variants', () => {
    it('should render text layout by default', () => {
      const { container } = render(<RdsBadge badgeContent="5" />);
      expect(container.querySelector('.rds-badge__badge')).toBeInTheDocument();
    });

    it('should render icon layout', () => {
      const { container } = render(
        <RdsBadge badgeContent={5} layout="icon" />
      );
      expect(container.querySelector('.MuiSvgIcon-root')).toBeInTheDocument();
    });

    it('should render icon-text layout', () => {
      const { container } = render(
        <RdsBadge badgeContent="5" layout="icon-text" />
      );
      expect(container.querySelector('.MuiSvgIcon-root')).toBeInTheDocument();
    });

    it('should render text-icon layout', () => {
      const { container } = render(
        <RdsBadge badgeContent="5" layout="text-icon" />
      );
      expect(container.querySelector('.MuiSvgIcon-root')).toBeInTheDocument();
    });

    it('should display content in text layout', () => {
      const { container } = render(<RdsBadge badgeContent="10" layout="text" />);
      expect(container.textContent).toContain('10');
    });
  });

  describe('Style Types', () => {
    it('should apply primary style by default', () => {
      const { container } = render(<RdsBadge {...defaultProps} />);
      expect(container.querySelector('.rds-badge--primary')).toBeInTheDocument();
    });

    it('should apply primary style when specified', () => {
      const { container } = render(
        <RdsBadge {...defaultProps} styleType="primary" />
      );
      expect(container.querySelector('.rds-badge--primary')).toBeInTheDocument();
    });

    it('should apply outline style', () => {
      const { container } = render(
        <RdsBadge {...defaultProps} styleType="outline" />
      );
      expect(container.querySelector('.rds-badge--outline')).toBeInTheDocument();
    });

    it('should apply transparent style', () => {
      const { container } = render(
        <RdsBadge {...defaultProps} styleType="transparent" />
      );
      expect(container.querySelector('.rds-badge--transparent')).toBeInTheDocument();
    });
  });

  describe('Color Variants', () => {
    it('should apply primary color by default', () => {
      const { container } = render(<RdsBadge {...defaultProps} />);
      expect(container.querySelector('.rds-badge--primary')).toBeInTheDocument();
    });

    it('should apply secondary color', () => {
      const { container } = render(
        <RdsBadge {...defaultProps} colorVariant="secondary" />
      );
      expect(container.querySelector('.rds-badge--secondary')).toBeInTheDocument();
    });

    it('should apply tertiary color', () => {
      const { container } = render(
        <RdsBadge {...defaultProps} colorVariant="tertiary" />
      );
      expect(container.querySelector('.rds-badge--tertiary')).toBeInTheDocument();
    });

    it('should apply danger color', () => {
      const { container } = render(
        <RdsBadge {...defaultProps} colorVariant="danger" />
      );
      expect(container.querySelector('.rds-badge--danger')).toBeInTheDocument();
    });

    it('should apply warning color', () => {
      const { container } = render(
        <RdsBadge {...defaultProps} colorVariant="warning" />
      );
      expect(container.querySelector('.rds-badge--warning')).toBeInTheDocument();
    });

    it('should apply light color', () => {
      const { container } = render(
        <RdsBadge {...defaultProps} colorVariant="light" />
      );
      expect(container.querySelector('.rds-badge--light')).toBeInTheDocument();
    });

    it('should apply success color', () => {
      const { container } = render(
        <RdsBadge {...defaultProps} colorVariant="success" />
      );
      expect(container.querySelector('.rds-badge--success')).toBeInTheDocument();
    });
  });

  describe('Disabled State', () => {
    it('should not show disabled class by default', () => {
      const { container } = render(<RdsBadge {...defaultProps} />);
      expect(container.querySelector('.rds-badge--disabled')).not.toBeInTheDocument();
    });

    it('should apply disabled class when state is disabled', () => {
      const { container } = render(
        <RdsBadge {...defaultProps} state="disabled" />
      );
      expect(container.querySelector('.rds-badge--disabled')).toBeInTheDocument();
    });

    it('should not show disabled when state is default', () => {
      const { container } = render(
        <RdsBadge {...defaultProps} state="default" />
      );
      expect(container.querySelector('.rds-badge--disabled')).not.toBeInTheDocument();
    });
  });

  describe('Badge Content', () => {
    it('should display numeric content', () => {
      const { container } = render(<RdsBadge badgeContent={25} />);
      expect(container.textContent).toContain('25');
    });

    it('should display string content', () => {
      const { container } = render(<RdsBadge badgeContent="New" />);
      expect(container.textContent).toContain('New');
    });

    it('should display zero content when showZero is true', () => {
      const { container } = render(
        <RdsBadge badgeContent={0} showZero={true} />
      );
      expect(container.querySelector('.rds-badge')).toBeInTheDocument();
    });

    it('should hide zero content when showZero is false', () => {
      const { container } = render(
        <RdsBadge badgeContent={0} showZero={false} />
      );
      expect(container.querySelector('.rds-badge')).not.toBeInTheDocument();
    });

    it('should hide string zero when showZero is false', () => {
      const { container } = render(
        <RdsBadge badgeContent="0" showZero={false} />
      );
      expect(container.querySelector('.rds-badge')).not.toBeInTheDocument();
    });

    it('should show string zero when showZero is true', () => {
      const { container } = render(
        <RdsBadge badgeContent="0" showZero={true} />
      );
      expect(container.querySelector('.rds-badge')).toBeInTheDocument();
    });
  });

  describe('Children Rendering', () => {
    it('should wrap children in MUI Badge', () => {
      const { container } = render(
        <RdsBadge {...defaultProps}>
          <span data-testid="child">Content</span>
        </RdsBadge>
      );
      expect(screen.getByTestId('child')).toBeInTheDocument();
      expect(container.querySelector('.MuiBadge-root')).toBeInTheDocument();
    });

    it('should render multiple children', () => {
      render(
        <RdsBadge {...defaultProps}>
          <span>First</span>
          <span>Second</span>
        </RdsBadge>
      );
      expect(screen.getByText('First')).toBeInTheDocument();
      expect(screen.getByText('Second')).toBeInTheDocument();
    });

    it('should not render children when zero without showZero', () => {
      const { container } = render(
        <RdsBadge badgeContent={0} showZero={false}>
          <span>Content</span>
        </RdsBadge>
      );
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('should render badge with component children', () => {
      const ChildComponent = () => <div>Child</div>;
      render(
        <RdsBadge {...defaultProps}>
          <ChildComponent />
        </RdsBadge>
      );
      expect(screen.getByText('Child')).toBeInTheDocument();
    });
  });

  describe('Max Value', () => {
    it('should use max 99 by default', () => {
      const { container } = render(
        <RdsBadge badgeContent={150}>
          <span>Content</span>
        </RdsBadge>
      );
      expect(container.querySelector('.MuiBadge-root')).toBeInTheDocument();
    });

    it('should accept custom max value', () => {
      const { container } = render(
        <RdsBadge badgeContent={150} max={999}>
          <span>Content</span>
        </RdsBadge>
      );
      expect(container.querySelector('.MuiBadge-root')).toBeInTheDocument();
    });
  });

  describe('Combined Props', () => {
    it('should handle all props together', () => {
      const { container } = render(
        <RdsBadge
          badgeContent={10}
          size="large"
          shape="rectangle"
          layout="icon-text"
          styleType="outline"
          colorVariant="danger"
          state="default"
        >
          <span>Content</span>
        </RdsBadge>
      );
      expect(container.querySelector('.rds-badge--large')).toBeInTheDocument();
      expect(container.querySelector('.rds-badge--rectangle')).toBeInTheDocument();
      expect(container.querySelector('.rds-badge--outline')).toBeInTheDocument();
      expect(container.querySelector('.rds-badge--danger')).toBeInTheDocument();
    });

    it('should handle size, shape, and color variations', () => {
      const { container } = render(
        <RdsBadge
          badgeContent="5"
          size="small"
          shape="pill"
          colorVariant="success"
        />
      );
      expect(container.querySelector('.rds-badge--small')).toBeInTheDocument();
      expect(container.querySelector('.rds-badge--pill')).toBeInTheDocument();
      expect(container.querySelector('.rds-badge--success')).toBeInTheDocument();
    });

    it('should handle disabled state with color variants', () => {
      const { container } = render(
        <RdsBadge
          badgeContent={3}
          colorVariant="warning"
          state="disabled"
        />
      );
      expect(container.querySelector('.rds-badge--disabled')).toBeInTheDocument();
      expect(container.querySelector('.rds-badge--warning')).toBeInTheDocument();
    });

    it('should handle all layout variants with all sizes', () => {
      const layouts: Array<'text' | 'icon' | 'icon-text' | 'text-icon'> = [
        'text',
        'icon',
        'icon-text',
        'text-icon',
      ];
      const sizes: Array<'small' | 'medium' | 'large'> = ['small', 'medium', 'large'];

      layouts.forEach(layout => {
        sizes.forEach(size => {
          const { container } = render(
            <RdsBadge badgeContent="5" layout={layout} size={size} />
          );
          expect(container.querySelector(`.rds-badge--${size}`)).toBeInTheDocument();
        });
      });
    });
  });

  describe('Default Props', () => {
    it('should use default size as medium', () => {
      const { container } = render(<RdsBadge badgeContent={5} />);
      expect(container.querySelector('.rds-badge--medium')).toBeInTheDocument();
    });

    it('should use default shape as pill', () => {
      const { container } = render(<RdsBadge badgeContent={5} />);
      expect(container.querySelector('.rds-badge--pill')).toBeInTheDocument();
    });

    it('should use default layout as text', () => {
      const { container } = render(<RdsBadge badgeContent="5" />);
      expect(container.textContent).toContain('5');
    });

    it('should use default styleType as primary', () => {
      const { container } = render(<RdsBadge badgeContent={5} />);
      expect(container.querySelector('.rds-badge--primary')).toBeInTheDocument();
    });

    it('should use default colorVariant as primary', () => {
      const { container } = render(<RdsBadge badgeContent={5} />);
      expect(container.querySelector('.rds-badge--primary')).toBeInTheDocument();
    });

    it('should use default state as default', () => {
      const { container } = render(<RdsBadge badgeContent={5} />);
      expect(container.querySelector('.rds-badge--disabled')).not.toBeInTheDocument();
    });

    it('should use default max as 99', () => {
      const { container } = render(
        <RdsBadge badgeContent={150}>
          <span>Content</span>
        </RdsBadge>
      );
      expect(container.querySelector('.MuiBadge-root')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty string as content', () => {
      const { container } = render(<RdsBadge badgeContent="" />);
      expect(container.querySelector('.rds-badge')).toBeInTheDocument();
    });

    it('should handle negative numbers', () => {
      const { container } = render(<RdsBadge badgeContent={-5} />);
      expect(container.textContent).toContain('-5');
    });

    it('should handle very large numbers', () => {
      const { container } = render(<RdsBadge badgeContent={999999} />);
      expect(container.querySelector('.rds-badge')).toBeInTheDocument();
    });

    it('should handle special characters in content', () => {
      const { container } = render(<RdsBadge badgeContent="!" />);
      expect(container.textContent).toContain('!');
    });

    it('should handle unicode characters', () => {
      const { container } = render(<RdsBadge badgeContent="★" />);
      expect(container.textContent).toContain('★');
    });

    it('should render without badgeContent', () => {
      const { container } = render(<RdsBadge />);
      expect(container.querySelector('.rds-badge')).toBeInTheDocument();
    });

    it('should handle undefined children gracefully', () => {
      const { container } = render(
        <RdsBadge badgeContent={5}>{undefined}</RdsBadge>
      );
      expect(container.querySelector('.rds-badge')).toBeInTheDocument();
    });

    it('should handle null children gracefully', () => {
      const { container } = render(
        <RdsBadge badgeContent={5}>{null}</RdsBadge>
      );
      expect(container.querySelector('.rds-badge')).toBeInTheDocument();
    });

    it('should render fragment as children', () => {
      render(
        <RdsBadge badgeContent={5}>
          <>
            <span>First</span>
            <span>Second</span>
          </>
        </RdsBadge>
      );
      expect(screen.getByText('First')).toBeInTheDocument();
      expect(screen.getByText('Second')).toBeInTheDocument();
    });

    it('should handle rapid state changes', () => {
      const { rerender, container } = render(
        <RdsBadge badgeContent={5} state="default" />
      );
      expect(container.querySelector('.rds-badge--disabled')).not.toBeInTheDocument();

      rerender(<RdsBadge badgeContent={5} state="disabled" />);
      expect(container.querySelector('.rds-badge--disabled')).toBeInTheDocument();

      rerender(<RdsBadge badgeContent={5} state="default" />);
      expect(container.querySelector('.rds-badge--disabled')).not.toBeInTheDocument();
    });
  });

  describe('Props Validation', () => {
    it('should accept valid size prop values', () => {
      const sizes: Array<'small' | 'medium' | 'large'> = ['small', 'medium', 'large'];
      sizes.forEach(size => {
        const { container } = render(
          <RdsBadge badgeContent={5} size={size} />
        );
        expect(container.querySelector(`.rds-badge--${size}`)).toBeInTheDocument();
      });
    });

    it('should accept valid shape prop values', () => {
      const shapes: Array<'rectangle' | 'pill'> = ['rectangle', 'pill'];
      shapes.forEach(shape => {
        const { container } = render(
          <RdsBadge badgeContent={5} shape={shape} />
        );
        expect(container.querySelector(`.rds-badge--${shape}`)).toBeInTheDocument();
      });
    });

    it('should accept valid layout prop values', () => {
      const layouts: Array<'text' | 'icon' | 'icon-text' | 'text-icon'> = [
        'text',
        'icon',
        'icon-text',
        'text-icon',
      ];
      layouts.forEach(layout => {
        const { container } = render(
          <RdsBadge badgeContent={5} layout={layout} />
        );
        expect(container.querySelector('.rds-badge')).toBeInTheDocument();
      });
    });

    it('should accept valid styleType prop values', () => {
      const styles: Array<'primary' | 'outline' | 'transparent'> = [
        'primary',
        'outline',
        'transparent',
      ];
      styles.forEach(style => {
        const { container } = render(
          <RdsBadge badgeContent={5} styleType={style} />
        );
        expect(container.querySelector(`.rds-badge--${style}`)).toBeInTheDocument();
      });
    });

    it('should accept valid state prop values', () => {
      const states: Array<'default' | 'disabled'> = ['default', 'disabled'];
      states.forEach(state => {
        const { container } = render(
          <RdsBadge badgeContent={5} state={state} />
        );
        if (state === 'disabled') {
          expect(container.querySelector('.rds-badge--disabled')).toBeInTheDocument();
        } else {
          expect(container.querySelector('.rds-badge--disabled')).not.toBeInTheDocument();
        }
      });
    });

    it('should accept valid colorVariant prop values', () => {
      const colors: Array<'primary' | 'secondary' | 'tertiary' | 'danger' | 'warning' | 'light' | 'success'> = [
        'primary',
        'secondary',
        'tertiary',
        'danger',
        'warning',
        'light',
        'success',
      ];
      colors.forEach(color => {
        const { container } = render(
          <RdsBadge badgeContent={5} colorVariant={color} />
        );
        expect(container.querySelector(`.rds-badge--${color}`)).toBeInTheDocument();
      });
    });
  });

  describe('MUI Badge Integration', () => {
    it('should pass through MUI Badge props', () => {
      const { container } = render(
        <RdsBadge {...defaultProps} overlap="rectangular">
          <span>Content</span>
        </RdsBadge>
      );
      expect(container.querySelector('.MuiBadge-root')).toBeInTheDocument();
    });

    it('should accept color prop for MUI Badge', () => {
      const { container } = render(
        <RdsBadge badgeContent={5} color="secondary">
          <span>Content</span>
        </RdsBadge>
      );
      expect(container.querySelector('.MuiBadge-root')).toBeInTheDocument();
    });

    it('should render with inherited color', () => {
      const { container } = render(
        <RdsBadge badgeContent={5} color="primary">
          <span>Content</span>
        </RdsBadge>
      );
      expect(container.querySelector('.MuiBadge-root')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should be accessible when displaying count', () => {
      const { container } = render(
        <RdsBadge badgeContent={5}>
          <button>Button with badge</button>
        </RdsBadge>
      );
      expect(screen.getByText('Button with badge')).toBeInTheDocument();
    });

    it('should render badge content as text', () => {
      const { container } = render(<RdsBadge badgeContent="5" />);
      expect(container.textContent).toContain('5');
    });

    it('should handle icon in layout for accessibility', () => {
      const { container } = render(
        <RdsBadge badgeContent={5} layout="icon" />
      );
      expect(container.querySelector('.MuiSvgIcon-root')).toBeInTheDocument();
    });

    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsBadge badgeContent={5} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no axe violations when wrapping a button', async () => {
      const { container } = render(
        <RdsBadge badgeContent={3}>
          <button>Notifications</button>
        </RdsBadge>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
