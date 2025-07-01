import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsCompNotificationSettings from "./rds-comp-notification-settings";


const meta: Meta = { 
  title: "Components/Notification Setting",
    component: RdsCompNotificationSettings,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **Notification Setting** component is a customizable UI element designed to manage and display user notification preferences within your application. It provides a structured interface for enabling or disabling specific notifications, making it ideal for user profile management, account settings, or any application requiring personalized notification configurations. Fully customizable, the Notification Setting component ensures a seamless user experience while maintaining consistency with your design system and functional requirements.'
    },
}
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompNotificationSettings>;

export default meta;
type Story = StoryObj<typeof RdsCompNotificationSettings>;

export const Default: Story = {
    args: {
      default: [{ enabled: false, NewUser: false, NewTenant: false }],
    }
} satisfies Story;




