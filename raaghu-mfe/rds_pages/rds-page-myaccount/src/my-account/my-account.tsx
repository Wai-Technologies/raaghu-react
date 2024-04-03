import React, { useEffect, useState } from "react";
import { RdsAlert, RdsButton, RdsCheckbox, RdsLabel, RdsNavtabs } from "../../../rds-elements";
import { RdsCompChangePassword, RdsCompPersonalInfo, RdsCompProfilePicture } from "../../../rds-components";
import { useAppDispatch, useAppSelector } from "../../../../libs/state-management/hooks";
import { changepasswordProfile, fetchMyProfile, getProfilePicture, saveMyProfile, sendEmailVerifyProfile, setProfilePicture, setTwoFactorEnabled } from "../../../../libs/state-management/my-account/my-account-slice";
import { useTranslation } from "react-i18next";

const MyAccount = (props: any) => {
    const { t } = useTranslation();
    const [activeNavTabId, setActiveNavTabId] = useState("0");
    const data = useAppSelector((state) => state.persistedReducer.myaccount);
    const [twoFactorData, setFormData] = useState(false);

    const navtabsItems = [
        { label: t("AbpAccount.ProfileTab:Picture"), tablink: "#nav-profile_picture", id: "0" },
        { label: t("AbpAccount.ProfileTab:Password"), tablink: "#nav-change_password", id: "1" },
        { label: t("AbpAccount.ProfileTab:PersonalInfo"), tablink: "#nav-personal_info", id: "2" },
        { label: t("AbpAccount.ProfileTab:TwoFactor"), tablink: "#nav-two_Factor", id: "3" },
    ];
    const [Alert, setAlert] = useState({ show: false, message: "", color: "" });
    const [changePasswordData, setchangePassword] = useState<any>({
        currentPassword: "",
        newPassword: "",
        newPasswordConfirm: ""
    });

    const [personalInfo, setpersonalInfo] = useState<any>({
        userName: "",
        name: "",
        surname: "",
        email: "",
        phoneNumber: ""
    });

    const [profilePicture, setPicture] = useState<any>({
        type: 0,
    });
    const [profileType, setProfileType] = useState<any>(0)
    const [convertedImage, setConvertedImage] = useState<any>();

    const dispatch = useAppDispatch();

    function handlePasswordDataSubmit(formData: any) {
        dispatch(changepasswordProfile(formData) as any).then((res: any) => {
            if (res.type == "my-account/myProfile/changepasswordProfile") {
                setAlert({
                    ...Alert,
                    show: true,
                    message: t("Your request has been denied"),
                    color: "danger",
                });
            } else {
                setAlert({
                    ...Alert,
                    show: true,
                    message: t("Password updated successfully"),
                    color: "success",
                });
            }
        });
    }

    function handleTwoFactorSubmit(value: boolean) {
        setFormData(value);
        dispatch(setTwoFactorEnabled(value) as any).then((res: any) => {
            if (res.type == "my-account/myProfile/setTwoFactorEnabled") {
                setAlert({
                    ...Alert,
                    show: true,
                    message: t("Your request has been denied"),
                    color: "danger",
                });
            } else {
                setAlert({
                    ...Alert,
                    show: true,
                    message: t("updated successfully"),
                    color: "success",
                });
            }
        });
    }

    function handlePersonalInfoSubmit(formData: any) {
        dispatch(saveMyProfile(formData) as any).then((res: any) => {
            if (res.type == "my-account/myProfile/saveMyProfile") {
                setAlert({
                    ...Alert,
                    show: true,
                    message: t("Your request has been denied"),
                    color: "danger",
                });
            } else {
                setAlert({
                    ...Alert,
                    show: true,
                    message: t("Profile updated successfully"),
                    color: "success",
                });
            }
        });
    }

    function handleVerifyEmailDataSubmit(email: any) {
        dispatch(sendEmailVerifyProfile(email) as any);
    }

    const [postFile, setPostFile] = useState<any>();

    function submitProfilePic(type: any) {
        if (type == 2) {
            dispatch(setProfilePicture({
                type: type,
                formData: {
                    ImageContent: postFile
                },
            }) as any).then((res: any) => {
                if (res.type == "my-account/myProfile/setProfilePicture") {
                    setAlert({
                        ...Alert,
                        show: true,
                        message: t("Your request has been denied"),
                        color: "danger",
                    });
                } else {
                    setAlert({
                        ...Alert,
                        show: true,
                        message: t("Profile Picture Added Successfully"),
                        color: "success",
                    });
                }
                const id = localStorage.getItem("userId");
                dispatch(getProfilePicture(id) as any);
            });

        } else {
            dispatch(setProfilePicture({
                type: type,
                formData: {
                    ImageContent: ""
                },
            }) as any).then((res: any) => {
                if (res.type == "my-account/myProfile/setProfilePicture") {
                    setAlert({
                        ...Alert,
                        show: true,
                        message: t("Your request has been denied"),
                        color: "danger",
                    });
                } else {
                    setAlert({
                        ...Alert,
                        show: true,
                        message: t("Profile Picture Added Successfully"),
                        color: "success",
                    });
                }
                const id = localStorage.getItem("userId");
                dispatch(getProfilePicture(id) as any);
            });

        }

    }
    useEffect(() => {
        const id = localStorage.getItem("userId");
        dispatch(fetchMyProfile() as any);
        dispatch(getProfilePicture(id) as any);
    }, []);
    function createImageFromBase64(base64String: string): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = `data:image/png;base64,${base64String}`;
            img.addEventListener("load", () => {
                resolve(img);
            });
            img.addEventListener("error", (err) => {
                reject(err);
            });
        });
    }


    useEffect(() => {
        setProfileType(data?.getProfilePicData?.type)
        if (data?.getProfilePicData?.type == 2) {
            if (data?.getProfilePicData) {
                // your Base64-encoded string here

                createImageFromBase64(data.getProfilePicData.fileContent)
                    .then((image) => {
                        // the image has finished loading
                        setConvertedImage(image.src)

                        // you can now use the image object in your code
                    })
                    .catch((err) => {
                        // there was an error loading the image
                        console.error(`Error loading image: ${err}`);
                    });

            }

        }


    }, [data?.getProfilePicData]);

    useEffect(() => {
        if (data?.personalInfo) {
            setpersonalInfo(data.personalInfo);
        }
    }, [data?.personalInfo]);

    useEffect(() => {
        if (data?.changePasswordData) {
            setchangePassword(data.changePasswordData);
        }
    }, [data?.changePasswordData]);

    useEffect(() => {
        if (data?.profilePicture) {
            setPicture(data.profilePicture);
        }
    }, [data?.profilePicture]);

    function dataUrlToBlob(dataUrl: any) {
        const arr = dataUrl.split(",");
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    }


    function postProfilePic(data: File, type: number) {

        fileToBlob(data).then((blob) => {
            setPostFile(blob);
        });
    }

    function fileToBlob(file: File): Promise<Blob> {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = () => {
                const result = reader.result as string;
                const blob = new Blob([result], { type: file.type });
                resolve(blob);
            };
            reader.readAsArrayBuffer(file);
        });
    }
    useEffect(() => {
        // Set a 3-second timer to update the state
        const timer = setTimeout(() => {
            setAlert({ ...Alert, show: false });
        }, 3000);

        // Clean up the timer when the component unmounts or when the state changes
        return () => clearTimeout(timer);
    }, [data]);

    return (
        <div className="container-fluid m-0 p-0 h-100">
            <div className="row h-100">
                <div className="col-md-12">
                    <div className="card border-0 px-4 py-4 rounded-0 card-full-stretch">
                        <div className="card-body position-relative p-0">
                           <div className="col-12 cursor-pointer">
                                <RdsNavtabs
                                    navtabsItems={navtabsItems}
                                    activeNavTabId={activeNavTabId}
                                    type="tabs"
                                    fill={false}
                                    justified={false}
                                    activeNavtabOrder={(activeNavTabId) => {
                                        setActiveNavTabId(activeNavTabId);
                                    }}
                                />
                                <div className="offset-md-4 col-md-4 mt-3 col-12 position-absolute bottom-0 mb-3 position-lg-relative custom-responsive-alert">
                                    {Alert.show && (
                                        <RdsAlert
                                            alertmessage={Alert.message}
                                            size="small"
                                            colorVariant={Alert.color}
                                        ></RdsAlert>
                                    )}
                                </div>
                            </div>
                            {activeNavTabId == "0" && (
                                <RdsCompProfilePicture
                                    handleProfileDataSubmit={submitProfilePic}
                                    postProfilePic={postProfilePic}
                                    profilePictureData={convertedImage}
                                    ProfileType={profileType}
                                    profilePicture={profilePicture}></RdsCompProfilePicture>
                            )}
                            {activeNavTabId == "1" && (
                                <RdsCompChangePassword
                                    handlePasswordDataSubmit={(formData: any) => {
                                        handlePasswordDataSubmit(formData);
                                    }}
                                    changePasswordData={changePasswordData}>
                                </RdsCompChangePassword>
                            )}
                            {activeNavTabId == "2" && (
                                <RdsCompPersonalInfo
                                    handlePersonalDataSubmit={(formData: any) => {
                                        handlePersonalInfoSubmit(formData);
                                    }}
                                    handleVerifyEmailSubmit={(email: any) => {
                                        handleVerifyEmailDataSubmit(email)
                                    }}
                                    personalInfo={personalInfo}></RdsCompPersonalInfo>

                            )}
                            {activeNavTabId == "3" && (
                                <>
                                    <div className="mt-4">
                                        <RdsCheckbox
                                            label={t("AbpAccount.DisplayName:TwoFactorEnabled") || ""}
                                            onChange={(e: any) => { handleTwoFactorSubmit(e.target.checked); }}
                                            checked={twoFactorData}
                                        ></RdsCheckbox>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="mt-3 footer-buttons px-0 flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row d-flex gap-2 bg-transparent">
                                                <RdsButton
                                                    label={t("AbpUi.Save") || ""}
                                                    size="small"
                                                    colorVariant='primary'
                                                    block={false}
                                                    type="submit"
                                                    onClick={() => { handleTwoFactorSubmit(twoFactorData); }}
                                                />
                                            </div></div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyAccount;