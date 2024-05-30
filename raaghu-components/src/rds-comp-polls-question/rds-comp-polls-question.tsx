import { useTranslation } from "react-i18next";
import {
    RdsCheckbox,
    RdsInput,
    RdsSelectList,
    RdsDatePicker
} from "../rds-elements";
import React, { useEffect, useState } from "react";

export interface RdsCompPollsQuestion {
    widgetList: { option: any, value: any }[];
    getPollsQuestion: any;
    reset?: boolean;
}

function RdsCompPollsQuestion(props: any) {

    const [QuestionData, setQuestionData] = useState(props.questionData);
    const [inputReset, setInputReset] = useState(props.reset)

    useEffect(() => {
        setInputReset(props.reset)
    }, [props.reset])


    useEffect(() => {
        if (props.questionData) {
            setQuestionData(props.questionData);
        }
    }, [props.questionData]);
    const handlerChangeValues = (key: any, value: any) => {
        setQuestionData({ ...QuestionData, [key]: value });
        props.getPollsQuestion && props.getPollsQuestion({ ...QuestionData, [key]: value });
    };
    function dateFormateConvert(data: any) {
        return data.toISOString();
    }
    function handlerStartDate(data: any) {
        const date = dateFormateConvert(data);
        setQuestionData({ ...QuestionData, startDate: date });
        props.getPollsQuestion && props.getPollsQuestion({ ...QuestionData, startDate: date });
    }
    function handleEndDate(data: any) {
        const date = dateFormateConvert(data);
        setQuestionData({ ...QuestionData, endDate: date });
        props.getPollsQuestion && props.getPollsQuestion({ ...QuestionData, endDate: date });
    }
    function handleResultDatepickerData(data: any) {
        const date = dateFormateConvert(data);
        setQuestionData({ ...QuestionData, resultShowingEndDate: date });
        props.getPollsQuestion && props.getPollsQuestion({ ...QuestionData, resultShowingEndDate: date });
    }

    return (
        <>
            <div className="container-fluid m-0 p-0">
                <div className="row mt-3">
                    <div className="col-md-12">
                        <RdsInput
                            required={true}
                            label="Question"
                            placeholder="Enter Question"
                            inputType="text"
                            value={QuestionData?.question}
                            onChange={(e: any) => {
                                handlerChangeValues("question", e.target.value);
                            }}
                            dataTestId="question"
                            reset={inputReset}
                        ></RdsInput>
                    </div>

                    <div className="col-md-6">
                        <RdsInput
                            label="Code"
                            placeholder="Enter Code"
                            inputType="text"
                            required={true}
                            value={QuestionData?.code}
                            onChange={(e: any) => {
                                handlerChangeValues("code", e.target.value);
                            }}
                            dataTestId="code"
                            reset={inputReset}
                        ></RdsInput>
                    </div>
                    <div className="col-md-6 mb-3">
                        <RdsInput
                            label="Name"
                            placeholder="Enter Name"
                            inputType="text"
                            required={false}
                            value={QuestionData?.name}
                            onChange={(e: any) => {
                                handlerChangeValues("name", e.target.value);
                            }}
                            reset={inputReset}
                            dataTestId="name"
                        ></RdsInput>
                    </div>

                    <div className="col-md-6 mb-3">
                        <RdsSelectList
                            id="cmwi"
                            label="Widget"
                            selectItems={props.widgetList}
                            onChange={(item: any) =>
                                handlerChangeValues("widget", item.value)
                            }
                            placeholder="Select Widget"
                        ></RdsSelectList>
                    </div>
                    <div className="col-md-6">
                        <RdsDatePicker
                            onDatePicker={handlerStartDate}
                            DatePickerLabel="Start Date"
                            type="default"
                            isDropdownOpen={false}
                        />
                    </div>
                    <div className="col-md-6">
                        <RdsDatePicker
                            onDatePicker={handleEndDate}
                            DatePickerLabel="End Date"
                            type="default"
                            isDropdownOpen={false}
                        />
                    </div>
                    <div className="col-md-6">
                        <RdsDatePicker
                            onDatePicker={handleResultDatepickerData}
                            DatePickerLabel="Result Showing End Date"
                            type="default"
                            isDropdownOpen={false}
                        />
                    </div>
                </div>

                <div className="row pb-3">
                    <div className="col-md-12 mb-3">
                        <RdsCheckbox
                            id="0"
                            label="Show Hours Left"
                            checked={QuestionData?.showHoursLeft}
                            onChange={(e: any) => {
                                handlerChangeValues("showHoursLeft", e.target.checked);
                            }}
                            dataTestId="remaining-time"
                        ></RdsCheckbox>
                    </div>
                    <div className="col-md-12 mb-3">
                        <RdsCheckbox
                            id="0"
                            label="Allow Multiple Vote"
                            checked={QuestionData?.allowMultipleVote}
                            onChange={(e: any) => {
                                handlerChangeValues("allowMultipleVote", e.target.checked);
                            }}
                            dataTestId="multiple-voting"
                        ></RdsCheckbox>
                    </div>

                    <div className="col-md-12 mb-3">
                        <RdsCheckbox
                            id="0"
                            label="Show Vote Count"
                            checked={QuestionData?.showVoteCount}
                            onChange={(e: any) => {
                                handlerChangeValues("showVoteCount", e.target.checked);
                            }}
                            dataTestId="vote-count"
                        ></RdsCheckbox>
                    </div>
                    <div className="col-md-12 mb-3">
                        <RdsCheckbox
                            id="0"
                            label="Show Result Without Giving Vote"
                            checked={QuestionData?.showResultWithoutGivingVote}
                            onChange={(e: any) => {
                                handlerChangeValues("showResultWithoutGivingVote", e.target.checked);
                            }}
                            dataTestId="result-without-vote"
                        ></RdsCheckbox>
                    </div>
                </div>
            </div>
        </>
    );
}
export default RdsCompPollsQuestion;