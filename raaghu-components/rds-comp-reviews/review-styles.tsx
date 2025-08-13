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

/**
 * Component that renders different review styles based on the style prop
 * @param item The review item to render
 * @param style The style variant to use
 * @returns The styled review component
 */
export const renderReviewStyle = (item: Item, style?: RevieweStyle) => {
  switch (style) {
    case RevieweStyle.Style1:
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
                  value={item.rating || 4.5}
                  size="medium"
                  />
                </div>
                <p className="card-text">{item.description}</p>
              </div>
            </div>
          </div>
        </div>
      );

    case RevieweStyle.Style2:
      return (
        <div className="row">
          <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
            <div className="card h-100">
              <div className="card-body text-center d-flex flex-column">
                <h5 className="card-title">{item.name}</h5>
                <h6 className="text-muted">{item.username}</h6>
                <div className="my-3 d-flex justify-content-center">
                  <RdsRating
                    value={item.rating || 4.5}
                    precision={0.5}
                     size="medium"
                    readOnly
                  />
                </div>
                <p className="card-text">{item.description}</p>
              </div>
            </div>
          </div>
        </div>
      );
      
    case RevieweStyle.Style3:
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
              value={item.rating || 4.5}
              precision={0.5}
               size="medium"
              readOnly
            />
          </div>
        </div>
      );

    case RevieweStyle.Style4:
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
              value={item.rating || 4.5}
              precision={0.5}
               size="medium"
              readOnly
            />
          </div>
        </div>
      );

    case RevieweStyle.Style5:
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
              value={item.rating || 4.5}
              precision={0.5}
               size="medium"
              readOnly
            />
          </div>
          
          {/* Review content */}
          <p className="mt-3">{item.description}</p>
        </div>
      );
      
    case RevieweStyle.Style6:
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
              value={item.rating || 4.5}
              precision={0.5}
              size="medium"
              readOnly
            />
          </div>
          
          {/* Review content */}
          <p className="mt-3">{item.description}</p>
        </div>
      );
      
    case RevieweStyle.Style7:
      {
        const [likes, setLikes] = useState(item.likes || 35);
        const [dislikes, setDislikes] = useState(item.dislikes || 10);
        
        const handleLike = () => {
          setLikes(prev => prev + 1);
        };
        
        const handleDislike = () => {
          setDislikes(prev => prev + 1);
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
                  value={item.rating || 4.5}
                  precision={0.5}
                   size="medium"
                  readOnly
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
      }

    case RevieweStyle.Style8:
      return (
        <div className="card p-3 col-lg-5 col-sm-12 col-md-6" style={{ height: '100%' }}>
          <div>
            <div className="align-items-center">
              <div className="">
                <div className="d-flex align-items-center mb-2 mt-2">
                  <RdsRating
                    value={item.rating || 4.5}
                    precision={0.5}
                     size="medium"
                    readOnly
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
      
    case RevieweStyle.Style9: 
      {
        const [likes, setLikes] = useState(item.likes || 35);
        const [dislikes, setDislikes] = useState(item.dislikes || 10);
        
        const handleLike = () => {
          setLikes(prev => prev + 1);
        };
        
        const handleDislike = () => {
          setDislikes(prev => prev + 1);
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
                  value={item.rating || 4.5}
                  precision={0.5}
                   size="medium"
                  readOnly
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
      } 
      
    case RevieweStyle.Style10: 
      {
        const [likes, setLikes] = useState(item.likes || 35);
        const [dislikes, setDislikes] = useState(item.dislikes || 10);
        
        const handleLike = () => {
          setLikes(prev => prev + 1);
        };
        
        const handleDislike = () => {
          setDislikes(prev => prev + 1);
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
                  value={item.rating || 4.5}
                  precision={0.5}
                   size="medium"
                  readOnly
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
      }
      
    case RevieweStyle.Style11: 
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
                value={1}
                max={1}
                 size="medium"
                readOnly
              />
              <span className="rating-value">{item.reviews || "4.75"}</span>
            </div>
            <p className="card-text text-center">{item.description}</p>
          </div>
        </div>
      );
      
    case RevieweStyle.Style12:
      return (
        <div className="card col-lg-3 col-sm-12 col-md-6">
          <div className="card-body">
            <h5 className="card-title text-center">{item.name}</h5>
            <h6 className="text-center text-muted">{item.username}</h6>
            <div className="d-flex justify-content-center align-items-center gap-1 my-3">
              <RdsRating
                value={1}
                max={1}
                 size="medium"
                readOnly
              />
              <span className="rating-value">{item.reviews || "4.75"}</span>
            </div>
            <p className="card-text text-center">{item.description}</p>
          </div>
        </div>
      );
      
    default:
      return null;
  }
};
