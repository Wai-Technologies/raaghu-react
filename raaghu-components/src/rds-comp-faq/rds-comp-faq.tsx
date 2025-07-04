import React from "react";
import RdsCompLabel from "../rds-comp-label";

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
                                <RdsCompLabel label={props.QuestionHeading.question} multiline={true} fontWeight="bold"></RdsCompLabel>
                            </h2>
                            <div className="text-dark mt-3">
                                <RdsCompLabel label={props.QuestionHeading.description} size="14px" multiline={true}></RdsCompLabel>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8 ">
                        <div className="mt-4">
                            {props.questionList.map((questionList) => (
                                <>
                                    <h5>
                                        <RdsCompLabel label={questionList.question} multiline={true} fontWeight="bold"></RdsCompLabel>
                                    </h5>
                                    <div className="text-muted mb-2">
                                        <RdsCompLabel label={questionList.description} size="14px" multiline={true}></RdsCompLabel>
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
