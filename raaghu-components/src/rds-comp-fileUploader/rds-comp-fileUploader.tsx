
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
        <div className="custom-content-scroll">
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
            <div className="d-flex flex-column-reverse ps-4 flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3">
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
            </div>
        </>
    );
};

export default RdsCompFileUploader;
