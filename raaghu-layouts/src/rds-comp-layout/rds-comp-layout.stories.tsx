import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import RdsCompLayout from "./rds-comp-layout";
import RdsCompLayoutItem from "./rds-comp-layout-item";
import * as stories from "../rds-comp-app-shell/rds-comp-app-shell.stories"; 


const meta: Meta = {
    title: 'Layouts/Layouts',
    component: RdsCompLayout,
    parameters: { 
        layout: 'padded',
        disableZoom : false
    },
    tags:['autodocs'],
    argTypes: {
      // shell: {
      //   control: {
      //     type: "select",
      //     options: Object.keys(stories).filter(story => !['default', '__namedExportsOrder', 'exports'].includes(story)).map(story => story.toLowerCase()),
      //   },
      // },
    },
    
} satisfies Meta<typeof RdsCompLayout>;

export default meta;
type Story = StoryObj<typeof RdsCompLayout>;


export const Layout1: Story = {
  args: {
    displayType: "Layout1",
    children: (
      <>
        <RdsCompLayoutItem title={""}>
          <div className="col-md-12">
            <div className="content-with-full-height"></div>
          </div>
        </RdsCompLayoutItem>
      </>
    ),
  },
} satisfies Story;

export const Layout2: Story = {
  args: {
    displayType: "Layout2",
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
  },
} satisfies Story;

export const Layout3: Story = {
  args: {
    displayType: "Layout3",
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
  },
} satisfies Story;

export const Layout4: Story = {
  args: {
    displayType: "Layout4",
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
  },
} satisfies Story;

export const Layout5: Story = {
  args: {
    displayType: "Layout5",
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
  },
} satisfies Story;

export const Layout6: Story = {
  args: {
    displayType: "Layout6",
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
  },
} satisfies Story;

export const Layout7: Story = {
  args: {
    displayType: "Layout7",
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
  },
} satisfies Story;

export const Layout8: Story = {
  args: {
    displayType: "layout8",
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
  },
} satisfies Story;

export const Layout9: Story = {
  args: {
    displayType: "layout9",
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
  },
} satisfies Story;


export const Layout10: Story = {
  args: {
    displayType: "layout10",
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
  },
} satisfies Story;

export const Layout11: Story = {
  args: {
    displayType: "layout11",
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
  },
} satisfies Story;

export const Layout12: Story = {
  args: {
    displayType: "layout12",
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
  },
} satisfies Story;

export const Layout13: Story = {
  args: {
    displayType: "layout13",
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
  },
} satisfies Story;

export const Layout14: Story = {
  args: {
    displayType: "layout14",
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
  },
} satisfies Story;