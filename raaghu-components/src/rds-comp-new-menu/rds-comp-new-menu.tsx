import { RdsCheckbox, RdsSelectList } from "../rds-elements";
import React, { useState, useEffect } from "react";
import { RdsInput, RdsButton } from "../rds-elements";
import { useTranslation } from "react-i18next";
export interface RdsCompNewMenuProps {
    onSubmit: any;
    menusData: any;
    valueType?: any;
    reset?: boolean;
    onCancel?: any
    menuPage: {
        option: string;
        value: number;
    }[];
}
export interface MenuPage {
    option: string;
    value: number;
}
const RdsCompNewMenu = (props: RdsCompNewMenuProps) => {
    const { t } = useTranslation();

    const [data, setData] = useState(props.menusData);
    const [inputReset, setInputReset] = useState(props.reset);
    const [menuPageList, setMenuPageList] = useState<MenuPage[]>([]);

    useEffect(() => {
        setMenuPageList(props.menuPage);
    }, [props.menuPage]);

    useEffect(() => {
        setInputReset(props.reset)
    }, [props.reset])

    useEffect(() => {
        setData(props.menusData);
    }, [props.menusData]);

    const handlerChangeInput = (e: any, key: any) => {
        setData({ ...data, [key]: e.target.value });
    };

    const handlerChangeActive = (e: any) => {
        setData({ ...data, isActive: e });
    };

    function handlePageId(value: any) {
        setData({ ...data, pageId: value, });
    }

    return (
        <>
            <div className="row">
                <div className="col-md-12 mb-3">
                    <RdsInput
                        label={t("URL") || ""}
                        value={data?.url}
                        placeholder={t("Enter Url") || ""}
                        name="url"
                        onChange={(e) => handlerChangeInput(e, "url")}
                        dataTestId="url"
                    />
                </div>
                <div className="col-md-12 mb-3">
                    <RdsSelectList
                        id="selpa"
                        label={t("Page") || ""}
                        placeholder={"Select Page"}
                        selectItems={menuPageList}
                        isSearchable={true}
                        selectedValue={menuPageList?.find((pagesName) => pagesName.value === data?.pageId)?.value}
                        onChange={(item: any) => handlePageId(item.value)}
                    ></RdsSelectList>
                </div>
                <div className="col-md-12"><hr /></div>
                <div className="col-md-12 mb-3">
                    <RdsInput
                        label={t("Display Name") || ""}
                        value={data?.displayName}
                        placeholder={t("Enter Display Name") || ""}
                        name="displayName"
                        required={true}
                        onChange={(e) => handlerChangeInput(e, "displayName")}
                        dataTestId="display-name"
                        reset={inputReset}
                    />
                </div>
                <div className="col-md-12 mb-3">
                    <RdsCheckbox
                        label={t("Active") || ""}
                        onChange={(e) => {
                            handlerChangeActive(e.target.checked);
                        }}
                        checked={data?.isActive}
                        dataTestId="active"
                    ></RdsCheckbox>
                </div>
                <div className="col-md-12 mb-3">
                    <RdsInput
                        label={t("Icon") || ""}
                        value={data?.icon}
                        placeholder={t("Enter Icon") || ""}
                        name="icon"
                        onChange={(e) => handlerChangeInput(e, "icon")}
                        dataTestId="enter-icon"
                    />
                </div>
                <div className="col-md-12 mb-3">
                    <RdsInput
                        label={t("Target") || ""}
                        value={data?.target}
                        placeholder={t("Enter Target") || ""}
                        name="target"
                        onChange={(e) => handlerChangeInput(e, "target")}
                        dataTestId="target"
                    />
                </div>
                <div className="col-md-12 mb-3">
                    <RdsInput
                        label={t("Element ID") || ""}
                        value={data?.elementId}
                        placeholder={t("Enter Element ID") || ""}
                        name="elementId"
                        onChange={(e) => handlerChangeInput(e, "elementId")}
                        dataTestId="enter-id"
                    />
                </div>
                <div className="col-md-12 mb-3">
                    <RdsInput
                        label={t("Css Class") || ""}
                        value={data?.cssClass}
                        placeholder={t("Enter Css Class") || ""}
                        name="cssClass"
                        onChange={(e) => handlerChangeInput(e, "cssClass")}
                        dataTestId="enter-css-class"
                    />
                </div>

                <div className="footer-buttons pb-3 d-flex flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row gap-2">
                    <RdsButton
                        label={t("Cancel") || ""}
                        databsdismiss="offcanvas"
                        type={"button"}
                        size="small"
                        isOutline={true}
                        colorVariant="primary"
                        class="me-2"
                        dataTestId="cancel"
                        onClick={(e) => props?.onCancel && props?.onCancel(e)}
                    ></RdsButton>
                    <RdsButton
                        label={t("Save") || ""}
                        type={"button"}
                        size="small"
                        databsdismiss="offcanvas"
                        isDisabled={!data?.displayName}
                        colorVariant="primary"
                        class="me-2"
                        onClick={() => {
                            props.onSubmit(data);
                        }}
                        dataTestId="save"
                    ></RdsButton>
                </div>
            </div>
        </>
    );
};

export default RdsCompNewMenu;
