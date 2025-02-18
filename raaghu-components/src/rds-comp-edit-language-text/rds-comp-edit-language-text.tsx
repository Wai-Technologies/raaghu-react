import React, { useEffect, useState } from "react";
import { RdsTextArea, RdsButton } from "../rds-elements";
import { useTranslation } from "react-i18next";

export interface RdsCompEditLanguageTextProps {
    formData?: any;
    onSaveHandler?: (data: any) => void;
}

const RdsCompEditLanguageText = (props: RdsCompEditLanguageTextProps) => {
    const [formData, setFormData] = useState(props.formData);

    useEffect(() => {
        setFormData(props.formData);
    }, [props.formData]);

    const handleDataChanges = (value: any, key: string) => {
        setFormData({ ...formData, [key]: value });
    };

    function emitSaveData(event: any) {
        event.preventDefault();
        props.onSaveHandler && props.onSaveHandler(formData);
        setFormData({ 
            baseLanguage: "", 
            targetLanguage: "" 
        });
    }

    const { t } = useTranslation();
    return (
        <div>
            <form>
                <div className="custom-content-scroll">
                <div className="mb-4">
                    <RdsTextArea
                        label="Base Language"
                        placeholder="Enter Base Value"
                        value={formData?.baseLanguage}
                        onChange={(e) => handleDataChanges(e.target.value, "baseLanguage")}
                        isDisabled={true}
                        dataTestId="base-language"
                    ></RdsTextArea>
                </div>
                <div className="mb-4">
                    <RdsTextArea
                        label="Target Language"
                        value={formData?.targetLanguage}
                        onChange={(e) => handleDataChanges(e.target.value, "targetLanguage")}
                        placeholder="Enter Target Language"
                        dataTestId="target-language"
                    ></RdsTextArea>
                </div>
                </div>
                <div className="mt-3 d-flex pb-3 ps-4 flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row footer-buttons gap-2 p-4">
                    <RdsButton
                        tooltipTitle={""}
                        type={"button"}
                        label="Cancel"
                        colorVariant="outline-primary"
                        size="small"
                        data-bs-dismiss="offcanvas"
                        dataTestId="cancel"
                    />
                    <RdsButton
                        label="Save"
                        size="small"
                        colorVariant="primary"
                        tooltipTitle={""}
                        type={"submit"}
                        data-bs-dismiss="offcanvas"
                        isDisabled={false}
                        onClick={(e: any) => emitSaveData(e)}
                        dataTestId="save"
                    />
                </div>
            </form>
        </div>
    );
};

export default RdsCompEditLanguageText;
