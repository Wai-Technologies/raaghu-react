import React, { useEffect, useState } from "react";
import "./rds-advance-breadcrumb.css";
import RdsIcon from "../rds-icon";

export interface BreadcrumbItem {
    label: string;
    id: number;
    route?: string;
    disabled?: boolean;
    icon?: string;
    iconFill?: boolean;
    iconstroke?: boolean;
    iconWidth?: string;
    iconHeight?: string;
    iconColor?: string;
    active?: boolean;
}

export interface BreadcrumbProps {
    breadItems: BreadcrumbItem[];
    type: 'simple' | 'background';
    shape?: 'round' | 'square';
     separator?: '>' | '/' | '→' | '»' | '|' | '-';
}

const RdsAdvanceBreadcrumb: React.FC<BreadcrumbProps> = ({ breadItems, type, shape, separator = '>' }) => {
    const [data, setData] = useState(breadItems);
    const length = data.length;

    const onClickHandler = (key: number) => {
        const tempData = data.map((item) => {
            if (key === item.id && !item.disabled) {
                return { ...item, active: !item.active };
            } else {
                return { ...item, active: false };
            }
        });

        setData(tempData);
    };

    useEffect(() => {
        if (breadItems.length > 0) {
            setData(breadItems);
        }
    }, [breadItems]);

    return (
        <nav aria-label="breadcrumb">
            <ol className={`breadcrumb m-0 ${type === 'background' ? 'breadcrumb-background' : ''}`}>
                {data.map((breadItem, index) => {
                    const isLastItem = length - 1 === index;
                    const isActive = breadItem.active;
                    const shapeClass = shape ? `breadcrumb-${shape}` : '';
                    const noBgClass = shape ? `breadcrumb-${shape}-no-bg` : '';
                    const borderClass = type === 'background' ? 'border border-thin' : '';
                    const roundedClass = shape === 'round' ? 'rounded-5' : shape === 'square' ? 'rounded-0' : '';

                    return (
                        <React.Fragment key={breadItem.id}>
                            <li
                                className={`breadcrumb-item ${isActive ? "active" : "border-thin"} ${isLastItem ? "text-primary" : ""} ${type === 'background' ? (isLastItem ? `breadcrumb-${shape} bg-primary-subtle` : 'bg-transparent') : ''} ${!isLastItem && isActive ? noBgClass : ''} ${borderClass} ${roundedClass}`}
                                onClick={() => onClickHandler(breadItem.id)}
                            >
                                {breadItem.icon && (
                                    <span className="me-2">
                                        <RdsIcon
                                            name={breadItem.icon}
                                            fill={breadItem.iconFill}
                                            stroke={breadItem.iconstroke}
                                            width={breadItem.iconWidth}
                                            height={breadItem.iconHeight}
                                            colorVariant={`${breadItem.active && breadItem.iconColor}`}
                                        />
                                    </span>
                                )}
                                <a
                                    className="text-decoration-none"
                                    onClick={(event) => {
                                        event.preventDefault();
                                    }}
                                    aria-disabled="true"
                                >
                                    {breadItem.label}
                                </a>
                            </li>
                            {index < length - 1 && (
                                <li className="breadcrumb-separator text-black-50"> {separator} </li>
                            )}
                        </React.Fragment>
                    );
                })}
            </ol>
        </nav>
    );
};

export default RdsAdvanceBreadcrumb;