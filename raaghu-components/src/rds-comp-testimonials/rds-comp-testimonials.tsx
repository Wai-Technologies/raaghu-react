import React from "react";
import {
    RdsCarousel,
} from "../rds-elements";
import RdsCompIcon from "../rds-comp-icon";
import RdsCompLabel from "../rds-comp-label";
import RdsCompTestimonial from "../rds-comp-testimonial/rds-comp-testimonial";

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
                                <RdsCompLabel label="Testimonials" fontWeight={"bold"}></RdsCompLabel>
                            </h2>
                            <span>
                                <RdsCompIcon
                                    height="15px"
                                    fill={false}
                                    stroke={true}
                                    width="15px"
                                    name="chevron_left"
                                    dataTestId="chevron_left"
                                ></RdsCompIcon>
                                <RdsCompIcon
                                    height="15px"
                                    fill={false}
                                    stroke={true}
                                    width="15px"
                                    name="chevron_right"
                                    dataTestId="chevron_right"
                                ></RdsCompIcon>
                            </span>
                        </div>
                        <div className="mt-4">
                            <div className="row">
                                {props.testimonialItems.map((testimonialItem: any) => (
                                    <>
                                        <div className="col-lg-4 col-md-4 col-sm-4">
                                            <RdsCompTestimonial
                                                testimonialItems={testimonialItem}
                                            ></RdsCompTestimonial>
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
                        <RdsCompLabel
                            label="'Testimonials'"
                            multiline={false}
                            fontWeight="bold"
                        ></RdsCompLabel>
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
