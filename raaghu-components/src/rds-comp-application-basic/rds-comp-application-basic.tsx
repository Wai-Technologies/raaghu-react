import React, { useEffect, useState } from "react";
import { RdsButton, RdsInput } from "../rds-elements";
import { useTranslation } from "react-i18next";

export interface RdsCompApplicationBasicProps {
    basicData?: any;
    onSuccess?: any;
    reset?: boolean
    editApplicationData?: any;
}

const RdsCompApplicationBasic = (props: RdsCompApplicationBasicProps) => {
    const [inputReset, setInputReset] = useState(props.reset)
    const [basicApplicationData, setBasicApplicationData] = useState<any>(props.basicData);

    useEffect(() => {
        setBasicApplicationData(props.basicData);
    }, [props.basicData]);

    useEffect(() => {
        setInputReset(props.reset);
    }, [props.reset]);

   
    const handlerInputChange = (value: any, key: any) => {
        setBasicApplicationData({ ...basicApplicationData, [key]: value });
        props.editApplicationData && props.editApplicationData({ ...basicApplicationData, [key]: value });
    }
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.onSuccess && props.onSuccess(basicApplicationData);
        setInputReset(!inputReset);
        setBasicApplicationData({
            clientId: "",
            displayName: "",
            clientUri: "",
            logoUri: "",
        });
    };

    return (
        <> <div>
            <div className="tab-content pt-3">
                <form onSubmit={handleSubmit}>
                    <div className="custom-content-scroll">
                        <div className="row">
                            <div className="col-12 col-6 col-lg-6 col-md-6 col-xl-6 col-xxl-6">
                                <RdsInput
                                    reset={inputReset}
                                    label="Client Id"
                                    placeholder="Enter Client Id"
                                    inputType="text"
                                    onChange={(e: any) => handlerInputChange(e.target.value, "clientId")}
                                    value={basicApplicationData?.clientId}
                                    required={true}
                                ></RdsInput>
                            </div>
                            <div className="col-12 col-6 col-lg-6 col-md-6 col-xl-6 col-xxl-6">
                                <RdsInput
                                    reset={inputReset}
                                    required={true}
                                    label="Display Name"
                                    placeholder="Enter Display Name"
                                    inputType="text"
                                    onChange={e => handlerInputChange(e.target.value, "displayName")}
                                    value={basicApplicationData?.displayName}
                                ></RdsInput>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-6 col-lg-6 col-md-6 col-xl4 col-xxl-6 mb-3">
                                <RdsInput
                                    reset={inputReset}
                                    label="Client Uri"
                                    placeholder="Enter Client Uri"
                                    inputType="url"
                                    validatonPattern={/^(ftp|http|https):\/\/[^ "]+$/}
                                    validationMsg="This field is not a valid fully qualified HTTP, HTTPS, or FTP URL"
                                    onChange={e => handlerInputChange(e.target.value, "clientUri")}
                                    value={basicApplicationData?.clientUri}
                                    required={false}
                                ></RdsInput>
                            </div>
                            <div className="col-12 col-6 col-lg-6 col-md-6 col-xl4 col-xxl-6 mb-3">
                                <RdsInput
                                    reset={inputReset}
                                    label="Logo Uri"
                                    placeholder="Enter Logo Uri"
                                    inputType="url"
                                    validatonPattern={/^(ftp|http|https):\/\/[^ "]+$/}
                                    validationMsg="This field is not a valid fully qualified HTTP, HTTPS, or FTP URL"
                                    onChange={e => handlerInputChange(e.target.value, "logoUri")}
                                    value={basicApplicationData?.logoUri}
                                    required={false}
                                ></RdsInput>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex flex-column-reverse ps-4 flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3">
                        <RdsButton
                            tooltipTitle={""}
                            type={"button"}
                            label="Cancel"
                            colorVariant="outline-primary"
                            size="small"
                            databsdismiss="offcanvas"
                            dataTestId="cancel"
                        ></RdsButton>
                        <RdsButton
                            label="Save"
                            size="small"
                            colorVariant="primary"
                            tooltipTitle={""}
                            type={"submit"}
                            databsdismiss="offcanvas"
                            dataTestId="save"
                        ></RdsButton>
                    </div>
                </form>
            </div>
        </div>
        </>
    );
};
export default RdsCompApplicationBasic;