
import React, { useEffect, useState } from "react";
import { RdsInput, RdsButton } from "../rds-elements";
import { useTranslation } from "react-i18next";

export interface RdsCompSecretsProps { 
    onSaveHandler?: (data: any) => void;
    default: any;
    reset?: boolean;
}

const RdsCompSecrets = (props: RdsCompSecretsProps) => {
    const [data, setdata] = useState(props.default);
    const [inputReset, setInputReset] = useState(false);

    useEffect(() => {
        setdata(props.default);
    }, [props.default]);

    useEffect(() => {
        setInputReset(!inputReset);
    }, [props.reset]);

    const handleDataChanges = (value: any, key: string) => {
        setdata({ ...data, [key]: value });
    }

    function emitSaveData(event: any) {
        event.preventDefault();
        props.onSaveHandler && props.onSaveHandler(data);
        setInputReset(!inputReset);
        setdata({
            type: "",
            value: "",
            expiration: "",
            description: ""
        });
    }

    return (
        <>
            <div className="secrets">
                <div className="custom-content-scroll">
                    <div className="row mt-3">
                        <div className="col-md-4 form-group">
                            <RdsInput
                                name="Type"
                                label={true}
                                inputType="text"
                                isDisabled={false}
                                readonly={false}
                                placeholder="Enter Type"
                                required={true}
                                onChange={(e) => {
                                    handleDataChanges(e.target.value, "type");
                                  }}
                                  value={data?.type}
                                dataTestId="type"
                                reset={inputReset}
                            ></RdsInput>
                        </div>
                        <div className="col-md-4 form-group">
                            <RdsInput
                                name="Value"
                                label={true}
                                inputType="text"
                                isDisabled={false}
                                readonly={false}
                                placeholder="Enter Value"
                                required={true}
                                onChange={(e) => {
                                    handleDataChanges(e.target.value, "val");
                                  }}
                                  value={data?.val}
                                dataTestId="value"
                            ></RdsInput>
                        </div>
                        <div className="col-md-4 form-group">
                            <RdsInput
                                name="Expiration"
                                label={true}
                                inputType="text"
                                isDisabled={false}
                                readonly={false}
                                placeholder="Enter Expiration"
                                required={true}
                                onChange={(e) => {
                                    handleDataChanges(e.target.value, "expiration");
                                  }}
                                  value={data?.expiration}
                                dataTestId="expiration"
                                reset={inputReset}
                            ></RdsInput>
                        </div>
                    </div>
                    <div className="form-group">
                        <RdsInput
                            name="Description"
                            label={true}
                            inputType="text"
                            isDisabled={false}
                            readonly={false}
                            placeholder="Enter Description"
                            required={true}
                            onChange={(e) => {
                                handleDataChanges(e.target.value, "description");
                              }}
                              value={data?.description}
                            dataTestId="description"
                            reset={inputReset}
                        ></RdsInput>
                    </div>
                    <div className="mt-3">
                        <RdsButton
                            size="small"
                            colorVariant="primary"
                            label="Add"
                            type="button"
                            dataTestId="add"
                        ></RdsButton>
                    </div>
                </div>
                <div  className="d-flex flex-column-reverse ps-4 flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3 p-4" >
                   
                        
                            <RdsButton
                                size="small"
                                isOutline={true}
                                colorVariant="primary"
                                label="Cancel"
                                data-bs-dismiss="offcanvas"
                                type="button"
                                dataTestId="cancel"
                            ></RdsButton>
                       
                        
                            <RdsButton
                                size="small"
                                isOutline={false}
                                colorVariant="primary"
                                label="Create"
                                data-bs-dismiss="offcanvas"
                                type="button"
                                dataTestId="create"
                                onClick={(e: any) => emitSaveData(e)}
                                isDisabled={!data?.type || !data.val || !data.expiration || !data.description}
                            ></RdsButton>
                        
                    
                </div>
            </div>
        </>
    );
};

export default RdsCompSecrets;
