import React, { useState, useEffect } from "react";
import {
  RdsBadge,
  RdsInput,
  RdsButton,
  RdsOffcanvas,
  RdsAlert,
  RdsSearch,
} from "../../../../../raaghu-elements/src";

import {
  RdsCompDatatable,
  RdsCompPermissionTree,
  RdsCompAlertPopup,
  RdsCompClaims,
} from "../../../rds-components";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../libs/state-management/hooks";
import {
  fetchConfiguration,
  getPermissionsRequest,
  putPermissionsRequest,
  getRoles1Request,
  postRolesRequest,
  putRolesRequest,
  deleteRolesRequest,
  getRolesAllClaimTypesRequest,
  getRolesClaimsRequest,
  putRolesClaimsRequest,
} from "../../../../libs/state-management/public.api";
import { isgrantedpolicies } from "../../../../../raaghu-react-core/src/index";
import { useTranslation } from "react-i18next";

const Roles = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const Data = useAppSelector((state) => state?.persistedReducer?.role) as any;
  const PermissionData = useAppSelector((state) => state.persistedReducer?.permissions)
  const configData = useAppSelector((state) => state.persistedReducer?.configureStore?.configuration?.auth?.grantedPolicies || {});
  const currentLanguage = useAppSelector((state) => state.persistedReducer.host.currentLanguage)
  //**************  useState Hook  ***************************
  const [actions, setActions] = useState<any>([]);
  const [skipCount, setSkipCount] = useState<number>(0);
  const [maxResultCount, setMaxResultCount] = useState<number>(10);
  const [totalRecords, setTotalRecords] = useState<number | null>(0);
  const [roles, setRoles] = useState<any>([])
  const [permissionListData, setPermissionListData] = useState<any>([]);
  const [selectedPermissionListData, setSelectedPermissionListData] = useState<any>([]);
  const [Alert, setAlert] = useState({ show: false, message: "", color: "" });
  const [claimsTable, setClaimsTableData] = useState<any[]>([]);
  const [saveClaim, setSaveClaim] = useState<{ claimType: any; claimValue: any; roleId: any; id: any; }[]>([]);
  const [allClaimsArray, setAllClaimsArray] = useState<any[]>([]);
  const [inputReset, setInputReset] = useState(false)
  const [val, setVal] = useState("");
  const [id, setId] = useState(0);
  const [checked, setChecked] = useState({
    default: false, public: false,
  });
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');

  //**************** Constants ********************* */

  const tableHeader = [
    {
      displayName: t("AbpIdentity.RoleName"),
      key: "name",
      datatype: "children",
      sortable: true,
    },
  ];
  const [pagePermission, setPagePermission] = useState<any>({ create: false, });

  //****************  useEffect Hook **********************
  useEffect(() => {
    const createPermission = isgrantedpolicies(
      "AbpIdentity.Roles.Create",
      configData
    );

    // Check if the value actually changed before updating the state
    if (createPermission !== pagePermission.create) {
      setPagePermission((prevPagePermission: any) => ({
        ...prevPagePermission,
        create: createPermission,
      }));
    }

    const IsEdit = isgrantedpolicies('AbpIdentity.Roles.Update', configData);
    const IsChangePermissions = isgrantedpolicies("AbpIdentity.Roles.ManagePermissions", configData);
    let resultArray = [];

    if (IsEdit) {
      resultArray.push({ id: "edit", displayName: t("AbpUi.Edit"), offId: "role-edit-off" });
    }
    resultArray.push({ id: "claim", displayName: t("AbpIdentity.Claims"), offId: "role-claims-off" });
    if (IsChangePermissions) {
      resultArray.push({ id: "permissions", displayName: t("AbpPermissionManagement.Permissions"), offId: "role-permissions-off" });
    }
    if (!arraysAreEqual(actions, resultArray)) {
      setActions(resultArray);
    }
  }, [configData, pagePermission.create, t, actions]);

  const arraysAreEqual = (arr1: any, arr2: any) => {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
  };

  useEffect(() => {
    if (PermissionData?.getPermissions && PermissionData?.getPermissions?.groups?.length > 0) {
      setPermissionListData(PermissionData?.getPermissions?.groups);
    }
  }, [PermissionData.getPermissions]);

  useEffect(() => {
    dispatch(getRoles1Request({ skipCount: skipCount, maxResultCount: maxResultCount, filter: searchTerm }) as any);
  }, [dispatch, skipCount, maxResultCount, debouncedSearchTerm]);

  useEffect(() => {
    if (Data?.getRoles1?.items) {
      const tempData = Data?.getRoles1?.items?.map((item: any) => {
        const isDelete = isgrantedpolicies("AbpIdentity.Roles.Delete", configData);;
        if (item.isStatic == false && isDelete) {
          return {
            provideKey: item.name,
            isDefault: item.isDefault,
            isPublic: item.isPublic,
            id: item.id,
            concurrencyStamp: item.concurrencyStamp,
            extraProperties: item.extraProperties,
            name: (
              <>
                {" "}
                <div>
                  {item.name}

                  {item.isPublic && (
                    <RdsBadge
                      label="Public"
                      colorVariant="primary"
                      className="ms-3"
                    ></RdsBadge>
                  )}
                  {item.isDefault && (
                    <RdsBadge
                      label="Default"
                      colorVariant="success"
                      className="ms-2"
                    ></RdsBadge>
                  )}
                </div>
              </>
            ),
            rowActions: { id: "delete", displayName: t("AbpUi.Delete"), modalId: "role-delete-off" }
          }
        } else return {
          provideKey: item.name,
          isDefault: item.isDefault,
          isPublic: item.isPublic,
          id: item.id,
          concurrencyStamp: item.concurrencyStamp,
          extraProperties: item.extraProperties,
          name: (
            <>
              {" "}
              <div>
                {item.name}

                {item.isPublic && (
                  <RdsBadge
                    label="Public"
                    colorVariant="primary"
                    className="ms-3"
                  ></RdsBadge>
                )}
                {item.isDefault && (
                  <RdsBadge
                    label="Default"
                    colorVariant="success"
                    className="ms-2"
                  ></RdsBadge>
                )}
              </div>
            </>
          ),
        }

      });
      setRoles(tempData);
      setTotalRecords(Data?.getRoles1?.totalCount);
    }
  }, [Data.getRoles1]);

  useEffect(() => {
    // Set a 3-second timer to update the state
    const timer = setTimeout(() => {
      setAlert({ ...Alert, show: false });
    }, 3000);

    // Clean up the timer when the component unmounts or when the state changes
    return () => clearTimeout(timer);
  }, [Data.getRoles1]);
  useEffect(() => {
    dispatch(getRoles1Request({ skipCount: skipCount, maxResultCount: maxResultCount }) as any);
    dispatch(getRolesAllClaimTypesRequest() as any);

  }, [dispatch, skipCount, maxResultCount]);
  useEffect(() => {
    if (Data.getRolesAllClaimTypes && Array.isArray(Data.getUsersAllClaimTypes)) {
      const tempAllClaimsArray: any[] = [];
      Data.getRolesAllClaimTypes?.map((res: any) => {
        const item = {
          id: res.id,
          option: res.name,
          value: res.id,
          valueTypeAsString: res.valueTypeAsString
        };
        tempAllClaimsArray.push(item);
      });
      setAllClaimsArray(tempAllClaimsArray);
    }
  }, [Data.getRolesAllClaimTypes]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // Adjust the delay as needed (e.g., 500ms)

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [searchTerm]);

  //**************************  Event handlers    ******************************** */

  const handlerAddRole = () => {

    const dto = {
      isDefault: checked.default,
      isPublic: checked.public,
      name: val,
    };
    dispatch(postRolesRequest({ requestBody: dto }) as any).then((res: any) => {
      if (res.type == "role/postRolesRequest/fulfilled") {

        setAlert({
          ...Alert,
          show: true,
          message: t("Role added Successfully"),
          color: "success",
        });
      } else if (res.type == "role/postRolesRequest/rejected") {
        setAlert({
          ...Alert,
          show: true,
          message: t("Role already exists"),
          color: "danger",
        });
      }
      dispatch(getRoles1Request({ skipCount: skipCount, maxResultCount: maxResultCount }) as any);
    });
  };

  const handlerActions = (rowData: any, actionId: any) => {
    setId(rowData.id);
    setVal(rowData.provideKey);
    if (actionId === "edit") {
      setChecked({
        ...checked,
        default: rowData.isDefault,
        public: rowData.isPublic,
      });
    }
    if (actionId === "permissions") {

      dispatch(getPermissionsRequest({ providerName: "R", providerKey: rowData.provideKey }) as any).then((res: any) => {
        if (res.type === "permissions/getPermissionsRequest/fulfilled") {
          if (Data.roles?.permission && (Data.roles.permission?.groups?.length > 0) && (Data.roles?.permission?.groups == permissionListData)) {
            setPermissionListData(Data.permission.groups);
          }
        }
      });
    }
    if (actionId === "claim") {
      dispatch(getRolesAllClaimTypesRequest() as any);
      dispatch(getRolesClaimsRequest({ id: rowData.id }) as any).then((res: any) => {

        if (res.type == "role/getRolesClaimsRequest/fulfilled") {

          setClaimsTableData(res.payload);
        }

      });
    }
  };

  const handlerEditRole = () => {
    const dto = {
      name: val,
      isDefault: checked.default,
      isPublic: checked.public,
      concurrencyStamp: undefined,
      extraProperties: {},
    };
    dispatch(putRolesRequest({ id: id, requestBody: dto }) as any).then((res: any) => {
      if (res.type == "role/putRolesRequest/rejected") {
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
          message: t("Role edited Successfully"),
          color: "success",
        });
      }
      dispatch(getRoles1Request({ skipCount: skipCount, maxResultCount: maxResultCount }) as any);
    });
  };

  const handlerPermission = () => {
    const permissions: any = {
      providerKey: val,
      requestBody: {
        permissions: selectedPermissionListData,
      },
    };
    dispatch(putPermissionsRequest({ providerName: "R", providerKey: permissions.providerKey, requestBody: permissions.requestBody }) as any).then((res: any) => {

      if (res.type == "permissions/putPermissionsRequest/fulfilled") {
        // dispatch(fetchConfiguration(currentLanguage) as any)
      }

    });
  };

  const handlerClaim = () => {
    dispatch(putRolesClaimsRequest({ id: id, requestBody: saveClaim }) as any)
  };

  const handlerNewRole = () => {
    setVal("");
    setInputReset(!inputReset)
    setChecked({ ...checked, default: false, public: false });
  };

  const claimDataHandler = (claimdata: any) => {
    const { claimType, claimValue, roleId, id } = claimdata;
    const updatedSaveClaim = [
      ...saveClaim,
      {
        claimType,
        claimValue,
        roleId,
        id
      }
    ];
    setSaveClaim(updatedSaveClaim);
  }

  const handlerDeleteConfirm = () => {
    dispatch(deleteRolesRequest({ id: id }) as any).then((res: any) => {
      if (res.type == "role/deleteRolesRequest/rejected") {
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
          message: t("Role deleted Successfully"),
          color: "success",
        });
      }
      dispatch(getRoles1Request({ skipCount: skipCount, maxResultCount: maxResultCount }) as any);
      if (Data.length === 1 && skipCount > 0) {
        setSkipCount(0)
      }
    });
  };

  function emitData(allData: any) {
    const data: any = [];
    for (let i = 0; i < allData?.length; i++) {
      allData[i].permissions?.forEach((ele: any) => data.push(ele));
    }
    return data;
  }
  //handle edited permission 
  const handleEditedPermissions = (editedArray: any) => {
    const firstArrayFromModified = editedArray?.map((item: any) => ({
      name: item.name,
      displayName: item.displayName,
      displayNameKey: item.displayNameKey,
      displayNameResource: item.displayNameResource,
      permissions: item?.permissions?.map((permission: any) => ({
        name: permission.name,
        displayName: permission.displayName,
        parentName: permission.parentName,
        isGranted: permission.isGranted,
        allowedProviders: permission.allowedProviders,
        grantedProviders: permission.grantedProviders,
      })),
    }));
    const emittedData = emitData(firstArrayFromModified)
    const spliceMainParentUndefined = emittedData?.filter(
      (x: any) => x.parentName !== undefined
    );
    const initailStateData = emitData(permissionListData);

    for (let mainIndex = 0; mainIndex < initailStateData?.length; mainIndex++) {
      for (
        let resultIndex = 0;
        resultIndex < spliceMainParentUndefined?.length;
        resultIndex++
      ) {
        const valueFromResult = spliceMainParentUndefined[resultIndex];
        const valueFromMain = initailStateData[mainIndex];
        if (
          valueFromMain !== undefined &&
          valueFromMain.name === valueFromResult.name &&
          valueFromMain.isGranted === valueFromResult.isGranted
        ) {
          const startIndex = spliceMainParentUndefined.findIndex(
            (x: any) => x.name === valueFromMain.name
          );
          spliceMainParentUndefined.splice(startIndex, 1);
        }
      }
    }
    const data = spliceMainParentUndefined?.map((x: any) => ({
      name: x.name,
      isGranted: x.isGranted,
    }));
    setSelectedPermissionListData(data);
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
  return (
    <>
      <div className="container-fluid p-0 m-0 h-100">
        <div className="row">
          <div className="col-md-12">
            <div className="card px-4 py-4 border-0 rounded-0 card-full-stretch">
              <div className="row">
                <div className="col-12 col-lg-4 col-md-6 col-xl-3 col-xxl-3 mb-2">
                  <RdsSearch
                    placeholder={t("Search") || ""}
                    size="small"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
                <div className="col-12 col-lg-8 col-md-6 col-xl-9 col-xxl-9 d-flex justify-content-end mb-3">

                  {pagePermission.create && <RdsButton
                    icon="plus"
                    label={t("AbpIdentity.NewRole") || ""}
                    iconColorVariant="light"
                    iconHeight="12px"
                    iconWidth="12px"
                    iconFill={false}
                    iconStroke={true}
                    block={false}
                    size="small"
                    type="button"
                    colorVariant="primary"
                    databstoggle="offcanvas"
                    databstarget="#newRole"
                    showLoadingSpinner={true}
                    onClick={handlerNewRole}
                  ></RdsButton>}
                </div>
              </div>
              <RdsCompDatatable
                actionPosition="right"
                classes="table__userTable"
                tableHeaders={tableHeader}
                tableData={roles}
                noDataheaderTitle={t("No Records Available") || ""}
                noDataTitle={t("Click on the button to add") || ""}
                illustration={true}
                actions={actions}
                onActionSelection={handlerActions}
                recordsPerPageSelectListOption={true}
                pagination={true}
                totalRecords={totalRecords}
                recordsPerPage={maxResultCount}
                onPaginationHandler={paginationHandler}
              ></RdsCompDatatable>

            </div>
          </div>
          <div className={`offset-md-4 col-md-4 mt-3 col-12 ${totalRecords == 10 ? 'position-sticky' : 'position-absolute'} position-lg-relative bottom-0 mb-3 custom-responsive-alert`}>
            {Alert.show && (
              <RdsAlert
                alertmessage={Alert.message}
                size="small"
                colorVariant={Alert.color}
              ></RdsAlert>
            )}
          </div>
          <div className="col-md-4"></div>
          <RdsOffcanvas
            placement="end"
            canvasTitle={t("AbpIdentity.NewRole")}

            offId="newRole"
            backDrop={true}
            scrolling={false}
            preventEscapeKey={false}
            onClose={handlerNewRole}
          >
            <div className="mt-2">
              <div>
                <div className="mb-2">
                  <RdsInput

                    reset={inputReset}
                    inputType="text"
                    label={t("AbpIdentity.NewRole") || ""}
                    labelPosition="top"
                    placeholder={t("Enter Role Name") || ""}
                    required={true}
                    value={val}
                    size="medium"
                    onChange={(e: any) => setVal(e.target.value)}
                  ></RdsInput>
                </div>
                <div className="me-2">
                  <div className="form-check d-flex">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      checked={checked.default}
                      onChange={(e: any) => {
                        setChecked({ ...checked, default: !checked.default });
                      }}
                      id="flexCheckDefaultrole"
                    />
                    <label
                      className="form-check-label me-5 ms-2"
                      htmlFor="flexCheckDefaultrole"
                    >
                      {t("Default Role")}
                    </label>
                  </div>
                  <div className="mt-3 form-check d-flex">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefaultpublic"
                      checked={checked.public}
                      onChange={(e: any) => {
                        setChecked({ ...checked, public: !checked.public });
                      }}
                    />
                    <label
                      className="form-check-label me-5 ms-2"
                      htmlFor="flexCheckDefaultpublic"
                    >
                      {t("Available For Public")}
                    </label>
                  </div>
                </div>
              </div>

              <div className="pb-3 d-flex flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row gap-2 footer-buttons">
                <RdsButton
                  label={t("AbpUi.Cancel") || ""}
                  type="button"
                  colorVariant="primary"
                  size="small"
                  databsdismiss="offcanvas"
                  isOutline={true}
                  onClick={handlerNewRole}
                ></RdsButton>
                <RdsButton
                  label={t("AbpUi.Save") || ""}
                  type="button"
                  size="small"
                  // isDisabled={formValid}
                  class="ms-2"
                  colorVariant="primary"
                  databsdismiss="offcanvas"
                  databstoggle="offcanvas"
                  databstarget="#newRole"
                  onClick={handlerAddRole}
                ></RdsButton>
              </div>
            </div>
          </RdsOffcanvas>

          {/* ****************** Edit offcanvas ********************* */}

          <RdsOffcanvas
            placement="end"
            canvasTitle={t("Edit Role")}
            offId="role-edit-off"
            backDrop={true}
            scrolling={false}
            preventEscapeKey={false}
          >
            <div className="pt-2 overflow-x-hidden overflow-y-scroll offcanvas-custom-scroll">
              <div className="pt-2">
                <div className="mb-2">
                  <RdsInput
                    inputType="text"
                    label={t("AbpIdentity.RoleName") || ""}
                    labelPosition="top"
                    placeholder={t("Enter Role") || ""}
                    required={true}
                    value={val}
                    size="medium"
                    onChange={(e: any) => setVal(e.target.value)}
                  ></RdsInput>
                </div>
                <div className="me-2">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      checked={checked.default}
                      onChange={(e: any) => {
                        setChecked({ ...checked, default: !checked.default });
                      }}
                      id="flexCheckDefaultrole"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefaultrole"
                    >
                      {t("Default Role")}
                    </label>
                  </div>
                  <div className="mt-3 form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefaultpublic"
                      checked={checked.public}
                      onChange={(e: any) => {
                        setChecked({ ...checked, public: !checked.public });
                      }}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefaultpublic"
                    >
                      {t("Available For Public")}
                    </label>
                  </div>
                </div>
              </div>
              <div className="pb-3 d-flex flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row gap-2 footer-buttons">
                <RdsButton
                  type={"button"}
                  label={t("AbpUi.Cancel") || ""}
                  size="small"
                  isOutline={true}
                  colorVariant="primary"
                  databsdismiss="offcanvas"
                  databstoggle="offcanvas"
                  databstarget="#role-edit-off"
                ></RdsButton>
                <RdsButton
                  type={"button"}
                  label={t("AbpUi.Save") || ""}
                  size="small"
                  isDisabled={val === ""}
                  colorVariant="primary"
                  onClick={handlerEditRole}
                  databsdismiss="offcanvas"
                  databstoggle="offcanvas"
                  databstarget="#role-edit-off"
                  class="ms-2"
                ></RdsButton>
              </div>
            </div>
          </RdsOffcanvas>
          {/* ****************** Permission offcanvas ********************* */}

          <RdsOffcanvas
            placement="end"
            canvasTitle={t("Permission")}
            offId="role-permissions-off"
            backDrop={true}
            scrolling={false}
            preventEscapeKey={false}
          >
            <div className="pt-2 overflow-x-hidden overflow-y-scroll offcanvas-custom-scroll">
              <RdsCompPermissionTree
                editedPermissions={handleEditedPermissions}
                permissions={permissionListData}
              ></RdsCompPermissionTree>

              <div className="pb-3 d-flex flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row gap-2 footer-buttons">
                <RdsButton
                  type={"button"}
                  label={t("AbpUi.Cancel") || ""}
                  size="small"
                  isOutline={true}
                  colorVariant="primary"
                  databsdismiss="offcanvas"
                  databstoggle="offcanvas"
                  databstarget="#role-permissions-off"
                ></RdsButton>
                <RdsButton
                  type={"button"}
                  label={t("AbpUi.Save") || ""}
                  size="small"
                  colorVariant="primary"
                  onClick={handlerPermission}
                  databsdismiss="offcanvas"
                  databstoggle="offcanvas"
                  databstarget="#role-permissions-off"
                  class="ms-2"
                ></RdsButton>
              </div>
            </div>
          </RdsOffcanvas>

          {/* ****************** Claim offcanvas ********************* */}

          <RdsOffcanvas
            placement="end"
            canvasTitle={t("Claims")}
            offId="role-claims-off"
            backDrop={true}
            scrolling={false}
            preventEscapeKey={false}
          >
            <div className="pt-2 overflow-x-hidden overflow-y-scroll offcanvas-custom-scroll">
              <div className="pt-2">
                <RdsCompClaims allClaimsArray={allClaimsArray} claimsTable={claimsTable} id={id} getEditClaimData={claimDataHandler} ></RdsCompClaims>
              </div>
              <div className="pb-3 d-flex flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row gap-2 footer-buttons">
                <RdsButton
                  type={"button"}
                  label={t("AbpUi.Cancel") || ""}
                  size="small"
                  isOutline={true}
                  colorVariant="primary"
                  databsdismiss="offcanvas"
                  databstoggle="offcanvas"
                  databstarget="#role-claims-off"
                ></RdsButton>
                <RdsButton
                  type={"button"}
                  label={t("AbpUi.Save") || ""}
                  size="small"
                  colorVariant="primary"
                  onClick={handlerClaim}
                  databsdismiss="offcanvas"
                  databstoggle="offcanvas"
                  databstarget="#role-claims-off"
                  class="ms-2"
                ></RdsButton>
              </div>
            </div>
          </RdsOffcanvas>

          {/* ****************** Delete Alert popup ********************* */}
          <RdsCompAlertPopup
            alertID="role-delete-off"
            onSuccess={handlerDeleteConfirm}
          ></RdsCompAlertPopup>
        </div>
      </div>
    </>
  );
};

export default Roles;