import type { Meta, StoryObj } from '@storybook/react';
import RdsCompAppDetail from './rds-comp-app-detail';

const meta: Meta = {
    title: "Components/App Detail",
    component: RdsCompAppDetail,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompAppDetail>;

export default meta;
type Story = StoryObj<typeof RdsCompAppDetail>;

export const Default: Story = {
    args: {
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
                "selected": true,
                "routeLabel": "View integration"
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
                "selected": true,
                "routeLabel": "View integration"
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
                "selected": true,
                "routeLabel": "View integration"
            },

        ]

    }
} satisfies Story;