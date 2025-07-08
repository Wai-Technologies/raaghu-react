import React from "react";
import RdsCompSelectList from "./rds-comp-select-list";
import { Meta, StoryObj } from "@storybook/react-vite";


const meta: Meta = {
    title: "Components/Select List",
    component: RdsCompSelectList,
    argTypes: {
        size: {
            options: ["small", "medium", "large"],
            control: { type: "select" },
        },
        style: {
            options: ["default", "BottomLine"],
            control: { type: "select" },
        },
        color: {
            options: ["primary", "success", "danger","none"],
            control: { type: "select" },
        },
    },
    parameters: {
        layout: 'padded',
        docs:{
            description: {
  component: `The **Select List** component provides a flexible dropdown selection input that supports both single and multiple selections. It accepts props such as \`id\` (unique identifier), \`label\` (text for the input label), \`isMultiple\` (enables multiple option selection), \`placeholder\` (placeholder text shown when no selection is made), \`selectItems\` (array of selectable options, each optionally including an image and custom sizing), \`isDisabled\` (disables the select input), \`selectedValue\` (currently selected value(s)), \`required\` (marks the field as mandatory), \`isSearchable\` (allows filtering options via search), \`isBold\` (renders text in bold), \`color\` (color variants such as primary, success, danger, or none), \`size\` (size variants like small, medium, large), and \`style\` (visual style variants like default or BottomLine). It supports an \`onChange\` event handler for capturing selection changes. This component is ideal for forms or UI elements where users select one or multiple options, optionally enhanced with icons or images for better visual identification.`
}

        }
    },
    tags: ['autodocs'],
} satisfies Meta<typeof RdsCompSelectList>;


export default meta;
type Story = StoryObj<typeof RdsCompSelectList>;

export const Standard: Story = {
    args: {
        id: "story",
        showLabel: true,
        label: "Default Select List",
        isMultiple: false,
        placeholder: "Select label",
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
        isBold: false,
        color: "primary",  // Default color set to primary
    }
}
Standard.parameters = { controls: { include: ['id', 'label', 'isMultiple', 'placeholder', 'selectItems', 'isDisabled', 'selectedValue', 'required', 'isSearchable', 'isBold', 'color', 'onChange'] } };

export const Multiple: Story = {
    args: {
        id: "story",
        showLabel: true,
        label: "Multiple Select List",
        isMultiple: true,
        placeholder: "Select label",
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
        required: false,
        isSearchable: true,
        isBold: false,
        color: "primary",  // Default color set to success
    }
}
Multiple.parameters = { controls: { include: ['id', 'label', 'isMultiple', 'placeholder', 'selectItems', 'isDisabled', 'required', 'isSearchable', 'isBold', 'color', 'onChange'] } };

export const WithIcon: Story = {
    args: {
        id: "story",
        showLabel: true,
        label: "Label",
        size: "medium",
        style: "default",
        isMultiple: true,
        defaultImgUrl: "https://www.svgrepo.com/show/497407/profile-circle.svg",
        placeholder: "Select label",      
        selectItems: [
            {
                option: "Riya Sharma",
                value: "Riya",
                imgUrl: "https://th.bing.com/th/id/OIP.dmCI62ZlmvIp1yxyBVSAxAHaHP?w=567&h=555&rs=1&pid=ImgDetMain",
                imgWidth: "30px",
                imgHeight: "30px",
            },
            {
                option: "John Doe",
                value: "John",
                imgUrl: "https://i.vimeocdn.com/portrait/20107774_640x640",
                imgWidth: "30px",
                imgHeight: "30px",
            },
            {
                option: "Richard P",
                value: "Richard",
                imgUrl: "https://www.mockofun.com/wp-content/uploads/2019/12/circle-profile-pic-768x730.jpg",
                imgWidth: "30px",
                imgHeight: "30px",
            },
            {
                option: "Alex Brown",
                value: "Alex",
                imgUrl: "https://th.bing.com/th/id/OIP.dmCI62ZlmvIp1yxyBVSAxAHaHP?w=567&h=555&rs=1&pid=ImgDetMain",
                imgWidth: "30px",
                imgHeight: "30px",
            },
            {
                option: "Chris Johnson",
                value: "Chris",
                imgUrl: "",
                imgWidth: "30px",
                imgHeight: "30px",
            },
            {
                option: "Elizabeth Diva",
                value: "Elizabeth",
                imgUrl: "https://th.bing.com/th/id/OIP.GmUT02hCOJSpUjLmUtV5hAHaHa?rs=1&pid=ImgDetMain",
                imgWidth: "30px",
                imgHeight: "30px",
            }
        ],
        isDisabled: false,
        showHint: false,
        required: false,
        isSearchable: true,
        isBold: false,
        color: "primary",  // Default color set to danger
    }
}
WithIcon.parameters = { controls: { include: ['id', 'label', 'style', 'size', 'placeholder', 'selectItems', 'isDisabled', 'showHint', 'showLabel', 'required', 'isSearchable', 'isBold', 'defaultImgUrl', 'color'] } };
