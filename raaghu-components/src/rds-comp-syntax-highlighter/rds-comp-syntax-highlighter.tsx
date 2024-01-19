import React, { useState } from "react";

export interface RdsCompSyntaxHighlighterProps {
  value: string;
  editorId?: any;
  textareaClassName?: string;
  preClassName?: string;
  disabled?: boolean
  maxLength?: number;
  minLength?: number;
  placeholder?: string;
  readOnly?: boolean;
  name?: string;
  required?: boolean;
  style?: React.CSSProperties;
  padding?: number;
  tabSize?: number;
  onValueChange: (value: any) => void;
}
const RdsCompSyntaxHighlighter = (props: RdsCompSyntaxHighlighterProps) => {
  const [code, setCode] = useState(props.value || "");

  return (
    <>
    </>
  );
};

export default RdsCompSyntaxHighlighter;