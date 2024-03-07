import React from "react";
import "./rds-progress-bar.css";

export interface RdsProgressBarProps {
    colorVariant: string;
    striped?: boolean;
    progressWidth: number;
    animation?: boolean;
    height?: number;
    progressValues?: any[];
    role: string;
    displayLabel?: boolean;
    displayPercentage?: boolean;
    width?: string;
}

const RdsProgressBar = (props: RdsProgressBarProps) => {
    return (
        <>
            {props.role == "single" && (
                <>
                    <div
                        className="progress p-0"
                        style={{ height: `${props.height + 'px'}`, maxWidth: `${props.width + 'px'}` }}
                    >
                        <div
                            className={`progress-bar ${props.striped ? "progress-bar progress-bar-striped" : "progress-bar"}   
                            ${props.animation ? "progress-bar-striped progress-bar-animated" : "progress-bar"}
                            bg-${props.colorVariant}
                            `}
                            role="progressbar"
                            style={{ width: `${props.progressWidth}%`, textAlign: "center" }}
                            aria-valuenow={props.progressWidth}
                            aria-valuemin={0}
                            aria-valuemax={100}
                        >
                            {props.displayPercentage && <>{props.progressWidth}%</>}
                        </div>
                    </div>
                    {props.displayLabel && (
                        <div className="d-flex justify-content-between">
                            <div data-testid="level-indicator-min">0</div>
                            <div data-testid="level-indicator-max">100</div>
                        </div>
                    )}
                </>
            )}

            {props.role == "multiple" && (
                <>
                    <div className="progress"
                        style={{ height: `${props.height + 'px'}`, maxWidth: `${props.width + 'px'}` }}
                    >
                        {props.progressValues && props.progressValues?.map((progressValue) => (
                            <div
                                className={`progress-bar bg-${progressValue.colorVariant}` +
                                    (progressValue.stripe ? " progress-bar progress-bar-striped" : "") +
                                    (progressValue.animation ? " progress-bar-striped progress-bar-animated" : "")}
                                role="progressbar"
                                style={{ width: `${progressValue.progressWidth}%` }}
                                aria-valuenow={progressValue.progressWidth}
                                aria-valuemin={0}
                                aria-valuemax={100}
                            >
                                {progressValue.progressWidth}%
                            </div>
                        ))}
                    </div>
                </>
            )}
        </>
    );
};

export default RdsProgressBar;
