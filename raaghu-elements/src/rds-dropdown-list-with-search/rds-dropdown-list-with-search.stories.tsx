import React from "react";
import RdsDropdownListWithSearch from "./rds-dropdown-list-with-search";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Elements/Dropdown List With Search',
    component: RdsDropdownListWithSearch,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsDropdownListWithSearch>;

export default meta;
type Story = StoryObj<typeof RdsDropdownListWithSearch>;

export const Default: Story = {
    args: {
        id: "story",
        isMultiple: true,
        placeholder: "Filter",
        selectItems: [
            {
                option: "Riya Sharma",
                value: "Riya"
            },
            {
                option: "John Doe",
                value: "John"
            },
            {
                option: "Richard P",
                value: "Richard"
            },
            {
                option: "Alex Brown",
                value: "Alex"
            },
            {
                option: "Chris Johnson",
                value: "Chris"
            },
            {
                option: "Rihan Diva",
                value: "Rihan"   
            }
        ],
        isDisabled: false,
        required: false,
        isSearchable: true,
        isBold: false
    }
}
Default.parameters = { controls: { include: ['id', 'label', 'isMultiple', 'placeholder', 'selectItems', 'isDisabled', 'required', 'isSearchable', 'isBold', 'onChange'] } };