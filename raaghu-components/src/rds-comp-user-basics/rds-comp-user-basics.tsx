import React, { useState, useEffect } from "react";
import {
  RdsButton,
  RdsCheckbox,
  RdsDatePicker,
  RdsInput,
} from "../rds-elements";
import { useTranslation } from "react-i18next";
import { InputSize } from "../../../raaghu-elements/src/rds-input/rds-input";
import RdsCompDatatable from "../rds-comp-data-table";
import { ActionPosition } from "../rds-comp-data-table/rds-comp-data-table";

export interface RdsCompUserBasicsProps {
  userData?: any;
  onSaveHandler?: (data: any) => void;
  reset?: boolean;
  user?: string;
  onSubmit: (data: any) => void;
  selectuser: any[];
  userClaimData?: any;
  Usermanagementsettings: any;
  tableHeaders: {
    displayName: string;
    key: string;
    datatype: string;
    dataLength?: number | undefined;
    required?: boolean | undefined;
    sortable?: boolean | undefined;
    colWidth?: string | undefined;
    disabled?: boolean | undefined;
    isEndUserEditing?: boolean | undefined;
  }[];
  tableData: {}[];
  actions: {
    displayName: string;
    id: string;
  }[];
  pagination: boolean;
  onActionSelection(arg: any): any;
  enablecheckboxselection?: boolean;
  displayType?: "basic" | "advanced";
  usersRole: any;
  changedData?: any;
  recordsPerPage: number;
  recordsPerPageSelectListOption: boolean;
  onActionSelection(arg: any): any;
}

