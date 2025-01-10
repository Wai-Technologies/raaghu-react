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


export const Advanced_ColorPicker: Story = {
    args: {
        value: "#e1e1e1",
        label: "Color-Picker"
    }
} satisfies Story;
Advanced_ColorPicker.parameters = { controls: { include: ['value', 'label'] } };




