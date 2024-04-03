import React, { useEffect, useState, useRef } from "react";
import {
  RdsAlert,
  RdsButton,
  RdsDatePicker,
  RdsInput,
  RdsLabel,
  RdsNavtabs,
  RdsOffcanvas,
  RdsSearch,
  RdsSelectList,
} from "../../../rds-elements";
import { useTranslation } from "react-i18next";
import { RdsCompAlertPopup, RdsCompDatatable } from "../../../rds-components";
import {
  getUserDelegationDelegatedUsers,
  getUserDelegationMyDelegatedUsers,
  getUserDelegationActiveDelegations,
  getUserDelegationUserLookup,
  postUserDelegationDelegateNewUser,
  postUserDelegationDeleteDelegation,
} from "../../../../libs/state-management/public.api";
import {
  useAppSelector,
  useAppDispatch,
} from "../../../../libs/state-management/hooks";
import {
  userConfigurationService,
  delegateImpersonationService,
} from "../../../../../raaghu-react-core/src/index";
const AuthorityDelegation = () => {
  const { t } = useTranslation();
  const dispatch: any = useAppDispatch();
  const [userLookup, setUserLookup] = useState([]);
  const [delegateNewUser, setDelegateNewUser] = useState<any>({
    endTime: undefined,
    startTime: undefined,
    targetUserId: undefined,
  });
  const [activePageId, setActivePageId] = useState("0");
  const [delegateUserTable, setDelegateUserTable] = useState<any>([]);
  const [filteredDelegateUserTable, setFilteredDelegateUserTable] =
    useState<any>([]);
  const [myDelegateUserTable, setMyDelegateUserTable] = useState<any>([]);
  const [filteredMyDelegateUserTable, setFilteredMyDelegateUserTable] =
    useState<any>([]);
  const [userName, setUserName] = useState("");
  const [isTouch, setIsTouch] = useState(false);
  const [delegateUserRowId, setDelegateUserRowId] =
    useState<null | string>(null);
  const [Alert, setAlert] = useState({ show: false, message: "", color: "" });
  const [searchTerm, setSearchTerm] = useState<any>({
    delegateUser: "",
    myDelegateUser: "",
  });
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<any>({
    userName: "",
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  // subscribing the store
  const userDelegation = useAppSelector(
    (state: any) => state.persistedReducer.authorityDelegation
  );
  useEffect(() => {
    if (userDelegation?.userLookup?.items) {
      setUserLookup(userDelegation.userLookup.items);
    }
  }, [userDelegation?.userLookup]);
  useEffect(() => {
    if (userDelegation?.delegateUsers?.items) {
      const tempData = userDelegation.delegateUsers.items.map((user: any) => {
        let isExpired = isEndTimeExpired(user.endTime);
        return {
          id: user.id,
          userName: user.userName,
          startTime: user.startTime,
          status: {
            badgeColorVariant: isExpired ? "danger" : "success",
            content: isExpired ? "Expired" : "Active",
          },
          endTime: user.endTime,
        };
      });
      setDelegateUserTable(tempData);
      setFilteredDelegateUserTable(tempData);
    }
  }, [userDelegation?.delegateUsers]);

  const actions = [
    {
      id: "delete",
      displayName: t("AbpUi.Delete"),
      modalId: "authDel-delete-off",
    },
  ];
  const actions2 = [
    {
      id: "login",
      displayName: t("AbpUi.Login"),
      icon: "right",
    },
  ];

  const tableHeadersDelegateUsers = [
    {
      displayName: t("Status"),
      key: "status",
      datatype: "badge",
    },
    {
      displayName: t("User name"),
      key: "userName",
      datatype: "text",
      sortable: true,
    },
    {
      displayName: t("Start Time"),
      key: "startTime",
      datatype: "text",
      sortable: true,
    },
    {
      displayName: t("End Time"),
      key: "endTime",
      datatype: "text",
      sortable: true,
    },
  ];

  const pageNavtabsItems = [
    { label: t("Delegated Users"), tablink: " #nav-delegated-users", id: "0" },
    {
      label: t("My Delegated Users"),
      tablink: " #nav-myDelegated-users",
      id: "1",
    },
  ];
  const isEndTimeExpired = (endTime: string) => {
    const currentTimestamp = Date.now();
    const endTimestamp = new Date(endTime).getTime();

    // Compare end timestamp with current timestamp
    return endTimestamp < currentTimestamp;
  };

  const formatDate = (inputDate: any) => {
    const dateObj = new Date(inputDate);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");

    // Set default time to 12:00 AM
    const hours = "00";
    const minutes = "00";
    const seconds = "00";

    // Include the date and default time portion in the format
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
  };
  const onDelegateDateRangeSelect = (startDate: any) => {
    const [start, end] = startDate;
    const currentDate = new Date();
    const formattedCurrentDate = formatDate(currentDate);

    let formattedStart = formatDate(start);
    let formattedEnd = formatDate(end);

    if (formattedStart === formattedCurrentDate) {
      const nextDay = new Date(currentDate);
      nextDay.setDate(nextDay.getDate() + 1);
      formattedEnd = formatDate(nextDay);
    }

    const yesterday = new Date(currentDate);
    yesterday.setDate(yesterday.getDate() - 1);
    if (formattedStart === formatDate(yesterday)) {
      const dayBeforeYesterday = new Date(yesterday);
      dayBeforeYesterday.setDate(dayBeforeYesterday.getDate() - 1);
      formattedStart = formatDate(dayBeforeYesterday);
      formattedEnd = formatDate(yesterday);
    }
    setDelegateNewUser({
      ...delegateNewUser,
      startTime: formattedStart,
      endTime: formattedEnd,
    });
  };

  const handleCloseOffcanvas = () => {
    setUserName("");
    setDelegateNewUser({
      endTime: undefined,
      startTime: undefined,
      targetUserId: undefined,
    });
    setIsTouch(false);
  };
  const handlerDelegateNewUser = () => {
    dispatch(postUserDelegationDelegateNewUser(delegateNewUser) as any).then(
      (res: any) => {
        if (
          res.type ==
          "authorityDelegation/postUserDelegationDelegateNewUser/fulfilled"
        ) {
          setAlert({
            ...Alert,
            show: true,
            message: t("Delegate user added Successfully"),
            color: "success",
          });
        } else {
          setAlert({
            ...Alert,
            show: true,
            message: t("Your request has been denied"),
            color: "danger",
          });
        }
        dispatch(getUserDelegationDelegatedUsers() as any);
      }
    );
  };

  useEffect(() => {
    // Set a 3-second timer to update the state
    const timer = setTimeout(() => {
      setAlert({ ...Alert, show: false });
    }, 3000);

    // Clean up the timer when the component unmounts or when the state changes
    return () => clearTimeout(timer);
  }, [userDelegation?.delegateUsers, userDelegation?.myDelegateUsers]);

  useEffect(() => {
    if (userDelegation?.myDelegateUsers?.items) {
      const tempData = userDelegation.myDelegateUsers.items.map((user: any) => {
        let isExpired = isEndTimeExpired(user.endTime);
        return {
          id: user.id,
          userName: user.userName,
          startTime: user.startTime,
          status: {
            badgeColorVariant: isExpired ? "danger" : "success",
            content: isExpired ? "Expired" : "Active",
          },
          endTime: user.endTime,
        };
      });
      setMyDelegateUserTable(tempData);
      setFilteredMyDelegateUserTable(tempData);
    }
  }, [userDelegation.myDelegateUsers]);

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    const value = e.target.value;
    setSearchTerm({ ...searchTerm, [key]: value });
  };

  const handlerDeleteConfirm = () => {
    dispatch(postUserDelegationDeleteDelegation(delegateUserRowId) as any).then(
      (res: any) => {
        if (
          res.type ==
          "authorityDelegation/postUserDelegationDeleteDelegation/fulfilled"
        ) {
          setAlert({
            show: true,
            message: t("AbpUi.SuccessfullyDeleted") || "",
            color: "success",
          });
        } else {
          setAlert({
            ...Alert,
            show: true,
            message: t("Your request has been denied"),
            color: "danger",
          });
        }
        dispatch(getUserDelegationDelegatedUsers() as any);
      }
    );
  };

  useEffect(() => {
    if (activePageId === "0") {
      dispatch(getUserDelegationDelegatedUsers() as any);
    } else {
      dispatch(getUserDelegationMyDelegatedUsers() as any);
    }
  }, [activePageId]);

  useEffect(() => {
    dispatch(getUserDelegationUserLookup({ filter: userName }) as any);
  }, [debouncedSearchTerm.userName]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setDebouncedSearchTerm({ ...debouncedSearchTerm, userName: userName });
    }, 300);
    return () => {
      clearTimeout(debounceTimer);
    };
  }, [userName]);
  useEffect(() => {
    if (activePageId === "0") {
      const filteredArray = delegateUserTable.filter((item: any) =>
        item.userName
          .toLowerCase()
          .includes(searchTerm.delegateUser.toLowerCase())
      );
      setFilteredDelegateUserTable(filteredArray);
    } else {
      const filteredArray = myDelegateUserTable.filter((item: any) =>
        item.userName
          .toLowerCase()
          .includes(searchTerm.myDelegateUser.toLowerCase())
      );
      setFilteredMyDelegateUserTable(filteredArray);
    }
  }, [searchTerm]);

  const handleOnclick = (e: any) => {
    setIsTouch(true);
    // Open the dropdown when typing in the input
    if (isDropdownOpen == false) {
      setIsDropdownOpen(true);
    }
  };

  const handlerUserNameChange = (event: any) => {
    // setIsTouch(true);
    setUserName(event.target.value);
    setDelegateNewUser({
      ...delegateNewUser,
      targetUserId: undefined,
    });
  };

  const handleOutsideClick = (event: any) => {
    // Check if the clicked element is outside of the input and dropdown
    if (
      inputRef.current &&
      !inputRef.current.contains(event.target) &&
      !event.target.closest(".dropdown-menu-input")
    ) {
      // Close the dropdown if clicked outside
      setIsDropdownOpen(false);
      if (!delegateNewUser.targetUserId && userName) {
        setUserName("");
      }
    }
  };

  useEffect(() => {
    // Attach the click event listener when the component mounts
    document.addEventListener("click", handleOutsideClick);

    // Detach the click event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handlerClickItem = (user: any) => {
    setUserName(user.userName);
    setDelegateNewUser({
      ...delegateNewUser,
      targetUserId: user.id,
    });
    setIsDropdownOpen(false);
  };
  const handlerClickNoItem = () => {
    setDelegateNewUser({
      ...delegateNewUser,
      targetUserId: undefined,
    });
    setUserName("");
    setIsDropdownOpen(false);
  };

  const handlerActions = (tableDataRow: any, actionId: any) => {
    setDelegateUserRowId(tableDataRow.id);
    if (activePageId == "1") {
      const dto = {
        grant_type: "Impersonation",
        scope: localStorage.getItem("REACT_APP_SCOPE") + "",
        client_id: localStorage.getItem("REACT_APP_CLIENT_ID") + "",
        UserDelegationId: tableDataRow.id,
      };
      delegateImpersonationService(dto).then(async (res: any) => {
        if (res.access_token) {
          localStorage.setItem("accessToken", res.access_token);
          localStorage.setItem("refreshToken", res.refresh_token);
          localStorage.setItem("expiresIn", res.expires_in);
          localStorage.setItem("loginAccessDate", Date());
          localStorage.setItem("auth", JSON.stringify(true));
          await userConfigurationService().then(async (res: any) => {
            if (res.currentUser.impersonatorUserId != null) {
              localStorage.setItem("isImpersonation", "true");
              localStorage.setItem("UserId", res.currentUser.UserId);
              localStorage.setItem("userName", res.currentUser.userName);
              localStorage.setItem("name", res.currentUser.name);
            }
            return res;
          });
          window.location.href = "/dashboard";
        }
      });
    }
  };
  return (
    <>
      <div className="container-fluid p-0 m-0">
        <div className="row">
          <div className="col-md-12">
            <div className="card border-0 px-4 py-4 rounded-0 card-full-stretch">
              <RdsNavtabs
                navtabsItems={pageNavtabsItems}
                type="tabs"
                activeNavTabId={activePageId}
                activeNavtabOrder={(activeNavTabId) => {
                  setActivePageId(activeNavTabId);
                }}
              />
              <div className="card-body px-0 py-xxl-3 py-xl-3 py-lg-3 py-md-3 py-0">
                {activePageId === "0" && (
                  <>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="card px-4 py-4 border-0 rounded-0 card-full-stretch">
                          <div className="row">
                            <div className="col-12 col-lg-4 col-md-6 col-xl-3 col-xxl-3 mb-2">
                              <RdsSearch
                                placeholder={t("Search") || ""}
                                size="small"
                                value={searchTerm.delegateUser}
                                onChange={(e) =>
                                  handleSearchChange(e, "delegateUser")
                                }
                              />
                            </div>
                            <div className="col-12 col-lg-8 col-md-6 col-xl-9 col-xxl-9 d-flex justify-content-end mb-3">
                              <RdsButton
                                icon="plus"
                                label={t("Delegate New User") || ""}
                                iconColorVariant="light"
                                iconHeight="12px"
                                iconWidth="12px"
                                iconFill={false}
                                iconStroke={true}
                                block={false}
                                size="small"
                                type="button"
                                colorVariant="primary"
                                databstoggle="offcanvas"
                                databstarget="#delegateNewUser"
                                showLoadingSpinner={true}
                                onClick={handleCloseOffcanvas}
                              ></RdsButton>
                            </div>
                          </div>
                          <RdsCompDatatable
                            actionPosition="left"
                            classes="table__userTable"
                            tableHeaders={tableHeadersDelegateUsers}
                            tableData={filteredDelegateUserTable}
                            noDataheaderTitle={t("No Records Available") || ""}
                            noDataTitle={t("Click on the button to add") || ""}
                            illustration={true}
                            actions={actions}
                            onActionSelection={handlerActions}
                            recordsPerPageSelectListOption={true}
                            pagination={true}
                            totalRecords={delegateUserTable.length}
                            recordsPerPage={10}
                          ></RdsCompDatatable>
                        </div>
                      </div>
                      <div
                        className={`offset-md-4 col-md-4 mt-3 col-12 ${
                          delegateUserTable.length == 10
                            ? "position-sticky"
                            : "position-absolute"
                        } position-lg-relative bottom-0 mb-3 custom-responsive-alert`}
                      >
                        {Alert.show && (
                          <RdsAlert
                            alertmessage={Alert.message}
                            size="small"
                            colorVariant={Alert.color}
                          ></RdsAlert>
                        )}
                      </div>
                      <div className="col-md-4"></div>
                      <RdsOffcanvas
                        placement="end"
                        canvasTitle={t("Delegate New User")}
                        offId="delegateNewUser"
                        backDrop={true}
                        scrolling={false}
                        preventEscapeKey={false}
                        onClose={handleCloseOffcanvas}
                        onclick={handleCloseOffcanvas}
                      >
                        <div className="row">
                          <div className="col-md-12">
                            <div className="dropdown w-100 text-start">
                              <label className="text-capitalize form-label ">
                                {" "}
                                {t("AbpAccount.UserName")}
                                <span className="text-danger ms-1">*</span>
                              </label>
                              <input
                                ref={inputRef}
                                type="text"
                                className={`form-control dropdown-toggle ${
                                  isDropdownOpen ? "show" : ""
                                } `}
                                onChange={handlerUserNameChange}
                                onClick={handleOnclick}
                                value={userName}
                                placeholder={t("AbpAccount.UserName")}
                                data-bs-target={`#inputSearch4`}
                                aria-controls={`inputSearch4`}
                                aria-expanded={isDropdownOpen ? true : false}
                              />

                              {!delegateNewUser.targetUserId && isTouch && (
                                <div className="form-control-feedback position-absolute end-0">
                                  <span className="text-danger">
                                    {t("AbpValidation.ThisFieldIsRequired.") ||
                                      ""}
                                  </span>
                                </div>
                              )}
                              <ul
                                className={`dropdown-menu dropdown-menu-input ${
                                  isDropdownOpen ? "show" : ""
                                }`}
                                aria-labelledby="inputSearch4"
                                id="inputSearch4"
                              >
                                {userLookup.length !== 0 ? (
                                  userLookup.map((user: any) => (
                                    <li
                                      key={user.id}
                                      onClick={() => handlerClickItem(user)}
                                    >
                                      {" "}
                                      <a className="dropdown-item mb-1">
                                        {user.userName}{" "}
                                      </a>
                                    </li>
                                  ))
                                ) : (
                                  <li onClick={handlerClickNoItem}>
                                    {" "}
                                    <a className="dropdown-item mb-1">
                                      {t("AbpUi.NoDataAvailableInDatatable") ||
                                        ""}
                                    </a>
                                  </li>
                                )}
                              </ul>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <RdsLabel
                              label={t("AbpAccount.DelegationDateRange")}
                              class="mb-2 mt-4 pt-2"
                            ></RdsLabel>
                            <RdsDatePicker
                              customDate={onDelegateDateRangeSelect}
                              type="advanced"
                              isDropdownOpen={false}
                            ></RdsDatePicker>
                          </div>
                        </div>

                        <div className="pb-3 d-flex flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row gap-2 footer-buttons">
                          <RdsButton
                            label={t("AbpUi.Cancel") || ""}
                            type="button"
                            colorVariant="primary"
                            size="small"
                            databsdismiss="offcanvas"
                            isOutline={true}
                            onClick={handleCloseOffcanvas}
                          ></RdsButton>
                          <RdsButton
                            label={t("AbpUi.Save") || ""}
                            type="button"
                            size="small"
                            class="ms-2"
                            colorVariant="primary"
                            databsdismiss="offcanvas"
                            databstoggle="offcanvas"
                            databstarget="#delegateNewUser"
                            onClick={handlerDelegateNewUser}
                          ></RdsButton>
                        </div>
                      </RdsOffcanvas>

                      {/* ****************** Delete Alert popup ********************* */}
                      <RdsCompAlertPopup
                        alertID="authDel-delete-off"
                        onSuccess={handlerDeleteConfirm}
                      ></RdsCompAlertPopup>
                    </div>
                  </>
                )}
                {activePageId === "1" && (
                  <>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="card px-4 py-4 border-0 rounded-0 card-full-stretch">
                          <div className="row">
                            <div className="col-12 col-lg-4 col-md-6 col-xl-3 col-xxl-3 mb-2">
                              <RdsSearch
                                placeholder={t("Search") || ""}
                                size="small"
                                value={searchTerm.myDelegateUser}
                                onChange={(e) =>
                                  handleSearchChange(e, "myDelegateUser")
                                }
                              />
                            </div>
                          </div>
                          <RdsCompDatatable
                            actionPosition="left"
                            classes="table__userTable"
                            tableHeaders={tableHeadersDelegateUsers}
                            tableData={filteredMyDelegateUserTable}
                            noDataheaderTitle={t("No Records Available") || ""}
                            noDataTitle={t("Click on the button to add") || ""}
                            illustration={true}
                            actions={actions2}
                            onActionSelection={handlerActions}
                            recordsPerPageSelectListOption={true}
                            pagination={true}
                            totalRecords={myDelegateUserTable.length}
                            recordsPerPage={10}
                          ></RdsCompDatatable>
                        </div>
                      </div>
                      <div
                        className={`offset-md-4 col-md-4 mt-3 col-12 ${
                          myDelegateUserTable.length == 10
                            ? "position-sticky"
                            : "position-absolute"
                        } position-lg-relative bottom-0 mb-3 custom-responsive-alert`}
                      >
                        {Alert.show && (
                          <RdsAlert
                            alertmessage={Alert.message}
                            size="small"
                            colorVariant={Alert.color}
                          ></RdsAlert>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AuthorityDelegation;
