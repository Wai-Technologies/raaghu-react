import React, { ReactNode } from "react";
import "./rds-offcanvas.css";
import RdsIcon from "../rds-icon";
import { useTranslation } from "react-i18next";
import RdsButton from "../rds-button";
import { TooltipStyle } from "../rds-tooltip/rds-tooltip";

export enum RdsOffcanvasPlacement {
  Start = "start",
  End = "end",
  Top = "top",
  Bottom = "bottom"
}

export enum RdsOffcanvasBackDrop {
  Static = "static",
  True = "true",
  False = "false"
}

export interface RdsOffcanvasProps {
  placement: RdsOffcanvasPlacement;
  backDrop: RdsOffcanvasBackDrop;
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
  showPrimaryButton?: boolean;
  showSecondaryButton?: boolean;
  showTertiaryButton?: boolean;
}

const RdsOffcanvas = (props: RdsOffcanvasProps) => {
  const { t } = useTranslation();
  const preventEscapeKey = `${props.hasOwnProperty("preventEscapeKey") ? props.preventEscapeKey : true}`;
  const Backdrop = `${props.hasOwnProperty("backDrop") ? props.backDrop : true}`;

  const align = ` offcanvas p-0 offcanvas-${props.placement} ${props.placement == "start" || props.placement == "end" ? " offCanvas_Class" : " offCanvasClass"}`;
  const offcanvasCustomWidth = props.offcanvaswidth || 650;
  const Width = `${props.placement == "start" || props.placement == "end" ? `${offcanvasCustomWidth}px` : "100% "}`;
  const isCanvasTitle = props.canvasTitle !== "" && props.canvasTitle !== undefined;

  const OffCanvasBtn = document.querySelectorAll('[data-bs-toggle="offcanvas"]');
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
    <div className="offcanvas-text">
      {props.offcanvasbutton && (
        <div
          className="cursor-pointer"
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
        <div
          className={`${
            isCanvasTitle
              ? "offcanvas-header py-2 my-2 d-flex justify-content-between"
              : "offcanvas-header py-1 border-0 justify-content-end "
          }`}
        >
          {isCanvasTitle && (
            <h5
              className="offcanvas-title text-uppercase"
              id={`'canvas' +${props.offId}`}
            >
              {props.canvasTitle}
            </h5>
          )}
          <span className="close">
            <RdsButton
              icon="cross"
              size="large"
              databsdismiss="offcanvas"
              type={"button"}
              onClick={props.onClose}
              tooltip={true}
              tooltipTitle={t("Close") || ""}
              tooltipPlacement={TooltipStyle.RightArrow}
              aria-label="Close"
            ></RdsButton>
          </span>
        </div>
        <div className={`offcanvas-body ${props.className}`}>
          {props.children}
        
          <div className="d-flex justify-content-start mt-auto offcanvas-margin">
            {props.showTertiaryButton && (
              <div className="me-2">
                <RdsButton
                  label="RESTORE TO DEFAULT"
                  isOutline={true}
                  colorVariant="primary"
                  block={false}
                  tooltipTitle={""}
                  type="button"
                  size="medium"
                  style={"transparent"}
                />
              </div>
            )}
            {props.showSecondaryButton && (
              <div className="me-2">
                <RdsButton
                  label="CANCEL"
                  colorVariant="primary"
                  isOutline={true}
                  block={false}
                  tooltipTitle={""}
                  type="button"
                  size="medium"
                  style={"outline"}
                />
              </div>
            )}
            {props.showPrimaryButton && (
              <div className="me-2">
                <RdsButton
                  label="SAVE"
                  colorVariant="primary"
                  block={false}
                  tooltipTitle={""}
                  type="submit"
                  size="medium"
                  data-bs-dismiss="offcanvas"
                  databstoggle="offcanvas"
                  databstarget="#canvasExample"
                  ariacontrols="canvasExample"
                />
              </div>
            )}
          </div>
         
        </div>
      </div>
      </div>
    </>
  );
};

export default RdsOffcanvas;