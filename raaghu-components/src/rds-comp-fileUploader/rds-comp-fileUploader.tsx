
import React from "react";
import { RdsButton, RdsFileUploader } from "../rds-elements";
import "./rds-comp-fileUploader.css";

export interface RdsCompFileUploaderProps {
    onClick: any
    preFileInfo?: any
    onDeleteFile: (id: any) => void;
}

const RdsCompFileUploader = (props: RdsCompFileUploaderProps) => {

    function folder(data: any) {
        props.preFileInfo(data);
    }
    return (
        <>
            <div className="row">
                <RdsFileUploader
                    colorVariant="primary"
                    extensions="png, jpg, doc, pdf, ppt"
                    limit={5}
                    multiple
                    size="large"
                    validation={[
                        {
                            hint: 'File size exceeds the limit',
                            isError: false
                        }
                    ]} label={""}                />
            </div>
            <div className="d-flex gap-2 pb-3 flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row footer-buttons">
                <RdsButton
                    label="Cancel"
                    databsdismiss="offcanvas"
                    type={"button"}
                    size="small"
                    isOutline={true}
                    colorVariant="primary"
                    class="me-2"
                ></RdsButton>
                <RdsButton
                    label="Finish"
                    type={"button"}
                    size="small"
                    databsdismiss="offcanvas"
                    colorVariant="primary"
                    class="me-2"
                    onClick={props.onClick}
                ></RdsButton>
            </div>
        </>
    );
};

export default RdsCompFileUploader;
