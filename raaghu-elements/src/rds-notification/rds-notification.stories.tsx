import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsNotification from "./rds-notification";


export default {
    title: "Elements/Notification",
    component: RdsNotification,
    argTypes: {
        colorVariant: {
            options: [
                "primary",
                "secondary",
                "success",
                "info",
                "warning",
                "danger",
                "dark",
                "light",
            ],
            control: { type: "select" },
        },
    }
} as ComponentMeta<typeof RdsNotification>;

const Template: ComponentStory<typeof RdsNotification> = (args) => (
    <RdsNotification {...args}/>
);

export const Notification = Template.bind({});
Notification.args={
    colorVariant :"primary",
    footerText : "2 days ago", 
    notifications:[
        {
            status: "success", title:"Tenant added" , 
            urlTitle: "hello",
            // url:" " ,
            time: "a month ago",
            state: 1,
            userNotificationId: 0,
            selected: false
        },

        {status: "error", title:"Tenant deleted" , 
            urlTitle: "hello",
            time: "a month ago",
            state: 1,
            userNotificationId: 1,
            selected: false},

        {status: "warn", title:"Tenant added  warn"  , 
            urlTitle: "hello",
            time: "a month ago",
            state: 1,
            userNotificationId: 2,
            selected: false},

        {status: "info", title:"Tenant deleted info" , 
            urlTitle: "hello",
            time: "a month ago",
            state: 1,
            userNotificationId: 3,
            selected: false}

    ]
};