import type { Meta, StoryObj } from '@storybook/react';
import RdsCompAdminDashboard from './rds-comp-admin-dashboard';




const meta: Meta = { 
    title: "Components/Admin Dashboard",
    component: RdsCompAdminDashboard,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **Admin Dashboard** component is a foundational and customizable UI element designed to serve as the central interface for administrative tasks and data visualization within your application. This component provides a structured layout to integrate various widgets, charts, and data-driven elements, enabling administrators to monitor and manage key metrics, user activities, and system configurations. Fully customizable, the Admin Dashboard component can be tailored to fit your application’s design system and functional requirements, making it ideal for creating intuitive and efficient administrative interfaces.'
    },
}
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompAdminDashboard>;

export default meta;
type Story = StoryObj<typeof RdsCompAdminDashboard>;

export const Default: Story = {
    args: {
        
    }
} satisfies Story;