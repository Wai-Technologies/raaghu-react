import React, { useEffect, useState } from "react";
import {
  RdsButton,
  RdsDropdownList,
  RdsInput,
  RdsLabel,
  RdsSelectList,
  RdsTextArea,
} from "../rds-elements";
import { InputSize, LabelPosition } from "../../../raaghu-elements/src/rds-input/rds-input";
export interface RdsCompGetAssistanceProps {
  getAssistanceData?: any;
  onClickSubmit: (data: any) => void;
  reset?: boolean;
}

const RdsCompGetAssistance = (props: RdsCompGetAssistanceProps) => {
  const [getAssistanceFormData, setGetAssistanceFormData] = useState(
    props.getAssistanceData
  );
  const [inputReset, setInputReset] = useState(false); 

  useEffect(() => {
    setGetAssistanceFormData(props.getAssistanceData);
  }, [props.getAssistanceData]);

  useEffect(() => {
    setInputReset(!inputReset);
  }, [props.reset]);

  const handleGetAssistanceDataSubmit = (event: any) => {
    event.preventDefault();
    props.onClickSubmit(getAssistanceFormData);
  };

  const handleGetAssistanceDataChanges = (value: any, key: string) => {
    setGetAssistanceFormData({ ...getAssistanceFormData, [key]: value });
  };

  const emitSaveData = (event: any) => {
    event.preventDefault();
    props.onClickSubmit(getAssistanceFormData);
      setInputReset(!inputReset);
    setGetAssistanceFormData({
      name: "",
      email: "",
      phoneNumber: "",
      notes: "",
    });
  };

  return (
    <>
      <div className=" pt-5">
        <h6 className="fs-5 fw-medium lh-base text-center pb-4">
          Before we proceed, we would like to inquire about a few details to
          gain a deeper insight into your specific business requirements.
        </h6>

        <div className="">
          <form action="" className="" onSubmit={handleGetAssistanceDataSubmit}>
            <div className="row">
              <div className="col-md-6">
                <RdsInput
                  id=""
                  inputType="text"
                  name="Name"
                  label={true}
                  labelPosition={LabelPosition.Top}
                  placeholder="Enter Name"
                  required={true}
                  readonly={false}
                  isDisabled={false}
                  size={InputSize.Medium}  
                  value={getAssistanceFormData?.name}
                  onChange={(e: any) =>
                    handleGetAssistanceDataChanges(e.target.value, "name")
                  }
                  reset={inputReset}
                />
              </div>
              <div className="col-md-6">
                <RdsInput
                  id=""
                  inputType="Email"
                  name="Email"
                  label={true}                 
                 labelPosition={LabelPosition.Top}
                  placeholder="Enter Email"             
                  readonly={false}
                  isDisabled={false}
                  size={InputSize.Medium}   
                  value={getAssistanceFormData?.email}
                  onChange={(e: any) =>
                    handleGetAssistanceDataChanges(e.target.value, "email")
                  }
                  reset={inputReset}
                  validatonPattern={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i}
                  validationMsg="Invalid Email Address."
                  required={true}
                />
              </div>

              <div className="col-md-6">
                <RdsInput
                  id=""
                  inputType="number"
                  name="Contact Number"
                  label={true}
                  labelPosition={LabelPosition.Top}
                  placeholder="Enter Contact Number"
                  required
                  size={InputSize.Medium}   
                  maxLength={10}
                  value={getAssistanceFormData?.phoneNumber}
                  onChange={(e: any) =>
                    handleGetAssistanceDataChanges(
                      e.target.value,
                      "phoneNumber"
                    )
                  }
                  reset={inputReset}
                  onKeyDown={(e) => {
                    const inputElement = e.target as HTMLInputElement;
                        const currentLength = inputElement.value.length;
                        const isPlusEntered = inputElement.value.startsWith('+');
                        const maxLength = isPlusEntered ? 13 : 12;
                       
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

              <div className="col-md-12 pb-4">
                <RdsTextArea
                  isMandatory
                  label="Notes"
                  labelPosition="top"
                  placeholder="Enter your specific requirements..."
                  rows={3}
                  value={getAssistanceFormData?.notes}
                  onChange={(e: any) =>
                    handleGetAssistanceDataChanges(e.target.value, "notes")
                  }
                  reset={inputReset}
                />
              </div>

              <div className="d-flex justify-content-end">
                <div>
                  <RdsButton
                    label="NEXT"
                    block={false}
                    size="medium"
                    type="button"
                    colorVariant="primary"
                    showLoadingSpinner={false}
                    isDisabled={
                      !getAssistanceFormData?.name ||
                      !getAssistanceFormData?.email ||
                      !getAssistanceFormData?.phoneNumber ||
                      !getAssistanceFormData?.notes
                    }
                    onClick={(e: any) => emitSaveData(e)}
                  ></RdsButton>
                </div>
              </div>           
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RdsCompGetAssistance;
