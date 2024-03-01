import RdsBreadcrumb from "./rds-breadcrumb";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Elements/Breadcrumb',
    component: RdsBreadcrumb,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {

    },
} satisfies Meta<typeof RdsBreadcrumb>;

export default meta;
type Story = StoryObj<typeof RdsBreadcrumb>;


export const breadcrumb: Story = {
    args: {
        breadItems: [
            {
                label: "Home",
                id: 1,
                route: "#",
                disabled: false,
                icon: "home",
                iconFill: false,
                iconstroke: true,
                iconWidth: "15px",
                iconHeight: "15px",
                iconColor: "primary",
                active: false,
            },
            {
                label: "About",
                id: 2,
                route: "#",
                disabled: false,
                icon: "information",
                iconFill: false,
                iconstroke: true,
                iconWidth: "15px",
                iconHeight: "15px",
                iconColor: "primary",
                active: false,
            },
            {
                label: "Contact",
                id: 3,
                active: false,
                disabled: true,
                icon: "phone",
                iconFill: false,
                iconstroke: true,
                iconWidth: "15px",
                iconHeight: "15px",
                iconColor: "primary",
            },
        ],
    }
} satisfies Story;
breadcrumb.parameters = { controls: { include: ['breadItems'] } };

