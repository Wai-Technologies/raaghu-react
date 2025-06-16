import React, { useEffect, useState } from "react";
import { RdsInput, RdsTextArea, RdsButton } from "../rds-elements";

export interface RdsCompApiResourceBasicProps {
  apiResourceBasic: any;
  reset?: boolean;
  onSaveHandler?: (data: any) => void;
  scopeData: any;
  onSuccess?: (data: any) => void;
  apiType?: string;
}

const RdsCompApiResourceBasic = (props: RdsCompApiResourceBasicProps) => {
  const [inputReset, setInputReset] = useState(false);

  // For apiType = "resourceBasic"
  const [formData, setFormData] = useState(props.apiResourceBasic);

  // For apiType = "scopeBasicResource"
  const [fieldScopeData, setFieldScopeData] = useState(props.scopeData);

  // Reset handlers
  useEffect(() => {
    setFormData(props.apiResourceBasic);
    setFieldScopeData(props.scopeData);
  }, [props.apiResourceBasic, props.scopeData]);

  useEffect(() => {
    setInputReset(!inputReset);
  }, [props.reset]);

  // Handle input changes
  const handleDataChanges = (value: any, key: string) => {
    setFormData({ ...formData, [key]: value });
  };

  const inputHandlerChange = (event: any, key: string) => {
    setFieldScopeData({ ...fieldScopeData, [key]: event.target.value });
  };

  // Validation
  const isNameValid = (name: any) => !!name?.trim();
  const isEmailValid = (name: any) => !!name?.trim();

  const isFormValidResourceBasic = isNameValid(formData?.name);
  const isFormValidScopeBasic = isEmailValid(fieldScopeData?.name);

  // Save handlers
  const emitSaveData = (event: any) => {
    event.preventDefault();
    props.onSaveHandler && props.onSaveHandler(formData);
    setInputReset(!inputReset);
    setFormData({
      name: "",
      displayName: "",
      description: "",
      accessTokenSigningAlgorithm: "",
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.onSuccess && props.onSuccess(fieldScopeData);
    setInputReset(!inputReset);
    setFieldScopeData({
      id: "",
      name: "",
      displayName: "",
      description: "",
      resources: "",
    });
  };

  return (
    <>
      {props.apiType === "resourceBasic" && (
        <div>
          <form>
            <div className="custom-content-scroll">
              <div className="row">
                <div className="col-12 col-lg col-md">
                  <RdsInput
                    required={true}
                    reset={inputReset}
                    label={true}
                    placeholder="Enter name"
                    inputType="text"
                    onChange={(e) =>
                      handleDataChanges(e.target.value, "name")
                    }
                    value={formData?.name}
                    name="Name"
                    dataTestId="name"
                  />
                </div>

                <div className="col-12 col-lg col-md">
                  <RdsInput
                    label={true}
                    reset={inputReset}
                    placeholder="Enter display name"
                    inputType="text"
                    onChange={(e) =>
                      handleDataChanges(e.target.value, "displayName")
                    }
                    required={false}
                    name="Display Name"
                    value={formData?.displayName}
                    dataTestId="displayName"
                  />
                </div>
              </div>

              <RdsTextArea
                label="Description"
                placeholder="Description"
                onChange={(e) =>
                  handleDataChanges(e.target.value, "description")
                }
                rows={2}
                value={formData?.description}
                data-testId="desc"
                showTitle={true}
              />

              <div className="mb-4">
                <RdsInput
                  label={true}
                  reset={inputReset}
                  placeholder="Enter Allowed access token signing algorithms"
                  inputType="text"
                  onChange={(e) =>
                    handleDataChanges(
                      e.target.value,
                      "accessTokenSigningAlgorithm"
                    )
                  }
                  required={false}
                  name="Allowed Access Token Signing Algorithm"
                  value={formData?.accessTokenSigningAlgorithm}
                  dataTestId="allowed-access-token"
                />
              </div>
            </div>

            <div className="d-flex flex-column-reverse flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3 px-4">
              <RdsButton
                class="me-2"
                tooltipTitle=""
                type="button"
                label="Cancel"
                colorVariant="outline-primary"
                size="small"
                databsdismiss="offcanvas"
                dataTestId="cancel"
              />
              <RdsButton
                class="me-2"
                label="Save"
                size="small"
                colorVariant="primary"
                tooltipTitle=""
                type="submit"
                databsdismiss="offcanvas"
                isDisabled={!isFormValidResourceBasic}
                onClick={emitSaveData}
                dataTestId="save"
              />
            </div>
          </form>
        </div>
      )}

      {props.apiType === "scopeBasicResource" && (
        <div>
          <form onSubmit={handleSubmit}>
            <div className="custom-content-scroll">
              <div className="row mt-3">
                <div className="col-md-6">
                  <RdsInput
                    reset={inputReset}
                    required={true}
                    label={true}
                    placeholder="Enter Name"
                    inputType="text"
                    onChange={(e) => inputHandlerChange(e, "name")}
                    value={fieldScopeData?.name}
                    name="Name"
                    dataTestId="name"
                  />
                </div>

                <div className="col-md-6">
                  <RdsInput
                    reset={inputReset}
                    label={true}
                    placeholder="Enter Display Name"
                    inputType="text"
                    onChange={(e) => inputHandlerChange(e, "displayName")}
                    required={false}
                    name="Display Name"
                    value={fieldScopeData?.displayName}
                    dataTestId="display-name"
                  />
                </div>
              </div>

              <div className="mb-3 mt-2">
                <RdsInput
                  reset={inputReset}
                  name="Description"
                  label={true}
                  placeholder="Description"
                  inputType="text"
                  onChange={(e) => inputHandlerChange(e, "description")}
                  required={false}
                  value={fieldScopeData?.description}
                  dataTestId="desc"
                />
              </div>

              <div className="mb-3">
                <RdsTextArea
                  label="Resources"
                  placeholder="Resources"
                  onChange={(e) => inputHandlerChange(e, "resources")}
                  rows={3}
                  value={fieldScopeData?.resources}
                  dataTestId="resources"
                  showTitle={true}
                />
              </div>
            </div>

            <div className="d-flex flex-column-reverse ps-4 flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3 p-4">
              <RdsButton
                class="me-2"
                tooltipTitle=""
                type="button"
                label="Cancel"
                colorVariant="outline-primary"
                size="small"
                databsdismiss="offcanvas"
                dataTestId="cancel"
              />
              <RdsButton
                class="me-2"
                label="Save"
                size="small"
                colorVariant="primary"
                tooltipTitle=""
                type="submit"
                databsdismiss="offcanvas"
                isDisabled={!isFormValidScopeBasic}
                dataTestId="save"
              />
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default RdsCompApiResourceBasic;
