import type { Meta, StoryObj } from '@storybook/react';
import RdsCompRegisterMember from "./rds-comp-register-member";

const meta: Meta = { 
  title: "Components/Register Member",
  component: RdsCompRegisterMember,
  parameters: {
      layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
  },
} satisfies Meta<typeof RdsCompRegisterMember>;

export default meta;
type Story = StoryObj<typeof RdsCompRegisterMember>;

export const Default: Story = {
  args: {
      
  }
} satisfies Story;
