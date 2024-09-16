import React, { useState } from "react";
import { RdsButton, RdsDatePicker } from "../rds-elements";
import { useTranslation } from "react-i18next";

export interface RdsUserDelegationsProps {
    onSubmit: (data: any) => void;
    selectuser: any[];
}

const RdsUserDelegations = (props: RdsUserDelegationsProps) => {
    const [userData, setUserData] = useState({
        username: "",
        startdate: "",
        enddate: "",
    });
    const [page, setPage] = useState(false);
    const onClickHandler = () => {
        setPage((prev) => !prev);
    }; 
    
    const DatePicker = (dates : any) => {
        const [start, end] = dates;
        setUserData({ ...userData, startdate: start, enddate: end });
    };

    const selecthandler = (e: any) => {
        setUserData({ ...userData, username: e.target.value });
    };
    const { t } = useTranslation(); 
    return (
        <>
            {!page && (
                <RdsButton
                    type="button"
                    icon="plus"
                    iconFill={false}
                    iconHeight="12px"
                    iconStroke={true}
                    iconWidth="12px"
                    colorVariant="primary"
                    label="Delegate New User"
                    size="small"
                    iconColorVariant="light"
                    onClick={onClickHandler}
                ></RdsButton>
            )}
            {page && (
                <div>
                    <div>
                        <div className="mb-2">
                            <div>
                            {props.selectuser && (
                                <select
                                    onClick={selecthandler}
                                    defaultValue={"DEFAULT"}
                                    className="form-select form-select-md"
                                >
                                    <option disabled value="DEFAULT">
                                        Select a User
                                    </option>
                                    {props.selectuser.map((x, i) => (
                                        <option key={x.id}>{x.name}</option>
                                    ))}
                                </select>
                            )}
                            </div>
                        </div>
                        <div className="custom-content-scroll">
                            <RdsDatePicker
                                type="advanced"
                                DatePickerLabel={"Select Date Range"}
                                onDatePicker={DatePicker}
                                isDropdownOpen={false}
                            ></RdsDatePicker>
                        </div>
                        <div
                        className="d-flex flex-column-reverse ps-4 flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3">
                          <RdsButton
                                type="button"
                                isOutline={true}
                                colorVariant="primary"
                                label="Cancel"
                                size="small"
                                onClick={onClickHandler}
                            ></RdsButton>
                        <div className="d-flex flex-column-reverse">
                            <RdsButton
                                type="submit"
                                isOutline={false}
                                colorVariant="primary"
                                label="Save"
                                size="small"
                                onClick={() => props.onSubmit(userData)}
                            ></RdsButton>
                        </div>
                    </div>
                    </div>
                    
                </div>
            )}
        </>
    );
};

export default RdsUserDelegations;
