import React, { useState, useEffect } from "react";
import {
    useAppDispatch,
    useAppSelector,
} from "../../../../libs/state-management/hooks";
import {
    allLanguagesCulture,
    getAllTemplates,
    restoreToDefault,
    updateTemplateContent,
    getTemplateContentTar,
    getTemplateContentRef
} from "../../../../libs/state-management/text-template/text-template-slice";
import { RdsCompDatatable } from "../../../rds-components";
import { useTranslation } from "react-i18next";
import {
    RdsAlert,
    RdsButton,
    RdsLabel,
    RdsOffcanvas,
    RdsSelectList,
    RdsTextArea,
} from "../../../../../raaghu-elements/src";
import { isgrantedpolicies } from "../../../../../raaghu-react-core/src/index"

const TextTemplate = () => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const textTemplate = useAppSelector(
        (state) => state.persistedReducer.textTemplate
    );
    const configData = useAppSelector((state) => state.persistedReducer?.configureStore?.configuration?.auth?.grantedPolicies || {});

    // useState Hook
    const [actions, setActions] = useState<any>([])
    const [tableData, setTableData] = useState([]);
    const [name, setName] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [referenceContent, setReferenceContent] = useState("");
    const [targetContent, setTargetContent] = useState("");
    const [languages, setLanguages]: any = useState<{ option: any, value: any }[]>([]);
    const [totalRecords, setTotalRecords] = useState<number>(0);
    const [skipCount, setSkipCount] = useState<number>(0);
    const [maxResultCount, setMaxResultCount] = useState<number>(10);
    const [selectedRefValue, setSelectedRefValue] = useState("en-GB");
    const [selectedTargetCulture, setSelectedTargetCulture] = useState("ar");    
    const [Alert, setAlert] = useState({ show: false, message: "", color: "" });

    //constants
    const tableHeaders = [
        {
            displayName: t("TextTemplateManagement.Name"),
            key: "name",
            datatype: "tooltip",
            dataLength: 30,
            required: true,
            sortable: true,
        },
        {
            displayName: t("TextTemplateManagement.DisplayName"),
            key: "tooltip",
            datatype: "tooltip",
            dataLength: 30,
            required: true,
            sortable: true,
        },
        {
            displayName: t("TextTemplateManagement.IsInlineLocalized"),
            key: "isInlineLocalized",
            datatype: "iconAvatarTitle",
            dataLength: 30,
            required: true,
            sortable: false,
        },
        {
            displayName: t("TextTemplateManagement.Layout"),
            key: "layout",
            datatype: "tooltip",
            dataLength: 30,
            required: true,
            sortable: false,
        },
    ];
    const refTar = {
        ref: "en-GB",
        tar: "ar"
    }


    // Use Effects
    useEffect(() => {
        const IsEdit = isgrantedpolicies('TextTemplateManagement.TextTemplates.EditContents', configData);
        let resultArray = [];
 
        if (IsEdit) {
            resultArray.push({ id: "edit", displayName: t("TextTemplateManagement.EditContents"), offId: "text-temp-edit-off" });
            resultArray.push({ id: "customizePerCulture", displayName: t("TextTemplateManagement.CustomizePerCulture"), offId: "cust-per-cult" });
        }
        if (!arraysAreEqual(actions, resultArray)) {
            setActions(resultArray);
        }
    }, [configData, t, actions]);
 
    const arraysAreEqual = (arr1: any, arr2: any) => {
        return JSON.stringify(arr1) === JSON.stringify(arr2);
    };

    useEffect(() => {
        dispatch(getAllTemplates({ skipCount: skipCount, maxResultCount: maxResultCount }) as any);
        dispatch(allLanguagesCulture() as any);
    }, [dispatch, skipCount, maxResultCount]);

    useEffect(() => {
        if (textTemplate?.textTemplate.items) {
            const tickIcon = {
                iconName: "tick",
                iconFill: false,
                iconStroke: true,
                iconColor: "success",
                iconWidth: "16px",
                iconHeight: "18px",
                iconStrokeWidth: "3",
            };
            const closeIcon = {
                iconName: "close",
                iconFill: false,
                iconStroke: true,
                iconColor: "danger",
                iconWidth: "16px",
                iconHeight: "16px",
                iconStrokeWidth: "3",
            };
            const tempData = textTemplate.textTemplate.items.map((res: any) => {
                return {
                    displayName: res.displayName,
                    isInlineLocalized: res.isInlineLocalized ? tickIcon : closeIcon,
                    layout: res.layout,
                    name: res.name,
                };

            })
            setTableData(tempData);
            setTotalRecords(textTemplate?.templateData?.totalCount);
        }
    }, [textTemplate?.textTemplate?.items]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setAlert({ ...Alert, show: false });
        }, 3000);
        return () => clearTimeout(timer);
    }, [textTemplate?.textTemplate?.items]);

    useEffect(() => {
        if (textTemplate?.languages?.localization?.languages) {
            const tempLanguage = textTemplate?.languages?.localization?.languages?.map((item: any) => {
                return {
                    option: item.displayName,
                    value: item.displayName,
                };
            });
            setLanguages(tempLanguage);
        }
    }, [textTemplate?.languages?.localization?.languages]);

    useEffect(() => {
        setTargetContent(textTemplate?.targetContent)
    }, [textTemplate?.targetContent])

    useEffect(() => {
        setReferenceContent(textTemplate?.referenceContent)
    }, [textTemplate?.referenceContent])

    //Event handlers

    function onActionSelection(rowData: any, actionId: any) {
        setDisplayName(rowData.name);
        setName(rowData.name)
        if (actionId == "edit") {
            dispatch(getTemplateContentRef({ template: rowData.name, culture: refTar.ref }) as any);
            setReferenceContent(textTemplate?.referenceContent);
        }
        if (actionId == "customizePerCulture") {
            setSelectedRefValue(selectedRefValue === "en-GB" ? "English (UK)" : selectedRefValue);
            setSelectedTargetCulture(selectedTargetCulture === "ar" ? "العربية" : selectedTargetCulture);
            callApi(rowData.name);
            setReferenceContent(textTemplate?.referenceContent);
            setTargetContent(textTemplate?.targetContent);
        }
    }

    const callApi = async (data: any) => {
        await dispatch(getTemplateContentTar({ template: data, culture: refTar.tar }) as any);
        await dispatch(getTemplateContentRef({ template: data, culture: refTar.ref }) as any);
    }

    function resetDropdownValues() {
        setSelectedRefValue("en-GB");
        setSelectedTargetCulture("ar");
    }

    function onCloseFn(event: any) {
        event.preventDefault();
        setName("");
        setDisplayName("")
        setReferenceContent("");
        setTargetContent("");
        resetDropdownValues();
    }

    function restoreDefault() {
        dispatch(restoreToDefault({ templateName: name }) as any);
        setTargetContent(textTemplate?.targetContent)
    }

    function restoreDefaultContent() {
        dispatch(restoreToDefault({ templateName: name }) as any);
        setReferenceContent(textTemplate?.referenceContent)
    }

    function handleRefChange(value: any, cultureType: string, stateKey: string) {
        if (cultureType === "ref") {
            setSelectedRefValue(value);
            dispatch(getTemplateContentRef({ template: displayName, culture: value }) as any);
        } else if (cultureType === "target") {
            setSelectedTargetCulture(value);
            dispatch(getTemplateContentTar({ template: displayName, culture: value }) as any);
        }
    }

    
    function handlerEditSave(event: any) {
        event.preventDefault();
        dispatch(
            updateTemplateContent({
                templateName: name,
                cultureName: selectedRefValue,
                content: referenceContent,
            }) as any
        ).then((res: any) =>{
            if (res.type == "TextTemplate/updateTemplateContent/rejected") {
                setAlert({
                    ...Alert,
                    show: true,
                    message: t("Your request has been denied"),
                    color: "danger",
                });
            } else {
                dispatch(getAllTemplates({ skipCount: skipCount, maxResultCount: maxResultCount }) as any);
                setAlert({
                    ...Alert,
                    show: true,
                    message: t("Content Updated Successfully"),
                    color: "success",
                });
            }
        })            
        resetDropdownValues();
    }

    const handlerCustomise = (e: any) => {
        e.preventDefault();
        resetDropdownValues();
        dispatch(
            updateTemplateContent({
                templateName: name,
                cultureName: selectedTargetCulture,
                content: targetContent,
            }) as any)
            .then((res: any) =>{
                if (res.type == "TextTemplate/updateTemplateContent/rejected") {
                    setAlert({
                        ...Alert,
                        show: true,
                        message: t("Your request has been denied"),
                        color: "danger",
                    });
                } else {
                    setTargetContent(targetContent);
                    dispatch(getAllTemplates({ skipCount: skipCount, maxResultCount: maxResultCount }) as any);
                    setAlert({
                        ...Alert,
                        show: true,
                        message: t("Content Updated Successfully"),
                        color: "success",
                    });
                }
            })
                
        resetDropdownValues();
    }

    // DOM
    const paginationHandler = (currentPage: number, recordsPP: number) => {
        const skipCount = recordsPP * (currentPage - 1);
        setSkipCount(skipCount);
        setMaxResultCount(recordsPP)
    };

    return (
        <>
            <div className="container-fluid m-0 p-0">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card px-4 py-4 border-0 rounded-0 card-full-stretch">
                            <RdsCompDatatable
                                actionPosition="right"
                                tableHeaders={tableHeaders}
                                tableData={tableData}
                                pagination={true}
                                actions={actions}
                                onActionSelection={onActionSelection}
                                classes="table"
                                recordsPerPageSelectListOption={true}
                                totalRecords={totalRecords}
                                recordsPerPage={maxResultCount}
                                noDataheaderTitle={t("No Records Available") || ""}
                                illustration={true}
                                onPaginationHandler={paginationHandler}
                            ></RdsCompDatatable>
                             <div className={`offset-md-4 col-md-4 mt-3 col-12 ${totalRecords == 10 ? 'position-sticky' : 'position-absolute'} position-lg-relative bottom-0 mb-3 custom-responsive-alert`}>
                                {Alert.show && (
                                    <RdsAlert
                                        alertmessage={Alert.message}
                                        size="small"
                                        colorVariant={Alert.color}
                                    ></RdsAlert>
                                )}                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <RdsOffcanvas
                placement={"end"}
                backDrop={true}
                scrolling={false}
                preventEscapeKey={false}
                offId={"text-temp-edit-off"}
                canvasTitle={t("TextTemplateManagement.Contents")}
            >
                <form>
                    <div className="px-2">
                        <div className="form-group mb-3">
                            <div className="pe-2">
                                <RdsLabel fontWeight="normal" label={t("TextTemplateManagement.Name") || ""}></RdsLabel>
                            </div>
                            <div className="fw-medium">{name + " (" + displayName + ") "}</div>
                        </div>
                        <div className="form-group pb-4 fw-bold">
                            <label className="form-label fw-normal mb-0"> {t("TextTemplateManagement.TemplateContent") || ""}</label>
                            <span className="text-danger ms-1">*</span>
                            <RdsTextArea
                                placeholder={""}
                                value={referenceContent || ''}
                                onChange={(e: any) => setReferenceContent(e.target.value)}
                                rows={10}
                            ></RdsTextArea>
                        </div>
                        <div className="pb-3 d-flex flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row footer-buttons gap-2">
                            <RdsButton
                                size={"small"}
                                colorVariant="primary"
                                type={"button"}
                                label={t("TextTemplateManagement.RestoreToDefault") || ""}
                                isOutline={true}
                                onClick={restoreDefaultContent}
                            ></RdsButton>
                            <RdsButton
                                size={"small"}
                                colorVariant="primary"
                                type={"button"}
                                label={t("AbpUi.Cancel") || ""}
                                isOutline={true}
                                onClick={(e: any) => onCloseFn(e)}
                                databsdismiss="offcanvas"
                            ></RdsButton>
                            <RdsButton
                                size={"small"}
                                colorVariant="primary"
                                type={"submit"}
                                label={t("AbpUi.Save") || ""}
                                databsdismiss={"offcanvas"}
                                isDisabled={referenceContent === ""}
                                onClick={(e: any) => handlerEditSave(e)}
                                showLoadingSpinner={true}
                            ></RdsButton>
                        </div>
                    </div>
                </form>
            </RdsOffcanvas>
            <RdsOffcanvas
                placement={"end"}
                backDrop={true}
                scrolling={false}
                preventEscapeKey={false}
                offId={"cust-per-cult"}
                canvasTitle={t("TextTemplateManagement.CustomizePerCulture")}
            >
                <form>
                    <div className="px-2">
                        <div className="form-group mb-3">
                            <div className="pe-2">
                                <RdsLabel fontWeight="normal" label={t("TextTemplateManagement.Name") || ""}></RdsLabel>
                            </div>
                            <div className="fw-medium">{name + " (" + displayName + ") "}</div>
                        </div>
                        <div className="row pb-5">
                            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-12">
                                <div className="form-group mb-3">

                                    <RdsSelectList
                                        id='text.base'
                                        isBold={false}
                                        label={t("TextTemplateManagement.BaseCultureName") || ""}
                                        selectItems={languages}
                                        selectedValue={selectedRefValue}
                                        onChange={(item: any) => handleRefChange(item.value, "ref", "selectedTargetCulture")}
                                    ></RdsSelectList>
                                </div>
                                <div className="form-group mb-3">
                                    <RdsTextArea
                                        placeholder={""}
                                        value={referenceContent || ''}
                                        onChange={(e: any) => setReferenceContent(e.target.value)}
                                        required={true}
                                        readonly={true}
                                        isRequired={true}
                                        label={t("TextTemplateManagement.BaseContent") || ""}
                                        rows={10}
                                    ></RdsTextArea>
                                </div>
                            </div>
                            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-12">
                                <div className="form-group mb-3">
                                    <RdsSelectList
                                        id="baseTe"
                                        isBold={false}
                                        label={t("TextTemplateManagement.TargetCultureName") || ""}
                                        selectItems={languages}
                                        selectedValue={selectedTargetCulture}
                                        onChange={(item: any) => handleRefChange(item.value, "target", "selectedTargetCulture")}
                                    ></RdsSelectList>
                                </div>
                                <div className="form-group mb-3">
                                    <RdsTextArea
                                        placeholder={""}
                                        value={targetContent || ''}
                                        onChange={(e: any) => setTargetContent(e.target.value)}
                                        required={true}
                                        isRequired={true}
                                        label={t("TextTemplateManagement.TargetContent") || ""}
                                        rows={10}
                                    ></RdsTextArea>
                                </div>
                            </div>
                        </div>
                        <div className="pb-3 d-flex flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row footer-buttons gap-2">
                            <RdsButton
                                size={"small"}
                                colorVariant="primary"
                                type={"button"}
                                label={t("TextTemplateManagement.RestoreToDefault") || ""}
                                isOutline={true}
                                onClick={restoreDefault}
                            ></RdsButton>
                            <RdsButton
                                size={"small"}
                                colorVariant="primary"
                                type={"button"}
                                label={t("AbpUi.Cancel") || ""}
                                isOutline={true}
                                onClick={(e: any) => onCloseFn(e)}
                                databsdismiss="offcanvas"
                            ></RdsButton>
                            <RdsButton
                                size={"small"}
                                colorVariant="primary"
                                type={"submit"}
                                label={t("AbpUi.Save") || ""}
                                databsdismiss={"offcanvas"}
                                isDisabled={targetContent === ""}
                                onClick={(e: any) => handlerCustomise(e)}
                                showLoadingSpinner={true}
                            ></RdsButton>
                        </div>
                    </div>
                </form>
            </RdsOffcanvas>
        </>
    );
};

export default TextTemplate;
