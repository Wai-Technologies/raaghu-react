import React, { useState, useEffect, useCallback } from "react";
import {
  userConfigurationService,
  userImpersonationService,
} from "../../../../../raaghu-react-core/src/index";
import {
  postTenantsRequest,
  deleteTenantsRequest,
  getTenantsRequest,
  getTenantsLookupEditionsRequest,
  getTenants1Request,
  deleteFeaturesRequest,
  putFeaturesRequest,
  getFeaturesRequest,
  putTenantsRequest,
  putTenantsConnectionStringsRequest,
  putTenantsSetPasswordRequest,
  getTenantsConnectionStringsRequest,
  postTenantsApplyDatabaseMigrationsRequest,
} from "../../../../libs/state-management/public.api";
import {
  useAppSelector,
  useAppDispatch,
} from "../../../../libs/state-management/hooks";

import {
  RdsCompDatatable,
  RdsCompTenantInformation,
  RdsCompAlertPopup,
  RdsCompFeatures,
  RdsCompDatabaseConnection,
  RdsCompSetPassword,
} from "../../../rds-components";
import {
  RdsButton,
  RdsOffcanvas,
  RdsSearch,
  RdsSelectList,
  RdsDatePicker,
  RdsAlert,
  RdsDropdownList,
} from "../../../rds-elements";
import { useTranslation } from "react-i18next";
import { isgrantedpolicies } from "../../../../../raaghu-react-core/src/index";

