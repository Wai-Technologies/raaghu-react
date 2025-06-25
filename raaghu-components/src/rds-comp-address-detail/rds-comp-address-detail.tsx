import React, { Fragment, ReactNode } from "react";
import RdsCompIcon from "../rds-comp-icon";

export interface RdsCompAddressDetailProps {
	children: ReactNode;
	withIcon?: boolean;
	header?: string;
	addressLine1?: string;
	addressLine2?: string;
	addressLine3?: string;
	cardborder?: boolean;
}

const RdsCompAddressDetail = (props: RdsCompAddressDetailProps) => {
    return (
        <Fragment>
            {!props.withIcon && (
                <div data-testid="address-detail" className={props.cardborder ? "card" : ""}>
                    <div className=" gap-2 p-4 word_wrap">
                        <p className="address-header fw-semibold hr mb-0">{props.header}</p>
                        <div className="address-body mt-0 mb-1">
                            <div className="mb-0">
                                {props.addressLine1}
                                {props.addressLine2 && ","}
                            </div>
                            <div className="mb-0">
                                {props.addressLine2}
                                {props.addressLine3 && ","}
                            </div>
                            <div className="mb-0">{props.addressLine3}</div>
                            {props.children}
                        </div>
                    </div>
                </div>
            )}
            {props.withIcon && (
                <div data-testid="address-detail" className={props.cardborder ? "card" : ""}>
                    <div className="d-flex gap-2 p-4 word_wrap">
                        <div className="block">
                            <RdsCompIcon
                                name="location"
                                colorVariant="primary"
                                height="20px"
                                width="20px"
                                fill={false}
                                stroke={true}
                            ></RdsCompIcon>
                        </div>
                        <div>
                            <p className="address-header fw-semibold hr mb-0">
                                {props.header}
                            </p>
                            <div className="address-body mt-0 mb-1">
                                <div className="mb-0">
                                    {props.addressLine1}
                                    {props.addressLine2 && ","}
                                </div>
                                <div className="mb-0">
                                    {props.addressLine2}
                                    {props.addressLine3 && ","}
                                </div>
                                <div className="mb-0">{props.addressLine3}</div>
                                {props.children}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    );
};

export default RdsCompAddressDetail;
