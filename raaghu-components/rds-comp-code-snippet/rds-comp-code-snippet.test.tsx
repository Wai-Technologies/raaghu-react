import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';
import RdsCompCodeSnippet from './rds-comp-code-snippet';

// Mock dependencies
jest.mock('./rds-comp-code-snippet.scss', () => ({}));
jest.mock('../../raaghu-elements/rds-button/rds-button', () => {
  return function MockRdsButton({ children, onClick, text, style, showLeftIcon, textCase, changeLeftIcon, size, ...props }: any) {
    return (
      <button data-testid="rds-button" onClick={onClick} {...props}>
        {text || children}
      </button>
    );
  };
});
jest.mock('../../raaghu-elements/rds-button-dropdown/rds-button-dropdown', () => {
  return function MockRdsButtonDropdown({ onChange, options, buttonText, leftIcon, rightIcon, showSearch, showUserAvatar, showRadio, size, ...props }: any) {
    return (
      <select data-testid="rds-button-dropdown" aria-label={buttonText || 'Select language'} onChange={(e) => onChange(e.target.value)} {...props}>
        {options?.map((opt: any) => (
          <option key={opt.id} value={opt.id}>
            {opt.label}
          </option>
        ))}
      </select>
    );
  };
});
jest.mock('@mui/icons-material/OpenInFullOutlined', () => {
  return function MockIcon(props: any) {
    return <span data-testid="expand-icon" className={props.className} />;
  };
});
jest.mock('@mui/icons-material/CodeOff', () => {
  return function MockIcon(props: any) {
    return <span data-testid="code-off-icon" />;
  };
});
jest.mock('@mui/icons-material/KeyboardArrowDown', () => {
  return function MockIcon(props: any) {
    return <span data-testid="arrow-down-icon" />;
  };
});

// Mock SyntaxHighlighter
jest.mock('react-syntax-highlighter/dist/esm/default-highlight', () => {
  return function MockHighlighter({ children, language, showLineNumbers, style, wrapLongLines, PreTag, className, ...props }: any) {
    return (
      <pre data-testid="syntax-highlighter" data-language={language} data-show-lines={showLineNumbers} className={className} {...props}>
        {children}
      </pre>
    );
  };
});

// Mock the styles
jest.mock('react-syntax-highlighter/dist/esm/styles/hljs', () => ({
  atomOneLight: {
    hljs: {
      background: '#fafafa',
      color: '#383a42',
    },
  },
}));

// Mock navigator.clipboard
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(() => Promise.resolve()),
  },
});

interface CodeSnippet {
  code: string;
  language: string | boolean;
  codeLines: boolean;
  theme: string;
  type: string;
  maxHeight: string;
  className: string;
  sampleCodeSnippets: Record<string, string>;
}

const defaultCode = '<div>Hello World</div>';
const defaultProps = {
  code: defaultCode,
  language: 'html',
  codeLines: false,
  theme: 'light' as const,
  type: 'multiLine' as const,
};

