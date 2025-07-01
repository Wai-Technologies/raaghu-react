import type { Meta, StoryObj } from '@storybook/react';
import RdsCompGenerateCodeMetrics from "./rds-comp-generate-code-metrics";

const meta: Meta = { 
    title: "Components/Generate Code Metrics",
    component: RdsCompGenerateCodeMetrics,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **Generate Code Metrics** component is a customizable UI element designed to display and manage code metrics within your application. It provides a structured interface for generating and visualizing code-related data, making it ideal for development dashboards, code analysis tools, or any interface requiring insights into code quality and performance. Fully customizable, the Generate Code Metrics component ensures a seamless user experience while maintaining consistency with your design system and functional requirements.'
    },
}
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompGenerateCodeMetrics>;

export default meta;
type Story = StoryObj<typeof RdsCompGenerateCodeMetrics>;

export const Standard: Story = {
    args: {
    }
} satisfies Story;