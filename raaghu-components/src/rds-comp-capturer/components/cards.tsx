// import React from "react";
// import { BugIcon, FeatureRequestIcon, ReleaseUpdatesIcon, SendMessageIcon } from "../assets/svg-icons";
// import "./cards.css";
// interface CardProps {
//     onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
//     hasPermission?: { [key: string]: boolean };
// }

// const Card: React.FC<CardProps> = (props) => {
//     const formattedDateForCard = new Date().toLocaleDateString("en-GB", {
//         month: "long",
//         year: "numeric"
//     }).replace(/ /g, " ");

//     const cardData = [
//         {
//             id: "reportIssue",
//             icon: <BugIcon />,
//             title: "Report an issue",
//             text: "Found a bug? Let us know.",
//         },
//         {
//             id: "featureRequest",
//             icon: <FeatureRequestIcon />,
//             title: "Request a feature",
//             text: "What features would you like next?",
//         },
//         {
//             id: "sendMessage",
//             icon: <SendMessageIcon />,
//             title: "Send us a message",
//             text: "What can we do for you?",
//         },
//         {
//             id: "releaseUpdates",
//             icon: <ReleaseUpdatesIcon />,
//             title: "Release updates",
//             text: formattedDateForCard,
//         }
//     ];

//     const visibleCards = cardData.filter(card => props.hasPermission && props.hasPermission[card.id]);

//     return (
//         <div className={`${visibleCards.length % 2 !== 0 ? "row d-flex p-4" : "row d-flex p-4"}`}>
//             {
//                 visibleCards.map((card, index) => {
//                     let className = "";

//                     if (visibleCards.length % 2 !== 0) {
//                         if (index === visibleCards.length - 1) {
//                             className = "col-12";
//                         } else {
//                             className = "col-6 mb-4";
//                         }
//                     } else { 
//                         className = "col-6 mb-4";
//                     }

//                     return (
//                         <div className={className} key={card.id}>
//                             <div id={card.id} className={`card w-100 h-auto cursor-pointer ${""}`} onClick={props.onClick}>
//                                 <div className="card-body">
//                                     <h6>{card.icon}</h6>
//                                     <h6 className="card-title small text-truncate w-100" title={card.title}><strong>{card.title}</strong></h6>
//                                     <p className="card-text small text-muted text-truncate w-100" title={card.text}>{card.text}</p>
//                                 </div>
//                             </div>
//                         </div>
//                     );
//                 })
//             }
//         </div>
//     );
// };

// export default Card;