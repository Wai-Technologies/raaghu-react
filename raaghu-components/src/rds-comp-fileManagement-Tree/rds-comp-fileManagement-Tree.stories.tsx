import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCompFileManagementTree from "./rds-comp-fileManagement-Tree";

export default {
  title: "Components/File Management Tree",
  component: RdsCompFileManagementTree,
} as ComponentMeta<typeof RdsCompFileManagementTree>;

const Template: ComponentStory<typeof RdsCompFileManagementTree> = (args) => (
  <RdsCompFileManagementTree {...args} />
);

export const Default = Template.bind({});

Default.args = {
  items: [
    {
      id: "1",
      name: "Folder 1",
      children: [
        {
          id: "1-1",
          name: "File 1-1",
        },
        {
          id: "1-2",
          name: "File 1-2",
        },
        {
          id: "1-3",
          name: "File 1-3",
        },
      ],
    },
    {
      id: "2",
      name: "Folder 2",
      children: [
        {
          id: "2-1",
          name: "File 2-1",
        },
        {
          id: "2-",
          name: "File 2-",
        },
      ],
    },
  ],
};

