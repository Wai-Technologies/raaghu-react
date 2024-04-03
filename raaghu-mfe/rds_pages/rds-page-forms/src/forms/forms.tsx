import React, { useEffect, useState } from "react";
import {
  RdsAlert,
  RdsButton,
  RdsIcon,
  RdsInput,
  RdsLabel,
  RdsNavtabs,
  RdsOffcanvas,
  RdsSearch,
} from "../../../rds-elements";

import {
  RdsCompAlertPopup,
  RdsCompDatatable,
  RdsCompFormsBasic,
  RdsCompFormsEmail,
} from "../../../rds-components";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../libs/state-management/hooks";
import { useNavigate } from "react-router-dom";
import {
  deleteForms,
  fetchForms,
  getForms,
  Saveforms,
  getAll2FormsQuestions,
  SaveFormsSendResponse,
} from "../../../../libs/state-management/forms/forms-slice";
import { useTranslation } from "react-i18next";
import moment from "moment";
import "moment-timezone";
const Forms = () => {
  const dispatch = useAppDispatch();
  const forms = useAppSelector((state) => state.persistedReducer.forms);

  const navigate = useNavigate();
  const [skipCount, setSkipCount] = useState<number>(0);
  const [recordsPerPage, setRecordsPerPage] = useState<number>(10);
  const [totalRecords, setTotalRecords] = useState<number | null>(0);
  const [formsData, setFormsData] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');
  const { t } = useTranslation();
  const [alert, setAlert] = useState({
    showAlert: false,
    message: "",
    success: false,
  });
  const [alertOne, setAlertOne] = useState(false);
  const [inputReset, setInputReset] = useState(false);
  useEffect(() => {
    setAlert({
      showAlert: forms?.alert,
      message: t(forms?.alertMessage),
      success: forms?.success,
    });
    setTimeout(() => {
      setAlert({
        showAlert: false,
        message: "",
        success: false,
      });
    }, 2000);
  }, [formsData]);
  useEffect(() => {
    dispatch(
      fetchForms({
        skipCount: skipCount,
        maxResultCount: recordsPerPage,
        filter: searchTerm
      }) as any
    );
  }, [dispatch, skipCount, recordsPerPage, debouncedSearchTerm]);

  useEffect(() => {
    const tempData: any[] = [];
    if (forms?.forms) {
      forms?.forms?.items?.map((e: any) => {
        const creationDate = moment
          .utc(e.creationTime)
          .tz("Asia/Kolkata")
          .format("YYYY-MM-DD HH:mm:ss");
        let updatedDate = e.lastModificationTime
          ? moment
            .utc(e.lastModificationTime)
            .tz("Asia/Kolkata")
            .format("YYYY-MM-DD HH:mm:ss")
          : "--";
        const item = {
          title: e.title,
          description: e.description,
          creationTime: creationDate,
          id: e.id,
          lastModificationTime: updatedDate,
        };
        tempData.push(item);
      });
      setFormsData(tempData);
      setTotalRecords(forms?.forms?.totalCount);
    }
  }, [forms?.forms]);

  const offCanvasHandler = () => { };
  const tableHeaders = [
    {
      displayName: t("Forms.Title"),
      key: "title",
      datatype: "text",
      dataLength: 30,
      required: true,
      sortable: true,
    },
    {
      displayName: t("Forms.Description"),
      key: "description",
      datatype: "tooltip",
      dataLength: 30,
      required: true,
      sortable: true,
    },
    {
      displayName: t("Forms.UpdatedAt"),
      key: "lastModificationTime",
      datatype: "text",
      dataLength: 30,
      required: true,
      sortable: true,
    },
    {
      displayName: t("Forms.CreatedAt"),
      key: "creationTime",
      datatype: "text",
      dataLength: 90,
      required: true,
      sortable: true,
    },
  ];

  const [tableRowId, setTableRowId] = useState("");
  const baseUrl = window.location.origin;
  const formsResponseUrl = `${baseUrl}/forms/forms-response/`;
  const body = "I've invited you to fill in a form: " + formsResponseUrl;
  const [formsEmailData, setFormsEmailData] = useState<any>({
    to: "",
    body: body,
  });
  const scopeSelection = (rowData: any, actionId: any) => {
    const rowDataString = String(rowData.id);
    setTableRowId(rowDataString);
    dispatch(getForms(rowDataString) as any);
    dispatch(getAll2FormsQuestions(rowDataString) as any);
    const tempEmailData = formsEmailData;
    tempEmailData.body = `${body}${rowData.id}`
    setFormsEmailData({ ...tempEmailData, subject: rowData.title });
    if (actionId === "view") {
      const encodedId = encodeURIComponent(rowDataString);
      navigate(`/forms/forms-view/${encodedId}`);
    }
  };
  function onDeleteHandler(e: any) {
    dispatch(deleteForms(tableRowId) as any).then((res: any) => {
      dispatch(
        fetchForms({
          skipCount: skipCount,
          maxResultCount: recordsPerPage,
        }) as any
      );
    });
    setAlertOne(true);
  }

  const addFormHandler = () => {
    navigate(`/forms/forms-view/${"new-form"}`);
  };

  const actions = [
    { id: "view", displayName: t("Forms.View") },
    { id: "send", displayName: t("Forms.Send"), offId: "forms-send-offc" },
    {
      id: "delete",
      displayName: t("AbpUi.Delete"),
      modalId: "form-delete-off",
    },
  ];

  const [saveNewFormData, setSaveNewFormData] = useState<any>({
    title: "",
    description: "",
  });
  const [basicFormData, setBasicFormData] = useState({
    title: "",
    description: "",
  });
  // clear input after use
  const handlerCloseOffcanvas = () => {
    setBasicFormData({ title: "", description: "" });
    setInputReset(!inputReset);
  };

  const navtabsSendItems = [
    { label: t("Forms.Email"), tablink: "#nav-email", id: 0 },
    { label: t("Forms.Link"), tablink: "#nav-link", id: 1 },
  ];
  const [showNextSendTab, setShowNextSendTab] = useState(false);
  const [activeNavTabSendId, setActiveNavTabSendId] = useState("0");
  const [copybtn, setCopyBtn] = useState("clipboard");
  function handleCopyLink(event: any, id: any) {
    const linkValueToCopy = `${formsResponseUrl}${id}`;
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
  //  useEffect(())
  function handleEmailSubmit(_data: any) {
    dispatch(SaveFormsSendResponse(_data) as any);
  }
  //paginationa handling
  const paginationHandler = (currentPage: number, recordsPP: number) => {
    const skipCount = recordsPP * (currentPage - 1);
    if (recordsPP !== recordsPerPage) {
      setRecordsPerPage(recordsPP);
    }
    setSkipCount(skipCount);
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debugger
    const value = e.target.value;
    setSearchTerm(value);    
};
useEffect(() => {
  const debounceTimer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
  }, 500); // Adjust the delay as needed (e.g., 500ms)

  return () => {
      clearTimeout(debounceTimer);
  };
}, [searchTerm]);


  return (
    <div className="container-fluid p-0 m-0">
      <div className="row">
        <div className="col-md-12">
          <div className="card px-4 py-4 border-0 rounded-0 card-full-stretch">
            <div className="row">              
              <div className="col-12 col-lg-4 col-md-6 col-xl-3 col-xxl-3 mb-2">
                <RdsSearch
                  placeholder={t("Search") || ""}
                  labelPosition="bottom"
                  value={searchTerm}
                  size="small"
                  onChange={handleSearchChange}
                />
              </div>
              <div className="col-12 col-lg-8 col-md-6 col-xl-9 col-xxl-9 d-flex justify-content-end mb-3">
                <RdsButton
                  type={"button"}
                  size="small"
                  label={t("New Form") || ""}
                  icon="plus"
                  iconColorVariant="light"
                  iconFill={false}
                  iconStroke={true}
                  iconHeight="12px"
                  iconWidth="12px"
                  colorVariant="primary"
                  class="me-2"
                  showLoadingSpinner={true}
                  onClick={addFormHandler}
                ></RdsButton>
              </div>
            </div>
            <RdsCompDatatable
              actionPosition="right"
              tableHeaders={tableHeaders}
              tableData={formsData}
              actions={actions}
              recordsPerPageSelectListOption={true}
              onActionSelection={scopeSelection}
              noDataheaderTitle={t("No Records Available") || ""}
              noDataTitle={t("Click on the button to add") || ""}
              illustration={true}
              pagination={true}
              totalRecords={totalRecords}
              recordsPerPage={recordsPerPage}
              onPaginationHandler={paginationHandler}
            ></RdsCompDatatable>
            <div className={`offset-md-4 col-md-4 mt-3 col-12 ${totalRecords == 10 ? 'position-sticky' : 'position-absolute'} position-lg-relative bottom-0 mb-3 custom-responsive-alert`}>
              {alert.showAlert && alertOne && (
                <RdsAlert
                  alertmessage={alert.message}
                  size="small"
                  colorVariant={alert.success ? "success" : "danger"}
                ></RdsAlert>
              )}
            </div>
            <RdsCompAlertPopup
              messageAlert={t("Forms.FormDeletionConfirmationMessage") || ""}
              alertID="form-delete-off"
              onSuccess={onDeleteHandler}
            />
          </div>
        </div>

        <RdsOffcanvas
          canvasTitle={t("Forms.Form:SendFormHeader")}
          onclick={offCanvasHandler}
          placement="end"
          offcanvaswidth={650}
          backDrop={true}
          scrolling={false}
          preventEscapeKey={false}
          offId="forms-send-offc"
        >
          <>
            <div>
              <RdsNavtabs
                navtabsItems={navtabsSendItems}
                type="tabs"
                isNextPressed={showNextSendTab}
                activeNavTabId={activeNavTabSendId}
                activeNavtabOrder={(activeNavTabSendId) => {
                  setActiveNavTabSendId(activeNavTabSendId),
                    setShowNextSendTab(false);
                }}
              />
              {activeNavTabSendId == "0" && showNextSendTab == false && (
                <>
                  <div>
                    <RdsCompFormsEmail
                      formsEmailData={formsEmailData}
                      handleSubmit={(data: any) => {
                        handleEmailSubmit(data);
                      }}
                    ></RdsCompFormsEmail>
                  </div>
                </>
              )}
              {activeNavTabSendId == "1" && showNextSendTab == false && (
                <>
                  <div className="mt-3">
                    <div className="mb-2">
                      <RdsLabel label={t("Forms.Link") || ""}></RdsLabel>
                    </div>
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        value={`${formsResponseUrl}${tableRowId}`}
                      />
                      <span className="input-group-text" id="basic-addon12">
                        <RdsIcon
                          classes="cursor-pointer"
                          name={copybtn}
                          height="20px"
                          width="20px"
                          fill={false}
                          stroke={true}
                          onClick={(event: any) => { handleCopyLink(event, tableRowId) }}
                        />
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </>
        </RdsOffcanvas>
      </div>
    </div>
  );
};

export default Forms;