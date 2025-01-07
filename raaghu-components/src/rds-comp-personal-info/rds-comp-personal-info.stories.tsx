/* eslint-disable */
import React from 'react';
//import { ComponentStory } from "@storybook/react";
import type { Meta, StoryObj } from '@storybook/react';
import RdsCompPersonalInfo from './rds-comp-personal-info';


const meta: Meta = {
  title: "Components/Personal Info",
  component: RdsCompPersonalInfo,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
  },
} satisfies Meta<typeof RdsCompPersonalInfo>;

export default meta;
type Story = StoryObj<typeof RdsCompPersonalInfo>;

export const Default: Story = {
  args: {
      
    }
} satisfies Story;




