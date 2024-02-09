import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import RdsCompAppShell from "./rds-comp-app-shell";
import RdsCompAppShellItem from "./rds-comp-app-shell-item";

export default {
    title: "Application Shells",
    component: RdsCompAppShell,
    argTypes: {
      displayType: {
        control: {
          type: 'select',
          options: ['shell1', 'shell2']
        },
        defaultValue: 'shell1'
      }
    }
} as ComponentMeta<typeof RdsCompAppShell>;

const Template: ComponentStory<typeof RdsCompAppShell> = (args) => (
    <RdsCompAppShell {...args} />
);

export const Default = Template.bind({});
Default.args = {
  displayType: "Default",
  children: (
    <>
      <RdsCompAppShellItem title={""}>
        <div className="row">
          <div className="col-md-12 shell-header">
            <h1></h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-2 left vh-100"></div>
        </div>
      </RdsCompAppShellItem>
    </>
  ),
};
