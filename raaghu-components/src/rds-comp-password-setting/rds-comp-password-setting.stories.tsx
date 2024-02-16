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
    sizeDataWithDescription: [
      { type: "Standard", days: "4-10 buisness days", cost: "$5.00" },
      { type: "Express", days: "2-5 buisness days", cost: "$16.00" },
      { type: "Free", days: "10-12 buisness days", cost: "$0.00" },],
    sizeType: "withDescription",
  }
} satisfies Story;




