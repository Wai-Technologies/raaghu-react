import React, { Suspense } from "react";
import FileManagement from "./fileManagement/fileManagement";

const App = () => (
    <Suspense>
        <FileManagement></FileManagement>
    </Suspense>
);

export default App;
