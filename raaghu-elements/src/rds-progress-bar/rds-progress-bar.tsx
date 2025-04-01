import React from "react";
import "./rds-progress-bar.css";
import RdsIcon from "../rds-icon";
export interface RdsProgressBarProps {
    colorVariant: string;
    striped?: boolean;
    progressWidth: number;
    steps: number;
    completedSteps: number;
    stepNames?: string[];
    stepperVariant?: string;
    Icon?: boolean;
    iconFill?: boolean;
    iconStroke?: boolean;
    iconWidth?: string;
    iconHeight?: string;
    iconName?: string;
    StepIconName?: {
        iconName: string;
        iconFill: boolean;
        iconStroke: boolean;
        iconWidth: string;
        iconHeight: string;
    }[];
    stepiconName?: string;
    animation?: boolean;
    height?: number;
    progressValues?: any[];
    role: string;
    displayLabel?: boolean;
    displayPercentage?: boolean;
    width?: string;
}

const RdsProgressBar = (props: RdsProgressBarProps) => {
    const completedSteps = Math.min(props.completedSteps, props.steps);
    return (
        <>
            {props.role === "single" && (
                <>
                    <div className="d-flex align-items-center">
                        <div
                            className="progress p-0 w-100"
                            style={{ height: `${props.height}px`, maxWidth: `${props.width}px` }}
                        >
                            <div
                                className={`progress-bar ${props.striped ? "progress-bar progress-bar-striped" : "progress-bar"}   
                                ${props.animation ? "progress-bar-striped progress-bar-animated" : "progress-bar"}
                                progress-bar-bg-${props.colorVariant}`}
                                role="progressbar"
                                style={{ width: `${props.progressWidth}%`, textAlign: "center" }}
                                aria-valuenow={props.progressWidth}
                                aria-valuemin={0}
                                aria-valuemax={100}
                            ></div>
                        </div>
                        <span className="ms-2 progress-percentage">
                            {props.displayPercentage && <>{props.progressWidth}%</>}
                        </span>
                    </div>
                    {props.displayLabel && (
                        <div className="d-flex justify-content-between">
                            <div data-testid="level-indicator-min">0</div>
                            <div data-testid="level-indicator-max">100</div>
                        </div>
                    )}
                </>
            )}

            {props.role === "multiple" && (
                <>
                    <div
                        className="progress"
                        style={{ height: `${props.height}px`, maxWidth: `${props.width}px` }}
                    >
                        {props.progressValues &&
                            props.progressValues.map((progressValue) => (
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

            {props.role === "circular" && (
                <>
                    <div
                        className="progress-circle-container"
                        id="stepper-circular"
                        style={{
                            width: `${Math.max(80, Math.min(300, props.height ?? 80))}px`,
                            height: `${Math.max(80, Math.min(300, props.height ?? 80))}px`,
                            "--progress-value": props.progressWidth,
                        } as React.CSSProperties}
                    >
                        <div className={`progress-circle circular-progress-${props.colorVariant}`}>
                            <div className="progress-circle-inner">
                                {props.displayPercentage && (
                                    <span className="progress-percentage">{props.progressWidth}%</span>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
            {props.role === "dash" && (
                <>
                    <div className="stepper-container" id="stepper-dash" style={{ width: `100%` }}>
                        {[...Array(props.steps)].map((_, index) => (
                            <div
                                key={index}
                                className={`step ${index < completedSteps
                                    ? 'bg-completed'
                                    : index === completedSteps && props.colorVariant === 'error'
                                    ? 'bg-error'
                                    : index === completedSteps && props.colorVariant === 'primary'
                                    ? 'bg-inprogress'
                                    : 'bg-default'
                                    }`}
                                style={{ flex: 1, height: `${props.height}px` }}
                            >
                            </div>
                        ))}
                    </div>
                </>
            )}

            {props.role === "block" && (
                <>
                    <div className="stepper-container"  id="stepper-block" style={{ width: `100%` }}>
                        {[...Array(props.steps)].map((_, index) => (
                            <div
                                key={index}
                                className={`block_step d-flex align-items-center justify-content-center ${index < completedSteps
                                    ? 'bg-completed'
                                    : index === completedSteps && props.colorVariant === 'error'
                                    ? 'bg-error'
                                    : index === completedSteps && props.colorVariant === 'primary'
                                    ? 'bg-inprogress'
                                    : 'bg-default'
                                    }`}
                                style={{
                                    flex: 1,
                                    height: `32px`,
                                    borderRadius: props.steps === 1
                                        ? '4px'
                                        : props.steps === 2
                                            ? index === 0
                                                ? '4px 0 0 4px'
                                                : '0 4px 4px 0'
                                            : index === 0
                                                ? '4px 0 0 4px'
                                                : index === (props.steps ?? 0) - 1
                                                    ? '0 4px 4px 0'
                                                    : '0'
                                }}
                            >
                                {props.stepNames && props.stepNames[index] ? props.stepNames[index] : `Step ${index + 1}`}
                            </div>
                        ))}
                    </div>
                </>
            )}
            {props.role === "stepper" && (
                <>
                    <div className="stepper-container" id="stepper-stepper" style={{ width: `100%`, position: 'relative' }}>
                        {[...Array(props.steps)].map((_, index) => (
                            <div
                                key={index}
                                className="Stepper_step d-flex align-items-center justify-content-center"
                                style={{
                                    flex: 1,
                                    height: `32px`,
                                    borderRadius: props.steps === 1
                                        ? '4px'
                                        : props.steps === 2
                                            ? index === 0
                                                ? '4px 0 0 4px'
                                                : '0 4px 4px 0'
                                            : index === 0
                                                ? '4px 0 0 4px'
                                                : index === (props.steps ?? 0) - 1
                                                    ? '0 4px 4px 0'
                                                    : '0',
                                    position: 'relative'
                                }}
                            >
                                <div key={index} className="step-content">
                                    <div className={`step-icon ${index < completedSteps
                                        ? props.stepperVariant === 'outlined' ? 'outline-completed' : 'bg-completed'
                                        : index === completedSteps && props.colorVariant ==='error'
                                        ? props.stepperVariant === 'outlined' ? 'outline-error' : 'bg-error' 
                                        : index === completedSteps && props.colorVariant ==='primary'
                                        ? props.stepperVariant === 'outlined' ? 'outline-inprogress' : 'bg-inprogress'
                                        : props.stepperVariant === 'outlined' ? 'outline-default' : 'bg-default'
                                        }`}>
                                        {props.Icon ? (
                                            (
                                                <RdsIcon 
                                                    name={"circle"} // Default icon if none provided
                                                    fill={index%1===0}
                                                    stroke={index%1===1}
                                                    width={'20'}
                                                    height={'20'}
                                                />
                                            )
                                        ) : (
                                            index + 1
                                        )}
                                    </div>
                                </div>
                                {index < (props.steps ?? 0) - 1 && (
                                    <div 
                                        className="step-line"
                                        style={{
                                            backgroundColor: index < completedSteps
                                                ? '#7825E9'
                                                : index === completedSteps && props.colorVariant ==='error'
                                                ? '#BD0D1D'
                                                : index === completedSteps && props.colorVariant ==='error'
                                                ? '#D4BBFF'
                                                : '#d3d3d3'
                                        }}
                                    ></div>
                                )}
                            </div>
                        ))}
                    </div>
                </>
            )}

            </>
    );
};

export default RdsProgressBar;
