import RdsDoubleRange, { DoubleRangeType } from "./rds-double-range";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Components/Double Range',
    component: RdsDoubleRange,
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
} satisfies Meta<typeof RdsDoubleRange>;

export default meta;
type Story = StoryObj<typeof RdsDoubleRange>;

export const RangeSlider: Story = {
    args: {
        max: 100,
        min: 0,
        doubleRangeType: DoubleRangeType.Default,
    }
} satisfies Story;
RangeSlider.parameters = { controls: { include: ['max', 'min', 'doubleRangeType'] } };


