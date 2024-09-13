import React from "react";
import { RdsButton, RdsIcon } from "../rds-elements";
import "./rds-comp-cookies-section.css";
import { tr } from "date-fns/locale";
export interface RdsCompCookiesSectionProps {
    showDeclineButton?: boolean;
}
const RdsCompCookiesSection = (props: RdsCompCookiesSectionProps) => {
    const alertMessage =
        "This website uses cookies to ensure you get the best experience on our website.";

    return (
        <div>
            <div className="shadow position-relative alert cookies w-100">
                <div className="position-absolute position-close">
                    <button
                        type="button"
                        className="btn-close position-right"
                        data-bs-dismiss="alert"
                        aria-label="Close"
                    ></button>
                </div>
                <div className="row align-items-start p-3">
                    <div className="col-md-2 p-0">
                        <div className="my-2 mx-2">
                            {/* <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={200}
                                height={200}
                                viewBox="0 0 95.669 95.669"
                                {...props}
                            >
                                <g data-name="Group 191548">
                                    <path
                                        data-name="Path 170649"
                                        d="M47.834 0A47.834 47.834 0 110 47.834 47.834 47.834 0 0147.834 0z"
                                        fill="#fff"
                                        transform="translate(287 -5.666) translate(-287 5.666)"
                                    />
                                    <path
                                        d="M-216.847 46.966a7.173 7.173 0 003.8 3.216c1.357.367 2.944.034 4.814-1.119a1.59 1.59 0 012.2.527 1.621 1.621 0 01.238.816q.107 1.168.133 2.37c.017.813.01 1.618-.027 2.421h0a1.394 1.394 0 01-.017.211 33.893 33.893 0 01-11.073 23.325 33.553 33.553 0 01-24.249 8.728v.007h0a1.43 1.43 0 01-.211-.017 33.869 33.869 0 01-31.886-35.5h0a1.393 1.393 0 01.017-.211 33.843 33.843 0 0111.329-23.413 34.275 34.275 0 0124.501-8.789h0a1.6 1.6 0 011.6 1.608 1.565 1.565 0 01-.126.622 9.227 9.227 0 00-.15 5.641 4.9 4.9 0 003 3.07 1.6 1.6 0 01.962 1.975h.007a14.166 14.166 0 00-.289 8.49 8.5 8.5 0 005.685 5.661 13.055 13.055 0 007.919-.306 1.606 1.606 0 011.833.666h0zm-23.518 4.716a2.788 2.788 0 11-2.771 2.788 2.775 2.775 0 012.771-2.788zm-12.016 11.476a3.4 3.4 0 11-3.38 3.4 3.39 3.39 0 013.38-3.4zm7.283-26a2.666 2.666 0 11-2.652 2.666 2.656 2.656 0 012.652-2.666zm37.951.36a1.992 1.992 0 11-1.982 1.992 1.987 1.987 0 011.982-1.992zm-14.212-5.28a3 3 0 11-2.982 3 2.987 2.987 0 012.982-3h0zm2.309-12.418a3.217 3.217 0 11-3.2 3.216 3.211 3.211 0 013.2-3.216zm-11.656 44.521a4.468 4.468 0 11-4.444 4.468 4.455 4.455 0 014.444-4.468zm-24.8-18.83a4.835 4.835 0 11-4.808 4.835 4.82 4.82 0 014.808-4.835zm46.618 9.6zm-32.066 25.737z"
                                        fill="none"
                                        stroke="#a061f7"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2.5}
                                        transform="translate(287 -5.666)"
                                    />
                                </g>
                            </svg> */}
                            <RdsIcon
                            name="cookies"
                            fill={false}
                            stroke={true}
                            height="100px"
                            width="80px"
                            colorVariant="primary"
                        />
                        </div>
                    </div>
                    <div className="col-md-6 p-0 align-self-start">
                        <div className="mx-2 my-2">
                            <span>{alertMessage}</span>
                            {!props.showDeclineButton && (
                                <div className="mt-3">
                                    <RdsButton
                                        label="Accept"
                                        type="button"
                                        colorVariant="primary"
                                        dataTestId="accept"
                                    ></RdsButton>
                                </div>
                            )}
                        </div>
                    </div>
                    {props.showDeclineButton && (
                        <div className="col-md-3 p-0">
                            <div className="mx-2 my-2">
                                <div className="mt-3 w-50">
                                    <RdsButton
                                        label="Accept"
                                        type="button"
                                        block={true}
                                        colorVariant="primary"
                                        dataTestId="show-accept"
                                    ></RdsButton>
                                </div>
                                <div className="mt-3 w-50">
                                    <RdsButton
                                        class="me-2"
                                        tooltipTitle={""}
                                        type={"button"}
                                        block={true}
                                        label="Decline"
                                        colorVariant="outline-primary"
                                        size="small"
                                        databsdismiss="offcanvas"
                                        dataTestId="decline"
                                    ></RdsButton>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RdsCompCookiesSection;
