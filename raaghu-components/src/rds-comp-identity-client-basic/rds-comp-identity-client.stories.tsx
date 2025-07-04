import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsCompIdentityClientBasic from './rds-comp-identity-client-basic';


const meta: Meta = { 
    title: "Components/Identity Client Basic",
    component: RdsCompIdentityClientBasic,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **Identity Client Basic** component is a foundational UI element designed to manage and display identity-related client information within your application. It provides a simple and structured interface, making it ideal for use cases such as authentication systems, client management dashboards, or any interface requiring basic identity client functionality. Fully customizable, the Identity Client Basic component ensures a seamless user experience while maintaining consistency with your design system and functional requirements.'
    },
}
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompIdentityClientBasic>;

export default meta;
type Story = StoryObj<typeof RdsCompIdentityClientBasic>;

export const Standard: Story = {
    args: {
        
    }
} satisfies Story;