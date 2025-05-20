import React, { Fragment, useState, useEffect } from "react";
import "./rds-carousel.css";
import "../../../raaghu-react-themes/src/styles/carousel.scss";
import RdsIcon from "../rds-icon";

export interface CarouselItem {
  id: number;
  imgUrl: string;
  name?: string;
  subTitle?: string;
}

export interface RdsCarouselProps {
  Indicators: boolean; // show or hide indicator
  crossFade?: boolean; // cross fade effect
  controls?: boolean; // show or hide controls
  type?: "Circle" | "Line"; // indicator type
  carouselItems: CarouselItem[]; // carousel items
  style?: string; // carousel style
  state?: string; // active state
  chevronColor?: string; // chevron color
  chevronHeight?: string; // chevron height
  chevronWidth?: string; // chevron width
}

const RdsCarousel = (props: RdsCarouselProps) => {
  const style = `${props.hasOwnProperty("style") ? props.style : "Default"}`;
  const Fade = props.crossFade || false;
  let roleClass = "";
  let indicatorClass = "";
  switch (style) {
    case "With Title":
      roleClass = "carousel-slide";
      indicatorClass = "carousel-indicators-bottom";
      break;
    case "Full Width Image":
      roleClass = "carousel-fade";
      indicatorClass = "carousel-indicators-bottom";
      break;
    default:
      roleClass = "carousel-fade";
      indicatorClass = "carousel-indicators-onImage";
  }

  const [activeState, setActiveState] = useState(parseInt(props.state || "1"));
  const activeItem = props.carouselItems.find((item) => item.id === activeState);

  useEffect(() => {
    setActiveState(parseInt(props.state || "1"));
  }, [props.state]);

  const handlePrev = () => {
    setActiveState((prevState) =>
      prevState === 1 ? props.carouselItems.length : prevState - 1
    );
  };

  const handleNext = () => {
    setActiveState((prevState) =>
      prevState === props.carouselItems.length ? 1 : prevState + 1
    );
  };

  return (
    <Fragment>
      {style == "Default" && (
        <div className="col-sm-12 carousel-default">
          <div
            id="carouselExampleCaptions"
            className={`carousel slide ${roleClass}`}
            data-bs-ride="carousel"
          >
            {props.Indicators === true && (
              <div
                className={`carousel-indicators carousel-indicators-default ${indicatorClass} px-5 ${
                  props.type === "Circle"
                    ? "carousel-indicators-Circle"
                    : props.type === "Line"
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
                    className={carouselItem.id === activeState ? "active" : ""}
                    aria-current={carouselItem.id === activeState}
                    aria-label={`Slide ${carouselItem.id}`}
                  ></button>
                ))}
              </div>
            )}
            <div className="carousel-inner">
              {props.carouselItems.map((carouselItem) => (
                <div
                  key={carouselItem.id}
                  className={`carousel-item ${
                    carouselItem.id === activeState ? "active" : ""
                  } ${roleClass}`}
                >
                  <div className=" text-center imageheight">
                    <img
                      src={carouselItem.imgUrl}
                      className="card-image-top w-100"
                      alt="..."
                    />
                  </div>
                </div>
              ))}
            </div>
            {props.controls === true && (
              <>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide="prev"
                  onClick={handlePrev}
                >
                  <RdsIcon
                    name="chevron_left"
                    height={props.chevronHeight || "40px"}
                    width={props.chevronWidth || "40px"}
                    fill={false}
                    stroke={true}
                    colorVariant={props.chevronColor}
                  />
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide="next"
                  onClick={handleNext}
                >
                  <RdsIcon
                    name="chevron_right"
                    height={props.chevronHeight || "40px"}
                    width={props.chevronWidth || "40px"}
                    fill={false}
                    stroke={true}
                    colorVariant={props.chevronColor}
                  />
                  <span className="visually-hidden">Next</span>
                </button>
              </>
            )}
          </div>
        </div>
      )}
      {style == "With Title" && activeItem && (
        <div className="col-sm-12 carousel-with-title">
          <div className="carousel-item-title">
            <h5>{activeItem.name}</h5>
            <p>{activeItem.subTitle}</p>
          </div>
          <div
            id="carouselExampleCaptions"
            className={`carousel slide ${roleClass}`}
            data-bs-ride="carousel"
          >
            {props.Indicators === true && (
              <div
                className={`carousel-indicators ${indicatorClass} px-5 ${
                  props.type === "Circle"
                    ? "carousel-indicators-Circle"
                    : props.type === "Line"
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
                    className={carouselItem.id === activeState ? "active" : ""}
                    aria-current={carouselItem.id === activeState}
                    aria-label={`Slide ${carouselItem.id}`}
                  ></button>
                ))}
              </div>
            )}
            <div className="carousel-inner">
              {props.carouselItems.map((carouselItem) => (
                <div
                  key={carouselItem.id}
                  className={`carousel-item ${
                    carouselItem.id === activeState ? "active" : ""
                  } ${roleClass}`}
                >
                  <div className="card text-center imageheight">
                    <img
                      src={carouselItem.imgUrl}
                      className="card-image-top w-100"
                      alt="..."
                    />
                  </div>
                </div>
              ))}
            </div>
            {props.controls === true && (
              <>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide="prev"
                  onClick={handlePrev}
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide="next"
                  onClick={handleNext}
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {style == "Full Width Image" && activeItem && (
        <div className="col-sm-12">
          <div
            id="carouselExampleCaptions"
            className={
              Fade === true ? `carousel slide ${roleClass}` : "carousel slide "
            }
            data-bs-ride="carousel"
          >
            {props.Indicators === true && (
              <div
                className={`carousel-indicators ${indicatorClass} px-5 ${
                  props.type === "Circle"
                    ? "carousel-indicators-Circle"
                    : props.type === "Line"
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
                    className={carouselItem.id === activeState ? "active" : ""}
                    aria-current={carouselItem.id === activeState}
                    aria-label={`Slide ${carouselItem.id}`}
                  ></button>
                ))}
              </div>
            )}
            <div className="carousel-inner">
              {props.carouselItems.map((carouselItem) => (
                <div
                  key={carouselItem.id}
                  className={`carousel-item ${
                    carouselItem.id === activeState ? "active" : ""
                  } ${roleClass} imageheight`}
                >
                  <div className="position-relative">
                    <img
                      src={props.carouselItems[carouselItem.id - 1].imgUrl}
                      className="d-block card-image-top-full-width w-100"
                      alt="..."
                    />
                    <span className="position-absolute top-0 end-0 m-2 close-icon-border-radius bg-white p-2">
                      <RdsIcon
                        name="close"
                        fill={false}
                        stroke={true}
                        colorVariant="primary"
                        isCursorPointer={true}
                        width="18px"
                        height="18px"
                      />
                    </span>
                    <span className="position-absolute close-icon-border-radius top-0 end-0 m-2 me-5 bg-white p-2">
                      <RdsIcon
                        name="heart"
                        fill={false}
                        stroke={true}
                        colorVariant="primary"
                        isCursorPointer={true}
                        width="18px"
                        height="18px"
                      />
                    </span>
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
                onClick={handlePrev}
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
                onClick={handleNext}
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            )}
          </div>
          <div className="carousel-item-caption mt-3 ms-3">
            <h5>{activeItem.name}</h5>
            <p>{activeItem.subTitle}</p>
          </div>
        </div>
      )}
    </Fragment>
  );
};
export default RdsCarousel;