import React from "react";
import RdsBadge from "./rds-badge";
import RdsIcon from "../rds-icon/rds-icon";
import RdsButton from "../rds-button/rds-button";
import { Meta, StoryObj, } from "@storybook/react";

const meta: Meta = {
  title: 'Elements/Badge',
  component: RdsBadge,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      options: ["small", "smaller", "smallest", "medium"],
      control: { type: "select" },
    },
    badgeType: {
      options: ["rectangle", "pill"],
      control: { type: "select" },
    },
    colorVariant: {
      options: [
        "primary",
        "success",
        "danger",
        "warning",
        "light",
        "info",
        "secondary",
        "dark",
      ],
      control: { type: "select" },
    },
  },
} satisfies Meta<typeof RdsBadge>;

export default meta;
type Story = StoryObj<typeof RdsBadge>;

const Positioned = (args) => (
  <>
    <RdsButton
      type="button"
      colorVariant="primary"
      size="small"
      label="Button"
    />
    <span className="position-absolute translate-middle">
      <RdsBadge label={""} {...args}></RdsBadge>
    </span>
  </>
);

const PositionedIcon = (args) => (
  <>
    <span className="position-relative">
      <RdsIcon
        name="notification"
        width="20px"
        height="20px"
        fill={false}
        stroke={true}
      />
      <RdsBadge label={""} {...args}></RdsBadge>
    </span>
  </>
);

export const TextBadge: Story = {
  args: {
    size: "small",
    label: "Badge",
    colorVariant: "primary",
    badgeType: "rectangle",
  }
} satisfies Story;
TextBadge.parameters = { controls: { include: ['size', 'label', 'colorVariant', 'badgeType'] } };

export const WithLabel: Story = {
  args: {
    size: "smaller",
    label: "99",
    colorVariant: "danger",
    badgeType: "rectangle",
    positioned: true,
  },
  render: Positioned
} satisfies Story;
WithLabel.parameters = { controls: { include: ['size', 'label', 'colorVariant', 'badgeType', 'positioned'] } };

export const WithIcon: Story = {
  args: {
    size: "smallest",
    label: "9",
    colorVariant: "danger",
    badgeType: "rectangle",
    positioned: true,
  },
  render: PositionedIcon
} satisfies Story;
WithIcon.parameters = { controls: { include: ['size', 'label', 'colorVariant', 'badgeType', 'positioned'] } };

