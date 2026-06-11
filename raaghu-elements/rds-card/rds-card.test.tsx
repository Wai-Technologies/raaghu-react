import React from 'react';
import { render, screen } from '@testing-library/react';
import RdsCard, { RdsCardProps } from './rds-card';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';

// Mock SCSS
jest.mock('./rds-card.scss', () => ({}));

// Mock MUI components
jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  Card: ({ children, className, sx, ...props }: any) => (
    <div className={className} data-testid="card-root" {...props}>{children}</div>
  ),
  Avatar: ({ children, className, ...props }: any) => (
    <div className={className} data-testid="card-avatar" {...props}>{children}</div>
  ),
  Typography: ({ children, variant, component, className, ...props }: any) => {
    const Component = component || 'div';
    return <Component className={className} data-variant={variant} {...props}>{children}</Component>;
  },
}));

// Mock MUI Icons
jest.mock('@mui/icons-material', () => ({
  Person: () => <span data-testid="icon-person">PersonIcon</span>,
  Home: () => <span data-testid="icon-home">HomeIcon</span>,
  Settings: () => <span data-testid="icon-settings">SettingsIcon</span>,
  Favorite: () => <span data-testid="icon-favorite">FavoriteIcon</span>,
  Star: () => <span data-testid="icon-star">StarIcon</span>,
  Email: () => <span data-testid="icon-email">EmailIcon</span>,
  Phone: () => <span data-testid="icon-phone">PhoneIcon</span>,
  LocationOn: () => <span data-testid="icon-location">LocationIcon</span>,
  Camera: () => <span data-testid="icon-camera">CameraIcon</span>,
  Image: () => <span data-testid="icon-image">ImageIcon</span>,
  MusicNote: () => <span data-testid="icon-music">MusicIcon</span>,
  VideoLibrary: () => <span data-testid="icon-video">VideoIcon</span>,
  Description: () => <span data-testid="icon-document">DocumentIcon</span>,
  Folder: () => <span data-testid="icon-folder">FolderIcon</span>,
  CalendarToday: () => <span data-testid="icon-calendar">CalendarIcon</span>,
  AccessTime: () => <span data-testid="icon-clock">ClockIcon</span>,
  Search: () => <span data-testid="icon-search">SearchIcon</span>,
  Add: () => <span data-testid="icon-add">AddIcon</span>,
  Edit: () => <span data-testid="icon-edit">EditIcon</span>,
  Delete: () => <span data-testid="icon-delete">DeleteIcon</span>,
  Check: () => <span data-testid="icon-check">CheckIcon</span>,
  Close: () => <span data-testid="icon-close">CloseIcon</span>,
  ArrowForward: () => <span data-testid="icon-arrow-forward">ArrowForwardIcon</span>,
  ArrowBack: () => <span data-testid="icon-arrow-back">ArrowBackIcon</span>,
  Download: () => <span data-testid="icon-download">DownloadIcon</span>,
  Upload: () => <span data-testid="icon-upload">UploadIcon</span>,
  Share: () => <span data-testid="icon-share">ShareIcon</span>,
  Notifications: () => <span data-testid="icon-notification">NotificationIcon</span>,
}));

