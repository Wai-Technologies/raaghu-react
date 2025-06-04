
import type { Meta, StoryObj } from '@storybook/react';
import RdsCompSecurity from "./rds-comp-security";


const meta: Meta = {
    title: "Components/Security",
    component: RdsCompSecurity,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **Security** component is a customizable UI element designed to manage and display security-related settings within your application. It provides a structured interface for configuring security options such as password requirements (e.g., requiring digits, uppercase, lowercase, or non-alphanumeric characters). This component is ideal for administrative dashboards, user account management, or any application requiring a user-friendly interface for managing security configurations. Fully customizable, the Security component ensures a seamless user experience while maintaining consistency with your design system and functional requirements.'
    },
}
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompSecurity>;

export default meta;
type Story = StoryObj<typeof RdsCompSecurity>;

export const Default: Story = {
    args: {
        checkgroupList: [
            {
                "id": 1,
                "label": "Require Digit",
                "checked": false,
                "disabled": false
            },
            {
                "id": 2,
                "label": "Require Lowercase",
                "checked": false,
                "disabled": false
            }, {
                "id": 3,
                "label": "Require Non-Alphanumeric",
                "checked": false,
                "disabled": false
            },
            {
                "id": 4,
                "label": "Require Uppercase",
                "checked": false,
                "disabled": false
            },
        ]
    }
} satisfies Story;
Default.parameters = { controls: { include: ['checkgroupList'] } };





