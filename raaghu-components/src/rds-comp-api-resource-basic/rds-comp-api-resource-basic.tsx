import React, { useEffect, useState } from "react";
import { RdsInput, RdsTextArea, RdsButton } from "../rds-elements";

export interface RdsCompApiResourceBasicProps {
  apiResourceBasic: any;
  reset?: boolean;
  onSaveHandler?: (data: any) => void;
}

const RdsCompApiResourceBasic = (props: RdsCompApiResourceBasicProps) => {
const [formData, setFormData] = useState(props.apiResourceBasic);
const [inputReset, setInputReset] = useState(false);

useEffect(() => {
  setFormData(props.apiResourceBasic);
}, [props.apiResourceBasic]);

useEffect(() => {
  setInputReset(!inputReset);
}, [props.reset]);

const handleDataChanges = (value: any, key: string) => {
  setFormData({ ...formData, [key]: value });
}
 
function emitSaveData(event: any) {
  event.preventDefault();
   props.onSaveHandler && props.onSaveHandler(formData);  
  setInputReset(!inputReset);
   setFormData({
    name: "",
    displayName: "",
    description: "",
    accessTokenSigningAlgorithm: "",
   })

}

  return (
    <>
      <div>
        <form>
          <div className="custom-content-scroll">
            <div className="row mt-3">
              <div className="col-6">
                <RdsInput
                  required={true}
                  reset={inputReset}
                  label="Name"
                  placeholder="Enter name"
                  inputType="text"
                  onChange={(e) => {
                    handleDataChanges(e.target.value, "name");
                  }}
                  value={formData?.name}
                  name={"name"}
                  dataTestId="name"
                ></RdsInput>
              </div>

              <div className="col-6 ">
                <RdsInput
                  label="Display name"
                  reset={inputReset}
                  placeholder="Enter display name"
                  inputType="text"
                  onChange={(e) => {
                    handleDataChanges(e.target.value, "displayName");
                  }}
                  required={false}
                  name={"displayName"}
                  value={formData?.displayName}
                  dataTestId="displayName"
                ></RdsInput>
              </div>
            </div>
            <div className=" mb-4">
              <RdsTextArea
                label="Description"
                placeholder="Description"
                onChange={(e) => {
                  handleDataChanges(e.target.value, "description");
                }}
                rows={2}
                value={formData?.description}
                data-testId="desc"
              />
            </div>
            <div className=" mb-4">
              <RdsInput
                label="Allowed access token signing algorithms"
                reset={inputReset}
                placeholder="Enter Allowed access token signing algorithms"
                inputType="text"
                onChange={(e) => {
                  handleDataChanges(
                    e.target.value,
                    "accessTokenSigningAlgorithm"
                  );
                }}
                required={false}
                name={"accessTokenSigningAlgorithm"}
                value={formData?.accessTokenSigningAlgorithm}
                dataTestId="allowed-access-token"
              ></RdsInput>
            </div>
            <div>
              {/* <label className="Text-bold" >Others</label>
            <RdsCheckboxGroup itemList={props.resourceData.checklist} /> */}
            </div>
          </div>
          <div className="d-flex flex-column-reverse ps-4 flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3">
            <RdsButton
              class="me-2"
              tooltipTitle={""}
              type={"button"}
              label="Cancel"
              colorVariant="outline-primary"
              size="small"
              databsdismiss="offcanvas"
              dataTestId="cancel"
            ></RdsButton>
            <RdsButton
              class="me-2"
              label="Save"
              size="small"
              colorVariant="primary"
              tooltipTitle={""}
              type={"submit"}
              databsdismiss="offcanvas"
              onClick={(e: any) => emitSaveData(e)}
              dataTestId="save"
            ></RdsButton>
          </div>
        </form>
      </div>
    </>
  );
};
export default RdsCompApiResourceBasic;
