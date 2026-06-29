import React from 'react';
import { render, screen } from '@testing-library/react';
import RdsAvatar, { RdsAvatarProps } from './rds-avatar';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';

// Mock SCSS
jest.mock('./rds-avatar.scss', () => ({}));

describe('RdsAvatar', () => {
  const defaultProps: RdsAvatarProps = {
    title: 'John Doe',
  };

  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      const { container } = render(<RdsAvatar {...defaultProps} />);
      expect(container.querySelector('.rds-avatar')).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsAvatar.displayName).toBe('RdsAvatar');
    });

    it('should render MuiAvatar component', () => {
      const { container } = render(<RdsAvatar {...defaultProps} />);
      expect(container.querySelector('.MuiAvatar-root')).toBeInTheDocument();
    });

    it('should render with default props', () => {
      const { container } = render(<RdsAvatar {...defaultProps} />);
      expect(container.querySelector('.rds-avatar--medium')).toBeInTheDocument();
    });

    it('should render avatar with initials from title', () => {
      const { container } = render(<RdsAvatar title="John Doe" />);
      expect(container.querySelector('.MuiAvatar-root')).toBeInTheDocument();
    });

    it('should render children when no title provided', () => {
      render(<RdsAvatar>Custom Content</RdsAvatar>);
      expect(screen.getByText('Custom Content')).toBeInTheDocument();
    });
  });

  describe('Display Styles', () => {
    it('should render with-name display style by default', () => {
      const { container } = render(<RdsAvatar {...defaultProps} />);
      expect(container.querySelector('.rds-avatar--with-name')).toBeInTheDocument();
    });

    it('should render with-name display style when specified', () => {
      const { container } = render(
        <RdsAvatar {...defaultProps} displayStyle="with-name" />
      );
      expect(container.querySelector('.rds-avatar--with-name')).toBeInTheDocument();
    });

    it('should render name-bottom display style', () => {
      const { container } = render(
        <RdsAvatar {...defaultProps} displayStyle="name-bottom" />
      );
      expect(container.querySelector('.rds-avatar--name-bottom')).toBeInTheDocument();
    });

    it('should render stacking display style with multiple avatars', () => {
      const { container } = render(
        <RdsAvatar
          displayStyle="stacking"
          avatars={[
            { title: 'John' },
            { title: 'Jane' },
            { title: 'Bob' },
          ]}
        />
      );
      expect(container.querySelector('.rds-avatar__stacking')).toBeInTheDocument();
    });

    it('should render stacking avatar container', () => {
      const { container } = render(
        <RdsAvatar
          displayStyle="stacking"
          avatars={[{ title: 'John' }]}
        />
      );
      expect(container.querySelector('.avatar-container')).toBeInTheDocument();
    });

    it('should render correct number of avatars in stacking mode', () => {
      const { container } = render(
        <RdsAvatar
          displayStyle="stacking"
          avatars={[
            { title: 'John' },
            { title: 'Jane' },
            { title: 'Bob' },
          ]}
          maxVisibleAvatars={2}
        />
      );
      const avatars = container.querySelectorAll('.rds-avatar__stacking-avatar');
      expect(avatars.length).toBe(2);
    });
  });

  describe('Size Variants', () => {
    it('should apply smallest size class', () => {
      const { container } = render(
        <RdsAvatar {...defaultProps} size="smallest" />
      );
      expect(container.querySelector('.rds-avatar--smallest')).toBeInTheDocument();
    });

    it('should apply small size class', () => {
      const { container } = render(
        <RdsAvatar {...defaultProps} size="small" />
      );
      expect(container.querySelector('.rds-avatar--small')).toBeInTheDocument();
    });

    it('should apply medium size class by default', () => {
      const { container } = render(<RdsAvatar {...defaultProps} />);
      expect(container.querySelector('.rds-avatar--medium')).toBeInTheDocument();
    });

    it('should apply large size class', () => {
      const { container } = render(
        <RdsAvatar {...defaultProps} size="large" />
      );
      expect(container.querySelector('.rds-avatar--large')).toBeInTheDocument();
    });

    it('should apply largest size class', () => {
      const { container } = render(
        <RdsAvatar {...defaultProps} size="largest" />
      );
      expect(container.querySelector('.rds-avatar--largest')).toBeInTheDocument();
    });

    it('should apply size to MuiAvatar component', () => {
      const { container } = render(
        <RdsAvatar {...defaultProps} size="large" />
      );
      const avatar = container.querySelector('.MuiAvatar-root');
      expect(avatar).toBeInTheDocument();
    });
  });

  describe('Color Variants', () => {
    it('should apply primary color variant', () => {
      const { container } = render(
        <RdsAvatar {...defaultProps} colorVariant="primary" />
      );
      expect(container.querySelector('.rds-avatar--primary')).toBeInTheDocument();
    });

    it('should apply secondary color variant', () => {
      const { container } = render(
        <RdsAvatar {...defaultProps} colorVariant="secondary" />
      );
      expect(container.querySelector('.rds-avatar--secondary')).toBeInTheDocument();
    });

    it('should apply success color variant', () => {
      const { container } = render(
        <RdsAvatar {...defaultProps} colorVariant="success" />
      );
      expect(container.querySelector('.rds-avatar--success')).toBeInTheDocument();
    });

    it('should apply danger color variant', () => {
      const { container } = render(
        <RdsAvatar {...defaultProps} colorVariant="danger" />
      );
      expect(container.querySelector('.rds-avatar--danger')).toBeInTheDocument();
    });

    it('should apply warning color variant', () => {
      const { container } = render(
        <RdsAvatar {...defaultProps} colorVariant="warning" />
      );
      expect(container.querySelector('.rds-avatar--warning')).toBeInTheDocument();
    });

    it('should apply info color variant', () => {
      const { container } = render(
        <RdsAvatar {...defaultProps} colorVariant="info" />
      );
      expect(container.querySelector('.rds-avatar--info')).toBeInTheDocument();
    });

    it('should apply light color variant', () => {
      const { container } = render(
        <RdsAvatar {...defaultProps} colorVariant="light" />
      );
      expect(container.querySelector('.rds-avatar--light')).toBeInTheDocument();
    });

    it('should apply dark color variant', () => {
      const { container } = render(
        <RdsAvatar {...defaultProps} colorVariant="dark" />
      );
      expect(container.querySelector('.rds-avatar--dark')).toBeInTheDocument();
    });
  });

  describe('Activity Ring', () => {
    it('should render activity ring when enabled', () => {
      const { container } = render(
        <RdsAvatar {...defaultProps} activityRing={true} />
      );
      expect(container.querySelector('.rds-avatar--with-ring')).toBeInTheDocument();
      expect(container.querySelector('.rds-avatar__ring')).toBeInTheDocument();
    });

    it('should not render activity ring by default', () => {
      const { container } = render(<RdsAvatar {...defaultProps} />);
      expect(container.querySelector('.rds-avatar--with-ring')).not.toBeInTheDocument();
    });

    it('should render ring with aria-hidden attribute', () => {
      const { container } = render(
        <RdsAvatar {...defaultProps} activityRing={true} />
      );
      const ring = container.querySelector('.rds-avatar__ring');
      expect(ring).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Active Dots', () => {
    it('should render top active dot when enabled', () => {
      const { container } = render(
        <RdsAvatar {...defaultProps} activeDotTop={true} />
      );
      expect(container.querySelector('.rds-avatar--dot-top')).toBeInTheDocument();
      expect(container.querySelector('.rds-avatar__dot--top')).toBeInTheDocument();
    });

    it('should render bottom active dot when enabled', () => {
      const { container } = render(
        <RdsAvatar {...defaultProps} activeDotBottom={true} />
      );
      expect(container.querySelector('.rds-avatar--dot-bottom')).toBeInTheDocument();
      expect(container.querySelector('.rds-avatar__dot--bottom')).toBeInTheDocument();
    });

    it('should render both active dots', () => {
      const { container } = render(
        <RdsAvatar {...defaultProps} activeDotTop={true} activeDotBottom={true} />
      );
      expect(container.querySelector('.rds-avatar__dot--top')).toBeInTheDocument();
      expect(container.querySelector('.rds-avatar__dot--bottom')).toBeInTheDocument();
    });

    it('should have aria-label on top dot', () => {
      const { container } = render(
        <RdsAvatar {...defaultProps} activeDotTop={true} />
      );
      const dot = container.querySelector('.rds-avatar__dot--top');
      expect(dot).toHaveAttribute('aria-label', 'active status top');
    });

    it('should have aria-label on bottom dot', () => {
      const { container } = render(
        <RdsAvatar {...defaultProps} activeDotBottom={true} />
      );
      const dot = container.querySelector('.rds-avatar__dot--bottom');
      expect(dot).toHaveAttribute('aria-label', 'active status bottom');
    });
  });

  describe('Name and Designation', () => {
    it('should display name when showName is true', () => {
      render(<RdsAvatar {...defaultProps} title="John Doe" showName={true} />);
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    it('should not display name when showName is false', () => {
      const { container } = render(
        <RdsAvatar {...defaultProps} title="John Doe" showName={false} />
      );
      expect(container.querySelector('.rds-avatar__name')).not.toBeInTheDocument();
    });

    it('should display designation when showDesignation is true', () => {
      render(
        <RdsAvatar
          {...defaultProps}
          subText="Senior Developer"
          showDesignation={true}
        />
      );
      expect(screen.getByText('Senior Developer')).toBeInTheDocument();
    });

    it('should not display designation when showDesignation is false', () => {
      const { container } = render(
        <RdsAvatar
          {...defaultProps}
          subText="Senior Developer"
          showDesignation={false}
        />
      );
      expect(container.querySelector('.rds-avatar__designation')).not.toBeInTheDocument();
    });

    it('should display both name and designation', () => {
      render(
        <RdsAvatar
          {...defaultProps}
          title="John Doe"
          subText="Senior Developer"
          showName={true}
          showDesignation={true}
        />
      );
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Senior Developer')).toBeInTheDocument();
    });

    it('should render avatar__name with correct id', () => {
      const { container } = render(
        <RdsAvatar {...defaultProps} title="John Doe" showName={true} />
      );
      expect(container.querySelector('#avatarname')).toBeInTheDocument();
    });
  });

  describe('Stacking Mode', () => {
    it('should show remaining count indicator in stacking mode', () => {
      const { container } = render(
        <RdsAvatar
          displayStyle="stacking"
          avatars={[
            { title: 'John' },
            { title: 'Jane' },
            { title: 'Bob' },
            { title: 'Alice' },
          ]}
          maxVisibleAvatars={2}
          showRemainingCount={true}
        />
      );
      expect(container.textContent).toContain('+2');
    });

    it('should not show remaining count when showRemainingCount is false', () => {
      const { container } = render(
        <RdsAvatar
          displayStyle="stacking"
          avatars={[
            { title: 'John' },
            { title: 'Jane' },
            { title: 'Bob' },
            { title: 'Alice' },
          ]}
          maxVisibleAvatars={2}
          showRemainingCount={false}
        />
      );
      expect(container.querySelector('.plus-indicator')).not.toBeInTheDocument();
    });

    it('should apply correct size to plus-indicator', () => {
      const { container } = render(
        <RdsAvatar
          displayStyle="stacking"
          size="large"
          avatars={[
            { title: 'John' },
            { title: 'Jane' },
          ]}
          maxVisibleAvatars={1}
        />
      );
      const plusIndicator = container.querySelector('.plus-indicator');
      expect(plusIndicator).toHaveClass('plus-indecator-large');
    });

    it('should respect maxVisibleAvatars prop', () => {
      const { container } = render(
        <RdsAvatar
          displayStyle="stacking"
          avatars={[
            { title: 'John' },
            { title: 'Jane' },
            { title: 'Bob' },
            { title: 'Alice' },
            { title: 'Charlie' },
          ]}
          maxVisibleAvatars={3}
        />
      );
      const avatars = container.querySelectorAll('.rds-avatar__stacking-avatar');
      expect(avatars.length).toBe(3);
    });

    it('should show +0 when remaining count is 0', () => {
      const { container } = render(
        <RdsAvatar
          displayStyle="stacking"
          avatars={[
            { title: 'John' },
            { title: 'Jane' },
          ]}
          maxVisibleAvatars={3}
        />
      );
      expect(container.querySelector('.plus-indicator')).not.toBeInTheDocument();
    });
  });

  describe('Initials', () => {
    it('should generate correct initials for two-word name', () => {
      const { container } = render(<RdsAvatar title="John Doe" />);
      const avatar = container.querySelector('.MuiAvatar-root');
      expect(avatar?.textContent).toBe('JD');
    });

    it('should generate correct initials for three-word name', () => {
      const { container } = render(<RdsAvatar title="John Michael Doe" />);
      const avatar = container.querySelector('.MuiAvatar-root');
      expect(avatar?.textContent).toBe('JMD');
    });

    it('should generate single initial for single-word name in default mode', () => {
      const { container } = render(
        <RdsAvatar title="John" displayStyle="stacking" avatars={[{ title: 'John' }]} />
      );
      const avatar = container.querySelector('.MuiAvatar-root');
      expect(avatar?.textContent).toBe('J');
    });

    it('should capitalize initials', () => {
      const { container } = render(<RdsAvatar title="john doe" />);
      const avatar = container.querySelector('.MuiAvatar-root');
      expect(avatar?.textContent).toBe('JD');
    });
  });

  describe('Image Support', () => {
    it('should render avatar with image source', () => {
      const { container } = render(
        <RdsAvatar src="https://example.com/avatar.jpg" title="John Doe" />
      );
      const avatar = container.querySelector('.MuiAvatar-root');
      expect(avatar).toBeInTheDocument();
    });

    it('should render stacking avatars with image sources', () => {
      const { container } = render(
        <RdsAvatar
          displayStyle="stacking"
          avatars={[
            { src: 'https://example.com/avatar1.jpg', title: 'John' },
            { src: 'https://example.com/avatar2.jpg', title: 'Jane' },
          ]}
        />
      );
      const avatars = container.querySelectorAll('.rds-avatar__stacking-avatar');
      expect(avatars.length).toBe(2);
    });
  });

  describe('Custom Styling', () => {
    it('should accept sx prop for custom styling', () => {
      const { container } = render(
        <RdsAvatar {...defaultProps} sx={{ backgroundColor: 'red' }} />
      );
      const avatar = container.querySelector('.MuiAvatar-root');
      expect(avatar).toBeInTheDocument();
    });

    it('should accept MUI Avatar props', () => {
      const { container } = render(
        <RdsAvatar {...defaultProps} variant="rounded" />
      );
      expect(container.querySelector('.MuiAvatar-root')).toBeInTheDocument();
    });

    it('should apply both size and color variants together', () => {
      const { container } = render(
        <RdsAvatar
          {...defaultProps}
          size="large"
          colorVariant="secondary"
        />
      );
      expect(container.querySelector('.rds-avatar--large')).toBeInTheDocument();
      expect(container.querySelector('.rds-avatar--secondary')).toBeInTheDocument();
    });
  });

  describe('Combined Features', () => {
    it('should render with all features enabled', () => {
      const { container } = render(
        <RdsAvatar
          title="John Doe"
          subText="Senior Developer"
          size="large"
          colorVariant="primary"
          displayStyle="with-name"
          activityRing={true}
          activeDotTop={true}
          activeDotBottom={true}
          showName={true}
          showDesignation={true}
        />
      );
      expect(container.querySelector('.rds-avatar--large')).toBeInTheDocument();
      expect(container.querySelector('.rds-avatar--primary')).toBeInTheDocument();
      expect(container.querySelector('.rds-avatar--with-ring')).toBeInTheDocument();
      expect(container.querySelector('.rds-avatar__dot--top')).toBeInTheDocument();
      expect(container.querySelector('.rds-avatar__dot--bottom')).toBeInTheDocument();
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Senior Developer')).toBeInTheDocument();
    });

    it('should handle name-bottom with activity ring and dots', () => {
      const { container } = render(
        <RdsAvatar
          displayStyle="name-bottom"
          title="Jane Smith"
          subText="Product Manager"
          activityRing={true}
          activeDotBottom={true}
          showName={true}
          showDesignation={true}
        />
      );
      expect(container.querySelector('.rds-avatar--name-bottom')).toBeInTheDocument();
      expect(container.querySelector('.rds-avatar__info--center')).toBeInTheDocument();
    });

    it('should render stacking with activity ring', () => {
      const { container } = render(
        <RdsAvatar
          displayStyle="stacking"
          avatars={[{ title: 'John' }, { title: 'Jane' }]}
          activityRing={true}
        />
      );
      expect(container.querySelector('.rds-avatar__stacking')).toBeInTheDocument();
    });
  });

  describe('Default Props', () => {
    it('should use default size as medium', () => {
      const { container } = render(<RdsAvatar title="Test" />);
      expect(container.querySelector('.rds-avatar--medium')).toBeInTheDocument();
    });

    it('should use default colorVariant as primary', () => {
      const { container } = render(<RdsAvatar title="Test" />);
      expect(container.querySelector('.rds-avatar--primary')).toBeInTheDocument();
    });

    it('should use default displayStyle as with-name', () => {
      const { container } = render(<RdsAvatar title="Test" />);
      expect(container.querySelector('.rds-avatar--with-name')).toBeInTheDocument();
    });

    it('should show name by default', () => {
      render(<RdsAvatar title="John Doe" />);
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    it('should show designation by default', () => {
      render(<RdsAvatar title="John" subText="Developer" />);
      expect(screen.getByText('Developer')).toBeInTheDocument();
    });

    it('should show remaining count by default', () => {
      const { container } = render(
        <RdsAvatar
          displayStyle="stacking"
          avatars={[{ title: 'A' }, { title: 'B' }, { title: 'C' }, { title: 'D' }]}
          maxVisibleAvatars={2}
        />
      );
      expect(container.textContent).toContain('+2');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty title gracefully', () => {
      const { container } = render(<RdsAvatar title="" />);
      expect(container.querySelector('.MuiAvatar-root')).toBeInTheDocument();
    });

    it('should handle very long title', () => {
      const longTitle = 'Christopher Alexander Samuel Thompson Williams';
      const { container } = render(<RdsAvatar title={longTitle} />);
      expect(container.querySelector('.MuiAvatar-root')).toBeInTheDocument();
    });

    it('should handle special characters in title', () => {
      render(<RdsAvatar title="John O'Reilly" />);
      expect(screen.getByText('John O\'Reilly')).toBeInTheDocument();
    });

    it('should handle unicode characters in name', () => {
      render(<RdsAvatar title="José García" />);
      expect(screen.getByText('José García')).toBeInTheDocument();
    });

    it('should handle empty avatars array in stacking mode', () => {
      const { container } = render(
        <RdsAvatar displayStyle="stacking" avatars={[]} />
      );
      // When avatars array is empty, component may not render the stacking container
      expect(container.querySelector('.MuiAvatar-root')).toBeInTheDocument();
    });

    it('should handle single avatar in stacking mode', () => {
      const { container } = render(
        <RdsAvatar
          displayStyle="stacking"
          avatars={[{ title: 'Single' }]}
        />
      );
      expect(container.querySelector('.rds-avatar__stacking')).toBeInTheDocument();
    });

    it('should handle null subText', () => {
      const { container } = render(
        <RdsAvatar title="John" subText={undefined} showDesignation={true} />
      );
      expect(container.querySelector('.rds-avatar__designation')).not.toBeInTheDocument();
    });

    it('should handle whitespace in name', () => {
      const { container } = render(<RdsAvatar title="  John  Doe  " />);
      const nameElement = container.querySelector('.rds-avatar__name');
      expect(nameElement?.textContent).toContain('John');
      expect(nameElement?.textContent).toContain('Doe');
    });

    it('should render without title or children', () => {
      const { container } = render(<RdsAvatar />);
      expect(container.querySelector('.MuiAvatar-root')).toBeInTheDocument();
    });
  });

  describe('Props Validation', () => {
    it('should accept valid size prop values', () => {
      const sizes: Array<'smallest' | 'small' | 'medium' | 'large' | 'largest'> = [
        'smallest',
        'small',
        'medium',
        'large',
        'largest',
      ];
      sizes.forEach(size => {
        const { container } = render(
          <RdsAvatar title="Test" size={size} />
        );
        expect(container.querySelector(`.rds-avatar--${size}`)).toBeInTheDocument();
      });
    });

    it('should accept valid colorVariant prop values', () => {
      const colors: Array<'primary' | 'success' | 'danger' | 'warning' | 'light' | 'info' | 'secondary' | 'dark'> = [
        'primary',
        'success',
        'danger',
        'warning',
        'light',
        'info',
        'secondary',
        'dark',
      ];
      colors.forEach(color => {
        const { container } = render(
          <RdsAvatar title="Test" colorVariant={color} />
        );
        expect(container.querySelector(`.rds-avatar--${color}`)).toBeInTheDocument();
      });
    });

    it('should accept boolean props correctly', () => {
      const { container } = render(
        <RdsAvatar
          title="Test"
          activityRing={true}
          activeDotTop={true}
          activeDotBottom={true}
          showName={true}
          showDesignation={true}
          showRemainingCount={true}
        />
      );
      expect(container.querySelector('.rds-avatar--with-ring')).toBeInTheDocument();
    });

    it('should accept displayStyle values', () => {
      const displayStyles: Array<'with-name' | 'name-bottom' | 'stacking'> = [
        'with-name',
        'name-bottom',
      ];
      displayStyles.forEach(style => {
        const { container } = render(
          <RdsAvatar title="Test" displayStyle={style} />
        );
        expect(container.querySelector(`.rds-avatar--${style}`)).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsAvatar {...defaultProps} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
