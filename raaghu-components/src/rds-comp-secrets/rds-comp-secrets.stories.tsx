import type { Meta, StoryObj } from '@storybook/react';
import RdsCompSecrets from "./rds-comp-secrets";


const meta: Meta = { 
    title: "Components/Secrets",
    component: RdsCompSecrets,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **Secrets** component is a customizable UI element designed to securely manage and display sensitive information, such as API keys, tokens, or passwords, within your application. It provides a structured interface for viewing, copying, or regenerating secrets, making it ideal for administrative dashboards, developer tools, or any application requiring secure handling of confidential data. Fully customizable, the Secrets component ensures a seamless user experience while maintaining consistency with your design system and functional requirements.'
    },
}
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompSecrets>;

export default meta;
type Story = StoryObj<typeof RdsCompSecrets>;

export const Standard: Story = {
    args: {
        
    }
} satisfies Story;
// Standard.parameters = { controls: { include: [] } };




