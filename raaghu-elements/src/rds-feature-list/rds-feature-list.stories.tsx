import React from "react";
import RdsFeatureList from "./rds-feature-list";
import { Meta, StoryObj } from "@storybook/react";


const meta: Meta = {
    title: 'Elements/Feature List',
    component: RdsFeatureList,
    parameters: {
        layout: '',
    },
    tags: ['autodocs'],
    argTypes: {
        colorVariant: {
            options: ["primary", "success", "danger", "warning", "light", "info", "secondary", "dark"],
            control: { type: "select" },
        },
    },
} satisfies Meta<typeof RdsFeatureList>;

export default meta;
type Story = StoryObj<typeof RdsFeatureList>;

export const Default: Story = {
    args: {
        heading: "Features",
        itemList: [
            "Only the best materials",
            "Ethically and locally made",
            "Pre-washed and pre-shrunk",
            "Machine wash cold with similar colors",
            "Stainless strap loops",
            "Double stitched construction",
            "Water-resistant"
        ]
    }
} satisfies Story;

export const With_multiple_column: Story = {
    args: {
        colorVariant: "primary",
        heading: "Features",
        fontStyle: "italic",
        itemList: [
            "Only the best materials",
            "Ethically and locally made",
            "Pre-washed and pre-shrunk",
            "Machine wash cold with similar colors",
            "Stainless strap loops",
            "Double stitched construction",
            "Water-resistant"
        ],
        columns: 2
    }
} satisfies Story;

