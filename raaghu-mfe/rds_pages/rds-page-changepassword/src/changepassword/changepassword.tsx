import React, { useEffect, useState } from "react";
import { RdsCompChangeUserPassword } from "../../../rds-components";
import { useAppDispatch } from "../../../../libs/state-management";
import { useAppSelector } from "../../../../libs/state-management/hooks";
import { getUsersByUsernameRequest, putUsersChangePasswordRequest } from "../../../../libs/state-management/user/user-slice";

export interface ChangePasswordProps { }

const ChangePassword = (props: ChangePasswordProps) => {
    const dispatch = useAppDispatch();
    const data = useAppSelector((state) => state.persistedReducer.user);

    const [loginUser, setLoginUser] = useState<any>();
    const [changePasswordData, setChangePasswordData] = useState<any>({
        currentPassword: "",
        newPassword: "",
        newPasswordConfirm: ""
    });

    useEffect(() => {
        const datahostEmail = localStorage.getItem("datahostEmail");
        if (datahostEmail) {
            dispatch(getUsersByUsernameRequest({ username: datahostEmail }) as any);
        }
    }, [dispatch]);

    useEffect(() => {
        if (data.getUsersByUsername) {
            setLoginUser(data.getUsersByUsername);
        }
    }, [data.getUsersByUsername]);

    function getPasswordDataSubmit(data: any) {
        if (loginUser) {
            const _data = {
                id: loginUser.id,
                requestBody: {
                    newPassword: data.newPassword
                }
            };
            dispatch(putUsersChangePasswordRequest(_data) as any);
        }
        setChangePasswordData({
            currentPassword: "",
            newPassword: "",
            newPasswordConfirm: ""
        });
    }

    return (
        <div className="login-background">
            <div className="align-items-center d-flex justify-content-center vh-100 m-auto login-container">
                <div className="container-fluid m-2">
                    <div className="bg-white row rounded-3 ">
                        <div className="col-md-6 align-items-center justify-content-center login m-auto">
                            <div className="h-100 py-4 px-3">
                                <div className="py-4">
                                    <div className="text-center">
                                        <img src="./assets/raaghu_text_logo.svg"></img>
                                    </div>
                                </div>
                                <RdsCompChangeUserPassword changePasswordData={changePasswordData} PasswordDataSubmit={(data: any) => getPasswordDataSubmit(data)}></RdsCompChangeUserPassword>
                            </div>
                        </div>
                        <div className="col-md-6 order-1 order-sm-2 rounded-end position-relative align-items-center p-0 login-card-height"
                            style={{ backgroundImage: "url(../assets/bg_1.png)", backgroundSize: "cover", backgroundPosition: "bottom", backgroundRepeat: "no-repeat", backgroundColor: "#000;" }}>
                            <video id="myVideo" className="video" autoPlay muted loop>
                                <source src="../assets/Comp1.mp4" type="video/mp4" />
                            </video>
                            <div className="raghu1">
                                <img src="../assets/fg_raaghu.png"></img>
                            </div>
                            <div className="wrap">
                                <div className="c"></div>
                                <div className="c"></div>
                                <div className="c"></div>
                                <div className="c"></div>
                                <div className="c"></div>
                                <div className="c"></div>
                                <div className="c"></div>
                                <div className="c"></div>
                                <div className="c"></div>
                                <div className="c"></div>
                                <div className="c"></div>
                                <div className="c"></div>
                                <div className="c"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
