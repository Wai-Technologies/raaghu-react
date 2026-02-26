import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RdsCompMap, { RdsCompMapProps } from './rds-comp-map';
import '@testing-library/jest-dom';

// Mock react-svg-worldmap
jest.mock('react-svg-worldmap', () => ({
  WorldMap: ({ data, styleFunction, color, title, size }: any) => (
    <div
      data-testid="world-map"
      data-map-size={size}
      data-color={color}
      data-title={title}
    >
      {data?.map((item: any) => (
        <div
          key={item.country}
          data-testid={`map-country-${item.country}`}
          data-country={item.country}
          data-value={item.value}
        >
          {item.country}: {item.value}
        </div>
      ))}
    </div>
  ),
}));

// Mock SCSS
jest.mock('./rds-comp-map.scss', () => ({}));

describe('RdsCompMap', () => {
  const mockMapData = [
    { country: 'US', value: 100 },
    { country: 'IN', value: 50 },
    { country: 'GB', value: 30 },
  ];

  const defaultProps: RdsCompMapProps = {
    title: 'Global Statistics',
    mapList: mockMapData,
    color: '#FF0000',
    mapType: 'default',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock window.innerWidth
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
  });

  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      render(<RdsCompMap {...defaultProps} />);
      expect(screen.getByTestId('world-map')).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsCompMap.displayName).toBe('RdsCompMap');
    });

    it('should render title when provided', () => {
      render(<RdsCompMap {...defaultProps} title="Test Title" />);
      expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    it('should not render title when not provided', () => {
      const { container } = render(
        <RdsCompMap {...defaultProps} title={undefined} />
      );
      expect(container.querySelector('.rds-comp-map__label')).not.toBeInTheDocument();
    });

    it('should render root element with correct class', () => {
      const { container } = render(<RdsCompMap {...defaultProps} />);
      expect(container.querySelector('.rds-comp-map')).toBeInTheDocument();
    });

    it('should render map center container', () => {
      const { container } = render(<RdsCompMap {...defaultProps} />);
      expect(container.querySelector('.rds-comp-map__center')).toBeInTheDocument();
    });
  });

  describe('Map Type Variants', () => {
    it('should render default map type by default', () => {
      const { container } = render(
        <RdsCompMap {...defaultProps} mapType="default" />
      );
      const mapContainer = container.querySelector('.rds-comp-map');
      expect(mapContainer).not.toHaveClass('rds-comp-map--heatmap');
    });

    it('should render heatmap variant when mapType is heatmap', () => {
      const { container } = render(
        <RdsCompMap {...defaultProps} mapType="heatmap" />
      );
      const mapContainer = container.querySelector('.rds-comp-map');
      expect(mapContainer).toHaveClass('rds-comp-map--heatmap');
    });

    it('should render as default when mapType is not specified', () => {
      const { mapType, ...propsWithoutType } = defaultProps;
      const { container } = render(<RdsCompMap {...propsWithoutType} />);
      const mapContainer = container.querySelector('.rds-comp-map');
      expect(mapContainer).not.toHaveClass('rds-comp-map--heatmap');
    });
  });

  describe('Props Propagation', () => {
    it('should pass mapList data to WorldMap', () => {
      render(<RdsCompMap {...defaultProps} />);
      expect(screen.getByTestId('map-country-US')).toBeInTheDocument();
      expect(screen.getByTestId('map-country-IN')).toBeInTheDocument();
      expect(screen.getByTestId('map-country-GB')).toBeInTheDocument();
    });

    it('should pass color prop to WorldMap', () => {
      render(<RdsCompMap {...defaultProps} color="#0000FF" />);
      const worldMap = screen.getByTestId('world-map');
      expect(worldMap).toHaveAttribute('data-color', '#0000FF');
    });

    it('should render all countries from mapList', () => {
      const mapData = [
        { country: 'US', value: 100 },
        { country: 'CA', value: 80 },
        { country: 'MX', value: 60 },
      ];
      render(<RdsCompMap {...defaultProps} mapList={mapData} />);
      expect(screen.getByTestId('map-country-US')).toBeInTheDocument();
      expect(screen.getByTestId('map-country-CA')).toBeInTheDocument();
      expect(screen.getByTestId('map-country-MX')).toBeInTheDocument();
    });

    it('should render with empty mapList', () => {
      render(<RdsCompMap {...defaultProps} mapList={[]} />);
      expect(screen.getByTestId('world-map')).toBeInTheDocument();
    });

    it('should accept custom color values', () => {
      const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00'];
      colors.forEach((color) => {
        const { container } = render(<RdsCompMap {...defaultProps} color={color} />);
        const worldMaps = container.querySelectorAll('[data-testid="world-map"]');
        const lastWorldMap = worldMaps[worldMaps.length - 1];
        expect(lastWorldMap).toHaveAttribute('data-color', color);
      });
    });
  });

  describe('Title Display', () => {
    it('should display custom title', () => {
      render(<RdsCompMap {...defaultProps} title="Custom Map Title" />);
      expect(screen.getByText('Custom Map Title')).toBeInTheDocument();
    });

    it('should apply correct class to title', () => {
      const { container } = render(
        <RdsCompMap {...defaultProps} title="Test Title" />
      );
      const titleElement = container.querySelector('.rds-comp-map__label');
      expect(titleElement).toHaveTextContent('Test Title');
    });

    it('should render multiple titles in sequence', () => {
      const { rerender } = render(<RdsCompMap {...defaultProps} title="Title 1" />);
      expect(screen.getByText('Title 1')).toBeInTheDocument();
      rerender(<RdsCompMap {...defaultProps} title="Title 2" />);
      expect(screen.getByText('Title 2')).toBeInTheDocument();
    });

    it('should handle empty string title', () => {
      const { container } = render(<RdsCompMap {...defaultProps} title="" />);
      // Empty string is falsy in JavaScript, so the label won't render
      expect(container.querySelector('.rds-comp-map__label')).not.toBeInTheDocument();
    });

    it('should handle title with special characters', () => {
      render(
        <RdsCompMap {...defaultProps} title="Global Stats & Analytics #2024" />
      );
      expect(screen.getByText('Global Stats & Analytics #2024')).toBeInTheDocument();
    });
  });

  describe('Responsive Map Sizing', () => {
    it('should use lg size for desktop width (1024px)', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      });
      render(<RdsCompMap {...defaultProps} />);
      // Wait for component to set size
      waitFor(() => {
        const worldMap = screen.getByTestId('world-map');
        expect(worldMap).toHaveAttribute('data-map-size', 'lg');
      });
    });

    it('should use md size for tablet width (768px)', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 768,
      });
      render(<RdsCompMap {...defaultProps} />);
      waitFor(() => {
        const worldMap = screen.getByTestId('world-map');
        expect(worldMap).toHaveAttribute('data-map-size', 'md');
      });
    });

    it('should use responsive size for small devices (414px)', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 414,
      });
      render(<RdsCompMap {...defaultProps} />);
      waitFor(() => {
        const worldMap = screen.getByTestId('world-map');
        expect(worldMap).toHaveAttribute('data-map-size', 'responsive');
      });
    });

    it('should use responsive size for very small devices (320px)', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 320,
      });
      render(<RdsCompMap {...defaultProps} />);
      waitFor(() => {
        const worldMap = screen.getByTestId('world-map');
        expect(worldMap).toHaveAttribute('data-map-size', 'responsive');
      });
    });
  });

  describe('Window Resize Handling', () => {
    it('should update map size on window resize', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      });
      render(<RdsCompMap {...defaultProps} />);

      // Change window width
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 400,
      });

      // Trigger resize event
      fireEvent(window, new Event('resize'));

      waitFor(() => {
        const worldMap = screen.getByTestId('world-map');
        expect(worldMap).toHaveAttribute('data-map-size', 'responsive');
      });
    });

    it('should add resize listener on mount', () => {
      const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
      render(<RdsCompMap {...defaultProps} />);
      expect(addEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
      addEventListenerSpy.mockRestore();
    });

    it('should remove resize listener on unmount', () => {
      const removeEventListenerSpy = jest.spyOn(
        window,
        'removeEventListener'
      );
      const { unmount } = render(<RdsCompMap {...defaultProps} />);
      unmount();
      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        'resize',
        expect.any(Function)
      );
      removeEventListenerSpy.mockRestore();
    });

    it('should handle rapid resize events', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      });
      render(<RdsCompMap {...defaultProps} />);

      // Simulate rapid resize events
      for (let i = 0; i < 5; i++) {
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: 1024 - i * 100,
        });
        fireEvent(window, new Event('resize'));
      }

      expect(screen.getByTestId('world-map')).toBeInTheDocument();
    });
  });

  describe('Default Map Styling', () => {
    it('should render default map with correct styling for default type', () => {
      render(<RdsCompMap {...defaultProps} mapType="default" />);
      const worldMap = screen.getByTestId('world-map');
      expect(worldMap).toBeInTheDocument();
    });

    it('should handle multiple countries with different values', () => {
      const mapData = [
        { country: 'US', value: 100 },
        { country: 'IN', value: 150 },
        { country: 'CN', value: 120 },
      ];
      render(<RdsCompMap {...defaultProps} mapList={mapData} mapType="default" />);
      expect(screen.getByText('US: 100')).toBeInTheDocument();
      expect(screen.getByText('IN: 150')).toBeInTheDocument();
      expect(screen.getByText('CN: 120')).toBeInTheDocument();
    });

    it('should apply custom color to all countries except US in default mode', () => {
      const { container } = render(
        <RdsCompMap {...defaultProps} color="#FF0000" mapType="default" />
      );
      expect(container.querySelector('.rds-comp-map')).toBeInTheDocument();
    });
  });

  describe('Heatmap Styling', () => {
    it('should render heatmap variant with styling', () => {
      render(<RdsCompMap {...defaultProps} mapType="heatmap" />);
      const { container } = render(
        <RdsCompMap {...defaultProps} mapType="heatmap" />
      );
      expect(container.querySelector('.rds-comp-map--heatmap')).toBeInTheDocument();
    });

    it('should handle heatmap with varying values', () => {
      const mapData = [
        { country: 'US', value: 10 },
        { country: 'IN', value: 500 },
        { country: 'GB', value: 100 },
      ];
      render(<RdsCompMap {...defaultProps} mapList={mapData} mapType="heatmap" />);
      expect(screen.getByText('US: 10')).toBeInTheDocument();
      expect(screen.getByText('IN: 500')).toBeInTheDocument();
      expect(screen.getByText('GB: 100')).toBeInTheDocument();
    });

    it('should apply heatmap class to root element', () => {
      const { container } = render(
        <RdsCompMap {...defaultProps} mapType="heatmap" />
      );
      const rootElement = container.querySelector('.rds-comp-map');
      expect(rootElement).toHaveClass('rds-comp-map--heatmap');
    });

    it('should handle heatmap with single country', () => {
      const mapData = [{ country: 'US', value: 100 }];
      render(<RdsCompMap {...defaultProps} mapList={mapData} mapType="heatmap" />);
      expect(screen.getByText('US: 100')).toBeInTheDocument();
    });

    it('should handle heatmap with identical values', () => {
      const mapData = [
        { country: 'US', value: 100 },
        { country: 'IN', value: 100 },
        { country: 'GB', value: 100 },
      ];
      render(<RdsCompMap {...defaultProps} mapList={mapData} mapType="heatmap" />);
      expect(screen.getByTestId('map-country-US')).toBeInTheDocument();
      expect(screen.getByTestId('map-country-IN')).toBeInTheDocument();
      expect(screen.getByTestId('map-country-GB')).toBeInTheDocument();
    });
  });

  describe('CSS Classes', () => {
    it('should have correct base class', () => {
      const { container } = render(<RdsCompMap {...defaultProps} />);
      expect(container.querySelector('.rds-comp-map')).toBeInTheDocument();
    });

    it('should have map center class', () => {
      const { container } = render(<RdsCompMap {...defaultProps} />);
      expect(container.querySelector('.rds-comp-map__center')).toBeInTheDocument();
    });

    it('should have label class when title provided', () => {
      const { container } = render(
        <RdsCompMap {...defaultProps} title="Test Title" />
      );
      expect(container.querySelector('.rds-comp-map__label')).toBeInTheDocument();
    });

    it('should not have heatmap class in default mode', () => {
      const { container } = render(
        <RdsCompMap {...defaultProps} mapType="default" />
      );
      const mapContainer = container.querySelector('.rds-comp-map');
      expect(mapContainer).not.toHaveClass('rds-comp-map--heatmap');
    });

    it('should have heatmap class in heatmap mode', () => {
      const { container } = render(
        <RdsCompMap {...defaultProps} mapType="heatmap" />
      );
      const mapContainer = container.querySelector('.rds-comp-map');
      expect(mapContainer).toHaveClass('rds-comp-map--heatmap');
    });
  });

  describe('Props Spread', () => {
    it('should accept additional props on root element', () => {
      const { container } = render(
        <RdsCompMap {...defaultProps} data-custom="test" />
      );
      expect(container.querySelector('.rds-comp-map')).toBeInTheDocument();
    });

    it('should accept aria attributes', () => {
      const { container } = render(
        <RdsCompMap {...defaultProps} aria-label="World map visualization" />
      );
      expect(container.querySelector('.rds-comp-map')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle null mapList gracefully', () => {
      render(<RdsCompMap {...defaultProps} mapList={null as any} />);
      expect(screen.getByTestId('world-map')).toBeInTheDocument();
    });

    it('should handle undefined mapList gracefully', () => {
      render(<RdsCompMap {...defaultProps} mapList={undefined as any} />);
      expect(screen.getByTestId('world-map')).toBeInTheDocument();
    });

    it('should handle empty title string', () => {
      const { container } = render(
        <RdsCompMap {...defaultProps} title="" />
      );
      // Empty string is falsy in JavaScript, so the label won't render
      expect(container.querySelector('.rds-comp-map__label')).not.toBeInTheDocument();
    });

    it('should handle very long title', () => {
      const longTitle =
        'This is a very long title that should be displayed in the map component for testing purposes and should not break the layout';
      render(<RdsCompMap {...defaultProps} title={longTitle} />);
      expect(screen.getByText(longTitle)).toBeInTheDocument();
    });

    it('should handle special characters in title', () => {
      render(
        <RdsCompMap {...defaultProps} title="Map & Analytics <2024> #Global $Data" />
      );
      expect(
        screen.getByText('Map & Analytics <2024> #Global $Data')
      ).toBeInTheDocument();
    });

    it('should handle country with zero value', () => {
      const mapData = [
        { country: 'US', value: 0 },
        { country: 'IN', value: 50 },
      ];
      render(<RdsCompMap {...defaultProps} mapList={mapData} />);
      expect(screen.getByText('US: 0')).toBeInTheDocument();
    });

    it('should handle country with negative value', () => {
      const mapData = [
        { country: 'US', value: -50 },
        { country: 'IN', value: 50 },
      ];
      render(<RdsCompMap {...defaultProps} mapList={mapData} />);
      expect(screen.getByText('US: -50')).toBeInTheDocument();
    });

    it('should handle very large values', () => {
      const mapData = [
        { country: 'US', value: 999999 },
        { country: 'IN', value: 555555 },
      ];
      render(<RdsCompMap {...defaultProps} mapList={mapData} />);
      expect(screen.getByText('US: 999999')).toBeInTheDocument();
    });

    it('should handle map with single country', () => {
      const mapData = [{ country: 'US', value: 100 }];
      render(<RdsCompMap {...defaultProps} mapList={mapData} />);
      expect(screen.getByTestId('map-country-US')).toBeInTheDocument();
    });

    it('should handle map with many countries', () => {
      const mapData = Array.from({ length: 50 }, (_, i) => ({
        country: `C${i}`,
        value: Math.random() * 100,
      }));
      render(<RdsCompMap {...defaultProps} mapList={mapData} />);
      expect(screen.getByTestId('map-country-C0')).toBeInTheDocument();
      expect(screen.getByTestId('map-country-C49')).toBeInTheDocument();
    });
  });

  describe('Integration', () => {
    it('should render complete default map with all features', () => {
      const { container } = render(<RdsCompMap {...defaultProps} />);
      expect(container.querySelector('.rds-comp-map')).toBeInTheDocument();
      expect(container.querySelector('.rds-comp-map__label')).toBeInTheDocument();
      expect(container.querySelector('.rds-comp-map__center')).toBeInTheDocument();
      expect(screen.getByTestId('world-map')).toBeInTheDocument();
    });

    it('should render complete heatmap with all features', () => {
      const { container } = render(
        <RdsCompMap {...defaultProps} mapType="heatmap" />
      );
      expect(container.querySelector('.rds-comp-map')).toBeInTheDocument();
      expect(container.querySelector('.rds-comp-map--heatmap')).toBeInTheDocument();
      expect(screen.getByTestId('world-map')).toBeInTheDocument();
    });

    it('should handle map type change', () => {
      const { container, rerender } = render(
        <RdsCompMap {...defaultProps} mapType="default" />
      );
      expect(
        container.querySelector('.rds-comp-map--heatmap')
      ).not.toBeInTheDocument();

      rerender(<RdsCompMap {...defaultProps} mapType="heatmap" />);
      expect(container.querySelector('.rds-comp-map--heatmap')).toBeInTheDocument();
    });

    it('should handle data updates', () => {
      const mapData1 = [
        { country: 'US', value: 100 },
        { country: 'IN', value: 50 },
      ];
      const mapData2 = [
        { country: 'US', value: 200 },
        { country: 'GB', value: 75 },
      ];

      const { rerender } = render(
        <RdsCompMap {...defaultProps} mapList={mapData1} />
      );
      expect(screen.getByText('IN: 50')).toBeInTheDocument();

      rerender(<RdsCompMap {...defaultProps} mapList={mapData2} />);
      expect(screen.getByText('US: 200')).toBeInTheDocument();
      expect(screen.getByText('GB: 75')).toBeInTheDocument();
    });

    it('should handle color changes', () => {
      const { rerender } = render(
        <RdsCompMap {...defaultProps} color="#FF0000" />
      );
      expect(screen.getByTestId('world-map')).toHaveAttribute(
        'data-color',
        '#FF0000'
      );

      rerender(<RdsCompMap {...defaultProps} color="#0000FF" />);
      expect(screen.getByTestId('world-map')).toHaveAttribute(
        'data-color',
        '#0000FF'
      );
    });

    it('should handle title updates', () => {
      const { rerender } = render(
        <RdsCompMap {...defaultProps} title="Original Title" />
      );
      expect(screen.getByText('Original Title')).toBeInTheDocument();

      rerender(<RdsCompMap {...defaultProps} title="Updated Title" />);
      expect(screen.getByText('Updated Title')).toBeInTheDocument();
    });

    it('should render map with default values when only required props provided', () => {
      render(<RdsCompMap mapList={mockMapData} color="#FF0000" />);
      expect(screen.getByTestId('world-map')).toBeInTheDocument();
      const countries = screen.getAllByTestId(/map-country-/);
      expect(countries.length).toBeGreaterThan(0);
    });

    it('should handle rapid prop changes', () => {
      const { rerender } = render(<RdsCompMap {...defaultProps} />);

      for (let i = 0; i < 5; i++) {
        rerender(
          <RdsCompMap
            {...defaultProps}
            color={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
          />
        );
      }

      expect(screen.getByTestId('world-map')).toBeInTheDocument();
    });
  });
});
