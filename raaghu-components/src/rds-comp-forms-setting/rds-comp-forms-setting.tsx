import React, { useEffect, useState } from "react";
import { RdsCheckbox } from "../rds-elements";
import { useTranslation } from "react-i18next";

export interface RdsCompFormsSettingProps {
  formsSettingData?: any;
  handleFormSettings?: any;
}

const RdsCompFormsSettings = (props: RdsCompFormsSettingProps) => {

  const [formsSetting, setFormsSetting] = useState(props.formsSettingData);

  useEffect(() => {
    setFormsSetting(props.formsSettingData);
  }, [props.formsSettingData]);

  function setResponses(value: any) {
    setFormsSetting({ ...formsSetting, isAcceptingResponses: value });
    props.handleFormSettings({ ...formsSetting, isAcceptingResponses: value });
  }
  function setEmail(value: any) {
    setFormsSetting({ ...formsSetting, isCollectingEmail: value });
    props.handleFormSettings({ ...formsSetting, isCollectingEmail: value });
  }
  function setQuiz(value: any) {
    setFormsSetting({ ...formsSetting, isQuiz: value });
    props.handleFormSettings({ ...formsSetting, isQuiz: value });
  }
  function setLogin(value: any) {
    setFormsSetting({ ...formsSetting, requiresLogin: value });
    props.handleFormSettings({ ...formsSetting, requiresLogin: value });
  }
  function setHasLimit(value: any) {
    setFormsSetting({ ...formsSetting, hasLimitOneResponsePerUser: value });
    props.handleFormSettings({
      ...formsSetting,
      hasLimitOneResponsePerUser: value,
    });
  }
  function setEdit(value: any) {
    setFormsSetting({ ...formsSetting, canEditResponse: value });
    props.handleFormSettings({ ...formsSetting, canEditResponse: value });
  }
  return (
    <>
      <form onSubmit={props.handleFormSettings}>
        <div className="row">
          <div className="row">
            <div className="mb-3">
              <RdsCheckbox
                labelText="Is accepting responses"
                onChange={(e) => {
                  setResponses(e.target.checked);
                }}
                checked={formsSetting?.isAcceptingResponses}
                dataTestId="accept-response"
              ></RdsCheckbox>
            </div>
            <div className="mb-3">
              <RdsCheckbox
                labelText="Is collecting email"
                onChange={(e) => {
                  setEmail(e.target.checked);
                }}
                checked={formsSetting?.isCollectingEmail}
                dataTestId="collect-email"
              ></RdsCheckbox>
            </div>
            <div className="mb-3">
              <RdsCheckbox
                labelText="Is a quiz"
                onChange={(e) => {
                  setQuiz(e.target.checked);
                }}
                checked={formsSetting?.isQuiz}
                dataTestId="quiz"
              ></RdsCheckbox>
            </div>
          </div>
          <div className="row">
            <div className="mb-3">
              <RdsCheckbox
                labelText="Requires login"
                onChange={(e) => {
                  setLogin(e.target.checked);
                }}
                checked={formsSetting?.requiresLogin}
                dataTestId="require-login"
              ></RdsCheckbox>
            </div>
            <div className="mb-3">
              <RdsCheckbox
                labelText="Has limit one response per user"
                onChange={(e) => {
                  setHasLimit(e.target.checked);
                }}
                checked={formsSetting?.hasLimitOneResponsePerUser}
                isDisabled={formsSetting?.requiresLogin}
                dataTestId="limit-response"
              ></RdsCheckbox>
            </div>
          </div>
          <div className="row ">
            <div className="mb-3">
              <RdsCheckbox
                labelText="Can edit after submit"
                onChange={(e) => {
                  setEdit(e.target.checked);
                }}
                checked={formsSetting?.canEditResponse}
                dataTestId="edit-after-submit"
              ></RdsCheckbox>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
export default RdsCompFormsSettings;
