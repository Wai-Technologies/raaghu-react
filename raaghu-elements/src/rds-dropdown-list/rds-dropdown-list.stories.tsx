import React from "react";
import RdsDropdownList, {DropdownSize, DropdownState, DropdownStyle} from "./rds-dropdown-list";
import { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta = {
    title: 'Elements/Dropdown List',
    component: RdsDropdownList,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
        component:
            'The **Dropdown List** element is a customizable UI component for selecting one or more options from a list. It supports multiple sizes (`Default`, `Small`, `Large`), styles (`Default`, `Bottom Line`), and states (`Default`, `Expanded`, `Selected`, `Disabled`). The dropdown can display an optional title, placeholder, icons, and hint text, and supports both single and multi-select modes. Additional features include a built-in search bar for filtering options and the ability to mark the field as mandatory. Flexible props allow you to tailor its appearance and behavior, making it ideal for forms, filters, and any interface where users need to select from a list of options.'
    },
            source:{
                transform: (code: string) => {
                    // Transform style enum - remove spaces and transform
                    code = code.replace(/style="([^"]+)"/g, (match, p1) => `style={DropdownStyle.${p1.replace(/\s+/g, '')}}`);
                    code = code.replace(/style:\s*"([^"]+)"/g, (match, p1) => `style: DropdownStyle.${p1.replace(/\s+/g, '')}`);
                    // Transform size enum - remove spaces and transform
                    code = code.replace(/size="([^"]+)"/g, (match, p1) => `size={DropdownSize.${p1.replace(/\s+/g, '')}}`);
                    code = code.replace(/size:\s*"([^"]+)"/g, (match, p1) => `size: DropdownSize.${p1.replace(/\s+/g, '')}`);
                    // Transform state enum - remove spaces and transform
                    code = code.replace(/state="([^"]+)"/g, (match, p1) => `state={DropdownState.${p1.replace(/\s+/g, '')}}`);
                    code = code.replace(/state:\s*"([^"]+)"/g, (match, p1) => `state: DropdownState.${p1.replace(/\s+/g, '')}`);
                    return code;
                }
            }
        }
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

export const Standard: Story = {
    args: {
        placeholder: "Filter",
        size:DropdownSize.Default,
        borderDropdown: true,
        isPlaceholder: true,
        showIcon: true,
        state: DropdownState.Default,
        style: DropdownStyle.Default,
        showTitle: true,
        showSearch: true,
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
                            val: "en-us",
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
Standard.parameters = { controls: { include: ['size', 'state', 'style', 'showTitle', 'title', 'isMandatory', 'showIcon', 'placeholder', 'showHint', 'hint', 'multiSelect', 'showSearch'] } };

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

