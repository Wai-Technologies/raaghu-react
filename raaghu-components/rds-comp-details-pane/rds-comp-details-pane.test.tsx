import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';
import RdsCompDetailsPane from './rds-comp-details-pane';

// Mock SCSS
jest.mock('./rds-comp-details-pane.scss', () => ({}));

// Mock sub-components
jest.mock('./details-pane-components', () => ({
  HistoryFavoritesTabs: ({ activeTab, setActiveTab, historyTabLabel, favouritesTabLabel }: any) => (
    <div data-testid="history-favorites-tabs">
      <button onClick={() => setActiveTab('history')} data-testid="history-tab">
        {historyTabLabel || 'History'}
      </button>
      <button onClick={() => setActiveTab('favourites')} data-testid="favourites-tab">
        {favouritesTabLabel || 'Favourites'}
      </button>
      <span data-testid="active-tab">{activeTab}</span>
    </div>
  ),
  RealEstateContent: ({ estateTitle, estateDescription, carouselImages }: any) => (
    <div data-testid="real-estate-content">
      <h3 data-testid="estate-title">{estateTitle}</h3>
      <p data-testid="estate-description">{estateDescription}</p>
      <div data-testid="carousel-images">{carouselImages?.length || 0}</div>
    </div>
  ),
  SelectionContent: ({ headerText, headerSubText }: any) => (
    <div data-testid="selection-content">
      <h3 data-testid="selection-header">{headerText}</h3>
      <p data-testid="selection-subtext">{headerSubText}</p>
    </div>
  ),
  ToolbarContent: ({ figmaIconSrc, storybookIconSrc }: any) => (
    <div data-testid="toolbar-content">
      <img data-testid="figma-icon" src={figmaIconSrc} alt="Figma" />
      <img data-testid="storybook-icon" src={storybookIconSrc} alt="Storybook" />
    </div>
  ),
  ThumbnailViewContent: ({ thumbnailButtonName }: any) => (
    <div data-testid="thumbnail-view-content">
      <button data-testid="thumbnail-button">{thumbnailButtonName}</button>
    </div>
  ),
  FigmaUIKitButton: () => <button data-testid="figma-uikit-button">Figma UIKit</button>,
}));

