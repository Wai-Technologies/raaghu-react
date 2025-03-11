import RdsCheckbox, { CheckboxState, CheckboxStatus, CheckboxStyle, LabelPosition } from "./rds-checkbox";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: "Elements/Checkbox",
    component: RdsCheckbox,
    parameters: {
        layout: "padded",
    },
    tags: ["autodocs"],
    argTypes: {
        labelPosition: {
            options: ["right", "left"],
            control: { type: "select" },
        },
        status: {
            options: ["checked", "unchecked", "indeterminate"],
            control: { type: "select" },
        },
        state: {
            options: ["Default", "Disabled", "Hover"],
            control: { type: "select" },
        },
        style: {
            options: ["Square", "Circular"],
            control: { type: "select" },
        }
    },
} satisfies Meta<typeof RdsCheckbox>;

export default meta;
type Story = StoryObj<typeof RdsCheckbox>;


export const Default: Story = {
    args: {
        status: CheckboxStatus.Checked,   
        style: CheckboxStyle.Square,     
        state: CheckboxState.Default,   
        showText: true,
        labelText: "Label",
        checked: true,
        labelPosition: LabelPosition.Right
        //isDisabled: false,
        //isSwitch: false,
        //id: "id1",
        //errorMessage:"error Message",
        //isInputGroup: false
    }
} satisfies Story;

Default.parameters = { controls: { include: [ "status", "style", "state", "showText", "labelText",   /* "checked", "isSwitch", "isDisabled", "id", "labelPosition", "isInputGroup"*/] } };