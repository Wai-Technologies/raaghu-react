import { useState, useCallback, type ReactNode } from "react";
import type { CSSProperties, Ref } from "react";
import { Box } from "@mui/material";
import type { SxProps, Theme } from "@mui/material";
import clsx from "clsx";
import { warnDeprecatedProp } from "../../raaghu-elements/shared/utils/deprecation";
import "./rds-comp-details-pane.scss";
import {
  HistoryFavoritesTabs,
  RealEstateContent,
  SelectionContent,
  ToolbarContent,
  ThumbnailViewContent
} from "./details-pane-components";


export interface RdsCompDetailsPaneProps {
  headerText: string; 
  historyTabLabel?: string;
  favouritesTabLabel?: string;
  addtoscreen?: string;
  addtofolder?: string;
  variant?: string;
  /** @deprecated Passing a variant string is deprecated; use `variant`. Pass CSSProperties for inline styles. */
  style?: string | CSSProperties;
  headerSubText?: string;
  estateTitle?: string;
  estateDescription?: string;
  thumbnailButtonName?: string;
  historyItems?: { id: number; name: string }[];
  olderHistoryItems?: { id: number; name: string }[];
  carouselImages?: { src: string; alt: string }[];
  figmaIconSrc?: string | ReactNode;
  storybookIconSrc?: string | ReactNode;
  sx?: SxProps<Theme>;
  ref?: Ref<HTMLDivElement>;
  className?: string;
}

const DEFAULT_HISTORY_ITEMS = [
  { id: 1, name: "Login Page Creation" },
  { id: 2, name: "Finance Dashboard Design" },
  { id: 3, name: "E-commerce Product Page" },
  { id: 4, name: "Social Media Profile Setup" },
  { id: 5, name: "Onboarding Flow Builder" },
  { id: 6, name: "Analytics Overview Dashboard" },
];

const DEFAULT_OLDER_HISTORY_ITEMS = [
  { id: 1, name: "Signup Form Generator" },
  { id: 2, name: "Task Management Board UI" },
];

const RdsCompDetailsPane = (props: RdsCompDetailsPaneProps) => {
  const {
    variant: variantProp,
    style,
    historyItems: providedHistoryItems,
    olderHistoryItems: providedOlderHistoryItems,
    className,
    sx,
    ref,
  } = props;
  const legacyVariant = typeof style === "string" ? style : undefined;
  if (legacyVariant !== undefined) warnDeprecatedProp("RdsCompDetailsPane", "style", "`variant`");
  const variant = variantProp ?? legacyVariant;

  const getInitialTab = useCallback(() => {
    if (variant === "Favourites" || variant === "Favourites - New Folder") {
      return "favourites";
    }
    if (variant === "Prompt History") {
      return "history";
    }
    return "history";
  }, [variant]);
  const [activeTab, setActiveTab] = useState(() => getInitialTab());
  const [prevVariant, setPrevVariant] = useState(variant);
  if (variant !== prevVariant) {
    setPrevVariant(variant);
    if (variant === "Favourites" || variant === "Favourites - New Folder") {
      setActiveTab("favourites");
    } else if (variant === "Prompt History") {
      setActiveTab("history");
    }
  }
  
  const [historyItems, setHistoryItems] = useState(providedHistoryItems || DEFAULT_HISTORY_ITEMS);
  const [olderHistoryItems, setOlderHistoryItems] = useState(providedOlderHistoryItems || DEFAULT_OLDER_HISTORY_ITEMS);

  const handleDeleteHistoryItem = useCallback((id: number) => {
    setHistoryItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }, []);

  const handleDeleteOlderHistoryItem = useCallback((id: number) => {
    setOlderHistoryItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }, []);
  
  return (
    <>
      <Box ref={ref} className={clsx("rds-comp-details-pane", className)} sx={[{ position: 'relative' }, ...(Array.isArray(sx) ? sx : [sx])]} style={typeof style === 'object' ? style : undefined}>
        {(variant === "Favourites" || variant === "Favourites - New Folder" || variant === "Prompt History") ? (
          <div>
            <h5 className="rds-comp-details-pane__header fw-bold">{props.headerText}</h5>
            <HistoryFavoritesTabs 
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              historyTabLabel={props.historyTabLabel}
              favouritesTabLabel={props.favouritesTabLabel}
              addtoscreen={props.addtoscreen || "Add to Screen"}
              addtofolder={props.addtofolder}
              style={variant}
              historyItems={historyItems}
              olderHistoryItems={olderHistoryItems}
              handleDeleteHistoryItem={handleDeleteHistoryItem}
              handleDeleteOlderHistoryItem={handleDeleteOlderHistoryItem}
            />
          </div>
        ) : variant === "Real Estate" ? (
          <RealEstateContent 
            estateTitle={props.estateTitle}
            estateDescription={props.estateDescription}
            carouselImages={props.carouselImages}
          />
        ) : variant === "Selection" ? (
          <SelectionContent 
            headerText={props.headerText}
            headerSubText={props.headerSubText}
          />
        ) : variant === "Toolbar" ? (
          <ToolbarContent 
          figmaIconSrc={props.figmaIconSrc}
            storybookIconSrc={props.storybookIconSrc}
          />
        ) : variant === "Thumbnail View" ? (
          <ThumbnailViewContent 
            thumbnailButtonName={props.thumbnailButtonName}
          />
        ) : null        
        }
      </Box>
    </>
  );
};
RdsCompDetailsPane.displayName = "RdsCompDetailsPane";
export default RdsCompDetailsPane;
