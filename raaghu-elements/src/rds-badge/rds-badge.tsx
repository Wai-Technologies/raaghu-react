import React, { ReactNode } from "react";
import "./rds-badge.css";
import { colors, size } from "../../libs";

export interface RdsBadgeProps {
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
}

const RdsBadge = (props: RdsBadgeProps) => {
    const classes = () => {
        let defaultClass: string =  props.className ? props.className : '';
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

        return defaultClass;
    };

    const closeClick = () => {
        props.onClose && props.onClose(props.label);
    };

    return (
        <>
            <span className={`badge badge-` + (props.colorVariant) + ` ${classes()} `}>
                {props.label}
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
