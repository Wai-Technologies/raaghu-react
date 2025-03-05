import React, { useEffect, useState } from "react";
import { RdsInput } from "../rds-elements";
import {
  RdsButton,
  RdsTextArea,
  RdsFileUploader,
  RdsLabel,
} from "../rds-elements";
import { useTranslation } from "react-i18next";
import { FileUploaderStyle, Size } from "../../../raaghu-elements/src/rds-file-uploader/rds-file-uploader";

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
  const ifFullNameValid = (fullName: any) => {
    if (!fullName || fullName.length === 0) {
        return false;
    }
    return true;
}
const isContactNumberValid = (contactNumber: any) => {
    if (!contactNumber || contactNumber.length === 0) {
        return false;
    }
    return true;
}
const isPositionValid = (position: any) => {
    if (!position || position.length === 0) {
        return false;
    }
    return true;
}
const isPeriodValid = (period: any) => {
    if (!period || period.length === 0) {
        return false;
    }
    return true;
}

  const isFormValid = isEmailValid(formData?.email) && ifFullNameValid(formData?.fullName) && isContactNumberValid(formData?.contactNumber) && isPositionValid(formData?.position) && isPeriodValid(formData?.period) ;

  const { t } = useTranslation();
  return (
    <div>
      <form>
        <div className="custom-content-scroll">
          <div className="row">
            <div className="col-lg-6 col-md-12">
              <RdsInput              
                label={true}
                placeholder="name@domain.com"
                inputType="email"
                onChange={(e) => {
                  handleDataChanges(e.target.value, "email");
                }}
                value={formData?.email}
                reset={inputReset}
                name={"Email Id"}
                required
                dataTestId="email"
                validatonPattern={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i}
                validationMsg="Invalid Email Address."   
              ></RdsInput>
            </div>

            <div className="col-lg-6 col-md-12">
              <RdsInput                
                label={true}
                placeholder="Full Name"
                inputType="text"
                onChange={(e) => {
                  handleDataChanges(e.target.value, "fullName");
                }}
                value={formData?.fullName}
                reset={inputReset}
                name={"Full Name"}
                required
                dataTestId="full-name"
              ></RdsInput>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-md-6 col-sm-12">
              <RdsInput                
                label={true}
                placeholder="+91 9087654321"
                inputType="text"
                onChange={(e) => {
                  handleDataChanges(e.target.value, "contactNumber");
                }}
                onKeyDown={(e) => {
                  const inputElement = e.target as HTMLInputElement;
                      const currentLength = inputElement.value.length;
                      const isPlusEntered = inputElement.value.startsWith('+');
                      const maxLength = isPlusEntered ? 13 : 10;
                     
                      const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete', 'Tab'];
                      const isNumberOrPlus = /[0-9+]/.test(e.key);
             
                      if (!isNumberOrPlus && !allowedKeys.includes(e.key)) {
                          e.preventDefault();
                      }
             
                      if ((/[0-9]/.test(e.key) || e.key === '+') && (currentLength >= maxLength || (e.key === '+' && currentLength > 0))) {
                          e.preventDefault();
                      }
                  }}
                value={formData?.contactNumber}
                reset={inputReset}
                name={"Contact Number"}
                dataTestId="contact-number"
                required
              ></RdsInput>
            </div>

            <div className="col-md-6 col-sm-12">
              <RdsInput                
                label={true}
                placeholder="Position Name"
                inputType="text"
                onChange={(e) => {
                  handleDataChanges(e.target.value, "position");
                }}
                value={formData?.position}
                name={"Applying For Position"}
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
                  name="When Can You Start?"
                  label={true}
                  placeholder="Notice Period"
                  inputType="text"
                  onChange={(e) => {
                    handleDataChanges(e.target.value, "period");
                  }}
                  value={formData?.period}
                  reset={inputReset}                 
                  required
                  dataTestId="notice-period"
                ></RdsInput>
              </div>
              <div className="py-3">
                <RdsFileUploader
                  key={fileUploaderKey}
                  label="Upload Resume"
                  colorVariant="primary"
                  extensions="png, jpg, doc, pdf, ppt"
                  style={FileUploaderStyle.DropAreaSideIcon}               
                  multiple={true}
                  size={Size.Large}
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

            <div className="col-md-6 col-sm-12 mt-3">
              <RdsTextArea
                label="Cover Letter"
                placeholder="Cover Letter.."
                rows={7}
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
