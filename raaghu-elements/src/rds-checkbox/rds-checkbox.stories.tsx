import RdsCheckbox, { CheckboxState, CheckboxStatus, CheckboxStyle, LabelPosition } from "./rds-checkbox";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: "Elements/Checkbox",
    component: RdsCheckbox,
    parameters: {
        layout: "padded",
        docs: {
              description: {
        component:
          'The **Checkbox** component is a customizable UI element used to select one or more options from a list. It supports multiple visual styles (`Square`, `Circular`), interactive states (`Default`, `Disabled`, `Hover`), and logical statuses (`checked`, `unchecked`, `indeterminate`). ' +
          'The checkbox can optionally display a label, which can be positioned to the `left` or `right` of the input. It is ideal for use in forms, settings panels, and multi-select interfaces. Additional props allow for full control over its appearance, state, and behavior.'
  },
            source: {
                transform: (code: string) => {
                    code = code.replace(/"(Square|Circular)"/g, '{CheckboxStyle.$1}');
                    code = code.replace(/"(checked|unchecked|indeterminate)"/g, '{CheckboxStatus.$1}');
                    code = code.replace(/"(Default|Disabled|Hover)"/g, '{CheckboxState.$1}');
                    code = code.replace(/"(left|right)"/g, '{LabelPosition.$1}');
                    return code;
                }
            }
        }
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


export const Standard: Story = {
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

Standard.parameters = { controls: { include: [ "status", "style", "state", "showText", "labelText",   /* "checked", "isSwitch", "isDisabled", "id", "labelPosition", "isInputGroup"*/] } };