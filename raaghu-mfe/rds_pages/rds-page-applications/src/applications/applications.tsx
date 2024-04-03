import React, { useEffect, useState } from "react";
import {
  RdsButton,
  RdsNavtabs,
  RdsOffcanvas,
  RdsAlert,
  RdsSearch,
} from "../../../rds-elements";
import {
  RdsCompAlertPopup,
  RdsCompDatatable,
  RdsCompApplicationBasic,
  RdsCompPermissionTree,
  RdsCompApplicationWorkflows,
  RdsCompApplicationScopes,
} from "../../../rds-components";
import { useTranslation } from "react-i18next";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../libs/state-management/hooks";
import {
  getApplications1Request,
  getApplicationsRequest,
  putApplicationsRequest,
  deleteApplicationsRequest,
  postApplicationsRequest,
} from "../../../../libs/state-management/applications/applications-slice";
import { getScopesAllRequest } from "../../../../libs/state-management/scopes/scopes-slice";
import {
  getPermissionsRequest,
  putPermissionsRequest,
} from "../../../../libs/state-management/permissions/permissions-slice";

const Applications = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const application = useAppSelector(
    (state) => state.persistedReducer.applications
  );
  const scopes = useAppSelector((state) => state.persistedReducer.scopes);
  const permission = useAppSelector(
    (state) => state.persistedReducer.permissions
  );

  //*******************useState Hooks ***********************//

  const [skipCount, setSkipCount] = useState<number>(0);
  const [maxResultCount, setMaxResultCount] = useState<number>(10);
  const [totalRecords, setTotalRecords] = useState<number | null>(0);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("");
  const [applicationId, setApplicationId] = useState("");
  const [permissionKeyName, setPermissionKeyName] = useState("");
  const [activeNavTabId, setActiveNavTabId] = useState("0");
  const [activeNavTabIdEdit, setActiveNavTabIdEdit] = useState("0");
  const [editApplicationData, setEditApplicationData] = useState<any>({});
  const [applicationData, setApplicationData] = useState<any>([]);
  const [scopesListData, setScopesListData] = useState<any>([]);
  const [permissionListData, setPermissionListData] = useState<any>([]);
  const [selectedPermissionListData, setSelectedPermissionListData] =
    useState<any>([]);

  const [basicApplicationData, setBasicApplicationData] = useState<any>({
    extraProperties: {},
    clientId: "",
    displayName: "",
    type: "",
    consentType: "",
    clientSecret: "",
    postLogoutRedirectUris: null,
    redirectUris: null,
    allowAuthorizationCodeFlow: false,
    allowClientCredentialsFlow: false,
    allowDeviceEndpoint: false,
    allowImplicitFlow: false,
    allowHybridFlow: false,
    allowPasswordFlow: false,
    allowLogoutEndpoint: false,
    allowRefreshTokenFlow: false,
    scopes: [],
    clientUri: "",
    logoUri: "",
  });

  const [alert, setAlert] = useState({
    showAlert: false,
    message: "",
    success: false,
  });
  const [alertOne, setAlertOne] = useState(false);
  const [inputReset, setInputReset] = useState(false);

  //*******************useEffect Hooks ***********************//

  useEffect(() => {
    dispatch(
      getApplications1Request({
        skipCount: skipCount,
        maxResultCount: maxResultCount,
        filter: searchTerm,
      }) as any
    );
    dispatch(getScopesAllRequest() as any);
  }, [dispatch, skipCount, maxResultCount, debouncedSearchTerm]);

  useEffect(() => {
    let tempData: any[] = [];
    if (application?.getApplications1?.items) {
      application.getApplications1.items.map((e: any) => {
        const item = {
          id: e.id,
          clientId: e.clientId,
          displayName: e.displayName,
          type: e.type,
        };
        tempData.push(item);
      });
      setApplicationData(tempData);
      setTotalRecords(application?.getApplications1?.totalCount);
    }
  }, [application?.getApplications1]);

  useEffect(() => {
    handleSetScopeListData();
  }, [scopes?.getScopesAll]);

  useEffect(() => {
    if (
      permission?.getPermissions &&
      permission.getPermissions.groups?.length > 0
    ) {
      setPermissionListData(permission.getPermissions.groups);
    }
  }, [permission?.getPermissions]);

  useEffect(() => {
    handleEditActionData();
  }, [application?.getApplications]);

  useEffect(() => {
    setAlert({
      showAlert: application?.alert,
      message: t(application?.alertMessage),
      success: application?.success,
    });
    setTimeout(() => {
      setAlert({
        showAlert: false,
        message: "",
        success: false,
      });
    }, 2000);
  }, [applicationData]);
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // Adjust the delay as needed (e.g., 500ms)

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [searchTerm]);

  //******************* Constant ***********************//

  const tableHeaders = [
    {
      displayName: t("AbpOpenIddict.ClientId"),
      key: "clientId",
      datatype: "text",
      dataLength: 30,
      required: true,
      sortable: true,
    },
    {
      displayName: t("AbpOpenIddict.DisplayName"),
      key: "displayName",
      datatype: "text",
      dataLength: 30,
      required: true,
      sortable: true,
    },
    {
      displayName: t("AbpOpenIddict.Type"),
      key: "type",
      datatype: "text",
      dataLength: 30,
      required: true,
      sortable: true,
    },
  ];

  const actions = [
    { id: "edit", displayName: t("AbpUi.Edit"), offId: "application-edit-off" },
    {
      id: "permissions",
      displayName: t("Permissions"),
      offId: "application-permissions-off",
    },
    {
      id: "chnageHistory",
      displayName: t("Change History"),
      offId: "application-changeHistory-off",
    },
    {
      id: "delete",
      displayName: t("AbpUi.Delete"),
      modalId: "application-delete-off",
    },
  ];
  const navtabsItems = [
    { label: t("Auth Flows"), tablink: "#nav-role", id: "0" },
    { label: t("AbpOpenIddict.Scopes"), tablink: "#nav-org", id: "1" },
  ];

  const navtabsEditItems = [
    { label: t("Client"), tablink: "#nav-home", id: "0" },
    { label: t("Auth Flows"), tablink: "#nav-role", id: "1" },
    { label: t("AbpOpenIddict.Scopes"), tablink: "#nav-org", id: "2" },
    { label: t("AbpOpenIddict.Permissions"), tablink: "#nav-profile", id: "3" },
  ];

  const typeList: any[] = [
    { option: "confidential", value: "confidential" },
    { option: "public", value: "public" },
  ];

  const consentType: any[] = [
    { option: "Explicit consent", value: "explicit" },
    { option: "External consent", value: "external" },
    { option: "Implicit consent", value: "implicit" },
    { option: "Systematic consent", value: "systematic" },
  ];

  const permissionTree = [
    {
      displayName: "[Test edition scope feature]",
      id: "testEditionScopeFeature",
      isSelected: false,
      isIntermediate: false,
      disabled: false,
      parent_id: "",
      children: [],
    },
    {
      displayName: "Chat",
      id: "chat",
      parent_id: "",
      isSelected: false,
      isIntermediate: false,
      disabled: false,
      children: [
        {
          displayName: "Chat with host",
          id: "chatwithhost",
          parent_id: "chat",
          isSelected: false,
          isIntermediate: false,
          disabled: false,
          children: [],
        },
        {
          displayName: "Chat with other tenants",
          id: "chatwithothertenats",
          parent_id: "chat",
          isSelected: false,
          isIntermediate: false,
          disabled: false,
          children: [],
        },
      ],
    },
    {
      displayName: "Maximum user count",
      id: "maximumUserCount",
      parent_id: "",
      isSelected: false,
      isIntermediate: false,
      disabled: false,
      children: [],
    },
    {
      displayName: "Test check feature",
      id: "testCheckFeature",
      parent_id: "",
      isSelected: false,
      isIntermediate: false,
      disabled: false,
      children: [],
    },
    {
      displayName: "Test check feature",
      id: "testCheckFeature",
      parent_id: "",
      isSelected: true,
      isIntermediate: false,
      disabled: false,
      children: [],
    },
  ];

  const changeHistoryTableHeader = [
    {
      displayName: "Property Name",
      key: "propertyName",
      datatype: "text",
      dataLength: 30,
      required: true,
      sortable: true,
      isBold: true,
      fontWeight: "medium",
    },
    {
      displayName: "Original Value",
      key: "originalValue",
      datatype: "text",
      dataLength: 30,
      required: true,
      sortable: true,
    },
    {
      displayName: "New Value",
      key: "newValue",
      datatype: "text",
      dataLength: 30,
      required: true,
    },
  ];

  const changeHistoryTableData = [
    {
      id: 1,
      propertyName: "Username",
      originalValue: "Payload",
      newValue: "admin",
    },
    {
      id: 2,
      propertyName: "Identity",
      originalValue: "Payload",
      newValue: "Identity",
    },
    {
      id: 3,
      propertyName: "ClientId",
      originalValue: "Payload",
      newValue: "null",
    },
    {
      id: 4,
      propertyName: "TenantId",
      originalValue: "Payload",
      newValue: "null",
    },
    {
      id: 5,
      propertyName: "Action",
      originalValue: "Payload",
      newValue: "LoginSucceeded",
    },
    {
      id: 6,
      propertyName: "ApplicationName",
      originalValue: "Payload",
      newValue: "abp_react_7_2_2.HttpApi.Host",
    },
    {
      id: 7,
      propertyName: "TenantName",
      originalValue: "Payload",
      newValue: "null",
    },
    {
      id: 8,
      propertyName: "UserId",
      originalValue: "Payload",
      newValue: "31d27b63-ae54-aebc-7a73",
    },
    {
      id: 9,
      propertyName: "ClientAddress",
      originalValue: "Payload",
      newValue: "::1",
    },
  ];

  // setting All scopes  from Redux store
  const handleSetScopeListData = () => {
    let tempScopes: any[] = [];
    if (scopes?.getScopesAll && scopes.getScopesAll.length > 0) {
      scopes.getScopesAll.map((scope: any) => {
        const item = {
          id: scope.id + scope.name,
          label: scope.name,
          checked: false,
        };
        tempScopes.push(item);
      });
      setScopesListData(tempScopes);
    }
  };

  //******************************************************* Action Selection Handler Start ****************************************************/
  const handleActionSelection = (rowData: any, actionId: any) => {
    const tempApplicationId = String(rowData.id);
    setApplicationId(tempApplicationId);
    setPermissionKeyName(rowData.clientId);
    if (actionId == "edit") {
      setActiveNavTabIdEdit("0");
      dispatch(
        getPermissionsRequest({
          providerKey: rowData.clientId,
          providerName: "C",
        }) as any
      );
      dispatch(getApplicationsRequest({ id: tempApplicationId }) as any);

      if (tempApplicationId == applicationId) {
        handleEditActionData();
      }
      if (
        permission.getPermissions &&
        permission.getPermissions?.groups?.length > 0 &&
        permission.getPermissions.groups == permissionListData
      ) {
        setPermissionListData(permission.getPermissions.groups);
      }
    }
  };
  //  ******************************************************* Action Selection Handler End******************************************/

  // Handle edit action data which is coming from backed
  const handleEditActionData = () => {
    if (application?.getApplications) {
      const tempData = { ...application?.getApplications };
      const updatedScopeList = scopesListData.map((item: any) => {
        if (tempData.scopes.includes(item.label)) {
          return { ...item, checked: true };
        } else {
          return { ...item, checked: false };
        }
      });
      setScopesListData(updatedScopeList);
      setEditApplicationData(tempData);
    }
  };

  function handleDeleteRecord(e: any) {
    dispatch(deleteApplicationsRequest({ id: applicationId }) as any).then(
      (res: any) => {
        dispatch(
          getApplications1Request({
            skipCount: skipCount,
            maxResultCount: maxResultCount,
          }) as any
        );
      }
    );
    e.preventDefault();
    setAlertOne(true);
  }

  function handleApplicationSubmit() {
    dispatch(postApplicationsRequest(basicApplicationData) as any).then(
      (res: any) => {
        dispatch(
          getApplications1Request({
            skipCount: skipCount,
            maxResultCount: maxResultCount,
          }) as any
        );
        setActiveNavTabId("0");
      }
    );
    setBasicApplicationData({
      extraProperties: {},
      clientId: "",
      displayName: "",
      type: "",
      consentType: "",
      clientSecret: "",
      postLogoutRedirectUris: null,
      redirectUris: null,
      allowAuthorizationCodeFlow: false,
      allowClientCredentialsFlow: false,
      allowDeviceEndpoint: false,
      allowImplicitFlow: false,
      allowHybridFlow: false,
      allowPasswordFlow: false,
      allowLogoutEndpoint: false,
      allowRefreshTokenFlow: false,
      scopes: [],
      clientUri: "",
      logoUri: "",
    });
    setAlertOne(true);
  }

  function handleSelectedPermissions(permissionsData: any) {
    setSelectedPermissionListData(permissionsData);
  }

  function handleSelectesPermission() {
    const permissions: any = {
      key: permissionKeyName,
      permissions: {
        permissions: selectedPermissionListData,
      },
    };
    dispatch(putPermissionsRequest(permissions) as any);
  }

  const handlerNewApplication = () => {
    handleResetOffcanvasData();
    setInputReset(!inputReset);
    setBasicApplicationData({
      extraProperties: {},
      clientId: "",
      displayName: "",
      type: "",
      consentType: "",
      clientSecret: "",
      postLogoutRedirectUris: null,
      redirectUris: null,
      allowAuthorizationCodeFlow: false,
      allowClientCredentialsFlow: false,
      allowDeviceEndpoint: false,
      allowImplicitFlow: false,
      allowHybridFlow: false,
      allowPasswordFlow: false,
      allowLogoutEndpoint: false,
      allowRefreshTokenFlow: false,
      scopes: [],
      clientUri: "",
      logoUri: "",
    });
  };

  const handleApplicationDataChanges = (data: any) => {
    setBasicApplicationData(data);
  };
  const handleApplicationEditDataChanges = (data: any) => {
    setEditApplicationData(data);
  };

  const handlereEditScope = (data: any) => {
    setScopesListData(data);
  };
  const handleSaveEditedData = () => {
    const editedScope = scopesListData
      .filter((item: any) => item.checked)
      .map((item: any) => item.label);
    const requestBody = { ...editApplicationData, scopes: editedScope };
    const data = {
      id: applicationId,
      body: requestBody,
    };
    dispatch(putApplicationsRequest(data) as any).then((res: any) => {
      dispatch(
        getApplications1Request({
          skipCount: skipCount,
          maxResultCount: maxResultCount,
        }) as any
      );
    });
    handleSelectesPermission();
    setAlertOne(true);
    setActiveNavTabIdEdit("0");
  };

  //paginationa handling
  const paginationHandler = (currentPage: number, recordsPP: number) => {
    const skipCount = recordsPP * (currentPage - 1);
    setSkipCount(skipCount);
    setMaxResultCount(recordsPP);
  };

  const onNewNavTabsOrder = (id: any) => {
    setActiveNavTabId(id);
  };

  const onEditNavTabsOrder = (id: any) => {
    setActiveNavTabIdEdit(id);
  };

  const handleResetOffcanvasData = () => {
    setActiveNavTabId("0");
    handleSetScopeListData();
  };

  const isClientIdValid = (id: any) => {
    if (!id || id.length === 0) {
      return false;
    }
    return true;
  };

  const isDisplayNameValid = (name: any) => {
    if (!name || name.length === 0) {
      return false;
    }
    return true;
  };

  const isValidUrl = (value: any) => {
    if (value !== "") {
      const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
      return urlPattern.test(value);
    } else return true;
  };
  const isValidText = (value: any) => {
    const stringValue = value !== null ? value.join("\n") : "";
    if (stringValue !== "") {
      const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
      return urlPattern.test(value);
    } else return true;
  };

  const isFormValid =
    isClientIdValid(basicApplicationData.clientId) &&
    isDisplayNameValid(basicApplicationData.displayName) &&
    basicApplicationData.type !== "" &&
    isValidUrl(basicApplicationData.clientUri) &&
    isValidUrl(basicApplicationData.logoUri) &&
    isValidText(basicApplicationData.redirectUris) &&
    isValidText(basicApplicationData.postLogoutRedirectUris);

  //handle edited permission
  const handleEditedPermissions = (editedArray: any) => {
    const firstArrayFromModified = editedArray.map((item: any) => ({
      name: item.name,
      displayName: item.displayName,
      displayNameKey: item.displayNameKey,
      displayNameResource: item.displayNameResource,
      permissions: item.permissions.map((permission: any) => ({
        name: permission.name,
        displayName: permission.displayName,
        parentName: permission.parentName,
        isGranted: permission.isGranted,
        allowedProviders: permission.allowedProviders,
        grantedProviders: permission.grantedProviders,
      })),
    }));
    setPermissionListData(firstArrayFromModified);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
  };
  return (
    <>
      <div className="container-fluid p-0 m-0">
        <div className="row">
          <div className="col-md-12">
            <div className="card px-4 py-4 border-0 rounded-0 card-full-stretch">
              <div className="row align-items-center">
                <div className="align-items-center col-md-3 mb-2 justify-content-end">
                  <div className="">
                    <RdsSearch
                      value={searchTerm}
                      label=""
                      labelPosition="top"
                      placeholder="Search"
                      size="small"
                      onChange={handleSearchChange}
                    />
                  </div>
                </div>
                <div className="align-items-center col-md-9 mb-3 d-flex justify-content-end">
                  <RdsButton
                    label={t("AbpOpenIddict.NewApplication") || ""}
                    showLoadingSpinner={true}
                    databstoggle="offcanvas"
                    databstarget="#applicationOffcanvas"
                    icon={"plus"}
                    iconColorVariant="light"
                    iconHeight="12px"
                    iconWidth="12px"
                    iconFill={false}
                    iconStroke={true}
                    block={false}
                    size="small"
                    type="button"
                    colorVariant="primary"
                    onClick={handlerNewApplication}
                    data-testid="new-application-button"
                  ></RdsButton>
                  <RdsOffcanvas
                    backDrop={true}
                    scrolling={true}
                    preventEscapeKey={false}
                    canvasTitle={t("AbpOpenIddict.NewApplication")}
                    offId="applicationOffcanvas"
                    placement={"end"}
                  >
                    <RdsCompApplicationBasic
                      reset={inputReset}
                      editApplicationData={handleApplicationDataChanges}
                      basicData={basicApplicationData}
                    ></RdsCompApplicationBasic>
                    <RdsNavtabs
                      navtabsItems={navtabsItems}
                      type={"tabs"}
                      activeNavTabId={activeNavTabId}
                      activeNavtabOrder={onNewNavTabsOrder}
                      justified={false}
                    >
                      {activeNavTabId == "0" && (
                        <>
                          <RdsCompApplicationWorkflows
                            typeList={typeList}
                            reset={inputReset}
                            consentType={consentType}
                            basicData={basicApplicationData}
                            editApplicationData={handleApplicationDataChanges}
                            handleSubmit={function (event: any): void {
                              throw new Error("Function not implemented.");
                            }}
                          ></RdsCompApplicationWorkflows>
                        </>
                      )}
                      {activeNavTabId == "1" && (
                        <>
                          <RdsCompApplicationScopes
                            editScopeList={handlereEditScope}
                            scopesList={scopesListData}
                          ></RdsCompApplicationScopes>
                        </>
                      )}
                    </RdsNavtabs>
                    <div className="footer-buttons bottom-0 d-flex flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row gap-2">
                      <RdsButton
                        class="me-2"
                        label={t("Cancel") || ""}
                        type="button"
                        databsdismiss="offcanvas"
                        isOutline={true}
                        size="small"
                        colorVariant="primary"
                        onClick={handleResetOffcanvasData}
                      ></RdsButton>
                      <RdsButton
                        class="me-2"
                        label={t("Save") || ""}
                        type="button"
                        size="small"
                        isDisabled={!isFormValid}
                        isOutline={false}
                        colorVariant="primary"
                        showLoadingSpinner={true}
                        databsdismiss="offcanvas"
                        onClick={handleApplicationSubmit}
                      ></RdsButton>
                    </div>
                  </RdsOffcanvas>

                  <RdsOffcanvas
                    canvasTitle={t("Edit Application")}
                    placement="end"
                    offId="application-edit-off"
                    backDrop={true}
                    scrolling={false}
                    preventEscapeKey={false}
                  >
                    <RdsNavtabs
                      navtabsItems={navtabsEditItems}
                      type={"tabs"}
                      activeNavTabId={activeNavTabIdEdit}
                      activeNavtabOrder={onEditNavTabsOrder}
                      justified={false}
                    >
                      {activeNavTabIdEdit == "0" && (
                        <RdsCompApplicationBasic
                          editApplicationData={handleApplicationEditDataChanges}
                          basicData={editApplicationData}
                        ></RdsCompApplicationBasic>
                      )}

                      {activeNavTabIdEdit == "1" && (
                        <>
                          <RdsCompApplicationWorkflows
                            typeList={typeList}
                            consentType={consentType}
                            basicData={editApplicationData}
                            editApplicationData={
                              handleApplicationEditDataChanges
                            }
                            handleSubmit={function (event: any): void {
                              throw new Error("Function not implemented.");
                            }}
                          ></RdsCompApplicationWorkflows>
                        </>
                      )}

                      {activeNavTabIdEdit == "2" && (
                        <>
                          <RdsCompApplicationScopes
                            scopesList={scopesListData}
                            editScopeList={handlereEditScope}
                          ></RdsCompApplicationScopes>
                        </>
                      )}

                      {activeNavTabIdEdit == "3" && (
                        <>
                          <RdsCompPermissionTree
                            editedPermissions={handleEditedPermissions}
                            permissions={permissionListData}
                            selectedPermissions={handleSelectedPermissions}
                          ></RdsCompPermissionTree>
                        </>
                      )}
                    </RdsNavtabs>

                    <div className="footer-buttons bottom-0 d-flex flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row gap-2">
                      <RdsButton
                        class="me-2"
                        label={t("AbpUi.Cancel") || ""}
                        type="button"
                        size="small"
                        databsdismiss="offcanvas"
                        colorVariant="outline-primary"
                      ></RdsButton>
                      <RdsButton
                        class="me-2"
                        label={t("AbpUi.Save") || ""}
                        type="button"
                        size="small"
                        isOutline={false}
                        colorVariant="primary"
                        onClick={handleSaveEditedData}
                        showLoadingSpinner={true}
                        databsdismiss="offcanvas"
                      ></RdsButton>
                    </div>
                  </RdsOffcanvas>

                  {/* Permissions Offcanvas */}
                  <RdsOffcanvas
                    canvasTitle={t("Permissions")}
                    placement="end"
                    offId="application-permissions-off"
                    backDrop={true}
                    scrolling={false}
                    preventEscapeKey={false}
                  >
                    <RdsCompPermissionTree
                      permissions={permissionTree}
                      selectedPermissions={(SelectesPermission: any) => {}}
                    ></RdsCompPermissionTree>
                  </RdsOffcanvas>
                  {/* End of Permissiond Offcanvas */}
                  {/* ChangeHistory Offcanvas */}
                  <RdsOffcanvas
                    canvasTitle={t("Change History")}
                    placement="end"
                    offId="application-changeHistory-off"
                    backDrop={true}
                    scrolling={false}
                    preventEscapeKey={false}
                  >
                    <RdsCompDatatable
                      tableHeaders={changeHistoryTableHeader}
                      tableData={changeHistoryTableData}
                      recordsPerPageSelectListOption={true}
                      noDataheaderTitle={t("No Records Available") || ""}
                      illustration={true}
                      pagination={true}
                      totalRecords={totalRecords}
                      recordsPerPage={maxResultCount}
                      onPaginationHandler={paginationHandler}
                      actionPosition="right"
                    ></RdsCompDatatable>
                  </RdsOffcanvas>
                  {/* End of ChangeHistory Offcanvas */}
                </div>
              </div>
              <RdsCompDatatable
                tableHeaders={tableHeaders}
                tableData={applicationData}
                actions={actions}
                recordsPerPageSelectListOption={true}
                onActionSelection={handleActionSelection}
                noDataheaderTitle={t("No Records Available") || ""}
                noDataTitle={t("Click on the button to add") || ""}
                illustration={true}
                pagination={true}
                totalRecords={totalRecords}
                recordsPerPage={maxResultCount}
                onPaginationHandler={paginationHandler}
                actionPosition="right"
              ></RdsCompDatatable>
              <div
                className={`offset-md-4 col-md-4 mt-3 col-12 ${
                  totalRecords == 10 ? "position-sticky" : "position-absolute"
                } position-lg-relative bottom-0 mb-3 custom-responsive-alert`}
              >
                {alert.showAlert && alertOne && (
                  <RdsAlert
                    alertmessage={alert.message}
                    size="small"
                    colorVariant={alert.success ? "success" : "danger"}
                  ></RdsAlert>
                )}
              </div>
              <RdsCompAlertPopup
                alertID="application-delete-off"
                onSuccess={handleDeleteRecord}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Applications;
