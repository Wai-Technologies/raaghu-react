import React, { useState } from "react";
import { RdsAvatar, RdsRating } from "../../raaghu-elements";
import { Item, RevieweStyle } from "./rds-comp-reviews";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

/**
 * Helper function to format dates in a standard way
 * @param date Optional date to format
 * @returns Formatted date string
 */
export const formatDate = (date?: Date) => {
  if (!date) return "Date not available";
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
};

// Style1 Component
const Style1 = ({ item }: { item: Item }) => {
  const [rating, setRating] = useState(item.rating || 4.5);
  
  const handleRatingChange = (_event: React.SyntheticEvent, newValue: number | null) => {
    if (newValue !== null) {
      setRating(newValue);
    }
  };
  
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ textAlign: 'center' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <RdsAvatar
            src={item.imageUrl || "https://source.unsplash.com/random/200x200/?portrait"}
            title={item.name}
            size="medium"
            displayStyle="name-bottom"
          />
        </Box>
        <Box sx={{ my: 3, display: 'flex', justifyContent: 'center' }}>
         <RdsRating
          level={3}
          styles="default"
          type="star"
          value={rating}
          size="medium"
          onChange={handleRatingChange}
          readOnly={false}
          />
        </Box>
        <Typography variant="body1">{item.description}</Typography>
      </CardContent>
    </Card>
  );
};

// Style2 Component
const Style2 = ({ item }: { item: Item }) => {
  const [rating, setRating] = useState(item.rating || 4.5);
  
  const handleRatingChange = (_event: React.SyntheticEvent, newValue: number | null) => {
    if (newValue !== null) {
      setRating(newValue);
    }
  };
  
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h5">{item.name}</Typography>
        <Typography variant="subtitle1" color="text.secondary">{item.username}</Typography>
        <Box sx={{ my: 3, display: 'flex', justifyContent: 'center' }}>
          <RdsRating
            value={rating}
            precision={0.5}
            size="medium"
            onChange={handleRatingChange}
            readOnly={false}
          />
        </Box>
        <Typography variant="body1">{item.description}</Typography>
      </CardContent>
    </Card>
  );
};

