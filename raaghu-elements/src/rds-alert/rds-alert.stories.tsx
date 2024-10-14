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
                "left Border"
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

export const SigleLineAlert: Story = {
    args: {
        alertheading: "Heading Title. ",
        alertmessage: "This is default alert",
        type: "",
        border:"none",
        size: "small",
        dismisable: false,
        icon: "information",
        iconFill: false,
        iconStroke: false,
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
SigleLineAlert.parameters = { controls: { include: ["alertheading", "alertmessage", "type", "border", "size", "dismisable", "sticky", "position"] } };

// export const With_icon: Story = {
//     args: {
//         alertmessage: "This is alert width icon",
//         type: "primary",
//         size: "small",
//         dismisable: false,
//         icon: "information",
//         iconFill: false,
//         iconStroke: false,
//         iconHeight: "20px",
//         iconWidth: "20px",
//         sticky: false,
//         position: "top",
//         withBorder: true,
//         displayType: "singleline",
//     }
// };
// With_icon.parameters = { controls: { include: ["alertmessage", "type", "size", "dismisable", "sticky", "position"] } };

// export const With_close_button: Story = {
//     args: {
//         alertmessage: "This is close alert",
//         type: "primary",
//         size: "small",
//         dismisable: true,
//         sticky: false,
//         position: "top",
//         icon: "information",
//         iconFill: false,
//         iconStroke: false,
//         iconHeight: "20px",
//         iconWidth: "20px",
//         withBorder: true,
//         displayType: "singleline",
//     }
// };
// With_close_button.parameters = { controls: { include: ["alertmessage", "type", "size", "dismisable", "icon", "iconFill", "iconStroke", "iconHeight", "iconWidth", "sticky", "position"] } };

// export const With_Delay_Alert: Story = {
//     args: {
//         alertmessage: "This is close alert",
//         type: "primary",
//         size: "small",
//         sticky: false,
//         position: "top",
//         dismisable: false,
//         delay: 3000,
//         icon: "information",
//         iconFill: false,
//         iconStroke: false,
//         iconHeight: "20px",
//         iconWidth: "20px",
//         withBorder: true,
//         displayType: "singleline",
//     }
// };
// With_Delay_Alert.parameters = { controls: { include: ["alertmessage", "type", "size", "dismisable", "icon", "iconFill", "iconStroke", "iconHeight", "iconWidth", "sticky", "position", "delay"] } };

// export const With_Buttons: Story = {
//     args: {
//         icon: "information",
//         iconHeight: "20px",
//         iconWidth: "20px",
//         linkbutton: true,
//         cancelbutton: true,
//         okaybutton: true,
//         alertheading: "Heading Title: ",
//         alertmessage: "This is the description of the message bar.",
//         type: "primary",
//         size: "small",
//         dismisable: true,
//         position: "top",
//         withBorder: true,
//         displayType: "singleline",
//     }
// };
//With_Buttons.parameters = { controls: { include: ["alertmessage", "icon", "type", "size", "alertheading", "withBorder"] } };

export const MultilineAlert: Story = {
    args: {
        alertheading: "Heading Title. ",
        alertmessage: "This is the description of the message bar.",
        type: "",
        border:"none",
        icon: "information",
        iconHeight: "20px",
        iconWidth: "20px",
        linkbutton: true,
        cancelbutton: true,
        okaybutton: true,        
        size: "small",
        dismisable: true,
        position: "top",
        description: "This is the description which should not exceed 100 character limit.",
        displayType: "multiline",
    }
};
MultilineAlert.parameters = { controls: { include: ["alertmessage", "type", "border",  "size", "alertheading", "description"] } };

// export const With_Shadow: Story = {
//     args: {
//         icon: "information",
//         iconHeight: "20px",
//         iconWidth: "20px",
//         linkbutton: true,
//         cancelbutton: true,
//         okaybutton: true,
//         alertheading: "Heading Title: ",
//         alertmessage: "This is the description of the message bar.",
//         type: "primary",
//         size: "small",
//         dismisable: true,
//         position: "top",
//         withBorder: false,
//         displayType: "singleline",
//     }
// };
// With_Shadow.parameters = { controls: { include: ["alertmessage", "icon", "type", "size", "alertheading", "withBorder"] } };

// export const With_Left_Border: Story = {
//     args: {
//         icon: "information",
//         iconHeight: "20px",
//         iconWidth: "20px",
//         linkbutton: true,
//         cancelbutton: true,
//         okaybutton: true,
//         alertheading: "Heading Title: ",
//         alertmessage: "This is the description of the message bar.",
//         type: "primary",
//         size: "small",
//         dismisable: true,
//         position: "top",
//         withBorder: true,
//         withLeftBorder: true,
//         displayType: "singleline",
//     }
// };
// With_Left_Border.parameters = { controls: { include: ["alertmessage", "icon", "type", "size", "alertheading"] } };
