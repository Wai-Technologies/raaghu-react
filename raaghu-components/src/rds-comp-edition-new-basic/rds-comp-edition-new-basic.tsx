import React from "react";
import { RdsInput, RdsSelectList } from "../rds-elements";
import { useTranslation } from "react-i18next";

export interface RdsCompEditionNewBasicProps {
    planList: any[];
    planListLabel?: string;
}

const RdsCompEditionNewBasic = (props: RdsCompEditionNewBasicProps) => {

    const { t } = useTranslation();
    return (
        <>
            <form >
                <div className="row mt-2">
                    <div className="col-md-6 mb-3">
                        <div className="form-group">
                            <RdsInput
                                label={t("Edition Name") || ""}
                                required={true}
                                placeholder="Edition Name"
                                inputType="text"
                                name="editionName"
                                dataTestId="edition-name"
                            ></RdsInput>
                        </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <div className="form-group">
                            <label htmlFor="Plan" className="mb-2">
                                Plan <span className="text-danger">*</span>
                            </label>
                            <RdsSelectList
                                id="planLis"
                                label={props.planListLabel}
                                isDisabled={false}
                                isMultiple={false}
                                selectItems={props.planList}
                                dataTestId="plan-list"
                            />
                            {/* <rds-select-list
                    [isRequired]=true  ngDefaultControl
                    name="edition" [itemList]="PlanList" required [placeholder]="'Select Plan'"
                    [(ngModel)]="editionData.editionPlan" #editionPlan="ngModel">
               

                </rds-select-list> */}
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};
export default RdsCompEditionNewBasic;
