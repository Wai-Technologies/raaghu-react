import React, { useState, useEffect, useRef } from "react";
import "./rds-file-uploader.css";
import RdsIcon from "../rds-icon/rds-icon";
import { useTranslation } from "react-i18next";

export interface RdsFileUploaderProps {
  size: string;
  colorVariant?: string;
  multiple?: boolean;
  extensions: string;
  placeholder?: string;
  limit: number;
  label: string;
  onFileArray?: (files: any[]) => void;
  getFileUploaderInfo?: any;
  validation?: any[];
  onDeleteFile?: (id: any) => void;
  title?: string;
  mandatory?: boolean;
  showTitle?: boolean;
  showHint?: boolean;
}

const RdsFileUploader = (props: RdsFileUploaderProps) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [validation, setValidation] = useState(props.validation || []);
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const size =
    props.size === "small"
      ? "form-control-sm"
      : props.size === "large"
      ? "form-control-lg"
      : "";

  const onchangehandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const allowedExtensions = props.extensions.split(", ");
    const newFiles: File[] = [];
    const newValidation = [...validation];

    files.forEach((file) => {
      const fileExtension = file.name.split(".").pop()?.toLowerCase();
      if (!allowedExtensions.includes(fileExtension || "")) {
        newValidation.push({
          isError: true,
          hint: `File with extension '${fileExtension}' is not allowed`,
        });
        return;
      }

      const fileSizeInMB = file.size / (1024 * 1024); // Convert size to MB
      if (fileSizeInMB > props.limit) {
        newValidation.push({
          isError: true,
          hint: "File size exceeds the limit",
        });
        return;
      }

      newFiles.push(file);
    });

    if (props.multiple) {
      setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
    } else {
      setSelectedFiles(newFiles);
    }
    setValidation(newValidation);

    // Callback function to pass file info to parent component
    props.getFileUploaderInfo &&
      props.getFileUploaderInfo({
        files: newFiles,
      });

    // Clear input value if multiple
    if (props.multiple) {
      event.target.value = "";
    }
  };

  const onDelete = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    props.onDeleteFile && props.onDeleteFile(index);

    // Clear the input value without triggering the file explorer
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    props.onFileArray && props.onFileArray(selectedFiles);
  }, [selectedFiles]);
  const [dragging, setDragging] = useState(false);

  const handleDragOver = (e:any) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e:any) => {
    e.preventDefault();
    setDragging(false);
    const files = e.dataTransfer.files;
    if (files.length) {
      onchangehandler({
        target: {
          files,
        },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };
  return (
    <>
      {props.multiple === false ? (
        <div className="">
          <div>
            {props.showTitle && (
              <label className={"form-label label-gray"}>
                {props.title}
                {props.mandatory && <span className="text-danger ml-1">*</span>}
              </label>
            )}
          </div>
          <div>
            <form>
              <label
                htmlFor="file1"
                className={`align-items-center d-flex mt-1 flex-row`}
              >
                <span
                  className={`custom-file-button p-0 border-end-0 form-control align-items-center bg-primary text-light ${size}`}
                >
                 Choose File
                </span>
                <span
                  className={`chosenFileSpan deleteOptionCss ps-3 small-placeholder ${size}`}
                >
                  {selectedFiles.length > 0
                    ? selectedFiles[0].name
                    : "No file chosen"}
                  {selectedFiles.length > 0 && (
                    <span
                      className="iconbox ms-2"
                      onClick={() => onDelete(0)}
                    >
                      <RdsIcon
                        colorVariant="danger"
                        name={"delete"}
                        height="16px"
                        width="16px"
                        stroke={true}
                        fill={false}
                      />
                    </span>
                  )}
                </span>
                <input
                  ref={fileInputRef}
                  data-testid="rds-file-uploader-input"
                  className={`col-md-12 input mulinput d-none text-${props.colorVariant}`}
                  type="file"
                  name="file1"
                  id="file1"
                  accept={props.extensions}
                  onChange={onchangehandler}
                  multiple={props.multiple}
                />
              </label>
              {validation &&
                validation.map((val: any, index: number) => (
                  <div key={index} className="ps-3">
                    <small
                      className={`${
                        val.isError ? "showError" : "noError d-none"
                      }`}
                    >
                      {val.isError && val.hint}
                    </small>
                  </div>
                ))}
              {props.showHint && (
                <div className="d-flex justify-content-end text-muted">
                  <span>Maximum {props.limit}MB</span>
                </div>
              )}
            </form>
          </div>
        </div>
      ) : (
        <div>
          {/* Multiple file uploader */}
          <div>
            {props.showTitle && (
              <label className={"form-label label-gray"}>
                {props.title}
                {props.mandatory && <span className="text-danger ml-1">*</span>}
              </label>
            )}
          </div>
          <label
            htmlFor="file"
            className={`align-items-center multiUploader row mx-0 py-4 px-4 rounded-4 border-${
              props.colorVariant || "primary"
            } ${size}`}
          >
            
            <div
                className={`col-md-10 col-lg-10 col-10 text-center ${dragging ? "dragging" : ""}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
    >       <span className=" text-center">
              <RdsIcon
                colorVariant={props.colorVariant}
                height="20px"
                isAnimate
                name="upload_data"
                stroke
                width="20px"
              />
            </span>
              <div className={`text-${props.colorVariant}`}>
                {t("Drag and Drop your files or") || ""} <span className="{primary}"> Browse</span>
              </div>
              <div>(PNG, JPG, DOC, PDF, PPT) </div>
              <input
                data-testid="rds-file-uploader-input"
                className={` col-md-12 input mulinput d-none `}
                type="file"
                name="file"
                id="file"
                accept={props.extensions}
                onChange={onchangehandler}
                multiple
              />
            </div>
            
          </label>
          {props.showHint && (
            <div className="d-flex justify-content-start text-muted">
              <span>Maximum {props.limit}MB</span>
            </div>
          )}

          {/* ------------------ Display names--------------------------- */}
          {selectedFiles.map((file, index) => (
            <div
              key={index}
              className="d-flex justify-content-between p-3 mt-3 fileName"
            >
              <div className="d-flex gap-2 align-items-center">
                <span>
                  <RdsIcon
                    name={"file"}
                    height="16px"
                    width="16px"
                    stroke={true}
                    fill={false}
                  />
                </span>
                <span>{file.name}</span>
              </div>
              <div className="closeIcon">
                <span className="text-muted opacity-50">
                  {(file.size / 1048576).toFixed(2)} MB
                </span>
                <span className="iconbox ms-2" onClick={() => onDelete(index)}>
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
          {validation &&
            validation.map((val: any, index: number) => (
              <div key={index} className="ps-3">
                <small
                  className={`${val.isError ? "showError" : "noError d-none"}`}
                >
                  {val.isError && val.hint}
                </small>
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default RdsFileUploader;