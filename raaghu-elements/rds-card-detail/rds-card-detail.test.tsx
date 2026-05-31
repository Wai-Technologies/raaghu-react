import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import RdsCardDetail, { RdsCardDetailProps } from './rds-card-detail';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';

// Mock SCSS
jest.mock('./rds-card-detail.scss', () => ({}));

describe('RdsCardDetail', () => {
  const defaultProps: RdsCardDetailProps = {
    children: <div>Card Content</div>,
  };

  const renderWithTheme = (
    component: React.ReactElement,
    isDark: boolean = false
  ) => {
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

  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      renderWithTheme(<RdsCardDetail {...defaultProps} />);
      expect(screen.getByText('Card Content')).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsCardDetail.displayName).toBe('RdsCardDetail');
    });

    it('should render MUI Card component', () => {
      const { container } = renderWithTheme(
        <RdsCardDetail {...defaultProps} />
      );
      expect(container.querySelector('.MuiCard-root')).toBeInTheDocument();
    });

    it('should render with default props', () => {
      renderWithTheme(<RdsCardDetail {...defaultProps} />);
      expect(screen.getByText('Card Content')).toBeInTheDocument();
    });

    it('should render rds-card-detail wrapper class', () => {
      const { container } = renderWithTheme(
        <RdsCardDetail {...defaultProps} />
      );
      expect(container.querySelector('.rds-card-detail')).toBeInTheDocument();
    });

    it('should render with custom className', () => {
      const { container } = renderWithTheme(
        <RdsCardDetail {...defaultProps} className="custom-class" />
      );
      const card = container.querySelector('.rds-card-detail');
      expect(card).toHaveClass('custom-class');
    });
  });

  describe('Children Rendering', () => {
    it('should render children content', () => {
      renderWithTheme(
        <RdsCardDetail {...defaultProps}>
          <div>Custom Child Content</div>
        </RdsCardDetail>
      );
      expect(screen.getByText('Custom Child Content')).toBeInTheDocument();
    });

    it('should render multiple children', () => {
      renderWithTheme(
        <RdsCardDetail {...defaultProps}>
          <div>Child 1</div>
          <div>Child 2</div>
        </RdsCardDetail>
      );
      expect(screen.getByText('Child 1')).toBeInTheDocument();
      expect(screen.getByText('Child 2')).toBeInTheDocument();
    });

    it('should render complex children', () => {
      renderWithTheme(
        <RdsCardDetail {...defaultProps}>
          <div>
            <p>Paragraph 1</p>
            <p>Paragraph 2</p>
          </div>
        </RdsCardDetail>
      );
      expect(screen.getByText('Paragraph 1')).toBeInTheDocument();
      expect(screen.getByText('Paragraph 2')).toBeInTheDocument();
    });

    it('should render children in CardContent', () => {
      const { container } = renderWithTheme(
        <RdsCardDetail {...defaultProps}>
          <span>Content in CardContent</span>
        </RdsCardDetail>
      );
      const cardContent = container.querySelector('.MuiCardContent-root');
      expect(cardContent?.textContent).toContain('Content in CardContent');
    });
  });

  describe('Title and Subtitle', () => {
    it('should render title when provided', () => {
      renderWithTheme(
        <RdsCardDetail {...defaultProps} title="Card Title" />
      );
      expect(screen.getByText('Card Title')).toBeInTheDocument();
    });

    it('should render subtitle when provided', () => {
      renderWithTheme(
        <RdsCardDetail {...defaultProps} subtitle="Card Subtitle" />
      );
      expect(screen.getByText('Card Subtitle')).toBeInTheDocument();
    });

    it('should render both title and subtitle', () => {
      renderWithTheme(
        <RdsCardDetail
          {...defaultProps}
          title="Title"
          subtitle="Subtitle"
        />
      );
      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Subtitle')).toBeInTheDocument();
    });

    it('should not render CardHeader when no title or subtitle', () => {
      const { container } = renderWithTheme(
        <RdsCardDetail {...defaultProps} />
      );
      expect(container.querySelector('.MuiCardHeader-root')).not.toBeInTheDocument();
    });

    it('should render CardHeader when only title is provided', () => {
      const { container } = renderWithTheme(
        <RdsCardDetail {...defaultProps} title="Title Only" />
      );
      expect(container.querySelector('.MuiCardHeader-root')).toBeInTheDocument();
    });

    it('should render CardHeader when only subtitle is provided', () => {
      const { container } = renderWithTheme(
        <RdsCardDetail {...defaultProps} subtitle="Subtitle Only" />
      );
      expect(container.querySelector('.MuiCardHeader-root')).toBeInTheDocument();
    });

    it('should handle empty title string', () => {
      renderWithTheme(
        <RdsCardDetail {...defaultProps} title="" subtitle="Sub" />
      );
      expect(screen.getByText('Sub')).toBeInTheDocument();
    });

    it('should handle very long title', () => {
      const longTitle = 'This is a very long title that should display correctly in the card header component';
      renderWithTheme(
        <RdsCardDetail {...defaultProps} title={longTitle} />
      );
      expect(screen.getByText(longTitle)).toBeInTheDocument();
    });

    it('should handle special characters in title', () => {
      renderWithTheme(
        <RdsCardDetail {...defaultProps} title="Title & More!" />
      );
      expect(screen.getByText('Title & More!')).toBeInTheDocument();
    });

    it('should handle unicode characters in title', () => {
      renderWithTheme(
        <RdsCardDetail {...defaultProps} title="🎉 Title" />
      );
      expect(screen.getByText('🎉 Title')).toBeInTheDocument();
    });
  });

  describe('Image Handling', () => {
    it('should render image when provided', () => {
      renderWithTheme(
        <RdsCardDetail
          {...defaultProps}
          image="/test-image.jpg"
          title="With Image"
        />
      );
      const image = screen.getByAltText('With Image');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', '/test-image.jpg');
    });

    it('should use title as image alt text', () => {
      renderWithTheme(
        <RdsCardDetail
          {...defaultProps}
          image="/img.jpg"
          title="Alt Text"
        />
      );
      expect(screen.getByAltText('Alt Text')).toBeInTheDocument();
    });

    it('should use default alt text when no title', () => {
      renderWithTheme(
        <RdsCardDetail
          {...defaultProps}
          image="/img.jpg"
        />
      );
      expect(screen.getByAltText('Card image')).toBeInTheDocument();
    });

    it('should apply default imageHeight of 140', () => {
      renderWithTheme(
        <RdsCardDetail
          {...defaultProps}
          image="/img.jpg"
          title="Image"
        />
      );
      const image = screen.getByAltText('Image');
      expect(image).toHaveAttribute('height', '140');
    });

    it('should apply custom imageHeight', () => {
      renderWithTheme(
        <RdsCardDetail
          {...defaultProps}
          image="/img.jpg"
          imageHeight={200}
          title="Image"
        />
      );
      const image = screen.getByAltText('Image');
      expect(image).toHaveAttribute('height', '200');
    });

    it('should not render CardMedia when image is not provided', () => {
      const { container } = renderWithTheme(
        <RdsCardDetail {...defaultProps} />
      );
      expect(container.querySelector('.MuiCardMedia-root')).not.toBeInTheDocument();
    });

    it('should render CardMedia with component img', () => {
      const { container } = renderWithTheme(
        <RdsCardDetail
          {...defaultProps}
          image="/img.jpg"
          title="Image"
        />
      );
      const media = container.querySelector('.MuiCardMedia-root');
      expect(media?.tagName).toBe('IMG');
    });
  });

  describe('Actions', () => {
    it('should render actions when provided', () => {
      renderWithTheme(
        <RdsCardDetail
          {...defaultProps}
          actions={<button>Action Button</button>}
        />
      );
      expect(screen.getByText('Action Button')).toBeInTheDocument();
    });

    it('should not render CardActions when actions is not provided', () => {
      const { container } = renderWithTheme(
        <RdsCardDetail {...defaultProps} />
      );
      expect(container.querySelector('.MuiCardActions-root')).not.toBeInTheDocument();
    });

    it('should render CardActions when actions provided', () => {
      const { container } = renderWithTheme(
        <RdsCardDetail
          {...defaultProps}
          actions={<button>Act</button>}
        />
      );
      expect(container.querySelector('.MuiCardActions-root')).toBeInTheDocument();
    });

    it('should render multiple actions', () => {
      renderWithTheme(
        <RdsCardDetail
          {...defaultProps}
          actions={
            <>
              <button>Save</button>
              <button>Cancel</button>
            </>
          }
        />
      );
      expect(screen.getByText('Save')).toBeInTheDocument();
      expect(screen.getByText('Cancel')).toBeInTheDocument();
    });

    it('should render complex action components', () => {
      renderWithTheme(
        <RdsCardDetail
          {...defaultProps}
          actions={
            <div>
              <button>Edit</button>
              <button>Delete</button>
            </div>
          }
        />
      );
      expect(screen.getByText('Edit')).toBeInTheDocument();
      expect(screen.getByText('Delete')).toBeInTheDocument();
    });
  });

  describe('MUI Props Integration', () => {
    it('should accept elevation prop', () => {
      renderWithTheme(
        <RdsCardDetail {...defaultProps} elevation={8} />
      );
      expect(screen.getByText('Card Content')).toBeInTheDocument();
    });

    it('should accept variant prop', () => {
      renderWithTheme(
        <RdsCardDetail {...defaultProps} variant="elevation" />
      );
      expect(screen.getByText('Card Content')).toBeInTheDocument();
    });

    it('should accept sx prop', () => {
      const { container } = renderWithTheme(
        <RdsCardDetail
          {...defaultProps}
          sx={{ backgroundColor: 'red' }}
        />
      );
      expect(container.querySelector('.MuiCard-root')).toBeInTheDocument();
    });

    it('should accept data-testid prop', () => {
      const { container } = renderWithTheme(
        <RdsCardDetail
          {...defaultProps}
          data-testid="custom-card"
        />
      );
      expect(container.querySelector('[data-testid="custom-card"]')).toBeInTheDocument();
    });

    it('should spread all MUI Card props', () => {
      renderWithTheme(
        <RdsCardDetail
          {...defaultProps}
          elevation={4}
        />
      );
      expect(screen.getByText('Card Content')).toBeInTheDocument();
    });
  });

  describe('Theme Integration', () => {
    it('should work with light theme', () => {
      renderWithTheme(<RdsCardDetail {...defaultProps} />, false);
      expect(screen.getByText('Card Content')).toBeInTheDocument();
    });

    it('should work with dark theme', () => {
      renderWithTheme(<RdsCardDetail {...defaultProps} />, true);
      expect(screen.getByText('Card Content')).toBeInTheDocument();
    });

    it('should apply shadow for elevation in dark mode', () => {
      renderWithTheme(
        <RdsCardDetail
          {...defaultProps}
          elevation={4}
          variant="elevation"
        />,
        true
      );
      expect(screen.getByText('Card Content')).toBeInTheDocument();
    });

    it('should not apply shadow for elevation in light mode', () => {
      renderWithTheme(
        <RdsCardDetail
          {...defaultProps}
          elevation={4}
          variant="elevation"
        />,
        false
      );
      expect(screen.getByText('Card Content')).toBeInTheDocument();
    });

    it('should apply shadow only when elevation > 0', () => {
      renderWithTheme(
        <RdsCardDetail
          {...defaultProps}
          elevation={0}
          variant="elevation"
        />,
        true
      );
      expect(screen.getByText('Card Content')).toBeInTheDocument();
    });
  });

  describe('Combined Props', () => {
    it('should render with all props provided', () => {
      renderWithTheme(
        <RdsCardDetail
          title="Complete Card"
          subtitle="With All Features"
          image="/img.jpg"
          imageHeight={200}
          actions={<button>Action</button>}
          className="custom"
          elevation={4}
        >
          <p>Card content here</p>
        </RdsCardDetail>
      );
      expect(screen.getByText('Complete Card')).toBeInTheDocument();
      expect(screen.getByText('With All Features')).toBeInTheDocument();
      expect(screen.getByText('Card content here')).toBeInTheDocument();
      expect(screen.getByText('Action')).toBeInTheDocument();
    });

    it('should render with title, subtitle, and image', () => {
      renderWithTheme(
        <RdsCardDetail
          title="Title"
          subtitle="Subtitle"
          image="/img.jpg"
        >
          Content
        </RdsCardDetail>
      );
      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Subtitle')).toBeInTheDocument();
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('should render with image and actions', () => {
      renderWithTheme(
        <RdsCardDetail
          image="/img.jpg"
          title="Card"
          actions={<button>Button</button>}
        >
          Body
        </RdsCardDetail>
      );
      expect(screen.getByText('Body')).toBeInTheDocument();
      expect(screen.getByText('Button')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle undefined title', () => {
      renderWithTheme(
        <RdsCardDetail {...defaultProps} title={undefined} />
      );
      expect(screen.getByText('Card Content')).toBeInTheDocument();
    });

    it('should handle undefined subtitle', () => {
      renderWithTheme(
        <RdsCardDetail {...defaultProps} subtitle={undefined} />
      );
      expect(screen.getByText('Card Content')).toBeInTheDocument();
    });

    it('should handle undefined image', () => {
      renderWithTheme(
        <RdsCardDetail {...defaultProps} image={undefined} />
      );
      expect(screen.getByText('Card Content')).toBeInTheDocument();
    });

    it('should handle undefined actions', () => {
      renderWithTheme(
        <RdsCardDetail {...defaultProps} actions={undefined} />
      );
      expect(screen.getByText('Card Content')).toBeInTheDocument();
    });

    it('should handle rapid prop changes', () => {
      const { rerender } = renderWithTheme(
        <RdsCardDetail {...defaultProps} title="Title 1" />
      );

      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsCardDetail {...defaultProps} title="Title 2" />
        </ThemeProvider>
      );

      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsCardDetail {...defaultProps} title="Title 3" />
        </ThemeProvider>
      );

      expect(screen.getByText('Title 3')).toBeInTheDocument();
    });

    it('should handle image URL changes', () => {
      const { rerender } = renderWithTheme(
        <RdsCardDetail
          {...defaultProps}
          image="/img1.jpg"
          title="Card"
        />
      );

      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsCardDetail
            {...defaultProps}
            image="/img2.jpg"
            title="Card"
          />
        </ThemeProvider>
      );

      expect(screen.getByAltText('Card')).toHaveAttribute('src', '/img2.jpg');
    });

    it('should handle imageHeight changes', () => {
      const { rerender } = renderWithTheme(
        <RdsCardDetail
          {...defaultProps}
          image="/img.jpg"
          imageHeight={140}
          title="Card"
        />
      );

      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsCardDetail
            {...defaultProps}
            image="/img.jpg"
            imageHeight={300}
            title="Card"
          />
        </ThemeProvider>
      );

      expect(screen.getByAltText('Card')).toHaveAttribute('height', '300');
    });

    it('should handle actions being added/removed', () => {
      const { rerender } = renderWithTheme(
        <RdsCardDetail {...defaultProps} />
      );

      expect(screen.queryByText('Action')).not.toBeInTheDocument();

      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsCardDetail
            {...defaultProps}
            actions={<button>Action</button>}
          />
        </ThemeProvider>
      );

      expect(screen.getByText('Action')).toBeInTheDocument();
    });
  });

  describe('Default Props', () => {
    it('should have imageHeight default as 140', () => {
      renderWithTheme(
        <RdsCardDetail
          {...defaultProps}
          image="/img.jpg"
          title="Image"
        />
      );
      const image = screen.getByAltText('Image');
      expect(image).toHaveAttribute('height', '140');
    });

    it('should not require title prop', () => {
      renderWithTheme(
        <RdsCardDetail {...defaultProps} />
      );
      expect(screen.getByText('Card Content')).toBeInTheDocument();
    });

    it('should not require subtitle prop', () => {
      renderWithTheme(
        <RdsCardDetail {...defaultProps} title="Title" />
      );
      expect(screen.getByText('Title')).toBeInTheDocument();
    });

    it('should not require image prop', () => {
      renderWithTheme(
        <RdsCardDetail {...defaultProps} />
      );
      expect(screen.getByText('Card Content')).toBeInTheDocument();
    });

    it('should not require actions prop', () => {
      renderWithTheme(
        <RdsCardDetail {...defaultProps} />
      );
      expect(screen.getByText('Card Content')).toBeInTheDocument();
    });
  });

  describe('Props Validation', () => {
    it('should accept string children', () => {
      renderWithTheme(
        <RdsCardDetail {...defaultProps}>
          String child
        </RdsCardDetail>
      );
      expect(screen.getByText('String child')).toBeInTheDocument();
    });

    it('should accept ReactNode children', () => {
      renderWithTheme(
        <RdsCardDetail {...defaultProps}>
          <span>React Node</span>
        </RdsCardDetail>
      );
      expect(screen.getByText('React Node')).toBeInTheDocument();
    });

    it('should accept string title', () => {
      renderWithTheme(
        <RdsCardDetail {...defaultProps} title="String Title" />
      );
      expect(screen.getByText('String Title')).toBeInTheDocument();
    });

    it('should accept string subtitle', () => {
      renderWithTheme(
        <RdsCardDetail {...defaultProps} subtitle="String Subtitle" />
      );
      expect(screen.getByText('String Subtitle')).toBeInTheDocument();
    });

    it('should accept string image URL', () => {
      renderWithTheme(
        <RdsCardDetail
          {...defaultProps}
          image="/path/to/image.jpg"
          title="Image"
        />
      );
      expect(screen.getByAltText('Image')).toHaveAttribute('src', '/path/to/image.jpg');
    });

    it('should accept number imageHeight', () => {
      renderWithTheme(
        <RdsCardDetail
          {...defaultProps}
          image="/img.jpg"
          imageHeight={250}
          title="Image"
        />
      );
      expect(screen.getByAltText('Image')).toHaveAttribute('height', '250');
    });

    it('should accept ReactNode actions', () => {
      renderWithTheme(
        <RdsCardDetail
          {...defaultProps}
          actions={<button>Action</button>}
        />
      );
      expect(screen.getByText('Action')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should render with semantic HTML structure', () => {
      const { container } = renderWithTheme(
        <RdsCardDetail
          {...defaultProps}
          title="Title"
          subtitle="Subtitle"
        />
      );
      expect(container.querySelector('.MuiCard-root')).toBeInTheDocument();
      expect(container.querySelector('.MuiCardHeader-root')).toBeInTheDocument();
  
    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsCardDetail {...defaultProps} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

    it('should have proper image alt text', () => {
      renderWithTheme(
        <RdsCardDetail
          {...defaultProps}
          image="/img.jpg"
          title="Card Title"
        />
      );
      expect(screen.getByAltText('Card Title')).toBeInTheDocument();
    });

    it('should have default alt text for image without title', () => {
      renderWithTheme(
        <RdsCardDetail
          {...defaultProps}
          image="/img.jpg"
        />
      );
      expect(screen.getByAltText('Card image')).toBeInTheDocument();
    });

    it('should maintain proper heading hierarchy', () => {
      const { container } = renderWithTheme(
        <RdsCardDetail
          {...defaultProps}
          title="Main Title"
          subtitle="Secondary"
        />
      );
      // MUI CardHeader renders title text content
      expect(screen.getByText('Main Title')).toBeInTheDocument();
      expect(container.querySelector('.MuiCardHeader-title')).toBeInTheDocument();
    });
  });

  describe('Style and ClassName', () => {
    it('should merge custom className with rds-card-detail class', () => {
      const { container } = renderWithTheme(
        <RdsCardDetail
          {...defaultProps}
          className="my-custom-class"
        />
      );
      const card = container.querySelector('.rds-card-detail');
      expect(card).toHaveClass('my-custom-class');
      expect(card).toHaveClass('rds-card-detail');
    });

    it('should handle empty className', () => {
      const { container } = renderWithTheme(
        <RdsCardDetail {...defaultProps} className="" />
      );
      expect(container.querySelector('.rds-card-detail')).toBeInTheDocument();
    });

    it('should handle undefined className', () => {
      const { container } = renderWithTheme(
        <RdsCardDetail {...defaultProps} className={undefined} />
      );
      expect(container.querySelector('.rds-card-detail')).toBeInTheDocument();
    });

    it('should apply MUI Card classes', () => {
      const { container } = renderWithTheme(
        <RdsCardDetail {...defaultProps} />
      );
      expect(container.querySelector('.MuiPaper-root')).toBeInTheDocument();
      expect(container.querySelector('.MuiCard-root')).toBeInTheDocument();
    });
  });
});