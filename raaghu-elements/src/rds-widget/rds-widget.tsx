import React, { Fragment, ReactNode } from "react";
import RdsIcon from "../rds-icon/rds-icon";
import { colors } from "../../libs/types";
import RdsButtonGroup, { Role } from "../rds-button-group/rds-button-group";
import RdsBigNumber from "../rds-big-number/rds-big-number";
import RdsProgressBar from "../rds-progress-bar";
import RdsButton from "../rds-button";

export interface RdsWidgetProps {
  isRefreshRequired?: boolean;
  isButtonGroupRequired?: boolean;
  colorVariant?: colors;
  headerTitle: string;
  children?: ReactNode;
  class?: string;
  style?: any;
  subTitleColorVariant?: string;
  height?: string;
  width?: string;
  bigNumber?: string;
  subTitle?: string;
  minHeight?: string;
  icon?: string;
  iconHeight?: string;
  iconStroke?: boolean;
  iconFill?: boolean;
  iconWidth?: string;
  iconColor?: colors;
  border?: boolean;
  bigNumberColor?: string;
  onRefresh?: React.MouseEventHandler<HTMLDivElement>;
  buttonGroupList?: any;
  handleButtonClick?: React.MouseEventHandler<HTMLDivElement>;
  isIcon?: boolean;
  iconLabel?: any;
  isBignumberIcon?: any;
  bigNumberLabel?: any;
  isButton?: boolean;
  onButtonClick?: React.MouseEventHandler<HTMLButtonElement>;
  iconName?: string;
  iconHeaderColor?: any;
  onIconClick?: (Event: React.MouseEvent<HTMLButtonElement>) => void;
  iconTooltipLabel?: string;
  iconTooltipPosition?: any;
  isCardStretch?: boolean;
  isPortal?: boolean;
  btnShow?: boolean;
  btnLabel?: string;
  widgetTitle?: string;
  statusBarMsg?: boolean;
  statusMsg?: string;
  handleButtonClickPortal?: (Event: React.MouseEvent<HTMLElement>) => void;
}

const RdsWidget = (props: RdsWidgetProps) => {
  const isRefreshIcon = props.isRefreshRequired || false;
  const isButtonGroupRequired = props.isButtonGroupRequired || false;
  const isIcon = props.isIcon || false;
  const isButton = props.isButton || false;

  const classes = () => {
    let defaultClass: string = "";

    if (props.colorVariant) {
      defaultClass = "bg-" + props.colorVariant + " text-white";
    }
    if (
      props.colorVariant === "white" ||
      props.colorVariant === "transparent" ||
      props.colorVariant === "light"
    ) {
      defaultClass = "bg-" + props.colorVariant + " text-dark";
    }

    if (!props.border) {
      const borderClass = " border-0";
      defaultClass = defaultClass + borderClass;
    }
    return defaultClass;
  };

  return (
    <Fragment>
      <div
        className={
          `card ${props.isCardStretch ? "card-stretch gutter-b" : ""} ` +
          classes()
        }
        style={{
          height: `${props.height}`,
          minHeight: `${props.minHeight}`,
          width: `${props.width}`,
        }}
      >
        {!props.isPortal && (
          <div className="card-header border-0 d-flex justify-content-between">
            <h5 className={`card-title text-${props.bigNumberColor}`}>
              {props.headerTitle}
            </h5>
            <div></div>
            <div className="card-toolbar" onClick={props.onRefresh}>
              {isRefreshIcon && (
                <span className="cursor-pointer">
                  <RdsIcon
                    name={props.iconName}
                    height="20px"
                    width="20px"
                    fill={false}
                    stroke={true}
                    tooltip={true}
                    colorVariant={props.iconHeaderColor}
                    tooltipTitle={props.iconTooltipLabel}
                    tooltipPlacement={props.iconTooltipPosition}
                    onClick={props.onIconClick}
                  />
                </span>
              )}
              {isButtonGroupRequired && (
                <RdsButtonGroup
                  buttonGroupItems={props.buttonGroupList}
                  colorVariant="primary"
                  isOutline={true}
                  role={Role.Radio}
                  size="small"
                  vertical={false}
                  onClick={props.handleButtonClick}
                />
              )}
              {isIcon && (
                <div className="d-flex align-items-center fw-normal">
                  <span>
                    <RdsIcon
                      name="triangle_up"
                      height="14px"
                      width="14px"
                      colorVariant={props.iconColor}
                      fill={true}
                      stroke={false}
                    />
                  </span>
                  <span className={"fs-6 fw-medium text-" + props.iconColor}>
                    {props.iconLabel}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {props.children || props.isPortal ? (
          <div className="card-body pt-0 px-0" style={props.style}>
            {props.isBignumberIcon && (
              <div className="d-flex justify-content-between align-items-center mb-2">
                <RdsBigNumber
                  bigNumber={props.bigNumberLabel}
                  isIconSubTitle={false}
                ></RdsBigNumber>
                <div>
                  <RdsIcon
                    name="triangle_up"
                    height="14px"
                    width="14px"
                    colorVariant={props.iconColor}
                    fill={true}
                    stroke={false}
                  />
                  <span className={"fs-6 fw-medium text-" + props.iconColor}>
                    {props.iconLabel}
                  </span>
                </div>
              </div>
            )}

            {props.isPortal && (
              <div className="border border-1 rounded-3 border-danger-50 py-4 px-4 box-gradient-shadow">
                <div className="d-flex gap-3 align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-2">
                    <RdsIcon
                      name={props.icon}
                      width="33px"
                      height="30px"
                      fill={false}
                      stroke={true}
                      colorVariant="danger"
                    />
                    <div className="fw-bold fs-4">{props.widgetTitle}</div>
                  </div>
                  <div>
                    {props.btnShow && (
                      <RdsButton
                        class="me-2"
                        tooltipTitle=""
                        type="button"
                        label={props.btnLabel}
                        colorVariant="outline-primary"
                        size="medium"
                        onClick={props.handleButtonClickPortal}
                      />
                    )}
                  </div>
                </div>
                <div>
                  <h6 className="text-secondary fw-medium small pt-2 pb-0 mb-0">
                    {props.subTitle}
                  </h6>
                </div>
                {props.statusBarMsg ? (
                  <RdsProgressBar
                    colorVariant="success"
                    height={10}
                    progressWidth={39}
                    role="single"
                    steps={0}
                    completedSteps={0}
                  />
                ) : (
                  <div>
                    <p className="text-secondary">{props.statusMsg}</p>
                  </div>
                )}
              </div>
            )}

            {props.children}
          </div>
        ) : null}
      </div>
    </Fragment>
  );
};

export default RdsWidget;
