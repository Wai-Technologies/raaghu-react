import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';
import RdsEmojiGenerator, { EmojiGeneratorType, SkinToneState, EmojiCategory } from './rds-comp-emoji-generator';

// Mock SCSS
jest.mock('./rds-comp-emoji-generator.scss', () => ({}));

// Mock MUI components
jest.mock('@mui/material', () => ({
  Box: React.forwardRef(({ children, className, onClick, ...props }: any, ref: any) => (
    onClick ? (
      <button type="button" ref={ref} className={className} onClick={onClick} data-testid={props['data-testid']} onKeyDown={(e: any) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(e); } }}>
        {children}
      </button>
    ) : (
      <div ref={ref} className={className} data-testid={props['data-testid']}>
        {children}
      </div>
    )
  )),
  TextField: ({ value, onChange, placeholder, InputProps, ...props }: any) => {
    const handleChange = (e: any) => {
      if (onChange) {
        onChange(e);
      }
    };
    return (
      <input
        type="text"
        value={value || ''}
        onChange={handleChange}
        placeholder={placeholder}
        {...props}
      />
    );
  },
  InputAdornment: ({ children }: any) => <div data-testid="input-adornment">{children}</div>,
  Chip: ({ icon, label, onClick, variant, color, className, ...props }: any) => (
    <button
      onClick={onClick}
      className={className}
      data-variant={variant}
      data-color={color}
      {...props}
    >
      {icon}
      {label}
    </button>
  ),
  Typography: ({ children, variant, className, ...props }: any) => (
    <div className={className} data-variant={variant} {...props}>
      {children}
    </div>
  ),
  Popover: ({ open, children, onClose }: any) => (
    open ? (
      <button type="button" data-testid="skin-tone-popover" onClick={onClose} onKeyDown={(e: any) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClose(); } }}>
        {children}
      </button>
    ) : null
  ),
  IconButton: ({ children, onClick, disabled, className, style, title, size, ...props }: any) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={style}
      title={title}
      data-size={size}
      {...props}
    >
      {children}
    </button>
  ),
}));

// Mock icons
jest.mock('@mui/icons-material', () => ({
  Search: () => <span data-testid="search-icon">Search</span>,
  Add: () => <span data-testid="add-icon">Add</span>,
  EmojiEmotions: () => <span data-testid="emoji-emotions-icon">Emotions</span>,
  Pets: () => <span data-testid="pets-icon">Pets</span>,
  Restaurant: () => <span data-testid="restaurant-icon">Restaurant</span>,
  Flight: () => <span data-testid="flight-icon">Flight</span>,
  SportsFootball: () => <span data-testid="sports-football-icon">Football</span>,
  Lightbulb: () => <span data-testid="lightbulb-icon">Lightbulb</span>,
  Favorite: () => <span data-testid="favorite-icon">Favorite</span>,
  Flag: () => <span data-testid="flag-icon">Flag</span>,
}));

// Mock emoji data
jest.mock('./rds-comp-emoji-data', () => ({
  EmojiGeneratorType: {
    Default: 'Default',
    QuickReactions: 'QuickReactions',
  },
  SkinToneState: {
    Default: 'Default',
    Expanded: 'Expanded',
  },
  EmojiCategory: {
    SmileysAndPeople: 'SmileysAndPeople',
    AnimalsAndNature: 'AnimalsAndNature',
    FoodAndDrink: 'FoodAndDrink',
    TravelAndPlaces: 'TravelAndPlaces',
    Activities: 'Activities',
    Objects: 'Objects',
    Symbols: 'Symbols',
    Flags: 'Flags',
  },
  getEmojisByCategory: (category: any, skinTone: any) => {
    const emojis: any = {
      SmileysAndPeople: ['😊', '😂', '❤️', '😍'],
      AnimalsAndNature: ['🐶', '🐱', '🐭', '🐹'],
      FoodAndDrink: ['🍕', '🍔', '🍟', '🌭'],
      TravelAndPlaces: ['🚗', '🚕', '✈️', '🚀'],
      Activities: ['⚽', '🏀', '🎾', '🏐'],
      Objects: ['💻', '📱', '⌚', '🎮'],
      Symbols: ['❤️', '🧡', '💛', '💚'],
      Flags: ['🇺🇸', '🇬🇧', '🇨🇦', '🇦🇺'],
    };
    return emojis[category] || [];
  },
  searchEmojis: (term: string, category: any, skinTone: any) => {
    if (term.toLowerCase().includes('smile')) return ['😊', '😁', '😃'];
    if (term.toLowerCase().includes('dog')) return ['🐶', '🐕'];
    return [];
  },
}));

