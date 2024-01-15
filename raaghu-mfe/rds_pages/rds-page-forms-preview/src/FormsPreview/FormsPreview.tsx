import React, { useEffect, useState } from "react"; import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../../../libs/public.api";
import { getAll2FormsQuestions, getForms } from "../../../../libs/state-management/forms/forms-slice";
import { useAppSelector } from "../../../../libs/state-management/hooks";
import {
    RdsCheckbox,
    RdsLabel,
    RdsRadioButton,
    RdsSelectList,
    RdsTextArea,
} from "../../../rds-elements";
import { useNavigate } from "react-router-dom";

const FormsPreview = (props: any) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const forms = useAppSelector((state) => state.persistedReducer.forms);

    useEffect(() => {
        dispatch(getAll2FormsQuestions(props.id) as any);
        dispatch(getForms(props.id) as any);
    }, [dispatch]);

    const [formPreview, setFormPreview] = useState<any>([]);
    const [basicPreviewFormData, setBasicPreviewFormData] = useState<any>([]);

    useEffect(() => {
        if (props.id == null) {
            navigate("/forms");
        }
    }, []);

    useEffect(() => {
        if (forms.formQuestionEdit) {
            setFormPreview(forms.formQuestionEdit);
        }
    }, [forms.formQuestionEdit]);

    useEffect(() => {
        if (forms.editForms) {
            const tempData = { ...forms.editForms };
            setBasicPreviewFormData(tempData);
        }
    }, [forms.editForms]);

    const [multipleChoice, setMultipleChoice] = useState<any[]>([]);

    useEffect(() => {
        if (formPreview.length) {

            const tempMultiple: any[] = [];
            formPreview.map((ele: any, index: number) => {
                const temp: any[] = [];

                if (ele.questionType === 3 && ele.choices && ele.choices.length) {
                    ele.choices.map((eles: any) => {
                        const item = {
                            id: eles.id,
                            label: eles.value
                        };
                        temp.push(item);
                    });
                }
                tempMultiple.push(temp);
            });
            setMultipleChoice(tempMultiple);
        }
    }, [formPreview]);

    const [dropDownList, setDropDownList] = useState<any>([]);

    useEffect(() => {
        if (formPreview.length) {

            const tempMultiple: any[] = [];
            formPreview.map((ele: any, index: number) => {
                const temp: any[] = [];

                if (ele.questionType === 5 && ele.choices && ele.choices.length) {
                    ele.choices.map((eles: any) => {
                        const item = {
                            value: eles.id,
                            option: eles.value
                        };
                        temp.push(item);
                    });
                }
                tempMultiple.push(temp);
            });
            setDropDownList(tempMultiple);
        }
    }, [formPreview]);


    return (
        <>
            <div className="row">
                <div className="col-md-12 mb-3">
                    <div className="card px-4 py-4 border-0 rounded-0 card-full-stretch">
                        <div className="container-fluid col-10">
                            <>
                                <div className="text-center mt-5">
                                    <h3>{basicPreviewFormData.title}</h3>
                                    <h6 className="text-muted fs-5 opacity-75">{basicPreviewFormData.description}</h6>
                                </div>
                            </>
                            {formPreview?.map((ele: any, i: number) => (
                                <>
                                    {ele.questionType === 1 ? <>
                                        <div className="mt-4">
                                            <div className="d-flex py-2">
                                                <RdsLabel class="pe-4 h5" label={ele.title} required={ele.isRequired}></RdsLabel>
                                                <RdsLabel class="opacity-75 text-muted" label={ele.description}></RdsLabel>
                                            </div>
                                            <RdsTextArea placeholder={""} rows={1}></RdsTextArea>
                                        </div>
                                    </> : ele.questionType === 3 ? <>
                                        <div className="mt-4">
                                            <div className="d-flex py-2">
                                                <RdsLabel class="pe-4 h5" label={ele.title} required={ele.isRequired}></RdsLabel>
                                                <RdsLabel class="opacity-75 text-muted" label={ele.description}></RdsLabel>
                                            </div>
                                            <RdsRadioButton itemList={multipleChoice[i]} inline={true}></RdsRadioButton>
                                        </div>
                                    </> : ele.questionType === 4 ? <>
                                        <div className="mt-4">
                                            <div className="d-flex py-2">
                                                <RdsLabel class="pe-4 h5" label={ele.title} required={ele.isRequired}></RdsLabel>
                                                <RdsLabel class="opacity-75 text-muted" label={ele.description}></RdsLabel>
                                            </div>
                                            {ele.choices && ele.choices.length && ele.choices.map((eles: any) => (
                                                <RdsCheckbox label={eles.value} checked={undefined} ></RdsCheckbox>
                                            ))
                                            }
                                        </div>
                                    </> : ele.questionType === 5 ? <>
                                        <div className="mt-4">
                                            <div className="d-flex py-2">
                                                <RdsLabel class="pe-4 h5" label={ele.title} required={ele.isRequired}></RdsLabel>
                                                <RdsLabel class="opacity-75 text-muted" label={ele.description}></RdsLabel>
                                            </div>
                                            <RdsSelectList
                                                id="formP"
                                                label={""}
                                                selectItems={dropDownList[i]}></RdsSelectList>
                                        </div>
                                    </> : ""}
                                </>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FormsPreview;
