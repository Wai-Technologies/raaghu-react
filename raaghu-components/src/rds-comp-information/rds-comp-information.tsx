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
                    <div className="col-6">
                        <RdsInput
                            name="Property Name"
                            label={true}
                            required={true}
                            placeholder="Enter Property Name"
                            inputType="text"
                            onChange={(e) => {
                                handleDataChanges(e.target.value, "propertyname");
                            }}
                            value={userData?.propertyname}                           
                            dataTestId="property-name"
                            reset={inputReset}
                        ></RdsInput>
                    </div>

                    <div className="col-6">
                        <RdsInput
                            name="Display Name"
                            label={true}
                            required={true}
                            placeholder="Enter Display Name"
                            inputType="text"
                            onChange={(e) => {
                                handleDataChanges(e.target.value, "displayname");
                            }}
                            value={userData?.displayname}
                            
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
        </>
    );
};
export default RdsCompInformation;

