import React, { useEffect, useState } from "react";
import {
  RdsLabel,
  RdsButton,
  RdsInput,
  RdsCheckbox,
  RdsModal,
  RdsAlert,
  RdsDropdownList,
  RdsDatePicker,
  RdsIllustration,
} from "../rds-elements";
import "./rds-comp-login.css";
import { useTranslation } from "react-i18next";
import { AlertType } from "../../../raaghu-elements/src/rds-alert/rds-alert";
import RdsDatatable from "../../../raaghu-elements/src/rds-data-table";
import { ActionPosition } from "../../../raaghu-elements/src/rds-data-table/rds-data-table";
import { TooltipStyle } from "../../../raaghu-elements/src/rds-tooltip/rds-tooltip";
import RdsCompIcon from "../rds-comp-icon";
export interface RdsCompLoginProps {
  error?: any;
  getvalidTenantName: string;
  email: string;
  password: string;
  onDismissAlert?: () => any;
  onEmailChange?: () => any;
  onPasswordChange?: () => any;
  onLogin: (email: string, password: string, rememberMe: boolean) => any;
  onForgotPassword: (isForgotPasswordClicked?: boolean) => void;
  onRegister: (isRegisterClicked?: boolean) => void;
  currentTenant: any;
  validTenant: any;
  languageData: any;
  onClickHandler?: (
    $event: React.MouseEvent<HTMLLIElement>,
    val: string
  ) => void;
  languageLabel?: string;
  login?: string;
      tableHeaders?: {
          displayName: string;
          key: string;
          datatype: string;
          dataLength?: number | undefined;
          required?: boolean | undefined;
          sortable?: boolean | undefined;
          children?: React.ReactNode;
          selectvalue?: { value: string; displayText: string }[];
          colWidth?: string | undefined;
          disabled?: boolean | undefined;
          isEndUserEditing?: boolean | undefined;
      }[];
      tableData?: {}[];
      selectvalue?: { value: string; displayText: string }[];
      pagination?: boolean;
      onActionSelection(arg: any): any;
      totalRecords?: number;
      recordsPerPage?: number;
      recordsPerPageSelectListOption?: boolean;
}

