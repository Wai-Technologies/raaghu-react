import React from "react";
import { RdsAvatar, RdsIcon, RdsLikeDislike, RdsRating, RdsReviewCategory } from "../rds-elements";
import RdsCompFeeds, { Item } from "../rds-comp-feeds/rds-comp-feeds";

export interface RdsCompReviewsProps {
  itemList: Item[];
  style?: string;
  variantType?: "Default" | "with-summary-chart" | "multi-column";
}

const RdsCompReviews = (props: RdsCompReviewsProps) => {
  const renderContentByStyle = (item: Item) => {
    const currentDate = new Date();
    switch (props.style) {
      case "style1":
        return (
          <div className="card col-lg-4 col-sm-12 col-md-6" >
            <div className="card-body">
              <div className="d-flex justify-content-center mb-3">
                <RdsAvatar
                  profilePic={item.imageUrl}
                  withProfilePic={true}
                  size="large"
                />
              </div>
              <h5 className="card-title text-center">{item.name}</h5>
              <div className="my-2 d-flex justify-content-center">
                <RdsRating
                  rating={item.rating}
                  colorVariant="warning"
                  size="medium"
                />
              </div>
              <p className="card-text text-center">{item.description}</p>
            </div>
          </div>
        );

      case "style2":
        return (
          <div className="card col-lg-4 col-sm-12 col-md-6" >
            <div className="card-body">
              <h5 className="card-title text-center">{item.name}</h5>
              <div className="my-2 d-flex justify-content-center">
                <RdsRating
                  rating={item.rating}
                  colorVariant="warning"
                  size="medium"
                />
              </div>
              <p className="card-text text-center">{item.description}</p>
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
                rating={item.rating}
                colorVariant="warning"
                size="medium"
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
                rating={item.rating}
                colorVariant="warning"
                size="medium"
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
                  rating={item.rating}
                  colorVariant="warning"
                  size="medium"
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
                    rating={item.rating}
                    colorVariant="warning"
                    size="medium"
                  />
                </div>
                <p className="mt-3">{item.description}</p>
              </div>
            );
            case "style7":
              return (
                <div className="card p-3 col-lg-5 col-sm-12 col-md-6" >
                  <div className=" justify-content-between align-items-center">
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
                    <div className="d-flex align-items-center">
                      <RdsRating rating={item.rating} colorVariant="primary" size="medium" />
                    </div>
                  </div>
              
                  <p className="mt-3">{item.description}</p>
              
                  <div className="d-flex align-items-center justify-content-start my-3">
                    <RdsLikeDislike dislike={10} like={35} />
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
                                rating={item.rating}
                                colorVariant="warning"
                                size="medium"
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
                      <h6 className="fw-bold mb-0 text-end">{item.name}</h6>
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
                  <div className=" justify-content-between align-items-center mt-2">
                    <RdsRating rating={item.rating} colorVariant="warning" size="medium" />
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
                  <div className=" justify-content-between align-items-center mt-2">
                    <RdsRating rating={item.rating} style="outline" colorVariant="warning" size="medium" />
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
