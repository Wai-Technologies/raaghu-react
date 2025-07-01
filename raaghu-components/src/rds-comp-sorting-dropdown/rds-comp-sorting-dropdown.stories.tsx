import React from "react";
import RdsCompSortingDropdown from "./rds-comp-sorting-dropdown";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Components/AI ChatBox/Sorting Dropdown',
    component: RdsCompSortingDropdown,
    parameters: {
        layout: 'padded',
        docs:{
            description: {
  component: `The **Sorting Dropdown** component provides a user-friendly interface for selecting sorting options within an application. It displays a dropdown menu with a customizable \`label\` (e.g., "Trending") and a list of selectable items passed via the \`listItems\` prop. Each item in the list includes a \`label\` and a unique \`id\`, allowing developers to implement specific sorting logic based on user selection. This component is ideal for content filtering, search result sorting, or dashboard organization, offering a clean and consistent UI element for managing display preferences.`
}

        }
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompSortingDropdown>;

export default meta;
type Story = StoryObj<typeof RdsCompSortingDropdown>;


export const Standard: Story = {
    args: {
        label: "Trending",
        listItems: [
            { label: "Trending", id: "1" },
            { label: "Top", id: "2" },
            { label: "Newest", id: "3" },
        ],
    }
}
Standard.parameters = { controls: { include: ['label'] } };
