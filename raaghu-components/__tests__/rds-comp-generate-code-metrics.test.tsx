import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompGenerateCodeMetrics, { RdsCompGenerateCodeMetricsProps } from '../src/rds-comp-generate-code-metrics/rds-comp-generate-code-metrics';

// Mock CSS import
jest.mock('../src/rds-comp-generate-code-metrics/rds-comp-generate-code-metrics.css', () => ({}));

// Mock TooltipStyle import
jest.mock('../../raaghu-elements/src/rds-tooltip/rds-tooltip', () => ({
  TooltipStyle: {
    MiddleTopArrow: 'middle-top-arrow'
  }
}));

// Mock RDS elements
jest.mock('../src/rds-elements', () => ({
  RdsCompIcon: ({ 
    name, 
    onClick, 
    isCursorPointer,
    tooltip,
    tooltipTitle,
    style, // Accept style but don't pass it to React
    ...props 
  }: any) => {
    // Filter out the style prop to prevent React validation errors
    const { style: _, ...safeProps } = props;
    return (
      <div 
        data-testid={`icon-${name}`} 
        onClick={onClick}
        title={tooltip ? tooltipTitle : undefined}
        className={isCursorPointer ? 'cursor-pointer' : 'cursor-default'}
        {...safeProps}
      >
        {name}
      </div>
    );
  },
  RdsCarousel: ({ 
    carouselItems,
    Indicators,
    controls,
    style, // Accept style prop but don't pass it to React
    state,
    type,
    chevronColor,
    chevronHeight,
    chevronWidth,
    ...props 
  }: any) => {
    // Filter out any problematic props that might cause React validation errors
    const { style: _, ...safeProps } = props;
    return (
      <div 
        data-testid="carousel"
        data-style={style}
        data-state={state}
        data-type={type}
        {...safeProps}
      >
        {carouselItems && carouselItems.map((item: any, index: number) => (
          <div key={index} data-testid={`carousel-item-${index}`} className="carousel-item">
            <img src={item.imgUrl} alt={item.name} />
            <div className="carousel-caption">
              <h5>{item.name}</h5>
              <p>{item.subTitle}</p>
            </div>
          </div>
        ))}
        {Indicators && <div data-testid="carousel-indicators"></div>}
        {controls && (
          <>
            <button data-testid="carousel-prev">Previous</button>
            <button data-testid="carousel-next">Next</button>
          </>
        )}
      </div>
    );
  }
}));

