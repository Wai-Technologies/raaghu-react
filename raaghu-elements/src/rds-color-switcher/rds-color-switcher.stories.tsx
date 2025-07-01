import { Meta, StoryObj } from "@storybook/react";
import RdsColorSwitcher, { DisplayType } from "./rds-color-switcher";

const meta: Meta = {
    title: 'Components/Color Switcher',
    component: RdsColorSwitcher,
    parameters: {
        layout: 'padded',
        docs: {
            description: {component: `The **Color Switcher** component offers an intuitive interface for users to select and switch between multiple color options. It supports different display styles via the \`displayType\` prop, allowing colors to be presented as either \`rounded\` or \`square\` swatches to fit diverse design requirements. The component accepts a \`header\` prop for labeling the switcher section, a \`defaultValue\` to specify the initially selected color, and an \`itemList\` array defining the available color options with properties like \`id\` and \`color\`. Ideal for theme pickers, customization panels, or any UI that requires color selection, this component enhances user experience by providing a clear, visually distinct way to toggle color preferences.`}
,
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


export const Standard: Story = {
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
Standard.parameters = { controls: { include: ['displayType', 'header', 'defaultValue', 'itemList'] } };


