import React, { useEffect, useState } from "react";
import {
  RdsButton,
  RdsDropdownList,
  RdsInput,
  RdsLabel,
  RdsSelectList,
  RdsTextArea,
} from "../rds-elements";

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
  // const [timeZoneList, setCountryList] = useState(props.timeZoneList);

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
              <div className="col-md-6 mb-3">
                <RdsInput
                  id=""
                  inputType="text"
                  label="Name"
                  labelPosition="top"
                  placeholder="Enter Name"
                  // required
                  readonly={false}
                  isDisabled={false}
                  size="medium"
                  value={getAssistanceFormData?.name}
                  onChange={(e: any) =>
                    handleGetAssistanceDataChanges(e.target.value, "name")
                  }
                  reset={inputReset}
                />
              </div>
              <div className="col-md-6 mb-3">
                <RdsInput
                  id=""
                  inputType="Email"
                  label="Email"
                  labelPosition="top"
                  placeholder="Enter Email"
                  // required
                  readonly={false}
                  isDisabled={false}
                  size="medium"
                  value={getAssistanceFormData?.email}
                  onChange={(e: any) =>
                    handleGetAssistanceDataChanges(e.target.value, "email")
                  }
                  reset={inputReset}
                  validatonPattern={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i}
                  validationMsg="Invalid Email Address."  
                />
              </div>

              <div className="col-md-6">
                <RdsInput
                  id=""
                  inputType="number"
                  label="Contact Number"
                  labelPosition="top"
                  placeholder="Enter Contact Number"
                  required
                  size="medium"
                  maxLength={10}
                  value={getAssistanceFormData?.phoneNumber}
                  onChange={(e: any) =>
                    handleGetAssistanceDataChanges(
                      e.target.value,
                      "phoneNumber"
                    )
                  }
                  reset={inputReset}
                />
              </div>
              {/* <div className="col-md-6 mb-2">
              <RdsLabel label="Timezone " required={false} />
              <RdsDropdownList
                placeholder="Select Timezone"
                isPlaceholder={true}
                multiSelect={false}
                borderDropdown={true}
                listItems={timeZoneList}
                id={"timezonList"}
                onClick={(e: any, val: any) => handleGetAssistanceDataChanges(val, "timezone")}
              />
            </div> */}

              <div className="col-md-12 pb-4 mb-2">
                <RdsTextArea
                  isRequired
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

              {/* <div>
              <RdsButton
                label="Submit"
                onClick={handleGetAssistanceDataSubmit} />
            </div> */}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RdsCompGetAssistance;
