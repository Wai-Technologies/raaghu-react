import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  RdsIcon,
  RdsButton,
  RdsInput,
  RdsCheckbox,
  RdsSelectList,
  RdsTextArea,
  RdsTooltip,
} from "../rds-elements";
import { useTranslation } from "react-i18next";
import { CheckboxStyle } from "../../../raaghu-elements/src/rds-checkbox/rds-checkbox";
import { TooltipStyle } from "../../../raaghu-elements/src/rds-tooltip/rds-tooltip";
import {LabelPosition } from "../../../raaghu-elements/src/rds-input/rds-input";

export interface RdsCompFormsQuestionProps {
  formQuestionsData?: any;
  handleQuestions?: any;
  deleteQuestion?: any;
}

const RdsCompFormsQuestions = (props: RdsCompFormsQuestionProps) => {
 
  const [questions, setQuestions] = useState<any>(props.formQuestionsData);
  const questionsTypeList = [
    { option: "Short answer", value: 1 },
    { option: "multiple choice", value: 3 },
    { option: "checkboxes", value: 4 },
    { option: "dropdown", value: 5 },
  ];
  function setIsRequired(index: number, value: boolean) {
    const tempquestions = questions?.map((res: any) => {
      return res;
    });
    tempquestions[index].isEdit = true;
    tempquestions[index].isRequired = value;
    setQuestions(tempquestions);
    props.handleQuestions(tempquestions);
  }
  function setTitle(index: number, value: any) {
    const tempquestions = questions?.map((res: any) => {
      return res;
    });
    tempquestions[index].isEdit = true;
    tempquestions[index].title = value;
    setQuestions(tempquestions);
    props.handleQuestions(tempquestions);
  }

  function setDescription(index: number, value: any) {
    const tempquestions = questions?.map((res: any) => {
      return res;
    });
    tempquestions[index].isEdit = true;
    tempquestions[index].description = value;
    setQuestions(tempquestions);
    props.handleQuestions(tempquestions);
  }
  function setSelectedOption(index: number, value: any) {
    const num = questionsTypeList?.filter((list) => {
      if (list.value == value) return list.value;
    });
    const number = num[0].value;
    const tempquestions = questions?.map((res: any) => {
      return res;
    });
    tempquestions[index].isEdit = true;
    tempquestions[index].questionType = number;
    if (!tempquestions[index].choices.length && number > 2) {
      tempquestions[index].choices.push({ value: "Option" });
    }

    if (tempquestions[index].questionType === 5) {
      const otherIndex = tempquestions[index].choices.findIndex(
        (choice: any) => choice.value === "Other..."
      );
      if (otherIndex !== -1) {
        tempquestions[index].choices.splice(otherIndex, 1);
      }
    }
    setQuestions(tempquestions);
    props.handleQuestions(tempquestions);
  }

  function setOption(index: number, choiceIndex: number, value: any) {
    const tempquestions = questions?.map((res: any) => {
      return res;
    });
    tempquestions[index].isEdit = true;
    tempquestions[index].choices[choiceIndex].value = value;
    if (tempquestions[index].choices[choiceIndex].value === "Other...") {
      tempquestions[index].choices[choiceIndex].readOnly = false;
      setReadOnly(true);
    }
    setQuestions(tempquestions);
    props.handleQuestions(tempquestions);
  }

  function handleAddMorequestions() {
    // alert("add more questions");
    const tempquestions = questions?.map((e: any) => {
      return e;
    });
    const ind =
      !tempquestions || tempquestions.length === 0
        ? 1
        : tempquestions.length + 1;
    tempquestions.push({
      index: ind,
      title: `${"Question " + ind}`,
      description: "",
      questionType: 1,
      choices: [],
    });
    setQuestions(tempquestions);
    props.handleQuestions(tempquestions);
  }

  function handleDelete(index: number, choiceIndex: number) {
    const tempQuestions = [...questions];
    const tempChoices = tempQuestions[index].choices.filter(
      (choice: any, j: number) => {
        if (
          choice.value === "Other..." &&
          tempQuestions[index].hasOtherOption
        ) {
          tempQuestions[index].hasOtherOption = false;
        }
        return j !== choiceIndex;
      }
    );
    tempQuestions[index].choices = tempChoices;
    setQuestions(tempQuestions);
  }

  function deleteQuestion(element: any) {
    props.deleteQuestion(element);
    setQuestions(questions.filter((x: any) => x.index !== element.index));
  }

  function handleAddMoreChoices(index: any) {
    const tempquestions = questions.map((res: any) => {
      return res;
    });
    setReadOnly(false);
    tempquestions[index].choices.push({ value: "Option" });
    setQuestions(tempquestions);
  }
  const [readOnly, setReadOnly] = useState(false);

  function handleAddOtherChoices(index: any) {
    const tempquestions = questions.map((res: any) => {
      return res;
    });
    if (!tempquestions[index].hasOtherOption) {
      tempquestions[index].choices.push({ value: "Other...", readOnly: false });
      tempquestions[index].hasOtherOption = true;
    }
    setReadOnly(true);
    setQuestions(tempquestions);
  }

  useEffect(() => {
    setQuestions(
      props.formQuestionsData?.map((res: any) => {
        const choices = res.choices?.map((choice: any, i: any) => {
          if (choice.value === "Other...") {
            return { ...choice, readOnly: false };
          } else {
            return { ...choice, readOnly: false };
          }
        });
        return { ...res, choices, isEdit: false };
      })
    );
  }, [props.formQuestionsData]);

  return (
    <>
      <div className="row px-3 mb-5">
        {questions?.map((element: any, i: number) => (
          <>
            <hr className="my-3" />
            <form className="mb-3 px-0 pt-2">
              <div className="custom-content-scroll">
              <div className="row align-items-center justify-content-between">
                <span className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-12 mb-3">
                  <h5 className="fw-medium">
                    {("Question") || ""} {i + 1}
                  </h5>
                </span>
                {element.lastModificationTime ? (
                  <>
                    <span className="opacity-25 col-xxl-6 col-xl-6 col-lg-6 col-md-5 col-6 mb-3">
                      Modified at{" "}
                      {moment(element.lastModificationTime).format(
                        "YYYY-MM-DD HH:mm:ss"
                      )}
                    </span>
                  </>
                ) : (
                  " "
                )}
                <span className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-6 mb-3 d-flex justify-content-xxl-end justify-content-xl-end justify-content-lg-end justify-content-md-end justify-content-start">
                  <div className="d-flex pe-2">
                    <div className="fw-normal mb-0 d-flex">
                      <RdsTooltip label="Required" style={TooltipStyle.MiddleBottomArrow}>
                        <RdsCheckbox
                          checked={element.isRequired}
                          id="id1"
                          isSwitch
                          style={CheckboxStyle.Square}
                          labelText={""}
                          showText={false}
                          onChange={(e: any) => {
                            setIsRequired(i, e.target.checked);
                          }}
                        />
                      </RdsTooltip>
                    </div>
                  </div>
                  <RdsTooltip label="Delete" style={TooltipStyle.MiddleBottomArrow}>
                    <RdsIcon
                      width="17px"
                      height="17px"
                      name="delete"
                      stroke={true}
                      colorVariant="danger"
                      onClick={() => {
                        deleteQuestion(element);
                      }}
                      classes="cursor-pointer"
                      dataTestId="delete-question"
                    ></RdsIcon>
                  </RdsTooltip>
                </span>
              </div>
              <div className="row">
                <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-12">
                  <RdsInput
                    name="Title"
                    label={true}
                    placeholder="Title"
                    inputType="text"
                    onChange={(e: any) => setTitle(i, e.target.value)}
                    value={element.title}                   
                    dataTestId="title"
                  ></RdsInput>
                </div>
                <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-12">
                  <RdsTextArea
                    label="Description"
                    placeholder="Enter description"
                    onChange={(e) => setDescription(i, e.target.value)}
                    value={element.description}
                    rows={1}
                    dataTestId="description"
                  />
                </div>
              </div>
              <div className="row pb-1">
                <div className="col-xxl-6 col-xl-6 col-lg-12 col-md-12 col-12 mt-2 pe-0">
                  <RdsSelectList
                    id="questy"
                    label="Type"
                    placeholder="Type"
                    selectItems={questionsTypeList}
                    selectedValue={element.questionType}
                    onChange={(item: any) => setSelectedOption(i, item.value)}
                  ></RdsSelectList>
                </div>
              </div>
              {element.questionType !== 1 && (
                <>
                  {element &&
                    element.choices &&
                    element?.choices?.map((elements: any, idx: number) => (
                      <>
                        <div className="col-xxl-6 col-xl-7 col-lg-12 col-md-12 col-12 mt-2 ">
                          <div className="d-flex pt-1 ">
                            <div className="input-group d-flex">
                              <div
                                className="input-group-text rounded-end-0 rounded-start-1"
                                id="basic-addon1"
                              >
                                {element.questionType == 3 ? (
                                  <>
                                    <input
                                      type="radio"
                                      height="22px"
                                      disabled={true}
                                    />
                                  </>
                                ) : element.questionType == 4 ? (
                                  <>
                                    <input
                                      type="checkbox"
                                      height="22px"
                                      disabled={true}
                                    />
                                  </>
                                ) : element.questionType == 5 ? (
                                  <>
                                    <span>{idx + 1}</span>
                                  </>
                                ) : (
                                  ""
                                )}
                              </div>
                              <div className="p-0">
                                <RdsInput
                                  placeholder="Option"
                                  inputType="text"
                                  onChange={(e: any) =>
                                    setOption(i, idx, e.target.value)
                                  }
                                  value={elements.value}
                                  name={"Option"}
                                  readonly={elements.readOnly}
                                  customClasses="rounded-start-0"                                 
                                 labelPosition={LabelPosition.Right}
                                  dataTestId="option"
                                ></RdsInput>
                              </div>
                              {element.choices.length > 0 && (
                                <RdsIcon
                                  classes={
                                    "input-group-text bg-transparent border-0 cursor-pointer p-0 ps-3"
                                  }
                                  width="17px"
                                  height="17px"
                                  name="delete"
                                  stroke={true}
                                  colorVariant="danger"
                                  onClick={() => handleDelete(i, idx)}
                                  dataTestId="handle-delete"
                                ></RdsIcon>
                              )}
                            </div>
                          </div>
                        </div>
                      </>
                    ))}
                  <div className="col-xxl-6 col-xl-6 col-lg-12 col-md-12 col-12 pt-1 d-flex align-items-center ">
                    <div className="align-items-center d-flex gap-3 input-group mt-2">
                      <div
                        className="input-group-text rounded-0"
                        id="basic-addon1"
                      >
                        {element.questionType == 3 ? (
                          <>
                            <input type="radio" height="22px" disabled={true} />
                          </>
                        ) : element.questionType == 4 ? (
                          <>
                            <input
                              type="checkbox"
                              height="22px"
                              disabled={true}
                            />
                          </>
                        ) : (
                          <input type="radio" height="22px" disabled={true} />
                        )}
                      </div>
                      <div className="">
                        <span
                          onClick={() => {
                            handleAddMoreChoices(i);
                          }}
                          className="cursor-pointer text-primary"
                          data-testId="add-more"
                        >
                          Add More
                        </span>
                        {element.questionType !== 5 && !element.hasOtherOption && (
                          <>
                            <span
                              onClick={() => {
                                handleAddOtherChoices(i);
                              }}
                              className="cursor-pointer text-primary"
                              data-testId="add-other"
                            >
                              / Add Other
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}
              </div>
            </form>
          </>
        ))}
        <div className="d-flex flex-column-reverse ps-4 flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3 p-4">
          <RdsButton
            type={"button"}
            size="small"
            label="New Questions"
            icon="plus"
            iconColorVariant="light"
            iconFill={false}
            iconStroke={true}
            iconHeight="15px"
            iconWidth="15px"
            colorVariant="primary"
            onClick={handleAddMorequestions}
            dataTestId="new-question-btn"
          ></RdsButton>
        </div>
      </div>
    </>
  );
};
export default RdsCompFormsQuestions;
