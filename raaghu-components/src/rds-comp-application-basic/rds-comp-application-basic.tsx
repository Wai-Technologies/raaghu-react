import React, { useEffect, useState } from "react";
import { RdsInput } from "../rds-elements";
import { useTranslation } from "react-i18next";

export interface RdsCompApplicationBasicProps {
    basicData?: any;
    reset?: boolean
    editApplicationData?: any;
}

const RdsCompApplicationBasic = (props: RdsCompApplicationBasicProps) => {
    const { t } = useTranslation();
    const [inputReset, setInputReset] = useState(props.reset)
    const [basicApplicationData, setBasicApplicationData] = useState<any>(props.basicData);

    useEffect(() => {
        setBasicApplicationData(props.basicData);
    }, [props.basicData]);

    useEffect(() => {
        setInputReset(props.reset)
    }, [props.reset])

    const handlerInputChange = (value: any, key: any) => {
        setBasicApplicationData({ ...basicApplicationData, [key]: value });
        props.editApplicationData && props.editApplicationData({ ...basicApplicationData, [key]: value });
    }

    return (
        <> <div>
            <div className="tab-content pt-3">
                <form>
                    <div className="">
                        <div className="row">
                            <div className="col-12 col-6 col-lg-6 col-md-6 col-xl-6 col-xxl-6">
                                <RdsInput
                                    reset={inputReset}
                                    label={t("AbpOpenIddict.ClientId") || ""}
                                    placeholder={t("Enter Client Id") || ""}
                                    inputType="text"
                                    onChange={(e: any) => handlerInputChange(e.target.value, "clientId")}
                                    value={basicApplicationData.clientId}
                                    required={true}
                                ></RdsInput>
                            </div>
                            <div className="col-12 col-6 col-lg-6 col-md-6 col-xl-6 col-xxl-6">
                                <RdsInput
                                    reset={inputReset}
                                    required={true}
                                    label={t("AbpOpenIddict.DisplayName") || ""}
                                    placeholder={t("Enter Display Name") || ""}
                                    inputType="text"
                                    onChange={e => handlerInputChange(e.target.value, "displayName")}
                                    value={basicApplicationData.displayName}
                                ></RdsInput>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-6 col-lg-6 col-md-6 col-xl4 col-xxl-6 mb-3">
                                <RdsInput
                                    reset={inputReset}
                                    label={t("AbpOpenIddict.ClientUri") || ""}
                                    placeholder={t("Enter Client Uri") || ""}
                                    inputType="url"
                                    validatonPattern={/^(ftp|http|https):\/\/[^ "]+$/}
                                    validationMsg={t("AbpValidation.ThisFieldIsNotAValidFullyQualifiedHttpHttpsOrFtpUrl") || ''}
                                    onChange={e => handlerInputChange(e.target.value, "clientUri")}
                                    value={basicApplicationData.clientUri}
                                    required={false}
                                ></RdsInput>
                            </div>
                            <div className="col-12 col-6 col-lg-6 col-md-6 col-xl4 col-xxl-6 mb-3">
                                <RdsInput
                                    reset={inputReset}
                                    label={t("AbpOpenIddict.LogoUri") || ""}
                                    placeholder={t("Enter Logo Uri") || ""}
                                    inputType="url"
                                    validatonPattern={/^(ftp|http|https):\/\/[^ "]+$/}
                                    validationMsg={t("AbpValidation.ThisFieldIsNotAValidFullyQualifiedHttpHttpsOrFtpUrl") || ''}
                                    onChange={e => handlerInputChange(e.target.value, "logoUri")}
                                    value={basicApplicationData.logoUri}
                                    required={false}
                                ></RdsInput>
                            </div>
                        </div>

                    </div>
                </form>
            </div>
        </div>
        </>
    );
};
export default RdsCompApplicationBasic;