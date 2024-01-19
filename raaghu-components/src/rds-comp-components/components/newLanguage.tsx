import React from "react";
import RdsCompNewLanguage from "../../rds-comp-new-language/rds-comp-new-language";

export const code_actual = () => {
    return (
        <RdsCompNewLanguage
            onSaveHandler={() => {}}
            placeholder="Select Country"
            languageItems={[
                { option: "Invariant Language ()" },
                { option: "Afar (aa)" },
                { option: "Afar (Djibouti) (aa-DJ)" },
                { option: "Afar (Eritrea) (aa-ER)" },
                { option: "Afar (Ethiopia) (aa-ET)" },
                { option: "Afrikaans (af)" },
                { option: "Afrikaans (Namibia) (af-NA)" },
                { option: "Afrikaans (South Africa) (af-ZA)" },
                { option: "Aghem (agq)" },
                { option: "Aghem (Cameroon) (agq-CM)" },
                { option: "Akan (ak)" },
            ]}
            languageNames={[
                { option: "Invariant Language ()" },
                { option: "Afar (aa)" },
                { option: "Afar (Djibouti) (aa-DJ)" },
                { option: "Afar (Eritrea) (aa-ER)" },
                { option: "Afar (Ethiopia) (aa-ET)" },
                { option: "Afrikaans (af)" },
                { option: "Afrikaans (Namibia) (af-NA)" },
                { option: "Afrikaans (South Africa) (af-ZA)" },
                { option: "Aghem (agq)" },
                { option: "Aghem (Cameroon) (agq-CM)" },
                { option: "Akan (ak)" },
            ]}
            onClick={undefined}
            check={false}
            edit={false}
        ></RdsCompNewLanguage>
    );
};

export default code_actual;