describe('RdsCompGenerateCodeMetrics', () => {
  const defaultProps: RdsCompGenerateCodeMetricsProps = {};

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
  // 1. Basic Rendering Tests
  it('should render the component with metrics information', () => {
    render(<RdsCompGenerateCodeMetrics {...defaultProps} />);
    
    // Check for metrics container
    expect(screen.getByText('Pages Created')).toBeInTheDocument();
    expect(screen.getByText('Components Generated')).toBeInTheDocument();
    expect(screen.getByText('Lines of code Generated')).toBeInTheDocument();
    expect(screen.getByText('Development Hours Saved')).toBeInTheDocument();
    
    // Check for metric values (these are hardcoded in the component)
    expect(screen.getByText('20')).toBeInTheDocument();
    expect(screen.getByText('86')).toBeInTheDocument();
    expect(screen.getByText('4050')).toBeInTheDocument();
    expect(screen.getByText('200')).toBeInTheDocument();
    
    // Check for the toggle icon (initially showing chevron_down)
    expect(screen.getByTestId('icon-chevron_down')).toBeInTheDocument();
  });it('should initially render with the metrics panel closed', () => {
    render(<RdsCompGenerateCodeMetrics {...defaultProps} />);
    
    // The metrics open panel should have the "hide" class initially
    const metricsOpenPanel = document.querySelector('.metrics-open-outer');
    expect(metricsOpenPanel).toHaveClass('hide');
    expect(metricsOpenPanel).not.toHaveClass('show');
    
    // The carousel is present in the DOM but should be contained within the hidden panel
    // This means it's not visible to the user until the panel is opened
    const carousel = screen.queryByTestId('carousel');
    expect(carousel).toBeInTheDocument();
    expect(metricsOpenPanel).toContainElement(carousel);
  });

  // 2. Toggle Metrics Panel Tests
  it('should toggle the metrics panel when the chevron icon is clicked', () => {
    render(<RdsCompGenerateCodeMetrics {...defaultProps} />);
    
    // Initially closed, check the chevron icon
    const chevronIcon = screen.getByTestId('icon-chevron_down');
    expect(chevronIcon).toBeInTheDocument();
    
    // Click the chevron to open the panel
    fireEvent.click(chevronIcon);
    
    // The panel should now be open
    const metricsOpenPanel = document.querySelector('.metrics-open-outer');
    expect(metricsOpenPanel).toHaveClass('show');
    expect(metricsOpenPanel).not.toHaveClass('hide');
    
    // The chevron icon should now be "up"
    expect(screen.getByTestId('icon-chevron_up')).toBeInTheDocument();
    expect(screen.queryByTestId('icon-chevron_down')).not.toBeInTheDocument();
    
    // The carousel should now be visible
    expect(screen.getByTestId('carousel')).toBeInTheDocument();
    
    // Click again to close
    fireEvent.click(screen.getByTestId('icon-chevron_up'));
    
    // The panel should now be closed again
    expect(metricsOpenPanel).toHaveClass('hide');
    expect(metricsOpenPanel).not.toHaveClass('show');
    
    // The chevron icon should now be "down" again
    expect(screen.getByTestId('icon-chevron_down')).toBeInTheDocument();
    expect(screen.queryByTestId('icon-chevron_up')).not.toBeInTheDocument();
  });

  // 3. Share Dropdown Tests
  it('should show and hide the share dropdown when the share icon is clicked', async () => {
    render(<RdsCompGenerateCodeMetrics {...defaultProps} />);
    
    // Open the metrics panel first to access the share icon
    fireEvent.click(screen.getByTestId('icon-chevron_down'));
    
    // Check for the share icon
    const shareIcon = screen.getByTestId('icon-share_color');
    expect(shareIcon).toBeInTheDocument();
    
    // Initially, the dropdown should be closed
    expect(screen.queryByText('Share code metrics and design')).not.toBeInTheDocument();
    
    // Click the share icon to open the dropdown
    fireEvent.click(shareIcon);
    
    // The dropdown menu should now be visible
    await waitFor(() => {
      expect(screen.getByText('Share code metrics and design')).toBeInTheDocument();
      expect(screen.getByText('Share metrics, design & code')).toBeInTheDocument();
    });
    
    // Click the first option in the dropdown
    fireEvent.click(screen.getByText('Share code metrics and design'));
    
    // The dropdown should close
    await waitFor(() => {
      expect(screen.queryByText('Share code metrics and design')).not.toBeInTheDocument();
    });
    
    // Open the dropdown again
    fireEvent.click(shareIcon);
    
    // Click the second option
    fireEvent.click(screen.getByText('Share metrics, design & code'));
    
    // The dropdown should close again
    await waitFor(() => {
      expect(screen.queryByText('Share metrics, design & code')).not.toBeInTheDocument();
    });
  });

  it('should close the share dropdown when clicking outside', async () => {
    render(<RdsCompGenerateCodeMetrics {...defaultProps} />);
    
    // Open the metrics panel first
    fireEvent.click(screen.getByTestId('icon-chevron_down'));
    
    // Open the share dropdown
    fireEvent.click(screen.getByTestId('icon-share_color'));
    
    // The dropdown should be open
    await waitFor(() => {
      expect(screen.getByText('Share code metrics and design')).toBeInTheDocument();
    });
    
    // Click outside the dropdown (on the body)
    fireEvent.mouseDown(document.body);
    
    // The dropdown should close
    await waitFor(() => {
      expect(screen.queryByText('Share code metrics and design')).not.toBeInTheDocument();
    });
  });

  // 4. Carousel Tests
  it('should render the carousel with correct items when metrics panel is open', () => {
    render(<RdsCompGenerateCodeMetrics {...defaultProps} />);
    
    // Open the metrics panel
    fireEvent.click(screen.getByTestId('icon-chevron_down'));
    
    // The carousel should be visible
    const carousel = screen.getByTestId('carousel');
    expect(carousel).toBeInTheDocument();
    
    // Check for carousel items
    expect(screen.getByTestId('carousel-item-0')).toBeInTheDocument();
    expect(screen.getByTestId('carousel-item-1')).toBeInTheDocument();
    expect(screen.getByTestId('carousel-item-2')).toBeInTheDocument();
    expect(screen.getByTestId('carousel-item-3')).toBeInTheDocument();
    
    // Check for carousel controls
    expect(screen.getByTestId('carousel-prev')).toBeInTheDocument();
    expect(screen.getByTestId('carousel-next')).toBeInTheDocument();
    
    // Check for indicators
    expect(screen.getByTestId('carousel-indicators')).toBeInTheDocument();
  });
  // 5. Component Cleanup Test
  it('should clean up event listeners when unmounted', () => {
    // Create spies for the actual document methods
    const addEventListenerSpy = jest.spyOn(document, 'addEventListener');
    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');
    
    const { unmount } = render(<RdsCompGenerateCodeMetrics {...defaultProps} />);
    
    // Verify that addEventListener was called during mount
    expect(addEventListenerSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));
    
    // Unmount the component
    unmount();
    
    // Check that the event listener was removed
    expect(removeEventListenerSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));
    
    // Restore the spies
    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });
});