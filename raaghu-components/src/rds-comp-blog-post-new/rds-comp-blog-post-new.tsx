import React, { useEffect, useState } from "react";
import { RdsButton, RdsDropdownList, RdsInput, RdsLabel, RdsTextArea, RdsTextEditor } from "../rds-elements";
import { RdsFileUploader } from "../rds-elements";
import { useTranslation } from "react-i18next";


export interface RdsCompBlogPostNewProps {
    file?: any;
    title?: string;
    blog?: string;
    slug?: string;
    concurrentMode?: string
    description?: string;
    tag?: string;
    blogPostData?: any;
    onPublish?: any;
    onDraft?: any;
    onSubmit?: any;
    isEdit: boolean;
    reset?: boolean;
    blogList?: any;
    offId?: any
}

const RdsCompBlogPostNew = (props: RdsCompBlogPostNewProps) => {

    const [inputReset, setInputReset] = useState(props.reset);
    const [postData, setBlogPostData] = useState(props.blogPostData);
    const [blogList, setBlogList] = useState(props.blogList);
    const [selectBlogIndex, setSelectBlogIndex] = useState(0);
    useEffect(() => {
        setBlogList(props.blogList);
    }, [props.blogList]);

    useEffect(() => {
        setInputReset(props.reset);
    }, [props.reset]);


    useEffect(() => {

        setBlogPostData(props.blogPostData);
    }, [props.blogPostData]);

    useEffect(() => {
        setSelectBlogIndex(blogList?.findIndex((item: any) => item?.val === postData?.blog));
    }, [postData?.blogId]);

    const handlerblogDataChange = (val: any, Key: any) => {
        setBlogPostData({ ...postData, [Key]: val });
    };
    return (
        <>
            <div className="row align-items-center">
                <div className="col-md-12">
                    <form className='mb-0'>
                        <div className="from-group mb-3">
                            <RdsFileUploader
                                colorVariant="dark"
                                extensions=""
                                multiple={false}
                                size="small"
                                limit={0}
                                label="Cover Image"
                            />
                        </div>
                        <div className="form-group mb-3">
                                <RdsLabel
                                    label="Blog Id"
                                />

                            <RdsDropdownList
                                placeholder="Select List"
                                multiSelect={false}
                                borderDropdown={true}
                                listItems={blogList || []}
                                id={"postList"}
                                onClick={(e: any, val: any) => handlerblogDataChange(val, "blogId")}
                            />
                        </div>

                        <div className="form-group">
                            <RdsInput
                                inputType="text"
                                size="medium"
                                required={true}
                                isDisabled={false}
                                label="Title"
                                readonly={false}
                                value={postData?.title}
                                name="title"
                                placeholder="Enter Title"
                                onChange={(e: any) => handlerblogDataChange(e.target.value, "title")}
                                dataTestId='title'
                                reset={inputReset}
                            ></RdsInput>
                        </div>
                        <div className="form-group">
                            <RdsInput
                                inputType="text"
                                required={true}
                                label="Slug"
                                name="slug"
                                value={postData?.slug}
                                placeholder="Enter Slug"
                                dataTestId='slug'
                                onChange={(e: any) => handlerblogDataChange(e.target.value, "slug")}
                                reset={inputReset}
                            ></RdsInput>
                        </div>
                        {props.isEdit && <div className="form-group">
                            <RdsInput
                                inputType="text"
                                required={true}
                                label="Concurrency Stamp"
                                name="concurrentMode"
                                value={postData?.concurrencyStamp}
                                placeholder=""
                                onChange={(e: any) => handlerblogDataChange(e.target.value, "concurrencyStamp")}
                                dataTestId='concurrency-stamp'
                                reset={inputReset}
                            ></RdsInput>
                        </div>}
                        <div className="form-group mb-3">
                            <RdsTextArea
                                label="Short Description"
                                placeholder="Enter Description"
                                onChange={(e: any) => handlerblogDataChange(e.target.value, "shortDescription")}
                                value={postData?.description}
                                rows={3}
                                dataTestId='shord-desc'
                            />
                        </div>
                        <div className="form-group mb-2">
                            <RdsTextEditor value={postData?.content} onChange={(e: any) => handlerblogDataChange(e.target.value, "content")} />
                        </div>
                        <div className="form-group mb-5 mb-lg-0">
                            <RdsInput
                                inputType="text"
                                required={true}
                                label="Tags"
                                placeholder="Enter Tag"
                                dataTestId='tag'
                                reset={inputReset}
                            ></RdsInput>
                        </div>
                    </form>
                </div>
                <div className="footer-buttons pb-3 flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row justify-content-start d-flex gap-2" >
                    {!props.isEdit ? <>
                        <RdsButton
                            class="me-2"
                            tooltipTitle={""}
                            type={"button"}
                            label="Cancel"
                            colorVariant="outline-primary"
                            size="small"
                            databsdismiss="offcanvas"
                        ></RdsButton>
                        <RdsButton
                            class="me-2"
                            type="submit"
                            label="Save As Draft"
                            size="small"
                            isOutline={true}
                            colorVariant="primary"
                            databsdismiss="offcanvas"
                            databstoggle="offcanvas"
                            databstarget={`#${props?.offId}`}
                            dataTestId='save'
                            onClick={() => {
                                props.onDraft(postData);
                            }}
                        ></RdsButton>
                        <RdsButton
                            class="me-2"
                            label="Publish"
                            type="submit"
                            isOutline={false}
                            colorVariant="primary"
                            databsdismiss="offcanvas"
                            databstoggle="offcanvas"
                            databstarget={`#${props?.offId}`}
                            size="small"
                            onClick={() => {
                                props.onPublish(postData);
                            }}
                            dataTestId='submit'
                        ></RdsButton> </> : <>
                        <RdsButton
                            class="me-2"
                            tooltipTitle={""}
                            type={"button"}
                            label="Cancel"
                            colorVariant="outline-primary"
                            size="small"
                            databsdismiss="offcanvas"
                        ></RdsButton>
                        <RdsButton
                            class="me-2"
                            label="Save"
                            type="submit"
                            isOutline={false}
                            colorVariant="primary"
                            size="small"
                            databsdismiss="offcanvas"
                            databstoggle="offcanvas"
                            databstarget={`#${props?.offId}`}
                            onClick={() => {
                                props.onSubmit(postData);
                            }}
                            dataTestId='submit'
                        ></RdsButton>
                    </>}
                </div>
            </div>

        </>
    );
};


export default RdsCompBlogPostNew;
