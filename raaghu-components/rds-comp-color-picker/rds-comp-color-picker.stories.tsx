import RdsColorPicker, { ColorMode, ColorPickerType, PickerType, StyleType } from "./rds-comp-color-picker";
import { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from '@storybook/test';

const meta: Meta = {
    title: 'Components/Color Picker',
    component: RdsColorPicker,
    parameters: {
        layout: 'padded',
        docs: {
            
        },
    },
    tags: ['autodocs', 'stable'],
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

export const Default: Story = {
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
Default.parameters = { controls: { include: ['type','showSwatches', 'pickerType', 'showTabs', 'style'] } };
export const PickerVisible: Story = {
  name: 'Interaction: Color picker renders',
  args: {
    value: '#4BC0C0',
    label: 'Pick a color',
    type: ColorPickerType.Default,
    isDisabled: false,
  },
  play: async ({ canvasElement }) => {
    const picker = canvasElement.querySelector(
      '[class*="color"], [class*="Color"], [class*="picker"], [class*="Picker"]'
    ) ?? canvasElement.firstElementChild
    await expect(picker).not.toBeNull()
    await expect(canvasElement).toBeTruthy()
  }
};
