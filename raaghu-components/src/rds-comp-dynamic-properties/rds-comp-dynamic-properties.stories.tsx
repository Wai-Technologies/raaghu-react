import type { Meta, StoryObj } from '@storybook/react';
import RdsCompDynamicProperties from "./rds-comp-dynamic-properties";

const meta: Meta = {
    title: "Components/ Dynamic Properties",
    component: RdsCompDynamicProperties,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **Dynamic Properties** component is a customizable UI element designed to manage and display dynamic properties for entities within your application. It supports features such as `propertyHeaders` to define the structure of the table with fields like `Property Name`, `Display Name`, `Input Type`, and `Permission`. Additionally, it uses a `propertyData` array to populate the table with dynamic property details, including their names, input types, and associated permissions. This component is ideal for administrative dashboards, configuration panels, or any interface requiring flexible and structured property management. Fully customizable, the Dynamic Properties component ensures a seamless user experience while maintaining consistency with your design system and functional requirements.'
    },
}
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompDynamicProperties>;

export default meta;
type Story = StoryObj<typeof RdsCompDynamicProperties>;

export const Default: Story = {
    args: {
        dynamic: "default",
        propertyHeaders: [
            { displayName: "Property Name", key: "propertyName", datatype: "text", sortable: true },
            { displayName: "Display Name", key: "dispName", datatype: "text", sortable: true, },
            { displayName: "Input Type", key: "inType", datatype: "text", sortable: true },
            { displayName: "Permission", key: "permission", datatype: "text", sortable: true },
        ],

        propertyData: [
            {
                id: 1,
                propertyName: "Property1",
                dispName: "Property-1",
                inType: "CHECKBOX",
                permission: "Pages.Administration.Roles",
            },
            {
                id: 2,
                propertyName: "Property2",
                dispName: "Property-2",
                inType: "SINGLE_LINE_STRING",
                permission: "Pages.Administration.Users",
            },
            {
                id: 3,
                propertyName: "Property3",
                dispName: "Property-3",
                inType: "MULTISELECTCOMBOBOX",
                permission: "Pages.Administration.Roles.Delete",
            },
            {
                id: 4,
                propertyName: "Property4",
                dispName: "Property-4",
                inType: "COMBBOX",
                permission: "Pages.Administration.Language.Edit",
            },
            {
                id: 5,
                propertyName: "Property5",
                dispName: "Property-5",
                inType: "CHECKBOX",
                permission: "Pages.Administration.Roles.Edit",
            },
            {
                id: 6,
                propertyName: "Property6",
                dispName: "Property-6",
                inType: "CHECKBOX",
                permission: "Pages.Administration.Language.Edit",
            },
        ],
        actions: [{ id: "Download", displayName: "Download" }],
    }
} satisfies Story;
Default.parameters = { controls: { include: ['propertyHeaders', 'propertyData', 'actions'] } };

export const Advanced: Story = {
    args: {
        dynamic: "advanced",
        parameterList: [
            {
                label: "Demo 1",
                val : "Demo 1"
            },
            {
                label: "Demo 2",
                val : "Demo 2"
            },
            {
                label: "Demo 3",
                val : "Demo 3"
            },
            {
                label: "Demo 4",
                val : "Demo 4"
            }
        ],
        entityNames: [
            { 
                label: "User",
                 val : "User" 
         },
         { 
            label: "Authorization",
            val : "Authorization"
        },]
    }
} satisfies Story;
Advanced.parameters = { controls: { include: ['parameterList', 'entityNames', 'reset', 'onSelectedItems', 'offcanvasId', 'entityFields'] } };
