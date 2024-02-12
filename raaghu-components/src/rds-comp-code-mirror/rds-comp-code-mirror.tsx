import React, { useState, useEffect } from "react";
import { Controlled as CodeMirror } from "react-codemirror2"; // Import the React wrapper for CodeMirror

export interface codemirrorProps {
    onBeforeChange?: (editor: any, data: any, value: any) => any
    code: string
}
const MyCodeMirrorComponent = (props: codemirrorProps) => {

    const [code, setCode] = useState(props.code);
    const options = {
        theme: "default",
        mode: "javascript",
        lineNumbers: true,
        tabSize: 2,
    };
    const handleBeforeChange = (editor: any, data: any, value: any) => {
        props.onBeforeChange && props.onBeforeChange(editor, data, value);
        setCode(value);
    };

    useEffect(() => {
        setCode(props.code);
    }, [props.code]);

    return (
        <>
            <CodeMirror
                value={code}
                options={options}
                onBeforeChange={handleBeforeChange}
            />
        </>
    );
};
export default MyCodeMirrorComponent;