import React from "react";
import classnames from "classnames";
import styles from "./checkbox.module.css";

type checkboxProps = {
    isChecked?: boolean;
    isIndeterminate?: boolean;
    onClick?: () => void;
};

const Checkbox: React.FC<checkboxProps> = ({
    isChecked = false,
    isIndeterminate = false,
    onClick = () => { },
}) => {
    return (
        <>
            <span
                className={`${classnames(styles.checkbox, {
                    [styles.isIndeterminate]: isIndeterminate,
                    [styles.isChecked]: isChecked,
                })} mb-3 form-check-input`}
                onClick={onClick}
            />
        </>
    );
};

export default Checkbox;
