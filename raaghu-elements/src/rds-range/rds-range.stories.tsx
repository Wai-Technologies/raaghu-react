import RdsRange, { DoubleRangeType } from "./rds-range";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Components/Range',
    component: RdsRange,
    parameters: {
        layout: 'padded',
        docs: {
            source: {
                transform: (code: string) => {
                    code = code.replace(/"(default|type_1|type_2)"/g, '{DoubleRangeType.$1}');
                    return code;
                },
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        doubleRangeType: {
            options: ["default", "type_1", "type_2"],
            control: { type: "select" },
        }
    },
} satisfies Meta<typeof RdsRange>;

export default meta;
type Story = StoryObj<typeof RdsRange>;

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