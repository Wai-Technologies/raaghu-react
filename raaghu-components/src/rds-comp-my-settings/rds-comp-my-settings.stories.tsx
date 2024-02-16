import type { Meta, StoryObj } from '@storybook/react';
import RdsCompMySettings from "./rds-comp-my-settings";

const meta: Meta = {
  title: "Components/My Settings",
  component: RdsCompMySettings,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
  },
} satisfies Meta<typeof RdsCompMySettings>;

export default meta;
type Story = StoryObj<typeof RdsCompMySettings>;

export const Default: Story = {
  args: {

  }
} satisfies Story;




