import React, { useState, useEffect } from "react";
import {
  RdsAlert,
  RdsButton,
  RdsOffcanvas,
  RdsInput,
  RdsNavtabs,
  RdsIcon,
} from "../../../rds-elements";
import {
  RdsCompOrganizationTree,
  RdsCompDatatable,
  RdsCompAlertPopup,
} from "../../../rds-components";
import { createTree } from "../../../../libs/shared/array-to-tree-converter";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../libs/state-management/hooks";
import {
  fetchOrganizationTrees,
  deleteOrganizationUnit,
  editOrganizationUnit,
  addOrganizationUnit,
  fetchMemberOrganizationTrees,
  deleteMemberOrganizationUnit,
  editMemberOrganizationUnit,
  fetchRolesOrganizationTrees,
  deleteRolesOrganizationUnit,
  editRolesOrganizationUnit,
  GetOrganizationUnitsAvailableRoles,
  GetOrganizationUnitsAvailableUsers,
} from "../../../../libs/state-management/organization-tree/organization-tree-slice";
import { useTranslation } from "react-i18next";
import { isgrantedpolicies } from "../../../../../raaghu-react-core/src/index";
export interface OrganizationTreeProps {
  onActionSelection?(arg: any): void;
}
const OrganizationTree = (props: OrganizationTreeProps) => {
  const { t } = useTranslation();
  const configData = useAppSelector(
    (state) =>
      state.persistedReducer?.configureStore?.configuration?.auth
        ?.grantedPolicies || {}
  );
  const [pagePermission, setPagePermission] = useState<any>({
    organization: true,
  });
  const [navtabsItems, setNavtabsItems] = useState<any>([]);

  useEffect(() => {
    const createPermission = isgrantedpolicies(
      "AbpIdentity.OrganizationUnits.ManageOU",
      configData
    );
    // Check if the value actually changed before updating the state
    if (createPermission !== pagePermission.organization) {
      setPagePermission((prevPagePermission: any) => ({
        ...prevPagePermission,
        organization: createPermission,
      }));
    }

    const isMember = isgrantedpolicies(
      "AbpIdentity.OrganizationUnits.ManageMembers",
      configData
    );
    const isRole = isgrantedpolicies(
      "AbpIdentity.OrganizationUnits.ManageRoles",
      configData
    );
    let resultArray = [];

    if (isMember) {
      resultArray.push({
        label: t("AbpIdentity.Members"),
        tablink: "#Members",
        ariacontrols: "Members",
        id: "member",
      });
    }
    if (isRole) {
      resultArray.push({
        label: t("AbpIdentity.Roles"),
        tablink: "#Roles",
        ariacontrols: "Roles",
        id: "role",
      });
    }
    if (!arraysAreEqual(navtabsItems, resultArray)) {
      setNavtabsItems(resultArray);
    }
  }, [configData, pagePermission.organization, t, navtabsItems]);

  const arraysAreEqual = (arr1: any, arr2: any) => {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
  };

  const iconForIllustration = sessionStorage.getItem("theme") || " light";
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState("member");
  const [treeData, setTreeData] = useState<any>([]);
  const [user, setUser] = useState<any>({
    members: [],
    roles: [],
    usersListSelected: [],
    rolesListSelected: [],
    availableRoles: [],
    availableUsers: [],
  });
  const [oData, setOData] = useState([]);
  const [inputReset, setInputReset] = useState(false);
  const [Alert, setAlert] = useState({ show: false, message: "", color: "" });

  const [id, setId] = useState({
    id: null,
    memberId: null,
    roleId: null,
  });
  const [val, setVal] = useState("");
  const [selectedNode, setSelectedNode] = useState("");
  const data = useAppSelector((state) => state.persistedReducer.organization);

  useEffect(() => {
    dispatch(fetchOrganizationTrees() as any);
  }, [dispatch]);
  useEffect(() => {
    setTreeData(data?.organizationUnitTree);
  }, [data?.organizationUnitTree]);
  useEffect(() => {
    setUser({ ...user, members: data?.members });
  }, [data?.members]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setAlert({ ...Alert, show: false });
    }, 3000);
    return () => clearTimeout(timer);
  }, [data?.members]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlert({ ...Alert, show: false });
    }, 3000);
    return () => clearTimeout(timer);
  }, [data?.organizationUnitTree]);

  useEffect(() => {
    const tempUserList = data?.availableUsers?.map((curElem: any) => {
      return {
        id: curElem.id,
        userName: curElem.userName,
        email: curElem.email,
        selected: false,
        disabled: false,
      };
    });

    setUser({ ...user, availableUsers: tempUserList });
  }, [data?.availableUsers]);
  useEffect(() => {
    const tempRolesList = data?.availableRoles?.map((curElem: any) => {
      return {
        id: curElem.id,
        name: curElem.name,
        selected: false,
        disabled: false,
      };
    });
    setUser({ ...user, availableRoles: tempRolesList });
  }, [data?.availableRoles]);

  useEffect(() => {
    setUser({ ...user, roles: data?.roles });
  }, [data?.roles]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setAlert({ ...Alert, show: false });
    }, 3000);
    return () => clearTimeout(timer);
  }, [data?.roles]);
  const actions: any = [
    { id: "delete", displayName: t("AbpUi.Delete"), modalId: "orgMemRole" },
  ];
  const nodeColor = ["#6E4D9F", "#0D79AE", "#14A94B", "#FBA919"];

  const tableHeadersMembers = [
    {
      displayName: t("AbpIdentity.UserName"),
      key: "userName",
      datatype: "text",
      sortable: true,
    },
    {
      displayName: t("Email"),
      key: "email",
      datatype: "text",
      sortable: true,
    },
  ];
  const tableHeadersRoles = [
    {
      displayName: t("AbpIdentity.RoleName"),
      key: "name",
      datatype: "text",
      sortable: true,
    },
  ];
  const handlerDeleteNode = (id: any) => {
    setId({ ...id, id: id });
  };
  const handlerAddNestedNode = () => {
    dispatch(
      addOrganizationUnit({
        displayName: val,
        parentId: id.id,
      }) as any
    ).then((res: any) => {
      if (res.type == "OrganizationTree/addOrganizationUnit/rejected") {
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
          message: t("Unit added Successfully"),
          color: "success",
        });
      }
      dispatch(fetchOrganizationTrees() as any);
    });
    setVal("");
    setInputReset(!inputReset);
  };
  const handlerCreateSubUnit = (data: any) => {
    setId({ ...id, id: data.id });
  };
  const handlerAddSubUnitNode = () => {
    dispatch(
      addOrganizationUnit({
        displayName: val,
        parentId: id.id,
      }) as any
    ).then(() => {
      dispatch(fetchOrganizationTrees() as any);
    });
    handlerCloseOffcanvas();
  };
  const handlerNodeEdit = (data: any) => {
    setVal(data.displayName);
    setId({ ...id, id: data.id });
    setInputReset(!inputReset);
  };
  const handlerEdit = () => {
    const dto = { displayName: val };
    dispatch(editOrganizationUnit({ id: id.id, dTo: dto }) as any).then(
      (res: any) => {
        if (res.type == "OrganizationTree/editOrganizationUnit/rejected") {
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
            message: t("Unit edited Successfully"),
            color: "success",
          });
        }
        dispatch(fetchOrganizationTrees() as any);
      }
    );
    setVal("");
    setInputReset(!inputReset);
  };
  const handlerAddRootNode = () => {
    dispatch(
      addOrganizationUnit({
        displayName: val,
        parentId: null,
      }) as any
    ).then((res: any) => {
      if (res.type == "OrganizationTree/addOrganizationUnit/rejected") {
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
          message: t("Root Unit added Successfully"),
          color: "success",
        });
      }
      dispatch(fetchOrganizationTrees() as any);
    });
    setVal("");
    setInputReset(!inputReset);
  };
  const handlerCreateRootNode = () => {
    handlerCloseOffcanvas();
  };
  const handlerSelectNode = (item: any) => {
    setId({ ...id, id: item?.data?.id });
    setSelectedNode(item?.data?.displayName);
    dispatch(fetchMemberOrganizationTrees(item?.data?.id) as any);
    dispatch(fetchRolesOrganizationTrees(item?.data?.id) as any);
  };
  const handlerUserPush = () => {
    dispatch(
      editMemberOrganizationUnit({
        id: id.id,
        dTo: { userIds: user.usersListSelected },
      }) as any
    ).then((res: any) => {
      if (res.type == "OrganizationTree/editMemberOrganizationUnit/rejected") {
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
          message: t("Member added Successfully"),
          color: "success",
        });
      }
      dispatch(fetchMemberOrganizationTrees(id.id) as any);
    });
  };
  const handlerRolePush = () => {
    dispatch(
      editRolesOrganizationUnit({
        id: id.id,
        dTo: { roleIds: user.rolesListSelected },
      }) as any
    ).then((res: any) => {
      if (res.type == "OrganizationTree/editRolesOrganizationUnit/rejected") {
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
          message: t("Roles added Successfully"),
          color: "success",
        });
      }
      dispatch(fetchRolesOrganizationTrees(id.id) as any);
    });
  };
  const activeNavtabOrder = (id: any) => {
    setActiveTab(id);
  };
  const handlerMemberActions = (rowData: any, actionId: any) => {
    setId({ ...id, memberId: rowData.id });
  };
  const handlerDeleteConfirmUserRoles = () => {
    if (activeTab === "member") {
      dispatch(
        deleteMemberOrganizationUnit({
          id: id.id,
          memberId: id?.memberId,
        }) as any
      ).then((res: any) => {
        if (
          res.type == "OrganizationTree/deleteMemberOrganizationUnit/rejected"
        ) {
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
            message: t("Member deleted Successfully"),
            color: "success",
          });
        }
        dispatch(fetchMemberOrganizationTrees(id.id) as any);
      });
    } else {
      dispatch(
        deleteRolesOrganizationUnit({ id: id.id, roleId: id?.roleId }) as any
      ).then((res: any) => {
        if (
          res.type == "OrganizationTree/deleteMemberOrganizationUnit/rejected"
        ) {
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
        dispatch(fetchRolesOrganizationTrees(id.id) as any);
      });
    }
  };
  const handlerRoleActions = (rowData: any, actionId: any) => {
    setId({ ...id, roleId: rowData.id });
  };

  const handlerDeleteConfirm = () => {
    dispatch(deleteOrganizationUnit(id.id) as any).then((res: any) => {
      if (res.type == "OrganizationTree/deleteOrganizationUnit/rejected") {
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
          message: t("Unit deleted Successfully"),
          color: "success",
        });
      }
      dispatch(fetchOrganizationTrees() as any);
    });
  };
  const updateOrganizationTree = () => {
    if (treeData) {
      const data = createTree(
        treeData?.items,
        "parentId",
        "id",
        null,
        "children",
        [
          {
            target: "label",
            source: "displayName",
          },
          {
            target: "expandedIcon",
            value: "fa fa-folder-open text-warning",
          },
          {
            target: "collapsedIcon",
            value: "fa fa-folder text-warning",
          },
          {
            target: "expanded",
            value: true,
          },
        ],
        1
      );
      setOData(data);
    } else {
    }
  };

  const handlerUserSelect = (data: any) => {
    const User = data?.reduce((acc: any, curElem: any) => {
      if (curElem.selected) {
        acc.push(curElem.id);
      }
      return acc;
    }, []);
    setUser({ ...user, usersListSelected: User });
  };
  const handlerRoleSelect = (data: any) => {
    const User = data?.reduce((acc: any, curElem: any) => {
      if (curElem.selected) {
        acc.push(curElem.id);
      }
      return acc;
    }, []);
    setUser({ ...user, rolesListSelected: User });
  };
  useEffect(() => {
    updateOrganizationTree();
  }, [treeData]);

  const handlerNewUser = () => {
    dispatch(GetOrganizationUnitsAvailableUsers({ id: id.id }) as any);
  };
  const handlerNewRoles = () => {
    dispatch(GetOrganizationUnitsAvailableRoles({ id: id.id }) as any);
  };

  const handlerCloseOffcanvas = () => {
    setVal("");
    setInputReset(!inputReset);
  };

  return (
    <div>
      <div className="container-fluid p-0 m-0">
        <div className="row h-100">
          {pagePermission.organization && (
            <div className="col-xxl-6 col-xl-6 col-12 mb-xxl-0 mb-xl-0 mb-lg-0 mb-4 col-lg-12 col-md-12 mb-lg-4">
              <div>
                <div className="card card-full-stretch rounded-0 border-0">
                  <div className="card-header bg-transparent">
                    <h5 className="card-title fw-medium">
                      {t("AbpIdentity.OrganizationTree")}
                    </h5>
                    <span>
                      <div className="col md-4 mt-1">
                        {Alert.show && (
                          <RdsAlert
                            alertmessage={Alert.message}
                            size="small"
                            colorVariant={Alert.color}
                          ></RdsAlert>
                        )}
                      </div>
                    </span>
                  </div>
                  <div className="card-body overflow-x-hidden overflow-y-scroll children-scrollable pt-0">
                    <div className="mx-2">
                      <RdsCompOrganizationTree
                        organizationTreeData={oData}
                        onDeleteNode={handlerDeleteNode}
                        onCreateNode={(data) => {
                          setVal("");
                          setId({ ...id, id: data.id });
                          setInputReset(!inputReset);
                        }}
                        onCreateSubUnit={handlerCreateSubUnit}
                        onSelectNode={handlerSelectNode}
                        onNodeEdit={handlerNodeEdit}
                        nodeColor={nodeColor}
                        onCreateRootNode={() => {}}
                        mutable={false}
                        offId="oganization"
                        buttonLabel="NEW ROOT UNIT"
                      ></RdsCompOrganizationTree>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="col-xxl-6 col-xl-6 col-12 mb-xxl-0 mb-xl-0 mb-lg-0 mb-4 ps-lg-1 ps-xl-1 ps-xxl-1 col-lg-12 col-md-12 ps-lg-3 ">
            <div className="card rounded-0 card-full-stretch border-0 h-100">
              {selectedNode === "" && (
                <>
                  <div className="card-header bg-transparent">
                    <h5 className="card-title fw-medium">
                      {t("AbpIdentity.SelectAnOrganizationUnitToSeeMembers")}
                    </h5>
                  </div>
                  <div>
                    {iconForIllustration === "light" && (
                      <RdsIcon
                        height="160px"
                        width="200px"
                        fill={false}
                        stroke={true}
                        type="lottie"
                        colorVariant="dark"
                        isContinueAnimate={true}
                        iconPath="./assets/lottie-files/outlined/dual-color/no-contact-selected-light.json"
                      />
                    )}
                    {iconForIllustration === "dark" && (
                      <RdsIcon
                        height="160px"
                        width="200px"
                        fill={false}
                        stroke={true}
                        type="lottie"
                        colorVariant="dark"
                        isContinueAnimate={true}
                        iconPath="./assets/lottie-files/outlined/dual-color/no-contact-selected-light.json"
                      />
                    )}
                    {iconForIllustration === "semidark" && (
                      <RdsIcon
                        height="160px"
                        width="200px"
                        fill={false}
                        stroke={true}
                        type="lottie"
                        colorVariant="dark"
                        isContinueAnimate={true}
                        iconPath="./assets/lottie-files/outlined/dual-color/no-contact-selected-light.json"
                      />
                    )}
                  </div>
                </>
              )}
              {selectedNode !== "" && (
                <div>
                  <div className="card-header d-flex justify-content-between bg-transparent align-items-center">
                    <h5 className="card-title">{selectedNode}</h5>
                    {activeTab === "member" && (
                      <RdsButton
                        label={t("New Member") || ""}
                        size="small"
                        id=""
                        icon="plus"
                        iconHeight="12px"
                        iconWidth="12px"
                        iconFill={false}
                        colorVariant="primary"
                        type="button"
                        showLoadingSpinner={true}
                        onClick={handlerNewUser}
                        data-bs-dismiss="offcanvas"
                        databstoggle="offcanvas"
                        databstarget="#oMember-add-off"
                        ariacontrols="oMember-add-off"
                      ></RdsButton>
                    )}
                    {activeTab === "role" && (
                      <RdsButton
                        label={t("AbpIdentity.NewRole") || ""}
                        size="small"
                        icon="plus"
                        iconHeight="12px"
                        iconWidth="12px"
                        iconFill={false}
                        colorVariant="primary"
                        type="button"
                        data-bs-dismiss="offcanvas"
                        databstoggle="offcanvas"
                        databstarget="#oRole-add-off"
                        ariacontrols="oRole-add-off"
                        showLoadingSpinner={true}
                        onClick={handlerNewRoles}
                      ></RdsButton>
                    )}
                  </div>
                  <div className="card-body overflow-x-hidden overflow-y-scroll children-scrollable pt-0">
                    <div className="col-md-12 mb-2">
                      <RdsNavtabs
                        type="tabs"
                        activeNavtabOrder={activeNavtabOrder}
                        fill={false}
                        navtabsItems={navtabsItems}
                        activeNavTabId={activeTab}
                      />
                    </div>
                    <div className="row tab-content" id="nav-tabContent">
                      {activeTab === "member" && (
                        <div className="row">
                          <RdsCompDatatable
                            actionPosition="right"
                            classes="table__userTable"
                            tableHeaders={tableHeadersMembers}
                            tableData={user.members}
                            pagination={true}
                            recordsPerPage={10}
                            noDataheaderTitle={t("No Records Available") || ""}
                            noDataTitle={t("Click on the button to add") || ""}
                            actions={actions}
                            illustration={true}
                            onActionSelection={handlerMemberActions}
                            recordsPerPageSelectListOption={true}
                          ></RdsCompDatatable>
                        </div>
                      )}
                      {activeTab === "role" && (
                        <div className="row">
                          <RdsCompDatatable
                            actionPosition="right"
                            classes="table__userTable"
                            tableHeaders={tableHeadersRoles}
                            tableData={user.roles}
                            pagination={true}
                            recordsPerPage={10}
                            noDataheaderTitle={t("No Records Available") || ""}
                            noDataTitle={t("Click on the button to add") || ""}
                            actions={actions}
                            illustration={true}
                            onActionSelection={handlerRoleActions}
                            recordsPerPageSelectListOption={true}
                          ></RdsCompDatatable>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <RdsOffcanvas
        placement="end"
        canvasTitle={t("Select Member")}
        offId="oMember-add-off"
        backDrop={true}
        scrolling={false}
        preventEscapeKey={false}
      >
        <div className="row form-style">
          <form>
            <div className="tab-content">
              <div className="form-group mb-3">
                <div className="col-md-12  mt-2">
                  <RdsCompDatatable
                    actionPosition="right"
                    classes="table__userTable"
                    tableHeaders={tableHeadersMembers}
                    tableData={user.availableUsers}
                    pagination={true}
                    recordsPerPage={10}
                    illustration={true}
                    enablecheckboxselection={true}
                    onRowSelect={handlerUserSelect}
                    noDataheaderTitle={t("No Records Available") || ""}
                    recordsPerPageSelectListOption={true}
                  ></RdsCompDatatable>
                </div>
              </div>
            </div>
          </form>
          <div className="pb-3 d-flex flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row footer-buttons gap-2">
            <div
              className={
                user.availableUsers.length > 0
                  ? "d-grid d-lg-flex gap-2"
                  : "d-none"
              }
            >
              <RdsButton
                type={"button"}
                label={t("AbpUi.Cancel") || ""}
                size="small"
                isOutline={true}
                colorVariant="primary"
                databsdismiss="offcanvas"
                onClick={handlerCloseOffcanvas}
              ></RdsButton>

              <RdsButton
                type={"button"}
                size="small"
                label={t("AbpUi.Save") || ""}
                isDisabled={
                  !user.usersListSelected ||
                  user.usersListSelected?.length === 0
                }
                colorVariant="primary"
                onClick={handlerUserPush}
                databsdismiss="offcanvas"
                showLoadingSpinner={true}
              ></RdsButton>
            </div>
          </div>
        </div>
      </RdsOffcanvas>
      <RdsOffcanvas
        placement="end"
        canvasTitle={t("AbpIdentity.SelectRoles")}
        offId="oRole-add-off"
        backDrop={true}
        scrolling={false}
        preventEscapeKey={false}
      >
        <div className="container-fluid">
          <div className="row form-style">
            <form>
              <div className="tab-content">
                <div className="form-group mb-3">
                  <div className="col-md-12  mt-2">
                    <RdsCompDatatable
                      actionPosition="right"
                      classes="table__userTable"
                      tableHeaders={tableHeadersRoles}
                      tableData={user.availableRoles}
                      pagination={true}
                      recordsPerPage={10}
                      illustration={true}
                      enablecheckboxselection={true}
                      onRowSelect={handlerRoleSelect}
                      noDataheaderTitle={t("No Records Available") || ""}
                      recordsPerPageSelectListOption={true}
                    ></RdsCompDatatable>
                  </div>
                </div>
              </div>
              <div className="pb-3 d-flex flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row footer-buttons gap-2">
                <RdsButton
                  type={"button"}
                  label={t("AbpUi.Cancel") || ""}
                  size="small"
                  isOutline={true}
                  colorVariant="primary"
                  databsdismiss="offcanvas"
                ></RdsButton>
                <RdsButton
                  type={"button"}
                  size="small"
                  label={t("AbpUi.Save") || ""}
                  isDisabled={
                    !user.rolesListSelected ||
                    user.rolesListSelected?.length == 0
                  }
                  colorVariant="primary"
                  onClick={handlerRolePush}
                  databsdismiss="offcanvas"
                  databstarget="#addRoleOff"
                  showLoadingSpinner={true}
                ></RdsButton>
              </div>
            </form>
          </div>
        </div>
      </RdsOffcanvas>
      <RdsOffcanvas
        placement="end"
        canvasTitle={t("AbpIdentity.NewOrganizationUnit")}
        offId="aoganization"
        backDrop={true}
        scrolling={false}
        preventEscapeKey={false}
        onClose={handlerCloseOffcanvas}
      >
        <RdsInput
          label={t("AbpIdentity.Name") || ""}
          placeholder={t("Enter Name") || ""}
          labelPosition="top"
          required={true}
          size="medium"
          value={val}
          reset={inputReset}
          onChange={(e) => setVal(e.target.value)}
        ></RdsInput>
        <div className="pb-3 d-flex flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row me-3 footer-buttons gap-2">
          <RdsButton
            type={"button"}
            label={t("AbpUi.Cancel") || ""}
            size="small"
            isOutline={true}
            colorVariant="primary"
            databsdismiss="offcanvas"
            onClick={handlerCloseOffcanvas}
          ></RdsButton>

          <RdsButton
            type={"button"}
            label={t("AbpUi.Save") || ""}
            class="ms-2"
            size="small"
            isDisabled={val === ""}
            colorVariant="primary"
            onClick={handlerAddNestedNode}
            databsdismiss="offcanvas"
          ></RdsButton>
        </div>
      </RdsOffcanvas>

      <RdsOffcanvas
        placement="end"
        canvasTitle={t("Edit Organization Unit")}
        offId="boganization"
        backDrop={true}
        scrolling={false}
        preventEscapeKey={false}
      >
        <RdsInput
          inputType="text"
          label={t("AbpIdentity.Name") || ""}
          placeholder={t("Enter Name") || ""}
          labelPosition="top"
          required={true}
          value={val}
          size="medium"
          onChange={(e) => setVal(e.target.value)}
        ></RdsInput>
        <div className="pb-3 d-flex flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row me-3 footer-buttons gap-2">
          <RdsButton
            type={"button"}
            label={t("AbpUi.Cancel") || ""}
            size="small"
            isOutline={true}
            colorVariant="primary"
            databsdismiss="offcanvas"
          ></RdsButton>

          <RdsButton
            type={"button"}
            label={t("AbpUi.Save") || ""}
            class="ms-2"
            size="small"
            colorVariant="primary"
            onClick={handlerEdit}
            databsdismiss="offcanvas"
          ></RdsButton>
        </div>
      </RdsOffcanvas>
      <RdsOffcanvas
        placement="end"
        canvasTitle={t("Add Organization Sub Unit")}
        offId="coganization"
        backDrop={true}
        scrolling={false}
        preventEscapeKey={false}
        onClose={handlerCloseOffcanvas}
      >
        <RdsInput
          inputType="text"
          label={t("Organization Name") || ""}
          placeholder={t("Enter Organization Name") || ""}
          labelPosition="top"
          required={true}
          size="medium"
          onChange={(e) => setVal(e.target.value)}
          reset={inputReset}
          value={val}
        ></RdsInput>
        <div className="pb-3 d-flex flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row me-3 footer-buttons gap-2">
          <RdsButton
            type={"button"}
            label={t("AbpUi.Cancel") || ""}
            size="small"
            colorVariant="primary"
            isOutline={true}
            databsdismiss="offcanvas"
            onClick={handlerCloseOffcanvas}
          ></RdsButton>

          <RdsButton
            type={"button"}
            label={t("AbpUi.Save") || ""}
            class="ms-2"
            size="small"
            isDisabled={val === ""}
            colorVariant="primary"
            databsdismiss="offcanvas"
            onClick={handlerAddSubUnitNode}
          ></RdsButton>
        </div>
      </RdsOffcanvas>
      <RdsOffcanvas
        placement="end"
        canvasTitle={t("Add Organization New Unit")}
        backDrop={true}
        scrolling={false}
        preventEscapeKey={false}
        offId="doganization"
        onClose={handlerCloseOffcanvas}
      >
        <RdsInput
          label={t("Organization Name") || ""}
          placeholder={t("Enter Organization Name") || ""}
          labelPosition="top"
          required={true}
          size="medium"
          reset={inputReset}
          onChange={(e) => setVal(e.target.value)}
          value={val}
        ></RdsInput>
        <div className="pb-3 d-flex flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row me-3 footer-buttons gap-2">
          <RdsButton
            type={"button"}
            label={t("AbpUi.Cancel") || ""}
            size="small"
            colorVariant="primary"
            isOutline={true}
            databsdismiss="offcanvas"
            databstoggle="offcanvas"
            databstarget="#doganization"
            onClick={handlerCloseOffcanvas}
          ></RdsButton>

          <RdsButton
            type={"button"}
            label={t("AbpUi.Save") || ""}
            class="ms-2"
            size="small"
            isDisabled={val === ""}
            colorVariant="primary"
            databsdismiss="offcanvas"
            databstoggle="offcanvas"
            databstarget="#doganization"
            onClick={handlerAddRootNode}
          ></RdsButton>
        </div>
      </RdsOffcanvas>
      <RdsCompAlertPopup
        alertID={"deleteTreeNode"}
        onSuccess={handlerDeleteConfirm}
      ></RdsCompAlertPopup>
      <RdsCompAlertPopup
        alertID="orgMemRole"
        onSuccess={handlerDeleteConfirmUserRoles}
      ></RdsCompAlertPopup>
    </div>
  );
};
export default OrganizationTree;
