import { Meta, StoryObj } from "@storybook/react";
import { RdsAdvanceBreadcrumb } from "../../../raaghu-components/src/rds-elements";

const meta: Meta = {
    title: 'Elements/Advance Breadcrumb',
    component: RdsAdvanceBreadcrumb,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        type: {
            control: 'select',
            options: ['simple', 'background'],
        },
        shape: {
            control: 'select',
            options: ['round', 'square'],
        },
        separator: {
            control: {
                type: 'select',
                options: ['>', '/', '→', '»', '|', '-'], // Predefined options for separator
            },
        },
    },
} satisfies Meta<typeof RdsAdvanceBreadcrumb>;

export default meta;
type Story = StoryObj<typeof RdsAdvanceBreadcrumb>;

const breadItems = [
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
];

export const Breadcrumb: Story = {
    args: {
        breadItems,
        type: 'simple',
        separator: '>',
    }
};