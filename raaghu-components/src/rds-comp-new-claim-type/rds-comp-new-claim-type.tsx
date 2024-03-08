import { RdsCheckbox, RdsSelectList } from "../rds-elements";
import React, { useState, useEffect } from "react";
import { RdsInput, RdsTextArea, RdsButton } from "../rds-elements";
import { useTranslation } from "react-i18next";

export interface RdsCompNewClaimTypeProps {
    name?: string;
    regex?: string;
    value?: string;
    regexDesc?: string;
    desc?: string;
    onSubmit: any;
    claimsData?: any;
    valueType: { option: any, value: any }[];
    onCancel?: any
    reset?: boolean;
}

const RdsCompNewClaimType = (props: RdsCompNewClaimTypeProps) => {
    const [data, setData] = useState(props.claimsData);
    const [isFormValid, setIsFormValid] = useState(false);
    const [inputReset, setInputReset] = useState(props.reset);

    useEffect(() => {
        setInputReset(props.reset);
    }, [props.reset]);
   
    useEffect(() => {
        setData(props.claimsData);
    }, [props.claimsData]);

    const onNameChangeHandler = (e: any) => {
        const newName = e.target.value;
        setData({ ...data, name: newName });
        checkFormValidity({ ...data, name: newName });
    };

    const onRegexChangeHandler = (e: any) => {
        const newRegex = e.target.value;
        setData({ ...data, regex: newRegex });
        checkFormValidity({ ...data, regex: newRegex });
    };

    const handleSelectChange = (item: any) => {
        const newValueType = item.value;
        setData({ ...data, valueType: newValueType });
        checkFormValidity({ ...data, valueType: newValueType });
    };

    const onRegexDescChangeHandler = (e: any) => {
        const newRegexDesc = e.target.value;
        setData({ ...data, regexDescription: newRegexDesc });
        checkFormValidity({ ...data, regexDescription: newRegexDesc });
    };

    const onDescChangeHAndler = (e: any) => {
        const newDesc = e.target.value;
        setData({ ...data, description: newDesc });
        checkFormValidity({ ...data, description: newDesc });
    };

    const checkFormValidity = (formData: any) => {
        const requiredFields = ["name"];
        const isFormValid = requiredFields.every((field) => formData[field] !== "");
        setIsFormValid(isFormValid);
    };

    const setDevice = (e: any) => {
        setData({ ...data, required: e });
    };
    return (
        <>

            <div className="row">
                <div className="col-md-12">
                    <RdsInput
                        label="Name"
                        value={data?.name}
                        placeholder="Enter Name"
                        required={true}
                        name="name"
                        onChange={onNameChangeHandler}
                        dataTestId="name"
                        reset={inputReset}
                    />
                </div>
                <div className="col-md-6">
                    {" "}
                    <RdsInput
                        label="Regex"
                        value={data?.regex}
                        placeholder="Enter Regex"
                        name="regex"
                        required={true}
                        onChange={onRegexChangeHandler}
                        dataTestId="regex"
                        reset={inputReset}
                    />
                </div>
                <div className="col-md-6 mb-md-0 mb-3">
                    <RdsSelectList
                        id="idenval"
                        label="ValueType"
                        placeholder="Select Value Type"
                        selectItems={props.valueType}
                        selectedValue={
                            (props.valueType)?.find((item: any) => item.value === data?.valueType)?.value
                        }
                        onChange={handleSelectChange}
                        required={true}
                    ></RdsSelectList>
                </div>
                <div className="col-md-12">
                    <RdsInput
                        label="RegexDescription"
                        value={data?.regexDescription}
                        placeholder="Enter Regex Description"
                        name="regexDesc"
                        required={true}
                        onChange={onRegexDescChangeHandler}
                        dataTestId="reges-description"
                        reset={inputReset}
                    />
                </div>
                <div className="col-md-12 mb-3">
                    <RdsTextArea
                        label="Identity.Description"
                        placeholder="Enter Description"
                        onChange={onDescChangeHAndler}
                        value={data?.description}
                        rows={3}
                        dataTestId="description"
                    
                    />
                </div>

                <div className="col-md-12">
                    <RdsCheckbox
                        label="Required"
                        onChange={e => { setDevice(e.target.checked); }}
                        checked={data?.required}
                        dataTestId="required"
                    ></RdsCheckbox>
                </div>

                <div className="footer-buttons pb-3 d-flex flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row gap-2">
                    <RdsButton
                        label="Cancel"
                        databsdismiss="offcanvas"
                        type={"button"}
                        size="small"
                        isOutline={true}
                        colorVariant="primary"
                        class="me-2"
                        dataTestId="cancel"
                        onClick={props.onCancel}
                    ></RdsButton>
                    <RdsButton
                        label="Save"
                        type={"button"}
                        size="small"
                        databsdismiss="offcanvas"
                        isDisabled={!isFormValid}
                        colorVariant="primary"
                        class="me-2"
                        onClick={() => {
                            props.onSubmit(data);
                        }}
                        dataTestId="save"
                    ></RdsButton>
                </div>

            </div>




        </>
    );
};

export default RdsCompNewClaimType;
