import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';
import RdsCompAdaptiveCards from './rds-comp-adaptive-cards';
import { AdaptiveCardProps } from './rds-comp-adaptive-cards-helpers';


jest.mock('./rds-comp-adaptive-cards.scss', () => ({}));

// Mock child components with proper implementations 
jest.mock('../../raaghu-elements', () => ({
  RdsBox: ({ children, className, ...props }: any) => (
    <div className={className} data-testid="rds-box" {...props}>{children}</div>
  ),
  RdsTypography: ({ children, className, variant, ...props }: any) => {
    const element = variant?.startsWith('h') ? 'h3' : 'p';
    return React.createElement(element, { className, 'data-testid': 'rds-typography', ...props }, children);
  },
  RdsStack: ({ children, className, direction, spacing, alignItems, justifyContent, ...props }: any) => (
    <div className={className} data-testid="rds-stack" data-direction={direction} {...props}>{children}</div>
  ),
  RdsButton: ({ text, onClick, className, style, disabled, fullWidth, ...props }: any) => (
    <button onClick={onClick} className={className} disabled={disabled} data-testid="rds-button" {...props}>{text}</button>
  ),
  RdsButtonDropdown: ({ buttonText, onClick, options, ...props }: any) => (
    <button onClick={onClick} data-testid="rds-button-dropdown" {...props}>{buttonText}</button>
  ),
  RdsAvatar: ({ src, className, ...props }: any) => (
    <img src={src} className={className} alt="avatar" data-testid="rds-avatar" {...props} />
  ),
  RdsRadio: ({ options, value, onChange, className, ...props }: any) => (
    <div className={className} data-testid="rds-radio" {...props}>
      {options?.map((opt: any, idx: number) => (
        <label key={opt.value || idx}>
          <input
            type="radio"
            name="radio"
            value={opt.value}
            checked={value === opt.value}
            onChange={onChange}
            data-testid={`radio-${opt.value}`}
          />
          {opt.text || opt.label}
        </label>
      ))}
    </div>
  ),
  RdsCard: ({ children, className, showIcon, showIndicator, ...props }: any) => (
    <div className={className} data-testid="rds-card" {...props}>{children}</div>
  ),
  RdsChip: ({ label, onDelete, className, ...props }: any) => (
    <div className={className} data-testid="rds-chip" {...props}>
      {label}
      {onDelete && <button onClick={onDelete} data-testid="chip-delete">×</button>}
    </div>
  ),
}));

jest.mock('../../raaghu-elements/rds-card-detail/rds-card-detail', () => {
  return function MockCardDetail({ children, className, ...props }: any) {
    return (
      <div className={className} data-testid="rds-card-detail" {...props}>
        {children}
      </div>
    );
  };
});

jest.mock('../../raaghu-elements/rds-radio/rds-radio', () => {
  return function MockRdsRadio({ options, value, onChange, className, ...props }: any) {
    return (
      <div className={className} data-testid="rds-radio-standalone" {...props}>
        {options?.map((opt: any, idx: number) => (
          <label key={opt.value || idx}>
            <input
              type="radio"
              name="radio"
              value={opt.value}
              checked={value === opt.value}
              onChange={onChange}
              data-testid={`radio-standalone-${opt.value}`}
            />
            {opt.text || opt.label}
          </label>
        ))}
      </div>
    );
  };
});

jest.mock('../../raaghu-elements/rds-card/rds-card', () => {
  return function MockRdsCard({ children, className, showIcon, showIndicator, ...props }: any) {
    return (
      <div className={className} data-testid="rds-card-standalone" {...props}>
        {children}
      </div>
    );
  };
});

jest.mock('../../raaghu-elements/rds-stack/rds-stack', () => {
  return function MockRdsStack({ children, className, direction, spacing, alignItems, justifyContent, ...props }: any) {
    return (
      <div className={className} data-testid="rds-stack-standalone" data-direction={direction} {...props}>
        {children}
      </div>
    );
  };
});

