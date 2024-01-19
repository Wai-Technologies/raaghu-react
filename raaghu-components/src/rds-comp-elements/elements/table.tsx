import React from "react";
import { RdsTable } from "../../rds-elements";

export const code_actual = () => {
    return (
        <RdsTable
            id="tableId"
            striped={false}
            bordered={false}
            tableHeightForScroll=""
            colorVariant="none"
            backgroundColor="white"
            headerTextColor="black"
            headerDatas={[
                { displayName: "Name", dataType: "text", key: "name" },
                { displayName: "Icon", dataType: "icon", key: "icon" },
                { displayName: "Price", dataType: "price", key: "price" },
                {
                    displayName: "Text Number",
                    dataType: "textNumber",
                    key: "textNumber",
                },
            ]}
            tableDatas={[
                {
                    id: 1,
                    name: "Standard",
                    icon: "home",
                    price: "$20",
                    textNumber: "22aa",
                },
                {
                    id: 2,
                    name: "Premium",
                    icon: "home",
                    price: "$20",
                    textNumber: "22aa",
                },
                {
                    id: 3,
                    name: "Ultimate",
                    icon: "home",
                    price: "$20",
                    textNumber: "22aa",
                },
                {
                    id: 4,
                    name: "Standard",
                    icon: "home",
                    price: "$20",
                    textNumber: "22aa",
                },
                {
                    id: 5,
                    name: "Premium",
                    icon: "home",
                    price: "$20",
                    textNumber: "22aa",
                },
                {
                    id: 6,
                    name: "Ultimate",
                    icon: "home",
                    price: "$20",
                    textNumber: "22aa",
                },
            ]}
        />
    );
};

export default code_actual;
