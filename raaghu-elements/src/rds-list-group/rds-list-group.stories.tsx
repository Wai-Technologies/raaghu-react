import React from "react";
import RdsListGroup from "./rds-list-group";
import { Meta, StoryObj } from "@storybook/react";


const meta: Meta = {
    title: 'Elements/List Group',
    component: RdsListGroup,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        labelPosition: {
            options: ["top", "bottom"],
            control: { type: "select" },
        },
    },
} satisfies Meta<typeof RdsListGroup>;

export default meta;
type Story = StoryObj<typeof RdsListGroup>;

export const Default: Story = {
    args: {
        labelPosition: "top",
        label: "List Group",
        listItem: [
            {
                label: " label 1",
                disabled: true,
                badgeLabel: "10",
                listHeading: "",
                listContent: "",
                listTime: "",
                type: "",
            },
            {
                label: " label 2",
                disabled: false,
                badgeLabel: "2",
                listHeading: "",
                listContent: "",
                listTime: "",
                type: "",
            },
            {
                label: " label 3",
                disabled: false,
                badgeLabel: "5",
                listHeading: "",
                listContent: "",
                listTime: "",
                type: "",
            },
        ],
    }
} satisfies Story;

export const ListGroupWithMultiSelect: Story = {
    args: {
        labelPosition: "top",
        label: "List Group",
        listGroupWithMultiSelect: true,
        listItem: [
            {
                label: " label 1",
                disabled: true,
                badgeLabel: "10",
                listHeading: "",
                listContent: "",
                listTime: "",
                type: "",
            },
            {
                label: " label 2",
                disabled: false,
                badgeLabel: "2",
                listHeading: "",
                listContent: "",
                listTime: "",
                type: "",
            },
            {
                label: " label 3",
                disabled: false,
                badgeLabel: "5",
                listHeading: "",
                listContent: "",
                listTime: "",
                type: "",
            },
        ],
    }
} satisfies Story;

export const ListGroupWithBadge: Story = {
    args: {
        labelPosition: "top",
        label: "List Group",
        withBadge: true,
        listItem: [
            {
                label: " label 1",
                disabled: true,
                badgeLabel: "10",
                listHeading: "",
                listContent: "",
                listTime: "",
                type: "",
            },
            {
                label: " label 2",
                disabled: false,
                badgeLabel: "2",
                listHeading: "",
                listContent: "",
                listTime: "",
                type: "",
            },
            {
                label: " label 3",
                disabled: false,
                badgeLabel: "5",
                listHeading: "",
                listContent: "",
                listTime: "",
                type: "",
            },
        ],
    }
} satisfies Story;

export const MultiSelectListGroupWithBadge: Story = {
    args: {
        labelPosition: "top",
        label: "List Group",
        listGroupWithMultiSelect: true,
        withBadge: true,
        listItem: [
            {
                label: " label 1",
                disabled: true,
                badgeLabel: "10",
                listHeading: "",
                listContent: "",
                listTime: "",
                type: "",
            },
            {
                label: " label 2",
                disabled: false,
                badgeLabel: "2",
                listHeading: "",
                listContent: "",
                listTime: "",
                type: "",
            },
            {
                label: " label 3",
                disabled: false,
                badgeLabel: "5",
                listHeading: "",
                listContent: "",
                listTime: "",
                type: "",
            },
        ],
    }
} satisfies Story;
