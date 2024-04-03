import React, { useEffect, useState } from "react";
import {
  RdsButton,
  RdsCheckbox,
  RdsIcon,
  RdsLabel,
  RdsNavtabs,
  RdsRadioButton,
  RdsSelectList,
  RdsTextArea,
} from "../../../rds-elements";

import {
  RdsCompFormsEmail,
  RdsCompFormsResponse,
  RdsCompFormsSettings,
  RdsCompQuestions,
} from "../../../rds-components";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../libs/state-management/hooks";
import { useNavigate, useParams} from "react-router-dom";
import {
  Saveforms,
  getAll2FormsQuestions,
  SaveFormsSendResponse,
  getFormsSettings,
  getFormsResponsesCount,
  getFormsResponses,
  updateForms,
  updateFormsQuestions,
  SaveformsQuestions,
  deleteFormsQuestions,
  updateFormsSettings,
  deleteResponse,
} from "../../../../libs/state-management/forms/forms-slice";
import { useTranslation } from "react-i18next";
import moment from "moment";
import "moment-timezone";

const FormsView = () => {
  //hooks
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const forms = useAppSelector((state) => state.persistedReducer.forms);
  const [currentId, setCurrentId] = useState<string>("");
  const [hasClicked, setHasClicked] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (id != null) {
      setCurrentId(id);
    }
  }, [id]);

  useEffect(() => { }, []);

  const leftNavtabsItems = [
    { label: t("Forms.Menu:Questions"), tablink: "#nav-Questions", id: "0" },
    {
      label: t("Forms.Form:Questions:Settings"),
      tablink: "#nav-Settings",
      id: "1",
    },
    { label: t("Share"), tablink: "#nav-Share", id: "2" },
  ];
  const newFormleftNavtabsItems = [
    { label: t("Forms.Menu:Questions"), tablink: "#nav-Questions", id: "0" },
  ];
  const rightNavtabsItems = [
    {
      label: t("Forms.Form:Questions:Preview"),
      tablink: "#nav-Preview",
      id: "0",
    },
    {
      label: t(`Forms.Menu:Responses`) + ` (${forms.getResponsesCount})`,
      tablink: "#nav-Responses",
      id: "1",
    },
  ];
  const rightNavtabsItemsforNewForms = [
    {
      label: t("Forms.Form:Questions:Preview"),
      tablink: "#nav-Preview",
      id: "0",
    },
  ];

  const baseUrl = window.location.origin;
  const formsResponseUrl = `${baseUrl}/forms/forms-response/${id}`;
  const body = "I've invited you to fill in a form: " + formsResponseUrl;

  const [activeLeftNavTabId, setActiveLeftNavTabId] = useState("0");
  const [activeRightNavTabId, setActiveRightNavTabId] = useState("0");
  const [basicEditFormData1, setbasicEditFormData] = useState<any>();
  const [tempEditFormData, setTempEditFormData] = useState<any>();
  const [tempQuestionsData, setTempQuestionsData] = useState<any>([]);
  const [formSettingData, setFormSettingData] = useState({});
  const [tempSaveQuestionsData, setTempSaveQuestionsData] = useState<any>([]);
  const [alertOne, setAlertOne] = useState(false);
  const [updatedFormSettingData, setUpdatedFormSettingData] = useState({});
  const [formPreview, setFormPreview] = useState<any>([]);
  const [dropDownList, setDropDownList] = useState<any>([]);
  const [dropDownListForAddingQuestion, setDropDownListForAddingQuestion] = useState<any>([]);
  const [newFormData, setNewFormData] = useState<any>([]);
  const [addFormButtonDisabled, setAddFormButtonDisable] = useState<boolean>(false);
  const [formsEmailData, setFormsEmailData] = useState<any>({
    to: "",
    body: body,
  });
  const [copybtn, setCopyBtn] = useState("clipboard");
  const [multipleChoice, setMultipleChoice] = useState<any[]>([]);
  const [multipleChoiceForAddingQuestion, setMultipleChoiceForAddingQuestion] = useState<any[]>([]);
  const [deleteQuestionData ,setDeleteQuestionData] =useState([]);
  const [newForm, setNewForm] = useState({
    title: "",
    questions: [],
    description: "",
  });
  function handleEmailSubmit(_data: any) {
    dispatch(SaveFormsSendResponse(_data) as any);
  }
  function handleCopyLink(event: any) {
    const linkValueToCopy = formsResponseUrl;
    navigator.clipboard
      .writeText(linkValueToCopy)
      .then(() => {
        console.log("Link copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy link: ", err);
      });
    setCopyBtn("check");
  }
  function handleCancelQuestion() {
    navigate("/forms");
  }
  function getEditDataFromQuestionComponent(data: any) {
    setNewForm({
      ...newForm,
      title: data.title,
      questions: data.questions,
      description: data?.description,
    });

    setTempEditFormData(data);
  }
  function handleEditQuestion() {
    const { description, title } = tempEditFormData;
    const forms = {
      id: currentId,
      body: { description, title },
    };
    dispatch(updateForms(forms) as any).then((res: any) => {
        if (res.payload.id) {
          let formId = deleteQuestionData.find(x=>x['formId']== currentId)
          if(formId)
          {
         const questionResponse = mapQuestionResponseToQuestionBody(formId);
            const data = {
              id:formId?formId['id']:"",
              body: { ...questionResponse},
            };
            dispatch(updateFormsQuestions(data) as any).then((res: any) => {
              dispatch(getAll2FormsQuestions(currentId) as any);
              setAlertOne(true);
            });
          }
          else
          {
            tempSaveQuestionsData.map((res: any) => {
              if (res.id) {
                if (res.isEdit) {
                  const data = {
                    id: res.id,
                    body: { ...res, formId: currentId },
                  };
                  dispatch(updateFormsQuestions(data) as any).then((res: any) => {
                    dispatch(getAll2FormsQuestions(currentId) as any);
                    setAlertOne(true);
                  });
                } else {
                }
              } else {
                const data = {
                  id: currentId,
                  body: { ...res, formId: currentId },
                };
      
                dispatch(SaveformsQuestions(data) as any).then((res: any) => {
                  dispatch(getAll2FormsQuestions(currentId) as any);
                  setAlertOne(true);
                });
              }
            });
            setAlertOne(true);
          }
        } else {
          const data = {
            id: currentId,
            body: { ...res, formId: currentId },
          };

          dispatch(SaveformsQuestions(data) as any).then((res: any) => {
            dispatch(getAll2FormsQuestions(currentId) as any);
            setAlertOne(true);
          });
        }
      setAlertOne(true);
    });
    setAlertOne(true);
  }

 function handleDelete(data :any)
  {
    setDeleteQuestionData(data);
  }
  function mapQuestionResponseToQuestionBody(data: any) {
    return {
      index: data ? data['index'] : 0,
      title: data ? data['title'] : "",
      description: data ? data['description'] : "",
      isRequired: data ? data['isRequired'] : false,
      hasOtherOption: data ? data['hasOtherOption'] : false,
      questionType: data ? data['questionType'] : 1,
      choices: data ? data['choices'] : [],
    };
  }

  function handleGetFormSettings(_data: any) {
    setUpdatedFormSettingData(_data);
  }
  const deleteQuestion = async (data: any) => {
    await dispatch(deleteFormsQuestions(data.id) as any).then((res: any) => {
      dispatch(getAll2FormsQuestions(currentId) as any);
    });
    const formsData = await dispatch(
      getAll2FormsQuestions(currentId) as any
    ).then((res: any) => {
      return res;
    });
    setFormPreview(formsData.payload);
    setTempSaveQuestionsData(formsData.payload);
    setNewFormData(formsData.payload);
  };
  function getQuestionsEditDataFromQuestionComp(data: any) {
    setTempSaveQuestionsData(data);
    setTempQuestionsData(data);
    setNewFormData(data);
    setDeleteQuestionData(data);
    if (data && data.length) {
      const tempMultiple: any[] = [];
      data.map((ele: any, index: number) => {
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
      setMultipleChoiceForAddingQuestion(tempMultiple);
    }

    if (data && data.length) {
      const tempMultiple: any[] = [];
      data.map((ele: any, index: number) => {
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
      setDropDownListForAddingQuestion(tempMultiple);
    }
  }
  function handleFormSettings() {
    const idToFetch = currentId == "" ? id : currentId;
    const data = {
      id: currentId,
      body: updatedFormSettingData,
    };
    dispatch(updateFormsSettings(data) as any).then((res: any) => {
      if (idToFetch) {
        dispatch(getFormsSettings(idToFetch) as any).then((res: any) => {
          setFormSettingData(res.payload);
        });
      }
      setActiveLeftNavTabId("0");
    });
  }

  const handleAddForms = async () => {
    if (!hasClicked) {
      try {
        setHasClicked(true);
        const currentDate = moment()
          .tz("Asia/Kolkata")
          .format("DD/MM/YYYY, HH:mm A");

        // Step 1: Create a new form
        const formResponse = await dispatch(
          Saveforms({
            title: tempEditFormData.title,
            description: tempEditFormData.description,
          })
        );

        const formId = formResponse.payload.id;

        // Step 2: Update the form data if needed
        const formUpdateData = {
          id: formId,
          body: {
            description: tempEditFormData.description,
            title: tempEditFormData.title,
          },
        };
        await dispatch(updateForms(formUpdateData));

        // Step 3: Create or update questions
        for (const question of tempSaveQuestionsData) {
          const questionData = {
            id: question.id || formId, // Use the formId as the question ID if it's a new question
            body: {
              ...question,
              formId: formId,
            },
          };

          if (question.id && question.isEdit) {
            // Update existing question
            await dispatch(updateFormsQuestions(questionData));
          } else {
            // Create a new question
            await dispatch(SaveformsQuestions(questionData));
          }
        }

        // Step 4: Fetch all questions after creating/updating
        await dispatch(getAll2FormsQuestions(formId));

        // Display a success alert
        setAlertOne(true);

        // Navigate to the forms page
        navigate("/forms");
      } catch (error) {
        // Handle any errors here
        console.error("An error occurred:", error);
      }
    }
  };

  const onResponseDeleteHandler = (data: any) => {
    const idToFetch = currentId == "" ? id : currentId;
    dispatch(deleteResponse(data) as any).then((res: any) => {
      if (idToFetch) {
        dispatch(getFormsSettings(idToFetch) as any);
        dispatch(getFormsResponses(idToFetch) as any);
        dispatch(getFormsResponsesCount(idToFetch) as any);
      }
    });
  };

  useEffect(() => {
    if (forms.formQuestionEdit) {
      setFormPreview(forms.formQuestionEdit);
    }
  }, [forms.formQuestionEdit]);
  useEffect(() => {
    if (formPreview && formPreview.length) {
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
  }, [formPreview]);

  useEffect(() => {
    if (formPreview && formPreview.length) {
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
  }, [formPreview]);

  useEffect(() => {
    if (id == null && currentId == "") {
      navigate("/forms");
    }
  }, []);
  useEffect(() => {
    if (id !== "new-form") {
      const idToFetch = currentId == "" ? id : currentId;
      if (idToFetch) {
        dispatch(getFormsSettings(idToFetch) as any);
        dispatch(getFormsResponses(idToFetch) as any);
        dispatch(getFormsResponsesCount(idToFetch) as any);
      }
    } else {
      setTempEditFormData({});
    }
  }, []);
  useEffect(() => { }, [formsEmailData]);
  useEffect(() => {
    if (forms.editForms) {
      const tempData = { ...forms.editForms };
      setbasicEditFormData(tempData);
      setTempEditFormData(tempData);
      setFormsEmailData({ ...formsEmailData, subject: forms.editForms.title });
    }
  }, [forms.editForms]);
  useEffect(() => {
    if (forms.formQuestionEdit) {
      setTempQuestionsData(forms.formQuestionEdit);
    }
  }, [forms.formQuestionEdit]);

  useEffect(() => {
    if (forms.getSettings) {
      setFormSettingData(forms.getSettings);
    }
  }, [forms.getSettings]);

    return (
    <>
      {id !== undefined && id !== "new-form" ? (
        <div className="container-fluid p-0 m-0">
          <div className="row">
            <div className="col-md-12 col-xxl-6 col-xl-6 col-lg-6 col-12 pb-xxl-0 pb-xl-0 pb-lg-0 pb-4">
              <div className="card py-4 border-0 rounded-0 card-full-stretch">
                <div className="px-4">
                  <RdsNavtabs
                    navtabsItems={leftNavtabsItems}
                    activeNavTabId={activeLeftNavTabId}
                    type="tabs"
                    fill={false}
                    justified={false}
                    activeNavtabOrder={(activeLeftNavTabId) => {
                      setActiveLeftNavTabId(activeLeftNavTabId);
                    }}
                  />
                </div>

                <div>
                  {activeLeftNavTabId == "0" && (
                    <>
                      <div className="overflow-x-hidden overflow-y-scroll children-scrollable px-4">
                        <RdsCompQuestions
                          basicEditFormData={basicEditFormData1}
                          formQuestionsData={tempQuestionsData}
                          getBasicEditDataFromQuestionComp={(data: any) => {
                            getEditDataFromQuestionComponent(data);
                          }}
                          getQuestionsEditDataFromQuestionComp={(data: any) => {
                            getQuestionsEditDataFromQuestionComp(data);
                          }}
                          deleteQuestion={(data: any) => {
                            deleteQuestion(data);
                          }}
                          handleDelete={(data:any)=>{handleDelete(data)}}
                        ></RdsCompQuestions>
                        <div className="pb-3 footer-buttons my-2">
                          <div className="row">
                            <div className="col-md-12 mb-xxl-0 mb-xl-0 mb-lg-0 mb-md-0 mb-3 justify-content-end d-flex gap-2 flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row">
                              <RdsButton
                                label={t("Cancel") || ""}
                                type="button"
                                colorVariant="primary"
                                size="small"
                                isOutline={true}
                                onClick={handleCancelQuestion}
                              ></RdsButton>
                              <RdsButton
                                label={t("Save") || ""}
                                type="button"
                                isOutline={false}
                                size="small"
                                colorVariant="primary"
                                onClick={handleEditQuestion}
                                class="ms-2"
                              ></RdsButton>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div>
                  {activeLeftNavTabId == "1" && (
                    <>
                      <div className="row ps-4 mt-3">
                        <RdsCompFormsSettings
                          handleFormSettings={(data: any) =>
                            handleGetFormSettings(data)
                          }
                          formsSettingData={formSettingData}
                        ></RdsCompFormsSettings>
                        <div className="pb-3 footer-buttons my-2 ">
                          <div className="row">
                            <div className="col-md-12 d-flex mb-xxl-0 mb-xl-0 mb-lg-0 mb-md-0 mb-3 justify-content-end flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row gap-2">
                              <RdsButton
                                label={t("Cancel") || ""}
                                type="button"
                                colorVariant="primary"
                                size="small"
                                isOutline={true}
                              ></RdsButton>
                              <RdsButton
                                label={t("Save") || ""}
                                type="button"
                                size="small"
                                class="ms-2"
                                colorVariant="primary"
                                onClick={() => handleFormSettings()}
                              ></RdsButton>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div>
                  {activeLeftNavTabId == "2" && (
                    <>
                      {" "}
                      <div className="px-4 overflow-x-hidden overflow-y-scroll children-scrollable">
                        <div className="">
                          <RdsCompFormsEmail
                            formsEmailData={formsEmailData}
                            handleSubmit={(data: any) => {
                              handleEmailSubmit(data);
                            }}
                          ></RdsCompFormsEmail>
                        </div>
                        <div className="row ps-2 mt-4">
                          <div className="mb-2">
                            <RdsLabel label={t("Forms.Link") || ""}></RdsLabel>
                          </div>
                          <div className="input-group mb-3">
                            <input
                              type="text"
                              className="form-control"
                              value={formsResponseUrl}
                            />
                            <span className="input-group-text">
                              <RdsIcon
                                classes="cursor-pointer"
                                name={copybtn}
                                height="20px"
                                width="20px"
                                fill={false}
                                stroke={true}
                                onClick={handleCopyLink}
                              />
                            </span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="col-md-12 col-xxl-6 col-xl-6 col-lg-6 col-12 ps-lg-1 ps-xl-1 ps-xxl-1">
              <div className="card px-4 py-4 border-0 rounded-0 card-full-stretch">
                <RdsNavtabs
                  navtabsItems={rightNavtabsItems}
                  activeNavTabId={activeRightNavTabId}
                  type="tabs"
                  fill={false}
                  justified={false}
                  activeNavtabOrder={(activeRightNavTabId) => {
                    setActiveRightNavTabId(activeRightNavTabId);
                  }}
                />
                <div className="overflow-x-hidden overflow-y-scroll children-scrollable">
                  <div>
                    {activeRightNavTabId == "0" && (
                      <>
                        <div className="row">
                          <div className="col-md-12 mb-3">
                            <div>
                              <div className="container-fluid">
                                <>
                                  <div className="mt-3">
                                    <div className="mb-1">
                                      {(tempEditFormData &&
                                        tempEditFormData.title!) ||
                                        ""}
                                    </div>
                                    <p className="text-muted">
                                      {(tempEditFormData &&
                                        tempEditFormData.description!) ||
                                        ""}
                                    </p>
                                  </div>
                                  <hr />
                                </>
                                {tempQuestionsData?.map(
                                  (ele: any, i: number) => (
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
                                              id="forV"
                                              label={""}
                                              selectItems={dropDownList[i]}
                                              onChange={() => { }}
                                            ></RdsSelectList>
                                          </div>
                                        </>
                                      ) : (
                                        ""
                                      )}
                                    </>
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  <div>
                    {activeRightNavTabId == "1" && (
                      <>
                        <RdsCompFormsResponse
                          formsData={forms}
                          response={forms.getResponses}
                          questions={tempQuestionsData}
                          onDeleteHandler={onResponseDeleteHandler}
                        ></RdsCompFormsResponse>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container-fluid p-0 m-0">
          <div className="row">
            <div className="col-md-12 col-xxl-6 col-xl-6 col-lg-6 col-12 pb-xxl-0 pb-xl-0 pb-lg-0 pb-4">
              <div className="card py-4 border-0 rounded-0 card-full-stretch">
                <div className="px-4">
                  <RdsNavtabs
                    navtabsItems={newFormleftNavtabsItems}
                    activeNavTabId={activeLeftNavTabId}
                    type="tabs"
                    fill={false}
                    justified={false}
                    activeNavtabOrder={(activeLeftNavTabId) => {
                      setActiveLeftNavTabId(activeLeftNavTabId);
                    }}
                  />
                </div>

                <div>
                  {activeLeftNavTabId == "0" && (
                    <>
                      <div className="overflow-x-hidden overflow-y-scroll children-scrollable px-4">
                        <RdsCompQuestions
                          basicEditFormData={""}
                          formQuestionsData={newFormData}
                          getBasicEditDataFromQuestionComp={(data: any) => {
                            getEditDataFromQuestionComponent(data);
                          }}
                          getQuestionsEditDataFromQuestionComp={(data: any) => {
                            getQuestionsEditDataFromQuestionComp(data);
                          }}
                          deleteQuestion={(data: any) => {
                            deleteQuestion(data);
                          }}
                          handleDelete={(data:any)=>{handleDelete(data)}}
                        ></RdsCompQuestions>
                      </div>
                    </>
                  )}
                </div>
                <div className="pb-3 footer-buttons my-2">
                  <div className="row">
                    <div className="col-md-12 mb-xxl-0 mb-xl-0 mb-lg-0 mb-md-0 mb-3 justify-content-end d-flex gap-2 flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row">
                      <RdsButton
                        label={t("Cancel") || ""}
                        type="button"
                        colorVariant="primary"
                        size="small"
                        isOutline={true}
                        onClick={handleCancelQuestion}
                      ></RdsButton>
                      <RdsButton
                        label={t("Save") || ""}
                        type="button"
                        isDisabled={addFormButtonDisabled}
                        isOutline={false}
                        size="small"
                        colorVariant="primary"
                        onClick={handleAddForms}
                        class="ms-2"
                      ></RdsButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-12 col-xxl-6 col-xl-6 col-lg-6 col-12 ps-lg-1 ps-xl-1 ps-xxl-1">
              <div className="card px-4 py-4 border-0 rounded-0 card-full-stretch">
                <RdsNavtabs
                  navtabsItems={rightNavtabsItemsforNewForms}
                  activeNavTabId={activeRightNavTabId}
                  type="tabs"
                  fill={false}
                  justified={false}
                  activeNavtabOrder={(activeRightNavTabId) => {
                    setActiveRightNavTabId(activeRightNavTabId);
                  }}
                />
                <div className="overflow-x-hidden overflow-y-scroll children-scrollable">
                  <div>
                    {activeRightNavTabId == "0" && (
                      <>
                        <div className="row">
                          <div className="col-md-12 mb-3">
                            <div>
                              <div className="container-fluid">
                                <>
                                  <div className="mt-3">
                                    <div className="mb-1">
                                      {newForm?.title || ""}
                                    </div>
                                    <p className="text-muted">
                                      {newForm.description || ""}
                                    </p>
                                  </div>
                                  {newForm.title && <hr />}
                                </>
                                {newFormData?.map((ele: any, i: number) => (
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
                                            itemList={multipleChoiceForAddingQuestion[i]}
                                            inline={false}
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
                                            id="ForVie"
                                            label={""}
                                            selectItems={dropDownListForAddingQuestion[i]}
                                            onChange={() => { }}
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
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormsView;