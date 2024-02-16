import type { Meta, StoryObj } from '@storybook/react';
import RdsCompFileUploader from './rds-comp-fileUploader';


const meta: Meta = {
  title: "Components/File Uploader",
  component: RdsCompFileUploader,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
  },
} satisfies Meta<typeof RdsCompFileUploader>;

export default meta;
type Story = StoryObj<typeof RdsCompFileUploader>;

export const Default: Story = {
  args: {

  }
} satisfies Story;




