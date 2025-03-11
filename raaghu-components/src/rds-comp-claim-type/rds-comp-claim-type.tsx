import { RdsCheckbox, RdsSelectList } from "../rds-elements";
import React, { useState, useEffect } from "react";
import { RdsInput, RdsTextArea, RdsButton } from "../rds-elements";
export interface RdsCompClaimTypeProps {
   
    claimsData?: any;
    valueType: { option: any, value: any }[];
    onCancel?: any
    reset?: boolean;
    onSaveHandler?: (data: any) => void;
}

const RdsCompClaimType = (props: RdsCompClaimTypeProps) => {
    const [formData, setFormData] = useState({
        name: "",
        regex: "",
        valueType: "",
        regexDescription: "",
        description: "",
        required: false,
        ...props.claimsData
    });
    const [isFormValid, setIsFormValid] = useState(false);
    const [inputReset, setInputReset] = useState(props.reset);
    
    useEffect(() => {
        setInputReset(props.reset);
    }, [props.reset]);

    useEffect(() => {
        checkFormValidity(formData);
    }, [formData]);

    const handleSelectChange = (value: any, key: string) => {        
        setFormData({ ...formData, [key]: value });
    };

    const checkFormValidity = (formData: any) => {
        const requiredFields = ["name", "regex", "valueType", "regexDescription"];
        const isValid = requiredFields.every((field) => formData[field] && formData[field].toString().trim() !== "");
        setIsFormValid(isValid);
    };

    const emitSaveData = (event: any) => {
        event.preventDefault();
        if (isFormValid) {
            props.onSaveHandler && props.onSaveHandler(formData);

            setFormData({
                name: "",
                regex: "",
                valueType: "",
                regexDescription: "",
                description: "",
                required: false
            });
            setInputReset(!inputReset);
        }
        console.log("after clearing formData", formData);
    };

    return (
        <>
            <div className="custom-content-scroll">
                <div className="row">
                    <div className="col-md-12">
                        <RdsInput                            
                            label={true}
                            value={formData?.name}
                            placeholder="Enter Name"
                            required={true}
                            name="Name"
                            onChange= {(e) =>{handleSelectChange(e.target.value , "name");}}
                            dataTestId="name"
                            reset={inputReset}
                        />
                    </div>
                    <div className="col-md-6  pt-2">
                        {" "}
                        <RdsInput                           
                            label={true}
                            value={formData?.regex}
                            placeholder="Enter Regex"
                            name="Regex"
                            required={true}
                            onChange= {(e) =>{handleSelectChange(e.target.value , "regex");}}
                            dataTestId="regex"
                            reset={inputReset}
                        />
                    </div>
                    <div className="col-md-6 mb-md-0 pt-2 ">
                        <RdsSelectList
                            id="idenval"
                            label="Value Type"
                            placeholder="Select Value Type"
                            selectItems= {props.valueType}
                            selectedValue={formData?.valueType}
                            onChange= {(item: any) =>{handleSelectChange(item.value, "valueType");}}
                            dataTestId="value-type"
                            required={true}
                            key={`valueType-${formData?.valueType}`}
                            color="primary"
                        ></RdsSelectList>

                    </div>
                    <div className="col-md-12 pt-2">
                        <RdsInput                          
                            label={true}
                            value={formData?.regexDescription}
                            placeholder="Enter Regex Description"
                            name="Regex Description"
                            required={true}
                            onChange= {(e) =>{handleSelectChange(e.target.value , "regexDescription");}}
                            dataTestId="reges-description"
                            reset={inputReset}
                        />
                    </div>
                    <div className="col-md-12 pt-2">
                        <RdsTextArea
                            label="Description"
                            placeholder="Enter Description"
                            onChange= {(e) =>{handleSelectChange(e.target.value , "description");}}
                            value={formData?.description}
                            rows={3}
                            dataTestId="description"

                        />
                    </div>

                    <div className="col-md-12 pb-3">
                        <RdsCheckbox
                            labelText="Required"
                            onChange= {(e) =>{handleSelectChange(e.target.checked , "required");}}
                            checked={formData?.required}
                            dataTestId="required"
                        ></RdsCheckbox>
                    </div>
                </div>
            </div>
            <div className="d-flex flex-column-reverse ps-4 flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3 p-4">
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

export default RdsCompClaimType;
