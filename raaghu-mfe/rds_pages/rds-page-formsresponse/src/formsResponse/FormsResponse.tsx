import React, { useEffect, useState } from "react";
import {
  RdsButton,
  RdsCheckbox,
  RdsLabel,
  RdsRadioButton,
  RdsSelectList,
  RdsTextArea,
} from "../../../rds-elements";

import {
  useAppDispatch,
  useAppSelector,
} from "../../../../libs/state-management/hooks";
import { useNavigate, useParams } from "react-router-dom";
import {
  getForms,
  getFormsSettings,
  postFormsResponse,
  getFormResponseWithId,
  getQuestionWithAnswer,
  SaveUpdatedResponse,
} from "../../../../libs/state-management/forms/forms-slice";
import { useTranslation } from "react-i18next";
import "moment-timezone";

const FormsResponse = () => {
  //=========== useState hooks ====================
  const [currentId, setCurrentId] = useState<string>("");
  const [basicEditFormData1, setbasicEditFormData] = useState<any>();
  const [tempQuestionsData, setTempQuestionsData] = useState<any>([]);
  const [tempUpdateQuestionData, setTempUpdateQuestionData] = useState<any>([]);
  const [formPreview, setFormPreview] = useState<any>([]);
  const [dropDownList, setDropDownList] = useState<any>([]);
  const [multipleChoice, setMultipleChoice] = useState<any[]>([]);
  const [selectedRadioQuestionData, setSelectedRadioQuestionData] =
    useState<any>([]);
  const [selectedCheckboxData, setSelectedCheckboxData] = useState<any>([]);
  const [textBoxInputData, setTextBoxInputData] = useState<any>([]);
  const [selectListData, setSelectListData] = useState<any>([]);
  const [isSuccessfullySubmitted, setIsSuccessfullySubmitted] = useState(false);
  const [isAcceptingResponse, setIsAcceptingResponse] = useState<boolean>();
  const [isEmailRequired, setIsEmailRequired] = useState<boolean>();
  const [email, setEmail] = useState<any>(null);
  const [canUpdate, setCanUpdate] = useState<boolean>();
  const [responseId, setResponseId] = useState("");
  const [checkBoxCheckedId, setCheckBoxCheckedId] = useState<any>([]);
  const [updation, setUpdation] = useState(false);
  const [dataToUpdate, setDataToUpdate] = useState<any>();
  const [textAreaValue, setTextAreaValue] = useState<any>([]);
  const [selectedData, setSelectedData] = useState<any>([]);

  //=========== hooks=======
  const { id } = useParams();
  const { t } = useTranslation();
  //=========== Navigation hook========
  const navigate = useNavigate();
  // ========== State mangemenet hooks
  const dispatch = useAppDispatch();
  const forms = useAppSelector((state) => state.persistedReducer.forms);

  //=========== useEffect hooks ====================
  useEffect(() => {
    if (id != null) {
      setCurrentId(id);
    }
  }, [id]);

  useEffect(() => {
    if (id == null && currentId == "") {
      navigate("/forms");
    }
    if (id !== "new-form") {
      const idToFetch = currentId == "" ? id : currentId;
      if (idToFetch) {
        dispatch(getForms(idToFetch) as any);
        dispatch(getFormsSettings(idToFetch) as any);
      }
    }
    setIsAcceptingResponse(forms?.getSettings?.isAcceptingResponses);
    setIsEmailRequired(forms?.getSettings?.isCollectingEmail);
    setCanUpdate(forms?.getSettings?.canEditResponse);
  }, []);

  useEffect(() => {
    if (forms?.editForms) {
      const tempData = { ...forms.editForms };
      setbasicEditFormData(tempData);
      const tempDataForTextArea: any[] = [];
      forms?.editForms.questions.map((item: any) => {
        const temp: any[] = [];
        if (item.questionType == 1) {
          const obj = {
            value: "",
            questionId: item.id,
          };
          temp.push(obj);
        } else {
          temp.push({});
        }
        tempDataForTextArea.push(...temp);
      });
      setTextAreaValue(tempDataForTextArea);
      setTempQuestionsData(forms.editForms.questions);
    }
    if (forms?.editForms?.questions) {
      setFormPreview(forms?.editForms?.questions);
    }
  }, [forms?.editForms, isSuccessfullySubmitted]);

  useEffect(() => {
    if (formPreview.length) {
      const tempMultiple: any[] = [];
      formPreview.map((ele: any, index: number) => {
        const temp: any[] = [];

        if (ele.questionType === 5 && ele.choices && ele.choices.length) {
          ele.choices.map((eles: any) => {
            const item = {
              value: eles.id,
              option: eles.value,
            };
            temp.push(item);
          });
        }
        tempMultiple.push(temp);
      });
      setDropDownList(tempMultiple);
    }
  }, [formPreview, isAcceptingResponse]);

  useEffect(() => {
    if (formPreview.length) {
      const tempMultiple: any[] = [];
      formPreview.map((ele: any, index: number) => {
        const temp: any[] = [];

        if (ele.questionType === 3 && ele.choices && ele.choices.length) {
          const name = ele.id;
          ele.choices.map((eles: any) => {
            const item = {
              id: eles.id,
              label: eles.value,
              name: name,
              disabled: !isAcceptingResponse,
            };
            temp.push(item);
          });
        }
        tempMultiple.push(temp);
      });
      setMultipleChoice(tempMultiple);
    }
  }, [formPreview, isAcceptingResponse]);
  //================ Event Handlers and functions ==============

  // Radio Button
  const onRadioButtonHandler = (event: any, ele: any) => {
    let replica = JSON.parse(JSON.stringify(tempUpdateQuestionData));
    if (updation) {
      const targetIndex = replica.findIndex(
        (item: any) => item.answers[0].choiceId === ele.answers[0].choiceId
      );
      // If the target ID exists in the array, update the value
      if (targetIndex !== -1) {
        replica[targetIndex].answers[0].choiceId = event.target.id;
        replica[targetIndex].answers[0].value = event.target.value;
      }
    }
    const data = {
      questionId: event.target.name,
      choiceId: event.target.id,
      value: event.target.value,
    };

    // To update data
    if (updation) {
      const indexToupdateToUpdate = dataToUpdate.findIndex(
        (item: any) => item.questionId === data.questionId
      );
      if (indexToupdateToUpdate !== -1) {
        dataToUpdate[indexToupdateToUpdate].value = data.value;
        dataToUpdate[indexToupdateToUpdate].choiceId = data.choiceId;
      }
    }

    const index = selectedRadioQuestionData?.findIndex(
      (item: any) => item?.questionId === event.target.name
    );

    if (index !== -1) {
      const updateArray = [...selectedRadioQuestionData];
      updateArray[index].choiceId = event.target.id;
      setSelectedRadioQuestionData(updateArray);
    } else {
      const updateArray = [...selectedRadioQuestionData, data];
      setSelectedRadioQuestionData(updateArray);
    }
    setTempUpdateQuestionData(replica);
  };

  //  Handling checkbox multiple choice question
  const onCheckboxButtonHandler = (
    event: any,
    cId: any,
    qId: any,
    i: number
  ) => {
    const data = {
      questionId: qId,
      choiceId: cId.id,
    };
    if (event.target.checked) {
      setSelectedCheckboxData([...selectedCheckboxData, data]);
      // To update data
      if (updation) {
        const temp = checkBoxCheckedId;
        temp[i].push(cId.id);
        setCheckBoxCheckedId(temp);
        setDataToUpdate([...dataToUpdate, data]);
      }
    } else {
      const updatedData = selectedCheckboxData.filter(
        (item: any) => item.choiceId !== data.choiceId
      );
      setSelectedCheckboxData(updatedData);
      // To update data
      if (updation) {
        const tempData = checkBoxCheckedId;
        const dataToUpdateCheckBox = tempData[i].filter(
          (item: any) => item != data.choiceId
        );
        tempData[i] = dataToUpdateCheckBox;
        setCheckBoxCheckedId([...tempData]);
        const updatedDataToUpdate = dataToUpdate.filter(
          (item: any) => item.choiceId !== data.choiceId
        );
        setDataToUpdate(updatedDataToUpdate);
      }
    }
  };

  //  TextBox Handler
  const onTextChangeHandler = (event: any, questionData: any) => {
    const latestval = event?.target?.value;
    let replica = JSON.parse(JSON.stringify(tempUpdateQuestionData));
    if (updation) {
      const targetIndex = replica.findIndex(
        (item: any) => item.answers[0].id === questionData.answers[0].id
      );

      // If the target ID exists in the array, update the value
      if (targetIndex !== -1) {
        replica[targetIndex].answers[0].value = latestval;
      }
    }

    // Input value
    let replicaForTextArea = textAreaValue;
    if (!updation) {
      const indexOfTextArea = textAreaValue.findIndex(
        (item: any) => item.questionId === questionData.id
      );
      if (indexOfTextArea != -1) {
        replicaForTextArea[indexOfTextArea].value = latestval;
      }
    }

    const data = {
      questionId: questionData.id,
      value: event.target.value,
    };

    // To update data
    if (updation) {
      const indexToupdateToUpdate = dataToUpdate.findIndex(
        (item: any) => item.questionId === data.questionId
      );
      if (indexToupdateToUpdate !== -1) {
        dataToUpdate[indexToupdateToUpdate].value = data.value;
      }
    }

    // To add Data

    const index = textBoxInputData?.findIndex(
      (item: any) => item?.questionId === questionData.id
    );
    if (index !== -1) {
      const updateArray = [...textBoxInputData];
      updateArray[index].value = event.target.value;
      setTextBoxInputData(updateArray);
    } else {
      setTextBoxInputData([...textBoxInputData, data]);
    }
    setTextAreaValue(replicaForTextArea);
    //updating tempUpdateArray
    setTempUpdateQuestionData(replica);
  };

  const onDropdownChangeHandler = (value: any, ele: any, i: number) => {
    const selectedValue = ele.choices.filter((item: any) => item.id == value);
    const tempSelectedData = [];
    tempQuestionsData.map((item: any) => {
      tempSelectedData.push("");
    });
    tempSelectedData[i] = selectedValue[0].id;
    setSelectedData(tempSelectedData);
    const data = {
      questionId: ele.id,
      choiceId: value,
      value: selectedValue.value,
    };

    // To update data
    if (updation) {
      const indexToupdateToUpdate = dataToUpdate.findIndex(
        (item: any) => item.questionId === data.questionId
      );
      if (indexToupdateToUpdate !== -1) {
        dataToUpdate[indexToupdateToUpdate].value = data.value;
        dataToUpdate[indexToupdateToUpdate].choiceId = data.choiceId;
      }
    }

    // To add data

    const index = selectListData?.findIndex(
      (item: any) => item?.questionId === ele.id
    );
    if (index !== -1) {
      const updateArray = [...selectListData];
      updateArray[index].choiceId = value;
      setSelectListData(updateArray);
    } else {
      const updateArray = [...selectListData, data];
      setSelectListData(updateArray);
    }
  };

  const onEmailChange = (event: any) => {
    setEmail(event.target.value);
  };

  const onSubmit = async () => {
    const data = {
      id: id,
      requestBody: {
        email: email,
        answers: [
          ...selectedRadioQuestionData,
          ...selectedCheckboxData,
          ...textBoxInputData,
          ...selectListData,
        ],
      },
    };
    const res = await dispatch(postFormsResponse(data) as any).then(
      (res: any) => {
        return res;
      }
    );
    setResponseId(res.payload.id);
    if (res.type === "forms/postFormsResponse/fulfilled") {
      setIsSuccessfullySubmitted(true);
      setUpdation(false);
    }
  };

  const onSubmitNewResponseHandler = () => {
    setIsSuccessfullySubmitted(false);
    if (!updation) {
      setSelectedData([]);
    }
  };

  const onEditResponseHandler = async () => {
    await dispatch(getFormResponseWithId(responseId) as any);
    await dispatch(getQuestionWithAnswer(responseId) as any).then(
      (res: any) => {
        setTempUpdateQuestionData(res.payload);
        const tempData: any[] = [];
        res.payload.map((item: any) => {
          const temp: any[] = [];
          if (item.questionType == 4) {
            item.answers.map((eles: any) => {
              temp.push(eles.choiceId);
            });
          }
          tempData.push(temp);
        });
        setCheckBoxCheckedId(tempData);

        const updateTempData: any[] = [];
        res.payload.map((item: any) => {
          const temp: any[] = [];
          item.answers.map((el: any) => {
            const data = {
              questionId: el.questionId,
              value: el.value,
              choiceId: el.choiceId,
            };
            temp.push(data);
          });
          updateTempData.push(...temp);
        });
        setDataToUpdate(updateTempData);
        setUpdation(true);
      }
    );
    setIsSuccessfullySubmitted(false);
  };

  const onUpdate = () => {
    const requestBody = {
      email: email,
      formId: id,
      answers: dataToUpdate,
      id: responseId,
    };
    dispatch(
      SaveUpdatedResponse({ id: responseId, data: requestBody }) as any
    ).then((res: any) => {
      setIsSuccessfullySubmitted(true);
      setUpdation(false);
    });
  };

  return (
    <>
      <div className="container-fluid p-0 m-0">
        {!isSuccessfullySubmitted && (
          <div className="pe-5 ps-5 row mt-3">
            <div className="col-md-12 col-xxl-12 col-xl-12 col-lg-12 col-12 ps-lg-1 ps-xl-1 ps-xxl-1">
              <div className="card px-4 py-4 border-0 rounded-0">
                <div className="overflow-x-hidden overflow-y-scroll children-scrollable">
                  <div>
                    <>
                      <div className="pe-5 ps-5 row">
                        <div className="col-md-12 mb-3">
                          <div>
                            <div className="container-fluid">
                              <>
                                <div className="mt-3 text-center">
                                  <div className="mb-2">
                                    {!isAcceptingResponse && (
                                      <div>Form no longer accepts answers.</div>
                                    )}
                                  </div>
                                  <p className="text-muted fs-4 fw-bold">
                                    {basicEditFormData1?.title}
                                  </p>
                                  <p className="text-muted fs-4 fw-normal">
                                    {basicEditFormData1?.description}
                                  </p>
                                </div>
                                {isEmailRequired && (
                                  <>
                                    <RdsLabel
                                      class="pe-2"
                                      label={"Email"}
                                      required={true}
                                    ></RdsLabel>
                                    <RdsTextArea
                                      value={email}
                                      placeholder={"Enter your Email"}
                                      rows={2}
                                      onChange={(event) => {
                                        onEmailChange(event);
                                      }}
                                    ></RdsTextArea>
                                  </>
                                )}
                                <hr />
                              </>
                              {!updation &&
                                tempQuestionsData?.map(
                                  (ele: any, i: number) => {
                                    return (
                                      <>
                                        {ele.questionType === 1 ? (
                                          <>
                                            <div className="mt-4">
                                              <div className="d-flex py-2 align-items-center">
                                                <RdsLabel
                                                  class="pe-2"
                                                  label={ele.title}
                                                  required={ele.isRequired}
                                                ></RdsLabel>
                                                <RdsLabel
                                                  class="opacity-75 fs-6 text-muted"
                                                  label={ele.description}
                                                ></RdsLabel>
                                              </div>
                                              <RdsTextArea
                                                placeholder={""}
                                                rows={4}
                                                value={textAreaValue[i].value}
                                                onChange={(event) => {
                                                  onTextChangeHandler(
                                                    event,
                                                    ele
                                                  );
                                                }}
                                                isDisabled={
                                                  !forms.getSettings
                                                    ?.isAcceptingResponses
                                                }
                                              ></RdsTextArea>
                                            </div>
                                          </>
                                        ) : ele.questionType === 3 ? (
                                          <>
                                            <div className="mt-4">
                                              <div className="d-flex py-2 align-items-center">
                                                <RdsLabel
                                                  class="pe-2"
                                                  label={ele.title}
                                                  required={ele.isRequired}
                                                ></RdsLabel>
                                                <RdsLabel
                                                  class="opacity-75 fs-6 text-muted"
                                                  label={ele.description}
                                                ></RdsLabel>
                                              </div>
                                              <RdsRadioButton
                                                itemList={multipleChoice[i]}
                                                inline={false}
                                                onClick={(event) => {
                                                  onRadioButtonHandler(
                                                    event,
                                                    ele
                                                  );
                                                }}
                                              ></RdsRadioButton>
                                            </div>
                                          </>
                                        ) : ele.questionType === 4 ? (
                                          <>
                                            <div className="mt-4">
                                              <div className="d-flex py-2 align-items-center">
                                                <RdsLabel
                                                  class="pe-2"
                                                  label={ele.title}
                                                  required={ele.isRequired}
                                                ></RdsLabel>
                                                <RdsLabel
                                                  class="opacity-75 fs-6 text-muted"
                                                  label={ele.description}
                                                ></RdsLabel>
                                              </div>
                                              {ele.choices &&
                                                ele.choices.length &&
                                                ele.choices.map((eles: any) => (
                                                  <RdsCheckbox
                                                    label={eles.value}
                                                    checked={undefined}
                                                    isDisabled={
                                                      !forms.getSettings
                                                        ?.isAcceptingResponses
                                                    }
                                                    onChange={(event) => {
                                                      onCheckboxButtonHandler(
                                                        event,
                                                        eles,
                                                        ele.id,
                                                        i
                                                      );
                                                    }}
                                                  ></RdsCheckbox>
                                                ))}
                                            </div>
                                          </>
                                        ) : ele.questionType === 5 ? (
                                          <>
                                            <div className="mt-4">
                                              <div className="d-flex py-2 align-items-center">
                                                <RdsLabel
                                                  class="pe-2"
                                                  label={ele.title}
                                                  required={ele.isRequired}
                                                ></RdsLabel>
                                                <RdsLabel
                                                  class="opacity-75 fs-6 text-muted"
                                                  label={ele.description}
                                                ></RdsLabel>
                                              </div>
                                              <RdsSelectList
                                                label={""}
                                                selectedValue={
                                                  selectedData &&
                                                  selectedData[i]
                                                    ? selectedData[i]
                                                    : ""
                                                }
                                                selectItems={dropDownList[i]}
                                                isDisabled={
                                                  !forms.getSettings
                                                    ?.isAcceptingResponses
                                                }
                                                onChange={(item: any) => {
                                                  onDropdownChangeHandler(
                                                    item.value,
                                                    ele,
                                                    i
                                                  );
                                                }}
                                                id={""}
                                              ></RdsSelectList>
                                            </div>
                                          </>
                                        ) : (
                                          ""
                                        )}
                                      </>
                                    );
                                  }
                                )}
                              {updation &&
                                tempUpdateQuestionData?.map(
                                  (ele: any, i: number) => {
                                    return (
                                      <>
                                        {ele.questionType === 1 ? (
                                          <>
                                            <div className="mt-4">
                                              <div className="d-flex py-2 align-items-center">
                                                <RdsLabel
                                                  class="pe-2"
                                                  label={ele.title}
                                                  required={ele.isRequired}
                                                ></RdsLabel>
                                                <RdsLabel
                                                  class="opacity-75 fs-6 text-muted"
                                                  label={ele.description}
                                                ></RdsLabel>
                                              </div>
                                              <RdsTextArea
                                                placeholder={""}
                                                rows={4}
                                                onChange={(event) => {
                                                  onTextChangeHandler(
                                                    event,
                                                    ele
                                                  );
                                                }}
                                                isDisabled={
                                                  !forms.getSettings
                                                    ?.isAcceptingResponses
                                                }
                                                value={ele.answers[0].value}
                                              ></RdsTextArea>
                                            </div>
                                          </>
                                        ) : ele.questionType === 3 ? (
                                          <>
                                            <div className="mt-4">
                                              <div className="d-flex py-2 align-items-center">
                                                <RdsLabel
                                                  class="pe-2"
                                                  label={ele.title}
                                                  required={ele.isRequired}
                                                ></RdsLabel>
                                                <RdsLabel
                                                  class="opacity-75 fs-6 text-muted"
                                                  label={ele.description}
                                                ></RdsLabel>
                                              </div>
                                              <RdsRadioButton
                                                itemList={multipleChoice[i]}
                                                inline={false}
                                                onClick={(event) => {
                                                  onRadioButtonHandler(
                                                    event,
                                                    ele
                                                  );
                                                }}
                                                checkedId={
                                                  ele.answers[0].choiceId
                                                }
                                              ></RdsRadioButton>
                                            </div>
                                          </>
                                        ) : ele.questionType === 4 ? (
                                          <>
                                            <div className="mt-4">
                                              <div className="d-flex py-2 align-items-center">
                                                <RdsLabel
                                                  class="pe-2"
                                                  label={ele.title}
                                                  required={ele.isRequired}
                                                ></RdsLabel>
                                                <RdsLabel
                                                  class="opacity-75 fs-6 text-muted"
                                                  label={ele.description}
                                                ></RdsLabel>
                                              </div>
                                              {ele.choices &&
                                                ele.choices.length &&
                                                ele.choices.map((eles: any) => (
                                                  <RdsCheckbox
                                                    label={eles.value}
                                                    checked={undefined}
                                                    choiceId={
                                                      checkBoxCheckedId[i]
                                                    }
                                                    id={eles.id}
                                                    onChange={(event) => {
                                                      onCheckboxButtonHandler(
                                                        event,
                                                        eles,
                                                        ele.id,
                                                        i
                                                      );
                                                    }}
                                                  ></RdsCheckbox>
                                                ))}
                                            </div>
                                          </>
                                        ) : ele.questionType === 5 ? (
                                          <>
                                            <div className="mt-4">
                                              <div className="d-flex py-2 align-items-center">
                                                <RdsLabel
                                                  class="pe-2"
                                                  label={ele.title}
                                                  required={ele.isRequired}
                                                ></RdsLabel>
                                                <RdsLabel
                                                  class="opacity-75 fs-6 text-muted"
                                                  label={ele.description}
                                                ></RdsLabel>
                                              </div>
                                              <RdsSelectList
                                                label={""}
                                                selectItems={dropDownList[i]}
                                                selectedValue={
                                                  selectedData &&
                                                  selectedData[i]
                                                    ? selectedData[i]
                                                    : ""
                                                }
                                                isDisabled={
                                                  !forms.getSettings
                                                    ?.isAcceptingResponses
                                                }
                                                onChange={(item: any) => {
                                                  onDropdownChangeHandler(
                                                    item.value,
                                                    ele,
                                                    i
                                                  );
                                                }}
                                                id={""}
                                              ></RdsSelectList>
                                            </div>
                                          </>
                                        ) : (
                                          ""
                                        )}
                                      </>
                                    );
                                  }
                                )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-center align-items-center">
              {updation ? (
                <RdsButton
                  block={false}
                  label={t("Update") || ""}
                  type="button"
                  isOutline={false}
                  size="large"
                  colorVariant="primary"
                  class="ms-2"
                  onClick={onUpdate}
                ></RdsButton>
              ) : (
                <RdsButton
                  block={false}
                  label={t("Submit") || ""}
                  type="button"
                  isOutline={false}
                  size="large"
                  colorVariant="primary"
                  class="ms-2"
                  isDisabled={!isAcceptingResponse}
                  onClick={onSubmit}
                ></RdsButton>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="container-fluid p-5 m-5">
        {isSuccessfullySubmitted && (
          <>
            <div className="fs-3">Your response has been recorded.</div>
            <div className="mt-3 mb-2">
              <span
                className="text-decoration-underline text-primary fs-5 cursor-pointer"
                onClick={onSubmitNewResponseHandler}
              >
                Submit new response
              </span>
            </div>
            {canUpdate && (
              <div className="mt-3 mb-2">
                <span
                  className="text-decoration-underline text-primary fs-5 cursor-pointer"
                  onClick={onEditResponseHandler}
                >
                  Edit your response
                </span>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};
export default FormsResponse;
