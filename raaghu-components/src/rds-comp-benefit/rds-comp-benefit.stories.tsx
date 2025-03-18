import type { Meta, StoryObj } from "@storybook/react";
import RdsCompBenefit from "./rds-comp-benefit";

const meta: Meta = {
  title: "Components/Benefit",
  component: RdsCompBenefit,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    displayType: {
      options: [
        "default",
        "Heading With Icon",
        "Left Aligned",
        "With Label",
        "Without Label",
        "Center Aligned",
      ],
      control: { type: "select" },
    },
  },
} satisfies Meta<typeof RdsCompBenefit>;

export default meta;
type Story = StoryObj<typeof RdsCompBenefit>;

export const Default: Story = {
  args: {
    displayType: "default",
    colsize: 4,
    itemList: [
      {
        id: 1,
        icon: "currency_dollar_circle",
        iconHeight: "35px",
        iconWidth: "35px",
        iconFill: false,
        iconstroke: true,
        iconColorVarient: "dark",
        title: "Royalty Rewards",
        description: "Dont look at other tees",
      },
      {
        id: 2,
        icon: "roles",
        iconHeight: "35px",
        iconWidth: "35px",
        title: "International delivery",
        description: "Get your order in 2 years",
        iconFill: false,
        iconstroke: true,
        iconColorVarient: "dark",
      },
      {
        id: 3,
        iconHeight: "35px",
        iconWidth: "35px",
        icon: "truck",
        iconFill: false,
        iconstroke: true,
        iconColorVarient: "dark",
        title: "Free shipping",
        description: "Free delivery is our main part.",
      },
    ],
  },
} satisfies Story;

export const LeftAligned: Story = {
  args: {
    displayType: "Left Aligned",
    colsize: 4,
    itemList: [
      {
        id: 1,
        icon: "currency_dollar_circle",
        iconHeight: "35px",
        iconWidth: "35px",
        iconFill: false,
        iconstroke: true,
        iconColorVarient: "dark",
        title: "Royalty Rewards",
        description: "Dont look at other tees",
      },
      {
        id: 2,
        icon: "roles",
        iconHeight: "35px",
        iconWidth: "35px",
        title: "International delivery",
        description: "Get your order in 2 years",
        iconFill: false,
        iconstroke: true,
        iconColorVarient: "dark",
      },
      {
        id: 3,
        iconHeight: "35px",
        iconWidth: "35px",
        icon: "truck",
        iconFill: false,
        iconstroke: true,
        iconColorVarient: "dark",
        title: "Free shipping",
        description: "Free delivery is our main part.",
      },
    ],
  },
} satisfies Story;

export const CenterAligned: Story = {
  args: {
    displayType: "Center Aligned",
    colsize: 4,
    itemList: [
      {
        id: 1,
        iconHeight: "40px",
        iconWidth: "40px",
        icon: "truck",
        iconFill: false,
        iconstroke: true,
        iconColorVarient: "dark",
        title: "Free shipping",
        description:
          "Free delivery is our main part of company we just price it into the products. Someone's paying for it, and it's not us.",
      },
      {
        id: 2,
        iconHeight: "40px",
        iconWidth: "40px",
        icon: "refresh_sync",
        iconFill: false,
        iconstroke: true,
        iconColorVarient: "dark",
        title: "Exchanges",
        description:
          "We are take our customer and their needs also, if you don't like it, trade it to one of your friends for something of theirs.",
      },
      {
        id: 3,

        iconHeight: "40px",
        iconWidth: "40px",
        icon: "shield_check",
        iconFill: false,
        iconstroke: true,
        iconColorVarient: "dark",
        title: "10-year warranty",
        description:
          "If it breaks in the first 10 years we'll replace it. After that you're on your own though. This is the best part of our service.",
      },
    ],
  },
} satisfies Story;
export const WithLabel: Story = {
  args: {
    displayType: "With Label",
    colsize: 4,
    itemList: [
      {
        id: 1,
        icon: "currency_dollar_circle",
        iconHeight: "35px",
        iconWidth: "35px",
        iconFill: false,
        iconstroke: true,
        iconColorVarient: "dark",
        title: "Royalty Rewards",
        description: "Dont look at other tees",
      },
      {
        id: 2,
        icon: "roles",
        iconHeight: "35px",
        iconWidth: "35px",
        title: "International delivery",
        description: "Get your order in 2 years",
        iconFill: false,
        iconstroke: true,
        iconColorVarient: "dark",
      },
      {
        id: 3,
        iconHeight: "35px",
        iconWidth: "35px",
        icon: "truck",
        iconFill: false,
        iconstroke: true,
        iconColorVarient: "dark",
        title: "Free shipping",
        description: "Free delivery is our main part of company.",
      },
    ],
  },
} satisfies Story;

export const WithoutLabel: Story = {
  args: {
    displayType: "Without Label",
    colsize: 4,
    itemList: [
      {
        id: 1,
        icon: "truck",
        iconHeight: "40px",
        iconWidth: "40px",
        title: "Free shipping world wide",
        description: "",
        iconFill: false,
        iconstroke: true,
        iconColorVarient: "dark",
      },
      {
        id: 2,
        icon: "refresh_sync",
        iconHeight: "40px",
        iconWidth: "40px",
        title: "Exchanges or returns any time",
        description: "",
        iconFill: false,
        iconstroke: true,
        iconColorVarient: "dark",
      },
      {
        id: 3,
        icon: "shield_check",
        iconHeight: "40px",
        iconWidth: "40px",
        title: "Warranty 10-year on all product",
        description: "",
        iconFill: false,
        iconstroke: true,
        iconColorVarient: "dark",
      },
    ],
  },
} satisfies Story;

export const HeadingWithIcon: Story = {
  args: {
    displayType: "Heading With Icon",
    colsize: 4,
    itemList: [
      {
        id: 1,
        iconHeight: "40px",
        iconWidth: "40px",
        icon: "truck",
        iconFill: false,
        iconstroke: true,
        iconColorVarient: "dark",
        description: "",
        title: "Free delivery all year long",
      },
      {
        id: 2,
        iconHeight: "40px",
        iconWidth: "40px",
        icon: "truck",
        iconFill: false,
        iconstroke: true,
        iconColorVarient: "dark",
        description: "",
        title: "Free delivery all year long",
      },
      {
        id: 3,
        iconHeight: "40px",
        iconWidth: "40px",
        icon: "truck",
        iconFill: false,
        iconstroke: true,
        iconColorVarient: "dark",
        description: "",
        title: "Free delivery all year long",
      },
    ],
  },
} satisfies Story;