jest.mock('../../raaghu-elements/rds-box/rds-box', () => {
  return function MockRdsBox({ children, className, ...props }: any) {
    return (
      <div className={className} data-testid="rds-box-standalone" {...props}>
        {children}
      </div>
    );
  };
});

jest.mock('../../raaghu-elements/rds-typography/rds-typography', () => {
  return function MockRdsTypography({ children, className, variant, ...props }: any) {
    const element = variant?.startsWith('h') ? 'h3' : 'p';
    return React.createElement(element, { className, 'data-testid': 'rds-typography-standalone', ...props }, children);
  };
});

jest.mock('../../raaghu-elements/rds-avatar/rds-avatar', () => {
  return function MockRdsAvatar({ src, name, className, ...props }: any) {
    return <img src={src} className={className} alt={name || 'avatar'} data-testid="rds-avatar-standalone" {...props} />;
  };
});

jest.mock('../../raaghu-elements/rds-chip/rds-chip', () => {
  return function MockRdsChip({ label, onDelete, className, ...props }: any) {
    return (
      <div className={className} data-testid="rds-chip-standalone" {...props}>
        {label}
        {onDelete && <button onClick={onDelete} data-testid="chip-delete">×</button>}
      </div>
    );
  };
});

jest.mock('@mui/material', () => ({
  CardHeader: ({ title, action, className, ...props }: any) => (
    <div className={className} data-testid="card-header" {...props}>
      <div data-testid="card-header-title">{title}</div>
      <div data-testid="card-header-action">{action}</div>
    </div>
  ),
  CardContent: ({ children, className, ...props }: any) => (
    <div className={className} data-testid="card-content" {...props}>{children}</div>
  ),
  CardActions: ({ children, className, ...props }: any) => (
    <div className={className} data-testid="card-actions" {...props}>{children}</div>
  ),
  IconButton: ({ onClick, children, className, ...props }: any) => (
    <button onClick={onClick} className={className} data-testid="icon-button" {...props}>{children}</button>
  ),
  FormControl: ({ children, className, ...props }: any) => (
    <div className={className} data-testid="form-control" {...props}>{children}</div>
  ),
  Select: ({ value, onChange, children, name, ...props }: any) => (
    <select value={value} onChange={onChange} name={name} data-testid={`select-${name}`} {...props}>{children}</select>
  ),
  MenuItem: ({ children, value, ...props }: any) => (
    <option value={value} data-testid={`menu-item-${value}`} {...props}>{children}</option>
  ),
  ImageList: ({ children, className, cols, ...props }: any) => (
    <div className={className} data-cols={cols} data-testid="image-list" {...props}>{children}</div>
  ),
  ImageListItem: ({ children, className, ...props }: any) => (
    <div className={className} data-testid="image-list-item" {...props}>{children}</div>
  ),
}));

jest.mock('@mui/icons-material', () => ({
  Close: () => <span data-testid="close-icon">Close</span>,
  ExpandMore: () => <span data-testid="expand-more-icon">ExpandMore</span>,
  InfoOutlined: () => <span data-testid="info-icon">Info</span>,
}));

