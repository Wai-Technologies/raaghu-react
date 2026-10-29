import { useState, type SyntheticEvent, type MouseEventHandler } from "react";
import RdsAvatar from "../../raaghu-elements/rds-avatar/rds-avatar";
import RdsRating from "../../raaghu-elements/rds-rating/rds-rating";
import { Item, ReviewStyle } from "./rds-comp-reviews-types";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import { Box, Card, CardContent, Typography, useMediaQuery } from "@mui/material";
import { extendedBreakpointTokens } from '../../raaghu-react-themes/tokens/design-tokens';

interface FeedbackActionsProps {
  likes: number;
  dislikes: number;
  iconSize: "small" | "medium";
  liked: boolean;
  disliked: boolean;
  onLike: MouseEventHandler<HTMLButtonElement>;
  onDislike: MouseEventHandler<HTMLButtonElement>;
}

const FeedbackActions = ({ likes, dislikes, iconSize, liked, disliked, onLike, onDislike }: FeedbackActionsProps) => (
  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start", my: 3 }}>
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ display: "flex", alignItems: "center", mr: 3 }}>
        <Box
          component="button"
          onClick={onLike}
          aria-label="Like"
          aria-pressed={liked}
          sx={{ p: 0, color: "primary.main", backgroundColor: "transparent", border: "none", cursor: "pointer" }}
        >
          <ThumbUpAltIcon color="primary" fontSize={iconSize} />
        </Box>
        <Typography variant="body2" sx={{ ml: 1 }}>{likes}</Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box
          component="button"
          onClick={onDislike}
          aria-label="Dislike"
          aria-pressed={disliked}
          sx={{ p: 0, color: "error.main", backgroundColor: "transparent", border: "none", cursor: "pointer" }}
        >
          <ThumbDownAltIcon color="error" fontSize={iconSize} />
        </Box>
        <Typography variant="body2" sx={{ ml: 1 }}>{dislikes}</Typography>
      </Box>
    </Box>
  </Box>
);

FeedbackActions.displayName = "FeedbackActions";

export interface ReviewStyleCardProps {
  item: Item;
  variant?: ReviewStyle;
  locale?: string;
  formatDate?: (date: Date) => string;
  onRatingChange?: (item: Item, value: number) => void;
  onLike?: (item: Item) => void;
  onDislike?: (item: Item) => void;
}

