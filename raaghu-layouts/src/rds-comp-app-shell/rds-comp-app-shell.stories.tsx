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
          options: ['Default','shell1', 'shell2', 'shell3', 'shell4']
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

export const Shell1 = Template.bind({});
Shell1.args = {
  displayType: "Shell1",
  children: (
    <>
      <RdsCompAppShellItem title={""}>
        <div className="row">
          <div className="col-md-12 shell-header">
            <h1></h1>
          </div>
        </div>
        <div className="row justify-content-between">
          <div className="col-md-2 left vh-100"></div>
          <div className="col-md-1 right vh-100"></div>
        </div>
      </RdsCompAppShellItem>
    </>
  ),
};

export const Shell2 = Template.bind({});
Shell2.args = {
  displayType: "Shell2",
  children: (
    <>
      <RdsCompAppShellItem title={""}>
        <div className="row">
          <div className="col-md-12 shell-header">
            <h1></h1>
          </div>
        </div>
        <div className="row justify-content-between">
          <div className="col-md-2 left vh-100"></div>
          <div className="col-md-1 right vh-100"></div>
        </div>
      </RdsCompAppShellItem>
    </>
  ),
};

export const Shell3 = Template.bind({});
Shell3.args = {
  displayType: "Shell3",
  children: (
    <>
      <RdsCompAppShellItem title={""}>
        <div className="row">
          <div className="col-md-12 shell-header">
            <h1></h1>
          </div>
        </div>
        <div className="row justify-content-between">
          <div className="col-md-2 left vh-100"></div>
          <div className="col-md-1 right vh-100"></div>
        </div>
      </RdsCompAppShellItem>
    </>
  ),
};

export const Shell4 = Template.bind({});
Shell4.args = {
  displayType: "Shell4",
  children: (
    <>
      <RdsCompAppShellItem title={""}>
        <div className="row">
          <div className="col-md-12 shell-header">
            <h1></h1>
          </div>
        </div>
        <div className="row justify-content-between">
          <div className="col-md-2 left vh-100"></div>
          <div className="col-md-1 right vh-100"></div>
        </div>
      </RdsCompAppShellItem>
    </>
  ),
};