
import React from "react";
import { RdsButton, RdsFileUploader } from "../rds-elements";
import "./rds-comp-fileUploader.css";
import { useTranslation } from "react-i18next";
export interface RdsCompFileUploaderProps {
    onClick: any
    preFileInfo?: any
    onDeleteFile: (id: any) => void;
}

const RdsCompFileUploader = (props: RdsCompFileUploaderProps) => {
    const { t } = useTranslation();
    function folder(data: any) {
        props.preFileInfo(data);
    }
    return (
        <>
            <div className="row">
                <RdsFileUploader
                    colorVariant=""
                    extensions=""
                    multiple={true}
                    placeholder="" size={"large"} label={""} limit={100}
                    getFileUploaderInfo={(data: any) => folder(data)}
                    onDeleteFile={(id: any) => props.onDeleteFile && props.onDeleteFile(id)}
                />
            </div>
            <div className="d-flex gap-2 pb-3 flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row footer-buttons">
                <RdsButton
                    label={t("Cancel") || ""}
                    databsdismiss="offcanvas"
                    type={"button"}
                    size="small"
                    isOutline={true}
                    colorVariant="primary"
                    class="me-2"
                ></RdsButton>
                <RdsButton
                    label={t("Finish") || ""}
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
