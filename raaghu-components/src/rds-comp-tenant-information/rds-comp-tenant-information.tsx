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
    setPasswordField: any;
}
const RdsCompTenantInformation = (props: rdsCompTenantInformationProps) => {
    const [tenantInformationData, setTenantInformationData] = useState(props.tenantInfoData);
    const [inputReset, setInputReset] = useState(false);
    const [radioItemList, setRadioItemList] = useState<any>([]);
    const [passwordField, setPasswordField] = useState(props.setPasswordField);
     const [errors, setErrors] = useState({
        adminPassword: "",   
      });
      const [error, setError] = useState<{ databaseURL: string | null }>({ databaseURL: null });
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

    const isNewPassValid = (password: string) => {
        const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
        return pattern.test(password);
      };

    const [isPasswordTouched, setIsPasswordTouched] = useState(false);

    const handleDataChange = (value: any, key: string) => {
        let errorMessage = "";
    
        if (key === "adminPassword") {
            if (!isNewPassValid(value)) {
                errorMessage = "Please Enter Valid Password length should be at least 8 characters(Alphanumeric)";
            }
        }
    
        setErrors({ ...errors, [key]: errorMessage });
        setTenantInformationData({ ...tenantInformationData, [key]: value });
    };

    const isValidDatabaseURL = (url: string) => {
        const pattern = /^(?:[a-zA-Z][a-zA-Z\d+\-.]*):\/\/(?:[^\s:@]+(?::[^\s:@]*)?@)?(?:[a-zA-Z\d\-._~%!$&'()*+,;=]+|\[[a-fA-F\d:]+\])(?::\d+)?(?:\/[^\s]*)?$/;
        const domainWithTLDPattern = /^[a-zA-Z\d-]+(\.[a-zA-Z\d-]+)+$/; 
        try {
            const urlObject = new URL(url); 
            return (
                pattern.test(url) &&
                domainWithTLDPattern.test(urlObject.hostname) 
            );
        } catch (e) {
            return false; 
        }
    };
    
    function handleDatabaseURL(value: string) {
        setTenantInformationData((prevData: any) => ({
            ...prevData,
            connectionStrings: {
                ...(prevData?.connectionStrings ?? { default: "" }),
                default: value,
            },
        }));
    
        if (!value.trim()) {
            setError((prevError) => ({
                ...prevError,
                databaseURL: "Database URL cannot be empty",
            }));
        } else if (!isValidDatabaseURL(value)) {
            setError((prevError) => ({
                ...prevError,
                databaseURL:
                    "Please enter a valid database URL",
            }));
        } else {
            setError((prevError) => ({ ...prevError, databaseURL: null })); 
        }
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

    function emitSaveData(event: any) {
        event.preventDefault();
        props.onSaveHandler && props.onSaveHandler(tenantInformationData);
        setInputReset(!inputReset);
        setTenantInformationData({
            ...tenantInformationData,
            name: "",
            editions: "", 
            adminEmailAddress: "",
            adminPassword: "",
            activationState: "", 
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
                                    name="Name"
                                    label={true}
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
                                    key={`edition-${tenantInformationData?.editions}`}
                                    isSearchable={true}
                                    required={false}
                                    selectedValue={tenantInformationData?.editions}
                                    onChange={(item: any) => {handleDataChanges(item.value,"editions"); }}                                  
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
                                        name="Admin Email"
                                        label={true}
                                        placeholder="Enter Email"                                        
                                        value={tenantInformationData?.adminEmailAddress}
                                        id="email"
                                        onChange={(e: any) => {
                                            handleDataChanges(e.target.value, "adminEmailAddress");
                                        }}
                                        validatonPattern={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i}
                                        validationMsg="Please Enter Valid Email Address"
                                    ></RdsInput>
                                </div>
                            </div>
                            <div className="col-md-6 mb-2">
                                <div className="form-group">
                                <RdsInput
                                reset={inputReset}
                                required={true}
                                name="Password"
                                label={true}
                                placeholder="Enter Password"
                                inputType="password"                                
                                id={(errors.adminPassword && tenantInformationData?.adminPassword) ? "passwordfield" : "adminPassword"}
                                onBlur={() => setIsPasswordTouched(true)}
                                value={tenantInformationData?.adminPassword}
                                onChange={(e: any) => handleDataChange(e.target.value, "adminPassword")}
                                dataTestId="password"
                                showIcon={true}
                                />
                               {errors.adminPassword && tenantInformationData?.adminPassword && (
                               <div className="form-control-feedback">
                                 <span className="text-danger">{errors.adminPassword}</span>
                               </div>
                               )}
                                </div>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-8">
                                <RdsLabel
                                    label="Connection Strings"
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
                                        />
                                       {error.databaseURL && (
                                       <div className="form-control-feedback">
                                       <span className="text-danger">{error.databaseURL}</span>
                                       </div>
                                       )}
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 mb-3">
                                        <RdsCheckbox
                                            labelText="Use Module Specific Database Connection String"
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
                                    key={`activationstate-${tenantInformationData?.activationState}`}
                                    selectedValue={tenantInformationData?.activationState}
                                    onChange={(e: any) => handleDataChanges(e.value, "activationState")}
                                    required={true}
                                ></RdsSelectList>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div className="d-flex flex-column-reverse ps-4 flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3 p-4">
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