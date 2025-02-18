import React, { useEffect, useState } from "react";
import { RdsButton, RdsInput } from "../rds-elements";

export interface RdsLinkedAccountProps {
    linkedAccountData?: any;
    onSaveHandler?: (data: any) => void;
    reset?: boolean;
 }

const RdsCompLinkedAccount = (props: RdsLinkedAccountProps) => {
  
    const [userData, setUserData] = useState(props.linkedAccountData);
    const [inputReset, setInputReset] = useState(false);
        
    useEffect(() => {
        setUserData(props.linkedAccountData);
    }, [props.linkedAccountData]);

    useEffect(() => {
        setInputReset(!inputReset);
    }, [props.reset]);

    const handleDataChanges = (value: any, key: string) => {
        setUserData({ ...userData, [key]: value });
      };

      function emitSaveData(event: any) {
        event.preventDefault();
        props.onSaveHandler && props.onSaveHandler(userData);
        setInputReset(!inputReset);
        setUserData({
        tenancyName: "",
        userName: "",
        password: ""
      });
      }
      
    const [page, setPage] = useState(false);
    const onClickHandler = () => {
        setPage((prev) => !prev);
    };
    const isTenancyNameValid = (tenancyName: any) => {
        if (!tenancyName || tenancyName.length === 0) {
            return false;
        }
        return true;
    };
    const isUserNameValid = (userName: any) => {
        if (!userName || userName.length === 0) {
            return false;
        }
        return true;
    };
    const isPasswordValid = (password: any) => {
        if (!password || password.length === 0) {
            return false;
        }
        return true;
    }
const isFormValid = isTenancyNameValid(userData?.tenancyName) && isUserNameValid(userData?.userName) && isPasswordValid(userData?.password);
    return (
        <>
            <div className="row px-0">
                <div className="container-fluid">
                    <div className="d-flex">
                        {!page && (
                            <RdsButton
                                type="button"
                                icon="plus"
                                colorVariant="primary"
                                label="Link New Account"
                                iconFill={false}
                                iconStroke={true}
                                iconHeight="12px"
                                iconWidth="12px"
                                size="small"
                                iconColorVariant="light"
                                onClick={onClickHandler}
                                dataTestId="link-new-account"
                            ></RdsButton>
                        )}
                    </div>
                    {page && (
                        <form>
                            <div className="custom-content-scroll">
                            <div className="row">
                                <div className="col-12 col-lg-4 col-xl-4 col-xxl-4 mb-2">
                                    <RdsInput
                                        inputType="text"
                                        label="Tenancy Name"
                                        placeholder="Enter Tenancy Name"
                                        required={true}
                                        size="medium"
                                        name="tenancyName"
                                        dataTestId="tenancy-name"
                                        onChange={(e) => {
                                          handleDataChanges(e.target.value, "tenancyName");
                                        }}
                                        value={userData?.tenancyName}
                                        reset={inputReset}
                                    ></RdsInput>
                                </div>
                                <div className="col-12 col-lg-4 col-xl-4 col-xxl-4 mb-2">
                                    <RdsInput
                                        inputType="text"
                                        label="User Name"
                                        placeholder="Enter User Name"
                                        required={true}
                                        size="medium"
                                        name="userName"
                                        dataTestId="username"
                                        onChange={(e) => {
                                          handleDataChanges(e.target.value, "userName");
                                        }}
                                        value={userData?.userName}
                                        reset={inputReset}
                                    ></RdsInput>
                                </div>
                                <div className="col-12 col-lg-4 col-xl-4 col-xxl-4 mb-2">
                                    <RdsInput
                                        inputType="password"
                                        label="Password"
                                        placeholder="Enter Password"
                                        required={true}
                                        size="medium"
                                        name="password"
                                        dataTestId="password"
                                        showIcon= {false}
                                        onChange={(e) => {
                                          handleDataChanges(e.target.value, "password");
                                        }}
                                        value={userData?.password}
                                        reset={inputReset}
                                    ></RdsInput>
                                </div>
                           
                            </div>
                            </div>
                            <div className="d-flex flex-column-reverse flex-lg-row ps-4 flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3">
                                
                                    <RdsButton 
                                        type="button" 
                                        isOutline={true}
                                        colorVariant="primary"
                                        label="Cancel"
                                        size="small"
                                        onClick={onClickHandler}
                                        dataTestId="cancel"
                                    ></RdsButton>                                  
                                
            
                                    <RdsButton
                                        type="submit"
                                        isOutline={false}
                                        colorVariant="primary"
                                        label="Save"
                                        size="small"
                                        dataTestId="submit"
                                        onClick={(e: any) => emitSaveData(e)}
                                        isDisabled={!isFormValid}
                                    ></RdsButton>
                            </div>
                            
                        </form>
                    )}
                </div>
            </div>

        </>
    );
};

export default RdsCompLinkedAccount;
