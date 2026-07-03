import { useMemo } from "react";
import "./rds-comp-reviews.scss";
import { ReviewStyleCard } from "./rds-comp-review-styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
export { type Item, VariantType, RevieweStyle } from "./rds-comp-reviews-types";
import { type Item, VariantType, RevieweStyle } from "./rds-comp-reviews-types";

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
        content: <ReviewStyleCard item={item} style={style} />,
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
