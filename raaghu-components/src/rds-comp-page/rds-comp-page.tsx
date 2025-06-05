import React, { useEffect, useState } from "react";
import { RdsButton, RdsIcon, RdsInput, RdsLabel, RdsNavtabs, RdsTextArea, RdsTextEditor } from "../rds-elements";
import RdsCompDatatable from "../rds-comp-data-table";
import { ActionPosition } from "../rds-comp-data-table/rds-comp-data-table";

export interface RdsCompPageProps {
  newPageData?: any;
  reset?: boolean;
  onSaveHandler?: (data: any) => void;
  onCancel?: any;
  type?: string;
  tableHeaders: {
    displayName: string;
    key: string;
    datatype: string;
    dataLength?: number;
    required?: boolean;
    sortable?: boolean;
    colWidth?: string;
    disabled?: boolean;
    isEndUserEditing?: boolean;
  }[];
  actions?: {
    displayName: string;
    id: string;
  }[];
  tableData?: any[];
  pagination?: boolean;
  recordsPerPage?: number;
  onActionSelection?(rowData: any, actionId: any): void;
}

const RdsCompPage = (props: RdsCompPageProps) => {
  const [activeTab, setActiveTab] = useState("content");
  const [inputReset, setInputReset] = useState(props.reset);
  const [data, setData] = useState(props.newPageData);

  useEffect(() => {
    setInputReset(props.reset);
  }, [props.reset]);

  useEffect(() => {
    setData(props.newPageData);
  }, [props.newPageData]);

  const handleDataChanges = (value: any, key: string) => {
    setData({ ...data, [key]: value });
  };

  const handleractiveNavtabOrder = (id: any) => {
    setActiveTab(id);
  };

  function emitSaveData(event: any) {
    event.preventDefault();
    props.onSaveHandler && props.onSaveHandler(data);
    setInputReset(!inputReset);
    setData({
      title: "",
      slug: "",
      content: "",
      script: "",
      style: "",
    });
  }
  const isTitleValid = (title: any) => {
    if (!title || title.length === 0) {
      return false;
    }
    return true;
  };
  const isSlugValid = (slug: any) => {
    if (!slug || slug.length === 0) {
      return false;
    }
    return true;
  };
  const isFormValid = isTitleValid(data?.title) && isSlugValid(data?.slug);
  return (
    <>
      {props.type == "default" && (
        <>
          <div className="custom-content-scroll">
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <RdsInput
                    inputType="text"
                    required={true}
                    reset={inputReset}
                    name="Title"
                    label={true}
                    placeholder="Enter Title"
                    value={data?.title}
                    onChange={(e) => {
                      handleDataChanges(e.target.value, "title");
                    }}
                    dataTestId="title"
                  ></RdsInput>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group mt-2">
                  <RdsInput
                    inputType="text"
                    required={true}
                    reset={inputReset}
                    name="Slug"
                    label={true}
                    placeholder="Enter Slug"
                    value={data?.slug}
                    onChange={(e) => {
                      handleDataChanges(e.target.value, "slug");
                    }}
                    dataTestId="slug"
                  ></RdsInput>
                </div>
              </div>
              <RdsNavtabs
                type="tabs"
                activeNavtabOrder={handleractiveNavtabOrder}
                activeNavTabId={"content"}
                fill={false}
                navtabsItems={[
                  {
                    label: "Content",
                    tablink: "#nav-Operation",
                    id: "content",
                  },
                  {
                    label: "Script",
                    tablink: "#nav-Change",
                    id: "script",
                  },
                  {
                    label: "Style",
                    tablink: "#nav-Claims",
                    id: "style",
                  },
                ]}
              />
              <div className="mt-3 mb-4 overflow-x-hidden overflow-y-scroll offcanvas-custom-scroll">
                {activeTab == "content" && (
                  <RdsTextEditor
                    value={data?.content}
                    onChange={(e) => {
                      handleDataChanges(e, "content");
                    }}
                    placeholder={""}
                  ></RdsTextEditor>
                )}
                {activeTab == "script" && (
                  <div className="mb-3">
                    <RdsTextArea
                      label="Script Description"
                      placeholder="Enter Description"
                      readonly={false}
                      rows={3}
                      value={data?.script}
                      onChange={(e) => {
                        handleDataChanges(e.target.value, "script");
                      }}
                    ></RdsTextArea>
                  </div>
                )}
                {activeTab == "style" && (
                  <div className="mb-3">
                    <RdsTextArea
                      label="Style Description"
                      placeholder="Enter Description"
                      readonly={false}
                      rows={3}
                      value={data?.style}
                      onChange={(e) => {
                        handleDataChanges(e.target.value, "style");
                      }}
                    ></RdsTextArea>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="footer-buttons pb-3 d-flex ps-4 flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row gap-2 px-4">
            <RdsButton
              label="Cancel"
              databsdismiss="offcanvas"
              type={"button"}
              size="small"
              isOutline={true}
              colorVariant="primary"
              class="me-2"
              dataTestId="cancel"
              onClick={(e) => props?.onCancel && props?.onCancel(e)}
            ></RdsButton>
            <RdsButton
              label="Save"
              type={"button"}
              size="small"
              databsdismiss="offcanvas"
              isDisabled={!isFormValid}
              colorVariant="primary"
              class="me-2"
              onClick={(e: any) => emitSaveData(e)}
              dataTestId="save"
            ></RdsButton>
          </div>
        </>
      )}
      {props.type == "pages" && (
        <RdsCompDatatable
          actionPosition={ActionPosition.Right}
          tableHeaders={props.tableHeaders}
          actions={props.actions}
          recordsPerPageSelectListOption={true}
          tableData={props.tableData!}
          pagination={props.pagination!}
          recordsPerPage={props.recordsPerPage}
          onActionSelection={props.onActionSelection!}
        ></RdsCompDatatable>
      )}
      {props.type == "pageNotFound" && (
            <div className="row">
                <div
                    className="col-xxl-6 col-xl-6 col-lg-12 col-md-12 col-12 text-center p-4 d-flex justify-content-center align-items-center vh-100">
                
                    <div className="mt-mb-custom text-center">
                        <h1 className="pb-1">
                            <b>
                                <RdsLabel label="Page not found"></RdsLabel>
                            </b>
                        </h1>
                        <RdsLabel
                            label="Sorry, we couldn't find the page you were looking for."
                            class="text-muted fw-medium mb-3" 
                        ></RdsLabel>
                        <p className="mb-0 pt-4">
                            <a className="go-back-home text-primary" href="#">
                                <span className="me-2">Go back home</span>
                                <RdsIcon
                                    name="right"
                                    fill={false}
                                    stroke={true}
                                    width="16px"
                                    height="16px"
                                ></RdsIcon>
                            </a>
                        </p>
                    </div>
                </div>
                <div
                    className="col-xxl-6 col-xl-6 col-lg-12 col-md-12 col-12 countdown-col vh-100 d-xl-block d-none" style={{
                        backgroundImage: `url("https://cdn.pixabay.com/photo/2012/10/10/11/18/weightless-60632_960_720.jpg")`,
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover"
                    }}>
                </div>
            </div>
      )}
    </>
  );
};

export default RdsCompPage;
