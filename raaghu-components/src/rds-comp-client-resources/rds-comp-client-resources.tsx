import React from "react";
import RdsCompApiScopeResource from "../rds-comp-api-scope-resource";
import { RdsButton } from "../rds-elements";

export interface RdsCompClientResourceProp {
    resources: any[];
    role?: "basic" | "advanced"
}

const RdsCompClientResource = (props: RdsCompClientResourceProp) => {

    return (
        <div>
            {props.role == "basic" ? <>
                <RdsCompApiScopeResource role="basic" resources={props.resources} />
                <div className="mt-3 d-flex pb-3 flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row footer-buttons gap-2">
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
                            isDisabled={false}
                            dataTestId="save"
                        ></RdsButton>
                    </div>
            </>
                :
                <RdsCompApiScopeResource  resources={props.resources} role={"basic"} />}
        </div>

    );
};
export default RdsCompClientResource;