export const ReviewStyleCard = ({
  item,
  variant,
  locale = "en-GB",
  formatDate: customFormatDate,
  onRatingChange,
  onLike,
  onDislike,
}: ReviewStyleCardProps) => {
  const getInitialRating = () =>
    variant === ReviewStyle.Style11 || variant === ReviewStyle.Style12
      ? 1
      : item.rating ?? 0;

  const formatDate = (date?: Date) => {
    if (!date) return "Date not available";
    if (customFormatDate) return customFormatDate(date);
    return date.toLocaleDateString(locale, {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const [rating, setRating] = useState(getInitialRating);
  const [likes, setLikes] = useState(item.likes ?? 0);
  const [dislikes, setDislikes] = useState(item.dislikes ?? 0);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [prevRating, setPrevRating] = useState(item.rating);
  const [prevLikes, setPrevLikes] = useState(item.likes);
  const [prevDislikes, setPrevDislikes] = useState(item.dislikes);
  if (item.rating !== prevRating) {
    setPrevRating(item.rating);
    setRating(getInitialRating());
  }
  if (item.likes !== prevLikes) {
    setPrevLikes(item.likes);
    setLikes(item.likes ?? 0);
  }
  if (item.dislikes !== prevDislikes) {
    setPrevDislikes(item.dislikes);
    setDislikes(item.dislikes ?? 0);
  }
  const isXs = useMediaQuery(`(max-width: ${extendedBreakpointTokens.sm})`);

  const handleRatingChange = (_event: SyntheticEvent, newValue: number | null) => {
    if (newValue !== null) {
      setRating(newValue);
      onRatingChange?.(item, newValue);
    }
  };

  const handleLike = () => {
    setLikes((prev) => prev + 1);
    setLiked(true);
    onLike?.(item);
  };

  const handleDislike = () => {
    setDislikes((prev) => prev + 1);
    setDisliked(true);
    onDislike?.(item);
  };

  const starRating = (
    size: "small" | "medium" = "medium",
    max?: number,
  ) => (
    <RdsRating
      value={rating}
      max={max}
      precision={0.5}
      size={size}
      onChange={handleRatingChange}
      readOnly={false}
    />
  );

  switch (variant) {
    case ReviewStyle.Style1:
      return (
        <Card sx={{ height: "100%" }}>
          <CardContent sx={{ textAlign: "center" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                "& .rds-avatar__name": {
                  fontWeight: "fontWeightMedium",
                  fontSize: "h6.fontSize",
                },
              }}
            >
              <RdsAvatar
                src={item.imageUrl}
                name={item.name}
                size="medium"
                displayStyle="name-bottom"
              />
            </Box>
            <Box>
              <Typography variant="subtitle1" color="text.secondary">
                {item.username}
              </Typography>
            </Box>
            <Box sx={{ my: 3, display: "flex", justifyContent: "center" }}>
              <RdsRating
                styles="default"
                type="star"
                value={rating}
                size="medium"
                onChange={handleRatingChange}
                precision={0.5}
                readOnly={false}
              />
            </Box>
            <Typography variant="body1">{item.description}</Typography>
          </CardContent>
        </Card>
      );

    case ReviewStyle.Style2:
      return (
        <Card sx={{ height: "100%" }}>
          <CardContent sx={{ textAlign: "center", display: "flex", flexDirection: "column" }}>
            <Typography variant="h6" fontWeight="bold">
              {item.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {item.username}
            </Typography>
            <Box sx={{ my: 3, display: "flex", justifyContent: "center" }}>
              {starRating()}
            </Box>
            <Typography variant="body1">{item.description}</Typography>
          </CardContent>
        </Card>
      );

    case ReviewStyle.Style3:
      return (
        <Card
          sx={{
            p: 3,
            height: "100%",
            "& .rds-avatar__name": {
              fontWeight: "fontWeightMedium",
              fontSize: "h6.fontSize",
            },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <RdsAvatar
              src={item.imageUrl}
              name={item.name}
              description={formatDate(item.date)}
              size="medium"
              displayStyle="with-name"
            />
          </Box>

          <Typography variant="body1">{item.description}</Typography>

          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            {starRating()}
          </Box>
        </Card>
      );

    case ReviewStyle.Style4:
      return (
        <Card sx={{ p: 3, height: "100%" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box>
              <Typography variant="h6" fontWeight="bold">
                {item.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {formatDate(item.date)}
              </Typography>
            </Box>
          </Box>

          <Typography variant="body1" sx={{ mt: 3 }}>
            {item.description}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            {starRating()}
          </Box>
        </Card>
      );

    case ReviewStyle.Style5:
      return (
        <Card sx={{ p: 3, height: "100%" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <RdsAvatar
              src={item.imageUrl}
              name={item.name}
              size="medium"
              showDesignation={false}
              showName={false}
            />
            <Box>
              <Typography variant="h6" fontWeight="bold">
                {item.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {formatDate(item.date)}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            {starRating()}
          </Box>

          <Typography variant="body1" sx={{ mt: 3 }}>
            {item.description}
          </Typography>
        </Card>
      );

    case ReviewStyle.Style6:
      return (
        <Card sx={{ p: 3, height: "100%" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 0 }}>
                {item.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {formatDate(item.date)}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            {starRating()}
          </Box>

          <Typography variant="body1" sx={{ mt: 3 }}>
            {item.description}
          </Typography>
        </Card>
      );

    case ReviewStyle.Style7:
      return (
        <Card sx={{ p: 3, height: "100%" }} className="rating-text">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", sm: "center" },
              gap: 1.5,
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                flexWrap: { xs: "wrap", sm: "nowrap" },
                width: "100%",
              }}
            >
              <RdsAvatar
                src={item.imageUrl}
                name={item.name}
                size={isXs ? "small" : "medium"}
                showDesignation={false}
                showName={false}
              />
              <Box sx={{ minWidth: 0 }}>
                <Typography
                  variant="h6"
                  fontWeight="fontWeightMedium"
                  sx={{ fontSize: { xs: "body1.fontSize", sm: "h6.fontSize" }, lineHeight: 1.2 }}
                >
                  {item.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {formatDate(item.date)}
                </Typography>
              </Box>
            </Box>
            <Box
              className="rating-wrapper"
              sx={{
                alignSelf: { xs: "stretch", sm: "auto" },
                width: { xs: "100%", sm: "auto" },
                mt: { xs: 1, sm: 0 },
                display: "flex",
                justifyContent: { xs: "flex-start", sm: "flex-end" },
              }}
            >
              {starRating(isXs ? "small" : "medium")}
            </Box>
          </Box>

          <Typography variant="body1" sx={{ mt: 3 }}>
            {item.description}
          </Typography>

          <FeedbackActions likes={likes} dislikes={dislikes} iconSize="small" liked={liked} disliked={disliked} onLike={handleLike} onDislike={handleDislike} />
        </Card>
      );

    case ReviewStyle.Style8:
      return (
        <Card sx={{ p: 3, height: "100%" }}>
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2, mt: 2 }}>
              {starRating()}
            </Box>
            <Typography variant="caption" color="text.secondary">
              {formatDate(item.date)}
            </Typography>

            <Typography variant="body1" sx={{ mt: 3 }}>
              {item.description}
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Typography variant="body2" sx={{ mb: 0, textAlign: "right", mt: 1 }}>
                {item.name}
              </Typography>
            </Box>
          </Box>
        </Card>
      );

    case ReviewStyle.Style9:
      return (
        <Card sx={{ p: 3, height: "100%" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <RdsAvatar
              src={item.imageUrl}
              name={item.name}
              size="medium"
              showDesignation={false}
              showName={false}
            />
            <Box>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 0 }}>
                {item.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ textTransform: "lowercase" }}>
                {item.username}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {starRating()}
            </Box>

            <Typography variant="caption" color="text.secondary">
              {formatDate(item.date)}
            </Typography>
          </Box>

          <Typography variant="body1" sx={{ mt: 3 }}>
            {item.description}
          </Typography>

          <FeedbackActions likes={likes} dislikes={dislikes} iconSize="medium" liked={liked} disliked={disliked} onLike={handleLike} onDislike={handleDislike} />
        </Card>
      );

    case ReviewStyle.Style10:
      return (
        <Card sx={{ p: 3, height: "100%" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 0 }}>
                {item.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ textTransform: "lowercase" }}>
                {item.username}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {starRating()}
            </Box>

            <Typography variant="caption" color="text.secondary">
              {formatDate(item.date)}
            </Typography>
          </Box>

          <Typography variant="body1" sx={{ mt: 3 }}>
            {item.description}
          </Typography>

          <FeedbackActions likes={likes} dislikes={dislikes} iconSize="medium" liked={liked} disliked={disliked} onLike={handleLike} onDislike={handleDislike} />
        </Card>
      );

    case ReviewStyle.Style11:
      return (
        <Card sx={{ height: "100%" }}>
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
              <RdsAvatar
                src={item.imageUrl}
                name={item.name}
                alt={item.name}
                showName={false}
                size="medium"
              />
            </Box>
            <Typography variant="h6" fontWeight="bold" sx={{ textAlign: "center" }}>
              {item.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ textAlign: "center" }}>
              {item.username}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 0.5,
                my: 3,
              }}
            >
              {starRating("medium", 1)}
              <Typography className="rating-value">{item.reviews ?? "0"}</Typography>
            </Box>
            <Typography variant="body1" sx={{ textAlign: "center" }}>
              {item.description}
            </Typography>
          </CardContent>
        </Card>
      );

    case ReviewStyle.Style12:
      return (
        <Card sx={{ height: "100%" }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" sx={{ textAlign: "center" }}>
              {item.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ textAlign: "center" }}>
              {item.username}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "var(--rds-spacing-xs-px)",
                my: 3,
              }}
            >
              {starRating("medium", 1)}
              <Typography className="rating-value">{item.reviews ?? "0"}</Typography>
            </Box>
            <Typography variant="body1" sx={{ textAlign: "center" }}>
              {item.description}
            </Typography>
          </CardContent>
        </Card>
      );

    default:
      return null;
  }
};

ReviewStyleCard.displayName = "ReviewStyleCard";
