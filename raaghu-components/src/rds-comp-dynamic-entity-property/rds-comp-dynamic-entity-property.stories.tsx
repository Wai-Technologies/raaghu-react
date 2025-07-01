
import type { Meta, StoryObj } from '@storybook/react';
import RdsCompDynamicEntityProperty from "./rds-comp-dynamic-entity-property";


const meta: Meta = {
    title: "Components/ Dynamic Entity Properties",
    component: RdsCompDynamicEntityProperty,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **Dynamic Entity Properties** component is a customizable UI element designed to manage and display dynamic properties for entities within your application. It supports features such as a `parameterList` array to define available parameters with properties like `label` and `val`, and an `entityNames` array to specify the entities associated with these properties. This component is ideal for administrative dashboards, configuration panels, or any interface requiring dynamic and flexible property management for entities. Fully customizable, the Dynamic Entity Properties component ensures a seamless user experience while maintaining consistency with your design system and functional requirements.'
    },
}

    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompDynamicEntityProperty>;

export default meta;
type Story = StoryObj<typeof RdsCompDynamicEntityProperty>;

export const Standard: Story = {
    args: {

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
//Standard.parameters = { controls: { include: ['initialSelectedItems', 'parameterList', 'entityNames'] } };

