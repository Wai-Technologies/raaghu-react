import RdsColorPicker from "./rds-color-picker";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Elements/Color Picker',
    component: RdsColorPicker,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsColorPicker>;

export default meta;
type Story = StoryObj<typeof RdsColorPicker>;

export const ColorPicker: Story = {
    args: {
        value: "#e1e1e1",
        isDisabled: false,
        label: "Selected Color",
        //displayType: "basic"
    }
} satisfies Story;

// export const hex: Story = {
//     args: {
//         value: "#e1e1e1",
//         isDisabled: false,
//         label: "Hex Color-Picker",
//         //displayType: "hex"
//     }
// } satisfies Story;

// export const rgba: Story = {
//     args: {
//         value: "#FF5733", // Red color as default
//         isDisabled: true,  // Disabled state
//         label: "rgba Color Picker",
//         //displayType: "rgba"
//     },
// } satisfies Story;
// export const hsl: Story = {
//     args: {
//         value: "#FF5733", // Red color as default
//         isDisabled: true,  // Disabled state
//         label: "hsl Color Picker",
//         //displayType: "hsl"
//     },
// } satisfies Story;


ColorPicker.parameters = { controls: { include: ['value', 'label', 'isDisabled'] } };
// hex.parameters = { controls: { include: ['value', 'label', 'isDisabled'] } };
// rgba.parameters = { controls: { include: ['value', 'label', 'isDisabled'] } };
// hsl.parameters = { controls: { include: ['value', 'label', 'isDisabled'] } };

