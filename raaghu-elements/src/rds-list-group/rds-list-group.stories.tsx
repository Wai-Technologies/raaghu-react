import React from "react";
import RdsListGroup from "./rds-list-group";
import { Meta, StoryObj } from "@storybook/react";


const meta: Meta = {
    title: 'Components/List Group',
    component: RdsListGroup,
    parameters: {
        layout: 'padded',
        docs:{
            description: {
  component: `The **List Group** component provides a versatile way to display a collection of related items in a structured list format. It supports multiple configurations including default lists, lists with badges for item counts or statuses, multi-select functionality for choosing multiple items, and combinations of multi-select with badges for enhanced interactivity. The \`labelPosition\` prop allows the label to be positioned either at the top or bottom of the list, providing flexible layout options.The list items can include a label, optional badge, and additional metadata such as heading, content, and timestamps, enabling rich item representation. Disabled states are supported to indicate non-interactive items. This component is ideal for menus, selection lists, notifications, or any UI scenario where grouping of related items is needed, all while maintaining accessibility and consistency within your design system.`
}

        }
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

export const Standard: Story = {
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
Standard.parameters = { controls: { include: ['labelPosition', 'label', 'listItem'] } };

export const WithMultiSelect: Story = {
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
WithMultiSelect.parameters = { controls: { include: ['labelPosition', 'label', 'listGroupWithMultiSelect', 'listItem'] } };

export const WithBadge: Story = {
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
WithBadge.parameters = { controls: { include: ['labelPosition', 'label', 'withBadge', 'listItem'] } };

export const MultiSelectWithBadge: Story = {
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
MultiSelectWithBadge.parameters = { controls: { include: ['labelPosition', 'label', 'listGroupWithMultiSelect', 'withBadge', 'listItem'] } };
