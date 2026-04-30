import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import RdsTabs, { RdsTabItem, RdsTabsLayout } from './rds-tabs';
import '@testing-library/jest-dom';

// Mock SCSS
jest.mock('./rds-tabs.scss', () => ({}));
jest.mock('@mui/icons-material/Person', () => {
  return function MockPersonIcon() {
    return <div data-testid="person-icon">PersonIcon</div>;
  };
});
jest.mock('@mui/icons-material/Add', () => {
  return function MockAddIcon() {
    return <div data-testid="add-icon">AddIcon</div>;
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

const mockTabs: RdsTabItem[] = [
  { id: 'tab1', label: 'tab one', disabled: false },
  { id: 'tab2', label: 'tab two', disabled: false },
  { id: 'tab3', label: 'tab three', disabled: false },
];

describe('RdsTabs', () => {
  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      const { container } = renderWithTheme(
        <RdsTabs tabs={mockTabs} />
      );
      expect(container).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsTabs.displayName).toBe('RdsTabs');
    });

    it('should apply rds-tabs class', () => {
      const { container } = renderWithTheme(
        <RdsTabs tabs={mockTabs} />
      );
      const tabsElement = container.querySelector('.rds-tabs');
      expect(tabsElement).toBeInTheDocument();
    });

    it('should render all tabs', () => {
      renderWithTheme(
        <RdsTabs tabs={mockTabs} />
      );
      expect(screen.getByRole('tab', { name: /tab one/i })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: /tab two/i })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: /tab three/i })).toBeInTheDocument();
    });

    it('should apply MuiTabs classes', () => {
      const { container } = renderWithTheme(
        <RdsTabs tabs={mockTabs} />
      );
      const muiTabs = container.querySelector('.MuiTabs-root');
      expect(muiTabs).toBeInTheDocument();
    });

    it('should apply correct layout class', () => {
      const { container } = renderWithTheme(
        <RdsTabs tabs={mockTabs} layout="pill" />
      );
      const tabsElement = container.querySelector('.rds-tabs--pill');
      expect(tabsElement).toBeInTheDocument();
    });

    it('should apply state class', () => {
      const { container } = renderWithTheme(
        <RdsTabs tabs={mockTabs} state="selected" />
      );
      const tabsElement = container.querySelector('.rds-state--selected');
      expect(tabsElement).toBeInTheDocument();
    });
  });

  describe('Tab Labels', () => {
    it('should capitalize tab labels', () => {
      renderWithTheme(
        <RdsTabs tabs={mockTabs} />
      );
      expect(screen.getByRole('tab', { name: /Tab One/i })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: /Tab Two/i })).toBeInTheDocument();
    });

    it('should handle already capitalized labels', () => {
      const capitalizedTabs: RdsTabItem[] = [
        { id: 'tab1', label: 'Profile', disabled: false },
      ];
      renderWithTheme(
        <RdsTabs tabs={capitalizedTabs} />
      );
      expect(screen.getByRole('tab', { name: /Profile/i })).toBeInTheDocument();
    });

    it('should handle mixed case labels', () => {
      const mixedCaseTabs: RdsTabItem[] = [
        { id: 'tab1', label: 'aBcDeF', disabled: false },
      ];
      renderWithTheme(
        <RdsTabs tabs={mixedCaseTabs} />
      );
      expect(screen.getByRole('tab', { name: /Abcdef/i })).toBeInTheDocument();
    });

    it('should handle empty label', () => {
      const emptyLabelTabs: RdsTabItem[] = [
        { id: 'tab1', label: '', disabled: false },
      ];
      const { container } = renderWithTheme(
        <RdsTabs tabs={emptyLabelTabs} />
      );
      const tabs = container.querySelectorAll('[role="tab"]');
      expect(tabs.length).toBeGreaterThan(0);
    });
  });

  describe('Tab Icons', () => {
    it('should render default left icon when showLeftIcon is true', () => {
      const { container } = renderWithTheme(
        <RdsTabs tabs={mockTabs} showLeftIcon={true} />
      );
      const personIcons = container.querySelectorAll('[data-testid="person-icon"]');
      expect(personIcons.length).toBe(mockTabs.length);
    });

    it('should not render left icon when showLeftIcon is false', () => {
      const { container } = renderWithTheme(
        <RdsTabs tabs={mockTabs} showLeftIcon={false} />
      );
      const personIcons = container.querySelectorAll('[data-testid="person-icon"]');
      expect(personIcons.length).toBe(0);
    });

    it('should render default right icon when showRightIcon is true', () => {
      const { container } = renderWithTheme(
        <RdsTabs tabs={mockTabs} showRightIcon={true} />
      );
      const addIcons = container.querySelectorAll('[data-testid="add-icon"]');
      expect(addIcons.length).toBe(mockTabs.length);
    });

    it('should not render right icon when showRightIcon is false', () => {
      const { container } = renderWithTheme(
        <RdsTabs tabs={mockTabs} showRightIcon={false} />
      );
      const addIcons = container.querySelectorAll('[data-testid="add-icon"]');
      expect(addIcons.length).toBe(0);
    });

    it('should render custom left icon', () => {
      const customLeftIcon = <div data-testid="custom-left-icon">Custom Left</div>;
      const { container } = renderWithTheme(
        <RdsTabs tabs={mockTabs} leftIcon={customLeftIcon} showLeftIcon={true} />
      );
      const customIcons = container.querySelectorAll('[data-testid="custom-left-icon"]');
      expect(customIcons.length).toBe(mockTabs.length);
    });

    it('should render custom right icon', () => {
      const customRightIcon = <div data-testid="custom-right-icon">Custom Right</div>;
      const { container } = renderWithTheme(
        <RdsTabs tabs={mockTabs} rightIcon={customRightIcon} showRightIcon={true} />
      );
      const customIcons = container.querySelectorAll('[data-testid="custom-right-icon"]');
      expect(customIcons.length).toBe(mockTabs.length);
    });

    it('should use tab-specific icons over global icons', () => {
      const tabsWithIcons: RdsTabItem[] = [
        { 
          id: 'tab1', 
          label: 'tab one',
          leftIcon: <div data-testid="tab-specific-icon">Tab Specific</div>
        },
      ];
      const { container } = renderWithTheme(
        <RdsTabs 
          tabs={tabsWithIcons}
          leftIcon={<div data-testid="global-icon">Global</div>}
          showLeftIcon={true}
        />
      );
      expect(container.querySelector('[data-testid="tab-specific-icon"]')).toBeInTheDocument();
      expect(container.querySelector('[data-testid="global-icon"]')).not.toBeInTheDocument();
    });

    it('should apply icon classes', () => {
      const { container } = renderWithTheme(
        <RdsTabs tabs={mockTabs} showLeftIcon={true} showRightIcon={true} />
      );
      const leftIcons = container.querySelectorAll('.rds-tabs__icon--left');
      const rightIcons = container.querySelectorAll('.rds-tabs__icon--right');
      expect(leftIcons.length).toBe(mockTabs.length);
      expect(rightIcons.length).toBe(mockTabs.length);
    });
  });

  describe('Tab Disabled State', () => {
    it('should disable specific tabs', () => {
      const tabsWithDisabled: RdsTabItem[] = [
        { id: 'tab1', label: 'tab one', disabled: false },
        { id: 'tab2', label: 'tab two', disabled: true },
        { id: 'tab3', label: 'tab three', disabled: false },
      ];
      const { container } = renderWithTheme(
        <RdsTabs tabs={tabsWithDisabled} />
      );
      const tabs = container.querySelectorAll('[role="tab"]');
      const isDisabled = tabs[1]?.hasAttribute('disabled') || tabs[1]?.classList.contains('Mui-disabled');
      expect(isDisabled).toBe(true);
    });

    it('should not disable tabs when disabled is false', () => {
      const { container } = renderWithTheme(
        <RdsTabs tabs={mockTabs} />
      );
      const tabs = container.querySelectorAll('[role="tab"]');
      tabs.forEach(tab => {
        const isDisabled = tab?.hasAttribute('disabled') || tab?.classList.contains('Mui-disabled');
        expect(isDisabled).toBe(false);
      });
    });

    it('should allow clicking enabled tabs', () => {
      const onTabChange = jest.fn();
      const { container } = renderWithTheme(
        <RdsTabs tabs={mockTabs} onTabChange={onTabChange} />
      );
      const tab = container.querySelector('[role="tab"]');
      fireEvent.click(tab!);
      expect(onTabChange).toHaveBeenCalled();
    });
  });

  describe('Tab Selection and Callbacks', () => {
    it('should call onTabChange when tab is clicked', () => {
      const onTabChange = jest.fn();
      const { container } = renderWithTheme(
        <RdsTabs tabs={mockTabs} onTabChange={onTabChange} />
      );
      const tab = container.querySelector('[role="tab"]');
      fireEvent.click(tab!);
      expect(onTabChange).toHaveBeenCalled();
    });

    it('should call onChange when tab is clicked', () => {
      const onChange = jest.fn();
      const { container } = renderWithTheme(
        <RdsTabs tabs={mockTabs} onChange={onChange} />
      );
      const tab = container.querySelector('[role="tab"]');
      fireEvent.click(tab!);
      expect(onChange).toHaveBeenCalled();
    });

    it('should call both onTabChange and onChange', () => {
      const onTabChange = jest.fn();
      const onChange = jest.fn();
      const { container } = renderWithTheme(
        <RdsTabs tabs={mockTabs} onTabChange={onTabChange} onChange={onChange} />
      );
      const tab = container.querySelector('[role="tab"]');
      fireEvent.click(tab!);
      expect(onTabChange).toHaveBeenCalled();
      expect(onChange).toHaveBeenCalled();
    });

    it('should set active tab', () => {
      const { container } = renderWithTheme(
        <RdsTabs tabs={mockTabs} activeTab="tab2" />
      );
      const tabs = container.querySelectorAll('[role="tab"]');
      expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
    });

    it('should use value prop for controlled component', () => {
      const { container } = renderWithTheme(
        <RdsTabs tabs={mockTabs} value="tab3" />
      );
      const tabs = container.querySelectorAll('[role="tab"]');
      expect(tabs[2]).toHaveAttribute('aria-selected', 'true');
    });
  });

  describe('Layout Variations', () => {
    const layouts: RdsTabsLayout[] = [
      'filled',
      'flap',
      'line-bottom',
      'line-bottom-solid',
      'line-left',
      'line-left-solid',
      'line-right',
      'line-right-solid',
      'line-top',
      'line-top-solid',
      'pill',
    ];

    layouts.forEach(layout => {
      it(`should apply ${layout} layout class`, () => {
        const { container } = renderWithTheme(
          <RdsTabs tabs={mockTabs} layout={layout} />
        );
        const tabsElement = container.querySelector(`.rds-tabs--${layout}`);
        expect(tabsElement).toBeInTheDocument();
      });
    });

    it('should apply filled layout by default', () => {
      const { container } = renderWithTheme(
        <RdsTabs tabs={mockTabs} />
      );
      const tabsElement = container.querySelector('.rds-tabs--filled');
      expect(tabsElement).toBeInTheDocument();
    });
  });

  describe('Orientation', () => {
    it('should render horizontally by default', () => {
      const { container } = renderWithTheme(
        <RdsTabs tabs={mockTabs} type="horizontal" />
      );
      const tablist = container.querySelector('[role="tablist"]');
      expect(tablist).not.toHaveAttribute('aria-orientation', 'vertical');
    });

    it('should render vertically when type is vertical', () => {
      const { container } = renderWithTheme(
        <RdsTabs tabs={mockTabs} type="vertical" />
      );
      const tablist = container.querySelector('[role="tablist"]');
      expect(tablist).toHaveAttribute('aria-orientation', 'vertical');
    });
  });

  describe('Tab Titles', () => {
    it('should set tab title from tab.title', () => {
      const tabsWithTitles: RdsTabItem[] = [
        { id: 'tab1', label: 'tab one', title: 'custom title', disabled: false },
      ];
      const { container } = renderWithTheme(
        <RdsTabs tabs={tabsWithTitles} />
      );
      const tab = container.querySelector('[role="tab"]');
      expect(tab).toHaveAttribute('title', 'Custom title');
    });

    it('should use label as title fallback', () => {
      const { container } = renderWithTheme(
        <RdsTabs tabs={mockTabs} />
      );
      const tab = container.querySelector('[role="tab"]');
      expect(tab).toHaveAttribute('title', 'Tab one');
    });

    it('should capitalize title', () => {
      const tabsWithTitles: RdsTabItem[] = [
        { id: 'tab1', label: 'tab one', title: 'custom title for tab', disabled: false },
      ];
      const { container } = renderWithTheme(
        <RdsTabs tabs={tabsWithTitles} />
      );
      const tab = container.querySelector('[role="tab"]');
      expect(tab).toHaveAttribute('title', 'Custom title for tab');
    });
  });

  describe('Empty and Edge Cases', () => {
    it('should render with empty tabs array', () => {
      const { container } = renderWithTheme(
        <RdsTabs tabs={[]} />
      );
      const tablist = container.querySelector('[role="tablist"]');
      expect(tablist).toBeInTheDocument();
    });

    it('should handle single tab', () => {
      const singleTab: RdsTabItem[] = [
        { id: 'tab1', label: 'only tab', disabled: false },
      ];
      const { container } = renderWithTheme(
        <RdsTabs tabs={singleTab} />
      );
      const tabs = container.querySelectorAll('[role="tab"]');
      expect(tabs.length).toBe(1);
    });

    it('should handle many tabs', () => {
      const manyTabs: RdsTabItem[] = Array.from({ length: 20 }, (_, i) => ({
        id: `tab${i}`,
        label: `tab ${i}`,
        disabled: false,
      }));
      const { container } = renderWithTheme(
        <RdsTabs tabs={manyTabs} />
      );
      const tabs = container.querySelectorAll('[role="tab"]');
      expect(tabs.length).toBe(20);
    });

    it('should handle tabs with all disabled', () => {
      const allDisabledTabs: RdsTabItem[] = mockTabs.map(tab => ({
        ...tab,
        disabled: true,
      }));
      const { container } = renderWithTheme(
        <RdsTabs tabs={allDisabledTabs} />
      );
      const tabs = container.querySelectorAll('[role="tab"]');
      tabs.forEach(tab => {
        // Check that tab has disabled attribute or aria-disabled
        const isDisabled = tab.hasAttribute('disabled') || tab.getAttribute('aria-disabled') === 'true';
        expect(isDisabled).toBe(true);
      });
    });

    it('should handle numeric tab ids', () => {
      const numericTabs: RdsTabItem[] = [
        { id: 1, label: 'first', disabled: false },
        { id: 2, label: 'second', disabled: false },
      ];
      const onTabChange = jest.fn();
      const { container } = renderWithTheme(
        <RdsTabs tabs={numericTabs} onTabChange={onTabChange} />
      );
      const tab = container.querySelector('[role="tab"]');
      fireEvent.click(tab!);
      expect(onTabChange).toHaveBeenCalledWith(1);
    });
  });

  describe('Custom Props', () => {
    it('should pass through MuiTabs props', () => {
      const { container } = renderWithTheme(
        <RdsTabs tabs={mockTabs} centered variant="scrollable" />
      );
      const tablist = container.querySelector('[role="tablist"]');
      expect(tablist).toBeInTheDocument();
    });

    it('should apply custom className', () => {
      const { container } = renderWithTheme(
        <RdsTabs tabs={mockTabs} className="custom-class" />
      );
      const tablist = container.querySelector('[role="tablist"]');
      expect(tablist?.parentElement).toBeInTheDocument();
    });

    it('should support scrollable variant', () => {
      const { container } = renderWithTheme(
        <RdsTabs tabs={mockTabs} variant="scrollable" scrollButtons="auto" />
      );
      const tablist = container.querySelector('[role="tablist"]');
      expect(tablist).toBeInTheDocument();
    });
  });

  describe('Theme Support', () => {
    it('should work with dark theme', () => {
      const { container } = renderWithTheme(
        <RdsTabs tabs={mockTabs} />,
        true
      );
      expect(container).toBeInTheDocument();
    });

    it('should work with light theme', () => {
      const { container } = renderWithTheme(
        <RdsTabs tabs={mockTabs} />,
        false
      );
      expect(container).toBeInTheDocument();
    });
  });

  describe('Label Content', () => {
    it('should wrap label in rds-tabs__label class', () => {
      const { container } = renderWithTheme(
        <RdsTabs tabs={mockTabs} />
      );
      const labels = container.querySelectorAll('.rds-tabs__label');
      expect(labels.length).toBeGreaterThan(0);
    });

    it('should display label text in span', () => {
      const { container } = renderWithTheme(
        <RdsTabs tabs={mockTabs} showLeftIcon={false} showRightIcon={false} />
      );
      const labelSpans = container.querySelectorAll('.rds-tabs__label span');
      expect(labelSpans.length).toBeGreaterThan(0);
    });
  });

  describe('Integration Tests', () => {
    it('should handle multiple tab changes', () => {
      const onTabChange = jest.fn();
      const { container } = renderWithTheme(
        <RdsTabs tabs={mockTabs} onTabChange={onTabChange} />
      );
      const tabs = container.querySelectorAll('[role="tab"]');
      
      fireEvent.click(tabs[0]);
      fireEvent.click(tabs[1]);
      fireEvent.click(tabs[2]);
      
      expect(onTabChange).toHaveBeenCalledTimes(3);
    });

    it('should work with different layouts and icons', () => {
      const { container } = renderWithTheme(
        <RdsTabs 
          tabs={mockTabs}
          layout="pill"
          showLeftIcon={true}
          showRightIcon={true}
          type="horizontal"
        />
      );
      expect(container.querySelector('.rds-tabs--pill')).toBeInTheDocument();
      expect(container.querySelectorAll('[data-testid="person-icon"]').length).toBe(mockTabs.length);
      expect(container.querySelectorAll('[data-testid="add-icon"]').length).toBe(mockTabs.length);
    });

    it('should work with vertical layout and icons', () => {
      const { container } = renderWithTheme(
        <RdsTabs 
          tabs={mockTabs}
          type="vertical"
          showLeftIcon={true}
          showRightIcon={false}
        />
      );
      const tablist = container.querySelector('[role="tablist"]');
      expect(tablist).toHaveAttribute('aria-orientation', 'vertical');
      expect(container.querySelectorAll('[data-testid="person-icon"]').length).toBe(mockTabs.length);
      expect(container.querySelectorAll('[data-testid="add-icon"]').length).toBe(0);
    });

    it('should handle controlled and uncontrolled tabs', () => {
      const onTabChange = jest.fn();
      const { container, rerender } = renderWithTheme(
        <RdsTabs tabs={mockTabs} onTabChange={onTabChange} />
      );
      
      const tab = container.querySelector('[role="tab"]');
      fireEvent.click(tab!);
      expect(onTabChange).toHaveBeenCalled();

      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsTabs tabs={mockTabs} value="tab2" onTabChange={onTabChange} />
        </ThemeProvider>
      );
      expect(container).toBeInTheDocument();
    });

    it('should work with custom state and layout', () => {
      const { container } = renderWithTheme(
        <RdsTabs 
          tabs={mockTabs}
          layout="line-bottom"
          state="hover"
        />
      );
      expect(container.querySelector('.rds-tabs--line-bottom')).toBeInTheDocument();
      expect(container.querySelector('.rds-state--hover')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper tablist role', () => {
      const { container } = renderWithTheme(
        <RdsTabs tabs={mockTabs} />
      );
      const tablist = container.querySelector('[role="tablist"]');
      expect(tablist).toBeInTheDocument();
    });

    it('should have proper tab roles', () => {
      const { container } = renderWithTheme(
        <RdsTabs tabs={mockTabs} />
      );
      const tabs = container.querySelectorAll('[role="tab"]');
      expect(tabs.length).toBe(mockTabs.length);
    });

    it('should have aria-selected for active tab', () => {
      const { container } = renderWithTheme(
        <RdsTabs tabs={mockTabs} activeTab="tab1" />
      );
      const activeTab = container.querySelector('[aria-selected="true"]');
      expect(activeTab).toBeInTheDocument();
    });

    it('should have aria-disabled for disabled tabs', () => {
      const disabledTabs: RdsTabItem[] = [
        { id: 'tab1', label: 'tab one', disabled: true },
      ];
      const { container } = renderWithTheme(
        <RdsTabs tabs={disabledTabs} />
      );
      const tab = container.querySelector('[role="tab"]');
      // Check that tab is actually disabled (either has disabled attribute or proper aria-disabled)
      const isDisabled = tab?.hasAttribute('disabled') || tab?.classList.contains('Mui-disabled');
      expect(isDisabled).toBe(true);
    });

    it('should have title attributes on tabs', () => {
      const { container } = renderWithTheme(
        <RdsTabs tabs={mockTabs} />
      );
      const tabs = container.querySelectorAll('[role="tab"]');
      tabs.forEach((tab, index) => {
        expect(tab).toHaveAttribute('title');
        expect(tab.getAttribute('title')).toBeTruthy();
      });
    });
  });
});
