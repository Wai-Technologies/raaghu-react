
import React, { useEffect, useState } from "react";
import { RdsButton, RdsFileUploader } from "../rds-elements";
import "./rds-comp-fileUploader.css";
import { FileUploaderStyle, Size } from "../../../raaghu-elements/src/rds-file-uploader/rds-file-uploader";

export interface RdsCompFileUploaderProps {
    onClick: any
    preFileInfo?: any
    onSaveHandler?: (data: any) => void;
    reset?: boolean;
}

const RdsCompFileUploader = (props: RdsCompFileUploaderProps) => {
    const [formData, setFormData] = useState(props.preFileInfo);
    const [inputReset, setInputReset] = useState(false);
    const [uploaderKey, setUploaderKey] = useState(0);

    useEffect(() => {
        setFormData(props.preFileInfo);
      }, [props.preFileInfo]);

      useEffect(() => {
        setInputReset(!inputReset);
        setUploaderKey(prevKey => prevKey + 1);
      }, [props.reset]);

    const handleDataChanges = (value: any, key: string, isFile?: boolean) => {
        const fileName = value[0]?.name;
        setFormData({ ...formData, file: value, fileName });
    }

    function emitSaveData(e: any): void {
        e.preventDefault();
        props.onSaveHandler && props.onSaveHandler(formData);
        setInputReset(!inputReset);
        setFormData({
            file: [],
        });
        setUploaderKey(prevKey => prevKey + 1);
    }

    return (
        <>
        <div className="custom-content-scroll">
            <div className="row">
                <RdsFileUploader
                    colorVariant="primary"
                    extensions="png, jpg, doc, pdf, ppt"
                    fileSizeLimitInMb={5}
                    style={FileUploaderStyle.DropAreaSideIcon}    
                    multiple={true}
                    size={Size.Large}
                    key={uploaderKey}
                    validation={[
                        {
                            hint: 'File size exceeds the limit',
                            isError: false
                        }
                    ]} label={""}    
                    onFileArray={(files) =>
                        handleDataChanges(files, "file", true)
                    }            
                />
            </div>
            <div className="d-flex flex-column-reverse ps-4 flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3 p-4">
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
                    onClick={(e: any) => emitSaveData(e)}
                ></RdsButton>
            </div>
            </div>
        </>
    );
};

export default RdsCompFileUploader;
