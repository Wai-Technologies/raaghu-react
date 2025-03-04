import React, { useEffect, useState } from "react";
import { RdsButton, RdsInput, RdsNavtabs, RdsTextArea, RdsTextEditor } from "../rds-elements";

export interface RdsCompPageProps {
    newPageData?: any;
    reset?: boolean;
    onSaveHandler?: (data: any) => void;
    onCancel?: any;
}

const RdsCompPage = (props: RdsCompPageProps) => {
    const [activeTab, setActiveTab] = useState("content");
    const [inputReset, setInputReset] = useState(props.reset)
    const [data, setData] = useState(props.newPageData);

    useEffect(() => {
        setInputReset(props.reset)
    }, [props.reset])

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
            style: ""
        });
        }
        const isTitleValid = (title: any) => {
            if (!title || title.length === 0) {
                return false;
            }
            return true;
        }
        const isSlugValid = (slug: any) => {
            if (!slug || slug.length === 0) {
                return false;
            }
            return true;
        }
const isFormValid=isTitleValid(data?.title) && isSlugValid(data?.slug) ;
    return (
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
                                dataTestId='title'
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
                                dataTestId='slug'
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
                    <div className="mt-3 overflow-x-hidden overflow-y-scroll offcanvas-custom-scroll">
                        {activeTab == "content" && (
                            <RdsTextEditor
                                value={data?.content}
                                onChange={(e) => {
                                    handleDataChanges(e, "content");
                                  }}
                                placeholder={""}
                            >
                            </RdsTextEditor >
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

            <div className="footer-buttons pb-3 d-flex ps-4 flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row gap-2 p-4">
                <RdsButton
                    label="Cancel"
                    databsdismiss="offcanvas"
                    type={"button"}
                    size="small"
                    isOutline={true}
                    colorVariant="primary"
                    class="me-2"
                    dataTestId='cancel'
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
                    dataTestId='save'
                ></RdsButton>
            </div>
        </>
    );
};

export default RdsCompPage;
