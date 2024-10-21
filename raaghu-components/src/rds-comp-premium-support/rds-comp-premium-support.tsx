import React, { useEffect, useState } from "react";
import { RdsButton, RdsInput, RdsOffcanvas, RdsTextArea } from "../rds-elements";
import "./rds-comp-premium-support.css";

export interface RdsCompPremiumSupportProps {
  premiumSupportData?: any;
  reset?: boolean;
  onSaveHandler?: (data: any) => void;
  onClickOffcanvas?: () => void;
}

const RdsCompPremiumSupport = (props: RdsCompPremiumSupportProps) => {

    const [premiumSupportData, setPremiumSupportData] = useState<any>(props.premiumSupportData);
    const [inputReset, setInputReset] = useState(false);

    useEffect(() => {
        setPremiumSupportData(props.premiumSupportData);
    }, [props.premiumSupportData]);

    useEffect(() => {
        setInputReset(prevReset => !prevReset);
    }, [props.reset]);

    const handlePremiumSupportDataChanges = (value: any, key: string) => {
        setPremiumSupportData({ ...premiumSupportData, [key]: value });
    };

    function emitSaveData(event: any) {
        event.preventDefault();
        props.onSaveHandler && props.onSaveHandler(premiumSupportData);
        setPremiumSupportData({ phoneNumber: "", message: "" });
        setInputReset(!inputReset);
    }

    const onClickCancel = () => {
        setInputReset(!inputReset);
        setPremiumSupportData({ phoneNumber: "", message: "" });
    };

    return (<>
        <section className="downloadable-contents pb-5 pt-4" style={{
            background: `#06051B url('./assets/downloadable-section.png') no-repeat`,
            backgroundSize: "cover",
            backgroundPosition: "center"
        }}>
            <div className="container py-5">
                <div className="text-center">
                    <h4 className="text-white"><span className="gradient-secondary gradient">Premium</span> Support</h4>
                    <p className="fss-6 mb-2 text-secondary-50">Get Live Support To Address Your Queries. Raise Unlimited Tickets On Our Support Forum With Our Premium Offering</p>
                </div>

                <div className="d-xxl-flex d-xl-flex d-lg-flex d-md-flex d-block mb-lg-0 gap-5 justify-content-center pt-5 pb-5 pe-2">
                    <div className="support-cards rounded-4 d-flex justify-content-center align-items-center mb-4 m-auto m-lg-0">
                        <div className="text-center">
                            <img src="./assets/screen-sharing.svg" alt="screen-sharing" className="py-3" />
                            <p className="text-secondary-50">Screen Sharing</p>
                        </div>
                    </div>

                    <div className="support-cards rounded-4 d-flex justify-content-center align-items-center mb-4  m-auto m-lg-0">
                        <div className="text-center">
                            <img src="./assets/headset.svg" alt="headset" className="py-3" />
                            <p className="text-secondary-50 px-3">Live Assistance By Raaghu Developer</p>
                        </div>
                    </div>
                </div>

                <div className="text-center">

                    <RdsOffcanvas
                        backDrop="static"
                        canvasTitle="GET PREMIUM SUPPORT"
                        offId="SUPPORT"
                        offcanvasbutton={
                            <RdsButton
                                label="GET PREMIUM SUPPORT"
                                block={false}
                                size="medium"
                                type="button"
                                colorVariant="primary"
                                showLoadingSpinner={false}
                                onClick={props.onClickOffcanvas}>
                            </RdsButton>}
                        offcanvaswidth={544}
                        placement="end" scrolling={false}>
                        <div>
                            <div className="offcanvas-intive-banner">
                                <div className="d-flex align-items-center gap-3 py-3 px-4">
                                    <div><img src="./assets/headset-purple.svg" alt="headset-purple" width="25px" /></div>
                                    <div>
                                        <p className="fw-medium mb-0 smaller text-start">Get Live Support To Address Your Queries. Raise Unlimited Tickets On Our Support Forum With Our Premium Offering.</p>
                                    </div>
                                </div>
                            </div>

                            <form className="text-start pt-4">
                                <div className="mb-3">
                                    <RdsInput
                                        id=""
                                        inputType="text"
                                        label="Name"
                                        labelPosition="top"
                                        placeholder="Enter Name"
                                        // required
                                        size="medium"
                                        value={premiumSupportData?.name}
                                        onChange={(e: any) => {
                                            handlePremiumSupportDataChanges(e.target.value, "name");
                                        }}
                                    />
                                </div>
                                <div className="mb-3">
                                    <RdsInput
                                        id=""
                                        inputType="email"
                                        label="Email"
                                        labelPosition="top"
                                        placeholder="Enter Email"
                                        // required
                                        size="medium"
                                        value={premiumSupportData?.email}
                                        onChange={(e: any) => {
                                            handlePremiumSupportDataChanges(e.target.value, "email");
                                        }}
                                    />
                                </div>

                                <div className="mb-3">
                                    <RdsInput
                                        id=""
                                        inputType="number"
                                        label="Contact Number"
                                        labelPosition="top"
                                        placeholder="Enter Contact Number"
                                        required
                                        size="medium"
                                        reset={inputReset}
                                        value={premiumSupportData?.phoneNumber}
                                        maxLength={10}
                                        onChange={(e: any) => {
                                            handlePremiumSupportDataChanges(e.target.value, "phoneNumber");
                                        }}
                                    />
                                </div>

                                <div className="mb-3">
                                    <RdsTextArea
                                        isRequired
                                        label="Message"
                                        labelPosition="top"
                                        placeholder="Enter your extra message about your invoice"
                                        rows={3}
                                        reset={inputReset}
                                        value={premiumSupportData?.message}
                                        onChange={(e: any) => {
                                            handlePremiumSupportDataChanges(e.target.value, "message");
                                        }}
                                    />
                                </div>

                            </form>
                        </div>
                        <div className="d-flex flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row d-flex gap-2">
                            <RdsButton
                                class="me-2"
                                tooltipTitle={""}
                                type={"button"}
                                label="CANCEL"
                                colorVariant="outline-primary"
                                size="small"
                                databsdismiss="offcanvas"
                                onClick={onClickCancel}
                            ></RdsButton>
                            <RdsButton
                                class="me-2"
                                label="SEND"
                                showLoadingSpinner={true}
                                size="small"
                                colorVariant="primary"
                                tooltipTitle={""}
                                type={"submit"}
                                databsdismiss="offcanvas"
                                isDisabled={!premiumSupportData.phoneNumber || !premiumSupportData.message}
                                onClick={(e: any) => emitSaveData(e)}
                            ></RdsButton>
                        </div>
                    </RdsOffcanvas>

                </div>

            </div>
        </section>
    </>);
};

export default RdsCompPremiumSupport;