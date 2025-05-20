
import React, { useEffect, useState } from "react";
import {
    RdsInput,
    RdsButton,
    RdsRadioButton,
    RdsCounter,
} from "../rds-elements";
import "./rds-comp-edition-information.css";

export interface RdsCompEditionInformationProps {
    radioItems: any[];
    sizeDataWithDescription?: any[];
    onSaveHandler?: (data: any) => void;
    edition?: any;
    reset?: boolean;
}

const RdsCompEditionInformation = (props: RdsCompEditionInformationProps) => {
    const [values, setValues] = useState(props.edition);
    const [trialPeriodCounter, setTrialPeriodCounter] = useState(0);
    const [expiryNotificationCounter, setExpiryNotificationCounter] = useState(0);
    const [inputReset, setInputReset] = useState(false);
    const [selectedGroupValues, setSelectedGroupValues] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        setValues(props.edition);
    }, [props.edition]);

    useEffect(() => {
        setInputReset(!inputReset);
    }, [props.reset]);

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

    function emitSaveData(event: any) {
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
            <div className="py-4 edition-information-container">
                <form>
                    <div className="row px-2">
                        <div className="col-md-6 my-3">
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
                        <div className="col-md-6 my-3">
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
                                counterValue={trialPeriodCounter}
                                label="Trial Period"
                                min={0}
                                max={50}
                                width={200}
                                type="Default"
                                colorVariant="primary"
                                onCounterChange={(e: number) => handleDataChanges(e, "trialPeriodCounter")}
                            />
                        </div>
                        <div className=" col-md-6 my-3">
                            <RdsCounter
                                key={expiryNotificationCounter}
                                counterValue={expiryNotificationCounter}
                                label="Expiry Notification Interval"
                                min={0}
                                max={50}
                                width={200}
                                type="Default"
                                colorVariant="primary"
                                onCounterChange={(e: number) => handleDataChanges(e, "expiryNotificationCounter")}
                            />
                        </div>
                    </div>

                <div className="row mb-3 px-2">
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
                        onClick={(e: any) => emitSaveData(e)}
                    />
                </div>
            </form>
        </div>
        </>
    );
};

export default RdsCompEditionInformation;
