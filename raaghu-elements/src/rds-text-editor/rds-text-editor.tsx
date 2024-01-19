import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import RdsLabel from "../rds-label";

export interface RdsTextEditorProps {
	bounds?: string | HTMLElement;
	children?: React.ReactElement<any>;
	className?: string;
	defaultValue?: any;
	formats?: string[];
	id?: string;
	modules?: any;
	onChange?(value: string, delta: any, source: any, editor: any): any;
	placeholder?: string;
	preserveWhitespace?: boolean;
	readOnly?: boolean;
	style?: React.CSSProperties;
	tabIndex?: number;
	theme?: string;
	value?: string;
	label?: string;
	required?: boolean;
	labelClass?: string;
}

const RdsTextEditor = (props: RdsTextEditorProps) => {
	const defaultModules = {
		toolbar: {
			container: [
				[{ font: [] }],
				[{ header: [1, 2, 3, 4, 5, 6, false] }],
				["bold", "italic", "underline", "strike"],
				[{ list: "ordered" }, { list: "bullet" }],
				[{ indent: "-1" }, { indent: "+1" }],
				[{ align: [] }],
				["link", "image"],
				["clean"],
			],
		},
	};
	const modules = props.modules || defaultModules;

	return (
		<>
			<RdsLabel label={props.label} required={props.required} class={"mb-2" + props.labelClass}></RdsLabel>
			<ReactQuill theme="snow" bounds={props.bounds} children={props.children} className={props.className}
				defaultValue={props.defaultValue} value={props.value} formats={props.formats} id={props.id} modules={modules}
				onChange={props.onChange} placeholder={props.placeholder} preserveWhitespace={props.preserveWhitespace}
				readOnly={props.readOnly} tabIndex={props.tabIndex} style={props.style} />
		</>
	);
};

export default RdsTextEditor;
