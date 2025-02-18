import React, { Fragment } from "react";
import "./rds-carousel.css";
import RdsIcon from "../rds-icon/rds-icon";

export interface RdsCarouselProps {
    role?: string;
    Indicators: boolean;
    crossFade?: boolean;
    controls?: boolean;
    IndicatorType?: string;
    carouselItems: any[];
}

const RdsCarousel = (props: RdsCarouselProps) => {
    const Role = `${props.hasOwnProperty("role") ? props.role : "advanced"}`;
    const Fade = props.crossFade || false;
    let roleClass = "";
    let indicatorClass="";
    switch (Role) {
      case "style1":
        roleClass = "carousel-slide";
        indicatorClass="carousel-indicators-bottom";
        break;
      case "style2":
        roleClass = "carousel-fade";
        indicatorClass="carousel-indicators-bottom";
        break;
      case "style3":
        roleClass = "carousel-flip";
        indicatorClass="carousel-indicators-bottom";
        break;
      case "style4":
        roleClass = "carousel-rotate";
        indicatorClass="carousel-indicators-onImage";
        break;
      default:
        roleClass = "carousel-fade";
        indicatorClass="carousel-indicators-onImage";
    }
    return (
      <Fragment>
        {(
          Role == "style1" ||
          Role == "style2" ||
          Role == "style3" ||
          Role == "style4") && (
          <div className="col-sm-12">
            <div
              id="carouselExampleCaptions"
              className={
                Fade === true
                  ? `carousel slide ${roleClass}`
                  : "carousel slide "
              }
              data-bs-ride="carousel"
            >
              {props.Indicators === true && (
                <div
                  className={`carousel-indicators ${indicatorClass} px-5 ${
                    props.IndicatorType === "Circle"
                      ? "carousel-indicators-Circle"
                      : props.IndicatorType === "Line"
                      ? "carousel-indicators-line"
                      : ""
                  }`}
                >
                  {props.carouselItems.map((carouselItem) => (
                    <button
                      key={carouselItem.id}
                      tabIndex={0}
                      type="button"
                      data-bs-target="#carouselExampleCaptions"
                      data-bs-slide-to={carouselItem.id - 1}
                      className={carouselItem.id == 1 ? "active" : ""}
                      aria-current={carouselItem.id == 1 ? true : false}
                      aria-label="Slide"
                    ></button>
                  ))}
                </div>
              )}
              <div className="carousel-inner">
                {props.carouselItems.map((carouselItem) => (
                  <div
                    key={carouselItem.id}
                    className={`carousel-item ${
                      carouselItem.id == 1 ? "active" : ""
                    } ${roleClass}`}
                  >
                    <img
                      src={props.carouselItems[carouselItem.id - 1].imgUrl}
                      className="d-block w-100"
                      alt="..."
                    />
                  </div>
                ))}
              </div>
              {props.controls === true && (
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
              )}
              {props.controls === true && (
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              )}
            </div>
          </div>
        )}

        {Role == "advanced" && (
          <div className="col-sm-12">
            <div
              id="carouselExampleCaptions"
              className={
                Fade === true
                  ? "carousel slide carousel-fade carousel-dark "
                  : "carousel slide carousel-dark "
              }
              data-bs-ride="slide"
            >
              {props.Indicators === true && (
                <div
                  className={`carousel-indicators px-5 ${
                    props.IndicatorType === "Circle"
                      ? "carousel-indicators-Circle"
                      : props.IndicatorType === "Line"
                      ? "carousel-indicators-line"
                      : ""
                  }`}
                >
                  {props.carouselItems.map((carouselItem) => (
                    <button
                      key={carouselItem.id}
                      tabIndex={0}
                      type="button"
                      data-bs-target="#carouselExampleCaptions"
                      data-bs-slide-to={carouselItem.id - 1}
                      className={carouselItem.id == 1 ? "active" : ""}
                      aria-current={carouselItem.id == 1 ? true : false}
                      aria-label="Slide"
                    ></button>
                  ))}
                </div>
              )}
              <div className="carousel-inner">
                {props.carouselItems.map((carouselItem) => (
                  <div
                    key={carouselItem.id}
                    className={`carousel-item ${
                      carouselItem.id == 1 ? "active" : ""
                    }`}
                  >
                    <div className="content text-center">
                      <span>
                        <RdsIcon
                          name="quote"
                          height="20px"
                          width="20px"
                          fill={false}
                          stroke={true}
                        ></RdsIcon>
                        <img
                          src={props.carouselItems[carouselItem.id - 1].imgUrl}
                          width="100"
                          height="100"
                          className="justify-self-center rounded-circle m-2"
                          alt="..."
                        />
                        <RdsIcon
                          name="quote_right"
                          height="20px"
                          width="20px"
                          fill={false}
                          stroke={true}
                        ></RdsIcon>
                      </span>
                      <br />
                      <h1>{props.carouselItems[carouselItem.id - 1].name}</h1>
                      <h6>
                        {props.carouselItems[carouselItem.id - 1].roleName}{" "}
                      </h6>
                      <br />
                      <p className="subtitle">
                        {props.carouselItems[carouselItem.id - 1].subTitle}
                      </p>
                      <br />
                    </div>
                  </div>
                ))}
              </div>
              {props.controls === true && (
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon  "
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
              )}
              {props.controls === true && (
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon "
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              )}
            </div>
          </div>
        )}
      </Fragment>
    );
};
export default RdsCarousel;
