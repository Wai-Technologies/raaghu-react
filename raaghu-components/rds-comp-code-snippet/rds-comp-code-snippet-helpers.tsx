import React from "react";
import OpenInFullOutlinedIcon from "@mui/icons-material/OpenInFullOutlined";
import CodeOffIcon from '@mui/icons-material/CodeOff';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import RdsButton from "../../raaghu-elements/rds-button/rds-button";
import RdsButtonDropdown from "../../raaghu-elements/rds-button-dropdown/rds-button-dropdown";

const CopyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM19 21H8V7H19V21Z" fill="currentColor" />
  </svg>
);

const CopiedIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="currentColor" />
  </svg>
);

export interface CopyButtonProps {
  copied: boolean;
  onCopy: () => void;
}

export function CopyButton({ copied, onCopy }: CopyButtonProps) {
  return (
    <RdsButton
      className={`rds-comp-code-snippet__copy-button ${copied ? "rds-comp-code-snippet__copy-button--copied" : ""}`}
      onClick={onCopy}
      aria-label="Copy code"
      size="small"
      style="outlined"
      text={copied ? "Copied!" : "Copy Code"}
      showLeftIcon={true}
      textCase="unset"
      changeLeftIcon={copied ? <CopiedIcon /> : <CopyIcon />}
    />
  );
}

export interface SingleLineSnippetProps {
  Highlighter: React.ComponentType<Record<string, unknown>>;
  currentCode: string;
  languageLabel: string;
  highlighterStyle: Record<string, unknown>;
  copied: boolean;
  onCopy: () => void;
}

export function SingleLineSnippet({
  Highlighter,
  currentCode,
  languageLabel,
  highlighterStyle,
  copied,
  onCopy,
}: SingleLineSnippetProps) {
  return (
    <div className="rds-comp-code-snippet__toolbar rds-comp-code-snippet__toolbar--single-line">
      <span className="rds-comp-code-snippet__single-line-code">
        <Highlighter
          language={languageLabel}
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
        <CopyButton copied={copied} onCopy={onCopy} />
        <OpenInFullOutlinedIcon className="rds-comp-code-snippet__expand-icon" />
      </div>
    </div>
  );
}

export interface MultiLineSnippetProps {
  Highlighter: React.ComponentType<Record<string, unknown>>;
  currentCode: string;
  languageLabel: string;
  highlighterStyle: Record<string, unknown>;
  codeLines: boolean;
  copied: boolean;
  onCopy: () => void;
  showLanguage: boolean;
  selectedLanguage: string;
  languageOptions: { id: string; label: string }[];
  onLanguageChange: (val: string[] | string) => void;
  maxHeight?: string;
}

export function MultiLineSnippet({
  Highlighter,
  currentCode,
  languageLabel,
  highlighterStyle,
  codeLines,
  copied,
  onCopy,
  showLanguage,
  selectedLanguage,
  languageOptions,
  onLanguageChange,
  maxHeight,
}: MultiLineSnippetProps) {
  return (
    <>
      <div className="rds-comp-code-snippet__wrapper">
        <div className="rds-comp-code-snippet__toolbar">
          {showLanguage && (
            <div className="rds-comp-code-snippet__language-dropdown">
              <RdsButtonDropdown
                buttonText={selectedLanguage || languageLabel}
                options={languageOptions as any}
                showSearch={false}
                leftIcon={<CodeOffIcon style={{ fontSize: 16 }} />}
                rightIcon={<KeyboardArrowDownIcon style={{ fontSize: 18 }} />}
                onChange={onLanguageChange}
                showUserAvatar={false}
                showRadio={false}
                size="small"
              />
            </div>
          )}
          <CopyButton copied={copied} onCopy={onCopy} />
          <OpenInFullOutlinedIcon className="rds-comp-code-snippet__expand-icon" />
        </div>
        <div
          className={`rds-comp-code-snippet__content ${maxHeight ? 'rds-comp-code-snippet__content--with-max' : ''}`}
          style={maxHeight ? { ['--rds-code-max-height' as any]: maxHeight } : {}}
        >
          <div className="rds-comp-code-snippet__syntax">
            <Highlighter
              language={languageLabel}
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
  );
}

CopyButton.displayName = 'CopyButton';
SingleLineSnippet.displayName = 'SingleLineSnippet';
MultiLineSnippet.displayName = 'MultiLineSnippet';
