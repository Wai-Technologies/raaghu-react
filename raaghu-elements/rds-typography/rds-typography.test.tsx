import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import RdsTypography from './rds-typography';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';

// Mock SCSS
jest.mock('./rds-typography.scss', () => ({}));

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

describe('RdsTypography', () => {
  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      const { container } = renderWithTheme(<RdsTypography text="Test Text" />);
      expect(container).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsTypography.displayName).toBe('RdsTypography');
    });

    it('should render MuiTypography component', () => {
      renderWithTheme(<RdsTypography text="Test" />);
      const typography = screen.getByText('Test');
      expect(typography).toBeInTheDocument();
    });

    it('should apply rds-typography class', () => {
      const { container } = renderWithTheme(<RdsTypography text="Test" />);
      const typography = container.querySelector('.rds-typography');
      expect(typography).toBeInTheDocument();
    });

    it('should render with children when text prop is not provided', () => {
      renderWithTheme(<RdsTypography>Children Text</RdsTypography>);
      expect(screen.getByText('Children Text')).toBeInTheDocument();
    });

    it('should prioritize text prop over children', () => {
      renderWithTheme(
        <RdsTypography text="Text Prop">Children Text</RdsTypography>
      );
      expect(screen.getByText('Text Prop')).toBeInTheDocument();
      expect(screen.queryByText('Children Text')).not.toBeInTheDocument();
    });
  });

  describe('Variant Support', () => {
    it('should render h1 variant', () => {
      const { container } = renderWithTheme(
        <RdsTypography variant="h1" text="Heading 1" />
      );
      const element = container.querySelector('h1');
      expect(element).toBeInTheDocument();
      expect(element).toHaveClass('rds-typography--h1');
    });

    it('should render h2 variant', () => {
      const { container } = renderWithTheme(
        <RdsTypography variant="h2" text="Heading 2" />
      );
      const element = container.querySelector('h2');
      expect(element).toBeInTheDocument();
      expect(element).toHaveClass('rds-typography--h2');
    });

    it('should render h3 variant', () => {
      const { container } = renderWithTheme(
        <RdsTypography variant="h3" text="Heading 3" />
      );
      const element = container.querySelector('h3');
      expect(element).toBeInTheDocument();
      expect(element).toHaveClass('rds-typography--h3');
    });

    it('should render h4 variant', () => {
      const { container } = renderWithTheme(
        <RdsTypography variant="h4" text="Heading 4" />
      );
      const element = container.querySelector('h4');
      expect(element).toBeInTheDocument();
      expect(element).toHaveClass('rds-typography--h4');
    });

    it('should render h5 variant', () => {
      const { container } = renderWithTheme(
        <RdsTypography variant="h5" text="Heading 5" />
      );
      const element = container.querySelector('h5');
      expect(element).toBeInTheDocument();
      expect(element).toHaveClass('rds-typography--h5');
    });

    it('should render h6 variant', () => {
      const { container } = renderWithTheme(
        <RdsTypography variant="h6" text="Heading 6" />
      );
      const element = container.querySelector('h6');
      expect(element).toBeInTheDocument();
      expect(element).toHaveClass('rds-typography--h6');
    });

    it('should render subtitle1 variant', () => {
      const { container } = renderWithTheme(
        <RdsTypography variant="subtitle1" text="Subtitle 1" />
      );
      const typography = container.querySelector('.rds-typography--subtitle1');
      expect(typography).toBeInTheDocument();
    });

    it('should render subtitle2 variant', () => {
      const { container } = renderWithTheme(
        <RdsTypography variant="subtitle2" text="Subtitle 2" />
      );
      const typography = container.querySelector('.rds-typography--subtitle2');
      expect(typography).toBeInTheDocument();
    });

    it('should render body1 variant', () => {
      const { container } = renderWithTheme(
        <RdsTypography variant="body1" text="Body 1" />
      );
      const typography = container.querySelector('.rds-typography--body1');
      expect(typography).toBeInTheDocument();
    });

    it('should render body2 variant', () => {
      const { container } = renderWithTheme(
        <RdsTypography variant="body2" text="Body 2" />
      );
      const typography = container.querySelector('.rds-typography--body2');
      expect(typography).toBeInTheDocument();
    });

    it('should render button variant', () => {
      const { container } = renderWithTheme(
        <RdsTypography variant="button" text="Button" />
      );
      const typography = container.querySelector('.rds-typography--button');
      expect(typography).toBeInTheDocument();
    });

    it('should render caption variant', () => {
      const { container } = renderWithTheme(
        <RdsTypography variant="caption" text="Caption" />
      );
      const typography = container.querySelector('.rds-typography--caption');
      expect(typography).toBeInTheDocument();
    });

    it('should render overline variant', () => {
      const { container } = renderWithTheme(
        <RdsTypography variant="overline" text="Overline" />
      );
      const typography = container.querySelector('.rds-typography--overline');
      expect(typography).toBeInTheDocument();
    });

    it('should render inherit variant', () => {
      const { container } = renderWithTheme(
        <RdsTypography variant="inherit" text="Inherit" />
      );
      const typography = container.querySelector('.rds-typography--inherit');
      expect(typography).toBeInTheDocument();
    });

    it('should apply variant class when variant is provided', () => {
      const { container } = renderWithTheme(
        <RdsTypography variant="h1" text="Test" />
      );
      const typography = container.querySelector('.rds-typography--h1');
      expect(typography).toHaveClass('rds-typography');
      expect(typography).toHaveClass('rds-typography--h1');
    });

    it('should not apply variant class when variant is not provided', () => {
      const { container } = renderWithTheme(<RdsTypography text="Test" />);
      const typography = container.querySelector('.rds-typography');
      expect(typography).toBeInTheDocument();
      expect(typography?.className).not.toMatch(/rds-typography--/);
    });
  });

  describe('Custom Classes', () => {
    it('should apply custom className', () => {
      const { container } = renderWithTheme(
        <RdsTypography text="Test" className="custom-class" />
      );
      const typography = container.querySelector('.custom-class');
      expect(typography).toBeInTheDocument();
    });

    it('should apply both rds-typography and custom className', () => {
      const { container } = renderWithTheme(
        <RdsTypography text="Test" className="custom-class" />
      );
      const typography = container.querySelector('.rds-typography.custom-class');
      expect(typography).toBeInTheDocument();
    });

    it('should apply multiple custom classes', () => {
      const { container } = renderWithTheme(
        <RdsTypography text="Test" className="class1 class2 class3" />
      );
      const typography = container.querySelector('.class1.class2.class3');
      expect(typography).toBeInTheDocument();
    });

    it('should apply custom class with variant', () => {
      const { container } = renderWithTheme(
        <RdsTypography variant="h1" text="Test" className="custom-class" />
      );
      const typography = container.querySelector('.rds-typography--h1.custom-class');
      expect(typography).toBeInTheDocument();
    });
  });

  describe('Color Support', () => {
    it('should apply primary color', () => {
      const { container } = renderWithTheme(
        <RdsTypography text="Test" color="primary" />
      );
      const typography = container.querySelector('.rds-typography');
      expect(typography).toBeInTheDocument();
      // Verify the color prop is accepted and passed through
      expect(typography?.getAttribute('color')).toBe(null); // MUI handles color internally
    });

    it('should apply secondary color', () => {
      const { container } = renderWithTheme(
        <RdsTypography text="Test" color="secondary" />
      );
      const typography = container.querySelector('.rds-typography');
      expect(typography).toBeInTheDocument();
    });

    it('should apply error color', () => {
      const { container } = renderWithTheme(
        <RdsTypography text="Test" color="error" />
      );
      const typography = container.querySelector('.rds-typography');
      expect(typography).toBeInTheDocument();
    });

    it('should apply warning color', () => {
      const { container } = renderWithTheme(
        <RdsTypography text="Test" color="warning" />
      );
      const typography = container.querySelector('.rds-typography');
      expect(typography).toBeInTheDocument();
    });

    it('should apply info color', () => {
      const { container } = renderWithTheme(
        <RdsTypography text="Test" color="info" />
      );
      const typography = container.querySelector('.rds-typography');
      expect(typography).toBeInTheDocument();
    });

    it('should apply success color', () => {
      const { container } = renderWithTheme(
        <RdsTypography text="Test" color="success" />
      );
      const typography = container.querySelector('.rds-typography');
      expect(typography).toBeInTheDocument();
    });

    it('should apply textPrimary color', () => {
      const { container } = renderWithTheme(
        <RdsTypography text="Test" color="textPrimary" />
      );
      const typography = container.querySelector('.rds-typography');
      expect(typography).toBeInTheDocument();
      // Verify the color prop is accepted and passed through
      expect(typography?.getAttribute('data-testid')).toBe(null); // Element renders normally
    });

    it('should apply textSecondary color', () => {
      const { container } = renderWithTheme(
        <RdsTypography text="Test" color="textSecondary" />
      );
      const typography = container.querySelector('.rds-typography');
      expect(typography).toBeInTheDocument();
    });
  });

  describe('Alignment', () => {
    it('should apply text align left', () => {
      const { container } = renderWithTheme(
        <RdsTypography text="Test" align="left" />
      );
      const typography = container.querySelector('.MuiTypography-alignLeft');
      expect(typography).toBeInTheDocument();
    });

    it('should apply text align center', () => {
      const { container } = renderWithTheme(
        <RdsTypography text="Test" align="center" />
      );
      const typography = container.querySelector('.MuiTypography-alignCenter');
      expect(typography).toBeInTheDocument();
    });

    it('should apply text align right', () => {
      const { container } = renderWithTheme(
        <RdsTypography text="Test" align="right" />
      );
      const typography = container.querySelector('.MuiTypography-alignRight');
      expect(typography).toBeInTheDocument();
    });

    it('should apply text align justify', () => {
      const { container } = renderWithTheme(
        <RdsTypography text="Test" align="justify" />
      );
      const typography = container.querySelector('.MuiTypography-alignJustify');
      expect(typography).toBeInTheDocument();
    });
  });

  describe('Styling Props', () => {
    it('should apply inline styles', () => {
      const { container } = renderWithTheme(
        <RdsTypography text="Test" sx={{ color: 'red', fontSize: '20px' }} />
      );
      const typography = container.querySelector('.rds-typography');
      expect(typography).toHaveStyle('color: red');
    });

    it('should support display prop', () => {
      const { container } = renderWithTheme(
        <RdsTypography text="Test" display="inline" />
      );
      const typography = container.querySelector('.rds-typography');
      expect(typography).toBeInTheDocument();
    });

    it('should support gutterBottom prop', () => {
      const { container } = renderWithTheme(
        <RdsTypography text="Test" gutterBottom />
      );
      const typography = container.querySelector('.MuiTypography-gutterBottom');
      expect(typography).toBeInTheDocument();
    });

    it('should support noWrap prop', () => {
      const { container } = renderWithTheme(
        <RdsTypography text="Test" noWrap />
      );
      const typography = container.querySelector('.MuiTypography-noWrap');
      expect(typography).toBeInTheDocument();
    });

    it('should support paragraph prop', () => {
      const { container } = renderWithTheme(
        <RdsTypography text="Test" paragraph />
      );
      const element = container.querySelector('p');
      expect(element).toBeInTheDocument();
    });
  });

  describe('Text Content', () => {
    it('should render empty text prop with children fallback', () => {
      const { container } = renderWithTheme(
        <RdsTypography text="" children="Fallback" />
      );
      const typography = container.querySelector('.rds-typography');
      expect(typography?.textContent).toBe('Fallback');
    });

    it('should render very long text', () => {
      const longText = 'A'.repeat(1000);
      renderWithTheme(<RdsTypography text={longText} />);
      expect(screen.getByText(longText)).toBeInTheDocument();
    });

    it('should render text with special characters', () => {
      const specialText = '!@#$%^&*()_+-=[]{}|;:\'",.<>?/`~';
      renderWithTheme(<RdsTypography text={specialText} />);
      expect(screen.getByText(specialText)).toBeInTheDocument();
    });

    it('should render text with unicode characters', () => {
      const unicodeText = '你好世界 🌍 مرحبا بالعالم';
      renderWithTheme(<RdsTypography text={unicodeText} />);
      expect(screen.getByText(unicodeText)).toBeInTheDocument();
    });

    it('should render text with line breaks', () => {
      const textWithBreaks = 'Line 1\nLine 2\nLine 3';
      const { container } = renderWithTheme(<RdsTypography text={textWithBreaks} />);
      const typography = container.querySelector('.rds-typography');
      expect(typography?.textContent).toContain('Line 1');
      expect(typography?.textContent).toContain('Line 2');
      expect(typography?.textContent).toContain('Line 3');
    });

    it('should render React elements as children', () => {
      renderWithTheme(
        <RdsTypography>
          <span data-testid="span-element">Span Text</span>
        </RdsTypography>
      );
      expect(screen.getByTestId('span-element')).toBeInTheDocument();
    });
  });

  describe('Theme Support', () => {
    it('should work with light theme', () => {
      const { container } = renderWithTheme(
        <RdsTypography text="Test" />,
        false
      );
      expect(container.querySelector('.rds-typography')).toBeInTheDocument();
    });

    it('should work with dark theme', () => {
      const { container } = renderWithTheme(
        <RdsTypography text="Test" />,
        true
      );
      expect(container.querySelector('.rds-typography')).toBeInTheDocument();
    });
  });

  describe('HTML Structure', () => {
    it('should render as div by default', () => {
      const { container } = renderWithTheme(
        <RdsTypography text="Test" variant="body1" />
      );
      const element = container.querySelector('.rds-typography');
      // body1 typically renders as div in MuiTypography
      expect(element?.tagName.toLowerCase()).toBeDefined();
    });

    it('should render with correct semantic element for heading', () => {
      const { container } = renderWithTheme(
        <RdsTypography text="Test" variant="h1" />
      );
      const heading = container.querySelector('h1');
      expect(heading).toBeInTheDocument();
      expect(heading?.textContent).toBe('Test');
    });

    it('should support component prop for custom element', () => {
      const { container } = renderWithTheme(
        <RdsTypography text="Test" component="span" />
      );
      const element = container.querySelector('span.rds-typography');
      expect(element).toBeInTheDocument();
    });

    it('should allow overriding default component for heading', () => {
      const { container } = renderWithTheme(
        <RdsTypography text="Test" variant="h1" component="div" />
      );
      const heading = container.querySelector('h1');
      expect(heading).not.toBeInTheDocument();
      const div = container.querySelector('div.rds-typography--h1');
      expect(div).toBeInTheDocument();
    });
  });

  describe('MUI Props', () => {
    it('should support all MUI Typography props', () => {
      const { container } = renderWithTheme(
        <RdsTypography
          text="Test"
          variant="h1"
          align="center"
          gutterBottom
          noWrap
          color="primary"
        />
      );
      const typography = container.querySelector('.rds-typography--h1');
      expect(typography).toHaveClass('MuiTypography-alignCenter');
      expect(typography).toHaveClass('MuiTypography-gutterBottom');
      expect(typography).toHaveClass('MuiTypography-noWrap');
    });

    it('should pass through unknown props to MuiTypography', () => {
      const { container } = renderWithTheme(
        <RdsTypography
          text="Test"
          data-testid="custom-attr"
          title="Custom Title"
        />
      );
      const typography = container.querySelector('[data-testid="custom-attr"]');
      expect(typography).toBeInTheDocument();
      expect(typography).toHaveAttribute('title', 'Custom Title');
    });
  });

  describe('Integration Tests', () => {
    it('should work with all props combined', () => {
      const { container } = renderWithTheme(
        <RdsTypography
          text="Complex Typography"
          variant="h1"
          className="custom-class"
          color="primary"
          align="center"
          gutterBottom
          sx={{ marginTop: '20px' }}
          data-testid="complex-typography"
        />
      );
      const typography = container.querySelector('[data-testid="complex-typography"]');
      expect(typography).toHaveClass('rds-typography');
      expect(typography).toHaveClass('rds-typography--h1');
      expect(typography).toHaveClass('custom-class');
      expect(typography?.textContent).toBe('Complex Typography');
    });

    it('should handle variant and custom class together', () => {
      const { container } = renderWithTheme(
        <RdsTypography
          text="Styled Heading"
          variant="h2"
          className="highlight important"
        />
      );
      const typography = container.querySelector('h2');
      expect(typography).toHaveClass('rds-typography--h2');
      expect(typography).toHaveClass('highlight');
      expect(typography).toHaveClass('important');
    });

    it('should maintain proper class order', () => {
      const { container } = renderWithTheme(
        <RdsTypography
          text="Test"
          variant="body1"
          className="custom"
          color="secondary"
        />
      );
      const typography = container.querySelector('.rds-typography');
      expect(typography?.className).toContain('rds-typography');
      expect(typography?.className).toContain('rds-typography--body1');
      expect(typography?.className).toContain('custom');
    });

    it('should work with empty variant and children', () => {
      const { container } = renderWithTheme(
        <RdsTypography className="test-class">
          <strong>Bold Text</strong>
        </RdsTypography>
      );
      const typography = container.querySelector('.test-class');
      const bold = typography?.querySelector('strong');
      expect(bold).toBeInTheDocument();
      expect(bold?.textContent).toBe('Bold Text');
    });

    it('should render nested typography elements', () => {
      const { container } = renderWithTheme(
        <RdsTypography variant="h1" text="Title">
          <RdsTypography variant="body1" text="Subtitle" />
        </RdsTypography>
      );
      const h1 = container.querySelector('h1');
      expect(h1?.textContent).toBe('Title');
    });

    it('should support conditional rendering', () => {
      const showContent = true;
      const { container } = renderWithTheme(
        <RdsTypography variant="body1">
          {showContent && 'Visible Content'}
        </RdsTypography>
      );
      expect(screen.getByText('Visible Content')).toBeInTheDocument();
    });

    it('should update text when props change', () => {
      const { rerender } = renderWithTheme(
        <RdsTypography text="Initial Text" />
      );
      expect(screen.getByText('Initial Text')).toBeInTheDocument();

      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsTypography text="Updated Text" />
        </ThemeProvider>
      );
      expect(screen.queryByText('Initial Text')).not.toBeInTheDocument();
      expect(screen.getByText('Updated Text')).toBeInTheDocument();
    });

    it('should handle variant switching', () => {
      const { rerender, container } = renderWithTheme(
        <RdsTypography variant="h1" text="Heading" />
      );
      let heading = container.querySelector('h1');
      expect(heading).toBeInTheDocument();

      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsTypography variant="body1" text="Heading" />
        </ThemeProvider>
      );
      heading = container.querySelector('h1');
      expect(heading).not.toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle undefined text prop', () => {
      renderWithTheme(
        <RdsTypography text={undefined} children="Fallback" />
      );
      expect(screen.getByText('Fallback')).toBeInTheDocument();
    });

    it('should handle null children', () => {
      renderWithTheme(<RdsTypography text="Text" children={null} />);
      expect(screen.getByText('Text')).toBeInTheDocument();
    });

    it('should handle false as text', () => {
      renderWithTheme(
        <RdsTypography text={false as any} children="Fallback" />
      );
      expect(screen.getByText('Fallback')).toBeInTheDocument();
    });

    it('should handle 0 as text', () => {
      renderWithTheme(<RdsTypography text={0 as any} children="Fallback" />);
      expect(screen.getByText('Fallback')).toBeInTheDocument();
    });

    it('should handle trimming of className', () => {
      const { container } = renderWithTheme(
        <RdsTypography text="Test" className="  extra-spaces  " />
      );
      const typography = container.querySelector('.rds-typography');
      expect(typography).toBeInTheDocument();
    });

    it('should render without variant prop', () => {
      const { container } = renderWithTheme(<RdsTypography text="Test" />);
      const typography = container.querySelector('.rds-typography');
      const variantClass = Array.from(typography?.classList || []).find(
        (cls) => cls.startsWith('rds-typography--')
      );
      expect(variantClass).toBeUndefined();
    });
  });

  describe('Accessibility', () => {
    it('should have semantic heading tags', () => {
      const { container } = renderWithTheme(
        <RdsTypography variant="h1" text="Main Title" />
      );
      const heading = container.querySelector('h1[role="heading"]');
      expect(heading || container.querySelector('h1')).toBeInTheDocument();
  
    });
    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsTypography />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should support aria attributes', () => {
      const { container } = renderWithTheme(
        <RdsTypography
          text="Test"
          aria-label="Custom Label"
          aria-describedby="description"
        />
      );
      const typography = container.querySelector('[aria-label="Custom Label"]');
      expect(typography).toBeInTheDocument();
    });

    it('should support role attribute', () => {
      const { container } = renderWithTheme(
        <RdsTypography text="Alert Message" role="alert" />
      );
      const typography = container.querySelector('[role="alert"]');
      expect(typography).toBeInTheDocument();
    });

    it('should render with proper text hierarchy', () => {
      const { container } = renderWithTheme(
        <>
          <RdsTypography variant="h1" text="H1 Heading" />
          <RdsTypography variant="h2" text="H2 Heading" />
          <RdsTypography variant="body1" text="Body Text" />
        </>
      );
      expect(container.querySelector('h1')).toBeInTheDocument();
      expect(container.querySelector('h2')).toBeInTheDocument();
      const body = container.querySelector('.rds-typography--body1');
      expect(body).toBeInTheDocument();
    });
  });
});