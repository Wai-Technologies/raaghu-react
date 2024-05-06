import React, { ReactNode } from "react";
import "./rds-offcanvas.css";
import RdsIcon from "../rds-icon";
import { useTranslation } from "react-i18next";
export interface RdsOffcanvasProps {
    placement: "start" | "end" | "top" | "bottom";
    backDrop: "static" | true | false;
    scrolling: boolean;
    preventEscapeKey?: boolean;
    offId: string;
    canvasTitle: string;
    offcanvaswidth?: number;
    onShow?: React.EventHandler<HTMLAllCollection | any>;
    onClose?: React.EventHandler<HTMLAllCollection | any>;
    buttonname?: string;
    offcanvasbutton?: ReactNode;
    children?: ReactNode;
    onclick?: (data: any) => void;
    className?: string;
}
const RdsOffcanvas = (props: RdsOffcanvasProps) => {
    const { t } = useTranslation();
    const preventEscapeKey = `${props.hasOwnProperty("preventEscapeKey") ? props.preventEscapeKey : true}`;
    const Backdrop = `${props.hasOwnProperty("backDrop") ? props.backDrop : true}`;

    const align = ` offcanvas p-0 offcanvas-${props.placement} ${props.placement == "start" || props.placement == "end"
        ? " offCanvas_Class"
        : " offCanvasClass"
        }`;
    const offcanvasCustomWidth = props.offcanvaswidth || 650;
    const Width = `${props.placement == "start" || props.placement == "end"
        ? `${offcanvasCustomWidth}px`
        : "100% "
        }`;
    const isCanvasTitle = props.canvasTitle !== "" && props.canvasTitle !== undefined;

    const OffCanvasBtn = document.querySelectorAll("[data-bs-toggle=\"offcanvas\"]");
    OffCanvasBtn.forEach((element) => {
        element.addEventListener("click", () => {
            const allBackdrops = document.querySelectorAll(".offcanvas-backdrop");
            if (allBackdrops.length > 1) {
                for (let i = 0; i < allBackdrops.length - 1; i++) {
                    allBackdrops[i].remove();
                }
            }
        });
    });


    return (
        <>
            {props.offcanvasbutton && (
                <div className="cursor-pointer"
                    onClick={props.onclick}
                    data-bs-toggle="offcanvas"
                    data-bs-target={`#${props.offId}`}
                    aria-controls={`${props.offId}`}
                >
                    {props.offcanvasbutton}
                </div>
            )}
            <div
                className={align}
                data-bs-scroll={props.scrolling}
                data-bs-keyboard={preventEscapeKey}
                data-bs-backdrop={Backdrop}
                data-bs-padding={0}
                tabIndex={-1}
                id={`${props.offId}`}
                aria-labelledby={`${props.offId}`}
                style={{ width: Width }}
            >
                <div className={`${isCanvasTitle ? "offcanvas-header py-2 my-2 d-flex justify-content-between" : "offcanvas-header py-1 border-0 justify-content-end "}`}>
                    {isCanvasTitle && <h5 className="offcanvas-title text-uppercase" id={`'canvas' +${props.offId}`}>
                        {props.canvasTitle}
                    </h5>}
                    <span className="close">
                        <RdsIcon
                            colorVariant="secondary"
                            height="12px"
                            name="close"
                            stroke={false}
                            width="12px"
                            databsdismiss="offcanvas"
                            onClick={props.onClose}
                            tooltip={true}
                            tooltipTitle="Close"
                            tooltipPlacement="left" aria-label="Close"
                        />
                        {/* <RdsButton
                            icon="close"
                            size="large"
                            databsdismiss="offcanvas"
                            type={"button"}
                            onClick={props.onClose}
                            tooltip={true}
                            tooltipTitle={t("Close") || ""}
                            tooltipPlacement="left" aria-label="Close"
                        >

                        </RdsButton> */}
                    </span>
                </div>
                <div className={`offcanvas-body ${props.className}`}>
                    {props.children}
                </div>
            </div>
        </>
    );
};
export default RdsOffcanvas;
