import React from "react";
import { RdsAvatar, RdsIcon, RdsLikeDislike, RdsRating, RdsReviewCategory } from "../rds-elements";
import RdsCompFeeds, { Item } from "../rds-comp-feeds/rds-comp-feeds";
import { ColorVariant, RatingStyle, RatingType } from "../../../raaghu-elements/src/rds-rating/rds-rating";
import { AvatarSize } from "../../../raaghu-elements/src/rds-avatar/rds-avatar";

export enum VariantType {
  Default = "Default",
  WithSummaryChart = "with-summary-chart",
  MultiColumn = "multi-column",
}

export interface RdsCompReviewsProps {
  itemList: Item[]; // List of items to be displayed
  style?: string; // Style of the component
  variantType?: VariantType; // Variant type of the component
}

const RdsCompReviews = (props: RdsCompReviewsProps) => {
  const renderContentByStyle = (item: Item) => {
    const currentDate = new Date();
    switch (props.style) {
      case "style1":
        return (
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
              <div className="card h-100 d-flex flex-column align-items-center">
                <div className="card-body text-center">
                  <div className="d-flex justify-content-center mb-3">
                    <RdsAvatar
                      profilePic={item.imageUrl}
                      withProfilePic={true}
                      size={AvatarSize.large}
                    />
                  </div>
                  <h5 className="card-title">{item.name}</h5>
                  <h6 className="text-muted">{item.username}</h6>
                  <div className="my-2 d-flex justify-content-center">
                  <RdsRating
                   colorVariant={ColorVariant.Primary}
                   dataTestId="rating-test"
                   filled
                   rating={item.rating}
                   size="medium"
                   style={RatingStyle.Filled}
                   type={RatingType.Star}
                   />
                  </div>
                  <p className="card-text">{item.description}</p>
                </div>
              </div>
            </div>
          </div>
        );

      case "style2":
        return (
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
              <div className="card h-100">
                <div className="card-body text-center d-flex flex-column">
                  <h5 className="card-title">{item.name}</h5>
                  <h6 className="text-muted">{item.username}</h6>
                  <div className="my-2 d-flex justify-content-center">
                  <RdsRating
                   colorVariant={ColorVariant.Primary}
                    dataTestId="rating-test"
                   filled
                   rating={item.rating}
                   size="medium"
                   style={RatingStyle.Filled}
                   type={RatingType.Star}
                   />
                   </div>
                  <p className="card-text">{item.description}</p>
                </div>
              </div>
            </div>
          </div>
        );
        

      case "style3":
        return (
          <div className="card p-3 col-lg-4 col-sm-12 col-md-6" >
            <div className="d-flex align-items-center">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="rounded-circle"
                style={{ width: '50px', height: '50px' }}
              />
              <div className="ms-3">
                <h5 className="fw-bold mb-0">{item.name}</h5>
                <small className="text-muted">
                  {item.date ? new Date(item.date).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                  }) : 'Date not available'}
                </small>
              </div>
            </div>

            <p className="mt-3">{item.description}</p>

            <div className="d-flex align-items-center mt-2">
            <RdsRating
             colorVariant={ColorVariant.Primary}
             dataTestId="rating-test"
             filled
             rating={4.5}
             size="medium"
             style={RatingStyle.Filled}
             type={RatingType.Star}
            />
            </div>
          </div>

        );

      case "style4":
        return (
          <div className="card p-3 col-lg-4 col-sm-12 col-md-6" >
            <div className="d-flex align-items-center">
              <div className="">
                <h5 className="fw-bold mb-0">{item.name}</h5>
                <small className="text-muted">
                  {item.date ? new Date(item.date).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                  }) : 'Date not available'}
                </small>
              </div>
            </div>

            <p className="mt-3">{item.description}</p>

            <div className="d-flex align-items-center mt-2">
            <RdsRating
             colorVariant={ColorVariant.Primary}
             dataTestId="rating-test"
             filled
             rating={4.5}
             size="medium"
             style={RatingStyle.Filled}
            type={RatingType.Star}
            />
            </div>
          </div>
        );

        case "style5":
          return (
            <div className="card p-3 col-lg-4 col-sm-12 col-md-6" >
              <div className="d-flex align-items-center">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="rounded-circle"
                  style={{ width: '50px', height: '50px' }}
                />
                <div className="ms-3">
                  <h5 className="fw-bold mb-0">{item.name}</h5>
                  <small className="text-muted">
                    {item.date ? new Date(item.date).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric'
                    }) : 'Date not available'}
                  </small>
                </div>
              </div>
              <div className="d-flex align-items-center mt-2">
            <RdsRating
             colorVariant={ColorVariant.Primary}
             dataTestId="rating-test"
             filled
             rating={4.5}
             size="medium"
             style={RatingStyle.Filled}
             type={RatingType.Star}
            />
            </div>
              <p className="mt-3">{item.description}</p>
            </div>
          );
          case "style6":
            return (
              <div className="card p-3 col-lg-4 col-sm-12 col-md-6">
                <div className="d-flex align-items-center">
                  <div className="">
                    <h5 className="fw-bold mb-0">{item.name}</h5>
                    <small className="text-muted">
                      {item.date ? new Date(item.date).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric'
                      }) : 'Date not available'}
                    </small>
                  </div>
                </div>
                <div className="d-flex align-items-center mt-2">
            <RdsRating
             colorVariant={ColorVariant.Primary}
             dataTestId="rating-test"
             filled
             rating={4.5}
             size="medium"
             style={RatingStyle.Filled}
             type={RatingType.Star}
            />
            </div>
                <p className="mt-3">{item.description}</p>
              </div>
            );
            case "style7":
              return (
                <div className="card p-3 col-lg-5 col-sm-12 col-md-6">
                  {/* Image, Name, and Rating in the Same Line */}
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="rounded-circle"
                        style={{ width: '50px', height: '50px' }}
                      />
                      <div className="ms-3">
                        <h5 className="fw-bold mb-0">{item.name}</h5>
                        <small className="text-muted">
                          {item.date
                            ? new Date(item.date).toLocaleDateString('en-GB', {
                                day: '2-digit',
                                month: 'long',
                                year: 'numeric',
                              })
                            : 'Date not available'}
                        </small>
                      </div>
                    </div>
                    {/* Rating at the End of the Line */}
                    <RdsRating
                      colorVariant={ColorVariant.Primary}
                      dataTestId="rating-test"
                      filled
                      rating={4.5}
                      size="medium"
                      style={RatingStyle.Filled}
                      type={RatingType.Star} 
                    />
                  </div>
            
                  {/* Description Below */}
                  <p className="mt-3">{item.description}</p>
            
                  {/* Like/Dislike Section */}
                  <div className="d-flex align-items-center justify-content-start my-3">
                    <RdsLikeDislike dislike={10} like={35} colorVariant="primary" />
                  </div>
                </div>
              );

              case "style8":
                return (
                  <div className="card p-3 col-lg-5 col-sm-12 col-md-6" style={{ height: '100%' }}>
                    <div>
                      <div className=" align-items-center">
                        <div className="">
                          <small className="text-muted">
                          <div className="d-flex align-items-center mt-2">
                           <RdsRating
                           colorVariant={ColorVariant.Primary}
                           dataTestId="rating-test"
                           filled
                           rating={4.5}
                           size="medium"
                           style={RatingStyle.Filled}
                           type={RatingType.Star}
                           />
                           </div>
                            {item.date
                              ? new Date(item.date).toLocaleDateString('en-GB', {
                                  day: '2-digit',
                                  month: 'long',
                                  year: 'numeric',
                                })
                              : 'Date not available'}
                          </small>
                        </div>
                      </div>
                      <p className="mt-3">{item.description}</p>
                    </div>
                    <div className="d-flex justify-content-end">
                      <h6 className="mb-0 text-end">{item.name}</h6>
                    </div>
                  </div>
                );
              case "style9": 
              return (
                <div className="card p-3 col-lg-6 col-md-6 col-sm-12 " >
                  <div className="d-flex align-items-center">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="rounded-circle"
                      style={{ width: '50px', height: '50px' }}
                    />
                    <div className="ms-3">
                      <h5 className="fw-bold mb-0">{item.name}</h5>
                      <div className="text-muted text-lowercase">{item.username}</div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mt-2">
                   <div className="d-flex align-items-center">
                   <RdsRating
                   colorVariant={ColorVariant.Primary}
                   dataTestId="rating-test"
                   filled
                   rating={4.5}
                   size="medium"
                   style={RatingStyle.Filled}
                   type={RatingType.Star}
                   />
                   </div>

                  <small className="text-muted">
                  {item.date
                  ? new Date(item.date).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                  })
                  : 'Date not available'}
                  </small>
                  </div>
              
                  <p className="mt-3">{item.description}</p>

                  <div className="d-flex align-items-center justify-content-start my-3">
                    <RdsLikeDislike dislike={10} like={35} colorVariant="primary" />
                  </div>
                </div>
              ); 
              case "style10": 
              return (
                <div className="card p-3 col-lg-6 col-md-6 col-sm-12" >
                  <div className="d-flex align-items-center">
                    <div className="">
                      <h5 className="fw-bold mb-0">{item.name}</h5>
                      <div className="text-muted text-lowercase">{item.username}</div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mt-2">
                   <div className="d-flex align-items-center">
                   <RdsRating
                   colorVariant={ColorVariant.Primary}
                   dataTestId="rating-test"
                   filled
                   rating={4.5}
                   size="medium"
                   style={RatingStyle.Filled}
                   type={RatingType.Star}
                   />
                   </div>

                  <small className="text-muted">
                  {item.date
                  ? new Date(item.date).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                  })
                  : 'Date not available'}
                  </small>
                  </div>
              
                  <p className="mt-3">{item.description}</p>
                  <div className="d-flex align-items-center justify-content-start my-3">
                    <RdsLikeDislike dislike={10} like={35} colorVariant="primary" />
                  </div>
                </div>
              );
              case "style11": 
              return (
                <div className="card col-lg-3 col-sm-12 col-md-6">
                  <div className="card-body">
                    <div className="d-flex justify-content-center mb-3">
                      <RdsAvatar
                        profilePic={item.imageUrl}
                        withProfilePic={true}
                        size={AvatarSize.large}
                      />
                    </div>
                    <h5 className="card-title text-center">{item.name}</h5>
                    <h6 className="text-center text-muted">{item.username}</h6>
                    <div className="my-2 d-flex justify-content-center align-items-center">
                      <RdsRating
                        colorVariant={ColorVariant.Primary}
                        dataTestId="rating-test"
                        filled
                        totalStars={1}  
                        size="medium"
                        style={RatingStyle.Filled}
                        type={RatingType.Star}
                        rating={4.75} 
                      />
                      <span className="fw-bold mt-1">{item.reviews}</span>
                    </div>
                    <p className="card-text text-center">{item.description}</p>
                  </div>
                </div>
              );
              case "style12":
          return (
          <div className="card col-lg-3 col-sm-12 col-md-6" >
            <div className="card-body">
              <h5 className="card-title text-center">{item.name}</h5>
              <h6 className="text-center text-muted">{item.username}</h6>
              <div className="my-2 d-flex justify-content-center align-items-center">
                      <RdsRating
                        colorVariant={ColorVariant.Primary}
                        dataTestId="rating-test"
                        filled
                        totalStars={1}  
                        size="medium"
                        style={RatingStyle.Filled}
                        type={RatingType.Star}
                        rating={4.75} 
                      />
                      <span className="fw-bold mt-1">{item.reviews}</span>
                    </div>
              <p className="card-text text-center">{item.description}</p>
            </div>
          </div>
        );   
      default:
        return null;
    }
  };

  return (
    <div>
      {props.variantType === "Default" &&
        props.itemList.map((item: Item, index: any) => (
          <div key={index}>
            {renderContentByStyle(item)}
          </div>
        ))}

      {props.variantType === "with-summary-chart" && (
        <RdsCompFeeds variantType="Advanced" itemList={props.itemList} />
      )}

      {props.variantType === "multi-column" &&
        props.itemList.map((item: any, index: any) => (
          <div key={index} className="mb-4">
            <RdsReviewCategory display_type="Basic" item={item} />
          </div>
        ))}
    </div>
  );
};

export default RdsCompReviews;
