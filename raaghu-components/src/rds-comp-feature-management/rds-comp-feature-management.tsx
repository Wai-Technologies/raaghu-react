import React, { useEffect, useState } from "react";
import { RdsButton, RdsCheckbox, RdsInput, RdsLabel, RdsNavtabs, RdsSelectList } from "../rds-elements";
import { useTranslation } from "react-i18next";
import { InputSize, LabelPosition } from "../../../raaghu-elements/src/rds-input/rds-input";
export interface RdsCompFeatureManagementProps {
  featureManagementData: any;
  onSubmit?: any
}

const RdsCompFeatureManagement = (props: RdsCompFeatureManagementProps) => {

  const versionList = [
    { option: "2", value: 2 },
    { option: "3", value: 3 },
  ]
  const twoFactList = [
    { option: "Optional", value: 0 },
    { option: "Disabled", value: 1 },
    { option: "Forced", value: 2 },
  ]
  const [activeNavTabId, setActiveNavTabId] = useState("0");
  const [featureManagementData, setFeatureManagementData] = useState<any>(props.featureManagementData?.data);
  const [payloads, setPayloads] = useState<any>(props.featureManagementData?.payload);

  useEffect(() => {
    setPayloads(props.featureManagementData?.payload)
    setFeatureManagementData(props.featureManagementData?.data);
  }, [props.featureManagementData]);

  const navtabsItems = featureManagementData?.map((item: any, index: number) => {
    return {
      label: item.displayName,
      id: index.toString()
    };
  });

  const twoFactorItems = featureManagementData?.[0]?.features?.[0]?.valueType?.itemSource?.items?.map((item : any) => {
    return { option: item.value, value: item.value };
});

const handlerSubmit = (e: any) => {
  e.preventDefault();
  const tempdata: any[] = [];
  if (props.featureManagementData && props.featureManagementData.payload) {
    props.featureManagementData.payload.forEach((element: any, index: number) => {
      if (element.value != payloads[index].value && element.name == payloads[index].name) {
        tempdata.push(payloads[index]);
      }
    });
  }
  props.onSubmit && props.onSubmit(payloads)
}

  const handlerChanges = (value: any, name: string) => {
    const tempdata = payloads.map((curElem: any, index: any) => {
      if (curElem?.name === name) {
        return { ...curElem, value: value };
      }
      else return curElem;
    });
    setPayloads(tempdata)
  }

  return (
    <>
      <form onSubmit={handlerSubmit}>
        <div className="row pt-3">
          <div className="col-xxl-3 col-xl-5 col-lg-5 col-12 d-xxl-block d-xl-block d-lg-block pb-4 border-end pe-xxl-4 pe-xl-4 pe-lg-4 pe-md-4 pe-0">
            <RdsNavtabs
              navtabsItems={navtabsItems}
              // type="vertical"
              fill={false}
              justified={false}
              activeNavTabId={activeNavTabId}
              activeNavtabOrder={(activeNavTabId) => {
                setActiveNavTabId(activeNavTabId);
              } } type={"default"}            />
          </div>

          <div className="col-xxl-9 col-xl-7 col-lg-7 col-12 pb-4 ps-xxl-4 ps-xl-4 ps-lg-4 ps-md-4 ps-0">
            {activeNavTabId === "0" && featureManagementData && featureManagementData.length > 0 && featureManagementData[0]?.displayName === "IdentityGroup" && (
              <>
                <div className="col-xxl-4 col-xl-4 col-lg-8 col-12">
                  <RdsSelectList
                    id="twoFac"
                    label={(featureManagementData[0].features[0].displayName)}
                    selectItems={twoFactorItems}
                    selectedValue={payloads[0]?.value}
                    onChange={(item: any) => {
                      handlerChanges(item.value, featureManagementData[0].features[0].name)
                    }}
                  ></RdsSelectList>
                </div>
                <small className="text-secondary-50"> {(featureManagementData[0].features[0].description) || ''}</small>
                <div className="col-xxl-4 col-xl-4 col-lg-8 col-12 mt-3 mb-3">
                  <div className="form-group">
                    <RdsInput
                      name="Input Number"
                      size={InputSize.Medium}   
                      label={(featureManagementData[0].features[1].displayName) || ''}
                      inputType="number"
                      isDisabled={false}
                      readonly={false}
                      placeholder="Enter Length"
                      value={payloads[1]?.value}
                      onChange={(e: any) => handlerChanges(e.target.value, featureManagementData[0].features[1].name)}
                      fontWeight="normal"
                      dataTestId="max-user-count"
                    ></RdsInput>
                    <small className="text-secondary-50"> {(featureManagementData[0].features[1].description) || ''}</small>
                  </div>
                </div>
                <div className="col-md-12 mb-3">
                  <RdsCheckbox
                    labelText={(featureManagementData[0].features[2].displayName) || ''}
                    checked={payloads[2]?.value}
                    onChange={(e: any) => {
                      handlerChanges(e.target.checked, featureManagementData[0].features[2].name)
                    }}
                    dataTestId="ldap-login"
                  ></RdsCheckbox>
                </div>
                <div className="col-md-12 mb-3">
                  <RdsCheckbox
                    labelText={(featureManagementData[0].features[3].displayName) || ''}
                    checked={payloads[3]?.value}
                    onChange={(e: any) => {
                      handlerChanges(e.target.checked, featureManagementData[0].features[3].name)
                    }}
                    dataTestId="oauth-login"
                  ></RdsCheckbox>
                </div>

              </>
            )}
            {activeNavTabId === "1" && featureManagementData[1].displayName === ("LanguageManagement.Feature:LanguageManagementGroup") && (
              <>
                <div className="fw-medium my-3">
                  <RdsLabel label={(featureManagementData[1].displayName) || ""}></RdsLabel>
                </div>
                <div className="col-md-12">
                  <RdsCheckbox
                    labelText={(featureManagementData[1].features[0].displayName) || ''}
                    checked={payloads[4]?.value}
                    onChange={(e: any) => {
                      handlerChanges(e.target.checked, featureManagementData[1].features[0].name)
                    }}
                    dataTestId="language-management"
                  ></RdsCheckbox>
                </div>
                <small className="text-secondary-50">{(featureManagementData[1].features[0].description) || ''}</small>
              </>
            )}
            {activeNavTabId === "2" && featureManagementData[2].displayName === ("TextTemplateManagement.Feature:TextManagementGroup") && (
              <>
                <div className="fw-medium my-3">
                  <RdsLabel label={(featureManagementData[2].displayName) || ""}></RdsLabel>
                </div>
                <div className="col-md-12">
                  <RdsCheckbox
                    labelText={(featureManagementData[2].features[0].displayName) || ''}
                    checked={payloads[5]?.value}
                    onChange={(e: any) => { handlerChanges(e.target.checked, featureManagementData[2].features[0].name) }}
                    dataTestId="text-template-management"
                  ></RdsCheckbox>
                </div>
                <small className="text-secondary-50">  {(featureManagementData[2].features[0].description) || ''}</small>
              </>
            )}
            {activeNavTabId === "3" && featureManagementData[3].displayName === ("FileManagement.Feature:FileManagementGroup") && (
              <>
                <div className="fw-medium my-3">
                  <RdsLabel label={(featureManagementData[3].displayName) || ""}></RdsLabel>
                </div>
                <div className="col-md-12">
                  <RdsCheckbox
                    labelText={(featureManagementData[3].features[0].displayName) || ''}
                    checked={payloads[6]?.value}
                    onChange={(e: any) => { handlerChanges(e.target.checked, featureManagementData[3].features[0].name) }}
                    dataTestId="text-template-management"
                  ></RdsCheckbox>
                </div>
                <small className="text-secondary-50"> {(featureManagementData[3].features[0].description) || ''} </small>
                <div className="col-xxl-4 col-xl-4 col-lg-8 col-12  mt-4 ">
                  <div className="form-group ">
                    <RdsInput
                      name="Text"
                      size={InputSize.Medium}   
                      label={(featureManagementData[3].features[1].displayName) || ''}
                      inputType="text"
                      isDisabled={false}
                      readonly={false}
                      placeholder="Enter Length"
                      value={payloads[7]?.value}
                      onChange={(e: any) => handlerChanges(e.target.value, featureManagementData[3].features[1].name)}
                      dataTestId="max-user-count"
                    ></RdsInput>
                  </div>
                </div>
                <small className="text-secondary-50">{(featureManagementData[3].features[1].description) || ''} </small>
              </>
            )}
            {activeNavTabId === "4" && featureManagementData[4].displayName === ("Forms.Feature:FormsGroup") && (
              <>
                <div className="fw-medium my-3">
                  <RdsLabel label={(featureManagementData[4].displayName) || ""}></RdsLabel>
                </div>
                <div className="col-md-12">
                  <RdsCheckbox
                    labelText={(featureManagementData[4].features[0].displayName) || ''}
                    checked={payloads[8]?.value}
                    onChange={(e: any) => { handlerChanges(e.target.checked, featureManagementData[4].features[0].name) }}
                    dataTestId="text-template-management"
                  ></RdsCheckbox>
                </div>
                <small className="text-secondary-50">{(featureManagementData[4].features[0].description) || ''}</small>
              </>
            )}
            {activeNavTabId === "5" && featureManagementData[5].displayName === ("Chat.Feature:ChatGroup") && (
              <>
                <div className="fw-medium my-3">
                  <RdsLabel label={(featureManagementData[5].displayName) || ""}></RdsLabel>
                </div>
                <div className="col-md-12">
                  <RdsCheckbox
                    labelText={(featureManagementData[5].features[0].displayName) || ''}
                    checked={payloads[9]?.value}
                    onChange={(e: any) => { handlerChanges(e.target.checked, featureManagementData[5].features[0].name) }}
                    dataTestId="text-template-management"
                  ></RdsCheckbox>
                </div>
                <small className="text-secondary-50"> {(featureManagementData[5].features[0].description) || ''}</small>
              </>
            )}
            {activeNavTabId === "6" && (
              <>
                <div className="fw-medium my-3">
                  <RdsLabel label={(featureManagementData[6].displayName) || ""}></RdsLabel>
                </div>
                {featureManagementData[6].features.map((item: any, index: any,) =>
                (
                  <div className="col-md-12 mb-3" key={index}>
                    <RdsCheckbox
                      labelText={(item.displayName) || ''}
                      checked={payloads[10 + index]?.value}
                      onChange={(e: any) => { handlerChanges(e.target.checked, item.name) }}
                      dataTestId="text-template-management"
                    ></RdsCheckbox>
                    <small className="text-secondary-50"> {(item.description) || ''}</small>
                  </div>
                ))}
              </>
            )}
            {activeNavTabId === "7" && featureManagementData[7].displayName === ("CmsKit.Feature:CmsKitProGroup") && (
              <>
                <div className="fw-medium my-3">
                  <RdsLabel label="CmsKit.Feature:CmsKitProGroup"></RdsLabel>
                </div>
                {featureManagementData[7].features.map((item: any, index: any) =>
                (
                  <div className="col-md-12" key={index}>
                    <RdsCheckbox
                      labelText={(item.displayName) || ''}
                      checked={payloads[18 + index]?.value}
                      onChange={(e: any) => { handlerChanges(e.target.checked, item.name) }}
                      dataTestId="text-template-management"
                    ></RdsCheckbox>
                    <small className="text-secondary-50"> {(item.description) || ''}</small>
                  </div>
                ))}
              </>
            )}
            {activeNavTabId === "8" && (
              <>
                <div className="fw-medium my-3">
                  <RdsLabel label={(featureManagementData[8].displayName) || ""}></RdsLabel>
                </div>
                <div className="col-md-12">
                  <RdsCheckbox
                    labelText={(featureManagementData[8].features[0].displayName) || ''}
                    checked={payloads[22]?.value}
                    onChange={(e: any) => { handlerChanges(e.target.checked, featureManagementData[8].features[0].name) }}
                    dataTestId="audit-logging"
                  ></RdsCheckbox>
                </div>
                <small className="text-secondary-50">{(featureManagementData[8].features[0].description) || ''}</small>
              </>
            )}
          </div>
        </div >
        <div className="row mt-5">
          <div className="footer-buttons pb-3 bg-transparent d-flex flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row mb-xxl-0 mb-xl-0 mb-lg-0 mb-md-0 mb-3">
            <RdsButton
              label="Save"
              type="submit"
              size="small"
              class="ms-2"
              colorVariant="primary"
            ></RdsButton>
          </div>
        </div>
      </form >
    </>
  );
};

export default RdsCompFeatureManagement;