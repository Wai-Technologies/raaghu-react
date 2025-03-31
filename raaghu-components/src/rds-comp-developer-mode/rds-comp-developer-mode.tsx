import React, { useEffect, useState } from 'react';
import { RdsButton, RdsCheckbox, RdsInput, RdsLabel, RdsRadioButton, RdsSelectList } from '../rds-elements';

interface RdsCompDeveloperModeProps {

   reset?: boolean;
   modeData?: any;
   onModeDataSubmit?: any;
   environment?: string;
   apiUrl?: string;
   grantType: { option: any, value: any }[];
   clientId?: string;
   scope?: string;
   appUrl?: string;
   replaceUrl?: boolean;
   selectedValue?: Array<{ option: string; value: string; }>;
   //grantTypeList?: any;

}

const RdsCompDeveloperMode = (props: RdsCompDeveloperModeProps) => {

   const [modeData, setModeData] = useState({
      environment: '',
      apiUrl: '',
      grantType: '',
      clientId: '',
      scope: '',
      appUrl: '',
      replaceUrl: '',
      sideNav: '',
      staticIcons: '',
   });
   const [inputReset, setInputReset] = useState(false);
   const [radioItemList, setRadioItemList] = useState<any>(false);

   // Set values in localStorage Environment
   // localStorage.setItem("NODE_ENV", process?.env.NODE_ENV || "");
   // localStorage.setItem("REACT_APP_REPLACE_URL", process?.env.REACT_APP_REPLACE_URL || "");
   // localStorage.setItem("REACT_APP_VERSION", process?.env.REACT_APP_VERSION || "");
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

   const [radioItemsApp, setRadioItemsApp] = useState([
      {
         id:1,
         label: "Local Host",
         checked: false,
         name: "radio_buttona",
      },

      // {
      //    id:4,
      //    label: "Staging",
      //    checked: false,
      //    value: "Staging",
      //    name: "radio_buttona",
      // },
   ]);

   const [replaceItems, setReplaceItems] = useState([
      {
         id: 1,
         label: "True",
         checked: false,
         name: "radio_button",
      },
      {
         id: 2,
         label: "False",
         checked: false,
         name: "radio_button",
      },
   ]);
//    const handleRadioClick = (event: any) => {
//       console.log("event",event.target)
//       const items = {
//          id: Number(event.target.id),
//          label: event.target.value,
//          checked: event.target.checked,
//          name: event.target.name,
//       };
     
//       const updatedReplaceItems = replaceItems.map(item =>
//          item.id === items.id ? { ...item, checked: true } : { ...item, checked: false }
//       );
// const updatedRadioItemsApp = radioItemsApp.map(item =>
//          item.id === items.id ? { ...item, checked: true } : { ...item, checked: false }
//       );
//       setRadioItemsApp(updatedRadioItemsApp);
//       setReplaceItems(updatedReplaceItems);

//       if (items.id === 2) {
//          localStorage.setItem("REACT_APP_URL", "https://staging.rdsconnect.com");
//       }
//    };
   const handleRadioClickApp = (event: any) => {
      const items = {
                  id: Number(event.target.id),
                  label: event.target.value,
                  checked: event.target.checked,
                  name: event.target.name,
               };
      const updatedItems = radioItemsApp.map(item =>
          item.id === Number(event.target.id)
              ? { ...item, checked: true }
              : { ...item, checked: false }
      );
      setRadioItemsApp(updatedItems);
     
  };

  const handleRadioClickReplace = (event: any) => {
   const items = {
      id: Number(event.target.id),
      label: event.target.value,
      checked: event.target.checked,
      name: event.target.name,
   };
      const updatedItems = replaceItems.map(item =>
          item.id === Number(event.target.id)
              ? { ...item, checked: true }
              : { ...item, checked: false }
      );
      setReplaceItems(updatedItems);
      if (items.id === 2) {
         localStorage.setItem("REACT_APP_URL", "https://staging.rdsconnect.com");
      }
  };
   const [errors, setErrors] = useState({
      apiUrl: "",
     
    });
  
   useEffect(() => {
      setModeData((prevModeData: any) => ({
         ...prevModeData,
         environment: env || '',
         apiUrl: apiURL || '',
         grantType: grantType || '',
         clientId: clientId || '',
         scope: scope || '',
         appUrl: appUrl || '',
         replaceUrl: replaceUrl || false,

      }));
   }, [props.modeData]);
   const emailRegex=/^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/

   const onSubmitModeData = (value: string, fieldName: string) => {
      setModeData((prevModeData: any) => ({
         ...prevModeData,
         [fieldName]: value
      }));
   };
   const resetToDefault = () => {
      setModeData({
         environment: '',
         apiUrl: '',
         grantType: '',
         clientId: '',
         scope: '',
         appUrl: '',
         replaceUrl: '',
         sideNav: '',
         staticIcons: '',
      });
   };
   const [touched, setTouched] = useState({
      apiUrl: false,
    });
   const emitSaveData = (event: any) => {
      event.preventDefault();
      props.onModeDataSubmit && props.onModeDataSubmit(modeData);
      setInputReset(!inputReset);
      setModeData((prevModeData) => ({
         ...prevModeData,
         environment: '',
         apiUrl: '',
         grantType: '',
         clientId: '',
         scope: '',
         appUrl: '',
         replaceUrl: '',
         sideNav: '',
         staticIcons: ''

      }));
      const resetRadioItemsApp = radioItemsApp.map(item => ({
         ...item,
         checked: false,
      }));
      setRadioItemsApp(resetRadioItemsApp);

      const resetReplaceItems = replaceItems.map(item => ({
         ...item,
         checked: false,
      }));
      setReplaceItems(resetReplaceItems);

     
   };
   const handleBlur = (key: string) => {
      setTouched({ ...touched, [key]: true });
    };
    const isEnvironmentValid = (environment: any) => {
      if (!environment || environment.length === 0) {
          return false;
      }
      return true;
  };
  const isApplicationApiUrlValid = (apiUrl: any) => {
   if (!apiUrl || apiUrl.length === 0 || !/^(ftp|http|https):\/\/[^ "]+$/.test(apiUrl)) {
       return false;
   }
   return true;
   };
   const isClientIdValid = (clientId: any) => {
      if (!clientId || clientId.length === 0) {
         return false;
      }
      return true;
   }
   const isScopeValid = (scope: any) => {
      if (!scope || scope.length === 0) {
         return false;
      }
      return true;
   }

   const isReplaceItemsValid = replaceItems.some(item => item.checked);

   const isRadioItemsAppValid = radioItemsApp.some(item => item.checked);
   const isGrantTypevalid = !!modeData.grantType && modeData.grantType?.length > 0;
   const isFormValid = isEnvironmentValid(modeData?.environment) && isApplicationApiUrlValid(modeData?.apiUrl) && isClientIdValid(modeData?.clientId) && isScopeValid(modeData?.scope) && isReplaceItemsValid && isRadioItemsAppValid && isGrantTypevalid   ; 

   return (
      <>
         <div className="overflow-x-hidden overflow-y-auto">
            <form>
               <div className="custom-content-scroll">
                  <div className='mb-3 fw-medium'>
                     <RdsLabel label="Configuration"></RdsLabel>
                  </div>
                  <div className="row pb-2">
                     <div className="col-md-6 col-12 col-lg-12 col-xl-12 col-xxl-12">
                        <div className="form-group">
                           <RdsInput
                              value={modeData?.environment}                           
                              name="Environment"
                              label={true}
                              reset={inputReset}
                              placeholder="Enter Environment"
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
                           label="Application URL"
                           required={true}
                        />
                        <div className="form-group mt-2">
                           <RdsRadioButton
                              displayType="Horizontal"
                              label=""
                              itemList={radioItemsApp}
                              onClick={handleRadioClickApp}
                              onChange={(e: any) => onSubmitModeData(e, "radioItemsApp")} 
                              value={''}
                             >
                             </RdsRadioButton>
                            
                        </div>

                        {radioItemList == true &&
                           (
                              <div>
                                 <div className="form-group">
                                    <RdsInput
                                       value={modeData?.appUrl}
                                       name="Application URL"                                      
                                       label={true}
                                       placeholder="Enter Application URL"
                                       customClasses="form-control"
                                       reset={inputReset}
                                       onChange={(e: any) => onSubmitModeData(e.target.value, "appUrl")}
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
                              name="Application API URL"
                              label={true}
                              placeholder="Enter Application API URL"
                              customClasses="form-control"
                              reset={inputReset}
                              onChange={(e: any) => onSubmitModeData(e.target.value, "apiUrl")}
                              dataTestId="applicationUrl"
                              validatonPattern={/^(ftp|http|https):\/\/[^ "]+$/}                              
                              validationMsg="Please Enter valid url (https or http)"
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
                           label="Application Grant Type"
                           placeholder="Select Application Grant Type"
                           selectItems={props.grantType}
                           isSearchable={true}
                           required={true}
                           selectedValue={modeData.grantType} 
                           key={`grantType-${modeData.grantType}`} 
                           onChange={(e: any) => onSubmitModeData(e.value, "grantType")}
                           color="primary"
                           ></RdsSelectList>
                        </div>
                     </div>
                  </div>
                  <div className="row pb-2">
                     <div className="col-md-6 col-12 col-lg-12 col-xl-12 col-xxl-12">
                        <div className="form-group">
                           <RdsInput
                              value={modeData?.clientId}                              
                              name="Application Client ID"
                              label={true}
                              reset={inputReset}
                              placeholder="Enter Application Client ID"
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
                              name="Application Scope"
                              label={true}
                              placeholder="Enter Application Scope"
                              customClasses="form-control"
                              reset={inputReset}
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
                           label="Application Replace URL"
                           required={true}
                        />
                        <div className="form-group mt-2">
                           <RdsRadioButton
                              displayType="Horizontal"
                              label=""
                              onClick={handleRadioClickReplace}
                              onChange={(e: any) => onSubmitModeData(e, "replaceItems")}
                              itemList={replaceItems} value={''}                           ></RdsRadioButton>
                        </div>
                     </div>
                  </div>
                  <div className='row'>
                     <div className='mb-3 fw-medium'>
                        <RdsLabel label="Settings "></RdsLabel>
                     </div>
                     <div className="col-md-12 mb-3">
                        <RdsCheckbox
                           labelText="Disable Collapsible Side Menu"
                           checked={modeData?.sideNav === 'true'}
                           onChange={(e: any) => onSubmitModeData(e.target.checked, "sideNav")}
                           dataTestId="sideMenu"></RdsCheckbox>
                     </div>
                     <div className="col-md-12 mb-3">
                        <RdsCheckbox
                           labelText="Enable Static Icons"
                           checked={modeData?.staticIcons === 'true'}
                           onChange={(e: any) => onSubmitModeData(e.target.checked, "staticIcons")}
                           dataTestId="staticIcons"></RdsCheckbox>
                     </div>
                  </div>
               </div>
            </form>
            <div className="mt-3 d-flex pb-3 ps-4 flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row footer-buttons gap-2 p-4">

               {/* <a className="me-2 btn btn-transparent fw-bold position-relative align-items-center btn-sm text-primary" onClick={resetToDefault}>RESTORE TO DEFAUT</a> */}
               <RdsButton
                  type="button"
                  label="RESTORE TO DEFAULT"
                  colorVariant="outline-primary"
                  size="small"
                  databsdismiss="offcanvas"
                  onClick={resetToDefault}
               ></RdsButton>
               <RdsButton
                  type="submit"
                  colorVariant="primary"
                  label="Apply"
                  size="small"
                  dataTestId="submit"
                  onClick={(e: any) => emitSaveData(e)}
                  isDisabled={!isFormValid }
               ></RdsButton>
            </div>
         </div>
      </>
   );
};

export default RdsCompDeveloperMode;


