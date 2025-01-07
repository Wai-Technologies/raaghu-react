import React from "react";
import RdsCompApiScopeResource from "../rds-comp-api-scope-resource";
import { RdsButton } from "../rds-elements";

export interface RdsCompClientResourceProp {
    resources: any[];
    role?: "basic" | "advanced"
}

const RdsCompClientResource = (props: RdsCompClientResourceProp) => {

    return (
        <div className="custom-content-scroll">
            {props.role == "basic" ? <>
                <RdsCompApiScopeResource
                    role="basic"
                    resources={props.resources}
                />
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
                        isDisabled={false}
                        dataTestId="save"
                    ></RdsButton>
                </div>
            </>
                :
                <RdsCompApiScopeResource resources={props.resources} role={"basic"} />}
        </div>

    );
};
export default RdsCompClientResource;
