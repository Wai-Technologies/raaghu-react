import React from "react";
import RdsCompTable from "./rds-comp-table";
import { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta = {
    title: 'Components/Table',
    component: RdsCompTable,
    parameters: {
        layout: 'padded',
        docs:{
            description: {
  component: `The **Table** component renders structured data in a customizable tabular format. It supports various styling options including striped rows, bordered cells, and scrollable height with configurable table height. The component allows setting color variants for the table, header text, and icons, providing flexible theming such as primary, secondary, success, info, warning, danger, dark, light, or none. The table headers are defined via \`headerDatas\`, an array specifying display name, data type (text, icon, price, textNumber), and keys to map data. Rows are passed as \`tableDatas\`, an array of objects matching header keys. This component is ideal for displaying diverse datasets with icons and formatted text, enabling clear, responsive, and accessible data representation in dashboards, reports, or admin panels.`
}

        }
    },
    tags: ['autodocs'],
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
        headerTextColor: {
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
} satisfies Meta<typeof RdsCompTable>;

export default meta;
type Story = StoryObj<typeof RdsCompTable>;

export const Standard: Story = {
    args: {
        id: "1",
        striped: false,
        bordered: true,
        tableHeightForScroll: "",
        colorVariant: "",
        headerTextColor: "primary",
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
        iconColorVariant: "primary",
    }
} satisfies Story;


Standard.parameters = { controls: { include: ['id', 'striped', 'bordered', 'tableHeightForScroll', 'colorVariant', 'headerTextColor', 'headerDatas', 'tableDatas', 'iconColorVariant', ] } };