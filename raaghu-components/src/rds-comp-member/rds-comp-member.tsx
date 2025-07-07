import React, { useEffect, useState } from "react";
import { RdsButton, RdsCheckbox, RdsInput, RdsOffcanvas } from "../rds-elements";
import { RdsOffcanvasBackDrop, RdsOffcanvasPlacement } from "../../../raaghu-elements/src/rds-offcanvas/rds-offcanvas";
import { InputSize, LabelPosition } from "../../../raaghu-elements/src/rds-input/rds-input";
import { CheckboxStatus } from "../../../raaghu-elements/src/rds-checkbox/rds-checkbox";
import "./rds-comp-member.css"
import RdsCompIcon from "../rds-comp-icon";
import RdsCompLabel from "../rds-comp-label";
export interface RdsCompMemberProps {
  addMemberData?: any;
  assignableRolesList?: any;
  reset?: boolean;
  onAddMemberSaveHandler?: (data: any) => void;
  onClickAddNewMember?: () => void;
  member?: string;
  registerMemberData?: any;
  isEmailFieldVisible?: boolean;
  onRegisterMemberSaveHandler?: (data: any) => void;
  teamItem: any[];
}

const RdsCompMember = (props: RdsCompMemberProps) => {
  const [addMemberData, setAddMemberData] = useState(props.addMemberData || { email: "", roleId: "" });
  const [inputReset, setInputReset] = useState(false);
  const [assignableRolesList, setAssignableRolesList] = useState(props.assignableRolesList || []);
  const [registerMemberData, setRegisterMemberData] = useState(props.registerMemberData);
  const [isCheckTerms, setIsCheckTerms] = useState(false);

  useEffect(() => {
    setAddMemberData(props.addMemberData || { email: "", roleId: "" });
    console.log("addMemberData updated:", addMemberData);
  }, [props.addMemberData]);

  useEffect(() => {
    setInputReset(prevReset => !prevReset);
  }, [props.reset]);

  useEffect(() => {
    if (props.assignableRolesList) {
      setAssignableRolesList(props.assignableRolesList);
    }
  }, [props.assignableRolesList]);


  const checkboxHandler = (id: number, label: string) => {
    setAssignableRolesList((prevAssignableRolesList: any) => {
      return prevAssignableRolesList.map((assignableRoles: any) => {
        if (assignableRoles.id === id) {
          return { ...assignableRoles, isDefault: true };
        } else {
          return { ...assignableRoles, isDefault: false };
        }
      });
    });
    setAddMemberData((prevAddMemberData: any) => {
      return { ...prevAddMemberData, [label]: id };
    });
  };

  const handleAddMemberDataChanges = (value: any, key: string) => {
    setAddMemberData({ ...addMemberData, [key]: value });
  };

  function emitSaveData(event: any) {
    event.preventDefault();
    props.onAddMemberSaveHandler && props.onAddMemberSaveHandler(addMemberData);
    setAddMemberData({ email: "", roleId: "" });
    setAssignableRolesList((prevAssignableRolesList: any) =>
      prevAssignableRolesList.map((assignableRoles: any) => ({ ...assignableRoles, isDefault: false }))
    );
    setInputReset(!inputReset);
  }

  const onClickCancel = () => {
    setInputReset(!inputReset);
    setAddMemberData({ email: "", roleId: "" });
    setAssignableRolesList(assignableRolesList.map((assignableRoles: any) => ({ ...assignableRoles, isDefault: false })));
  }
  const isEmailValid = (email: any) => {
    if (!email || email.length === 0) {
      return false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      return false;
    } else return true;
};

const isRoleIdValid = (roleId: any) => {
  console.log("roleId",roleId);
    if (!roleId || roleId.length === 0 || roleId === "0") {
      return false;
    }
    return true;
};
  const isFormValid=isEmailValid(addMemberData?.email) && isRoleIdValid(addMemberData.roleId);
  
    useEffect(() => {
      setRegisterMemberData(props.registerMemberData);
    }, [props.registerMemberData]);
    const [errors, setErrors] = useState({
      password: "",
        
    });
    const isNewPassValid = (password: string) => {
      const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
      return pattern.test(password);
    };
    const handleRegisterMemberDataChanges = (value: any, key: string) => {
      let errorMessage = "";
            if (key === "password") {
              errorMessage = isNewPassValid(value) ? "" : "Please Enter Valid Password length should be at least 8 characters(Alphanumeric)";
            } 
            setErrors({ ...errors, [key]: errorMessage });
      setRegisterMemberData({ ...registerMemberData, [key]: value });
    };
   
    function emitSaveRegisterData(event: any) {
      event.preventDefault();
      props.onRegisterMemberSaveHandler && props.onRegisterMemberSaveHandler(registerMemberData);
      setRegisterMemberData({});
      setIsCheckTerms(false);
    }
    const [isPasswordTouched, setIsPasswordTouched] = useState(false);
    const isUserNameValid = (userName: any) => {
      if (!userName || userName.length === 0) {
        return false;
      }
      return true;
    }
    const isNameValid = (name: any) => {
      if (!name || name.length === 0) {
        return false;
      }
      return true;
    };
    const isSurnameValid = (surname: any) => {
      if (!surname || surname.length === 0) {
        return false;
      }
      return true;
    };
    const isPasswordValid = (password: any) => {
      if (!password || password.length === 0) {
        return false;
      }
      return true;
    }
    const validatonPattern="^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{8,32}$";
    
  const checkPasswordValid = (password: any) => {
    
    return new RegExp(validatonPattern).test(password);
  }
  
  const isRegisterFormValid=isUserNameValid(registerMemberData?.userName) && isEmailValid(registerMemberData?.email) && isNameValid(registerMemberData?.name) && isSurnameValid(registerMemberData?.surname) && isPasswordValid(registerMemberData?.password) ;

  return (
    <>
    {props.member === "add" && (
    <div className="pt-md-0 pt-2 addMemberOffCancvas">
      <RdsOffcanvas
        backDrop={RdsOffcanvasBackDrop.Static}
        canvasTitle="ADD NEW MEMBER"
        offId="manage-member-add-off"
        offcanvasbutton={(
            <RdsButton
              icon="plus"
              label="NEW MEMBER"
              iconColorVariant="primary"
              iconHeight="12px"
              iconWidth="12px"
              iconFill={false}
              iconStroke={true}
              block={false}
              size="medium"
              type="button"
              colorVariant="outline-primary"
              // colorVariant={props.isDisableButton ? `outline-primary disabled` : 'outline-primary'}
              showLoadingSpinner={true}
              onClick={props.onClickAddNewMember}
            ></RdsButton>
          )
        }
        offcanvaswidth={544}
        placement={RdsOffcanvasPlacement.End}
        scrolling={false}
      >
        <div className="offcanvas-content d-flex flex-column h-100">
          <div className="offcanvas-intive-banner bg-danger bg-gradient bg-opacity-10">
            <div className="d-flex align-items-center gap-3 py-3 px-4">
              <div>
                <img src="assets/offcanvas-invite.svg" alt="offcanvas-invite" width="25px" />
              </div>
              <div>
                <p className="fw-medium mb-0 smaller text-start">
                  Invite a new member by entering their email id and role in fields below. Member will then have access to project files and source code.
                </p>
              </div>
            </div>
          </div>
          <form className="text-start pt-4 flex-grow-1">
            <div className="mb-2">
              <RdsInput
                id=""
                reset={inputReset}
                inputType="email"               
                name="Email"           
                label={true}
                labelPosition={LabelPosition.Top}
                placeholder="Enter Email"
                required
                size={InputSize.Medium}   
                value={addMemberData?.email}
                onChange={(e: any) => {
                  handleAddMemberDataChanges(e.target.value, "email");
                }}
                validatonPattern={
                  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                }
                validationMsg="Please Enter Valid Email Address."
              />
            </div>
            <div>
              <RdsCompLabel fontWeight="normal" label="Select Role" required />
              <div className="d-flex gap-3 pt-1">
                {assignableRolesList.map((assignRoles: any, index: any) => (
                  <RdsCheckbox
                    key={index}
                    id={`checkbox-${assignRoles.id}`}
                    labelText={assignRoles.name}
                    onChange={() => {
                      if (assignRoles.isDefault) {
                        setAddMemberData((prevAddMemberData: any) => ({
                          ...prevAddMemberData,
                          roleId: "0"
                        }));
                      } else {
                        checkboxHandler(assignRoles.id, "roleId");
                      }
                    }}
                    checked={assignRoles.isDefault}
                    showText
                  />
                ))}
              </div>
            </div>
          </form>
          <div className="d-flex flex-column-reverse flex-lg-row flex-md-column-reverse mt-5 flex-xl-row flex-xxl-row d-flex gap-2">
            <RdsButton
              class="me-2"
              tooltipTitle={""}
              type={"button"}
              label="CANCEL"
              colorVariant="outline-primary"
              size="small"
              databsdismiss="offcanvas"
              onClick={onClickCancel}
            ></RdsButton>
            <RdsButton
              class="me-2"
              label="SAVE"
              showLoadingSpinner={true}
              size="small"
              colorVariant="primary"
              tooltipTitle={""}
              onClick={(e: any) => emitSaveData(e)}
              type={"submit"}
              isDisabled={!isFormValid}
              databsdismiss="offcanvas"
            ></RdsButton>
          </div>
        </div>
      </RdsOffcanvas>
    </div>
    )}
    {props.member === "team" && (
        <div>
            {props.teamItem.map((teamItems, idx) => (
                <>
                    <div className="row m-auto">
                        <div className="mt-3 p-0 cardWidth">
                            <div className="card-border mt-5 pt-5 ">
                                <div
                                    className="card pb-4 justify-content-end cardPadding"
                                >
                                    <div className="cardPosition"
                                    >
                                        <img height={232} width={232}
                                            src={teamItems.imgLink}
                                            className="card-img-top"
                                            alt="..."
                                        />
                                    </div>
                                    <div className="mt-3">
                                        <div className="d-flex justify-content-center mt-2">
                                            <h2 className="mb-0">
                                                <RdsCompLabel
                                                    label={teamItems.title}
                                                    multiline={false}
                                                    fontWeight="bold"
                                                    size="32px"
                                                ></RdsCompLabel>
                                            </h2>
                                        </div>
                                        <div className="d-flex justify-content-center text-primary">
                                            <h5>
                                                <RdsCompLabel
                                                    label={teamItems.subTitle}
                                                    multiline={false}
                                                    size="16px"
                                                ></RdsCompLabel>
                                            </h5>
                                        </div>
                                        <div className="d-flex justify-content-center text-muted gap-2">
                                            <RdsCompIcon
                                                name={teamItems.twitterIcon}
                                                height="27px"
                                                fill={false}
                                                stroke={true}
                                                width="27px"
                                                colorVariant=""
                                                isCursorPointer={true}
                                            ></RdsCompIcon>
                                            <RdsCompIcon
                                                //	class="mx-2"
                                                name={teamItems.twitterIcon}
                                                height="27px"
                                                fill={false}
                                                stroke={true}
                                                width="27px"
                                                colorVariant=""
                                                isCursorPointer={true}
                                            ></RdsCompIcon>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center mt-3">
                                    <RdsCompLabel
                                        label={teamItems.description}
                                        multiline={true}
                                    ></RdsCompLabel>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ))}
        </div>
    )}
    {props.member === "register" && (
        <>
          <div>
            <form>
              <div className="form-group">
                <RdsInput
                  name="User Name"
                  label={true}
                  placeholder="User Name"
                  inputType="text"
                  required={true}              
                  readonly={false}
                  labelPosition={LabelPosition.Top}
                  value={registerMemberData?.userName}
                  dataTestId="name"
                  onChange={(e: any) =>
                    handleRegisterMemberDataChanges(e.target.value, "userName")
                  }
                />
              </div>
    
              <div className="form-group">
                <RdsInput
                  fontWeight={"normal"}
                  placeholder="Email"
                  customClasses="form-control"
                  inputType="text"
                  name="Email"
                  label={true}             
                  required={true}
                  value={registerMemberData?.email}
                  onChange={(e: any) =>
                    handleRegisterMemberDataChanges(e.target.value, "email")
                  }
                  dataTestId="email"
                  validatonPattern={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i}
                  validationMsg="Please Enter Valid Email Address."
                ></RdsInput>
              </div>
    
              <div className="form-group">
                <RdsInput
                  name="Enter First Name"
                  label={true}
                  placeholder="Enter First Name"
                  inputType="text"
                  required={true}             
                  readonly={false}
                  labelPosition={LabelPosition.Top}
                  value={registerMemberData?.name}
                  dataTestId="name"
                  onChange={(e: any) =>
                    handleRegisterMemberDataChanges(e.target.value, "name")
                  }
                />
              </div>
    
              <div className="form-group">
                <RdsInput
                  name="Enter Last Name"
                  label={true}
                  placeholder="Enter Last Name"
                  inputType="text"
                  required={true}              
                  readonly={false}
                  labelPosition={LabelPosition.Top}
                  value={registerMemberData?.surname}
                  dataTestId="surname"
                  onChange={(e: any) =>
                    handleRegisterMemberDataChanges(e.target.value, "surname")
                  }
                />
              </div>
    
              <div className="form-group">
                <RdsInput
                  inputType="password"
                  placeholder="Enter Password"
                  required={true}
                  name="Password"
                  label={true}             
                  id={(errors.password && registerMemberData?.password)? "passwordfield":"password" }
                  onBlur={() => setIsPasswordTouched(true)}
                  onChange={(e: any) =>
                    handleRegisterMemberDataChanges(e.target.value, "password")
                  }
                  value={registerMemberData?.password}
                  dataTestId="password"
                  showIcon={true}
                ></RdsInput>
                {errors.password && registerMemberData?.password && (
                  <div className="form-control-feedback">
                    <span className="text-danger">{errors.password}</span>
                  </div>
                )}
              </div>
    
              <div className="pb-4 pt-2">
                <RdsCheckbox
                  id="id1"
                  labelText="I Accept Terms Of Service"
                  status={CheckboxStatus.Checked}
                  showText
                  checked={isCheckTerms}
                  onChange={(e: any) => setIsCheckTerms(e.target.checked)}
                />
              </div>
    
              <RdsButton
                label="Accept & Create Account"
                colorVariant="primary"
                showLoadingSpinner={true}
                block={true}
                tooltipTitle={""}
                type="submit"
                dataTestId="register"
                isDisabled={!isRegisterFormValid}
                onClick={(e: any) => emitSaveRegisterData(e)}
              />
            </form>
          </div>
        </>
    )}
    </>
  );
};

export default RdsCompMember;