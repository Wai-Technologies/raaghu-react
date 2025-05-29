import type { Meta, StoryObj } from '@storybook/react';
import RdsCompAddMember from "./rds-comp-add-member";

const meta: Meta = {
  title: "Components/Add Member",
  component: RdsCompAddMember,
  parameters: {
    layout: 'padded',
    docs: {
    description: {
        component: 
            'The **Add Member** component is a customizable UI element designed to facilitate the addition of new members to a system or application. It supports features such as an `addMemberData` object to capture member details like `email` and `roleId`, and an `assignableRolesList` array to display available roles with properties like `id`, `name`, and `isDefault`. The component also includes a `reset` toggle to clear the form and an `onClickAddNewMember` function to handle the action of adding a new member. Ideal for team management systems or administrative interfaces, the Add Member component simplifies the process of assigning roles and adding members while ensuring a seamless user experience. Fully customizable, it can be tailored to fit your application’s design system and functional requirements.'
    },
}
  },
  tags: ['autodocs'],
  argTypes: {
  },
} satisfies Meta<typeof RdsCompAddMember>;

export default meta;
type Story = StoryObj<typeof RdsCompAddMember>;

export const Default: Story = {
  args: {
    addMemberData: { email: "", roleId: "" },
    assignableRolesList: [
      { id: 1, name: "Admin", isDefault: false },
      { id: 2, name: "User", isDefault: false },
    ],
    reset: false,
 
    onClickAddNewMember: () => console.log("Add new member clicked"),
  }
} satisfies Story;