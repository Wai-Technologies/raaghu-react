import React, { Fragment, useState, useEffect } from "react";
import "./rds-carousel.css";
import "../../../raaghu-react-themes/src/styles/carousel.scss"

export interface CarouselItem { // Carousel Item
    id: number;
    imgUrl: string;
    name?: string;
    subTitle?: string;
}

export interface RdsCarouselProps {
    Indicators: boolean; // show or hide indicators
    crossFade?: boolean; // crossfade effect
    controls?: boolean; // show or hide controls
    type?: "Circle" | "Line"; // type of indicators
    carouselItems: CarouselItem[]; // array of carousel items
    style?: string;  // style of carousel
    state?: string; // active state of carousel
}

const RdsCarousel = (props: RdsCarouselProps) => {
    const style = `${props.hasOwnProperty("style") ? props.style : "Default"}`;
    const Fade = props.crossFade || false;
    let roleClass = "";
    let indicatorClass="";
    switch (style) {
      case "With Title":
        roleClass = "carousel-slide";
        indicatorClass="carousel-indicators-bottom";
        break;
      case "Full Width Image":
        roleClass = "carousel-fade";
        indicatorClass="carousel-indicators-bottom";
        break;
      default:
        roleClass = "carousel-fade";
        indicatorClass="carousel-indicators-onImage";
    }

    const [activeState, setActiveState] = useState(parseInt(props.state || '1')); // Default to first item
    const activeItem = props.carouselItems.find(item => item.id === activeState);

    useEffect(() => {
        setActiveState(parseInt(props.state || '1'));
    }, [props.state]);

    const handlePrev = () => {
        setActiveState(prevState => (prevState === 1 ? props.carouselItems.length : prevState - 1));
    };

    const handleNext = () => {
        setActiveState(prevState => (prevState === props.carouselItems.length ? 1 : prevState + 1));
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
                  className={`carousel-item ${carouselItem.id === activeState ? "active" : ""} ${roleClass}`}>
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
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide="next"
                  onClick={handleNext}
                >
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
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
                  className={`carousel-item ${carouselItem.id === activeState ? "active" : ""} ${roleClass}`}>
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
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide="next"
                  onClick={handleNext}
                >
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </>
            )}
          </div>
        </div>
        )}

        {(style == "Full Width Image") && activeItem && (
          <div className="col-sm-12 carousel-full-width">
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
                    className={`carousel-item ${carouselItem.id === activeState ? "active" : ""} ${roleClass} imageheight`}>
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
            <div className="carousel-item-caption mt-3">
              <h5>{activeItem.name}</h5>
              <p>{activeItem.subTitle}</p>
            </div>
          </div>
        )}

      </Fragment>
    );
};
export default RdsCarousel;