import clsx from "clsx";
import { type ReactNode, type Ref, useId, useState } from "react";
import { Drawer, Box } from "@mui/material";
import type { DrawerProps, SxProps, Theme } from "@mui/material";
import Close from "@mui/icons-material/Close";
import RdsButton from "../../raaghu-elements/rds-button/rds-button";
import RdsIconButton from "../../raaghu-elements/rds-icon-button/rds-icon-button";
import { warnDeprecatedProp } from "../../raaghu-elements/shared/utils/deprecation";
import "./rds-comp-off-canvas.scss";
export { RdsOffcanvasPlacement, RdsOffcanvasBackDrop } from './rds-comp-off-canvas-types';
import { RdsOffcanvasPlacement, RdsOffcanvasBackDrop } from './rds-comp-off-canvas-types';

export type RdsCompOffcanvasCloseReason =
  | NonNullable<Parameters<NonNullable<DrawerProps["onClose"]>>[1]>
  | "closeButton";

export interface RdsCompOffcanvasProps
  extends Omit<
    DrawerProps,
    | "anchor" | "open" | "onClose" | "title" | "children" | "className" | "sx" | "slotProps"
    | "hideBackdrop" | "disableEscapeKeyDown" | "id" | "onClick" | "ref" | "variant"
  > {
  /** @deprecated Use `anchor` instead. */
  placement?: RdsOffcanvasPlacement | `${RdsOffcanvasPlacement}`;
  /** MUI anchor. Wins over `placement`. */
  anchor?: DrawerProps["anchor"];
  /** Backdrop behavior: shown, hidden, or static (clicking it does not close and Escape is disabled). */
  backDrop?: RdsOffcanvasBackDrop | `${RdsOffcanvasBackDrop}`;
  /** Hides the backdrop. Wins over `backDrop`. */
  hideBackdrop?: boolean;
  /** Applies the scrolling style to the drawer container and body. @default false */
  scrolling?: boolean;
  /** @deprecated Use `disableEscapeKeyDown` instead. */
  preventEscapeKey?: boolean;
  /** Disables closing with the Escape key. Wins over `preventEscapeKey`. */
  disableEscapeKeyDown?: boolean;
  /** @deprecated Use `id` instead. */
  offId?: string;
  /** HTML id applied to the drawer root. */
  id?: string;
  /** @deprecated Use `title` instead. */
  canvasTitle?: string;
  /** Title shown in the drawer header. */
  title?: string;
  /** @deprecated Use `width` instead. */
  offcanvaswidth?: number;
  /** Width of the drawer panel; applied only when provided. */
  width?: number | string;
  /** Controlled open state. When defined the built-in trigger button is not rendered. */
  open?: boolean;
  /** @deprecated Use `onOpen` instead. */
  onShow?: () => void;
  /** Called when the drawer closes, with the event and close reason. */
  onClose?: (event?: unknown, reason?: RdsCompOffcanvasCloseReason) => void;
  /** Called with true when the built-in trigger button opens the drawer. */
  onOpen?: (data: boolean) => void;
  /** Callback invoked when the canvas is opened. */
  onClick?: (data: boolean) => void;
  children?: ReactNode;
  /** Extra class name applied to the drawer root. */
  className?: string;
  /** MUI system styles applied to the Drawer root. */
  sx?: DrawerProps["sx"];
  /** Replaces the default footer buttons. */
  actions?: ReactNode;
  /** Called when the default SAVE button is clicked; the drawer then closes. */
  onSave?: () => void;
  /** Called when the default RESTORE TO DEFAULT button is clicked. */
  onRestoreDefault?: () => void;
  /** MUI Drawer slot props; the paper slot is merged with the title label and width. */
  slotProps?: DrawerProps["slotProps"];
  /** Shows the default SAVE footer button. @default false */
  showPrimaryButton?: boolean;
  /** Shows the default CANCEL footer button. @default false */
  showSecondaryButton?: boolean;
  /** Shows the default RESTORE TO DEFAULT footer button. @default false */
  showTertiaryButton?: boolean;
  /** Ref to the Drawer root element. */
  ref?: Ref<HTMLDivElement>;
}

type PaperProps = { sx?: SxProps<Theme>; [key: string]: unknown };

