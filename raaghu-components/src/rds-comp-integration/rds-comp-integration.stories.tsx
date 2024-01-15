
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCompIntegration from "./rds-comp-integration";
import { I18nextProvider } from "react-i18next";
import i18n from "../../../.storybook/i18n";

export default {
    title: "Components/Integration ",
    component: RdsCompIntegration,
    decorators: [
        (StoryComponent) => (
            <I18nextProvider i18n={i18n}>
                <StoryComponent />
            </I18nextProvider>
        ),
    ],

} as ComponentMeta<typeof RdsCompIntegration>;


const Template: ComponentStory<typeof RdsCompIntegration> = (args) => (
    <RdsCompIntegration {...args} />
);


export const Integration = Template.bind({});

Integration.args = {
    integrationList: [
        {
            "title": "Zapier",
            "subtitle": "Build custom automation and intefrations with app",
            "icon": "zapier",
            "route": "/home",
            "selected": true,
            "iconHeight": "25px",
            "iconWidth": "25px",
            "iconStroke": true,
            "iconFill": false,
            "id": 1,
            "iconColor": "dark",
        },
        {
            "title": "Adobe XD",
            "subtitle": "Build custom automation and intefrations with app",
            "icon": "adobeXD",
            "route": "/home",
            "selected": true,
            "iconHeight": "25px",
            "iconWidth": "25px",
            "iconStroke": false,
            "iconFill": false
        },
        {
            "title": "Figma",
            "subtitle": "Build custom automation and intefrations with app",
            "icon": "figma",
            "route": "/home",
            "selected": true,
            "iconHeight": "25px",
            "iconWidth": "25px",
            "iconStroke": false,
            "iconFill": false
        },
        {
            "title": "Dropbox",
            "subtitle": "Build custom automation and intefrations with app",
            "icon": "dropbox",
            "route": "/home",
            "selected": true,
            "iconHeight": "25px",
            "iconWidth": "25px",
            "iconStroke": false,
            "iconFill": false
        },
        {
            "title": "Jira",
            "subtitle": "Build custom automation and intefrations with app",
            "icon": "jira",
            "route": "/home",
            "selected": true,
            "iconHeight": "25px",
            "iconWidth": "25px",
            "iconStroke": false,
            "iconFill": false
        },
        {
            "title": "Notion",
            "subtitle": "Build custom automation and intefrations with app",
            "icon": "notion_colored",
            "route": "/home",
            "selected": true,
            "iconHeight": "25px",
            "iconWidth": "25px",
            "iconStroke": true,
            "iconFill": false
        },
        {
            "title": "GitHub",
            "subtitle": "Build custom automation and intefrations with app",
            "icon": "github_colored",
            "route": "/home",
            "selected": true,
            "iconHeight": "25px",
            "iconWidth": "25px",
            "iconStroke": true,
            "iconFill": false
        },
        {
            "title": "Slack",
            "subtitle": "Build custom automation and intefrations with app",
            "icon": "slack_colored",
            "route": "/home",
            "selected": true,
            "iconHeight": "25px",
            "iconWidth": "25px",
            "iconStroke": false,
            "iconFill": false
        },
        {
            "title": "Linear",
            "subtitle": "Build custom automation and intefrations with app",
            "icon": "linear",
            "route": "/home",
            "selected": true,
            "iconHeight": "25px",
            "iconWidth": "25px",
            "iconStroke": false,
            "iconFill": false
        }
    ]

};


