import React, { ReactNode, useState, useEffect } from "react";
import { 
  Drawer, 
  Box, 
  Typography, 
  IconButton,
  Stack,
  useTheme,
  useMediaQuery
} from "@mui/material";
import { Close } from "@mui/icons-material";
import RdsButton from "../../raaghu-elements/rds-button/rds-button";
import RdsIconButton from "../../raaghu-elements/rds-icon-button/rds-icon-button";
import { useTranslation } from "react-i18next";
import "./rds-comp-off-canvas.scss";

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
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width:414px)');
  const isTablet = useMediaQuery('(max-width:767px)');
  
  const [open, setOpen] = useState(false);

  const preventEscapeKey = `${props.hasOwnProperty("preventEscapeKey") ? props.preventEscapeKey : true}`;
  const Backdrop = `${props.hasOwnProperty("backDrop") ? props.backDrop : true}`;

  const offcanvasCustomWidth = props.offcanvaswidth || 650;
  const isCanvasTitle = props.canvasTitle !== "" && props.canvasTitle !== undefined;

  // Convert placement to MUI anchor
  const getAnchor = () => {
    switch (props.placement) {
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

  const getDrawerWidth = () => {
    if (props.placement === RdsOffcanvasPlacement.Top || props.placement === RdsOffcanvasPlacement.Bottom) {
      return "100%";
    }
    if (isMobile && props.offId === "profileOffCanvas") {
      return 375;
    }
    return offcanvasCustomWidth;
  };

  const getDrawerHeight = () => {
    if (props.placement === RdsOffcanvasPlacement.Top || props.placement === RdsOffcanvasPlacement.Bottom) {
      return offcanvasCustomWidth || 400;
    }
    return "100%";
  };

  const handleClose = () => {
    setOpen(false);
    if (props.onClose) {
      props.onClose({} as any);
    }
  };

  const handleOpen = () => {
    setOpen(true);
    if (props.onShow) {
      props.onShow({} as any);
    }
  };

  const handleBackdropClick = () => {
    if (props.backDrop !== RdsOffcanvasBackDrop.Static) {
      handleClose();
    }
  };

  // Simulate Bootstrap offcanvas behavior for backdrop cleanup
  useEffect(() => {
    const handleOffCanvasClick = () => {
      const allBackdrops = document.querySelectorAll(".MuiBackdrop-root");
      if (allBackdrops.length > 1) {
        for (let i = 0; i < allBackdrops.length - 1; i++) {
          allBackdrops[i].remove();
        }
      }
    };

    if (open) {
      handleOffCanvasClick();
    }
  }, [open]);

  return (
    <>
      <div className="offcanvas-text">
        {props.offcanvasbutton && (
          <div
            className="cursor-pointer"
            onClick={(e) => {
              if (props.onclick) props.onclick(e);
              handleOpen();
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                if (props.onclick) props.onclick(e);
                handleOpen();
              }
            }}
          >
            {/* If offcanvasbutton is a RdsButton, force style to filled */}
            {React.isValidElement(props.offcanvasbutton) && props.offcanvasbutton.type === RdsButton
              ? React.cloneElement(props.offcanvasbutton, { style: "filled" })
              : props.offcanvasbutton}
          </div>
        )}
        
        <Drawer
          id={props.offId}
          anchor={getAnchor()}
          open={open}
          onClose={props.backDrop === RdsOffcanvasBackDrop.False ? undefined : handleBackdropClick}
          hideBackdrop={props.backDrop === RdsOffcanvasBackDrop.False}
          disableEscapeKeyDown={preventEscapeKey === "true"}
          sx={{
            '& .MuiDrawer-paper': {
              width: props.placement === RdsOffcanvasPlacement.Start || props.placement === RdsOffcanvasPlacement.End 
                ? getDrawerWidth() 
                : '100%',
              height: props.placement === RdsOffcanvasPlacement.Top || props.placement === RdsOffcanvasPlacement.Bottom 
                ? getDrawerHeight() 
                : '100%',
              padding: 0,
              display: 'flex',
              flexDirection: 'column',
            },
            '& .MuiBackdrop-root': {
              backgroundColor: props.backDrop === RdsOffcanvasBackDrop.Static 
                ? 'rgba(0, 0, 0, 0.5)' 
                : undefined,
            }
          }}
          ModalProps={{
            disableScrollLock: !props.scrolling,
            keepMounted: false,
          }}
        >
          <Box
            className={`rds-offcanvas-container offcanvas p-0 offcanvas-${props.placement} ${
              props.placement === "start" || props.placement === "end" ? " offCanvas_Class" : " offCanvasClass"
            }`}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            }}
          >
            {/* Header */}
            <Box
              className={`${
                isCanvasTitle
                  ? "offcanvas-header py-2 my-2 d-flex justify-content-between"
                  : "offcanvas-header py-1 border-0 justify-content-end "
              }`}
              sx={{
                display: 'flex',
                justifyContent: isCanvasTitle ? 'space-between' : 'flex-end',
                alignItems: 'center',
                padding: theme.spacing(isCanvasTitle ? 2 : 1),
                borderBottom: isCanvasTitle ? `1px solid ${theme.palette.divider}` : 'none',
                backgroundColor: 'primary.main',
              }}
            >
              {isCanvasTitle && (
                <Typography
                  variant="h6"
                  className="offcanvas-title text-uppercase"
                  id={`'canvas' +${props.offId}`}
                  sx={{
                    fontWeight: 'bold',
                    color: 'primary.contrastText',
                    textTransform: 'uppercase',
                  }}
                >
                  {props.canvasTitle}
                </Typography>
              )}
              
              <span className="close" id="close-btn">
                <RdsIconButton
                  iconFilled={<Close />}
                  variant="filled"
                  onClick={handleClose}
                  size={isMobile ? 'small' : 'large'}
                  sx={{
                    color: isCanvasTitle ? 'primary.contrastText' : 'text.primary',
                    '&:hover': {
                      backgroundColor: 'rgba(173, 216, 230, 0.1)',
                      borderRadius: '5px',
                      transition: 'all 0.2s ease-in-out',
                    },
                  }}
                />
              </span>
            </Box>

            {/* Body */}
            <Box
              className={`offcanvas-body ${props.className || ''}`}
              sx={{
                flex: 1,
                padding: theme.spacing(2),
                overflow: props.scrolling ? 'auto' : 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {props.children}

              {/* Action Buttons */}
              <div className="d-flex justify-content-start mt-auto offcanvas-margin" id="offcanvas-btns">
                {props.showTertiaryButton && (
                  <div className="me-2">
                    <RdsButton
                      label="RESTORE TO DEFAULT"
                      style="transparent"
                      color="primary"
                      inputSize="medium"
                      type="button"
                    />
                  </div>
                )}
                {props.showSecondaryButton && (
                  <div className="me-2">
                    <RdsButton
                      label="CANCEL"
                      style="outlined"
                      color="primary"
                      inputSize="medium"
                      type="button"
                    />
                  </div>
                )}
                {props.showPrimaryButton && (
                  <div className="me-2">
                    <RdsButton
                      label="SAVE"
                      style="filled"
                      color="primary"
                      inputSize="medium"
                      type="submit"
                      onClick={handleClose}
                    />
                  </div>
                )}
              </div>
            </Box>
          </Box>
        </Drawer>
      </div>
    </>
  );
};

export default RdsOffcanvas;