const RdsCompOffcanvas = ({
  placement,
  anchor,
  backDrop = RdsOffcanvasBackDrop.True,
  hideBackdrop,
  scrolling = false,
  preventEscapeKey = true,
  disableEscapeKeyDown,
  offId,
  id,
  canvasTitle,
  title,
  offcanvaswidth,
  width,
  open,
  onShow,
  onClose,
  onOpen,
  onClick,
  children,
  className,
  sx,
  actions,
  onSave,
  onRestoreDefault,
  slotProps,
  showPrimaryButton = false,
  showSecondaryButton = false,
  showTertiaryButton = false,
  ref,
  ...rest
}: RdsCompOffcanvasProps) => {
  if (placement !== undefined) warnDeprecatedProp("RdsCompOffcanvas", "placement", "`anchor`");
  if (onShow !== undefined) warnDeprecatedProp("RdsCompOffcanvas", "onShow", "`onOpen`");
  if (offId !== undefined) warnDeprecatedProp("RdsCompOffcanvas", "offId", "`id`");
  if (canvasTitle !== undefined) warnDeprecatedProp("RdsCompOffcanvas", "canvasTitle", "`title`");
  if (offcanvaswidth !== undefined) warnDeprecatedProp("RdsCompOffcanvas", "offcanvaswidth", "`width`");
  if (preventEscapeKey !== true) warnDeprecatedProp("RdsCompOffcanvas", "preventEscapeKey", "`disableEscapeKeyDown`");

  const uid = useId();
  const titleId = `${uid}-title`;
  const closeWrapId = `${uid}-close-btn`;
  const footerId = `${uid}-btns`;
  const isControlled = open !== undefined;
  const [internalOpen, setInternalOpen] = useState(false);
  const drawerOpen = isControlled ? open : internalOpen;
  const resolvedTitle = title ?? canvasTitle;
  const resolvedId = id ?? offId;
  const resolvedWidth = width ?? offcanvaswidth;
  const openHandler = onClick ?? onOpen;

  const handleOpen = () => {
    if (openHandler) openHandler(true);
    if (!isControlled) setInternalOpen(true);
    if (onShow) onShow();
  };
  const handleClose = (event?: unknown, reason: RdsCompOffcanvasCloseReason = "closeButton") => {
    if (onClose) onClose(event, reason);
    if (!isControlled) setInternalOpen(false);
  };
  const handleDrawerClose: DrawerProps["onClose"] = (event, reason) => {
    if (backDrop === RdsOffcanvasBackDrop.Static && reason === "backdropClick") {
      return;
    }
    handleClose(event, reason);
  };
  const handleSave = (event?: unknown) => {
    if (onSave) onSave();
    handleClose(event, "closeButton");
  };

  const isCanvasTitle = resolvedTitle !== "" && resolvedTitle !== undefined;
  const resolvedHideBackdrop = hideBackdrop ?? backDrop === RdsOffcanvasBackDrop.False;
  const resolvedDisableEscape =
    disableEscapeKeyDown ?? (backDrop === RdsOffcanvasBackDrop.Static ? true : !preventEscapeKey);

  const paperSlot = slotProps?.paper;
  const mergedSlotProps = {
    ...slotProps,
    paper: (ownerState: unknown) => {
      const consumer = (
        typeof paperSlot === "function" ? (paperSlot as (o: unknown) => object)(ownerState) : paperSlot
      ) as PaperProps | undefined;
      const sx = consumer?.sx;
      return {
        ...consumer,
        ...(isCanvasTitle ? { "aria-labelledby": titleId } : {}),
        ...(resolvedWidth !== undefined
          ? { sx: [{ width: resolvedWidth }, ...(Array.isArray(sx) ? sx : sx ? [sx] : [])] }
          : {}),
      };
    },
  } as DrawerProps["slotProps"];

  return (
    <>
      <div className="offcanvas-text">
        {!isControlled && (
          <div className="offcanvas_btn">
            <RdsButton text="Open Off Canvas" variant="filled" size="medium" onClick={handleOpen}/>
          </div>
        )}
        <Drawer
          {...rest}
          ref={ref}
          anchor={(anchor ?? placement ?? RdsOffcanvasPlacement.End) as DrawerProps["anchor"]}
          open={drawerOpen}
          onClose={handleDrawerClose}
          disableEscapeKeyDown={resolvedDisableEscape}
          hideBackdrop={resolvedHideBackdrop}
          sx={sx}
          slotProps={mergedSlotProps}
          className={clsx("offcanvas-drawer", `placement-${placement ?? RdsOffcanvasPlacement.End}`, className)}
          id={resolvedId}>
          <Box className={clsx("offcanvas-container", scrolling && "scrolling")}>
            <Box className={clsx("offcanvas-header", !isCanvasTitle && "no-title")}>
              {isCanvasTitle ? (
                <div className="offcanvas-title-wrap">
                  <span id={titleId} className="offcanvas-title">{resolvedTitle}</span>
                </div>
              ) : null}
              <div className="offcanvas-close-wrap" id={closeWrapId}>
                <RdsIconButton onClick={handleClose} tooltip={"Close"} aria-label="Close" className="offcanvas-close-button">
                  <Close />
                </RdsIconButton>
              </div>
            </Box>
            <Box className={clsx("offcanvas-body", scrolling && "scrolling")}>
              <div className="offcanvas-body-inner">
                {children}
              </div>
              {(actions || showPrimaryButton || showSecondaryButton || showTertiaryButton) && (
                <Box className="offcanvas-margin offcanvas-footer" id={footerId}>
                  {actions ? actions : (
                    <>
                      <Box className="tertiary-button-container">
                        {showTertiaryButton && (
                          <RdsButton text="RESTORE TO DEFAULT" variant="transparent" size="medium" className="offcanvas-action-btn" onClick={onRestoreDefault} />
                        )}
                      </Box>
                      <Box className="secondary-button-container">
                        {showSecondaryButton && (
                          <RdsButton text="CANCEL" variant="outlined" size="medium" onClick={handleClose} className="offcanvas-cancel-btn"/>
                        )}
                      </Box>
                      <Box className="primary-button-container">
                        {showPrimaryButton && (
                          <RdsButton text="SAVE" variant="filled" size="medium" onClick={handleSave} className="offcanvas-action-btn" />
                        )}
                      </Box>
                    </>
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
