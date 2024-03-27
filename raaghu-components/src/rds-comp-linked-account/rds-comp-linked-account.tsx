import React, { useState } from "react";
import { RdsButton, RdsInput } from "../rds-elements";
import { useTranslation } from "react-i18next";

export interface RdsLinkedAccountProps { }

const RdsCompLinkedAccount = (props: RdsLinkedAccountProps) => {
  
    const [userData, setUserData] = useState({
        tenancyName: "",
        userName: "",
        password: "",
    });
    const [page, setPage] = useState(false);
    const onClickHandler = () => {
        setPage((prev) => !prev);
    };

    const onSubmitHandler = (e: any) => {
        e.preventDefault();
        const name = e.target[0].value;
        setUserData({
            ...userData,
            tenancyName: e.target[0].value,
            userName: e.target[1].value,
            password: e.target[2].value,
        });
    };

    return (
        <>
            <div className="card h-100 border-0 px-4 py-4 rounded-0 card-full-stretch">
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
                        <form onSubmit={(e) => onSubmitHandler(e)}>
                            <div className="custom-content-scroll">
                            <div className="row">
                                <div className="col-12 col-lg-4 col-xl-4 col-xxl-4 mb-2">
                                    <RdsInput
                                        inputType="text"
                                        label="Tenancy Name"
                                        placeholder="Tenancy Name"
                                        required={true}
                                        size="medium"
                                        name="tenancyName"
                                        dataTestId="tenancy-name"
                                    ></RdsInput>
                                </div>
                                <div className="col-12 col-lg-4 col-xl-4 col-xxl-4 mb-2">
                                    <RdsInput
                                        inputType="text"
                                        label="User Name"
                                        placeholder="User Name"
                                        required={true}
                                        size="medium"
                                        name="userName"
                                        dataTestId="username"
                                    ></RdsInput>
                                </div>
                                <div className="col-12 col-lg-4 col-xl-4 col-xxl-4 mb-2">
                                    <RdsInput
                                        inputType="password"
                                        label="Password"
                                        placeholder="Password"
                                        required={true}
                                        size="medium"
                                        name="password"
                                        dataTestId="password"
                                        showIcon= {false}
                                    ></RdsInput>
                                </div>
                           
                            </div>
                            </div>
                            <div className="d-flex flex-column-reverse flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3">
                                
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
