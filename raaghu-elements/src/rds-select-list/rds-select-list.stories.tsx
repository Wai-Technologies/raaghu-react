import React from "react";
import RdsSelectList from "./rds-select-list";
import { Meta, StoryObj } from "@storybook/react";


const meta: Meta = {
    title: "Elements/SelectList",
    component: RdsSelectList,
    argTypes: {

    },
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs']
} satisfies Meta<typeof RdsSelectList>;


export default meta;
type Story = StoryObj<typeof RdsSelectList>;

export const Default: Story = {
    args: {
        id: "story",
        label: "Open select list",
        isMultiple: false,
        placeholder: "Select option",
        selectItems: [
            {
                option: "One",
                value: "one"
            },
            {
                option: "two",
                value: "two"
            },
            {
                option: "three",
                value: "three"
            },
            {
                option: "four",
                value: "four"
            }


        ],
        isDisabled: false,
        selectedValue: "",
        required: false,
        isSearchable: true,
    }
}

export const Multiple: Story = {
    args: {
        id: "story",
        label: "Open select list",
        isMultiple: true,
        placeholder: "Select option",
        selectItems: [
            {
                option: "One",
                value: "one"
            },
            {
                option: "two",
                value: "two"
            },
            {
                option: "three",
                value: "three"
            },
            {
                option: "four",
                value: "four"
            }


        ],
        isDisabled: false,
        selectedValue: "",
        required: false,
        isSearchable: true,
    }
}
