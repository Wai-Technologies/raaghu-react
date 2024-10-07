import React from "react";
import RdsBadge from "./rds-badge";
import RdsIcon from "../rds-icon/rds-icon";
import RdsButton from "../rds-button/rds-button";
import { Meta, StoryObj, } from "@storybook/react";
import { alert_colors } from "../../libs";
import { badge_colors } from "../../libs/types/colorvariant";

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
      options: badge_colors,
      control: { type: "select" },
    },
  },
} satisfies Meta<typeof RdsBadge>;

export default meta;
type Story = StoryObj<typeof RdsBadge>;

const Positioned = (args: any) => (
  <>
    <RdsButton
      type="button"
      colorVariant="primary"
      size="small"
      label="Button"
    />
    <span className="position-fixed ms-2 translate-middle">
      <RdsBadge label={""} {...args}></RdsBadge>
    </span>
  </>
);

const PositionedIcon = (args: any) => (
  <>
    <RdsIcon
      name="notification"
      width="25px"
      height="25px"
      fill={false}
      stroke={true}
    />
    <span className="position-absolute ms-2 translate-middle">
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
    badgeType: "pill",
    positioned: true,
  },
  render: PositionedIcon
} satisfies Story;
WithIcon.parameters = { controls: { include: ['size', 'label', 'colorVariant', 'badgeType', 'positioned'] } };

export const TextWithLabel: Story = {
  args: {
    size: "smallest",
    label: "9",
    colorVariant: "danger",
    badgeType: "pill",
  },
 // render: PositionedIcon
} satisfies Story;
TextWithLabel.parameters = { controls: { include: ['size', 'label', 'colorVariant', 'badgeType', 'positioned','borderColor'] } };

export const IconOnly: Story = {
  args: {
    size: "smallest",
    //label: "9",
    colorVariant: "danger",
    badgeType: "pill",
  },
  render: PositionedIcon
} satisfies Story;
IconOnly.parameters = { controls: { include: ['size', 'label', 'colorVariant', 'badgeType', 'positioned','borderColor'] } };
