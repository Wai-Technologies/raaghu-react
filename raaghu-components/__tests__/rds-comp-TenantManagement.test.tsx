import React from "react";
import { render } from "@testing-library/react";
import RdsCompTenantManagement from "../src/rds-comp-tenant-management/rds-comp-tenant-management";
import "@testing-library/jest-dom";


describe("RdsCompTenantManagement", () => {
    const props = {
        settingsTenantEditionList: [],
        allowSelfRegistration: true,
        useCaptchaOnRegistration: false,
        isNewRegisteredTenantActiveByDefault: true,
    };

    it("renders correctly", () => {
        const { getByText } = render(<RdsCompTenantManagement {...props} />);
        expect(getByText("Form-Based Registration")).toBeInTheDocument();
    });


});
