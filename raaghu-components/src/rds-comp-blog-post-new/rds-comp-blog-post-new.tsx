import React, { useEffect, useState } from "react";
import {
  RdsButton,
  RdsInput,
  RdsLabel,
  RdsSelectList,
  RdsTextArea,
  RdsTextEditor,
} from "../rds-elements";
import { RdsFileUploader } from "../rds-elements";
import { useTranslation } from "react-i18next";
import { content } from "html2canvas/dist/types/css/property-descriptors/content";
import { Size } from "../../../raaghu-elements/src/rds-file-uploader/rds-file-uploader";
import { InputSize, LabelPosition } from "../../../raaghu-elements/src/rds-input/rds-input";
import { FileUploaderState } from "../../../raaghu-elements/src/rds-file-uploader/rds-file-uploader";
export interface RdsCompBlogPostNewProps {
  blogPostData?: any;
  blogList:{ option: any, value: any }[];
  isEdit: boolean;
  offId: string;
  onSaveHandler: (data: any) => void;
  reset?: boolean;
}

const RdsCompBlogPostNew = (props: RdsCompBlogPostNewProps) => {
  const [postData, setBlogPostData] = useState({
    title: "",
    slug: "",
    description: "",
    tags: "",
    blogList: "",
    concurrencyStamp: "",
    file: [],
    fileName: "",
    blogId: "",
    content : ""
  });
  const [counter, setCounter] = useState(0);
  const [inputReset, setInputReset] = useState(false);

  useEffect(() => {
    setBlogPostData({
      title: props.blogPostData?.title || "",
      slug: props.blogPostData?.slug || "",
      description: props.blogPostData?.description || "",
      tags: props.blogPostData?.tags || "",
      blogList: props.blogPostData?.blogList || "",
      concurrencyStamp: props.blogPostData?.concurrencyStamp || "",
      blogId: props.blogPostData?.blogId || "",
      file: props.blogPostData?.file || [],
      fileName: props.blogPostData?.fileName || "",
      content: props.blogPostData?.content || "",
    });
  }, [props.blogPostData]);

  useEffect(() => {
    setInputReset(!inputReset);
  }, [props.reset]);

  const handlerBlogDataChange = (val: any, key: any, isFile?: boolean) => {
    if (isFile) {
      const fileName = val?.name;
      setBlogPostData({ ...postData, [key]: val, fileName });
    } else {
      setBlogPostData({ ...postData, [key]: val });
    }
   
  };
  
  function emitSaveData(event: any) {
    event.preventDefault();
    setBlogPostData((prevData: typeof postData) => {
      const newData = {
        title: "",
        slug: "",
        description: "",
        content: "",
        tags: "",
        concurrencyStamp: "",
        blogList: "",
        blogId: "",
        file: [],
        fileName: "",
      };
      props.onSaveHandler && props.onSaveHandler(prevData);
      setInputReset(!inputReset);
      setCounter((prevCounter) => prevCounter + 1);
      return newData;
    });
  }
  const isTitleValid=(title: string)=>{
    if (!title || title.length === 0) {
        return false;
    }
    return true;
  }
  const isSlugValid=(slug: string)=>{
    if (!slug || slug.length === 0) {
        return false;
    }
    return true;
  }
  const isTagsValid=(tags: string)=>{
    if (!tags || tags.length === 0) {
        return false;
    }
    return true;
  }
const isFormValid =isTitleValid(postData?.title) && isSlugValid(postData?.slug) && isTagsValid(postData?.tags);
  return (
    <>
      <div>
        <form>
          <div className="custom-content-scroll">
            <div className="form-group mb-3">
            <RdsLabel label="Cover Image" />
              <RdsFileUploader
                key={counter}
                colorVariant="dark"
                state={FileUploaderState.Default}
                extensions="png, jpg, doc, pdf, ppt"
                size={Size.Large}
                fileSizeLimitInMb={1}
                label="Cover Image"
                validation={[
                  {
                    hint: "File size exceeds the limit",
                    isError: false,
                  },
                ]}
                onFileArray={(files) =>
                  handlerBlogDataChange(files, "file", true)
                }
              />
            </div>
            <div className="form-group mb-2">

              <RdsSelectList
                id="Fea"
                label="Blog Id"
                placeholder="Select Option"
                selectItems={props.blogList}
                isSearchable={true}
                selectedValue={postData?.blogId}
                key={`blogId-${postData?.blogId}`}
                onChange={(item: any) => {
                  handlerBlogDataChange(item.value, "blogId");
                }}
                dataTestId="blog-id"
              ></RdsSelectList>
            </div>
            <div className="form-group">
              <RdsInput
                inputType="text"
                size={InputSize.Medium}   
                required={true}
                isDisabled={false}                
                label={true}
                readonly={false}
                name="Title"
                placeholder="Enter Title"
                onChange={(e) => {
                  handlerBlogDataChange(e.target.value, "title");
                }}
                value={postData?.title}
                dataTestId="title"
                reset={inputReset}
              ></RdsInput>
            </div>
            <div className="form-group">
              <RdsInput
                inputType="text"
                required={true}
               // label="Slug"
                label={true}
                name="Slug"
                placeholder="Enter Slug"
                dataTestId="slug"
                onChange={(e) => {
                  handlerBlogDataChange(e.target.value, "slug");
                }}
                value={postData?.slug}
                reset={inputReset}
              ></RdsInput>
            </div>
            {props.isEdit && (
              <div className="form-group">
                <RdsInput
                  inputType="text"
                  required={true}
                  //name="Concurrency Stamp"
                  label={true}
                  name="Concurrent Mode"
                  placeholder=""
                  onChange={(e) => {
                    handlerBlogDataChange(e.target.value, "concurrencyStamp");
                  }}
                  value={postData?.concurrencyStamp}
                  dataTestId="concurrency-stamp"
                ></RdsInput>
              </div>
            )}
            <div className="form-group mb-3">
              <RdsTextArea
                label="Short Description"
                placeholder="Enter Description"
                onChange={(e) => {
                  handlerBlogDataChange(e.target.value, "description");
                }}
                value={postData?.description}
                rows={3}
                dataTestId="shord-desc"
              />
            </div>
            <div className="form-group mb-2">
              <RdsTextEditor
                value={postData?.content}
                onChange={(e: any) => handlerBlogDataChange(e, "content")}
              />
            </div>
            <div className="form-group mb-5 mb-lg-0 py-1">
              <RdsInput
                inputType="text"
                required={true}
                name="Tags"
                label={true}
                placeholder="Enter Tag"
                dataTestId="tag"
                onChange={(e) => {
                  handlerBlogDataChange(e.target.value, "tags");
                }}
                value={postData?.tags}
                reset={inputReset}
              ></RdsInput>
            </div>
          </div>

          <div className="d-flex flex-column-reverse flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3 px-4">
            {!props.isEdit ? (
              <>
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
                  isDisabled={!isFormValid}
                  databstoggle="offcanvas"
                  databstarget={`#${props?.offId}`}
                  dataTestId="save"
                  onClick={(e: any) => emitSaveData(e)}
                ></RdsButton>
                <RdsButton
                  class="me-2"
                  label="Publish"
                  type="submit"
                  isOutline={false}
                  colorVariant="primary"
                  databsdismiss="offcanvas"
                  isDisabled={!isFormValid}
                  databstoggle="offcanvas"
                  databstarget={`#${props?.offId}`}
                  size="small"
                  onClick={(e: any) => emitSaveData(e)}
                  dataTestId="submit"
                ></RdsButton>
              </>
            ) : (
              <>
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
                  isDisabled={!isFormValid}
                  databstoggle="offcanvas"
                  databstarget={`#${props?.offId}`}
                  onClick={(e: any) => emitSaveData(e)}
                  dataTestId="submit"
                ></RdsButton>
              </>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default RdsCompBlogPostNew;
