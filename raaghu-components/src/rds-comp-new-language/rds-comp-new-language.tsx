import React, { useState, useEffect } from "react";
import {
    RdsSelectList,
    RdsCheckbox,
    RdsInput,
    RdsButton
} from "../rds-elements";
import { useTranslation } from "react-i18next";

export interface RdsCompNewLanguageProps {
    cultureList: { option: any, value: any }[];
    flagIconList: { option: any, value: any }[];
    onSaveHandler: any;
    isEnabled: any;
    displayName?: any;
    edit?: boolean;
    id?: any;
    reset?: boolean;
    onClickFlagList?: ($event: React.MouseEvent<HTMLLIElement>, val: string) => void;
    onClickSetCultureName?: ($event: React.MouseEvent<HTMLLIElement>, val: string) => void;
    languageData?: any;
}

const RdsCompNewLanguage = (props: RdsCompNewLanguageProps) => {

    const [isEnabled, setCheck] = useState(props.isEnabled);
    const [cultureName, setCultureName] = useState(("Select Culture Name"));
    const [cultureUIName, setCultureUIName] = useState(("Select UI Culture Name"));
    const [displayName, setDisplayName] = useState(props.displayName || "");
    const [formValid, setFormValid] = useState(true);
    const [inputReset, setInputReset] = useState(props.reset);
    const [flagIcon, setFlagIcon] = useState("af");

    useEffect(() => {
        setInputReset(props.reset);
    }, [props.reset]);

    useEffect(() => {
        if (props.edit) {
            if (displayName && displayName.trim() !== "") {
                setFormValid(false);
            } else {
                setFormValid(true);
            }
        } else {
            if (
                cultureName !== ("Select Culture Name") &&
                cultureUIName !== ("Select UI Culture Name") &&
                displayName &&
                displayName.trim() !== ""
            ) {
                setFormValid(false);
            } else {
                setFormValid(true);
            }
        }
    }, [cultureName, cultureUIName, displayName]);

    const checkboxHandler = (event: any) => {
        setCheck(event.target.checked);
    };

    const onSaveHandler = () => {
        props.onSaveHandler({
            isEnabled: isEnabled,
            cultureName,
            uiCultureName: cultureUIName,
            displayName,
            id: props.id,
            flagIcon: flagIcon
        });
        setCheck(false);
        setCultureName("Select Culture Name");
        setCultureUIName("Select UI Culture Name");
        setDisplayName(" ");
        setFlagIcon("af");
    };

    const inputChangeHandler = (event: any) => {
        setDisplayName(event.target.value);

    };

    const onChangeSelectList = (fieldname: string, value: string) => {
        if (fieldname === "cultureName") {
            setCultureName(value);
            setCultureUIName(value);
            const selectedOption = props.cultureList.find((item) => item.value === value);
            if (selectedOption) {
                setDisplayName(selectedOption.option);
            }
        }
        else if (fieldname === "cultureUIName") {
            setCultureUIName(value);
        }
        else if (fieldname === "flagIcon") {
            setFlagIcon(value);
        }
    };

    return (
        <>
            <form>
                <div className="custom-content-scroll">
                    <div key={props.id} className="row">
                        {!props.edit && (
                            <div className="col-md-6 mb-3">
                                <div className="form-group">
                                    <RdsSelectList
                                        id="langC"
                                        label="Culture Name"
                                        selectItems={props.cultureList}
                                        selectedValue={cultureName}
                                        onChange={(item: any) => onChangeSelectList("cultureName", item.value)}
                                        required={true}
                                    ></RdsSelectList>
                                </div>
                            </div>
                        )}

                        {!props.edit && (
                            <div className="col-md-6 mb-3">
                                <div className="form-group">
                                    <RdsSelectList
                                        id="langU"
                                        label="Ui Culture Name"
                                        selectItems={props.cultureList}
                                        selectedValue={cultureUIName}
                                        onChange={(item: any) => onChangeSelectList("cultureUIName", item.value)}
                                        required={true}
                                    ></RdsSelectList>
                                </div>
                            </div>
                        )}

                        <div className="col-md-6">
                            <div className="form-group">
                                <RdsInput
                                    size="medium"
                                    label="Display Name"
                                    placeholder="Enter Display Name"
                                    value={displayName}
                                    onChange={inputChangeHandler}
                                    required={true}
                                ></RdsInput>
                            </div>
                            <RdsCheckbox
                                label={("Is Enabled") || ""}
                                checked={isEnabled}
                                onChange={checkboxHandler}
                            ></RdsCheckbox>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <div className="form-group">
                                    <RdsSelectList
                                        id="langF"
                                        label="Flag Icon"
                                        selectItems={props.flagIconList}
                                        onChange={(item: any) => onChangeSelectList("flagIcon", item.value)}
                                        selectedValue={flagIcon}
                                    ></RdsSelectList>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex flex-column-reverse flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3">
                    <RdsButton
                        label="Cancel"
                        type="button"
                        colorVariant="primary"
                        size="small"
                        databsdismiss="offcanvas"
                        isOutline={true}
                    ></RdsButton>
                    <RdsButton
                        label="Save"
                        type="button"
                        size="small"
                        isDisabled={formValid}
                        colorVariant="primary"
                        databsdismiss="offcanvas"
                        onClick={onSaveHandler}
                    ></RdsButton>
                </div>
            </form>
        </>
    );
};

export default RdsCompNewLanguage;
