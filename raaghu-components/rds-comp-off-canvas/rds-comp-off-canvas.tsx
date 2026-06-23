import clsx from "clsx";
import { type ReactNode, useState, useCallback, useMemo } from "react";
import { Drawer, Box } from "@mui/material";
import type { DrawerProps } from "@mui/material";
import { Close } from "@mui/icons-material";
import RdsButton from "../../raaghu-elements/rds-button/rds-button";
import RdsIconButton from "../../raaghu-elements/rds-icon-button/rds-icon-button";
import "./rds-comp-off-canvas.scss";
export { RdsOffcanvasPlacement, RdsOffcanvasBackDrop } from './rds-comp-off-canvas-types';
import { RdsOffcanvasPlacement, RdsOffcanvasBackDrop } from './rds-comp-off-canvas-types';
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
  onclick?: (data: boolean) => void;
  className?: string;
  showPrimaryButton?: boolean;
  showSecondaryButton?: boolean;
  showTertiaryButton?: boolean;
}
const RdsCompOffcanvas = ({
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
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const drawerOpen = internalOpen;
  const handleOpen = useCallback(() => {
    if (onclick) onclick(true);
    setInternalOpen(true);
    if (onShow) onShow();
  }, [onclick, onShow]);
  const handleClose = useCallback(() => {
    if (onClose) onClose();
    setInternalOpen(false);
  }, [onClose]);
  const handleDrawerClose: DrawerProps["onClose"] = (_, reason) => {
    if (backDrop === RdsOffcanvasBackDrop.Static && reason === "backdropClick") {
      return;
    }
    handleClose();
  };
  const getAnchor = useCallback(() => {
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
  }, [placement]);
  const isCanvasTitle = useMemo(() => canvasTitle !== "" && canvasTitle !== undefined, [canvasTitle]);
  const getBackdropProps = useCallback(() => {
    if (backDrop === RdsOffcanvasBackDrop.False) {
      return { hideBackdrop: true };
    }
    if (backDrop === RdsOffcanvasBackDrop.Static) {
      return {
        disableEscapeKeyDown: true,
      };
    }
    return {};
  }, [backDrop]);
  return (
    <>
      <div className="offcanvas-text">
          <div className="offcanvas_btn">
            <RdsButton text="Open Off Canvas" style="filled" size="medium" onClick={handleOpen}/>
          </div>        
        <Drawer
          anchor={getAnchor()}
          open={drawerOpen}
          onClose={handleDrawerClose}
          disableEscapeKeyDown={!preventEscapeKey}
          {...getBackdropProps()}
          className={clsx("offcanvas-drawer", `placement-${placement}`)}
          id={offId}>
          <Box className={clsx("offcanvas-container", scrolling && "scrolling")}>
            <Box className={clsx("offcanvas-header", !isCanvasTitle && "no-title")}>
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
            <Box className={clsx("offcanvas-body", className, scrolling && "scrolling")}>
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