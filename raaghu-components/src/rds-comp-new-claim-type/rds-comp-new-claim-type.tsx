import { RdsCheckbox, RdsSelectList } from "../rds-elements";
import React, { useState, useEffect } from "react";
import { RdsInput, RdsTextArea, RdsButton } from "../rds-elements";
import { useTranslation } from "react-i18next";
export interface RdsCompNewClaimTypeProps {
   
    claimsData?: any;
    valueType: { option: any, value: any }[];
    onCancel?: any
    reset?: boolean;
    onSaveHandler?: (data: any) => void;
}

const RdsCompNewClaimType = (props: RdsCompNewClaimTypeProps) => {
    const [formData, setFormData] = useState(props.claimsData);
    const [isFormValid, setIsFormValid] = useState(false);
    const [inputReset, setInputReset] = useState(props.reset);

    useEffect(() => {
        setInputReset(props.reset);
    }, [props.reset]);

    const handleSelectChange = (value: any, key: string) => {
        setFormData({ ...formData, [key]: value });
        checkFormValidity({ ...formData, [key]: value });
    };

    const checkFormValidity = (formData: any) => {
        const requiredFields = ["name"];
        const isFormValid = requiredFields.every((field) => formData[field] !== "");
        setIsFormValid(isFormValid);
    };
    function emitSaveData(event: any) {
        event.preventDefault();
        props.onSaveHandler && props.onSaveHandler(formData);
        setFormData({
            valueType: null,
            name: "",
            regex: "",
            regexDescription: "",
            description: "",
            required: false
        });
    }
    return (
        <>
         <div className="custom-content-scroll">
                <div className="row">
                    <div className="col-md-12">
                        <RdsInput
                            label="Name"
                            value={formData?.name}
                            placeholder="Enter Name"
                            required={true}
                            name="name"
                            onChange= {(e) =>{handleSelectChange(e.target.value , "name");}}
                            dataTestId="name"
                            reset={inputReset}
                        />
                    </div>
                    <div className="col-md-6">
                        {" "}
                        <RdsInput
                            label="Regex"
                            value={formData?.regex}
                            placeholder="Enter Regex"
                            name="regex"
                            required={true}
                            onChange= {(e) =>{handleSelectChange(e.target.value , "regex");}}
                            dataTestId="regex"
                            reset={inputReset}
                        />
                    </div>
                    <div className="col-md-6 mb-md-0 mb-3">
                        <RdsSelectList
                            id="idenval"
                            label="Value Type"
                            placeholder="Select Value Type"
                            selectItems={props.valueType}
                            selectedValue={
                                formData?.valueType }
                           onChange= {(e: any) =>{handleSelectChange(e, "valueType");}}
                          required={true}
                        ></RdsSelectList>
                    </div>
                    <div className="col-md-12">
                        <RdsInput
                            label="Regex Description"
                            value={formData?.regexDescription}
                            placeholder="Enter Regex Description"
                            name="regexDesc"
                            required={true}
                            onChange= {(e) =>{handleSelectChange(e.target.value , "regexDescription");}}
                            dataTestId="reges-description"
                            reset={inputReset}
                        />
                    </div>
                    <div className="col-md-12 mb-3">
                        <RdsTextArea
                            label="Description"
                            placeholder="Enter Description"
                            onChange= {(e) =>{handleSelectChange(e.target.value , "description");}}
                            value={formData?.description}
                            rows={3}
                            dataTestId="description"

                        />
                    </div>

                    <div className="col-md-12">
                        <RdsCheckbox
                            label="Required"
                            onChange= {(e) =>{handleSelectChange(e.target.checked , "required");}}
                            checked={formData?.required}
                            dataTestId="required"
                        ></RdsCheckbox>
                    </div>
                </div>
                </div>
                <div className="d-flex flex-column-reverse flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3">
                    <RdsButton
                        label="Cancel"
                        databsdismiss="offcanvas"
                        type={"button"}
                        size="small"
                        isOutline={true}
                        colorVariant="primary"
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
                        onClick={(e: any) => emitSaveData(e)}
                        dataTestId="save"
                    ></RdsButton>
                </div>
            
        </>
    );
};

export default RdsCompNewClaimType;
