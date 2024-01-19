import React from "react";
import "./rds-comp-page-not-found.css";
import { RdsLabel, RdsIcon } from "../rds-elements";
import { Link } from "react-router-dom";

export interface RdsCompPageNotFoundProps { }

const RdsCompPageNotFound = (props: RdsCompPageNotFoundProps) => {
    return (
        <>
            <div className="row">
                <div
                    className="col-xxl-6 col-xl-6 col-lg-12 col-md-12 col-12 text-center p-4 d-grid vh-100">
                    <div>
                        <img width={180}
                            src="assets/raaghu-logo.svg"
                            alt="raaghu-logo"
                        ></img>
                    </div>
                    <div className="mt-mb-custom">
                        <h1 className="pb-1">
                            <b>
                                <RdsLabel label="Page not found"></RdsLabel>
                            </b>
                        </h1>
                        <RdsLabel
                            label="Sorry, we couldn't find the page you are looking for."
                            class="text-muted fw-medium mb-3" 
                        ></RdsLabel>
                        <p className="mb-0 pt-4">
                            <Link className="go-back-home text-primary" to="/">
                                <span className="me-2">Go back home</span>
                                <RdsIcon
                                    name="right"
                                    fill={false}
                                    stroke={true}
                                    width="16px"
                                    height="16px"
                                ></RdsIcon>
                            </Link>
                        </p>
                    </div>
                    {/* <div
                        className="d-flex justify-content-center text-muted pb-3">
                        <div className="pt-1">
                            <span className="px-3">Contact Support</span>{" "}
                            <span className="px-3">Status</span>{" "}
                            <span className="ps-3">Twitter</span>
                        </div>
                    </div> */}
                </div>
                <div
                    className="col-xxl-6 col-xl-6 col-lg-12 col-md-12 col-12 countdown-col vh-100 d-xl-block d-none" style={{
                        backgroundImage: `url("https://cdn.pixabay.com/photo/2012/10/10/11/18/weightless-60632_960_720.jpg")`,
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover"
                    }}>
                </div>
            </div>
        </>
    );
};

export default RdsCompPageNotFound;
