import type { Meta, StoryObj } from '@storybook/react';
import RdsCompApplicationBasic from './rds-comp-application-basic';


const meta: Meta = { 
    title: "Components/Application",
    component: RdsCompApplicationBasic,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompApplicationBasic>;

export default meta;
type Story = StoryObj<typeof RdsCompApplicationBasic>;

export const Basic: Story = {
    args: {
        application: "basic"
    }
} satisfies Story;

export const Scopes: Story = {
    args: {
        application: "scopes",
        scopesList: [
            {
                id: 1,
                label: "Read",
                checked: false
            },
            {
                id: 2,
                label: "Write",
                checked: false
            },
            {
                id: 3,
                label: "Delete",
                checked: false
            }
        ]
    }
} satisfies Story;


export const workflows: Story = {
    args: {
        application: "workflows",
        typeList: [
            {label: "Confidential", val:"confidential"},
            {label: "Public", val:"public"},
        ],
        consentType: [
            {label: "Implicit Consent", val:"implicitConsent"},
        ]
    }
} satisfies Story;