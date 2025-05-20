import React, { useEffect, useState } from "react";
import { RdsButton, RdsInput, RdsTextArea } from "../rds-elements";
import { InputSize, LabelPosition } from "../../../raaghu-elements/src/rds-input/rds-input";
export interface RdsCompAssistanceProps {
  assistanceData?: any;
  onSaveHandler?: (data: any) => void;
  reset?: boolean;
}

const RdsCompAssistance = (props: RdsCompAssistanceProps) => {
  const [assistance, setAssistance] = useState(props.assistanceData || {});
  const [inputReset, setInputReset] = useState(false);

  useEffect(() => {
    setAssistance(props.assistanceData);
  }, [props.assistanceData]);
  
  useEffect(() => {
    setInputReset(!inputReset);
  }, [props.reset]);
 

  const handleDataChanges = (value: any, key: string, isFile?: boolean) => {
    if (isFile) {
      const fileName = value[0]?.name;
      setAssistance({ ...assistance, file: value, fileName });
    } else {
      setAssistance({ ...assistance, [key]: value });
    }
  };

  const isEmailValid = (email: any) => {
    if (!email || email.length === 0) {
      return false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      return false;
    } else return true;
  };
  const isNameValid = (name: any) => {
    if (!name || name.length === 0) {
        return false;
    }
    return true;
};

const isContactNumberValid = (contactNumber: any) => {
    if (!contactNumber || contactNumber.length === 0) {
        return false;
    }
    return true;
};
const isMessageValid = (msg: any) => {
  if (!msg || msg.length === 0) {
      return false;
  }
  return true;
};

const isFormValid = isNameValid(assistance?.name) && isContactNumberValid(assistance.contactNumber) && isEmailValid(assistance?.Email) && isMessageValid(assistance.message);
 
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
 
  return (
    <div>
      <form>
        <div className="custom-content-scroll">
        <div className="row">
          <div className="col-md-6 form-group">
            <RdsInput
              inputType="text"
              required={true}
              name={"Name"}
              label={true}
              value={assistance?.name}
              placeholder={"Enter Name"}
              onChange={(e) => {
                handleDataChanges(e.target.value, "name");
              }}
              reset={inputReset}
            ></RdsInput>  
            
          </div>
          <div className="col-md-6">
             <RdsInput              
              label={true}
              reset={inputReset}
              size={InputSize.Medium} 
              inputType="text"
              name="Email"
              placeholder={"Enter Email"}
              required={true}
              value={assistance?.Email}
              onChange={(e) => handleDataChanges(e.target.value, "Email")}
              validatonPattern={ /^[a-zA-Z0-9.!#$%&’*+/=?^_{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/}
              validationMsg="Please enter a valid email address"
            ></RdsInput>
          </div>
            <div className="col-md-6 form-group">
              <RdsInput
                inputType="text"
                value={assistance?.contactNumber}
                required={true}
                name={"Contact Number"}
                label={true}
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

            </div>
          <div className="form-group">
            <RdsTextArea
              rows={5}
              label={"Message"}
              isMandatory={true}
              placeholder={"Enter your message here ..."}
              value={assistance?.message}

              onChange={(e) => {
                handleDataChanges(e.target.value, "message");
              }}
              reset={inputReset}
            ></RdsTextArea>
          </div>
          </div>
          <div className="mt-3 d-flex pb-3 ps-4 flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row footer-buttons gap-2 p-4">
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
              isDisabled={!isFormValid}
              onClick={(e: any) => emitSaveData(e)}
            ></RdsButton>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RdsCompAssistance;
