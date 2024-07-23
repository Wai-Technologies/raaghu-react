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
    const [tenantInformationData, setTenantInformationData] = useState(props.tenantInfoData);
    const [inputReset, setInputReset] = useState(false);
    const [radioItemList, setRadioItemList] = useState<any>([]);

    const activationStateList = [
        { option: "Active", value: "0" },
        { option: "Active with Limited Time", value: "1" },
        { option: "Inactive", value: "2" },
    ];

    useEffect(() => {
        setTenantInformationData(props.tenantInfoData);        
    },[props.tenantInfoData]);

    useEffect(() => {
        let radioItems;
        if (!props.tenantInfoData?.connectionStrings?.default) {

            radioItems = [{
                id: 1,
                label: "Shared Database",
                checked: true,
                name: "radio_button",
            },
            {
                id: 2,
                label: "Separated Database",
                checked: false,
                name: "radio_button",
            },
            ]
        }
        else {
            radioItems = [
                {
                    id: 1,
                    label: "Shared Database",
                    checked: false,
                    name: "radio_button",
                },
                {
                    id: 2,
                    label: "Separated Database",
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
        setInputReset(!inputReset);
        setTenantInformationData({
            ...tenantInformationData,
            name: "",
            editionId: null, 
            adminEmailAddress: "",
            adminPassword: "",
            activationState: null, 
            connectionStrings: { default: "" },
            isModuleSpecificDb: false,
            radioItemList : []
        });
        const resetRadioItems = radioItemList?.map((item: any) => ({
            ...item,
            checked: false,
        }));
        setRadioItemList(resetRadioItems);
    }
    return (
        <div>
            <div className="tab-content">
                <form>
                <div className="custom-content-scroll">
                    <div className="row flex-lg-row flex-md-row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <RdsInput
                                    reset={inputReset}
                                    inputType="text"
                                    required={true}
                                    label="Name"
                                    value={tenantInformationData?.name}
                                    placeholder="Enter Tenant Name"
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
                                    label="Edition"
                                    placeholder="Select Edition"
                                    selectItems={props.editions}
                                    isSearchable={true}
                                    required={false}
                                    selectedValue={tenantInformationData?.editionId}
                                    onChange={(e:any) => handleDataChanges(e, "editionId")}
                                ></RdsSelectList>
                            </div>
                        </div>
                    </div>
                    {!props.isEdit && (<>
                        <div className="my-2">
                            <label className="fw-bold" htmlFor="Admin details">Admin Details</label>
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-2 cursor-pointer">
                                <div className="form-group">
                                    <RdsInput
                                        reset={inputReset}
                                        required={true}
                                        inputType="email"
                                        label="Admin Email"
                                        placeholder="Enter Email"
                                        name="email"
                                        value={tenantInformationData?.adminEmailAddress}
                                        id="email"
                                        onChange={(e: any) => {
                                            handleDataChanges(e.target.value, "adminEmailAddress");
                                        }}
                                        validatonPattern={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i}
                                        validationMsg="Please Enter Valid Email Address."
                                    ></RdsInput>
                                </div>
                            </div>
                            <div className="col-md-6 mb-2">
                                <div className="form-group">
                                    <RdsInput
                                        reset={inputReset}
                                        required={true}
                                        label="Password"
                                        placeholder="Enter Password"
                                        inputType="password"
                                        name="adminPassword"
                                        id="adminPassword"
                                        value={tenantInformationData?.adminPassword}
                                        onChange={(e: any) => {
                                            handleDataChanges(e.target.value, "adminPassword");
                                        }}
                                        showIcon={false}
                                    ></RdsInput>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-8">
                                <RdsLabel
                                    label="ConnectionStrings"
                                    required={true}
                                />
                                <div className="form-group mt-2">
                                    <RdsRadioButton
                                            displayType="Horizontal"
                                            label=""
                                            itemList={radioItemList}
                                            onClick={handleConnectionStrings}
                                            onChange={(e: any) => handleDataChanges(e.target.value, "radioItemList")} value={""}                                    ></RdsRadioButton>
                                </div>
                            </div>
                        </div>
                        {radioItemList.length !== 0 && radioItemList[1].checked && (
                            <>
                                <div className="row">
                                    <div className="col-md-12 mb-3">
                                        <div className="form-group">
                                            <RdsTextArea
                                                label="Database URL"
                                                placeholder="Enter URL"
                                                onChange={(e: any) => {
                                                    handleDatabaseURL(e.target.value);
                                                }}
                                                rows={2}
                                                value={tenantInformationData?.connectionStrings?.default}
                                                dataTestId="data"
                                                reset={inputReset}
                                                 validatonPattern={/^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/}
                                                 validationMsg="Enter valid url"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 mb-3">
                                        <RdsCheckbox
                                            label="Use Module Specific Database Connection String"
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
                                    label="Activation State"
                                    placeholder="Select Activation State"
                                    selectItems={activationStateList}
                                    selectedValue={tenantInformationData?.activationState}
                                    onChange={(e: any) => handleDataChanges(e.value, "activationState")}
                                    required={true}
                                ></RdsSelectList>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div className="d-flex flex-column-reverse ps-4 flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3">
                       <RdsButton
                            class="me-2"
                            tooltipTitle={""}
                            type={"button"}
                            label="Cancel"
                            colorVariant="outline-primary"
                            size="small"
                            databsdismiss="offcanvas"
                        ></RdsButton>
                        <RdsButton
                            class="me-2"
                            label="Save"
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