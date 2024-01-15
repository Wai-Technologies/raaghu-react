import React, { useEffect, useState } from 'react';
import { RdsButton, RdsCheckbox, RdsInput, RdsLabel, RdsRadioButton, RdsSelectList } from '../rds-elements';
import { useTranslation } from "react-i18next";

interface RdsCompDeveloperModeProps {
   applicationUrl?: any;
   reset?: boolean;
   modeData?: any;
   onModeDataSubmit?: any;
   environment?: string;
   apiUrl?: string;
   grantType?: string;
   clientId?: string;
   scope?: string;
   appUrl?: string;
   replaceUrl?: boolean;
   selectedValue?: Array<{ option: string; value: string; }>;

}

const RdsCompDeveloperMode = (props: RdsCompDeveloperModeProps) => {
   const { t } = useTranslation();
   const [applicationUrl, setApplicationUrl] = useState<any>();
   const [modeData, setModeData] = useState(props.modeData);
   const [inputReset, setInputReset] = useState(false);
   const [radioItemList, setRadioItemList] = useState<any>(false);

   // Set values in localStorage Environment
   localStorage.setItem("NODE_ENV", process.env.NODE_ENV || "");
   localStorage.setItem("REACT_APP_REPLACE_URL", process.env.REACT_APP_REPLACE_URL || "");
   localStorage.setItem("REACT_APP_VERSION", process.env.REACT_APP_VERSION || "");
   // Retrieve values from localStorage
   const apiURL = localStorage.getItem("REACT_APP_API_URL");
   const grantType = localStorage.getItem("REACT_APP_GRANT_TYPE");
   const clientId = localStorage.getItem("REACT_APP_CLIENT_ID");
   const scope = localStorage.getItem("REACT_APP_SCOPE");
   const appUrl = localStorage.getItem("REACT_APP_URL");
   const env = localStorage.getItem("NODE_ENV");
   const replaceUrl = localStorage.getItem("REACT_APP_REPLACE_URL");
   const sideNav = localStorage.getItem("isMenuCollapse");

   // useEffect(() => {
   //    let radioItems;

   //    if (!props.applicationUrl?.default) {
   //       radioItems = [{
   //          id: 1,
   //          label: t("Local Host"),
   //          checked: true,
   //          name: "radio_button",
   //       },
   //       {
   //          id: 2,
   //          label: t("Staging"),
   //          checked: false,
   //          name: "radio_button",
   //       },
   //       ]
   //    }
   //    else {
   //       radioItems = [
   //          {
   //             id: 1,
   //             label: t("Local Host"),
   //             checked: false,
   //             name: "radio_button",
   //          },
   //          {
   //             id: 2,
   //             label: t("Staging"),
   //             checked: true,
   //             name: "radio_button",
   //          },
   //       ]
   //    }
   //    setRadioItemList(radioItems);
   // }, [props.applicationUrl?.default]);

   useEffect(() => {
      setInputReset(!inputReset);
   }, [props.reset]);

   const radioItemsApp = [{
      id: 1,
      label: t("Local Host"),
      checked: true,
      name: "radio_buttona",
   },
   // {
   //    id: 2,
   //    label: t("Staging"),
   //    checked: false,
   //    name: "radio_buttona",
   // },
   ]

   const replaceItems = [
      {
         id: 1,
         label: t("True"),
         checked: true,
         name: "radio_button",
      },
      {
         id: 2,
         label: t("False"),
         checked: false,
         name: "radio_button",
      },
   ];

   const grantTypeList = [
      {
         option: 'Authorization Code',
         value: 'authorization-code'
      },
      {
         option: 'Hybrid',
         value: 'hybrid'
      },
      {
         option: 'implicit',
         value: 'implicit'
      },
      {
         option: 'Password',
         value: 'password'
      }
   ];

   const handleRadioClick = (event: any) => {
      console.log("Value", event.target.id);
  
      const items = {
         id:  event.target.id,
         label:  event.target.value,
         checked:  event.target.checked,
         name:  event.target.name,
      };
      console.log("Items:", items);
   
      if (items.id === "2") {
         console.log("Setting radioItemList to true");
         setRadioItemList(radioItemList);
         // localStorage.setItem("REACT_APP_URL", "https://staging.rdsconnect.com")
      } else {
         console.log("Setting radioItemList to false");
         setRadioItemList(radioItemList);
      }
   }
   useEffect(() => {
      debugger
      setModeData((prevModeData: any) => ({
         ...prevModeData,
         environment: env || '',
         apiUrl: apiURL || '',
         grantType: grantType || 'Authorization Code',
         clientId: clientId || '',
         scope: scope || '',
         appUrl: appUrl || '',
         replaceUrl: replaceUrl || true,
         sideNav: sideNav || false,
      }));
   }, [props.modeData]);

   const onModeDataSubmit = (event: any) => {
      event.preventDefault();
      props.onModeDataSubmit(modeData);
   };

   const onSubmitModeData = (value: string, fieldName: string) => {
      setModeData((prevModeData: any) => ({
         ...prevModeData,
         [fieldName]: value,
      }));
   };
   const resetToDefault = () => {
      setModeData({
         environment: env || '',
         apiUrl: apiURL || '',
         grantType: grantType || '',
         clientId: clientId || '',
         scope: scope || '',
         appUrl: appUrl || '',
         replaceUrl: replaceUrl || true,
         sideNav: sideNav || false,
      });
   };

   return (
      <>
         <div className="overflow-x-hidden overflow-y-auto">
            <form onSubmit={onModeDataSubmit}>
               <div className='mb-3 fw-medium'>
                  <RdsLabel label={t("Configuration  ") || ""}></RdsLabel>
               </div>
               <div className="row pb-2">
                  <div className="col-md-6 col-12 col-lg-12 col-xl-12 col-xxl-12">
                     <div className="form-group">
                        <RdsInput
                           value={modeData?.environment}
                           name="environment"
                           label={t("Environment") || ""}
                           placeholder={t("Enter Environment") || ""}
                           customClasses="form-control"
                           onChange={(e: any) => onSubmitModeData(e.target.value, "environment")}
                           dataTestId="env"
                           required
                        ></RdsInput>
                     </div>
                  </div>
               </div>
               <div className='row pb-2'>
                  <div className="col-md-6 col-12 col-lg-12 col-xl-12 col-xxl-12">
                     <RdsLabel
                        label={t("Application URL") || ""}
                        required={true}
                     />
                     <div className="form-group mt-2">
                        <RdsRadioButton
                           displayType="Horizontal"
                           label=""
                           itemList={radioItemsApp}
                           onClick={handleRadioClick}
                        ></RdsRadioButton>
                     </div>

                     {radioItemList == true &&
                        (
                           <div>
                              <div className="form-group">
                                 <RdsInput
                                    value={modeData?.appUrl}
                                    name="app-url"
                                    label={t("") || ""}
                                    placeholder={t("Enter Application URL") || ""}
                                    customClasses="form-control"
                                    onChange={(e) => onSubmitModeData(e.target.value, "appUrl")}
                                    dataTestId="data"
                                 />
                              </div>
                           </div>
                        )
                     }


                  </div>
               </div>
               <div className="row pb-2">
                  <div className="col-md-6 col-12 col-lg-12 col-xl-12 col-xxl-12">
                     <div className="form-group">
                        <RdsInput
                           value={modeData?.apiUrl}
                           name="app-url"
                           label={t("Application API URL") || ""}
                           placeholder={t("Enter Application API URL") || ""}
                           customClasses="form-control"
                           onChange={(e: any) => onSubmitModeData(e.target.value, "apiUrl")}
                           dataTestId="applicationUrl"
                           required
                        ></RdsInput>
                     </div>
                  </div>
               </div>
               <div className="row pb-2">
                  <div className="col-md-6 col-12 col-lg-12 col-xl-12 col-xxl-12">
                     <div className="form-group mb-3">
                        <RdsSelectList
                           id={"grantType"}
                           label={t("Application Grant Type") || ""}
                           placeholder={t("Select Application Grant Type") || ""}
                           selectItems={grantTypeList}
                           isSearchable={false}
                           required={true}
                           selectedValue={grantTypeList[0]?.value}
                           onChange={(e: any) => onSubmitModeData(e.target.value, "grantType")}
                        ></RdsSelectList>
                     </div>
                  </div>
               </div>
               <div className="row pb-2">
                  <div className="col-md-6 col-12 col-lg-12 col-xl-12 col-xxl-12">
                     <div className="form-group">
                        <RdsInput
                           value={modeData?.clientId}
                           name="app-client"
                           label={t("Application Client ID") || ""}
                           placeholder={t("EnterApplication Client ID") || ""}
                           customClasses="form-control"
                           onChange={(e: any) => onSubmitModeData(e.target.value, "clientId")}
                           dataTestId="applicationClient"
                           required
                        ></RdsInput>
                     </div>
                  </div>
               </div>
               <div className="row pb-2">
                  <div className="col-md-6 col-12 col-lg-12 col-xl-12 col-xxl-12">
                     <div className="form-group">
                        <RdsInput
                           value={modeData?.scope}
                           name="app-scope"
                           label={t("Application Scope") || ""}
                           placeholder={t("Enter Application Scope") || ""}
                           customClasses="form-control"
                           onChange={(e: any) => onSubmitModeData(e.target.value, "scope")}
                           dataTestId="applicationScope"
                           required
                        ></RdsInput>
                     </div>
                  </div>
               </div>
               <div className='row pb-2'>
                  <div className="col-md-6 col-12 col-lg-12 col-xl-12 col-xxl-12 mb-2">
                     <RdsLabel
                        label={t("Application Replace URL") || ""}
                        required={true}
                     />
                     <div className="form-group mt-2">
                        <RdsRadioButton
                           displayType="Horizontal"
                           label=""
                           itemList={replaceItems}
                        ></RdsRadioButton>
                     </div>
                  </div>
               </div>
               <div className='row'>
                  <div className='mb-3 fw-medium'>
                     <RdsLabel label={t("Settings  ") || ""}></RdsLabel>
                  </div>
                  <div className="col-md-12 mb-3">
                     <RdsCheckbox
                        label={t("Disable Collapsible Side Menu") || ""}
                        checked={modeData?.sideNav}
                        onChange={(e: any) => onSubmitModeData(e.target.checked, "sideNav")}
                        dataTestId="sideMenu" isDisabled></RdsCheckbox>
                  </div>
                  <div className="col-md-12 mb-3">
                     <RdsCheckbox
                        label={t("Enable Static Icons") || ""}
                        checked={modeData?.staticIcons}
                        onChange={(e: any) => onSubmitModeData(e.target.checked, "staticIcons")}
                        dataTestId="staticIcons" isDisabled ></RdsCheckbox>
                  </div>
               </div>
               <div className="mt-xxl-4 mb-xxl-0 mb-xl-0 mb-lg-0 mb-md-0 pb-4 fixed-bottem d-flex flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row footer-buttons mt-xl-4 mt-lg-4 mt-md-4 mt-0 pt-2 col-xxl-4 col-xl-4 col-lg-6 col-12 position-absolute">
                  <div className="me-3">
                     <a className="me-2 btn btn-transparent fw-bold position-relative align-items-center btn-sm text-primary" onClick={resetToDefault}>{t("RESTORE TO DEFAULT")}</a>

                  </div>
                  <div className="me-2 mb-2">
                     <RdsButton
                        type="submit"
                        colorVariant="primary"
                        label={t("Apply") || ""}
                        size="small"
                        dataTestId="submit"
                        onClick={() => { props.onModeDataSubmit(modeData); }}
                     ></RdsButton>
                  </div>
               </div>
            </form>
         </div>
      </>
   );
};

export default RdsCompDeveloperMode;


