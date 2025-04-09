import type { Meta, StoryObj } from '@storybook/react';
import RdsCompGenerateCodeMetrics from "./rds-comp-generate-code-metrics";

const meta: Meta = { 
    title: "Components/Generate Code Metrics",
    component: RdsCompGenerateCodeMetrics,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompGenerateCodeMetrics>;

export default meta;
type Story = StoryObj<typeof RdsCompGenerateCodeMetrics>;

export const Default: Story = {
    args: {
    }
} satisfies Story;