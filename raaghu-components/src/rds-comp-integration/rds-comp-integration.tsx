import React from "react";
import { RdsAppDetail, RdsButton, RdsSpinner } from "../rds-elements";
import { useTranslation } from "react-i18next";

export interface RdsCompIntegrationProps {
    integrationList: any[];
}

const RdsCompIntegration = (props: RdsCompIntegrationProps) => {

    return (
        <>
            <div>
                <div className="row">
                    {props.integrationList.map((item: any, index: number) => (
                        <div className="mb-3 col-4 " key={index}>
                            <RdsAppDetail appDetailsItem={item} />
                        </div>
                    ))}
                </div>
                <hr />
                <div className="m-3 d-flex justify-content-end">
                    <div className="col-2 me-3">
                        <RdsButton
                            label="Cancel"
                            colorVariant="primary"
                            block={true}
                            tooltipTitle={""}
                            type="button"
                            isOutline={true}
                        />
                    </div>
                    <div className="col-2">
                        <RdsButton
                            label="Save"
                            colorVariant="primary"
                            isDisabled={false}
                            block={true}
                            tooltipTitle={""}
                            type="submit"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};
export default RdsCompIntegration;
