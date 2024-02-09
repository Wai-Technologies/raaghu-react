import React from "react";
import RdsBadge from "./rds-badge";
import RdsIcon from "../rds-icon/rds-icon";
import RdsButton from "../rds-button/rds-button";
import { Meta, StoryObj, } from "@storybook/react";

const meta: Meta = {
    title: 'Elements/Badge',
    component: RdsBadge,
    parameters: {
        layout: 'centered',
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


export const TextBadge: Story = {
    args: {
        size: "small",
        label: "Badge",
        colorVariant: "primary",
        badgeType: "rectangle",
    }
} satisfies Story;

const Positioned: Story = {
    decorators: [(args) => <><RdsButton
        type="button"
        colorVariant="primary"
        size="small"
        label="Button" /><span className="position-absolute translate-middle"><RdsBadge label={""} {...args}></RdsBadge></span></>],
}


export const WithLabel: Story = {
    ...Positioned.args,
    args: {
        size: "smaller",
        label: "99",
        colorVariant: "danger",
        badgeType: "rectangle",
    }
} satisfies Story;

const PositionedIcon: Story = {
    decorators: [(args) => <span className='position-relative'>
        <RdsIcon
            name='notification'
            width="20px"
            height="20px"
            fill={false}
            stroke={true}
        />
        <RdsBadge label={""} {...args}></RdsBadge>
    </span>],
}


export const WithIcon: Story = {
    ...PositionedIcon.args,
    args: {
        size: "smallest",
        label: "9",
        colorVariant: "danger",
        badgeType: "rectangle",
        positioned: true,
    }
} satisfies Story;
