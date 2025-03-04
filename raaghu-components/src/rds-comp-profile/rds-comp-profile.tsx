import { useEffect, useState } from "react";
import { RdsButton, RdsIcon, RdsOffcanvas } from "../rds-elements";
import React from "react";
import "./rds-comp-profile.css";
import RdsCompLinkedAccount from "../rds-comp-linked-account/rds-comp-linked-account";
import { useTranslation } from "react-i18next";
import { RdsOffcanvasBackDrop, RdsOffcanvasPlacement } from "../../../raaghu-elements/src/rds-offcanvas/rds-offcanvas";

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
    // onClose?: (Event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
}
const RdsCompProfile = (props: RdsCompProfileProps) => {
    const [activetab, setAcivetab] = useState("");
    const [isProfileListClicked, setProfileListClicked] = useState(false);
    const tenantName = localStorage.getItem("name");
    const [hoveredItem, setHoveredItem] = useState("");
    // const navigate = useNavigate();
    const [profilePic, setprofilePic] = useState("./assets/profile-picture-circle.svg");
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

    props.navtabItems.forEach((item: any) => {
        labelObj[item.id] = false;
    });
    const [hoverState, setHoverState] = useState(labelObj);

    const updateHoverState = (id: string, isHover: boolean) => {
        const obj = hoverState;
        obj[id] = isHover;
        setHoverState((hoverState: any) => ({ ...obj }));
    }

     const profileName = localStorage.getItem("name");
     const userNames = localStorage.getItem("userName");
    return (
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
                                        <RdsIcon
                                            name={item.iconPath}
                                            fill={false}
                                            stroke={true}
                                            height="20px"
                                            width="30px"
                                            classes="me-2"
                                            isHovered={hoveredItem === item.id}
                                        ></RdsIcon>
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
    );
};

export default RdsCompProfile;
