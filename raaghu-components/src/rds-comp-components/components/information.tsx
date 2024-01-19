import React from "react";
import RdsCompInformation from "../../rds-comp-information/rds-comp-information";

export const code_actual = () => {
    return (
        <RdsCompInformation
            inputTypeList={[
                {
                    label: "One",
                },
                {
                    label: "two",
                },
                {
                    label: "three",
                },
                {
                    label: "four",
                },
            ]}
            informationItemInitial={{
                propertyName: "demo",
                displayName: "demo",
                inputValue: "demo",
            }}
            reset={false}
        />
    );
};

export default code_actual;
