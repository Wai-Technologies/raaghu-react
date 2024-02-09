import React, { Fragment } from "react";
import "./rds-spinner.css";
export interface RdsSpinnerProps {
    spinnerType?: string;
    colorVariant?: string;
    width?: string;
    borderWidth?: string,
    height?: string,
    size?:string;
}
const RdsSpinner = (props: RdsSpinnerProps) => {

    const classes = () => {
        const border = `${props.spinnerType ? 'spinner-grow ' + 'text-' + props.colorVariant : 'spinner-border ' + 'text-' + props.colorVariant} `;
        return border;

    }
    return (
        <Fragment>
            <div className={classes()}>
            </div>
        </Fragment>
    );
};
export default RdsSpinner;
