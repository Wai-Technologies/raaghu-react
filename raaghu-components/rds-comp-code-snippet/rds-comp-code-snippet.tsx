import React, { useState } from "react";
import "./rds-comp-code-snippet.scss";
import OpenInFullOutlinedIcon from "@mui/icons-material/OpenInFullOutlined";
import RdsButton from "../../raaghu-elements/rds-button/rds-button";

export interface RdsCompCodeSnippetProps {
  code: string;
  language?: boolean;
  numberLine?: boolean;
  theme?: "light" | "dark";
  type?: "singleLine" | "multiLine";
  maxHeight?: string;
  className?: string;
}

const RdsCompCodeSnippet: React.FC<RdsCompCodeSnippetProps> = ({
  code,
  language = "html",
  numberLine = false,
  theme = "light",
  type = "multiLine",
  maxHeight,
  className = "",
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const getLines = () => {
    return code.split("\n");
  };

  return (
    <div className={`rds-comp-code-snippet rds-comp-code-snippet--${theme} rds-comp-code-snippet--${type} ${className}`}>
      <div className="rds-comp-code-snippet__container">
        {type === "singleLine" ? (
          <div className="rds-comp-code-snippet__toolbar rds-comp-code-snippet__toolbar--single-line">
            <span className="rds-comp-code-snippet__single-line-code">
              {code.length > 100 ? code.slice(0, 100) + "..." : code}
            </span>
            <div className="rds-comp-code-snippet__actions">
              {language && <span className="rds-comp-code-snippet__language-label">Html</span>}
              <button 
                className={`rds-comp-code-snippet__copy-button ${copied ? "rds-comp-code-snippet__copy-button--copied" : ""}`} 
                onClick={handleCopy} 
                aria-label="Copy code"
              >
                {copied ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="currentColor" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM19 21H8V7H19V21Z" fill="currentColor" />
                  </svg>
                )}
                <span className="rds-comp-code-snippet__copy-text">
                  {copied ? "Copied!" : "Copy Code"}
                </span>
              </button>
              <OpenInFullOutlinedIcon className="rds-comp-code-snippet__expand-icon" />
            </div>
          </div>
        ) : (
          <>
            <div className="rds-comp-code-snippet__wrapper">
              <div className="rds-comp-code-snippet__toolbar">
                {language && <span className="rds-comp-code-snippet__language-label">Html</span>}
                <button 
                  className={`rds-comp-code-snippet__copy-button ${copied ? "rds-comp-code-snippet__copy-button--copied" : ""}`} 
                  onClick={handleCopy} 
                  aria-label="Copy code"
                >
                  {copied ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="currentColor" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM19 21H8V7H19V21Z" fill="currentColor"/>
                    </svg>
                  )}
                  <span className="rds-comp-code-snippet__copy-text">
                    {copied ? "Copied!" : "Copy Code"}
                  </span>
                </button>
                <OpenInFullOutlinedIcon className="rds-comp-code-snippet__expand-icon" />
              </div>
              <div 
                className="rds-comp-code-snippet__content" 
                style={maxHeight ? { maxHeight, overflow: "auto" } : {}}
              >
                <pre>
                  <code className={`language-${language}`}>
                    {numberLine ? (
                      <div className="rds-comp-code-snippet__code-with-lines">
                        <div className="rds-comp-code-snippet__line-numbers">
                          {getLines().map((_, index) => (
                            <span key={index} className="rds-comp-code-snippet__line-number">{index + 1}</span>
                          ))}
                        </div>
                        <div className="rds-comp-code-snippet__code-lines">
                          {getLines().map((line, index) => (
                            <span key={index} className="rds-comp-code-snippet__code-line">{line}</span>
                          ))}
                        </div>
                      </div>
                    ) : (
                      code
                    )}
                  </code>
                </pre>
              </div>
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
