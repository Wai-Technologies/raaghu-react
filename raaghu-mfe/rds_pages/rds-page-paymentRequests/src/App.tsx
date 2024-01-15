import React, { Suspense } from "react";
import PaymentRequests from "./paymentRequests/paymentRequests";

const App = () => (
    <Suspense>
        <PaymentRequests></PaymentRequests>
    </Suspense>
);

export default App;
