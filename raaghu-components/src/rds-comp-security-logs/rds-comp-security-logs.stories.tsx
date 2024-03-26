import type { Meta, StoryObj } from '@storybook/react';
import RdsCompSecurityLogs from "./rds-comp-security-logs";


const meta: Meta = { 
    title: "Components/Security Logs",
    component: RdsCompSecurityLogs,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompSecurityLogs>;

export default meta;
type Story = StoryObj<typeof RdsCompSecurityLogs>;

export const Default: Story = {
    args: {
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
Default.parameters = { controls: { include: ['tableHeaders', 'tableData'] } };





