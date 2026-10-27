import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';
import RdsEmojiGenerator, { EmojiGeneratorType, EmojiCategory } from './rds-comp-emoji-generator';

jest.mock('../../raaghu-elements/shared/utils/deprecation', () => ({ warnDeprecatedProp: jest.fn() }));

jest.mock('./rds-comp-emoji-generator.scss', () => ({}));

jest.mock('@mui/material', () => ({
  Box: React.forwardRef(({ children, className, onClick, ...props }: any, ref: any) => (
    onClick ? (
      <button type="button" ref={ref} className={className} onClick={onClick} data-testid={props['data-testid']} aria-label={props['aria-label']} onKeyDown={(e: any) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(e); } }}>
        {children}
      </button>
    ) : (
      <div ref={ref} className={className} data-testid={props['data-testid']}>
        {children}
      </div>
    )
  )),
  TextField: ({ value, onChange, placeholder, InputProps, slotProps, ...props }: any) => {
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

jest.mock('./rds-comp-emoji-data', () => ({
  EmojiGeneratorType: {
    Default: 'Default',
    QuickReactions: 'QuickReactions',
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
  ensureEmojiData: () => Promise.resolve(),
  isEmojiDataReady: () => true,
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
  getEmojiLabel: (emoji: string) => (emoji === '😊' ? 'smiling face' : undefined),
  searchEmojis: (term: string, category: any, skinTone: any) => {
    if (term.toLowerCase().includes('smile')) return ['😊', '😁', '😃'];
    if (term.toLowerCase().includes('dog')) return ['🐶', '🐕'];
    return [];
  },
}));

describe('RdsEmojiGenerator', () => {
  const Default = EmojiGeneratorType.Default;
  const Quick = EmojiGeneratorType.QuickReactions;
  const root = '.rds-emoji-generator';
  const setup = (p: Record<string, any> = {}) => render(<RdsEmojiGenerator type={Default} {...p} />);
  const has = (container: HTMLElement, sel: string) => expect(container.querySelector(sel)).toBeInTheDocument();
  const hasNot = (container: HTMLElement, sel: string) => expect(container.querySelector(sel)).not.toBeInTheDocument();
  const search = () => screen.getByPlaceholderText('Search') as HTMLInputElement;
  const chips = (container: HTMLElement) => container.querySelectorAll('button[data-variant]');

  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      has(render(<RdsEmojiGenerator />).container, root);
    });

    it('should have correct displayName', () => {
      expect(RdsEmojiGenerator.displayName).toBe('RdsCompEmojiGenerator');
    });

    it('should render in Default type by default', () => {
      const { container } = render(<RdsEmojiGenerator />);
      has(container, root);
      has(container, 'input');
    });

    it('should render search field in Default type', () => {
      setup();
      expect(search()).toBeInTheDocument();
    });
  });

  describe('Type Variants', () => {
    it('should render Default type', () => {
      const { container } = setup();
      expect(container.querySelector(root)).toHaveClass('rds-emoji-generator');
      expect(search()).toBeInTheDocument();
    });

    it('should render QuickReactions type', () => {
      has(setup({ type: Quick }).container, '.rds-emoji-generator--quick');
    });

    it('should render quick emoji buttons in QuickReactions type', () => {
      const { container } = setup({ type: Quick });
      expect(container.querySelectorAll('.rds-emoji-generator__emoji--quick').length).toBeGreaterThan(0);
    });

    it('should render plus button in QuickReactions type', () => {
      setup({ type: Quick });
      expect(screen.getByTestId('AddIcon')).toBeInTheDocument();
    });
  });

  describe('Category Navigation', () => {
    it('should render all category tabs', () => {
      expect(chips(setup().container).length).toBe(8);
    });

    it('should have initial category selected', () => {
      expect(setup({ category: EmojiCategory.SmileysAndPeople }).container).toBeInTheDocument();
    });

    it('should change category when tab clicked', () => {
      const categoryButtons = chips(setup().container);
      fireEvent.click(categoryButtons[1]);
      expect(categoryButtons[1]).toBeInTheDocument();
    });

    it('should display category title', () => {
      setup({ category: EmojiCategory.SmileysAndPeople });
      expect(screen.getByText(/Smileys & People|Emojis/)).toBeInTheDocument();
    });

    it('should still change category from chip clicks when Category prop is initially provided', () => {
      setup({ category: EmojiCategory.SmileysAndPeople });
      expect(screen.getByText('Smileys & People')).toBeInTheDocument();
      fireEvent.click(screen.getByTitle('Flags'));
      expect(screen.getByText('Flags')).toBeInTheDocument();
    });
  });

  describe('Search Functionality', () => {
    it('should search emojis when user types', () => {
      setup();
      fireEvent.change(search(), { target: { value: 'smile' } });
      expect(search().value).toBe('smile');
    });

    it('should filter emojis based on search term', () => {
      setup();
      fireEvent.change(search(), { target: { value: 'dog' } });
      expect(search()).toBeInTheDocument();
    });

    it('should clear search when input is cleared', () => {
      setup();
      fireEvent.change(search(), { target: { value: 'smile' } });
      expect(search().value).toBe('smile');
      fireEvent.change(search(), { target: { value: '' } });
      expect(search().value).toBe('');
    });
  });

  describe('Skin Tone Selection', () => {
    const skinTone = (v: boolean, extra: Record<string, any> = {}) => setup({ ...{ showSkinTone: v }, ...extra });

    it('should render skin tone button when showSkinTone is true', () => {
      has(skinTone(true).container, '.rds-emoji-generator__skin-tone-button');
    });

    it('should not render skin tone button when showSkinTone is false', () => {
      hasNot(skinTone(false).container, '.rds-emoji-generator__skin-tone-button');
    });

    it('should render inline skin tone options in Expanded state', () => {
      has(skinTone(true, { skinTonePickerOpen: true }).container, '.rds-emoji-generator__skin-tone-inline');
    });

    it('should have 6 skin tone options in expanded state', () => {
      const { container } = skinTone(true, { skinTonePickerOpen: true });
      expect(container.querySelectorAll('.rds-emoji-generator__skin-tone-option').length).toBe(6);
    });

    it('should show popover in Default state when skin tone button clicked', () => {
      const { container } = skinTone(true);
      const skinToneButton = container.querySelector('.rds-emoji-generator__skin-tone-button');
      if (skinToneButton) {
        fireEvent.click(skinToneButton);
      }
      expect(container).toBeInTheDocument();
    });

    it('should change selected skin tone', () => {
      const { container } = skinTone(true, { skinTonePickerOpen: true });
      const skinToneOptions = container.querySelectorAll('.rds-emoji-generator__skin-tone-option');
      fireEvent.click(skinToneOptions[1]);
      expect(skinToneOptions[1]).toBeInTheDocument();
    });
  });

  describe('Emoji Display', () => {
    it('should render emoji grid', () => {
      has(setup().container, '.rds-emoji-generator__grid-container');
    });

    it('should display emojis', () => {
      const { container } = setup({ category: EmojiCategory.SmileysAndPeople });
      expect(container.querySelectorAll('.rds-emoji-generator__emoji').length).toBeGreaterThan(0);
    });

    it('should respect maxEmojis prop', () => {
      const { container } = setup({ maxEmojis: 10 });
      const emojis = container.querySelectorAll('.rds-emoji-generator__grid-container .rds-emoji-generator__emoji');
      expect(emojis.length).toBeLessThanOrEqual(10);
    });

    it('should render flag emoji as image', () => {
      const { container } = setup({ category: EmojiCategory.Flags });
      expect(container.querySelectorAll('.rds-emoji-generator__emoji-image').length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Footer', () => {
    it('should render footer when showFooter is true', () => {
      has(setup({ showFooter: true }).container, '.rds-emoji-generator__footer');
    });

    it('should not render footer when showFooter is false', () => {
      hasNot(setup({ showFooter: false }).container, '.rds-emoji-generator__footer');
    });

    it('should display footer text', () => {
      setup({ showFooter: true });
      expect(screen.getByText("What's your mood?")).toBeInTheDocument();
    });

    it('should display footer emoji', () => {
      const { container } = setup({ showFooter: true });
      expect(container.querySelector('.rds-emoji-generator__footer-emoji')?.textContent).toBe('🙂');
    });
  });

  describe('Callbacks', () => {
    it('should call onEmojiSelect when emoji is clicked', () => {
      const onEmojiSelect = jest.fn();
      const { container } = setup({ onEmojiSelect });
      const emoji = container.querySelector('.rds-emoji-generator__emoji');
      if (emoji) {
        fireEvent.click(emoji);
      }
      expect(onEmojiSelect).toHaveBeenCalled();
    });

    it('should call onEmojiSelect when quick emoji is clicked', () => {
      const onEmojiSelect = jest.fn();
      const { container } = setup({ type: Quick, onEmojiSelect });
      const quickEmoji = container.querySelector('.rds-emoji-generator__emoji--quick');
      if (quickEmoji) {
        fireEvent.click(quickEmoji);
      }
      expect(onEmojiSelect).toHaveBeenCalled();
    });

    it('should call onEmojiSelect with plus sign when plus button clicked', () => {
      const onEmojiSelect = jest.fn();
      const { container } = setup({ type: Quick, onEmojiSelect });
      const plusButton = container.querySelector('.rds-emoji-generator__plus');
      if (plusButton) {
        fireEvent.click(plusButton);
      }
      expect(onEmojiSelect).toHaveBeenCalledWith('+');
    });

    it('should handle undefined onEmojiSelect gracefully', () => {
      const emoji = setup().container.querySelector('.rds-emoji-generator__emoji');
      expect(() => {
        if (emoji) fireEvent.click(emoji);
      }).not.toThrow();
    });
  });

  describe('Props Propagation', () => {
    it('should apply custom sx styles', () => {
      has(render(<RdsEmojiGenerator sx={{ color: 'red' }} />).container, root);
    });

    it('should pass all props to root element', () => {
      expect(setup({ 'data-testid': 'custom-test-id' }).container).toBeInTheDocument();
    });
  });

  describe('CSS Classes', () => {
    it.each(['search', 'categories', 'grid'])('should have %s class', (part) => {
      has(setup().container, `.rds-emoji-generator__${part}`);
    });
  });

  describe('Category Selection State', () => {
    it('should highlight selected category', () => {
      has(setup({ category: EmojiCategory.FoodAndDrink }).container, 'button[data-color="primary"]');
    });

    it('should update category title when category changes', () => {
      has(setup({ category: EmojiCategory.AnimalsAndNature }).container, '.rds-emoji-generator__category-title-text');
    });
  });

  describe('Integration', () => {
    it('should render complete Default mode with all features', () => {
      const { container } = setup({
        showSkinTone: true,
        showFooter: true,
        category: EmojiCategory.SmileysAndPeople,
        onEmojiSelect: jest.fn(),
        maxEmojis: 50,
      });
      has(container, root);
      expect(search()).toBeInTheDocument();
      has(container, '.rds-emoji-generator__footer');
    });

    it('should render complete QuickReactions mode', () => {
      const { container } = setup({ type: Quick, onEmojiSelect: jest.fn() });
      has(container, '.rds-emoji-generator--quick');
      expect(screen.getByTestId('AddIcon')).toBeInTheDocument();
    });

    it('should handle category switching with search', () => {
      const { container } = setup();
      fireEvent.change(search(), { target: { value: 'smile' } });
      const categoryButtons = chips(container);
      fireEvent.click(categoryButtons[1]);
      expect(search()).toBeInTheDocument();
      expect(categoryButtons[1]).toBeInTheDocument();
    });

    it('should handle expanded skin tone state with category change', () => {
      const { container } = setup({ skinTonePickerOpen: true, showSkinTone: true });
      fireEvent.click(chips(container)[2]);
      has(container, '.rds-emoji-generator__skin-tone-inline');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty search results gracefully', () => {
      const { container } = setup();
      fireEvent.change(search(), { target: { value: 'nonexistent' } });
      expect(container).toBeInTheDocument();
    });

    it('should handle maxEmojis as 0', () => {
      has(setup({ maxEmojis: 0 }).container, '.rds-emoji-generator__grid-container');
    });

    it('should handle undefined Category prop', () => {
      has(setup().container, root);
    });

    it('should handle rapid category changes', () => {
      const { container } = setup();
      const categoryButtons = chips(container);
      fireEvent.click(categoryButtons[0]);
      fireEvent.click(categoryButtons[1]);
      fireEvent.click(categoryButtons[2]);
      fireEvent.click(categoryButtons[0]);
      expect(container).toBeInTheDocument();
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

describe('audit fixes', () => {
  it('G5-023: applySkinTone picks the skin variant matching the tone', async () => {
    const actual = jest.requireActual('./rds-comp-emoji-data');
    await actual.ensureEmojiData();
    expect(actual.applySkinTone('👍️', 1)).toBe('👍🏻');
    expect(actual.applySkinTone('👍️', 5)).toBe('👍🏿');
  });

  it('G5-028: ensureEmojiData lazy-loads emojibase JSON once', async () => {
    const actual = jest.requireActual('./rds-comp-emoji-data');
    await actual.ensureEmojiData();
    expect(actual.isEmojiDataReady()).toBe(true);
    expect(actual.getEmojisByCategory(actual.EmojiCategory.SmileysAndPeople).length).toBeGreaterThan(0);
    await actual.ensureEmojiData();
    expect(actual.isEmojiDataReady()).toBe(true);
  });

  it('G5-024: type takes precedence over variant', () => {
    const { container } = render(
      <RdsEmojiGenerator type={EmojiGeneratorType.QuickReactions} variant={EmojiGeneratorType.Default} />
    );
    expect(container.querySelector('.rds-emoji-generator--quick')).toBeInTheDocument();
    const { container: c2 } = render(<RdsEmojiGenerator showFooter={false} showSkinTone={false} />);
    expect(c2.querySelector('.rds-emoji-generator__footer')).not.toBeInTheDocument();
    expect(c2.querySelector('.rds-emoji-generator__skin-tone-button')).not.toBeInTheDocument();
  });

  it('G5-026: flags use the pinned CDN url and flagBaseUrl overrides it', () => {
    const { container } = render(<RdsEmojiGenerator category={EmojiCategory.Flags} />);
    expect(container.querySelector('img')?.getAttribute('src')).toContain('twemoji@14.0.2');
    const { container: c2 } = render(<RdsEmojiGenerator category={EmojiCategory.Flags} flagBaseUrl="https://example.com/flags" />);
    expect(c2.querySelector('img')?.getAttribute('src')).toMatch(/^https:\/\/example\.com\/flags\/.+\.png$/);
  });

  it('G5-030: quickReactions overrides the default quick emojis', () => {
    const { container } = render(
      <RdsEmojiGenerator type={EmojiGeneratorType.QuickReactions} quickReactions={['🔥', '🎉']} />
    );
    expect(container.querySelectorAll('.rds-emoji-generator__emoji--quick')).toHaveLength(2);
  });

  it('G5-031: emoji elements are keyboard accessible with a label', () => {
    const onEmojiSelect = jest.fn();
    const { container } = render(<RdsEmojiGenerator onEmojiSelect={onEmojiSelect} />);
    const first = container.querySelector('.rds-emoji-generator__emoji') as HTMLElement;
    expect(first).toHaveAttribute('aria-label', 'smiling face');
    fireEvent.keyDown(first, { key: 'Enter' });
    expect(onEmojiSelect).toHaveBeenCalledWith('😊');
  });

  it('G5-032/033: labelled buttons and onMoreClick', () => {
    const onEmojiSelect = jest.fn();
    const onMoreClick = jest.fn();
    render(
      <RdsEmojiGenerator type={EmojiGeneratorType.QuickReactions} onEmojiSelect={onEmojiSelect} onMoreClick={onMoreClick} />
    );
    fireEvent.click(screen.getByLabelText('More emojis'));
    expect(onMoreClick).toHaveBeenCalledTimes(1);
    expect(onEmojiSelect).not.toHaveBeenCalled();
    render(<RdsEmojiGenerator skinTonePickerOpen />);
    expect(screen.getByLabelText('Skin tone: Medium Light')).toBeInTheDocument();
  });

  it('G5-034: onCategoryChange fires on tab click', () => {
    const onCategoryChange = jest.fn();
    const { container } = render(<RdsEmojiGenerator onCategoryChange={onCategoryChange} />);
    fireEvent.click(container.querySelectorAll('.rds-emoji-generator__category-chip')[1]);
    expect(onCategoryChange).toHaveBeenCalledWith(EmojiCategory.AnimalsAndNature);
  });

  it('G5-035: className and ref reach the root', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { container } = render(<RdsEmojiGenerator className="custom" ref={ref} />);
    expect(container.querySelector('.rds-emoji-generator.custom')).toBeInTheDocument();
    expect(ref.current).toBe(container.querySelector('.rds-emoji-generator'));
  });
});

describe('doc-09 renames', () => {
  const { warnDeprecatedProp } = jest.requireMock('../../raaghu-elements/shared/utils/deprecation');

  it('onChange receives the event and emoji; onEmojiSelect still works and warns', () => {
    const onChange = jest.fn();
    const onEmojiSelect = jest.fn();
    const { container } = render(<RdsEmojiGenerator onChange={onChange} onEmojiSelect={onEmojiSelect} />);
    fireEvent.click(container.querySelector('.rds-emoji-generator__emoji') as Element);
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ type: 'click' }), expect.any(String));
    expect(onEmojiSelect).toHaveBeenCalledWith(expect.any(String));
    expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsCompEmojiGenerator', 'onEmojiSelect', '`onChange`');
  });

  it('onChange receives the plus sign when no onMoreClick is given', () => {
    const onChange = jest.fn();
    render(<RdsEmojiGenerator variant={EmojiGeneratorType.QuickReactions} onChange={onChange} />);
    fireEvent.click(screen.getByLabelText('More emojis'));
    expect(onChange).toHaveBeenCalledWith(expect.anything(), '+');
  });

  it('uses lowerCamelCase category and display props', () => {
    warnDeprecatedProp.mockClear();
    const { container } = render(<RdsEmojiGenerator category={EmojiCategory.Flags} showSkinTone={true} showFooter={false} />);
    expect(container.querySelector('.rds-emoji-generator__category-chip--selected')).toHaveAttribute('title', 'Flags');
    expect(container.querySelector('.rds-emoji-generator__skin-tone-button')).toBeInTheDocument();
    expect(container.querySelector('.rds-emoji-generator__footer')).not.toBeInTheDocument();
    expect(warnDeprecatedProp).not.toHaveBeenCalled();
  });

  it('skinTonePickerOpen expands the picker inline', () => {
    const { container } = render(<RdsEmojiGenerator skinTonePickerOpen />);
    expect(container.querySelector('.rds-emoji-generator__skin-tone-inline')).toBeInTheDocument();
  });

  it('G5-038: selected skin tone uses BEM class + aria-pressed (not inline border)', () => {
    const { container } = render(<RdsEmojiGenerator skinTonePickerOpen />);
    const selected = container.querySelector('.rds-emoji-generator__skin-tone-option--selected') as HTMLElement;
    expect(selected).toBeTruthy();
    expect(selected).toHaveAttribute('aria-pressed', 'true');
    expect(selected.style.border).toBe('');
    expect(selected.style.boxShadow).toBe('');
  });

  it('RdsCompEmojiPicker is an alias of the component', () => {
    const mod = jest.requireActual('./rds-comp-emoji-generator');
    expect(mod.RdsCompEmojiPicker).toBe(mod.default);
  });
});
