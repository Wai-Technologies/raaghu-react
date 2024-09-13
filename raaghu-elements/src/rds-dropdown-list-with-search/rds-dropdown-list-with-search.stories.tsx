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
//     args: {
//         placeholder: "Filter",
//         borderDropdown: true,
//         isPlaceholder: true,
//         listItems: [
//             { label: "EN(US)", val: "en", icon: "us", iconWidth: "20px", iconHeight: "20px" },
//             { label: "English(IND)", val: "en", icon: "in", iconWidth: "20px", iconHeight: "20px" },
//             { label: "Français", val: "fr", icon: "fr", iconWidth: "20px", iconHeight: "20px" },
//             { label: "Deutsch", val: "de", icon: "de", iconWidth: "20px", iconHeight: "20px" },
//             { label: "Português (Brasil)", val: "pt-BR", icon: "br", iconWidth: "20px", iconHeight: "20px" },
//             { label: "Türkçe", val: "tr", icon: "tr", iconWidth: "20px", iconHeight: "20px" },
//             { label: "Italiano", val: "it", icon: "it", iconWidth: "20px", iconHeight: "20px" },
//         ],
//         reset: false,
//     }
// } satisfies Story;
// Default.parameters = { controls: { include: ['placeholder', 'borderDropdown', 'isPlaceholder', 'listItems'] } };

export const Default: Story = {
    args: {
        reset: false,
        placeholder: "Filter",
        multiSelect: true,
        borderDropdown: true,
        listItems: [
            {
                label: "EN(US)",
                val: "en",
                iconWidth: "20px",
                iconHeight: "20px",
            },
            {
                label: "English(IND)",
                val: "en",
                iconWidth: "20px",
                iconHeight: "20px",
            },
            {
                label: "Français",
                val: "fr",
                iconWidth: "20px",
                iconHeight: "20px",
            },
            {
                label: "Deutsch",
                val: "de",
                iconWidth: "20px",
                iconHeight: "20px",
            },
            {
                label: "Português (Brasil)",
                val: "pt-BR",
                iconWidth: "20px",
                iconHeight: "20px",
            },
            {
                label: "Türkçe",
                val: "tr",
                iconWidth: "20px",
                iconHeight: "20px",
            },
            {
                label: "Italiano",
                val: "it",
                iconWidth: "20px",
                iconHeight: "20px",
            },
        ],
    },
}
Default.parameters = { controls: { include: ['placeholder', 'borderDropdown', 'multiSelect', 'listItems', 'reset'] } };