import React from "react";
import { render } from "@testing-library/react";
import RdsCompCardDetailList, { RdsCompCardDetailListProps } from "../src/rds-comp-card-detail-list/rds-comp-card-detail-list";

describe("RdsCompCardDetailList", () => {
    const cardDatas: any[] = [
        // Add sample card data here
    ];

    it("renders RdsCompCardDetailList component", () => {
        const cardDatas = [{ cardNumber: "1234" }, { cardNumber: "5678" }];
        const { container } = render(
            <RdsCompCardDetailList cardDatas={cardDatas} />
        );
    });

    it("renders without error", () => {
        render(<RdsCompCardDetailList cardDatas={cardDatas} />);

    });

    it("renders with selectable option", () => {
        render(<RdsCompCardDetailList cardDatas={cardDatas} isSelectable />);

    });

});
