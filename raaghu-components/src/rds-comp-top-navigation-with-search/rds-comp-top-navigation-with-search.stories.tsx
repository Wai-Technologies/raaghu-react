import type { Meta, StoryObj } from "@storybook/react";
import RdsCompTopNavigationWithSearch from "./rds-comp-top-navigation-with-search";

const meta: Meta = {
    title: "Components/Top Navigation With Search",
    component: RdsCompTopNavigationWithSearch,
    parameters: {
        layout: "padded",
        docs: {
    description: {
        component: 
            'The **Top Navigation With Search** component is a versatile and interactive UI element designed to provide a seamless navigation experience with integrated search functionality. It includes features such as a logo display, breadcrumb navigation, and user profile details (e.g., name, email). This component is ideal for applications requiring a structured and user-friendly top navigation bar. Fully customizable, the Top Navigation With Search component ensures seamless integration with your design system while offering an intuitive interface for navigating and searching within the application.'
    },
},
        
    },
    tags: ["autodocs"],
    argTypes: {},
} satisfies Meta<typeof RdsCompTopNavigationWithSearch>;

export default meta;
type Story = StoryObj<typeof RdsCompTopNavigationWithSearch>;

export const Standard: Story = {
    args: {
        logo: "assets/Raaghu-logo-mfe-black.png",
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
                route: "#",
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

Standard.parameters = { controls: { include: ["logo"] } };