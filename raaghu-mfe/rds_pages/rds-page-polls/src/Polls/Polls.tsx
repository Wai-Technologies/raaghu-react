import React, { useState, useEffect } from "react";
import {
    RdsButton,
    RdsOffcanvas,
    RdsNavtabs,
    RdsProgressBar,
    RdsLabel,
    RdsAlert,
    RdsIcon,
} from "../../../rds-elements";
import {
    RdsCompAlertPopup,
    RdsCompDatatable,
    RdsCompPollsOption,
    RdsCompPollsQuestion,
} from "../../../rds-components";
import "./Polls.css";
import {
    useAppDispatch,
    useAppSelector,
} from "../../../../libs/state-management/hooks";
import {
    deletePolls,
    getPollDataById,
    fetchPolls,
    resultData,
    SavePolls,
    UpdatePollsData,
    Widgets,
} from "../../../../libs/state-management/polls/polls-slice";
import { useTranslation } from "react-i18next";
import { deletePollRequest, getPoll1Request, getPollRequest, getPollResultRequest, postPollRequest, putPollRequest } from "../../../../libs/state-management/poll-admin/poll-admin-slice";

const Polls = (props: any) => {
    const dispatch = useAppDispatch();
    const [skipCount, setSkipCount] = useState<number>(0);
    const [maxResultCount, setMaxResultCount] = useState<number>(10);
    const [totalRecords, setTotalRecords] = useState<number | null>(0);
    const polls = useAppSelector((state) => state.persistedReducer.polls);
    const { t } = useTranslation();
    const [activeNavTabId, setActiveNavTabId] = useState("0");
    const [activeNavTabIdEdit, setActiveNavTabIdEdit] = useState<any>("0");
    const [inputReset, setInputReset] = useState(false)

    const navtabsItems = [
        { label: t("CmsKit.Question"), tablink: "#nav-question", id: "0" },
        { label: t("CmsKit.Options"), tablink: "#nav-option", id: "1" },
    ];

    const navtabsItemsEdit = [
        { label: t("CmsKit.Question"), tablink: "#nav-questionEdit", id: "0" },
        { label: t("CmsKit.Options"), tablink: "#nav-optionEdit", id: "1" },
    ];


    const tableHeaders = [
        {
            displayName: t("CmsKit.Question"),
            key: "question",
            datatype: "text",
            sortable: true,
            required: true,
            dataLength: 30,
        },
        {
            displayName: t("CmsKit.Name"),
            key: "name",
            datatype: "text",
            sortable: true,
            required: true,
            dataLength: 30,
        },
        {
            displayName: t("Code"),
            key: "code",
            datatype: "text",
            sortable: true,
            required: true,
            dataLength: 30,
        },
        {
            displayName: t("CmsKit.VoteCount"),
            key: "votecount",
            datatype: "number",
            sortable: true,
            required: true,
            dataLength: 30,
        },
    ];
    const actions = [
        { id: "edit", displayName: t("AbpUi.Edit"), offId: "poll-edit-off" },
        { id: "delete", displayName: t("AbpUi.Delete"), modalId: "poll-delete-off" },
        { id: "result", displayName: t("CmsKit.ShowResults"), offId: "show-result-off" },
        {
            id: "entity-widgetcode-off",
            displayName: t("CmsKit.CopyWidgetCode")
        },
    ];
    const [questionData, setQuestionData] = useState({
        question: "",
        code: "",
        widget: null,
        name: null,
        allowMultipleVote: false,
        showVoteCount: false,
        showResultWithoutGivingVote: false,
        showHoursLeft: false,
        startDate: JSON.stringify(new Date),
        endDate: null,
        resultShowingEndDate: null,
    });
    const [Alert, setAlert] = useState({ show: false, message: "", color: "" });

    const [getCreateNewPollsOptionData, setGetCreateNewPollsOptionData] = useState<any[]>([]);
    const [pollsOptionsData, setPollsOptionsData] = useState([]);

    function getPollsOptionData(data: any) {
        setPollsOptionsData(data);
    }

    function getPollsEditOptionData(data: any) {
        setEditPollsOptionData(data);
    }
    const isCodeValid = (code: any) => {
        if (!code || code.length === 0) {
            return false;
        }
        return true;
    };
    const isQuestionValid = (question: any) => {
        if (!question || question.length === 0) {
            return false;
        }
        return true;
    };

    const isFormValid = isQuestionValid(questionData.question) && isCodeValid(questionData.code);
    const [editQuestionData, setEditQuestionData] = useState({
        question: "",
        code: "",
        name: "",
        widget: "",
        showHoursLeft: false,
        allowMultipleVote: false,
        voteCount: false,
        result: false,
        startDate: "",
        endDate: "",
        resultEndDate: "",
        pollOptions: []
    });
    const [editPollsOptionData, setEditPollsOptionData] = useState([]);

    useEffect(() => {

        if (polls.pollsEdit) {
            setEditQuestionData(polls.pollsEdit);
            const tempOptionsData = polls.pollsEdit.pollOptions.map((res: any) => {
                const item = {
                    id: res.id,
                    text: res.text,
                    order: res.order,
                    voteCount: res.voteCount,
                    actions: (
                        <>
                            <div className="d-flex justify-content-center">
                                <div className="mx-3">
                                    <RdsIcon
                                        width="17px"
                                        height="17px"
                                        name="pencil"
                                        tooltip={true}
                                        tooltipTitle={"Edit"}
                                        stroke={true}
                                        colorVariant="primary"
                                        onClick={() => { }}
                                        dataTestId="pencil"
                                    ></RdsIcon>
                                </div>
                                <RdsIcon
                                    width="17px"
                                    height="17px"
                                    name="delete"
                                    stroke={true}
                                    colorVariant="danger"
                                    onClick={() => { }}
                                ></RdsIcon>
                            </div>
                        </>
                    ),
                };
                return item;
            });
            setEditPollsOptionData(tempOptionsData);
        }
    }, [polls.pollsEdit]);


    const [pollsResultData, setPollsResultData] = useState<any>([]);
    useEffect(() => {

        if (polls.resultData) {
            setPollsResultData(polls.resultData.pollResultDetails);
        }
    }, [polls.resultData]);
    const [rowDataId, setRowDataId] = useState<any>();
    function scopeSelection(rowData: any, actionId: any) {
        setRowDataId(rowData.id);
        dispatch(getPollResultRequest(rowData.id) as any);
        dispatch(getPoll1Request(rowData.id) as any);
        if (actionId === "entity-widgetcode-off") {
            const widgetCode = `[Widget Type="Poll" Code="${rowData.code}"]`;
            navigator.clipboard.writeText(widgetCode)
                .then(() => {
                    setAlert({
                        ...Alert,
                        show: true,
                        message: t("Widget code has been copied to the clipboard."),
                        color: "success",
                    });
                })
        }
        dispatch(getPollRequest({ skipCount: skipCount, maxResultCount: maxResultCount }) as any);
    }
    const editDataHandler = () => {

        const removeIdsFromPollsOptions = editPollsOptionData.map((res: any, index: number) => {
            let item: any;
            if (res.id.length > 30) {
                item = {
                    id: res.id,
                    order: index + 1,
                    text: res.text,
                    voteCount: res.voteCount
                };
            }
            else {
                item = {
                    order: index + 1,
                    text: res.text,
                    voteCount: res.voteCount
                };
            }
            return item;
        });

        const data = { ...editQuestionData, pollOptions: removeIdsFromPollsOptions };
        dispatch(putPollRequest({ id: rowDataId, requestBody: data }) as any).then(
            (res: any) => {
                if (res.type.includes("rejected")) {
                    setAlert({
                        ...Alert,
                        show: true,
                        message: t("Your request has been denied"),
                        color: "danger",
                    });
                } else {
                    setAlert({
                        ...Alert,
                        show: true,
                        message: t("Poll updated Successfully"),
                        color: "success",
                    });
                }
                dispatch(getPollRequest({ skipCount: skipCount, maxResultCount: maxResultCount }) as any);
            }
        );
    };

    const handlerCloseOffcanvas = () => {
        setQuestionData({
            question: "",
            code: "",
            widget: null,
            name: null,
            allowMultipleVote: false,
            showVoteCount: false,
            showResultWithoutGivingVote: false,
            showHoursLeft: false,
            startDate: JSON.stringify( new Date),
            endDate: null,
            resultShowingEndDate: null,
        })
        setPollsOptionsData([]);
        setInputReset(!inputReset);
        setActiveNavTabId("0");
    };
    function handleAddNewPoll() {
        const allData = {
            ...questionData, pollOptions: getCreateNewPollsOptionData,
        };
        dispatch(postPollRequest({requestBody:allData}) as any).then((res: any) => {
            if (res.type.includes("rejected")) {
                setAlert({
                    ...Alert,
                    show: true,
                    message: t("Your request has been denied"),
                    color: "danger",
                });
            } else {
                setAlert({
                    ...Alert,
                    show: true,
                    message: t("Poll added Successfully"),
                    color: "success",
                });
            }
            dispatch(getPollRequest({ skipCount: skipCount, maxResultCount: maxResultCount }) as any);
        });
        handlerCloseOffcanvas();

    }

    function deleteHandler(data: any) {
        dispatch(deletePollRequest(rowDataId) as any).then((res: any) => {
            if (res.type.includes("rejected")) {
                setAlert({
                    ...Alert,
                    show: true,
                    message: t("Your request has been denied"),
                    color: "danger",
                });
            } else {
                setAlert({
                    ...Alert,
                    show: true,
                    message: t("Poll deleted Successfully"),
                    color: "success",
                });
            }
            dispatch(getPollRequest({ skipCount: skipCount, maxResultCount: maxResultCount }) as any);
        });
    }

    useEffect(() => {
        dispatch(getPollRequest({ skipCount: skipCount, maxResultCount: maxResultCount }) as any);
    }, [dispatch, skipCount, maxResultCount]);


    const [getDataPolls, setGetDataPolls] = useState<any>([]);

    useEffect(() => {
        const temp: any[] = [];
        if (polls.polls?.items) {
            polls.polls.items?.map((res: any) => {

                const item = {
                    question: res.question,
                    code: res.code,
                    name: res.name,
                    votecount: res.voteCount,
                    id: res.id
                };
                temp.push(item);
            });
            setGetDataPolls(temp);
            setTotalRecords(polls?.polls?.totalCount);
        }
    }, [polls.polls]);


    function getEditPollsQuestionData(data: any) {

        setEditQuestionData(data);
    }
    useEffect(() => {
        const timer = setTimeout(() => {
            setAlert({ ...Alert, show: false });
        }, 2000);
        return () => clearTimeout(timer);
    }, [polls.polls]);

    //paginationa handling
    const paginationHandler = (currentPage: number, recordsPP: number) => {
        const skipCount = recordsPP * (currentPage - 1);
        setSkipCount(skipCount);
        setMaxResultCount(recordsPP);
    };

    const onResetEditOffcanvas = () => {
        setActiveNavTabIdEdit("0");
    }

    return (
        <>
            <div className="container-fluid p-0 m-0">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card px-4 py-4 border-0 rounded-0 card-full-stretch">
                            <div className="row">
                                <div className="col-md-4">
                                    {Alert.show && (
                                        <RdsAlert
                                            alertmessage={Alert.message}
                                            size="small"
                                            colorVariant={Alert.color}
                                        ></RdsAlert>
                                    )}
                                </div>
                                <div className="col-md-8 d-flex mb-3 justify-content-end ">
                                    <RdsOffcanvas
                                        canvasTitle={t("CmsKit.NewPoll")}
                                        placement="end"
                                        offcanvasbutton={
                                            <div className="my-1">
                                                <RdsButton
                                                    icon="plus"
                                                    iconColorVariant="light"
                                                    size="small"
                                                    type="button"
                                                    block={false}
                                                    iconHeight="15px"
                                                    iconWidth="15px"
                                                    iconFill={false}
                                                    iconStroke={true}
                                                    showLoadingSpinner={true}
                                                    colorVariant="primary"
                                                    label={t("CmsKit.NewPoll") || ""}
                                                />
                                            </div>
                                        }
                                        backDrop={true}
                                        scrolling={false}
                                        preventEscapeKey={false}
                                        offId={"polls-add-new"}
                                        onClose={handlerCloseOffcanvas}
                                    >
                                        <RdsNavtabs
                                            navtabsItems={navtabsItems}
                                            type={"tabs"}
                                            activeNavTabId={activeNavTabId}
                                            activeNavtabOrder={(activeNavTabId) => {
                                                setActiveNavTabId(activeNavTabId);
                                            }}
                                            justified={false}
                                        >
                                            {activeNavTabId == "0" && (
                                                <RdsCompPollsQuestion
                                                    widgetList={[
                                                        { option: "a", value: "a" },
                                                        { option: "b", value: "b" },
                                                    ]}
                                                    getPollsQuestion={(data: any) => {
                                                        setQuestionData(data);
                                                    }
                                                    }
                                                    questionData={questionData}
                                                    reset={inputReset}
                                                ></RdsCompPollsQuestion>

                                            )}
                                            {activeNavTabId == "1" && (
                                                <RdsCompPollsOption
                                                    optionsData={pollsOptionsData}
                                                    getPollsOptionData={getPollsOptionData}
                                                />

                                            )}
                                        </RdsNavtabs>
                                        <div className="pb-3 footer-buttons d-flex flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row gap-2">
                                            <RdsButton
                                                class="me-2"
                                                label={t("AbpUi.Cancel") || ""}
                                                colorVariant="primary"
                                                size="small"
                                                databsdismiss="offcanvas"
                                                type="button"
                                                isOutline={true}
                                                onClick={handlerCloseOffcanvas}
                                            />
                                            <RdsButton
                                                class="me-2"
                                                label={t("AbpUi.Save") || ""}
                                                size="small"
                                                isDisabled={!isFormValid}
                                                colorVariant="primary"
                                                databsdismiss="offcanvas"
                                                type="button"
                                                isOutline={false}
                                                showLoadingSpinner={true}
                                                onClick={handleAddNewPoll}
                                            />
                                        </div>
                                    </RdsOffcanvas>
                                </div>
                            </div>
                            <RdsCompDatatable
                                actionPosition="right"
                                tableHeaders={tableHeaders}
                                actions={actions}
                                tableData={getDataPolls}
                                pagination={true}
                                recordsPerPageSelectListOption={true}
                                noDataheaderTitle={t("No Records Available") || ""}
                                noDataTitle={t("Click on the button to add") || ""}
                                illustration={true}
                                onActionSelection={scopeSelection}
                                totalRecords={totalRecords}
                                recordsPerPage={maxResultCount}
                                onPaginationHandler={paginationHandler}
                            ></RdsCompDatatable>
                            <RdsOffcanvas
                                canvasTitle={t("Edit Poll")}
                                placement="end"
                                offId="poll-edit-off"
                                offcanvaswidth={650}
                                backDrop={true}
                                scrolling={false}
                                preventEscapeKey={false}
                                onClose={onResetEditOffcanvas}
                            >
                                <RdsNavtabs
                                    navtabsItems={navtabsItemsEdit}
                                    type={"tabs"}
                                    activeNavTabId={activeNavTabIdEdit}
                                    activeNavtabOrder={(activeNavTabIdEdit) => {
                                        setActiveNavTabIdEdit(activeNavTabIdEdit);
                                    }}
                                    justified={false}>

                                    {activeNavTabIdEdit == "0" && (
                                        <RdsCompPollsQuestion
                                            widgetList={[
                                                { option: "a", value: "a" },
                                                { option: "b", value: "b" },
                                            ]}
                                            questionData={editQuestionData}
                                            getPollsQuestion={getEditPollsQuestionData}
                                        ></RdsCompPollsQuestion>
                                    )}

                                    {activeNavTabIdEdit == "1" && (
                                        <>
                                            <RdsCompPollsOption optionsData={editPollsOptionData} getPollsOptionData={getPollsEditOptionData}></RdsCompPollsOption>
                                        </>
                                    )}
                                </RdsNavtabs>
                                <div className="pb-3 footer-buttons d-flex flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row gap-2">
                                    <RdsButton
                                        class="me-2"
                                        label={t("AbpUi.Cancel") || ""}
                                        colorVariant="primary"
                                        size="small"
                                        databsdismiss="offcanvas"
                                        type="button"
                                        isOutline={true}
                                        onClick={onResetEditOffcanvas}
                                    />
                                    <RdsButton
                                        class="me-2"
                                        label={t("AbpUi.Save") || ""}
                                        size="small"
                                        colorVariant="primary"
                                        databsdismiss="offcanvas"
                                        type="button"
                                        isOutline={false}
                                        showLoadingSpinner={true}
                                        onClick={editDataHandler}
                                    />
                                </div>
                            </RdsOffcanvas>
                            <RdsOffcanvas
                                canvasTitle={t("CmsKit.Results")}
                                placement="end"
                                offId="show-result-off"
                                offcanvaswidth={700}
                                backDrop={true}
                                scrolling={false}
                                preventEscapeKey={false}
                            >
                                {pollsResultData.length && pollsResultData.map((e: any) => (<>
                                    <div className="row mx-4">
                                        <RdsLabel label={e.text} size="16px"></RdsLabel>
                                    </div>
                                    {/* <div className="row p-4">
                <RdsProgressBar
                  colorVariant="primary"
                  displayPercentage
                  height={15}
                  progressWidth={e.voteCount}
                  role="single"
                  striped="default"
                />
              </div> */}
                                    <div className="input-group mb-3">
                                        <div className="form-control border-0">
                                            <RdsProgressBar
                                                colorVariant="primary"
                                                displayPercentage={false}
                                                height={15}
                                                progressWidth={e.voteCount}
                                                role={"single"}
                                                striped={false}
                                            />
                                        </div>
                                        <div className="input-group-prepend">
                                            <span className="input-group-text border-0 bg-transparent" id="basic-addon1">
                                                <RdsLabel label={`${e.voteCount}%`} size="16px"></RdsLabel>
                                            </span>
                                        </div>
                                    </div>
                                </>))}

                                <div className="pb-3 footer-buttons d-flex flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row gap-2">
                                    <RdsButton
                                        class="me-2"
                                        label={t("AbpUi.Cancel") || ""}
                                        type="button"
                                        databsdismiss="offcanvas"
                                        isOutline={true}
                                        colorVariant="primary"
                                        onClick={onResetEditOffcanvas}
                                    ></RdsButton>
                                </div>
                            </RdsOffcanvas>
                            <RdsCompAlertPopup
                                alertID="poll-delete-off"
                                onSuccess={deleteHandler}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Polls;


