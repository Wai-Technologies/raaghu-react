import type { Meta, StoryObj } from '@storybook/react';
import RdsCompUrlForwardings from './rds-comp-url-forwardings';


const meta: Meta = { 
    title: "Components/Url Forwardings",
    component: RdsCompUrlForwardings,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **Url Forwardings** component is a functional UI element designed to manage and configure URL redirections within an application. It allows administrators to define forwarding rules, ensuring seamless navigation and redirection of users to the appropriate destinations. This component is ideal for applications requiring URL management, such as content management systems or multi-tenant platforms. Fully customizable, the Url Forwardings component ensures integration with your design system while providing an intuitive interface for managing URL redirection workflows effectively.'
    },
},
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompUrlForwardings>;

export default meta;
type Story = StoryObj<typeof RdsCompUrlForwardings>;

export const Default: Story = {
    args: {
        
    }
} satisfies Story;
Default.parameters = { controls : { include : []}};





