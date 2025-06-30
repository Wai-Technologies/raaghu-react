    import React from "react";
    import RdsNavbar from "./rds-navbar";
    import { Meta, StoryObj } from "@storybook/react";

    const meta: Meta = {
        title: 'Components/Navbar',
        component: RdsNavbar,
        parameters: {
            layout: 'padded',
            docs:{
                description: {
  component: `The **Navbar** component provides a responsive and configurable navigation bar for your application. It supports multiple size options—small, medium, and large—to fit different layout requirements. The \`navbarItems\` prop accepts an array of navigation items, each with properties like \`label\` (the text displayed), \`isActive\` (to indicate the currently active page), \`navclass\` (custom CSS classes for styling), and \`href\` (the link target). This component is ideal for creating clear and accessible navigation menus that can be easily customized to match your design system and user experience goals.`
}

            }
        },
        tags: ['autodocs'],
        argTypes: {
            size: {
                options: ["small", "medium", "large"],
                control: { type: "select" },
            }
        },
    } satisfies Meta<typeof RdsNavbar>;

    export default meta;
    type Story = StoryObj<typeof RdsNavbar>;

export const Standard: Story = {
    args: {
        title: "Navbar",
        size: "small",
        navbarItems: [{
            label: "Home",
            isActive: true,
            navclass: "my-1 me-3",
            href: "",

            },
            {
                label: "Features",
                isActive: false,
                navclass: "my-1 me-3",
                href: "",
            },
            {
                label: "Pricing",
                isActive: false,
                navclass: "my-1 me-3",
                href: "",
            }]
        }
    } satisfies Story;


