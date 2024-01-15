import React, { Suspense } from "react";
import PaymentPlans from "./paymentPlans/paymentPlans";

const App = () => (
    <Suspense>
        <PaymentPlans></PaymentPlans>
    </Suspense>
);

export default App;
