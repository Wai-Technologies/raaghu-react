import React, { useEffect, useState } from "react";
import { RdsInput, RdsTextArea } from "../rds-elements";
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

    return (
        <>
            <form>
                {basicFormData?.id ? (
                    <>
                        <div className="row">
                            <div className="col-12">
                                <RdsInput
                                    label="Title"
                                    placeholder="Enter title"
                                    inputType="text"
                                    onChange={(e) => setTitle(e.target.value)}
                                    value={basicFormData?.title}
                                    name={"title"}
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
                                label="Title"
                                placeholder="Enter title"
                                inputType="text"
                                onChange={(e) => setTitle(e.target.value)}
                                value={basicFormData?.title}
                                name={"title"}
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
                </>

                }
            </form>

        </>
    );
};
export default RdsCompFormsBasic;
