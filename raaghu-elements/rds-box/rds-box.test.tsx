import React from 'react';
import { render, screen } from '@testing-library/react';
import RdsBox, { RdsBoxProps } from './rds-box';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';

// Mock SCSS
jest.mock('./rds-box.scss', () => ({}));

describe('RdsBox', () => {
  const defaultProps: RdsBoxProps = {
    children: 'Test Content',
  };

  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      const { container } = render(<RdsBox {...defaultProps} />);
      expect(container.querySelector('.rds-box')).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsBox.displayName).toBe('RdsBox');
    });

    it('should render MUI Box component', () => {
      const { container } = render(<RdsBox {...defaultProps} />);
      expect(container.querySelector('.MuiBox-root')).toBeInTheDocument();
    });

    it('should render rds-box class', () => {
      const { container } = render(<RdsBox {...defaultProps} />);
      expect(container.querySelector('.rds-box')).toBeInTheDocument();
    });

    it('should render div element', () => {
      const { container } = render(<RdsBox {...defaultProps} />);
      const div = container.querySelector('.rds-box');
      expect(div?.tagName).toBe('DIV');
    });
  });

  describe('Children Rendering', () => {
    it('should render text children', () => {
      render(<RdsBox>Hello World</RdsBox>);
      expect(screen.getByText('Hello World')).toBeInTheDocument();
    });

    it('should render multiple children', () => {
      render(
        <RdsBox>
          <span>Child 1</span>
          <span>Child 2</span>
        </RdsBox>
      );
      expect(screen.getByText('Child 1')).toBeInTheDocument();
      expect(screen.getByText('Child 2')).toBeInTheDocument();
    });

    it('should render component children', () => {
      const TestComponent = () => <div>Component Content</div>;
      render(
        <RdsBox>
          <TestComponent />
        </RdsBox>
      );
      expect(screen.getByText('Component Content')).toBeInTheDocument();
    });

    it('should render JSX children', () => {
      render(
        <RdsBox>
          <button>Click Me</button>
        </RdsBox>
      );
      expect(screen.getByRole('button', { name: 'Click Me' })).toBeInTheDocument();
    });

    it('should render undefined children without error', () => {
      const { container } = render(<RdsBox>{undefined}</RdsBox>);
      expect(container.querySelector('.rds-box')).toBeInTheDocument();
    });

    it('should render null children without error', () => {
      const { container } = render(<RdsBox>{null}</RdsBox>);
      expect(container.querySelector('.rds-box')).toBeInTheDocument();
    });

    it('should render empty arrays without error', () => {
      const { container } = render(<RdsBox>{[]}</RdsBox>);
      expect(container.querySelector('.rds-box')).toBeInTheDocument();
    });

    it('should render without children', () => {
      const { container } = render(<RdsBox />);
      expect(container.querySelector('.rds-box')).toBeInTheDocument();
    });

    it('should render deeply nested children', () => {
      render(
        <RdsBox>
          <div>
            <div>
              <span>Nested Content</span>
            </div>
          </div>
        </RdsBox>
      );
      expect(screen.getByText('Nested Content')).toBeInTheDocument();
    });
  });

  describe('Class Name Handling', () => {
    it('should merge rds-box class with custom className', () => {
      const { container } = render(<RdsBox className="custom-class" />);
      const element = container.querySelector('.rds-box');
      expect(element).toHaveClass('rds-box');
      expect(element).toHaveClass('custom-class');
    });

    it('should render rds-box class without custom className', () => {
      const { container } = render(<RdsBox />);
      const element = container.querySelector('.rds-box');
      expect(element).toHaveClass('rds-box');
    });

    it('should handle multiple className strings', () => {
      const { container } = render(
        <RdsBox className="class1 class2 class3" />
      );
      const element = container.querySelector('.rds-box');
      expect(element).toHaveClass('rds-box');
      expect(element).toHaveClass('class1');
      expect(element).toHaveClass('class2');
      expect(element).toHaveClass('class3');
    });

    it('should not render empty className', () => {
      const { container } = render(<RdsBox className="" />);
      const element = container.querySelector('.rds-box');
      expect(element).toHaveClass('rds-box');
    });

    it('should handle className with special characters', () => {
      const { container } = render(<RdsBox className="class-with-dash" />);
      const element = container.querySelector('.rds-box');
      expect(element).toHaveClass('class-with-dash');
    });

    it('should handle className with underscores', () => {
      const { container } = render(<RdsBox className="class_with_underscore" />);
      const element = container.querySelector('.rds-box');
      expect(element).toHaveClass('class_with_underscore');
    });

    it('should handle className with numbers', () => {
      const { container } = render(<RdsBox className="class123" />);
      const element = container.querySelector('.rds-box');
      expect(element).toHaveClass('class123');
    });
  });

  describe('MUI Box Props', () => {
    it('should accept sx prop', () => {
      const { container } = render(
        <RdsBox sx={{ backgroundColor: 'red', padding: '10px' }} />
      );
      expect(container.querySelector('.rds-box')).toBeInTheDocument();
    });

    it('should accept component prop', () => {
      const { container } = render(
        <RdsBox component="section" />
      );
      expect(container.querySelector('section.rds-box')).toBeInTheDocument();
    });

    it('should accept display prop', () => {
      const { container } = render(
        <RdsBox display="flex" />
      );
      expect(container.querySelector('.rds-box')).toBeInTheDocument();
    });

    it('should accept flexDirection prop', () => {
      const { container } = render(
        <RdsBox display="flex" flexDirection="column" />
      );
      expect(container.querySelector('.rds-box')).toBeInTheDocument();
    });

    it('should accept padding prop', () => {
      const { container } = render(
        <RdsBox padding="20px" />
      );
      expect(container.querySelector('.rds-box')).toBeInTheDocument();
    });

    it('should accept margin prop', () => {
      const { container } = render(
        <RdsBox margin="10px" />
      );
      expect(container.querySelector('.rds-box')).toBeInTheDocument();
    });

    it('should accept width and height props', () => {
      const { container } = render(
        <RdsBox width="100px" height="100px" />
      );
      expect(container.querySelector('.rds-box')).toBeInTheDocument();
    });

    it('should accept border prop', () => {
      const { container } = render(
        <RdsBox border="1px solid black" />
      );
      expect(container.querySelector('.rds-box')).toBeInTheDocument();
    });

    it('should accept borderRadius prop', () => {
      const { container } = render(
        <RdsBox borderRadius="8px" />
      );
      expect(container.querySelector('.rds-box')).toBeInTheDocument();
    });

    it('should accept backgroundColor prop', () => {
      const { container } = render(
        <RdsBox bgcolor="lightgray" />
      );
      expect(container.querySelector('.rds-box')).toBeInTheDocument();
    });
  });

  describe('Spread Props', () => {
    it('should accept data-testid prop', () => {
      const { container } = render(
        <RdsBox data-testid="custom-box" />
      );
      expect(container.querySelector('[data-testid="custom-box"]')).toBeInTheDocument();
    });

    it('should accept id prop', () => {
      const { container } = render(
        <RdsBox id="box-id" />
      );
      expect(container.querySelector('#box-id')).toBeInTheDocument();
    });

    it('should accept role prop', () => {
      const { container } = render(
        <RdsBox role="region" />
      );
      expect(container.querySelector('[role="region"]')).toBeInTheDocument();
    });

    it('should accept aria-label prop', () => {
      const { container } = render(
        <RdsBox aria-label="Custom Box" />
      );
      expect(container.querySelector('[aria-label="Custom Box"]')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle very long content', () => {
      const longContent = 'A'.repeat(1000);
      render(<RdsBox>{longContent}</RdsBox>);
      expect(screen.getByText(longContent)).toBeInTheDocument();
    });

    it('should handle special characters in children', () => {
      render(<RdsBox>{'<script>alert("XSS")</script>'}</RdsBox>);
      expect(screen.getByText('<script>alert("XSS")</script>')).toBeInTheDocument();
    });

    it('should handle unicode characters', () => {
      render(<RdsBox>{'🏠 Home 🚀'}</RdsBox>);
      expect(screen.getByText('🏠 Home 🚀')).toBeInTheDocument();
    });

    it('should handle whitespace in children', () => {
      render(
        <RdsBox>
          {'   Content with spaces   '}
        </RdsBox>
      );
      expect(screen.getByText(/Content with spaces/)).toBeInTheDocument();
    });

    it('should handle empty string children', () => {
      const { container } = render(<RdsBox>{''}</RdsBox>);
      expect(container.querySelector('.rds-box')).toBeInTheDocument();
    });

    it('should handle rapid re-renders', () => {
      const { rerender } = render(<RdsBox>Content 1</RdsBox>);
      rerender(<RdsBox>Content 2</RdsBox>);
      rerender(<RdsBox>Content 3</RdsBox>);
      expect(screen.getByText('Content 3')).toBeInTheDocument();
    });
  });

  describe('Props Combinations', () => {
    it('should handle className with Box props', () => {
      const { container } = render(
        <RdsBox className="custom" padding="20px" display="flex" />
      );
      const element = container.querySelector('.rds-box');
      expect(element).toHaveClass('rds-box');
      expect(element).toHaveClass('custom');
    });

    it('should handle all props together', () => {
      const { container } = render(
        <RdsBox
          className="custom-class"
          sx={{ backgroundColor: 'blue' }}
          padding="10px"
          margin="5px"
          data-testid="full-box"
        >
          Full Props Box
        </RdsBox>
      );
      const element = container.querySelector('[data-testid="full-box"]');
      expect(element).toHaveClass('rds-box');
      expect(element).toHaveClass('custom-class');
      expect(screen.getByText('Full Props Box')).toBeInTheDocument();
    });

    it('should handle component and className together', () => {
      const { container } = render(
        <RdsBox component="article" className="article-box" />
      );
      expect(container.querySelector('article.rds-box')).toBeInTheDocument();
      expect(container.querySelector('article')).toHaveClass('article-box');
    });

    it('should handle sx and className together', () => {
      const { container } = render(
        <RdsBox
          className="style-class"
          sx={{ padding: '20px', margin: '10px' }}
        />
      );
      const element = container.querySelector('.rds-box');
      expect(element).toHaveClass('style-class');
      expect(element).toBeInTheDocument();
    });
  });

  describe('Default Props', () => {
    it('should render with no props', () => {
      const { container } = render(<RdsBox />);
      expect(container.querySelector('.rds-box')).toBeInTheDocument();
    });

    it('should render with only children prop', () => {
      render(<RdsBox>Child Content</RdsBox>);
      expect(screen.getByText('Child Content')).toBeInTheDocument();
    });

    it('should render with only className prop', () => {
      const { container } = render(<RdsBox className="only-class" />);
      const element = container.querySelector('.rds-box');
      expect(element).toHaveClass('only-class');
    });
  });

  describe('Component Integration', () => {
    it('should work with React Fragment children', () => {
      render(
        <RdsBox>
          <>
            <span>Fragment Child 1</span>
            <span>Fragment Child 2</span>
          </>
        </RdsBox>
      );
      expect(screen.getByText('Fragment Child 1')).toBeInTheDocument();
      expect(screen.getByText('Fragment Child 2')).toBeInTheDocument();
    });

    it('should work with custom React components', () => {
      const CustomComponent = ({ text }: { text: string }) => <div>{text}</div>;
      render(
        <RdsBox>
          <CustomComponent text="Custom Component Text" />
        </RdsBox>
      );
      expect(screen.getByText('Custom Component Text')).toBeInTheDocument();
    });

    it('should work as a container for form elements', () => {
      render(
        <RdsBox>
          <input type="text" placeholder="Enter text" />
          <button>Submit</button>
        </RdsBox>
      );
      expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should work with nested RdsBox components', () => {
      const { container } = render(
        <RdsBox className="outer">
          <RdsBox className="inner">
            Nested Content
          </RdsBox>
        </RdsBox>
      );
      const outer = container.querySelector('.outer');
      const inner = container.querySelector('.inner');
      expect(outer).toBeInTheDocument();
      expect(inner).toBeInTheDocument();
      expect(inner?.parentElement).toBe(outer);
    });
  });

  describe('Styling and Layout', () => {
    it('should render as a layout container', () => {
      const { container } = render(
        <RdsBox display="grid" gridTemplateColumns="1fr 1fr">
          <div>Grid Item 1</div>
          <div>Grid Item 2</div>
        </RdsBox>
      );
      expect(container.querySelector('.rds-box')).toBeInTheDocument();
    });

    it('should support flexbox layouts', () => {
      const { container } = render(
        <RdsBox display="flex" justifyContent="center" alignItems="center">
          Centered Content
        </RdsBox>
      );
      expect(screen.getByText('Centered Content')).toBeInTheDocument();
    });

    it('should support responsive props', () => {
      const { container } = render(
        <RdsBox sx={{ width: { xs: '100%', sm: '80%', md: '60%' } }} />
      );
      expect(container.querySelector('.rds-box')).toBeInTheDocument();
    });
  });

  describe('Type Safety', () => {
    it('should accept valid BoxProps', () => {
      const { container } = render(
        <RdsBox
          component="div"
          className="test"
          padding={2}
          margin={1}
        >
          Test
        </RdsBox>
      );
      expect(container.querySelector('.rds-box')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsBox {...defaultProps} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
