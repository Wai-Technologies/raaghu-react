import React, { useState, useEffect, useRef } from "react";
import "./rds-file-uploader.css";
import RdsIcon from "../rds-icon/rds-icon";
import { useTranslation } from "react-i18next";

export interface RdsFileUploaderProps {
  size: string;
  colorVariant?: string;
  Drop_Area_Top_Icon?: boolean;
  Drop_Area_Side_Icon?: boolean;
  Drop_Area_With_Upload_Button? : boolean;
  Drop_Area_With_Icon?: boolean;
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
      
        setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
        setValidation(newValidation);
      
        props.getFileUploaderInfo &&
          props.getFileUploaderInfo({
            files: newFiles,
          });
      
        if (props.Drop_Area_Top_Icon) {
          event.target.value = "";
        }
      };

  const onDelete = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    props.onDeleteFile && props.onDeleteFile(index);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };


  const onChangeHandlerForSingleSelection = (event: any) => {
    event.stopPropagation(); 
    const files = event.target.files;
    if (files.length > 0) {
      setSelectedFiles([files[0]]);
    }
  };

  const onDeleteHandlerForSingleSelection = () => {
    setSelectedFiles([]);
    if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Clear the file input
    }
  };


  useEffect(() => {
    props.onFileArray && props.onFileArray(selectedFiles);
  }, [selectedFiles]);

  const [dragging, setDragging] = useState(false);

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e: any) => {
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

  const renderFileUploader = () => {
    if (props.Drop_Area_Top_Icon) {
      return (
        <div>
          
          <label className="form-label label-gray">
            {props.title}
            {props.mandatory && <span className="text-danger ml-1">*</span>}
          </label>
          <label
            htmlFor="file-input"
            className={`multiUploader row mx-0 py-4 px-4 rounded-4 border-${
              props.colorVariant || "primary"
            } ${size}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            style={{ cursor: "pointer" }}
          >
            <div className="col-md-12 text-center">
              <RdsIcon
                colorVariant={props.colorVariant}
                height="20px"
                name="upload_data"
                stroke
                width="20px"
              />
              <div>
                {t("Drag and Drop your files or") || ""}{" "}
                <span className={`text-${props.colorVariant}`}> Browse</span>
              </div>
              <div className="fileFormat text-muted">(PNG, JPG, DOC, PDF, PPT)</div>
              <input
                id="file-input"
                data-testid="rds-file-uploader-input"
                className="d-none"
                type="file"
                accept={props.extensions}
                onChange={onchangehandler}
                multiple
              />
            </div>
            
          </label>
          {/* Display file names */}
          {selectedFiles.map((file, index) => (
          <div
            key={index}
            className="d-flex justify-content-between p-3 mt-3 fileName border"
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
      );
    }

    if (props.Drop_Area_Side_Icon) {
      return (
        <div>
        {/* Multiple file uploader with side icon */}
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
          className={`align-items-center multiUploader row mx-0 py-3 px-3 rounded-4 border-${
            props.colorVariant || "primary"
          } ${size}`}
        >
          <div
            className={`col-md-12 col-lg-12 col-12 d-flex align-items-center justify-content-between ${
              dragging ? "dragging" : ""
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div>
              <div>
                {t("Drag and Drop your files or") || ""}{" "}
                <span className={`text-${props.colorVariant}`}> Browse</span>
              </div>
              <div className="fileFormat text-muted ">(PNG, JPG, DOC, PDF, PPT) </div>
            </div>
            <span className="ms-2">
              <RdsIcon
                colorVariant={props.colorVariant}
                height="20px"
                isAnimate
                name="upload_data"
                stroke
                width="20px"
              />
            </span>
            <input
              data-testid="rds-file-uploader-input"
              className={`col-md-12 input mulinput d-none`}
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

        {/* Display file names */}
        {selectedFiles.map((file, index) => (
          <div
            key={index}
            className="d-flex justify-content-between p-3 mt-3 fileName border"
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
                  colorVariant="danger"
                  name={"delete"}
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
      );
    }
    
 if (props.Drop_Area_With_Icon) {
      return (
        <div>
        {/* Multiple file uploader with side icon */}
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
          className={`align-items-center multiUploader row mx-0 py-3 px-3 rounded-4 border-${
            props.colorVariant || "primary"
          } ${size}`}
        >
          <div
            className={`col-md-12 col-lg-12 col-12 d-flex align-items-center justify-content-between ${
              dragging ? "dragging" : ""
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div>
              <div>
                {t("Drag and Drop your files or") || ""}{" "}
                <span className={`text-${props.colorVariant}`}> Browse</span>
              </div>
              <div className="fileFormat text-muted ">(PNG, JPG, DOC, PDF, PPT) </div>
            </div>
            <span className="ms-2">
              <RdsIcon
                colorVariant={props.colorVariant}
                height="20px"
                isAnimate
                name="upload_data"
                stroke
                width="20px"
              />
            </span>
            <input
              data-testid="rds-file-uploader-input"
              className={`col-md-12 input mulinput d-none`}
              type="file"
              name="file"
              id="file"
              accept={props.extensions}
              onChange={onChangeHandlerForSingleSelection}
              multiple={false}
            />
          </div>
        </label>
        {props.showHint && (
          <div className="d-flex justify-content-start text-muted">
            <span>Maximum {props.limit}MB</span>
          </div>
        )}

        {/* Display file names */}
        {selectedFiles.map((file, index) => (
          <div
            key={index}
            className="d-flex justify-content-between p-3 mt-3 fileName border"
          >
            <div className="d-flex gap-2 align-items-center">
            <span>
                {props.Drop_Area_With_Icon && 
                file.type.startsWith('image/') ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    height="120px"
                    width="120px"
                    className="file-thumbnail"
                  />
                ) : (
                  <RdsIcon
                    name={"file"}
                    height="16px"
                    width="16px"
                    stroke={true}
                    fill={false}
                  />
                )}
              </span>
              <span>{file.name}</span>
            </div>
            <div className="closeIcon">
              <span className="text-muted opacity-50">
                {(file.size / 1048576).toFixed(2)} MB
              </span>
              <span className="iconbox ms-2" onClick={() => onDelete(index)}>
                <RdsIcon
                  colorVariant="danger"
                  name={"delete"}
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
      );
    }

    if (props.Drop_Area_With_Upload_Button) {
      return (
        <div>
        {/* Multiple file uploader with side icon */}
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
          className={`align-items-center multiUploader row mx-0 py-3 px-3 rounded-4 border-${
            props.colorVariant || "primary"
          } ${size}`}
        >
          <div
            className={`col-md-12 col-lg-12 col-12 d-flex align-items-center justify-content-between ${
              dragging ? "dragging" : ""
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            style={{ cursor: "pointer" }}
          >
            <span className="me-2 text-muted">
              <RdsIcon
                colorVariant={props.colorVariant}
                height="20px"
                isAnimate
                name="upload_data"
                stroke
                width="20px"
              />
            </span>
            <div className="flex-grow-1 text-center">
              <div>
                {t("Drag and Drop your files") || ""}{" "} <span className="text-muted mx-2"> or</span>
                <button className={`btn btn-${props.colorVariant} btn-sm`}  onClick={() => document.getElementById('file')?.click()}>Upload Files</button>
              </div>
            </div>
            <input
              data-testid="rds-file-uploader-input"
              className={`col-md-12 input mulinput d-none`}
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
      
        {/* Display file names */}
        {selectedFiles.map((file, index) => (
          <div
            key={index}
            className="d-flex justify-content-between p-3 mt-3 fileName border"
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
      );
    }

    return (
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
              <div
               
                className={`align-items-center d-flex mt-1 flex-row`}
              >
                <label
                  htmlFor="file1"
                  className={`custom-file-button p-0 border-end-0 form-control align-items-center bg-primary text-light ${size}`}
                >
                 Choose File
                </label>
                <span
                  className={`chosenFileSpan deleteOptionCss ps-3 small-placeholder ${size}`}
                >
                  {selectedFiles.length > 0
                    ? selectedFiles[0].name
                    : "No file chosen"}
                  {selectedFiles.length > 0 && (
                    <span
                      className="iconbox ms-2"
                      onClick={() => onDeleteHandlerForSingleSelection()}
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
                  onChange={onChangeHandlerForSingleSelection}
                  multiple={false}
                />
              </div>
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
    );
  };

  return <>{renderFileUploader()}</>;
};

export default RdsFileUploader;