describe('RdsCompDetailsPane', () => {
  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      const { container } = render(<RdsCompDetailsPane headerText="Test Pane" />);
      expect(container.querySelector('.rds-comp-details-pane')).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsCompDetailsPane.displayName).toBe('RdsCompDetailsPane');
    });

    it('should render with required headerText prop', () => {
      render(<RdsCompDetailsPane headerText="Details Panel" style="Prompt History" />);
      expect(screen.getByRole('heading', { name: 'Details Panel' })).toBeInTheDocument();
    });
  });

  describe('Style Variants', () => {
    it('should render HistoryFavoritesTabs for Prompt History style', () => {
      render(<RdsCompDetailsPane headerText="History" style="Prompt History" />);
      expect(screen.getByTestId('history-favorites-tabs')).toBeInTheDocument();
    });

    it('should render HistoryFavoritesTabs for Favourites style', () => {
      render(
        <RdsCompDetailsPane
          headerText="Favourites"
          style="Favourites"
          historyTabLabel="Recent"
          favouritesTabLabel="Saved"
        />
      );
      expect(screen.getByTestId('history-favorites-tabs')).toBeInTheDocument();
      expect(screen.getByText('Recent')).toBeInTheDocument();
      expect(screen.getByText('Saved')).toBeInTheDocument();
    });

    it('should render HistoryFavoritesTabs for Favourites - New Folder style', () => {
      render(
        <RdsCompDetailsPane
          headerText="New Folder"
          style="Favourites - New Folder"
        />
      );
      expect(screen.getByTestId('history-favorites-tabs')).toBeInTheDocument();
    });

    it('should render RealEstateContent for Real Estate style', () => {
      render(
        <RdsCompDetailsPane
          headerText="Estate"
          style="Real Estate"
          estateTitle="Modern Villa"
          estateDescription="Beautiful 5-bedroom villa"
          carouselImages={[{ src: 'img1.jpg', alt: 'Image 1' }]}
        />
      );
      expect(screen.getByTestId('real-estate-content')).toBeInTheDocument();
      expect(screen.getByText('Modern Villa')).toBeInTheDocument();
      expect(screen.getByText('Beautiful 5-bedroom villa')).toBeInTheDocument();
    });

    it('should render SelectionContent for Selection style', () => {
      render(
        <RdsCompDetailsPane
          headerText="Select Items"
          headerSubText="Choose an item to view details"
          style="Selection"
        />
      );
      expect(screen.getByTestId('selection-content')).toBeInTheDocument();
      expect(screen.getByText('Select Items')).toBeInTheDocument();
      expect(screen.getByText('Choose an item to view details')).toBeInTheDocument();
    });

    it('should render ToolbarContent for Toolbar style', () => {
      render(
        <RdsCompDetailsPane
          headerText="Toolbar"
          style="Toolbar"
          figmaIconSrc="/figma.png"
          storybookIconSrc="/storybook.png"
        />
      );
      expect(screen.getByTestId('toolbar-content')).toBeInTheDocument();
      expect(screen.getByTestId('figma-icon')).toHaveAttribute('src', '/figma.png');
      expect(screen.getByTestId('storybook-icon')).toHaveAttribute('src', '/storybook.png');
    });

    it('should render ThumbnailViewContent for Thumbnail View style', () => {
      render(
        <RdsCompDetailsPane
          headerText="Thumbnails"
          style="Thumbnail View"
          thumbnailButtonName="View Gallery"
        />
      );
      expect(screen.getByTestId('thumbnail-view-content')).toBeInTheDocument();
      expect(screen.getByText('View Gallery')).toBeInTheDocument();
    });

    it('should render container for unknown style', () => {
      const { container } = render(
        <RdsCompDetailsPane
          headerText="Unknown"
          style="Unknown Style"
        />
      );
      const detailsPane = container.querySelector('.rds-comp-details-pane');
      expect(detailsPane).toBeInTheDocument();
    });
  });

  describe('Tab Management', () => {
    it('should initialize with history tab for Prompt History style', () => {
      render(<RdsCompDetailsPane headerText="History" style="Prompt History" />);
      expect(screen.getByTestId('active-tab')).toHaveTextContent('history');
    });

    it('should initialize with favourites tab for Favourites style', () => {
      render(<RdsCompDetailsPane headerText="Favourites" style="Favourites" />);
      expect(screen.getByTestId('active-tab')).toHaveTextContent('favourites');
    });

    it('should initialize with history tab by default', () => {
      render(<RdsCompDetailsPane headerText="Default" style="Prompt History" />);
      expect(screen.getByTestId('active-tab')).toHaveTextContent('history');
    });

    it('should switch tabs when tab button is clicked', () => {
      render(
        <RdsCompDetailsPane
          headerText="History"
          style="Prompt History"
        />
      );
      fireEvent.click(screen.getByTestId('favourites-tab'));
      expect(screen.getByTestId('active-tab')).toHaveTextContent('favourites');
    });

    it('should switch back to history tab', () => {
      render(
        <RdsCompDetailsPane
          headerText="History"
          style="Prompt History"
        />
      );
      fireEvent.click(screen.getByTestId('favourites-tab'));
      fireEvent.click(screen.getByTestId('history-tab'));
      expect(screen.getByTestId('active-tab')).toHaveTextContent('history');
    });
  });

  describe('Tab Labels', () => {
    it('should use default history tab label', () => {
      render(<RdsCompDetailsPane headerText="History Panel" style="Prompt History" />);
      expect(screen.getByTestId('history-tab')).toHaveTextContent('History');
    });

    it('should use custom history tab label', () => {
      render(
        <RdsCompDetailsPane
          headerText="History"
          style="Prompt History"
          historyTabLabel="Recent Items"
        />
      );
      expect(screen.getByText('Recent Items')).toBeInTheDocument();
    });

    it('should use default favourites tab label', () => {
      render(<RdsCompDetailsPane headerText="Favourites Panel" style="Favourites" />);
      expect(screen.getByTestId('favourites-tab')).toHaveTextContent('Favourites');
    });

    it('should use custom favourites tab label', () => {
      render(
        <RdsCompDetailsPane
          headerText="Favourites"
          style="Favourites"
          favouritesTabLabel="Saved Items"
        />
      );
      expect(screen.getByText('Saved Items')).toBeInTheDocument();
    });
  });

  describe('History Items', () => {
    it('should use default history items when not provided', () => {
      const { container } = render(
        <RdsCompDetailsPane
          headerText="History"
          style="Prompt History"
        />
      );
      expect(container).toBeInTheDocument();
    });

    it('should use custom history items when provided', () => {
      const customItems = [
        { id: 1, name: 'Custom Item 1' },
        { id: 2, name: 'Custom Item 2' },
      ];
      const { container } = render(
        <RdsCompDetailsPane
          headerText="History"
          style="Prompt History"
          historyItems={customItems}
        />
      );
      expect(container).toBeInTheDocument();
    });

    it('should use custom older history items when provided', () => {
      const customOlderItems = [
        { id: 1, name: 'Old Item 1' },
        { id: 2, name: 'Old Item 2' },
      ];
      const { container } = render(
        <RdsCompDetailsPane
          headerText="History"
          style="Prompt History"
          olderHistoryItems={customOlderItems}
        />
      );
      expect(container).toBeInTheDocument();
    });
  });

  describe('Real Estate Content', () => {
    it('should render estate title and description', () => {
      render(
        <RdsCompDetailsPane
          headerText="Estate"
          style="Real Estate"
          estateTitle="Luxury Penthouse"
          estateDescription="300 sqm penthouse with city views"
        />
      );
      expect(screen.getByText('Luxury Penthouse')).toBeInTheDocument();
      expect(screen.getByText('300 sqm penthouse with city views')).toBeInTheDocument();
    });

    it('should pass carousel images to RealEstateContent', () => {
      const images = [
        { src: 'img1.jpg', alt: 'Living Room' },
        { src: 'img2.jpg', alt: 'Bedroom' },
        { src: 'img3.jpg', alt: 'Kitchen' },
      ];
      render(
        <RdsCompDetailsPane
          headerText="Estate"
          style="Real Estate"
          estateTitle="Estate"
          carouselImages={images}
        />
      );
      const carouselDiv = screen.getByTestId('carousel-images');
      expect(carouselDiv).toHaveTextContent('3');
    });

    it('should handle missing carousel images', () => {
      render(
        <RdsCompDetailsPane
          headerText="Estate"
          style="Real Estate"
          estateTitle="Estate"
        />
      );
      const carouselDiv = screen.getByTestId('carousel-images');
      expect(carouselDiv).toHaveTextContent('0');
    });
  });

  describe('Selection Content', () => {
    it('should render header and subtext', () => {
      render(
        <RdsCompDetailsPane
          headerText="Selection Options"
          headerSubText="Select from available options"
          style="Selection"
        />
      );
      expect(screen.getByText('Selection Options')).toBeInTheDocument();
      expect(screen.getByText('Select from available options')).toBeInTheDocument();
    });

    it('should handle missing subtext', () => {
      render(
        <RdsCompDetailsPane
          headerText="Selection"
          style="Selection"
        />
      );
      expect(screen.getByTestId('selection-content')).toBeInTheDocument();
    });
  });

  describe('Toolbar Content', () => {
    it('should render both icon buttons', () => {
      render(
        <RdsCompDetailsPane
          headerText="Tools"
          style="Toolbar"
          figmaIconSrc="/figma.svg"
          storybookIconSrc="/storybook.svg"
        />
      );
      expect(screen.getByTestId('figma-icon')).toHaveAttribute('src', '/figma.svg');
      expect(screen.getByTestId('storybook-icon')).toHaveAttribute('src', '/storybook.svg');
    });

    it('should handle missing icon sources', () => {
      render(
        <RdsCompDetailsPane
          headerText="Tools"
          style="Toolbar"
        />
      );
      expect(screen.getByTestId('toolbar-content')).toBeInTheDocument();
    });
  });

  describe('Thumbnail View Content', () => {
    it('should render thumbnail button', () => {
      render(
        <RdsCompDetailsPane
          headerText="Gallery"
          style="Thumbnail View"
          thumbnailButtonName="Open Gallery"
        />
      );
      expect(screen.getByText('Open Gallery')).toBeInTheDocument();
    });

    it('should handle missing button name', () => {
      render(
        <RdsCompDetailsPane
          headerText="Gallery"
          style="Thumbnail View"
        />
      );
      expect(screen.getByTestId('thumbnail-view-content')).toBeInTheDocument();
    });
  });

  describe('Style Switching', () => {
    it('should switch from History to Favourites and update active tab', () => {
      const { rerender } = render(
        <RdsCompDetailsPane
          headerText="Switcher"
          style="Prompt History"
        />
      );
      expect(screen.getByTestId('active-tab')).toHaveTextContent('history');

      rerender(
        <RdsCompDetailsPane
          headerText="Switcher"
          style="Favourites"
        />
      );
      expect(screen.getByTestId('active-tab')).toHaveTextContent('favourites');
    });

    it('should switch from Favourites to History and update active tab', () => {
      const { rerender } = render(
        <RdsCompDetailsPane
          headerText="Switcher"
          style="Favourites"
        />
      );
      expect(screen.getByTestId('active-tab')).toHaveTextContent('favourites');

      rerender(
        <RdsCompDetailsPane
          headerText="Switcher"
          style="Prompt History"
        />
      );
      expect(screen.getByTestId('active-tab')).toHaveTextContent('history');
    });

    it('should switch to Real Estate content from History', () => {
      const { rerender } = render(
        <RdsCompDetailsPane
          headerText="Switcher"
          style="Prompt History"
        />
      );
      expect(screen.getByTestId('history-favorites-tabs')).toBeInTheDocument();

      rerender(
        <RdsCompDetailsPane
          headerText="Switcher"
          style="Real Estate"
          estateTitle="Property"
        />
      );
      expect(screen.getByTestId('real-estate-content')).toBeInTheDocument();
    });

    it('should switch between multiple content types', () => {
      const { rerender } = render(
        <RdsCompDetailsPane
          headerText="Multi"
          style="Selection"
          headerSubText="Sub"
        />
      );
      expect(screen.getByTestId('selection-content')).toBeInTheDocument();

      rerender(
        <RdsCompDetailsPane
          headerText="Multi"
          style="Toolbar"
          figmaIconSrc="/fig.png"
        />
      );
      expect(screen.getByTestId('toolbar-content')).toBeInTheDocument();

      rerender(
        <RdsCompDetailsPane
          headerText="Multi"
          style="Thumbnail View"
          thumbnailButtonName="View"
        />
      );
      expect(screen.getByTestId('thumbnail-view-content')).toBeInTheDocument();
    });
  });

  describe('Props Propagation', () => {
    it('should propagate custom labels to HistoryFavoritesTabs', () => {
      render(
        <RdsCompDetailsPane
          headerText="History"
          style="Prompt History"
          historyTabLabel="Custom History"
          favouritesTabLabel="Custom Favourites"
          addtoscreen="Add to Screen"
          addtofolder="Add to Folder"
        />
      );
      expect(screen.getByText('Custom History')).toBeInTheDocument();
      expect(screen.getByText('Custom Favourites')).toBeInTheDocument();
    });

    it('should use default Add to Screen text', () => {
      render(
        <RdsCompDetailsPane
          headerText="History"
          style="Prompt History"
        />
      );
      expect(screen.getByTestId('history-favorites-tabs')).toBeInTheDocument();
    });

    it('should propagate custom Add to Screen text', () => {
      render(
        <RdsCompDetailsPane
          headerText="History"
          style="Prompt History"
          addtoscreen="Place on Screen"
        />
      );
      expect(screen.getByTestId('history-favorites-tabs')).toBeInTheDocument();
    });

    it('should propagate Add to Folder text', () => {
      render(
        <RdsCompDetailsPane
          headerText="History"
          style="Prompt History"
          addtofolder="Save to Folder"
        />
      );
      expect(screen.getByTestId('history-favorites-tabs')).toBeInTheDocument();
    });
  });

  describe('CSS Classes', () => {
    it('should apply correct CSS classes', () => {
      const { container } = render(
        <RdsCompDetailsPane headerText="Test" />
      );
      const detailsPane = container.querySelector('.rds-comp-details-pane');
      expect(detailsPane).toBeInTheDocument();
      expect(detailsPane).toHaveStyle('position: relative');
    });

    it('should have header with fw-bold class', () => {
      render(
        <RdsCompDetailsPane
          headerText="Bold Header"
          style="Prompt History"
        />
      );
      const header = screen.getByText('Bold Header');
      expect(header).toHaveClass('fw-bold');
      expect(header).toHaveClass('rds-comp-details-pane__header');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty header text gracefully', () => {
      const { container } = render(
        <RdsCompDetailsPane headerText="" />
      );
      expect(container.querySelector('.rds-comp-details-pane')).toBeInTheDocument();
    });

    it('should handle undefined optional properties', () => {
      const { container } = render(
        <RdsCompDetailsPane
          headerText="Test"
          style={undefined}
        />
      );
      expect(container.querySelector('.rds-comp-details-pane')).toBeInTheDocument();
    });

    it('should handle null history items array', () => {
      const { container } = render(
        <RdsCompDetailsPane
          headerText="Test"
          style="Prompt History"
          historyItems={[]}
        />
      );
      expect(container.querySelector('.rds-comp-details-pane')).toBeInTheDocument();
    });

    it('should handle null carousel images', () => {
      render(
        <RdsCompDetailsPane
          headerText="Estate"
          style="Real Estate"
          carouselImages={undefined}
        />
      );
      const carouselDiv = screen.getByTestId('carousel-images');
      expect(carouselDiv).toHaveTextContent('0');
    });
  });

  describe('Integration', () => {
    it('should render complete History pane with all props', () => {
      render(
        <RdsCompDetailsPane
          headerText="Full History"
          style="Prompt History"
          historyTabLabel="Recent"
          favouritesTabLabel="Saved"
          addtoscreen="Add"
          addtofolder="Save"
          historyItems={[
            { id: 1, name: 'Item 1' },
            { id: 2, name: 'Item 2' },
          ]}
          olderHistoryItems={[
            { id: 3, name: 'Old Item' },
          ]}
        />
      );
      expect(screen.getByText('Full History')).toBeInTheDocument();
      expect(screen.getByTestId('history-favorites-tabs')).toBeInTheDocument();
    });

    it('should render complete Real Estate pane with all props', () => {
      const images = [
        { src: 'img1.jpg', alt: 'Image 1' },
        { src: 'img2.jpg', alt: 'Image 2' },
      ];
      render(
        <RdsCompDetailsPane
          headerText="Estate Details"
          style="Real Estate"
          estateTitle="Luxury Home"
          estateDescription="Beautiful property"
          carouselImages={images}
        />
      );
      expect(screen.getByTestId('real-estate-content')).toBeInTheDocument();
      expect(screen.getByText('Luxury Home')).toBeInTheDocument();
      expect(screen.getByText('Beautiful property')).toBeInTheDocument();
    });

    it('should handle rapid style changes', () => {
      const { rerender } = render(
        <RdsCompDetailsPane headerText="Test" style="Prompt History" />
      );
      expect(screen.getByTestId('history-favorites-tabs')).toBeInTheDocument();

      rerender(<RdsCompDetailsPane headerText="Test" style="Selection" headerSubText="Sub" />);
      expect(screen.getByTestId('selection-content')).toBeInTheDocument();

      rerender(<RdsCompDetailsPane headerText="Test" style="Toolbar" figmaIconSrc="/f.png" />);
      expect(screen.getByTestId('toolbar-content')).toBeInTheDocument();

      rerender(<RdsCompDetailsPane headerText="Test" style="Prompt History" />);
      expect(screen.getByTestId('history-favorites-tabs')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsCompDetailsPane />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