const RdsCompUserBasics = (props: RdsCompUserBasicsProps) => {
  const [inputReset, setInputReset] = useState(props.reset);
  const [userData, setUserData] = useState(props.userData);
  const [formData, setFormData] = useState(props.userClaimData);
  const [delegationUserData, setDelegationUserData] = useState({
    username: "",
    startdate: "",
    enddate: "",
  });
  const [page, setPage] = useState(false);
  const [roleData, setRoleData] = useState<any>(props.usersRole);

  function isRoleChecked(index: number, value: boolean) {
    const updatedRoleData = [...roleData];
    updatedRoleData[index] = { ...updatedRoleData[index], isChecked: value };
    props.changedData(updatedRoleData);
    setRoleData(updatedRoleData);
  }

  useEffect(() => {
    setInputReset(props.reset);
  }, [props.reset]);

  useEffect(() => {
    setUserData(props.userData);
  }, [props.userData]);

  const onClickHandler = () => {
    setPage((prev) => !prev);
  };

  const DatePicker = (dates: any) => {
    const [start, end] = dates;
    setDelegationUserData({
      ...delegationUserData,
      startdate: start,
      enddate: end,
    });
  };

  const selecthandler = (e: any) => {
    setDelegationUserData({ ...delegationUserData, username: e.target.value });
  };
  const { t } = useTranslation();

  const handleDataChange = (value: any, key: string) => {
    setUserData({ ...userData, [key]: value });
  };

  useEffect(() => {
    setFormData(props.userClaimData);
  }, [props.userClaimData]);

  useEffect(() => {
    setInputReset(!inputReset);
  }, [props.reset]);

  const handleDataChanges = (value: any, key: string) => {
    setFormData({ ...formData, [key]: value });
  };

  function emitClaimsSaveData(event: any) {
    event.preventDefault();
    props.onSaveHandler && props.onSaveHandler(formData);
    setInputReset(!inputReset);
    setFormData({
      type: "",
      value: "",
    });
  }
  const isTypeValid = (type: string) => {
    if (!type || type.length === 0) {
      return false;
    }
    return true;
  };
  const isValueValid = (value: string) => {
    if (!value || value.length === 0) {
      return false;
    }
    return true;
  };
  const isClaimsFormValid =
    isTypeValid(formData?.type) && isValueValid(formData?.value);

  function emitSaveData(event: any) {
    event.preventDefault();
    props.onSaveHandler && props.onSaveHandler(userData);
    setInputReset(!inputReset);
    setUserData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      userName: "",
      phoneNumber: "",
      twoFactorEnabled: false,
      isActive: false,
      lockoutEnabled: false,
      shouldChangePasswordOnNextLogin: false,
    });
  }
  const isFirstNameValid = (firstName: any) => {
    if (!firstName || firstName.length === 0) {
      return false;
    }
    return true;
  };
  const isLastNameValid = (lastName: any) => {
    if (!lastName || lastName.length === 0) {
      return false;
    }
    return true;
  };
  const isEmailValid = (email: any) => {
    if (!email || email.length === 0) {
      return false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      return false;
    } else return true;
  };
  const isPasswordValid = (password: any) => {
    if (!password || password.length === 0) {
      return false;
    }
    return true;
  };
  const isUsernameValid = (userName: any) => {
    if (!userName || userName.length === 0) {
      return false;
    }
    return true;
  };
  const isPhoneNumberValid = (phoneNumber: any) => {
    if (!phoneNumber || phoneNumber.length === 0) {
      return false;
    }
    return true;
  };
  const isFormValid =
    isFirstNameValid(userData?.firstName) &&
    isLastNameValid(userData?.lastName) &&
    isEmailValid(userData?.email) &&
    isPasswordValid(userData?.password) &&
    isUsernameValid(userData?.userName) &&
    isPhoneNumberValid(userData?.phoneNumber);

  return (
    <>
      {props.user === "basics" && (
        <form className="pt-3">
          <div className="custom-content-scroll">
            <div className="flex-column-reverse flex-lg-row flex-md-row row">
              <div className="col-lg-6 col-md-6">
                <RdsInput
                  value={userData?.firstName}
                  placeholder="Enter First Name"
                  inputType="text"
                  name="First Name"
                  label={true}
                  required={true}
                  onChange={(e) => {
                    handleDataChange(e.target.value, "firstName");
                  }}
                  reset={inputReset}
                ></RdsInput>
              </div>
              <div className="col-lg-6 col-md-6">
                <RdsInput
                  value={userData?.lastName}
                  placeholder="Enter Last Name"
                  inputType="text"
                  name="Last Name"
                  label={true}
                  required={true}
                  onChange={(e) => {
                    handleDataChange(e.target.value, "lastName");
                  }}
                  reset={inputReset}
                ></RdsInput>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-6 col-md-6">
                <div className="">
                  <RdsInput
                    value={userData?.email}
                    placeholder="Enter Email Address"
                    inputType="email"
                    name="Email Address"
                    label={true}
                    required={true}
                    onChange={(e) => {
                      handleDataChange(e.target.value, "email");
                    }}
                    validatonPattern={
                      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                    }
                    validationMsg="Invalid Email Address."
                    reset={inputReset}
                    // validatonPattern={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i}
                    // validationMsg="Invalid Email Address."
                  ></RdsInput>
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="">
                  <RdsInput
                    value={userData?.password}
                    inputType="password"
                    name="Password"
                    label={true}
                    placeholder="Enter Password"
                    required={true}
                    onChange={(e) => {
                      handleDataChange(e.target.value, "password");
                    }}
                    reset={inputReset}
                    showIcon={true}
                  ></RdsInput>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6">
                <div>
                  <RdsInput
                    value={userData?.userName}
                    placeholder="Enter Username"
                    inputType="text"
                    name="Username"
                    label={true}
                    required={true}
                    onChange={(e) => {
                      handleDataChange(e.target.value, "userName");
                    }}
                    reset={inputReset}
                  ></RdsInput>
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div>
                  <RdsInput
                    value={userData?.phoneNumber}
                    placeholder="Enter Phone Number"
                    inputType="text"
                    name="Phone Number"
                    label={true}
                    required={true}
                    onChange={(e) => {
                      handleDataChange(e.target.value, "phoneNumber");
                    }}
                    onKeyDown={(e) => {
                      const inputElement = e.target as HTMLInputElement;
                      const currentLength = inputElement.value.length;
                      const isPlusEntered = inputElement.value.startsWith("+");
                      const maxLength = isPlusEntered ? 13 : 10;

                      const allowedKeys = [
                        "Backspace",
                        "ArrowLeft",
                        "ArrowRight",
                        "Delete",
                        "Tab",
                      ];
                      const isNumberOrPlus = /[0-9+]/.test(e.key);

                      if (!isNumberOrPlus && !allowedKeys.includes(e.key)) {
                        e.preventDefault();
                      }

                      if (
                        (/[0-9]/.test(e.key) || e.key === "+") &&
                        (currentLength >= maxLength ||
                          (e.key === "+" && currentLength > 0))
                      ) {
                        e.preventDefault();
                      }
                    }}
                    reset={inputReset}
                  ></RdsInput>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="mb-2 ">
                <RdsCheckbox
                  id="0"
                  labelText="Two Factor Authentication"
                  checked={userData?.twoFactorEnabled}
                  onChange={(e) => {
                    handleDataChange(e.target.checked, "twoFactorEnabled");
                  }}
                ></RdsCheckbox>
              </div>
            </div>
            <div className="row pt-1">
              <div className="mb-2 ">
                <RdsCheckbox
                  id="0"
                  labelText="Active"
                  checked={userData?.isActive}
                  onChange={(e) => {
                    handleDataChange(e.target.checked, "isActive");
                  }}
                ></RdsCheckbox>
              </div>
            </div>
            <div className="row">
              <div className="mb-2">
                <RdsCheckbox
                  id="1"
                  labelText="Should Change Password On Next Login"
                  checked={userData?.shouldChangePasswordOnNextLogin}
                  onChange={(e) => {
                    handleDataChange(
                      e.target.checked,
                      "shouldChangePasswordOnNextLogin"
                    );
                  }}
                ></RdsCheckbox>
              </div>
            </div>
            <div className="row">
              <div className="mb-2">
                <RdsCheckbox
                  id="0"
                  labelText="Account Lockout"
                  checked={userData?.lockoutEnabled}
                  onChange={(e) => {
                    handleDataChange(e.target.checked, "lockoutEnabled");
                  }}
                ></RdsCheckbox>
              </div>
            </div>
          </div>
          <div className="d-flex ps-4 flex-column-reverse flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3 px-4">
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
              dataTestId="save"
              onClick={(e: any) => emitSaveData(e)}
              isDisabled={!isFormValid}
            ></RdsButton>
          </div>
        </form>
      )}
      {props.user === "claim" && (
        <>
          <div className="tab-content">
            <form>
              <div className="custom-content-scroll">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <RdsInput
                        name="Type"
                        label={true}
                        required={true}
                        reset={inputReset}
                        inputType="text"
                        placeholder="Enter Type"
                        size={InputSize.Medium}
                        dataTestId="type"
                        onChange={(e) => {
                          handleDataChanges(e.target.value, "type");
                        }}
                        value={formData?.type}
                      ></RdsInput>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <RdsInput
                        name="Value"
                        label={true}
                        required={true}
                        reset={inputReset}
                        inputType="text"
                        placeholder="Enter Value"
                        size={InputSize.Medium}
                        dataTestId="value"
                        onChange={(e) => {
                          handleDataChanges(e.target.value, "value");
                        }}
                        value={formData?.value}
                      ></RdsInput>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-column-reverse ps-4 flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3 p-4">
                <RdsButton
                  type="button"
                  label="Cancel"
                  isOutline={true}
                  colorVariant="primary"
                  size="small"
                  dataTestId="cancel"
                ></RdsButton>
                <RdsButton
                  type="button"
                  label="Next"
                  colorVariant="primary"
                  class="save-btn"
                  size="small"
                  dataTestId="next"
                  onClick={(e: any) => emitClaimsSaveData(e)}
                  isDisabled={!isClaimsFormValid}
                ></RdsButton>
              </div>
            </form>
          </div>
        </>
      )}
      {props.user === "delegations" && (
        <>
          {!page && (
            <RdsButton
              type="button"
              icon="plus"
              iconFill={false}
              iconHeight="12px"
              iconStroke={true}
              iconWidth="12px"
              colorVariant="primary"
              label="Delegate New User"
              size="small"
              iconColorVariant="light"
              onClick={onClickHandler}
            ></RdsButton>
          )}
          {page && (
            <div>
              <div>
                <div className="mb-2">
                  <div>
                    {props.selectuser && (
                      <select
                        onClick={selecthandler}
                        defaultValue={"DEFAULT"}
                        className="form-select form-select-md"
                      >
                        <option disabled value="DEFAULT">
                          Select a User
                        </option>
                        {props.selectuser.map((x, i) => (
                          <option key={x.id}>{x.name}</option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>
                <div className="custom-content-scroll">
                  <RdsDatePicker
                    type="advanced"
                    DatePickerLabel={"Select Date Range"}
                    onDatePicker={DatePicker}
                    isDropdownOpen={false}
                  ></RdsDatePicker>
                </div>
                <div className="d-flex flex-column-reverse ps-4 flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3">
                  <RdsButton
                    type="button"
                    isOutline={true}
                    colorVariant="primary"
                    label="Cancel"
                    size="small"
                    onClick={onClickHandler}
                  ></RdsButton>
                  <div className="d-flex flex-column-reverse">
                    <RdsButton
                      type="submit"
                      isOutline={false}
                      colorVariant="primary"
                      label="Save"
                      size="small"
                      onClick={() => props.onSubmit(delegationUserData)}
                    ></RdsButton>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      {props.user === "management" && (
        <>
          <div className="fw-normal mt-4">
            <div className="py-1">
              <RdsCheckbox
                isDisabled={false}
                labelText="Email Confirmation Required For Login."
                checked={false}
                showText={true}
                isSwitch={false}
                dataTestId="email-confirmation"
              />
            </div>
            <div className="py-1">
              <RdsCheckbox
                isDisabled={false}
                labelText="Phone Number Verification Enabled (Via SMS)."
                checked={false}
                showText={true}
                isSwitch={false}
                dataTestId="phone-number-verification"
              />
            </div>
            <div className="py-1">
              <RdsCheckbox
                isDisabled={false}
                labelText="Use Security Image Question (Captcha) On Login."
                checked={false}
                showText={true}
                isSwitch={false}
                dataTestId="security-image-quest"
              />
            </div>
            <label className="mt-3 fw-medium">Cookie Consent</label>
            <div className="py-1">
              <RdsCheckbox
                isDisabled={false}
                labelText="Cookie Consent Enabled"
                checked={false}
                showText={true}
                isSwitch={false}
                dataTestId="cookie-consent-enable"
              />
            </div>
            <label className="mt-3 fw-medium">Session Timeout Control</label>
            <div className="py-1">
              <RdsCheckbox
                isDisabled={false}
                labelText="Session Time Out Control Enabled"
                checked={false}
                showText={true}
                isSwitch={false}
                dataTestId="session-time-out-control"
              />
            </div>
            <label className="mt-3 fw-medium">Profile</label>
            <div className="py-1">
              <RdsCheckbox
                isDisabled={false}
                labelText="Allow Using to use Gravatar Profile Picture"
                checked={false}
                showText={true}
                isSwitch={false}
                dataTestId="gravatar-profile-picture"
              />
            </div>
          </div>
        </>
      )}
      {props.user === "permission" && (
        <>
          {props.displayType == "basic" && (
            <div>
              <div className="d-flex justify-content-end">
                <RdsButton
                  type={"button"}
                  colorVariant="primary"
                  label="New User"
                  icon="plus"
                  iconFill={false}
                  iconHeight="12px"
                  iconStroke={true}
                  iconWidth="12px"
                  iconColorVariant="light"
                  size="small"
                />
              </div>

              <RdsCompDatatable
                actionPosition={ActionPosition.Right}
                tableHeaders={props.tableHeaders}
                actions={props.actions}
                tableData={props.tableData}
                pagination={false}
                classes="table"
                onActionSelection={props.onActionSelection}
                enablecheckboxselection={props.enablecheckboxselection}
              ></RdsCompDatatable>
            </div>
          )}
          {props.displayType == "advanced" && (
            <div>
              <div className="d-flex justify-content-end mb-3">
                <RdsButton
                  type={"button"}
                  colorVariant="primary"
                  label="New User"
                  icon="plus"
                  iconHeight="15px"
                  iconFill={false}
                  iconStroke={true}
                  iconWidth="15px"
                  iconColorVariant="light"
                  dataTestId="new-user"
                  size="small"
                />
              </div>
              <RdsCompDatatable
                actionPosition={ActionPosition.Right}
                tableHeaders={props.tableHeaders}
                actions={props.actions}
                tableData={props.tableData}
                pagination={false}
                onActionSelection={props.onActionSelection}
              ></RdsCompDatatable>
            </div>
          )}
        </>
      )}
      {props.user === "roles" && (
        <>
          <div className="row">
            <div className="col-md-12">
              {roleData?.map((e: any, index: number) => (
                <div className="pt-3">
                  <RdsCheckbox
                    key={e.name}
                    labelText={e.name}
                    onChange={(event) => {
                      isRoleChecked(index, event.target.checked);
                    }}
                    checked={e.isChecked}
                    dataTestId={e.name}
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      {props.user === "table" && (
        <div>
          <RdsCompDatatable
            actionPosition={ActionPosition.Right}
            classes="table__userTable"
            tableHeaders={props.tableHeaders}
            actions={props.actions}
            tableData={props.tableData}
            pagination={props.pagination}
            recordsPerPage={props.recordsPerPage}
            onActionSelection={props.onActionSelection}
            recordsPerPageSelectListOption={
              props.recordsPerPageSelectListOption
            }
          ></RdsCompDatatable>
        </div>
      )}
    </>
  );
};

export default RdsCompUserBasics;
