import React from "react";
import { render } from "@testing-library/react";
import { RdsTable } from "../src";

jest.mock('lottie-web')
jest.mock('react-lottie-player', () => ({
    __esModule: true,
    default: jest.fn(),
  }));

   
// Mock the useTranslation hook
jest.mock("react-i18next", () => ({
    useTranslation: () => ({ t: (key: string) => key }),
  }));


describe("RdsTable", () => {
    const headerDatas = [
        { key: "name", displayName: "Name", dataType: "text" },
        { key: "age", displayName: "Age", dataType: "textNumber" },
    ];

    const tableDatas = [
        { id: 1, name: "John Doe", age: 35 },
        { id: 2, name: "Jane Smith", age: 28 },
    ];

    it("renders with default props without crashing", () => {
        render(<RdsTable headerDatas={headerDatas} tableDatas={tableDatas} />);
    });




    it("applies the striped class when the striped prop is true", () => {
        const { container } = render(
            <RdsTable
                headerDatas={headerDatas}
                tableDatas={tableDatas}
                striped={true}
            />
        );

        expect(container.querySelector(".table-striped")).not.toBeNull();
    });

    it("applies the bordered class when the bordered prop is true", () => {
        const { container } = render(
            <RdsTable
                headerDatas={headerDatas}
                tableDatas={tableDatas}
                bordered={true}
            />
        );

        expect(container.querySelector(".table-bordered")).not.toBeNull();
    });
});
