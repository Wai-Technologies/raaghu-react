import React from "react";
import RdsAppDetail from "./rds-app-detail";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Elements/App Detail',
    component: RdsAppDetail,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsAppDetail>;



export default meta;
type Story = StoryObj<typeof RdsAppDetail>;

export const Default: Story = {
    args: {
        appDetailsItem: {
            title: "Zapier",
            subtitle: "Build custom automation and intefrations with app",
            icon: "zapier",
            route: "/home",
            selected: true,
            iconHeight: "30px",
            iconWidth: "30px",
            iconFill: true,
            iconColor: "warning",
            iconStroke: true,
            routeLabel: "View integration"
        },
    }
} satisfies Story;

