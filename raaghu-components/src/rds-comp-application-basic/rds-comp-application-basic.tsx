import React, { useEffect, useState } from "react";
import { RdsButton, RdsInput } from "../rds-elements";
import { useTranslation } from "react-i18next";
import { InputSize, LabelPosition } from "../../../raaghu-elements/src/rds-input/rds-input";
export interface RdsCompApplicationBasicProps {
    basicData?: any;
    onSuccess?: any;
    reset?: boolean
    editApplicationData?: any;
}

const RdsCompApplicationBasic = (props: RdsCompApplicationBasicProps) => {
    const [inputReset, setInputReset] = useState(props.reset)
    const [basicApplicationData, setBasicApplicationData] = useState<any>(props.basicData);

    useEffect(() => {
        setBasicApplicationData(props.basicData);
    }, [props.basicData]);

    useEffect(() => {
        setInputReset(props.reset);
    }, [props.reset]);

   
    const handlerInputChange = (value: any, key: any) => {
        setBasicApplicationData({ ...basicApplicationData, [key]: value });
        props.editApplicationData && props.editApplicationData({ ...basicApplicationData, [key]: value });
    }
    
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
        if (!clientUri || clientUri.length === 0|| !/^(ftp|http|https):\/\/[^ "]+$/.test(clientUri)) {
            return false;
        }
        return true;
    };
    const isLogoUriValid = (logoUri: any) => {
        if (!logoUri || logoUri.length === 0|| !/^(ftp|http|https):\/\/[^ "]+$/.test(logoUri)) {
            return false;
        }
        return true;
    };
    const isFormValid = isClientIdValid(basicApplicationData?.clientId) && isDisplayNameValid(basicApplicationData?.displayName) && isClientUriValid(basicApplicationData?.clientUri) && isLogoUriValid(basicApplicationData?.logoUri);
    return (
      <>
        {" "}
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
                      validationMsg="Please Enter valid url (https or http)"
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
                      validationMsg="Please Enter valid url (https or http)"
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
      </>
    );
};
export default RdsCompApplicationBasic;