import type { Meta, StoryObj } from '@storybook/react';
import RdsCompApplicationWorkflows from './rds-comp-application-workflows';


const meta: Meta = { 
    title: "Components/Application Work flows",
    component: RdsCompApplicationWorkflows,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **Application Workflows** component is a flexible and customizable UI element designed to manage and configure workflows for applications within your system. It supports features such as a `typeList` array to define application types (e.g., "Confidential", "Public") and a `consentType` array to specify consent types (e.g., "Implicit Consent"). This component is ideal for administrative dashboards or application management systems, enabling users to define and manage workflows efficiently. Fully customizable, the Application Workflows component ensures a seamless user experience while maintaining consistency with your design system and functional requirements.'
    },
}
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