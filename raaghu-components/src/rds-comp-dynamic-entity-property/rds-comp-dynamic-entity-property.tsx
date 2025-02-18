import React, { useEffect, useState } from "react";
import { RdsDropdownList, RdsButton } from "../rds-elements";

export interface RdsCompDynamicEntityPropertyProp {
  entityNames?: any;
  reset?: boolean;
  parameterList: any[];
  onSelectedItems?: (selectedItems: any) => void;

  offcanvasId?: string;
  entityFields?: any;
}
const RdsCompDynamicEntityProperty = (
  props: RdsCompDynamicEntityPropertyProp
) => {
  const [entityData, setEntityData] = useState(props.entityFields);

  const [isReset, setIsReset] = useState(false);

  useEffect(() => {
    setEntityData(props.entityFields);
  }, [props.entityFields]);

  const handleEntityChange = (event: any, val: string) => { 
  
    setEntityData({ ...entityData, val });
  };

  const  parameterChange = (event: any, val: string) => {
    setEntityData({ ...entityData, [val]: event });
  }

  const isFormValid =
  entityData?.entity != "" && entityData?.parameter?.length != 0;

  function emitSaveData(event: any) {
    event.preventDefault();
    props.onSelectedItems && props.onSelectedItems(entityData);
    setEntityData({
      entity: "",
      parameter: ""
    });
    setIsReset(!isReset);
  }
  return (
    <>
      <form>
        <div className="custom-content-scroll">
          <div className="tab-content px-2 navsm-p-0">
            <div className="form-group mb-3">
              <label className="mt-2">Entity</label>
              <RdsDropdownList
                placeholder="Select Entity"
                isPlaceholder={true}
                reset={isReset}
                listItems={props.entityNames}
                onClick = {handleEntityChange}
               selectedItems={entityData?.entityNames}
                borderDropdown={true}
              />
            </div>
            <div className="form-group mb-3">
              <label className="mt-2">Parameter</label>
              <RdsDropdownList
                placeholder="Select Parameter"
                borderDropdown={true}
                multiSelect={true}
                reset={isReset}
                listItems={props.parameterList}
                selectedItems={(e: any) => parameterChange(e, "parameterList")}
              />
            </div>
          </div>
        </div>
        <div className="d-flex ms-3 flex-column-reverse flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3 p-3">
          <RdsButton
            label="Cancel"
            colorVariant="primary"          
            tooltipTitle={""}
            type="button"
            size="small"
            isOutline={true}
            databstoggle="offcanvas"
            databstarget={`#${props.offcanvasId}`}
            ariacontrols={props.offcanvasId}
          />
          <RdsButton
            label="Save"
            colorVariant="primary"
            isDisabled={!isFormValid}           
            tooltipTitle={""}
            type="submit"
            onClick={(e: any) => emitSaveData(e)}
            size="small"
            databstoggle="offcanvas"
            databstarget={`#${props.offcanvasId}`}
            ariacontrols={props.offcanvasId}
            dataTestId="save"
          />
        </div>
      </form>
    </>
  );
};
export default RdsCompDynamicEntityProperty;
