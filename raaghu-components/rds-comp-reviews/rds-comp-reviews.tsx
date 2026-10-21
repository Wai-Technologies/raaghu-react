import "./rds-comp-reviews.scss";
import { ReviewStyleCard } from "./rds-comp-review-styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { warnDeprecatedProp } from "../../raaghu-elements/shared/utils/deprecation";
export { type Item, VariantType, ReviewStyle, RevieweStyle } from "./rds-comp-reviews-types";
import { type Item, VariantType, type ReviewStyle } from "./rds-comp-reviews-types";

export interface RdsCompReviewsProps {
  /** Reviews to render. */
  items?: Item[];
  /** @deprecated Use `items` instead. */
  itemList?: Item[];
  style?: ReviewStyle;
  /** @deprecated Has no effect. */
  variantType?: VariantType;
  /** Locale used to format dates. Defaults to "en-GB". */
  locale?: string;
  /** Custom date formatter; replaces the default locale formatting. */
  formatDate?: (date: Date) => string;
  onRatingChange?: (item: Item, value: number) => void;
  onLike?: (item: Item) => void;
  onDislike?: (item: Item) => void;
}

const GRID_SIZE = {
  xs: 12,
  sm: 12,
  md: 4,
  lg: 6,
  xl: 6,
} as const;

const getItemKey = (item: Item, index: number): string =>
  String(item.id ?? item.username ?? item.name ?? `review-${index}`);

const RdsCompReviews = ({
  items,
  itemList,
  style,
  variantType = VariantType.Default,
  locale,
  formatDate,
  onRatingChange,
  onLike,
  onDislike,
}: RdsCompReviewsProps) => {
  if (itemList !== undefined) warnDeprecatedProp("RdsCompReviews", "itemList", "`items`");
  if (variantType !== VariantType.Default) {
    warnDeprecatedProp("RdsCompReviews", "variantType", "nothing (it has no effect)");
  }
  const list = items ?? itemList ?? [];
  const showDefaultVariant = variantType === VariantType.Default;

  return (
    <Box className="rds-comp-reviews">
      {showDefaultVariant && (
        <Grid container spacing={2} wrap="wrap">
          {list.map((item, index) => (
            <Grid key={getItemKey(item, index)} size={GRID_SIZE} style={{ display: "flex" }}>
              <ReviewStyleCard
                item={item}
                style={style}
                locale={locale}
                formatDate={formatDate}
                onRatingChange={onRatingChange}
                onLike={onLike}
                onDislike={onDislike}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

RdsCompReviews.displayName = "RdsCompReviews";
export default RdsCompReviews;
