import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsTable from "./rds-table";

export default {
    title: "Elements/Table",
    component: RdsTable,
    argTypes: {
        colorVariant: {
            options: [
                "primary",
                "secondary",
                "success",
                "info",
                "warning",
                "danger",
                "dark",
                "light",
                "none",
            ],
            control: { type: "select" },
        },
        iconColorVariant: {
            options: [
                "primary",
                "secondary",
                "success",
                "info",
                "warning",
                "danger",
                "dark",
                "light",
                "none",
            ],
            control: { type: "select" },
        },
    },
} as ComponentMeta<typeof RdsTable>;

const Template: ComponentStory<typeof RdsTable> = (args) => (
    <RdsTable {...args} />
);

export const Table = Template.bind({});
Table.args = {
    id: "1",
    striped: false,
    bordered: false,
    tableHeightForScroll: "",
    colorVariant: "none",
    backgroundColor: "white",
    headerTextColor: "black",
    headerDatas: [
        { displayName: "Name", dataType: "text", key: "name" },
        { displayName: "Icon", dataType: "icon", key: "icon" },
        { displayName: "Price", dataType: "price", key: "price" },
        { displayName: "Text Number", dataType: "textNumber", key: "textNumber" },
    ],
    tableDatas: [
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
    ],
};

// {
//   name: "home",
//   colorVariant: "primary",
//   fill: "true",
//   stroke: "false",
// },
