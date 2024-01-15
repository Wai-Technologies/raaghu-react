import React from "react";
import { RdsCompAccount } from "../../index";

export const code_actual = () => {
    return (
        <RdsCompAccount
            accountGeneralSettings={{
                enableLocalLogin: true,
                requireAccountVerification: false,
                accountLockoutPolicy: null,
                allowRememberLogin: false,
                allowAccessTokensViaBrowser: false,
                logoutUrl: null,
            }}
            accountTwoFactorSettings={{
                twoFactorBehaviour: "AllOptions",
                usersCanChange: false,
                isRememberBrowserEnabled: false,
            }}
            accountExternalProvider={[
                {
                    name: "Google",
                    type: "Google",
                    properties: [{ key: "siteKey", value: "" }],
                    secretProperties: [{ key: "secretKey", value: "" }],
                },
                {
                    name: "Microsoft",
                    type: "Microsoft",
                    properties: [{ key: "siteKey", value: "" }],
                    secretProperties: [{ key: "secretKey", value: "" }],
                },
                {
                    name: "Twitter",
                    type: "Twitter",
                    properties: [{ key: "siteKey", value: "" }],
                    secretProperties: [{ key: "secretKey", value: "" }],
                },
            ]}
            accountCaptchaSettings={{
                useCaptchaOnRegistration: false,
                useCaptchaOnLogin: false,
            }}
            handleAccountSettings={() => { }}
        />
    );
};

export default code_actual;
