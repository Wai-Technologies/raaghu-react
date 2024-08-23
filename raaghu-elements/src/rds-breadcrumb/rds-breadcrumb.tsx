import React, { useEffect, useState } from "react";
import "./rds-breadcrumb.css";
import RdsIcon from "../rds-icon";

export interface breadcrumbprop {
    breadItems: any[];
}

const RdsBreadcrumb = (props: breadcrumbprop) => {

    const [data, setdata] = useState(props.breadItems);
    const length = data.length;

    const onClickHandler = (key: any) => {
        const tempData = data.map((item: any) => {
            if (key === item.id && !item.disabled) {
                return { ...item, active: !item.active };
            } else {
                return { ...item, active: false };
            }
        });

        setdata(tempData);
    };

    useEffect(() => {
        if (props.breadItems.length > 0) {
            setdata(props.breadItems);
        }

    }, [props.breadItems]);

    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb m-0">
                    {data?.map((breadItem, index) => {
                        return index == 0 ? (
                            <li
                                key={breadItem.id}
                                className={`breadcrumb-item  ${breadItem.active ? "active" : ""
                                    } ${length - 1 === index ? "text-primary" : ""}`}
                                id="breaditem1"
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
                                            colorVariant={`${breadItem.active && breadItem.iconColor
                                                }`}
                                            isCursorPointer={true}
                                        />
                                    </span>
                                )}
                                <a
                                    // href={breadItem.route}
                                    className="text-decoration-none"
                                    onClick={(event) => {
                                        event.preventDefault();
                                    }}
                                    aria-disabled="true"
                                >
                                    {(breadItem.label)}
                                </a>
                            </li>
                        ) : (
                            <li
                                key={breadItem.id}
                                className={`breadcrumb-items  ${breadItem.active ? "active" : ""
                                    } ${length - 1 === index ? "text-primary" : ""}`}
                                id={`breadcrumbItem+${breadItem.id}`}
                                onClick={() => onClickHandler(breadItem.id)}
                            >
                                <span >
                                    <RdsIcon
                                        name="chevron_right"
                                        stroke={true}
                                        height="8px"
                                        width="14px"
                                        isCursorPointer={true}
                                    />
                                </span>
                                {breadItem.icon && (
                                    <span className="ms-1 me-2">
                                        <RdsIcon
                                            name={breadItem.icon}
                                            fill={breadItem.iconFill}
                                            stroke={breadItem.iconstroke}
                                            width={breadItem.iconWidth}
                                            height={breadItem.iconHeight}
                                            colorVariant={`${breadItem.active && breadItem.iconColor
                                                }`}
                                            isCursorPointer={true}
                                        />
                                    </span>
                                )}
                                <a
                                    // href={breadItem.route}
                                    onClick={(event) => {
                                        event.preventDefault();
                                    }}
                                    aria-disabled="true"
                                >
                                    {(breadItem.label)}
                                </a>
                            </li>
                        );
                    })}
                </ol>
            </nav>
        </>
    );
};

export default RdsBreadcrumb;
