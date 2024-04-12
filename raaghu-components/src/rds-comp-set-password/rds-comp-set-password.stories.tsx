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




