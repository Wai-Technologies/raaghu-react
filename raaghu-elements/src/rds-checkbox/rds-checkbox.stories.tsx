import React from "react";
import RdsCheckbox from "./rds-checkbox";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Elements/Checkbox"',
    component: RdsCheckbox,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        state: {
            options: ["Checkbox", "Indeterminate", "ErrorCheckbox"],
            control: { type: "select" },
        }
    },
} satisfies Meta<typeof RdsCheckbox>;

export default meta;
type Story = StoryObj<typeof RdsCheckbox>;


export const checkbox :Story={
    args:{
        state:"Checkbox",
        label:"default checkbox",
        checked:false,
        isDisabled:false,
        isSwitch:false,
        withlabel:true,
        id:"id1",
        //errorMessage:"error Message",
        isInputGroup:false
    }
} satisfies Story;


