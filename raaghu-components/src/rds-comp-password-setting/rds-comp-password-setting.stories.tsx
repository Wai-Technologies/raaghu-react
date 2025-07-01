import type { Meta, StoryObj } from '@storybook/react';
import RdsCompPasswordSetting from "./rds-comp-password-setting";


const meta: Meta = {
  title: "Components/Password Setting",
  component: RdsCompPasswordSetting,
  parameters: {
    layout: 'padded',
    docs: {
    description: {
        component: 
            'The **Password Setting** component is a customizable UI element designed to manage and display password-related configurations within your application. It provides a structured interface for defining password policies, such as complexity requirements, length, and expiration settings. This component is ideal for administrative dashboards, user account management, or any application requiring secure and flexible password configuration options. Fully customizable, the Password Setting component ensures a seamless user experience while maintaining consistency with your design system and functional requirements.'
    },
}
  },
  tags: ['autodocs'],
  argTypes: {
  },
} satisfies Meta<typeof RdsCompPasswordSetting>;

export default meta;
type Story = StoryObj<typeof RdsCompPasswordSetting>;

export const Standard: Story = {
  args: {
  }
} satisfies Story;




