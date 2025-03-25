import RdsColorPicker, { ColorMode, ColorPickerType, PickerType } from "./rds-color-picker";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Elements/Color Picker',
    component: RdsColorPicker,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        type: {
            control: 'select',
            options: ['Default', 'Button', 'Button-Expanded'],
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
    },
} satisfies Meta<typeof RdsColorPicker>;

export default meta;
type Story = StoryObj<typeof RdsColorPicker>;

export const Advanced_ColorPicker: Story = {
    args: {
        value: "#e1e1e1",
        label: "Color-Picker",
        type: ColorPickerType.Default, // Use enum
        showSwatches: false,
        pickerType: PickerType.Grid, // Use enum
        showTabs: true,
        colorMode: ColorMode.HEX, // Use enum
    },
} satisfies Story;
Advanced_ColorPicker.parameters = { controls: { include: ['type', 'showSwatches', 'pickerType', 'showTabs'] } };


// import RdsColorPicker from "./rds-color-picker";
// import { Meta, StoryObj } from "@storybook/react";

// const meta: Meta = {
//     title: 'Elements/Color Picker',
//     component: RdsColorPicker,
//     parameters: {
//         layout: 'padded',
//     },
//     tags: ['autodocs'],
//     argTypes: {
//     },
// } satisfies Meta<typeof RdsColorPicker>;

// export default meta;
// type Story = StoryObj<typeof RdsColorPicker>;


// export const CustomColorPicker: Story = {
//     args: {
//         value: "#e1e1e1",
//         isDisabled: false,
//         label: "Color-Picker"
//     }
// } satisfies Story;
// CustomColorPicker.parameters = { controls: { include: ['value', 'label', 'isDisabled'] } };


