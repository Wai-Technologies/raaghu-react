import React, { useState } from "react";
import { RdsCheckboxGroup } from "../rds-elements";

export interface RdsCompApplicationScopesProps {
    scopesList: any[];
    editScopeList?: any
}

const RdsCompApplicationScopes = (props: RdsCompApplicationScopesProps) => {
    const [scopeList, setScopeList] = useState(props.scopesList);
    const handlerChange = (event: any) => {
        const tempScopes = scopeList?.map((curr: any) => {
            if (curr.id === event.target.id) {
                return { ...curr, checked: event.target.checked };
            }
            else {
                return curr;
            }
        });
        props.editScopeList && props.editScopeList(tempScopes);
        setScopeList(tempScopes);

    };

    return (
        <>
            <div className="row">
                <div className="col-12 col-6 col-lg-6 col-md-6 col-xl-6 col-xxl-6">
                    <RdsCheckboxGroup
                        itemList={scopeList}
                        onClick={handlerChange}
                    />
                </div>
            </div>
        </>
    );
};

export default RdsCompApplicationScopes;
