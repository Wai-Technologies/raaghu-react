import RdsColorPicker, { ColorMode, ColorPickerType, PickerType } from "./rds-color-picker";
import { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta = {
    title: 'Elements/Color Picker',
    component: RdsColorPicker,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
       component:
            'The **Color Picker** component is an interactive UI element for selecting and inputting colors in different formats. It supports multiple display types (`Default`, `Button`, `Button-Expanded`), allowing integration as an input field or as a button with an expandable palette. Users can choose colors using various picker layouts (`Grid`, `Spectrum`) and switch between color modes (`HEX`, `RGB`, `HSB`, `HSL`). Optional features include color swatches for quick selection and tabbed interfaces for enhanced usability. The component offers customizable props for appearance and behavior, making it suitable for forms, design tools, and any interface where efficient color selection is needed.'
                
    },
            source: {
                transform: (code: string) => {
                    // Transform style enum - remove spaces and transform
                    code = code.replace(/type="([^"]+)"/g, (match, p1) => `type={ColorPickerType.${p1.replace(/\s+/g, '')}}`);
                    code = code.replace(/type:\s*"([^"]+)"/g, (match, p1) => `type: ColorPickerType.${p1.replace(/\s+/g, '')}`);
                    // Transform pickerType enum - remove spaces and transform
                    code = code.replace(/pickerType="([^"]+)"/g, (match, p1) => `pickerType={PickerType.${p1.replace(/\s+/g, '')}}`);
                    code = code.replace(/pickerType:\s*"([^"]+)"/g, (match, p1) => `pickerType: PickerType.${p1.replace(/\s+/g, '')}`);
                    // Transform colorMode enum - remove spaces and transform
                    code = code.replace(/colorMode="([^"]+)"/g, (match, p1) => `colorMode={ColorMode.${p1.replace(/\s+/g, '')}}`);
                    code = code.replace(/colorMode:\s*"([^"]+)"/g, (match, p1) => `colorMode: ColorMode.${p1.replace(/\s+/g, '')}`);
                    return code;
                }
            }
        },
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

export const Standard: Story = {
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
Standard.parameters = { controls: { include: ['type', 'showSwatches', 'pickerType', 'showTabs'] } };


// import RdsColorPicker from "./rds-color-picker";
// import { Meta, StoryObj } from "@storybook/react-vite";

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


