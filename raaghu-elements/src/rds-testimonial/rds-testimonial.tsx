import React from "react";
import RdsCompIcon from "../../../raaghu-components/src/rds-comp-icon/rds-comp-icon";

export interface RdsTestimmonialProps {
    testimonialItems: any[];
}

export const RdsTestimonial = (props: RdsTestimmonialProps) => {
    return (
        <>
            <div className="d-flex sm-block row " >
                {props.testimonialItems.map((testimonialItem) => (
                    <>
                        <div className="mb-3">
                            <div className="card text-center p-4 rounded-0 shadow border-0">
                                <div className="mt-3">
                                    <RdsCompIcon
                                        name={testimonialItem.icon}
                                        fill={testimonialItem.iconFill}
                                        stroke={testimonialItem.iconStroke}
                                        height={testimonialItem.iconHeight}
                                        width={testimonialItem.iconWidth}
                                        colorVariant="primary"
                                    // class="fs-6 me-2"
                                    ></RdsCompIcon>
                                </div>
                                <div className="card-body p-2 my-3 ">
                                    <label className="text-muted py-2 ">
                                        {testimonialItem.description}
                                    </label>
                                    <div>
                                        <div className="d-block mt-4">
                                            <div className="d-flex justify-content-center pb-3">
                                                <img
                                                    src={testimonialItem.img}
                                                    className="rounded-circle"
                                                    width="100"
                                                    height="100"
                                                    alt="..."
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="fs-5 fw-bold">
                                            {testimonialItem.title}
                                        </label>
                                    </div>
                                    <div className="mb-2">
                                        <label className="text-muted mt-1">
                                            {testimonialItem.subtitle}
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ))}
            </div>
        </>
    );
};

export default RdsTestimonial;
