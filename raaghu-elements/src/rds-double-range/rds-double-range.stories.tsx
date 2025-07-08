import RdsDoubleRange, { DoubleRangeType } from "./rds-double-range";
import { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta = {
    title: 'Components/Double Range',
    component: RdsDoubleRange,
    parameters: {
        layout: 'padded',
        docs: {
            description: {component: `The **Double Range** component provides a versatile dual-handle slider for selecting a numeric range within specified minimum and maximum limits. It supports multiple visual styles controlled by the \`doubleRangeType\` prop with options like \`default\`, \`type_1\`, and \`type_2\` to accommodate different UI designs. The component accepts \`min\` and \`max\` props to define the slider’s range boundaries, enabling precise control over the selectable values. Ideal for filtering data ranges, price sliders, or any scenario requiring a user-defined numeric interval, this component delivers an intuitive and flexible interface for range selection.`}
,
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


