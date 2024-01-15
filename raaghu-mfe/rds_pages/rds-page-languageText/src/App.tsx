import React, { Suspense } from "react";
import LanguageText from "./languageText/languageText";
const App = () => {
    return (
        <Suspense>
            <LanguageText ></LanguageText>
        </Suspense>
    );
};

export default App;


