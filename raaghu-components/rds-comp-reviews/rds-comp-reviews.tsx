import type { CSSProperties } from "react";
import "./rds-comp-reviews.scss";
import { ReviewStyleCard } from "./rds-comp-review-styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import type { HTMLAttributes, Ref } from "react";
import type { SxProps, Theme } from "@mui/material";
import clsx from "clsx";
import { warnDeprecatedProp } from "../../raaghu-elements/shared/utils/deprecation";
export { type Item, VariantType, ReviewStyle, RevieweStyle } from "./rds-comp-reviews-types";
import { type Item, VariantType, type ReviewStyle } from "./rds-comp-reviews-types";

export interface RdsCompReviewsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'style'> {
  /** Reviews to render. */
  items?: Item[];
  /** @deprecated Use `items` instead. */
  itemList?: Item[];
  /** Visual style of the review cards. */
  variant?: ReviewStyle;
  /** @deprecated Passing a variant string is deprecated; use `variant`. Pass CSSProperties for inline styles. */
  style?: ReviewStyle | CSSProperties;
  /** @deprecated Has no effect. */
  variantType?: VariantType;
  /** Locale used to format dates. Defaults to "en-GB". */
  locale?: string;
  /** Custom date formatter; replaces the default locale formatting. */
  formatDate?: (date: Date) => string;
  /** Called with the review item and the new rating value when a rating changes. */
  onRatingChange?: (item: Item, value: number) => void;
  /** Called with the review item when its like button is clicked. */
  onLike?: (item: Item) => void;
  /** Called with the review item when its dislike button is clicked. */
  onDislike?: (item: Item) => void;
  /** MUI system styles applied to the root element. */
  sx?: SxProps<Theme>;
  /** Ref forwarded to the root element. */
  ref?: Ref<HTMLDivElement>;
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
  variant,
  style,
  variantType = VariantType.Default,
  locale,
  formatDate,
  onRatingChange,
  onLike,
  onDislike,
  className,
  sx,
  ref,
  ...rest
}: RdsCompReviewsProps) => {
  if (itemList !== undefined) warnDeprecatedProp("RdsCompReviews", "itemList", "`items`");
  if (variantType !== VariantType.Default) {
    warnDeprecatedProp("RdsCompReviews", "variantType", "nothing (it has no effect)");
  }
  const legacyStyle = typeof style === "string" ? style : undefined;
  if (legacyStyle !== undefined) warnDeprecatedProp("RdsCompReviews", "style", "`variant`");
  const list = items ?? itemList ?? [];
  const showDefaultVariant = variantType === VariantType.Default;

  return (
    <Box {...rest} ref={ref} className={clsx("rds-comp-reviews", className)} sx={sx} style={typeof style === "object" ? style : undefined}>
      {showDefaultVariant && (
        <Grid container spacing={2} wrap="wrap">
          {list.map((item, index) => (
            <Grid key={getItemKey(item, index)} size={GRID_SIZE} sx={{ display: "flex" }}>
              <ReviewStyleCard
                item={item}
                variant={variant ?? legacyStyle}
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
