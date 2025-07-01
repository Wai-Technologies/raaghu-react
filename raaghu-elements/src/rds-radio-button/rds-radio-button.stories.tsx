import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import RdsRadioButton, { RdsRadioButtonLayout, RdsRadioButtonState } from "./rds-radio-button";

const meta: Meta = {
    title: "Elements/Radio Button",
    component: RdsRadioButton,
    parameters: {
    docs: {
        description: {
        component:
            'The **Radio Button** element is a customizable selection component for choosing a single option from a group. It supports multiple layouts (`Icon`, `Icon with Label`, `Icon with bottom Label`) and states (`Default`, `Hover`, `Disabled`). You can display labels, set the selected state, and provide a list of options for users to choose from. Flexible props allow you to tailor its appearance and behavior, making it ideal for forms, surveys, and any interface where single-choice selection is required in your design system.'
    },
        source :{
            transform:(code: string) => {
                // Transform layout enum - remove spaces and transform
                code = code.replace(/layout="([^"]+)"/g, (match, p1) => `layout={RdsRadioButtonLayout.${p1.replace(/\s+/g, '')}}`);
                code = code.replace(/layout:\s*"([^"]+)"/g, (match, p1) => `layout: RdsRadioButtonLayout.${p1.replace(/\s+/g, '')}`);
                // Transform state enum - remove spaces and transform
                code = code.replace(/state="([^"]+)"/g, (match, p1) => `state={RdsRadioButtonState.${p1.replace(/\s+/g, '')}}`);
                code = code.replace(/state:\s*"([^"]+)"/g, (match, p1) => `state: RdsRadioButtonState.${p1.replace(/\s+/g, '')}`);
                return code;
            }
        }
    }
    },
    argTypes: {
        // displayType: {
        //     options: [
        //         "Default",
        //         "Horizontal"
        //     ],
        //     control: { type: "select" },
        // },
        layout: {
            options: [
                "Icon",
                "Icon with Label",
                "Icon with bottom Label",
            ],
            control: { type: "select" },
        },
        state: {
            options: [
                "Default",
                "Hover",
                "Disabled",
            ],
            control: { type: "select" },
        },
        selected: {
            control: { type: "boolean" },
        },
        title: {
            control: { type: "text" },
        }
    },
    tags: ['autodocs'],
} satisfies Meta<typeof RdsRadioButton>;

export default meta;
type Story = StoryObj<typeof RdsRadioButton>;


export const Default: Story = {
    args: {
        displayType: "Default",
        layout: RdsRadioButtonLayout.Icon, // Use the enum here
        state: RdsRadioButtonState.Default, // Use the enum here
        selected: false,
        title: "Label",
        itemList: [
            {
                id: 1,
                label: "Radio Button 1",
                checked: true,
                name: "radio_button",
            },
            {
                id: 2,
                label: "Radio Button 2",
                checked: true,
                name: "radio_button",
            },
            {
                id: 3,
                label: "Radio Button 3",
                checked: true,
                name: "radio_button",
            },
        ]
    }
} satisfies Story;
//Default.parameters = { controls: { include: ['displayType', 'itemList'] } };
Default.parameters = { controls: { include: ['layout', 'state', 'selected', 'title'] } };

// export const Horizontal: Story = {
//     args: {
//         displayType: "Horizontal",
//         itemList: [
//             {
//                 id: 1,
//                 label: "Radio Button 1",
//                 checked: true,
//                 name: "radio_button",
//             },
//             {
//                 id: 2,
//                 label: "Radio Button 2",
//                 checked: true,
//                 name: "radio_button",
//             },
//             {
//                 id: 3,
//                 label: "Radio Button 3",
//                 checked: true,
//                 name: "radio_button",
//             },
//         ]
//     }
// } satisfies Story;
// Horizontal.parameters = { controls: { include: ['displayType', 'itemList'] } };




