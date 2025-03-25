import { Meta, StoryObj } from "@storybook/react";
import RdsNotification, { NotificationLayout, NotificationStyle, NotificationType } from "./rds-notification";

const meta: Meta = {
    title: "Elements/Notification",
    component: RdsNotification,

    parameters: {
        layout: 'padded',
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

export const Default: Story = {
    args: {
        layout: NotificationLayout.Vertical,
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
                time: "a month ago",
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry"
            }
        ]
    }
}
Default.parameters = { controls: { include: ['layout', 'style', 'type','notifications','showButtons','showPrimaryButton','showSecondaryButton','showDismissIcon'] } };





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

// export const Default: Story = {
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
// Default.parameters = { controls: { include: ['colorVariant', 'notifications'] } };


