import React from "react";
import RdsCompApiScopeResource from "../rds-comp-api-scope-resource";
import { RdsButton } from "../rds-elements";
import { useTranslation } from "react-i18next";

export interface RdsCompClientResourceProp {
    resources: any[];
    role?: "basic" | "advanced"
}

const RdsCompClientResource = (props: RdsCompClientResourceProp) => {
    const { t } = useTranslation();

    return (
        <div>
            {props.role == "basic" ? <>
                <RdsCompApiScopeResource role="basic" resources={props.resources} />
                <div className="row mt-5 mb-3">
                    <div className="col-2">
                        <RdsButton
                            label={t("Cancel") || ""}
                            colorVariant="primary"
                            block={true}
                            tooltipTitle={""}
                            type="submit"
                            isOutline={true}
                        />
                    </div>
                    <div className="col-2">
                        <RdsButton
                            label={t("Save") || ""}
                            colorVariant="primary"
                            block={true}
                            tooltipTitle={""}
                            type="submit"
                        />
                    </div>
                </div>
            </>
                :
                <RdsCompApiScopeResource role="advanced" resources={props.resources} />}
        </div>

    );
};
export default RdsCompClientResource;
