
import type { Meta, StoryObj } from '@storybook/react';
import RdsCompFormsSettings from './rds-comp-forms-setting';


const meta: Meta = { 
    title: "Components/Forms Settings",
    component: RdsCompFormsSettings,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **Forms Settings** component is a customizable UI element designed to configure and manage form-related settings within your application. It provides a structured interface for defining form behaviors, preferences, and configurations, making it ideal for administrative dashboards, form management systems, or any interface requiring flexible form settings. Fully customizable, the Forms Settings component ensures a seamless user experience while maintaining consistency with your design system and functional requirements.'
    },
}
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompFormsSettings>;

export default meta;
type Story = StoryObj<typeof RdsCompFormsSettings>;

export const Default: Story = {
    args: {
        
    }
} satisfies Story;