import React, { useEffect, useRef, useState } from "react";
import { RdsButton, RdsDropdownList, RdsInput } from "../rds-elements";

export interface RdsCompInformationProps {
    inputTypeList: any;
    informationItemInitial: any;
    reset?: boolean;
    informationItemHandler?: (data: any) => void;
}

const RdsCompInformation = (props: RdsCompInformationProps) => {
    const [userData, setUserData] = useState(props.informationItemInitial);
    const [inputReset, setInputReset] = useState(false);

    useEffect(() => {
        setUserData(props.informationItemInitial);
    }, [props.informationItemInitial]);

    useEffect(() => {
        setInputReset(!inputReset);
    }, [props.reset]);

    const handleDataChanges = (value: any, key: string) => {
        setUserData({ ...userData, [key]: value });
    };

    function emitSaveData(event: any) {
        event.preventDefault();
        setInputReset(!inputReset);
        props.informationItemHandler;
        setUserData({
            propertyname: "",
            displayname: "",
            inputtype: "",
        });
    }

    return (
        <>
            <div>
                <div className="row ">
                    <div className="col-6">
                        <RdsInput
                            label="Property Name"
                            required={true}
                            placeholder="Enter Property Name"
                            inputType="text"
                            onChange={(e) => {
                                handleDataChanges(e.target.value, "propertyname");
                            }}
                            value={userData?.propertyname}
                            name={"Property Name"}
                            dataTestId="property-name"
                            reset={inputReset}
                        ></RdsInput>
                    </div>

                    <div className="col-6">
                        <RdsInput
                            label="Display Name"
                            required={true}
                            placeholder="Enter Display Name"
                            inputType="text"
                            onChange={(e) => {
                                handleDataChanges(e.target.value, "displayname");
                            }}
                            value={userData?.displayname}
                            name={"Display Name"}
                            dataTestId="display-name"
                            reset={inputReset}
                        ></RdsInput>
                    </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        <label>Input Type</label>
                        <RdsDropdownList
                            data-testid="input-type"
                            borderDropdown={true}
                            isPlaceholder={true}
                            placeholder="Input Type"
                            listItems={props.inputTypeList}
                        />
                    </div>
                </div>
            </div>
            <div className="d-flex flex-column-reverse ps-4 flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3 p-4">
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
                            onClick={(e: any) => emitSaveData(e)}
                            dataTestId="save"
                        ></RdsButton>
                    </div>
        </>
    );
};
export default RdsCompInformation;

