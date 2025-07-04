import React from "react";
import { RdsCheckbox } from "../rds-elements";
import RdsCompLabel from "../rds-comp-label";

export interface RdsCompOtherSettingsProps { }

const RdsCompOtherSettings = (props: RdsCompOtherSettingsProps) => {
    return (
        <ul className="ps-0 pt-4 list-unstyled">
            <div className="fw-medium mb-2">
                <RdsCompLabel label="Quick Theme Selection"></RdsCompLabel>
            </div>
            <li>
                <div className="form-group mb-2">
                    <RdsCheckbox
                        labelText={"Is Quick Theme Select Enabled"}
                        checked={false}
                        dataTestId="quick-theme-select"
                    ></RdsCheckbox>
                </div>
            </li>
        </ul>
    );
};

export default RdsCompOtherSettings;
