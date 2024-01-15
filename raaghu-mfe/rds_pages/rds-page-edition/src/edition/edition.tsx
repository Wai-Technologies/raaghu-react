import React, { useEffect, useState } from "react";
import {
    RdsCompAlertPopup,
    RdsCompDatatable,
    RdsCompFeatures,
} from "../../../rds-components";
import {
    RdsButton,
    RdsOffcanvas,
    RdsInput,
    RdsAlert,
    RdsSearch,
    RdsSelectList,
} from "../../../rds-elements";
import {
    useAppSelector,
    useAppDispatch,
} from "../../../../libs/state-management/hooks";
import { useTranslation } from "react-i18next";

import {
    fetchEditionData,
    deleteEditionData,
    addEditionData,
    editEditionData,
    fetchFeaturesEdition,
    saveFeaturesEdition,
    restoreToDefaultFeaturesEdition,
    getEditionsAll,
    putEditionsMoveAllTenants,
} from "../../../../libs/state-management/edition/edition-slice";
import {
    isgrantedpolicies
} from "../../../../../raaghu-react-core/src/index";

interface RdsPageEditionProps { }

const Edition = (props: RdsPageEditionProps) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const editionuser = useAppSelector(
        (state) => state.persistedReducer.edition
    ) as any;

    const featuresDataFromSlice = useAppSelector(
        (state) => state.persistedReducer.features
    ) as any;
    const configData = useAppSelector((state) => state.persistedReducer?.configureStore?.configuration?.auth?.grantedPolicies || {});

    const [pagePermission, setPagePermission] = useState<any>({
        create: false
    })
    const [actions, setActions] = useState<any>([]);
    const [skipCount, setSkipCount] = useState<number>(0);
    const [totalRecords, setTotalRecords] = useState<number>(0);
    const [tableDataRowid, setTableDataRowId] = useState("");
    const [value, setValue] = useState("");
    const [alert, setAlert] = useState({
        showAlert: false,
        message: "",
        success: false,
    });
    const [Data, setData] = useState<any>([]);
    const [val, setVal] = useState("");
    const [alertOne, setAlertOne] = useState(false);
    const [inputReset, setInputReset] = useState(false);
    const [maxResultCount, setMaxResultCount] = useState<number>(10);
    const [featuresData, setFeaturesData] = useState<any>([]);
    const [emittedFeaturesData, setEmittedFeaturesData] = useState([]);
    let [searchFilter, setSearchFilter] = useState({
        filter: '',
    });
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');
    const [isFeatureTabChange, setIsFeatureTabChange] = useState<any>(false);

    const [editionName, setEditionName] = useState('');
    const [editionAllList, setEditionAllList] = useState<any>([]);
    const [selectedEditionId, setSelectedEditionId] = useState<any>('');
    const [showSelectlist, setSelectlist] = useState(false);
    useEffect(() => {
        const createPermission = isgrantedpolicies(
            "Saas.Editions.Create",
            configData
        );

        // Check if the value actually changed before updating the state
        if (createPermission !== pagePermission.create) {
            setPagePermission((prevPagePermission: any) => ({
                ...prevPagePermission,
                create: createPermission,
            }));
        }
        const IsEdit = isgrantedpolicies('Saas.Editions.Update', configData);
        const IsDelete = isgrantedpolicies('Saas.Editions.Delete', configData);
        const IsFeature = isgrantedpolicies('Saas.Editions.ManageFeatures', configData);
        let resultArray = [];
        if (IsEdit) {
            resultArray.push({ id: "editEdition", displayName: t("AbpUi.Edit"), offId: "edition-edit-off" })
        }

        if (IsFeature) {
            resultArray.push({ id: "feature", displayName: t("Features"), offId: "feature-off" })
        }
        if (IsDelete) {
            resultArray.push({ id: "delete", displayName: t("AbpUi.Delete"), modalId: "edition-delete-offc" })
        }

        resultArray.push({ id: "move_all_tenant", displayName: t("Move all tenants"), offId: "move_all_tenants" });
        setActions(resultArray)

        // if (!arraysAreEqual(actions, resultArray)) {
        setActions(resultArray);
        // }
    }, [configData, pagePermission.create, t, actions]);

    useEffect(() => {
        dispatch(getEditionsAll() as any);
    }, [dispatch]);

    useEffect(() => {
        if (editionuser?.getEditionsAll)
            if (editionuser.getEditionsAll?.length) {
                const editionAllData: any[] = [];
                editionuser.getEditionsAll.map((item: any) => {
                    const newItem = {
                        option: item.displayName,
                        value: item.id,
                    };
                    editionAllData.push(newItem);
                });
                setEditionAllList(editionAllData);
            }
    }, [editionuser.getEditionsAll]);

    useEffect(() => {
        dispatch(fetchEditionData({ skipCount: skipCount, maxResultCount: maxResultCount, filter: searchTerm }) as any);
    }, [dispatch, skipCount, maxResultCount, debouncedSearchTerm]);

    useEffect(() => {
        if (editionuser.users?.items) {
            const tempData = editionuser.users.items.map((item: any) => {
                return {
                    id: item.id,
                    displayName: item.displayName,
                    tenantCount: item.tenantCount
                };
            });
            setData(tempData);
            setTotalRecords(editionuser?.users?.totalCount);
        }
    }, [editionuser.users]);

    useEffect(() => {
        setAlert({
            showAlert: editionuser.alert,
            message: t(editionuser.alertMessage),
            success: editionuser.success,
        });
        setTimeout(() => {
            setAlert({
                showAlert: false,
                message: "",
                success: false,
            });
        }, 2000);
    }, [editionuser.users]);

    useEffect(() => {
        if (editionuser.featureIdentitySettings) {
            const sample = editionuser.featureIdentitySettings.groups.map((x: any) => {
                return {
                    name: x.name,
                    displayName: x.displayName,
                    features: x.features.map((f: any) => {
                        return {
                            ...f,
                            valueType: {
                                name: f.valueType.name,
                                validator: f.valueType.validator,
                                itemSource: f.valueType.itemSource,
                            },
                        };
                    }),
                };
            }
            );
            setFeaturesData(sample);
        }
    }, [editionuser.featureIdentitySettings]);

    useEffect(() => {
        if (featuresData.length > 0) {
        }
    }, [featuresData]);

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500); // Adjust the delay as needed (e.g., 500ms)

        return () => {
            clearTimeout(debounceTimer);
        };
    }, [searchTerm]);

    const tableHeaders = [
        {
            displayName: t("Saas.EditionName"),
            key: "displayName",
            datatype: "text",
            sortable: true
        },
        {
            displayName: t("Saas.TenantCount"),
            key: "tenantCount",
            datatype: "text",
            sortable: true,
        },
    ];

    const onActionSelection = (rowData: any, actionId: any) => {
        setTableDataRowId(rowData.id);
        setVal(rowData.name);
        if (actionId === "editEdition") {
        } else if (actionId === "feature") {
            dispatch(fetchFeaturesEdition(rowData.id) as any);
        }
        if (actionId = "move_all_tenant") {
            setEditionName(rowData.displayName);
            setSelectlist(true);
            if (rowData.tenantCount === 0) {
                setSelectlist(false);
            }
        }
    };

    const deleteHandler = () => {
        dispatch(deleteEditionData(tableDataRowid) as any).then((res: any) => {
            dispatch(fetchEditionData({ skipCount: skipCount, maxResultCount: maxResultCount }) as any);
            if (Data.length === 1 && skipCount > 0) {
                setSkipCount(0)
            }
        }
        );
        setAlertOne(true);
    };

    const dTo = {
        displayName: value,
    };

    const addDataHandler = () => {
        const requestBody = dTo;
        dispatch(addEditionData({ requestBody }) as any).then((res: any) => {
            dispatch(fetchEditionData({ skipCount: skipCount, maxResultCount: maxResultCount }) as any);
        });
        setValue("");
        setInputReset(!inputReset);
        setAlertOne(true);
    };

    const editDataHandler = () => {
        const dTo = {
            displayName: val,
        };
        dispatch(editEditionData({ id: tableDataRowid, dTo: dTo }) as any).then(
            (res: any) => {
                dispatch(fetchEditionData({ skipCount: skipCount, maxResultCount: maxResultCount }) as any);
            });
        setVal("");
        setAlertOne(true);
    };

    const featureDataHandler = () => {
        if (emittedFeaturesData.length > 0) {
            const features = {
                id: tableDataRowid,
                body: {
                    features: emittedFeaturesData,
                },
            };
            dispatch(saveFeaturesEdition(features));
        }
        handleFeatureCancel();
    };

    function onFeatureSelection(data: any) {
        setEmittedFeaturesData(data);
    }

    function restoreFeatures() {
        dispatch(restoreToDefaultFeaturesEdition(tableDataRowid) as any).then(
            (res: any) => {
                setAlert({
                    showAlert: editionuser.alert,
                    message: t(editionuser.alertMessage),
                    success: editionuser.success,
                });
                setTimeout(() => {
                    setAlert({
                        showAlert: false,
                        message: "",
                        success: false,
                    });
                }, 2000);
                return res;
            })
            .then(() => {
                dispatch(fetchFeaturesEdition(tableDataRowid) as any).then((featuresResponse: any) => {
                    if (featuresResponse && featuresResponse.groups) {
                        const sample = featuresResponse.groups.map((x: any) => {
                            return {
                                name: x.name,
                                displayName: x.displayName,
                                features: x.features.map((f: any) => {
                                    return {
                                        ...f,
                                        valueType: {
                                            name: f.valueType.name,
                                            validator: f.valueType.validator,
                                            itemSource: f.valueType.itemSource,
                                        },
                                    };
                                }),
                            };
                        });
                        setFeaturesData(sample);
                    }
                });
            });
    }

    //paginationa handling
    const paginationHandler = (currentPage: number, recordsPP: number) => {
        const skipCount = recordsPP * (currentPage - 1);
        setSkipCount(skipCount);
        setMaxResultCount(recordsPP);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
    };

    const handleFeatureCancel = () => {
        setIsFeatureTabChange(!isFeatureTabChange);
    };

    const moveAllTenant = () => {
        const moveTenantData = {
            editionId: selectedEditionId,
            tenantId: tableDataRowid
        }
        dispatch(putEditionsMoveAllTenants({ id: moveTenantData.tenantId, editionId: moveTenantData.editionId }) as any).then(
            (res: any) => {
                dispatch(fetchEditionData({ sorting: "id DESC", skipCount: skipCount, maxResultCount: maxResultCount }) as any);
            }
        );
        
        setSelectedEditionId(t("Select Edition") || "");
        setAlertOne(true);
    }

    return (
        <div className="container-fluid p-0 m-0 h-100">
            <div className="card px-4 py-4 border-0 rounded-0 card-full-stretch">
                <div className="row">
                    <div className="col-12 col-lg-4 col-md-6 col-xl-3 col-xxl-3 mb-2">
                        <RdsSearch
                            placeholder={t("Search") || ""}
                            labelPosition="bottom"
                            value={searchTerm}
                            size="small"
                            onChange={handleSearchChange}
                        />
                    </div>

                    <div className="col-12 col-lg-8 col-md-6 col-xl-9 col-xxl-9 d-flex justify-content-end mb-3">
                        {pagePermission.create && (
                            <RdsOffcanvas
                                canvasTitle={t("Saas.NewEdition")}
                                placement="end"
                                offcanvasbutton={
                                    <RdsButton
                                        icon="plus"
                                        iconColorVariant="light"
                                        size="small"
                                        type="button"
                                        block={false}
                                        iconHeight="15px"
                                        iconWidth="15px"
                                        iconFill={false}
                                        iconStroke={true}
                                        showLoadingSpinner={true}
                                        colorVariant="primary"
                                        onClick={() => {
                                            setValue("");
                                            setInputReset(!inputReset);
                                        }}
                                        label={t("Saas.NewEdition") || ""}
                                    />
                                }
                                backDrop={true}
                                scrolling={false}
                                preventEscapeKey={false}
                                offId={"Edition"}
                            >
                                <div>
                                    <RdsInput
                                        size="medium"
                                        inputType="text"
                                        placeholder={t("Enter Edition Name") || ""}
                                        label={t("Saas.EditionName") || ""}
                                        labelPosition="top"
                                        id=""
                                        value={value}
                                        required={true}
                                        reset={inputReset}
                                        onChange={(e) => {
                                            setValue(e.target.value);
                                            setInputReset(!inputReset);
                                        }}
                                    ></RdsInput>
                                    <div className="d-flex pb-3 flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row footer-buttons gap-2">
                                        <RdsButton
                                            label={t("AbpUi.Cancel") || ""}
                                            databsdismiss="offcanvas"
                                            type={"button"}
                                            size="small"
                                            isOutline={true}
                                            colorVariant="primary"
                                            class="me-2"
                                        ></RdsButton>
                                        <RdsButton
                                            label={t("AbpUi.Save") || ""}
                                            type={"button"}
                                            size="small"
                                            showLoadingSpinner={true}
                                            databsdismiss="offcanvas"
                                            isDisabled={value === ""}
                                            colorVariant="primary"
                                            class="me-2"
                                            onClick={addDataHandler}
                                        ></RdsButton>
                                    </div>
                                </div>
                            </RdsOffcanvas>
                        )}
                    </div>
                </div>
                <RdsCompDatatable
                    actionPosition="right"
                    tableHeaders={tableHeaders}
                    actions={actions}
                    tableData={Data}
                    onActionSelection={onActionSelection}
                    recordsPerPageSelectListOption={true}
                    noDataheaderTitle={t("No Records Available") || ""}
                    noDataTitle={t("Click on the button to add") || ""}
                    illustration={true}
                    pagination={true}
                    totalRecords={totalRecords}
                    recordsPerPage={maxResultCount}
                    onPaginationHandler={paginationHandler}
                ></RdsCompDatatable>
                <div className={`offset-md-4 col-md-4 mt-3 col-12 ${totalRecords == 10 ? 'position-sticky' : 'position-absolute'} position-lg-relative bottom-0 mb-3 custom-responsive-alert`}>
                    {alert.showAlert && alertOne && (
                        <RdsAlert
                            alertmessage={alert.message}
                            size="small"
                            colorVariant={alert.success ? "success" : "danger"}
                        ></RdsAlert>
                    )}
                </div>
                <div className="col-md-4"></div>
                <RdsCompAlertPopup
                    alertID="edition-delete-offc"
                    onSuccess={deleteHandler}
                />

                <RdsOffcanvas
                    canvasTitle={t("Edit Edition")}
                    placement="end"
                    offId="edition-edit-off"
                    backDrop={true}
                    scrolling={false}
                    preventEscapeKey={false}
                >
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <RdsInput
                                    size="medium"
                                    inputType="text"
                                    placeholder={t("Saas.EditionName") || ""}
                                    label={t("Saas.EditionName") || ""}
                                    labelPosition="top"
                                    id=""
                                    value={val}
                                    required={true}
                                    onChange={(e) => {
                                        setVal(e.target.value);
                                    }}
                                ></RdsInput>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex pb-3 flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row footer-buttons gap-2">
                        <RdsButton
                            label={t("AbpUi.Cancel") || ""}
                            databsdismiss="offcanvas"
                            type={"button"}
                            size="small"
                            isOutline={true}
                            colorVariant="primary"
                            class="me-2"
                        ></RdsButton>
                        <RdsButton
                            label={t("AbpUi.Save") || ""}
                            type={"button"}
                            size="small"
                            databsdismiss="offcanvas"
                            isDisabled={val === ""}
                            colorVariant="primary"
                            class="me-2"
                            onClick={editDataHandler}
                        ></RdsButton>
                    </div>
                </RdsOffcanvas>
                <RdsOffcanvas
                    canvasTitle={t("Features")}
                    placement="end"
                    offId="feature-off"
                    backDrop={true}
                    scrolling={false}
                    preventEscapeKey={false}
                    onClose={handleFeatureCancel}
                >
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <>
                                    <RdsCompFeatures
                                        featuresData={featuresData}
                                        onFeatureSelection={onFeatureSelection}
                                        isFeatureTabChange={isFeatureTabChange}
                                    />
                                </>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex pb-3 flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row footer-buttons gap-2">
                        <>
                            <a
                                onClick={restoreFeatures}
                                className="me-2 btn btn-transparent position-relative align-items-center btn-sm text-primary"
                            >
                                {t("Restore To Default")}
                            </a>
                        </>
                        <RdsButton
                            label={t("AbpUi.Cancel") || ""}
                            databsdismiss="offcanvas"
                            type={"button"}
                            size="small"
                            isOutline={true}
                            colorVariant="primary"
                            class="me-2"
                            onClick={handleFeatureCancel}
                        ></RdsButton>
                        <RdsButton
                            label={t("AbpUi.Save") || ""}
                            type={"button"}
                            size="small"
                            databsdismiss="offcanvas"
                            isDisabled={val === ""}
                            colorVariant="primary"
                            class="me-2"
                            onClick={featureDataHandler}
                        ></RdsButton>
                    </div>
                </RdsOffcanvas>

                <RdsOffcanvas
                    canvasTitle={t("Move all Tenants")}
                    placement="end"
                    offId="move_all_tenants"
                    backDrop={true}
                    scrolling={false}
                    preventEscapeKey={false}
                >
                    <div className="pb-3">
                        <span>Move all tenants with <b>{editionName}</b> edition to:</span>
                    </div>
                    {showSelectlist && (
                        <div className="">
                            <RdsSelectList
                                id="Selectedition"
                                placeholder={t("Select Edition") || ""}
                                selectItems={editionAllList}
                                selectedValue={selectedEditionId}
                                onChange={(item: any) => {
                                    setSelectedEditionId(item.value);
                                }}
                            ></RdsSelectList>
                        </div>
                    )
                    }
                    {!showSelectlist && (
                        <div className="pb-3">
                            <span> <b>This edition has no tenants to move.</b></span>
                        </div>
                    )
                    }
                    <div className="d-flex pb-3 flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row footer-buttons gap-2">
                        <RdsButton
                            label={t("AbpUi.Cancel") || ""}
                            databsdismiss="offcanvas"
                            type={"button"}
                            size="small"
                            isOutline={true}
                            colorVariant="primary"
                            class="me-2"
                        ></RdsButton>
                        <RdsButton
                            label={t("AbpUi.Save") || ""}
                            type={"button"}
                            size="small"
                            databsdismiss="offcanvas"
                            colorVariant="primary"
                            class="me-2"
                            onClick={moveAllTenant}
                        ></RdsButton>
                    </div>
                </RdsOffcanvas>
            </div>
        </div>
    );
};
export default Edition;
function getEditions1Request(arg0: { sorting: string; skipCount: number; maxResultCount: number; }): any {
    throw new Error("Function not implemented.");
}

