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
        id: 'example-id',
        placeholder: 'Filter',
        isSearchable: true,
        isDisabled: false,
       selectItems: [
            {
                label: "Riya Sharma",
                value: "Riya",
                icon: "profile_picture_circle",
                iconWidth: "50px",
                iconHeight: "25px",
            },
            {
                label: "John Doe",
                value: "John",
                icon: "profile_picture_circle",
                iconWidth: "50px",
                iconHeight: "25px",
            },
            {
                label: "Richard P",
                value: "Richard",
                icon: "profile_picture_circle",
                iconWidth: "50px",
                iconHeight: "25px",
            },
            {
                label: "Alex Brown",
                value: "Alex",
                icon: "profile_picture_circle",
                iconWidth: "50px",
                iconHeight: "25px",
            },
            {
                label: "Chris Johnson",
                value: "Chris",
                icon: "profile_picture_circle",
                iconWidth: "50px",
                iconHeight: "25px",
            },
            {
                label: "Rihan Diva",
                value: "Rihan",
                icon: "profile_picture_circle",
                iconWidth: "50px",
                iconHeight: "25px", 
            }
        ],
    }
}
Default.parameters = { controls: { include: ['id', 'label', 'isMultiple', 'placeholder', 'selectItems', 'isDisabled', 'required', 'isSearchable', 'isBold', 'onChange'] } };