import RdsAlert from "./rds-alert";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof RdsAlert> = {
    title: "Elements/Alert",
    component: RdsAlert,
    tags: ["autodocs"],
    argTypes: {
        type: {
            options: [
                "info",
                "success",
                "warning",
                "error"            
            ],
            control: { type: "select" },
        },
        border:{
            options:[
                "none",
                "single",
                "left border"
            ],
            control: { type: "select" },
        },
        position: {
            options: [
                "top",
                "bottom"
            ],
            control: { type: "radio" },
            if: { arg: "sticky" }
        },
        size: {
            options: [
                "small",
                "medium",
                "large"
            ],
            control: { type: "select" },
        },
        displayType: {
            options: ["singleline", "multiline"],
            control: { type: "select" },
        },        
    },
};

export default meta;
type Story = StoryObj<typeof RdsAlert>;

export const SingleLineAlert: Story = {
    args: {
        type: "info",
        alertheading: "Heading Title. ",
        alertmessage: "This is the description of the message bar.",
        border:"none",
        size: "small",
        dismisable: true,
        icon: "information",
        iconFill: false,
        iconStroke: true,
        iconHeight: "20px",
        iconWidth: "20px",
        sticky: false,
        position: "top",
        displayType: "singleline",
        linkbutton: true,
        cancelbutton: true,
        okaybutton: true,        
    }
};
SingleLineAlert.parameters = { controls: { include: ["type", "alertheading", "alertmessage", "border", "size", "dismisable", "sticky", "position"] } };

export const MultilineAlert: Story = {
    args: {
        type: "info",
        alertheading: "Heading Title. ",
        alertmessage: "This is the description of the message bar.",
        description: "This is the description which should not exceed 100 character limit.",
        border:"none",
        iconStroke: true,
        icon: "information",
        iconHeight: "20px",
        iconWidth: "20px",
        size: "small",
        dismisable: true,
        sticky: false,
        position: "top",
        linkbutton: true,
        cancelbutton: true,
        okaybutton: true,
        
        displayType: "multiline",
    }
};
MultilineAlert.parameters = { controls: { include: ["type", "alertheading", "alertmessage", "description", "border",  "size", "dismisable", "sticky", "position"] } };
