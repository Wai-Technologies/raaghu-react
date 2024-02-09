import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import RdsCompLayout from "./rds-comp-layout";
import RdsCompLayoutItem from "./rds-comp-layout-item";

export default {
  title: "Layouts",
  component: RdsCompLayout,
  argTypes: {
    displayType: {
      control: {
        type: "select",
        options: ["layout1","layout2","layout3","layout4","layout5","layout6","layout7","layout8"],
      },
      defaultValue: "layout1",
    },
  },
} as ComponentMeta<typeof RdsCompLayout>;

const Template: ComponentStory<typeof RdsCompLayout> = (args) => (
  <RdsCompLayout {...args} />
);

export const Layout1 = Template.bind({});
Layout1.args = {
  displayType: "layout1",
  //withShell: true,
  children: (
    <>
      <RdsCompLayoutItem title={""}>
        <div className="col-md-12">
          <div className="content-with-full-height"></div>
        </div>
      </RdsCompLayoutItem>
    </>
  ),
};

export const Layout2 = Template.bind({});
Layout2.args = {
  displayType: "layout2",
  //withShell: true,
  children: (
    <>
      <RdsCompLayoutItem title={""}>
        <div className="grid-container-3">
          <div className=" content-with-small-height"></div>
          <div className=" content-with-small-height"></div>
          <div className=" content-with-small-height"></div>
        </div>
        <div className="grid-container-1">
          <div className="content-with-full-height"></div>
        </div>
      </RdsCompLayoutItem>
    </>
  ),
};

export const Layout3 = Template.bind({});
Layout3.args = {
  displayType: "layout3",
  //withShell: true,
  children: (
    <>
      <RdsCompLayoutItem title={""}>
        <div className="grid-container-1">
          <div className="content-with-small-height"></div>
        </div>
        <div className="grid-container-3">
          <div className="content-with-small-height"></div>
          <div className="content-with-small-height"></div>
          <div className="content-with-small-height"></div>
        </div>
        <div className="grid-container-1">
          <div className="content-with-full-height"></div>
        </div>
      </RdsCompLayoutItem>
    </>
  ),
};

export const Layout4 = Template.bind({});
Layout4.args = {
  displayType: "layout4",
  //withShell: true,
  children: (
    <>
      <RdsCompLayoutItem title={""}>
        <div className="grid-container-5">
          <div className="content-with-small-height"></div>
          <div className="content-with-small-height"></div>
          <div className="content-with-small-height"></div>
        </div>
        <div className="grid-container-6">
          <div className="content-with-medium-height"></div>
          <div className="content-with-medium-height"></div>
          <div className="content-with-medium-height"></div>
        </div>
        <div className="grid-container-1">
          <div className="col-md-12 content-with-medium-height"></div>
        </div>
      </RdsCompLayoutItem>
    </>
  ),
};

export const Layout5 = Template.bind({});
Layout5.args = {
  displayType: "layout5",
  //withShell: true,
  children: (
    <>
      <RdsCompLayoutItem title={""}>
        <div className="grid-container-2">
          <div className="content-with-full-height"></div>
          <div className="content-with-full-height"></div>
        </div>
      </RdsCompLayoutItem>
    </>
  ),
};

export const Layout6 = Template.bind({});
Layout6.args = {
  displayType: "layout6",
  //withShell: true,
  children: (
    <>
      <RdsCompLayoutItem title={""}>
        <div className="grid-container-1">
          <div className="col-md-12 content-with-medium-height"></div>
        </div>
        <div className="grid-container-4">
          <div className="content-with-small-height"></div>
          <div className="content-with-small-height"></div>
          <div className="content-with-small-height"></div>
          <div className="content-with-small-height"></div>
        </div>
        <div className="grid-container-4">
          <div className="content-with-small-height"></div>
          <div className="content-with-small-height"></div>
          <div className="content-with-small-height"></div>
          <div className="content-with-small-height"></div>
        </div>
        <div className="grid-container-1">
          <div className="col-md-12 content-with-medium-height"></div>
        </div>
        <div className="grid-container-6">
          <div className="content-with-medium-height"></div>
          <div className="content-with-medium-height"></div>
          <div className="content-with-medium-height"></div>
        </div>
        <div className="grid-container-1">
          <div className="col-md-12 content-with-medium-height"></div>
        </div>{" "}
        <div className="grid-container-1">
          <div className="col-md-12 content-with-medium-height"></div>
        </div>
        <div className="grid-container-3">
          <div className="content-with-medium-height"></div>
          <div className="content-with-medium-height"></div>
          <div className="content-with-medium-height"></div>
        </div>
        <div className="grid-container-1">
          <div className="col-md-12 content-with-medium-height"></div>
        </div>
      </RdsCompLayoutItem>
    </>
  ),
};

export const Layout7 = Template.bind({});
Layout7.args = {
  displayType: "layout7",
  //withShell: true,
  children: (
    <>
      <RdsCompLayoutItem title={""}>
        <div className="grid-container-1">
          <div className="col-md-12 content-with-small-height"></div>
        </div>
        <div className="grid-container-4">
          <div className="content-with-small-height"></div>
          <div className="content-with-small-height"></div>
          <div className="content-with-small-height"></div>
          <div className="content-with-small-height"></div>
        </div>
        <div className="grid-container-1">
          <div className="col-md-12 content-with-medium-height"></div>
        </div>
        <div className="grid-container-1">
          <div className="col-md-12 content-with-medium-height"></div>
        </div>
        <div className="grid-container-2">
          <div className="col-md-12 content-with-medium-height"></div>
          <div className="col-md-12 content-with-medium-height"></div>
        </div>
        <div className="grid-container-4">
          <div className="content-with-medium-height"></div>
          <div className="content-with-medium-height"></div>
          <div className="content-with-medium-height"></div>
          <div className="content-with-medium-height"></div>
        </div>
        <div className="grid-container-5">
          <div className="content-with-medium-height"></div>
          <div className="content-with-medium-height"></div>
          <div className="content-with-medium-height"></div>
        </div>
      </RdsCompLayoutItem>
    </>
  ),
};

export const Layout8 = Template.bind({});
Layout8.args = {
  displayType: "layout8",
  //withShell: true,
  children: (
    <>
      <RdsCompLayoutItem title={""}>layout8</RdsCompLayoutItem>
    </>
  ),
};
