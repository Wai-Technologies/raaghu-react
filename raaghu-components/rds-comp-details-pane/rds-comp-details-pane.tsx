import React, { useState, useEffect } from "react";
import "./rds-comp-details-pane.scss";
import {
  HistoryFavoritesTabs,
  RealEstateContent,
  SelectionContent,
  ToolbarContent,
  ThumbnailViewContent,
  FigmaUIKitButton
} from "./details-pane-components";


export interface RdsCompDetailsPaneProps {
  headerText: string; 
  historyTabLabel?: string;
  favouritesTabLabel?: string;
  addtoscreen?: string;
  addtofolder?: string;
  style?: string;
  headerSubText?: string;
  estateTitle?: string;
  estateDescription?: string;
  thumbnailButtonName?: string;
  historyItems?: { id: number; name: string }[];
  olderHistoryItems?: { id: number; name: string }[];
  carouselImages?: { src: string; alt: string }[];
}

const RdsCompDetailsPane = (props: RdsCompDetailsPaneProps) => {
  const getInitialTab = () => {
    if (props.style === "Favourites" || props.style === "Favourites - New Folder") {
      return "favourites";
    }
    if (props.style === "Prompt History") {
      return "history";
    }
    return "history";
  };
  const [activeTab, setActiveTab] = useState(getInitialTab());
  
  const defaultHistoryItems = [
    { id: 1, name: "Login Page Creation" },
    { id: 2, name: "Finance Dashboard Design" },
    { id: 3, name: "E-commerce Product Page" },
    { id: 4, name: "Social Media Profile Setup" },
    { id: 5, name: "Onboarding Flow Builder" },
    { id: 6, name: "Analytics Overview Dashboard" },
  ];
  
  const defaultOlderHistoryItems = [
    { id: 1, name: "Signup Form Generator" },
    { id: 2, name: "Task Management Board UI" },
  ];
  
  const [historyItems, setHistoryItems] = useState(props.historyItems || defaultHistoryItems);
  const [olderHistoryItems, setOlderHistoryItems] = useState(props.olderHistoryItems || defaultOlderHistoryItems);

  useEffect(() => {
    if (props.style === "Favourites" || props.style === "Favourites - New Folder") {
      setActiveTab("favourites");
    } else if (props.style === "Prompt History") {
      setActiveTab("history");
    }
  }, [props.style]);

  const handleDeleteHistoryItem = (id: number) => {
    setHistoryItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleDeleteOlderHistoryItem = (id: number) => {
    setOlderHistoryItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };
  
  return (
    <>
      <div className="rds-comp-details-pane" style={{ position: 'relative' }}>
        {(props.style === "Favourites" || props.style === "Favourites - New Folder" || props.style === "Prompt History") ? (
          <div>
            <h5 className="rds-comp-details-pane__header fw-bold">{props.headerText}</h5>
            <HistoryFavoritesTabs 
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              historyTabLabel={props.historyTabLabel}
              favouritesTabLabel={props.favouritesTabLabel}
              addtoscreen={props.addtoscreen || "Add to Screen"}
              addtofolder={props.addtofolder}
              style={props.style}
              historyItems={historyItems}
              olderHistoryItems={olderHistoryItems}
              handleDeleteHistoryItem={handleDeleteHistoryItem}
              handleDeleteOlderHistoryItem={handleDeleteOlderHistoryItem}
            />
          </div>
        ) : props.style === "Real Estate" ? (
          <RealEstateContent 
            estateTitle={props.estateTitle}
            estateDescription={props.estateDescription}
            carouselImages={props.carouselImages}
          />
        ) : props.style === "Selection" ? (
          <SelectionContent 
            headerText={props.headerText}
            headerSubText={props.headerSubText}
          />
        ) : props.style === "Toolbar" ? (
          <ToolbarContent />
        ) : props.style === "Thumbnail View" ? (
          <ThumbnailViewContent 
            thumbnailButtonName={props.thumbnailButtonName}
          />
        ) : null        
        }
      </div>
    </>
  );
};
RdsCompDetailsPane.displayName = "RdsCompDetailsPane";
export default RdsCompDetailsPane;
export { FigmaUIKitButton };
