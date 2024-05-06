import React, { useEffect, useRef, useState } from "react";
import { RdsDropdownList, RdsInput } from "../rds-elements";

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



    return (
        <>
            <div>
                <div className="row ">
                    <div className="col-6 mb-3">
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
                        <label className="mb-2">Input Type</label>
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
        </>
    );
};
export default RdsCompInformation;

