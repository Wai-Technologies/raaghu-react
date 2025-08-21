import React, { type ReactNode, useState } from "react";
import { Drawer, Box, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";
import RdsButton from "../../raaghu-elements/rds-button/rds-button";
import RdsIconButton from "../../raaghu-elements/rds-icon-button/rds-icon-button";
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
  buttonname?: string;
  offcanvasbutton?: ReactNode;
  children?: ReactNode;
  onclick?: (data: any) => void;
  className?: string;
  showPrimaryButton?: boolean;
  showSecondaryButton?: boolean;
  showTertiaryButton?: boolean;
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
  buttonname,
  offcanvasbutton,
  children,
  onclick,
  className,
  showPrimaryButton = false,
  showSecondaryButton = false,
  showTertiaryButton = false,
  ...props
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
  const getWidth = () => {
    if (placement === RdsOffcanvasPlacement.Top || placement === RdsOffcanvasPlacement.Bottom) {
      return "100%";
    }
    return offcanvaswidth;
  };
  const getHeight = () => {
    if (placement === RdsOffcanvasPlacement.Top || placement === RdsOffcanvasPlacement.Bottom) {
      return offcanvaswidth;
    }
    return "100%";
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
            <RdsButton text="Button" style="filled" size="medium" onClick={handleOpen}/>
          </div>        
        <Drawer
          anchor={getAnchor()}
          open={drawerOpen}
          onClose={handleClose}
          disableEscapeKeyDown={!preventEscapeKey}
          {...getBackdropProps()}
          sx={{
            '& .MuiDrawer-paper': {width: getWidth(),height: getHeight(),boxSizing: 'border-box',padding: 0,},
          }}
          id={offId}>
          <Box className="offcanvas-container" sx={{ height: '100%', display: 'flex', flexDirection: 'column',overflow: scrolling ? 'auto' : 'hidden'
          }}>
            <Box className={`offcanvas-header ${
              isCanvasTitle
                ? "py-2 my-2 d-flex justify-content-between"
                : "py-1 border-0 justify-content-end"
            }`} sx={{display: 'flex',alignItems: 'center',justifyContent: isCanvasTitle ? 'space-between' : 'flex-end',padding: isCanvasTitle ? '8px 16px' : '4px 16px',borderBottom: isCanvasTitle ? '1px solid #e0e0e0' : 'none',
            }}>
              {isCanvasTitle && (
                <Typography
                  variant="h6"
                  className="offcanvas-title text-uppercase"
                  sx={{ textTransform: 'uppercase', fontWeight: 'bold' }}
                >
                  {canvasTitle}
                </Typography>
              )}
              <span className="close" id="close-btn">
                <RdsIconButton onClick={handleClose} tooltip={"Close"}
                  sx={{ padding: '8px',border: '1px solid transparent',borderRadius: '5px',transition: 'all 0.2s ease-in-out','&:hover': {backgroundColor: 'aliceblue',borderRadius: '5px',
                    }
                  }}
                >
                  <Close />
                </RdsIconButton>
              </span>
            </Box>
            <Box className={`offcanvas-body ${className || ''}`} sx={{flex: 1,padding: '16px',display: 'flex',flexDirection: 'column',overflow: scrolling ? 'auto' : 'hidden'
            }}>
              <div className="d-flex flex-column h-100">
                {children}
              </div>
              {(showPrimaryButton || showSecondaryButton || showTertiaryButton) && (
                <Box className="d-flex justify-content-start mt-auto offcanvas-margin" id="offcanvas-btns" sx={{
                  display: 'flex',
                  gap: '8px',
                  marginTop: 'auto',
                  paddingTop: '16px',
                }}>
                  {showTertiaryButton && (
                    <Box className="me-2" sx={{flex: '1.7'}}>
                      <RdsButton text="RESTORE TO DEFAULT" style="transparent" size="medium"
                        sx={{ width: '100%'}}
                      />
                    </Box>
                  )}
                  {showSecondaryButton && (
                    <Box className="me-2" sx={{flex: 1}}>
                      <RdsButton text="CANCEL" style="outlined" size="medium" sx={{
                          width: '100%',
                        }}
                      />
                    </Box>
                  )}
                  {showPrimaryButton && (
                    <Box className="me-2" sx={{ flex: 1}}>
                      <RdsButton text="SAVE" style="filled" size="medium" onClick={handleClose}
                        sx={{width: '100%'}}
                      />
                    </Box>
                  )}
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