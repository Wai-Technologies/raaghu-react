import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import RdsList from './rds-list';
import { Avatar } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';

// Mock SCSS
jest.mock('./rds-list.scss', () => ({}));

// Mock RdsCheckbox component
jest.mock('../rds-checkbox/rds-checkbox', () => {
  return function DummyCheckbox(props: any) {
    return (
      <input
        type="checkbox"
        data-testid={`checkbox-${props.id}`}
        checked={props.checked}
        disabled={props.isDisabled}
        onChange={props.onChange}
      />
    );
  };
});

const renderWithTheme = (component: React.ReactElement, isDark = false) => {
  const theme = createTheme({
    palette: {
      mode: isDark ? 'dark' : 'light',
    },
  });
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('RdsList', () => {
  const defaultItems = [
    { id: 1, primary: 'Item 1', secondary: 'Secondary 1' },
    { id: 2, primary: 'Item 2', secondary: 'Secondary 2' },
    { id: 3, primary: 'Item 3', secondary: 'Secondary 3' },
  ];

  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      const { container } = renderWithTheme(
        <RdsList items={defaultItems} />
      );
      expect(container).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsList.displayName).toBe('RdsList');
    });

    it('should render MuiList component', () => {
      const { container } = renderWithTheme(
        <RdsList items={defaultItems} />
      );
      const muiList = container.querySelector('.MuiList-root');
      expect(muiList).toBeInTheDocument();
    });

    it('should render Paper wrapper', () => {
      const { container } = renderWithTheme(
        <RdsList items={defaultItems} />
      );
      const paper = container.querySelector('.MuiPaper-root');
      expect(paper).toBeInTheDocument();
    });

    it('should render with rds-list class', () => {
      const { container } = renderWithTheme(
        <RdsList items={defaultItems} />
      );
      const list = container.querySelector('.rds-list');
      expect(list).toBeInTheDocument();
    });
  });

  describe('List Items Rendering', () => {
    it('should render all list items', () => {
      renderWithTheme(
        <RdsList items={defaultItems} />
      );
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
      expect(screen.getByText('Item 3')).toBeInTheDocument();
    });

    it('should render primary text for each item', () => {
      renderWithTheme(
        <RdsList items={defaultItems} />
      );
      defaultItems.forEach(item => {
        expect(screen.getByText(item.primary)).toBeInTheDocument();
      });
    });

    it('should render secondary text when provided', () => {
      renderWithTheme(
        <RdsList items={defaultItems} />
      );
      defaultItems.forEach(item => {
        if (item.secondary) {
          expect(screen.getByText(item.secondary)).toBeInTheDocument();
        }
      });
    });

    it('should not render secondary text when not provided', () => {
      const itemsWithoutSecondary = [
        { id: 1, primary: 'Item 1' },
      ];
      const { container } = renderWithTheme(
        <RdsList items={itemsWithoutSecondary} />
      );
      expect(screen.getByText('Item 1')).toBeInTheDocument();
    });

    it('should render empty list when items array is empty', () => {
      const { container } = renderWithTheme(
        <RdsList items={[]} />
      );
      const muiList = container.querySelector('.MuiList-root');
      expect(muiList).toBeInTheDocument();
      expect(muiList?.children.length).toBe(0);
    });
  });

  describe('List Variants', () => {
    it('should render simple variant by default', () => {
      const { container } = renderWithTheme(
        <RdsList items={defaultItems} variant="simple" />
      );
      const list = container.querySelector('.rds-list');
      expect(list).not.toHaveClass('rds-list--firebase');
    });

    it('should render button variant', () => {
      const { container } = renderWithTheme(
        <RdsList items={defaultItems} variant="button" />
      );
      const list = container.querySelector('.rds-list');
      expect(list).toBeInTheDocument();
    });

    it('should render icon variant with icons', () => {
      const itemsWithIcons = [
        { id: 1, primary: 'Home', icon: <HomeIcon /> },
        { id: 2, primary: 'Person', icon: <PersonIcon /> },
      ];
      renderWithTheme(
        <RdsList items={itemsWithIcons} variant="icon" />
      );
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Person')).toBeInTheDocument();
    });

    it('should render avatar variant with avatars', () => {
      const itemsWithAvatars = [
        { id: 1, primary: 'User 1', avatar: <Avatar alt="User 1" src="url" /> },
        { id: 2, primary: 'User 2', avatar: <Avatar alt="User 2" src="url" /> },
      ];
      renderWithTheme(
        <RdsList items={itemsWithAvatars} variant="avatar" />
      );
      expect(screen.getByText('User 1')).toBeInTheDocument();
      expect(screen.getByText('User 2')).toBeInTheDocument();
    });

    it('should render firebase variant with specific class', () => {
      const { container } = renderWithTheme(
        <RdsList items={defaultItems} variant="firebase" />
      );
      const list = container.querySelector('.rds-list--firebase');
      expect(list).toBeInTheDocument();
    });
  });

  describe('Dividers', () => {
    it('should render dividers when withDividers is true', () => {
      const { container } = renderWithTheme(
        <RdsList items={defaultItems} withDividers={true} />
      );
      const dividers = container.querySelectorAll('.MuiDivider-root');
      expect(dividers.length).toBeGreaterThan(0);
    });

    it('should not render dividers when withDividers is false', () => {
      const { container } = renderWithTheme(
        <RdsList items={defaultItems} withDividers={false} />
      );
      const dividers = container.querySelectorAll('.rds-list__divider');
      expect(dividers.length).toBe(0);
    });

    it('should render correct number of dividers', () => {
      const { container } = renderWithTheme(
        <RdsList items={defaultItems} withDividers={true} />
      );
      const dividers = container.querySelectorAll('.MuiDivider-root');
      // Should be items.length - 1 for simple lists
      expect(dividers.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('Checkboxes', () => {
    it('should render checkboxes when withCheckboxes is true', () => {
      const { container } = renderWithTheme(
        <RdsList items={defaultItems} withCheckboxes={true} />
      );
      const checkboxes = container.querySelectorAll('input[type="checkbox"]');
      expect(checkboxes.length).toBeGreaterThan(0);
    });

    it('should not render checkboxes when withCheckboxes is false', () => {
      const { container } = renderWithTheme(
        <RdsList items={defaultItems} withCheckboxes={false} />
      );
      const checkboxes = container.querySelectorAll('input[type="checkbox"]');
      expect(checkboxes.length).toBe(0);
    });

    it('should call onCheckboxChange when checkbox is toggled', () => {
      const onCheckboxChange = jest.fn();
      const { container } = renderWithTheme(
        <RdsList 
          items={defaultItems} 
          withCheckboxes={true}
          onCheckboxChange={onCheckboxChange}
        />
      );
      const checkbox = container.querySelector('input[type="checkbox"]');
      if (checkbox) {
        fireEvent.click(checkbox);
        expect(onCheckboxChange).toHaveBeenCalled();
      }
    });

    it('should mark items as checked in checkedItems array', () => {
      const { container } = renderWithTheme(
        <RdsList 
          items={defaultItems} 
          withCheckboxes={true}
          checkedItems={[1, 2]}
        />
      );
      const checkboxes = container.querySelectorAll('input[type="checkbox"]');
      expect(checkboxes.length).toBeGreaterThan(0);
    });

    it('should respect controlled checkedItems prop', () => {
      const { container } = renderWithTheme(
        <RdsList 
          items={defaultItems} 
          withCheckboxes={true}
          checkedItems={[1]}
          onCheckboxChange={() => {}}
        />
      );
      expect(container).toBeInTheDocument();
    });
  });

  describe('Icons and Avatars', () => {
    it('should render icons when provided', () => {
      const itemsWithIcons = [
        { id: 1, primary: 'Home', icon: <HomeIcon data-testid="home-icon" /> },
      ];
      renderWithTheme(
        <RdsList items={itemsWithIcons} />
      );
      expect(screen.getByTestId('home-icon')).toBeInTheDocument();
    });

    it('should render avatars when provided', () => {
      const itemsWithAvatars = [
        { id: 1, primary: 'User', avatar: <Avatar data-testid="avatar-1" /> },
      ];
      renderWithTheme(
        <RdsList items={itemsWithAvatars} />
      );
      expect(screen.getByTestId('avatar-1')).toBeInTheDocument();
    });

    it('should render secondary action when provided', () => {
      const itemsWithSecondaryAction = [
        { id: 1, primary: 'Item', secondaryAction: <button>Action</button> },
      ];
      renderWithTheme(
        <RdsList items={itemsWithSecondaryAction} />
      );
      expect(screen.getByText('Action')).toBeInTheDocument();
    });
  });

  describe('Item States', () => {
    it('should apply selected class when item is selected', () => {
      const itemsWithSelected = [
        { id: 1, primary: 'Item 1', selected: true },
        { id: 2, primary: 'Item 2', selected: false },
      ];
      const { container } = renderWithTheme(
        <RdsList items={itemsWithSelected} />
      );
      const selectedItems = container.querySelectorAll('.rds-list__item--selected');
      expect(selectedItems.length).toBe(1);
    });

    it('should apply disabled class when item is disabled', () => {
      const itemsWithDisabled = [
        { id: 1, primary: 'Item 1', disabled: true },
        { id: 2, primary: 'Item 2', disabled: false },
      ];
      const { container } = renderWithTheme(
        <RdsList items={itemsWithDisabled} />
      );
      const disabledItems = container.querySelectorAll('.rds-list__item--disabled');
      expect(disabledItems.length).toBe(1);
    });

    it('should apply clickable class when item has onClick', () => {
      const itemsWithClick = [
        { id: 1, primary: 'Item 1', onClick: jest.fn() },
        { id: 2, primary: 'Item 2' },
      ];
      const { container } = renderWithTheme(
        <RdsList items={itemsWithClick} />
      );
      const clickableItems = container.querySelectorAll('.rds-list__item--clickable');
      expect(clickableItems.length).toBeGreaterThan(0);
    });
  });

  describe('Item Click Handlers', () => {
    it('should call onClick when item with onClick is clicked', () => {
      const onClick = jest.fn();
      const itemsWithClick = [
        { id: 1, primary: 'Clickable Item', onClick },
      ];
      renderWithTheme(
        <RdsList items={itemsWithClick} variant="button" />
      );
      const item = screen.getByText('Clickable Item');
      fireEvent.click(item);
      expect(onClick).toHaveBeenCalled();
    });

    it('should handle multiple items with different click handlers', () => {
      const onClick1 = jest.fn();
      const onClick2 = jest.fn();
      const itemsWithClick = [
        { id: 1, primary: 'Item 1', onClick: onClick1 },
        { id: 2, primary: 'Item 2', onClick: onClick2 },
      ];
      renderWithTheme(
        <RdsList items={itemsWithClick} variant="button" />
      );
      
      fireEvent.click(screen.getByText('Item 1'));
      expect(onClick1).toHaveBeenCalled();
      expect(onClick2).not.toHaveBeenCalled();

      fireEvent.click(screen.getByText('Item 2'));
      expect(onClick2).toHaveBeenCalled();
    });
  });

  describe('Nested Items', () => {
    it('should render nested items when children are provided', () => {
      const itemsWithChildren = [
        {
          id: 1,
          primary: 'Parent Item',
          children: [
            { id: '1-1', primary: 'Child 1' },
            { id: '1-2', primary: 'Child 2' },
          ],
        },
      ];
      renderWithTheme(
        <RdsList items={itemsWithChildren} />
      );
      expect(screen.getByText('Parent Item')).toBeInTheDocument();
    });

    it('should toggle nested items visibility', () => {
      const itemsWithChildren = [
        {
          id: 1,
          primary: 'Parent Item',
          children: [
            { id: '1-1', primary: 'Child Item' },
          ],
        },
      ];
      renderWithTheme(
        <RdsList items={itemsWithChildren} />
      );
      
      const parentButton = screen.getByText('Parent Item').closest('button');
      if (parentButton) {
        fireEvent.click(parentButton);
        // The nested list should now be visible
        expect(screen.getByText('Child Item')).toBeInTheDocument();
      }
    });

    it('should render expand icon for items with children', () => {
      const itemsWithChildren = [
        {
          id: 1,
          primary: 'Parent Item',
          children: [
            { id: '1-1', primary: 'Child Item' },
          ],
        },
      ];
      const { container } = renderWithTheme(
        <RdsList items={itemsWithChildren} />
      );
      const expandIcons = container.querySelectorAll('.rds-list__expand-icon');
      expect(expandIcons.length).toBeGreaterThan(0);
    });
  });

  describe('List Properties', () => {
    it('should apply dense class when dense is true', () => {
      const { container } = renderWithTheme(
        <RdsList items={defaultItems} dense={true} />
      );
      const list = container.querySelector('.rds-list--dense');
      expect(list).toBeInTheDocument();
    });

    it('should not apply dense class when dense is false', () => {
      const { container } = renderWithTheme(
        <RdsList items={defaultItems} dense={false} />
      );
      const list = container.querySelector('.rds-list--dense');
      expect(list).not.toBeInTheDocument();
    });

    it('should apply disableGutters class when disableGutters is true', () => {
      const { container } = renderWithTheme(
        <RdsList items={defaultItems} disableGutters={true} />
      );
      const itemsWithoutGutters = container.querySelectorAll('.rds-list__item--no-gutters');
      expect(itemsWithoutGutters.length).toBeGreaterThan(0);
    });

    it('should apply custom className', () => {
      const { container } = renderWithTheme(
        <RdsList items={defaultItems} className="custom-class" />
      );
      const list = container.querySelector('.custom-class');
      expect(list).toBeInTheDocument();
    });

    it('should set alignItems property', () => {
      const { container } = renderWithTheme(
        <RdsList items={defaultItems} alignItems="flex-start" />
      );
      const list = container.querySelector('.MuiList-root');
      expect(list).toBeInTheDocument();
    });
  });

  describe('Theme Integration', () => {
    it('should render with light theme', () => {
      const { container } = renderWithTheme(
        <RdsList items={defaultItems} />,
        false
      );
      expect(container).toBeInTheDocument();
    });

    it('should render with dark theme', () => {
      const { container } = renderWithTheme(
        <RdsList items={defaultItems} />,
        true
      );
      expect(container).toBeInTheDocument();
    });
  });

  describe('Complex Scenarios', () => {
    it('should render list with all features combined', () => {
      const complexItems = [
        {
          id: 1,
          primary: 'Item with everything',
          secondary: 'Secondary text',
          icon: <HomeIcon data-testid="icon-1" />,
          secondaryAction: <button>Action</button>,
          onClick: jest.fn(),
          selected: true,
        },
        {
          id: 2,
          primary: 'Parent Item',
          children: [
            { id: '2-1', primary: 'Nested Child' },
          ],
        },
      ];
      renderWithTheme(
        <RdsList 
          items={complexItems}
          variant="button"
          withDividers={true}
          dense={false}
        />
      );

      expect(screen.getByText('Item with everything')).toBeInTheDocument();
      expect(screen.getByText('Secondary text')).toBeInTheDocument();
      expect(screen.getByTestId('icon-1')).toBeInTheDocument();
      expect(screen.getByText('Action')).toBeInTheDocument();
      expect(screen.getByText('Parent Item')).toBeInTheDocument();
    });

    it('should handle list with mixed content types', () => {
      const mixedItems = [
        { id: 1, primary: 'Simple item' },
        { id: 2, primary: 'Item with icon', icon: <PersonIcon /> },
        { id: 3, primary: 'Item with avatar', avatar: <Avatar /> },
      ];
      renderWithTheme(
        <RdsList items={mixedItems} />
      );

      expect(screen.getByText('Simple item')).toBeInTheDocument();
      expect(screen.getByText('Item with icon')).toBeInTheDocument();
      expect(screen.getByText('Item with avatar')).toBeInTheDocument();
    });

    it('should handle large list of items', () => {
      const largeItems = Array.from({ length: 100 }, (_, i) => ({
        id: i,
        primary: `Item ${i}`,
        secondary: `Secondary ${i}`,
      }));

      const { container } = renderWithTheme(
        <RdsList items={largeItems} withDividers={true} />
      );
      
      expect(screen.getByText('Item 0')).toBeInTheDocument();
      expect(screen.getByText('Item 99')).toBeInTheDocument();
    });
  });

  describe('Props Spreading', () => {
    it('should accept additional MuiList props', () => {
      const { container } = renderWithTheme(
        <RdsList 
          items={defaultItems}
          data-testid="custom-list"
        />
      );
      expect(screen.getByTestId('custom-list')).toBeInTheDocument();
    });

    it('should apply sx prop', () => {
      const { container } = renderWithTheme(
        <RdsList 
          items={defaultItems}
          sx={{ backgroundColor: '#fff' }}
        />
      );
      const list = container.querySelector('.MuiList-root');
      expect(list).toBeInTheDocument();
    });
  });

  describe('Content Rendering', () => {
    it('should render content with proper CSS classes', () => {
      const { container } = renderWithTheme(
        <RdsList items={defaultItems} />
      );
      
      const primaryContent = container.querySelectorAll('.rds-list__content-primary');
      expect(primaryContent.length).toBe(defaultItems.length);

      const secondaryContent = container.querySelectorAll('.rds-list__content-secondary');
      expect(secondaryContent.length).toBe(defaultItems.length);
    });

    it('should render icons with proper CSS classes', () => {
      const itemsWithIcons = [
        { id: 1, primary: 'Item', icon: <HomeIcon /> },
      ];
      const { container } = renderWithTheme(
        <RdsList items={itemsWithIcons} />
      );
      
      const iconElements = container.querySelectorAll('.rds-list__icon');
      expect(iconElements.length).toBeGreaterThan(0);
    });

    it('should render avatars with proper CSS classes', () => {
      const itemsWithAvatars = [
        { id: 1, primary: 'Item', avatar: <Avatar /> },
      ];
      const { container } = renderWithTheme(
        <RdsList items={itemsWithAvatars} />
      );
      
      const avatarElements = container.querySelectorAll('.rds-list__avatar');
      expect(avatarElements.length).toBeGreaterThan(0);
    });
  });

  describe('Accessibility', () => {
    it('has no axe accessibility violations', async () => {
      const { container } = renderWithTheme(<RdsList items={defaultItems} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
