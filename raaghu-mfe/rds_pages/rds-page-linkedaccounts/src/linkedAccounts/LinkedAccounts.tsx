import React, { useEffect, useState } from "react";
import { RdsAlert, RdsButton, RdsOffcanvas, RdsSearch } from "../../../rds-elements";
import { RdsCompAlertPopup, RdsCompDatatable } from "../../../rds-components";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector} from "../../../../libs/state-management/hooks";
import {
  getLinkUserRequest,
  postLinkUserGenerateLinkTokenRequest,
  postLinkUserUnlinkRequest
} from "../../../../libs/state-management/linkedaccounts/linkedaccounts-slice";
import { userConfigurationService, userLinkLoginService, } from "../../../../../raaghu-react-core/src/index";

const LinkedAccounts = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const linkAcc = useAppSelector(
    (state) => state.persistedReducer.linkedAccounts
  );
  const [tableData, setTableData] = useState<any>([]);
  const [totalRecords, setTotalRecords] = useState<number | null>(0);
  const [maxResultCount, setMaxResultCount] = useState<number>(10);
  const [tableDataRowid, setTableDataRowId] = useState<string>("");
  const [Alert, setAlert] = useState({ show: false, message: "", color: "" });
  const [skipCount, setSkipCount] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');
  const tableHeaders = [
    {
      displayName: t("Username"),
      key: "targetUserName",
      datatype: "text",
      sortable: true,
    },
    {
      displayName: t("Directly Linked"),
      key: "directlyLinked",
      datatype: "iconAvatarTitle",
    },
  ];

  const actions = [
    {
      id: "delete",
      displayName: "Delete",
      modalId: "delete_modal",
    },
    {
      id: "login_as_this_account",
      displayName: "Login as this account",
    },
  ];

  const userIdAdmin = localStorage.getItem("userId");

  useEffect(() => {
    dispatch(getLinkUserRequest() as any);
  }, [dispatch,  skipCount, maxResultCount, debouncedSearchTerm]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlert({ ...Alert, show: false });
    }, 3000);
    return () => clearTimeout(timer);
  }, [linkAcc]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
        setDebouncedSearchTerm(searchTerm);
    }, 500); 
    return () => {
        clearTimeout(debounceTimer);
    };
}, [searchTerm]);

  useEffect(() => {
    const tickIcon = {
      iconName: "tick",
      iconFill: false,
      iconStroke: true,
      iconColor: "success",
      iconWidth: "16px",
      iconHeight: "16px",
      iconStrokeWidth: "3",
    };
    const closeIcon = {
      iconName: "close",
      iconFill: false,
      iconStroke: true,
      iconColor: "danger",
      iconWidth: "16px",
      iconHeight: "16px",
      iconStrokeWidth: "3",
    };
    if (linkAcc?.linkUsers?.items) {
      const tableData = linkAcc?.linkUsers?.items.map((item: any) => {
        return {
          id: item.targetUserId,
          targetUserName: item.targetUserName,
          directlyLinked: item.directlyLinked ? tickIcon : closeIcon,
        };
      });
      setTableData(tableData);
      setTotalRecords(linkAcc?.linkUsers?.totalCount);
    }
  }, [linkAcc]);

  function showPopupModal() {
    const popupModal = document.getElementById("alert_popup");
    if (popupModal) {
      popupModal.classList.add("show");
      popupModal.style.display = "block";
    } else {
      hidePopupModal();
    }
  }

  function hidePopupModal() {
    const popupModal = document.getElementById("alert_popup");
    if (popupModal) {
      popupModal.classList.add("hide");
      popupModal.style.display = "none";
    }
  }

  function generateLinkToken() {
    dispatch(postLinkUserGenerateLinkTokenRequest() as any)
      .then((res: any) => {
        let linkToken: any;
        linkToken = encodeURIComponent(res.payload);
       const linkUrl = `${localStorage.getItem(
          "REACT_APP_API_URL"
        )}/Account/Login?LinkUserId=${userIdAdmin}&LinkToken=${linkToken}&ReturnUrl=${localStorage.getItem(
          "REACT_APP_URL"
        )}?handler=linkLogin&linkUserId=${userIdAdmin}`;
        window.location.href = linkUrl;
      })
      .then(() => {
        hidePopupModal();
      });
  }

  const paginationHandler = (currentPage: number, recordsPP: number) => {
    const skipCount = recordsPP * (currentPage - 1);
    setSkipCount(skipCount);
    setMaxResultCount(recordsPP);
  };

  const onActionSelection = async (rowData: any, actionId: any) => {
    setTableDataRowId(rowData.id);
   
    if (actionId === "delete") {
    }
    if (actionId === "login_as_this_account") {
      userLinkLoginService(
        "LinkLogin",
        localStorage.getItem("REACT_APP_SCOPE") + "",
        localStorage.getItem("REACT_APP_CLIENT_ID") + "",
        rowData.id,
      ).then(async (res: any) => {
        if (res.access_token) {
          localStorage.setItem("accessToken", res.access_token);
          localStorage.setItem("refreshToken", res.refresh_token);
          localStorage.setItem("expiresIn", res.expires_in);
          localStorage.setItem("loginAccessDate", Date());
          localStorage.setItem("auth", JSON.stringify(true));
          await userConfigurationService().then(async (res: any) => {           
            return res;
          });
          window.location.href = "/dashboard";
        }
      });        
    }
  };

  const DeleteHandler = () => {
    let unlinkPayload = {
      userId: tableDataRowid,
      tenantId: "",
    }
    dispatch(postLinkUserUnlinkRequest({requestBody:unlinkPayload}) as any).then((res:any) => {
      if (res.type == "linkUser/postLinkUserUnlinkRequest") {
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
            message: t("User unlinked successfully"),
            color: "success",
        });
    }
    dispatch(getLinkUserRequest() as any);
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
   };

  return (
    <>
      <div className="container-fluid m-0 p-0">
        <div className="row">
          <div className="col-md-12">
            <div className="card px-4 py-4 border-0 rounded-0 card-full-stretch">
              <div className="row">
                <div className="col-md-12">
                  <div className="row ">
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
                      <div className="d-flex justify-content-end">
                        <RdsButton
                          icon="plus"
                          label={t("New Link Account") || ""}
                          iconColorVariant="light"
                          iconHeight="12px"
                          iconWidth="12px"
                          iconFill={false}
                          iconStroke={true}
                          block={false}
                          size="small"
                          type="button"
                          colorVariant="primary"
                          data-bs-target="#alert_popup"
                          data-bs-toggle="modal"
                          onClick={() => {
                            showPopupModal();
                          }}
                        ></RdsButton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <RdsCompDatatable
                actionPosition="right"
                tableHeaders={tableHeaders}
                actions={actions}
                tableData={tableData}
                onActionSelection={onActionSelection}
                recordsPerPageSelectListOption={true}
                noDataheaderTitle={"No Records Available" || ""}
                noDataTitle={"Click on the button to add" || ""}
                illustration={true}
                pagination={true}
                totalRecords={totalRecords}
                recordsPerPage={maxResultCount}
                onPaginationHandler={paginationHandler}
              ></RdsCompDatatable>
              <div className={`offset-md-4 col-md-4 mt-3 col-12 ${totalRecords == 10 ? 'position-sticky' : 'position-absolute'} position-lg-relative bottom-0 mb-3 custom-responsive-alert`}>
                     {Alert.show && (
                  <RdsAlert
                    alertmessage={Alert.message}
                    size="small"
                    colorVariant={Alert.color}
                  ></RdsAlert>
                )}
                </div>
              <RdsCompAlertPopup
                alertConfirmation="Are you sure?"
                alertID="alert_popup"
                cancelButtonLabel="Cancel"
                colorVariant="danger"
                deleteButtonLabel="Yes"
                iconUrl="delete"
                cancelButtonColor="primary"
                deleteButtonColor="primary"
                messageAlert="You'll be logged out from the current account and logging in with another account. Once you do it, two accounts will be linked."
                onCancel={hidePopupModal}
                onSuccess={generateLinkToken}
              />
              <RdsCompAlertPopup
                alertID="delete_modal"
                onSuccess={DeleteHandler}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default LinkedAccounts;
