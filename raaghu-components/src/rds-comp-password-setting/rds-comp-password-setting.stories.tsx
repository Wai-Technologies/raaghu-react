import type { Meta, StoryObj } from '@storybook/react';
import RdsCompPasswordSetting from "./rds-comp-password-setting";


const meta: Meta = {
  title: "Components/Password Setting",
  component: RdsCompPasswordSetting,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
  },
} satisfies Meta<typeof RdsCompPasswordSetting>;

export default meta;
type Story = StoryObj<typeof RdsCompPasswordSetting>;

export const Default: Story = {
  args: {
  }
} satisfies Story;




