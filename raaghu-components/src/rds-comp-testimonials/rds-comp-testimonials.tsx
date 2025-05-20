import React from "react";
import {
    RdsLabel,
    RdsTestimonial,
    RdsIcon,
    RdsCarousel,
} from "../rds-elements";

export interface RdsCompTestimonialsProps {
    testimonialItems?: any;
    displayType?: string;
    carousalItem?: any;
}

const RdsCompTestimonials = (props: RdsCompTestimonialsProps) => {
    return (
        <>
            {props.displayType == "advanced" && (
                <div>
                    <div className="col-md-12">
                        <div className="align-items-center col-md-12 d-flex justify-content-between">
                            <h2>
                                <RdsLabel label="Testimonials" fontWeight={"bold"}></RdsLabel>
                            </h2>
                            <span>
                                <RdsIcon
                                    height="15px"
                                    fill={false}
                                    stroke={true}
                                    width="15px"
                                    name="chevron_left"
                                    dataTestId="chevron_left"
                                ></RdsIcon>
                                <RdsIcon
                                    height="15px"
                                    fill={false}
                                    stroke={true}
                                    width="15px"
                                    name="chevron_right"
                                    dataTestId="chevron_right"
                                ></RdsIcon>
                            </span>
                        </div>
                        <div className="mt-4">
                            <div className="row">
                                {props.testimonialItems.map((testimonialItem: any) => (
                                    <>
                                        <div className="col-lg-4 col-md-4 col-sm-4">
                                            <RdsTestimonial
                                                testimonialItems={testimonialItem}
                                            ></RdsTestimonial>
                                        </div>
                                    </>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {props.displayType == "basic" && (
                <div>
                    <h2 className="text-center">
                        <RdsLabel
                            label="'Testimonials'"
                            multiline={false}
                            fontWeight="bold"
                        ></RdsLabel>
                    </h2>
                    <RdsCarousel
                        crossFade={true}
                        Indicators={true}
                        controls={true}
                        carouselItems={props.carousalItem} type="Line"></RdsCarousel>
                </div>
            )}
        </>
    );
};

export default RdsCompTestimonials;
