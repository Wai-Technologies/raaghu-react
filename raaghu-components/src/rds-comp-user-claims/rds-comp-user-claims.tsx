import React, { useEffect, useState } from "react";
import { RdsInput, RdsLabel, RdsButton } from "../rds-elements";

export interface RdsCompUserClaimsProps { 
    userClaimData?: any;
    onSaveHandler?: (data: any) => void;
}

const RdsCompUserClaim = (props: RdsCompUserClaimsProps) => {
    const [formData, setFormData] = useState(props.userClaimData);

    useEffect(() => {
      setFormData(props.userClaimData);
    }, [props.userClaimData]);
  
    const handleDataChanges = (value: any, key: string) => {
      setFormData({ ...formData, [key]: value });
    };
  
    function emitSaveData(event: any) {
      event.preventDefault();
      props.onSaveHandler && props.onSaveHandler(formData);
      setFormData({
        type: "",
        value: ""
    });
    }
    return (
        <>
            <div className="tab-content">
                <form>
                <div className="custom-content-scroll">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group mb-3">
                                <RdsLabel label="Type" class="mb-1" size="14px"></RdsLabel>
                                <RdsInput
                                    inputType="text"
                                    placeholder="Type"
                                    size="small"
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
                                <RdsLabel label="Value" class="mb-1" size="14px"></RdsLabel>
                                <RdsInput
                                    inputType="text"
                                    placeholder="Value"
                                    size="small"
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
                    <div className="d-flex flex-column-reverse flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3">
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
                ></RdsButton>
            </div>
                </form>
            </div>
        </>
    );
};

export default RdsCompUserClaim;
