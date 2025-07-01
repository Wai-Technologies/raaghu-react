/* eslint-disable */
import React from 'react';
//import { ComponentStory } from "@storybook/react-vite";
import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsCompPersonalInfo from './rds-comp-personal-info';


const meta: Meta = {
  title: "Components/Personal Info",
  component: RdsCompPersonalInfo,
  parameters: {
    layout: 'padded',
    docs: {
    description: {
        component: 
            'The **Personal Info** component is a customizable UI element designed to display and manage user personal information within your application. It provides a structured interface for capturing and updating details such as name, contact information, and other personal data. This component is ideal for user profile management, account settings, or any application requiring the collection and display of personal information. Fully customizable, the Personal Info component ensures a seamless user experience while maintaining consistency with your design system and functional requirements.'
    },
}
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




