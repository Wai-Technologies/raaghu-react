import type { Meta, StoryObj } from '@storybook/react';
import RdsCompGetAssistance from "./rds-comp-get-assistance";

const meta: Meta = { 
  title: "Components/Get Assistance",
  component: RdsCompGetAssistance,
  parameters: {
      layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
  },
} satisfies Meta<typeof RdsCompGetAssistance>;

export default meta;
type Story = StoryObj<typeof RdsCompGetAssistance>;

export const Default: Story = {
  args: {

  }
} satisfies Story;