import React, { useEffect, useState } from "react";
import { filter as _filter, forEach as _forEach } from "lodash-es";
import { useNavigate } from "react-router-dom";

import {
    RdsCompAlertPopup,
    RdsCompClaims,
    RdsCompDatatable,
    RdsCompPermissionTree,
    RdsCompPermissionTreeNew,
    RdsCompUserBasics,
    RdsCompUserRoles,
} from "../../../rds-components";
import {
    RdsBadge,
    RdsButton,
    RdsIcon,
    RdsInput,
    RdsAlert,
    RdsNavtabs,
    RdsOffcanvas,
    RdsSearch,
    RdsDropdownList,
    RdsCheckbox,
    RdsSelectList,
    RdsDatePicker,
} from "../../../rds-elements";
import {
    useAppSelector,
    useAppDispatch,
} from "../../../../libs/state-management/hooks";

import {

    getUsers1Request,
    getUsersRequest,
    getUsersRolesRequest,
    putUsersRequest,
    postUsersRequest,
    deleteUsersRequest,
    getUsersOrganizationUnitsRequest,
    putUsersChangePasswordRequest,
    putUsersLockRequest,
    getUsersTwoFactorEnabledRequest,
    putUsersUnlockRequest,
    getUsersAllClaimTypesRequest,
    getUsersClaimsRequest,
    putUsersClaimsRequest,
    putUsersTwoFactorRequest,
    getUsersAssignableRolesRequest,
    getUsersAvailableOrganizationUnitsRequest
} from "../../../../libs/state-management/user/user-slice";
import { useTranslation } from "react-i18next";
import { userConfigurationService, userImpersonationService, isgrantedpolicies } from "../../../../../raaghu-react-core/src/index";
import { getPermissionsRequest, putPermissionsRequest } from "../../../../libs/state-management/permissions/permissions-slice";


