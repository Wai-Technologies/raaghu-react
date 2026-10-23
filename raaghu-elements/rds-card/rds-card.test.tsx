import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RdsCard, { RdsCardProps } from './rds-card';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';
import { warnDeprecatedProp } from '../shared/utils/deprecation';

jest.mock('./rds-card.scss', () => ({}));

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

jest.mock('@mui/icons-material/Person', () => () => <span data-testid="icon-person">PersonIcon</span>);
jest.mock('@mui/icons-material/Home', () => () => <span data-testid="icon-home">HomeIcon</span>);
jest.mock('@mui/icons-material/Settings', () => () => <span data-testid="icon-settings">SettingsIcon</span>);
jest.mock('@mui/icons-material/Favorite', () => () => <span data-testid="icon-favorite">FavoriteIcon</span>);
jest.mock('@mui/icons-material/Star', () => () => <span data-testid="icon-star">StarIcon</span>);
jest.mock('@mui/icons-material/Email', () => () => <span data-testid="icon-email">EmailIcon</span>);
jest.mock('@mui/icons-material/Phone', () => () => <span data-testid="icon-phone">PhoneIcon</span>);
jest.mock('@mui/icons-material/LocationOn', () => () => <span data-testid="icon-location">LocationIcon</span>);
jest.mock('@mui/icons-material/Camera', () => () => <span data-testid="icon-camera">CameraIcon</span>);
jest.mock('@mui/icons-material/Image', () => () => <span data-testid="icon-image">ImageIcon</span>);
jest.mock('@mui/icons-material/MusicNote', () => () => <span data-testid="icon-music">MusicIcon</span>);
jest.mock('@mui/icons-material/VideoLibrary', () => () => <span data-testid="icon-video">VideoIcon</span>);
jest.mock('@mui/icons-material/Description', () => () => <span data-testid="icon-document">DocumentIcon</span>);
jest.mock('@mui/icons-material/Folder', () => () => <span data-testid="icon-folder">FolderIcon</span>);
jest.mock('@mui/icons-material/CalendarToday', () => () => <span data-testid="icon-calendar">CalendarIcon</span>);
jest.mock('@mui/icons-material/AccessTime', () => () => <span data-testid="icon-clock">ClockIcon</span>);
jest.mock('@mui/icons-material/Search', () => () => <span data-testid="icon-search">SearchIcon</span>);
jest.mock('@mui/icons-material/Add', () => () => <span data-testid="icon-add">AddIcon</span>);
jest.mock('@mui/icons-material/Edit', () => () => <span data-testid="icon-edit">EditIcon</span>);
jest.mock('@mui/icons-material/Delete', () => () => <span data-testid="icon-delete">DeleteIcon</span>);
jest.mock('@mui/icons-material/Check', () => () => <span data-testid="icon-check">CheckIcon</span>);
jest.mock('@mui/icons-material/Close', () => () => <span data-testid="icon-close">CloseIcon</span>);
jest.mock('@mui/icons-material/ArrowForward', () => () => <span data-testid="icon-arrow-forward">ArrowForwardIcon</span>);
jest.mock('@mui/icons-material/ArrowBack', () => () => <span data-testid="icon-arrow-back">ArrowBackIcon</span>);
jest.mock('@mui/icons-material/Download', () => () => <span data-testid="icon-download">DownloadIcon</span>);
jest.mock('@mui/icons-material/Upload', () => () => <span data-testid="icon-upload">UploadIcon</span>);
jest.mock('@mui/icons-material/Share', () => () => <span data-testid="icon-share">ShareIcon</span>);
jest.mock('@mui/icons-material/Notifications', () => () => <span data-testid="icon-notification">NotificationIcon</span>);

jest.mock('../shared/utils/deprecation', () => ({ warnDeprecatedProp: jest.fn() }));

