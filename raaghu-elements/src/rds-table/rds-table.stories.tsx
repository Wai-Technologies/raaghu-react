import React from "react";
import RdsTable from "./rds-table";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Components/Table',
    component: RdsTable,
    parameters: {
        layout: 'padded',
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
} satisfies Meta<typeof RdsTable>;

export default meta;
type Story = StoryObj<typeof RdsTable>;

export const Default: Story = {
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


Default.parameters = { controls: { include: ['id', 'striped', 'bordered', 'tableHeightForScroll', 'colorVariant', 'headerTextColor', 'headerDatas', 'tableDatas', 'iconColorVariant', ] } };