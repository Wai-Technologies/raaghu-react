
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCompAppDetail from "./rds-comp-app-detail";

export default {
    title: "Components/App Detail ",
    component: RdsCompAppDetail,

} as ComponentMeta<typeof RdsCompAppDetail>;


const Template: ComponentStory<typeof RdsCompAppDetail> = (args) => (
    <RdsCompAppDetail {...args} />
);


export const AppDetail = Template.bind({});

AppDetail.args = {
    appDetailList: [
        {
            "id": 1,
            "iconHeight": "30px",
            "iconWidth": "30px",
            "iconFill": false,
            "iconColor": "dark",
            "iconStroke": true,
            "title": "Zapier",
            "subtitle": "Build custom automation and intefrations with app",
            "icon": "zapier",
            "route": "/home",
            "selected": true
        },
        {
            "id": 2,
            "iconHeight": "30px",
            "iconWidth": "30px",
            "iconFill": false,
            "iconColor": "dark",
            "iconStroke": true,
            "title": "Zapier",
            "subtitle": "Build custom automation and intefrations with app",
            "icon": "zapier",
            "route": "/home",
            "selected": true
        },
        {
            "id": 3,
            "iconHeight": "30px",
            "iconWidth": "30px",
            "iconFill": false,
            "iconColor": "dark",
            "iconStroke": true,
            "title": "Zapier",
            "subtitle": "Build custom automation and intefrations with app",
            "icon": "zapier",
            "route": "/home",
            "selected": true
        },

    ]

};

