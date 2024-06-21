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

  const handleRegisterMemberDataChanges = (value: any, key: string) => {
    setRegisterMemberData({ ...registerMemberData, [key]: value });
  };

  function emitSaveData(event: any) {
    event.preventDefault();
    props.onRegisterMemberSaveHandler && props.onRegisterMemberSaveHandler(registerMemberData);
    setRegisterMemberData({});
    setIsCheckTerms(false);
  }

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
              onChange={(e: any) => handleRegisterMemberDataChanges(e.target.value, "userName")}
            />
          </div>

          <div className="form-group mb-2 pb-1">
            <RdsInput
              label="Email"
              placeholder="Email"
              inputType="text"
              required={props.isEmailFieldVisible ? true : false}
              name={"email"}
              labelPosition="top"
              value={registerMemberData?.email}
              dataTestId="email"
              onChange={(e: any) => handleRegisterMemberDataChanges(e.target.value, "email")}
              validatonPattern={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i}
              validationMsg="Invalid Email Address."  
            />
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
              onChange={(e: any) => handleRegisterMemberDataChanges(e.target.value, "name")}
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
              onChange={(e: any) => handleRegisterMemberDataChanges(e.target.value, "surname")}
            />
          </div>

          <div className="form-group">
            <RdsInput
              required={true}
              label="Password"
              placeholder="Enter Password"
              inputType="password"
              onChange={(e: any) => handleRegisterMemberDataChanges(e.target.value, "password")}
              name={"password"}
              value={registerMemberData?.password}
              dataTestId="password"
              showIcon={true}
              validatonPattern={
                /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{8,32}$/
              }
              validationMsg="Please Enter Valid Password length should be at least 8 characters(Alphanumeric)"
            ></RdsInput>
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
            isDisabled={!isCheckTerms || !registerMemberData?.userName || !registerMemberData?.name || !registerMemberData?.surname || (registerMemberData?.password && registerMemberData.password.length < 8)}
            onClick={(e: any) => emitSaveData(e)}
          />
        </form>
      </div>
    </>);
};

export default RdsCompRegisterMember;