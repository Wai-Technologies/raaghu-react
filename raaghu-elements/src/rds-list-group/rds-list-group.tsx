import React from "react";
import RdsLabel from "../rds-label";
import RdsBage from "../rds-badge";
import "./rds-list-group.css";

export interface RdsListGroupProps {
    labelPosition?: string;
    label?: string;
    listItem: any[];
    listGroupWithMultiSelect?: boolean;
    withBadge?: boolean;
}

const RdsListGroup = (props: RdsListGroupProps) => {
    return (
        <>
            {props.labelPosition == "top" && (
                <RdsLabel label={props.label} class="mx-1"></RdsLabel>
            )}
            {!props.listGroupWithMultiSelect && (
                <ul className="list-group mb-1 mt-1" >
                    {props.listItem.map((listItems) => (
                        <>
                            <li
                                className={`list-group-item form-check ${listItems.disabled ? "disabled" : ""
                                    }  d-flex justify-content-between align-items-center mb-0`}
                            >
                                {listItems.label}
                                {props.withBadge && (
                                    <RdsBage label={listItems.badgeLabel} colorVariant='primary' />
                                )}
                            </li>
                        </>
                    ))}
                </ul>
            )}
            {props.listGroupWithMultiSelect && (
                <ul className="list-group mb-1 mt-1">
                    {props.listItem.map((listItems, index) => (
                        <>
                            <li
                                className={`list-group-item form-check ${listItems.disabled ? "disabled" : ""
                                    }   justify-content-between align-items-center mb-0`}
                            >
                                <input
                                    className="form-check-input ms-1 me-2 mb-0"
                                    type="checkbox"
                                    value=""
                                    id={`flexCheckDefault${index}`}
                                />
                                <div
                                    className="d-flex justify-content-between mb-0"
                                >
                                    <label
                                        className="form-check-label"
                                        htmlFor={`flexCheckDefault${index}`}
                                    >
                                        {listItems.label}
                                    </label>
                                    {props.withBadge && (
                                        <RdsBage label={listItems.badgeLabel} colorVariant='primary' />
                                    )}
                                </div>
                            </li>
                        </>
                    ))}
                </ul>
            )}
            {props.labelPosition == "bottom" && (
                <RdsLabel label={props.label} class="mx-1"></RdsLabel>
            )}
        </>
    );
};

export default RdsListGroup;
