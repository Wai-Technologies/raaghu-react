import React, { useEffect, useState } from "react";
import { RdsButton, RdsInput } from "../rds-elements";

export interface RdsCompCMSProps {
    receiverEmailAddress: any;
    reset?: boolean;
    onSubmit?: any
}
const RdsCompCMS = (props: RdsCompCMSProps) => {
    const [receiverEmailAddress, setReceiverEmailAddress] = useState(props.receiverEmailAddress);
    const [inputReset, setInputReset] = useState(false);

    useEffect(() => {
        setReceiverEmailAddress(props.receiverEmailAddress);
    }, [props.receiverEmailAddress]);

    const handleSubmit = (event: any) => {
        event.preventDefault();
        props.onSubmit && props.onSubmit(receiverEmailAddress)
        setInputReset(!inputReset);
        setReceiverEmailAddress("");
    };


    return (
        <div className="pt-4">
            <form onSubmit={handleSubmit}>
                <div className="custom-content-scroll">
                    <div className="form-group">
                        <div className="row">
                            <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-12">
                                <RdsInput
                                    value={receiverEmailAddress}
                                    reset={inputReset}
                                    name="receiverEmail"
                                    required={true}
                                    label="Receiver Email Address"
                                    placeholder="info@mycompanyname.com"
                                    customClasses="form-control"
                                    onChange={(e: any) => setReceiverEmailAddress(e.target.value)}
                                    dataTestId="receiver-email"
                                    fontWeight={"normal"}
                                    validatonPattern={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i}
                                    validationMsg="Invalid Email Address."
                                ></RdsInput>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex flex-column-reverse ps-4 flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3">
                    <RdsButton
                        label="Save"
                        type="submit"
                        colorVariant="primary"
                        size="small"
                        dataTestId="save"
                        isDisabled={!receiverEmailAddress}
                    ></RdsButton>
                </div>
            </form>
        </div>
    );
};

export default RdsCompCMS;