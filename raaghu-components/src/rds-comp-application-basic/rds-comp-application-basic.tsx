import React, { useEffect, useState } from "react";
import {
  RdsButton,
  RdsCheckbox,
  RdsDropdownList,
  RdsInput,
  RdsTextArea,
} from "../rds-elements";
import { useTranslation } from "react-i18next";
import {
  InputSize,
  LabelPosition,
} from "../../../raaghu-elements/src/rds-input/rds-input";
import RdsCompCheckboxGroup from "../rds-comp-checkbox-group";
export interface RdsCompApplicationBasicProps {
  basicData?: any;
  onSuccess?: any;
  reset?: boolean;
  editApplicationData?: any;
  application?: string;
  scopesList: any[];
  editScopeList?: any;
  typeList: any[];
  consentType: any[];
  handleSubmit: React.EventHandler<any>;
}

const RdsCompApplicationBasic = (props: RdsCompApplicationBasicProps) => {
  const [inputReset, setInputReset] = useState(props.reset);
  const [basicApplicationData, setBasicApplicationData] = useState<any>(
    props.basicData
  );
  const [scopeList, setScopeList] = useState(props.scopesList);

  useEffect(() => {
    setBasicApplicationData(props.basicData);
  }, [props.basicData]);

  useEffect(() => {
    setInputReset(props.reset);
  }, [props.reset]);

  const handlerChange = (event: any) => {
    const tempScopes = scopeList?.map((curr: any) => {
      if (curr.id === event.target.id) {
        return { ...curr, checked: event.target.checked };
      } else {
        return curr;
      }
    });
    props.editScopeList && props.editScopeList(tempScopes);
    setScopeList(tempScopes);
  };

  const handlerInputChange = (value: any, key: any) => {
    setBasicApplicationData({ ...basicApplicationData, [key]: value });
    props.editApplicationData &&
      props.editApplicationData({ ...basicApplicationData, [key]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.onSuccess && props.onSuccess(basicApplicationData);
    setInputReset(!inputReset);
    setBasicApplicationData({
      clientId: "",
      displayName: "",
      clientUri: "",
      logoUri: "",
    });
  };
  const isClientIdValid = (clientId: any) => {
    if (!clientId || clientId.length === 0) {
      return false;
    }
    return true;
  };
  const isDisplayNameValid = (displayName: any) => {
    if (!displayName || displayName.length === 0) {
      return false;
    }
    return true;
  };
  const isClientUriValid = (clientUri: any) => {
    if (
      !clientUri ||
      clientUri.length === 0 ||
      !/^(ftp|http|https):\/\/[^ "]+$/.test(clientUri)
    ) {
      return false;
    }
    return true;
  };
  const isLogoUriValid = (logoUri: any) => {
    if (
      !logoUri ||
      logoUri.length === 0 ||
      !/^(ftp|http|https):\/\/[^ "]+$/.test(logoUri)
    ) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    setInputReset(props.reset);
  }, [props.reset]);

  const checkboxes = [
    basicApplicationData?.allowAuthorizationCodeFlow,
    basicApplicationData?.allowHybridFlow,
    basicApplicationData?.allowPasswordFlow,
  ];
  const isAllowRefreshTokenFlowDisabled =
    checkboxes.length > 1 && !checkboxes.some((checkbox) => checkbox);

  const handleDataChanges = (value: any, key: string) => {
    setBasicApplicationData({ ...basicApplicationData, [key]: value });
    props.editApplicationData &&
      props.editApplicationData({ ...basicApplicationData, [key]: value });
  };

  const isDivVisible =
    basicApplicationData?.allowAuthorizationCodeFlow ||
    basicApplicationData?.allowImplicitFlow ||
    basicApplicationData?.allowHybridFlow;

  function emitSaveData(event: any) {
    event.preventDefault();
    const completeFormData = {
      ...basicApplicationData,
      type: basicApplicationData?.type || "",
      clientSecret: basicApplicationData?.clientSecret || "",
      allowAuthorizationCodeFlow: basicApplicationData?.allowAuthorizationCodeFlow || false,
      allowImplicitFlow: basicApplicationData?.allowImplicitFlow || false,
      allowHybridFlow: basicApplicationData?.allowHybridFlow || false,
      allowPasswordFlow: basicApplicationData?.allowPasswordFlow || false,
      allowRefreshTokenFlow: basicApplicationData?.allowRefreshTokenFlow || false,
      allowClientCredentialsFlow: basicApplicationData?.allowClientCredentialsFlow || false,
      allowDeviceEndpoint: basicApplicationData?.allowDeviceEndpoint || false,
      redirectUris: basicApplicationData?.redirectUris || "",
      allowLogoutEndpoint: basicApplicationData?.allowLogoutEndpoint || false,
      postLogoutRedirectUris: basicApplicationData?.postLogoutRedirectUris || "",
      consentType: basicApplicationData?.consentType || "",
      enabled: basicApplicationData?.enabled || false,
    };
    props.onSuccess && props.onSuccess(completeFormData);
    props.handleSubmit && props.handleSubmit(event);
    setInputReset(!inputReset);
    setBasicApplicationData({
      type: "",
      clientSecret: "",
      allowAuthorizationCodeFlow: false,
      allowImplicitFlow: false,
      allowHybridFlow: false,
      allowPasswordFlow: false,
      allowRefreshTokenFlow: false,
      allowClientCredentialsFlow: false,
      allowDeviceEndpoint: false,
      redirectUris: "",
      allowLogoutEndpoint: false,
      postLogoutRedirectUris: "",
      consentType: "",
      enabled: false,
    });
  }

  const isFormValid =
    isClientIdValid(basicApplicationData?.clientId) &&
    isDisplayNameValid(basicApplicationData?.displayName) &&
    isClientUriValid(basicApplicationData?.clientUri) &&
    isLogoUriValid(basicApplicationData?.logoUri);
  return (
    <>
      {props.application === "basic" && (
        <div>
          <div className="tab-content pt-3">
            <form onSubmit={handleSubmit}>
              <div className="custom-content-scroll">
                <div className="row">
                  <div className="col-12 col-6 col-lg-6 col-md-6 col-xl-6 col-xxl-6">
                    <RdsInput
                      reset={inputReset}
                      name="Client Id"
                      label={true}
                      placeholder="Enter Client Id"
                      inputType="text"
                      onChange={(e: any) =>
                        handlerInputChange(e.target.value, "clientId")
                      }
                      value={basicApplicationData?.clientId}
                      required={true}
                    ></RdsInput>
                  </div>
                  <div className="col-12 col-6 col-lg-6 col-md-6 col-xl-6 col-xxl-6">
                    <RdsInput
                      reset={inputReset}
                      required={true}
                      name="Display Name"
                      label={true}
                      placeholder="Enter Display Name"
                      inputType="text"
                      onChange={(e) =>
                        handlerInputChange(e.target.value, "displayName")
                      }
                      value={basicApplicationData?.displayName}
                    ></RdsInput>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-6 col-lg-6 col-md-6 col-xl4 col-xxl-6 mb-3">
                    <RdsInput
                      name="Client Uri"
                      labelPosition={LabelPosition.Top}
                      label={true}
                      placeholder="Enter Client Uri"
                      customClasses="form-control"
                      value={basicApplicationData?.clientUri}
                      onChange={(e) =>
                        handlerInputChange(e.target.value, "clientUri")
                      }
                      required={true}
                      reset={inputReset}
                      dataTestId="site-key-url"
                      validatonPattern={/^(ftp|http|https):\/\/[^ "]+$/}
                      validationMsg="Please Enter valid URL (https or http)"
                    ></RdsInput>
                  </div>
                  <div className="col-12 col-6 col-lg-6 col-md-6 col-xl4 col-xxl-6 mb-3">
                    <RdsInput
                      name="Logo Uri"
                      labelPosition={LabelPosition.Top}
                      label={true}
                      placeholder="Enter Logo Uri"
                      customClasses="form-control"
                      value={basicApplicationData?.logoUri}
                      onChange={(e) =>
                        handlerInputChange(e.target.value, "logoUri")
                      }
                      required={true}
                      reset={inputReset}
                      dataTestId="site-key-url"
                      validatonPattern={/^(ftp|http|https):\/\/[^ "]+$/}
                      validationMsg="Please Enter valid URL (https or http)"
                    ></RdsInput>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-column-reverse ps-4 flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3 p-4">
                <RdsButton
                  tooltipTitle={""}
                  type={"button"}
                  label="Cancel"
                  colorVariant="outline-primary"
                  size="small"
                  databsdismiss="offcanvas"
                  dataTestId="cancel"
                ></RdsButton>
                <RdsButton
                  label="Save"
                  size="small"
                  colorVariant="primary"
                  tooltipTitle={""}
                  type={"submit"}
                  databsdismiss="offcanvas"
                  dataTestId="save"
                  isDisabled={!isFormValid}
                ></RdsButton>
              </div>
            </form>
          </div>
        </div>
      )}
      {props.application === "scopes" && (
        <div className="row">
          <div className="col-12 col-6 col-lg-6 col-md-6 col-xl-6 col-xxl-6">
            <RdsCompCheckboxGroup itemList={scopeList} onClick={handlerChange} />
          </div>
        </div>
      )}
      {props.application === "workflows" && (
        <>
          <div className="custom-content-scroll">
            <div className="row">
              <div className="col-12 col-6 col-lg-6 col-md-6 col-xl4 col-xxl-6 mb-3 pt-3">
                <label>Type</label>
                <RdsDropdownList
                  borderDropdown={true}
                  isPlaceholder
                  placeholder="Select Consent Type"
                  listItems={props.typeList || []}
                  onClick={(event: any, val: string) => handleDataChanges(val, "type")}
                  reset={inputReset}
                />
              </div>
              <div className="col-12 col-6 col-lg-6 col-md-6 col-xl4 col-xxl-6 mb-3 pt-2">
                {basicApplicationData?.type == "confidential" && (
                  <RdsInput
                    reset={inputReset}
                    name="Client Secret"
                    label={true}
                    placeholder="Enter Client Secrete"
                    inputType="text"
                    onChange={(e) =>
                      handleDataChanges(e.target.value, "clientSecret")
                    }
                    value={basicApplicationData?.clientSecret}
                  ></RdsInput>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-lg-12 col-md-12 col-xl-12 col-xxl-12 mb-3 ">
                <div className="mb-3">
                  <RdsCheckbox
                    classes="py-2"
                    labelText="Allow Authorization Code Flow"
                    onChange={(e) => {
                      handleDataChanges(
                        e.target.checked,
                        "allowAuthorizationCodeFlow"
                      );
                    }}
                    checked={basicApplicationData?.allowAuthorizationCodeFlow}
                    dataTestId="authorization-flow"
                  ></RdsCheckbox>
                </div>
                <div className="mb-3">
                  <RdsCheckbox
                    classes="py-2"
                    labelText="Allow Implicit Flow"
                    onChange={(e) => {
                      handleDataChanges(e.target.checked, "allowImplicitFlow");
                    }}
                    dataTestId="implicit-flow"
                    checked={basicApplicationData?.allowImplicitFlow}
                  ></RdsCheckbox>
                </div>
                <div className="mb-3">
                  <RdsCheckbox
                    classes="py-2"
                    labelText="Allow Hybrid Flow"
                    onChange={(e) => {
                      handleDataChanges(e.target.checked, "allowHybridFlow");
                    }}
                    dataTestId="hybrid-flow"
                    checked={basicApplicationData?.allowHybridFlow}
                  ></RdsCheckbox>
                </div>

                <div className="mb-3">
                  <RdsCheckbox
                    classes="py-2"
                    labelText="Allow Password Flow"
                    onChange={(e) => {
                      handleDataChanges(e.target.checked, "allowPasswordFlow");
                    }}
                    checked={basicApplicationData?.allowPasswordFlow}
                    dataTestId="password-flow"
                  ></RdsCheckbox>
                </div>
                <div className="mb-3">
                  <RdsCheckbox
                    classes="py-2"
                    labelText="Allow Refresh Token Flow"
                    onChange={(e) => {
                      handleDataChanges(
                        e.target.checked,
                        "allowRefreshTokenFlow"
                      );
                    }}
                    checked={basicApplicationData?.allowRefreshTokenFlow}
                    isDisabled={isAllowRefreshTokenFlowDisabled}
                    dataTestId="refresh-flow"
                  ></RdsCheckbox>
                </div>
                <div className="mb-3">
                  <RdsCheckbox
                    classes="py-2"
                    labelText="Allow Client Credentials Flow"
                    onChange={(e) => {
                      handleDataChanges(
                        e.target.checked,
                        "allowClientCredentialsFlow"
                      );
                    }}
                    checked={basicApplicationData?.allowClientCredentialsFlow}
                    isDisabled={basicApplicationData?.type === "public"}
                    dataTestId="client-credential-flow"
                  ></RdsCheckbox>
                </div>
                <div className="mb-3">
                  <RdsCheckbox
                    classes="py-2"
                    labelText="Allow Device End point"
                    onChange={(e) => {
                      handleDataChanges(
                        e.target.checked,
                        "allowDeviceEndpoint"
                      );
                    }}
                    checked={basicApplicationData?.allowDeviceEndpoint}
                    isDisabled={basicApplicationData?.type === "public"}
                    dataTestId="device-endpoint"
                  ></RdsCheckbox>
                </div>
              </div>
            </div>
            {/* {basicApplicationData.allowAuthorizationCodeFlow || basicApplicationData.allowImplicitFlow ||
                basicApplicationData.allowHybridFlow ? (<> */}
            <div>
              <div className="mb-3">
                <RdsTextArea
                  reset={inputReset}
                  isMultiUrl={true}
                  showTitle={true}
                  label="Redirect Uris"
                  placeholder="Enter Redirect Uris"
                  onChange={(e: any) =>
                    handleDataChanges(e.target.value, "redirectUris")
                  }
                  value={
                    basicApplicationData?.redirectUris !== null
                      ? basicApplicationData?.redirectUris
                      : basicApplicationData?.redirectUris
                  }
                  rows={3}
                  dataTestId="redirect-uri"
                  isDisabled={!isDivVisible}
                  isMandatory={false}
                  validationPattern={/^(ftp|http|https):\/\/[^ "]+$/}
                  validationMsg="This Field Is Not A Valid Fully Qualified Http Https Or Ftp URL"
                />
              </div>
              <div className="mb-3">
                <RdsCheckbox
                  labelText="Allow Logout End point"
                  onChange={(e) => {
                    handleDataChanges(e.target.checked, "allowLogoutEndpoint");
                  }}
                  checked={basicApplicationData?.allowLogoutEndpoint}
                  dataTestId="logout-endpoint"
                  isDisabled={!isDivVisible}
                ></RdsCheckbox>
              </div>
              <div className="row mb-3">
                {/* {basicApplicationData.allowLogoutEndpoint && (
                            <> */}
                <RdsTextArea
                  reset={inputReset}
                  isMultiUrl={true}
                  showTitle={true}
                  label="Post Logout Redirect Uris"
                  placeholder="Enter Post Logout Redirect Uris"
                  onChange={(e) =>
                    handleDataChanges(e.target.value, "postLogoutRedirectUris")
                  }
                  value={
                    basicApplicationData?.postLogoutRedirectUris !== null
                      ? basicApplicationData?.postLogoutRedirectUris
                      : basicApplicationData?.postLogoutRedirectUris
                  }
                  rows={3}
                  dataTestId="logout-redirect-uri"
                  isDisabled={!basicApplicationData?.allowLogoutEndpoint}
                  isMandatory={false}
                  validationPattern={/^(ftp|http|https):\/\/[^ "]+$/}
                  validationMsg="This Field Is Not A Valid Fully Qualified Http Https Or Ftp URL"
                />
                {/* </>)
                        } */}
              </div>
              <div className="mb-3">
                <label>Consent Type</label>
                <RdsDropdownList
                  borderDropdown={true}
                  isPlaceholder
                  placeholder="Consent Type"
                  listItems={props.consentType || []}
                  onClick={(event: any, val: string) => {
                    handleDataChanges(val, "consentType");
                  }}
                  reset={inputReset}
                />
              </div>
            </div>
            {basicApplicationData?.id && (
              <div className="row py-2">
                <RdsCheckbox
                  labelText="Enabled"
                  checked={basicApplicationData?.enabled}
                  onChange={(e) => {
                    handleDataChanges(e.target.checked, "enabled");
                  }}
                  dataTestId="enabled"
                ></RdsCheckbox>
              </div>
            )}
          </div>
          <div className="d-flex flex-column-reverse ps-4 flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3 p-2 px-4">
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
        </>
      )}
    </>
  );
};
export default RdsCompApplicationBasic;
