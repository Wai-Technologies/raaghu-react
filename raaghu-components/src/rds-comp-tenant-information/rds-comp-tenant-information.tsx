import { RdsCheckbox, RdsDropdownList, RdsLabel } from "../rds-elements";
import React, { useState, useEffect } from "react";
import {
    RdsInput,
    RdsSelectList,
    RdsButton,
    RdsRadioButton, RdsTextArea
} from "../rds-elements";
import { useTranslation } from "react-i18next";

export interface Edition {
    option: string;
    value: string;
}
export interface rdsCompTenantInformationProps {
    tenantInfoData: any;
    reset?: boolean;
    editions: any;
    isEdit?: any;
    onSaveHandler?: (data: any) => void
    isModuleSpecificDb?: boolean;
}
const RdsCompTenantInformation = (props: rdsCompTenantInformationProps) => {
    const { t } = useTranslation();
    const [editionList, setEditionList] = useState<any>([]);
    const [tenantInformationData, setTenantInformationData] = useState<any>(props.tenantInfoData);
    const [inputReset, setInputReset] = useState(false);
    const [radioItemList, setRadioItemList] = useState<any>([]);

    const activationStateList = [
        { option: "Active", value: "0" },
        { option: "Active with Limited Time", value: "1" },
        { option: "Inactive", value: "2" },
    ];

    if (radioItemList.length !== 0) {
    }

    useEffect(() => {
        let radioItems;
        if (!props.tenantInfoData?.connectionStrings?.default) {

            radioItems = [{
                id: 1,
                label: t("Shared Database"),
                checked: true,
                name: "radio_button",
            },
            {
                id: 2,
                label: t("Separated Database"),
                checked: false,
                name: "radio_button",
            },
            ]
        }
        else {
            radioItems = [
                {
                    id: 1,
                    label: t("Shared Database"),
                    checked: false,
                    name: "radio_button",
                },
                {
                    id: 2,
                    label: t("Separated Database"),
                    checked: true,
                    name: "radio_button",
                },
            ]
        }
        setRadioItemList(radioItems);
    }, [props.tenantInfoData?.connectionStrings?.default]);

    useEffect(() => {
        setInputReset(!inputReset);
    }, [props.reset]);


    useEffect(() => {
        setTenantInformationData(props.tenantInfoData);
    }, [props.tenantInfoData]);
    useEffect(() => {
        const editionData1: any[] = [];
        props.editions?.map((item: any) => {
            const newItem = {
              option: item.label,
              value: item.val,
            };
            editionData1.push(newItem);
          });
          setEditionList(editionData1);
    }, [props.editions]);

    const isEmailValid = (email: any) => {
        if (!props.isEdit) {
            const urlPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
            return urlPattern.test(email)
        } else return true;

    };

    const isPasswordValid = (password: any) => {
        if (!password || password.length === 0) {
            return false;
        }
        return true;
    };

    const isNameValid = (name: any) => {
        if (!name || name.length === 0) {
            return false;
        }
        return true;
    };

    const isFormValidNew =
        isPasswordValid(tenantInformationData?.adminPassword) &&
        isEmailValid(tenantInformationData.adminEmailAddress) &&
        isNameValid(tenantInformationData?.name);

    const isFormValidEdit = isNameValid(tenantInformationData?.name);

    const isFormValid = props.isEdit == true ? isFormValidEdit : isFormValidNew;

    const handleDataChanges = (value: any, key: string) => {
        setTenantInformationData({ ...tenantInformationData, [key]: value });
    }

    function handleConnectionStrings(event: any) {
        const updatedRadioItems = radioItemList?.map((item: any) => ({
            ...item,
            checked: item.id == event.target.id,
        }));
        setRadioItemList(updatedRadioItems);
        if (event.target.value !== "Separated Database") {
            setTenantInformationData({
                ...tenantInformationData,
                connectionStrings: { ...tenantInformationData.connectionStrings, default: "" },
            });
        }
    }

    function handleDatabaseURL(value: any) {
        setTenantInformationData({
            ...tenantInformationData,
            connectionStrings: {
                ...tenantInformationData.connectionStrings,
                default: value
            },
        });
    }

    function emitSaveData(event: any) {
        event.preventDefault();
        props.onSaveHandler && props.onSaveHandler(tenantInformationData);
    }
    return (
        <div>
            <div className="tab-content">
                <form>
                    <div className="row flex-lg-row flex-md-row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <RdsInput
                                    reset={inputReset}
                                    inputType="text"
                                    required={true}
                                    label={t("Saas.Name") || ""}
                                    value={tenantInformationData?.name}
                                    placeholder={t("Enter Tenant Name") || ""}
                                    onChange={(e) => {
                                        handleDataChanges(e.target.value, "name");
                                    }}
                                ></RdsInput>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <RdsSelectList
                                    id={"saasEditionlist"}
                                    label={t("Saas.Edition") || ""}
                                    placeholder={t("Select Edition") || ""}
                                    selectItems={editionList}
                                    isSearchable={true}
                                    required={false}
                                    selectedValue={tenantInformationData?.editionId}
                                    onChange={(item: any) => handleDataChanges(item.value, "editionId")}
                                ></RdsSelectList>
                            </div>
                        </div>
                    </div>
                    {!props.isEdit && (<>
                        <div className="my-2">
                            <label className="fw-bold" htmlFor="Admin details">{t("Admin Details")}</label>
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-2 cursor-pointer">
                                <div className="form-group">
                                    <RdsInput
                                        reset={inputReset}
                                        required={true}
                                        inputType="email"
                                        label={t("Admin Email") || ""}
                                        placeholder={t("Enter Email") || ""}
                                        name="email"
                                        value={tenantInformationData?.adminEmailAddress}
                                        id="email"
                                        onChange={(e: any) => {
                                            handleDataChanges(e.target.value, "adminEmailAddress");
                                        }}
                                        validatonPattern={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i}
                                        validationMsg={t("AbpValidation.ThisFieldIsNotAValidEmailAddress.") || ''}
                                    ></RdsInput>
                                </div>
                            </div>
                            <div className="col-md-6 mb-2">
                                <div className="form-group">
                                    <RdsInput
                                        reset={inputReset}
                                        required={true}
                                        label={t("Saas.Password") || ""}
                                        placeholder={t("Enter Password") || ""}
                                        inputType="password"
                                        name="adminPassword"
                                        id="adminPassword"
                                        value={tenantInformationData?.adminPassword}
                                        onChange={(e: any) => {
                                            handleDataChanges(e.target.value, "adminPassword");
                                        }}
                                        showIcon={true}
                                    ></RdsInput>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-8">
                                <RdsLabel
                                    label={t("Saas.ConnectionStrings") || ""}
                                    required={true}
                                />
                                <div className="form-group mt-2">
                                    <RdsRadioButton
                                        displayType="Horizontal"
                                        label=""
                                        itemList={radioItemList}
                                        onClick={handleConnectionStrings}
                                    ></RdsRadioButton>
                                </div>
                            </div>
                        </div>
                        {radioItemList.length !== 0 && radioItemList[1].checked && (
                            <>
                                <div className="row">
                                    <div className="col-md-12 mb-3">
                                        <div className="form-group">
                                            <RdsTextArea
                                                label={t("Database URL") || ""}
                                                placeholder={t("Enter URL") || ""}
                                                onChange={(e: any) => {
                                                    handleDatabaseURL(e.target.value);
                                                }}
                                                rows={2}
                                                value={tenantInformationData?.connectionStrings.default}
                                                dataTestId="data"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 mb-3">
                                        <RdsCheckbox
                                            label={t("Use Module Specific Database Connection String") || ""}
                                            checked={tenantInformationData?.isModuleSpecificDb}
                                            onChange={(e) => {
                                                handleDataChanges(e.target.checked, "isModuleSpecificDb");
                                            }}
                                        ></RdsCheckbox>
                                    </div>
                                </div>
                            </>
                        )} </>)}
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group text-capitalize mb-3">
                                <RdsSelectList
                                    id={"saasActivelist"}
                                    label={t("Saas.ActivationState") || ""}
                                    placeholder={t("Select Activation State") || ""}
                                    selectItems={activationStateList}
                                    selectedValue={tenantInformationData?.activationState?.toString() || ""}
                                    onChange={(item: any) => handleDataChanges(parseInt(item.value), "activationState")}
                                    required={true}
                                ></RdsSelectList>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex pb-3 flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row footer-buttons gap-2">
                        <RdsButton
                            class="me-2"
                            tooltipTitle={""}
                            type={"button"}
                            label={t("AbpUi.Cancel") || ""}
                            colorVariant="outline-primary"
                            size="small"
                            databsdismiss="offcanvas"
                        ></RdsButton>
                        <RdsButton
                            class="me-2"
                            label={t("AbpUi.Save") || ""}
                            size="small"
                            isDisabled={!isFormValid}
                            colorVariant="primary"
                            tooltipTitle={""}
                            type={"submit"}
                            databsdismiss="offcanvas"
                            onClick={(e: any) => emitSaveData(e)}
                        ></RdsButton>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RdsCompTenantInformation;