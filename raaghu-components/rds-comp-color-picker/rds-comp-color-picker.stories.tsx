import RdsCompColorPicker from "./rds-comp-color-picker";
import { ColorPickerType } from "./rds-comp-color-picker.types";
import { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from 'storybook/test';

const meta: Meta = {
    title: 'Components/Color Picker',
    component: RdsCompColorPicker,
    parameters: {
            status: { type: 'stable' },
        layout: 'padded',
        docs: {
            
        },
    },
    tags: ['autodocs', 'stable'],
    argTypes: {
        className: { control: 'text', description: 'CSS class applied to the color picker root.' },
        sx: { control: 'object', description: 'MUI system styles applied to the color picker root.' },
        ref: { control: false, description: 'React ref to the color picker root; assign it in code.' },
        type: {
            control: 'select',
            options: ['Default', 'Button', 'Button-Expanded'],
        },
        disabled: {
            control: 'boolean',
        },
        showSwatches: {
            control: {
                type: 'boolean',
            },
        },
        view: {
            control:'select',
            options: ['grid', 'spectrum'],
            
        },
        showTabs: {
            control: {
                type: 'boolean',
            },
        },
        format: {
            control: 'select',
            options: ['hex', 'rgb', 'hsb', 'hsl'],
        },
        swatchesVariant: {
            control: 'select',
            options: ['list', 'grid'],
        },
        onChange: { action: 'changed' },
    },
} satisfies Meta<typeof RdsCompColorPicker>;

export default meta;
type Story = StoryObj<typeof RdsCompColorPicker>;

export const Default: Story = {
    args: {
        value: "#9751F2",
        label: "Color-Picker",
        type: ColorPickerType.Default,
        showSwatches: true,
        view: 'spectrum',
        showTabs: true,
        format: 'hex',
        swatchesVariant: 'list',
        disabled: false,
    },
    play: async ({ canvasElement }) => {
        await expect(canvasElement.firstChild).toBeTruthy();
    },
} satisfies Story;
Default.parameters = { controls: { include: ['type','showSwatches', 'view', 'showTabs', 'swatchesVariant', 'disabled', 'className', 'sx', 'ref'] } };
