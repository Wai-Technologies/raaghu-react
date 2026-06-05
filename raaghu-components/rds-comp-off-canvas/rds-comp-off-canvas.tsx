import React, { type ReactNode, useState } from "react";
import { Drawer, Box, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";
import RdsButton from "../../raaghu-elements/rds-button/rds-button";
import RdsIconButton from "../../raaghu-elements/rds-icon-button/rds-icon-button";
import { MotionDrawerTransition } from "../../raaghu-react-themes/src/motion";
import "./rds-comp-off-canvas.scss";
export enum RdsOffcanvasPlacement {Start = "left",End = "right",Top = "top",Bottom = "bottom"}
export enum RdsOffcanvasBackDrop {Static = "static",True = "true",False = "false"}
export interface RdsCompOffcanvasProps {
  placement: RdsOffcanvasPlacement;
  backDrop: RdsOffcanvasBackDrop;
  scrolling?: boolean;
  preventEscapeKey?: boolean;
  offId: string;
  canvasTitle: string;
  offcanvaswidth?: number;
  onShow?: () => void;
  onClose?: () => void;
  children?: ReactNode;
  onclick?: (data: any) => void;
  className?: string;
  showPrimaryButton?: boolean;
  showSecondaryButton?: boolean;
  showTertiaryButton?: boolean;
  animationDuration?: number;
}
const RdsCompOffcanvas: React.FC<RdsCompOffcanvasProps> = ({
  placement = RdsOffcanvasPlacement.End,
  backDrop = RdsOffcanvasBackDrop.True,
  scrolling = false,
  preventEscapeKey = true,
  offId,
  canvasTitle,
  offcanvaswidth = 650,
  onShow,
  onClose,
  children,
  onclick,
  className,
  showPrimaryButton = false,
  showSecondaryButton = false,
  showTertiaryButton = false,
  animationDuration,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const drawerOpen = internalOpen;
  const handleOpen = () => {
    if (onclick) onclick(true);
    setInternalOpen(true);
    if (onShow) onShow();
  };
  const handleClose = () => {
    if (onClose) onClose();
    setInternalOpen(false);
  };
  const getAnchor = () => {
    switch (placement) {
      case RdsOffcanvasPlacement.Start:
        return "left";
      case RdsOffcanvasPlacement.End:
        return "right";
      case RdsOffcanvasPlacement.Top:
        return "top";
      case RdsOffcanvasPlacement.Bottom:
        return "bottom";
      default:
        return "right";
    }
  };
  const isCanvasTitle = canvasTitle !== "" && canvasTitle !== undefined;
  const getBackdropProps = () => {
    if (backDrop === RdsOffcanvasBackDrop.False) {
      return { hideBackdrop: true };
    }
    if (backDrop === RdsOffcanvasBackDrop.Static) {
      return { 
        disableEscapeKeyDown: true,
        onBackdropClick: (event: any) => {
          event.stopPropagation();
        }
      };
    }
    return {};
  };
  return (
    <>
      <div className="offcanvas-text">
          <div
            className="offcanvas_btn"
            onClick={handleOpen}>
            <RdsButton text="Open Off Canvas" style="filled" size="medium" onClick={handleOpen}/>
          </div>        
        <Drawer
          anchor={getAnchor()}
          open={drawerOpen}
          onClose={handleClose}
          disableEscapeKeyDown={!preventEscapeKey}
          TransitionComponent={MotionDrawerTransition}
          TransitionProps={{ anchor: getAnchor(), durationMs: animationDuration } as any}
          {...getBackdropProps()}
          className={`offcanvas-drawer placement-${placement}`}
          id={offId}>
          <Box className={`offcanvas-container ${scrolling ? 'scrolling' : ''}`}>
            <Box className={`offcanvas-header ${isCanvasTitle ? '' : 'no-title'}`}>
              {isCanvasTitle ? (
                <div className="offcanvas-title-wrap">
                  <span className="offcanvas-title text-uppercase">{canvasTitle}</span>
                </div>
              ) : null}
              <div className="offcanvas-close-wrap" id="close-btn">
                <RdsIconButton onClick={handleClose} tooltip={"Close"} className="offcanvas-close-button">
                  <Close />
                </RdsIconButton>
              </div>
            </Box>
            <Box className={`offcanvas-body ${className || ''} ${scrolling ? 'scrolling' : ''}`}>
              <div className="d-flex flex-column h-100">
                {children}
              </div>
              {(showPrimaryButton || showSecondaryButton || showTertiaryButton) && (
                <Box className="d-flex justify-content-start mt-auto offcanvas-margin offcanvas-footer" id="offcanvas-btns">
                  <Box className="tertiary-button-container">
                    {showTertiaryButton && (
                      <RdsButton text="RESTORE TO DEFAULT" style="transparent" size="medium" className="offcanvas-action-btn" />
                    )}
                  </Box>
                  <Box className="secondary-button-container">
                    {showSecondaryButton && (
                      <RdsButton text="CANCEL" style="outlined" size="medium"  onClick={handleClose} className="offcanvas-cancel-btn"/>
                    )}
                  </Box>
                  <Box className="primary-button-container">
                    {showPrimaryButton && (
                      <RdsButton text="SAVE" style="filled" size="medium" onClick={handleClose} className="offcanvas-action-btn" />
                    )}
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </Drawer>
      </div>
    </>
  );
};
RdsCompOffcanvas.displayName = "RdsCompOffcanvas";
export default RdsCompOffcanvas;