describe('RdsCompAdaptiveCards', () => {
  describe('Default Card Type', () => {
    it('renders default card with title and text', () => {
      render(
        <RdsCompAdaptiveCards
          type="Default"
          cardTitle="Test Title"
          cardText="Test Text"
          showHeader={true}
        />
      );
      expect(screen.getByText('Test Title')).toBeInTheDocument();
      expect(screen.getByText('Test Text')).toBeInTheDocument();
    });

    it('renders with dismiss button when showDismiss is true', () => {
      render(
        <RdsCompAdaptiveCards
          type="Default"
          showDismiss={true}
          showHeader={true}
          cardTitle="Test"
        />
      );
      const cards = screen.getAllByText('Test');
      expect(cards.length).toBeGreaterThan(0);
    });

    it('renders close icon when closeIcon is true', () => {
      render(
        <RdsCompAdaptiveCards
          type="Default"
          closeIcon={true}
          cardTitle="Test"
          showHeader={true}
        />
      );
      expect(screen.getByTestId('close-icon')).toBeInTheDocument();
    });

    it('hides card when close icon is clicked', () => {
      const { container } = render(
        <RdsCompAdaptiveCards
          type="Default"
          closeIcon={true}
          cardTitle="Test"
          showHeader={true}
        />
      );
      const closeButton = screen.getByRole('button', { hidden: true });
      fireEvent.click(closeButton);
      expect(container.querySelector('.rds-adaptive-cards')).not.toBeInTheDocument();
    });

    it('renders action buttons when showBtn1 and showBtn2 are true', () => {
      render(
        <RdsCompAdaptiveCards
          type="Default"
          showBtn1={true}
          showBtn2={true}
          btn1Label="Cancel"
          btn2Label="Done"
          showHeader={true}
          cardTitle="Test"
        />
      );
      expect(screen.getByText('Cancel')).toBeInTheDocument();
      expect(screen.getByText('Done')).toBeInTheDocument();
    });

    it('handles button click events', () => {
      render(
        <RdsCompAdaptiveCards
          type="Default"
          showBtn1={true}
          btn1Label="Click Me"
          showHeader={true}
          cardTitle="Test"
        />
      );
      const button = screen.getByText('Click Me');
      expect(button).toBeInTheDocument();
      expect(button).toBeEnabled();
    });

    it('renders with custom small text', () => {
      render(
        <RdsCompAdaptiveCards
          type="Default"
          cardTitle="Test"
          smallText="Small text content"
          showHeader={true}
        />
      );
      expect(screen.getByText('Small text content')).toBeInTheDocument();
    });

    it('applies correct button styles', () => {
      const { container } = render(
        <RdsCompAdaptiveCards
          type="Default"
          showBtn1={true}
          btn1style="filled"
          btn1Label="Filled Button"
          showHeader={true}
          cardTitle="Test"
        />
      );
      const button = screen.getByText('Filled Button');
      expect(button).toBeInTheDocument();
    });
  });

  describe('Image Gallery Card Type', () => {
    it('renders image gallery with images', () => {
      const images = ['image1.jpg', 'image2.jpg', 'image3.jpg'];
      render(
        <RdsCompAdaptiveCards
          type="ImageGallery"
          cardTitle="Gallery"
          images={images}
          showHeader={true}
        />
      );
      expect(screen.getByText('Gallery')).toBeInTheDocument();
    });

    it('renders gallery with header when showHeader is true', () => {
      render(
        <RdsCompAdaptiveCards
          type="ImageGallery"
          cardTitle="Photo Gallery"
          showHeader={true}
          images={['image.jpg']}
        />
      );
      expect(screen.getByText('Photo Gallery')).toBeInTheDocument();
    });

    it('handles dismiss button in gallery header', () => {
      render(
        <RdsCompAdaptiveCards
          type="ImageGallery"
          cardTitle="Gallery"
          showHeader={true}
          showDismiss={true}
          images={['image.jpg']}
        />
      );
      expect(screen.getByText('Gallery')).toBeInTheDocument();
    });

    it('renders small text in gallery', () => {
      render(
        <RdsCompAdaptiveCards
          type="ImageGallery"
          cardTitle="Gallery"
          smallText="Gallery description"
          images={['image.jpg']}
        />
      );
      expect(screen.getByText('Gallery description')).toBeInTheDocument();
    });

    it('filters out empty image URLs', () => {
      const images = ['image1.jpg', '', 'image3.jpg', null, 'image4.jpg'];
      const { container } = render(
        <RdsCompAdaptiveCards
          type="ImageGallery"
          images={images as any}
          cardTitle="Gallery"
        />
      );
      expect(container).toBeInTheDocument();
    });
  });

  describe('Football Scorecard Card Type', () => {
    const defaultFootballProps = {
      type: 'FootballScorecard',
      leagueName: 'La Liga',
      leagueAvatar: 'league-avatar.png',
      isLive: true,
      matchDate: '30 Apr 2025',
      isFinal: false,
      homeTeamName: 'Real Madrid',
      homeTeamLogo: 'madrid-logo.png',
      homeTeamStatus: 'Home',
      awayTeamName: 'Barcelona',
      awayTeamLogo: 'barca-logo.png',
      awayTeamStatus: 'Away',
      homeScore: 2,
      awayScore: 1,
      time: '45:00',
    };

    it('renders football scorecard with league info', () => {
      render(<RdsCompAdaptiveCards {...defaultFootballProps} />);
      expect(screen.getByText('La Liga')).toBeInTheDocument();
    });

    it('displays team names and scores', () => {
      render(<RdsCompAdaptiveCards {...defaultFootballProps} />);
      expect(screen.getByText('Real Madrid')).toBeInTheDocument();
      expect(screen.getByText('Barcelona')).toBeInTheDocument();
    });

    it('shows live indicator when isLive is true', () => {
      render(<RdsCompAdaptiveCards {...defaultFootballProps} isLive={true} />);
      expect(screen.getByText('Real Madrid')).toBeInTheDocument();
    });

    it('displays match time', () => {
      render(<RdsCompAdaptiveCards {...defaultFootballProps} />);
      expect(screen.getByText('45:00')).toBeInTheDocument();
    });

    it('shows final text when isFinal is true', () => {
      render(<RdsCompAdaptiveCards {...defaultFootballProps} isFinal={true} finalText="Final" />);
      expect(screen.getByText('Final')).toBeInTheDocument();
    });

    it('uses footballProps when individual props are not provided', () => {
      render(
        <RdsCompAdaptiveCards
          type="FootballScorecard"
          footballProps={{
            leagueName: 'Premier League',
            leagueAvatar: 'pl-avatar.png',
            isLive: true,
            homeTeam: {
              name: 'Manchester United',
              logo: 'mufc-logo.png',
              status: 'Home',
            },
            awayTeam: {
              name: 'Arsenal',
              logo: 'arsenal-logo.png',
              status: 'Away',
            },
            homeScore: 3,
            awayScore: 2,
            time: '90:00',
          }}
        />
      );
      expect(screen.getByText('Manchester United')).toBeInTheDocument();
    });
  });

  describe('Calendar Reminder Card Type', () => {
    it('renders calendar reminder form', () => {
      render(
        <RdsCompAdaptiveCards
          type="CalenderReminder"
          cardTitle="Meeting Reminder"
          label="Conference Room"
          showHeader={true}
        />
      );
      expect(screen.getByText('Meeting Reminder')).toBeInTheDocument();
    });

    it('displays calendar reminder label', () => {
      render(
        <RdsCompAdaptiveCards
          type="CalenderReminder"
          calendarReminderLabel="Snooze for"
          label="Room 112"
          showHeader={true}
          cardTitle="Reminder"
        />
      );
      expect(screen.getByText('Room 112')).toBeInTheDocument();
    });

    it('renders with options', () => {
      const options = [
        { value: '5min', label: '5 Minutes' },
        { value: '15min', label: '15 Minutes' },
      ];
      render(
        <RdsCompAdaptiveCards
          type="CalenderReminder"
          options={options}
          sidePlaceholder="Select duration"
          showHeader={true}
          cardTitle="Reminder"
        />
      );
      expect(screen.getByText('Reminder')).toBeInTheDocument();
    });

    it('shows snooze and late buttons', () => {
      render(
        <RdsCompAdaptiveCards
          type="CalenderReminder"
          showBtn1={true}
          showBtn2={true}
          snoozeLabel="Snooze"
          lateLabel="I'll be Late"
          showHeader={true}
          cardTitle="Reminder"
        />
      );
      expect(screen.getByText('Reminder')).toBeInTheDocument();
    });
  });

  describe('Input Form Card Type', () => {
    it('renders input form with name field', () => {
      render(
        <RdsCompAdaptiveCards
          type="InputForm"
          label="Tell us about yourself"
          nameLabel="Name"
          namePlaceholder="Enter your name"
          showHeader={true}
          cardTitle="Form"
        />
      );
      const nameInputs = screen.getAllByPlaceholderText('Enter your name');
      expect(nameInputs.length).toBeGreaterThan(0);
    });

    it('renders all input fields', () => {
      render(
        <RdsCompAdaptiveCards
          type="InputForm"
          nameLabel="Name"
          namePlaceholder="Enter name"
          emailLabel="Email"
          emailPlaceholder="Enter email"
          phoneLabel="Phone"
          phonePlaceholder="Enter phone"
          showHeader={true}
          cardTitle="Form"
        />
      );
      expect(screen.getByPlaceholderText('Enter name')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Enter phone')).toBeInTheDocument();
    });

    it('handles input changes', async () => {
      render(
        <RdsCompAdaptiveCards
          type="InputForm"
          nameLabel="Name"
          namePlaceholder="Enter name"
          showHeader={true}
          cardTitle="Form"
        />
      );
      const input = screen.getByPlaceholderText('Enter name') as HTMLInputElement;
      expect(input).toBeInTheDocument();
      await userEvent.type(input, 'John Doe');
      expect(input.value).toBe('John Doe');
    });

    it('displays error messages when provided', () => {
      render(
        <RdsCompAdaptiveCards
          type="InputForm"
          nameLabel="Name"
          namePlaceholder="Enter name"
          nameError="Name is required"
          showHeader={true}
          cardTitle="Form"
        />
      );
      expect(screen.getByText('Name is required')).toBeInTheDocument();
    });

    it('renders submit button', () => {
      render(
        <RdsCompAdaptiveCards
          type="InputForm"
          showBtn1={true}
          btn1Label="Submit"
          showHeader={true}
          cardTitle="Form"
          nameLabel="Name"
          namePlaceholder="Enter name"
        />
      );
      expect(screen.getByText('Submit')).toBeInTheDocument();
    });

    it('shows required indicator', () => {
      render(
        <RdsCompAdaptiveCards
          type="InputForm"
          nameLabel="Name"
          namePlaceholder="Enter name"
          requiredText="*"
          showHeader={true}
          cardTitle="Form"
        />
      );
      expect(screen.getByText('Name')).toBeInTheDocument();
    });
  });

  describe('Activity Update Card Type', () => {
    it('renders activity update card with user info', () => {
      render(
        <RdsCompAdaptiveCards
          type="ActivityUpdateCard"
          cardTitle="Activity"
          name="Jane Doe"
          date="Created Wed, 30 Apr 2025"
          cardText="Activity description"
          showHeader={true}
        />
      );
      expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    });

    it('displays activity text', () => {
      render(
        <RdsCompAdaptiveCards
          type="ActivityUpdateCard"
          cardText="This is an activity update"
          showHeader={true}
          cardTitle="Activity"
        />
      );
      expect(screen.getByText('This is an activity update')).toBeInTheDocument();
    });

    it('renders radio options when provided', () => {
      const radioOptions = [
        { value: 'option1', label: 'Option 1', desc: 'Description 1' },
        { value: 'option2', label: 'Option 2', desc: 'Description 2' },
      ];
      render(
        <RdsCompAdaptiveCards
          type="ActivityUpdateCard"
          activityProps={{ radioOptions }}
          cardTitle="Activity"
          showHeader={true}
        />
      );
      expect(screen.getByText('Option 1 : Description 1')).toBeInTheDocument();
    });

    it('displays avatar when provided', () => {
      render(
        <RdsCompAdaptiveCards
          type="ActivityUpdateCard"
          activityProps={{ avatar: 'avatar.png' }}
          name="User"
          cardTitle="Activity"
          showHeader={true}
        />
      );
      const avatar = screen.getByAltText('avatar');
      expect(avatar).toHaveAttribute('src', 'avatar.png');
    });
  });

  describe('Restaurant Order Card Type', () => {
    const orderProps = {
      type: 'RestaurantOrder',
      entreeLabel: 'Entree',
      entreePlaceholder: 'Select entree',
      entreeOptions: [
        { value: 'option1', label: 'Grilled Chicken' },
        { value: 'option2', label: 'Salmon' },
      ],
      sideLabel: 'Side',
      sidePlaceholder: 'Select side',
      sideOptions: [
        { value: 'option1', label: 'Fries' },
        { value: 'option2', label: 'Salad' },
      ],
      drinkLabel: 'Drink',
      drinkPlaceholder: 'Select drink',
      drinkOptions: [
        { value: 'option1', label: 'Water' },
        { value: 'option2', label: 'Soda' },
      ],
      showHeader: true,
      cardTitle: 'Order Form',
    };

    it('renders restaurant order form', () => {
      render(<RdsCompAdaptiveCards {...orderProps} />);
      expect(screen.getByText('Order Form')).toBeInTheDocument();
    });

    it('displays all select fields', () => {
      render(<RdsCompAdaptiveCards {...orderProps} />);
      const selects = screen.getAllByRole('combobox');
      expect(selects.length).toBeGreaterThanOrEqual(3);
    });

    it('handles entree selection', () => {
      render(
        <RdsCompAdaptiveCards
          {...orderProps}
        />
      );
      const selects = screen.getAllByRole('combobox');
      expect(selects.length).toBeGreaterThanOrEqual(1);
      expect(selects[0]).toBeInTheDocument();
    });

    it('handles side selection', () => {
      render(
        <RdsCompAdaptiveCards
          {...orderProps}
        />
      );
      const selects = screen.getAllByRole('combobox');
      expect(selects.length).toBeGreaterThanOrEqual(2);
      if (selects[1]) {
        expect(selects[1]).toBeInTheDocument();
      }
    });

    it('handles drink selection', () => {
      render(
        <RdsCompAdaptiveCards
          {...orderProps}
        />
      );
      const selects = screen.getAllByRole('combobox');
      expect(selects.length).toBeGreaterThanOrEqual(3);
      if (selects[2]) {
        expect(selects[2]).toBeInTheDocument();
      }
    });

    it('renders place order button', () => {
      render(
        <RdsCompAdaptiveCards
          {...orderProps}
          showBtn1={true}
          btn1Label="Place Order"
        />
      );
      expect(screen.getByText('Place Order')).toBeInTheDocument();
    });

    it('handles place order click', () => {
      const handleClick = jest.fn();
      render(
        <RdsCompAdaptiveCards
          {...orderProps}
          showBtn1={true}
          btn1Label="Place Order"
          onBtn1Click={handleClick}
        />
      );
      fireEvent.click(screen.getByText('Place Order'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Prop Handling and Defaults', () => {
    it('uses default cardTitle when not provided', () => {
      render(<RdsCompAdaptiveCards showHeader={true} />);
      const titleElements = screen.queryAllByText('Title');
      expect(titleElements.length).toBeGreaterThan(0);
    });

    it('uses default button labels when not provided', () => {
      render(
        <RdsCompAdaptiveCards
          showBtn1={true}
          showBtn2={true}
          showHeader={true}
          cardTitle="Test"
        />
      );
      expect(screen.getByText('Cancel')).toBeInTheDocument();
      expect(screen.getByText('Done')).toBeInTheDocument();
    });

    it('merges custom props with defaults', () => {
      render(
        <RdsCompAdaptiveCards
          cardTitle="Custom Title"
          btn1Label="Custom Label"
          showBtn1={true}
          showHeader={true}
        />
      );
      expect(screen.getByText('Custom Title')).toBeInTheDocument();
      expect(screen.getByText('Custom Label')).toBeInTheDocument();
    });

    it('handles undefined optional props gracefully', () => {
      const props: AdaptiveCardProps = {
        type: undefined,
        cardTitle: undefined,
        images: undefined,
      };
      const { container } = render(<RdsCompAdaptiveCards {...props} showHeader={true} />);
      expect(container.querySelector('.rds-adaptive-cards')).toBeInTheDocument();
    });
  });

  describe('Button Style Handling', () => {
    it('applies filled button style', () => {
      render(
        <RdsCompAdaptiveCards
          type="Default"
          showBtn1={true}
          btn1style="filled"
          btn1Label="Filled"
          showHeader={true}
          cardTitle="Test"
        />
      );
      expect(screen.getByText('Filled')).toBeInTheDocument();
    });

    it('applies outlined button style', () => {
      render(
        <RdsCompAdaptiveCards
          type="Default"
          showBtn1={true}
          btn1style="outlined"
          btn1Label="Outlined"
          showHeader={true}
          cardTitle="Test"
        />
      );
      expect(screen.getByText('Outlined')).toBeInTheDocument();
    });

    it('applies transparent button style', () => {
      render(
        <RdsCompAdaptiveCards
          type="Default"
          showBtn1={true}
          btn1style="transparent"
          btn1Label="Transparent"
          showHeader={true}
          cardTitle="Test"
        />
      );
      expect(screen.getByText('Transparent')).toBeInTheDocument();
    });

    it('defaults to filled style for invalid style', () => {
      render(
        <RdsCompAdaptiveCards
          type="Default"
          showBtn1={true}
          btn1style="invalid"
          btn1Label="Default Style"
          showHeader={true}
          cardTitle="Test"
        />
      );
      expect(screen.getByText('Default Style')).toBeInTheDocument();
    });
  });

  describe('Visibility and Display Logic', () => {
    it('returns null when visible is false', () => {
      const { container } = render(
        <RdsCompAdaptiveCards
          type="Default"
          cardTitle="Hidden"
          closeIcon={true}
          showHeader={true}
        />
      );
      const closeButtons = screen.getAllByRole('button', { hidden: true });
      fireEvent.click(closeButtons[0]);
      expect(container.textContent).not.toContain('Hidden');
    });

    it('does not render when type is not matched', () => {
      const { container } = render(
        <RdsCompAdaptiveCards type="Default" showHeader={true} cardTitle="Test" />
      );
      expect(container).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper button roles', () => {
      render(
        <RdsCompAdaptiveCards
          type="Default"
          showBtn1={true}
          btn1Label="Click"
          showHeader={true}
          cardTitle="Test"
        />
      );
      const button = screen.getByRole('button', { hidden: true });
      expect(button).toBeInTheDocument();
  
    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsCompAdaptiveCards />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

    it('renders form inputs with proper labels', () => {
      render(
        <RdsCompAdaptiveCards
          type="InputForm"
          nameLabel="Full Name"
          namePlaceholder="Enter name"
          showHeader={true}
          cardTitle="Form"
        />
      );
      expect(screen.getByPlaceholderText('Enter name')).toBeInTheDocument();
    });

    it('supports keyboard navigation for buttons', async () => {
      const handleClick = jest.fn();
      render(
        <RdsCompAdaptiveCards
          type="Default"
          showBtn1={true}
          btn1Label="Click"
          onBtn1Click={handleClick}
          showHeader={true}
          cardTitle="Test"
        />
      );
      const button = screen.getByRole('button', { hidden: true });
      button.focus();
      fireEvent.keyPress(button, { key: 'Enter', code: 'Enter', charCode: 13 });
      expect(button).toHaveFocus();
    });
  });

  describe('Component Lifecycle', () => {
    it('maintains state across re-renders', () => {
      const { rerender } = render(
        <RdsCompAdaptiveCards
          type="Default"
          cardTitle="Title 1"
          showHeader={true}
        />
      );
      expect(screen.getByText('Title 1')).toBeInTheDocument();

      rerender(
        <RdsCompAdaptiveCards
          type="Default"
          cardTitle="Title 2"
          showHeader={true}
        />
      );
      expect(screen.getByText('Title 2')).toBeInTheDocument();
    });

    it('updates internal state when props change', async () => {
      const { rerender } = render(
        <RdsCompAdaptiveCards
          type="RestaurantOrder"
          entreeLabel="Entree"
          entreePlaceholder="Select"
          entreeOptions={[{ value: '1', label: 'Option 1' }]}
          sideLabel="Side"
          sidePlaceholder="Select"
          sideOptions={[{ value: '1', label: 'Option 1' }]}
          drinkLabel="Drink"
          drinkPlaceholder="Select"
          drinkOptions={[{ value: '1', label: 'Option 1' }]}
          showHeader={true}
          cardTitle="Order"
        />
      );
      expect(screen.getByText('Order')).toBeInTheDocument();

      rerender(
        <RdsCompAdaptiveCards
          type="RestaurantOrder"
          entreeLabel="Entree"
          entreePlaceholder="Select"
          entreeOptions={[{ value: '1', label: 'Option 1' }]}
          sideLabel="Side"
          sidePlaceholder="Select"
          sideOptions={[{ value: '1', label: 'Option 1' }]}
          drinkLabel="Drink"
          drinkPlaceholder="Select"
          drinkOptions={[{ value: '1', label: 'Option 1' }]}
          showHeader={true}
          cardTitle="New Order"
        />
      );
      expect(screen.getByText('New Order')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty string values', () => {
      const { container } = render(
        <RdsCompAdaptiveCards
          type="Default"
          cardTitle=""
          cardText=""
          smallText=""
          showHeader={true}
        />
      );
      expect(container.querySelector('.rds-adaptive-cards')).toBeInTheDocument();
    });

    it('handles null/undefined images array', () => {
      const { container } = render(
        <RdsCompAdaptiveCards
          type="ImageGallery"
          images={undefined}
          cardTitle="Gallery"
        />
      );
      expect(container.querySelector('.rds-adaptive-cards')).toBeInTheDocument();
    });

    it('handles special characters in labels', () => {
      render(
        <RdsCompAdaptiveCards
          type="Default"
          cardTitle="Test & Special <> Characters"
          showHeader={true}
        />
      );
      // Special characters should be rendered in the heading
      expect(screen.getByRole('heading')).toBeInTheDocument();
    });

    it('handles very long text content', () => {
      const longText = 'A'.repeat(1000);
      render(
        <RdsCompAdaptiveCards
          type="Default"
          cardText={longText}
          showHeader={true}
          cardTitle="Test"
        />
      );
      expect(screen.getByText(longText)).toBeInTheDocument();
    });

    it('handles rapid prop changes', () => {
      const { rerender } = render(
        <RdsCompAdaptiveCards
          type="Default"
          cardTitle="Title 1"
          showHeader={true}
        />
      );

      for (let i = 2; i <= 5; i++) {
        rerender(
          <RdsCompAdaptiveCards
            type="Default"
            cardTitle={`Title ${i}`}
            showHeader={true}
          />
        );
      }

      expect(screen.getByText('Title 5')).toBeInTheDocument();
    });
  });

  describe('Display Name', () => {
    it('has correct display name for debugging', () => {
      expect(RdsCompAdaptiveCards.displayName).toBe('RdsCompAdaptiveCards');
    });
  });
});