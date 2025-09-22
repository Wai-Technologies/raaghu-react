import { Meta, StoryObj } from "@storybook/react";
import RdsCompNotification, {
    NotificationLayout,
    NotificationStyle,
    NotificationType
} from "./rds-comp-notification";

const meta: Meta = {
    title: "Components/Notification",
    component: RdsCompNotification,
    parameters: {
        layout: "padded",
        docs: {
            description: {
                component:
                    'The **Notification** component is a customizable component for displaying alerts, messages, or updates to users. It supports multiple layouts (`vertical`, `horizontal`), styles (`default`, `avatar`, `icon`, `image`), and types (`error`, `info`, `success`, `warning`). Notifications can include a title, description, timestamp, and optional action buttons or dismiss icons. You can show primary and secondary buttons for user actions and control the visibility of the dismiss icon. Flexible props allow you to tailor the appearance and behavior, making this component ideal for informing users about important events, confirmations, or system statuses in your application.'
            },
            source: {
                transform: (code: string) => {
                    // Transform layout enum - remove spaces and transform
                    code = code.replace(/layout="([^"]+)"/g, (match, p1) => `layout={NotificationLayout.${p1.replace(/\s+/g, '')}}`);
                    code = code.replace(/layout:\s*"([^"]+)"/g, (match, p1) => `layout: NotificationLayout.${p1.replace(/\s+/g, '')}`);
                    // Transform style enum - remove spaces and transform
                    code = code.replace(/style="([^"]+)"/g, (match, p1) => `style={NotificationStyle.${p1.replace(/\s+/g, '')}}`);
                    code = code.replace(/style:\s*"([^"]+)"/g, (match, p1) => `style: NotificationStyle.${p1.replace(/\s+/g, '')}`);
                    // Transform type enum - remove spaces and transform
                    code = code.replace(/type="([^"]+)"/g, (match, p1) => `type={NotificationType.${p1.replace(/\s+/g, '')}}`);
                    code = code.replace(/type:\s*"([^"]+)"/g, (match, p1) => `type: NotificationType.${p1.replace(/\s+/g, '')}`);
                    return code;
                }
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        title: {
            control: { type: 'text' },
            description: 'Title for all notifications (overrides notification.title)',
            defaultValue: '',
        },
        description: {
            control: { type: 'text' },
            description: 'Description for all notifications (overrides notification.description)',
            defaultValue: '',
        },
        layout: {
            options: ["vertical", "horizontal"],
            control: { type: "select" },
        },
        style: {
            options: ["default", "avatar", "icon", "image"],
            control: { type: "select" },
        },
        type: {
            options: ["error", "info", "success", "warning"],
            control: { type: "select" },
        },
    }
} satisfies Meta<typeof RdsCompNotification>;

export default meta;
type Story = StoryObj<typeof RdsCompNotification>;

export const Default: Story = {
    args: {
        title: 'Notification Title',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard.',
        layout: NotificationLayout.Horizontal,
        style: NotificationStyle.Default,
        type: NotificationType.Info,
        showButton: true,
        showPrimaryButton: true,
        showSecondaryButton: true,
        showDismiss: true,
        notifications: [
            {
                status: "success",
                title: "Notification Title",
                urlTitle: "hello",
                time: "10 min ago",
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.",
            }
        ]
    }
}

Default.parameters = {
    controls: {
        include: ['title', 'description', 'layout', 'style', 'type', 'notifications', 'showButton', 'showPrimaryButton', 'showSecondaryButton', 'showDismiss']
    }
};
