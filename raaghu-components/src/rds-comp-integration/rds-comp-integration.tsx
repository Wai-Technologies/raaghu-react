import React from "react";
import { RdsAppDetail, RdsButton, RdsSpinner } from "../rds-elements";
import { useTranslation } from "react-i18next";
import './rds-comp-integration.css'
export interface RdsCompIntegrationProps {
    integrationList: any[];
}

const RdsCompIntegration = (props: RdsCompIntegrationProps) => {

    return (
        <>
            <div>
                <div className="row">
                    {props.integrationList.map((item: any, index: number) => (
                        <div className="mb-3 col-md-4 " key={index}>
                            <RdsAppDetail appDetailsItem={item} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};
export default RdsCompIntegration;
