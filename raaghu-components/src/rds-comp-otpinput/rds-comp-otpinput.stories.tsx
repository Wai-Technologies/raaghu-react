import type { Meta, StoryObj } from '@storybook/react';
import RdsCompOtpinput from './rds-comp-otpinput'; 

const meta: Meta = {
  title: "Components/ OTP Input",
  component: RdsCompOtpinput,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    fieldStyle: { control: 'select' },
  },
} satisfies Meta<typeof RdsCompOtpinput>;

export default meta;
type Story = StoryObj<typeof RdsCompOtpinput>;

export const Default: Story = {
  args: {
    fieldStyle: 'Default',
    otpSize: 4,
  }
} satisfies Story;

export const Square: Story = {
  args: {
    fieldStyle: 'Square',
    otpSize: 4,
  }
} satisfies Story;

export const Circle: Story = {
  args: {
    fieldStyle: 'Circle',
    otpSize: 4,
  }
} satisfies Story;
export const Advance: Story = {
  args: {
    fieldStyle: 'Advance',
    otpSize: 6,
    iconUrl : 'otpvalidation'
  }
} satisfies Story;
