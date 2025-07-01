import type { Meta, StoryObj } from "@storybook/react";
import RdsCompDirectoryList from "./rds-comp-directory-list";

const meta: Meta = {
  title: "Components/Directory List",
  component: RdsCompDirectoryList,
  parameters: {
    layout: "padded",
    docs: {
    description: {
        component: 
            'The **Directory List** component is a customizable UI element designed to display a list of directories or items in a structured format. It supports an `items` array to define the list, where each item includes properties like `id` (unique identifier) and `name` (display name). This component is ideal for file management systems, navigation menus, or any interface requiring an organized directory or item listing. Fully customizable, the Directory List component ensures a seamless user experience while maintaining consistency with your design system and functional requirements.'
    },
}
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof RdsCompDirectoryList>;

export default meta;

type Story = StoryObj<typeof RdsCompDirectoryList>;

export const Standard: Story = {
  args: {
    items: [
      { id: "1", name: "Directory 1" },
      { id: "2", name: "Directory 2" },
      { id: "3", name: "Directory 3" },
    ],
  },
} satisfies Story;
