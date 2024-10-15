import React, { useEffect, useState } from "react";
import { RdsButton, RdsCheckbox, RdsInput } from "../rds-elements";

export interface RdsCompRegisterMemberProps {
  registerMemberData?: any;
  isEmailFieldVisible?: boolean;
  onRegisterMemberSaveHandler?: (data: any) => void;
}

const RdsCompRegisterMember = (props: RdsCompRegisterMemberProps) => {
  const [registerMemberData, setRegisterMemberData] = useState(props.registerMemberData);
  const [isCheckTerms, setIsCheckTerms] = useState(false);

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
 
  function emitSaveData(event: any) {
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
  const isEmailValid = (email: any) => {
    if (!email || email.length === 0) {
        return false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        return false;
    } else return true;
};
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

const isFormValid=isUserNameValid(registerMemberData?.userName) && isEmailValid(registerMemberData?.email) && isNameValid(registerMemberData?.name) && isSurnameValid(registerMemberData?.surname) && isPasswordValid(registerMemberData?.password) ;
  return (
    <>
      <div>
        <form>
          <div className="form-group">
            <RdsInput
              label="User Name"
              placeholder="User Name"
              inputType="text"
              required={true}
              name={"userName"}
              readonly={false}
              labelPosition="top"
              value={registerMemberData?.userName}
              dataTestId="name"
              onChange={(e: any) =>
                handleRegisterMemberDataChanges(e.target.value, "userName")
              }
            />
          </div>

          <div className="form-group mb-2 pb-1">
            <RdsInput
              fontWeight={"normal"}
              placeholder="Email"
              customClasses="form-control"
              inputType="text"
              label="Email"
              name={"email"}
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
              label="Enter First Name"
              placeholder="Enter First Name"
              inputType="text"
              required={true}
              name={"name"}
              readonly={false}
              labelPosition="top"
              value={registerMemberData?.name}
              dataTestId="name"
              onChange={(e: any) =>
                handleRegisterMemberDataChanges(e.target.value, "name")
              }
            />
          </div>

          <div className="form-group">
            <RdsInput
              label="Enter Last Name"
              placeholder="Enter Last Name"
              inputType="text"
              required={true}
              name={"surname"}
              readonly={false}
              labelPosition="top"
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
              label="Password"
              name="password"
              id="password"
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

          <div className="pb-4">
            <RdsCheckbox
              id="id1"
              label="I Accept Terms Of Service"
              state="Checkbox"
              withlabel
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
            isDisabled={!isFormValid}
            onClick={(e: any) => emitSaveData(e)}
          />
        </form>
      </div>
    </>
  );
};

export default RdsCompRegisterMember;