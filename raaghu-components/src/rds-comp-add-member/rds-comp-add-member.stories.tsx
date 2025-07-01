import type { Meta, StoryObj } from '@storybook/react';
import RdsCompAddMember from "./rds-comp-add-member";

const meta: Meta = {
  title: "Components/Member",
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

export const Standard: Story = {
  args: {
    addMemberData: { email: "", roleId: "" },
    assignableRolesList: [
      { id: 1, name: "Admin", isDefault: false },
      { id: 2, name: "User", isDefault: false },
    ],
    reset: false,
    member: "add",
    onClickAddNewMember: () => console.log("Add new member clicked"),
  }
} satisfies Story;
Standard.parameters = { controls: { include: ['addMemberData', 'assignableRolesList', 'reset', 'onAddMemberSaveHandler', 'onClickAddNewMember'] } };

export const Team: Story = {
    args: {
        teamItem: [
            {
                title: "Tina",
                subTitle: "Web Developer",
                imgLink: "https://t4.ftcdn.net/jpg/04/10/43/77/240_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg",
                twitterIcon: "star",
                linkdineIcon: "star",
                description: "Lorem ipsum dolor sit amet conr adipiscing elit"
            }
        ],
        member: "team",
    }
} satisfies Story;
Team.parameters = { controls: { include: ['teamItem'] } };

export const Register: Story = {
  args: {
    member: "register",
  }
} satisfies Story;
Register.parameters = { controls: { include: ['registerMemberData', 'isEmailFieldVisible', 'onRegisterMemberSaveHandler'] } };