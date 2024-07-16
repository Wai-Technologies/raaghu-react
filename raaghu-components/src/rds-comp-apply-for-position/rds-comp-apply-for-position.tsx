import React, { useEffect, useState } from "react";
import { RdsInput } from "../rds-elements";
import {
  RdsButton,
  RdsTextArea,
  RdsFileUploader,
  RdsLabel,
} from "../rds-elements";
import { useTranslation } from "react-i18next";

export interface RdsCompApplyForPositionProps {
  applyForPositionData?: any;
  onSaveHandler?: (data: any) => void;
  reset?: boolean;
}

const RdsCompApplyForPosition = (props: RdsCompApplyForPositionProps) => {
  const [formData, setFormData] = useState(props.applyForPositionData);
  const [inputReset, setInputReset] = useState(false);
  const [fileUploaderKey, setFileUploaderKey] = useState(0);

  useEffect(() => {
    setFormData(props.applyForPositionData);
  }, [props.applyForPositionData]);

  useEffect(() => {
    setInputReset(!inputReset);
    setFileUploaderKey(prevKey => prevKey + 1);
  }, [props.reset]);


  const handleDataChanges = (value: any, key: string, isFile?: boolean) => {
    if (isFile) {
      const fileName = value[0]?.name; 
      setFormData({ ...formData, file: value, fileName }); 
    } else {
      setFormData({ ...formData, [key]: value });
    }
  };

  function emitSaveData(event: any) {
    event.preventDefault();
    props.onSaveHandler && props.onSaveHandler(formData);
    setInputReset(!inputReset);
    setFormData({
      email: "",
      fullName: "",
      contactNumber: "",
      position: "",
      period: "",
      coverLetter: "",
      file: [],
    });
    setFileUploaderKey(prevKey => prevKey + 1);
  }

  const isEmailValid = (email: any) => {
    if (!email || email.length === 0) {
      return false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      return false;
    } else return true;
  };

  const isFormValid = isEmailValid(formData?.email);

  const { t } = useTranslation();
  return (
    <div>
      <form>
        <div className="custom-content-scroll">
          <div className="row">
            <div className="col-lg-6 col-md-12">
              <RdsInput
                label="Email ID"
                placeholder="name@domain.com"
                inputType="email"
                onChange={(e) => {
                  handleDataChanges(e.target.value, "email");
                }}
                value={formData?.email}
                reset={inputReset}
                name={"email"}
                required
                dataTestId="email"
              ></RdsInput>
            </div>

            <div className="col-lg-6 col-md-12">
              <RdsInput
                label="Full Name"
                placeholder="Full Name"
                inputType="text"
                onChange={(e) => {
                  handleDataChanges(e.target.value, "fullName");
                }}
                value={formData?.fullName}
                reset={inputReset}
                name={"fullName"}
                required
                dataTestId="full-name"
              ></RdsInput>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-md-6 col-sm-12">
              <RdsInput
                label="Contact Number"
                placeholder="+91 9087654321"
                inputType="text"
                onChange={(e) => {
                  handleDataChanges(e.target.value, "contactNumber");
                }}
                value={formData?.contactNumber}
                reset={inputReset}
                name={"contactNumber"}
                dataTestId="contact-number"
                required
              ></RdsInput>
            </div>

            <div className="col-md-6 col-sm-12">
              <RdsInput
                label="Applying For Position:"
                placeholder="Position Name"
                inputType="text"
                onChange={(e) => {
                  handleDataChanges(e.target.value, "position");
                }}
                value={formData?.position}
                name={"position"}
                reset={inputReset}
                required
                dataTestId="position-name"
              ></RdsInput>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <div className="mb-2 mt-2">
                <RdsInput
                  label="When Can You Start?"
                  placeholder="Notice Period"
                  inputType="text"
                  onChange={(e) => {
                    handleDataChanges(e.target.value, "period");
                  }}
                  value={formData?.period}
                  reset={inputReset}
                  name={"period"}
                  required
                  dataTestId="notice-period"
                ></RdsInput>
              </div>
              <div>
                <RdsFileUploader
                  key={fileUploaderKey}
                  label="Upload Resume"
                  colorVariant="primary"
                  extensions="png, jpg, doc, pdf, ppt"
                  limit={5}
                  multiple
                  size="large"
                  validation={[
                    {
                      hint: "File size exceeds the limit",
                      isError: false,
                    },
                  ]}
                  onFileArray={(files) =>
                    handleDataChanges(files, "file", true)
                  }
                />
              </div>
            </div>

            <div className="col-md-6 col-sm-12 mt-2">
              <RdsTextArea
                label="Cover Letter"
                placeholder="Cover Letter.."
                rows={8}
                onChange={(e) => {
                  handleDataChanges(e.target.value, "coverLetter");
                }}
                value={formData?.coverLetter}
                dataTestId="cover-letter"
              />
            </div>
          </div>
        </div>
        <div className="d-flex flex-column-reverse px-4 flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3">
           <RdsButton
            label={t("Apply Now") || ""}
            colorVariant="primary"
            isDisabled={!isFormValid}
            block={true}
            type="submit"
            dataTestId="apply-now"
            onClick={(e: any) => emitSaveData(e)}
          />
        </div>
      </form>
    </div>
  );
};

export default RdsCompApplyForPosition;
