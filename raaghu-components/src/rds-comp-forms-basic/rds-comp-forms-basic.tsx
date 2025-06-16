import React, { useEffect, useState } from "react";
import { RdsButton, RdsCheckbox, RdsInput, RdsLabel, RdsPagination, RdsRadioButton, RdsSelectList, RdsTextArea, RdsTextEditor} from "../rds-elements";
import { useTranslation } from "react-i18next";
import RdsCompAlertPopup from "../rds-comp-alert-popup";

export interface RdsCompFormsBasicProps {
  basicInfo?: any;
  handleNewFormData?: any;
  questions?: any[];
  reset?: boolean;
  forms?: string;
  formsEmailData?: any;
  onDataSendHandler?: (data: any) => void;
  question?: any;
  response?: any;
  formsData?: any;
  onDeleteHandler?: any;
  formsSettingData?: any;
  handleFormSettings?: any;
}

const RdsCompFormsBasic = (props: RdsCompFormsBasicProps) => {
  const [inputReset, setInputReset] = useState(props.reset);
  const [basicFormData, setBasicFormData] = useState(props.basicInfo);
  const [formsSetting, setFormsSetting] = useState(props.formsSettingData);
  const [emailData, setEmailData] = useState(props.formsEmailData);
  const [errorMessageForEmail, setErrorMessageForEmail] = useState("");
  const [multipleChoice, setMultipleChoice] = useState<any[]>([]);
  const [selectedData, setSelectedData] = useState<any[]>([]);
  const [formPreview, setFormPreview] = useState<any>([]);
  const [dropDownList, setDropDownList] = useState<any>([]);
  const [count, setCount] = useState(1);
  const forms = props.formsData;
  const responseCount = props.response?.totalCount || 0;
  const totalCount = forms?.getResponses?.items?.length || 0;
  const array1 = forms?.getResponses?.items[count - 1]?.answers || [];
  const array2 = forms?.formQuestionEdit;

  const array2Map = new Map<string, any>();
  array2?.forEach((item: any) => {
    array2Map.set(item.id, item);
  });

  const newArray = array1
    .map((item1: any) => {
      const matchingItem2 = array2Map.get(item1.questionId);
      if (matchingItem2) {
        return {
          ...item1,
          ...matchingItem2,
        };
      }
      return null;
    })
    .filter(Boolean);

  function compareQuestions(a: any, b: any) {
    const questionNumberA = parseInt(a.title.match(/\d+/)[0]);
    const questionNumberB = parseInt(b.title.match(/\d+/)[0]);

    return questionNumberA - questionNumberB;
  }

  const sortedArray = [...newArray].sort(compareQuestions);
  const groupedData = sortedArray.reduce((result, item) => {
    const existingItem = result.find(
      (groupedItem: any) => groupedItem.questionId === item.questionId
    );
    if (existingItem) {
      if (
        item.choiceId !== null &&
        !existingItem.choices.includes(item.choiceId)
      ) {
        existingItem.choiceId.push(item.choiceId);
      }
    } else {
      result.push({
        ...item, // Copy all properties from the current item
        choiceId: item.choiceId !== null ? [item.choiceId] : [],
      });
    }
    return result;
  }, []);

  useEffect(() => {
    if (forms?.formQuestionEdit) {
      setFormPreview(forms?.formQuestionEdit);
    }
  }, []);
  useEffect(() => {
    if (formPreview.length) {
      const tempMultiple: any[] = [];
      const tempSelectedData: any[] = [];
      groupedData.map((ele: any, index: number) => {
        const temp: any[] = [];
        const tempSelected: any[] = [];
        if (ele.questionType === 5 && ele.choices && ele.choices.length) {
          ele.choices.map((eles: any) => {
            const item = {
              value: eles.id,
              option: eles.value,
            };
            temp.push(item);
          });
          tempSelected.push(ele.choiceId[0]);
        }
        tempMultiple.push(temp);
        tempSelectedData.push([...tempSelected]);
      });
      setSelectedData(tempSelectedData);
      setDropDownList(tempMultiple);
    }
  }, [formPreview, count]);

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
            };
            temp.push(item);
          });
        }
        tempMultiple.push(temp);
      });
      setMultipleChoice(tempMultiple);
    }
  }, [formPreview, count]);

  const onNextClickHandler = () => {
    if (count < totalCount) {
      setCount((prev) => prev + 1);
    }
  };

  const onPreviousClickHandler = () => {
    if (count > 1) {
      setCount((prev) => prev - 1);
    }
  };

  useEffect(() => {}, [count]);

  useEffect(() => {
    setInputReset(props.reset);
  }, [props.reset]);

  useEffect(() => {
    setFormsSetting(props.formsSettingData);
  }, [props.formsSettingData]);

  function setResponses(value: any) {
    setFormsSetting({ ...formsSetting, isAcceptingResponses: value });
    props.handleFormSettings({ ...formsSetting, isAcceptingResponses: value });
  }
  function setEmail(value: any) {
    setFormsSetting({ ...formsSetting, isCollectingEmail: value });
    props.handleFormSettings({ ...formsSetting, isCollectingEmail: value });
  }
  function setQuiz(value: any) {
    setFormsSetting({ ...formsSetting, isQuiz: value });
    props.handleFormSettings({ ...formsSetting, isQuiz: value });
  }
  function setLogin(value: any) {
    setFormsSetting({ ...formsSetting, requiresLogin: value });
    props.handleFormSettings({ ...formsSetting, requiresLogin: value });
  }
  function setHasLimit(value: any) {
    setFormsSetting({ ...formsSetting, hasLimitOneResponsePerUser: value });
    props.handleFormSettings({
      ...formsSetting,
      hasLimitOneResponsePerUser: value,
    });
  }
  function setEdit(value: any) {
    setFormsSetting({ ...formsSetting, canEditResponse: value });
    props.handleFormSettings({ ...formsSetting, canEditResponse: value });
  }

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

  useEffect(() => {
    setEmailData(props.formsEmailData);
  }, [props.formsEmailData]);

  useEffect(() => {
    setInputReset(!inputReset);
  }, [props.reset]);

  const handleDataChanges = (value: any, key: string) => {
    setEmailData((prevState: any) => ({ ...prevState, [key]: value }));

    if (key === "to") {
      const trimmedValue = value.trim();
      if (trimmedValue === "") {
        setErrorMessageForEmail("Email is required.");
      } else if (!isEmailValid(trimmedValue)) {
        setErrorMessageForEmail("Please enter a valid email address.");
      } else {
        setErrorMessageForEmail("");
      }
    }
  };

  const isEmailValid = (email: any) => {
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (!email || !emailPattern.test(email)) {
      return false;
    }
    return true;
  };
  const isFormValid = isEmailValid(emailData?.to);

  function emitSaveData(event: any) {
  event.preventDefault();
  if (props.handleNewFormData) {
    props.handleNewFormData(basicFormData);
  }
  setBasicFormData({
    id: "",
    title: "",
    description: "",
  });
  setInputReset((prev) => !prev);
}

