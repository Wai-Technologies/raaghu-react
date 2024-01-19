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

    const { t } = useTranslation();

    const [isEnabled, setCheck] = useState(props.isEnabled);
    const [cultureName, setCultureName] = useState(t("Select Culture Name"));
    const [cultureUIName, setCultureUIName] = useState(t("Select UI Culture Name"));
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
                cultureName !== t("Select Culture Name") &&
                cultureUIName !== t("Select UI Culture Name") &&
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
        setCultureName(t("Select Culture Name"));
        setCultureUIName(t("Select UI Culture Name"));
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
                <div key={props.id} className="row">
                    {!props.edit && (
                        <div className="col-md-6 mb-3">
                            <div className="form-group">
                                <RdsSelectList
                                    id="langC"
                                    label={t("LanguageManagement.CultureName") || ""}
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
                                    label={t("LanguageManagement.UiCultureName") || ""}
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
                                label={t("LanguageManagement.DisplayName") || ""}
                                placeholder={t("Enter Display Name") || ""}
                                value={displayName}
                                onChange={inputChangeHandler}
                                required={true}
                            ></RdsInput>
                        </div>
                        <RdsCheckbox
                            label={t("Is Enabled") || ""}
                            checked={isEnabled}
                            onChange={checkboxHandler}
                        ></RdsCheckbox>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <div className="form-group">
                                <RdsSelectList
                                    id="langF"
                                    label={t("LanguageManagement.FlagIcon") || ""}
                                    selectItems={props.flagIconList}
                                    onChange={(item: any) => onChangeSelectList("flagIcon", item.value)}
                                    selectedValue={flagIcon}
                                ></RdsSelectList>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            <div className="footer-buttons pb-3 d-flex flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row gap-2">
                <RdsButton
                    label={t("AbpUi.Cancel") || ""}
                    type="button"
                    colorVariant="primary"
                    size="small"
                    databsdismiss="offcanvas"
                    isOutline={true}
                ></RdsButton>
                <RdsButton
                    label={t("AbpUi.Save") || ""}
                    type="button"
                    size="small"
                    isDisabled={formValid}
                    class=""
                    colorVariant="primary"
                    databsdismiss="offcanvas"
                    onClick={onSaveHandler}
                ></RdsButton>
            </div>
        </>
    );
};

export default RdsCompNewLanguage;
