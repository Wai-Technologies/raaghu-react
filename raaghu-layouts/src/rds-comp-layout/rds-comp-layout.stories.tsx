import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import RdsCompLayout from "./rds-comp-layout";
import RdsCompLayoutItem from "./rds-comp-layout-item";
import * as stories from "../rds-comp-app-shell/rds-comp-app-shell.stories"; 


const meta: Meta = {
    title: 'Layouts',
    component: RdsCompLayout,
    parameters: { 
        layout: 'padded',
        disableZoom : false
    },
    tags:['autodocs'],
    
} satisfies Meta<typeof RdsCompLayout>;

export default meta;
type Story = StoryObj<typeof RdsCompLayout>;


export const Basic: Story = {
  args: {
    displayType: "Basic",
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

export const Gridify: Story = {
  args: {
    displayType: "Gridify",
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

export const Spotlight: Story = {
  args: {
    displayType: "Spotlight",
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

export const Matrix: Story = {
  args: {
    displayType: "Matrix",
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

export const Splitz: Story = {
  args: {
    displayType: "Splitz",
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

export const Snapshots: Story = {
  args: {
    displayType: "Snapshots",
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

export const Sections: Story = {
  args: {
    displayType: "Sections",
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

export const Boxify: Story = {
  args: {
    displayType: "Boxify",
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

export const Stacks: Story = {
  args: {
    displayType: "Stacks",
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


export const Nexus: Story = {
  args: {
    displayType: "Nexus",
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

export const Mosaic: Story = {
  args: {
    displayType: "Mosaic",
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

export const Collage: Story = {
  args: {
    displayType: "Collage",
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

export const Pinboard: Story = {
  args: {
    displayType: "Pinboard",
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

export const Cardify: Story = {
  args: {
    displayType: "Cardify",
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