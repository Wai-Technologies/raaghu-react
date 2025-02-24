import type { Meta, StoryObj } from '@storybook/react';
import RdsCompLoginAttempts from "./rds-comp-login-attempts";

const meta: Meta = { 
    title: "Components/Login Attempts",
    component: RdsCompLoginAttempts,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompLoginAttempts>;

export default meta;
type Story = StoryObj<typeof RdsCompLoginAttempts>;

export const Default: Story = {
    args: {
        selectvalue: [
            { value: "All", displayText: "All" },
            { value: "Success", displayText: "Success" },
            {
                value: "InvalidUserNameOrEmailAddress",
                displayText: "Invalid Username or email Address",
            },
            { value: "InvalidPassword", displayText: "Invalid Password" },
            { value: "UserIsNotActive", displayText: "User is Not Active" },
            { value: "InvalidTenancyName", displayText: "Invalid Tenancy name" },
            { value: "TenantIsNotActive", displayText: "Tenant Is Not Active" },
            { value: "UserEmailIsNotConfirmed", displayText: "User Email Is Not Confirmed" },
            { value: "UnknownExternalLogin", displayText: "Unknown External Login" },
            { value: "LockedOut", displayText: "Locked Out" },
            {
                value: "UserPhoneNumberIsNotConfirmed",
                displayText: "User Phone Number IsNot Confirmed",
            },
        ],    
        tableHeaders: [
            {
                displayName: "IP Address",
                key: "ipaddress",
                datatype: "text",
                sortable: true,
            },
            {
                displayName: "Clients",
                key: "client",
                datatype: "text",
            },
            {
                displayName: "Name",
                key: "name",
                datatype: "text",
                sortable: true,
            },
            {
                displayName: "Date&Time",
                key: "time",
                datatype: "number",
                sortable: true,
            },
            { displayName: "Result", key: "result", datatype: "text", sortable: true },
        ],  
        tableData: [
            {
                id: 1,
                name: "Firefox",
                ipaddress: 60,
                client : "admin",
                time: new Date("12/03/2022").toISOString(),
                result: "InvalidPassword",
            },
            {
                id: 2,
                name: "Firefox",
                ipaddress: 120,
                client : "admin",
                time: new Date("12/04/2022").toISOString(),
                result: "UserIsNotActive",
            },
            {
                id: 3,
                name: "Firefox",
                ipaddress: 250,
                client : "admin",
                time: new Date("12/05/2022").toISOString(),
                result: "InvalidPassword",
            },
            {
                id: 4,
                name: "Firefox",
                ipaddress: 60,
              client : "admin",
                time: new Date("12/06/2022").toISOString(),
                result: "Success",
            },
            {
                id: 5,
                name: "Firefox",
                ipaddress: 100,
              client : "admin",
                time: new Date("12/07/2022").toISOString(),
                result: "UserIsNotActive",
            },
            {
                id: 6,
                name: "Firefox",
                ipaddress: 60,
              client : "admin",
                time: new Date("12/08/2022").toISOString(),
                result: "Success",
            },
            {
                id: 7,
                name: "Firefox",
                ipaddress: 100,
              client : "admin",
                time: new Date("11/03/2022").toISOString(),
                result: "Success",
            },
            {
                id: 8,
                name: "Firefox",
                ipaddress: 100,
              client : "admin",
                time: new Date("11/04/2022").toISOString(),
                result: "UserIsNotActive",
            },
            {
                id: 9,
                name: "Firefox",
                ipaddress: 100,
              client : "admin",
                time: new Date("11/05/2022").toISOString(),
                result: "Success",
            },
            {
                id: 10,
                name: "Firefox",
                ipaddress: 100,
              client : "admin",
                time: new Date("12/02/2022").toISOString(),
                result: "Success",
            },
            {
                id: 11,
                name: "Firefox",
                ipaddress: 100,
              client : "admin",
                time: new Date("12/01/2022").toISOString(),
                result: "Success",
            },
            {
                id: 12,
                name: "Firefox",
                ipaddress: 100,
              client : "admin",
                time: new Date("11/09/2022").toISOString(),
                result: "Success",
            },
            {
                id: 13,
                name: "Firefox",
                ipaddress: 100,
              client : "admin",
                time: new Date("12/03/2022").toISOString(),
                result: "Success",
            },
            {
                id: 14,
                name: "Firefox",
                ipaddress: 100,
              client : "admin",
                time: new Date("12/03/2022").toISOString(),
                result: "Success",
            },
            {
                id: 15,
                name: "Firefox",
                ipaddress: 100,
              client : "admin",
                time: new Date("12/03/2022").toISOString(),
                result: "UserEmailIsNotConfirmed",
            },
            {
                id: 16,
                name: "Firefox",
                ipaddress: 100,
              client : "admin",
                time: new Date("12/03/2022").toISOString(),
                result: "UserEmailIsNotConfirmed",
            },
        ],
        
        pagination: true,
        recordsPerPage: 10,
        recordsPerPageSelectListOption: false,
        totalRecords: 16,      
    }
} satisfies Story;
Default.parameters = { controls: { include: ['selectvalue', 'tableHeaders', 'tableData'] } };
