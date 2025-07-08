import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsCompRegisterMember from "./rds-comp-register-member";

const meta: Meta = { 
  title: "Components/Register Member",
  component: RdsCompRegisterMember,
  parameters: {
      layout: 'padded',
      docs: {
    description: {
        component: 
            'The **Register Member** component is a customizable UI element designed to handle the registration process for new members within your application. It provides a structured interface for capturing user details such as name, email, and other required information. This component is ideal for user onboarding workflows, membership systems, or any application requiring a user-friendly and efficient member registration interface. Fully customizable, the Register Member component ensures a seamless user experience while maintaining consistency with your design system and functional requirements.'
    },
}
  },
  tags: ['autodocs'],
  argTypes: {
  },
} satisfies Meta<typeof RdsCompRegisterMember>;

export default meta;
type Story = StoryObj<typeof RdsCompRegisterMember>;

export const Standard: Story = {
  args: {
      
  }
} satisfies Story;
