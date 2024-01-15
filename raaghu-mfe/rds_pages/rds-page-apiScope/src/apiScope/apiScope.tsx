import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import {
    RdsCompApiScopeBasicResource,
    RdsCompDatatable,
    RdsCompAlertPopup,
} from "../../../rds-components";
import {
    useAppSelector,
    useAppDispatch,
} from "../../../../libs/state-management/hooks";
import {
    RdsButton,
    RdsOffcanvas,
    RdsAlert,
    RdsModal,
    RdsSearch,
} from "../../../rds-elements";

import {
    isgrantedpolicies
} from "../../../../../raaghu-react-core/src/index"
import { deleteScopesRequest, getScopes1Request, postScopesRequest, putScopesRequest } from "../../../../libs/state-management/scopes/scopes-slice";

const ApiScope = () => {
    const { t } = useTranslation();
    const configData = useAppSelector((state) => state.persistedReducer?.configureStore?.configuration?.auth?.grantedPolicies || {});
    const [crudPermission, setCrudPermission] = useState<any>({
        create: true,
    });
    const [actions, setActions] = useState<any>([])
    useEffect(() => {
        const createPermission = isgrantedpolicies(
            "OpenIddictPro.Scope.Create",
            configData
        );

        // Check if the value actually changed before updating the state
        if (createPermission !== crudPermission.create) {
            setCrudPermission((prevPagePermission: any) => ({
                ...prevPagePermission,
                create: createPermission,
            }));
        }
        
        
        const IsEdit = isgrantedpolicies('OpenIddictPro.Scope.Update', configData);
        const IsDelete = isgrantedpolicies("OpenIddictPro.Scope.Delete", configData);
        const IsHistory = isgrantedpolicies("AuditLogging.ViewChangeHistory:Volo.Abp.OpenIddict.Pro.Scopes.Scope", configData)
        let resultArray = [];

        if (IsEdit) {
            resultArray.push({ id: "edit", displayName: t("AbpUi.Edit"), offId: "apiScope-edit-off" });
        }
        if (IsHistory) {
            resultArray.push({ id: "history", displayName: t("AbpOpenIddict.ChangeHistory"), modalId: "apiScope-change_history-off" });
        }
        if (IsDelete) {
            resultArray.push({ id: "delete", displayName: t("AbpUi.Delete"), modalId: "apiScope-delete-off" });
        }
        if (!arraysAreEqual(actions, resultArray)) {
            setActions(resultArray);
        }
    }, [configData, crudPermission.create, t, actions]);

    const arraysAreEqual = (arr1: any, arr2: any) => {
        return JSON.stringify(arr1) === JSON.stringify(arr2);
    };

    const [skipCount, setSkipCount] = useState<number>(0);
    const [maxResultCount, setMaxResultCount] = useState<number>(10);
    const [totalRecords, setTotalRecords] = useState<number | null>(0);
    const [scopeData, setScopeData] = useState<any[]>([{}]);

    const [fieldScopeData, setFieldScopeData] = useState({
        id: "",
        name: "",
        displayName: "",
        description: "",
        resources: "",
    });
    const [Alert, setAlert] = useState({ show: false, message: "", color: "" });
    const [tableDataid, setTableDataRowId] = useState(0);
    const [inputReset, setInputReset] = useState(false)

    //object destructuring of useTranslation hook
    //headers for data table
    const tableHeaders = [
        {
            displayName: t("AbpOpenIddict.Name"),
            key: "name",
            datatype: "text",
            sortable: true,
        },
        {
            displayName: t("AbpOpenIddict.DisplayName"),
            key: "displayName",
            datatype: "text",
            sortable: true,
        },
        {
            displayName: t("AbpOpenIddict.Description"),
            key: "description",
            datatype: "text",
            sortable: false,
        },
    ];

    //get state from global store
    const scopeUser = useAppSelector((state) => state.persistedReducer.scopes);

    //Dispatch action
    const dispatch = useAppDispatch();

    //all useEffects
    useEffect(() => {
        dispatch(getScopes1Request({ skipCount: skipCount, maxResultCount: maxResultCount }) as any);
    }, [dispatch, skipCount, maxResultCount]);


    useEffect(() => {
        if (scopeUser.getScopes1?.items) {
            const setData1 = scopeUser.getScopes1?.items.map((scope: any) => {
                return {
                    id: scope.id,
                    name: scope.name,
                    displayName: scope.displayName,
                    description: scope.description,
                    resources: scope.resources

                };
            });
            console.log("api data-", setData1);
            setScopeData(setData1);
            setTotalRecords(scopeUser.getScopes1?.totalCount);
        }
    }, [scopeUser.getScopes1]);

    useEffect(() => {
        if (scopeUser.getScopes?.id != null) {
            setFieldScopeData({
                id: scopeUser.getScopes.id,
                name: scopeUser.getScopes.name,
                displayName: scopeUser.getScopes.displayName,
                description: scopeUser.getScopes.description,
                resources: scopeUser.getScopes.resources,
            });
        }
    }, [scopeUser.getScopes]);

    useEffect(() => {
        // Set a 3-second timer to update the state
        const timer = setTimeout(() => {
            setAlert({ ...Alert, show: false });
        }, 3000);

        return () => clearTimeout(timer);
    }, [scopeUser.getScopes]);

    //Selection of action for data table
    const handlerActionSelection = (rowData: any, actionId: any) => {
        setTableDataRowId(rowData.id);
        if (actionId == "edit") {

            const modifiedres = rowData.resources.join("\n");
            setFieldScopeData({
                id: rowData.id,
                name: rowData.name,
                displayName: rowData.displayName,
                description: rowData.description,
                resources: modifiedres,
            });
        }

    };
    //delete the scope
    const handlerDeleteScope = () => {
        dispatch(deleteScopesRequest({ id: tableDataid }) as any).then((res: any) => {
            if (res.type == "Scopes/deleteScopesData/rejected") {
                setAlert({
                    ...Alert,
                    show: true,
                    message: t("Your request has been denied"),
                    color: "danger",
                });
            } else {
                setAlert({
                    ...Alert,
                    show: true,
                    message: t("Scope deleted Successfully"),
                    color: "success",
                });
            }
            dispatch(getScopes1Request({ skipCount: skipCount, maxResultCount: maxResultCount }) as any);
        });
    };
    //Add the scope
    const handlerAddScope = (data: any) => {

        const modifiedResources = data.resources.split("\n");
        const modifiedName = data.name.replace(/[^a-zA-Z]/g, "");
        const newDto = {
            name: modifiedName,
            displayName: data.displayName,
            description: data.description,
            extraProperties: {},
            resources: modifiedResources,
        };
        dispatch(postScopesRequest({ requestBody: newDto }) as any).then((res: any) => {
            if (res.type == "scopes/postScopesRequest/rejected") {
                setAlert({
                    ...Alert,
                    show: true,
                    message: t("Your request has been denied"),
                    color: "danger",
                });
            } else {
                setAlert({
                    ...Alert,
                    show: true,
                    message: t("Scope Added Successfully"),
                    color: "success",
                });
            }
            dispatch(getScopes1Request({ skipCount: skipCount, maxResultCount: maxResultCount }) as any);
        });
    };
    //Edit the scope
    const handlerEditScope = (data: any) => {
        const modifiedResource = data.resources.split("\n");
        const modifiedName = data.name.replace(/[^a-zA-Z]/g, "");
        const editDto = {
            name: modifiedName,
            displayName: data.displayName,
            description: data.description,
            resources: [data.resources]

        };

        dispatch(
            putScopesRequest({ id: tableDataid, requestBody: editDto }) as any
        ).then((res: any) => {
            if (res.type == "Scopes/updateScopesData/rejected") {
                setAlert({
                    ...Alert,
                    show: true,
                    message: t("Your request has been denied"),
                    color: "danger",
                });
            } else {
                setAlert({
                    ...Alert,
                    show: true,
                    message: t("Scope edited Successfully"),
                    color: "success",
                });
            }
            dispatch(getScopes1Request({ skipCount: skipCount, maxResultCount: maxResultCount }) as any);
        });
    };


    const newScopebuttonHandler = () => {
        setInputReset(!inputReset)
        setFieldScopeData({
            id: "",
            name: "",
            displayName: "",
            description: "",
            resources: "",
        });
    };
    //paginationa handling

    const paginationHandler = (currentPage: number, recordsPP: number) => {
        const skipCount = recordsPP * (currentPage - 1);
        setSkipCount(skipCount);
        setMaxResultCount(recordsPP);
    };

    return (
        <div className="container-fluid p-0 m-0">
            <div className="row">
                <div className="col-md-12">
                    <div className="card px-4 py-4 border-0 rounded-0 card-full-stretch">
                        <div className="row ">
                            <div className="align-items-center col-md-3 mb-2 justify-content-end">
                                <div className="">
                                    <RdsSearch
                                        label=""
                                        labelPosition="top"
                                        placeholder={t("Search") || ""}
                                        size="small"
                                    />
                                </div>
                            </div>
                            <div className="align-items-center d-flex mb-3 col-md-9 justify-content-end ">
                                {crudPermission.create && <RdsOffcanvas
                                    offcanvasbutton={
                                        <div>
                                            <RdsButton
                                                icon="plus"
                                                label={t("AbpOpenIddict.NewScope") || ""}
                                                iconColorVariant="light"
                                                iconHeight="12px"
                                                iconWidth="12px"
                                                iconFill={false}
                                                iconStroke={true}
                                                block={false}
                                                size="small"
                                                type="button"
                                                showLoadingSpinner={true}
                                                colorVariant="primary"
                                                onClick={newScopebuttonHandler}
                                            ></RdsButton>
                                        </div>
                                    }
                                    placement={"end"}
                                    backDrop={true}
                                    scrolling={false}
                                    preventEscapeKey={false}
                                    offId={"apiScope1"}
                                    canvasTitle={t("AbpOpenIddict.NewScope")}
                                >
                                    <RdsCompApiScopeBasicResource
                                        reset={inputReset}
                                        onSuccess={handlerAddScope}
                                        scopeData={fieldScopeData}
                                    />
                                </RdsOffcanvas>}
                            </div>
                        </div>
                        <RdsCompDatatable
                            actionPosition="right"
                            tableHeaders={tableHeaders}
                            actions={actions}
                            tableData={scopeData}
                            recordsPerPageSelectListOption={true}
                            onActionSelection={handlerActionSelection}
                            noDataheaderTitle={t("No Records Available") || ""}
                            noDataTitle={t("Click on the button to add") || ""}
                            illustration={true}
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
                        <RdsOffcanvas
                            backDrop={true}
                            preventEscapeKey={true}
                            scrolling={false}
                            offId="apiScope-edit-off"
                            placement="end"
                            canvasTitle={t("Edit Scope")}
                            children={
                                <RdsCompApiScopeBasicResource
                                    onSuccess={handlerEditScope}
                                    scopeData={fieldScopeData}
                                />
                            }
                        ></RdsOffcanvas>
                        <RdsModal
                            modalId="apiScope-change_history-off"
                            size="large"
                            modalAnimation="modal fade"
                            showModalHeader={false}
                        >
                            <h4>Volo.Abp.OpenIddict.Scopes.OpenIddictScope</h4>
                            <p>({fieldScopeData.id})</p>
                            <p className="text-center">No Change(s)</p>
                            <div className="text-end">
                                <RdsButton
                                    type={"button"}
                                    colorVariant="primary"
                                    label={t("AbpUi.Close") || ""}
                                    databsdismiss="modal"
                                    databstarget="apiScope-change_history-off"
                                ></RdsButton>
                            </div>
                        </RdsModal>
                        <RdsCompAlertPopup
                            alertID="apiScope-delete-off"
                            messageAlert={t("The selected Resource will be Deleted Permanently") || ""}
                            alertConfirmation={t("AbpUi.AreYouSure") || ""}
                            deleteButtonLabel={t("AbpUi.Yes") || ""}
                            onSuccess={handlerDeleteScope}
                        />
                    </div>
                </div>                
            </div></div>
    );
};

export default ApiScope;
