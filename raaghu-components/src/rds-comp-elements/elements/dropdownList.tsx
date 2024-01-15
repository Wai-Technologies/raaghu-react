import React from "react";
import { RdsDropdownList } from "../../rds-elements";

export const code_actual = () => {
    return (
        <RdsDropdownList
            placeholder="Filter"
            borderDropdown={true}
            listItems={[
                {
                    label: "EN(US)",
                    val: "en",
                    iconWidth: "20px",
                    iconHeight: "20px",
                },
                {
                    label: "English(IND)",
                    val: "en",
                    iconWidth: "20px",
                    iconHeight: "20px",
                },
                {
                    label: "Français",
                    val: "fr",
                    iconWidth: "20px",
                    iconHeight: "20px",
                },
                {
                    label: "Deutsch",
                    val: "de",
                    iconWidth: "20px",
                    iconHeight: "20px",
                },
                {
                    label: "Português (Brasil)",
                    val: "pt-BR",
                    iconWidth: "20px",
                    iconHeight: "20px",
                },
                {
                    label: "Türkçe",
                    val: "tr",
                    iconWidth: "20px",
                    iconHeight: "20px",
                },
                {
                    label: "Italiano",
                    val: "it",
                    iconWidth: "20px",
                    iconHeight: "20px",
                },
            ]}
        />
    );
};

export default code_actual;
