import React, { useEffect, useRef, useState } from "react";
import { RdsDropdownList, RdsInput } from "../rds-elements";

export interface RdsCompInformationProps {
    inputTypeList: any;
    reset?: boolean;
    informationItem?: (item: any) => void;
    onPropertyChange?: (event: React.ChangeEvent<HTMLAnchorElement>) => void;
    onDisplayChange?: (event: React.ChangeEvent<HTMLAnchorElement>) => void;
    onInputTypeChange?: (event: React.ChangeEvent<HTMLAnchorElement>) => void;
    informationItemInitial: any;
}

const RdsCompInformation = (props: RdsCompInformationProps) => {
    const [count, setCount] = useState(0);
    const firstUpdate = useRef(true);
    const [user, setUser] = useState({
        propertyname: props.informationItemInitial.propertyName,
        displayname: props.informationItemInitial.displayName,
        inputValue: props.informationItemInitial.inputValue,
    });
    useEffect(() => {
        setUser({
            ...user,
            propertyname: props.informationItemInitial.propertyName,
            displayname: props.informationItemInitial.displayName,
            inputValue: props.informationItemInitial.inputValue,
        });
    }, [props.informationItemInitial]);

    const [isReset, setIsReset] = useState(false);
    const [error, setError] = useState({
        propertyname: "",
    });

    const isPropertyValid = (propertyname: any) => {
        if (!propertyname || propertyname.length === 0) {
            return false;
        }
        return true;
    };
    const isDisplaynameValid = (displayname: any) => {
        if (!displayname || displayname.length === 0) {
            return false;
        }
        return true;
    };
    const onselectchange = (e: any) => {
        props.onInputTypeChange != undefined && props.onInputTypeChange(e);
        setUser({
            ...user,
            inputValue: e.target.innerText,
        });
    };
    const propertyhandleChange = (event: any) => {
        props.onPropertyChange != undefined && props.onPropertyChange(event);
        if (!isPropertyValid(event.target.value)) {
            setError({ ...error, propertyname: "Property Name is invalid" });
        } else {
            setError({ ...error, propertyname: "" });
        }
        setUser({ ...user, propertyname: event.target.value });
    };
    const displayhandleChange = (event: any) => {
        props.onDisplayChange != undefined && props.onDisplayChange(event);

        setUser({ ...user, displayname: event.target.value });
    };

    const isFormValid =
        isPropertyValid(user.propertyname) &&
        isDisplaynameValid(user.displayname) &&
        user.inputValue != "";

    useEffect(() => {
        isFormValid &&
            props.informationItem != undefined &&
            props.informationItem(user);
    });

    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        setIsReset(!isReset);
        setUser({ ...user, propertyname: "", displayname: "", inputValue: "" });
    }, [props.reset]);

    return (
        <>
            <div>
                <div className="row ">
                    <div className="mt-1 mb-3 col-6">
                        <RdsInput
                            label="Property Name"
                            required={true}
                            placeholder="Enter Property Name"
                            inputType="text"
                            onChange={propertyhandleChange}
                            value={user.propertyname}
                            name={"Property Name"}
                            dataTestId="property-name"
                        ></RdsInput>
                        {error.propertyname && (
                            <span className="text-danger">{error.propertyname}</span>
                        )}
                    </div>

                    <div className="mt-1 mb-3 col-6">
                        <RdsInput
                            label="Display Name"
                            required={true}
                            placeholder="Display Name"
                            inputType="text"
                            onChange={displayhandleChange}
                            name={"Display Name"}
                            value={user.displayname}
                            dataTestId="display-name"
                        ></RdsInput>
                    </div>
                </div>

                <div className="row">
                    <div className="col-6 mt-1 mb-3">
                        <label className="mb-2">Input Type</label>
                        <RdsDropdownList
                            placeholder="Input Type"
                            multiSelect={false}
                            reset={isReset}
                            listItems={props.inputTypeList}
                            onClick={onselectchange}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};
export default RdsCompInformation;
