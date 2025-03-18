import React, { ReactNode } from "react";
import "./rds-badge.css";
import { Icons } from "../rds-icon/Icons";
import { Flags } from "../rds-icon/flag-icons";
import { colors, size } from "../../libs";
import RdsIcon from "../rds-icon";
import RdsButton from "../rds-button/rds-button";

export interface RdsBadgeProps {
    iconStroke?: boolean;
    iconFill?: boolean;
    isLabelShow?: boolean;
    label: string;
    children?: ReactNode;
    size?: size;
    colorVariant?: string;
    shape?: "rectangle" | "pill";
    childrenSide?: "right" | "left";
    positioned?: boolean;
    showClose?: boolean;
    onClose?: (value: string) => void;
    className?: string;
    iconName?: string;
    iconPath?: string;
    type?: "icon" | "lottie";
    name?: string;
    iconWidth?: string;
    iconHeight?: string;
    iconPosition?: "left" | "right";
    isIconshow?: boolean;
    isTextWithIcon?: boolean;
    isOutline?: boolean;
    isIconBorder?: boolean;
    layout?: string;
    style?: string;
    state?: string;
    iconOnly?: boolean;
    textwithlabel?: boolean;
    textWithButton?: boolean;
    buttonLabel?: string;
}

const RdsBadge = (props: RdsBadgeProps) => {
    const classes = () => {
        let defaultClass: string = props.className ? props.className : '';
        const name: string = !props.name ? "" : props.name.toLowerCase();
        const icon = Icons.hasOwnProperty(name) ? Icons[name] : Flags[name];
        if (props.size) {
            const sizeClass = `${props.size === 'small' ? ' small ' :
                props.size === 'smallest' ? 'smallest ' :
                    props.size === 'smaller' ? 'smaller ' :
                        props.size === 'medium' ? 'medium ' : 'large '}`;
            defaultClass = defaultClass + sizeClass;
        }

        if (props.shape) {
            const badgeTypeClass = `${props.shape === 'pill' ? 'rounded-pill' : ''}`;
            defaultClass = defaultClass + badgeTypeClass;
        }

        if (props.positioned) {
            const positionClass = ` position-absolute top-0 start-100 translate-middle`;
            defaultClass = defaultClass + positionClass;
        }

        if (props.showClose) {
            defaultClass = defaultClass + " pe-2";
        }

        if (props.type === "icon" || props.type === "lottie") {
            const customIconClass = ` d-flex align-items-center gap-3`;
            defaultClass = defaultClass + customIconClass;
        }

        return defaultClass;
    };

    const closeClick = () => {
        props.onClose && props.onClose(props.label);
    };
    const getColorClass = () => {
        if (props.style && props.colorVariant && props.state) {
            if (props.state === "default") {
                if (props.style === "primary") {
                    return `badge-${(props.colorVariant || 'primary').toLowerCase()}`;
                }
                if (props.style === "outline") {
                    return `border-${(props.colorVariant || 'primary').toLowerCase()} text-${(props.colorVariant || 'primary').toLowerCase()}`;

                }
                /*if (props.style === "disabled") {
                    return `badge-${(props.colorVariant || 'primary').toLowerCase()} disabled`;
                }*/
                if (props.style === "transparent") {
                    return `text-${(props.colorVariant || 'primary').toLowerCase()} bg-transparent`;
                }
            }
            if (props.state === "disabled") {
                if (props.style === "primary") {
                    return `badge-${(props.colorVariant || 'primary').toLowerCase()} disabled` ;
                }
                if (props.style === "outline") {
                    return `border-${(props.colorVariant || 'primary').toLowerCase()} text-${(props.colorVariant || 'primary').toLowerCase()} disabled`;

                }
                /*if (props.style === "disabled") {
                    return `badge-${(props.colorVariant || 'primary').toLowerCase()} disabled`;
                }*/
                if (props.style === "transparent") {
                    return `text-${(props.colorVariant || 'primary').toLowerCase()} bg-transparent disabled`;
                }
            }

        }
        return `badge-${(props.colorVariant || "primary").toLowerCase()}`;
    };

    return (
        <>
            <span id="new-badges">
                <span className={`badge mx-1 ${getColorClass()} ${classes()} `} aria-disabled={props.style === "disabled"}>

                    {(props.iconName && props.layout == "Icon+Text" || props.layout == "Icon_only") && Icons.hasOwnProperty(props.iconName) && (

                        <RdsIcon
                            name={props.iconName}
                            fill={props.iconFill}
                            stroke={props.iconStroke}
                            width={props.iconWidth}
                            height={props.iconHeight}
                        />
                    )}
                    {(props.layout == "Text_only" || props.layout == "Icon+Text" || props.layout == "Text+Icon" || props.textwithlabel) && (<span className="mb-0 p-1">{props.label}</span>)}

                    {(props.iconName && props.layout == "Text+Icon") && Icons.hasOwnProperty(props.iconName) && (
                        <RdsIcon
                            name={props.iconName}
                            fill={props.iconFill}
                            stroke={props.iconStroke}
                            width={props.iconWidth}
                            height={props.iconHeight}
                        />
                    )}
                    {props.showClose && (
                        <span className="ms-1" role="button" data-testid="closeButton" tabIndex={0} aria-hidden="true" onClick={closeClick}>
                            &times;
                        </span>
                    )}
                </span>
            </span>
        </>
    );
};

export default RdsBadge;
