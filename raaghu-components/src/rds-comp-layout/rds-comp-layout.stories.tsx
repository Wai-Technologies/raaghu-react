import React from "react";
import RdsCompLayout from "./rds-comp-layout"; 

export default {
  title: "Layout",
  component: RdsCompLayout,
  argTypes: {
    displayType: {
      control: {
        type: 'select',
        options: ['layout1', 'layout2', 'layout3']
      },
      defaultValue: 'layout1'
    }
  }
};

export const Layout1 = (args) => <RdsCompLayout {...args} />;
Layout1.args = {
  displayType: 'layout1',
};

export const Layout2 = (args) => <RdsCompLayout {...args} />;
Layout2.args = {
  displayType: 'layout2',
};

export const Layout3 = (args) => <RdsCompLayout {...args} />;
Layout3.args = {
  displayType: 'layout3',
};
