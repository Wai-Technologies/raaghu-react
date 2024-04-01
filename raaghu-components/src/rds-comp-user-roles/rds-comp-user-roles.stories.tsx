import type { Meta, StoryObj } from '@storybook/react';
import RdsCompUserRoles from "./rds-comp-user-roles";


const meta: Meta = { 
  title: "Components/User Roles",
    component: RdsCompUserRoles,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompUserRoles>;

export default meta;
type Story = StoryObj<typeof RdsCompUserRoles>;

export const Default: Story = {
    args: {
      usersRole: [
        {
          id: 1,
          name: "Child Checkbox 1",
          checked: false,
          disabled: false,
        },
        {
          id: 2,
          name: "Child Checkbox 2",
          checked: false,
          disabled: false,
        },
        {
          id: 3,
          name: "Child Checkbox 3",
          checked: false,
          disabled: false,
        },
      ]
    }
} satisfies Story;




