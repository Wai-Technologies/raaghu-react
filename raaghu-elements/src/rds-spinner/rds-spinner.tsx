import React, { Fragment } from "react";
import "./rds-spinner.css";
export interface RdsSpinnerProps {
    spinnerType?: string;
    colorVariant?: string;
    width?: string;
    borderWidth?: string,
    height?: string,
    size?: string;
}
const RdsSpinner = (props: RdsSpinnerProps) => {

    const spinnerClass = props.spinnerType === 'grow' ? 'spinner-grow' : 'spinner-border';
    const colorClass = props.colorVariant ? `text-${props.colorVariant}` : '';
    const sizeClass = props.size ? `${spinnerClass}-${props.size}` : '';
    const { width = '', height = '' } = props;
    const classes = `${spinnerClass} ${colorClass} ${sizeClass}`.trim();
    return (
        <div className={classes} style={{ width, height }} />
    );
};
export default RdsSpinner;
