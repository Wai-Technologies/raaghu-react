import type { Meta, StoryObj } from '@storybook/react';
import RdsCompPage from './rds-comp-page';


const meta: Meta = {
  title: "Components/Page",
  component: RdsCompPage,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
  },
} satisfies Meta<typeof RdsCompPage>;

export default meta;
type Story = StoryObj<typeof RdsCompPage>;

export const Default: Story = {
  args: {
    
  }
} satisfies Story;




