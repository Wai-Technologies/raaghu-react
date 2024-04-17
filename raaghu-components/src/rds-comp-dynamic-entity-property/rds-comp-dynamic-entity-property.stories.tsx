
import type { Meta, StoryObj } from '@storybook/react';
import RdsCompDynamicEntityProperty from "./rds-comp-dynamic-entity-property";


const meta: Meta = {
    title: "Components/ Dynamic Entity Properties",
    component: RdsCompDynamicEntityProperty,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompDynamicEntityProperty>;

export default meta;
type Story = StoryObj<typeof RdsCompDynamicEntityProperty>;

export const Default: Story = {
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
//Default.parameters = { controls: { include: ['initialSelectedItems', 'parameterList', 'entityNames'] } };

