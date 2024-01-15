import React, { useState, useEffect } from "react";
import { RdsCompBlogPostNew, RdsCompDatatable, RdsCompAlertPopup } from "../../../rds-components";
import { RdsButton, RdsSearch } from "../../../../../raaghu-elements/src";
import { useTranslation } from "react-i18next";
import { RdsOffcanvas, RdsAlert } from "../../../rds-elements";
import { addBlogPostData, getBlogsBlogPosts1, editBlogPostData, getAllBlogPost, deleteBlogPosts, postBlogsPostsCreateAndSendToReview, postBlogPostsDraft, postBlogPostsPublish } from "../../../../libs/state-management/public.api";
import {
    useAppDispatch,
    useAppSelector,
} from "../../../../libs/state-management/hooks";

const BlogPost = () => {
    const blogListData = useAppSelector((state) => state.persistedReducer.blogPost?.blogPost?.items) as any;
    const BlogPostData = useAppSelector((state) => state.persistedReducer.blogPost) as any;
    const [tableDataRowid, setTableDataRowId] = useState("");
    const [Alert, setAlert] = useState({ show: false, message: "", color: "" });
    const [inputReset, setInputReset] = useState(false);
    const [blogPostList, setBlogPostList] = useState(BlogPostData?.allBlogPosts?.items);
    const [blogPostData, setBlogPostData] = useState<any>({
        blogId: null,
        title: "",
        slug: "",
        shortDescription: "",
        content: "",
        coverImageMediaId: "",
    });
    const [blogPostDataEdit, setBlogPostDataEdit] = useState<any>({
        blogId: null,
        title: "",
        slug: "",
        shortDescription: "",
        content: "",
        coverImageMediaId: "",
        concurrencyStamp: ""
    });

    const [blogList, setBlogList] = useState(blogListData);
    const [skipCount, setSkipCount] = useState<number>(0);
    const [maxResultCount, setMaxResultCount] = useState<number>(10);
    const [totalRecords, setTotalRecords] = useState<number | null>(0);

    useEffect(() => {
        const tempBlogPost = BlogPostData?.allBlogPosts?.items?.map((ele: any) => ({
            "blogId": ele.blogId,
            "blogName": ele.blogName,
            "title": ele.title,
            "slug": ele.slug,
            "shortDescription": ele.shortDescription,
            "content": ele.content,
            "coverImageMediaId": ele.coverImageMediaId,
            "creationTime": ele.creationTime,
            "lastModificationTime": ele.lastModificationTime,
            "status": ele.status == 1 ? "Published" : "Draft",
            "id": ele.id,
            "rowActions": ele.status == 1 ? { id: "draft", displayName: t("CmsKit.Draft"), modalId: "draft" } : { id: "publish", displayName: t("CmsKit.Publish"), modalId: "publish" },

        }));
        setBlogPostList(tempBlogPost);
        setTotalRecords(BlogPostData?.allBlogPosts?.totalCount);
    }, [BlogPostData?.allBlogPosts?.items]);

    useEffect(() => {
        setBlogPostDataEdit(BlogPostData?.blogPost);
    }, [BlogPostData?.blogPost]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setAlert({ ...Alert, show: false });
        }, 3000);
        return () => clearTimeout(timer);
    }, BlogPostData?.allBlogPosts?.items);

    useEffect(() => {
        const tempBlogs = blogListData?.map((blog: any) => ({
            label: blog.name,
            val: blog.id
        }));
        setBlogList(tempBlogs);
    }, [blogListData]);

    const { t } = useTranslation();

    const tableHeaders = [
        {
            displayName: t("CmsKit.Blog"),
            key: "blogName",
            datatype: "text",
            sortable: true,
        },
        {
            displayName: t("CmsKit.Title"),
            key: "title",
            datatype: "text",
            sortable: true,
        },
        {
            displayName: t("CmsKit.Slug"),
            key: "slug",
            datatype: "text",
            sortable: true,
        },
        {
            displayName: t("CmsKit.CreationTime"),
            key: "creationTime",
            datatype: "text",
            sortable: true,
        },

        {
            displayName: t("CmsKit.Status"),
            key: "status",
            datatype: "text",
            sortable: true,
        },
    ];


    const actions = [
        { id: "edit", displayName: t("AbpUi.Edit"), offId: "blogsPost-edit-off" },
        { id: "delete", displayName: t("AbpUi.Delete"), modalId: "blogsPost_delete_off" },
    ];


    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAllBlogPost({ skipCount: skipCount, maxResultCount: maxResultCount }) as any);
    }, [dispatch, skipCount, maxResultCount]);


    function createNewCanvasFn(event: any) {
        event.preventDefault();
        setBlogPostData({
            blogId: null,
            title: "",
            slug: "",
            shortDescription: "",
            content: "",
            coverImageMediaId: "",
        });
    }


    const handlerCloseOffcanvas = () => {
        setBlogPostData({
            blogId: null,
            title: "",
            slug: "",
            shortDescription: "",
            content: "",
            coverImageMediaId: "",
        });
        setBlogPostDataEdit({
            blogId: null,
            title: "",
            slug: "",
            shortDescription: "",
            content: "",
            coverImageMediaId: "",
            concurrencyStamp: ""
        });
        setInputReset(!inputReset);
    };

    const postPublishHandler = (data: any) => {
        dispatch(addBlogPostData(data) as any).then((res: any) => {
            if (res.type == "blogPost/addBlogPostData/fulfilled") {
                setAlert({
                    ...Alert,
                    show: true,
                    message: t("Blog Post added Successfully"),
                    color: "success",
                });
            } else {
                setAlert({
                    ...Alert,
                    show: true,
                    message: t("Your request has been denied"),
                    color: "danger",
                });
            }
            dispatch(getAllBlogPost({ skipCount: skipCount, maxResultCount: maxResultCount }) as any);
        });
        handlerCloseOffcanvas();

    };
    const postDraftHandler = (data: any) => {
        dispatch(postBlogsPostsCreateAndSendToReview(data) as any).then((res: any) => {
            dispatch(getAllBlogPost({ skipCount: skipCount, maxResultCount: maxResultCount }) as any);
        });
        handlerCloseOffcanvas();

    };
    const handlerEditPost = (data: any) => {
        dispatch(editBlogPostData({ id: tableDataRowid, postTypeDto: data }) as any).then((res: any) => {
            if (res.type == "blogPost/editBlogPostData/fulfilled") {
                setAlert({
                    ...Alert,
                    show: true,
                    message: t("Blog Post Edited Successfully"),
                    color: "success",
                });
            } else {
                setAlert({
                    ...Alert,
                    show: true,
                    message: t("Your request has been denied"),
                    color: "danger",
                });
            }
            dispatch(getAllBlogPost({ skipCount: skipCount, maxResultCount: maxResultCount }) as any);
        });
        handlerCloseOffcanvas();

    };
    const handlerActionSelection = (rowData: any, actionId: any) => {
        setTableDataRowId(rowData.id);
        if (actionId === "edit") {
            dispatch(getBlogsBlogPosts1(rowData.id) as any);
        }

    };
    const deleteHandler = () => {
        dispatch(deleteBlogPosts({ id: tableDataRowid }) as any).then((res: any) => {
            if (res.type == "blogPost/deleteBlogPosts/fulfilled") {
                setAlert({
                    ...Alert,
                    show: true,
                    message: t("Blog Post Deleted Successfully"),
                    color: "success",
                });
            } else {
                setAlert({
                    ...Alert,
                    show: true,
                    message: t("Your request has been denied"),
                    color: "danger",
                });
            }
            dispatch(getAllBlogPost({ skipCount: skipCount, maxResultCount: maxResultCount }) as any);
        });
    };
    const handlerPublish = () => {
        dispatch(postBlogPostsPublish({ id: tableDataRowid }) as any).then((res: any) => {
            if (res.type == "blogPost/postBlogPostsPublish/fulfilled") {
                setAlert({
                    ...Alert,
                    show: true,
                    message: t("Blog Post Published Successfully"),
                    color: "success",
                });
            } else {
                setAlert({
                    ...Alert,
                    show: true,
                    message: t("Your request has been denied"),
                    color: "danger",
                });
            }
            dispatch(getAllBlogPost({ skipCount: skipCount, maxResultCount: maxResultCount }) as any);
        });
    };
    const handlerDraft = () => {
        dispatch(postBlogPostsDraft({ id: tableDataRowid }) as any).then((res: any) => {
            if (res.type == "blogPost/postBlogPostsDraft/fulfilled") {
                setAlert({
                    ...Alert,
                    show: true,
                    message: t("Blog Post drafted Successfully"),
                    color: "success",
                });
            } else {
                setAlert({
                    ...Alert,
                    show: true,
                    message: t("Your request has been denied"),
                    color: "danger",
                });
            }
            dispatch(getAllBlogPost({ skipCount: skipCount, maxResultCount: maxResultCount }) as any);
        });
    };

    const paginationHandler = (currentPage: number, recordsPP: number) => {
        const skipCount = recordsPP * (currentPage - 1);
        setSkipCount(skipCount);
        setMaxResultCount(recordsPP);
    };

    return (
        <>
            <div className="container-fluid m-0 p-0">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card px-4 py-4 border-0 rounded-0 card-full-stretch">
                            <div className="row align-items-center">
                                <div className="col-xxl-3 col-xl-3 col-lg-3 col-12 mb-2">
                                    <RdsSearch
                                        placeholder={t("Search") || ""}
                                        size="small"
                                    />
                                </div>
                                <div className="col-xxl-9 col-xl-3 col-lg-3 col-12 mb-3 d-flex justify-content-xxl-end justify-content-xl-end justify-content-lg-end justify-content-md-end justify-content-start">
                                    <RdsOffcanvas
                                        canvasTitle={t("CmsKit.BlogPosts")}
                                        placement="end"
                                        offcanvasbutton={
                                            <div className="d-flex justify-content-end">
                                                <RdsButton
                                                    icon="plus"
                                                    label={t("CmsKit.NewBlogPost") || ""}
                                                    iconColorVariant="light"
                                                    iconHeight="15px"
                                                    iconWidth="15px"
                                                    iconFill={false}
                                                    iconStroke={true}
                                                    block={false}
                                                    size="small"
                                                    type="button"
                                                    colorVariant="primary"
                                                    showLoadingSpinner={true}
                                                ></RdsButton>
                                            </div>
                                        }
                                        backDrop={true}
                                        scrolling={false}
                                        preventEscapeKey={false}
                                        offId="blog-post-add-off"
                                        onClose={handlerCloseOffcanvas}
                                    >
                                        <div>
                                            <RdsCompBlogPostNew
                                                blogList={blogList}
                                                isEdit={false}
                                                offId="blog-post-add-off"
                                                reset={inputReset}
                                                blogPostData={blogPostData}
                                                onPublish={postPublishHandler}
                                                onDraft={postDraftHandler}
                                            />
                                        </div>
                                    </RdsOffcanvas>
                                    <RdsCompAlertPopup
                                        alertID="blogsPost_delete_off"
                                        messageAlert={t("The selected Resource will be Deleted Permanently") || ""}
                                        alertConfirmation={t("AbpUi.AreYouSure") || ""}
                                        deleteButtonLabel={t("AbpUi.Yes") || ""}
                                        onSuccess={deleteHandler} />
                                    <RdsCompAlertPopup
                                        alertID="publish"
                                        messageAlert={t("CmsKit.BlogPostPublishConfirmationMessage") || ""}
                                        alertConfirmation={t("AbpUi.AreYouSure") || ""}
                                        deleteButtonLabel={t("AbpUi.Yes") || ""}
                                        onSuccess={handlerPublish} />
                                    <RdsCompAlertPopup
                                        alertID="draft"
                                        messageAlert={t("CmsKit.BlogPostDraftConfirmationMessage") || ""}
                                        alertConfirmation={t("AbpUi.AreYouSure") || ""}
                                        deleteButtonLabel={t("AbpUi.Yes") || ""}
                                        onSuccess={handlerDraft} />

                                    <RdsOffcanvas
                                        canvasTitle={t("CmsKit.Edit")}
                                        placement="end"
                                        offId="blogsPost-edit-off"
                                        offcanvaswidth={650}
                                        backDrop={true}
                                        scrolling={false}
                                        preventEscapeKey={false}>

                                        <RdsCompBlogPostNew isEdit={true}
                                            offId="blog-post-add-off"
                                            blogList={blogList}
                                            blogPostData={blogPostDataEdit}
                                            onSubmit={handlerEditPost}
                                        />

                                        {/* <div className="footer-buttons flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row d-flex gap-2">
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
                                                databsdismiss="offcanvas"

                                            ></RdsButton>
                                        </div> */}
                                    </RdsOffcanvas>
                                </div>
                            </div>
                            <div className="container-fluid m-0 py-3">
                                {/* <div className="row">
                                    <div className="col-md-12">
                                        <div className="row">
                                            <div className="col-xxl-2 col-xl-2 col-lg-6 col-md-12 col-12 mb-3">
                                                <RdsDropdownList
                                                    borderDropdown
                                                    listItems={dropDownList}
                                                    placeholder="Select a Status"
                                                    id={"selectStatus"}
                                                />
                                            </div>
                                            <div className="col-xxl-10 col-xl-10 col-lg-6 col-md-12 col-12 mb-3">
                                                <RdsSearch
                                                    iconPosition="left"
                                                    placeholder={t("Search")||""}
                                                    size="small"    
                                                />
                                            </div>

                                        </div>
                                    </div>
                                </div> */}
                                <div className="row">
                                    <div className="col-md-12">
                                        <RdsCompDatatable
                                            actionPosition="right"
                                            tableHeaders={tableHeaders}
                                            actions={actions}
                                            noDataheaderTitle={t("No Records Available") || ""}
                                            noDataTitle={t("Click on the button to add") || ""}
                                            illustration={true}
                                            tableData={blogPostList}
                                            pagination={true}
                                            recordsPerPageSelectListOption={true}
                                            totalRecords={totalRecords}
                                            recordsPerPage={maxResultCount}
                                            onActionSelection={handlerActionSelection}
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
                                     </div>
                                    </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};
export default BlogPost;
