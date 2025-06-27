import RdsCompRange, { DoubleRangeType } from "./rds-comp-range";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Components/Range',
    component: RdsCompRange,
    parameters: {
        layout: 'padded',
        docs: {
            source: {
                transform: (code: string) => {
                    code = code.replace(/"(default|type_1|type_2)"/g, '{DoubleRangeType.$1}');
                    return code;
                },
            },
            description: {
                component: `The **Range** component provides a customizable slider input for selecting a numeric value within a specified range. It accepts \`min\` and \`max\` props to define the bounds of the range, and the \`rangeType\` prop to control the visual style or behavior of the slider. Supported types include \`default\`, \`type1\`, and \`type2\`, each offering distinct UI variations. This component is useful for filtering, setting values, or any interface requiring intuitive numeric input within limits.`
            }
        },
    },
    tags: ['autodocs'],
    argTypes: {
        doubleRangeType: {
            options: ["default", "type_1", "type_2"],
            control: { type: "select" },
        }
    },
} satisfies Meta<typeof RdsCompRange>;

export default meta;
type Story = StoryObj<typeof RdsCompRange>;

export const Default: Story = {
    args: {
        max: 200,
        min: 10,
        rangeType: "default"
    }
} satisfies Story;
Default.parameters = { controls: { include: ['max', 'min', 'rangeType'] } };

export const RangeType_1: Story = {
    args: {
        max: 200,
        min: 10,
        rangeType: "type1"
    }
} satisfies Story;
RangeType_1.parameters = { controls: { include: ['max', 'min', 'rangeType'] } };

export const RangeType_2: Story = {
    args: {
        max: 200,
        min: 10,
        rangeType: "type2"
    }
} satisfies Story;
RangeType_2.parameters = { controls: { include: ['max', 'min', 'rangeType'] } };

export const RangeSlider: Story = {
    args: {
        max: 100,
        min: 0,
        doubleRangeType: DoubleRangeType.Default,
    }
} satisfies Story;
RangeSlider.parameters = { controls: { include: ['max', 'min', 'doubleRangeType'] } };