describe('RdsCard', () => {
  const defaultProps: RdsCardProps = {};
  const setup = (p: any = {}, children?: React.ReactNode) =>
    render(<RdsCard {...defaultProps} {...p}>{children}</RdsCard>);
  const root = () => screen.getByTestId('card-root');

  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      setup();
      expect(root()).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsCard.displayName).toBe('RdsCard');
    });

    it('should render with custom className', () => {
      setup({ className: 'custom-class' });
      expect(root()).toHaveClass('custom-class');
    });
  });

  describe('Card States, Styles and Layouts', () => {
    it.each([
      [{ selected: true }, 'rds-card--selected'],
      [{ disabled: true }, 'rds-card--disabled'],
      [{ variant: 'default' }, 'rds-card--style-default'],
      [{ variant: 'outlined' }, 'rds-card--style-outlined'],
      [{ variant: 'filled' }, 'rds-card--style-filled'],
      [{ layout: 'vertical' }, 'rds-card--layout-vertical'],
      [{ layout: 'horizontal' }, 'rds-card--layout-horizontal'],
      [{}, 'rds-card--style-default'],
      [{}, 'rds-card--layout-vertical'],
    ])('props %j -> class %s', (props, cls) => {
      setup(props);
      expect(root()).toHaveClass(cls);
    });
  });

  describe('Indicators', () => {
    it.each([[undefined, true], [true, true], [false, false]])('showIndicator=%p renders indicator: %p', (v, shown) => {
      const { container } = setup(v === undefined ? {} : { showIndicator: v });
      const indicator = expect(container.querySelector('.rds-card__indicator'));
      if (shown) indicator.toBeInTheDocument();
      else indicator.not.toBeInTheDocument();
    });

    it('should apply with-indicator class when showIndicator is true', () => {
      setup({ showIndicator: true });
      expect(root()).toHaveClass('rds-card--with-indicator');
    });

    it('should not apply with-indicator class when showIndicator is false', () => {
      setup({ showIndicator: false });
      expect(root()).not.toHaveClass('rds-card--with-indicator');
    });
  });

  describe('Icon Rendering', () => {
    it.each([undefined, true])('should show icon when showIcon is %p', (v) => {
      setup(v === undefined ? {} : { showIcon: v });
      expect(screen.getByTestId('icon-person')).toBeInTheDocument();
    });

    it('should not show icon when showIcon is false', () => {
      setup({ showIcon: false });
      expect(screen.queryByTestId('icon-person')).not.toBeInTheDocument();
    });

    it.each([
      ['person', 'icon-person'],
      ['home', 'icon-home'],
      ['settings', 'icon-settings'],
      ['favorite', 'icon-favorite'],
      ['star', 'icon-star'],
      ['email', 'icon-email'],
      ['phone', 'icon-phone'],
      ['location', 'icon-location'],
      ['camera', 'icon-camera'],
      ['image', 'icon-image'],
      ['music', 'icon-music'],
      ['video', 'icon-video'],
      ['document', 'icon-document'],
      ['folder', 'icon-folder'],
      ['add', 'icon-add'],
      ['edit', 'icon-edit'],
      ['delete', 'icon-delete'],
      ['search', 'icon-search'],
      ['arrow_forward', 'icon-arrow-forward'],
      ['arrow_back', 'icon-arrow-back'],
    ])('should render %s icon', (icon, testId) => {
      setup({ changeIcon: icon, showIcon: true });
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    });

    it('should apply icon class', () => {
      const { container } = setup({ changeIcon: 'home' });
      expect(container.querySelector('.rds-card__icon--home')).toBeInTheDocument();
    });

    it('should apply hide-icon class when showIcon is false', () => {
      setup({ showIcon: false });
      expect(root()).toHaveClass('rds-card--hide-icon');
    });
  });

  describe('Text Content', () => {
    it.each([
      ['title', 'Card Title', 'showTitle'],
      ['cardSubtext', 'Subtext content', 'showSubtext'],
      ['description', 'Description content', 'showDescription'],
    ])('%s is rendered or hidden by its toggle', (prop, text, toggle) => {
      const { unmount } = setup({ [prop]: text, [toggle]: true });
      expect(screen.getByText(text)).toBeInTheDocument();
      unmount();
      setup({ [prop]: text, [toggle]: false });
      expect(screen.queryByText(text)).not.toBeInTheDocument();
    });

    it('should render all text content together', () => {
      setup({
        title: 'Title',
        cardSubtext: 'Subtext',
        description: 'Description',
        showTitle: true,
        showSubtext: true,
        showDescription: true,
      });
      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Subtext')).toBeInTheDocument();
      expect(screen.getByText('Description')).toBeInTheDocument();
    });
  });

  describe('Children Support', () => {
    it('should render children', () => {
      setup({}, <div>Child content</div>);
      expect(screen.getByText('Child content')).toBeInTheDocument();
    });

    it('should render multiple children', () => {
      setup({}, <><div>Child 1</div><div>Child 2</div></>);
      expect(screen.getByText('Child 1')).toBeInTheDocument();
      expect(screen.getByText('Child 2')).toBeInTheDocument();
    });
  });

  describe('Padding and Styling', () => {
    it.each([
      [{ padding: '20px' }],
      [{ padding: 16 }],
      [{ padding: '1rem' }],
      [{ sx: { backgroundColor: 'red' } }],
      [{ padding: '16px', sx: { backgroundColor: 'blue' } }],
      [{ elevation: 8 }],
    ])('accepts %j', (props) => {
      setup(props);
      expect(root()).toBeInTheDocument();
    });
  });

  describe('MUI Card Props', () => {
    it('should accept data-testid prop', () => {
      setup({ 'data-testid': 'custom-card' });
      expect(screen.getByTestId('custom-card')).toBeInTheDocument();
    });

    it('should maintain other MUI Card props', () => {
      setup({ role: 'article' });
      expect(root()).toHaveAttribute('role', 'article');
    });
  });

  describe('Combined Props', () => {
    it('should render with all customization props', () => {
      setup(
        {
          title: 'Full Card',
          cardSubtext: 'This is a subtext',
          description: 'This is a description',
          selected: true,
          variant: 'outlined',
          layout: 'horizontal',
          changeIcon: 'star',
          showIndicator: true,
          showTitle: true,
          showSubtext: true,
          showDescription: true,
          showIcon: true,
          padding: '16px',
          className: 'custom',
        },
        <div>Extra content</div>
      );
      expect(root()).toHaveClass('rds-card--selected', 'rds-card--style-outlined', 'rds-card--layout-horizontal', 'custom');
      expect(screen.getByText('Full Card')).toBeInTheDocument();
      expect(screen.getByTestId('icon-star')).toBeInTheDocument();
    });

    it('should handle vertical layout with all features', () => {
      setup({ title: 'Vertical Card', cardSubtext: 'Subtext', layout: 'vertical', changeIcon: 'home', showIcon: true });
      expect(root()).toHaveClass('rds-card--layout-vertical');
      expect(screen.getByTestId('icon-home')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty title string', () => {
      setup({ title: '', showTitle: true });
      expect(root()).toBeInTheDocument();
    });

    it('should handle very long title', () => {
      const longTitle = 'This is a very long title that should wrap properly within the card component';
      setup({ title: longTitle, showTitle: true });
      expect(screen.getByText(longTitle)).toBeInTheDocument();
    });

    it('should handle special characters in text', () => {
      setup({ title: 'Card & Title @ Special <>', cardSubtext: 'Subtext with special chars', showTitle: true, showSubtext: true });
      expect(screen.getByText('Card & Title @ Special <>')).toBeInTheDocument();
    });

    it('should handle unicode characters', () => {
      setup({ title: 'Card Title 🎉', cardSubtext: 'Subtext with emoji ❤️', showTitle: true, showSubtext: true });
      expect(screen.getByText('Card Title 🎉')).toBeInTheDocument();
      expect(screen.getByText('Subtext with emoji ❤️')).toBeInTheDocument();
    });

    it('should handle rapid prop changes', () => {
      const { rerender } = render(<RdsCard />);
      rerender(<RdsCard selected />);
      rerender(<RdsCard disabled />);
      expect(root()).toHaveClass('rds-card--disabled');
    });

    it('should handle layout toggle', () => {
      const { rerender } = render(<RdsCard layout="vertical" />);
      expect(root()).toHaveClass('rds-card--layout-vertical');
      rerender(<RdsCard layout="horizontal" />);
      expect(root()).toHaveClass('rds-card--layout-horizontal');
    });

    it('should handle icon change', () => {
      const { rerender } = render(<RdsCard changeIcon="person" showIcon={true} />);
      expect(screen.getByTestId('icon-person')).toBeInTheDocument();
      rerender(<RdsCard changeIcon="home" showIcon={true} />);
      expect(screen.getByTestId('icon-home')).toBeInTheDocument();
    });
  });

  describe('Default Props', () => {
    it('should have showTitle as true by default', () => {
      render(<RdsCard title="Test" />);
      expect(screen.getByText('Test')).toBeInTheDocument();
    });
  });

  describe('Visibility Toggles', () => {
    it.each([
      ['showTitle', 'Title'],
      ['showSubtext', 'Subtext'],
      ['showDescription', 'Description'],
    ])('should hide only %s', (toggle, hidden) => {
      setup({
        title: 'Title',
        cardSubtext: 'Subtext',
        description: 'Description',
        showTitle: true,
        showSubtext: true,
        showDescription: true,
        [toggle]: false,
      });
      ['Title', 'Subtext', 'Description'].forEach((text) => {
        const query = expect(screen.queryByText(text));
        if (text === hidden) query.not.toBeInTheDocument();
        else query.toBeInTheDocument();
      });
    });

    it.each([
      [{ title: 'Title', showTitle: false }, 'rds-card--hide-title'],
      [{ cardSubtext: 'Subtext', showSubtext: false }, 'rds-card--hide-subtext'],
      [{ description: 'Description', showDescription: false }, 'rds-card--hide-description'],
    ])('should apply hide class for %j', (props, cls) => {
      setup(props);
      expect(root()).toHaveClass(cls);
    });
  });

  describe('Accessibility', () => {
    it('should render with semantic heading for title', () => {
      setup({ title: 'Card Title', showTitle: true });
      const heading = screen.getByRole('heading');
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('Card Title');
    });

    it('has no axe accessibility violations', async () => {
      const { container } = setup();
      expect(await axe(container)).toHaveNoViolations();
    });

    it('should render with proper role when provided', () => {
      setup({ role: 'article' });
      expect(root()).toHaveAttribute('role', 'article');
    });

    it('should have proper Avatar for icon', () => {
      setup({ showIcon: true });
      expect(screen.getByTestId('card-avatar')).toBeInTheDocument();
    });
  });
});

