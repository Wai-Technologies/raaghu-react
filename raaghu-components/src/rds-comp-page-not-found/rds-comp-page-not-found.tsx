import React, { useContext } from 'react';
import "./rds-comp-page-not-found.css";
import { RdsLabel, RdsIcon } from "../rds-elements";
import { Link } from "react-router-dom";

// Import your context if you're using it
// import { YourContext } from "path/to/context";

export interface RdsCompPageNotFoundProps { }

const RdsCompPageNotFound = (props: RdsCompPageNotFoundProps) => {
    // If you're using context, you can destructure it here
    // const { basename } = useContext(YourContext);

    // Check if context exists before destructuring its properties
    // const basenameValue = basename ? basename : "";

    return (
        <>
            <div className="row">
                <div
                    className="col-xxl-6 col-xl-6 col-lg-12 col-md-12 col-12 text-center p-4 d-flex justify-content-center align-items-center vh-100">
                
                    <div className="mt-mb-custom text-center">
                        <h1 className="pb-1">
                            <b>
                                <RdsLabel label="Page not found"></RdsLabel>
                            </b>
                        </h1>
                        <RdsLabel
                            label="Sorry, we couldn't find the page you were looking for."
                            class="text-muted fw-medium mb-3" 
                        ></RdsLabel>
                        <p className="mb-0 pt-4">
                            <a className="go-back-home text-primary" href="#">
                                <span className="me-2">Go back home</span>
                                <RdsIcon
                                    name="right"
                                    fill={false}
                                    stroke={true}
                                    width="16px"
                                    height="16px"
                                ></RdsIcon>
                            </a>
                        </p>
                    </div>
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
