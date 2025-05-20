import React, { FC, useEffect, useState } from "react";
import { RdsButton, RdsCheckbox, RdsLabel } from "../rds-elements";
import { useTranslation } from "react-i18next";
import { LabelPosition } from "../../../raaghu-elements/src/rds-checkbox/rds-checkbox";
interface RdsCompUserRolesProps {
    usersRole: any;
    changedData?: any;
}

const RdsCompUserRoles = (props: RdsCompUserRolesProps) => {
  
    const [roleData, setRoleData] = useState<any>(props.usersRole);
    function isRoleChecked(index: number, value: boolean) {
        const updatedRoleData = [...roleData];
        updatedRoleData[index] = { ...updatedRoleData[index], isChecked: value };
        props.changedData(updatedRoleData);
        setRoleData(updatedRoleData);
    }
    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    {roleData?.map((e: any, index: number) => (
                        <div className="pt-3">
                            <RdsCheckbox
                                key={e.name}
                                labelText={(e.name)}
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
    );
};
export default RdsCompUserRoles;