import React, { useState } from "react";
import "./rds-stepper.css";
import RdsIcon from "../rds-icon";
import RdsCheckbox, { CheckboxStatus, CheckboxStyle } from "../rds-checkbox/rds-checkbox";


interface StepperDetail {
    label: string;
    subtitle: string;
    detail?: {
        subtitle: string;
    };
}

interface RdsStepperAdvanceListProps {
    headerContain: string;
    type?: any;
    isDisabled: boolean;
    checkedValue: any;
    checkBoxLabel: string;
    checkBoxId: string;
    checkBoxWithLabel: boolean;
    showDetails: boolean;
    detailsContain: string;
  }

export interface RdsStepperProps {
    detail: any;
    stepperType?: string;
    stepperDetails?: StepperDetail[];
    showSubtitles?: boolean;
    selectedStep?: number;
    steps?: number;
    role?: string;
    state?: string;
    height?: number;
    width?: number;
    displayPercentage?: string;
    variant?: string;
    iconName?: string;
    Icon?: boolean;
    iconFill?: boolean;
    iconStroke?: boolean;
    iconWidth?: string;
    iconHeight?: string;
    stepNames?: string[];
    StepIconName?: {
        iconName: string;
        iconFill: boolean;
        iconStroke: boolean;
        iconWidth: string;
        iconHeight: string;
    }[];
    stepiconName?: string;
    icons?: {
        iconName: string;
        iconSize: string;
        iconStroke: boolean;
        iconFill: boolean;
    }[];
    stepperSectionClass?: string;
    headerClass?: string;
    checkBoxClass?: string;
    showDetailsClass?: string;
    advanceList?: RdsStepperAdvanceListProps[];
}

