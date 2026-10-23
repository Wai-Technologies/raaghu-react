import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RdsBreadcrumbs, { RdsBreadcrumbItem, RdsBreadcrumbsProps, BreadcrumbSeparator } from './rds-breadcrumbs';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';

jest.mock('../shared/utils/deprecation', () => ({ warnDeprecatedProp: jest.fn() }));
import { warnDeprecatedProp } from '../shared/utils/deprecation';

jest.mock('./rds-breadcrumbs.scss', () => ({}));

jest.mock('@mui/icons-material/HomeOutlined', () => {
  return function HomeOutlinedIcon() {
    return <span data-testid="home-icon">HomeIcon</span>;
  };
});

jest.mock('@mui/icons-material/NavigateNext', () => {
  return function NavigateNextIcon() {
    return <span data-testid="navigate-next-icon">NavigateNextIcon</span>;
  };
});

jest.mock('@mui/icons-material/FolderOutlined', () => {
  return function FolderOutlinedIcon() {
    return <span data-testid="folder-icon">FolderIcon</span>;
  };
});

jest.mock('@mui/icons-material/CategoryOutlined', () => {
  return function CategoryOutlinedIcon() {
    return <span data-testid="category-icon">CategoryIcon</span>;
  };
});

jest.mock('@mui/icons-material/BusinessOutlined', () => {
  return function BusinessOutlinedIcon() {
    return <span data-testid="business-icon">BusinessIcon</span>;
  };
});

jest.mock('@mui/icons-material/InventoryOutlined', () => {
  return function InventoryOutlinedIcon() {
    return <span data-testid="inventory-icon">InventoryIcon</span>;
  };
});

jest.mock('@mui/icons-material/StarBorderOutlined', () => {
  return function StarBorderOutlinedIcon() {
    return <span data-testid="star-icon">StarIcon</span>;
  };
});

