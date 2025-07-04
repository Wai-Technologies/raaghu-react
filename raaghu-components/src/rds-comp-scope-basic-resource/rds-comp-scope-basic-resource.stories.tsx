import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsCompScopeBasicResource from "./rds-comp-scope-basic-resource";


const meta: Meta = { 
    title: "Components/Scope Basic Resource",
    component: RdsCompScopeBasicResource,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **Scope Basic Resource** component is a customizable UI element designed to manage and display basic resource scopes within your application. It provides a structured interface for defining and visualizing resource access or permissions, making it ideal for administrative dashboards, resource management systems, or any application requiring scope-based resource handling. Fully customizable, the Scope Basic Resource component ensures a seamless user experience while maintaining consistency with your design system and functional requirements.'
    },
}
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompScopeBasicResource>;

export default meta;
type Story = StoryObj<typeof RdsCompScopeBasicResource>;

export const Standard: Story = {
    args: {
       
    }
} satisfies Story;
