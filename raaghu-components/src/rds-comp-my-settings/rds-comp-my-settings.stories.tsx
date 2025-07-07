import type { Meta, StoryObj } from '@storybook/react';
import RdsCompMySettings from "./rds-comp-my-settings";

const meta: Meta = {
  title: "Components/My Settings",
  component: RdsCompMySettings,
  parameters: {
    layout: 'padded',
    docs: {
    description: {
        component: 
            'The **My Settings** component is a customizable UI element designed to manage and display user-specific settings within your application. It provides a structured interface for users to view and update their preferences, making it ideal for user profile management, account settings, or any application requiring personalized configuration options. Fully customizable, the My Settings component ensures a seamless user experience while maintaining consistency with your design system and functional requirements.'
    },
}
  },
  tags: ['autodocs'],
  argTypes: {
  },
} satisfies Meta<typeof RdsCompMySettings>;

export default meta;
type Story = StoryObj<typeof RdsCompMySettings>;

export const Standard: Story = {
  args: {

  }
} satisfies Story;