// Style3 Component
const Style3 = ({ item }: { item: Item }) => {
  const [rating, setRating] = useState(item.rating || 4.5);
  
  const handleRatingChange = (_event: React.SyntheticEvent, newValue: number | null) => {
    if (newValue !== null) {
      setRating(newValue);
    }
  };
  
  return (
    <Card sx={{ p: 3, height: '100%' }}>
      {/* User info with avatar */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <RdsAvatar
          src={item.imageUrl || "https://source.unsplash.com/random/200x200/?portrait"}
          title={item.name}
          size="medium"
          displayStyle="with-name"
        />
        <Box sx={{ ml: 2 }}>
          <Typography variant="caption" color="text.secondary">
            {formatDate(item.date)}
          </Typography>
        </Box>
      </Box>

      {/* Review content */}
      <Typography variant="body1">{item.description}</Typography>

      {/* Rating */}
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
        <RdsRating
          value={rating}
          precision={0.5}
          size="medium"
          onChange={handleRatingChange}
          readOnly={false}
        />
      </Box>
    </Card>
  );
};

// Style4 Component
const Style4 = ({ item }: { item: Item }) => {
  const [rating, setRating] = useState(item.rating || 4.5);
  
  const handleRatingChange = (_event: React.SyntheticEvent, newValue: number | null) => {
    if (newValue !== null) {
      setRating(newValue);
    }
  };
  
  return (
    <Card sx={{ p: 3, height: '100%' }}>
      {/* User info without avatar */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box>
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 0 }}>
            {item.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {formatDate(item.date)}
          </Typography>
        </Box>
      </Box>

      {/* Review content */}
      <Typography variant="body1" sx={{ mt: 3 }}>{item.description}</Typography>

      {/* Rating */}
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
        <RdsRating
          value={rating}
          precision={0.5}
          size="medium"
          onChange={handleRatingChange}
          readOnly={false}
        />
      </Box>
    </Card>
  );
};

// Style5 Component
const Style5 = ({ item }: { item: Item }) => {
  const [rating, setRating] = useState(item.rating || 4.5);
  
  const handleRatingChange = (_event: React.SyntheticEvent, newValue: number | null) => {
    if (newValue !== null) {
      setRating(newValue);
    }
  };
  
  return (
    <Card sx={{ p: 3, height: '100%' }}>
      {/* User info with avatar */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <RdsAvatar
           src={item.imageUrl || "https://source.unsplash.com/random/200x200/?portrait"}
          title={item.name}
          size="medium"
          showDesignation={false}
          showName={false}
        />
        <Box >
          <Typography variant="h6" fontWeight="bold">
            {item.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {formatDate(item.date)}
          </Typography>
        </Box>
      </Box>
      
      {/* Rating */}
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
        <RdsRating
          value={rating}
          precision={0.5}
          size="medium"
          onChange={handleRatingChange}
          readOnly={false}
        />
      </Box>
      
      {/* Review content */}
      <Typography variant="body1" sx={{ mt: 3 }}>{item.description}</Typography>
    </Card>
  );
};

// Style6 Component
const Style6 = ({ item }: { item: Item }) => {
  const [rating, setRating] = useState(item.rating || 4.5);
  
  const handleRatingChange = (_event: React.SyntheticEvent, newValue: number | null) => {
    if (newValue !== null) {
      setRating(newValue);
    }
  };
  
  return (
    <Card sx={{ p: 3, height: '100%' }}>
      {/* User info without avatar */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box>
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 0 }}>
            {item.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {formatDate(item.date)}
          </Typography>
        </Box>
      </Box>
      
      {/* Rating */}
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
        <RdsRating
          value={rating}
          precision={0.5}
          size="medium"
          onChange={handleRatingChange}
          readOnly={false}
        />
      </Box>
      
      {/* Review content */}
      <Typography variant="body1" sx={{ mt: 3 }}>{item.description}</Typography>
    </Card>
  );
};

// Style7 Component
const Style7 = ({ item }: { item: Item }) => {
  const [likes, setLikes] = useState(item.likes || 35);
  const [dislikes, setDislikes] = useState(item.dislikes || 10);
  const [rating, setRating] = useState(item.rating || 4.5);
  
  const handleLike = () => {
    setLikes(prev => prev + 1);
  };
  
  const handleDislike = () => {
    setDislikes(prev => prev + 1);
  };
  
  const handleRatingChange = (_event: React.SyntheticEvent, newValue: number | null) => {
    if (newValue !== null) {
      setRating(newValue);
    }
  };
  
  return (
    <Card sx={{ p: 3, height: '100%' }} className="rating-text">
      {/* Image, Name, and Rating in the Same Line */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'nowrap' }}>
         <RdsAvatar
           src={item.imageUrl || "https://source.unsplash.com/random/200x200/?portrait"}
          title={item.name}
          size="medium"
          showDesignation={false}
          showName={false}
        />
          <Box >
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 0 }}>
              {item.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {formatDate(item.date)}
            </Typography>
          </Box>
        </Box>
        {/* Rating at the End of the Line */}
        <Box className="rating-wrapper">
          <RdsRating
            value={rating}
            precision={0.5}
            size="medium"
            onChange={handleRatingChange}
            readOnly={false}
          />
        </Box>
      </Box>
      
      {/* Description */}
      <Typography variant="body1" sx={{ mt: 3 }}>{item.description}</Typography>
      
      {/* Like/Dislike Actions */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', my: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
            <Box 
              component="button" 
              onClick={handleLike}
              sx={{ 
                p: 0, 
                color: 'primary.main',
                backgroundColor: 'transparent', 
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <ThumbUpAltIcon color="primary" fontSize="small" />
            </Box>
            <Typography variant="body2" sx={{ ml: 1 }}>{likes}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box 
              component="button" 
              onClick={handleDislike}
              sx={{ 
                p: 0, 
                color: 'error.main',
                backgroundColor: 'transparent', 
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <ThumbDownAltIcon color="error" fontSize="small" />
            </Box>
            <Typography variant="body2" sx={{ ml: 1 }}>{dislikes}</Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

// Style8 Component
const Style8 = ({ item }: { item: Item }) => {
  const [rating, setRating] = useState(item.rating || 4.5);
  
  const handleRatingChange = (_event: React.SyntheticEvent, newValue: number | null) => {
    if (newValue !== null) {
      setRating(newValue);
    }
  };
  
  return (
    <Card sx={{ p: 3, height: '100%' }}>
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, mt: 2 }}>
          <RdsRating
            value={rating}
            precision={0.5}
            size="medium"
            onChange={handleRatingChange}
            readOnly={false}
          />
        </Box>
        <Typography variant="caption" color="text.secondary">
          {formatDate(item.date)}
        </Typography>
        
        {/* Review content */}
        <Typography variant="body1" sx={{ mt: 3 }}>{item.description}</Typography>
        
        {/* Name at the bottom */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Typography variant="h6" sx={{ mb: 0, textAlign: 'right' }}>{item.name}</Typography>
        </Box>
      </Box>
    </Card>
  );
};

// Style9 Component
const Style9 = ({ item }: { item: Item }) => {
  const [likes, setLikes] = useState(item.likes || 35);
  const [dislikes, setDislikes] = useState(item.dislikes || 10);
  const [rating, setRating] = useState(item.rating || 4.5);
  
  const handleLike = () => {
    setLikes(prev => prev + 1);
  };
  
  const handleDislike = () => {
    setDislikes(prev => prev + 1);
  };
  
  const handleRatingChange = (_event: React.SyntheticEvent, newValue: number | null) => {
    if (newValue !== null) {
      setRating(newValue);
    }
  };
  
  return (
    <Card sx={{ p: 3, height: '100%' }}>
      {/* Header with user info */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <RdsAvatar
           src={item.imageUrl || "https://source.unsplash.com/random/200x200/?portrait"}
          title={item.name}
          size="medium"
          showDesignation={false}
          showName={false}
        />
        <Box>
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 0 }}>{item.name}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'lowercase' }}>
            {item.username}
          </Typography>
        </Box>
      </Box>
      
      {/* Rating and date */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <RdsRating
            value={rating}
            precision={0.5}
            size="medium"
            onChange={handleRatingChange}
            readOnly={false}
          />
        </Box>

        <Typography variant="caption" color="text.secondary">
          {formatDate(item.date)}
        </Typography>
      </Box>
    
      {/* Review content */}
      <Typography variant="body1" sx={{ mt: 3 }}>{item.description}</Typography>

      {/* Like/Dislike Section */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', my: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
            <Box 
              component="button"
              onClick={handleLike}
              sx={{ 
                p: 0, 
                color: 'primary.main',
                backgroundColor: 'transparent', 
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <ThumbUpAltIcon color="primary" fontSize="medium" />
            </Box>
            <Typography variant="body2" sx={{ ml: 1 }}>{likes}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box 
              component="button"
              onClick={handleDislike}
              sx={{ 
                p: 0, 
                color: 'error.main',
                backgroundColor: 'transparent', 
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <ThumbDownAltIcon color="error" fontSize="medium" />
            </Box>
            <Typography variant="body2" sx={{ ml: 1 }}>{dislikes}</Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

// Style10 Component
const Style10 = ({ item }: { item: Item }) => {
  const [likes, setLikes] = useState(item.likes || 35);
  const [dislikes, setDislikes] = useState(item.dislikes || 10);
  const [rating, setRating] = useState(item.rating || 4.5);
  
  const handleLike = () => {
    setLikes(prev => prev + 1);
  };
  
  const handleDislike = () => {
    setDislikes(prev => prev + 1);
  };
  
  const handleRatingChange = (_event: React.SyntheticEvent, newValue: number | null) => {
    if (newValue !== null) {
      setRating(newValue);
    }
  };
  
  return (
    <Card sx={{ p: 3, height: '100%' }}>
      {/* User info without avatar */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box>
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 0 }}>{item.name}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'lowercase' }}>
            {item.username}
          </Typography>
        </Box>
      </Box>
      
      {/* Rating and date */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <RdsRating
            value={rating}
            precision={0.5}
            size="medium"
            onChange={handleRatingChange}
            readOnly={false}
          />
        </Box>

        <Typography variant="caption" color="text.secondary">
          {formatDate(item.date)}
        </Typography>
      </Box>
      
      {/* Review content */}
      <Typography variant="body1" sx={{ mt: 3 }}>{item.description}</Typography>
      
      {/* Like/Dislike Section */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', my: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
            <Box 
              component="button"
              onClick={handleLike}
              sx={{ 
                p: 0, 
                color: 'primary.main',
                backgroundColor: 'transparent', 
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <ThumbUpAltIcon color="primary" fontSize="medium" />
            </Box>
            <Typography variant="body2" sx={{ ml: 1 }}>{likes}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box 
              component="button"
              onClick={handleDislike}
              sx={{ 
                p: 0, 
                color: 'error.main',
                backgroundColor: 'transparent', 
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <ThumbDownAltIcon color="error" fontSize="medium" />
            </Box>
            <Typography variant="body2" sx={{ ml: 1 }}>{dislikes}</Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

// Style11 Component
const Style11 = ({ item }: { item: Item }) => {
  const [rating, setRating] = useState(1);
  
  const handleRatingChange = (_event: React.SyntheticEvent, newValue: number | null) => {
    if (newValue !== null) {
      setRating(newValue);
    }
  };
  
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <RdsAvatar
            src={item.imageUrl || "https://source.unsplash.com/random/200x200/?portrait"}
            title={item.name}
            size="medium"
          />
        </Box>
        <Typography variant="h5" sx={{ textAlign: 'center' }}>{item.name}</Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ textAlign: 'center' }}>
          {item.username}
        </Typography>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          gap: '4px', 
          my: 3 
        }}>
          <RdsRating
            value={rating}
            max={1}
            size="medium"
            onChange={handleRatingChange}
            readOnly={false}
          />
          <Typography className="rating-value">{item.reviews || "4.75"}</Typography>
        </Box>
        <Typography variant="body1" sx={{ textAlign: 'center' }}>{item.description}</Typography>
      </CardContent>
    </Card>
  );
};

// Style12 Component
const Style12 = ({ item }: { item: Item }) => {
  const [rating, setRating] = useState(1);
  
  const handleRatingChange = (_event: React.SyntheticEvent, newValue: number | null) => {
    if (newValue !== null) {
      setRating(newValue);
    }
  };
  
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h5" sx={{ textAlign: 'center' }}>{item.name}</Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ textAlign: 'center' }}>
          {item.username}
        </Typography>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          gap: '4px', 
          my: 3 
        }}>
          <RdsRating
            value={rating}
            max={1}
            size="medium"
            onChange={handleRatingChange}
            readOnly={false}
          />
          <Typography className="rating-value">{item.reviews || "4.75"}</Typography>
        </Box>
        <Typography variant="body1" sx={{ textAlign: 'center' }}>{item.description}</Typography>
      </CardContent>
    </Card>
  );
};

/**
 * Component that renders different review styles based on the style prop
 * @param item The review item to render
 * @param style The style variant to use
 * @returns The styled review component
 */
export const renderReviewStyle = (item: Item, style?: RevieweStyle) => {
  switch (style) {
    case RevieweStyle.Style1:
      return <Style1 item={item} />;
    case RevieweStyle.Style2:
      return <Style2 item={item} />;
    case RevieweStyle.Style3:
      return <Style3 item={item} />;
    case RevieweStyle.Style4:
      return <Style4 item={item} />;
    case RevieweStyle.Style5:
      return <Style5 item={item} />;
    case RevieweStyle.Style6:
      return <Style6 item={item} />;
    case RevieweStyle.Style7:
      return <Style7 item={item} />;
    case RevieweStyle.Style8:
      return <Style8 item={item} />;
    case RevieweStyle.Style9:
      return <Style9 item={item} />;
    case RevieweStyle.Style10:
      return <Style10 item={item} />;
    case RevieweStyle.Style11:
      return <Style11 item={item} />;
    case RevieweStyle.Style12:
      return <Style12 item={item} />;
    default:
      return null;
  }
};