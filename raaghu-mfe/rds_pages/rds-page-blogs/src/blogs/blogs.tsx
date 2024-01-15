import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { RdsCompDatatable, RdsCompAlertPopup } from "../../../rds-components";
import {
    RdsInput,
    RdsButton,
    RdsOffcanvas,
    RdsCheckbox,
    RdsAlert,
    RdsNavtabs
} from "../../../rds-elements";
import {
    addBlogsData,
    editBlogsData,
    fetchBlogsData,
    deleteBlogsData,
    fetchFeaturesBlogs,
    putBlogsFeatures,
} from "../../../../libs/state-management/Blogs/blogs-slice";
import {
    useAppDispatch,
    useAppSelector,
} from "../../../../libs/state-management/hooks";

const Blogs = () => {
    const { t } = useTranslation();
    const [blogsData, setBlogsData] = useState<any>([]);
    const [skipCount, setSkipCount] = useState<number>(0);
    const [maxResultCount, setMaxResultCount] = useState<number>(10);
    const [totalRecords, setTotalRecords] = useState<number | null>(0);
    const [nameInput, setNameInput] = useState("");
    const [slugInput, setSlugInput] = useState("");
    const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
    const [nameInputReset, setNameInputReset] = useState(false);
    const [slugInputReset, setSlugInputReset] = useState(false);
    const [Alert, setAlert] = useState({ show: false, message: "", color: "" });
    const [tableDataRowid, setTableDataRowId] = useState("");
    const [blogsFeature, setBlogsFeature] = useState<any>([]);
    const [activeNavTabIdEdit, setActiveNavTabIdEdit] = useState("0");
    const [noOfData, setNoOfData] = useState(0);
    const [editBlogField, setEditBlogField] = useState({
        name: "",
        slug: "",
    });

    const tableHeaders = [
        {
            displayName: t("CmsKit.Name"),
            key: "name",
            datatype: "text",
            sortable: true,
        },
        {
            displayName: t("CmsKit.Slug"),
            key: "slug",
            datatype: "text",
            sortable: true,
        },
    ];

    const actions = [
        { id: "edit", displayName: t("AbpUi.Edit"), offId: "blogs-edit-off" },
        { id: "delete", displayName: t("AbpUi.Delete"), modalId: "blogs-delete-off" },
    ];
    const navtabsItems = [
        { label: t("Basics"), tablink: "#nav-home", id: "0" },
        { label: t("CmsKit.Features"), tablink: "#nav-profile", id: "1" },
    ];

    const Data = useAppSelector((state) => state.persistedReducer.blogs) as any;
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (Data?.blogs?.items) {
            setBlogsData(Data.blogs.items);
            setTotalRecords(Data?.blogs?.totalCount)
        }
    }, [Data.blogs]);
    useEffect(() => {
        if (Array.isArray(Data.blogsFeature)) {
            const tempFeature = Data.blogsFeature.map((curr: any) => {
                const featurename = curr.featureName.split(".")[1];
                return {
                    featureName:
                        featurename == "BlogPost"
                            ? "Quick Navigation Bar In Blog Posts"
                            : featurename,
                    isEnabled: curr.isEnabled,
                    id: curr.id,
                };
            });
            setBlogsFeature(tempFeature);
        }
    }, [Data.blogsFeature]);

    useEffect(() => {
        dispatch(fetchBlogsData({ skipCount: skipCount, maxResultCount: maxResultCount }) as any).then((res: any) => {
            setNoOfData(res?.payload?.totalCount);
        });
    }, [dispatch, skipCount, maxResultCount]);

    const handlerActionSelection = (rowData: any, actionId: any) => {
        setTableDataRowId(rowData.id);
        if (actionId === "edit") {
            setEditBlogField({ ...editBlogField, name: rowData.name, slug: rowData.slug });
            dispatch(fetchFeaturesBlogs(rowData.id) as any);
        }
    };

    const handlerCloseOffcanvas = () => {
        setNameInputReset(!nameInputReset);
        setSlugInputReset(!slugInputReset);
    }

    const addDataHandler = () => {
        dispatch(addBlogsData({ name: nameInput, slug: slugInput }) as any).then((res: any) => {
            if (res.type == "blogs/addBlogsData/rejected") {
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
                    message: t("Blog added Successfully"),
                    color: "success",
                });
            }
            dispatch(fetchBlogsData({ skipCount: skipCount, maxResultCount: maxResultCount }) as any).then((res: any) => {
                setNoOfData(res?.payload?.totalCount);
            });
        });
        handlerCloseOffcanvas();
        setActiveNavTabIdEdit("0");
    };

    const editDataHandler = (editBlogBody: any) => {
        const editBlog = {
            ...editBlogBody,
            name: editBlogBody.name,
            slug: editBlogBody.slug
        }
        setEditBlogField(editBlog);
        dispatch(editBlogsData({ id: tableDataRowid, requestBody: editBlog }) as any).then(
            (res: any) => {
                if (res.type == "blogs/editBlogsData/rejected") {
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
                        message: t("Blog updated Successfully"),
                        color: "success",
                    });
                }
                dispatch(fetchBlogsData({ skipCount: skipCount, maxResultCount: maxResultCount }) as any).then((res: any) => {
                    setNoOfData(res?.payload?.totalCount);
                });
            }
        );
        saveFeatureHandler();
        setActiveNavTabIdEdit("0");
    };

    const deleteHandler = () => {
        dispatch(deleteBlogsData(tableDataRowid) as any).then((res: any) => {
            if (res.type == "blogs/deleteBlogsData/rejected") {
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
                    message: t("Blogs deleted Successfully"),
                    color: "success",
                });
            }
            const skipCount1 = ((noOfData - 1) % 10 == 0) ? (noOfData - 11) : Math.floor(((noOfData - 1) / 10)) * 10;
            dispatch(fetchBlogsData({ skipCount: skipCount1, maxResultCount: maxResultCount }) as any).then((res: any) => {
                setNoOfData(res?.payload?.totalCount);
            });
        });
    };

    const handleEnabled = (checked: any, blog: any) => {
        const temp = blogsFeature.map((curr: any) => {
            if (curr.featureName == blog.featureName) {
                return {
                    ...curr,
                    isEnabled: checked,
                };
            } else {
                return curr;
            }
        });
        setBlogsFeature(temp);
    };

    const saveFeatureHandler = () => {
        blogsFeature.forEach((curr: any, index: number) => {
            if (curr.isEnabled != Data.blogsFeature[index].isEnabled) {
                const dto: any = {
                    featureName: Data.blogsFeature[index].featureName,
                    isEnabled: curr.isEnabled,
                };
                dispatch(putBlogsFeatures({ id: tableDataRowid, dto: dto }) as any);
            }
        });
    };
    useEffect(() => {
        const timer = setTimeout(() => {
            setAlert({ ...Alert, show: false });
        }, 2000);
        return () => clearTimeout(timer);
    }, [Data.blogs]);

    //paginationa handling
    const paginationHandler = (currentPage: number, recordsPP: number) => {
        const skipCount = recordsPP * (currentPage - 1);
        setSkipCount(skipCount);
        setMaxResultCount(recordsPP);
    };

    const onResetOffcanvas = () => {
        setNameInput("");
        setSlugInput("");
        handlerCloseOffcanvas();
        setActiveNavTabIdEdit("0");
    }
    return (
        <div className="container-fluid p-0 m-0">
            <div className="row">
                <div className="col-md-12">
                    <div className="card px-4 py-4 border-0 rounded-0 card-full-stretch">
                        <div className="row ">                           
                            <div className="col-md-12 d-flex mb-3 justify-content-end">
                                <RdsOffcanvas
                                    canvasTitle={t("CmsKit.NewBlog")}
                                    placement="end"
                                    offcanvasbutton={
                                        <div>
                                            <RdsButton
                                                icon="plus"
                                                label={t("CmsKit.NewBlog") || ""}
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
                                                onClick={() => {
                                                    setNameInput("");
                                                    setSlugInput("");
                                                }}
                                            ></RdsButton>
                                        </div>
                                    }
                                    backDrop={true}
                                    scrolling={false}
                                    preventEscapeKey={false}
                                    offId={"blog-add-off"}
                                    onClose={onResetOffcanvas}
                                >
                                    <div>
                                        <div className="pt-3">
                                            <RdsInput
                                                size="medium"
                                                inputType="text"
                                                placeholder={t("Enter Name") || ""}
                                                label={t("CmsKit.Name") || ""}
                                                labelPosition="top"
                                                id=""
                                                value={nameInput}
                                                required={true}
                                                onChange={(e: any) => {
                                                    setNameInput(e.target.value);
                                                    if (!slugManuallyEdited) {
                                                        setSlugInput(e.target.value);
                                                    }
                                                }}
                                                reset={nameInputReset}
                                            ></RdsInput>

                                            <RdsInput
                                                size="medium"
                                                inputType="text"
                                                placeholder={t("Enter Slug") || ""}
                                                label={t("CmsKit.Slug") || ""}
                                                labelPosition="top"
                                                id=""
                                                value={slugInput}
                                                required={true}
                                                onChange={(e: any) => {
                                                    setSlugInput(e.target.value);
                                                    setSlugManuallyEdited(true);
                                                }}
                                                reset={slugInputReset}
                                            ></RdsInput>
                                            <div className="d-flex pb-3 flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row footer-buttons gap-2">
                                                <RdsButton
                                                    label={t("AbpUi.Cancel") || ""}
                                                    databsdismiss="offcanvas"
                                                    type={"button"}
                                                    size="small"
                                                    isOutline={true}
                                                    colorVariant="primary"
                                                    class="me-2"
                                                    onClick={() => {
                                                        setNameInput("");
                                                        setSlugInput("");
                                                        onResetOffcanvas();
                                                    }}
                                                ></RdsButton>
                                                <RdsButton
                                                    label={t("AbpUi.Save") || ""}
                                                    type={"button"}
                                                    size="small"
                                                    databsdismiss="offcanvas"
                                                    isDisabled={!nameInput && !slugInput}
                                                    colorVariant="primary"
                                                    class="me-2"
                                                    showLoadingSpinner={true}
                                                    onClick={addDataHandler}
                                                ></RdsButton>
                                            </div>
                                        </div>
                                    </div>
                                </RdsOffcanvas>
                            </div>
                        </div>
                        <RdsCompDatatable
                            actionPosition="right"
                            tableHeaders={tableHeaders}
                            actions={actions}
                            tableData={blogsData}
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
                            offId="blogs-edit-off"
                            placement="end"
                            canvasTitle={t("Edit Blog")}
                            onClose={onResetOffcanvas}
                        >
                            <RdsNavtabs
                                navtabsItems={navtabsItems}
                                activeNavTabId={activeNavTabIdEdit}
                                type="tabs"
                                activeNavtabOrder={activeNavTabIdEdit =>
                                    setActiveNavTabIdEdit(activeNavTabIdEdit)
                                }
                            />
                            <div className="mt-3">
                                {activeNavTabIdEdit == "0" && (<>
                                    <RdsInput
                                        size="medium"
                                        inputType="text"
                                        placeholder={t("Enter Name") || ""}
                                        label={t("CmsKit.Name") || ""}
                                        labelPosition="top"
                                        id=""
                                        value={editBlogField.name}
                                        required={true}
                                        onChange={(e: any) => {
                                            setEditBlogField({ ...editBlogField, name: e.target.value });
                                        }}
                                    ></RdsInput>
                                    <RdsInput
                                        size="medium"
                                        inputType="text"
                                        placeholder={t("Enter Slug") || ""}
                                        label={t("CmsKit.Slug") || ""}
                                        labelPosition="top"
                                        id=""
                                        value={editBlogField.slug}
                                        required={true}
                                        onChange={(e: any) => {
                                            setEditBlogField({ ...editBlogField, slug: e.target.value });
                                        }}
                                    ></RdsInput>
                                </>)}
                                {activeNavTabIdEdit == "1" && (<>
                                    {blogsFeature.map((curr: any) => {
                                        return (
                                            <div className="mb-3" key={curr?.id}>
                                                <RdsCheckbox
                                                    id="0"
                                                    label={t(curr.featureName)}
                                                    checked={curr.isEnabled}
                                                    onChange={(e: any) => {
                                                        handleEnabled(e.target.checked, curr);
                                                    }}
                                                ></RdsCheckbox>{" "}
                                            </div>
                                        );
                                    })}
                                </>)
                                }
                                <div className="d-flex pb-3 flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row footer-buttons gap-2">
                                    <RdsButton
                                        label={t("AbpUi.Cancel") || ""}
                                        databsdismiss="offcanvas"
                                        type={"button"}
                                        size="small"
                                        isOutline={true}
                                        colorVariant="primary"
                                        class="me-2"
                                        onClick={onResetOffcanvas}
                                    ></RdsButton>
                                    <RdsButton
                                        label={t("AbpUi.Save") || ""}
                                        type={"button"}
                                        size="small"
                                        databsdismiss="offcanvas"
                                        isDisabled={!editBlogField}
                                        colorVariant="primary"
                                        class="me-2"
                                        showLoadingSpinner={true}
                                        onClick={() => editDataHandler(editBlogField)}
                                    ></RdsButton>
                                </div>
                            </div>
                        </RdsOffcanvas>

                        <RdsCompAlertPopup
                            alertID="blogs-delete-off"
                            messageAlert={t("The selected Resource will be Deleted Permanently") || ""}
                            alertConfirmation={t("AbpUi.AreYouSure") || ""}
                            deleteButtonLabel={t("AbpUi.Yes") || ""}
                            onSuccess={deleteHandler}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blogs;
