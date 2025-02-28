import React from "react";
import RdsDropdownList, {DropdownSize, DropdownState, DropdownStyle} from "./rds-dropdown-list";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Elements/Dropdown List',
    component: RdsDropdownList,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            options: ["Default", "Small", "Large"],
            control: { type: "select" },
        },
        state: {
            options: ["Default", "Expanded", "Selected", "Disabled"],
            control: { type: "select" },
        },
        style: {
            options: ["Default", "Bottom Line"],
            control: { type: "select" },
        },
    },
} satisfies Meta<typeof RdsDropdownList>;

export default meta;
type Story = StoryObj<typeof RdsDropdownList>;

export const Default: Story = {
    args: {
        placeholder: "Filter",
        size:DropdownSize.Default,
        borderDropdown: true,
        isPlaceholder: true,
        showIcon: true,
        state: DropdownState.Default,
        style: DropdownStyle.Default,
        showTitle: true,
        title: "Label",
        isMandatory: false,
        showHint: true,
        hint: "Hint Text",
        multiSelect: false,
        icon:"dropdown_icon",
        iconWidth: "1px",
        iconHeight: "1px",
        listItems: [
                        {
                            label: "EN(US)",
                            val: "en",
                            icon: "us",
                            iconWidth: "20px",
                            iconHeight: "20px",
                        },
                        {
                            label: "English(IND)",
                            val: "en",
                            icon: "in",
                            iconWidth: "20px",
                            iconHeight: "20px",
                        },
                        {
                            label: "Français",
                            val: "fr",
                            icon: "fr",
                            iconWidth: "20px",
                            iconHeight: "20px",
                        },
                        {
                            label: "Deutsch",
                            val: "de",
                            icon: "de",
                            iconWidth: "20px",
                            iconHeight: "20px",
                        },
                        {
                            label: "Português (Brasil)",
                            val: "pt-BR",
                            icon: "br",
                            iconWidth: "20px",
                            iconHeight: "20px",
                        },
                        {
                            label: "Türkçe",
                            val: "tr",
                            icon: "tr",
                            iconWidth: "20px",
                            iconHeight: "20px",
                        },
                        {
                            label: "Italiano",
                            val: "it",
                            icon: "it",
                            iconWidth: "20px",
                            iconHeight: "20px",
                        },
                    ],        
        reset: false,
    }
} satisfies Story;
Default.parameters = { controls: { include: ['size', 'state', 'style', 'showTitle', 'title', 'isMandatory', 'showIcon', 'placeholder', 'showHint', 'hint', 'multiSelect'] } };

// export const WithMultiSelect: Story = {
//     args: {
//         reset: false,
//         placeholder: "Filter",
//         size:"medium",
//         multiSelect: true,
//         borderDropdown: true,
//         listItems: [
//             {
//                 label: "EN(US)",
//                 val: "en",
//                 iconWidth: "20px",
//                 iconHeight: "20px",
//             },
//             {
//                 label: "English(IND)",
//                 val: "en",
//                 iconWidth: "20px",
//                 iconHeight: "20px",
//             },
//             {
//                 label: "Français",
//                 val: "fr",
//                 iconWidth: "20px",
//                 iconHeight: "20px",
//             },
//             {
//                 label: "Deutsch",
//                 val: "de",
//                 iconWidth: "20px",
//                 iconHeight: "20px",
//             },
//             {
//                 label: "Português (Brasil)",
//                 val: "pt-BR",
//                 iconWidth: "20px",
//                 iconHeight: "20px",
//             },
//             {
//                 label: "Türkçe",
//                 val: "tr",
//                 iconWidth: "20px",
//                 iconHeight: "20px",
//             },
//             {
//                 label: "Italiano",
//                 val: "it",
//                 iconWidth: "20px",
//                 iconHeight: "20px",
//             },
//         ],
//     },
// }
// WithMultiSelect.parameters = { controls: { include: ['placeholder', 'borderDropdown', 'multiSelect', 'listItems', 'reset', 'size'] } };

// export const WithIcons: Story = {
//     args: {
//         borderDropdown: true,
//         isPlaceholder: true,
//         placeholder: "Filter",
//         size:"medium",
//         listItems: [
//             {
//                 label: "EN(US)",
//                 val: "en",
//                 icon: "us",
//                 iconWidth: "20px",
//                 iconHeight: "20px",
//             },
//             {
//                 label: "English(IND)",
//                 val: "en",
//                 icon: "in",
//                 iconWidth: "20px",
//                 iconHeight: "20px",
//             },
//             {
//                 label: "Français",
//                 val: "fr",
//                 icon: "fr",
//                 iconWidth: "20px",
//                 iconHeight: "20px",
//             },
//             {
//                 label: "Deutsch",
//                 val: "de",
//                 icon: "de",
//                 iconWidth: "20px",
//                 iconHeight: "20px",
//             },
//             {
//                 label: "Português (Brasil)",
//                 val: "pt-BR",
//                 icon: "br",
//                 iconWidth: "20px",
//                 iconHeight: "20px",
//             },
//             {
//                 label: "Türkçe",
//                 val: "tr",
//                 icon: "tr",
//                 iconWidth: "20px",
//                 iconHeight: "20px",
//             },
//             {
//                 label: "Italiano",
//                 val: "it",
//                 icon: "it",
//                 iconWidth: "20px",
//                 iconHeight: "20px",
//             },
//         ],        
//     }
// }
// WithIcons.parameters = { controls: { include: ['placeholder', 'borderDropdown', 'isPlaceholder', 'listItems', 'size'] } };

