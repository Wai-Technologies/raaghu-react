import { useTranslation } from "react-i18next";
import { RdsButton, RdsCheckbox, RdsInput, RdsTextArea } from "../rds-elements";
import React, { useEffect, useState } from "react";

export interface RdsCompIdentityClientBasicProps {
  clientData?: any;
  onSaveHandler?: (data: any) => void;
}

const RdsCompIdentityClientBasic = (props: RdsCompIdentityClientBasicProps) => {
  const [clientData, setClientData] = useState<any>(props.clientData);

  useEffect(() => {
    setClientData(props.clientData);
  }, [props.clientData]);

  const handleDataChanges = (value: any, key: string) => {
    setClientData({ ...clientData, [key]: value });
  };

  
  function emitSaveData(event: any) {
    event.preventDefault();
    props.onSaveHandler && props.onSaveHandler(clientData);
    setClientData({
      clientId: "",
      clientName: "",
      description: "",
      clientUrl: "",
      logoUrl: "",
      callbackUrl: "",
      logoutUrl: "",
    });
  }
  const isClientUrlValid = (clientUrl: any) => {
  if(!clientUrl || clientUrl.length === 0 || !/^(ftp|http|https):\/\/[^ "]+$/.test(clientUrl)){
    return false;
  }
  return true;
  }
  const isLogoUrlValid = (logoUrl: any) => {
  if(!logoUrl || logoUrl.length === 0|| !/^(ftp|http|https):\/\/[^ "]+$/.test(logoUrl)){
    return false;
  }
  return true;
  }
  const isCallBackUrlValid = (callbackUrl: any) => {
  if(!callbackUrl || callbackUrl.length === 0|| !/^(ftp|http|https):\/\/[^ "]+$/.test(callbackUrl)){
    return false;
  }
  return true;
  }
  const isLogoutUrlValid = (logoutUrl: any) => {
  if(!logoutUrl || logoutUrl.length === 0|| !/^(ftp|http|https):\/\/[^ "]+$/.test(logoutUrl)){
    return false;
  }
  return true;
  }
const isFormValid = isClientUrlValid(clientData?.clientUrl) && isLogoUrlValid(clientData?.logoUrl) && isCallBackUrlValid(clientData?.callbackUrl) && isLogoutUrlValid(clientData?.logoutUrl);
  return (
    <>
      <form className="p-2 mt-1">
        <div className="custom-content-scroll">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <RdsInput
                placeholder="Enter Client ID"
                inputType="text"
                name="Client ID"
                label={true}              
                required={false}
                dataTestId="client-id"
                onChange={(e) => {
                  handleDataChanges(e.target.value, "clientId");
                }}
                value={clientData?.clientId}
              ></RdsInput>
            </div>
            <div className="col-lg-6 col-md-6">
              <RdsInput
                placeholder="Enter Client Name"
                inputType="text"
                name="Client Name"
                label={true}               
                required={false}
                dataTestId="client-name"
                onChange={(e) => {
                  handleDataChanges(e.target.value, "clientName");
                }}
                value={clientData?.clientName}
              ></RdsInput>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 mt-2">
              <RdsTextArea
                label="Description"
                placeholder="Enter Description"
                rows={4}
                dataTestId="description"
                onChange={(e) => {
                  handleDataChanges(e.target.value, "description");
                }}
                value={clientData?.description}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <RdsInput
                placeholder="Enter Client URL"
                inputType="text"
                name="Client URL"
                label={true  }              
                required={true}
                dataTestId="client-url"
                onChange={(e) => {
                  handleDataChanges(e.target.value, "clientUrl");
                }}
                value={clientData?.clientUrl}
                validatonPattern={/^(ftp|http|https):\/\/[^ "]+$/}    
                validationMsg="Please Enter valid url (https or http)"
              ></RdsInput>
            </div>
            <div className="col-lg-6 col-md-6">
              <div>
                <RdsInput
                  placeholder="Enter Logo URL"
                  inputType="text"
                  name="Logo URL"
                  label={true}                  
                  required={true}
                  dataTestId="logo-url"
                  onChange={(e) => {
                    handleDataChanges(e.target.value, "logoUrl");
                  }}
                  value={clientData?.logoUrl}
                  validatonPattern={/^(ftp|http|https):\/\/[^ "]+$/}                   
                  validationMsg="Please Enter valid url (https or http)"
                ></RdsInput>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <RdsInput
                placeholder="Enter CallBack URL"
                inputType="text"
                name="CallBack URL"
                label={true}                
                required={true}
                dataTestId="callback-url"
                onChange={(e) => {
                  handleDataChanges(e.target.value, "callbackUrl");
                }}
                value={clientData?.callbackUrl}
                validatonPattern={/^(ftp|http|https):\/\/[^ "]+$/}                   
                validationMsg="Please Enter valid url (https or http)"
              ></RdsInput>
            </div>
            <div className="col-lg-6 col-md-6">
              <RdsInput
                placeholder="Enter Logout URL"
                inputType="text"
                name="Logout URL"
                label={true}                
                required={true}
                dataTestId="logout-url"
                onChange={(e) => {
                  handleDataChanges(e.target.value, "logoutUrl");
                }}
                value={clientData?.logoutUrl}
                validatonPattern={/^(ftp|http|https):\/\/[^ "]+$/}                   
                validationMsg="Please Enter valid url (https or http)"
              ></RdsInput>
            </div>
          </div>
          <div className="row mt-2">
            <RdsCheckbox
              labelText="Required Consent"
              dataTestId="consent"
              onChange={(e: any) => {
                handleDataChanges(e.target.checked, "requiredConsent");
              }}
              checked={clientData?.requiredConsent}
            ></RdsCheckbox>
          </div>
        </div>
        <div className="d-flex flex-column-reverse ps-4 ms-2 pe-4 flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 pb-3">
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
            onClick={(e: any) => emitSaveData(e)}
            databsdismiss="offcanvas"
            isDisabled={!isFormValid}
          ></RdsButton>
           
        </div>
      </form>
    </>
  );
};

export default RdsCompIdentityClientBasic;
