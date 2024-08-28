// import React, { useEffect } from "react";
// import { HelpIcon, HomeIcon, MessagesIcon, NewsIcon, SettingsIcon } from "../assets/svg-icons";
// import "../rds-comp-capturer.css";
// import "./footer.css";

// interface footerProps {
//     onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
//     hasPermission?: { [key: string] : boolean };
//     activeCard?: string | null;
// }

// const Footer: React.FC<footerProps> = (props) => {

//     const footerData = [
//         { id: "homeLabel", text: "Home", icon: <HomeIcon /> },
//         { id: "messagesLabel", text: "Messages", icon: <MessagesIcon /> },
//         { id: "newsLabel", text: "News", icon: <NewsIcon /> },
//         { id: "helpLabel", text: "Help", icon: <HelpIcon /> },
//         { id: "settingsLabel", text: "Settings", icon: <SettingsIcon /> },
//     ];

//     const colorStyle = {
//         defaultColor: "#000",
//         clickedColor: "#7e2eef",
//         stroke: "#7e2eef",
//     };

//     const updateLabelStyles = (label: HTMLElement | null, isActive: boolean) => {
//         if (label) {
//             label.style.color = isActive ? colorStyle.clickedColor : colorStyle.defaultColor;
//             const svgElement = label.querySelector("svg");
//             if (svgElement) {
//                 svgElement.style.stroke = isActive ? colorStyle.clickedColor : colorStyle.defaultColor;
//             }
//         }
//     };

//     const handleItemClick = (e: any, itemId: string) => {
//         const homeLabel = document.getElementById("homeLabel");
//         const messagesLabel = document.getElementById("messagesLabel");
//         const newsLabel = document.getElementById("newsLabel");
//         const helpLabel = document.getElementById("helpLabel");
//         const settingsLabel = document.getElementById("settingsLabel");

//         updateLabelStyles(homeLabel, itemId === "homeLabel");
//         updateLabelStyles(messagesLabel, itemId === "messagesLabel");
//         updateLabelStyles(newsLabel, itemId === "newsLabel");
//         updateLabelStyles(helpLabel, itemId === "helpLabel");
//         updateLabelStyles(settingsLabel, itemId === "settingsLabel");

//         e.stopPropagation();
//     };

//     useEffect(() => {
//         if (props.activeCard === null) {
//             const homeLabel = document.getElementById("homeLabel");
//             updateLabelStyles(homeLabel, true);
//         }
//     }, [props.activeCard]);

//     return (
//         <>
//             {
//                 footerData.map((data, index) => (
//                     props.hasPermission && props.hasPermission[data.id] && (
//                         <div
//                             key={data.id}
//                             id={data.id}
//                             onClick={(e) => handleItemClick(e, data.id)}
//                             className="cursor-pointer footer-items"
//                         >
//                             <div className="d-flex justify-content-center mt-2">{data.icon}</div>
//                             <div className="d-flex mt-2">{data.text}</div>
//                         </div>
//                     )
//                 ))
//             }
//         </>
//     );
// };

// export default Footer;