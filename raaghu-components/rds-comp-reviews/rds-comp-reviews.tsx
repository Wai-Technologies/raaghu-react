import React from "react";
import "./rds-comp-reviews.scss";
import { renderReviewStyle } from "./rds-comp-review-styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

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

const RdsCompReviews = (props: RdsCompReviewsProps) => {
  const renderContentByStyle = (item: Item) => {
    return renderReviewStyle(item, props.style);
  };

  return (
    <Box className="rds-comp-reviews">
      {props.variantType === VariantType.Default && (
        <Grid container spacing={2} wrap="wrap">
          {props.itemList.map((item: Item, index: number) => (
            <Grid 
             key={item.name ?? item.username ?? `review-${index}`}
             size={{
               xs: 12,
               sm: 12,
               md: 4,
               lg: 6,
               xl: 6
             }}
              style={{ display: 'flex'}}
            >
              {renderContentByStyle(item)}
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};
RdsCompReviews.displayName = "RdsCompReviews";
export default RdsCompReviews;
