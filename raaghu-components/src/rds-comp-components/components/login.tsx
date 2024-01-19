import React from "react";
import RdsCompLogin from "../../rds-comp-login/rds-comp-login";

export const code_actual = () => {
    return <RdsCompLogin onLogin={() => { } } onForgotPassword={() => { } } getvalidTenantName={""} email={""} password={""} onRegister={function (isRegisterClicked?: boolean | undefined): void {
        throw new Error("Function not implemented.");
    } } currentTenant={undefined} validTenant={undefined} languageData={undefined} />;
};

export default code_actual;
