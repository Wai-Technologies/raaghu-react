import React from "react";
import RdsFeatureList, { ColorVariant, FontStyle } from "./rds-feature-list";
import { Meta, StoryObj } from "@storybook/react";


const meta: Meta = {
    title: 'Components/Feature List',
    component: RdsFeatureList,
    parameters: {
        layout: 'padded',
        docs: {
            source : {
                transform: (code: string) => {
                    // Transform colorVariant enum - remove spaces and transform
                    code = code.replace(/colorVariant="([^"]+)"/g, (match, p1) => `colorVariant={ColorVariant.${p1.replace(/\s+/g, '')}}`);
                    code = code.replace(/colorVariant:\s*"([^"]+)"/g, (match, p1) => `colorVariant: ColorVariant.${p1.replace(/\s+/g, '')}`);
                    // Transform Position enum - remove spaces and transform
                    code = code.replace(/fontStyle="([^"]+)"/g, (match, p1) => `fontStyle={FontStyle.${p1.replace(/\s+/g, '')}}`);
                    code = code.replace(/fontStyle:\s*"([^"]+)"/g, (match, p1) => `fontStyle: FontStyle.${p1.replace(/\s+/g, '')}`);
                    return code;
                }
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        colorVariant: {
            options: ["primary", "success", "danger", "warning", "light", "info", "secondary", "dark"],
            control: { type: "select" },
        },
        fontStyle: {
            options: ["normal", "italic"],
            control: { type: "select" },
        },
    },
} satisfies Meta<typeof RdsFeatureList>;

export default meta;
type Story = StoryObj<typeof RdsFeatureList>;

export const Default: Story = {
    args: {
        heading: "Features",
        fontStyle: FontStyle.Normal,
        colorVariant: ColorVariant.Primary,
        itemList: [
            "Only the best materials",
            "Ethically and locally made",
            "Pre-washed and pre-shrunk",
            "Machine wash cold with similar colors",
            "Stainless strap loops",
            "Double stitched construction",
            "Water-resistant"
        ],        
    }
} satisfies Story;
Default.parameters = { controls: { include: ['heading', 'fontStyle', 'colorVariant','itemList'] } };

export const With_multiple_column: Story = {
    args: {
        colorVariant: ColorVariant.Primary,
        heading: "Features",
        fontStyle: FontStyle.Italic,
        columns: 2,
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
With_multiple_column.parameters = { controls: { include: ['heading', 'fontStyle', 'colorVariant','itemList','columns'] } };

