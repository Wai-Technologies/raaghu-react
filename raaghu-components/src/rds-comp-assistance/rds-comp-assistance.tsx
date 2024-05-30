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

  function emitSaveData(event: any) {
    event.preventDefault();
    props.onSaveHandler && props.onSaveHandler(assistance);
    setInputReset(!inputReset);
    setAssistance({
      name: "",
      email: "",
      contactNumber: "",
      message: "",
    });
  }

  return (
    <div>
      <form>
        <div className="row">
          <div className="col-md-6 form-group mb-2">
            <RdsInput
              inputType="text"
              required={true}
              label={"Name"}
              value={assistance?.name}
              placeholder={"Enter Name"}
              onChange={(e) => {
                handleDataChanges(e.target.value, "name");
              }}
              reset={inputReset}
            ></RdsInput>
          </div>
          <div className="col-md-6 form-group mb-2">
            <RdsInput
              inputType="text"
              label={"Email"}
              required={true}
              placeholder={"Enter Email"}
              value={assistance?.email}
              onChange={(e) => {
                handleDataChanges(e.target.value, "email");
              }}
              reset={inputReset}
            ></RdsInput>
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
              ></RdsInput>
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
          <div className="footer-buttons d-flex gap-2 flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row">
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
