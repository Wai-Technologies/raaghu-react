import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import RdsTimeline, { RdsTimelineItem } from './rds-timeline';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';

// Mock SCSS
jest.mock('./rds-timeline.scss', () => ({}));

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

const mockItems: RdsTimelineItem[] = [
  {
    id: 1,
    title: 'Event 1',
    description: 'First event description',
    time: '10:00 AM',
    color: 'primary',
  },
  {
    id: 2,
    title: 'Event 2',
    description: 'Second event description',
    time: '02:00 PM',
    color: 'secondary',
  },
  {
    id: 3,
    title: 'Event 3',
    time: '06:00 PM',
    color: 'success',
  },
];

describe('RdsTimeline', () => {
  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      const { container } = renderWithTheme(
        <RdsTimeline items={mockItems} />
      );
      expect(container).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsTimeline.displayName).toBe('RdsTimeline');
    });

    it('should render MuiTimeline component', () => {
      const { container } = renderWithTheme(
        <RdsTimeline items={mockItems} />
      );
      const timeline = container.querySelector('[class*="MuiTimeline"]');
      expect(timeline).toBeInTheDocument();
    });

    it('should render without items', () => {
      const { container } = renderWithTheme(
        <RdsTimeline items={[]} />
      );
      expect(container.querySelector('[class*="MuiTimeline"]')).toBeInTheDocument();
    });
  });

  describe('Items Rendering', () => {
    it('should render all timeline items', () => {
      renderWithTheme(
        <RdsTimeline items={mockItems} />
      );
      expect(screen.getByText('Event 1')).toBeInTheDocument();
      expect(screen.getByText('Event 2')).toBeInTheDocument();
      expect(screen.getByText('Event 3')).toBeInTheDocument();
    });

    it('should render correct number of timeline items', () => {
      const { container } = renderWithTheme(
        <RdsTimeline items={mockItems} />
      );
      const timelineItems = container.querySelectorAll('[class*="MuiTimelineItem"]');
      expect(timelineItems.length).toBe(3);
    });

    it('should render single item', () => {
      const singleItem = [mockItems[0]];
      renderWithTheme(
        <RdsTimeline items={singleItem} />
      );
      expect(screen.getByText('Event 1')).toBeInTheDocument();
    });
  });

  describe('Item Properties', () => {
    it('should render item title', () => {
      renderWithTheme(
        <RdsTimeline items={mockItems} />
      );
      expect(screen.getByText('Event 1')).toBeInTheDocument();
      expect(screen.getByText('Event 2')).toBeInTheDocument();
    });

    it('should render item description when provided', () => {
      renderWithTheme(
        <RdsTimeline items={mockItems} />
      );
      expect(screen.getByText('First event description')).toBeInTheDocument();
      expect(screen.getByText('Second event description')).toBeInTheDocument();
    });

    it('should not render description when not provided', () => {
      const itemsWithoutDescription = [
        {
          id: 1,
          title: 'Event without description',
        },
      ];
      const { container } = renderWithTheme(
        <RdsTimeline items={itemsWithoutDescription} />
      );
      expect(screen.getByText('Event without description')).toBeInTheDocument();
      expect(container.querySelector('[style*="marginTop"]')).not.toBeInTheDocument();
    });

    it('should render time when showTime is true', () => {
      renderWithTheme(
        <RdsTimeline items={mockItems} showTime={true} />
      );
      expect(screen.getByText('10:00 AM')).toBeInTheDocument();
      expect(screen.getByText('02:00 PM')).toBeInTheDocument();
    });

    it('should not render time when showTime is false', () => {
      renderWithTheme(
        <RdsTimeline items={mockItems} showTime={false} />
      );
      expect(screen.queryByText('10:00 AM')).not.toBeInTheDocument();
    });

    it('should not render time when time is not provided', () => {
      const itemsWithoutTime = [
        {
          id: 1,
          title: 'Event without time',
        },
      ];
      renderWithTheme(
        <RdsTimeline items={itemsWithoutTime} showTime={true} />
      );
      expect(screen.getByText('Event without time')).toBeInTheDocument();
    });
  });

  describe('Timeline Positioning', () => {
    it('should have right position by default', () => {
      const { container } = renderWithTheme(
        <RdsTimeline items={mockItems} />
      );
      const timeline = container.querySelector('[class*="MuiTimeline"]');
      expect(timeline).toBeInTheDocument();
      // Default position is 'right' when alternating is false
      const items = container.querySelectorAll('[class*="MuiTimelineItem"]');
      expect(items.length).toBe(mockItems.length);
    });

    it('should use alternate position when alternating is true', () => {
      const { container } = renderWithTheme(
        <RdsTimeline items={mockItems} alternating={true} />
      );
      const timeline = container.querySelector('[class*="MuiTimeline"]');
      expect(timeline).toBeInTheDocument();
      // Verify timeline renders with multiple items (alternating will position them differently)
      const items = container.querySelectorAll('[class*="MuiTimelineItem"]');
      expect(items.length).toBe(mockItems.length);
    });

    it('should respect custom position prop', () => {
      const { container } = renderWithTheme(
        <RdsTimeline items={mockItems} position="left" />
      );
      const timeline = container.querySelector('[class*="MuiTimeline"]');
      expect(timeline).toBeInTheDocument();
      // When position is 'left', items should still render correctly
      const items = container.querySelectorAll('[class*="MuiTimelineItem"]');
      expect(items.length).toBe(mockItems.length);
    });

    it('should prioritize position prop over alternating', () => {
      const { container } = renderWithTheme(
        <RdsTimeline items={mockItems} alternating={true} position="left" />
      );
      const timeline = container.querySelector('[class*="MuiTimeline"]');
      expect(timeline).toBeInTheDocument();
      // Position prop should take precedence over alternating
      const items = container.querySelectorAll('[class*="MuiTimelineItem"]');
      expect(items.length).toBe(mockItems.length);
    });
  });

  describe('Timeline Structure', () => {
    it('should render timeline dots for each item', () => {
      const { container } = renderWithTheme(
        <RdsTimeline items={mockItems} />
      );
      const dots = container.querySelectorAll('[class*="MuiTimelineDot"]');
      expect(dots.length).toBe(mockItems.length);
    });

    it('should render timeline separators for each item', () => {
      const { container } = renderWithTheme(
        <RdsTimeline items={mockItems} />
      );
      const separators = container.querySelectorAll('[class*="MuiTimelineSeparator"]');
      expect(separators.length).toBe(mockItems.length);
    });

    it('should render connectors between items except the last', () => {
      const { container } = renderWithTheme(
        <RdsTimeline items={mockItems} />
      );
      const connectors = container.querySelectorAll('[class*="MuiTimelineConnector"]');
      expect(connectors.length).toBe(mockItems.length - 1);
    });

    it('should not render connector for single item', () => {
      const singleItem = [mockItems[0]];
      const { container } = renderWithTheme(
        <RdsTimeline items={singleItem} />
      );
      const connectors = container.querySelectorAll('[class*="MuiTimelineConnector"]');
      expect(connectors.length).toBe(0);
    });

    it('should render timeline content for each item', () => {
      const { container } = renderWithTheme(
        <RdsTimeline items={mockItems} />
      );
      const contents = container.querySelectorAll('[class*="MuiTimelineContent"]');
      expect(contents.length).toBe(mockItems.length);
    });
  });

  describe('Dot Colors', () => {
    it('should apply primary color to dot', () => {
      const itemsWithPrimary = [
        {
          id: 1,
          title: 'Primary Event',
          color: 'primary' as const,
        },
      ];
      const { container } = renderWithTheme(
        <RdsTimeline items={itemsWithPrimary} />
      );
      const dot = container.querySelector('[class*="MuiTimelineDot"]');
      // MUI applies filledPrimary class for filled variant
      expect(dot).toHaveClass('MuiTimelineDot-filledPrimary');
    });

    it('should apply secondary color to dot', () => {
      const itemsWithSecondary = [
        {
          id: 1,
          title: 'Secondary Event',
          color: 'secondary' as const,
        },
      ];
      const { container } = renderWithTheme(
        <RdsTimeline items={itemsWithSecondary} />
      );
      const dot = container.querySelector('[class*="MuiTimelineDot"]');
      // MUI applies filledSecondary class for filled variant
      expect(dot).toHaveClass('MuiTimelineDot-filledSecondary');
    });

    it('should apply success color to dot', () => {
      const itemsWithSuccess = [
        {
          id: 1,
          title: 'Success Event',
          color: 'success' as const,
        },
      ];
      const { container } = renderWithTheme(
        <RdsTimeline items={itemsWithSuccess} />
      );
      const dot = container.querySelector('[class*="MuiTimelineDot"]');
      // MUI applies filledSuccess class for filled variant
      expect(dot).toHaveClass('MuiTimelineDot-filledSuccess');
    });

    it('should apply error color to dot', () => {
      const itemsWithError = [
        {
          id: 1,
          title: 'Error Event',
          color: 'error' as const,
        },
      ];
      const { container } = renderWithTheme(
        <RdsTimeline items={itemsWithError} />
      );
      const dot = container.querySelector('[class*="MuiTimelineDot"]');
      // MUI applies filledError class for filled variant
      expect(dot).toHaveClass('MuiTimelineDot-filledError');
    });

    it('should apply warning color to dot', () => {
      const itemsWithWarning = [
        {
          id: 1,
          title: 'Warning Event',
          color: 'warning' as const,
        },
      ];
      const { container } = renderWithTheme(
        <RdsTimeline items={itemsWithWarning} />
      );
      const dot = container.querySelector('[class*="MuiTimelineDot"]');
      // MUI applies filledWarning class for filled variant
      expect(dot).toHaveClass('MuiTimelineDot-filledWarning');
    });
  });

  describe('Dot Variants', () => {
    it('should apply filled variant by default', () => {
      const { container } = renderWithTheme(
        <RdsTimeline items={mockItems} />
      );
      const dots = container.querySelectorAll('[class*="MuiTimelineDot"]');
      expect(dots[0]).toHaveClass('MuiTimelineDot-filled');
    });

    it('should apply outlined variant when specified', () => {
      const itemsOutlined = [
        {
          id: 1,
          title: 'Outlined Event',
          variant: 'outlined' as const,
        },
      ];
      const { container } = renderWithTheme(
        <RdsTimeline items={itemsOutlined} />
      );
      const dot = container.querySelector('[class*="MuiTimelineDot"]');
      expect(dot).toHaveClass('MuiTimelineDot-outlined');
    });
  });

  describe('Icons', () => {
    it('should render icon when provided', () => {
      const itemsWithIcon = [
        {
          id: 1,
          title: 'Event with icon',
          icon: <span data-testid="test-icon">✓</span>,
        },
      ];
      renderWithTheme(
        <RdsTimeline items={itemsWithIcon} />
      );
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });

    it('should not render icon when not provided', () => {
      const itemsWithoutIcon = [
        {
          id: 1,
          title: 'Event without icon',
        },
      ];
      const { container } = renderWithTheme(
        <RdsTimeline items={itemsWithoutIcon} />
      );
      const dot = container.querySelector('[class*="MuiTimelineDot"]');
      expect(dot?.textContent).toBe('');
    });

    it('should support React elements as icons', () => {
      const itemsWithReactIcon = [
        {
          id: 1,
          title: 'Event',
          icon: <div data-testid="react-icon">📌</div>,
        },
      ];
      renderWithTheme(
        <RdsTimeline items={itemsWithReactIcon} />
      );
      expect(screen.getByTestId('react-icon')).toBeInTheDocument();
    });
  });

  describe('Custom Props', () => {
    it('should pass through custom className', () => {
      const { container } = renderWithTheme(
        <RdsTimeline items={mockItems} className="custom-timeline" />
      );
      const timeline = container.querySelector('[class*="MuiTimeline"]');
      expect(timeline).toHaveClass('custom-timeline');
    });

    it('should pass through other MUI props', () => {
      const { container } = renderWithTheme(
        <RdsTimeline items={mockItems} data-testid="custom-timeline" />
      );
      expect(container.querySelector('[data-testid="custom-timeline"]')).toBeInTheDocument();
    });

    it('should apply custom style', () => {
      const customStyle = { padding: '20px', margin: '10px' };
      const { container } = renderWithTheme(
        <RdsTimeline items={mockItems} style={customStyle} />
      );
      const timeline = container.querySelector('[class*="MuiTimeline"]') as HTMLElement;
      expect(timeline).toHaveStyle('padding: 20px');
      expect(timeline).toHaveStyle('margin: 10px');
    });
  });

  describe('Edge Cases', () => {
    it('should handle items with same id', () => {
      const itemsWithSameId = [
        {
          id: 1,
          title: 'First Event',
        },
        {
          id: 1,
          title: 'Second Event',
        },
      ];
      renderWithTheme(
        <RdsTimeline items={itemsWithSameId} />
      );
      expect(screen.getByText('First Event')).toBeInTheDocument();
      expect(screen.getByText('Second Event')).toBeInTheDocument();
    });

    it('should handle numeric and string ids', () => {
      const itemsMixedIds = [
        {
          id: 1,
          title: 'Numeric ID',
        },
        {
          id: 'string-id',
          title: 'String ID',
        },
      ];
      renderWithTheme(
        <RdsTimeline items={itemsMixedIds} />
      );
      expect(screen.getByText('Numeric ID')).toBeInTheDocument();
      expect(screen.getByText('String ID')).toBeInTheDocument();
    });

    it('should handle very long titles', () => {
      const longTitle = 'A'.repeat(500);
      const longTitleItems = [
        {
          id: 1,
          title: longTitle,
        },
      ];
      renderWithTheme(
        <RdsTimeline items={longTitleItems} />
      );
      expect(screen.getByText(longTitle)).toBeInTheDocument();
    });

    it('should handle special characters in title', () => {
      const specialItems = [
        {
          id: 1,
          title: 'Event <>&"\'',
        },
      ];
      renderWithTheme(
        <RdsTimeline items={specialItems} />
      );
      expect(screen.getByText('Event <>&"\'', { exact: false })).toBeInTheDocument();
    });

    it('should handle unicode characters in description', () => {
      const unicodeItems = [
        {
          id: 1,
          title: 'Unicode Event',
          description: '日本語テキスト 🎯 مرحبا',
        },
      ];
      renderWithTheme(
        <RdsTimeline items={unicodeItems} />
      );
      expect(screen.getByText('日本語テキスト 🎯 مرحبا')).toBeInTheDocument();
    });

    it('should handle empty string properties', () => {
      const emptyItems = [
        {
          id: 1,
          title: 'Title',
          description: '',
          time: '',
        },
      ];
      renderWithTheme(
        <RdsTimeline items={emptyItems} showTime={true} />
      );
      expect(screen.getByText('Title')).toBeInTheDocument();
    });
  });

  describe('Theme Support', () => {
    it('should work with light theme', () => {
      const { container } = renderWithTheme(
        <RdsTimeline items={mockItems} />,
        false
      );
      const timeline = container.querySelector('[class*="MuiTimeline"]');
      expect(timeline).toBeInTheDocument();
    });

    it('should work with dark theme', () => {
      const { container } = renderWithTheme(
        <RdsTimeline items={mockItems} />,
        true
      );
      const timeline = container.querySelector('[class*="MuiTimeline"]');
      expect(timeline).toBeInTheDocument();
    });
  });

  describe('Integration Tests', () => {
    it('should render complete timeline with all features', () => {
      const completeItems: RdsTimelineItem[] = [
        {
          id: 1,
          title: 'Project Started',
          description: 'Initial setup and planning',
          time: '09:00 AM',
          icon: <span data-testid="icon-1">🚀</span>,
          color: 'primary',
          variant: 'filled',
        },
        {
          id: 2,
          title: 'Development Phase',
          description: 'Building the application',
          time: '01:00 PM',
          icon: <span data-testid="icon-2">💻</span>,
          color: 'secondary',
          variant: 'outlined',
        },
        {
          id: 3,
          title: 'Testing',
          description: 'Quality assurance',
          time: '05:00 PM',
          icon: <span data-testid="icon-3">✅</span>,
          color: 'success',
          variant: 'filled',
        },
      ];

      const { container } = renderWithTheme(
        <RdsTimeline
          items={completeItems}
          showTime={true}
          alternating={true}
          className="complete-timeline"
        />
      );

      // Verify timeline is rendered
      expect(container.querySelector('.complete-timeline')).toBeInTheDocument();

      // Verify all items are present
      expect(screen.getByText('Project Started')).toBeInTheDocument();
      expect(screen.getByText('Development Phase')).toBeInTheDocument();
      expect(screen.getByText('Testing')).toBeInTheDocument();

      // Verify descriptions
      expect(screen.getByText('Initial setup and planning')).toBeInTheDocument();

      // Verify times
      expect(screen.getByText('09:00 AM')).toBeInTheDocument();

      // Verify icons
      expect(screen.getByTestId('icon-1')).toBeInTheDocument();
      expect(screen.getByTestId('icon-2')).toBeInTheDocument();
      expect(screen.getByTestId('icon-3')).toBeInTheDocument();

      // Verify structure
      const dots = container.querySelectorAll('[class*="MuiTimelineDot"]');
      expect(dots.length).toBe(3);

      const connectors = container.querySelectorAll('[class*="MuiTimelineConnector"]');
      expect(connectors.length).toBe(2);
    });

    it('should handle dynamically added items', () => {
      const { rerender, container } = renderWithTheme(
        <RdsTimeline items={[mockItems[0]]} />
      );

      expect(screen.getByText('Event 1')).toBeInTheDocument();

      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsTimeline items={[mockItems[0], mockItems[1]]} />
        </ThemeProvider>
      );

      expect(screen.getByText('Event 1')).toBeInTheDocument();
      expect(screen.getByText('Event 2')).toBeInTheDocument();

      const timelineItems = container.querySelectorAll('[class*="MuiTimelineItem"]');
      expect(timelineItems.length).toBe(2);
    });

    it('should toggle showTime feature', () => {
      const { rerender } = renderWithTheme(
        <RdsTimeline items={mockItems} showTime={false} />
      );

      expect(screen.queryByText('10:00 AM')).not.toBeInTheDocument();

      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsTimeline items={mockItems} showTime={true} />
        </ThemeProvider>
      );

      expect(screen.getByText('10:00 AM')).toBeInTheDocument();
    });

    it('should change position dynamically', () => {
      const { rerender, container } = renderWithTheme(
        <RdsTimeline items={mockItems} position="right" />
      );

      let timeline = container.querySelector('[class*="MuiTimeline"]');
      expect(timeline).toBeInTheDocument();
      let items = container.querySelectorAll('[class*="MuiTimelineItem"]');
      expect(items.length).toBe(mockItems.length);

      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsTimeline items={mockItems} position="left" />
        </ThemeProvider>
      );

      timeline = container.querySelector('[class*="MuiTimeline"]');
      expect(timeline).toBeInTheDocument();
      items = container.querySelectorAll('[class*="MuiTimelineItem"]');
      expect(items.length).toBe(mockItems.length);
    });

    it('should handle filtered items', () => {
      const filteredItems = mockItems.filter(item => 
        item.color === 'primary' || item.color === 'success'
      );

      renderWithTheme(
        <RdsTimeline items={filteredItems} />
      );

      expect(screen.getByText('Event 1')).toBeInTheDocument();
      expect(screen.getByText('Event 3')).toBeInTheDocument();
      expect(screen.queryByText('Event 2')).not.toBeInTheDocument();
    });

    it('should maintain order of items', () => {
      const { container } = renderWithTheme(
        <RdsTimeline items={mockItems} />
      );

      const timelineContents = container.querySelectorAll('[class*="MuiTimelineContent"]');
      expect(timelineContents[0]).toHaveTextContent('Event 1');
      expect(timelineContents[1]).toHaveTextContent('Event 2');
      expect(timelineContents[2]).toHaveTextContent('Event 3');
    });
  });

  describe('Accessibility', () => {
    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsTimeline items={[]} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
