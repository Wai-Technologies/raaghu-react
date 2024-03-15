import React, { useState, useEffect } from "react";
import "./rds-file-uploader.css";
import RdsIcon from "../rds-icon/rds-icon";
import { useTranslation } from "react-i18next";
export interface RdsFileUploaderProps {
    placeholder?: string;
    size: string;
    colorVariant?: string;
    multiple?: boolean;
    extensions: string;
    limit: number;
    label: string;
    onFileArray?: (files: any[]) => void;
    getFileUploaderInfo?: any;
    validation?: any[];
    onDeleteFile?: (id: any) => void;
}

const fileholder: any = [];
const filenameholder: any = [];
const filesize: any = [];

const RdsFileUploader = (props: RdsFileUploaderProps) => {
    const [selectedFileName, setSelectedFileName] = useState<string | null>("No file chosen");

    const { t } = useTranslation();
    const [FileArray, setFileArray] = useState(fileholder);
    const [isExceed, setIsExceed] = useState(false);
    const [fileName, setfileName] = useState(filenameholder);
    const [FileSize, setFileSize] = useState(filesize);
    const [validation, setValidation] = useState(props.validation);
    const size = props.size === "small" ? "form-control-sm" : props.size === "large" ? "form-control-lg" : "";

    const kbToMb = (kb: any) => {
        const mb = kb / 1024;
        return Math.round(mb * 100) / 100; // Round off to 2 decimal places
    };

    const onDelete = (id: any) => {
        const tempFN = fileName.filter((Fname: any, i: number) => i !== id);
        setfileName(tempFN);
        const tempFS = FileSize.filter((Fsize: any, i: number) => i !== id);
        setFileSize(tempFS);
        const tempFA = FileArray.filter((Farray: any, i: number) => i !== id);
        setFileArray(tempFA);
        props.onDeleteFile && props.onDeleteFile(id)
    };

    const onchangehandler = (event: any) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            setSelectedFileName(selectedFile.name);
        }
        const fileSize = event.target.files[0].size / 1024; //now size in kb

        if (fileSize > props?.limit) {
            const tempValid = validation?.map((ele: any, index: number) => {
                if (index == 0) {
                    return { ...ele, isError: true };
                } else {
                    return ele;
                }
            });
            setValidation(tempValid);
            setIsExceed(true);
        } else {
            const tempValid = validation?.map((ele: any, index: number) => {
                if (index == 0) {
                    return { ...ele, isError: false };
                } else {
                    return ele;
                }
            });
            setValidation(tempValid);
            setIsExceed(false);
        }
        setFileSize([...FileSize, event.target.files[0].size]);
        const files = event.target.files;

        setfileName([...fileName, event.target.files[0].name]);
        const reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = (event) => {
            setFileArray([...FileArray, event.target?.result]);
        };
        props.getFileUploaderInfo && props.getFileUploaderInfo({
            files: event.target.files,
        });
        if (props.multiple) {
            event.target.value = null;
        }
    };

    useEffect(() => {
        props.onFileArray != undefined && props.onFileArray(FileArray);
    }, [FileArray]);


    return (
        <>
            {props.multiple === false ? (
                <div className="">
                    <div>
                        <label className={"form-label label-gray"}>{props.label}</label>
                    </div>
                    <div>
                        <form>
                            <label htmlFor="file1" className={`align-items-center d-flex ${size}`}>
                                <span className={`custom-file-button p-0 border-end-0 form-control align-items-center ${size}`}> Choose File</span>
                                <span className={` chosenFileSpan p-1 ps-3`}>{selectedFileName} </span>
                                <input data-testid="rds-file-uploader-input"
                                    className={` col-md-12 input mulinput d-none  text-${props.colorVariant
                                        } `}
                                    type="file"
                                    name="file1"
                                    id="file1"
                                    accept={props.extensions}
                                    onChange={onchangehandler}
                                />


                            </label>
                            {validation &&
                                validation.map((val: any, index: number) => (
                                    <div key={index} className="mt-2">
                                        <small
                                            className={` ${isExceed ? "showError" : "noError d-none"
                                                }`}
                                        >
                                            {val.hint}
                                        </small>
                                    </div>
                                ))}
                        </form>
                    </div>
                </div>

            ) : (
                <div>
                    {/* Multiple file uploader */}
                    <div className="d-flex justify-content-end">
                        <span>Maximum 5MB</span>
                    </div>
                    <label htmlFor="file" className={`align-items-center multiUploader row mx-0 py-4 px-4 rounded-4 border-${props.colorVariant || "primary"}`}>
                        <div className="col-md-10 col-lg-10 col-10">
                            <div className={`text-${props.colorVariant}`}>{t("Drop your files here.") || ''}</div>
                            <div>(PNG, JPG, Doc, PDF, PPT) </div>
                            <input data-testid="rds-file-uploader-input"
                                className={` col-md-12 input mulinput d-none ${size} `}
                                type="file"
                                name="file"
                                id="file"
                                accept={props.extensions}
                                onChange={onchangehandler}
                                multiple
                            />
                        </div>
                        <div className="col-md-2 col-lg-2 col-2 text-end">
                            <RdsIcon
                                colorVariant={props.colorVariant}
                                height="20px"
                                isAnimate
                                name="upload_data"
                                stroke
                                width="20px"
                            />
                        </div>
                    </label>

                    {/* ------------------ Display names--------------------------- */}
                    {fileName.map((filename: string, i: number) => (
                        <div key={i} className="d-flex justify-content-between p-3 mt-3 fileName">
                            <div className="d-flex gap-2 align-items-center">
                                <span>    <RdsIcon
                                    name={"file"}
                                    height="16px"
                                    width="16px"
                                    stroke={true}
                                    fill={false}
                                /> </span><span>  {fileName[i]}</span>
                            </div>
                            <div className="closeIcon">
                                <span
                                    className="text-muted opacity-50"
                                >
                                    {" "}
                                    {(FileSize[i] / 1048576).toFixed(2)} MB{" "}
                                </span>
                                <span className="iconbox ms-2" onClick={() => onDelete(i)}>
                                    <RdsIcon
                                        colorVariant="secondary"
                                        name={"close_circle"}
                                        height="16px"
                                        width="16px"
                                        stroke={true}
                                        fill={false}

                                    />
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};
export default RdsFileUploader;
