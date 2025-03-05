import React from "react";
import RdsInput, { InputSize, LabelPosition } from "./rds-input";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: 'Elements/Input',
  component: RdsInput,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      options: ["Default", "small", "medium", "large"],
      control: { type: "select" },
    },
    inputType: {
      options: ["text", "password", "number", "phone number", "card number"],
      control: { type: "select" },
    },
    state: {
      options: ["default", "active", "selected", "error", "disabled"],
      control: { type: "select" },
    },
    style: {
      options: ["Default", "Bottom Outline", "Pill"],
      control: { type: "select" },
    },
    labelPosition: {
      options: ["top", "bottom", "floating", "right", "left"],
      control: { type: "select" },
    },
    tooltipPlacement: {
      options: ["top", "bottom", "right", "left"],
      control: { type: "radio" },
    },
    fontWeight: {
      options: ["normal", "bold", "light"],
      control: { type: "select" },
    },
  },
} satisfies Meta<typeof RdsInput>;

export default meta;
type Story = StoryObj<typeof RdsInput>;

const placeholderMapping: { [key: string]: string } = {
  text: "Add Text",
  password: "*********",
  number: "Add Number",
  "phone number": "+9112345678",
  "card number": "xxxx xxxx xxxx xxxx",
};

export const Default: Story = {
  args: {
    size: InputSize.Medium,
    inputType: "text",
    state: "default",
    style: "Default",
    placeholder: placeholderMapping["text"],
    label: true,
    showTitle: true,
    labelPosition: LabelPosition.Top,
    HintText: "Hint Text",
    ShowHintText: true,
    id: "default-input",
    value: "",
    required: true,
    name: "label",
    showIcon: true,
    singleDigit: false,
    fontWeight: "normal",
  },
  argTypes: {
    placeholder: {
      table: {
        disable: true,
      }, 
    },
  },
  decorators: [
    (Story, context) => {
      const { inputType = "text" } = context.args;
      context.args.placeholder = placeholderMapping[inputType] || "Add Placeholder";
      return <Story />;
    },
  ],
} satisfies Story;

Default.parameters = { controls: { include: ['size', 'inputType', 'state', 'style', 'placeholder', 'label', 'required', 'showIcon', 'HintText', 'ShowHintText',/* 'singleDigit', 'value','fontWeight','id''labelPosition', */] } };// export const Tooltip: Story = {

//   args: {
//     size: "medium",
//     inputType: "text",
//     state: "default",
//     style: "Default",
//     label: "Label",
//     showIcon: true,
//     labelPosition: "top",
//     HintText:"Hint Text",
//     ShowHintText:true,
//     id: "tooltip-input",
//     value: "",
//     required: true,
//     tooltipPlacement: "top",
//     tooltipTitle: "This is tooltip",
//     showTitle: true,
//   }
// } satisfies Story;
// Tooltip.parameters = { controls: { include: ['size', 'inputType', 'state', 'style', 'placeholder', 'label', 'labelPosition', 'id', 'value', 'required', 'tooltipPlacement', 'tooltipTitle', 'showIcon', 'fontWeight'] } };

// export const Disabled: Story = {
//   args: {
//     size: "medium",
//     inputType: "text",
//     state: "disable",
//     style: "Default",
//     label: "Label",
//     showTitle: true,
//     labelPosition: "top",
//     HintText:"Hint Text",
//     ShowHintText:true,
//     id: "disabled-input",
//     value: "",
//     required: true,
//     isDisabled: true,
//     showIcon: true,
//     fontWeight: "normal",
//   },
// } satisfies Story;
// Disabled.parameters = { controls: { include: ['size', 'inputType', 'state', 'style', 'placeholder', 'label', 'labelPosition', 'id', 'value', 'required', 'isDisabled', 'showIcon', 'fontWeight'] } };

