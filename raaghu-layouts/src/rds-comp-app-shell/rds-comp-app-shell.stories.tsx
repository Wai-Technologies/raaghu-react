import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import RdsCompAppShell from "./rds-comp-app-shell";
import RdsCompAppShellItem from "./rds-comp-app-shell-item";


const meta: Meta = {
    title: 'Application Shells',
    component: RdsCompAppShell,
    parameters: { 
        layout: 'padded',
    },
    tags:['autodocs'],
    argTypes: {},
} satisfies Meta<typeof RdsCompAppShell>;


export default meta;
type Story = StoryObj<typeof RdsCompAppShell>;

// export default meta;
// type Story = StoryObj<typeof RdsCompAppShell> = ({ children, ...args }: RdsCompAppShellProps) => (
//   <RdsCompAppShell {...args}>
//     {children}
//   </RdsCompAppShell>
// );


export const Default: Story = {
  args: {
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
  },
} satisfies Story;

export const Shell1: Story = {
  args: {
    displayType: "Default",
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
  },
} satisfies Story;