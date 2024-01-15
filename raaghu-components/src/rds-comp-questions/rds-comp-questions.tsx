import React, { useEffect, useState } from "react";
import RdsCompFormsBasic from "../rds-comp-forms-basic/rds-comp-forms-basic";
import RdsCompFormsQuestions from "../rds-comp-forms-question/rds-comp-forms-questions";
export interface RdsCompQuestionsProps {
    handleEditQuestion?: any;
    formQuestionsData: any[];
    basicEditFormData: any;
    getBasicEditDataFromQuestionComp?: any;
    getQuestionsEditDataFromQuestionComp?: any;
    deleteQuestion: React.EventHandler<any>
}
const RdsCompQuestions = (props: RdsCompQuestionsProps) => {
    const [basicEditFormData2, setbasicEditFormData] = useState(props.basicEditFormData);
    const [formQuestionsData1, setFormQuestionsData] = useState(props.formQuestionsData);
    useEffect(() => {
        setbasicEditFormData(props.basicEditFormData);
    }, [props.basicEditFormData]);

    function handleGetEditFormData(data: any) {
        const updatedFormData = {
            ...data,
            questions: formQuestionsData1
        };
        setbasicEditFormData(updatedFormData);
        props.getBasicEditDataFromQuestionComp(updatedFormData);
    }
    useEffect(() => {
        setFormQuestionsData(props.formQuestionsData);
    }, [props.formQuestionsData]);

    function handleGetQuestions(data: any) {
        props.getQuestionsEditDataFromQuestionComp(data);
    }
    return (
        <>
            <div className="row mt-3 ">
                <RdsCompFormsBasic basicInfo={basicEditFormData2} handleNewFormData={(data: any) => handleGetEditFormData(data)} questions={formQuestionsData1} />
            </div>
            <RdsCompFormsQuestions formQuestionsData={formQuestionsData1} handleQuestions={(data: any) => handleGetQuestions(data)} deleteQuestion={(data: any) => { props.deleteQuestion(data); }}></RdsCompFormsQuestions>
        </>
    );
};
export default RdsCompQuestions;
