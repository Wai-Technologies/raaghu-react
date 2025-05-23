import { Meta, StoryObj } from "@storybook/react";
import RdsColorSwitcher, { DisplayType } from "./rds-color-switcher";

const meta: Meta = {
    title: 'Components/Color Switcher',
    component: RdsColorSwitcher,
    parameters: {
        layout: 'padded',
        docs: {
            source: {
                transform: (code: string) => {
                    code = code.replace(/"(rounded|square)"/g, '{DisplayType.$1}');
                    return code;
                },
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        displayType: {
            options: ["rounded", "square"],
            control: { type: "radio" },
        },
    },
} satisfies Meta<typeof RdsColorSwitcher>;

export default meta;
type Story = StoryObj<typeof RdsColorSwitcher>;


export const Default: Story = {
    args: {
        displayType: DisplayType.Rounded,
        header: "Color",
        defaultValue: 1,
        itemList: [
            { id: 1, color: "#FFFFFF" },
            { id: 2, color: "#FDD2FF" },
            { id: 3, color: "#BFEAFF" },
        ]
    }
} satisfies Story;
Default.parameters = { controls: { include: ['displayType', 'header', 'defaultValue', 'itemList'] } };