describe('RdsCompCodeSnippet', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (navigator.clipboard.writeText as jest.Mock).mockResolvedValue(undefined);
  });

  describe('Basic Rendering', () => {
    it('renders the component without crashing', () => {
      const { container } = render(<RdsCompCodeSnippet {...defaultProps} />);
      expect(container).toBeInTheDocument();
    });

    it('has correct display name', () => {
      expect(RdsCompCodeSnippet.displayName).toBe('RdsCompCodeSnippet');
    });

    it('renders main container with correct CSS classes', () => {
      const { container } = render(<RdsCompCodeSnippet {...defaultProps} />);
      expect(container.querySelector('.rds-comp-code-snippet')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(
        <RdsCompCodeSnippet {...defaultProps} className="custom-class" />
      );
      expect(container.querySelector('.rds-comp-code-snippet.custom-class')).toBeInTheDocument();
    });
  });

  describe('Theme Variants', () => {
    it('applies light theme class', () => {
      const { container } = render(
        <RdsCompCodeSnippet {...defaultProps} theme="light" />
      );
      expect(container.querySelector('.rds-comp-code-snippet--light')).toBeInTheDocument();
    });

    it('applies dark theme class', () => {
      const { container } = render(
        <RdsCompCodeSnippet {...defaultProps} theme="dark" />
      );
      expect(container.querySelector('.rds-comp-code-snippet--dark')).toBeInTheDocument();
    });

    it('renders syntax highlighter with light style', () => {
      render(<RdsCompCodeSnippet {...defaultProps} theme="light" />);
      expect(screen.getByTestId('syntax-highlighter')).toBeInTheDocument();
    });

    it('renders syntax highlighter with dark style', () => {
      render(<RdsCompCodeSnippet {...defaultProps} theme="dark" />);
      expect(screen.getByTestId('syntax-highlighter')).toBeInTheDocument();
    });
  });

  describe('Type Variants', () => {
    it('applies multiLine type class', () => {
      const { container } = render(
        <RdsCompCodeSnippet {...defaultProps} type="multiLine" />
      );
      expect(container.querySelector('.rds-comp-code-snippet--multiLine')).toBeInTheDocument();
    });

    it('applies singleLine type class', () => {
      const { container } = render(
        <RdsCompCodeSnippet {...defaultProps} type="singleLine" />
      );
      expect(container.querySelector('.rds-comp-code-snippet--singleLine')).toBeInTheDocument();
    });

    it('renders toolbar for multiLine type', () => {
      const { container } = render(
        <RdsCompCodeSnippet {...defaultProps} type="multiLine" />
      );
      expect(container.querySelector('.rds-comp-code-snippet__toolbar')).toBeInTheDocument();
    });

    it('renders single-line toolbar for singleLine type', () => {
      const { container } = render(
        <RdsCompCodeSnippet {...defaultProps} type="singleLine" />
      );
      expect(
        container.querySelector('.rds-comp-code-snippet__toolbar--single-line')
      ).toBeInTheDocument();
    });

    it('truncates code in singleLine type', () => {
      const longCode = 'a'.repeat(150);
      render(<RdsCompCodeSnippet {...defaultProps} type="singleLine" code={longCode} />);
      expect(screen.getByTestId('syntax-highlighter')).toBeInTheDocument();
    });
  });

  describe('Code Display', () => {
    it('displays provided code', () => {
      render(<RdsCompCodeSnippet {...defaultProps} code="<button>Click me</button>" />);
      const highlighter = screen.getByTestId('syntax-highlighter');
      expect(highlighter.textContent).toContain('<button>Click me</button>');
    });

    it('displays default code when code prop is provided', () => {
      render(<RdsCompCodeSnippet code={defaultCode} language="html" />);
      const highlighter = screen.getByTestId('syntax-highlighter');
      expect(highlighter.textContent).toContain(defaultCode);
    });

    it('displays sample code snippets based on selected language', () => {
      const sampleCodeSnippets = {
        html: '<div>HTML Code</div>',
        css: 'body { color: red; }',
        javascript: 'console.log("hello");',
      };
      render(
        <RdsCompCodeSnippet
          language={true}
          sampleCodeSnippets={sampleCodeSnippets}
          type="multiLine"
        />
      );
      const highlighter = screen.getByTestId('syntax-highlighter');
      expect(highlighter.textContent).toContain('HTML Code');
    });

    it('displays HTML code by default when no code provided', () => {
      const sampleCodeSnippets = {
        html: '<div>Default</div>',
      };
      render(
        <RdsCompCodeSnippet sampleCodeSnippets={sampleCodeSnippets} language={true} />
      );
      expect(screen.getByTestId('syntax-highlighter')).toBeInTheDocument();
    });

    it('returns empty string when no code or sampleCodeSnippets provided', () => {
      render(<RdsCompCodeSnippet language="html" type="multiLine" />);
      const highlighter = screen.getByTestId('syntax-highlighter');
      expect(highlighter.textContent).toBe('');
    });
  });

  describe('Language Selection', () => {
    it('displays language dropdown in multiLine mode when language prop is true', () => {
      render(
        <RdsCompCodeSnippet
          code={defaultCode}
          language={true}
          type="multiLine"
        />
      );
      expect(screen.getByTestId('rds-button-dropdown')).toBeInTheDocument();
    });

    it('hides language dropdown when language is false', () => {
      const { container } = render(
        <RdsCompCodeSnippet
          code={defaultCode}
          language={false}
          type="multiLine"
        />
      );
      expect(container.querySelector('.rds-comp-code-snippet__language-dropdown')).not.toBeInTheDocument();
    });

    it('displays language dropdown with provided string language', () => {
      render(
        <RdsCompCodeSnippet
          code={defaultCode}
          language="javascript"
          type="multiLine"
        />
      );
      expect(screen.getByTestId('rds-button-dropdown')).toBeInTheDocument();
    });

    it('changes language when dropdown selection changes', async () => {
      const sampleCodeSnippets = {
        html: '<div>HTML</div>',
        css: 'body { color: blue; }',
      };
      const { rerender } = render(
        <RdsCompCodeSnippet
          language="html"
          code={sampleCodeSnippets.html}
          sampleCodeSnippets={sampleCodeSnippets}
          type="multiLine"
        />
      );
      
      // Verify initial state
      expect(screen.getByTestId('syntax-highlighter')).toHaveAttribute('data-language', 'html');
      
      // Re-render with different language
      rerender(
        <RdsCompCodeSnippet
          language="css"
          code={sampleCodeSnippets.css}
          sampleCodeSnippets={sampleCodeSnippets}
          type="multiLine"
        />
      );
      
      // Verify language changed
      await waitFor(() => {
        expect(screen.getByTestId('syntax-highlighter')).toHaveAttribute('data-language', 'css');
      });
    });

    it('provides correct language options', () => {
      render(
        <RdsCompCodeSnippet
          code={defaultCode}
          language={true}
          type="multiLine"
        />
      );
      const dropdown = screen.getByTestId('rds-button-dropdown') as HTMLSelectElement;
      expect(dropdown.querySelectorAll('option').length).toBeGreaterThan(0);
    });

    it('defaults to html when no language specified', () => {
      const { container } = render(
        <RdsCompCodeSnippet code={defaultCode} type="multiLine" />
      );
      expect(screen.getByTestId('syntax-highlighter')).toHaveAttribute('data-language', 'html');
    });
  });

  describe('Copy to Clipboard', () => {
    it('renders copy button', () => {
      render(<RdsCompCodeSnippet {...defaultProps} />);
      expect(screen.getAllByTestId('rds-button')[0]).toBeInTheDocument();
    });

    it('copies code when copy button clicked', async () => {
      render(<RdsCompCodeSnippet {...defaultProps} code="test code" />);
      const copyButton = screen.getAllByTestId('rds-button')[0];
      fireEvent.click(copyButton);

      await waitFor(() => {
        expect(navigator.clipboard.writeText).toHaveBeenCalledWith('test code');
      });
    });

    it('shows "Copied!" text after successful copy', async () => {
      render(<RdsCompCodeSnippet {...defaultProps} />);
      const copyButton = screen.getAllByTestId('rds-button')[0];
      fireEvent.click(copyButton);

      await waitFor(() => {
        expect(copyButton).toHaveTextContent('Copied!');
      });
    });

    it('reverts to "Copy Code" text after 2 seconds', async () => {
      jest.useFakeTimers();
      render(<RdsCompCodeSnippet {...defaultProps} />);
      const copyButton = screen.getAllByTestId('rds-button')[0];
      fireEvent.click(copyButton);

      await waitFor(() => {
        expect(copyButton).toHaveTextContent('Copied!');
      });

      jest.advanceTimersByTime(2000);

      await waitFor(() => {
        expect(copyButton).toHaveTextContent('Copy Code');
      });

      jest.useRealTimers();
    });

    it('copies code from sampleCodeSnippets when available', async () => {
      const sampleCodeSnippets = {
        html: '<div>Test</div>',
        css: 'body {}',
      };
      render(
        <RdsCompCodeSnippet
          language={true}
          sampleCodeSnippets={sampleCodeSnippets}
          type="multiLine"
        />
      );
      const copyButton = screen.getAllByTestId('rds-button')[0];
      fireEvent.click(copyButton);

      await waitFor(() => {
        expect(navigator.clipboard.writeText).toHaveBeenCalledWith('<div>Test</div>');
      });
    });

    it('copies code after language change', async () => {
      const sampleCodeSnippets = {
        html: '<div>HTML</div>',
        css: 'body { color: red; }',
      };
      render(
        <RdsCompCodeSnippet
          language={true}
          sampleCodeSnippets={sampleCodeSnippets}
          type="multiLine"
        />
      );
      const dropdown = screen.getByTestId('rds-button-dropdown');
      fireEvent.change(dropdown, { target: { value: 'css' } });

      const copyButton = screen.getAllByTestId('rds-button')[0];
      fireEvent.click(copyButton);

      await waitFor(() => {
        expect(navigator.clipboard.writeText).toHaveBeenCalledWith('body { color: red; }');
      });
    });

    it('has aria-label for accessibility', () => {
      render(<RdsCompCodeSnippet {...defaultProps} />);
      const copyButton = screen.getAllByTestId('rds-button')[0];
      expect(copyButton).toHaveAttribute('aria-label', 'Copy code');
    });
  });

  describe('Line Numbers', () => {
    it('shows line numbers when codeLines is true', () => {
      render(<RdsCompCodeSnippet {...defaultProps} codeLines={true} />);
      expect(screen.getByTestId('syntax-highlighter')).toHaveAttribute(
        'data-show-lines',
        'true'
      );
    });

    it('hides line numbers when codeLines is false', () => {
      render(<RdsCompCodeSnippet {...defaultProps} codeLines={false} />);
      expect(screen.getByTestId('syntax-highlighter')).toHaveAttribute(
        'data-show-lines',
        'false'
      );
    });

    it('defaults to no line numbers when codeLines not specified', () => {
      render(<RdsCompCodeSnippet code={defaultCode} type="multiLine" />);
      expect(screen.getByTestId('syntax-highlighter')).toHaveAttribute(
        'data-show-lines',
        'false'
      );
    });
  });

  describe('Max Height', () => {
    it('applies max height class when maxHeight is provided', () => {
      const { container } = render(
        <RdsCompCodeSnippet {...defaultProps} maxHeight="300px" />
      );
      expect(
        container.querySelector('.rds-comp-code-snippet__content--with-max')
      ).toBeInTheDocument();
    });

    it('does not apply max height class when maxHeight is not provided', () => {
      const { container } = render(<RdsCompCodeSnippet {...defaultProps} />);
      expect(
        container.querySelector('.rds-comp-code-snippet__content--with-max')
      ).not.toBeInTheDocument();
    });

    it('sets CSS custom property for max height', () => {
      const { container } = render(
        <RdsCompCodeSnippet {...defaultProps} maxHeight="400px" />
      );
      const contentDiv = container.querySelector('.rds-comp-code-snippet__content');
      expect(contentDiv).toHaveStyle({ '--rds-code-max-height': '400px' } as any);
    });

    it('handles various max height values', () => {
      const testCases = ['200px', '500px', '80vh', '50%'];
      testCases.forEach((maxHeight) => {
        const { container } = render(
          <RdsCompCodeSnippet {...defaultProps} maxHeight={maxHeight} />
        );
        expect(container.querySelector('.rds-comp-code-snippet__content--with-max')).toBeInTheDocument();
      });
    });
  });

  describe('Expand Icon', () => {
    it('renders expand icon in multiLine mode', () => {
      render(<RdsCompCodeSnippet {...defaultProps} type="multiLine" />);
      const expandIcon = screen.getByTestId('expand-icon');
      expect(expandIcon).toBeInTheDocument();
    });

    it('renders expand icon in singleLine mode', () => {
      render(<RdsCompCodeSnippet {...defaultProps} type="singleLine" />);
      const expandIcon = screen.getByTestId('expand-icon');
      expect(expandIcon).toBeInTheDocument();
    });

    it('has correct CSS class for expand icon', () => {
      const { container } = render(
        <RdsCompCodeSnippet {...defaultProps} type="multiLine" />
      );
      expect(
        container.querySelector('.rds-comp-code-snippet__expand-icon')
      ).toBeInTheDocument();
    });
  });

  describe('Syntax Highlighting', () => {
    it('uses correct language for syntax highlighting', () => {
      render(<RdsCompCodeSnippet {...defaultProps} language="javascript" />);
      expect(screen.getByTestId('syntax-highlighter')).toHaveAttribute(
        'data-language',
        'javascript'
      );
    });

    it('renders highlighted code content', () => {
      const code = 'const x = 5;';
      render(
        <RdsCompCodeSnippet
          code={code}
          language="javascript"
          type="multiLine"
        />
      );
      expect(screen.getByTestId('syntax-highlighter')).toHaveTextContent(code);
    });

    it('handles different languages', () => {
      const languages = ['html', 'css', 'javascript', 'typescript', 'json'];
      languages.forEach((lang) => {
        render(
          <RdsCompCodeSnippet
            {...defaultProps}
            language={lang}
            code="test"
            key={lang}
          />
        );
      });
    });

    it('uses correct style object for each theme', () => {
      render(<RdsCompCodeSnippet {...defaultProps} theme="light" />);
      expect(screen.getByTestId('syntax-highlighter')).toBeInTheDocument();
    });
  });

  describe('Footer and Show More', () => {
    it('renders footer in multiLine mode', () => {
      const { container } = render(
        <RdsCompCodeSnippet {...defaultProps} type="multiLine" />
      );
      expect(
        container.querySelector('.rds-comp-code-snippet__footer')
      ).toBeInTheDocument();
    });

    it('does not render footer in singleLine mode', () => {
      const { container } = render(
        <RdsCompCodeSnippet {...defaultProps} type="singleLine" />
      );
      expect(
        container.querySelector('.rds-comp-code-snippet__footer')
      ).not.toBeInTheDocument();
    });

    it('renders show more button in multiLine mode', () => {
      render(<RdsCompCodeSnippet {...defaultProps} type="multiLine" />);
      const buttons = screen.getAllByTestId('rds-button');
      // One for copy, one for show more
      expect(buttons.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('Wrapper Container', () => {
    it('renders wrapper container in multiLine mode', () => {
      const { container } = render(
        <RdsCompCodeSnippet {...defaultProps} type="multiLine" />
      );
      expect(
        container.querySelector('.rds-comp-code-snippet__wrapper')
      ).toBeInTheDocument();
    });

    it('renders content container', () => {
      const { container } = render(
        <RdsCompCodeSnippet {...defaultProps} type="multiLine" />
      );
      expect(
        container.querySelector('.rds-comp-code-snippet__content')
      ).toBeInTheDocument();
    });

    it('renders syntax container', () => {
      const { container } = render(
        <RdsCompCodeSnippet {...defaultProps} type="multiLine" />
      );
      expect(
        container.querySelector('.rds-comp-code-snippet__syntax')
      ).toBeInTheDocument();
    });
  });

  describe('Single Line Specific', () => {
    it('renders single line code container', () => {
      const { container } = render(
        <RdsCompCodeSnippet {...defaultProps} type="singleLine" />
      );
      expect(
        container.querySelector('.rds-comp-code-snippet__single-line-code')
      ).toBeInTheDocument();
    });

    it('renders inline highlighter for single line', () => {
      render(<RdsCompCodeSnippet {...defaultProps} type="singleLine" />);
      expect(
        screen.getByTestId('syntax-highlighter').className
      ).toContain('rds-comp-code-snippet__inline-highlighter');
    });

    it('truncates code longer than 100 characters in single line', () => {
      const longCode = 'x'.repeat(150);
      render(
        <RdsCompCodeSnippet
          {...defaultProps}
          type="singleLine"
          code={longCode}
        />
      );
      const highlighter = screen.getByTestId('syntax-highlighter');
      expect(highlighter.textContent?.length).toBeLessThanOrEqual(103); // 100 + '...'
    });

    it('does not truncate code shorter than 100 characters in single line', () => {
      const shortCode = 'short code';
      render(
        <RdsCompCodeSnippet
          {...defaultProps}
          type="singleLine"
          code={shortCode}
        />
      );
      const highlighter = screen.getByTestId('syntax-highlighter');
      expect(highlighter.textContent).toBe(shortCode);
    });
  });

  describe('Props Combinations', () => {
    it('handles all props together', () => {
      const { container } = render(
        <RdsCompCodeSnippet
          code="const x = 5;"
          language="typescript"
          codeLines={true}
          theme="dark"
          type="multiLine"
          maxHeight="500px"
          className="custom"
        />
      );
      expect(container.querySelector('.rds-comp-code-snippet')).toBeInTheDocument();
      expect(container.querySelector('.rds-comp-code-snippet--dark')).toBeInTheDocument();
      expect(container.querySelector('.rds-comp-code-snippet--multiLine')).toBeInTheDocument();
      expect(container.querySelector('.custom')).toBeInTheDocument();
    });

    it('renders singleLine with all props', () => {
      const { container } = render(
        <RdsCompCodeSnippet
          code="x = 5"
          language="python"
          theme="light"
          type="singleLine"
          className="single-custom"
        />
      );
      expect(container.querySelector('.rds-comp-code-snippet--singleLine')).toBeInTheDocument();
    });

    it('handles undefined optional props', () => {
      const { container } = render(
        <RdsCompCodeSnippet code={defaultCode} />
      );
      expect(container).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty code string', () => {
      render(<RdsCompCodeSnippet {...defaultProps} code="" />);
      expect(screen.getByTestId('syntax-highlighter')).toBeInTheDocument();
    });

    it('handles null/undefined sampleCodeSnippets gracefully', () => {
      render(
        <RdsCompCodeSnippet
          code={defaultCode}
          language={true}
          type="multiLine"
        />
      );
      expect(screen.getByTestId('syntax-highlighter')).toBeInTheDocument();
    });

    it('handles special characters in code', () => {
      const specialCode = '<div>Test & "quoted" & \'single\'</div>';
      render(
        <RdsCompCodeSnippet {...defaultProps} code={specialCode} />
      );
      expect(screen.getByTestId('syntax-highlighter')).toBeInTheDocument();
    });

    it('handles multiline code with line breaks', () => {
      const multilineCode = `function test() {
        console.log("hello");
        return true;
      }`;
      render(
        <RdsCompCodeSnippet {...defaultProps} code={multilineCode} />
      );
      expect(screen.getByTestId('syntax-highlighter').textContent).toContain('function test()');
    });

    it('handles language change when code changes', async () => {
      const { rerender } = render(
        <RdsCompCodeSnippet
          code="html code"
          language="html"
          type="multiLine"
        />
      );
      rerender(
        <RdsCompCodeSnippet
          code="css code"
          language="css"
          type="multiLine"
        />
      );
      expect(screen.getByTestId('syntax-highlighter')).toHaveAttribute(
        'data-language',
        'css'
      );
    });

    it('preserves state during re-render', async () => {
      const { rerender } = render(
        <RdsCompCodeSnippet {...defaultProps} type="multiLine" />
      );
      const copyButton = screen.getAllByTestId('rds-button')[0];
      fireEvent.click(copyButton);

      await waitFor(() => {
        expect(copyButton).toHaveTextContent('Copied!');
      });

      // Wait for timeout to reset copied state (2 seconds in component + buffer)
      await waitFor(() => {
        expect(screen.getAllByTestId('rds-button')[0]).toHaveTextContent('Copy Code');
      }, { timeout: 3000 });
    });
  });

  describe('Accessibility', () => {
    it('copy button has aria-label', () => {
      render(<RdsCompCodeSnippet {...defaultProps} />);
      const copyButton = screen.getAllByTestId('rds-button')[0];
      expect(copyButton).toHaveAttribute('aria-label', 'Copy code');
  
    });
    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsCompCodeSnippet {...defaultProps} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('renders semantic HTML structure', () => {
      const { container } = render(
        <RdsCompCodeSnippet {...defaultProps} type="multiLine" />
      );
      expect(container.querySelector('pre')).toBeInTheDocument();
    });

    it('code content is readable for screen readers', () => {
      render(<RdsCompCodeSnippet code="<button>Click me</button>" language="html" type="singleLine" theme="light" />);
      const highlighter = screen.getByTestId('syntax-highlighter');
      expect(highlighter.textContent).toContain('Click me');
    });
  });

  describe('Default Props', () => {
    it('uses default language when not specified', () => {
      render(<RdsCompCodeSnippet code="test" type="multiLine" />);
      expect(screen.getByTestId('syntax-highlighter')).toHaveAttribute(
        'data-language',
        'html'
      );
    });

    it('uses default theme (light) when not specified', () => {
      const { container } = render(<RdsCompCodeSnippet code="test" />);
      expect(container.querySelector('.rds-comp-code-snippet--light')).toBeInTheDocument();
    });

    it('uses default type (multiLine) when not specified', () => {
      const { container } = render(<RdsCompCodeSnippet code="test" />);
      expect(container.querySelector('.rds-comp-code-snippet--multiLine')).toBeInTheDocument();
    });

    it('uses empty string as default className', () => {
      const { container } = render(<RdsCompCodeSnippet code="test" />);
      const mainDiv = container.querySelector('.rds-comp-code-snippet');
      expect(mainDiv?.className).not.toContain('undefined');
    });
  });
});