const RdsCompLogin = (props: RdsCompLoginProps) => {
  const [email, setEmail] = useState(props.email);
  const [Alert, setAlert] = useState(props.error);
  const [password, setPassword] = useState(props.password);
  const [isForgotPasswordClicked, setIsForgotPasswordClicked] = useState(false);
  const [isRegisterClicked, setIsRegisterClicked] = useState(false);
  const [rememberMe, setrememberMe] = useState(false);
 
  const [checked, setChecked] = useState(false);
  const [currentTenant, setCurrentTenant] = useState(
    checked ? props.currentTenant : "Not Selected"
  );
  const [currentLanguageIcon, setCurrentLanguageIcon] = useState("en");
  const [currentLanguageLabel, setCurrentLanguageLabel] = useState("English");
  const [Tdata, setTdata] = useState(props.tableData);
  const [page, setpage] = useState(false);
  
  const totalRecords = props.totalRecords || props.tableData?.length || 0;
  const tableData = props.tableData || [];
  const selectvalue = props.selectvalue || [];
  const onPageChangeHandler = (newPage: number) => { };

  useEffect(() => {
    if (props.email) {
      setEmail(props.email);
    }
  }, [props.email]);

  //side effect of props.error
  useEffect(() => {
    setAlert(props.error);
  }, [props.error]);

  useEffect(() => {
    if (props.password) {
      setPassword(props.password);
    }
  }, [props.password]);

  useEffect(() => {
    setCurrentTenant(props.currentTenant);
  }, [props.currentTenant]);

  useEffect(() => {
          if (props.tableData?.length === 0) {
              setpage(true);
          } else {
              setpage(false);
          }
      }, [Tdata]);
  
      useEffect(() => {
          if (props.tableData?.length === 0) {
              setpage(true);
          } else {
              setpage(false);
          }
      }, [Tdata]);
  
      const DatePicker = (start: any, end?: any) => {
          const tempData = tableData.filter((data: any) => {
              if (data.time > start.toISOString() && data.time < end!.toISOString()) {
                  return data;
              }
          });
          setTdata(tempData);
      };
  
      const selecthandler = (event: any) => {
          if (event.target.value === "All") {
              setTdata(tableData);
          } else {
              const tempData = tableData.filter((data: any) => {
                  if (data.result === event.target.value) {
                      return data;
                  }
              });
              setTdata(tempData);
          }
      };

  const onCheckedHandler = (event:any) => {
    setrememberMe(event.target.checked);
  };

  const isEmailValid = (email: any) => {
    if (!email || email.length === 0) {
      return false;
    }
    return true;
  };
  const isPasswordValid = (password: any) => {
    if (!password || password.length === 0) {
      return false;
    }
    return true;
  };
  const emailhandleChange = (event:any) => {
    setEmail(event.target.value);
  };
  const passwordhandleChange = (event:any) => {
    setPassword(event.target.value);
  };

  const TenancyNameChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setCurrentTenant(event.target.value);
  };

  const isFormValid = isPasswordValid(password) && isEmailValid(email);

  const handleSubmit = (event:any) => {
    event.preventDefault();
    props.onLogin(email, password, rememberMe);

    setEmail('');
    setPassword('');
    setrememberMe(false);
  };

  const forgotPasswordHandler: any = (isForgotPasswordClicked: boolean) => {
    setIsForgotPasswordClicked(true);
    props.onForgotPassword(isForgotPasswordClicked);
  };
  const registerHandler: any = (isRegisterClicked: boolean) => {
    setIsRegisterClicked(true);
    props.onRegister(isRegisterClicked);
  };
  return (
    <>
    {props.login === "default" && (
      <div className="">
        <div className="text-center">
        <div className="container">
          <div className="row align-items-center mb-1 mx-md-1">
            <div className="col-12 col-md-10 text-center mb-3">
              <h2 className="mb-0 ms-4">Login</h2>
            </div>
            <div className="col-12 col-md-1 text-center text-md-end mb-3 px-md-0">
              <RdsDropdownList
                labelIcon={currentLanguageIcon}
                labelIconWidth="18px"
                labelIconHeight="18px"
                placeholder="Select Language"
                block={false}
                icon="en"
                iconFill={false}
                iconStroke={false}
                isPlaceholder={true}
                id={"langDrop"}
                showIcon={false}
                listItems={props.languageData}
                isCode={true}
                onClick={props.onClickHandler}
              />
            </div>
          </div>
        </div>
          <div>
            <small className="d-flex justify-content-center col-md-11">
              <span className="d-flex">
                {" "}
                <RdsLabel label={`${"Current Tenant"}`}></RdsLabel>:
              </span>
              &nbsp;
              <span className="fw-semibold pe-1">
                {" "}
                <RdsLabel
                  label={
                    `${props.getvalidTenantName}`
                  }
                ></RdsLabel>
              </span>
              (
              <span>
                <RdsModal
                  modalId="modal1"
                  modalAnimation="modal fade"
                  showModalFooter={false}
                  showModalHeader={true}
                  scrollable={false}
                  verticallyCentered={false}
                  modalbutton={<a className="link-primary">Change</a>}
                  modalTitle={`${"SwitchTenant"}`}
                  cancelButtonName="CANCEL"
                >
                  <div className="text-start  mb-4 ">
                    <RdsInput
                      name="Name"
                      label={true}
                      placeholder=""
                      inputType="email/text"
                      onChange={TenancyNameChange}
                      value={currentTenant}                      
                      required={false}
                      isDisabled={false}
                      dataTestId="tenancy-name"
                    />
                    <div className="text-start p-0">
                      <RdsLabel
                        label="Leave the name field blank to switch to the host side."
                        size="0.7rem"
                      ></RdsLabel>
                    </div>
                  </div>
                  <div className="mb-2 mt-3 d-flex justify-content-end gap-2">
                    <RdsButton
                      class="me-2"
                      tooltipTitle={""}
                      type={"button"}
                      label="Cancel"
                      colorVariant="outline-primary"
                      size="small"
                      databsdismiss="modal"
                      dataTestId="cancel"
                    ></RdsButton>
                    <RdsButton
                      class="me-2"
                      label="Save"
                      size="small"
                      isDisabled={false}
                      colorVariant="primary"
                      tooltipTitle={""}
                      type={"submit"}
                      databsdismiss="modal"
                      onClick={() => {
                        props.validTenant(currentTenant);
                      }}
                      dataTestId="switch-btn"
                    ></RdsButton>
                  </div>
                </RdsModal>
              </span>
              )
            </small>
          </div>





          
          <div className="">
            <div className="invalid-popup">
              {Alert?.show && (
                <div>
                  <RdsAlert
                    showDismiss={true}
                    message={Alert?.message}
                    // colorVariant={Alert?.color}
                    size="small"
                    onDismiss={props.onDismissAlert}
                    reset={Alert?.show} type={AlertType.error}                  />
                </div>
              )}
            </div>
            <form onSubmit={handleSubmit} className="">
              <div className="form-group text-start">
                <RdsInput
                  name="Username/ Email"
                  label={true}
                  placeholder="Enter Username/ Email"
                  inputType="email/text"
                  onChange={emailhandleChange}
                  value={email}                 
                  required={false}
                  dataTestId="username"
                />
              </div>

              <div className="form-group text-start mt-4">
                <RdsInput
                  name="Password"
                  label={true}
                  customClasses="pe-5"
                  required={false}
                  placeholder="Enter Password"
                  inputType="password"
                  onChange={passwordhandleChange}                  
                  value={password}
                  dataTestId="password"
                  showIcon= {true}
                />
              </div>
              <div className="d-flex justify-content-between mt-3">
                <div>
                  <div className="form-group mb-4 pb-2 remember-me">
                    <RdsCheckbox
                      id="remembercheckid"
                      labelText={`${"Remember Me"}`}
                      checked={rememberMe}
                      onChange={onCheckedHandler}
                      dataTestId="remember-me"
                    ></RdsCheckbox>
                  </div>
                </div>
                <div>
                  <a
                    className="link-primary text-decoration-none float-end"
                    href="javascript:void(0)"
                    onClick={forgotPasswordHandler}
                  >
                    {`${"Forgot Password"}`}
                  </a>
                </div>
              </div>
              <RdsButton
                label={`${"Login"}`}
                colorVariant="primary"
                showLoadingSpinner={true}
                isDisabled={!isFormValid}
                block={true}
                tooltipTitle={""}
                type="submit"
                onClick={handleSubmit}
                dataTestId="Login"
              />
            </form>
            <div className="mt-4">
              <div>
                Don't have an Account
                <span className="ps-1">
                  <a
                    className="link-primary text-decoration-none"
                    href="javascript:void(0)"
                    onClick={registerHandler}
                  >
                   Register
                  </a>
                </span>
              </div>
            </div>
            <div className="mt-5 justify-content-center">
              <div className="w-100 h-1 login-border-bottom position-relative">
                <div className="w-100 d-flex justify-content-center position-absolute top-10">
                  <span className="bg-connect px-3">or Connect with</span>
                </div>
              </div>
              <div className="w-100 mt-4 pt-2">
                <span className="w-20px h-20px border p-2 mx-3 rounded-2">
                  <RdsCompIcon
                    name="google"
                    height="20px"
                    width="20px"
                    colorVariant="light"
                    fill={false}
                    stroke={true}
                    tooltip={true}
                    tooltipTitle={"Connect with Google"}
                    tooltipPlacement="bottom"
                    style={TooltipStyle.MiddleTopArrow}
                    isCursorPointer={true}
                  ></RdsCompIcon>
                </span>
                <span className="w-20px h-20px border p-2 mx-3 rounded-2">
                  <RdsCompIcon
                    name="microsoft"
                    height="20px"
                    width="20px"
                    colorVariant="light"
                    fill={false}
                    stroke={true}
                    tooltip={true}
                    tooltipTitle={"Connect with Microsoft"}
                    tooltipPlacement="bottom"
                    style={TooltipStyle.MiddleTopArrow}
                    isCursorPointer={true}
                  ></RdsCompIcon>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
    {props.login === "attempts" && (
        <div>
            <div className="row mb-3 d-flex justify-content-between">
                <div className="col-md-4">
                <RdsLabel label="Select Date Range"></RdsLabel>
                    <RdsDatePicker
                        type="advanced"
                        DatePickerLabel={"Select Date Range"}
                        onDatePicker={DatePicker}
                        isDropdownOpen={false}
                    ></RdsDatePicker>
                </div>
                <div className="col-md-4">
                    <div className="Select">
                        <RdsLabel label="Result"></RdsLabel>
                        <RdsDropdownList
                            data-testid="Result"
                            placeholder="All"
                            borderDropdown={true}
                            listItems={selectvalue.map(item => ({
                                label: item.displayText,
                                val: item.value,
                            }))}
                            isPlaceholder={true}
                        />
                    </div>
                </div>
            </div>
            {page && (
                <div>
                    <RdsIllustration
                        subLabel="Currently you do not have any data "
                        colorVariant="light"
                    ></RdsIllustration>
                </div>
            )}
            {!page && (
                <div className="table">
                    <RdsDatatable
                        actionPosition={ActionPosition.Right}
                        tableHeaders={props.tableHeaders || []}
                        tableData={Tdata || []}
                        pagination={true}
                        recordsPerPage={props.recordsPerPage || 5}
                        recordsPerPageSelectListOption={props.recordsPerPageSelectListOption || false}
                        onActionSelection={props.onActionSelection}
                        actions={[]}
                    ></RdsDatatable>
                </div>
            )}
        </div>
    )}
    </>
  );
};

export default RdsCompLogin;
