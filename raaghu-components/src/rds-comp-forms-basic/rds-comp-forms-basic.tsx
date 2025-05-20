import React, { useEffect, useState } from "react";
import { RdsButton, RdsInput, RdsTextArea } from "../rds-elements";
import { useTranslation } from "react-i18next";

export interface RdsCompFormsBasicProps {
    basicInfo: any,
    handleNewFormData?: any;
    questions?: any[];
    reset?: boolean;
}

const RdsCompFormsBasic = (props: RdsCompFormsBasicProps) => {

    const [inputReset, setInputReset] = useState(props.reset)

    useEffect(() => {
        setInputReset(props.reset)
    }, [props.reset])

    const [basicFormData, setBasicFormData] = useState(props.basicInfo);

    function setDescription(value: any) {
        setBasicFormData({ ...basicFormData, description: value });
    }
    function setTitle(value: any) {
        setBasicFormData({ ...basicFormData, title: value });
    }

    useEffect(() => {
        setBasicFormData(props.basicInfo);
        setInputReset(!inputReset);
    }, [props.basicInfo]);

    function emitSaveData(event: any) {
        event.preventDefault();
        props.handleNewFormData(basicFormData);
        setInputReset(!inputReset);
        setBasicFormData({
            id: "",
            title: "",
            description: ""
        })
    }

    return (
        <>
            <form>
                {basicFormData?.id ? (
                    <>
                        <div className="row">
                            <div className="col-12">
                                <RdsInput
                                    name="Title"
                                    label={true}
                                    placeholder="Enter title"
                                    inputType="text"
                                    onChange={(e) => setTitle(e.target.value)}
                                    value={basicFormData?.title}                                   
                                    required={true}
                                    dataTestId="title"
                                    reset={inputReset}
                                ></RdsInput>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <RdsTextArea
                                    label="Description"
                                    placeholder="Enter description"
                                    onChange={e => setDescription(e.target.value)}
                                    value={basicFormData.description}
                                    rows={5}
                                    dataTestId="description"
                                />
                            </div>
                        </div>
                    </>) : <>
                    <div className="row">
                        <div className="col-12">
                            <RdsInput
                                name="Title"
                                label={true}
                                placeholder="Enter title"
                                inputType="text"
                                onChange={(e) => setTitle(e.target.value)}
                                value={basicFormData?.title}                               
                                required={true}
                                dataTestId="title"
                                reset={inputReset}
                            ></RdsInput>
                        </div>

                    </div>
                    <div className="row mt-1">
                        <RdsTextArea
                            label="Description"
                            placeholder="Enter description"
                            onChange={e => setDescription(e.target.value)}
                            value={basicFormData?.description}
                            rows={3}
                            dataTestId="description"
                        />
                    </div>
                    <div className="d-flex flex-column-reverse ps-3 flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3 p-4">
                        <RdsButton
                            class="me-2"
                            tooltipTitle={""}
                            type={"button"}
                            label="Cancel"
                            colorVariant="outline-primary"
                            size="small"
                            databsdismiss="offcanvas"
                            dataTestId="cancel"
                        ></RdsButton>
                        <RdsButton
                            class="me-2"
                            label="Save"
                            size="small"
                            colorVariant="primary"
                            tooltipTitle={""}
                            type={"submit"}
                            databsdismiss="offcanvas"
                            onClick={(e: any) => emitSaveData(e)}
                            dataTestId="save"
                        ></RdsButton>
                    </div>
                </>

                }
            </form>

        </>
    );
};
export default RdsCompFormsBasic;
