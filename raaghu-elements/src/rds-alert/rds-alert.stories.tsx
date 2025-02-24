import RdsAlert from "./rds-alert";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof RdsAlert> = {
  title: "Elements/Alerts",
  component: RdsAlert,
  tags: ["autodocs"],
  argTypes: {
    type: {
      options: ["info", "success", "warning", "error"],
      control: { type: "select" },
    },
    border: {
      options: ["none", "single", "left border"],
      control: { type: "select" },
    },
    position: {
      options: ["top", "bottom"],
      control: { type: "radio" },
      //if: { arg: "sticky" },
    },
    linkUrl: {
      control: {type: "text"},
      //if: { arg: "showlink"},
    },
    showprimarybutton: {
      if: { arg: "showbutton"},
    },
    showsecondarybutton: {
      if: { arg: "showbutton"},
    },
    size: {
      options: ["small", "medium", "large"],
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

/*export const SingleLineAlert: Story = {
  args: {
    type: "info",
    icon: "information",
    title: "Heading Title. ",
    message: "This is the description of the message bar.",
    border: "none",
    size: "small",
    dismisable: true,
    linkUrl: "https://example.com",
    iconFill: false,
    delay: 5000,
    iconStroke: true,
    iconHeight: "20px",
    iconWidth: "20px",
    sticky: false,
    position: "top",
    multiline: false,
    showlink: true,
    showbutton: true,
  },
};
SingleLineAlert.parameters = {
  controls: {
    include: [
      "type",
      "icon",
      "title",
      "message",
      "border",
      "size",
      "dismisable",
      "sticky",
      "position",
      "showlink",
      "showbutton",
      "linkUrl",
      "delay",
      "multiline",
    ],
  },
};*/

export const Default: Story = {
  args: {
    type: "info",
    border: "none",
    multiline: false,
    icon: "information",
    showTitle: true,
    title: "Heading Title.",
    description: "This is the description of the message bar.",
    //description: "This is the description which should not exceed 100 character limit.",
    //border: "none",
    iconStroke: true,
    iconHeight: "20px",
    iconWidth: "20px",
    size: "medium",
    showlink: true,
    showbutton:true,
    showprimarybutton: true,
    showsecondarybutton: true,
    dismisable: true,
    showDescription: true,
    showIcon: true,
    iconFill: false,
    delay: 5000,
    sticky: false,
    position: "top",
    linkUrl: "https://example.com",
  },
};
Default.parameters = {
  controls: {
    include: [
      "type",
      "icon",
      "showTitle",
      "title",
      //"message",
      "description",
      "border",
      "size",
      "dismisable",
      "sticky",
      "position",
      "showlink",
      "showbutton",
      "showprimarybutton",
      "showsecondarybutton",
      "showDescription",
      "showIcon",
      //"linkUrl",
      //"iconFill",
      //"delay",
      "multiline",
    ],
  },
};
