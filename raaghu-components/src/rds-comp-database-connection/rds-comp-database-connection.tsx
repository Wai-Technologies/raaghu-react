import React, { useState, useEffect } from "react";
import { RdsCheckbox, RdsLabel } from "../rds-elements";

import {
   RdsButton,
   RdsRadioButton,
   RdsTextArea
} from "../rds-elements";
import { useTranslation } from "react-i18next";


interface RdsCompDatabaseConnectionProps {
   connectionStrings: any;
   reset?: boolean;
   onSaveHandler?: (data: any) => void
   isModuleSpecificDb: any;
}
const RdsCompDatabaseConnection = (props: RdsCompDatabaseConnectionProps) => {
   const { t } = useTranslation();
   const [connectionStrings, setConnectionStrings] = useState<any>(props.connectionStrings);
   const [inputReset, setInputReset] = useState(false);
   const [radioItemList, setRadioItemList] = useState<any>([]);
   const [isModuleSpecificDb, setCheck] = useState(props.isModuleSpecificDb);

   useEffect(() => {
      let radioItems;
      if (!props.connectionStrings?.default) {

         radioItems = [{
            id: 1,
            label: t("Shared Database"),
            checked: true,
            name: "radio_button",
         },
         {
            id: 2,
            label: t("Separated Database"),
            checked: false,
            name: "radio_button",
         },
         ]
      }
      else {
         radioItems = [
            {
               id: 1,
               label: t("Shared Database"),
               checked: false,
               name: "radio_button",
            },
            {
               id: 2,
               label: t("Separated Database"),
               checked: true,
               name: "radio_button",
            },
         ]
      }
      setRadioItemList(radioItems);
   }, [props.connectionStrings?.default])

   useEffect(() => {
      setInputReset(!inputReset);
   }, [props.reset]);

   const handleConnectionStrings = (event: any) => {
      const updatedRadioItems = radioItemList.map((item: any) => ({
         ...item,
         checked: item.id == event.target.id,
      }));
      setRadioItemList(updatedRadioItems);
      if (event.target.value !== "Separated Database") {
         setConnectionStrings({ ...connectionStrings, default: null });
      }
   }
   const checkboxHandler = (event: any) => {
      setCheck(event.target.checked);
  };

   const emitSaveData = (event: any) => {
      event.preventDefault();
      const selectedRadio = radioItemList.find((item: { checked: any; }) => item.checked);
      let payload = { ...connectionStrings };
      if (selectedRadio?.label === t("Shared Database")) {
         payload = { ...payload, sharedDatabase: true};
      } else if (selectedRadio?.label === t("Separated Database")) {
         payload = { ...payload, specificDatabase: true};
      }

      props.onSaveHandler && props.onSaveHandler(payload);
   }

   return (
      <div>
         <div className="tab-content">
            <form >
               <div className="row mb-3">
                  <div className="col-md-8">
                     <RdsLabel
                        label={t("Saas.ConnectionStrings") || ""}
                        required={true}
                     />
                     <div className="form-group mt-2">
                        <RdsRadioButton
                           displayType="Horizontal"
                           label=""
                           itemList={radioItemList}
                           onClick={handleConnectionStrings}
                        ></RdsRadioButton>
                     </div>
                  </div>
               </div>
               {radioItemList.length !== 0 && radioItemList[1].checked && (
                  <>
                     <div className="row">
                        <div className="col-md-12 mb-3">
                           <div className="form-group">
                              <RdsTextArea
                                 label={t("Database URL") || ""}
                                 placeholder={t("Enter URL") || ""}
                                 onChange={(e: any) => setConnectionStrings({ ...connectionStrings, default: e.target.value })}
                                 rows={2}
                                 value={connectionStrings?.default}
                                 dataTestId="data"
                              />
                           </div>
                        </div>
                     </div>
                     <div className="row">
                        <div className="col-md-12 mb-3">
                           <RdsCheckbox
                            label={t("Use Module Specific Database Connection String") || ""}
                            checked={isModuleSpecificDb}
                            onChange={checkboxHandler}
                           ></RdsCheckbox>                      
                        </div>
                     </div>
                  </>
               )}

               <div className="d-flex pb-3 flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row footer-buttons gap-2">
                  <RdsButton
                     class="me-2"
                     tooltipTitle={""}
                     type={"button"}
                     label={t("AbpUi.Cancel") || ""}
                     colorVariant="outline-primary"
                     size="small"
                     databsdismiss="offcanvas"
                  ></RdsButton>
                  <RdsButton
                     class="me-2"
                     label={t("AbpUi.Save") || ""}
                     size="small"
                     colorVariant="primary"
                     tooltipTitle={""}
                     type={"submit"}
                     databsdismiss="offcanvas"
                     onClick={(e: any) => emitSaveData(e)}
                  ></RdsButton>
               </div>
            </form>
         </div>
      </div>
   );
};

export default RdsCompDatabaseConnection;

