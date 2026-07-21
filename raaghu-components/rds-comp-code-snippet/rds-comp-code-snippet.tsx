import React, { useState } from "react";
import "./rds-comp-code-snippet.scss";
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/default-highlight';
import { atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { CopyButton, SingleLineSnippet, MultiLineSnippet } from "./rds-comp-code-snippet-helpers";

const darkStyle = {
  ...atomOneLight as any,
  hljs: {
    ...((atomOneLight as any).hljs || {}),
    background: 'var(--rds-code-bg, #0b1220)',
    color: 'var(--rds-code-color, #e6eef6)',
  },
};

const Highlighter = SyntaxHighlighter as unknown as React.ComponentType<Record<string, unknown>>;

export interface RdsCompCodeSnippetProps {
  code?: string;
  language?: string | boolean;
  codeLines?: boolean;
  theme?: "light" | "dark";
  type?: "singleLine" | "multiLine";
  maxHeight?: string;
  className?: string;
  sampleCodeSnippets?: Record<string, string>;
}

const RdsCompCodeSnippet: React.FC<RdsCompCodeSnippetProps> = ({
  code,
  language = "html",
  codeLines = false,
  theme = "light",
  type = "multiLine",
  maxHeight,
  className = "",
  sampleCodeSnippets,
}) => {
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

  const showLanguage = !!language;
  const languageLabel = typeof language === 'string' ? language : 'html';
  const highlighterStyle = theme === 'dark' ? (darkStyle as any) : (atomOneLight as any);

  return (
    <div className={`rds-comp-code-snippet rds-comp-code-snippet--${theme} rds-comp-code-snippet--${type} ${className}`}>
      <div className="rds-comp-code-snippet__container">
        {type === "singleLine" ? (
          <SingleLineSnippet
            Highlighter={Highlighter}
            currentCode={currentCode}
            languageLabel={languageLabel}
            highlighterStyle={highlighterStyle}
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
          />
        )}
      </div>
    </div>
  );
};
RdsCompCodeSnippet.displayName = 'RdsCompCodeSnippet';
export default RdsCompCodeSnippet;
