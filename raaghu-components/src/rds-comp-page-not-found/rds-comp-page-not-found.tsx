import React, { useContext } from 'react';
import "./rds-comp-page-not-found.css";
import { Link } from "react-router-dom";
import RdsCompIcon from '../rds-comp-icon';
import RdsCompLabel from '../rds-comp-label';

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
                                <RdsCompLabel label="Page not found"></RdsCompLabel>
                            </b>
                        </h1>
                        <RdsCompLabel
                            label="Sorry, we couldn't find the page you were looking for."
                            class="text-muted fw-medium mb-3" 
                        ></RdsCompLabel>
                        <p className="mb-0 pt-4">
                            <a className="go-back-home text-primary" href="#">
                                <span className="me-2">Go back home</span>
                                <RdsCompIcon
                                    name="right"
                                    fill={false}
                                    stroke={true}
                                    width="16px"
                                    height="16px"
                                ></RdsCompIcon>
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