const Users = (props: any) => {
    const [skipCount, setSkipCount] = useState<number>(0);
    const [totalRecords, setTotalRecords] = useState<number | null>(0);
    const [maxResultCount, setMaxResultCount] = useState<number>(10);
    const dispatch = useAppDispatch();
    const data = useAppSelector((state) => state.persistedReducer.user);
    const organizationData = useAppSelector((state) => state.persistedReducer.organizationUnit);
    const permissionData = useAppSelector((state) => state.persistedReducer.permissions)
    const configData = useAppSelector((state) => state.persistedReducer?.configureStore?.configuration?.auth?.grantedPolicies || {});
    const [userId, setUserId] = useState("");
    const { t } = useTranslation();
    const [isReset, setIsReset] = useState(false);
    const [search, setSearch] = useState<any>({
        filter: undefined, roleId: undefined, organizationUnitId: undefined, isLockedOut: undefined, notActive: undefined
    })
    const [userData, setUserData] = useState<any>({
        name: "",
        surname: "",
        email: "",
        phoneNumber: "",
        lockoutEnabled: true,
        isActive: true,
        userName: "",
        password: "",
        lockoutEnd: "",
        twoFactorEnabled: ""
    });
    const [actions, setActions] = useState<any>([]);
    const [userRolesData, setUserRolesData] = useState<any>();
    const [rolesItem, setRolesItem] = useState<any>();
    const [organizationItem, setOrganizationItem] = useState<any>();
    const [userPermission, setUserPermission] = useState<any>([]);
    const [tableData, setTableData] = useState<any[]>([]);
    const [Alert, setAlert] = useState({ show: false, message: "", color: "" });
    const [twoFactorData, settwoFactorData] = useState(
        props.accountTwoFactorSettings
    );

    const [selectedData, setSelectedData] = useState<any>({
        id: 0,
        claimType: "",
        claimValue: "",
        userId: props.id,
        valueTypeAsString: "",

    });

    let [claimsTable, setClaimsTableData] = useState<any[]>([]);
    const [saveClaim, setSaveClaim] = useState<{ claimType: any; claimValue: any; userId: any; id: any; }[]>([]);

    const handlerClaim = () => {
        dispatch(putUsersClaimsRequest({ id: userId, requestBody: claimsTable }) as any)
        setClaimsTableData(claimsTable);
    };

    const claimDataHandler = (claimdata: any) => {

        const { claimType, claimValue, userId, id } = claimdata;
        const updatedSaveClaim = [
            ...saveClaim,
            {
                claimType,
                claimValue,
                userId,
                id
            }
        ];
        setSaveClaim(updatedSaveClaim);
    }
    const tableHeaders = [
        {
            displayName: t("User Name"),
            key: "userName",
            datatype: "text",
            dataLength: 30,
            required: true,
            sortable: true,
        },
        {
            displayName: t("AbpIdentity.EmailAddress"),
            key: "emailAddress",
            datatype: "text",
            dataLength: 30,
            required: true,
            sortable: true,
        },
        {
            displayName: t("AbpIdentity.Roles"),
            key: "roles",
            datatype: "text",
            dataLength: 30,
            required: true,
            sortable: true,
        },
        {
            displayName: t("AbpIdentity.PhoneNumber"),
            key: "phoneNumber",
            datatype: "text",
            dataLength: 30,
            required: true,
            sortable: true,
        },
        {
            displayName: t("AbpIdentity.Name"),
            key: "name",
            datatype: "text",
            dataLength: 30,
            required: true,
            sortable: true,
        },
        {
            displayName: t("AbpIdentity.Surname"),
            key: "surname",
            datatype: "text",
            dataLength: 30,
            required: true,
            sortable: true,
        },
        {
            displayName: t("Active"),
            key: "isActive",
            datatype: "iconAvatarTitle",
        },
        {
            displayName: t("AbpIdentity.DisplayName:LockoutEnabled"),
            key: "lockoutEnabled",
            datatype: "iconAvatarTitle",
        },
        {
            displayName: t("AbpIdentity.CreationTime"),
            key: "creationTime",
            datatype: "date",
            dataLength: 30,
            required: true,
            sortable: true,
        },
        {
            displayName: t("AbpIdentity.LastModificationTime"),
            key: "lastModificationTime",
            datatype: "text",
            dataLength: 30,
            required: true,
            sortable: true,
        },

    ];

    const twoFactList = [
        { option: t("AbpIdentity.Feature:TwoFactor.Optional"), value: 0 },
        { option: t("AbpIdentity.Feature:TwoFactor.Disabled"), value: 1 },
        { option: t("AbpIdentity.Feature:TwoFactor.Forced"), value: 2 },
    ];

    const handlerChangeTwoFact = (value: any, name: any) => {
        settwoFactorData({ ...twoFactorData, [name]: value });
    }

    const navtabsItemsEdit = [
        { label: t("Basics"), tablink: "#nav-home", id: "0" },
        { label: t("AbpIdentity.Roles"), tablink: "#nav-role", id: "1" },
        { label: t("AbpIdentity.OrganizationUnit"), tablink: "#nav-org", id: "2" },
    ];
    const navtabsItems = [
        { label: t("Basics"), tablink: "#nav-home", id: "0" },
        { label: t("AbpIdentity.Roles"), tablink: "#nav-role", id: "1" },
        { label: t("AbpIdentity.OrganizationUnit"), tablink: "#nav-org", id: "2" },
    ];

    //paginationa handling
    const paginationHandler = (currentPage: number, recordsPP: number) => {
        const skipCount = recordsPP * (currentPage - 1);
        setSkipCount(skipCount);
        setMaxResultCount(recordsPP);
    };


    const offCanvasHandler = () => { };
    const [getUser, setGetUserData] = useState<any>({});
    const [activeNavTabId, setActiveNavTabId] = useState("0");
    const [organizationUnit, setOrganizationUnit] = useState<any[]>([]);
    const [orgUnitIds, setOrgUnitIds] = useState<any[]>([]);
    const canvasTitle = t("AbpIdentity.NewUser");
    const [roleNames, setRoleNames] = useState<any>();
    const [pagePermission, setPagePermission] = useState<any>({
        create: false
    })

    const [selectedPermissionListData, setSelectedPermissionListData] = useState<any>([]);
    const [permissionKeyName, setPermissionKeyName] = useState(0);
    const [inputReset, setInputReset] = useState(false);
    const [tableDataRowid, setTableDataRowId] = useState("");
    const [isEnabledData, setIsEnabledData] = useState({
        id: "",
        twoFactorEnabled: false
    })

    const [isLockoutEndData, setIsLockoutEndData] = useState<{ id: string; lockoutEnd: string; }>();

    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');
    const [allClaimsArray, setAllClaimsArray] = useState<any[]>([]);

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            setDebouncedSearchTerm(search.filter);
        }, 500);
        return () => {
            clearTimeout(debounceTimer);
        };
    }, [search.filter]);
    useEffect(() => {
        if (data.getUsersAllClaimTypes && Array.isArray(data.getUsersAllClaimTypes)) {
            const tempAllClaimsArray: any[] = [];
            data.getUsersAllClaimTypes?.map((res: any) => {
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
    }, [data.getUsersAllClaimTypes]);

    const createNewClaim = (event: any) => {
        event.preventDefault();
        let newTempData = allClaimsArray.filter((data: any) => data.id === selectedData.claimType);
        if (selectedData.claimType && selectedData.claimValue) {
            const newClaimData = {
                id: newTempData[0].id,
                claimType: newTempData[0].option,
                claimValue: selectedData.claimValue,
                userId: userId,
            };
            setClaimsTableData((prev: any) => [...prev, newClaimData]);
            setSelectedData({
                ...selectedData,
                claimType: '',
                claimValue: ''
            });
        }
    };


    const isEmailValid = (email: any) => {
        if (!email || email.length === 0) {
            return false;
        }
        return true;
    };
    const isPasswordValid = (password: any) => {
        if (!password || password.length === 0) {
            return false;
        }
        return true;
    };

    const isNameValid = (name: any) => {
        if (!name || name.length === 0) {
            return false;
        }
        return true;
    };
    const isSurnameValid = (surname: any) => {
        if (!surname || surname.length === 0) {
            return false;
        }
        return true;
    };
    const isUsernameValid = (userName: any) => {
        if (!userName || userName.length === 0) {
            return false;
        }
        return true;
    };

    const isPhoneNumberValid = (phoneNumber: any) => {
        const phonePattern = /^(\+\d{1,4}\s?)?\d{10,15}$/;
        return phonePattern.test(phoneNumber);
    };
    const handlerPermission = () => {
        const permissions: any = {
            dTo: {
                permissions: selectedPermissionListData,
            },
        };
    };

    const isFormValid = isPasswordValid(getUser.password) && isEmailValid(getUser.email) && isNameValid(getUser.name) && isSurnameValid(getUser.surname) && isUsernameValid(getUser.userName) && isPhoneNumberValid(getUser.phoneNumber);

    function emitData(allData: any) {
        const data: any = [];
        for (let i = 0; i < allData?.length; i++) {
            allData[i].permissions.forEach((ele: any) => data.push(ele));
        }
        return data;
    }

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
        const emittedData = emitData(firstArrayFromModified)
        const spliceMainParentUndefined = emittedData?.filter(
            (x: any) => x.parentName !== undefined
        );
        const initailStateData = emitData(userPermission);

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

    //****************  useEffect Hook **********************
    useEffect(() => {
        const createPermission = isgrantedpolicies('AbpIdentity.Users.Create', configData);
        // Check if the value actually changed before updating the state
        if (createPermission !== pagePermission.create) {
          setPagePermission((prevPagePermission: any) => ({
            ...prevPagePermission,
            create: createPermission,
          }));
        }

        const IsEdit = isgrantedpolicies('AbpIdentity.Users.Update', configData);
        const IsChangePermissions = isgrantedpolicies("AbpIdentity.Users.ManagePermissions", configData);
        const IsImpersonated = isgrantedpolicies("AbpIdentity.Users.Impersonation", configData);
        const IsImport = isgrantedpolicies("AbpIdentity.Users.Import", configData)
        let resultArray = [];
        if (IsEdit) {
            resultArray.push({ id: "user_edit_offcanvas", displayName: t("AbpUi.Edit"), offId: "user-edit-off" });
        }
        resultArray.push({ id: "claims_off", displayName: t("AbpIdentity.Claims"), offId: "claims-off" });
        if (IsChangePermissions) {
            resultArray.push({ id: "permission_off", displayName: t("AbpPermissionManagement.Permissions"), offId: "permission-off" });
        }
        resultArray.push({ id: "set_password", displayName: t("AbpIdentity.SetPassword"), offId: "set_password" });
        resultArray.push({ id: "two_Factor_off", displayName: t("AbpIdentity.TwoFactor"), offId: "two-Factor-off" });
        if (IsImpersonated) {
            resultArray.push({ id: "login_as_user", displayName: t("AbpIdentity.LoginWithThisUser") })
        }
        if (!arraysAreEqual(actions, resultArray)) {
            setActions(resultArray);
        }
    }, [configData, pagePermission.create,t,actions]);

    const arraysAreEqual = (arr1: any, arr2: any) => {
        return JSON.stringify(arr1) === JSON.stringify(arr2);
   };

    useEffect(() => {
        handleButtonClick();
    }, []);
    const handleButtonClick = () => {
        dispatch(getUsersAvailableOrganizationUnitsRequest() as any);
        dispatch(getUsersAssignableRolesRequest() as any);
    };

    useEffect(() => {
        dispatch(getUsers1Request({ skipCount: skipCount, maxResultCount: maxResultCount, filter: search.filter, roleId: search.roleId, organizationUnitId: search.organizationUnitId, isLockedOut: search.isLockedOut, notActive: search.notActive }) as any);
    }, [dispatch, skipCount, maxResultCount, debouncedSearchTerm, search.roleId, search.organizationUnitId, search.isLockedOut, search.notActive]);

    useEffect(() => {

        if (data?.getUsers1?.items) {
            const tickIcon = {
                iconName: "tick",
                iconFill: false,
                iconStroke: true,
                iconColor: "success",
                iconWidth: "16px",
                iconHeight: "16px",
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

            const tempData = data?.getUsers1?.items?.map((item: any) => {
                const isDelete = isgrantedpolicies("AbpIdentity.Roles.Delete", configData);
                let rolesNames = "";
                item?.roleNames?.map((res: any) => {
                    rolesNames = rolesNames + `${res} `;
                });
                if (item?.creatorId !== null && isDelete) {
                    return {
                        id: item.id,
                        userName: item.lockoutEnd !== null && item.lockoutEnd !== undefined ? <div><RdsIcon name="lock" height="15px" width="15px" colorVariant="secondary" strokeWidth="2px" /> {item.userName}</div> : item.userName,
                        name: item.name,
                        roles: rolesNames,
                        emailAddress: item.email,
                        phoneNumber: item.phoneNumber,
                        surname: item.surname,
                        creationTime: item.creationTime,
                        lastModificationTime: item.lastModificationTime,
                        isActive: item.isActive ? tickIcon : closeIcon,
                        lockoutEnabled: item.lockoutEnabled ? tickIcon : closeIcon,
                        lockoutEnd: item.lockoutEnd,
                        rowActions: { id: "delete", displayName: t("AbpUi.Delete"), modalId: "user-delete-off" },
                        rowActionsAdd: item.lockoutEnd == null ? { id: "lock_off", displayName: t("Lock"), offId: "lock-off" } : { id: "unlock_user", displayName: t("Unlock") },
                    }
                }
                else {
                    return {
                        id: item.id,
                        userName: item.lockoutEnd !== null && item.lockoutEnd !== undefined ? <div><RdsIcon name="lock" height="15px" width="15px" colorVariant="secondary" strokeWidth="2px" /> {item.userName}</div> : item.userName,
                        name: item.name,
                        roles: rolesNames,
                        emailAddress: item.email,
                        phoneNumber: item.phoneNumber,
                        surname: item.surname,
                        creationTime: item.creationTime,
                        lastModificationTime: item.lastModificationTime,
                        isActive: item.isActive ? tickIcon : closeIcon,
                        lockoutEnabled: item.lockoutEnabled ? tickIcon : closeIcon,
                        lockoutEnd: item.lockoutEnd,
                        rowActionsAdd: item.lockoutEnd == null ? { id: "lock_off", displayName: t("Lock"), offId: "lock-off" } : { id: "unlock_user", displayName: t("Unlock"), },
                    }
                }
            });
            setTableData(tempData);
            setTotalRecords(data?.getUsers1?.totalCount);
        }
        setUserData({
            name: "",
            surname: "",
            email: "",
            phoneNumber: "",
            lockoutEnabled: true,
            isActive: true,
            userName: "",
            password: "",
            lockoutEnd: "",
            twoFactorEnabled: ""
        });
    }, [data.getUsers1]);

    useEffect(() => {
        let tempOrgData: any[] = [];
        if (data.getUsersAvailableOrganizationUnits) {
            const treeData1 = createTree(
                data.getUsersAvailableOrganizationUnits.items,
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

            tempOrgData = treeData1;
        }
        setOrganizationUnit(tempOrgData);

        // set data for filter organization 
        const tempOrgItems: any[] = [];

        if (data.getUsersAvailableOrganizationUnits) {
            organizationData.getOrganizationUnits?.items?.map((el: any) => {
                const data = {
                    option: el.displayName,
                    value: el.id,
                };

                tempOrgItems.push(data);
            });
        }

        setOrganizationItem(tempOrgItems);
    }, [data.getUsersAvailableOrganizationUnits]);

    useEffect(() => {
        if (data.getUsers) {
            setUserData(data.getUsers);
        }
    }, [data.getUsers]);

    useEffect(() => {
        const tempRoleData: any[] = [];
        const tempRoleItems: any[] = [];

        if (data.getUsersAssignableRoles) {
            data?.getUsersAssignableRoles?.items?.map((el: any) => {
                const data = {
                    option: el.name,
                    value: el.id,
                };
                tempRoleItems.push(data);
            });
        }
        if (data.getUsersAssignableRoles) {
            data?.getUsersAssignableRoles?.items?.map((el: any) => {
                const data = {
                    name: el.name,
                    isChecked: false,
                };
                tempRoleData.push(data);
            });
        }
        setUserRolesData(tempRoleData);
        setRolesItem(tempRoleItems);
    }, [data.getUsersAssignableRoles]);

    useEffect(() => {
        const editRolesUserData: any[] = [];
        if (data.getUsersRoles) {
            if (userRolesData) {
                userRolesData?.map((el: any) => {
                    let isChecked = false;
                    data.getUsersRoles.items.forEach((item: any) => {
                        if (item.name == el.name) {
                            isChecked = true;
                        }
                    });
                    const data1 = {
                        name: el.name,
                        isChecked: isChecked,
                    };
                    editRolesUserData.push(data1);
                });
            }
        }
        setUserRolesData(editRolesUserData);
    }, [data.getUsersRoles]);

    useEffect(() => {
        if (data.getUsersOrganizationUnits) {
            const tempEditOrgData: any[] = recursionFunction(
                organizationUnit,
                data.getUsersOrganizationUnits
            );
            setOrganizationUnit(tempEditOrgData);
        } else {
            setOrganizationUnit(organizationUnit);
        }
    }, [data.getUsersOrganizationUnits]);

    useEffect(() => {
        if (permissionData?.getPermissions) {
            setUserPermission(permissionData?.getPermissions.groups);
        }
    }, [permissionData?.getPermissions]);



    function createTree(
        array: any[],
        parentIdProperty: any,
        idProperty: any,
        parentIdValue: any,
        childrenProperty: string,
        fieldMappings: any,
        level: any
    ): any {
        const tree: any[] = [];

        const nodes = _filter(array, [parentIdProperty, parentIdValue]);

        _forEach(nodes, (node) => {
            const newNode: any = {
                data: node,
                level: level,
                selected: false,
            };

            mapFields(node, newNode, fieldMappings);

            newNode[childrenProperty] = createTree(
                array,
                parentIdProperty,
                idProperty,
                node[idProperty],
                childrenProperty,
                fieldMappings,
                level + 1
            );

            tree.push(newNode);
        });

        return tree;
    }

    function mapFields(node: any, newNode: any, fieldMappings: any): void {
        _forEach(fieldMappings, (fieldMapping: any) => {
            if (!fieldMapping["target"]) {
                return;
            }

            if (fieldMapping.hasOwnProperty("value")) {
                newNode[fieldMapping["target"]] = fieldMapping["value"];
            } else if (fieldMapping["source"]) {
                newNode[fieldMapping["target"]] = node[fieldMapping["source"]];
            } else if (fieldMapping["targetFunction"]) {
                newNode[fieldMapping["target"]] = fieldMapping["targetFunction"](node);
            }
        });
    }

    function handleSelectesPermission() {
        const permissions: any = {
            key: permissionKeyName,
            permissions: {
                permissions: selectedPermissionListData,
            },
        };
        dispatch(putPermissionsRequest({ requestBody: permissions }) as any);
    }

    function handleRoleNamesData(data: any) {
        setUserRolesData(data);
        const rolesNames = data
            .filter((element: any) => element.isChecked)
            .map((element: any) => element.name);
        setRoleNames(rolesNames);
    }

    function handleOrganizationUnit(treeNode: any) {
        setOrganizationUnit(treeNode);
        const tempOrgUnit = treeNode
            .filter((element: any) => element.selected)
            .map((node: any) => node.data.id);
        setOrgUnitIds(tempOrgUnit);
    }


    const tableHeadersClaim = [
        {
            displayName: t("AbpIdentity.ClaimTypes"),
            key: "claimType",
            datatype: "text",
            sortable: true,
        },
        {
            displayName: t("AbpIdentity.ClaimValue"),
            key: "claimValue",
            datatype: "text",
            sortable: true,
        }
    ];

    const actionsClaims = [{ id: "delete", displayName: t("AbpUi.Delete") }];

    function onActionSelectionClaims(data: any, actionId: any) {
        if (actionId === 'delete') {
            const claimUniqueIdToDelete = data.uniqueId;
            const updatedClaimsTable = claimsTable.filter(
                (claim: any) => claim.uniqueId !== claimUniqueIdToDelete
            );
            setClaimsTableData(updatedClaimsTable);
        }
    }

    function dateFormateConvert(data: any) {
        const date = new Date(data);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const period = date.getHours() >= 12 ? 'PM' : 'AM';
        const formattedDate =
            year +
            '-' +
            month +
            '-' +
            day +
            ' ' +
            hours +
            ':' +
            minutes +
            ' ' +
            period;
        return formattedDate;
    }


    function dateFormateConvertLockout(data: any) {
        const date = new Date(data);
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();
        const hours = date.getHours() % 12 || 12; // Convert hours to 12-hour format
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const period = date.getHours() >= 12 ? 'PM' : 'AM';

        const formattedDate = `${month}/${day}/${year} ${hours}:${minutes} ${period}`;

        return formattedDate;
    }

    function onActionSelection(rowData: any, actionId: any) {
        setUserId(rowData.id);
        setPermissionKeyName(rowData.id);
        dispatch(getUsersRequest({ id: (rowData.id) }) as any);
        dispatch(getUsersRolesRequest({ id: rowData.id }) as any);
        dispatch(getUsersOrganizationUnitsRequest({ id: rowData.id }) as any);
        setTableDataRowId(rowData.id);
        if (actionId == "login_as_user") {

            userImpersonationService(
                "Impersonation",
                localStorage.getItem("REACT_APP_CLIENT_ID") + "",
                localStorage.getItem("REACT_APP_SCOPE") + "",
                rowData.id,
                "",
                "",
                ""
            )
                .then(async (res: any) => {
                    if (res.access_token) {
                        localStorage.setItem("accessToken", res.access_token);
                        localStorage.setItem("refreshToken", res.refresh_token);
                        localStorage.setItem("expiresIn", res.expires_in);
                        localStorage.setItem("loginAccessDate", Date());
                        localStorage.setItem("auth", JSON.stringify(true));
                        await userConfigurationService().then(async (res: any) => {
                            if (res.currentUser.impersonatorUserId != null) {
                                localStorage.setItem("isImpersonation", "true");
                                localStorage.setItem("UserId", res.currentUser.UserId);
                                localStorage.setItem("userName", res.currentUser.userName);
                                localStorage.setItem("name", res.currentUser.name);
                            }
                            return res;
                        });
                        window.location.href = "/dashboard";
                    }
                });
        } if (actionId == "two_Factor_off") {
            setIsEnabledData({
                ...isEnabledData,
                id: rowData.id,
                twoFactorEnabled: rowData.twoFactorEnabled,
            })
            dispatch(getUsersTwoFactorEnabledRequest({ id: rowData.id }) as any);
        } if (actionId == "lock_off") {
            dispatch(getUsersRequest((rowData)) as any).then((res: any) => {
                const formattedLockoutEnd = dateFormateConvertLockout(rowData.lockoutEnd);
                setIsLockoutEndData({
                    ...isLockoutEndData,
                    id: rowData.id,
                    lockoutEnd: formattedLockoutEnd,
                })
            })
        } if (actionId == "unlock_user") {
            dispatch(putUsersUnlockRequest({ id: rowData.id }) as any).then(() => {
                setTimeout(() => {
                    dispatch(getUsers1Request({ skipCount: skipCount, maxResultCount: maxResultCount }) as any);
                }, 1000);
            });
        } if (actionId === 'claims_off') {
            dispatch(getUsersAllClaimTypesRequest() as any);
            dispatch(getUsersClaimsRequest({ id: rowData.id }) as any).then((res: any) => {
                if (res.type === 'user/getUsersClaims/fulfilled') {
                    let claimsTableData = res.payload;
                    function generateUniqueId() {
                        return '_' + Math.random().toString(36).substr(2, 9);
                    } claimsTableData = claimsTableData.map((claim: any) => {
                        return {
                            ...claim,
                            uniqueId: generateUniqueId()
                        };
                    });
                    setClaimsTableData(claimsTableData);
                }
            });
        }

        if (actionId === "permission_off") {
            if (permissionData.getPermissions && (permissionData.getPermissions?.groups?.length > 0) && (permissionData.getPermissions?.groups == userPermission)) {
                setUserPermission(permissionData.getPermissions?.groups);
            }
            dispatch(getPermissionsRequest({ providerName: "U", providerKey: rowData.id }) as any);
        }
        setActiveNavTabId("0");
    }

    function getUserData(data: any) {
        setGetUserData(data);
        setUserData(data);
    }

    function createNewUser(data: any) {
        const tempData = {
            ...getUser,
            roleNames: roleNames,
            organizationUnitIds: orgUnitIds,
        };
        dispatch(postUsersRequest({ requestBody: tempData }) as any).then((res: any) => {
            if (res.type == "user/postUsersRequest/rejected") {
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
                    message: t("User created Successfully"),
                    color: "success",
                });
            }
            dispatch(getUsers1Request({ skipCount: skipCount, maxResultCount: maxResultCount }) as any);
        });
        setUserData({
            name: "",
            surname: "",
            email: "",
            phoneNumber: "",
            lockoutEnabled: true,
            isActive: true,
            userName: "",
            password: "",
            lockoutEnd: "",
            twoFactorEnabled: ""
        });
        setInputReset(!inputReset)

    }

    function offcanvasClose() {
        setInputReset(!inputReset)
        setActiveNavTabId("0");
        setUserData({
            name: "",
            surname: "",
            email: "",
            phoneNumber: "",
            lockoutEnabled: true,
            isActive: true,
            userName: "",
            password: "",
            lockoutEnd: "",
            twoFactorEnabled: ""
        });
        const newRole = userRolesData.map((cur: any) => {
            return { ...cur, isChecked: false };

        });
        setUserRolesData(newRole);
        const newOrganization = organizationUnit.map((cur: any) => {
            return { ...cur, selected: false };
        });
        setOrganizationUnit(newOrganization);
    }

    function handleUserUpdate(data: any) {
        let updateData: any = {};
        if (getUser.name) {
            updateData = {
                ...getUser,
                roleNames: roleNames,
                organizationUnitIds: orgUnitIds,
            };
        } else {
            updateData = {
                ...userData,
                roleNames: roleNames,
                organizationUnitIds: orgUnitIds,
            };
        }
        dispatch(putUsersRequest({ id: userId, requestBody: updateData }) as any).then(
            (res: any) => {
                if (res.type == "user/putUsersRequest/rejected") {
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
                        message: t("User updated Successfully"),
                        color: "success",
                    });
                }
                dispatch(getUsers1Request({ skipCount: skipCount, maxResultCount: maxResultCount }) as any);
            }
        );
        handleSelectesPermission();
        setUserData({
            name: "",
            surname: "",
            email: "",
            phoneNumber: "",
            twoFactorEnabled: "",
            userName: "",
            password: "",
            lockoutEnd: "",
        });
    }

    function recursionFunction(organizationUnit: any, selectedOrgUnit: any) {
        return organizationUnit?.map((el: any) => {
            selectedOrgUnit?.map((e: any) => {
                if (el.data.id == e.id) {
                    el.selected = true;
                }
            });
            if (el.children.length) {
                el.children = recursionFunction(el.children, selectedOrgUnit);
                return el;
            } else {
                return el;
            }
        });
    }
    const [password, setPassword] = useState("");

    function generatePassword() {

        const length = 10;
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}[]<>?";
        let password = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        setPassword(password);
    }
    const setPasswordData = (event: any) => {
        setUserData({ ...userData, password: event.target.value });

    };
    function setPasswordButton() {
        const data = { id: userId, requestBody: { newPassword: password } };
        dispatch(putUsersChangePasswordRequest(data) as any).then((res: any) => {
            if (res.type == "user/putUsersChangePasswordRequest/rejected") {
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
                    message: t("Password Changed Successfully"),
                    color: "success",
                });
            }
            dispatch(getUsers1Request({ skipCount: skipCount, maxResultCount: maxResultCount }) as any);
        });
    }

    function deleteHandler(data: any) {
        dispatch(deleteUsersRequest({ id: userId }) as any).then((res: any) => {
            if (res.type == "user/deleteUsersRequest/rejected") {
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
                    message: t("User deleted Successfully"),
                    color: "success",
                });
            }
            dispatch(getUsers1Request({ skipCount: skipCount, maxResultCount: maxResultCount }) as any);
            if (data.length === 1 && skipCount > 0) {
                setSkipCount(0)
            }
        });
    }

    useEffect(() => {
        // Set a 2-second timer to update the state
        const timer = setTimeout(() => {
            setAlert({ ...Alert, show: false });
        }, 2000);

        // Clean up the timer when the component unmounts or when the state changes
        return () => clearTimeout(timer);
    }, [data.getUsers1]);


    function handleTwoFactorSubmit(data: any) {
        const payload = {
            id: tableDataRowid,
            enabled: data,
        };
        dispatch(putUsersTwoFactorRequest(payload) as any).then((res: any) => {
        });
    }

    function handlerLockoutEndDateData(data: any) {
        const isLockoutEndData = dateFormateConvert(data);
        const payload = {
            id: tableDataRowid,
            lockoutEnd: isLockoutEndData,
        };
        setIsLockoutEndData(payload);
    }

    function handlerLockoutEndDate(data: any) {
        const payload = {
            id: tableDataRowid,
            lockoutEnd: data.lockoutEnd,
        };
        dispatch(putUsersLockRequest(payload) as any).then(() => {
            setTimeout(() => {
                dispatch(getUsers1Request({ skipCount: skipCount, maxResultCount: maxResultCount }) as any);
            }, 1000);
        });
    }

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch({ ...search, filter: value })
    };
    const handlerClearFilter = (e: any) => {
        setSearch({ ...search, filter: undefined, roleId: undefined, organizationUnitId: undefined, isLockedOut: undefined, notActive: undefined })
    }

    return (
        <div className="container-fluid p-0 m-0">
            <div className="row">
                <div className="col-md-12">
                    <div className="card px-4 py-4 border-0 rounded-0 card-full-stretch users">
                        <div className="row">
                            <div className="col-xxl-7 col-xl-7 col-lg-12 col-md-12 col-12">
                                <div className="row">
                                    <div className="col-xxl-4 col-xl-3 col-md-4 mb-md-3 mb-2"><RdsSearch
                                        value={search.filter}
                                        onChange={handleSearchChange}
                                        placeholder={t("Search") || ""}
                                        size="small"
                                    /></div>
                                    <div className="col-xxl-4 col-xl-4 col-md-4 mb-3">
                                        <RdsSelectList
                                            id="AbpIdentity.Fea"
                                            placeholder={t("Select Roles") || ""}
                                            selectItems={rolesItem}
                                            selectedValue={search.roleId}
                                            onChange={(item: any) => {
                                                setSearch({ ...search, roleId: item.value })
                                            }}
                                            dataTestId="twofactList"
                                        ></RdsSelectList>
                                    </div>
                                    <div className="col-xxl-4 col-xl-5 col-md-4 mb-3">
                                        <RdsSelectList
                                            id="selectOrgUnit"
                                            placeholder={t("Select organization Unit") || ""}
                                            selectItems={organizationItem}
                                            selectedValue={search.organizationUnitId}
                                            onChange={(item: any) => {
                                                setSearch({ ...search, organizationUnitId: item.value })
                                            }}
                                            dataTestId="twofactList"
                                        ></RdsSelectList>
                                    </div>

                                </div>

                            </div>
                            <div className="col-xxl-5 col-xl-5 col-lg-12 col-md-12 col-12 mb-3 pt-1">
                                <div className="align-items-center d-block d-lg-flex d-md-flex d-xl-flex d-xxl-flex justify-content-between">
                                    <div className="d-flex gap-3 mb-3 mb-md-0">
                                        <RdsCheckbox
                                            label={t("Lock") || ""}
                                            checked={search.isLockedOut}
                                            onChange={(e: any) => { setSearch({ ...search, isLockedOut: e.target.checked }) }}
                                        ></RdsCheckbox>
                                        <RdsCheckbox
                                            label={t("Not Active") || ""}
                                            checked={search.notActive}
                                            onChange={(e: any) => { setSearch({ ...search, notActive: e.target.checked }) }}
                                        ></RdsCheckbox>
                                        <a className="text-primary cursor-pointer" onClick={handlerClearFilter}>{t("Clear Filter") || ""}</a>
                                    </div>
                                    <div>
                                        {pagePermission.create &&
                                            <RdsButton
                                                label={t("AbpIdentity.NewUser") || ""}
                                                showLoadingSpinner={true}
                                                databstoggle="offcanvas"
                                                databstarget="#userOffcanvas"
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
                                                onClick={handleButtonClick} 
                                            ></RdsButton>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <RdsCompDatatable
                            tableHeaders={tableHeaders}
                            actions={actions}
                            tableData={tableData}
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
                        <RdsCompAlertPopup
                            alertID="user-delete-off"
                            onSuccess={deleteHandler}
                        />
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
                        backDrop={true}
                        scrolling={true}
                        preventEscapeKey={false}
                        canvasTitle={canvasTitle || ""}
                        offId="userOffcanvas"
                        placement={"end"}
                        onClose={offcanvasClose}
                    >
                        <RdsNavtabs
                            navtabsItems={navtabsItems}
                            type={"tabs"}
                            activeNavTabId={activeNavTabId}
                            activeNavtabOrder={(currId) => {
                                setActiveNavTabId(currId);
                            }}
                            justified={false}
                        >
                            {activeNavTabId == "0" && (
                                <RdsCompUserBasics
                                    userData={userData}
                                    reset={inputReset}

                                    createUser={(e: any) => {
                                        getUserData(e);
                                    }}
                                />
                            )}
                            {activeNavTabId == "1" && (
                                <>
                                    <RdsCompUserRoles
                                        usersRole={userRolesData}
                                        changedData={(data: any) => {
                                            handleRoleNamesData(data);
                                        }}
                                    ></RdsCompUserRoles>
                                </>
                            )}
                            {activeNavTabId == "2" && (
                                <>
                                    <RdsCompPermissionTreeNew
                                        treeData={organizationUnit}
                                        changeData={handleOrganizationUnit}
                                    />
                                </>
                            )}
                        </RdsNavtabs>
                        <div className="pb-3 footer-buttons d-flex flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row gap-2">
                            <RdsButton
                                class="me-2"
                                label={t("AbpUi.Cancel") || ""}
                                type="button"
                                databsdismiss="offcanvas"
                                isOutline={true}
                                size="small"
                                colorVariant="primary"
                                onClick={offcanvasClose}
                            ></RdsButton>
                            <RdsButton
                                class="me-2"
                                label={t("AbpUi.Save") || ""}
                                type="button"
                                size="small"
                                isDisabled={!isFormValid}
                                isOutline={false}
                                colorVariant="primary"
                                onClick={createNewUser}
                                showLoadingSpinner={true}
                                databsdismiss="offcanvas"
                            ></RdsButton>
                        </div>
                    </RdsOffcanvas>

                    <RdsOffcanvas
                        canvasTitle={t("Edit User")}
                        onclick={offCanvasHandler}
                        placement="end"
                        offId="user-edit-off"
                        backDrop={true}
                        scrolling={false}
                        onClose={(e) => {
                            offcanvasClose();
                        }}
                        preventEscapeKey={false}
                    >
                        <RdsNavtabs
                            navtabsItems={navtabsItemsEdit}
                            type={"tabs"}
                            activeNavTabId={activeNavTabId}
                            activeNavtabOrder={(currTab) => {
                                setActiveNavTabId(currTab);
                            }}
                            justified={false}
                        >
                            {activeNavTabId == "0" &&
                                <RdsCompUserBasics
                                    userData={userData}
                                    createUser={(e: any) => {
                                        getUserData(e);
                                    }}
                                />
                            }

                            {activeNavTabId == "1" && (
                                <>
                                    <RdsCompUserRoles
                                        usersRole={userRolesData}
                                        changedData={(data: any) => {
                                            handleRoleNamesData(data);
                                        }}
                                    ></RdsCompUserRoles>
                                </>
                            )}

                            {activeNavTabId == "2" && (
                                <>
                                    <RdsCompPermissionTreeNew
                                        treeData={organizationUnit}
                                        changeData={handleOrganizationUnit}
                                    />
                                </>
                            )}
                        </RdsNavtabs>

                        <div className="pb-3 footer-buttons d-flex flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row gap-2">
                            <RdsButton
                                class="me-2"
                                label={t("AbpUi.Cancel") || ""}
                                type="button"
                                size="small"
                                databsdismiss="offcanvas"
                                isOutline={true}
                                colorVariant="primary"
                            ></RdsButton>
                            <RdsButton
                                class="me-2"
                                label={t("AbpUi.Save") || ""}
                                type="button"
                                size="small"
                                isOutline={false}
                                colorVariant="primary"
                                onClick={handleUserUpdate}
                                showLoadingSpinner={true}
                                databsdismiss="offcanvas"
                            ></RdsButton>
                        </div>
                    </RdsOffcanvas>

                    <RdsOffcanvas
                        canvasTitle={t("AbpIdentity.SetPassword")}
                        onclick={offCanvasHandler}
                        placement="end"
                        offId="set_password"
                        backDrop={true}
                        scrolling={false}
                        onClose={(e) => {
                            offcanvasClose();
                        }}
                        preventEscapeKey={false}
                    >
                        <div className="row">
                            <div className="col-md-6">
                                <RdsInput
                                    value={password}
                                    placeholder={t("Enter Password") || ""}
                                    inputType="password"
                                    label={t("Enter New Password") || ""}
                                    required={true}
                                    onChange={(e) => { setPasswordData(e); }}
                                    showIcon={true}
                                ></RdsInput>
                            </div>
                            <div className="col-md-6 align-self-center pt-xxl-3 pt-xl-3 pt-lg-3 pt-md-3 pt-0 d-flex">
                                <RdsButton

                                    class=""
                                    label={t("Auto-generate") || ""}
                                    type="button"
                                    icon="refresh_sync"
                                    iconHeight="15px"
                                    iconWidth="15px"
                                    size="medium"
                                    isOutline={true}
                                    colorVariant="primary"
                                    showLoadingSpinner={true}
                                    onClick={generatePassword}
                                ></RdsButton>
                            </div>
                        </div>

                        <div className="pb-3 d-flex flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row footer-buttons gap-2">
                            <RdsButton
                                class="me-2"
                                tooltipTitle={""}
                                type={"button"}
                                label={t("AbpUi.Cancel") || ""}
                                colorVariant="outline-primary"
                                size="small"
                                databsdismiss="offcanvas"
                            ></RdsButton>
                            <RdsButton
                                class="me-2"
                                label={t("AbpUi.Save") || ""}
                                size="small"
                                isDisabled={!isFormValid}
                                colorVariant="primary"
                                tooltipTitle={""}
                                type={"submit"}
                                databsdismiss="offcanvas"
                                onClick={setPasswordButton}
                            ></RdsButton>
                        </div>
                    </RdsOffcanvas>


                    <RdsOffcanvas
                        canvasTitle={t("Claims")}
                        placement="end"
                        offId="claims-off"
                        backDrop={true}
                        scrolling={false}
                        preventEscapeKey={false}
                    >

                        <div className="overflow-x-hidden overflow-y-scroll offcanvas-custom-scroll">
                            <div>
                                <div className="form">
                                    <div className="row">
                                        <div className="col-md-5 mb-3">
                                            <RdsSelectList
                                                key={selectedData.claimType}
                                                id="abp.claim"
                                                label={t("AbpIdentity.ClaimTypes") || ""}
                                                placeholder={selectedData.claimType ? "" : (t("Select Claim Type") || "")}
                                                selectItems={allClaimsArray}
                                                selectedValue={selectedData.claimType}
                                                onChange={(item: any) => {
                                                    setSelectedData({ ...selectedData, claimType: item.value });
                                                }}
                                                dataTestId="select"
                                            ></RdsSelectList>
                                        </div>
                                        <div className="col-md-5">
                                            <RdsInput
                                                required={true}
                                                label={t("AbpIdentity.ClaimValue") || ""}
                                                placeholder={t("Enter Value") || ""}
                                                name="value"
                                                value={selectedData.claimValue}
                                                onChange={(event) =>
                                                    setSelectedData({
                                                        ...selectedData,
                                                        claimValue: event.target.value,
                                                    })
                                                }
                                                dataTestId="value"
                                            ></RdsInput>
                                        </div>

                                        <div className="col-md-2 mt-xxl-1 mt-xl-1 mt-lg-1 mt-md-1 ps-xxl-1 ps-xl-1 ps-lg-1 ps-md-1 pt-xxl-4 pt-xl-4 pt-lg-4 pt-md-4">

                                            <RdsButton
                                                type={"button"}
                                                label={t("") || ""}
                                                icon="plus"
                                                iconHeight="15px"
                                                onClick={(event) => createNewClaim(event)}
                                                class="text-start"
                                                isDisabled={selectedData.claimValue ? false : true}
                                                iconColorVariant="dark"
                                                colorVariant="primary"
                                                size="medium"
                                                dataTestId="add"
                                            ></RdsButton>

                                        </div>
                                    </div>

                                    <div className="row mt-3 ">
                                        <RdsCompDatatable
                                            actionPosition="right"
                                            tableHeaders={tableHeadersClaim}
                                            tableData={claimsTable}
                                            pagination={true}
                                            recordsPerPage={10}
                                            actions={actionsClaims}
                                            recordsPerPageSelectListOption={true}
                                            onActionSelection={onActionSelectionClaims}
                                        ></RdsCompDatatable>

                                    </div>
                                </div>
                            </div>
                            <div className="pb-3 d-flex flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row gap-2 footer-buttons">
                                <RdsButton
                                    class="me-2"
                                    tooltipTitle={""}
                                    type={"button"}
                                    label={t("AbpUi.Cancel") || ""}
                                    colorVariant="outline-primary"
                                    size="small"
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
                                    onClick={handlerClaim}
                                ></RdsButton>
                            </div>
                        </div>
                    </RdsOffcanvas>

                    <RdsOffcanvas
                        canvasTitle={t("Lock")}
                        placement="end"
                        offId="lock-off"
                        backDrop={true}
                        scrolling={false}
                        preventEscapeKey={false}
                    >
                        <div className="row">
                            <div className="col-md-5">
                                <div className="form-group">
                                    <>
                                        <RdsDatePicker
                                            onDatePicker={handlerLockoutEndDateData}
                                            DatePickerLabel={t("Lockout End Date") || ""}
                                            type="withTime"
                                            isDropdownOpen={false}
                                            selectedDate={isLockoutEndData?.lockoutEnd}
                                        />
                                    </>
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
                                colorVariant="primary"
                                class="me-2"
                                onClick={() => handlerLockoutEndDate(isLockoutEndData)}
                            ></RdsButton>
                        </div>
                    </RdsOffcanvas>



                    <RdsOffcanvas
                        canvasTitle={t("Permission")}
                        placement="end"
                        offId="permission-off"
                        backDrop={true}
                        scrolling={false}
                        preventEscapeKey={false}
                    >
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <>
                                        <RdsCompPermissionTree
                                            permissions={userPermission}
                                            editedPermissions={handleEditedPermissions}
                                        ></RdsCompPermissionTree>
                                    </>
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
                                onClick={offcanvasClose}
                            ></RdsButton>
                            <RdsButton
                                label={t("AbpUi.Save") || ""}
                                type={"button"}
                                size="small"
                                databsdismiss="offcanvas"
                                databstoggle="offcanvas"
                                databstarget="#permission-off"
                                colorVariant="primary"
                                class="me-2"
                                onClick={handlerPermission}
                            ></RdsButton>
                        </div>
                    </RdsOffcanvas>

                    <RdsOffcanvas
                        canvasTitle={t("Two factor")}
                        placement="end"
                        offId="two-Factor-off"
                        backDrop={true}
                        scrolling={false}
                        preventEscapeKey={false}
                    >
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <>
                                        <RdsCheckbox
                                            label={t("AbpAccount.DisplayName:TwoFactorEnabled") || ""}
                                            onChange={(e: any) => { setIsEnabledData(e.target.checked); }}
                                            checked={isEnabledData?.twoFactorEnabled}
                                        ></RdsCheckbox>
                                    </>
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
                                colorVariant="primary"
                                class="me-2"
                                onClick={() => handleTwoFactorSubmit(isEnabledData)}
                            ></RdsButton>
                        </div>
                    </RdsOffcanvas>
                </div>
            </div>
        </div>
    );
};

export default Users;