const RdsStepper = (props: RdsStepperProps) => {
    const [page, setPage] = useState(1);
    const [checkedStates, setCheckedStates] = useState<boolean[]>(Array(props.stepperDetails?.length).fill(false));
    const formTitles = [
        { stepName: "Step 1", stepabname: "Profile" },
        { stepName: "Step 2", stepabname: "Positions" },
        { stepName: "Step 3", stepabname: "Settings" },
    ];

    const increasePageCountHandler = () => {
        if (page <= formTitles.length) {
            setPage(page + 1);
            setCheckedStates((prevStates) => {
                const newStates = [...prevStates];
                if (page - 1 < newStates.length) {
                    newStates[page - 1] = true;
                }
                return newStates;
            });
        }
    };

    const decreasePageCountHandler = () => {
        if (page > 1) {
            setCheckedStates((prevStates) => {
                const newStates = [...prevStates];
                if (page - 2 >= 0) {
                    newStates[page - 2] = false;
                }
                return newStates;
            });
            setPage(page - 1);
        }
    };

    const formLength = formTitles.length;
    const dotPosition = `${100 / formLength}`;
    const progressIndex = `${(100 / formLength) * (page - 1)}%`;

    return (
        <>
            {props.stepperType == "simple" && (
                <>
                    <div className="progressBar">
                        <div className="h-100"
                            style={{
                                background: "#336cff",
                                width: progressIndex,
                            }}
                        ></div>
                        {formTitles.map((formItem, idx, arr) => (
                            <>
                                {idx < arr.length - 1 ? (
                                    <span
                                        className="dot"
                                        style={{ left: `${parseFloat(dotPosition) * (idx + 1)}%` }}
                                    ></span>
                                ) : (
                                    ""
                                )}
                            </>
                        ))}
                    </div>

                    <div className="d-flex mt-2">
                        {formTitles.map((FormItem) => (
                            <>
                                <div style={{ width: `${dotPosition}%` }} className="ps-3">
                                    <div style={{ fontSize: "20px", color: "#336cff" }}>{FormItem.stepName}</div>
                                    <div style={{ fontSize: "20px" }}>{FormItem.stepabname}</div>
                                </div>
                            </>
                        ))}
                    </div>

                    <div className="mt-5">
                        <button
                            disabled={page === 1}
                            className="btn btn-primary btn-sm me-2"
                            onClick={decreasePageCountHandler}
                        >
                            Prev
                        </button>
                        <button
                            disabled={page === formTitles.length + 1}
                            className="btn btn-primary btn-sm"
                            onClick={increasePageCountHandler}
                        >
                            Next
                        </button>
                    </div>
                </>


            )}

            {props.role === "Dash" && (
                <>
                    <div className="stepper-container" style={{ width: `100%` }}>
                        {[...Array(props.steps)].map((_, index) => (
                            <div
                                key={index}
                                className={`step ${props.state === 'default'
                                    ? 'bg-default'
                                    : props.state === 'inprogress'
                                        ? index === 0
                                            ? 'bg-completed'
                                            : index === 1
                                                ? 'bg-inprogress'
                                                : 'bg-default'
                                        : props.state === 'completed'
                                            ? index < (props.steps ?? 0) - 1
                                                ? 'bg-completed'
                                                : 'bg-inprogress'
                                            : props.state === 'error'
                                                ? index === 0 || index === 1
                                                    ? 'bg-completed'
                                                    : index === 2
                                                        ? 'bg-error'
                                                        : 'bg-default'
                                                : index < (props.steps ?? 0) - 1
                                                    ? 'bg-completed'
                                                    : 'bg-inprogress'
                                    }`}
                                style={{ flex: 1, height: `${props.height}px` }}
                            >
                            </div>
                        ))}
                    </div>
                </>
            )}

            {props.role === "Block" && (
                <>
                    <div className="stepper-container" style={{ width: `100%` }}>
                        {[...Array(props.steps)].map((_, index) => (
                            <div
                                key={index}
                                className={`block_step d-flex align-items-center justify-content-center ${props.state === 'default'
                                    ? 'bg-default'
                                    : props.state === 'inprogress'
                                        ? index === 0
                                            ? 'bg-completed'
                                            : index === 1
                                                ? 'bg-inprogress'
                                                : 'bg-default'
                                        : props.state === 'completed'
                                            ? index < (props.steps ?? 0) - 1
                                                ? 'bg-completed'
                                                : 'bg-inprogress'
                                            : props.state === 'error'
                                                ? index === 0 || index === 1
                                                    ? 'bg-completed'
                                                    : index === 2
                                                        ? 'bg-error'
                                                        : 'bg-default'
                                                : index < (props.steps ?? 0) - 1
                                                    ? 'bg-completed'
                                                    : 'bg-inprogress'
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

            {props.role === "Stepper" && (
                <>
                    <div className="stepper-container" style={{ width: `100%`, position: 'relative' }}>
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
                                <div className="step-content">
                                    <div className={`step-icon ${props.state === 'default'
                                        ? props.variant === 'outlined' ? 'outline-default' : 'bg-default'
                                        : props.state === 'inprogress'
                                            ? index === 0
                                                ? props.variant === 'outlined' ? 'outline-inprogress' : 'bg-inprogress'
                                                : index === 1
                                                    ? props.variant === 'outlined' ? 'outline-inprogress' : 'bg-inprogress'
                                                    : props.variant === 'outlined' ? 'outline-inprogress' : 'bg-inprogress'
                                            : props.state === 'completed'
                                                ? index < (props.steps ?? 0) - 1
                                                    ? props.variant === 'outlined' ? 'outline-completed' : 'bg-completed'
                                                    : props.variant === 'outlined' ? 'outline-completed' : 'bg-completed'
                                                : props.state === 'error'
                                                    ? index === 0 || index === 1
                                                        ? props.variant === 'outlined' ? 'outline-error' : 'bg-error'
                                                        : index === 2
                                                            ? props.variant === 'outlined' ? 'outline-error' : 'bg-error'
                                                            : props.variant === 'outlined' ? 'outline-error' : 'bg-error'
                                                    : index < (props.steps ?? 0) - 1
                                                        ? props.variant === 'outlined' ? 'outline-error' : 'bg-error'
                                                        : props.variant === 'outlined' ? 'outline-error' : 'bg-error'
                                        }`}>
                                        {props.Icon ? (
                                            props.StepIconName && props.StepIconName[index] ? (
                                                <RdsIcon
                                                    name={props.StepIconName[index].iconName}
                                                    fill={props.StepIconName[index].iconFill}
                                                    stroke={props.StepIconName[index].iconStroke}
                                                    width={props.StepIconName[index].iconWidth}
                                                    height={props.StepIconName[index].iconHeight}
                                                />
                                            ) : (
                                                <RdsIcon
                                                    name={props.iconName}
                                                    fill={props.iconFill}
                                                    stroke={props.iconStroke}
                                                    width={props.iconWidth}
                                                    height={props.iconHeight}
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
                                            backgroundColor: props.state === 'default'
                                                ? '#d3d3d3'
                                                : props.state === 'inprogress'
                                                    ? '#D4BBFF'
                                                    : props.state === 'completed'
                                                        ? '#7825E9'
                                                        : props.state === 'error'
                                                            ? '#BD0D1D'
                                                            : '#BD0D1D'
                                        }}
                                    ></div>
                                )}
                            </div>
                        ))}
                    </div>
                </>
            )}

            {props.stepperType == "withcheckbox" && (
                <>
                    <div>
                        {props.stepperDetails?.map((detail, index) => (
                            <div key={index} className="mb-3">
                                <RdsCheckbox
                                    classes="py-2"
                                    labelText={detail.label}
                                    status= {CheckboxStatus.Checked}
                                    style={CheckboxStyle.Square}
                                    id={`projectDetailsCheckbox-${index}`}
                                    checked={checkedStates[index]}
                                    dataTestId={`projectDetails-${index}`} isDisabled={true}
                                ></RdsCheckbox>
                                {checkedStates[index] && props.showSubtitles && <div>{detail.subtitle}</div>}
                            </div>
                        ))}
                    </div>

                    <div className="mt-5">
                        <button
                            disabled={page === 1}
                            className="btn btn-primary btn-sm me-2"
                            onClick={decreasePageCountHandler}
                        >
                            Prev
                        </button>
                        <button
                            disabled={page === formTitles.length + 1}
                            className="btn btn-primary btn-sm"
                            onClick={increasePageCountHandler}
                        >
                            Next
                        </button>
                    </div>

                </>
            )}

            {props.stepperType == "advance" && (
            <>
            {props.advanceList?.map((e) => <div className={props.stepperSectionClass}>
            <span className={props.headerClass}>{e.headerContain}</span>
            <span className={props.checkBoxClass}><RdsCheckbox isDisabled={e.isDisabled} checked={e.checkedValue}labelText={e.checkBoxLabel} id={e.checkBoxId} showText={e.checkBoxWithLabel}/></span>
            {e.showDetails && <div className={props.showDetailsClass}>{e.detailsContain}</div>}
            </div>)}
            </>
            )}

        </>
    );
};

export default RdsStepper;
