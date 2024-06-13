import type { Meta, StoryObj } from '@storybook/react';
import RdsCompAddMember from "./rds-comp-add-member";

const meta: Meta = {
  title: "Components/Add Member",
  component: RdsCompAddMember,
  parameters: {
    layout: 'padded',
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