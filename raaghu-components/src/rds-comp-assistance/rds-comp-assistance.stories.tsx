import type { Meta, StoryObj } from '@storybook/react';
import RdsCompAssistance from "./rds-comp-assistance";

const meta: Meta = { 
  title: "Components/Assistance",
  component: RdsCompAssistance,
  parameters: {
      layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
  },
} satisfies Meta<typeof RdsCompAssistance>;

export default meta;
type Story = StoryObj<typeof RdsCompAssistance>;

export const Default: Story = {
    args: {
      assistanceData: {
        
      }
  },
  // argTypes: {
  //   assistanceData: { table: { disable: true } }, // Hide 'children' from the controls
  // },
} satisfies Story;