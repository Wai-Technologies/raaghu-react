import React, { useEffect, useState } from "react";
import "./rds-breadcrumb.css";
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

const RdsBreadcrumb =(props:BreadcrumbProps) => {
    const [data, setData] = useState<BreadcrumbItem[]>(props.breadItems);

    useEffect(() => {
        setData(props.breadItems);
    }, [props.breadItems]);

    const onClickHandler = (key: number) => {
        setData(data.map(item => ({
            ...item,
            active: key === item.id && !item.disabled ? !item.active : false,
        })));
    };

    const shapeClass = props.shape ? `breadcrumb-${props.shape}` : '';
    const noBgClass = props.shape ? `breadcrumb-${props.shape}-no-bg` : '';
    const roundedClass = props.shape === 'round' ? 'rounded-5' : props.shape === 'square' ? 'rounded-2' : '';

    return (
        <nav aria-label="breadcrumb">
            <ol className={`breadcrumb m-0 ${props.type === 'background' ? 'breadcrumb-background' : ''}`}>
                {data.map((breadItem, index) => {
                    const isLastItem = index === data.length - 1;

                    return (
                        <React.Fragment key={breadItem.id}>
                            <li
                                className={`breadcrumb-item ${breadItem.active ? "active" : ""} ${isLastItem ? "text-primary" : ""} ${props.type === 'background' ? (isLastItem ? `${shapeClass} bg-primary-subtle` : 'bg-transparent') : ''} ${!isLastItem && breadItem.active ? noBgClass : ''} ${roundedClass}`}
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
                                            colorVariant={breadItem.active ? breadItem.iconColor : ''}
                                        />
                                    </span>
                                )}
                                <a
                                    href={breadItem.route}
                                    className="text-decoration-none"
                                    onClick={(e) => e.preventDefault()}
                                    aria-disabled="true"
                                >
                                    {breadItem.label}
                                </a>
                            </li>
                            {!isLastItem && (
                                <li className="breadcrumb-separator">{props.separator}</li>
                            )}
                        </React.Fragment>
                    );
                })}
            </ol>
        </nav>
    );
};

export default RdsBreadcrumb;