function emitEmailSaveData(event: any) {
  event.preventDefault();
  if (props.onDataSendHandler) {
    props.onDataSendHandler(emailData);
  }
  setEmailData({
    to: "",
    subject: "",
    body: "",
  });
  setErrorMessageForEmail("");
  setInputReset((prev) => !prev);
}

  return (
    <>
      {props.forms === "basic" && (
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
                    showTitle={true}
                    placeholder="Enter description"
                    onChange={(e) => setDescription(e.target.value)}
                    value={basicFormData.description}
                    rows={5}
                    dataTestId="description"
                  />
                </div>
              </div>
            </>
          ) : (
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
              <div className="row mt-1">
                <RdsTextArea
                  label="Description"
                  showTitle={true}
                  placeholder="Enter description"
                  onChange={(e) => setDescription(e.target.value)}
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
          )}
        </form>
      )}
      {props.forms === "email" && (
        <div className="ps-2 custom-content-scroll">
          <RdsInput
            reset={inputReset}
            inputType="email"
            placeholder="Enter email"
            name="To"
            label={true}
            onChange={(e) => handleDataChanges(e.target.value, "to")}
            value={emailData?.to}
            dataTestId="email"
            required={true}
            validatonPattern={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i}
            validationMsg={errorMessageForEmail}
          ></RdsInput>
          <RdsInput
            name="Subject"
            label={true}
            reset={inputReset}
            placeholder="Enter Subject"
            onChange={(e) => handleDataChanges(e.target.value, "subject")}
            value={emailData?.subject}
            dataTestId="subject"
          ></RdsInput>
          <div className="pt-3 mb-3">
            <RdsLabel>Body</RdsLabel>
            <RdsTextEditor
              onChange={(e) => handleDataChanges(e, "body")}
              value={emailData?.body}
            ></RdsTextEditor>
          </div>
          <div className="d-flex flex-column-reverse ps-4 flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3 p-4">
            <RdsButton
              label="Cancel"
              type="button"
              colorVariant="primary"
              size="small"
              databsdismiss="offcanvas"
              isOutline={true}
            ></RdsButton>
            <RdsButton
              label="Send"
              type="button"
              size="small"
              class="ms-2"
              colorVariant="primary"
              databsdismiss="offcanvas"
              isDisabled={!isFormValid}
              dataTestId="send"
              onClick={(e: any) => emitEmailSaveData(e)}
            ></RdsButton>
          </div>
        </div>
      )}
      {props.forms === "response" && (
        <>
          {responseCount !== 0 && (
            <>
              <div className="row">
                <div className="col-md-12 mb-3 mt-4">
                  <div className="d-flex justify-content-between p-2">
                    <RdsPagination
                      paginationType="onPagerPagination"
                      totalRecords={responseCount}
                      count={count}
                      onPreviousClickHandler={onPreviousClickHandler}
                      onNextClickHandler={onNextClickHandler}
                    ></RdsPagination>
                    <div className="page-link">
                      <div className="pagination">
                        <RdsButton
                          colorVariant="danger"
                          isOutline={true}
                          icon="delete"
                          size="medium"
                          iconColorVariant="danger"
                          class="me-2"
                          databstarget="#targetId0"
                          databstoggle="modal"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 mb-3">
                  <div>
                    <div className="container-fluid">
                      {groupedData?.map((ele: any, i: number) => (
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
                                  value={ele.value}
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
                                  checkedId={ele.choiceId}
                                  value={""}
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
                                      labelText={eles.value}
                                      id={eles.id}
                                      checked={undefined}
                                      choiceId={ele.choiceId}
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
                                  id="formres"
                                  label={""}
                                  selectItems={dropDownList[i]}
                                  selectedValue={
                                    selectedData && selectedData[i]
                                      ? selectedData[i][0]
                                      : ""
                                  }
                                ></RdsSelectList>
                              </div>
                            </>
                          ) : (
                            ""
                          )}
                        </>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <RdsCompAlertPopup
                alertID={"targetId0"}
                onSuccess={() => {
                  props.onDeleteHandler(
                    forms?.getResponses?.items[count - 1]?.id
                  );
                }}
              ></RdsCompAlertPopup>
            </>
          )}
          {responseCount == 0 && (
            <h4 className="mt-7 text-center opacity-25">
              There is no response yet
            </h4>
          )}
        </>
      )}
      {props.forms === "settings" && (
        <form onSubmit={props.handleFormSettings}>
          <div className="row">
            <div className="row">
              <div className="mb-3">
                <RdsCheckbox
                  labelText="Is accepting responses"
                  onChange={(e) => {
                    setResponses(e.target.checked);
                  }}
                  checked={formsSetting?.isAcceptingResponses}
                  dataTestId="accept-response"
                ></RdsCheckbox>
              </div>
              <div className="mb-3">
                <RdsCheckbox
                  labelText="Is collecting email"
                  onChange={(e) => {
                    setEmail(e.target.checked);
                  }}
                  checked={formsSetting?.isCollectingEmail}
                  dataTestId="collect-email"
                ></RdsCheckbox>
              </div>
              <div className="mb-3">
                <RdsCheckbox
                  labelText="Is a quiz"
                  onChange={(e) => {
                    setQuiz(e.target.checked);
                  }}
                  checked={formsSetting?.isQuiz}
                  dataTestId="quiz"
                ></RdsCheckbox>
              </div>
            </div>
            <div className="row">
              <div className="mb-3">
                <RdsCheckbox
                  labelText="Requires login"
                  onChange={(e) => {
                    setLogin(e.target.checked);
                  }}
                  checked={formsSetting?.requiresLogin}
                  dataTestId="require-login"
                ></RdsCheckbox>
              </div>
              <div className="mb-3">
                <RdsCheckbox
                  labelText="Has limit one response per user"
                  onChange={(e) => {
                    setHasLimit(e.target.checked);
                  }}
                  checked={formsSetting?.hasLimitOneResponsePerUser}
                  isDisabled={formsSetting?.requiresLogin}
                  dataTestId="limit-response"
                ></RdsCheckbox>
              </div>
            </div>
            <div className="row ">
              <div className="mb-3">
                <RdsCheckbox
                  labelText="Can edit after submit"
                  onChange={(e) => {
                    setEdit(e.target.checked);
                  }}
                  checked={formsSetting?.canEditResponse}
                  dataTestId="edit-after-submit"
                ></RdsCheckbox>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
};
export default RdsCompFormsBasic;
