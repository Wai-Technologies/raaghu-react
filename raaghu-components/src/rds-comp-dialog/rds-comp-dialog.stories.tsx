import { Meta, StoryObj } from '@storybook/react';
import RdsCompDialog from './rds-comp-dialog'; // Ensure the correct import path

const meta: Meta<typeof RdsCompDialog> = {
  title: 'Components/RdsCompDialog',
  component: RdsCompDialog,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof RdsCompDialog>;

export const Default: Story = {
  args: {},
};
export const WithoutIcon: Story = {
    args: {},
  };