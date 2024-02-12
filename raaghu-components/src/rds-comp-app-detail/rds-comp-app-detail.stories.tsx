import type { Meta, StoryObj } from '@storybook/react';
import { RdsAppDetail } from "../rds-elements";

const meta: Meta = { 
    title: "Component/App Detail",
    component: RdsAppDetail,
    parameters: {
        layout: "",
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsAppDetail>;

export default meta;
type Story = StoryObj<typeof RdsAppDetail>;

export const Default: Story = {
    args: {
        // appDetailList: [
        //     {
        //         id: 1,
        //         iconHeight: "30px",
        //         iconWidth: "30px",
        //         iconFill: false,
        //         iconColor: "dark",
        //         iconStroke: true,
        //         title: "Zapier",
        //         subtitle: "Build custom automation and intefrations with app",
        //         icon: "zapier",
        //         route: "/home",
        //         selected: true
        //     },
        //     {
        //         "id": 2,
        //         "iconHeight": "30px",
        //         "iconWidth": "30px",
        //         "iconFill": false,
        //         "iconColor": "dark",
        //         "iconStroke": true,
        //         "title": "Zapier",
        //         "subtitle": "Build custom automation and intefrations with app",
        //         "icon": "zapier",
        //         "route": "/home",
        //         "selected": true
        //     },
        //     {
        //         "id": 3,
        //         "iconHeight": "30px",
        //         "iconWidth": "30px",
        //         "iconFill": false,
        //         "iconColor": "dark",
        //         "iconStroke": true,
        //         "title": "Zapier",
        //         "subtitle": "Build custom automation and intefrations with app",
        //         "icon": "zapier",
        //         "route": "/home",
        //         "selected": true
        //     },
    
        // ]
        
    }
} satisfies Story;