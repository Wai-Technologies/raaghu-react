import { Meta, StoryObj } from "@storybook/react";
import RdsNotification, { NotificationLayout, NotificationStyle, NotificationType } from "./rds-notification";

const meta: Meta = {
    title: "Elements/Notification",
    component: RdsNotification,

    parameters: {
        layout: 'padded',
        docs:{
             description: {
        component:
            'The **Notification** element is a customizable component for displaying alerts, messages, or updates to users. It supports multiple layouts (`vertical`, `horizontal`), styles (`default`, `avatar`, `icon`, `image`), and types (`error`, `info`, `success`, `warning`). Notifications can include a title, description, timestamp, and optional action buttons or dismiss icons. You can show primary and secondary buttons for user actions and control the visibility of the dismiss icon. Flexible props allow you to tailor the appearance and behavior, making this element ideal for informing users about important events, confirmations, or system statuses in your application.'
    },
            source:{
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
} satisfies Meta<typeof RdsNotification>;

export default meta;
type Story = StoryObj<typeof RdsNotification>;

export const Standard: Story = {
    args: {
        layout: NotificationLayout.Horizontal,
        style: NotificationStyle.Default,
        type: NotificationType.Info,
        showButton: true,
        showPrimaryButton: true,
        showSecondaryButton: true,
        showDismissIcon: true,
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
Standard.parameters = { controls: { include: ['layout', 'style', 'type','notifications','showButtons','showPrimaryButton','showSecondaryButton','showDismissIcon'] } };





// import { Meta, StoryObj } from "@storybook/react";
// import RdsNotification from "./rds-notification";


// const meta: Meta = {
//     title: "Elements/Notification",
//     component: RdsNotification,

//     parameters: {
//         layout: 'padded',
//       },
//       tags: ['autodocs'],
      
//     argTypes: {
//         colorVariant: {
//             options: [
//                 "primary",
//                 "secondary",
//                 "success",
//                 "info",
//                 "warning",
//                 "danger",
//                 "dark",
//                 "light",
//             ],
//             control: { type: "select" },
//         },
//     }
// } satisfies Meta<typeof RdsNotification>;

// export default meta;
// type Story = StoryObj<typeof RdsNotification>;

// export const Standard: Story = {
//     args: {
//         colorVariant: "light",
//         notifications: [
//             {
//                 status: "success", title: "Tenant added",
//                 urlTitle: "hello",
//                 // url:" " ,
//                 time: "a month ago",
//                 state: 1,
//                 userNotificationId: 0,
//                 selected: false
//             },

//             {
//                 status: "error", title: "Tenant deleted",
//                 urlTitle: "hello",
//                 time: "a month ago",
//                 state: 1,
//                 userNotificationId: 1,
//                 selected: false
//             },

//             {
//                 status: "warn", title: "Tenant added  warn",
//                 urlTitle: "hello",
//                 time: "a month ago",
//                 state: 1,
//                 userNotificationId: 2,
//                 selected: false
//             },

//             {
//                 status: "info", title: "Tenant deleted info",
//                 urlTitle: "hello",
//                 time: "a month ago",
//                 state: 1,
//                 userNotificationId: 3,
//                 selected: false
//             }

//         ]
//     }
// }
// Standard.parameters = { controls: { include: ['colorVariant', 'notifications'] } };


