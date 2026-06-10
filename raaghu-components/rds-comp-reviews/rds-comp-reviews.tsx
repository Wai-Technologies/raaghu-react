import { useMemo } from "react";
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
  itemList: Item[];
  style?: RevieweStyle;
  variantType?: VariantType;
}

const GRID_SIZE = {
  xs: 12,
  sm: 12,
  md: 4,
  lg: 6,
  xl: 6,
} as const;

const getItemKey = (item: Item, index: number): string =>
  item.username ?? item.name ?? `review-${index}`;

const RdsCompReviews = ({
  itemList,
  style,
  variantType = VariantType.Default,
}: RdsCompReviewsProps) => {
  const showDefaultVariant = variantType === VariantType.Default;

  const gridItems = useMemo(
    () =>
      itemList.map((item, index) => ({
        key: getItemKey(item, index),
        content: renderReviewStyle(item, style),
      })),
    [itemList, style]
  );

  return (
    <Box className="rds-comp-reviews">
      {showDefaultVariant && (
        <Grid container spacing={2} wrap="wrap">
          {gridItems.map(({ key, content }) => (
            <Grid key={key} size={GRID_SIZE} style={{ display: "flex" }}>
              {content}
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

RdsCompReviews.displayName = "RdsCompReviews";
export default RdsCompReviews;
