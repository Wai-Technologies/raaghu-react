import React, { Suspense } from "react";

import Chats from "./chats/chats";

const App = () => (
    <Suspense>
        <Chats></Chats>
    </Suspense>
);

export default App;
