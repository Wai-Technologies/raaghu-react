import type { Meta, StoryObj } from '@storybook/react';
import RdsCompNotificationSettings from "./rds-comp-notification-settings";


const meta: Meta = { 
  title: "Components/Notification Setting",
    component: RdsCompNotificationSettings,
    parameters: {
        layout: 'padded',
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