describe('RdsBreadcrumbs', () => {
  const defaultItems: RdsBreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Electronics', href: '/products/electronics' },
    { label: 'Laptops' },
  ];
  const defaultProps: RdsBreadcrumbsProps = { items: defaultItems };
  const setup = (p: Partial<RdsBreadcrumbsProps> = {}) => render(<RdsBreadcrumbs {...defaultProps} {...p} />);
  const list = (...i: RdsBreadcrumbItem[]) => i;

  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      const { container } = setup();
      expect(container.querySelector('.rds-breadcrumbs')).toBeInTheDocument();
      expect(container.querySelector('.MuiBreadcrumbs-root')).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsBreadcrumbs.displayName).toBe('RdsBreadcrumbs');
    });
  });

  describe('Items Rendering', () => {
    it('should render all items', () => {
      setup();
      ['Home', 'Products', 'Electronics', 'Laptops'].forEach((t) => expect(screen.getByText(t)).toBeInTheDocument());
    });

    it('should render single item', () => {
      render(<RdsBreadcrumbs items={[{ label: 'Home', href: '/' }]} />);
      expect(screen.getByText('Home')).toBeInTheDocument();
    });

    it('should render many items', () => {
      const manyItems = Array.from({ length: 10 }, (_, i) => ({ label: `Item ${i + 1}`, href: `/item-${i + 1}` }));
      render(<RdsBreadcrumbs items={manyItems} />);
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 10')).toBeInTheDocument();
    });

    it('should render empty items array', () => {
      const { container } = render(<RdsBreadcrumbs items={[]} />);
      expect(container.querySelector('.MuiBreadcrumbs-root')).toBeInTheDocument();
    });

    it('should render items with href links and last item without link', () => {
      setup();
      expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '/');
      expect(screen.getByText('Laptops').tagName).not.toBe('A');
    });
  });

  describe('Separators', () => {
    it('should render default separator (NavigateNext icon)', () => {
      setup();
      expect(screen.getAllByTestId('navigate-next-icon').length).toBeGreaterThan(0);
    });

    it('should render custom separator string', () => {
      const { container } = setup({ separator: ' > ' });
      expect(container.textContent).toContain('>');
    });

    it.each([
      [BreadcrumbSeparator.GreaterThan, '>'],
      [BreadcrumbSeparator.Slash, '/'],
      [BreadcrumbSeparator.Arrow, '→'],
      [BreadcrumbSeparator.DoubleArrow, '»'],
      [BreadcrumbSeparator.Pipe, '|'],
      [BreadcrumbSeparator.Dash, '-'],
      [BreadcrumbSeparator.Plus, '+'],
    ])('should render separatorType %s', (separatorType, text) => {
      const { container } = setup({ separatorType });
      expect(container.textContent).toContain(text);
    });

    it('should render custom ReactNode separator', () => {
      setup({ separator: <span data-testid="custom-sep">•</span> });
      expect(screen.getAllByTestId('custom-sep').length).toBeGreaterThan(0);
    });

    it('should prioritize separator prop over separatorType', () => {
      const { container } = setup({ separator: ' @ ', separatorType: BreadcrumbSeparator.Slash });
      expect(container.textContent).toContain('@');
    });
  });

  describe('Layouts', () => {
    it.each([
      [undefined, 'plain'],
      ['pill background', 'pill'],
      ['square background', 'square'],
      ['without background', 'plain'],
    ])('should render layout %s', (layout, cls) => {
      const { container } = setup({ layout: layout as RdsBreadcrumbsProps['layout'] });
      expect(container.querySelector(`.rds-breadcrumbs__${cls}`)).toBeInTheDocument();
    });

    it('should apply item-level layout', () => {
      const layoutItems = list(
        { label: 'Home', href: '/', layout: 'pill background' },
        { label: 'Products', href: '/products', layout: 'square background' }
      );
      const { container } = render(<RdsBreadcrumbs items={layoutItems} />);
      expect(container.querySelector('.rds-breadcrumbs__pill')).toBeInTheDocument();
      expect(container.querySelector('.rds-breadcrumbs__square')).toBeInTheDocument();
    });
  });

  describe('Icons', () => {
    it('should render icons by default', () => {
      setup();
      expect(screen.getByTestId('home-icon')).toBeInTheDocument();
    });

    it('should not render icons when showIcon is false', () => {
      setup({ showIcon: false });
      expect(screen.queryByTestId('home-icon')).not.toBeInTheDocument();
    });

    it('should render icons based on autoIcons', () => {
      render(<RdsBreadcrumbs items={list({ label: 'Home' }, { label: 'Products' })} autoIcons={true} />);
      expect(screen.getByTestId('home-icon')).toBeInTheDocument();
    });

    it('should not render icons when autoIcons is false', () => {
      const { container } = render(<RdsBreadcrumbs items={[{ label: 'No Icon Item' }]} autoIcons={false} />);
      expect(container.querySelector('.rds-breadcrumbs')).toBeInTheDocument();
    });

    it('should use item-specific icon', () => {
      render(<RdsBreadcrumbs items={[{ label: 'Home', icon: 'star' }]} />);
      expect(screen.getByTestId('star-icon')).toBeInTheDocument();
    });

    it('should use global icon when item icon is not set', () => {
      render(<RdsBreadcrumbs items={[{ label: 'Home' }]} icon="folder" />);
      expect(screen.getByTestId('folder-icon')).toBeInTheDocument();
    });

    it('should prioritize item icon over global icon', () => {
      render(<RdsBreadcrumbs items={[{ label: 'Home', icon: 'star' }]} icon="folder" />);
      expect(screen.getByTestId('star-icon')).toBeInTheDocument();
    });

    it('should assign default icon based on position and label', () => {
      render(<RdsBreadcrumbs items={list({ label: 'Home' }, { label: 'Folder' })} />);
      expect(screen.getByTestId('home-icon')).toBeInTheDocument();
    });

    it('should not render icon when item showIcon is false', () => {
      render(<RdsBreadcrumbs items={list({ label: 'Home', showIcon: false }, { label: 'Products' })} />);
      expect(screen.getByText('Home').querySelector('[data-testid]')).not.toBeInTheDocument();
    });
  });

  describe('States', () => {
    it('should render default state', () => {
      setup({ state: 'default' });
      expect(screen.getByText('Home')).toBeInTheDocument();
    });

    it.each([
      ['hover', 'enable-hover'],
      ['selected', 'selected'],
    ] as const)('should render %s state', (state, cls) => {
      const { container } = setup({ state });
      expect(container.querySelector(`.rds-breadcrumbs__item__${cls}`)).toBeInTheDocument();
    });

    it('should apply item-level state and prioritize it over global state', () => {
      const stateItems = list({ label: 'Home', state: 'hover' }, { label: 'Products', state: 'selected' });
      const { container } = render(<RdsBreadcrumbs items={stateItems} state="default" />);
      expect(container.querySelector('.rds-breadcrumbs__item__enable-hover')).toBeInTheDocument();
      expect(container.querySelector('.rds-breadcrumbs__item__selected')).toBeInTheDocument();
    });
  });

  describe('Level Filtering', () => {
    it('should render all items when no level is set', () => {
      setup();
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Laptops')).toBeInTheDocument();
    });

    it('should limit to level1', () => {
      setup({ level: 'level1' });
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.queryByText('Products')).not.toBeInTheDocument();
    });

    it('should limit to level2', () => {
      setup({ level: 'level2' });
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Products')).toBeInTheDocument();
      expect(screen.queryByText('Electronics')).not.toBeInTheDocument();
    });

    it('should limit to level3', () => {
      setup({ level: 'level3' });
      expect(screen.getByText('Electronics')).toBeInTheDocument();
      expect(screen.queryByText('Laptops')).not.toBeInTheDocument();
    });

    it.each(['level4', 'level5'] as const)('should limit to %s', (level) => {
      setup({ level });
      expect(screen.getByText('Laptops')).toBeInTheDocument();
    });
  });

  describe('Title Prop', () => {
    it('should replace first item label with title and preserve other items', () => {
      setup({ title: 'Dashboard' });
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
      expect(screen.queryByText('Home')).not.toBeInTheDocument();
      expect(screen.getByText('Products')).toBeInTheDocument();
      expect(screen.getByText('Electronics')).toBeInTheDocument();
    });

    it('should not affect component without items', () => {
      const { container } = render(<RdsBreadcrumbs items={[]} title="Dashboard" />);
      expect(container.querySelector('.MuiBreadcrumbs-root')).toBeInTheDocument();
    });

    it('should work with level filtering', () => {
      setup({ title: 'Dashboard', level: 'level2' });
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
      expect(screen.getByText('Products')).toBeInTheDocument();
      expect(screen.queryByText('Electronics')).not.toBeInTheDocument();
    });
  });

  describe('Click Handlers', () => {
    it('should render items with onClick callbacks', () => {
      const clickItems = list(
        { label: 'Home', href: '/', onClick: jest.fn() },
        { label: 'Products', href: '/products', onClick: jest.fn() }
      );
      const { container } = render(<RdsBreadcrumbs items={clickItems} />);
      expect(container.querySelectorAll('.rds-breadcrumbs__item').length).toBe(2);
    });

    it('should render selected item with plain layout', () => {
      const selItems = list({ label: 'Home', href: '/', state: 'selected' }, { label: 'Products', href: '/products' });
      const { container } = render(<RdsBreadcrumbs items={selItems} />);
      expect(container.querySelectorAll('.rds-breadcrumbs__item').length).toBeGreaterThan(0);
      expect(container.querySelector('.rds-breadcrumbs')).toHaveClass('rds-breadcrumbs__plain');
    });
  });

  describe('Active Items', () => {
    it('should render active item as Typography not Link', () => {
      render(<RdsBreadcrumbs items={[{ label: 'Home', active: true }]} />);
      expect(screen.getByText('Home').tagName).not.toBe('A');
    });

    it('should render last item as Typography with item class', () => {
      setup();
      expect(screen.getByText('Laptops').tagName).not.toBe('A');
      expect(screen.getByText('Laptops')).toHaveClass('rds-breadcrumbs__item');
    });
  });

  describe('Combined Props', () => {
    it('should handle all customization props together', () => {
      const combined = list(
        { label: 'Home', href: '/', layout: 'pill background', icon: 'home', state: 'hover' },
        { label: 'Products', href: '/products', layout: 'square background', onClick: jest.fn() },
        { label: 'Current Page' }
      );
      const { container } = render(
        <RdsBreadcrumbs items={combined} separator=" > " level="level3" showIcon={true} title="Navigation" />
      );
      expect(container.querySelector('.rds-breadcrumbs')).toBeInTheDocument();
      expect(screen.getByText('Navigation')).toBeInTheDocument();
    });

    it('should handle multiple interactions', () => {
      const multi = list(
        { label: 'Home', onClick: jest.fn() },
        { label: 'Products', onClick: jest.fn() },
        { label: 'Electronics' }
      );
      const { container } = render(
        <RdsBreadcrumbs items={multi} showIcon={true} layout="pill background" state="default" />
      );
      expect(container.querySelectorAll('.rds-breadcrumbs__item').length).toBe(3);
    });
  });

  describe('Edge Cases', () => {
    it('should handle breadcrumb with empty label', () => {
      const { container } = render(<RdsBreadcrumbs items={[{ label: '' }]} />);
      expect(container.querySelector('.MuiBreadcrumbs-root')).toBeInTheDocument();
    });

    it('should handle very long label text', () => {
      const longLabel = 'This is a very long breadcrumb label that might wrap or truncate';
      render(<RdsBreadcrumbs items={[{ label: longLabel }]} />);
      expect(screen.getByText(longLabel)).toBeInTheDocument();
    });

    it.each([
      ['special', ['Home & Settings', 'User @ Profile']],
      ['unicode', ['🏠 Home', '📦 Products']],
    ])('should handle %s characters in label', (_n, labels) => {
      render(<RdsBreadcrumbs items={labels.map((label) => ({ label }))} />);
      labels.forEach((l) => expect(screen.getByText(l)).toBeInTheDocument());
    });

    it('should handle items with undefined onClick', () => {
      render(<RdsBreadcrumbs items={[{ label: 'Home', onClick: undefined }]} />);
      fireEvent.click(screen.getByText('Home'));
      expect(screen.getByText('Home')).toBeInTheDocument();
    });

    it('should handle rapid state changes', () => {
      const { rerender } = setup({ state: 'default' });
      rerender(<RdsBreadcrumbs {...defaultProps} state="hover" />);
      rerender(<RdsBreadcrumbs {...defaultProps} state="selected" />);
      rerender(<RdsBreadcrumbs {...defaultProps} state="default" />);
      expect(screen.getByText('Home')).toBeInTheDocument();
    });

    it('should handle items with/without href mixed', () => {
      const mixed = list({ label: 'Home', href: '/' }, { label: 'Page', onClick: () => {} }, { label: 'Current' });
      render(<RdsBreadcrumbs items={mixed} />);
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Current')).toBeInTheDocument();
    });

    it('should handle items with only required props', () => {
      const { container } = render(<RdsBreadcrumbs items={[{ label: 'Simple' }]} />);
      expect(screen.getByText('Simple')).toBeInTheDocument();
      expect(container.querySelector('.rds-breadcrumbs')).toBeInTheDocument();
    });

    it('should handle component re-render with different items', () => {
      const { rerender } = render(<RdsBreadcrumbs items={[{ label: 'First' }]} />);
      expect(screen.getByText('First')).toBeInTheDocument();
      rerender(<RdsBreadcrumbs items={[{ label: 'Second' }]} />);
      expect(screen.getByText('Second')).toBeInTheDocument();
    });
  });

  describe('Props Validation', () => {
    it('should accept items array', () => {
      const { container } = setup();
      expect(container.querySelectorAll('.rds-breadcrumbs__item').length).toBeGreaterThan(0);
    });

    it('should accept separator prop', () => {
      const { container } = setup({ separator: ' / ' });
      expect(container.textContent).toContain('/');
    });

    it('should accept level prop', () => {
      setup({ level: 'level2' });
      expect(screen.getByText('Products')).toBeInTheDocument();
    });

    it('should accept title prop', () => {
      setup({ title: 'Custom Title' });
      expect(screen.getByText('Custom Title')).toBeInTheDocument();
    });

    it('should accept autoIcons boolean prop', () => {
      render(<RdsBreadcrumbs items={[{ label: 'Home' }]} autoIcons={false} />);
      expect(screen.getByText('Home')).toBeInTheDocument();
    });

    it('should accept className prop', () => {
      const { container } = setup({ className: 'custom-class' });
      expect(container.querySelector('.custom-class')).toBeInTheDocument();
    });

    it('should accept MUI Breadcrumbs props', () => {
      const { container } = setup({ 'data-testid': 'custom-breadcrumbs' } as Partial<RdsBreadcrumbsProps>);
      expect(container.querySelector('[data-testid="custom-breadcrumbs"]')).toBeInTheDocument();
    });
  });

  describe('MUI Integration', () => {
    it('should spread MUI props to Breadcrumbs', () => {
      const { container } = setup({ maxItems: 2 });
      expect(container.querySelector('.MuiBreadcrumbs-root')).toBeInTheDocument();
    });

    it('should accept aria attributes', () => {
      const { container } = setup({ 'aria-label': 'Breadcrumb navigation' } as Partial<RdsBreadcrumbsProps>);
      expect(container.querySelector('[aria-label="Breadcrumb navigation"]')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has no axe accessibility violations', async () => {
      const { container } = setup();
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});

describe('RdsBreadcrumbs audit fixes', () => {
  const items: RdsBreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Laptops' },
  ];

  it('accepts an icon element at component and item level; strings still use the icon map (G1-119)', () => {
    render(
      <RdsBreadcrumbs
        items={[
          { label: 'Home', icon: <span data-testid="item-node-icon" /> },
          { label: 'Products', icon: 'star' },
          { label: 'Laptops' },
        ]}
        icon={<span data-testid="global-node-icon" />}
      />
    );
    expect(screen.getByTestId('item-node-icon')).toBeInTheDocument();
    expect(screen.getByTestId('star-icon')).toBeInTheDocument();
    expect(screen.getByTestId('global-node-icon')).toBeInTheDocument();
  });

  it('accepts separatorType as a plain string as well as the enum (G1-120)', () => {
    const { container } = render(<RdsBreadcrumbs items={items} separatorType="»" />);
    expect(container.textContent).toContain('»');
    expect(BreadcrumbSeparator.DoubleArrow).toBe('»');
  });

  it('uses separator over separatorType when both are given (G1-121)', () => {
    const sep = <span data-testid="sep">•</span>;
    const { container } = render(<RdsBreadcrumbs items={items} separator={sep} separatorType={BreadcrumbSeparator.Pipe} />);
    expect(screen.getAllByTestId('sep').length).toBe(2);
    expect(container.textContent).not.toContain('|');
  });

  it('does not leak title onto the <nav> but still replaces the first label (G1-122)', () => {
    const { container } = render(<RdsBreadcrumbs items={items} title="Dashboard" />);
    expect(container.querySelector('nav')).not.toHaveAttribute('title');
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.queryByText('Home')).not.toBeInTheDocument();
  });

  it('forwards maxItems / itemsBeforeCollapse / itemsAfterCollapse to MUI (G1-123)', () => {
    const many = Array.from({ length: 6 }, (_, i) => ({ label: `Item ${i + 1}`, href: `/i${i + 1}` }));
    render(<RdsBreadcrumbs items={many} maxItems={3} itemsBeforeCollapse={1} itemsAfterCollapse={1} />);
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 6')).toBeInTheDocument();
    expect(screen.queryByText('Item 3')).not.toBeInTheDocument();
    expect(screen.getByLabelText('Show path')).toBeInTheDocument();
  });

  it('labels the nav "breadcrumb" by default and lets the consumer override it', () => {
    const { container, rerender } = render(<RdsBreadcrumbs items={items} />);
    expect(container.querySelector('nav')).toHaveAttribute('aria-label', 'breadcrumb');
    rerender(<RdsBreadcrumbs items={items} aria-label="You are here" />);
    expect(container.querySelector('nav')).toHaveAttribute('aria-label', 'You are here');
  });

  it('keeps className merged with its own classes', () => {
    const { container } = render(<RdsBreadcrumbs items={items} className="mine" />);
    expect(container.querySelector('nav')).toHaveClass('rds-breadcrumbs', 'rds-breadcrumbs__plain', 'mine');
  });

  it('marks the last item aria-current="page" and keeps it out of the tab order (G1-126)', () => {
    render(<RdsBreadcrumbs items={items} />);
    const current = screen.getByText('Laptops').closest('[aria-current]') as HTMLElement;
    expect(current).toHaveAttribute('aria-current', 'page');
    expect(current).not.toHaveAttribute('role');
    expect(current).not.toHaveAttribute('tabindex');
    expect(screen.getByText('Home').closest('[aria-current]')).toBeNull();
  });

  it('makes a non-last active item keyboard operable (G1-126)', () => {
    render(<RdsBreadcrumbs items={[{ label: 'Home', active: true }, { label: 'Laptops' }]} />);
    const active = screen.getByText('Home').closest('[role="button"]') as HTMLElement;
    expect(active).toHaveAttribute('tabindex', '0');
    fireEvent.keyDown(active, { key: 'Enter' });
    expect(active).toHaveClass('rds-breadcrumbs__item__selected');
  });

  it('makes an onClick-only link focusable and operable with Enter/Space (G1-127)', () => {
    const onClick = jest.fn();
    render(<RdsBreadcrumbs items={[{ label: 'Home', onClick }, { label: 'Current' }]} />);
    const link = screen.getByText('Home').closest('a') as HTMLElement;
    expect(link).not.toHaveAttribute('href');
    expect(link).toHaveAttribute('role', 'button');
    expect(link).toHaveAttribute('tabindex', '0');
    fireEvent.keyDown(link, { key: 'Enter' });
    fireEvent.keyDown(link, { key: ' ' });
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it('does not add a button role to links that have an href', () => {
    render(<RdsBreadcrumbs items={[{ label: 'Home', href: '/', onClick: jest.fn() }, { label: 'Current' }]} />);
    const link = screen.getByText('Home').closest('a') as HTMLElement;
    expect(link).not.toHaveAttribute('role');
    expect(link).not.toHaveAttribute('tabindex');
  });

  it('passes the click event to item onClick (G1-129)', () => {
    const onClick = jest.fn((event?: React.MouseEvent<HTMLElement>) => event?.preventDefault());
    render(<RdsBreadcrumbs items={[{ label: 'Home', href: '/', onClick }, { label: 'Current' }]} />);
    fireEvent.click(screen.getByText('Home'));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick.mock.calls[0][0]).toHaveProperty('type', 'click');
  });

  it('still accepts no-argument onClick handlers (G1-129)', () => {
    const onClick = jest.fn(() => undefined);
    const noArg: RdsBreadcrumbItem = { label: 'Home', href: '/', onClick };
    render(<RdsBreadcrumbs items={[noArg, { label: 'Current' }]} />);
    fireEvent.click(screen.getByText('Home'));
    expect(onClick).toHaveBeenCalled();
  });

  it('has no axe violations with onClick-only items and a current page', async () => {
    const { container } = render(
      <RdsBreadcrumbs items={[{ label: 'Home', onClick: jest.fn() }, { label: 'Products', href: '/p' }, { label: 'Current' }]} />
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe('audit fixes', () => {
  beforeEach(() => (warnDeprecatedProp as jest.Mock).mockClear());

  it('warns when autoIcons is passed and keeps its behaviour', () => {
    render(<RdsBreadcrumbs items={[{ label: 'A' }, { label: 'B' }]} autoIcons={false} />);
    expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsBreadcrumbs', 'autoIcons', '`icon`');
  });

  it('warns when title is passed and still replaces the first label', () => {
    render(<RdsBreadcrumbs items={[{ label: 'A' }, { label: 'B' }]} title="Start" />);
    expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsBreadcrumbs', 'title', "the first item's `label`");
    expect(screen.getByText('Start')).toBeInTheDocument();
  });
});
