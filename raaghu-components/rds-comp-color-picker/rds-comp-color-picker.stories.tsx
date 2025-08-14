import RdsColorPicker, { ColorMode, ColorPickerType, PickerType, StyleType } from "./rds-comp-color-picker";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Components/Color Picker',
    component: RdsColorPicker,
    parameters: {
        layout: 'padded',
        docs: {
            
        },
    },
    tags: ['autodocs'],
    argTypes: {
        type: {
            control: 'select',
            options: ['Default', 'Button', 'Button-Expanded'],
        },
        isDisabled: {
            control: 'boolean',
        },
        showSwatches: {
            control: {
                type: 'boolean',
            },
        },
        pickerType: {
            control:'select',
            options: ['Grid', 'Spectrum'],
            
        },
        showTabs: {
            control: {
                type: 'boolean',
            },
        },
        colorMode: {
            control: 'select',
            options: ['HEX', 'RGB', 'HSB', 'HSL'],
        },
        style: {
            control: 'select',
            options: ['Type 1', 'Type 2'],
        },
        onChange: { action: 'changed' },
    },
} satisfies Meta<typeof RdsColorPicker>;

export default meta;
type Story = StoryObj<typeof RdsColorPicker>;

export const Advanced_ColorPicker: Story = {
    args: {
        value: "#9751F2",
        label: "Color-Picker",
        type: ColorPickerType.Default,
        showSwatches: true,
        pickerType: PickerType.Spectrum,
        showTabs: true,
        colorMode: ColorMode.HEX, 
        style: StyleType.Type1, 
        isDisabled: false,
    },
} satisfies Story;
Advanced_ColorPicker.parameters = { controls: { include: ['type','showSwatches', 'pickerType', 'showTabs', 'style'] } };