// export const Readonly: Story = {
//   args: {
//     size: "medium",
//     inputType: "text",
//     state: "default",
//     style: "Default",
//     label: "Label",
//     showTitle: true,
//     labelPosition: "top",
//     HintText:"Hint Text",
//     ShowHintText:true,
//     id: "readonly-input",
//     value: "",
//     required: true,
//     readonly: true,
//     showIcon: true,
//     fontWeight: "normal",
//   },
// } satisfies Story;
// Readonly.parameters = { controls: { include: ['size', 'inputType', 'state', 'style', 'placeholder', 'label', 'labelPosition', 'id', 'value', 'required', 'readonly', 'showIcon', 'fontWeight'] } };

// export const Email: Story = {
//   args: {
//     size: "medium",
//     inputType: "email",
//     state: "default",
//     style: "Default",
//     label: "Email",
//     showTitle: true,
//     labelPosition: "top",
//     HintText:"Hint Text",
//     ShowHintText:true,
//     id: "email-input",
//     value: "",
//     required: true,
//     readonly: false,
//     showIcon: true,
//     fontWeight: "normal",
//   },
// } satisfies Story;
// Email.parameters = { controls: { include: ['size', 'inputType', 'state', 'style', 'placeholder', 'label', 'labelPosition', 'id', 'value', 'required', 'readonly', 'showIcon', 'fontWeight'] } };


// export const Password: Story = {
//   args: {
//     size: "medium",
//     inputType: "password",
//     state: "default",
//     style: "Default",
//     label: "Password",
//     showTitle: true,
//     labelPosition: "top",
//     HintText:"Hint Text",
//     ShowHintText:true,
//     id: "password-input",
//     value: "",
//     required: true,
//     readonly: false,
//     showIcon: true,
//     fontWeight: "normal"
//   },
// } satisfies Story;
// Password.parameters = { controls: { include: ['size', 'inputType', 'state', 'style', 'placeholder', 'label', 'labelPosition', 'id', 'value', 'required', 'showIcon', 'readonly', 'fontWeight'] } };

// export const NumberInput: Story = {
//   args: {
//     size: "medium",
//     inputType: "number",
//     state: "default",
//     style: "Default",
//     placeholder: "Add Number",
//     label: "Number",
//     labelPosition: "top",
//     id: "number-input",
//     value: "",
//     required: true,
//     readonly: false,
//     showIcon: true,
//     fontWeight: "normal",
//     minValue: 1,
//     maxValue: 100,
//   },
// } satisfies Story;

// NumberInput.parameters = { controls: { include: ['size', 'inputType', 'state', 'style', 'placeholder', 'label', 'labelPosition', 'id', 'value', 'required', 'showIcon', 'readonly', 'minValue', 'maxValue', 'fontWeight'] } };

// export const CardNumber: Story = {
//   args: {
//     size: "medium",
//     inputType: "card number",
//     state: "default",
//     style: "Default",
//     placeholder: "xxxx xxxx xxxx xxxx",
//     label: "Card Number",
//     labelPosition: "top",
//     id: "card-number-input",
//     value: "",
//     required: true,
//     readonly: false,
//     showIcon: true,
//     fontWeight: "normal",
//     minLength: 16,
//     maxLength: 19, // Including spaces
//   },
// } satisfies Story;

// CardNumber.parameters = { controls: { include: ['size', 'inputType', 'state', 'style', 'placeholder', 'label', 'labelPosition', 'id', 'value', 'required', 'showIcon', 'readonly', 'minLength', 'maxLength', 'fontWeight'] } };

// export const PhoneNumber: Story = {
//   args: {
//     size: "medium",
//     inputType: "phone number",
//     state: "default",
//     style: "Default",
//     placeholder: "Add Phone Number",
//     label: "Phone Number",
//     labelPosition: "top",
//     id: "phone-number-input",
//     value: "",
//     required: true,
//     readonly: false,
//     showIcon: true,
//     fontWeight: "normal",
//   },
// } satisfies Story;

// PhoneNumber.parameters = { controls: { include: ['size', 'inputType', 'state', 'style', 'placeholder', 'label', 'labelPosition', 'id', 'value', 'required', 'showIcon', 'readonly', 'fontWeight'] } };