const Tenant = () => {
  const [filterKey, setFilterKey] = useState(0);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const Data = useAppSelector((state) => state.persistedReducer.tenant);
  const featureData = useAppSelector(
    (state) => state.persistedReducer.features
  );
  const configData = useAppSelector(
    (state) =>
      state.persistedReducer?.configureStore?.configuration?.auth
        ?.grantedPolicies || {}
  );

  const initialData = {
    editionId: null,
    name: "",
    activationEndDate: null,
    adminPassword: "",
    activationState: "0",
    adminEmailAddress: "",
    connectionStrings: { default: null, databases: [] },
    sharedDatabase: null,
    specificDatabase: null,
  };

  const editInitialData = {
    editionId: null,
    name: "",
    activationState: "0",
  };

  //***********************************************  UseState Hook ********************************************************************** */
  const [actions, setActions] = useState<any>([]);
  const [skipCount, setSkipCount] = useState<number>(0);
  const [totalRecords, setTotalRecords] = useState<number | null>(0);
  const [Alert, setAlert] = useState({ show: false, message: "", color: "" });
  const [featuresData, setFeaturesData] = useState<any>([]);
  const [tableData, setTableData] = useState<any>([]);
  const [editionList, setEditionList] = useState<any>([]);
  const [tenantId, setTenantid] = useState<any>("");
  const [editTenantInfoData, setEditTenantInfoData] =
    useState<any>(editInitialData);
  const [newTenantInforData, setNewTenantInforData] =
    useState<any>(initialData);
  const [inputReset, setInputReset] = useState(false);
  const [maxResultCount, setMaxResultCount] = useState<number>(10);
  const [filter, setFilter] = useState<any>({
    filter: undefined,
    getEditionNames: undefined,
    editionId: undefined,
    expirationDateMin: undefined,
    expirationDateMax: undefined,
    activationState: undefined,
  });
  const [emittedFeaturesData, setEmittedFeaturesData] = useState([]);
  const [connectionStrings, setConnectionStrings] = useState<any>({
    default: null,
    databases: [],
  });
  const [isFeatureTabChange, setIsFeatureTabChange] = useState<any>(false);
  //***********************************************  Constants ********************************************************************** */

  const tableHeaders = [
    {
      displayName: t("Tenant"),
      key: "tenant",
      datatype: "text",
      sortable: true,
    },
    {
      displayName: t("Saas.Edition"),
      key: "editionName",
      datatype: "text",
      sortable: true,
    },
    {
      displayName: t("Status"),
      key: "status",
      datatype: "badge",
    },
  ];

  const activationStateList = [
    { label: "Active", val: "0" },
    { label: "Active with Limited Time", val: "1" },
    { label: "Inactive", val: "2" },
  ];
  const [pagePermission, setPagePermission] = useState<any>({
    create: false,
  });
  //***********************************************  UseEffect Hook ********************************************************************** */

  useEffect(() => {
    // Assuming isgrantedpolicies is a synchronous function
    const createPermission = isgrantedpolicies(
      "Saas.Tenants.Create",
      configData
    );

    // Check if the value actually changed before updating the state
    if (createPermission !== pagePermission.create) {
      setPagePermission((prevPagePermission: any) => ({
        ...prevPagePermission,
        create: createPermission,
      }));
    }
    const IsEdit = isgrantedpolicies("Saas.Tenants.Update", configData);
    const IsDelete = isgrantedpolicies("Saas.Tenants.Delete", configData);
    const IsFeature = isgrantedpolicies(
      "Saas.Tenants.ManageFeatures",
      configData
    );
    const IsConnectionStrings = isgrantedpolicies(
      "Saas.Tenants.ManageConnectionStrings",
      configData
    );
    const IsSetPassword = isgrantedpolicies(
      "Saas.Tenants.SetPassword",
      configData
    );
    const IsImpersonation = isgrantedpolicies(
      "Saas.Tenants.Impersonation",
      configData
    );

    let resultArray = [];

    if (IsEdit) {
      resultArray.push({
        id: "editTenant",
        displayName: t("AbpUi.Edit"),
        offId: "tenant-edit-off",
      });
    }
    if (IsConnectionStrings) {
      resultArray.push({
        id: "connectionString",
        displayName: t("Saas.ConnectionStrings"),
        offId: "tenant-connection-off",
      });
    }
    if (!IsImpersonation) {
      resultArray.push({
        id: "applyMigration",
        displayName: t("ApplyDatabaseMigrations"),
      });
    }
    if (IsFeature) {
      resultArray.push({
        id: "features",
        displayName: t("AbpFeatureManagement.Features"),
        offId: "tenant-feaures-off",
      });
    }
    if (IsSetPassword) {
      resultArray.push({
        id: "setPassword",
        displayName: t("Saas.SetPassword"),
        offId: "tenant-password-off",
      });
    }
    if (IsImpersonation) {
      resultArray.push({ id: "login", displayName: t("Login as Tenant") });
    }
    if (IsDelete) {
      resultArray.push({
        id: "delete",
        displayName: t("AbpUi.Delete"),
        modalId: "tenant-delete-off",
      });
    }

    if (!arraysAreEqual(actions, resultArray)) {
      setActions(resultArray);
    }
  }, [configData, pagePermission.create, t, actions]);

  const arraysAreEqual = (arr1: any, arr2: any) => {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
  };

  useEffect(() => {
    dispatch(
      getTenants1Request({
        skipCount: skipCount,
        maxResultCount: maxResultCount,
        filter: filter.filter,
        editionId: filter.editionId,
        expirationDateMin: filter.expirationDateMin,
        expirationDateMax: filter.expirationDateMax,
        activationState: filter.activationState,
        sorting: "id DESC",
      }) as any
    );
  }, [skipCount, maxResultCount, filter]);
  useEffect(() => {
    dispatch(getTenantsLookupEditionsRequest() as any);
  }, []);

  useEffect(() => {
    if (Data?.getTenants1?.items) {
      const tempData = Data.getTenants1.items.map((tenant: any) => {
        let status = "";
        let badgeColorVariant = "";
        if (tenant.activationState == "0") {
          status = "Active";
          badgeColorVariant = "success";
        } else if (tenant.activationState == "1") {
          status = "Active with limited time";
          badgeColorVariant = "success";
        } else {
          status = "Inactive";
          badgeColorVariant = "primary";
        }
        return {
          id: tenant.id,
          tenant: tenant.name,
          editionName: tenant.editionName,
          status: {
            badgeColorVariant: badgeColorVariant,
            content: status,
          },
          expiry: tenant.editionEndDateUtc,
        };
      });
      setTableData(tempData);
      setTotalRecords(Data?.getTenants1?.totalCount);
    }
  }, [Data.getTenants1]);

  useEffect(() => {
    handleFetchFeatureData(featureData.getFeatures?.groups);
  }, [featureData.getFeatures]);

  useEffect(() => {
    if (Data?.getTenantsLookupEditions)
      if (Data.getTenantsLookupEditions?.length) {
        const editionData1: any[] = [];
          Data.getTenantsLookupEditions.map((item: any) => {
          const newItem = {
            label: item.displayName,
            val: item.id,
          };
          editionData1.push(newItem);
        });
        setEditionList(editionData1);
      }
  }, [Data.getTenantsLookupEditions]);

  useEffect(() => {
    if (Data.getTenants) {
      handlerEditTenantInfoData();
    }
  }, [Data.getTenants]);

  useEffect(() => {
    if (Data.getTenantsConnectionStrings) {
      setConnectionStrings(Data.getTenantsConnectionStrings);
    }
  }, [Data?.getTenantsConnectionStrings]);

  useEffect(() => {
    // Set a 3-second timer to update the state
    const timer = setTimeout(() => {
      setAlert({ ...Alert, show: false });
    }, 3000);

    // Clean up the timer when the component unmounts or when the state changes
    return () => clearTimeout(timer);
  }, [Data.getTenants1]);

  //******************************************  Functions and handlers  ********************************************************** */

  const handlerEditTenantInfoData = () => {
    const editData = { ...Data.getTenants };
    setEditTenantInfoData(editData);
  };

  const handleFetchFeatureData = (data: any) => {
    if (data) {
      const sample = data.map((x: any) => {
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
  };

  const handleCreateNewTenant = (data: any) => {
    const { isModuleSpecificDb } = data;
    const specificDatabaseValue = isModuleSpecificDb;
    let createItem: any;
    if (specificDatabaseValue) {
      createItem = {
        data: {
          ...data,
          specificDatabase: specificDatabaseValue,
        },
      };
    } else {
      const sharedDatabaseValue = !isModuleSpecificDb;
      createItem = {
        data: {
          ...data,
          sharedDatabase: sharedDatabaseValue,
          specificDatabase: specificDatabaseValue,
        },
      };
    }
    dispatch(postTenantsRequest({ requestBody: createItem.data }) as any).then(
      (res: any) => {
        if (res.type == "tenant/postTenantsRequest/rejected") {
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
            message: t("Tenant Added Successfully"),
            color: "success",
          });
        }
        dispatch(
          getTenants1Request({
            sorting: "id DESC",
            skipCount: skipCount,
            maxResultCount: maxResultCount,
          }) as any
        );
      }
    );
  };

  const handlerUpdateTenat = (data: any) => {
    const updateitem = { id: data.id, requestBody: data };
    dispatch(putTenantsRequest(updateitem) as any).then((res: any) => {
      if (res.type == "tenant/putTenantsRequest/rejected") {
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
          message: t("Tenant edited Successfully"),
          color: "success",
        });
      }
      dispatch(
        getTenants1Request({
          sorting: "id DESC",
          skipCount: skipCount,
          maxResultCount: maxResultCount,
        }) as any
      );
    });
  };
  const handlerFeatureUpadate = () => {
    if (emittedFeaturesData.length > 0) {
      const features = {
        providerName: "T",
        providerKey: tenantId,
        requestBody: {
          features: emittedFeaturesData,
        },
      };
      dispatch(putFeaturesRequest(features));
    }
    handleFeatureCancel();
  };

  const handleDatabaseConnection = (data: any) => {
    const connectionData = { id: tenantId, requestBody: data };
    dispatch(putTenantsConnectionStringsRequest(connectionData) as any);
  };
  const handlerSetPassword = (data: any) => {
    const tempPasswordData = {
      id: tenantId,
      requestBody: { password: data, username: "admin" },
    };
    dispatch(putTenantsSetPasswordRequest(tempPasswordData) as any);
  };

  //paginationa handling
  const paginationHandler = (currentPage: number, recordsPP: number) => {
    const skipCount = recordsPP * (currentPage - 1);
    setSkipCount(skipCount);
    setMaxResultCount(recordsPP);
  };

  const handleActionSelection = (rowData: any, actionId: any) => {
    setInputReset(!inputReset);
    setEditTenantInfoData(editInitialData);
    const id = rowData.id;
    setTenantid(id);
    if (actionId == "connectionString") {
      dispatch(getTenantsConnectionStringsRequest({ id: id }));
      if (id == tenantId) {
        setConnectionStrings(Data.getTenantsConnectionStrings);
      }
    }
    if (actionId == "features") {
      dispatch(
        getFeaturesRequest({
          providerKey: rowData.id,
          providerName: "T",
        }) as any
      );
      if (id == tenantId) {
        handleFetchFeatureData(featureData.getFeatures?.groups);
      }
    }

    if (actionId == "editTenant") {
      dispatch(getTenantsRequest({ id: id }) as any);
      if (id == tenantId) {
        handlerEditTenantInfoData();
      }
    }
    if (actionId === "login") {
      userImpersonationService(
        "Impersonation",
        localStorage.getItem("REACT_APP_CLIENT_ID") || "",
        localStorage.getItem("REACT_APP_SCOPE") || "",
        "",
        id,
        rowData.name
      ).then(async (res: any) => {
        if (res.access_token) {
          localStorage.setItem("accessToken", res.access_token);
          localStorage.setItem("refreshToken", res.refresh_token);
          localStorage.setItem("expiresIn", res.expires_in);
          localStorage.setItem("loginAccessDate", Date());
          localStorage.setItem("auth", JSON.stringify(true));
          await userConfigurationService().then(async (res: any) => {
            localStorage.setItem("name", res.currentTenant.name);
            if (res.currentUser.impersonatorUserId != null) {
              localStorage.setItem("isImpersonation", "true");
              localStorage.setItem("UserId", res.currentUser.UserId);
              localStorage.setItem("userName", res.currentUser.userName);
            }
            localStorage.setItem("abpSession", res.currentTenant.name);
            return res;
          });
          window.location.href = "/dashboard";
        }
      });
    }
    if (actionId === "applyMigration") {
      dispatch(postTenantsApplyDatabaseMigrationsRequest({ id: id }) as any);
    }
  };

  const handleDeleteRecord = () => {
    dispatch(deleteTenantsRequest({ id: tenantId }) as any).then((res: any) => {
      if (res.type == "tenant/deleteTenantsRequest/rejected") {
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
          message: t("Tenant deleted Successfully"),
          color: "success",
        });
      }
      dispatch(
        getTenants1Request({
          sorting: "id DESC",
          skipCount: skipCount,
          maxResultCount: maxResultCount,
        }) as any
      );
      if (tableData.length === 1 && skipCount > 0) {
        setSkipCount(0);
      }
    });
  };

    function restoreFeatures() {
        dispatch(
            deleteFeaturesRequest({
                providerName: "T",
                providerKey: tenantId,
            }) as any
        ).then(() => {
                dispatch(
                    getFeaturesRequest({
                        providerName: "T",
                        providerKey: tenantId,
                    }) as any
                ).then((featuresResponse: any) => {
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

  function createNewCanvasFn(event: any) {
    event.preventDefault();
    setInputReset(!inputReset);
    setNewTenantInforData({
      editionId: null,
      name: "",
      activationEndDate: null,
      adminPassword: "",
      activationState: "0",
      adminEmailAddress: "",
      connectionStrings: { id: "", default: null, databases: [] },
      sharedDatabase: null,
      specificDatabase: null,
    });
  }
  
  const handleFeatureCancel = () => {
    setIsFeatureTabChange(!isFeatureTabChange);
  };
  const onHttpCodeFilter = useCallback((selectedCode: any) => {
    setFilter({ ...filter, editionId: selectedCode });
  }, []);

  const onActivationStateFilter = useCallback((selectedStatus: any) => {
    setFilter({...filter, activationState: selectedStatus});
  }, []);
 
  const clearFilter = useCallback(() => {
    // Increment the filter fields key to force a re-render and reset the filters
    setFilterKey((prevKey) => prevKey + 1);
    setFilter({
      filter: "",
      getEditionNames: "",
      editionId: "",
      expirationDateMin: "",
      expirationDateMax: "",
      activationState: "",
  });
  }, []);
  return (
    <>
      <div className="container-fluid m-0 p-0">
        <div className="row">
          <div className="col-md-12">
            <div className="card px-4 py-4 border-0 rounded-0 card-full-stretch">
              <div className="row">
                <div className="col-md-12">
                  <div className="row ">
                    <div className="col-xxl-7 col-xl-7 col-lg-7 col-md-12 col-12">
                      <div className="row align-items-center">
                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-12 mb-2">
                          <RdsSearch
                          key={filterKey}
                            value={filter?.filter}
                            onChange={(e: any) => {
                              setFilter({ ...filter, filter: e.target.value });
                            }}
                            placeholder={t("Search") || ""}
                            size="small"
                          />
                        </div>
                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-12 mb-3">
                          <RdsDropdownList
                            size="form-control-md"
                             key={filterKey}
                             id="Selectedition"
                             placeholder={t("Search Status Code") || ""}
                                                listItems={editionList}
                                                borderDropdown={true}
                                                isIconPlaceholder={false}
                                                isPlaceholder={true}
                                                onClick={(event, selectedCode) => onHttpCodeFilter(selectedCode)}/>
                        </div>
                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-12 mb-3">
                          <RdsDropdownList
                          size="form-control-md"
                             key={filterKey}
                             id="selectStatus"
                                                placeholder={t("Select Status") || ""}
                                                listItems={activationStateList}
                                                borderDropdown={true}
                                                isIconPlaceholder={false}
                                                isPlaceholder={true}
                                                onClick={(event, selectedStatus) => onActivationStateFilter(selectedStatus)}/>
                        </div>
                      </div>
                    </div>
                    <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-12 col-12">
                      <div className="align-items-center align-items-lg-center align-items-md-baseline d-flex gap-3 justify-content-end justify-content-lg-between justify-content-md-end">
                        <div className="mb-2">
                          <a
                            className="text-primary cursor-pointer"
                            onClick={clearFilter}
                          >
                            {t("Clear Filter") || ""}
                          </a>
                        </div>
                        <div className="mb-3">
                          {pagePermission.create && (
                            <RdsOffcanvas
                              canvasTitle={t("Saas.NewTenant")}
                              placement="end"
                              offcanvasbutton={
                                <div className="d-flex justify-content-end">
                                  <RdsButton
                                    icon="plus"
                                    label={t("Saas.NewTenant") || ""}
                                    iconColorVariant="light"
                                    iconHeight="12px"
                                    iconWidth="12px"
                                    iconFill={false}
                                    iconStroke={true}
                                    block={false}
                                    size="small"
                                    type="button"
                                    colorVariant="primary"
                                    showLoadingSpinner={true}
                                    onClick={(e: any) => createNewCanvasFn(e)}
                                  ></RdsButton>
                                </div>
                              }
                              backDrop={true}
                              scrolling={false}
                              preventEscapeKey={false}
                              offId={"tenant-new-off"}
                            >
                              <RdsCompTenantInformation
                                reset={inputReset}
                                editions={editionList}
                                onSaveHandler={handleCreateNewTenant}
                                tenantInfoData={newTenantInforData}
                              />
                            </RdsOffcanvas>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <RdsCompDatatable
                actionPosition="right"
                tableHeaders={tableHeaders}
                actions={actions}
                tableData={tableData!}
                onActionSelection={handleActionSelection}
                recordsPerPageSelectListOption={true}
                noDataheaderTitle={"No Records Available" || ""}
                noDataTitle={"Click on the button to add" || ""}
                illustration={true}
                pagination={true}
                totalRecords={totalRecords}
                recordsPerPage={maxResultCount}
                onPaginationHandler={paginationHandler}
              ></RdsCompDatatable>
              <div
                className={`offset-md-4 col-md-4 mt-3 col-12 ${
                  totalRecords == 10 ? "position-sticky" : "position-absolute"
                } position-lg-relative bottom-0 mb-3 custom-responsive-alert`}
              >
                {Alert.show && (
                  <RdsAlert
                    alertmessage={Alert.message}
                    size="small"
                    colorVariant={Alert.color}
                  ></RdsAlert>
                )}
              </div>

              {/*******************  Edit Offcanvas   ***********************/}
              <RdsOffcanvas
                canvasTitle={t("Edit Tenant")}
                placement="end"
                backDrop={true}
                scrolling={false}
                preventEscapeKey={false}
                offId={"tenant-edit-off"}
              >
                <RdsCompTenantInformation
                  reset={inputReset}
                  isEdit={true}
                  editions={editionList}
                  tenantInfoData={editTenantInfoData}
                  onSaveHandler={handlerUpdateTenat}
                />
              </RdsOffcanvas>

              {/*******************  Connection String Offcanvas   ***********************/}
              <RdsOffcanvas
                canvasTitle={t("Database Connection String")}
                placement="end"
                backDrop={true}
                scrolling={false}
                preventEscapeKey={false}
                offId={"tenant-connection-off"}
              >
                <div className="mt-3">
                  <RdsCompDatabaseConnection
                    connectionStrings={connectionStrings}
                    onSaveHandler={handleDatabaseConnection}
                    isModuleSpecificDb={false}
                  ></RdsCompDatabaseConnection>
                </div>
              </RdsOffcanvas>

              {/*******************  Features Offcanvas   ***********************/}
              <RdsOffcanvas
                canvasTitle={t("Feature")}
                placement="end"
                backDrop={true}
                scrolling={false}
                preventEscapeKey={false}
                offId={"tenant-feaures-off"}
                onClose={handleFeatureCancel}
              >
                <RdsCompFeatures
                  featuresData={featuresData}
                  isFeatureTabChange={isFeatureTabChange}
                  onFeatureSelection={(data: any) =>
                    setEmittedFeaturesData(data)
                  }
                  emittedDataFeatureData={(data: any) => {
                    setFeaturesData(data);
                  }}
                />
                <div className="d-flex pb-3 flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row footer-buttons d-flex gap-2">
                  <a
                    onClick={restoreFeatures}
                    className="me-2 btn btn-transparent position-relative align-items-center btn-sm text-primary"
                  >
                    {t("Restore To Default")}
                  </a>

                  <RdsButton
                    class="me-2"
                    tooltipTitle={""}
                    type={"button"}
                    label={t("AbpUi.Cancel") || ""}
                    colorVariant="outline-primary"
                    size="small"
                    onClick={handleFeatureCancel}
                    databsdismiss="offcanvas"
                  ></RdsButton>
                  <RdsButton
                    class="me-2"
                    label={t("AbpUi.Save") || ""}
                    showLoadingSpinner={true}
                    size="small"
                    colorVariant="primary"
                    tooltipTitle={""}
                    type={"submit"}
                    databsdismiss="offcanvas"
                    onClick={handlerFeatureUpadate}
                  ></RdsButton>
                </div>
              </RdsOffcanvas>

              {/*******************  Set PassWord Offcanvas   ***********************/}
              <RdsOffcanvas
                canvasTitle={t("Set Password")}
                placement="end"
                backDrop={true}
                scrolling={false}
                preventEscapeKey={false}
                offId={"tenant-password-off"}
              >
                <RdsCompSetPassword
                  reset={inputReset}
                  onSaveHandler={handlerSetPassword}
                ></RdsCompSetPassword>
              </RdsOffcanvas>
            </div>
            <RdsCompAlertPopup
              alertID="tenant-delete-off"
              onSuccess={handleDeleteRecord}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Tenant;
