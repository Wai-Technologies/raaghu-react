import React from "react";
import {
    RdsInput,
    RdsCheckbox,
    RdsCheckboxGroup,
    RdsCounter,
} from "../rds-elements";

export interface RdsCompSecurityProps {
    checkgroupList: any;
}

const RdsCompSecurity = (props: RdsCompSecurityProps) => {
    return (
        <>
            <div className="mt-4">
                <div>
                    <label className="mb-2 fw-medium">Password Complexity </label>
                    <div className="fw-normal">
                        <RdsCheckbox label="Use Default Settings" checked={false} />
                        <div className="m-3 ">
                            <RdsCheckboxGroup itemList={props.checkgroupList} />
                        </div>
                    </div>
                    <div className="mb-2 fw-normal mt-2">
                        <RdsCounter
                            counterValue={0}
                            label=""
                            min={0}
                            max={50}
                            width={125}
                            colorVariant="primary"
                        />
                    </div>
                    <label className="mt-4 mb-2 fw-medium">User Lock Out</label>
                    <div className="fw-normal">
                        <RdsCheckbox
                            label="Enable user Account Locking On Failed Login Attempts"
                            checked={false}
                        />
                    </div>
                </div>
                <div className="mb-2 fw-normal mt-2">
                    <RdsCounter
                        counterValue={0}
                        label="Maximum Numaber Of failed Login Attempt Count Befire Locking The Account"
                        min={0}
                        max={50}
                        width={125}
                        colorVariant="primary"
                    />
                </div>

                <div className="mb-3 fw-normal mt-2 col-5">
                    <RdsInput
                        label=" Account Locking Duration(as seconds) "
                        inputType="number"
                        placeholder="Enter a Value"
                    />
                </div>

                <label className="mt-2 fw-medium">Two Factor Login </label>
                <div className="fw-normal py-2">
                    <RdsCheckbox label="Enable Two Factor Login  " checked={false} />
                </div>
                <label className="mt-2 fw-medium">Only One Concurrent Login per user </label>
                <div className="fw-normal py-2">
                    <RdsCheckbox
                        label="Disable Concurrent Login For A User. If A User Logins With A Second Device, The First Session Is Automatically Closed."
                        checked={false}
                    />
                </div>
            </div>
        </>
    );
};

export default RdsCompSecurity;
