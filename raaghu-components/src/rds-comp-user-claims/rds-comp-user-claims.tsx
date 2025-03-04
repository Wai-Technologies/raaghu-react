import React, { useEffect, useState } from "react";
import { RdsInput, RdsLabel, RdsButton } from "../rds-elements";
import { InputSize } from "../../../raaghu-elements/src/rds-input/rds-input";
export interface RdsCompUserClaimsProps { 
    userClaimData?: any;
    reset?: boolean;
    onSaveHandler?: (data: any) => void;
}

const RdsCompUserClaim = (props: RdsCompUserClaimsProps) => {
    const [formData, setFormData] = useState(props.userClaimData);
    const [inputReset, setInputReset] = useState(false);
    useEffect(() => {
      setFormData(props.userClaimData);
    }, [props.userClaimData]);

    useEffect(() => {
      setInputReset(!inputReset);
    }, [props.reset]);
  
    const handleDataChanges = (value: any, key: string) => {
      setFormData({ ...formData, [key]: value });
    };
  
    function emitSaveData(event: any) {
      event.preventDefault();
      props.onSaveHandler && props.onSaveHandler(formData);
      setInputReset(!inputReset);
      setFormData({
        type: "",
        value: ""
    });
    }
    const isTypeValid=(type: string)=>{
        if (!type || type.length === 0) {
            return false;
        }
        return true;
    }
    const isValueValid=(value: string)=>{
        if (!value || value.length === 0) {
            return false;
        }
        return true;
    }
    const isFormValid=isTypeValid(formData?.type) && isValueValid(formData?.value);
    return (
        <>
            <div className="tab-content">
                <form>
                <div className="custom-content-scroll">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group mb-3">
                                <RdsInput
                                    name="Type"
                                    label={true}
                                    required={true}
                                    reset={inputReset}
                                    inputType="text"
                                    placeholder="Enter Type"
                                    size={InputSize.Medium}
                                    dataTestId="type"
                                    onChange={(e) => {
                                        handleDataChanges(e.target.value, "type");
                                    }}
                                    value={formData?.type}
                                ></RdsInput>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group mb-3">
                                <RdsInput
                                    name="Value"
                                    label={true}
                                    required={true}
                                    reset={inputReset}
                                    inputType="text"
                                    placeholder="Enter Value"
                                    size={InputSize.Medium}
                                    dataTestId="value"
                                    onChange={(e) => {
                                        handleDataChanges(e.target.value, "value");
                                    }}
                                    value={formData?.value}
                                ></RdsInput>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div className="d-flex flex-column-reverse ps-4 flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3 p-4">
                <RdsButton
                    type="button"
                    label="Cancel"
                    isOutline={true}
                    colorVariant="primary"
                    size="small"
                    dataTestId="cancel"
                ></RdsButton>
                <RdsButton
                    type="button"
                    label="Next"
                    colorVariant="primary"
                    class="save-btn"
                    size="small"
                    dataTestId="next"
                    onClick={(e: any) => emitSaveData(e)}
                    isDisabled={!isFormValid}
                ></RdsButton>
            </div>
                </form>
            </div>
        </>
    );
};

export default RdsCompUserClaim;
