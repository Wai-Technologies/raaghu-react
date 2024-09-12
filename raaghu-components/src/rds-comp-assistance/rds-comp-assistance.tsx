import React, { useEffect, useState } from "react";
import { RdsButton, RdsInput, RdsTextArea } from "../rds-elements";

export interface RdsCompAssistanceProps {
  assistanceData?: any;
  onSaveHandler?: (data: any) => void;
  reset?: boolean;
}

const RdsCompAssistance = (props: RdsCompAssistanceProps) => {
  const [assistance, setAssistance] = useState(props.assistanceData);
  const [inputReset, setInputReset] = useState(false);

  useEffect(() => {
    setAssistance(props.assistanceData);
  }, [props.assistanceData]);
  const [touched, setTouched] = useState({
    Email: false,
  });
  const [errors, setErrors] = useState({
    name: "",
    Email: "",
    contactNumber: "",
  });
  useEffect(() => {
    setInputReset(!inputReset);
  }, [props.reset]);
  const emailRegex =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const handleDataChanges = (value: any, key: string, isFile?: boolean) => {
    let errorMessage = ""; 
    if (isFile) {
      const fileName = value[0]?.name;
      setAssistance({ ...assistance, file: value, fileName });
    } else {
      setAssistance({ ...assistance, [key]: value });
    }
    const  emailvalue  = value;
    if (key === "Email") {
      setTouched({ ...touched, Email: true });    
      if (emailvalue.trim() && !emailRegex.test(emailvalue)) {
        errorMessage = "Invalid Email Address.";
      }
    }
    setErrors({ ...errors, [key]: errorMessage });
    setAssistance({ ...assistance, [key]: emailvalue });
  };

  function emitSaveData(event: any) {
    event.preventDefault();
    props.onSaveHandler && props.onSaveHandler(assistance);
    setInputReset(!inputReset);
    setAssistance({
      name: "",
      Email: "",
      contactNumber: "",
      message: "",
    });
  }
  const handleBlur = (key: string) => {
    setTouched({ ...touched, [key]: true });
  };
  return (
    <div>
      <form>
        <div className="custom-content-scroll">
        <div className="row">
          <div className="col-md-6 form-group mb-2">
            <RdsInput
              inputType="text"
              required
              label={"Name"}
              value={assistance?.name}
              placeholder={"Enter Name"}
              onChange={(e) => {
                handleDataChanges(e.target.value, "name");
              }}
              reset={inputReset}
            />  
            
              {errors.name && <div className="form-control-feedback"><span className="text-danger">{errors.name}</span></div>}
          </div>
          <div className="col-md-6  mb-2">
             <RdsInput
              label="Email"
              reset={inputReset}
              size="medium"
              inputType="text"
              name="Email"
              placeholder={"Enter Email"}
              required
              value={assistance?.Email}
              onChange={(e) => handleDataChanges(e.target.value, "Email")}
              onBlur={() => handleBlur("Email")}
            />
            
            {touched.Email && errors.Email && <div className="form-control-feedback"><span className="text-danger">{errors.Email}</span></div>}
          </div>
            <div className="col-md-6 form-group mb-2">
              <RdsInput
                inputType="text"
                value={assistance.contactNumber}
                required={true}
                label={"Contact Number"}
                placeholder={"Enter contact number"}
                onChange={(e) => {
                  handleDataChanges(e.target.value, "contactNumber");
                }}
                reset={inputReset}
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
              />
                          {errors.contactNumber && <div className="form-control-feedback"><span className="text-danger">{errors.contactNumber}</span></div>}

            </div>
          <div className="form-group mb-2">
            <RdsTextArea
              rows={5}
              label={"Message"}
              isRequired={true}
              placeholder={"Enter your message here ..."}
              value={assistance.message}
              onChange={(e) => {
                handleDataChanges(e.target.value, "message");
              }}
              reset={inputReset}
            ></RdsTextArea>
          </div>
          </div>
          <div className="mt-3 d-flex pb-3 ps-4 flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row footer-buttons gap-2">
            <RdsButton
              class="me-2"
              tooltipTitle={""}
              type={"button"}
              label={"Cancel" || ""}
              colorVariant="outline-primary"
              size="small"
              databsdismiss="offcanvas"
            ></RdsButton>
            <RdsButton
              class="me-2"
              label={"Send" || ""}
              size="small"
              colorVariant="primary"
              tooltipTitle={""}
              type={"submit"}
              databsdismiss="offcanvas"
              // onClick={() => {
              //     props.onSaveHandler(tenantInformationData);
              // }}
              onClick={(e: any) => emitSaveData(e)}
            ></RdsButton>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RdsCompAssistance;
