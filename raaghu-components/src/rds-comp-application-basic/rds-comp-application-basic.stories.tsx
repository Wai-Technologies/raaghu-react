import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsCompApplicationBasic from './rds-comp-application-basic';


const meta: Meta = { 
    title: "Components/Application",
    component: RdsCompApplicationBasic,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **Application Basic** component is a foundational and customizable UI element designed to manage and configure basic settings for applications within your system. It provides a structured interface to define and update application details, making it ideal for administrative dashboards or application management systems. Fully customizable, the Application Basic component can be tailored to align with your design system and functional requirements, ensuring a seamless user experience.'
    },
}
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
Basic.parameters = { controls: { include: [ "basicData", "onSuccess", "reset", "editApplicationData"]},};

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
Scopes.parameters = { controls: { include: [ "scopesList", "editScopeList"]},};

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
workflows.parameters = { controls: { include: [ "typeList", "consentType", "basicData", "handleSubmit", "reset", "editApplicationData", "onSuccess"]},};
