import React, { useState, useEffect } from "react";
import {
  RdsInput,
  RdsButton,
} from "../rds-elements";
import { useTranslation } from "react-i18next";

export interface Edition {
  option: string;
  value: string;
}

interface RdsCompSetPasswordProps {
  reset?: boolean;
  onSaveHandler?: (data: any) => void
}

const RdsCompSetPassword = (props: RdsCompSetPasswordProps) => {
  const { t } = useTranslation();
  const [inputReset, setInputReset] = useState(false);
  const [password, setPassword] = useState("");

  const isPasswordValid = (password: any) => {
    if (!password || password.length === 0) {
      return false;
    }
    return true;
  };

  const isFormValid = isPasswordValid(password);
  useEffect(() => {
    setInputReset(!inputReset);
    setPassword("");
  }, [props.reset]);
  function emitSaveData(event: any) {
    event.preventDefault();
    props.onSaveHandler && props.onSaveHandler(password);
  }

  return (
    <div>
      <div className="tab-content">
        <form>

          <div className="row mt-3">

            <div className="col-md-6 mb-2">
              <div className="form-group">
                <RdsInput
                  reset={inputReset}
                  required={true}
                  label={t("Saas.Password") || ""}
                  placeholder={t("Enter Password") || ""}
                  inputType="password"
                  name="adminPassword"
                  id="adminPassword"
                  value={password}
                  onChange={(e: any) => setPassword(e.target.value)}
                  showIcon= {true}
                ></RdsInput>
              </div>
            </div>
          </div>

          <div className="d-flex pb-3 flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row footer-buttons gap-2">
            <RdsButton
              class="me-2"
              tooltipTitle={""}
              type={"button"}
              label={t("AbpUi.Cancel") || ""}
              colorVariant="outline-primary"
              size="small"
              databsdismiss="offcanvas"
            ></RdsButton>
            <RdsButton
              class="me-2"
              label={t("AbpUi.Save") || ""}
              size="small"
              isDisabled={!isFormValid}
              colorVariant="primary"
              tooltipTitle={""}
              type={"submit"}
              databsdismiss="offcanvas"
              onClick={(e: any) => emitSaveData(e)}
            ></RdsButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RdsCompSetPassword;
