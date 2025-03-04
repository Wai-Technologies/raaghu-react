import React, { useEffect, useState } from "react";
import {
    RdsInput,
    RdsButton,
    RdsRadioButton,
    RdsCounter,
    RdsDropdownList,
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
    const [showEditionDropdown, setShowEditionDropdown] = useState(false);
    const [radioItemList, setRadioItemList] = useState<any>([]);
    const [trialPeriodCounter, setTrialPeriodCounter] = useState(0);
    const [expiryNotificationCounter, setExpiryNotificationCounter] = useState(0);
    const [inputReset, setInputReset] = useState(false);

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

    function emitSaveData(event: any) {
        event.preventDefault();
        props.onSaveHandler && props.onSaveHandler({ ...values, trialPeriodCounter, expiryNotificationCounter });
        setInputReset(!inputReset);
        setValues({
            editionName: "",
            annualPrice: "",
        });
        setTrialPeriodCounter(0);
        setExpiryNotificationCounter(0);
        setRadioItemList([{ label: "First Bill Date", inline: true, id: 1, itemList: [{ id: 1, label: "Immediately", checked: true, name: "radio_button" }, { id: 2, label: "After Trial Period", checked: false, name: "radio_button" }] }, { label: "After Subscription Expiry", id: 2, inline: true, itemList: [{ id: 1, label: "Deactivate Tenant", checked: true, name: "radio_button" }, { id: 2, label: "Delete Tenant", checked: false, name: "radio_button" }] }]);
    };
    const editionDropdownListItems = [
        {
            label: "Standard",
            val: "en",
        },
        {
            label: "Basic",
            val: "en",
        },
        {
            label: "Premium",
            val: "en",
        },
        {
            label: "Professional",
            val: "en",
        },
    ];
    useEffect(() => {
        setRadioItemList(props.radioItems)
    }, [props.radioItems]);

    function handleOptionSelection(event: any) {
        const updatedRadioItems = radioItemList?.map((item: any) => ({
            ...item,
            checked: item.id == event.target.id,
        }));
        setRadioItemList(updatedRadioItems);
    }
    const isEditionNameValid = (editionName: any) => {
        if (!editionName || editionName.length === 0) {
            return false;
        }
        return true;
    }
    const isAnnualPriceValid = (annualPrice: any) => {
        if (!annualPrice || annualPrice.length === 0) {
            return false;
        }
        return true;
    }
const isFormValid=isEditionNameValid(values?.editionName) && isAnnualPriceValid(values?.annualPrice);
    return (
        <>
            <div className="">
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
                                width={125}
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
                                width={125}
                                colorVariant="primary"
                                onCounterChange={(e: number) => handleDataChanges(e, "expiryNotificationCounter")}
                            />
                        </div>
                    </div>

                    <div className="row mb-3 px-2">
                        <div className="col-md-8">
                            <div className="form-group mt-2">
                                <form>
                                    <RdsRadioButton
                                        displayType="Horizontal"
                                        label=""
                                        itemList={radioItemList}
                                        onClick={handleOptionSelection}
                                        onChange={(e: any) => handleDataChanges(e.target.value, "radioItemList")} value={""}                                    ></RdsRadioButton>
                                </form>
                            </div>
                        </div>
                    </div>

                    {showEditionDropdown && <div className="w-50">

                        <RdsDropdownList listItems={editionDropdownListItems} borderDropdown={true} />
                    </div>}
                    <div className="mt-3 d-flex pb-3 flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row footer-buttons gap-2 ps-4 px-4">
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
                            isDisabled={!isFormValid}
                            dataTestId="save"
                            onClick={(e: any) => emitSaveData(e)}
                        ></RdsButton>
                    </div>
                </form>
            </div>
        </>
    );
};

export default RdsCompEditionInformation;
