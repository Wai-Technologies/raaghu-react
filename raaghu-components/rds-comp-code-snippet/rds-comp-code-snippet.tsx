import React, { useEffect, useState } from "react";
import "./rds-comp-code-snippet.scss";
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/default-highlight';
import { atomOneLight, atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { SingleLineSnippet, MultiLineSnippet } from "./rds-comp-code-snippet-helpers";
import Box from "@mui/material/Box";
import type { RdsStylingProps } from "../../raaghu-elements/shared/utils/styling-props";

type HighlighterTheme = Record<string, React.CSSProperties>;

const withBackground = (base: HighlighterTheme | undefined, background: string): HighlighterTheme => ({
  ...(base ?? {}),
  hljs: { ...(base?.hljs ?? {}), background, color: 'var(--rds-code-snippet-fg)', ...(background === 'transparent' ? { overflowX: 'hidden', padding: 0 } : {}) },
});

const LIGHT_STYLE = withBackground(atomOneLight as HighlighterTheme, 'var(--rds-code-snippet-code-bg)');
const DARK_STYLE = withBackground(atomOneDark as HighlighterTheme, 'var(--rds-code-snippet-code-bg)');
const LIGHT_INLINE_STYLE = withBackground(atomOneLight as HighlighterTheme, 'transparent');
const DARK_INLINE_STYLE = withBackground(atomOneDark as HighlighterTheme, 'transparent');

const readPageTheme = (): 'light' | 'dark' => {
  if (typeof document === 'undefined') return 'light';
  const attr = document.documentElement.getAttribute('data-theme');
  if (attr === 'dark' || attr === 'light') return attr;
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const usePageTheme = (enabled: boolean): 'light' | 'dark' => {
  const [pageTheme, setPageTheme] = useState<'light' | 'dark'>(() => (enabled ? readPageTheme() : 'light'));
  useEffect(() => {
    if (!enabled || typeof document === 'undefined') return;
    const update = () => setPageTheme(readPageTheme());
    update();
    const observer = typeof MutationObserver !== 'undefined' ? new MutationObserver(update) : undefined;
    observer?.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    const media = window.matchMedia?.('(prefers-color-scheme: dark)');
    media?.addEventListener?.('change', update);
    return () => {
      observer?.disconnect();
      media?.removeEventListener?.('change', update);
    };
  }, [enabled]);
  return pageTheme;
};

const Highlighter = SyntaxHighlighter as unknown as React.ComponentType<Record<string, unknown>>;

export interface RdsCompCodeSnippetProps extends RdsStylingProps {
  code?: string;
  language?: string | boolean;
  codeLines?: boolean;
  /** `'auto'` follows the app theme (`data-theme` on <html>, else the OS setting). */
  theme?: "light" | "dark" | "auto";
  type?: "singleLine" | "multiLine";
  maxHeight?: string;
  className?: string;
  sampleCodeSnippets?: Record<string, string>;
}

const RdsCompCodeSnippet = React.forwardRef<HTMLDivElement, RdsCompCodeSnippetProps>(function RdsCompCodeSnippet({
  code,
  language = "html",
  codeLines = false,
  theme = "light",
  type = "multiLine",
  maxHeight,
  className = "",
  sampleCodeSnippets,
  sx,
  style,
}, ref) {
  const [copied, setCopied] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    typeof language === 'string' ? language : 'html'
  );

  const languageOptions = [
    { id: 'html', label: 'Html' },
    { id: 'css', label: 'CSS' },
    { id: 'javascript', label: 'JavaScript' },
    { id: 'typescript', label: 'TypeScript' },
    { id: 'json', label: 'JSON' },
  ];
  const getCurrentCode = (): string => {
    if (code) return code;
    if (!sampleCodeSnippets) return '';
    return sampleCodeSnippets[selectedLanguage as keyof typeof sampleCodeSnippets] || sampleCodeSnippets.html || '';
  };
  const currentCode = getCurrentCode();

  const handleLanguageChange = (val: string[] | string) => {
    const next = Array.isArray(val) ? val[0] : val;
    if (next) setSelectedLanguage(next as string);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Failed to copy text
    }
  };

  const pageTheme = usePageTheme(theme === 'auto');
  const resolvedTheme = theme === 'auto' ? pageTheme : theme === 'dark' ? 'dark' : 'light';
  const showLanguage = !!language;
  const languageLabel = typeof language === 'string' ? language : 'html';
  const highlighterStyle = resolvedTheme === 'dark' ? DARK_STYLE : LIGHT_STYLE;
  const inlineHighlighterStyle = resolvedTheme === 'dark' ? DARK_INLINE_STYLE : LIGHT_INLINE_STYLE;

  return (
    <Box ref={ref} className={`rds-comp-code-snippet rds-comp-code-snippet--${resolvedTheme} rds-comp-code-snippet--${type} ${className}`.trim()} sx={sx} style={style}>
      <div className="rds-comp-code-snippet__container">
        {type === "singleLine" ? (
          <SingleLineSnippet
            Highlighter={Highlighter}
            currentCode={currentCode}
            languageLabel={languageLabel}
            highlighterStyle={inlineHighlighterStyle}
            copied={copied}
            onCopy={handleCopy}
          />
        ) : (
          <MultiLineSnippet
            Highlighter={Highlighter}
            currentCode={currentCode}
            languageLabel={languageLabel}
            highlighterStyle={highlighterStyle}
            codeLines={codeLines}
            copied={copied}
            onCopy={handleCopy}
            showLanguage={showLanguage}
            selectedLanguage={selectedLanguage}
            languageOptions={languageOptions}
            onLanguageChange={handleLanguageChange}
            maxHeight={maxHeight}
            theme={resolvedTheme}
          />
        )}
      </div>
    </Box>
  );
});
RdsCompCodeSnippet.displayName = 'RdsCompCodeSnippet';
export default RdsCompCodeSnippet;
