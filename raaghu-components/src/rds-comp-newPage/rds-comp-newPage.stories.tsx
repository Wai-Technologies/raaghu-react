import type { Meta, StoryObj } from '@storybook/react';
import RdsCompNewPage from './rds-comp-newPage';


const meta: Meta = {
  title: "Components/New Page",
  component: RdsCompNewPage,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
  },
} satisfies Meta<typeof RdsCompNewPage>;

export default meta;
type Story = StoryObj<typeof RdsCompNewPage>;

export const Default: Story = {
  args: {
    name: 'default',
  }
} satisfies Story;




