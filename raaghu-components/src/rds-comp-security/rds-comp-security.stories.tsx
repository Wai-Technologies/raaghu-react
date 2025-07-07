
import type { Meta, StoryObj } from '@storybook/react-vite';
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

export const Standard: Story = {
    args: {
        security: "default",
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
Standard.parameters = { controls: { include: ['checkgroupList'] } };

export const Logs: Story = {
    args: {
        security: "logs",
        tableHeaders: [
            { displayName: "Time", key: "time", datatype: "text", sortable: true, },
            { displayName: "Actions", key: "actions", datatype: "text", sortable: true, },
            { displayName: "IP Address", key: "ipAddress", datatype: "text", sortable: true, },
            { displayName: "Browser/Os", key: "browserOs", datatype: "text", sortable: true, },
            { displayName: "Application", key: "application", datatype: "text", sortable: true, },
            { displayName: "Identity", key: "identity", datatype: "text", sortable: true, },
            { displayName: "Users", key: "users", datatype: "text", sortable: true, },
        ],
    
        tableData: [
            { id: 1, time: "03/22/2024, 07:13 AM" , actions: "Login" , ipAddress: "157.119.87.116", browserOs: "Chrome 98.0.4758.102 on Windows 10", application: "abp_react_7_2_2.HttpApi.Host", identity: "johndoe", users: "John Doe" ,},
            { id: 2, time: "03/22/2024, 07:13 AM" , actions: "Login" , ipAddress: "122.179.143.80", browserOs: "Chrome 98.0.4758.102 on Windows 10", application: "abp_react_7_2_2.HttpApi.Host", identity: "johndoe", users: "John Doe" ,},
            { id: 3, time: "03/22/2024, 07:13 AM" , actions: "Login" , ipAddress: "117.223.153.186", browserOs: "Chrome 98.0.4758.102 on Windows 10", application: "abp_react_7_2_2.HttpApi.Host", identity: "johndoe", users: "John Doe" ,},
            { id: 4, time: "03/22/2024, 07:13 AM" , actions: "Login" , ipAddress: "122.179.143.80", browserOs: "Chrome 98.0.4758.102 on Windows 10", application: "abp_react_7_2_2.HttpApi.Host", identity: "johndoe", users: "John Doe" ,},]
    }
} satisfies Story;
Logs.parameters = { controls: { include: ['tableHeaders', 'tableData'] } };