describe('RdsCard', () => {
  const defaultProps: RdsCardProps = {};

  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      render(<RdsCard {...defaultProps} />);
      expect(screen.getByTestId('card-root')).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsCard.displayName).toBe('RdsCard');
    });

    it('should render MUI Card component', () => {
      render(<RdsCard {...defaultProps} />);
      expect(screen.getByTestId('card-root')).toBeInTheDocument();
    });

    it('should render with default props', () => {
      render(<RdsCard {...defaultProps} />);
      expect(screen.getByTestId('card-root')).toBeInTheDocument();
    });

    it('should render with custom className', () => {
      render(<RdsCard {...defaultProps} className="custom-class" />);
      const card = screen.getByTestId('card-root');
      expect(card).toHaveClass('custom-class');
    });
  });

  describe('Card States', () => {
    it('should render default state', () => {
      render(<RdsCard {...defaultProps} state="default" />);
      const card = screen.getByTestId('card-root');
      expect(card).toHaveClass('rds-card--default');
    });

    it('should render hover state', () => {
      render(<RdsCard {...defaultProps} state="hover" />);
      const card = screen.getByTestId('card-root');
      expect(card).toHaveClass('rds-card--hover');
    });

    it('should render selected state', () => {
      render(<RdsCard {...defaultProps} state="selected" />);
      const card = screen.getByTestId('card-root');
      expect(card).toHaveClass('rds-card--selected');
    });

    it('should render disabled state', () => {
      render(<RdsCard {...defaultProps} state="disabled" />);
      const card = screen.getByTestId('card-root');
      expect(card).toHaveClass('rds-card--disabled');
    });
  });

  describe('Card Styles', () => {
    it('should render default style', () => {
      render(<RdsCard {...defaultProps} style="default" />);
      const card = screen.getByTestId('card-root');
      expect(card).toHaveClass('rds-card--style-default');
    });

    it('should render outlined style', () => {
      render(<RdsCard {...defaultProps} style="outlined" />);
      const card = screen.getByTestId('card-root');
      expect(card).toHaveClass('rds-card--style-outlined');
    });

    it('should render filled style', () => {
      render(<RdsCard {...defaultProps} style="filled" />);
      const card = screen.getByTestId('card-root');
      expect(card).toHaveClass('rds-card--style-filled');
    });
  });

  describe('Card Layouts', () => {
    it('should render vertical layout', () => {
      render(<RdsCard {...defaultProps} layout="vertical" />);
      const card = screen.getByTestId('card-root');
      expect(card).toHaveClass('rds-card--layout-vertical');
    });

    it('should render horizontal layout', () => {
      render(<RdsCard {...defaultProps} layout="horizontal" />);
      const card = screen.getByTestId('card-root');
      expect(card).toHaveClass('rds-card--layout-horizontal');
    });
  });

  describe('Indicators', () => {
    it('should show indicator by default', () => {
      const { container } = render(<RdsCard {...defaultProps} />);
      expect(container.querySelector('.rds-card__indicator')).toBeInTheDocument();
    });

    it('should show indicator when showIndicator is true', () => {
      const { container } = render(
        <RdsCard {...defaultProps} showIndicator={true} />
      );
      expect(container.querySelector('.rds-card__indicator')).toBeInTheDocument();
    });

    it('should not show indicator when showIndicator is false', () => {
      const { container } = render(
        <RdsCard {...defaultProps} showIndicator={false} />
      );
      expect(container.querySelector('.rds-card__indicator')).not.toBeInTheDocument();
    });

    it('should apply with-indicator class when showIndicator is true', () => {
      render(<RdsCard {...defaultProps} showIndicator={true} />);
      const card = screen.getByTestId('card-root');
      expect(card).toHaveClass('rds-card--with-indicator');
    });

    it('should not apply with-indicator class when showIndicator is false', () => {
      render(<RdsCard {...defaultProps} showIndicator={false} />);
      const card = screen.getByTestId('card-root');
      expect(card).not.toHaveClass('rds-card--with-indicator');
    });
  });

  describe('Icon Rendering', () => {
    it('should show icon by default', () => {
      render(<RdsCard {...defaultProps} />);
      expect(screen.getByTestId('icon-person')).toBeInTheDocument();
    });

    it('should show icon when showIcon is true', () => {
      render(<RdsCard {...defaultProps} showIcon={true} />);
      expect(screen.getByTestId('icon-person')).toBeInTheDocument();
    });

    it('should not show icon when showIcon is false', () => {
      render(<RdsCard {...defaultProps} showIcon={false} />);
      expect(screen.queryByTestId('icon-person')).not.toBeInTheDocument();
    });

    it('should render person icon by default', () => {
      render(<RdsCard {...defaultProps} changeIcon="person" />);
      expect(screen.getByTestId('icon-person')).toBeInTheDocument();
    });

    it('should render home icon', () => {
      render(<RdsCard {...defaultProps} changeIcon="home" />);
      expect(screen.getByTestId('icon-home')).toBeInTheDocument();
    });

    it('should render settings icon', () => {
      render(<RdsCard {...defaultProps} changeIcon="settings" />);
      expect(screen.getByTestId('icon-settings')).toBeInTheDocument();
    });

    it('should render favorite icon', () => {
      render(<RdsCard {...defaultProps} changeIcon="favorite" />);
      expect(screen.getByTestId('icon-favorite')).toBeInTheDocument();
    });

    it('should render star icon', () => {
      render(<RdsCard {...defaultProps} changeIcon="star" />);
      expect(screen.getByTestId('icon-star')).toBeInTheDocument();
    });

    it('should render email icon', () => {
      render(<RdsCard {...defaultProps} changeIcon="email" />);
      expect(screen.getByTestId('icon-email')).toBeInTheDocument();
    });

    it('should render phone icon', () => {
      render(<RdsCard {...defaultProps} changeIcon="phone" />);
      expect(screen.getByTestId('icon-phone')).toBeInTheDocument();
    });

    it('should apply icon class', () => {
      const { container } = render(
        <RdsCard {...defaultProps} changeIcon="home" />
      );
      const icon = container.querySelector('.rds-card__icon--home');
      expect(icon).toBeInTheDocument();
    });

    it('should apply hide-icon class when showIcon is false', () => {
      render(<RdsCard {...defaultProps} showIcon={false} />);
      const card = screen.getByTestId('card-root');
      expect(card).toHaveClass('rds-card--hide-icon');
    });
  });

  describe('Text Content', () => {
    it('should render title when provided and showTitle is true', () => {
      render(
        <RdsCard 
          {...defaultProps} 
          title="Card Title"
          showTitle={true}
        />
      );
      expect(screen.getByText('Card Title')).toBeInTheDocument();
    });

    it('should not render title when showTitle is false', () => {
      render(
        <RdsCard 
          {...defaultProps} 
          title="Card Title"
          showTitle={false}
        />
      );
      expect(screen.queryByText('Card Title')).not.toBeInTheDocument();
    });

    it('should render subtext when provided and showSubtext is true', () => {
      render(
        <RdsCard 
          {...defaultProps} 
          cardSubtext="Subtext content"
          showSubtext={true}
        />
      );
      expect(screen.getByText('Subtext content')).toBeInTheDocument();
    });

    it('should not render subtext when showSubtext is false', () => {
      render(
        <RdsCard 
          {...defaultProps} 
          cardSubtext="Subtext content"
          showSubtext={false}
        />
      );
      expect(screen.queryByText('Subtext content')).not.toBeInTheDocument();
    });

    it('should render description when provided and showDescription is true', () => {
      render(
        <RdsCard 
          {...defaultProps} 
          description="Description content"
          showDescription={true}
        />
      );
      expect(screen.getByText('Description content')).toBeInTheDocument();
    });

    it('should not render description when showDescription is false', () => {
      render(
        <RdsCard 
          {...defaultProps} 
          description="Description content"
          showDescription={false}
        />
      );
      expect(screen.queryByText('Description content')).not.toBeInTheDocument();
    });

    it('should render all text content together', () => {
      render(
        <RdsCard 
          {...defaultProps} 
          title="Title"
          cardSubtext="Subtext"
          description="Description"
          showTitle={true}
          showSubtext={true}
          showDescription={true}
        />
      );
      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Subtext')).toBeInTheDocument();
      expect(screen.getByText('Description')).toBeInTheDocument();
    });
  });

  describe('Children Support', () => {
    it('should render children', () => {
      render(
        <RdsCard {...defaultProps}>
          <div>Child content</div>
        </RdsCard>
      );
      expect(screen.getByText('Child content')).toBeInTheDocument();
    });

    it('should render without children', () => {
      render(<RdsCard {...defaultProps} />);
      expect(screen.getByTestId('card-root')).toBeInTheDocument();
    });

    it('should render multiple children', () => {
      render(
        <RdsCard {...defaultProps}>
          <div>Child 1</div>
          <div>Child 2</div>
        </RdsCard>
      );
      expect(screen.getByText('Child 1')).toBeInTheDocument();
      expect(screen.getByText('Child 2')).toBeInTheDocument();
    });
  });

  describe('Padding and Styling', () => {
    it('should apply padding when provided', () => {
      const { container } = render(
        <RdsCard {...defaultProps} padding="20px" />
      );
      // Verify card renders with padding prop
      expect(screen.getByTestId('card-root')).toBeInTheDocument();
    });

    it('should accept numeric padding', () => {
      const { container } = render(
        <RdsCard {...defaultProps} padding={16} />
      );
      const card = screen.getByTestId('card-root');
      expect(card).toBeInTheDocument();
    });

    it('should accept string padding', () => {
      const { container } = render(
        <RdsCard {...defaultProps} padding="1rem" />
      );
      const card = screen.getByTestId('card-root');
      expect(card).toBeInTheDocument();
    });

    it('should accept sx prop', () => {
      render(
        <RdsCard {...defaultProps} sx={{ backgroundColor: 'red' }} />
      );
      expect(screen.getByTestId('card-root')).toBeInTheDocument();
    });

    it('should merge sx prop with inline padding styles', () => {
      render(
        <RdsCard 
          {...defaultProps} 
          padding="16px"
          sx={{ backgroundColor: 'blue' }}
        />
      );
      expect(screen.getByTestId('card-root')).toBeInTheDocument();
    });
  });

  describe('MUI Card Props', () => {
    it('should accept data-testid prop', () => {
      render(
        <RdsCard {...defaultProps} data-testid="custom-card" />
      );
      expect(screen.getByTestId('custom-card')).toBeInTheDocument();
    });

    it('should accept elevation prop', () => {
      render(
        <RdsCard {...defaultProps} elevation={8} />
      );
      expect(screen.getByTestId('card-root')).toBeInTheDocument();
    });

    it('should maintain other MUI Card props', () => {
      render(
        <RdsCard 
          {...defaultProps}
          role="article"
        />
      );
      const card = screen.getByTestId('card-root');
      expect(card).toHaveAttribute('role', 'article');
    });
  });

  describe('Combined Props', () => {
    it('should render with all customization props', () => {
      render(
        <RdsCard 
          title="Full Card"
          cardSubtext="This is a subtext"
          description="This is a description"
          state="selected"
          style="outlined"
          layout="horizontal"
          changeIcon="star"
          showIndicator={true}
          showTitle={true}
          showSubtext={true}
          showDescription={true}
          showIcon={true}
          padding="16px"
          className="custom"
        >
          <div>Extra content</div>
        </RdsCard>
      );
      
      const card = screen.getByTestId('card-root');
      expect(card).toHaveClass('rds-card--selected');
      expect(card).toHaveClass('rds-card--style-outlined');
      expect(card).toHaveClass('rds-card--layout-horizontal');
      expect(card).toHaveClass('custom');
      expect(screen.getByText('Full Card')).toBeInTheDocument();
      expect(screen.getByTestId('icon-star')).toBeInTheDocument();
    });

    it('should handle vertical layout with all features', () => {
      render(
        <RdsCard 
          title="Vertical Card"
          cardSubtext="Subtext"
          layout="vertical"
          changeIcon="home"
          showIcon={true}
        />
      );
      
      const card = screen.getByTestId('card-root');
      expect(card).toHaveClass('rds-card--layout-vertical');
      expect(screen.getByTestId('icon-home')).toBeInTheDocument();
    });
  });

  describe('Icon Variants', () => {
    it('should render all available icon types', () => {
      const iconTests = [
        { icon: 'location', testId: 'icon-location' },
        { icon: 'camera', testId: 'icon-camera' },
        { icon: 'image', testId: 'icon-image' },
        { icon: 'music', testId: 'icon-music' },
        { icon: 'video', testId: 'icon-video' },
        { icon: 'document', testId: 'icon-document' },
        { icon: 'folder', testId: 'icon-folder' },
      ];

      iconTests.forEach(({ icon, testId }) => {
        const { unmount } = render(
          <RdsCard 
            changeIcon={icon as any}
            showIcon={true}
          />
        );
        expect(screen.getByTestId(testId)).toBeInTheDocument();
        unmount();
      });
    });

    it('should render action icons', () => {
      const actionIcons = [
        { icon: 'add', testId: 'icon-add' },
        { icon: 'edit', testId: 'icon-edit' },
        { icon: 'delete', testId: 'icon-delete' },
        { icon: 'search', testId: 'icon-search' },
      ];

      actionIcons.forEach(({ icon, testId }) => {
        const { unmount } = render(
          <RdsCard 
            changeIcon={icon as any}
            showIcon={true}
          />
        );
        expect(screen.getByTestId(testId)).toBeInTheDocument();
        unmount();
      });
    });

    it('should render navigation icons', () => {
      const navIcons = [
        { icon: 'arrow_forward', testId: 'icon-arrow-forward' },
        { icon: 'arrow_back', testId: 'icon-arrow-back' },
      ];

      navIcons.forEach(({ icon, testId }) => {
        const { unmount } = render(
          <RdsCard 
            changeIcon={icon as any}
            showIcon={true}
          />
        );
        expect(screen.getByTestId(testId)).toBeInTheDocument();
        unmount();
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty title string', () => {
      render(
        <RdsCard
          title=""
          showTitle={true}
        />
      );
      expect(screen.getByTestId('card-root')).toBeInTheDocument();
    });

    it('should handle very long title', () => {
      const longTitle = 'This is a very long title that should wrap properly within the card component';
      render(
        <RdsCard
          title={longTitle}
          showTitle={true}
        />
      );
      expect(screen.getByText(longTitle)).toBeInTheDocument();
    });

    it('should handle special characters in text', () => {
      render(
        <RdsCard
          title="Card & Title @ Special <>"
          cardSubtext="Subtext with special chars"
          showTitle={true}
          showSubtext={true}
        />
      );
      expect(screen.getByText('Card & Title @ Special <>')).toBeInTheDocument();
    });

    it('should handle unicode characters', () => {
      render(
        <RdsCard
          title="Card Title 🎉"
          cardSubtext="Subtext with emoji ❤️"
          showTitle={true}
          showSubtext={true}
        />
      );
      expect(screen.getByText('Card Title 🎉')).toBeInTheDocument();
      expect(screen.getByText('Subtext with emoji ❤️')).toBeInTheDocument();
    });

    it('should handle rapid prop changes', () => {
      const { rerender } = render(
        <RdsCard state="default" />
      );
      
      rerender(<RdsCard state="hover" />);
      rerender(<RdsCard state="selected" />);
      rerender(<RdsCard state="disabled" />);
      
      const card = screen.getByTestId('card-root');
      expect(card).toHaveClass('rds-card--disabled');
    });

    it('should handle layout toggle', () => {
      const { rerender } = render(
        <RdsCard layout="vertical" />
      );
      
      expect(screen.getByTestId('card-root')).toHaveClass('rds-card--layout-vertical');
      
      rerender(<RdsCard layout="horizontal" />);
      expect(screen.getByTestId('card-root')).toHaveClass('rds-card--layout-horizontal');
    });

    it('should handle icon change', () => {
      const { rerender } = render(
        <RdsCard changeIcon="person" showIcon={true} />
      );
      
      expect(screen.getByTestId('icon-person')).toBeInTheDocument();
      
      rerender(<RdsCard changeIcon="home" showIcon={true} />);
      expect(screen.getByTestId('icon-home')).toBeInTheDocument();
    });
  });

  describe('Default Props', () => {
    it('should have state as default by default', () => {
      render(<RdsCard />);
      const card = screen.getByTestId('card-root');
      expect(card).toHaveClass('rds-card--default');
    });

    it('should have showIndicator as true by default', () => {
      const { container } = render(<RdsCard />);
      expect(container.querySelector('.rds-card__indicator')).toBeInTheDocument();
    });

    it('should have style as default by default', () => {
      render(<RdsCard />);
      const card = screen.getByTestId('card-root');
      expect(card).toHaveClass('rds-card--style-default');
    });

    it('should have layout as vertical by default', () => {
      render(<RdsCard />);
      const card = screen.getByTestId('card-root');
      expect(card).toHaveClass('rds-card--layout-vertical');
    });

    it('should have showIcon as true by default', () => {
      render(<RdsCard />);
      expect(screen.getByTestId('icon-person')).toBeInTheDocument();
    });

    it('should have showTitle as true by default', () => {
      render(<RdsCard title="Test" />);
      expect(screen.getByText('Test')).toBeInTheDocument();
    });

    it('should have changeIcon as person by default', () => {
      render(<RdsCard showIcon={true} />);
      expect(screen.getByTestId('icon-person')).toBeInTheDocument();
    });
  });

  describe('Visibility Toggles', () => {
    it('should hide only title', () => {
      render(
        <RdsCard 
          title="Title"
          cardSubtext="Subtext"
          description="Description"
          showTitle={false}
          showSubtext={true}
          showDescription={true}
        />
      );
      expect(screen.queryByText('Title')).not.toBeInTheDocument();
      expect(screen.getByText('Subtext')).toBeInTheDocument();
      expect(screen.getByText('Description')).toBeInTheDocument();
    });

    it('should hide only subtext', () => {
      render(
        <RdsCard 
          title="Title"
          cardSubtext="Subtext"
          description="Description"
          showTitle={true}
          showSubtext={false}
          showDescription={true}
        />
      );
      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.queryByText('Subtext')).not.toBeInTheDocument();
      expect(screen.getByText('Description')).toBeInTheDocument();
    });

    it('should hide only description', () => {
      render(
        <RdsCard 
          title="Title"
          cardSubtext="Subtext"
          description="Description"
          showTitle={true}
          showSubtext={true}
          showDescription={false}
        />
      );
      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Subtext')).toBeInTheDocument();
      expect(screen.queryByText('Description')).not.toBeInTheDocument();
    });

    it('should apply hide-title class', () => {
      render(
        <RdsCard 
          title="Title"
          showTitle={false}
        />
      );
      const card = screen.getByTestId('card-root');
      expect(card).toHaveClass('rds-card--hide-title');
    });

    it('should apply hide-subtext class', () => {
      render(
        <RdsCard 
          cardSubtext="Subtext"
          showSubtext={false}
        />
      );
      const card = screen.getByTestId('card-root');
      expect(card).toHaveClass('rds-card--hide-subtext');
    });

    it('should apply hide-description class', () => {
      render(
        <RdsCard 
          description="Description"
          showDescription={false}
        />
      );
      const card = screen.getByTestId('card-root');
      expect(card).toHaveClass('rds-card--hide-description');
    });
  });

  describe('Accessibility', () => {
    it('should render with semantic heading for title', () => {
      render(
        <RdsCard title="Card Title" showTitle={true} />
      );
      const heading = screen.getByRole('heading');
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('Card Title');
  
    });
    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsCard {...defaultProps} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should render with proper role when provided', () => {
      render(
        <RdsCard role="article" />
      );
      const card = screen.getByTestId('card-root');
      expect(card).toHaveAttribute('role', 'article');
    });

    it('should have proper Avatar for icon', () => {
      render(
        <RdsCard showIcon={true} />
      );
      expect(screen.getByTestId('card-avatar')).toBeInTheDocument();
    });
  });
});