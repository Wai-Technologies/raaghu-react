import React from "react";
import { RdsTextArea, RdsButton, } from "../rds-elements";
import { useTranslation } from "react-i18next";

export interface RdsCompEditLanguageTextProps { }

const RdsCompEditLanguageText = (props: RdsCompEditLanguageTextProps) => {
    const { t } = useTranslation();
    return (
        <div>
            <form>
                <div className="custom-content-scroll">
                    <div className="mb-4">
                        <RdsTextArea
                            label="Base Language"
                            placeholder="Enter Base Value"
                            isDisabled={true}
                            dataTestId="base-language"
                        ></RdsTextArea>
                    </div>
                    <div className="mb-4">
                        <RdsTextArea
                            label="Target Language"
                            placeholder="Enter Target Language"
                            dataTestId="target-language"
                        ></RdsTextArea>
                    </div>
                </div>
                <div className="d-flex flex-column-reverse flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3">
                    <RdsButton
                        class="me-2"
                        tooltipTitle={""}
                        type={"button"}
                        label="Cancel"
                        colorVariant="outline-primary"
                        size="small"
                        databsdismiss="offcanvas"
                        dataTestId="cancel"
                    ></RdsButton>
                    <RdsButton
                        class="me-2"
                        label="Save"
                        size="small"
                        colorVariant="primary"
                        tooltipTitle={""}
                        type={"submit"}
                        databsdismiss="offcanvas"
                        isDisabled={false}
                        dataTestId="save"
                    ></RdsButton>
                </div>
            </form>
        </div>
    );
};

export default RdsCompEditLanguageText;
