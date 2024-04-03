import React, { useState, useEffect } from "react";
import {
    RdsButton,
    RdsInput,
    RdsAlert,
    RdsOffcanvas,
    RdsTextArea,
} from "../../../../../raaghu-elements/src";
import {
    useAppDispatch,
    useAppSelector,
} from "../../../../libs/state-management/hooks";
import {
    clearCache,
    createNewBlog,
    deleteBlog,
    getAllBlogs,
    getBlogById,
    updateBlog,
} from "../../../../libs/state-management/blogger/blogger-slice";
import { RdsCompAlertPopup, RdsCompDatatable } from "../../../rds-components";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";

const Blogger = () => {
    const { t } = useTranslation();
    const [recordsPerPage, setRecordsPerPage] = useState<number>(10);
    const [Alert, setAlert] = useState({ show: false, message: "", color: "" });
    const [tableData, setTableData] = useState([]);
    const [canvasTitle, setCanvasTitle] = useState(t("New Blog"));
    const [blogObj, setBlogObj] = useState({
        name: "",
        shortName: "",
        description: "",
        concurrencyStamp: "",
    });
    const [blogId, setBlogId] = useState("");
    const [inputReset, setInputReset] = useState(false)

    const tableHeaders = [
        {
            displayName: t("Blogging.Name"),
            key: "name",
            datatype: "text",
            dataLength: 30,
            required: true,
            sortable: true,
        },
        {
            displayName: t("Blogging.ShortName"),
            key: "shortName",
            datatype: "text",
            dataLength: 30,
            required: true,
            sortable: true,
        },
        {
            displayName: t("Blogging.Description"),
            key: "description",
            datatype: "tooltip",
            dataLength: 30,
            required: true,
            sortable: true,
        },
        {
            displayName: t("Blogging.CreationTime"),
            key: "creationTime",
            datatype: "text",
            dataLength: 30,
            required: true,
            sortable: true,
        },
    ];
    const actions = [
        { id: "edit", displayName: t("AbpUi.Edit"), offId: "blogger-edit-off" },
        { id: "delete", displayName: t("AbpUi.Delete"), modalId: "blogger-delete-off" },
        {
            id: "clearCache",
            displayName: t("Blogging.ClearCache"),
            modalId: "blogger-clear-off",
        },
    ];

    // dispatch and selectores for API calling ===============
    const dispatch = useAppDispatch();
    const blogs = useAppSelector((state) => state.persistedReducer.blogger);

    // Use Effects ==================
    useEffect(() => {
        dispatch(getAllBlogs());
    }, [dispatch]);

    const isShortNameValid = (password: any) => {
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
    const isFormValid =
        isShortNameValid(blogObj.shortName) && isNameValid(blogObj.name);
    // Get all alogs API
    useEffect(() => {
        if (blogs?.allblogs?.items) {
            const allData = blogs.allblogs.items.map((blog: any) => ({
                id: blog.id,
                name: blog.name,
                shortName: blog.shortName,
                description: blog.description,
                creationTime: format(
                    new Date(blog.creationTime),
                    "yyyy/dd/MM, HH:MM a"
                ),
                concurrencyStamp: blog.concurrencyStamp.toString(),
            }));
            setTableData(allData);
        }
    }, [blogs?.allblogs]);

    // Get selected blog API
    useEffect(() => {
        if (blogs?.blog) {
            setBlogObj({
                name: blogs.blog.name,
                shortName: blogs.blog.shortName,
                description: blogs.blog.description,
                concurrencyStamp: blogs.blog.concurrencyStamp,
            });
        }
    }, [blogs?.blog]);

    // Functions ================
    function createBlogFn(event: any) {
        setBlogObj({
            name: "",
            shortName: "",
            description: "",
            concurrencyStamp: "",
        });
        setCanvasTitle(t("New Blog"));
    }

    // On action selection from data table
    function onActionSelection(data: any, actionId: any) {
        setBlogId(data.id);
        if (actionId === "edit") {
            setCanvasTitle(t("Edit Blog"));
            setBlogId(data.id);
            const item = { id: data.id };
            dispatch(getBlogById(item));
        }
    }

    // Save / Update blog
    function saveUpdateBlog(event: any) {
        event.preventDefault();
        if (canvasTitle === t("New Blog")) {
            const data = {
                data: {
                    name: blogObj.name,
                    shortName: blogObj.shortName,
                    description: blogObj.description,
                },
            };
            dispatch(createNewBlog(data)).then((res) => {
                if (res.type == "Blogs/Create/rejected") {
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
                        message: t("Blog created Succesfully"),
                        color: "success",
                    });
                }
                dispatch(getAllBlogs());
            });
        } else if (canvasTitle === t("Edit Blog")) {
            const data = {
                id: blogId,
                data: blogObj,
            };
            dispatch(updateBlog(data)).then((res) => {
                if (res.type == "Blogs/Update/rejected") {
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
                        message: t("Blog updated Succesfully"),
                        color: "success",
                    });
                }
                dispatch(getAllBlogs());
            });
        }
        setBlogObj({
            name: "",
            shortName: "",
            description: "",
            concurrencyStamp: "",
        });
        setBlogId("");
        setCanvasTitle("");
        setInputReset(!inputReset)
    }

    // Delete blog confirmation popup
    function confirmDelete() {
        const item = { id: blogId };
        dispatch(deleteBlog(item)).then((res) => {
            if (res.type == "Blogs/Delete/rejected") {
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
                    message: t("Blog deleted Succesfully"),
                    color: "success",
                });
            }
            dispatch(getAllBlogs());
        });
    }

    // Clear Cache
    function clearCacheFn() {
        const item = { id: blogId };
        dispatch(clearCache(item)).then((res) => {
            if (res.type == "Blogs/ClearCache/rejected") {
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
                    message: t("Cache cleared Succesfully"),
                    color: "success",
                });
            }
            dispatch(getAllBlogs());
        });
    }
    useEffect(() => {
        // Set a 3-second timer to update the state
        const timer = setTimeout(() => {
            setAlert({ ...Alert, show: false });
        }, 3000);

        // Clean up the timer when the component unmounts or when the state changes
        return () => clearTimeout(timer);
    }, [blogs?.allblogs]);

    //paginationa handling

    const paginationHandler = (currentPage: number, recordsPP: number) => {
        const skipCount = recordsPP * (currentPage - 1);
        if (recordsPP !== recordsPerPage) {
            setRecordsPerPage(recordsPP);
        }
    };
    // DOM
    return (
        <>
            <div className="container-fluid p-0 m-0">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card px-4 py-4 border-0 rounded-0 card-full-stretch">
                            <div className="row ">                               
                                <div className="col-md-12 mb-3 d-flex justify-content-end ">
                                    <RdsOffcanvas
                                        canvasTitle={canvasTitle || ""}
                                        placement="end"
                                        onClose={(event) => {
                                            setBlogObj({
                                                name: "",
                                                shortName: "",
                                                description: "",
                                                concurrencyStamp: "",
                                            })
                                            setInputReset(!inputReset)
                                        }
                                        }
                                        offcanvasbutton={
                                            <div className="d-flex justify-content-end">
                                                <RdsButton
                                                    icon="plus"
                                                    label={t("New Blog") || ""}
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
                                                    onClick={createBlogFn}
                                                ></RdsButton>
                                            </div>
                                        }
                                        backDrop={true}
                                        scrolling={false}
                                        preventEscapeKey={false}
                                        offId={"blogger-edit-off"}
                                    >
                                        <form>
                                            <div className="form-group">
                                                <RdsInput
                                                    fontWeight="normal"
                                                    reset={inputReset}
                                                    inputType="text"
                                                    required={true}
                                                    label={t("Blogging.Name") || ""}
                                                    value={blogObj.name}
                                                    placeholder={t("Enter Name") || ""}
                                                    onChange={(event) =>
                                                        setBlogObj({ ...blogObj, name: event.target.value })
                                                    }
                                                ></RdsInput>
                                            </div>
                                            <div className="form-group">
                                                <RdsInput
                                                    fontWeight="normal"
                                                    reset={inputReset}
                                                    inputType="text"
                                                    required={true}
                                                    label={t("Blogging.ShortName") || ""}
                                                    value={blogObj.shortName}
                                                    placeholder={t("Enter Short Name") || ""}
                                                    onChange={(event) =>
                                                        setBlogObj({
                                                            ...blogObj,
                                                            shortName: event.target.value,
                                                        })
                                                    }
                                                ></RdsInput>
                                            </div>
                                            <div className="form-group mb-3">
                                                <RdsTextArea
                                                    placeholder={t("Enter Description") || ""}
                                                    label={t("Blogging.Description") || ""}
                                                    rows={4}
                                                    value={blogObj.description}
                                                    onChange={(event) =>
                                                        setBlogObj({
                                                            ...blogObj,
                                                            description: event.target.value,
                                                        })
                                                    }
                                                ></RdsTextArea>
                                            </div>
                                            <div className="footer-buttons gap-2 pb-3 d-flex flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row">
                                                <RdsButton
                                                    class="me-2"
                                                    tooltipTitle={""}
                                                    type={"button"}
                                                    label={t("AbpUi.Cancel") || ""}
                                                    colorVariant="outline-primary"
                                                    size="small"
                                                    databsdismiss="offcanvas"
                                                    onClick={() => {
                                                        setInputReset(!inputReset)
                                                        setBlogObj({
                                                            name: "",
                                                            shortName: "",
                                                            description: "",
                                                            concurrencyStamp: "",
                                                        })
                                                    }
                                                    }
                                                ></RdsButton>
                                                <RdsButton
                                                    class="me-2"
                                                    label={
                                                        canvasTitle === t("New Blog") ? t("AbpUi.Save") || "" : t("Update") || ""
                                                    }
                                                    size="small"
                                                    isDisabled={!isFormValid}
                                                    colorVariant="primary"
                                                    tooltipTitle={""}
                                                    type={"submit"}
                                                    databsdismiss="offcanvas"
                                                    showLoadingSpinner={true}
                                                    onClick={(event) => saveUpdateBlog(event)}
                                                ></RdsButton>
                                            </div>
                                        </form>
                                    </RdsOffcanvas>
                                </div>
                            </div>
                            <RdsCompDatatable
                                actionPosition="right"
                                tableHeaders={tableHeaders}
                                tableData={tableData}
                                actions={actions}
                                onActionSelection={onActionSelection}
                                classes="table"
                                recordsPerPageSelectListOption={true}
                                noDataheaderTitle={t("No Records Available") || ""}
                                noDataTitle={t("Click on the button to add") || ""}
                                illustration={true}
                                pagination={false}
                                recordsPerPage={recordsPerPage}
                                onPaginationHandler={paginationHandler}
                            ></RdsCompDatatable>
                            <div className="offset-md-4 col-md-4 mt-3 col-12 position-absolute bottom-0 mb-3 position-lg-relative custom-responsive-alert">
                                {Alert.show && (
                                    <RdsAlert
                                        alertmessage={Alert.message}
                                        size="small"
                                        colorVariant={Alert.color}
                                    ></RdsAlert>
                                )}                                
                            </div>
                            <RdsCompAlertPopup
                                alertID="blogger-delete-off"
                                onSuccess={confirmDelete}
                                deleteButtonColor="danger"
                                cancelButtonColor="danger"
                            />
                            <RdsCompAlertPopup
                                alertID="blogger-clear-off"
                                onSuccess={clearCacheFn}
                                deleteButtonLabel={t("Blogging.ClearCache") || ""}
                                alertConfirmation={t("Blogging.ClearCacheConfirmationMessage") || ""}
                                messageAlert={t("Cache will be cleared") || ""}
                                iconUrl={""}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Blogger;
