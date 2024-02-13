import React, { useEffect, useState } from "react";
import { RdsInput } from "../rds-elements";
import { useTranslation } from "react-i18next";

interface RdsCompUrlForwardingsProps {
    urlForwardingData?: any
    emitUrlForwardingData?: any
    isEdit?: boolean;
    reset?: boolean;
}

function RdsCompUrlForwardings(props: RdsCompUrlForwardingsProps) {
    const { t } = useTranslation();

    const [inputReset, setInputReset] = useState(props.reset)

    useEffect(() => {
        setInputReset(props.reset)
    }, [props.reset])


    const [formData, setFormData] = useState(props.urlForwardingData);

    useEffect(() => {

        setFormData(props.urlForwardingData);
    }, [props.urlForwardingData]);

    function handleSource(data: any) {
        setFormData((prev: any) => ({ ...prev, source: data }));
        props.emitUrlForwardingData({ ...formData, source: data });
    }
    function handleTarget(data: any) {
        setFormData((prev: any) => ({ ...prev, target: data }));
        props.emitUrlForwardingData({ ...formData, target: data });
    }
    return (
        <>
            <div className="tab-content">

                <div className="form-group mb-3">
                    <RdsInput
                        inputType="text"
                        label={t("CmsKit.Source") || ""}
                        placeholder={t("Enter Source") || ""}
                        required={true}
                        value={formData.source}
                        onChange={(e: any) => { handleSource(e.target.value); }}
                        dataTestId="source"
                        isDisabled={props.isEdit || false}
                        reset={inputReset}
                    ></RdsInput>
                    <small className="text-muted-300 ms-2" >{t("CmsKit.UrlForwarding:EnsureTheUrlIsStartingWithSlash") || ""}</small>
                </div>

                <div className="form-group mb-3">
                    <RdsInput
                        inputType="text"
                        label={t("CmsKit.Target") || ""}
                        placeholder={t("Enter Target") || ""}
                        required={true}
                        onChange={(e: any) => { handleTarget(e.target.value); }}
                        value={formData.target}
                        dataTestId="target"
                        reset={inputReset}
                    ></RdsInput>
                    <small className="text-muted-300 ms-2" >{t("CmsKit.UrlForwarding:EnsureTheUrlIsStartingWithSlashIfSameDomain") || ""}</small>
                </div>	</div>

        </>
    );
}

export default RdsCompUrlForwardings;