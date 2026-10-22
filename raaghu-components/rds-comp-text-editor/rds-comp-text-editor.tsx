import { Suspense, lazy, useCallback, useId, useMemo, useRef, useState } from "react";
import type { ComponentType } from "react";
import clsx from 'clsx';
import { InputLabel as Label } from "@mui/material";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { warnDeprecatedProp } from "../../raaghu-elements/shared/utils/deprecation";

const Editor = lazy(() =>
    import("react-draft-wysiwyg").then((m) => ({ default: m.Editor }))
) as ComponentType<any>;
import "./rds-comp-text-editor.scss";

export interface RdsCompTextEditorProps {
    id?: string;
    onChange?(value: string, delta: unknown, source: unknown, editor: unknown): void;
    placeholder?: string;
    readOnly?: boolean;
    value?: string;
    defaultValue?: string;
    label?: string;
    /** @deprecated Use `required` instead. */
    isMandatory?: boolean;
    required?: boolean;
    error?: boolean;
    disabled?: boolean;
    labelClass?: string;
    State?: string;
    focused?: boolean;
    showTitle?: boolean;
    rows?: number;
    resizable?: boolean;
}

type DraftEditorState = ReturnType<typeof EditorState.createEmpty>;

const createEditorStateFromValue = (value?: string, showTitle?: boolean): DraftEditorState => {
    if (value) {
        const contentBlock = htmlToDraft(value);
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            return EditorState.createWithContent(contentState);
        }
    }
    if (showTitle) {
        return EditorState.createWithContent(ContentState.createFromText(""));
    }
    return EditorState.createEmpty();
};

const RdsCompTextEditor = ({
    id,
    onChange,
    placeholder,
    readOnly,
    value,
    defaultValue,
    label,
    isMandatory,
    required,
    error,
    disabled,
    labelClass,
    State,
    focused,
    showTitle,
    rows,
    resizable,
}: RdsCompTextEditorProps) => {
    if (isMandatory !== undefined) warnDeprecatedProp('RdsCompTextEditor', 'isMandatory', '`required`');
    const isRequired = required ?? isMandatory;
    const isError = error ?? State === "Error";
    const isDisabled = disabled ?? State === "Disabled";
    const uid = useId();
    const labelId = `${uid}-label`;
    const errorId = `${uid}-error`;

    const [editorState, setEditorState] = useState<DraftEditorState>(() =>
        createEditorStateFromValue(value ?? defaultValue, false)
    );
    const [prevValue, setPrevValue] = useState(value);
    const [prevShowTitle, setPrevShowTitle] = useState(showTitle);
    const [lastEmitted, setLastEmitted] = useState<string | undefined>(undefined);
    if (value !== prevValue || showTitle !== prevShowTitle) {
        setPrevValue(value);
        setPrevShowTitle(showTitle);
        if (value !== lastEmitted || showTitle !== prevShowTitle) {
            setLastEmitted(undefined);
            setEditorState(createEditorStateFromValue(value, showTitle));
        }
    }
    const [isTouch, setIsTouch] = useState(false);
    const editorRef = useRef<unknown>(null);

    const computedRows = typeof rows === "number" && rows > 0 ? rows : 6;
    const lineHeightVar = "var(--rds-line-height-body, 26px)";
    const editorMinHeight = `calc(${computedRows} * ${lineHeightVar})`;
    const isResizable = resizable !== false;

    const editorStyle = useMemo(
        () => ({
            minHeight: editorMinHeight,
            resize: isResizable ? "vertical" as const : "none" as const,
            overflow: "auto" as const,
        }),
        [editorMinHeight, isResizable],
    );

    const toolbarConfig = useMemo(
        () => ({
            options: ["inline", "blockType", "list", "textAlign", "link", "image", "history"],
            inline: { options: ["bold", "italic", "underline", "strikethrough"] },
            image: {
                urlEnabled: true,
                uploadEnabled: true,
                alignmentEnabled: true,
                uploadCallback: (file: File) =>
                    new Promise<{ data: { link: string } }>((resolve) => {
                        const reader = new FileReader();
                        reader.onload = () => resolve({ data: { link: reader.result as string } });
                        reader.readAsDataURL(file);
                    }),
                previewImage: true,
                inputAccept: "image/gif,image/jpeg,image/jpg,image/png",
                alt: { present: true, mandatory: false },
            },
        }),
        [],
    );

    const handleEditorChange = useCallback((state: DraftEditorState) => {
        setEditorState(state);
        setIsTouch(true);
        if (onChange) {
            const htmlContent = draftToHtml(convertToRaw(state.getCurrentContent()));
            setLastEmitted(htmlContent);
            onChange(htmlContent, { ops: [{ insert: htmlContent }] }, "user", editorRef.current);
        }
    }, [onChange]);

    const isEmpty = useMemo(() => editorState.getCurrentContent().getPlainText().trim() === "", [editorState]);

    const stateClass = clsx(
        State === "Selected" && "rds-comp-text-editor--selected",
        isError && "rds-comp-text-editor--error",
        (focused || State === "Active") && "rds-comp-text-editor--active",
        isDisabled && "rds-comp-text-editor--disabled",
        isResizable && "rds-comp-text-editor--resizable"
    );

    return (
        <>
            {showTitle && label && (
                <Label id={labelId} className={clsx("rds-comp-text-editor-label", labelClass)}>
                    {label}
                    {isRequired && <span className="text-danger">*</span>}
                </Label>
            )}
            <div
                id={id}
                className={clsx("rds-comp-text-editor", stateClass)}
                {...(showTitle && label ? { role: "group", "aria-labelledby": labelId } : {})}
            >
                <Suspense fallback={<div className="rds-comp-text-editor__loading" />}>
                    <Editor
                        editorState={editorState}
                        onEditorStateChange={handleEditorChange}
                        readOnly={readOnly || isDisabled}
                        ariaDescribedBy={isRequired && isEmpty && isTouch ? errorId : undefined}
                        placeholder={placeholder}
                        ref={editorRef}
                        toolbarClassName="rds-comp-text-editor__toolbar"
                        wrapperClassName="rds-comp-text-editor__wrapper"
                        editorClassName="rds-comp-text-editor__content"
                        editorStyle={editorStyle}
                        toolbar={toolbarConfig}
                    />
                </Suspense>
            </div>
            {isRequired && isEmpty && isTouch && (
                <div className="form-control-feedback" id={errorId} role="alert">
                    <span className="text-danger">{label} is required</span>
                </div>
            )}
        </>
    );
};
RdsCompTextEditor.displayName = "RdsCompTextEditor";
export default RdsCompTextEditor;