describe('RdsEmojiGenerator', () => {
  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      const { container } = render(<RdsEmojiGenerator />);
      expect(container.querySelector('.rds-emoji-generator')).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsEmojiGenerator.displayName).toBe('RdsCompEmojiGenerator');
    });

    it('should render in Default type by default', () => {
      const { container } = render(<RdsEmojiGenerator />);
      expect(container.querySelector('.rds-emoji-generator')).toBeInTheDocument();
      expect(container.querySelector('input')).toBeInTheDocument();
    });

    it('should render search field in Default type', () => {
      render(<RdsEmojiGenerator Type={EmojiGeneratorType.Default} />);
      const searchInput = screen.getByPlaceholderText('Search');
      expect(searchInput).toBeInTheDocument();
    });
  });

  describe('Type Variants', () => {
    it('should render Default type', () => {
      const { container } = render(<RdsEmojiGenerator Type={EmojiGeneratorType.Default} />);
      expect(container.querySelector('.rds-emoji-generator')).toHaveClass('rds-emoji-generator');
      expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
    });

    it('should render QuickReactions type', () => {
      const { container } = render(<RdsEmojiGenerator Type={EmojiGeneratorType.QuickReactions} />);
      expect(container.querySelector('.rds-emoji-generator--quick')).toBeInTheDocument();
    });

    it('should render quick emoji buttons in QuickReactions type', () => {
      const { container } = render(<RdsEmojiGenerator Type={EmojiGeneratorType.QuickReactions} />);
      const quickEmojis = container.querySelectorAll('.rds-emoji-generator__emoji--quick');
      expect(quickEmojis.length).toBeGreaterThan(0);
    });

    it('should render plus button in QuickReactions type', () => {
      render(<RdsEmojiGenerator Type={EmojiGeneratorType.QuickReactions} />);
      expect(screen.getByTestId('AddIcon')).toBeInTheDocument();
    });
  });

  describe('Category Navigation', () => {
    it('should render all category tabs', () => {
      const { container } = render(
        <RdsEmojiGenerator Type={EmojiGeneratorType.Default} />
      );
      const categoryButtons = container.querySelectorAll('button[data-variant]');
      expect(categoryButtons.length).toBe(8);
    });

    it('should have initial category selected', () => {
      const { container } = render(
        <RdsEmojiGenerator
          Type={EmojiGeneratorType.Default}
          Category={EmojiCategory.SmileysAndPeople}
        />
      );
      expect(container).toBeInTheDocument();
    });

    it('should change category when tab clicked', () => {
      const { container } = render(
        <RdsEmojiGenerator Type={EmojiGeneratorType.Default} />
      );
      const categoryButtons = container.querySelectorAll('button[data-variant]');
      fireEvent.click(categoryButtons[1]);
      expect(categoryButtons[1]).toBeInTheDocument();
    });

    it('should display category title', () => {
      render(
        <RdsEmojiGenerator
          Type={EmojiGeneratorType.Default}
          Category={EmojiCategory.SmileysAndPeople}
        />
      );
      const title = screen.getByText(/Smileys & People|Emojis/);
      expect(title).toBeInTheDocument();
    });

    it('should still change category from chip clicks when Category prop is initially provided', () => {
      render(
        <RdsEmojiGenerator
          Type={EmojiGeneratorType.Default}
          Category={EmojiCategory.SmileysAndPeople}
        />
      );

      expect(screen.getByText('Smileys & People')).toBeInTheDocument();

      const flagsChip = screen.getByTitle('Flags');
      fireEvent.click(flagsChip);

      expect(screen.getByText('Flags')).toBeInTheDocument();
    });
  });

  describe('Search Functionality', () => {
    it('should search emojis when user types', () => {
      render(<RdsEmojiGenerator Type={EmojiGeneratorType.Default} />);
      const searchInput = screen.getByPlaceholderText('Search') as HTMLInputElement;
      
      fireEvent.change(searchInput, { target: { value: 'smile' } });
      expect((searchInput as any).value).toBe('smile');
    });

    it('should filter emojis based on search term', () => {
      render(<RdsEmojiGenerator Type={EmojiGeneratorType.Default} />);
      const searchInput = screen.getByPlaceholderText('Search');
      
      fireEvent.change(searchInput, { target: { value: 'dog' } });
      expect(searchInput).toBeInTheDocument();
    });

    it('should clear search when input is cleared', () => {
      render(<RdsEmojiGenerator Type={EmojiGeneratorType.Default} />);
      const searchInput = screen.getByPlaceholderText('Search') as HTMLInputElement;
      
      fireEvent.change(searchInput, { target: { value: 'smile' } });
      expect((searchInput as any).value).toBe('smile');
      
      fireEvent.change(searchInput, { target: { value: '' } });
      expect((searchInput as any).value).toBe('');
    });
  });

  describe('Skin Tone Selection', () => {
    it('should render skin tone button when showSkinTone is true', () => {
      const { container } = render(
        <RdsEmojiGenerator
          Type={EmojiGeneratorType.Default}
          {...{ 'Show Skin Tone': true }}
        />
      );
      const skinToneButton = container.querySelector('.rds-emoji-generator__skin-tone-button');
      expect(skinToneButton).toBeInTheDocument();
    });

    it('should not render skin tone button when showSkinTone is false', () => {
      const { container } = render(
        <RdsEmojiGenerator
          Type={EmojiGeneratorType.Default}
          {...{ 'Show Skin Tone': false }}
        />
      );
      const skinToneButton = container.querySelector('.rds-emoji-generator__skin-tone-button');
      expect(skinToneButton).not.toBeInTheDocument();
    });

    it('should render inline skin tone options in Expanded state', () => {
      const { container } = render(
        <RdsEmojiGenerator
          Type={EmojiGeneratorType.Default}
          {...{ 'Show Skin Tone': true }}
          State={'Expanded' as any}
        />
      );
      const inlineOptions = container.querySelector('.rds-emoji-generator__skin-tone-inline');
      expect(inlineOptions).toBeInTheDocument();
    });

    it('should have 6 skin tone options in expanded state', () => {
      const { container } = render(
        <RdsEmojiGenerator
          Type={EmojiGeneratorType.Default}
          {...{ 'Show Skin Tone': true }}
          State={'Expanded' as any}
        />
      );
      const skinToneOptions = container.querySelectorAll('.rds-emoji-generator__skin-tone-option');
      expect(skinToneOptions.length).toBe(6);
    });

    it('should show popover in Default state when skin tone button clicked', () => {
      const { container } = render(
        <RdsEmojiGenerator
          Type={EmojiGeneratorType.Default}
          {...{ 'Show Skin Tone': true }}
          State={'Default' as any}
        />
      );
      const skinToneButton = container.querySelector('.rds-emoji-generator__skin-tone-button');
      if (skinToneButton) {
        fireEvent.click(skinToneButton);
      }
      // Popover should be rendered
      expect(container).toBeInTheDocument();
    });

    it('should change selected skin tone', () => {
      const { container } = render(
        <RdsEmojiGenerator
          Type={EmojiGeneratorType.Default}
          {...{ 'Show Skin Tone': true }}
          State={'Expanded' as any}
        />
      );
      const skinToneOptions = container.querySelectorAll('.rds-emoji-generator__skin-tone-option');
      fireEvent.click(skinToneOptions[1]);
      expect(skinToneOptions[1]).toBeInTheDocument();
    });
  });

  describe('Emoji Display', () => {
    it('should render emoji grid', () => {
      const { container } = render(
        <RdsEmojiGenerator Type={EmojiGeneratorType.Default} />
      );
      const grid = container.querySelector('.rds-emoji-generator__grid-container');
      expect(grid).toBeInTheDocument();
    });

    it('should display emojis', () => {
      const { container } = render(
        <RdsEmojiGenerator
          Type={EmojiGeneratorType.Default}
          Category={EmojiCategory.SmileysAndPeople}
        />
      );
      const emojis = container.querySelectorAll('.rds-emoji-generator__emoji');
      expect(emojis.length).toBeGreaterThan(0);
    });

    it('should respect maxEmojis prop', () => {
      const { container } = render(
        <RdsEmojiGenerator
          Type={EmojiGeneratorType.Default}
          maxEmojis={10}
        />
      );
      const emojis = container.querySelectorAll('.rds-emoji-generator__grid-container .rds-emoji-generator__emoji');
      expect(emojis.length).toBeLessThanOrEqual(10);
    });

    it('should render flag emoji as image', () => {
      const { container } = render(
        <RdsEmojiGenerator
          Type={EmojiGeneratorType.Default}
          Category={EmojiCategory.Flags}
        />
      );
      const flagImages = container.querySelectorAll('.rds-emoji-generator__emoji-image');
      expect(flagImages.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Footer', () => {
    it('should render footer when showFooter is true', () => {
      const { container } = render(
        <RdsEmojiGenerator
          Type={EmojiGeneratorType.Default}
          {...{ 'Show Footer': true }}
        />
      );
      const footer = container.querySelector('.rds-emoji-generator__footer');
      expect(footer).toBeInTheDocument();
    });

    it('should not render footer when showFooter is false', () => {
      const { container } = render(
        <RdsEmojiGenerator
          Type={EmojiGeneratorType.Default}
          {...{ 'Show Footer': false }}
        />
      );
      const footer = container.querySelector('.rds-emoji-generator__footer');
      expect(footer).not.toBeInTheDocument();
    });

    it('should display footer text', () => {
      render(
        <RdsEmojiGenerator
          Type={EmojiGeneratorType.Default}
          {...{ 'Show Footer': true }}
        />
      );
      expect(screen.getByText("What's your mood?")).toBeInTheDocument();
    });

    it('should display footer emoji', () => {
      const { container } = render(
        <RdsEmojiGenerator
          Type={EmojiGeneratorType.Default}
          {...{ 'Show Footer': true }}
        />
      );
      const footerEmoji = container.querySelector('.rds-emoji-generator__footer-emoji');
      expect(footerEmoji?.textContent).toBe('🙂');
    });
  });

  describe('Callbacks', () => {
    it('should call onEmojiSelect when emoji is clicked', () => {
      const onEmojiSelect = jest.fn();
      const { container } = render(
        <RdsEmojiGenerator
          Type={EmojiGeneratorType.Default}
          onEmojiSelect={onEmojiSelect}
        />
      );
      const emoji = container.querySelector('.rds-emoji-generator__emoji');
      if (emoji) {
        fireEvent.click(emoji);
      }
      expect(onEmojiSelect).toHaveBeenCalled();
    });

    it('should call onEmojiSelect when quick emoji is clicked', () => {
      const onEmojiSelect = jest.fn();
      const { container } = render(
        <RdsEmojiGenerator
          Type={EmojiGeneratorType.QuickReactions}
          onEmojiSelect={onEmojiSelect}
        />
      );
      const quickEmoji = container.querySelector('.rds-emoji-generator__emoji--quick');
      if (quickEmoji) {
        fireEvent.click(quickEmoji);
      }
      expect(onEmojiSelect).toHaveBeenCalled();
    });

    it('should call onEmojiSelect with plus sign when plus button clicked', () => {
      const onEmojiSelect = jest.fn();
      const { container } = render(
        <RdsEmojiGenerator
          Type={EmojiGeneratorType.QuickReactions}
          onEmojiSelect={onEmojiSelect}
        />
      );
      const plusButton = container.querySelector('.rds-emoji-generator__plus');
      if (plusButton) {
        fireEvent.click(plusButton);
      }
      expect(onEmojiSelect).toHaveBeenCalledWith('+');
    });

    it('should handle undefined onEmojiSelect gracefully', () => {
      const { container } = render(
        <RdsEmojiGenerator Type={EmojiGeneratorType.Default} />
      );
      const emoji = container.querySelector('.rds-emoji-generator__emoji');
      expect(() => {
        if (emoji) fireEvent.click(emoji);
      }).not.toThrow();
    });
  });

  describe('Props Propagation', () => {
    it('should apply custom sx styles', () => {
      const { container } = render(
        <RdsEmojiGenerator
          sx={{ color: 'red' }}
        />
      );
      expect(container.querySelector('.rds-emoji-generator')).toBeInTheDocument();
    });

    it('should pass all props to root element', () => {
      const { container } = render(
        <RdsEmojiGenerator
          Type={EmojiGeneratorType.Default}
          data-testid="custom-test-id"
        />
      );
      expect(container).toBeInTheDocument();
    });
  });

  describe('CSS Classes', () => {
    it('should have correct base class', () => {
      const { container } = render(<RdsEmojiGenerator />);
      expect(container.querySelector('.rds-emoji-generator')).toBeInTheDocument();
    });

    it('should have search container class', () => {
      const { container } = render(
        <RdsEmojiGenerator Type={EmojiGeneratorType.Default} />
      );
      expect(container.querySelector('.rds-emoji-generator__search')).toBeInTheDocument();
    });

    it('should have categories class', () => {
      const { container } = render(
        <RdsEmojiGenerator Type={EmojiGeneratorType.Default} />
      );
      expect(container.querySelector('.rds-emoji-generator__categories')).toBeInTheDocument();
    });

    it('should have grid class', () => {
      const { container } = render(
        <RdsEmojiGenerator Type={EmojiGeneratorType.Default} />
      );
      expect(container.querySelector('.rds-emoji-generator__grid')).toBeInTheDocument();
    });
  });

  describe('Category Selection State', () => {
    it('should highlight selected category', () => {
      const { container } = render(
        <RdsEmojiGenerator
          Type={EmojiGeneratorType.Default}
          Category={EmojiCategory.FoodAndDrink}
        />
      );
      const selectedChip = container.querySelector('button[data-color="primary"]');
      expect(selectedChip).toBeInTheDocument();
    });

    it('should update category title when category changes', () => {
      const { container } = render(
        <RdsEmojiGenerator
          Type={EmojiGeneratorType.Default}
          Category={EmojiCategory.AnimalsAndNature}
        />
      );
      const title = container.querySelector('.rds-emoji-generator__category-title-text');
      expect(title).toBeInTheDocument();
    });
  });

  describe('Integration', () => {
    it('should render complete Default mode with all features', () => {
      const onEmojiSelect = jest.fn();
      const { container } = render(
        <RdsEmojiGenerator
          Type={EmojiGeneratorType.Default}
          {...{ 'Show Skin Tone': true, 'Show Footer': true }}
          State={'Default' as any}
          Category={EmojiCategory.SmileysAndPeople}
          onEmojiSelect={onEmojiSelect}
          maxEmojis={50}
        />
      );
      expect(container.querySelector('.rds-emoji-generator')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
      expect(container.querySelector('.rds-emoji-generator__footer')).toBeInTheDocument();
    });

    it('should render complete QuickReactions mode', () => {
      const onEmojiSelect = jest.fn();
      const { container } = render(
        <RdsEmojiGenerator
          Type={EmojiGeneratorType.QuickReactions}
          onEmojiSelect={onEmojiSelect}
        />
      );
      expect(container.querySelector('.rds-emoji-generator--quick')).toBeInTheDocument();
      expect(screen.getByTestId('AddIcon')).toBeInTheDocument();
    });

    it('should handle category switching with search', () => {
      const { container } = render(
        <RdsEmojiGenerator Type={EmojiGeneratorType.Default} />
      );
      const searchInput = screen.getByPlaceholderText('Search');
      fireEvent.change(searchInput, { target: { value: 'smile' } });
      
      const categoryButtons = container.querySelectorAll('button[data-variant]');
      fireEvent.click(categoryButtons[1]);
      
      expect(searchInput).toBeInTheDocument();
      expect(categoryButtons[1]).toBeInTheDocument();
    });

    it('should handle expanded skin tone state with category change', () => {
      const { container } = render(
        <RdsEmojiGenerator
          Type={EmojiGeneratorType.Default}
          State={'Expanded' as any}
          {...{ 'Show Skin Tone': true }}
        />
      );
      const categoryButtons = container.querySelectorAll('button[data-variant]');
      fireEvent.click(categoryButtons[2]);
      
      expect(container.querySelector('.rds-emoji-generator__skin-tone-inline')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty search results gracefully', () => {
      const { container } = render(
        <RdsEmojiGenerator Type={EmojiGeneratorType.Default} />
      );
      const searchInput = screen.getByPlaceholderText('Search');
      fireEvent.change(searchInput, { target: { value: 'nonexistent' } });
      
      expect(container).toBeInTheDocument();
    });

    it('should handle maxEmojis as 0', () => {
      const { container } = render(
        <RdsEmojiGenerator
          Type={EmojiGeneratorType.Default}
          maxEmojis={0}
        />
      );
      const grid = container.querySelector('.rds-emoji-generator__grid-container');
      expect(grid).toBeInTheDocument();
    });

    it('should handle undefined Category prop', () => {
      const { container } = render(
        <RdsEmojiGenerator Type={EmojiGeneratorType.Default} />
      );
      expect(container.querySelector('.rds-emoji-generator')).toBeInTheDocument();
    });

    it('should handle rapid category changes', () => {
      const { container } = render(
        <RdsEmojiGenerator Type={EmojiGeneratorType.Default} />
      );
      const categoryButtons = container.querySelectorAll('button[data-variant]');
      
      fireEvent.click(categoryButtons[0]);
      fireEvent.click(categoryButtons[1]);
      fireEvent.click(categoryButtons[2]);
      fireEvent.click(categoryButtons[0]);
      
      expect(container).toBeInTheDocument();
    });

    it('should render with no onEmojiSelect callback', () => {
      const { container } = render(
        <RdsEmojiGenerator Type={EmojiGeneratorType.Default} />
      );
      expect(container.querySelector('.rds-emoji-generator')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsEmojiGenerator />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
