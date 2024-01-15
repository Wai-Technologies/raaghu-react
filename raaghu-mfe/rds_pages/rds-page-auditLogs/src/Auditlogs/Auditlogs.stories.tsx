import React from "react";
import { ComponentStory, ComponentMeta, addDecorator } from "@storybook/react";
import RdsPageAuditlogs from "./Auditlogs";
import { Provider } from "react-redux";
import { store } from "../../../../libs/public.api";
import { BrowserRouter } from "react-router-dom";

export default {
    title: "Pages/Audit logs",
    component: RdsPageAuditlogs,
} as ComponentMeta<typeof RdsPageAuditlogs>;

const Template: ComponentStory<typeof RdsPageAuditlogs> = (args) => (
    <RdsPageAuditlogs {...args} />
);

export const Default = Template.bind({});

Default.args = {
    operationLogsHeaders: [
        { displayName: "Http Request", key: "httprequest", datatype: "text", sortable: true, isEndUserEditing: true, },
        { displayName: "User", key: "user", datatype: "text", sortable: true, },
        { displayName: "IP Address", key: "ipAddress", datatype: "text", sortable: true, },
        { displayName: "Time", key: "time", datatype: "text", sortable: true, },
        { displayName: "Duration", key: "duration", datatype: "number", sortable: true, },
        { displayName: "Appliaction Name", key: "appname", datatype: "avatarTitleInfo", sortable: true, },
    ],

    operationLogs: [
        {
            id: 1, httprequest: "Admin", user: "UserDelegationAppService", action: "GetActiveUserDelegations", duration: "1351", ipAddress: "103.151.184.6",
            appname: {
                "avatar": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Google_Chrome_icon_%28February_2022%29.svg/2048px-Google_Chrome_icon_%28February_2022%29.svg.png",
                "title": "Chrome",
                "info": "Window NT 10"
            }, time: "11/15/2021, 2:44:52 PM"
        },
        {
            id: 2, httprequest: "Manager", user: "UserAppService", action: "GetActiveDelegationsUser", duration: "1151", ipAddress: "103.151.184.6", appname: {
                "avatar": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Opera_appname_logo_2013_vector.svg/512px-Opera_appname_logo_2013_vector.svg.png",
                "title": "Opera",
                "info": "Window NT 10"
            }, time: "11/15/2021, 2:44:52 PM"
        },
        {
            id: 3, httprequest: "Manager", user: "UserDelegationAppService", action: "GetActiveUserDelegations", duration: "1321", ipAddress: "103.151.184.6",
            appname: {
                "avatar": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Microsoft_Edge_logo_%282019%29.svg/480px-Microsoft_Edge_logo_%282019%29.svg.png",
                "title": "Edge",
                "info": "Window NT 10"
            }, time: "11/15/2021, 2:44:52 PM"
        },
        {
            id: 4, httprequest: "Developer", user: "UserDelegationAppService", action: "GetActiveUserDelegations", duration: "1301", ipAddress: "103.151.184.6",
            appname: {
                "avatar": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Safari_appname_logo.svg/2057px-Safari_appname_logo.svg.png",
                "title": "Safari",
                "info": "Window NT 10"
            }, time: "11/15/2021, 2:44:52 PM"
        },
        {
            id: 5, httprequest: "Developer", user: "UserDelegationAppService", action: "GetActiveUserDelegations", duration: "1051", ipAddress: "103.151.184.6",
            appname: {
                "avatar": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Firefox_logo%2C_2019.svg/1971px-Firefox_logo%2C_2019.svg.png",
                "title": "Firefox",
                "info": "Window NT 10"
            }, time: "11/15/2021, 2:44:52 PM"
        },
        {
            id: 6, httprequest: "HR", user: "UserDelegationAppService", action: "GetActiveUserDelegations", duration: "1401", ipAddress: "103.151.184.6",
            appname: {
                "avatar": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Microsoft_Edge_logo_%282019%29.svg/480px-Microsoft_Edge_logo_%282019%29.svg.png",
                "title": "Edge",
                "info": "Window NT 10"
            }, time: "11/15/2021, 2:44:52 PM"
        },
        {
            id: 7, httprequest: "HR", user: "UserDelegationAppService", action: "GetActiveUserDelegations", duration: "1105", ipAddress: "103.151.184.6",
            appname: {
                "avatar": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Google_Chrome_icon_%28February_2022%29.svg/2048px-Google_Chrome_icon_%28February_2022%29.svg.png",
                "title": "Chrome",
                "info": "Window NT 10"
            }, time: "11/15/2021, 2:44:52 PM"
        },
    ],
};