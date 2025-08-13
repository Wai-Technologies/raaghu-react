import React from "react";
import { RdsAvatar, RdsRating } from "../../raaghu-elements";
import { Item, RevieweStyle } from "./rds-comp-reviews";

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
        <div className="review-item">
          <div className="card h-100 style1">
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
                />
              </div>
              <p className="card-text">{item.description}</p>
            </div>
          </div>
        </div>
      );

    case RevieweStyle.Style2:
      return (
        <div className="review-item">
          <div className="card h-100 style2">
            <div className="card-body text-center d-flex flex-column">
              <h5 className="card-title">{item.name}</h5>
              <h6 className="text-muted">{item.username}</h6>
              <div className="my-3 d-flex justify-content-center">
                <RdsRating
                  value={item.rating || 4.5}
                  precision={0.5}
                  size="small"
                  readOnly
                />
              </div>
              <p className="card-text">{item.description}</p>
            </div>
          </div>
        </div>
      );
      
    case RevieweStyle.Style3:
      return (
        <div className="review-item">
          <div className="card style3">
            {/* User info with avatar */}
            <div className="d-flex align-items-center mb-3">
              <img
                src={item.imageUrl || "https://source.unsplash.com/random/200x200/?portrait"}
                alt={item.name}
                className="rounded-circle"
              />
              <div className="ms-3">
                <h5 className="card-title mb-0">{item.name}</h5>
                <small className="text-muted">
                  {formatDate(item.date)}
                </small>
              </div>
            </div>

            {/* Review content */}
            <p className="card-text">{item.description}</p>

            {/* Rating */}
            <div className="rating-wrapper mt-2">
              <RdsRating
                value={item.rating || 4.5}
                precision={0.5}
                size="small"
                readOnly
              />
            </div>
          </div>
        </div>
      );

    case RevieweStyle.Style4:
      return (
        <div className="review-item">
          <div className="card style4">
            {/* User info without avatar */}
            <div className="mb-3">
              <h5 className="card-title mb-0">{item.name}</h5>
              <small className="text-muted">
                {formatDate(item.date)}
              </small>
            </div>

            {/* Review content */}
            <p className="card-text">{item.description}</p>

            {/* Rating */}
            <div className="rating-wrapper mt-2">
              <RdsRating
                value={item.rating || 4.5}
                precision={0.5}
                size="small"
                readOnly
              />
            </div>
          </div>
        </div>
      );

    case RevieweStyle.Style5:
      return (
        <div className="review-item">
          <div className="card style5">
            {/* User info with avatar */}
            <div className="d-flex align-items-center mb-3">
              <img
                src={item.imageUrl || "https://source.unsplash.com/random/200x200/?portrait"}
                alt={item.name}
                className="rounded-circle"
              />
              <div className="ms-3">
                <h5 className="card-title mb-0">{item.name}</h5>
                <small className="text-muted">
                  {formatDate(item.date)}
                </small>
              </div>
            </div>
            
            {/* Rating */}
            <div className="rating-wrapper mb-3">
              <RdsRating
                value={item.rating || 4.5}
                precision={0.5}
                size="small"
                readOnly
              />
            </div>
            
            {/* Review content */}
            <p className="card-text">{item.description}</p>
          </div>
        </div>
      );
      
    case RevieweStyle.Style6:
      return (
        <div className="review-item">
          <div className="card style6">
            {/* User info without avatar */}
            <div className="mb-3">
              <h5 className="card-title mb-0">{item.name}</h5>
              <small className="text-muted">
                {formatDate(item.date)}
              </small>
            </div>
            
            {/* Rating */}
            <div className="rating-wrapper mb-3">
              <RdsRating
                value={item.rating || 4.5}
                precision={0.5}
                size="small"
                readOnly
              />
            </div>
            
            {/* Review content */}
            <p className="card-text">{item.description}</p>
          </div>
        </div>
      );
      
    case RevieweStyle.Style7:
      return (
        <div className="review-item review-item-large">
          <div className="card style7">
            {/* Header with Image, Name, and Rating */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="d-flex align-items-center">
                <img
                  src={item.imageUrl || "https://source.unsplash.com/random/200x200/?portrait"}
                  alt={item.name}
                  className="rounded-circle"
                />
                <div className="ms-2">
                  <h5 className="card-title mb-0">{item.name}</h5>
                  <small className="text-muted d-block">
                    {formatDate(item.date)}
                  </small>
                </div>
              </div>
              {/* Rating at the End of the Line */}
              <div className="rating-wrapper">
                <RdsRating
                  value={item.rating || 4.5}
                  precision={0.5}
                  size="small"
                  readOnly
                />
              </div>
            </div>
            
            {/* Description */}
            <p className="card-text">{item.description}</p>
            
            {/* Like/Dislike Actions */}
            <div className="review-footer">
              <div className="actions-wrapper">
                <div className="action-btn">
                  <button className="btn btn-sm btn-outline-primary">
                    <i className="bi bi-hand-thumbs-up"></i>
                  </button>
                  <span className="count">{item.likes || 35}</span>
                </div>
                <div className="action-btn">
                  <button className="btn btn-sm btn-outline-danger">
                    <i className="bi bi-hand-thumbs-down"></i>
                  </button>
                  <span className="count">{item.dislikes || 10}</span>
                </div>
              </div>
              <small className="text-muted">{item.hashtags}</small>
            </div>
          </div>
        </div>
      );

    case RevieweStyle.Style8:
      return (
        <div className="review-item">
          <div className="card style8 h-100">
            {/* Rating with date */}
            <div className="mb-3">
              <div className="rating-wrapper mb-2">
                <RdsRating
                  value={item.rating || 4.5}
                  precision={0.5}
                  size="small"
                  readOnly
                />
              </div>
              <small className="text-muted d-block">
                {formatDate(item.date)}
              </small>
            </div>
            
            {/* Review content */}
            <p className="card-text flex-grow-1">{item.description}</p>
            
            {/* Name at the bottom */}
            <div className="d-flex justify-content-end mt-3">
              <h6 className="mb-0 text-end fw-medium">{item.name}</h6>
            </div>
          </div>
        </div>
      );
      
    case RevieweStyle.Style9: 
      return (
        <div className="review-item review-item-large">
          <div className="card style9">
            {/* Header with user info */}
            <div className="d-flex align-items-center">
              <img
                src={item.imageUrl || "https://source.unsplash.com/random/200x200/?portrait"}
                alt={item.name}
                className="rounded-circle"
              />
              <div className="ms-3">
                <h5 className="card-title mb-0">{item.name}</h5>
                <div className="text-muted">{item.username}</div>
              </div>
            </div>
            
            {/* Rating and date */}
            <div className="d-flex justify-content-between align-items-center mt-3">
              <div className="rating-wrapper">
                <RdsRating
                  value={item.rating || 4.5}
                  precision={0.5}
                  size="small"
                  readOnly
                />
              </div>

              <small className="text-muted">
                {formatDate(item.date)}
              </small>
            </div>
          
            {/* Review content */}
            <p className="card-text">{item.description}</p>

            {/* Like/Dislike Section */}
            <div className="review-footer">
              <div className="actions-wrapper">
                <div className="action-btn">
                  <button className="btn btn-sm btn-outline-primary">
                    <i className="bi bi-hand-thumbs-up"></i>
                  </button>
                  <span className="count">{item.likes || 35}</span>
                </div>
                <div className="action-btn">
                  <button className="btn btn-sm btn-outline-danger">
                    <i className="bi bi-hand-thumbs-down"></i>
                  </button>
                  <span className="count">{item.dislikes || 10}</span>
                </div>
              </div>
              <small className="text-muted">{item.hashtags}</small>
            </div>
          </div>
        </div>
      ); 
      
    case RevieweStyle.Style10: 
      return (
        <div className="review-item review-item-large">
          <div className="card style10">
            {/* User info without avatar */}
            <div className="mb-2">
              <h5 className="card-title mb-0">{item.name}</h5>
              <div className="text-muted">{item.username}</div>
            </div>
            
            {/* Rating and date */}
            <div className="d-flex justify-content-between align-items-center mt-2">
              <div className="rating-wrapper">
                <RdsRating
                  value={item.rating || 4.5}
                  precision={0.5}
                  size="small"
                  readOnly
                />
              </div>

              <small className="text-muted">
                {formatDate(item.date)}
              </small>
            </div>
          
            {/* Review content */}
            <p className="card-text">{item.description}</p>
            
            {/* Like/Dislike Section */}
            <div className="review-footer">
              <div className="actions-wrapper">
                <div className="action-btn">
                  <button className="btn btn-sm btn-outline-primary">
                    <i className="bi bi-hand-thumbs-up"></i>
                  </button>
                  <span className="count">{item.likes || 35}</span>
                </div>
                <div className="action-btn">
                  <button className="btn btn-sm btn-outline-danger">
                    <i className="bi bi-hand-thumbs-down"></i>
                  </button>
                  <span className="count">{item.dislikes || 10}</span>
                </div>
              </div>
              <small className="text-muted">{item.hashtags}</small>
            </div>
          </div>
        </div>
      );
      
    case RevieweStyle.Style11: 
      return (
        <div className="review-item review-item-small">
          <div className="card style11 h-100">
            <div className="card-body">
              <div className="d-flex justify-content-center mb-3">
                <RdsAvatar
                  src={item.imageUrl || "https://source.unsplash.com/random/200x200/?portrait"}
                  name={item.name}
                  size="large"
                />
              </div>
              <h5 className="card-title text-center">{item.name}</h5>
              <h6 className="text-center text-muted">{item.username}</h6>
              <div className="d-flex justify-content-center align-items-center gap-1 my-3">
                <RdsRating
                  value={1}
                  max={1}
                  size="small"
                  readOnly
                />
                <span className="rating-value">{item.reviews || "4.75"}</span>
              </div>
              <p className="card-text text-center">{item.description}</p>
            </div>
          </div>
        </div>
      );
      
    case RevieweStyle.Style12:
      return (
        <div className="review-item review-item-small">
          <div className="card style12 h-100">
            <div className="card-body">
              <h5 className="card-title text-center">{item.name}</h5>
              <h6 className="text-center text-muted">{item.username}</h6>
              <div className="d-flex justify-content-center align-items-center gap-1 my-3">
                <RdsRating
                  value={1}
                  max={1}
                  size="small"
                  readOnly
                />
                <span className="rating-value">{item.reviews || "4.75"}</span>
              </div>
              <p className="card-text text-center">{item.description}</p>
            </div>
          </div>
        </div>
      );
      
    default:
      return null;
  }
};
