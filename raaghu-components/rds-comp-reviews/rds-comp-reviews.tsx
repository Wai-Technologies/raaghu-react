import React from "react";
import "./rds-comp-reviews.scss";
import { renderReviewStyle } from "./review-styles";

export interface Item {
  name: string;
  username?: string;
  date?: Date;
  feedIcon?: string;
  imageUrl?: string;
  description?: string;
  hashtags?: string;
  reviews?: string;
  rating?: number;
  likes?: number;
  dislikes?: number;
}

export enum VariantType {
  Default = "Default",
}

export enum RevieweStyle {
  Style1 = "style1",
  Style2 = "style2",
  Style3 = "style3",
  Style4 = "style4",
  Style5 = "style5",
  Style6 = "style6",
  Style7 = "style7",
  Style8 = "style8",
  Style9 = "style9",
  Style10 = "style10",
  Style11 = "style11",
  Style12 = "style12",
  Style13 = "style13",
}

export interface RdsCompReviewsProps {
  itemList: Item[]; // List of items to be displayed
  style?: RevieweStyle; // Style of the component
  variantType?: VariantType; // Variant type of the component
}

/**
 * Reviews Component for displaying various styles of reviews
 * Main component file that uses review-styles.tsx for rendering different review styles
 */
const RdsCompReviews = (props: RdsCompReviewsProps) => {
  const renderContentByStyle = (item: Item) => {
    return renderReviewStyle(item, props.style);
  };

  return (
    <div className="rds-comp-reviews">
      {props.variantType === VariantType.Default && (
        <div className="reviews-grid">
          {props.itemList.map((item: Item, index: number) => (
            <React.Fragment key={index}>
              {renderContentByStyle(item)}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default RdsCompReviews;
