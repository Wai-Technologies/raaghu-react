import React, { useState } from "react";
import { RdsDropdownList, RdsButton } from "../rds-elements";

export interface RdsCompDynamicEntityPropertyProp {
    entityNames: any[];
    reset?: boolean;
    parameterList: any[];
    onSelectedItems(selectedItems: any): any;
    initialSelectedItems?: {
        entity: string,
        parameter: any
    }
    offcanvasId?: string;
}

const RdsCompDynamicEntityProperty = (
    props: RdsCompDynamicEntityPropertyProp
) => {
    const [entityProps, setEntityProps] = useState({
        entity: props.initialSelectedItems?.entity || "",
        parameter: props.initialSelectedItems?.parameter || [],
    });
    const [isReset, setIsReset] = useState(false);

    const onSelectEntityValue = (e: any) => {
        setEntityProps({ ...entityProps, entity: e.target.innerText });
    };

    const onselectParameter = (selectedItems: any) => {
        setEntityProps({ ...entityProps, parameter: selectedItems });
    };
    const isFormValid =
        entityProps.entity != "" && entityProps.parameter.length != 0;

    const submitHandler = (event: any) => {
        event.preventDefault();
        props.onSelectedItems != undefined && props.onSelectedItems(entityProps);
        setIsReset(!isReset);
        setEntityProps({ entity: "", parameter: [] });

    };

    return (
        <>
            <form
                onSubmit={submitHandler}
            >
                <div className="tab-content px-2 navsm-p-0">
                    <div className="form-group mb-3">
                        <label className="mb-2">Entity</label>
                        <RdsDropdownList
                            placeholder="Filter"
                            multiSelect={false}
                            reset={isReset}
                            listItems={props.entityNames}
                            onClick={onSelectEntityValue}
                        />

                        <div className="form-group mb-3">
                            <div className="mb-2 mt-4">
                                <label className="mb-2">Parameter</label>
                                <RdsDropdownList
                                    placeholder="Filter"

                                    multiSelect={true}
                                    reset={isReset}
                                    listItems={props.parameterList}
                                    selectedItems={onselectParameter}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="footer-buttons pb-3 d-flex gap-2 flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row">
                        <RdsButton
                            label="Cancel"
                            colorVariant="primary"
                            block={true}
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
                            block={true}
                            tooltipTitle={""}
                            type="submit"
                            size="small"
                            databstoggle="offcanvas"
                            databstarget={`#${props.offcanvasId}`}
                            ariacontrols={props.offcanvasId}
                            dataTestId="save"
                        />
                    </div>
                </div>
            </form>
        </>
    );
};
export default RdsCompDynamicEntityProperty;
