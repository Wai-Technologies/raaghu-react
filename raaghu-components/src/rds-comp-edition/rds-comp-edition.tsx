import React, { useState, useEffect } from "react";
import {
    RdsLabel,
    RdsIcon,
    RdsOffcanvas,
    RdsNavtabs,
    RdsButton,
    RdsInput,
    RdsSelectList,
    RdsCounter,
} from "../rds-elements";
import RdsCompAlertPopup from "../rds-comp-alert-popup";
import "./rds-comp-edition.css";
import { RdsOffcanvasBackDrop, RdsOffcanvasPlacement } from "../../../raaghu-elements/src/rds-offcanvas/rds-offcanvas";
import RdsCompDatatable from "../rds-comp-data-table";
import { ActionPosition } from "../rds-comp-data-table/rds-comp-data-table";
import { CounterState, LayoutOptions } from "../../../raaghu-elements/src/rds-counter/rds-counter";

export interface RdsCompEditionProps {
    EditionItems: any;
    features: any;
    editionName: any;
    reset?: boolean;
    onSaveHandler?: (data: any) => void;
    planList: any[];
    accountTwoFactorSettings: any;
    planListLabel?: string;
    displayType: "basic" | "advanced" | "information" | "list";
    radioItems: any[];
    sizeDataWithDescription?: any[];
    edition?: any;
    enablecheckboxselection?: boolean;
      tableHeaders: {
        displayName: string;
        key: string;
        datatype: string;
        dataLength?: number;
        required?: boolean;
        sortable?: boolean;
        colWidth?: string;
        disabled?: boolean;
        enablecheckboxselection?: boolean;
        isEndUserEditing?: boolean;
      }[];
      actions: {
        displayName: string;
        id: string;
      }[];
      tableData: any[];
      pagination: boolean;
      recordsPerPage?: number;
      recordsPerPageSelectListOption?: boolean;
      onActionSelection(arg: any): void;
      onNewTenantClick(
        event: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
      ): void;
}
const RdsCompEdition = (props: RdsCompEditionProps) => {
    const offCanvasHandler = () => { };
    const [FormData, setFormData] = useState(props.editionName);
    const [activeNavTabId, setActiveNavTabId] = useState("0");
    const [showTenantSettings, setShowTenantSettings] = useState(false);
    const [inputReset, setInputReset] = useState(false);
    const [twoFactorData, settwoFactorData] = useState(props.accountTwoFactorSettings);
    const [values, setValues] = useState(props.edition);
    const [trialPeriodCounter, setTrialPeriodCounter] = useState(0);
    const [expiryNotificationCounter, setExpiryNotificationCounter] = useState(0);
    const [selectedGroupValues, setSelectedGroupValues] = useState<{ [key: string]: string }>({});
    
    useEffect(() => {
        setFormData(props.editionName);
    }, [props.editionName]);

    useEffect(() => {
        setInputReset(!inputReset);
    }, [props.reset]);

    useEffect(() => {
            setValues(props.edition);
        }, [props.edition]);
    
        useEffect(() => {
            setInputReset(!inputReset);
        }, [props.reset]);

    const handleChangeform = (value: any, key: any) => {
        setFormData({ ...FormData, [key]: value });
    }   

    const handleDataChanges = (event: any, key: string) => {
        if (key === 'trialPeriodCounter') {
            setTrialPeriodCounter(event);
        } else if (key === 'expiryNotificationCounter') {
            setExpiryNotificationCounter(event);
        } else {
            setValues({ ...values, [key]: event });
        }
    };

    const handleRadioChange = (event: any, groupId: string) => {
        const selectedValue = event.target.value;
        setSelectedGroupValues(prev => ({
            ...prev,
            [groupId]: selectedValue
        }));
    };

    const navtabsItems = [
        { label: "Basics", tablink: "#nav-home", id: 0 },
        { label: "Features", tablink: "#nav-profile", id: 1 },
    ];

    const handlerChangeTwoFact = (value: any, key: string) => {
        settwoFactorData({ ...twoFactorData, [key]: value });
    };

    useEffect(() => {
        settwoFactorData(props.accountTwoFactorSettings);
    }, [props.accountTwoFactorSettings]);

    useEffect(() => {
        setInputReset(!inputReset);
    }, [props.reset]);
    

    function emitSaveData(event: any) {
        event.preventDefault();
        props.onSaveHandler && props.onSaveHandler(FormData);
        setInputReset(!inputReset);
        setFormData({
            editionName: "",
            plan: "",
        });
    }

    const getRadioGroups = () => {
        return props.radioItems?.map((group) => ({
            ...group,
            itemList: group.itemList.map((item: any) => ({
                ...item,
                checked: selectedGroupValues[group.id] === item.label,
                name: `radio_group_${group.id}`
            }))
        }));
    };

    function emitSaveData1(event: any) {
        event.preventDefault();
        props.onSaveHandler && props.onSaveHandler({
            ...values,
            trialPeriodCounter,
            expiryNotificationCounter,
            selectedOptions: selectedGroupValues
        });

        // Reset form
        setValues({
            editionName: "",
            annualPrice: "",
        });
        setTrialPeriodCounter(0);
        setExpiryNotificationCounter(0);
        setSelectedGroupValues({});
        setInputReset(!inputReset);
    }

    const isEditionNameValid = (editionName: any) => {
        return editionName && editionName.length > 0;
    };

    const isAnnualPriceValid = (annualPrice: any) => {
        return annualPrice && annualPrice.length > 0;
    };

    const isFormValid = isEditionNameValid(values?.editionName) && isAnnualPriceValid(values?.annualPrice);


    return (
        <>
        {props.displayType == "basic" && (
        <div className="col-md-3 navsm mb-3 featureList ng-star-inserted">
            <div className="card border-undefined">
                <div className="headerClass">
                    <div className="p-3">
                        <div className="text-center mt-3">
                            <label className="fs-4 fw-bold text-muted">
                                {props.EditionItems.EditionName}
                            </label>
                            <p className="fw-medium text-muted pt-2">
                                <RdsLabel
                                    label={props.EditionItems.EditionTitle}
                                    size="10px"
                                    multiline={true}
                                ></RdsLabel>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="body">
                        <div className="pt-3">
                            <div className="text-center">
                                <h1 className="text-primary">
                                    <span>$</span>
                                    <span>{props.EditionItems.Price}</span>
                                </h1>
                                <span className="text-muted fw-medium text-black-50">
                                    {props.EditionItems.Plan}
                                </span>
                            </div>
                        </div>
                        <ul className="p-3">
                            {props.features.map((item: any) => (
                                <>
                                    <li className="fw-semibold" key={item}>{item}</li>
                                </>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="card-footer">
                    <div className="p-3">
                        <div className="d-flex gap-2">
                            <RdsOffcanvas
                                offcanvaswidth={650}
                                canvasTitle={"Update Edition"}
                                onclick={offCanvasHandler}
                                placement={RdsOffcanvasPlacement.End}
                                offcanvasbutton={<div>
                                    <span className="position-relative btn btn-outline-primary btn-sm btn-icon p-1 rounded-pill">
                                        <RdsIcon
                                            name="pencil"
                                            height="15px"
                                            width="15px"
                                            fill={false}
                                            stroke={true} />
                                    </span>
                                </div>}
                                backDrop={RdsOffcanvasBackDrop.False}
                                scrolling={false}
                                preventEscapeKey={false}
                                offId={"compEditionOff"}>
                                <RdsNavtabs
                                    activeNavTabId={0}
                                    navtabsItems={navtabsItems}
                                    type="tabs"
                                    isNextPressed={showTenantSettings}

                                    activeNavtabOrder={(activeNavTabId) => {
                                        setActiveNavTabId(activeNavTabId);
                                        setShowTenantSettings(false);
                                    }}
                                />
                                {activeNavTabId == "0" && showTenantSettings === false && (
                                    <>
                                        <div className="row mt-3">
                                            <div className="col-md-6 sm-p-0">
                                                <div className="form-group mb-3">
                                                    <RdsInput
                                                        required={true}
                                                        inputType="text"
                                                        name={"Edition Name"}
                                                        label={true}
                                                        placeholder="Edition Name"                                                       
                                                        value={FormData?.editionName}
                                                        onChange={(e: any) => handleChangeform(e.target.value, "editionName")}
                                                        id="editionName"
                                                        reset={inputReset}
                                                    ></RdsInput>
                                                </div>
                                            </div>
                                            <div className="col-md-6 sm-p-0">
                                                <div className="form-group mb-3">                                              
                                                    <RdsSelectList
                                                       id="selePla"
                                                       classes="text-theme-change"
                                                       label="Select Plan"
                                                       onChange={(e: any) => handleChangeform(e.target.checked, "selePlan")}                                                       
                                                       selectItems={[]}
                                                    ></RdsSelectList>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-5 d-flex gap-3 ">
                                            <RdsButton
                                                class="me-2"
                                                tooltipTitle={""}
                                                type={"button"}
                                                label={"Cancel"}
                                                colorVariant="outline-primary"
                                                size="small"
                                                databsdismiss="offcanvas"
                                            ></RdsButton>
                                            <RdsButton
                                                class="me-2"
                                                label={"Next"}
                                                size="small"
                                                colorVariant="primary"
                                                tooltipTitle={""}
                                                onClick={(e: any) => emitSaveData(e)}
                                                type={"submit"}
                                            ></RdsButton>
                                        </div>
                                    </>
                                )}
                                {(activeNavTabId == "1" || showTenantSettings == true) && (
                                    <>
                                        {/* <RdsCompNewFeatures></RdsCompNewFeatures> */}
                                    </>
                                )}
                            </RdsOffcanvas>

                            <RdsCompAlertPopup
                                alertID={"targetId"}
                            ></RdsCompAlertPopup>
                            <div>
                                <a
                                    type="button"
                                    data-bs-toggle="modal"
                                    data-bs-target="#targetId"
                                    className="position-relative btn btn-outline-danger btn-sm btn-icon p-1 rounded-pill"
                                >
                                    <RdsIcon
                                        name="delete"
                                        height="15px"
                                        width="15px"
                                        fill={false}
                                        stroke={true}
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )}
        {props.displayType == "advanced" && (
            <form >
            <div className="row mt-2">
                <div className="col-md-6">
                    <div className="form-group">
                    <RdsInput
                        required={true}
                        inputType="text"
                        name={"Select"}
                        label={true}
                        placeholder="Edition Name"                       
                        value={FormData?.editionName}
                        onChange={(e: any) =>
                          handleChangeform(e.target.value, "editionName")
                        }
                        id="editionName"
                        reset={inputReset}
                ></RdsInput>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <RdsSelectList
                            id="planLis"
                            label={props.planListLabel}
                            isDisabled={false}
                            isMultiple={false}
                            selectItems={props.planList}
                            selectedValue={twoFactorData?.planList}
                            onChange={(item: any) => {
                                handlerChangeTwoFact(item.value, "planList");
                            }}

                            dataTestId="plan-list"
                            required={true}
                        />
                    </div>
                </div>
            </div>
            <div className="d-flex flex-column-reverse ps-3 flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3">
                <RdsButton
                    class="me-2"
                    tooltipTitle={""}
                    type={"button"}
                    label="Cancel"
                    colorVariant="outline-primary"
                    size="small"
                    databsdismiss="offcanvas"
                    dataTestId="cancel"
                ></RdsButton>
                <RdsButton
                    class="me-2"
                    label="Save"
                    size="small"
                    colorVariant="primary"
                    tooltipTitle={""}
                    type={"submit"}
                    databsdismiss="offcanvas"
                    onClick={(e: any) => emitSaveData(e)}
                    dataTestId="save"
                ></RdsButton>
            </div>
        </form>
        )}
        {props.displayType == "information" && (
        <>
            <div className="py-4 edition-information-container">
                <form>
                    <div className="row px-2">
                        <div className="col-md-6">
                            <RdsInput
                                name={"Edition Name"}
                                label={true}
                                required={true}
                                placeholder="Edition Name"
                                inputType="text"
                                value={values?.editionName}
                                onChange={(e: any) => handleDataChanges(e.target.value, "editionName")}
                                dataTestId="edition-name"
                                reset={inputReset}
                            ></RdsInput>
                        </div>
                        <div className="col-md-6">
                            <RdsInput
                                 name="Annual Price"
                                 label={true}
                                required={true}
                                placeholder="Annual Price"
                                inputType="number"
                                value={values?.annualPrice}
                                onChange={(e: any) => handleDataChanges(e.target.value, "annualPrice")}
                                dataTestId="annual-price"
                                reset={inputReset}
                            ></RdsInput>
                        </div>
                    </div>
                    <div className="row px-2">
                        <div className="col-md-6 my-3 ">
                            <RdsCounter
                                key={trialPeriodCounter}
                                colorVariant="primary"
                                counterValue={trialPeriodCounter}
                                layout={LayoutOptions.SideToSide}
                                max={50}
                                min={0}
                                placeholder="00"
                                showTitle
                                state={CounterState.Default}
                                titleText="Trial Period"
                                width={200}
                                onCounterChange={(e: number) => handleDataChanges(e, "trialPeriodCounter")}
                            />
                        </div>
                        <div className=" col-md-6 my-3">
                            <RdsCounter
                                key={expiryNotificationCounter}
                                colorVariant="primary"
                                counterValue={expiryNotificationCounter}
                                layout={LayoutOptions.SideToSide}
                                max={50}
                                min={0}
                                placeholder="00"
                                showTitle
                                state={CounterState.Default}
                                titleText="Expiry Notification Interval"
                                width={200}
                                onCounterChange={(e: number) => handleDataChanges(e, "expiryNotificationCounter")}
                            />
                        </div>
                    </div>

                <div className="row mb-5 px-2">
                    <div className="col-md-12">
                        {props.radioItems?.map((group, index) => (
                            <div key={group.id} className="radio-group mb-3">
                                <label className="radio-group-label mb-2">{group.label}</label>
                                <div className="d-flex gap-4">
                                    {group.itemList.map((item: any) => (
                                        <div key={item.id} className="form-check">
                                            <input
                                                type="radio"
                                                className="form-check-input radio-toggle-switch"
                                                id={`${group.id}_${item.id}`}
                                                name={`radio_group_${group.id}`}
                                                value={item.label}
                                                checked={selectedGroupValues[group.id] === item.label}
                                                onChange={(e) => handleRadioChange(e, group.id)}
                                            />
                                            <label className="form-check-label" htmlFor={`${group.id}_${item.id}`}>
                                                {item.label}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-3 d-flex pb-3 ps-4 flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row footer-buttons gap-2 p-4">
                    <RdsButton
                        class="me-2"
                        tooltipTitle={""}
                        type={"button"}
                        label="Cancel"
                        colorVariant="outline-primary"
                        size="small"
                        databsdismiss="offcanvas"
                        dataTestId="cancel"
                    />
                    <RdsButton
                        class="me-2"
                        label="Save"
                        size="small"
                        colorVariant="primary"
                        tooltipTitle={""}
                        type={"submit"}
                        databsdismiss="offcanvas"
                        isDisabled={!isFormValid}
                        dataTestId="save"
                        onClick={(e: any) => emitSaveData1(e)}
                    />
                </div>
            </form>
        </div>
        </>
        )}
        
        {props.displayType == "list" && (
            <div className="row">
                <RdsCompDatatable
                    actionPosition={ActionPosition.Right}
                    enablecheckboxselection={props.enablecheckboxselection}
                    tableHeaders={props.tableHeaders}
                    actions={props.actions}
                    tableData={props.tableData}
                    pagination={props.pagination}
                    recordsPerPage={props.recordsPerPage}
                    onActionSelection={props.onActionSelection}
                    recordsPerPageSelectListOption={props.recordsPerPageSelectListOption}
                ></RdsCompDatatable>
            </div>
        )}
        </>
    );
};

export default RdsCompEdition;
