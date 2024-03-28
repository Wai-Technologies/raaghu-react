
import React from "react";
import type { Meta, StoryObj } from '@storybook/react';
import RdsCompIntegration from "./rds-comp-integration";


const meta: Meta = { 
    title: "Components/Integration",
    component: RdsCompIntegration,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompIntegration>;

export default meta;
type Story = StoryObj<typeof RdsCompIntegration>;

export const Default: Story = {
    args: {
        integrationList: [
            {
                "title": "Zapier",
                "subtitle": "Build custom automation and intefrations with app",
                "icon": "zapier_colored",
                "route": "/home",
                "selected": true,
                "iconHeight": "25px",
                "iconWidth": "25px",
                "iconStroke": true,
                "iconFill": false,
                "id": 1,
                "iconColor": "dark",
                "routeLabel": "View integration"
            },
            {
                "title": "Adobe XD",
                "subtitle": "Build custom automation and intefrations with app",
                "icon": "xd_colored",
                "route": "/home",
                "selected": true,
                "iconHeight": "25px",
                "iconWidth": "25px",
                "iconStroke": false,
                "iconFill": false,
                "routeLabel": "View integration"
            },
            {
                "title": "Figma",
                "subtitle": "Build custom automation and intefrations with app",
                "icon": "figma_colored",
                "route": "/home",
                "selected": true,
                "iconHeight": "25px",
                "iconWidth": "25px",
                "iconStroke": false,
                "iconFill": false,
                "routeLabel": "View integration"
            },
            {
                "title": "Dropbox",
                "subtitle": "Build custom automation and intefrations with app",
                "icon": "dropbox_colored",
                "route": "/home",
                "selected": true,
                "iconHeight": "25px",
                "iconWidth": "25px",
                "iconStroke": false,
                "iconFill": false,
                "routeLabel": "View integration"
            },
            {
                "title": "Jira",
                "subtitle": "Build custom automation and intefrations with app",
                "icon": "jira_colored",
                "route": "/home",
                "selected": true,
                "iconHeight": "25px",
                "iconWidth": "25px",
                "iconStroke": false,
                "iconFill": false,
                "routeLabel": "View integration"
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
                "iconFill": false,
                "routeLabel": "View integration"
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
                "iconFill": false,
                "routeLabel": "View integration"
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
                "iconFill": false,
                "routeLabel": "View integration"
            },
            {
                "title": "Linear",
                "subtitle": "Build custom automation and intefrations with app",
                "icon": "linear_colored",
                "route": "/home",
                "selected": true,
                "iconHeight": "25px",
                "iconWidth": "25px",
                "iconStroke": false,
                "iconFill": false,
                "routeLabel": "View integration"
            }
        ]
    }
} satisfies Story;





