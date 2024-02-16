
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
        initialSelectedItems: {
            entity: "ANZAngular105Demo.Authorization.Users.User",
            parameter: [{ label: "Demo 1", },
            { label: "Demo 2", }]
        },
        parameterList: [
            {
                label: "Demo 1",
            },
            {
                label: "Demo 2",
            },
            {
                label: "Demo 3",
            },
            {
                label: "Demo 4",
            }
        ],
        entityNames: [{ label: "ANZAngular105Demo.Authorization.Users.User" }, { label: "ANZAngular105Demo.Authorization" },]
    }
} satisfies Story;

