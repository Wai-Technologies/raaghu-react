// /* eslint-disable */
// import React from 'react';
// import { I18nextProvider } from 'react-i18next';
import type { Meta, StoryObj } from '@storybook/react';
import RdsCompSetPassword from './rds-comp-set-password';

const meta: Meta = { 
    title: "Components/Set Password",
    component: RdsCompSetPassword,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **Set Password** component is a customizable UI element designed to facilitate the process of setting or updating passwords within your application. It provides a structured interface for users to input and confirm their passwords, ensuring compliance with security requirements. This component is ideal for user account management, onboarding workflows, or any application requiring a secure and user-friendly password setup interface. Fully customizable, the Set Password component ensures a seamless user experience while maintaining consistency with your design system and functional requirements.'
    },
}
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompSetPassword>;

export default meta;
type Story = StoryObj<typeof RdsCompSetPassword>;

export const Default: Story = {
    args: {
        
    }
} satisfies Story;
//Default.parameters = { controls: { include: [] } };




