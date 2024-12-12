import type { Meta, StoryObj } from "@storybook/react";
import RdsCompTopNavigationWithSearch from "./rds-comp-top-navigation-with-search";

const meta: Meta = {
    title: "Components/Top Navigation With Search",
    component: RdsCompTopNavigationWithSearch,
    parameters: {
        layout: "padded",
    },
    tags: ["autodocs"],
    argTypes: {},
} satisfies Meta<typeof RdsCompTopNavigationWithSearch>;

export default meta;
type Story = StoryObj<typeof RdsCompTopNavigationWithSearch>;

export const Default: Story = {
    args: {
        logo: "https://anzstageui.raaghu.io/assets/raaghu_icon.png",
        profileTitle: "John Doe",
        profileEmail: "john.doe@raaghu.io",
        profileName: "John Doe",
        breacrumItem : [
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
    },
} satisfies Story;

Default.parameters = { controls: { include: ["logo"] } };