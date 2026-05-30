import React, { useState } from "react";
import "./rds-comp-code-snippet.scss";
import OpenInFullOutlinedIcon from "@mui/icons-material/OpenInFullOutlined";
import CodeOffIcon from '@mui/icons-material/CodeOff';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import RdsButton from "../../raaghu-elements/rds-button/rds-button";
// @ts-expect-error no declaration file for react-syntax-highlighter subpath
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/default-highlight';
// @ts-expect-error no declaration file for react-syntax-highlighter styles subpath
import { atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import RdsButtonDropdown from "../../raaghu-elements/rds-button-dropdown/rds-button-dropdown";
const darkStyle = {
  ...atomOneLight as any,
  hljs: {
    ...((atomOneLight as any).hljs || {}),
    background: 'var(--rds-code-bg, #0b1220)',
    color: 'var(--rds-code-color, #e6eef6)',
  },
};

const Highlighter = SyntaxHighlighter as unknown as React.ComponentType<any>;

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

  const getLines = () => {
    return currentCode.split("\n");
  };

  const showLanguage = !!language;
  const languageLabel = typeof language === 'string' ? language : 'html';
  const highlighterStyle = theme === 'dark' ? (darkStyle as any) : (atomOneLight as any);

  return (
    <div className={`rds-comp-code-snippet rds-comp-code-snippet--${theme} rds-comp-code-snippet--${type} ${className}`}>
      <div className="rds-comp-code-snippet__container">
        {type === "singleLine" ? (
          <div className="rds-comp-code-snippet__toolbar rds-comp-code-snippet__toolbar--single-line">
              <span className="rds-comp-code-snippet__single-line-code">
              <Highlighter
                language={languageLabel as string}
                style={highlighterStyle}
                showLineNumbers={false}
                wrapLongLines={false}
                PreTag="span"
                className="rds-comp-code-snippet__inline-highlighter"
              >
                {currentCode.length > 100 ? currentCode.slice(0, 100) + '...' : currentCode}
              </Highlighter>
            </span>
            <div className="rds-comp-code-snippet__actions">             
              <RdsButton
                className={`rds-comp-code-snippet__copy-button ${copied ? "rds-comp-code-snippet__copy-button--copied" : ""}`}
                onClick={handleCopy}
                aria-label="Copy code"
                size="small"
                style="outlined"
                text={copied ? "Copied!" : "Copy Code"}
                showLeftIcon={true}
                textCase="unset"
                changeLeftIcon={copied ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="currentColor" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM19 21H8V7H19V21Z" fill="currentColor" />
                  </svg>
                )}
              />
              <OpenInFullOutlinedIcon className="rds-comp-code-snippet__expand-icon" />
            </div>
          </div>
        ) : (
          <>
            <div className="rds-comp-code-snippet__wrapper">
              <div className="rds-comp-code-snippet__toolbar">
                {showLanguage && (
                  <div className="rds-comp-code-snippet__language-dropdown">
                    <RdsButtonDropdown
                      buttonText={selectedLanguage || (languageLabel as string)}
                      options={languageOptions as any}
                      showSearch={false}
                      leftIcon={<CodeOffIcon style={{ fontSize: 16 }} />}
                      rightIcon={<KeyboardArrowDownIcon style={{ fontSize: 18 }} />}
                      onChange={handleLanguageChange}
                      showUserAvatar={false}
                      showRadio={false}
                      size="small"
                    />
                  </div>
                )}
                <RdsButton
                  className={`rds-comp-code-snippet__copy-button ${copied ? "rds-comp-code-snippet__copy-button--copied" : ""}`}
                  onClick={handleCopy}
                  aria-label="Copy code"
                  size="small"
                  style="outlined"
                  text={copied ? "Copied!" : "Copy Code"}
                  showLeftIcon={true}
                  textCase="unset"
                  changeLeftIcon={copied ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="currentColor" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM19 21H8V7H19V21Z" fill="currentColor" />
                    </svg>
                  )}
                />
                <OpenInFullOutlinedIcon className="rds-comp-code-snippet__expand-icon" />
              </div>
              <div 
                className={`rds-comp-code-snippet__content ${maxHeight ? 'rds-comp-code-snippet__content--with-max' : ''}`} 
                style={maxHeight ? { ['--rds-code-max-height' as any]: maxHeight } : {}}
              >
                <div className="rds-comp-code-snippet__syntax">
                    <Highlighter
                      language={languageLabel as string}
                      style={highlighterStyle}
                      showLineNumbers={codeLines}
                      className="rds-comp-code-snippet__highlighter"
                    >
                      {currentCode}
                    </Highlighter>
                  </div>
              </div>
            </div>
            <div className="rds-comp-code-snippet__footer">
              <div className="rds-comp-code-snippet__show-more">
                <RdsButton color="primary" changeLeftIcon='add' showLeftIcon layout="icon+text" size="small" state="default" style="transparent" text="Show More" />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
RdsCompCodeSnippet.displayName = 'RdsCompCodeSnippet';
export default RdsCompCodeSnippet;
