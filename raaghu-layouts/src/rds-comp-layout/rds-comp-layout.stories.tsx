import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import RdsCompLayout from "./rds-comp-layout";
import RdsCompLayoutItem from "./rds-comp-layout-item";
import * as stories from "../rds-comp-app-shell/rds-comp-app-shell.stories"; 

export default {
  title: "Layouts",
  component: RdsCompLayout,
  argTypes: {
    // displayType: {
    //   control: {
    //     type: "select",
    //     options: ["layout1", "layout2", "layout3", "layout4", "layout5", "layout6", "layout7", "layout8"],
    //   },
    //   defaultValue: "layout1",
    // },
    shell: {
      control: {
        type: "select",
        options: Object.keys(stories).filter(story => !['default', '__namedExportsOrder', 'exports'].includes(story)).map(story => story.toLowerCase()),
      },
    },
  },
} as ComponentMeta<typeof RdsCompLayout>;

const Template: ComponentStory<typeof RdsCompLayout> = (args) => (
  <RdsCompLayout {...args} />
);

export const Layout1 = Template.bind({});
Layout1.args = {
  displayType: "layout1",
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
        <div className="grid-col-container-2-1-1">
          <div className="content-with-small-height"></div>
          <div className="content-with-small-height"></div>
          <div className="content-with-small-height"></div>
        </div>
        <div className="grid-col-container-1-1-2">
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
        <div className="grid-col-container-1-1-2">
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
        <div className="grid-col-container-2-1-1">
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
      <RdsCompLayoutItem title={""}>
        <div className="grid-container-1">
          <div className="col-md-12 content-with-small-height"></div>
        </div>
        <div className="grid-container-3">
          <div className="content-with-medium-height"></div>
          <div className="content-with-medium-height"></div>
          <div className="content-with-medium-height"></div>
        </div>
        <div className="grid-col-container-1-2">
          <div className="content-with-medium-height"></div>
          <div className="content-with-medium-height"></div>
        </div>
        <div className="grid-container-3">
          <div className="content-with-medium-height"></div>
          <div className="content-with-medium-height"></div>
          <div className="content-with-medium-height"></div>
        </div>
      </RdsCompLayoutItem>
    </>
  ),
};

export const Layout9 = Template.bind({});
Layout9.args = {
  displayType: "layout9",
  //withShell: true,
  children: (
    <>
      <RdsCompLayoutItem title={""}>
        <div className="grid-container-1">
          <div className="col-md-12 content-with-full-height">
            <div className="grid-container-2">
              <div className="content-with-medium-height"></div>
              <div className="content-with-medium-height"></div>
            </div>
            <div className="grid-container-2">
              <div className="content-with-medium-height"></div>
              <div className="content-with-medium-height"></div>
            </div>
          </div>
        </div>
      </RdsCompLayoutItem>
    </>
  ),
};

export const Layout10 = Template.bind({});
Layout10.args = {
  displayType: "layout10",
  //withShell: true,
  children: (
    <>
      <RdsCompLayoutItem title={""}>
        <div className="grid-col-container-2-1-1">
          <div className="content-with-medium-height"></div>
          <div>
            <div className="grid-container-1">
              <div className="content-with-small-height"></div>
            </div>  
            <div className="grid-container-1">
              <div className="content-with-small-height"></div>
            </div>  
          </div>
          <div className="content-with-medium-height"></div>
        </div>
        <div className="grid-col-container-1-1-2">
          <div className="content-with-medium-height"></div>
          <div className="content-with-medium-height"></div>
          <div className="content-with-medium-height"></div>
        </div>
      </RdsCompLayoutItem>
    </>
  ),
};


export const Layout11 = Template.bind({});
Layout11.args = {
  displayType: "layout11",
  //withShell: true,
  children: (
    <>
      <RdsCompLayoutItem title={""}>
        <div className="grid-col-container-1-1-2">
          <div>
            <div className="grid-container-1">
              <div className="content-with-small-height"></div>
            </div>  
            <div className="grid-container-1">
              <div className="content-with-small-height"></div>
            </div>  
          </div>
          <div>
            <div className="grid-container-1">
              <div className="content-with-small-height"></div>
            </div>  
            <div className="grid-container-1">
              <div className="content-with-small-height"></div>
            </div>  
          </div>
          <div className="content-with-medium-height"></div>
          </div>
          <div className="grid-container-2">
          <div className="content-with-medium-height"></div>
          <div className="content-with-medium-height"></div>
        </div>
        <div className="grid-col-container-1-2">
          <div className="content-with-medium-height"></div>
          <div className="content-with-medium-height"></div>
        </div>
        <div className="grid-col-container-1-2">
          <div className="content-with-medium-height"></div>
          <div className="content-with-medium-height"></div>
        </div>
      </RdsCompLayoutItem>
    </>
  ),
};

export const Layout12 = Template.bind({});
Layout12.args = {
  displayType: "layout12",
  //withShell: true,
  children: (
    <>
      <RdsCompLayoutItem title={""}>
      <div className="grid-col-container-1-1-2">
          <div className="content-with-medium-height"></div>
          <div className="content-with-medium-height"></div>
          <div className="content-with-medium-height"></div>
        </div>
        <div className="grid-container-2">
          <div className="content-with-medium-height"></div>
          <div className="content-with-medium-height"></div>
        </div>
        <div className="grid-col-container-1-2">
          <div className="content-with-medium-height"></div>
          <div className="content-with-medium-height"></div>
        </div>
        <div className="grid-col-container-1-2">
          <div className="content-with-medium-height"></div>
          <div className="content-with-medium-height"></div>
        </div>
      </RdsCompLayoutItem>
    </>
  ),
};

export const Layout13 = Template.bind({});
Layout13.args = {
  displayType: "layout13",
  //withShell: true,
  children: (
    <>
      <RdsCompLayoutItem title={""}>
        <div className="grid-container-1">
          <div className="content-with-small-height"></div>
        </div>
        <div className="grid-container-1">
          <div className="content-with-medium-height"></div>
        </div>
        <div className="grid-col-container-2-1">
          <div className="content-with-medium-height"></div>
          <div className="content-with-medium-height"></div>
        </div>
        <div className="grid-col-container-1-2">
          <div className="content-with-medium-height"></div>
          <div className="content-with-medium-height"></div>
        </div>
      </RdsCompLayoutItem>
    </>
  ),
};


export const Layout14 = Template.bind({});
Layout14.args = {
  displayType: "layout14",
  //withShell: true,
  children: (
    <>
      <RdsCompLayoutItem title={""}>
      <div className="grid-container-6">
          <div className="content-with-small-height"></div>
          <div className="content-with-small-height"></div>
          <div className="content-with-small-height"></div>
          <div className="content-with-small-height"></div>
          <div className="content-with-small-height"></div>
          <div className="content-with-small-height"></div>
        </div>
        <div className="grid-col-container-1-2">
          <div className="content-with-full-height"></div>
          <div>
            <div className="grid-container-1">
              <div className="content-with-medium-height"></div>
              <div className="content-with-medium-height"></div>
            </div>
          </div>
        </div>
        <div className="grid-col-container-1-2">
          <div className="content-with-medium-height"></div>
          <div className="content-with-medium-height"></div>          
        </div>
        <div className="grid-col-container-1-2">
          <div className="content-with-medium-height"></div>
          <div className="content-with-medium-height"></div>          
        </div>
      </RdsCompLayoutItem>
    </>
  ),
};
