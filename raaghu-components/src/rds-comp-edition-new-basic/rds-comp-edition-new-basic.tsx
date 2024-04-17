import React, { useEffect, useState } from "react";
import { RdsInput, RdsSelectList } from "../rds-elements";

export interface RdsCompEditionNewBasicProps {
    planList: any[];
    accountTwoFactorSettings: any;
    planListLabel?: string;
}
const RdsCompEditionNewBasic = (props: RdsCompEditionNewBasicProps) => {
 const [twoFactorData, settwoFactorData] = useState(
        props.accountTwoFactorSettings
    );

    const handlerChangeTwoFact = (value: any, key: string) => {
        settwoFactorData({ ...twoFactorData, [key]: value });
    };

    useEffect(() => {
        settwoFactorData(props.accountTwoFactorSettings);
    }, [props.accountTwoFactorSettings]);
    
    return (
        <>
            <form >
                <div className="row mt-2">
                    <div className="col-md-6 mb-3">
                        <div className="form-group">
                            <RdsInput
                                label={"Edition Name"}
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
                            <RdsSelectList
                                id="planLis"
                                label={props.planListLabel}
                                isDisabled={false}
                                isMultiple={false}
                                selectItems={props.planList}
                                selectedValue={twoFactorData?.planList}
                                onChange={(item: any) => {
                                    handlerChangeTwoFact(item.value, "planList");
                                }}

                                dataTestId="plan-list"
                                required={true}
                            />
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};
export default RdsCompEditionNewBasic;
