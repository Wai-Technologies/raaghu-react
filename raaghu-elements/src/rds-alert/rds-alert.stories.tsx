import { Alert } from "bootstrap";
import RdsAlert, { AlertBorder, AlertPosition, AlertType } from "./rds-alert";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof RdsAlert> = {
  title: "Elements/Alerts",
  component: RdsAlert,
  parameters: {
    // layout: 'centered',
    docs: {
    description: {
 component: `The Alert element is a flexible UI component used to display important messages such as **information**, **warning**, or **error**. It supports various configurations like alert type, size, layout, and **position**. Users can enable or disable elements like titles, descriptions, icons, links, and dismiss buttons to match different contexts. Alerts can also be sticky, timed, or include primary and secondary actions, allowing for clear, interactive communication across the interface.`,

},

      source: {
        transform: (code: string) => {
          code = code.replace(/"(info|success|warning|error)"/g, '{AlertType.$1}');
          code = code.replace(/"(none|single|left border)"/g, '{AlertBorder.$1}');
          code = code.replace(/"(top|bottom)"/g, '{AlertPosition.$1}');
          code = code.replace(/"(singleline|multiline)"/g, '{AlertDisplayType.$1}');
          return code;
        }
      }
    }
  },
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
    showPrimary: {
      if: { arg: "showbutton"},
    },
    showSecondary: {
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
    type: AlertType.info,
    border: AlertBorder.none,
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
    showLink: true,
    showButtons:true,
    showPrimary: true,
    showSecondary: true,
    showDismiss: true,
    showDescription: true,
    showIcon: true,
    iconFill: false,
    delay: 5000,
    sticky: false,
    position: AlertPosition.top,
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
      "showLink",
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
