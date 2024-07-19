import React from "react";
import "./rds-website-matrix.css";
import RdsIcon from "../rds-icon/rds-icon";
import { colors } from "../../libs/types";

export interface RdsWebsiteMatrixProps {
    colorVariant?: colors;
    item: any;
    onClickLink?: (
        event: React.MouseEvent<HTMLAnchorElement>,
        clicked: boolean
    ) => void;
    displayType?: string;
}

const RdsWebsiteMatrix = (props: RdsWebsiteMatrixProps) => {
    const displaytype = props.displayType || "default";
    const borderColor = " border-" + props.colorVariant;
    const textColor = " text-" + props.colorVariant;
    const btnColor = " btn-" + props.colorVariant;
    const onLinkClick = (e: any) => {
        if (props.onClickLink) {
            props.onClickLink(e, true);
        }
    };
    return (
        <>
            {/* Default  */}
            {displaytype == "default" && (
                <div className={"border-start px-3 border-3 " + `${borderColor}`}>
                    <h1 className={"mb-1 fw-medium " + `${textColor}`}>
                        {props.item.title}
                    </h1>
                    <label className={"fw-medium text-muted fs-5  " + `${textColor}`}>
                        {props.item.subtitle}{" "}
                    </label>
                    {props.item.link && (
                        <div className={"pt-2  fw-medium " + `${textColor}`} data-testid="icon">
                            <a onClick={onLinkClick}>
                                {props.item.link} {"   "}
                                <RdsIcon
                                    name="right"
                                    height="18px"
                                    width="18px"
                                    fill={false}
                                    stroke={true}
                                    colorVariant={props.colorVariant}
                                    isCursorPointer={false}

                                />
                            </a>
                        </div>
                    )}
                </div>
            )}

            {/* Left Aligned */}
            {displaytype == "leftAligned" && (
                <div>
                    <button type="button" className={"btn btn-icon rounded-circle " + `${btnColor}`}>
                        <RdsIcon
                            name={props.item.icon}
                            height={props.item.iconHeight}
                            width={props.item.iconWidth}
                            fill={false}
                            stroke={true}
                            colorVariant="light"
                            isCursorPointer={false}
                        />
                    </button>
                    <div className={"mt-2 " + `${textColor}`}>
                        <h1 className="mb-1 fw-medium">{props.item.title}</h1>
                    </div>
                    <label className="fw-medium text-muted fs-5">
                        {props.item.subtitle}
                    </label>

                    {props.item.link && (
                        <div className={"pt-2  fw-medium " + `${textColor}`}>
                            <a onClick={onLinkClick}>
                                {props.item.link} {"   "}
                                <RdsIcon
                                    name="right"
                                    height="18px"
                                    width="18px"
                                    fill={false}
                                    stroke={true}
                                    colorVariant={props.colorVariant}
                                    isCursorPointer={false}
                                />
                            </a>
                        </div>
                    )}
                </div>
            )}

            {/* Center Aligned  */}
            {displaytype == "centerAligned" && (
                <div className="text-center">
                    <div className="mt-2">
                        <h1 className={"mb-1 fw-medium " + `${textColor}`}>
                            {props.item.title}
                        </h1>
                    </div>
                    <label className="fw-medium fs-5"> {props.item.subtitle}</label>

                    {props.item.description && (
                        <div className="mt-2 text-muted">
                            {" "}
                            <label>{props.item.description}</label>
                        </div>
                    )}
                    {props.item.link && (
                        <div className={"pt-2  fw-medium " + `${textColor}`}>
                            <a onClick={onLinkClick}>
                                {props.item.link} {"   "}
                                <RdsIcon
                                    name="right"
                                    height="18px"
                                    width="18px"
                                    fill={false}
                                    stroke={true}
                                    colorVariant={props.colorVariant}
                                    isCursorPointer={false}
                                />
                            </a>
                        </div>
                    )}
                </div>
            )}

            {/* with Top Border  */}
            {displaytype == "withTopBorder" && (
                <div>
                    <div
                        className={
                            "d-flex border-top border-3 justify-content-between align-items-center pt-2 " +
                            `${borderColor}`
                        }
                    >
                        <div>
                            <h1 className={"mb-1 fw-medium " + `${textColor}`}>
                                {props.item.title}
                            </h1>
                        </div>
                        {props.item.link && (
                            <div className={"pt-2  fw-medium " + `${textColor}`}>
                                <a onClick={onLinkClick}>
                                    {props.item.link} {"   "}
                                    <RdsIcon
                                        name="right"
                                        height="18px"
                                        width="18px"
                                        fill={false}
                                        stroke={true}
                                        colorVariant={props.colorVariant}
                                        isCursorPointer={false}
                                    />
                                </a>
                            </div>
                        )}
                    </div>
                    <label className="fw-medium text-muted fs-5">
                        {props.item.subtitle}
                    </label>
                </div>
            )}

            {/*with Center Aligned Icon */}
            {displaytype == "withCenterAlignedIcon" && (
                <div>
                    <div className="text-center">
                        <button
                            type="button"
                            className={"btn btn-icon rounded-circle d-inline-block " + `${btnColor}`}
                        >
                            <RdsIcon
                                name={props.item.icon}
                                height={props.item.iconHeight}
                                width={props.item.iconWidth}
                                fill={false}
                                stroke={true}
                                colorVariant="light"
                                isCursorPointer={false}
                            />
                        </button>
                        <div className={"mt-2 " + `${textColor}`}>
                            <h1 className="mb-1 fw-medium">{props.item.title}</h1>
                        </div>
                        <label className="fw-medium text-muted fs-5">
                            {props.item.subtitle}
                        </label>

                        {props.item.link && (
                            <div className={"pt-2  fw-medium " + `${textColor}`}>
                                <a onClick={onLinkClick}>
                                    {props.item.link} {"   "}
                                    <RdsIcon
                                        name="right"
                                        height="18px"
                                        width="18px"
                                        fill={false}
                                        stroke={true}
                                        colorVariant={props.colorVariant}
                                        isCursorPointer={false}
                                    />
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* with Left Aligned Icon */}
            {props.displayType == "withLeftAlignedIcon" && (
                <div>
                    <div className="d-flex">
                        <div className="mt-2">
                            <button
                                type="button"
                                className={"btn btn-icon rounded-circle d-inline-block " + `${btnColor}`}
                            >
                                <RdsIcon
                                    name={props.item.icon}
                                    height={props.item.iconHeight}
                                    width={props.item.iconWidth}
                                    fill={false}
                                    stroke={true}
                                    colorVariant="light"
                                    isCursorPointer={false}
                                />
                            </button>
                        </div>
                        <div className="px-3">
                            <h1 className={"mb-1 fw-medium" + `${textColor}`}>
                                {props.item.title}
                            </h1>
                            <label className="fw-medium text-muted fs-5">
                                {props.item.subtitle}
                            </label>
                            {props.item.link && (
                                <div className={"pt-2  fw-medium " + `${textColor}`}>
                                    <a onClick={onLinkClick}>
                                        {props.item.link} {"   "}
                                        <RdsIcon
                                            name="right"
                                            height="18px"
                                            width="18px"
                                            fill={false}
                                            stroke={true}
                                            colorVariant={props.colorVariant}
                                            isCursorPointer={false}
                                        />
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default RdsWebsiteMatrix;
