import React, { useEffect, useState } from "react";
import { RdsInput, RdsTextArea, RdsButton } from "../rds-elements";
import { useTranslation } from "react-i18next";

export interface RdsCompApiResourceBasicProps {
    email: any;
    fullname: any;
    message: any;
    accessTokenSigningAlgorithm: any;
    onSuccess?: any;

}

const RdsCompApiResourceBasic = (props: RdsCompApiResourceBasicProps) => {
    const { t } = useTranslation();
    const [email, setEmail] = useState(props.email);
    const [message, setMessage] = useState(props.message);
    const [fullname, setFullname] = useState(props.fullname);
    const [accessTokenSigningAlgorithm, setResource] = useState(props.accessTokenSigningAlgorithm);
    const [data, setdata] = useState({
        fullname: props.fullname,
        email: props.email,
        message: props.message,
        accessTokenSigningAlgorithm: props.accessTokenSigningAlgorithm,
        resource: []
    });
    useEffect(() => {
        setdata({
            fullname: props.fullname,
            email: props.email,
            message: props.message,
            accessTokenSigningAlgorithm: props.accessTokenSigningAlgorithm,
            resource: []
        });
    }, [props.email, props.fullname, props.message, props.accessTokenSigningAlgorithm,]);

    const isEmailValid = (email: any) => {
        if (!data.email || data.email.length === 0) {
            return false;
        }
        return true;
    };
    const emailhandleChange = (event: any) => {

        setdata({ ...data, email: event.target.value });

    };
    const fullnamehandleChange = (event: any) => {

        setdata({ ...data, fullname: event.target.value });

    };
    const messagehandleChange = (event: any) => {

        setdata({ ...data, message: event.target.value });
    };
    const accessTokenSigningAlgorithmehadleChange = (event: any) => {

        setdata({ ...data, resource: event.target.value });
    };
    const isFormValid = isEmailValid(email);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setEmail("");
        setFullname("");
        setMessage("");
        setResource("");
    };
    return (
        <>
            <div >

                <form onSubmit={handleSubmit}>
                    <div className="row mt-3">
                        <div className="col-6">
                            <RdsInput
                                required={true}
                                label="Name"
                                placeholder='Enter name'
                                inputType='text'
                                onChange={emailhandleChange}
                                value={data.email}
                                name={"email"}
                                dataTestId="name"
                            ></RdsInput>

                        </div>

                        <div className="col-6 ">
                            <RdsInput
                                label='Display name'
                                placeholder='Enter display name'
                                inputType='text'
                                onChange={fullnamehandleChange}
                                required={false}
                                name={"Displayname"}
                                value={data.fullname}
                                dataTestId="display-name"
                            ></RdsInput>

                        </div>
                    </div>

                    <div className=" mb-4">
                        <RdsTextArea
                            label='Description'
                            placeholder='Description'
                            onChange={messagehandleChange}
                            rows={2}
                            value={data.message}
                            data-testId="desc"
                        />
                    </div>
                    <div className=" mb-4">

                        <RdsInput
                            label='Allowed access token signing algorithms'
                            placeholder='Enter Allowed access token signing algorithms'
                            inputType='text'
                            onChange={accessTokenSigningAlgorithmehadleChange}
                            required={false}
                            name={"accessTokenSigningAlgorithm"}
                            value={data.accessTokenSigningAlgorithm}
                            dataTestId="allowed-access-token"
                        ></RdsInput>
                    </div>
                    <div >
                        {/* <label className="Text-bold" >Others</label>
            <RdsCheckboxGroup itemList={props.resourceData.checklist} /> */}
                    </div>
                    <div className="mt-3 d-flex pb-3 flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row footer-buttons gap-2">
                        <RdsButton
                            class="me-2"
                            tooltipTitle={""}
                            type={"button"}
                            label={t("Cancel") || ""}
                            colorVariant="outline-primary"
                            size="small"
                            databsdismiss="offcanvas"
                            dataTestId="cancel"
                        ></RdsButton>
                        <RdsButton
                            class="me-2"
                            label={t("Save") || ""}
                            size="small"
                            colorVariant="primary"
                            tooltipTitle={""}
                            type={"submit"}
                            databsdismiss="offcanvas"
                            onClick={() => props.onSuccess(data)}
                            isDisabled={!isFormValid}
                            dataTestId="save"
                        ></RdsButton>
                    </div>
                </form>
            </div>
        </>
    );
};
export default RdsCompApiResourceBasic;
