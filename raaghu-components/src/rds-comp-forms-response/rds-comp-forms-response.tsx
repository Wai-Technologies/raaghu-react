import { useTranslation } from "react-i18next";
import {
  RdsTextArea,
  RdsLabel,
  RdsRadioButton,
  RdsCheckbox,
  RdsSelectList,
  RdsButton,
  RdsPagination,
} from "../rds-elements";
import RdsCompAlertPopup from "../rds-comp-alert-popup";
import React, { useEffect, useState } from "react";

export interface RdsCompFormsResponseProps {
  response?: any;
  questions?: any;
  formsData?: any;
  onDeleteHandler?: any;
}

const RdsCompFormsResponse = (props: RdsCompFormsResponseProps) => {
  const [multipleChoice, setMultipleChoice] = useState<any[]>([]);
  const [selectedData, setSelectedData] = useState<any[]>([]);
  const [formPreview, setFormPreview] = useState<any>([]);
  const [dropDownList, setDropDownList] = useState<any>([]);
  const [count, setCount] = useState(1);
  // const forms = props.formsData;
  // const responseCount = props.response.totalCount;
  const forms = props.formsData;
  const responseCount = props.response?.totalCount || 0;
  const totalCount = forms?.getResponses?.items?.length || 0;

  // const totalCount = forms.getResponses?.items?.length;
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
      return null; // If no match is found, you can handle this case accordingly
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

  useEffect(() => { }, [count]);

  return (
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
                              checkedId={ele.choiceId} value={""}                            ></RdsRadioButton>
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
              props.onDeleteHandler(forms?.getResponses?.items[count - 1]?.id);
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
  );
};
export default RdsCompFormsResponse;