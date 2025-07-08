import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsCompAppDetail from './rds-comp-app-detail';

const meta: Meta = {
    title: "Components/App Details",
    component: RdsCompAppDetail,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **App Detail** component is a customizable UI element designed to display detailed information about various applications or integrations within your system. It supports an `appDetailList` array to define the details of each application, including properties such as `id`, `iconHeight`, `iconWidth`, `iconFill`, `iconColor`, `iconStroke`, `title`, `subtitle`, `icon`, `route`, `selected`, and `routeLabel`. These properties allow for the display of application icons, titles, subtitles, and navigation links, making it ideal for showcasing integrations, automation tools, or app-specific details. Fully customizable, the App Detail component is perfect for dashboards, integration pages, or any interface requiring structured and visually appealing application details while maintaining consistency with your design system.'
    },
}
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompAppDetail>;

export default meta;
type Story = StoryObj<typeof RdsCompAppDetail>;

export const Standard: Story = {
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