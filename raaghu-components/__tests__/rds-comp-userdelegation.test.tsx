import React from "react";
import RdsUserDelegations from "../src/rds-comp-user-delegations/rds-comp-user-delegations";


describe("RdsUserDelegations", () => {
    it("should render the component with the correct props", () => {
        const props = {
            onSubmit: jest.fn(),
            selectuser: [
                {
                    id: 1,
                    name: "John Doe",
                },
                {
                    id: 2,
                    name: "Jane Doe",
                },
            ],
        };
        const component = <RdsUserDelegations {...props} />;
        expect(component).toMatchSnapshot();
    });
});