describe('RdsCard audit fixes', () => {
  beforeEach(() => {
    (warnDeprecatedProp as jest.Mock).mockClear();
  });

  describe('icon (G1-170)', () => {
    it('still shows the person icon when neither icon nor changeIcon is given, without warning', () => {
      const { container } = render(<RdsCard />);
      expect(screen.getByTestId('icon-person')).toBeInTheDocument();
      expect(container.querySelector('.rds-card__icon--person')).toBeInTheDocument();
      expect(screen.getByTestId('card-root')).toHaveClass('rds-card--icon-person');
      expect(warnDeprecatedProp).not.toHaveBeenCalled();
    });

    it('renders a custom icon node inside the avatar', () => {
      render(<RdsCard icon={<span data-testid="custom-icon" />} />);
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
      expect(screen.queryByTestId('icon-person')).not.toBeInTheDocument();
      expect(screen.getByTestId('card-avatar')).toHaveClass('rds-card__icon');
    });

    it('lets icon win over the deprecated changeIcon', () => {
      render(<RdsCard icon={<span data-testid="custom-icon" />} changeIcon="home" />);
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
      expect(screen.queryByTestId('icon-home')).not.toBeInTheDocument();
    });

    it('warns when changeIcon is used and keeps it working', () => {
      render(<RdsCard changeIcon="star" />);
      expect(screen.getByTestId('icon-star')).toBeInTheDocument();
      expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsCard', 'changeIcon', '`icon`');
    });

    it.each([null, false])('hides the icon when icon is %p', (value) => {
      render(<RdsCard icon={value} />);
      expect(screen.queryByTestId('card-avatar')).not.toBeInTheDocument();
      expect(screen.getByTestId('card-root')).toHaveClass('rds-card--hide-icon');
    });
  });

  describe('selected / disabled (G1-171)', () => {
    it('adds no aria state by default', () => {
      render(<RdsCard />);
      const card = screen.getByTestId('card-root');
      expect(card).not.toHaveAttribute('aria-disabled');
      expect(card).not.toHaveAttribute('aria-current');
      expect(card).not.toHaveAttribute('aria-selected');
    });

    it('disabled sets aria-disabled', () => {
      render(<RdsCard disabled />);
      const card = screen.getByTestId('card-root');
      expect(card).toHaveClass('rds-card--disabled');
      expect(card).toHaveAttribute('aria-disabled', 'true');
    });

    it('selected sets aria-current', () => {
      render(<RdsCard selected />);
      const card = screen.getByTestId('card-root');
      expect(card).toHaveClass('rds-card--selected');
      expect(card).toHaveAttribute('aria-current', 'true');
      expect(card).not.toHaveAttribute('aria-selected');
    });

    it('uses aria-selected when the role supports it', () => {
      render(<RdsCard role="option" selected />);
      const card = screen.getByTestId('card-root');
      expect(card).toHaveAttribute('aria-selected', 'true');
      expect(card).not.toHaveAttribute('aria-current');
    });

    it('disabled wins over selected', () => {
      render(<RdsCard selected disabled />);
      const card = screen.getByTestId('card-root');
      expect(card).toHaveClass('rds-card--disabled');
      expect(card).not.toHaveClass('rds-card--selected');
      expect(card).not.toHaveAttribute('aria-current');
    });

    it('sets aria attributes for disabled and selected props', () => {
      const { rerender } = render(<RdsCard disabled />);
      expect(screen.getByTestId('card-root')).toHaveAttribute('aria-disabled', 'true');
      rerender(<RdsCard selected />);
      expect(screen.getByTestId('card-root')).toHaveAttribute('aria-current', 'true');
    });

    it('keeps aria attributes the consumer passes', () => {
      render(<RdsCard disabled aria-disabled={false} selected={false} aria-current="page" />);
      const card = screen.getByTestId('card-root');
      expect(card).toHaveAttribute('aria-disabled', 'false');
      expect(card).toHaveAttribute('aria-current', 'page');
    });

    it('has no axe violations when selected or disabled', async () => {
      const { container, rerender } = render(<RdsCard title="Card" selected />);
      expect(await axe(container)).toHaveNoViolations();
      rerender(<RdsCard title="Card" disabled />);
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  describe('typed legacy props (G1-172)', () => {
    it('does not pass the show* booleans to the DOM', () => {
      render(<RdsCard showIndicator showTitle showSubtext showDescription showIcon />);
      const card = screen.getByTestId('card-root');
      ['showindicator', 'showtitle', 'showsubtext', 'showdescription', 'showicon'].forEach((attr) => {
        expect(card).not.toHaveAttribute(attr);
      });
    });

    it('lets the content object take precedence over the show* booleans', () => {
      render(<RdsCard title="Title" showTitle content={{ title: 'hidden' }} />);
      expect(screen.queryByText('Title')).not.toBeInTheDocument();
    });

    it('does not warn for supported props', () => {
      render(<RdsCard showIcon showTitle content={{ icon: 'visible' }} selected variant="outlined" />);
      expect(warnDeprecatedProp).not.toHaveBeenCalled();
    });

    it('warns when a variant string is passed to deprecated style', () => {
      render(<RdsCard style="outlined" />);
      expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsCard', 'style', '`variant`');
    });
  });

  describe('prop merging', () => {
    it('keeps its own classes when a consumer passes className', () => {
      render(<RdsCard className="mine" />);
      const card = screen.getByTestId('card-root');
      expect(card).toHaveClass('rds-card');
      expect(card).toHaveClass('rds-card--layout-vertical');
      expect(card).toHaveClass('mine');
    });
  });
});

describe('RdsCard additive renames', () => {
  beforeEach(() => {
    (warnDeprecatedProp as jest.Mock).mockClear();
  });

  it('renders subtitle and prefers it over cardSubtext', () => {
    render(<RdsCard subtitle="New" cardSubtext="Old" />);
    expect(screen.getByText('New')).toBeInTheDocument();
    expect(screen.queryByText('Old')).not.toBeInTheDocument();
    expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsCard', 'cardSubtext', '`subtitle`');
  });

  it('warns for padding', () => {
    render(<RdsCard title="T" padding={8} />);
    expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsCard', 'padding', '`sx`');
  });
});

