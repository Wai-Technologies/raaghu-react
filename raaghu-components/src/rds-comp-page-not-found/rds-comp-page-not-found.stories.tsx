
import type { Meta, StoryObj } from '@storybook/react';
import RdsCompPageNotFound from "./rds-comp-page-not-found";


const meta: Meta = {
  title: "Components/Page Not Found",
  component: RdsCompPageNotFound,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
  },
} satisfies Meta<typeof RdsCompPageNotFound>;

export default meta;
type Story = StoryObj<typeof RdsCompPageNotFound>;

export const Default: Story = {
  args: {

  }
} satisfies Story;




