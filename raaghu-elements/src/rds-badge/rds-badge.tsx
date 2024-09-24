import React, { ReactNode } from "react";
import "./rds-badge.css";
import { Icons } from "../rds-icon/Icons";
import { Flags } from "../rds-icon/flag-icons";
import { colors, size } from "../../libs";
import RdsIcon from "../rds-icon";

export interface RdsBadgeProps {
    iconStroke?: boolean;
    iconFill?: boolean;
    isLabelShow?: boolean;
    label: string;
    children?: ReactNode;
    size?: size;
    colorVariant?: colors;
    badgeType?: "rectangle" | "pill";
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
}

const RdsBadge = (props: RdsBadgeProps) => {
    const classes = () => {
        let defaultClass: string =  props.className ? props.className : '';
        const name: string = !props.name ? "" : props.name.toLowerCase();
        const icon = Icons.hasOwnProperty(name) ? Icons[name] : Flags[name];
        if (props.size) {
            const sizeClass = `${props.size === 'small' ? ' small ' :
                props.size === 'smallest' ? 'smallest ' :
                    props.size === 'smaller' ? 'smaller ' :
                        props.size === 'medium' ? 'medium ' : ''}`;
            defaultClass = defaultClass + sizeClass;
        }

        if (props.badgeType) {
            const badgeTypeClass = `${props.badgeType === 'rectangle' ? ' rounded rectangle' : props.badgeType === 'pill' ? 'rounded-pill' : ''}`;
            defaultClass = defaultClass + badgeTypeClass;
        }

        if (props.positioned) {
            const positionClass = ` position-absolute top-0 start-100 translate-middle`;
            defaultClass = defaultClass + positionClass;
        }

        if (props.showClose) {
            defaultClass = defaultClass + " pe-2";
        }

        if(props.type === "icon" || props.type === "lottie") {
            const customIconClass = ` d-flex align-items-center gap-3`;
            defaultClass = defaultClass + customIconClass;
        }

        return defaultClass;
    };

    const closeClick = () => {
        props.onClose && props.onClose(props.label);
    };

    return (
        <>
            <span className={`badge badge-` + (props.colorVariant) + ` ${props.isTextWithIcon ? 'text-with-icon' : ''} ${props.isIconBorder ? 'border-icon' : ''} ${props.isOutline ? 'badge-outline bg-transparent' : ''} ${classes()} `}>
                {props.iconName && props.isIconshow === true && Icons.hasOwnProperty(props.iconName) && (
                    <RdsIcon
                    name={props.iconName}
                    fill={props.iconFill}
                    stroke={props.iconStroke}
                    width={props.iconWidth}
                    height={props.iconHeight}
                    />
                )}
                {props.iconName && props.iconPosition === 'left' && Icons.hasOwnProperty(props.iconName) && (
                    <RdsIcon
                        name={props.iconName}
                        fill={props.iconFill}
                        stroke={props.iconStroke}
                        width={props.iconWidth}
                        height={props.iconHeight}
                    />
                )}
                
                <span className="mb-0">{props.label}</span>

                {props.iconName && props.iconPosition === 'right' && Icons.hasOwnProperty(props.iconName) && (
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
        </>
    );
};

export default RdsBadge;
