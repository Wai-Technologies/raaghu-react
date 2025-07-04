import React from "react";
import RdsTextEditor from "./rds-text-editor";
import { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta = {
    title: 'Elements/Text Editor',
    component: RdsTextEditor,
    parameters: {
        layout: 'padded',
        docs:{
            description: {
  component: `The **Text Editor** element is a rich text input component designed for creating and editing formatted content within your application. It supports various **interaction states** including \`Default\`, \`Active\`, \`Selected\`, \`Disabled\`, and \`Error\`. The component allows optional display of a **title label** and can mark the field as **mandatory**. This element is ideal for use cases such as content creation, messaging, and form inputs where enhanced text formatting and user interaction feedback are required. It can be seamlessly integrated and styled to match your design system’s requirements.`
},

        }
    },
    tags: ['autodocs'],
    argTypes: {
        State: {
            options: [
                "Default"   ,
                "Active"  ,
                "Selected",
                "Disabled" ,
                "Error"   
            ],
            control: { type: "select" },
        },
    },
} satisfies Meta<typeof RdsTextEditor>;

export default meta;
type Story = StoryObj<typeof RdsTextEditor>;

export const Standard: Story = {
    args: {
        State: "Default",
        showTitle: true,
        label:"Label",
        isMandatory: true,
    }
} satisfies Story;
Standard.parameters = { controls: { include: ['State', 'showTitle', 'label', 'isMandatory'] } };
