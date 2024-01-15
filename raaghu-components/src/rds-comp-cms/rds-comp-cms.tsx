import React, { useState } from "react";
import { RdsButton, RdsInput } from "../rds-elements";
import { useTranslation } from "react-i18next";

export interface RdsCompCMSProps {
    receiverEmailAddress: any;
    onSubmit?: any
}
const RdsCompCMS = (props: RdsCompCMSProps) => {
    const [receiverEmailAddress, setReceiverEmailAddress] = useState(props.receiverEmailAddress);
    const { t } = useTranslation();

    const handleSubmit = (event: any) => {
        event.preventDefault();
        props.onSubmit && props.onSubmit(receiverEmailAddress)

    };


    return (
        <div className="pt-4">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <div className="row">
                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-12">
                            <RdsInput
                                value={receiverEmailAddress}
                                name="receiverEmail"
                                required={true}
                                label={t("CmsKit.ReceiverEmailAddress") || ""}
                                placeholder={t("info@mycompanyname.com") || ""}
                                customClasses="form-control"
                                onChange={(e: any) => setReceiverEmailAddress(e.target.value)}
                                dataTestId="receiver-email"
                                fontWeight={"normal"}
                            ></RdsInput>
                        </div>
                    </div>
                </div>
                <div className="mt-xxl-4 pb-4 mb-xxl-0 mb-xl-0 mb-lg-0 mb-md-0 mb-3 bg-transparent fixed-bottem d-flex flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row footer-buttons mt-xl-4 mt-lg-4 mt-md-4 mt-0 pt-2 col-xxl-4 col-xl-4 col-lg-6 col-12 position-absolute">
                    <RdsButton
                        label={t("AbpUi.Save") || ""}
                        type="submit"
                        colorVariant="primary"
                        size="small"
                        dataTestId="save"
                    ></RdsButton>
                </div>
            </form>
        </div>
    );
};

export default RdsCompCMS;