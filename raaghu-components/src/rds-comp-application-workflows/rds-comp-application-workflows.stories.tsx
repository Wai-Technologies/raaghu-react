import type { Meta, StoryObj } from '@storybook/react';
import RdsCompApplicationWorkflows from './rds-comp-application-workflows';


const meta: Meta = { 
    title: "Components/Application Work flows",
    component: RdsCompApplicationWorkflows,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompApplicationWorkflows>;

export default meta;
type Story = StoryObj<typeof RdsCompApplicationWorkflows>;

export const Default: Story = {
    args: {
        typeList: [
            {label: "Confidential", val:"confidential"},
            {label: "Public", val:"public"},
        ],
        consentType: [
            {label: "Implicit Consent", val:"implicitConsent"},
        ]
    }
} satisfies Story;