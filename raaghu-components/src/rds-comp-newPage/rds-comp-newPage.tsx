import React, { useEffect, useState } from "react";
import { RdsButton, RdsInput, RdsNavtabs, RdsTextArea, RdsTextEditor } from "../rds-elements";
import { useTranslation } from "react-i18next";

interface RdsCompNewPageProps {
    title?: string;
    slug?: string;
    content?: string;
    script?: string;
    style?: string;
    onSubmit?: any;
    newPageData?: any;
    reset?: boolean;
    onCancel?: any
}

const RdsCompNewPage = (props: RdsCompNewPageProps) => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState("content");
    const [inputReset, setInputReset] = useState(props.reset)

    useEffect(() => {
        setInputReset(props.reset)
    }, [props.reset])


    const [data, setData] = useState(props.newPageData);
    useEffect(() => {
        setData(props.newPageData);
    }, [props.newPageData]);

    const onTextChangeHandler = (e: any) => {
        setData({ ...data, title: e.target.value });
    };

    const onSlugChangeHandler = (e: any) => {
        setData({ ...data, slug: e.target.value });
    };

    const onScriptDescHandler = (e: any) => {
        setData({ ...data, script: e.target.value });
    };

    const onStyleDescHandler = (e: any) => {
        setData({ ...data, style: e.target.value });
    };

    function onContentHandler(value: any) {
        setData({ ...data, content: value });
    }


    const handleractiveNavtabOrder = (id: any) => {
        setActiveTab(id);
    };


    return (
        <div className="row">
            <div className="col-md-12">
                <div className="form-group">
                    <RdsInput
                        inputType="text"
                        required={true}
                        reset={inputReset}
                        label={t("CmsKit.Title") || ""}
                        placeholder={t("Enter Title") || ""}
                        value={data?.title}
                        onChange={onTextChangeHandler}
                        dataTestId='title'
                    ></RdsInput>
                </div>
            </div>
            <div className="col-md-12">
                <div className="form-group">
                    <RdsInput
                        inputType="text"
                        required={true}
                        reset={inputReset}
                        label={t("CmsKit.Slug") || ""}
                        placeholder={t("Enter Slug") || ""}
                        value={data?.slug}
                        onChange={onSlugChangeHandler}
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
                        label: t("Content"),
                        tablink: "#nav-Operation",
                        id: "content",
                    },
                    {
                        label: t("Script"),
                        tablink: "#nav-Change",
                        id: "script",
                    },
                    {
                        label: t("Style"),
                        tablink: "#nav-Claims",
                        id: "style",
                    },
                ]}
            />
            <div className="mt-3 overflow-x-hidden overflow-y-scroll offcanvas-custom-scroll">
                {activeTab == "content" && (
                    <RdsTextEditor value={data?.content} onChange={(e) => onContentHandler(e)} placeholder={""} ></RdsTextEditor >
                )}
                {activeTab == "script" && (
                    <div className="mb-3">

                        <RdsTextArea
                            label={t("Script Description") || ""}
                            placeholder={t("Enter Description") || ""}
                            readonly={false}
                            rows={3}
                            value={data?.script}
                            onChange={onScriptDescHandler}
                        ></RdsTextArea>
                    </div>
                )}
                {activeTab == "style" && (
                    <div className="mb-3">
                        <RdsTextArea
                            label={t("Style Description") || ""}
                            placeholder=""
                            readonly={false}
                            rows={3}
                            value={data?.style}
                            onChange={onStyleDescHandler}
                        ></RdsTextArea>


                    </div>
                )}
            </div>

            <div className="footer-buttons pb-3 d-flex flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row gap-2">
                <RdsButton
                    label={t("AbpUi.Cancel") || ""}
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
                    label={t("AbpUi.Save") || ""}
                    type={"button"}
                    size="small"
                    databsdismiss="offcanvas"
                    isDisabled={!data}
                    colorVariant="primary"
                    class="me-2"
                    onClick={() => {
                        props.onSubmit(data);
                    }}
                    dataTestId='save'
                ></RdsButton>
            </div>
        </div>
    );
};

export default RdsCompNewPage;
