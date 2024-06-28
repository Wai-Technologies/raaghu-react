import type { Meta, StoryObj } from '@storybook/react';
import RdsCompCopyText from "./rds-comp-copy-text";

const meta: Meta = { 
  title: "Components/Copy Text",
  component: RdsCompCopyText,
  parameters: {
      layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
  },
} satisfies Meta<typeof RdsCompCopyText>;

export default meta;
type Story = StoryObj<typeof RdsCompCopyText>;

export const Default: Story = {
  args: {
  }
} satisfies Story;