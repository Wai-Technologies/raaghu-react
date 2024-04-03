import React, { useEffect, useState } from "react";
import {
    RdsCompNewClaimType,
    RdsCompDatatable,
    RdsCompAlertPopup,
} from "../../../rds-components";
import {
    RdsOffcanvas,
    RdsButton,
    RdsAlert,
} from "../../../rds-elements";
import { useTranslation } from "react-i18next";
import {
    useAppSelector,
    useAppDispatch,
} from "../../../../libs/state-management/hooks";

import {
    isgrantedpolicies
} from "../../../../../raaghu-react-core/src/index";
import { deleteClaimTypesRequest, getClaimTypes1Request, getClaimTypesRequest, postClaimTypesRequest, putClaimTypesRequest } from "../../../../libs/state-management/public.api";

const ClaimType = () => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const configData = useAppSelector((state) => state.persistedReducer?.configureStore?.configuration?.auth?.grantedPolicies || {});
    const claimTypesUser = useAppSelector(
        (state) => state.persistedReducer?.claimTypes?.getClaimTypes
    );
    const claimTypesEdit = useAppSelector(
        (state) => state.persistedReducer?.claimTypes?.getClaimTypes1
    );

    //useState Hook;
    const [crudPermission, setCrudPermission] = useState<any>({ create: true })
    const [actions, setActions] = useState<any>([])
    const [skipCount, setSkipCount] = useState<number>(0);
    const [totalRecords, setTotalRecords] = useState<number | null>(0);
    const [tableDataRowid, setTableDataRowId] = useState<string>("");
    const [maxResultCount, setMaxResultCount] = useState<number>(10);
    const [Alert, setAlert] = useState({ show: false, message: "", color: "" });
    const [editClaimData, setEditClaimData] = useState<any>({});
    const [claimsData, setClaimsData] = useState<any>({
        name: "",
        required: false,
        isStatic: false,
        regex: "",
        regexDescription: "",
        description: "",
        valueType: "",
        valueTypeAsString: "",
    });
    const [claimTypesId, setClaimTypesId] = useState("");
    const [inputReset, setInputReset] = useState(false)
    const [Data, setData] = useState<any>([]);

    //useEffect Hook
    useEffect(() => {
        const createPermission = isgrantedpolicies(
            "AbpIdentity.ClaimTypes.Create",
            configData
          );
          // Check if the value actually changed before updating the state
          if (createPermission !== crudPermission.create) {
            setCrudPermission((prevPagePermission: any) => ({
              ...prevPagePermission,
              create: createPermission,
            }));
        }

        const IsEdit = isgrantedpolicies('AbpIdentity.ClaimTypes.Update', configData);
        const IsDelete = isgrantedpolicies("AbpIdentity.ClaimTypes.Delete", configData);
        let resultArray = [];

        if (IsEdit) {
            resultArray.push({ id: "editClaim", displayName: t("AbpUi.Edit"), offId: "claimType-edit-off" });
        }

        if (IsDelete) {
            resultArray.push({ id: "delete", displayName: t("AbpUi.Delete"), modalId: "claimType-delete-off" });
        }
        if (!arraysAreEqual(actions, resultArray)) {
            setActions(resultArray);
        }
    }, [configData, crudPermission.create,t,actions]);

    const arraysAreEqual = (arr1: any, arr2: any) => {
        return JSON.stringify(arr1) === JSON.stringify(arr2);
   };

    useEffect(() => {

        if (claimTypesEdit) {
            const tempData = { ...claimTypesEdit };
            setEditClaimData(tempData);
        }
        else {
            setEditClaimData("")
        }
    }, [claimTypesEdit]);

    useEffect(() => {
        dispatch(getClaimTypesRequest({ skipCount: skipCount, maxResultCount: maxResultCount }) as any);
    }, [dispatch, skipCount, maxResultCount]);

    useEffect(() => {

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
        if (claimTypesUser?.items) {
            const tempData = claimTypesUser?.items.map((item: any) => {

                return {
                    id: item.id,
                    name: item.name,
                    valueType: item.valueTypeAsString,
                    description: item.description,
                    regex: item.regex,
                    static: item.static ? tickIcon : closeIcon,
                    required: item.required ? tickIcon : closeIcon,

                };
            });
            setData(tempData);
            setTotalRecords(claimTypesUser?.totalCount);

        }
    }, [claimTypesUser]);

    const onActionSelection = (rowData: any, actionId: any) => {
        setTableDataRowId(rowData.id);
        if (actionId === "editClaim") {
            const tempApplicationId = String(rowData.id);
            setClaimTypesId(tempApplicationId);

            dispatch(getClaimTypes1Request({id:tempApplicationId}) as any);
        }
    };

    const DeleteHandler = (e: any) => {
        dispatch(deleteClaimTypesRequest({id:tableDataRowid}) as any).then((res: any) => {
            if (res.type == "claimtype/deleteClaimTypesRequest/rejected") {
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
                    message: t("Claim Type deleted Successfully"),
                    color: "success",
                });
            }
            dispatch(getClaimTypesRequest({ skipCount: skipCount, maxResultCount: maxResultCount }) as any);
            if (Data.length === 1 && skipCount > 0) {
                setSkipCount(0)
            }
        });
    };

    const tableHeaders = [
        {
            displayName: t("AbpIdentity.Name"),
            key: "name",
            datatype: "text",
        },
        {
            displayName: t("AbpIdentity.ValueType"),
            key: "valueType",
            datatype: "text",
        },
        {
            displayName: t("AbpIdentity.Description"),
            key: "description",
            datatype: "tooltip",
            dataLength: 20,
        },
        {
            displayName: t("AbpIdentity.Regex"),
            key: "regex",
            datatype: "text",
        },
        {
            displayName: t("AbpIdentity.Required"),
            key: "required",
            datatype: "iconAvatarTitle",
        },
        {
            displayName: t("AbpIdentity.DisplayName:IsStatic"),
            key: "static",
            datatype: "iconAvatarTitle",
        },
    ];

    const submitHandler = (data: any) => {
        dispatch(postClaimTypesRequest({requestBody:data}) as any).then((res: any) => {
            if (res.type == "claimTypes/addClaimTypesData/rejected") {
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
                    message: t("Claim Type added Successfully   "),
                    color: "success",
                });
            }
            dispatch(getClaimTypesRequest({ skipCount: skipCount, maxResultCount: maxResultCount }) as any);
        });
        handleClearValue()

    };
    const valueType = [
        { option: "String", value: 0 },
        { option: "Int", value: 1 },
        { option: "Boolean", value: 2 },
        { option: "DateTime", value: 3 },
    ];

    const onEditHandler = (editClaimData: any) => {

        const dTo = {
            id: claimTypesId,
            claimTypeDto: editClaimData,
        };
        dispatch(
            putClaimTypesRequest(dTo) as any
        ).then((res: any) => {
            if (res.type == "claimtype/putClaimTypesRequest/rejected") {
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
                    message: t("Claim Type edited Successfully"),
                    color: "success",
                });
            }
            dispatch(getClaimTypesRequest({ skipCount: skipCount, maxResultCount: maxResultCount }) as any);
        });
    };
    useEffect(() => {
        // Set a 3-second timer to update the state
        const timer = setTimeout(() => {
            setAlert({ ...Alert, show: false });
        }, 2000);

        // Clean up the timer when the component unmounts or when the state changes
        return () => clearTimeout(timer);
    }, [claimTypesUser]);


    const handleClearValue = () => {
        setClaimsData({
            name: "",
            required: false,
            isStatic: false,
            regex: "",
            regexDescription: "",
            description: "",
            valueType: "",
            valueTypeAsString: "",
        });
        setInputReset(!inputReset)
    };

    const handleCancelValue = () => {
        setEditClaimData({
            name: "",
            required: false,
            isStatic: false,
            regex: "",
            regexDescription: "",
            description: "",
            valueType: "",
            valueTypeAsString: "",
        })
        setInputReset(!inputReset)
    }


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
                            <div className="col-md-12 mb-3 d-flex justify-content-end ">
                                {crudPermission.create && <RdsOffcanvas
                                    canvasTitle={t("AbpIdentity.NewClaimType")}
                                    placement="end"
                                    offcanvasbutton={
                                        <div className="d-flex justify-content-end">
                                            <RdsButton
                                                icon="plus"
                                                label={t("AbpIdentity.NewClaimType") || ""}
                                                iconColorVariant="light"
                                                iconHeight="15px"
                                                iconWidth="15px"
                                                iconFill={false}
                                                iconStroke={true}
                                                block={false}
                                                size="small"
                                                type="button"
                                                showLoadingSpinner={true}
                                                colorVariant="primary"
                                                onClick={handleClearValue}
                                            ></RdsButton>
                                        </div>
                                    }
                                    backDrop={true}
                                    scrolling={false}
                                    preventEscapeKey={false}
                                    offId={"claimType-add-off"}
                                    onClose={() => {
                                        setInputReset(!inputReset)
                                    }}
                                >
                                    <RdsCompNewClaimType
                                        claimsData={claimsData}
                                        valueType={valueType}
                                        onSubmit={submitHandler}
                                        reset={inputReset}
                                        onCancel={() => { handleClearValue() }}
                                    ></RdsCompNewClaimType>
                                </RdsOffcanvas>}
                            </div>
                        </div>
                        <RdsCompDatatable
                            actionPosition="right"
                            tableHeaders={tableHeaders}
                            actions={actions}
                            tableData={Data!}
                            recordsPerPageSelectListOption={true}
                            onActionSelection={onActionSelection}
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
                        <RdsCompAlertPopup
                            alertID="claimType-delete-off"
                            onSuccess={DeleteHandler}
                        />
                        <RdsOffcanvas
                            canvasTitle={t("Edit Claim Type")}
                            placement="end"
                            offId="claimType-edit-off"

                            backDrop={true}
                            scrolling={false}
                            preventEscapeKey={false}
                        >
                            <RdsCompNewClaimType
                                claimsData={editClaimData}
                                valueType={valueType}
                                onSubmit={onEditHandler}
                                onCancel={handleCancelValue}
                            ></RdsCompNewClaimType>
                        </RdsOffcanvas>
                    </div>


                </div>
            </div>
        </div>







    );
};

export default ClaimType;
