import type { Meta, StoryObj } from '@storybook/react';
import RdsCompEditionList from './rds-comp-tenant-list';


const meta: Meta = { 
    title: "Components/Tenant List",
    component: RdsCompEditionList,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **Tenant List** component is a robust and interactive UI element designed to display and manage a list of tenants in a tabular format. It allows you to define table headers, provide tenant-specific data, and include actions such as "Login as Tenant," "Edit," or "Delete." The component supports features like sorting, pagination, and customizable data types (e.g., text, badges, avatar with title). This makes it ideal for applications requiring tenant management functionality, such as SaaS platforms or multi-tenant systems. Fully customizable, the Tenant List component ensures seamless integration with your design system while providing an intuitive and user-friendly interface for managing tenant-related information effectively.'
    },
},
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompEditionList>;

export default meta;
type Story = StoryObj<typeof RdsCompEditionList>;

export const Default: Story = {
    args: {
        tableHeaders: [
            { displayName: "Tenant", key: "tenant", datatype: "avatarTitleInfo", sortable: true, },
            { displayName: "Edition", key: "edition", datatype: "text", sortable: true, },
            { displayName: "Status", key: "status", datatype: "badge", sortable: false, },
        ],
        tableData: [
            {
              "id": 1,
              "tenant": "Joy",
              "edition": "Standard",
              "status": {
                "badgeColorVariant": "success",
                "content": "Active"
              } 
            },
            {
              "id": 2,
              "tenant": "Joy",
              "edition": "Regular",
              "status": {
                "badgeColorVariant": "danger",
                "content": "Inactive"
              }
            },
            {
              "id": 3,
              "tenant": "Joy",
              "edition": "Standard",
              "status": {
                "badgeColorVariant": "success",
                "content": "Active"
              }            
            },
            {
              "id": 4,
              "tenant": "Joy",
              "edition": "Standard",
              "status": {
                "badgeColorVariant": "success",
                "content": "Active"
              }            
            },
            {
              "id": 5,
              "tenant": "Joy",
              "edition": "Apple",
              "status": {
                "badgeColorVariant": "success",
                "content": "Active"
              }
            },
            {
                "id": 6,
                "tenant": "Joy",
                "edition": "Standard",
                "status": {
                  "badgeColorVariant": "success",
                  "content": "Active"
                } 
              },
              {
                "id": 7,
                "tenant": "Joy",
                "edition": "Regular",
                "status": {
                  "badgeColorVariant": "danger",
                  "content": "Inactive"
                }
              }
              
          ],
        actions: [
            {
                "id": "loginAsTenant",
                "displayName": "Login as Tenant"
            },
            {
              "id": "delete",
              "displayName": "Delete"
            },
            {
              "id": "edit",
              "displayName": "Edit"
            }
        ],
        pagination: true,
        recordsPerPage: 5
    }
} satisfies Story;
Default.parameters = { controls: { include: ['tableHeaders', 'tableData', 'actions', 'pagination', 'recordsPerPage'] } };




