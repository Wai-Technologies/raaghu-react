import React from "react";
import { RdsLabel } from "../rds-elements";

export interface RdsCompFaqProps {
    questionList: any[];
    QuestionHeading: any;
}

const RdsCompFaq = (props: RdsCompFaqProps) => {
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <div className="mt-4">
                            <h2>
                                <RdsLabel label={props.QuestionHeading.question} multiline={true} fontWeight="bold"></RdsLabel>
                            </h2>
                            <div className="text-dark mt-3">
                                <RdsLabel label={props.QuestionHeading.description} size="14px" multiline={true}></RdsLabel>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8 ">
                        <div className="mt-4">
                            {props.questionList.map((questionList) => (
                                <>
                                    <h5>
                                        <RdsLabel label={questionList.question} multiline={true} fontWeight="bold"></RdsLabel>
                                    </h5>
                                    <div className="text-muted mb-2">
                                        <RdsLabel label={questionList.description} size="14px" multiline={true}></RdsLabel>
                                    </div>
                                </>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RdsCompFaq;
