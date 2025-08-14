import React, { useState } from "react";
import { RdsAvatar, RdsRating } from "../../raaghu-elements";
import { Item, RevieweStyle } from "./rds-comp-reviews";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";

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
    <div className="row">
      <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
        <div className="card h-100">
          <div className="card-body text-center">
            <div className="d-flex justify-content-center">
              <RdsAvatar
                src={item.imageUrl || "https://source.unsplash.com/random/200x200/?portrait"}
                name={item.name}
                size="medium"
                displayStyle="name-bottom"
              />
            </div>
            <div className="my-3 d-flex justify-content-center">
             <RdsRating
              level={3}
              styles="default"
              type="star"
              value={rating}
              size="medium"
              onChange={handleRatingChange}
              readOnly={false}
              />
            </div>
            <p className="card-text">{item.description}</p>
          </div>
        </div>
      </div>
    </div>
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
    <div className="row">
      <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
        <div className="card h-100">
          <div className="card-body text-center d-flex flex-column">
            <h5 className="card-title">{item.name}</h5>
            <h6 className="text-muted">{item.username}</h6>
            <div className="my-3 d-flex justify-content-center">
              <RdsRating
                value={rating}
                precision={0.5}
                size="medium"
                onChange={handleRatingChange}
                readOnly={false}
              />
            </div>
            <p className="card-text">{item.description}</p>
          </div>
        </div>
      </div>
    </div>
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
    <div className="card p-3 col-lg-4 col-sm-12 col-md-6">
      {/* User info with avatar */}
      <div className="d-flex align-items-center mb-3">
        <RdsAvatar
          src={item.imageUrl || "https://source.unsplash.com/random/200x200/?portrait"}
          name={item.name}
          size="medium"
          displayStyle="with-name"
        />
        <div className="ms-3">
          <small className="text-muted">
            {formatDate(item.date)}
          </small>
        </div>
      </div>

      {/* Review content */}
      <p className="card-text">{item.description}</p>

      {/* Rating */}
      <div className="d-flex align-items-center mt-2">
        <RdsRating
          value={rating}
          precision={0.5}
          size="medium"
          onChange={handleRatingChange}
          readOnly={false}
        />
      </div>
    </div>
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
    <div className="card p-3 col-lg-4 col-sm-12 col-md-6">
      {/* User info without avatar */}
      <div className="d-flex align-items-center">
        <div className="">
          <h5 className="fw-bold card-title mb-0">{item.name}</h5>
          <small className="text-muted">
            {formatDate(item.date)}
          </small>
        </div>
      </div>

      {/* Review content */}
      <p className="mt-3">{item.description}</p>

      {/* Rating */}
      <div className="d-flex align-items-center mt-2">
        <RdsRating
          value={rating}
          precision={0.5}
          size="medium"
          onChange={handleRatingChange}
          readOnly={false}
        />
      </div>
    </div>
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
    <div className="card p-3 col-lg-4 col-sm-12 col-md-6">
      {/* User info with avatar */}
      <div className="d-flex align-items-center">
        <img
          src={item.imageUrl || "https://source.unsplash.com/random/200x200/?portrait"}
          alt={item.name}
          className="rounded-circle"
          style={{ width: '50px', height: '50px' }}
        />
        <div className="ms-3">
          <h5 className="fw-bold card-title mb-0">{item.name}</h5>
          <small className="text-muted">
            {formatDate(item.date)}
          </small>
        </div>
      </div>
      
      {/* Rating */}
      <div className="d-flex align-items-center mt-2">
        <RdsRating
          value={rating}
          precision={0.5}
          size="medium"
          onChange={handleRatingChange}
          readOnly={false}
        />
      </div>
      
      {/* Review content */}
      <p className="mt-3">{item.description}</p>
    </div>
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
    <div className="card p-3 col-lg-4 col-sm-12 col-md-6">
      {/* User info without avatar */}
      <div className="d-flex align-items-center">
        <div className="">
          <h5 className="fw-bold card-title mb-0">{item.name}</h5>
          <small className="text-muted">
            {formatDate(item.date)}
          </small>
        </div>
      </div>
      
      {/* Rating */}
      <div className="d-flex align-items-center mt-2">
        <RdsRating
          value={rating}
          precision={0.5}
          size="medium"
          onChange={handleRatingChange}
          readOnly={false}
        />
      </div>
      
      {/* Review content */}
      <p className="mt-3">{item.description}</p>
    </div>
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
    <div className="rating-text card p-3 col-lg-5 col-sm-12 col-md-6">
      {/* Image, Name, and Rating in the Same Line */}
      <div className="d-flex justify-content-between align-items-center">
        <div className="nowrap align-items-center d-flex">
          <img
            src={item.imageUrl || "https://source.unsplash.com/random/200x200/?portrait"}
            alt={item.name}
            className="rounded-circle ps-0 px-1"
            style={{ width: '50px', height: '50px' }}
          />
          <div className="ms-1">
            <h5 className="fw-bold card-title mb-0">{item.name}</h5>
            <small className="text-muted">
              {formatDate(item.date)}
            </small>
          </div>
        </div>
        {/* Rating at the End of the Line */}
        <div className="rating-wrapper">
          <RdsRating
            value={rating}
            precision={0.5}
            size="medium"
            onChange={handleRatingChange}
            readOnly={false}
          />
        </div>
      </div>
      
      {/* Description */}
      <p className="mt-3">{item.description}</p>
      
      {/* Like/Dislike Actions */}
      <div className="d-flex align-items-center justify-content-start my-3 card-title">
        <div className="d-flex align-items-center">
          <div className="d-flex align-items-center me-3">
            <button 
              className="btn p-0 text-primary"
              onClick={handleLike}
              style={{ backgroundColor: 'transparent', border: 'none' }}
            >
              <ThumbUpAltIcon color="primary" fontSize="small" />
            </button>
            <span className="ms-1">{likes}</span>
          </div>
          <div className="d-flex align-items-center">
            <button 
              className="btn p-0 text-danger"
              onClick={handleDislike}
              style={{ backgroundColor: 'transparent', border: 'none' }}
            >
              <ThumbDownAltIcon color="error" fontSize="small" />
            </button>
            <span className="ms-1">{dislikes}</span>
          </div>
        </div>
      </div>
    </div>
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
    <div className="card p-3 col-lg-5 col-sm-12 col-md-6" style={{ height: '100%' }}>
      <div>
        <div className="align-items-center">
          <div className="">
            <div className="d-flex align-items-center mb-2 mt-2">
              <RdsRating
                value={rating}
                precision={0.5}
                size="medium"
                onChange={handleRatingChange}
                readOnly={false}
              />
            </div>
            <small className="text-muted">
              {formatDate(item.date)}
            </small>
          </div>
        </div>
        
        {/* Review content */}
        <p className="mt-3">{item.description}</p>
        
        {/* Name at the bottom */}
        <div className="d-flex justify-content-end">
          <h6 className="mb-0 text-end">{item.name}</h6>
        </div>
      </div>
    </div>
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
    <div className="card p-3 col-lg-6 col-md-6 col-sm-12">
      {/* Header with user info */}
      <div className="d-flex align-items-center">
        <img
          src={item.imageUrl || "https://source.unsplash.com/random/200x200/?portrait"}
          alt={item.name}
          className="rounded-circle"
          style={{ width: '50px', height: '50px' }}
        />
        <div className="ms-3">
          <h5 className="fw-bold card-title mb-0">{item.name}</h5>
          <div className="text-muted text-lowercase">{item.username}</div>
        </div>
      </div>
      
      {/* Rating and date */}
      <div className="d-flex justify-content-between align-items-center mt-2">
        <div className="d-flex align-items-center">
          <RdsRating
            value={rating}
            precision={0.5}
            size="medium"
            onChange={handleRatingChange}
            readOnly={false}
          />
        </div>

        <small className="text-muted">
          {formatDate(item.date)}
        </small>
      </div>
    
      {/* Review content */}
      <p className="mt-3">{item.description}</p>

      {/* Like/Dislike Section */}
      <div className="d-flex align-items-center justify-content-start my-3 card-title">
        <div className="d-flex align-items-center">
          <div className="d-flex align-items-center me-3">
            <button 
              className="btn p-0 text-primary"
              onClick={handleLike}
              style={{ backgroundColor: 'transparent', border: 'none' }}
            >
              <ThumbUpAltIcon color="primary" fontSize="medium" />
            </button>
            <span className="ms-1">{likes}</span>
          </div>
          <div className="d-flex align-items-center">
            <button 
              className="btn p-0 text-danger"
              onClick={handleDislike}
              style={{ backgroundColor: 'transparent', border: 'none' }}
            >
              <ThumbDownAltIcon color="error" fontSize="medium" />
            </button>
            <span className="ms-1">{dislikes}</span>
          </div>
        </div>
      </div>
    </div>
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
    <div className="card p-3 col-lg-6 col-md-6 col-sm-12">
      {/* User info without avatar */}
      <div className="d-flex align-items-center">
        <div>
          <h5 className="fw-bold card-title mb-0">{item.name}</h5>
          <div className="text-muted text-lowercase">{item.username}</div>
        </div>
      </div>
      
      {/* Rating and date */}
      <div className="d-flex justify-content-between align-items-center mt-2">
        <div className="d-flex align-items-center">
          <RdsRating
            value={rating}
            precision={0.5}
            size="medium"
            onChange={handleRatingChange}
            readOnly={false}
          />
        </div>

        <small className="text-muted">
          {formatDate(item.date)}
        </small>
      </div>
      
      {/* Review content */}
      <p className="mt-3">{item.description}</p>
      
      {/* Like/Dislike Section */}
      <div className="d-flex align-items-center justify-content-start my-3 card-title">
        <div className="d-flex align-items-center">
          <div className="d-flex align-items-center me-3">
            <button 
              className="btn p-0 text-primary"
              onClick={handleLike}
              style={{ backgroundColor: 'transparent', border: 'none' }}
            >
              <ThumbUpAltIcon color="primary" fontSize="medium" />
            </button>
            <span className="ms-1">{likes}</span>
          </div>
          <div className="d-flex align-items-center">
            <button 
              className="btn p-0 text-danger"
              onClick={handleDislike}
              style={{ backgroundColor: 'transparent', border: 'none' }}
            >
              <ThumbDownAltIcon color="error" fontSize="medium" />
            </button>
            <span className="ms-1">{dislikes}</span>
          </div>
        </div>
      </div>
    </div>
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
    <div className="card col-lg-3 col-sm-12 col-md-6">
      <div className="card-body">
        <div className="d-flex justify-content-center mb-3">
          <RdsAvatar
            src={item.imageUrl || "https://source.unsplash.com/random/200x200/?portrait"}
            name={item.name}
            size="medium"
          />
        </div>
        <h5 className="card-title text-center">{item.name}</h5>
        <h6 className="text-center text-muted">{item.username}</h6>
        <div className="d-flex justify-content-center align-items-center gap-1 my-3">
          <RdsRating
            value={rating}
            max={1}
            size="medium"
            onChange={handleRatingChange}
            readOnly={false}
          />
          <span className="rating-value">{item.reviews || "4.75"}</span>
        </div>
        <p className="card-text text-center">{item.description}</p>
      </div>
    </div>
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
    <div className="card col-lg-3 col-sm-12 col-md-6">
      <div className="card-body">
        <h5 className="card-title text-center">{item.name}</h5>
        <h6 className="text-center text-muted">{item.username}</h6>
        <div className="d-flex justify-content-center align-items-center gap-1 my-3">
          <RdsRating
            value={rating}
            max={1}
            size="medium"
            onChange={handleRatingChange}
            readOnly={false}
          />
          <span className="rating-value">{item.reviews || "4.75"}</span>
        </div>
        <p className="card-text text-center">{item.description}</p>
      </div>
    </div>
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