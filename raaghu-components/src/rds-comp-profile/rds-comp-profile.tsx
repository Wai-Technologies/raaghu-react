import { useEffect, useState } from "react";
import { RdsButton, RdsFileUploader, RdsInput, RdsOffcanvas, RdsRadioButton } from "../rds-elements";
import React from "react";
import "./rds-comp-profile.css";
import RdsCompLinkedAccount from "../rds-comp-linked-account/rds-comp-linked-account";
import { useTranslation } from "react-i18next";
import { RdsOffcanvasBackDrop, RdsOffcanvasPlacement } from "../../../raaghu-elements/src/rds-offcanvas/rds-offcanvas";
import { FileUploaderState, Size } from "../../../raaghu-elements/src/rds-file-uploader/rds-file-uploader";
import RdsCompIcon from "../rds-comp-icon";

export interface RdsCompProfileProps {
    navtabItems: any[];
    profilePic?: string;
    userName: string;
    userEmail: any;
    userRole: string;
    onEditProfile?: (Event: React.MouseEvent<HTMLElement>) => void;
    onLogout?: (Event: React.MouseEvent<HTMLButtonElement>) => void;
    currNavTabId?: (id: any) => void;
    onProfileLink: (id: string, navigateTo?: string) => void;
    backToMyAccount?: any;
    isImpersonation?: boolean
    showUserName?: boolean;
    profile?: string;
    profileEditData?: any;
    onSaveHandler?: (data: any) => void;
    profilePictureData?: any;
    ProfileType?: number;
    postProfilePic?: (file: any, type: number) => void;
    profilePicture?: any;
    onPictureSaveHandler?: (data: any) => void;
    // onClose?: (Event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
}
const RdsCompProfile = (props: RdsCompProfileProps) => {
    const [activetab, setAcivetab] = useState("");
    const [isProfileListClicked, setProfileListClicked] = useState(false);
    const [formData, setFormData] = useState(props.profileEditData);
    const tenantName = localStorage.getItem("name");
    const [hoveredItem, setHoveredItem] = useState("");
    // const navigate = useNavigate();
    const [profilePic, setprofilePic] = useState("./assets/profile-picture-circle.svg");
    const profileList = [
        {
          checked: true,
          id: 0,
          label: "Use Default",
          name: "radio_button",
          type: 0,
        },
        {
          checked: false,
          id: 1,
          label: "Use Gravatar",
          name: "radio_button",
          type: 1,
        },
        {
          checked: false,
          id: 2,
          label: "Upload Files",
          name: "radio_button",
          type: 2,
        },
      ];
      const [formsData, setFormsData] = useState<any>(props.profilePictureData);
      const [avatarImg, setAvatarImg] = useState<any>(props.profilePictureData);
      const [type, setavatarType] = useState(0);
      const [show, setShow] = useState<boolean>(false);
      const [profilepicstypes, setprofilepicstypes] = useState<any>()
      const [firstload, setfirstload] = useState<number>(0);
      const [isExceed, setIsExceed] = useState(false);

      const imagePathradiobutton = "./assets/profile-picture-circle.svg"
        function profileImage(data: any) {
          setfirstload((prev) => (prev + 1))
          if (type == 2) {
            const fileSize = data.files[0].size / 1024; //now size in kb
            //validation
            if (fileSize > 1024) {
              setIsExceed(true);
            } else {
              setIsExceed(false);
            }
            props.postProfilePic && props.postProfilePic(data.files[0], type);
          }
        }
      
        useEffect(() => {
          setFormData(props.profilePictureData);
        }, [props.profilePictureData]);
      
        useEffect(() => {
          if (props.ProfileType == 2 && firstload == 0) {
            setIsExceed(true)
          }
          if (props.ProfileType == 2) {
            setAvatarImg(props.profilePictureData);
          }
          if (props.ProfileType == 1) {
            setAvatarImg("./assets/Avatar-rds-mascot.svg");
          }
          if (props.ProfileType == 0) {
            setAvatarImg("./assets/profile-picture-circle.svg");
          }
          const profilelisttypes = profileList.map((item: any, i: any) => {
            return {
              checked: i == props.ProfileType ? true : false,
              id: i,
              label: item.label,
              name: item.name,
              type: i,
            }
          })
          if (props.ProfileType == 2 && profilelisttypes[2].checked) {
            setShow(true)
          } else {
            setShow(false)
          }
          setprofilepicstypes(profilelisttypes)
        }, [props.profilePictureData, props.ProfileType, props.profilePicture]);
      
      
        const onClickSetProfilePicture = (event: any) => {
          const selectedLabel = event.target.value;
      
          // Update the profilepicstypes array based on the selected label
          const updatedProfilepicstypes = profilepicstypes.map((item: any) => ({
            ...item,
            checked: item.label === selectedLabel,
          }));
      
          setprofilepicstypes(updatedProfilepicstypes);
      
          if (event.target.value == "Use Default") {
            setIsExceed(false)
            setShow(false);
            // alert(0);
            setAvatarImg("./assets/profile-picture-circle.svg");
            setavatarType(0);
            const imagePath = "./assets/profile-picture-circle.svg";
      
            // Create a new File object from the local file
            const file = new File([imagePath], "profile.svg", {
              type: "image/svg+xml",
            });
      
            props.postProfilePic && props.postProfilePic(file, 0);
            setShow(false);
          } else if (event.target.value == "Use Gravatar") {
            setIsExceed(false)
            setShow(false);
            setAvatarImg("./assets/profile-picture-circle.svg");
            setavatarType(1);
      
            const imagePath = "./assets/Avatar-rds-mascot.svg";
      
            // Create a new File object from the local file
            const file = new File([imagePath], "avatar.svg", {
              type: "image/svg+xml",
            });
            props.postProfilePic && props.postProfilePic(file, 1); // pass the file to the function
            setShow(false);
          } else if (event.target.value == "Upload Files") {
            setIsExceed(true)
            // alert(2);
            setavatarType(2);
            setAvatarImg(props.profilePictureData ? avatarImg : imagePathradiobutton)
            setShow(true);
          } else {
            setShow(false)
          }
        };
      
        const validation = [
          {
            hint: "File size should not be greater than 1 MB.",
            isError: false,
          },
        ];
      
        const handlePictureDataChanges = (value: any, key: string, isFile?: boolean) => {
          if (isFile) {
            const fileName = value[0]?.name; 
            setFormData({ ...formData, [key]: value, fileName });
          }
        };
      
        const emitPictureSaveData = (event: any) => {
          event.preventDefault();
          const selectedProfile = profilepicstypes.find((item: any) => item.checked);
          if (selectedProfile) {
            const { label, type } = selectedProfile;
            props.onSaveHandler && props.onSaveHandler({ name: label, id: type, file: formData.file });
          }
          
          setFormData(props.profilePictureData);
          setAvatarImg(props.profilePictureData);
          setavatarType(0);
          setShow(false);
          setprofilepicstypes(profileList);
          setfirstload(0);
          setIsExceed(false); 
          const clearedProfilepicstypes = profilepicstypes.map((item: any) => ({
            ...item,
            checked: false,
          }));
          setprofilepicstypes(clearedProfilepicstypes);
        };

    useEffect(() => {
        if (props.profilePic) {
            setprofilePic(props.profilePic);
        }

    }, [props.profilePic]);
    useEffect(() => {
        if (window.location.pathname !== "/my-account" && window.location.pathname !== "/security-Logs" && window.location.pathname !== "/personal-data") {
            setAcivetab("");
        }

    }, [window.location.pathname])

    const onSetNavTabHandler: any = (id: any, navigateTo: string) => {


        setAcivetab(id);
        props.onProfileLink(id, navigateTo);
        props.currNavTabId != undefined && props.currNavTabId(id);
    };

    // Function to handle mouse enter on an li item
    const handleMouseEnter = (itemKey: string) => {
        setHoveredItem(itemKey);
    };

    // Function to handle mouse leave on an li item
    const handleMouseLeave = () => {
        setHoveredItem("");
    };

    const labelObj: any = {};

   if (Array.isArray(props.navtabItems)) {
    props.navtabItems.forEach((item: any) => {
        labelObj[item.id] = false;
    });
    } else {
        console.warn("RdsCompProfile: navtabItems is undefined or not an array.");
    }
    const [hoverState, setHoverState] = useState(labelObj);

    const updateHoverState = (id: string, isHover: boolean) => {
        const obj = hoverState;
        obj[id] = isHover;
        setHoverState((hoverState: any) => ({ ...obj }));
    }

     const profileName = localStorage.getItem("name");
     const userNames = localStorage.getItem("userName");

     useEffect(() => {
         setFormData(props.profileEditData);
       }, [props.profileEditData]);
     
       const handleDataChanges = (value: any, key: string) => {
         setFormData({ ...formData, [key]: value });
       };
     
       const isFormValid = () => {
         const nameValid = formData?.name?.trim().length > 0;
         const emailValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
           formData?.email
         );
         const phoneValid = /^\d{10,}$/.test(formData?.phoneNumber);
         const userNameValid = formData?.userName?.trim().length > 0;
         return nameValid && emailValid && phoneValid && userNameValid;
       };
     
       function emitSaveData(event: any) {
         event.preventDefault();
         props.onSaveHandler && props.onSaveHandler(formData);
         setFormData({
           name: "",
           email: "",
           phoneNumber: "",
           userName: "",
         });
       }

    return (
        <>
        {props.profile === "default" && (
        <>
        <div>
            <div className="text-center">
                <div className="text-center">
                    <img
                        src={profilePic}
                        alt="profilePic"
                        width="130px"
                        height="130px"
                        className="profil_image_Class rounded-circle"
                        data-testid="profile-pic"
                        style={{ height: '-webkit-fill-available' }}
                    ></img>

                    {props.showUserName ? (
                               <p className="text-center m-0 mt-3">{props.userName}</p>
                     ) : (
                           
                             <p className="text-center m-0 mt-3">{profileName}</p>
                       )}      
                    <p className="mb-3 text-center ">{props.userEmail}</p>
                </div>


            </div>
            {props.isImpersonation && (
                <div className="position-relative px-2 px-md-3 border-end text-center cursor-pointer d-flex justify-content-center pb-2">
                    <RdsButton
                        icon="left"
                        label="BackToImpersonator"
                        isOutline={true}
                        colorVariant="primary"
                        block={false}
                        size="small"
                        onClick={props.backToMyAccount}>
                    </RdsButton>
                </div>
            )}
            <div className="profile-offcanvas" >
                <div>
                    <ul className="px-0">
                        {props.navtabItems.map((item: any, i) => (
                            <div key={i} data-bs-dismiss="offcanvas">
                                <li
                                    className={`profile-tabs d-flex align-items-center px-3 py-3 gap-1 cursor-pointer text-start  ${activetab == item.id ? " activeBackgraound" : ""
                                        }`}
                                    onMouseEnter={() => handleMouseEnter(item.id)}
                                    onMouseLeave={handleMouseLeave} onClick={() => onSetNavTabHandler(item.id, item.navigateTo)}
                                >
                                    <span className="me-2">
                                        <RdsCompIcon
                                            name={item.iconPath}
                                            fill={false}
                                            stroke={true}
                                            height="20px"
                                            width="30px"
                                            classes="me-2"
                                            isHovered={hoveredItem === item.id}
                                        ></RdsCompIcon>
                                    </span>
                                    <div>
                                        <div
                                            className={`fw-semibold text-capitalize ${activetab == item.id ? " text-primary" : ""
                                                }`}
                                        >
                                            {item.label}
                                        </div>
                                        <p className="text-break m-0">{item.subText}</p>
                                    </div>
                                </li>
                                <RdsOffcanvas
                                    offId={item.id}
                                    placement={RdsOffcanvasPlacement.Start}
                                    offcanvaswidth={400}
                                    backDrop={RdsOffcanvasBackDrop.False}
                                    scrolling={false}
                                    preventEscapeKey={false}
                                    canvasTitle={""}
                                    offcanvasbutton={
                                        ""
                                    }
                                >
                                    <RdsCompLinkedAccount></RdsCompLinkedAccount>
                                </RdsOffcanvas>
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
         </div>
            <div className="pb-4 footer-buttons-profile d-flex flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row justify-content-center">
                <RdsButton
                    label="Logout"
                    colorVariant="primary"
                    block={false}
                    tooltipTitle={""}
                    type="submit"
                    databsdismiss="offcanvas"
                    isOutline={true}
                    onClick={props.onLogout}
                    dataTestId="logout"
                />
            </div>
            
        </>
        )}
        {props.profile === "edit" && (
    <div>
      <div className="tab-content py-4">
        <form>
          <div className="custom-content-scroll">
            <div className="row align-items-center">
              <div className="col-md-3 text-center cursor-pointer sm-p-0">
                <img src="./assets/edit-pic.png" />
                <input type="file" accept="image/*" className="d-none" />
              </div>
              <div className="col-md-9">
                <div className="form-group mb-3">
                  <RdsInput
                    inputType="text"
                    required={true}
                    name="Name"
                    label={true}                    
                    id="name"
                    placeholder="Enter Name"
                    onChange={(e) => {
                      handleDataChanges(e.target.value, "name");
                    }}
                    value={formData?.name}
                    validatonPattern={/^.{0,}$/}
                    validationMsg="This Field Is Required"
                    dataTestId="name"
                  ></RdsInput>
                  <div className="form-control-feedback"></div>
                </div>
                <div className="form-group mb-3">
                  <RdsInput
                    required={true}
                    inputType="email"
                    name="Email Address"
                    label={true}
                    placeholder="Enter Email Address"                    
                    id="email"
                    onChange={(e) => {
                      handleDataChanges(e.target.value, "email");
                    }}
                    value={formData?.email}
                    dataTestId="email"
                    validatonPattern={
                      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                    }
                    validationMsg="Please Enter Valid Email Address"
                  ></RdsInput>
                </div>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-lg-6 col-md-6 ">
                <div className="mb-3">
                  <RdsInput
                    placeholder="Enter Phone Nunber"
                    inputType="number"
                    name="Phone Number"
                    label={true}
                    
                    id="phone"
                    required={true}
                    onChange={(e) => {
                      handleDataChanges(e.target.value, "phoneNumber");
                    }}
                    value={formData?.phoneNumber}
                    dataTestId="phone-number"
                    validatonPattern={/^\d{10,}$/}
                    validationMsg="Phone number must contain only numbers and be at least 10 digits long"
                  ></RdsInput>
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="mb-3">
                  <RdsInput
                    placeholder="Enter Username"
                    inputType="text"
                    name="User Name"
                    label={true}                    
                    id="username"
                    required={true}
                    onChange={(e) => {
                      handleDataChanges(e.target.value, "userName");
                    }}
                    value={formData?.userName}
                    dataTestId="username"
                    validatonPattern={/^.{0,}$/}
                    validationMsg="This Field Is Required."
                  ></RdsInput>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex flex-column-reverse ps-4 flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3 p-4">
            <RdsButton
              label="Cancel"
              type="button"
              isOutline={true}
              colorVariant="primary"
              size="small"
              dataTestId="cancel"
            ></RdsButton>
            <RdsButton
              label="Save"
              type="submit"
              isOutline={false}
              colorVariant="primary"
              size="small"
              dataTestId="save"
              isDisabled={!isFormValid()}
              onClick={(e: any) => emitSaveData(e)}
            ></RdsButton>
          </div>
        </form>
      </div>
    </div>
        )}
        {props.profile === "picture" && (
            <form>
              <div className="custom-content-scroll">
              <div className="d-md-flex d-block py-4 align-items-center">
                <div className="mb-3 d-xxl-block d-xl-block d-lg-block d-md-block d-flex justify-content-center mb-xxl-0 mb-xl-0 mb-lg-0 mb-md-0 mb-4">
                  <img
                    src={avatarImg}
                    alt={"profilePic"}
                    width="120px"
                    height="120px"
                    className="profil_image_Class rounded-circle"
                    data-testid="avatar"
                    style={{ height: '-webkit-fill-available' }}
                  ></img>
                </div>
                <div className="ms-md-3">
                  <RdsRadioButton
                      displayType="Default"
                      itemList={profilepicstypes}
                      onlyChecked={true}
                      onChange={() => setavatarType(type)}
                      onClick={(e) => onClickSetProfilePicture(e)}
                      dataTestId="radio-btn" value={""}          />
                </div>
              </div>
              <div className="row position-relative">
                {show && (
                  <>
                    <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-12 mb-3 ">
                      <RdsFileUploader
                        colorVariant="primary"
                        extensions="jpg, jpeg, png"
                        placeholder=""
                        state={FileUploaderState.Default}
                        size={Size.Small}
                        label="Select New Image"
                        fileSizeLimitInMb={1}
                        validation={validation}
                        getFileUploaderInfo={(data: any) => profileImage(data)}
                        onFileArray={(files) =>
                          handlePictureDataChanges(files, "file", true)
                        }
                      />
                    </div>
                  </>
                )}
              </div>
              </div>
              <div className="d-flex flex-column-reverse ps-4 flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3 p-4">
                <RdsButton
                    label="Save Changes"
                    colorVariant="primary"
                    isDisabled={false}
                    block={false}
                    type="button"
                    size="small"
                    onClick={(e)=>emitSaveData(e)}
                    dataTestId="save"
                  />
                </div>
            </form>
        )}
        </>
    );
};

export default RdsCompProfile;
