import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsCompEditionList from './rds-comp-tenant-list';


const meta: Meta = { 
    title: "Components/Tenant",
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

export const List: Story = {
    args: {
      tenant:"list",
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
List.parameters = { controls: { include: ['tableHeaders', 'tableData', 'actions', 'pagination', 'recordsPerPage'] } };

export const Dashboard: Story = {
    args: {
      tenant:"dashboard",
    }
} satisfies Story;
Dashboard.parameters = { controls: { include: [] } };

export const Information: Story = {
    args: {
      tenant:"information",
        editions: [
                    {
                        option: "Not assigned",
                        value:1
                    },
                    {
                        option: "Standard",
                        value:2
                    },
                    {
                        option: "apple",
                        value:3
                    },
                    {
                        option: "Apple1",
                        value:4
                    },
                ],
    }
} satisfies Story;
Information.parameters = { controls: { include: ['editions', 'tenantInfoData', 'reset', 'isModuleSpecificDb', 'setPasswordField'] } };

export const Management: Story = {
    args: {
      tenant:"management",
    }
} satisfies Story;
Management.parameters = { controls: { include: ['settingsTenantEditionList', 'allowSelfRegistration', 'useCaptchaOnRegistration', 'isNewRegisteredTenantActiveByDefault'] } };

export const Register: Story = {
  args: {
    tenant:"register",
    countryFlagList: [
      {
        "label": "EN(US)",
        "val": "en",
        "icon": "us",
        "iconWidth": "20px",
        "iconHeight": "20px"
      },
      {
        "label": "English(IND)",
        "val": "en",
        "icon": "in",
        "iconWidth": "20px",
        "iconHeight": "20px"
      },
      {
        "label": "Français",
        "val": "fr",
        "icon": "fr",
        "iconWidth": "20px",
        "iconHeight": "20px"
      },
      {
        "label": "Deutsch",
        "val": "de",
        "icon": "de",
        "iconWidth": "20px",
        "iconHeight": "20px"
      },
      {
        "label": "Português (Brasil)",
        "val": "pt-BR",
        "icon": "br",
        "iconWidth": "20px",
        "iconHeight": "20px"
      },
      {
        "label": "Türkçe",
        "val": "tr",
        "icon": "tr",
        "iconWidth": "20px",
        "iconHeight": "20px"
      },
      {
        "label": "Italiano",
        "val": "it",
        "icon": "it",
        "iconWidth": "20px",
        "iconHeight": "20px"
      }
    ]
  }
} satisfies Story;
Register.parameters = { controls: { include: ['registerData', 'countryFlagList', 'onLogin', 'handleRegisterDataSubmit', 'onIncreasePageCount', 'reset', 'onSaveHandler'] } };

export const Settings: Story = {
  args: {
    tenant:"settings",
    tenantSettingInfo: {},
    isTenantInfoValid: false,
    showEditData: true
  }
} satisfies Story;
Settings.parameters = { controls: { include: ['tenantSettingInfo', 'isTenantInfoValid', 'showEditData', 'passwordValidation', 'onCancel', 'onSaveHandler', 'tenantSettingData', 'reset'] } };
