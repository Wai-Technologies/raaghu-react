import React from "react";
import { RdsTextArea, RdsButton, } from "../rds-elements";
import { useTranslation } from "react-i18next";

export interface RdsCompEditLanguageTextProps { }

const RdsCompEditLanguageText = (props: RdsCompEditLanguageTextProps) => {
    const { t } = useTranslation();
    return (
        <div>
            <form>
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
                {/* <div className="row">
                    <div className="col-2">
                        <RdsButton
                            label={t("Cancel") || ""}
                            colorVariant="primary"
                            block={false}
                            tooltipTitle={""}
                            type="submit"
                            isOutline={true}
                            dataTestId="cancel"
                        />
                    </div>
                    <div className="col-2">
                        <RdsButton
                            label={t("Save") || ""}
                            colorVariant="primary"
                            block={false}
                            tooltipTitle={""}
                            type="submit"
                            dataTestId="save"
                        />
                    </div>
                </div> */}
              <div className="mt-3 d-flex pb-3 flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row footer-buttons gap-2">
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
