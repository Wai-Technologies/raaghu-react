import React, { useEffect, useState } from "react";
import { RdsCompDatatable } from "../../../rds-components";
import {
    RdsAlert,
    RdsButton,
    RdsOffcanvas,
    RdsSelectList,
    RdsTextArea,
} from "../../../rds-elements";

import {
    useAppDispatch,
    useAppSelector,
} from "../../../../libs/state-management/hooks";
import {
    getLanguageTextsRequest,
    getLanguagesResourcesRequest,
    putLanguageTextsRequest,
    putLanguageTextsRestoreRequest
} from "../../../../libs/state-management/public.api";
import { useTranslation } from "react-i18next";
import { isgrantedpolicies } from "../../../../../raaghu-react-core/src/index";

const LanguageText = () => {
    const configData = useAppSelector((state) => state.persistedReducer?.configureStore?.configuration?.auth?.grantedPolicies || {});
    const [actions, setActions] = useState<any>([]);
    const [skipCount, setSkipCount] = useState<number>(0);
    const [maxResultCount, setMaxResultCount] = useState<number>(10);
    const [totalRecords, setTotalRecords] = useState<number | null>(0);
    const [cultureList, setCultureList] = useState<{ option: string; value: any }[]>([]);
    const [res, setRes] = useState<{ option: string; value: any }[]>([]);
    const [tableData, setTableData] = useState([]);
    const [Alert, setAlert] = useState({ show: false, message: "", color: "" });
    const [languageTextData, setLanguageTextData] = useState({
        resourceName: " ",
        baseCultureName: "en",
        targetCultureName: "cs",
        getOnlyEmptyValues: false,
        sorting: "name asc",
    });

    const [languageDataEdit, setLanguageDataEdit] = useState({
        resourceName: "",
        cultureName: " ",
        name: "",
        value: "",
    });
    const { t } = useTranslation();
    const tableHeaders = [
        {
            displayName: t("LanguageManagement.Key"),
            key: "name",
            datatype: "text",
            sortable: false,
        },
        {
            displayName: t("LanguageManagement.BaseValue"),
            key: "baseValue",
            datatype: "text",
            sortable: false,
        },
        {
            displayName: t("LanguageManagement.Value"),
            key: "value",
            datatype: "text",
            sortable: false,
        },
        {
            displayName: t("LanguageManagement.ResourceName"),
            key: "resourceName",
            datatype: "text",
            sortable: false,
        },
    ];
    const target = [
        {
            option: "All",
            value: "All",
        },
        {
            option: "Only Empty Values",
            value: "OnlyEmpty Values",
        },
    ];
    const data = useAppSelector((state) => state.persistedReducer.languageTexts);
    const languageSlicedata = useAppSelector((state) => state.persistedReducer.languages);
    const dispatch = useAppDispatch();

    //value
    const [codes, setCodes] = useState({
        baseCulture: "aa",
        targetCulture: "cs",
        resourceName: undefined,
        targetvalue: "All",
    });


    useEffect(() => {
        const IsEdit = isgrantedpolicies('LanguageManagement.LanguageTexts.Edit', configData);
        let resultArray = [];

        if (IsEdit) {
            resultArray.push({ id: "pencil", displayName: t("AbpUi.Edit"), offId: "lang-text-off" });
        }
        if (!arraysAreEqual(actions, resultArray)) {
            setActions(resultArray);
        }
    }, [configData, t, actions]);
    const arraysAreEqual = (arr1: any, arr2: any) => {
        return JSON.stringify(arr1) === JSON.stringify(arr2);
    };


    useEffect(() => {
        dispatch(getLanguagesResourcesRequest() as any);
      
        const storedData = localStorage.getItem("cultureListFromConfiguration");
        if (storedData) {
          const tempNames1 = JSON.parse(storedData || "");
          const tempNames = tempNames1?.map((item: any) => ({
            option: item.displayName,
            value: item.cultureName,
          }));
         setCultureList(tempNames);
        } else {
          // Handle the case when the localStorage item is empty or doesn't exist
          console.error("Culture list data is not available in localStorage");
        }
      }, []);
      
      useEffect(() => {
        if (languageSlicedata.getLanguagesResources && Array.isArray(languageSlicedata.getLanguagesResources)) {
            const tempres = languageSlicedata?.getLanguagesResources?.map((item: any) => {
                return {
                    option: item.name,
                    value: item.name
                };
            });
            tempres.unshift({ option: "All", value: " " });
            setRes(tempres);
        }
    }, [languageSlicedata.getLanguagesResources]);
    
    useEffect(() => {
        dispatch(getLanguageTextsRequest({ ...languageTextData, sorting: "name asc", skipCount: skipCount, maxResultCount: maxResultCount }) as any);
    }, [skipCount, maxResultCount]);


    useEffect(() => {
        if (data.getLanguageTexts.items != null) {
            const temptableData = data.getLanguageTexts?.items?.map((item: any) => {
                return {
                    baseValue: item.baseValue,
                    name: item.name,
                    resourceName: item.resourceName,
                    value: item.value
                };
            });
            setTableData(temptableData);
            setTotalRecords(data.getLanguageTexts?.totalCount);
        }
    }, [data.getLanguageTexts]);


    const onActionSelection = (rowData: any, actionId: any) => {
        setLanguageDataEdit({
            ...languageDataEdit,
            value: rowData.value,
            name: rowData.name,
            resourceName: rowData.resourceName,
        });
    };

    const onTextEdit = (e: any) => {
        setLanguageDataEdit({ ...languageDataEdit, value: e.target.value });
    };

    const onRestore = () => {
        const resourceName = languageDataEdit.resourceName;
        const cultureName = codes.targetCulture;
        const Name = languageDataEdit.name;
        dispatch(putLanguageTextsRestoreRequest({ resourceName: resourceName, cultureName: cultureName, name: Name }) as any).then(
            (res: any) => {
                setAlert({
                    ...Alert,
                    show: true,
                    message: t("Target language restored Succesfully"),
                    color: "success",
                });
                dispatch(getLanguageTextsRequest({ ...languageTextData, sorting: "name asc", skipCount: skipCount, maxResultCount: maxResultCount }) as any);
            }
        );
    };

    useEffect(() => {
        // Set a 3-second timer to update the state
        const timer = setTimeout(() => {
            setAlert({ ...Alert, show: false });
        }, 2000);
        // Clean up the timer when the component unmounts or when the state changes
        return () => clearTimeout(timer);
    }, [tableData]);

    const SaveHandler = () => {
        const resourceName = languageDataEdit.resourceName;
        const cultureName = codes.targetCulture;
        const Name = languageDataEdit.name;
        const value = languageDataEdit.value;
        dispatch(
            putLanguageTextsRequest({ resourceName: resourceName, cultureName: cultureName, name: Name, value: value }) as any
        ).then((res: any) => {
            setAlert({
                ...Alert,
                show: true,
                message: t("Target language edited Succesfully"),
                color: "success",
            });
            const resourceName = codes.resourceName;
            const baseCultureName = codes.baseCulture;
            const targetCultureName = codes.targetCulture;
            const getOnlyEmptyValues =
                codes.targetvalue == "All" ? false : true;

            dispatch(
                getLanguageTextsRequest({
                    resourceName,
                    baseCultureName,
                    targetCultureName,
                    getOnlyEmptyValues,
                    skipCount,
                    maxResultCount,
                    sorting: "name asc"
                }) as any
            );
        });
    };



    const onChangeSelectList = (fieldName: any, value: any) => {
        let updatedSelectListData;
        if (fieldName === "baseCultureName") {
            updatedSelectListData = { ...languageTextData, baseCultureName: value };
        }
        else if (fieldName === "targetCultureName") {
            updatedSelectListData = { ...languageTextData, targetCultureName: value };
        }
        else if (fieldName === "getOnlyEmptyValues") {
            updatedSelectListData = { ...languageTextData, getOnlyEmptyValues: value === "OnlyEmpty Values" };
        }
        else if (fieldName === "resourceName") {
            updatedSelectListData = { ...languageTextData, resourceName: value };
        }
        if (updatedSelectListData) {
            dispatch(getLanguageTextsRequest(updatedSelectListData) as any);
            setLanguageTextData(updatedSelectListData);
        }
    }

    //paginationa handling
    const paginationHandler = (currentPage: number, recordsPP: number) => {
        const skipCount = recordsPP * (currentPage - 1);
        setSkipCount(skipCount);
        setMaxResultCount(recordsPP);
    };
    return (
        <>
            <div className="row h-100">
                <div className="col-md-12">
                    <div className="card px-4 py-4 border-0 rounded-0 card-full-stretch">
                        <div className="row">
                            <div className="col-xxl-3 col-xl-3 col-lg-6 col-md-6 col-12 mb-3">
                                <RdsSelectList
                                    id="ement.Ba"
                                    placeholder={t("LanguageManagement.BaseValue") || ""}
                                    selectItems={cultureList}
                                    selectedValue={languageTextData.baseCultureName}
                                    onChange={(item: any) => onChangeSelectList("baseCultureName", item.value)}
                                    dataTestId="base-culture-name"
                                ></RdsSelectList>
                            </div>
                            <div className="col-xxl-3 col-xl-3 col-lg-6 col-md-6 col-12 mb-3">
                                <RdsSelectList
                                    id="LangV"
                                    placeholder={t("LanguageManagement.Value") || ""}
                                    selectItems={cultureList}
                                    selectedValue={languageTextData.targetCultureName}
                                    onChange={(item: any) => onChangeSelectList("targetCultureName", item.value)}
                                    dataTestId="target-culture-name"
                                ></RdsSelectList>
                            </div>
                            <div className="col-xxl-3 col-xl-3 col-lg-6 col-md-6 col-12 mb-3">
                                <RdsSelectList
                                    id="langR"
                                    placeholder={t("LanguageManagement.ResourceName") || ""}
                                    selectItems={res}
                                    selectedValue={languageTextData.resourceName}
                                    onChange={(item: any) => onChangeSelectList("resourceName", item.value)}
                                    dataTestId="resource-name"
                                ></RdsSelectList>
                            </div>
                            <div className="col-xxl-3 col-xl-3 col-lg-6 col-md-6 col-12 mb-3">
                                <RdsSelectList
                                    id="langT"
                                    placeholder={t("LanguageManagement.TargetValue") || ""}
                                    onChange={(item: any) => onChangeSelectList("getOnlyEmptyValues", item.value)}
                                    selectedValue={languageTextData.getOnlyEmptyValues ? "OnlyEmpty Values" : "All"}
                                    selectItems={target}
                                    dataTestId="target-value"
                                ></RdsSelectList>
                            </div>
                        </div>
                        <div className="p-2 h-100">
                            <RdsCompDatatable
                                actionPosition="right"
                                classes="table__userTable"
                                tableHeaders={tableHeaders}
                                tableData={tableData}
                                actions={actions}
                                onActionSelection={onActionSelection}
                                noDataheaderTitle={t("No Records Available") || ""}
                                illustration={true}
                                recordsPerPageSelectListOption={true}
                                pagination={true}
                                totalRecords={totalRecords}
                                recordsPerPage={maxResultCount}
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
                        <RdsOffcanvas
                            placement={"end"}
                            backDrop={true}
                            scrolling={false}
                            preventEscapeKey={false}
                            offId={"lang-text-off"}
                            canvasTitle={t("Edit Language")}>
                            <form>
                                <div className="row">
                                    <div>{t("LanguageManagement.Key") || ""}</div>
                                    <h6 className="fw-semibold">{languageDataEdit.name}</h6>
                                    <div className="col-md-12 mb-3">
                                        <div className="form-group mt-3">
                                            <RdsTextArea
                                                placeholder=""
                                                readonly={true}
                                                label={t("LanguageManagement.BaseValue") || ""}
                                                rows={4}
                                                value={languageDataEdit.name}
                                            ></RdsTextArea>
                                        </div>
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <div className="form-group mt-3">
                                            <RdsTextArea
                                                placeholder=""
                                                readonly={false}
                                                label={t("LanguageManagement.TargetValue") || ""}
                                                rows={4}
                                                value={languageDataEdit.value}
                                                onChange={onTextEdit}
                                            ></RdsTextArea>
                                        </div>
                                    </div>
                                </div>
                            </form>

                            <div className="pb-3 footer-buttons d-flex flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row gap-2">
                                <RdsButton
                                    label={t("LanguageManagement.RestoreToDefault") || ""}
                                    type="button"
                                    size="small"
                                    class="ms-2"
                                    colorVariant="primary"
                                    databsdismiss="offcanvas"
                                    onClick={onRestore}
                                    isOutline={true}
                                    showLoadingSpinner={true}
                                ></RdsButton>

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
                                    class="ms-2"
                                    colorVariant="primary"
                                    databsdismiss="offcanvas"
                                    onClick={SaveHandler}
                                    showLoadingSpinner={true}
                                ></RdsButton>
                            </div>
                        </RdsOffcanvas>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LanguageText;