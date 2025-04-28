import type { Meta, StoryObj } from '@storybook/react';
import RdsCompOtpinput, { FieldStyle } from './rds-comp-otpinput'; 

const meta: Meta = {
  title: "Components/ OTP Input",
  component: RdsCompOtpinput,
  parameters: {
    layout: 'padded',
    docs: {
      source: {
        transform: (code: string) => {
          // Transform FieldStyle enum - remove spaces and transform
          code = code.replace(/"(Default|Square|Circle|Advance)"/g, '{FieldStyle.$1}');
          return code;
        }
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    fieldStyle: {
      options: [
        "Default",
        "Square",
        "Circle",
        "Advance"
      ],
      control: { type: "select" },
    },
  
  },
} satisfies Meta<typeof RdsCompOtpinput>;

export default meta;
type Story = StoryObj<typeof RdsCompOtpinput>;

export const Default: Story = {
  args: {
    fieldStyle: FieldStyle.Default,
    otpSize: 4,
  }
} satisfies Story;

export const Square: Story = {
  args: {
    fieldStyle: FieldStyle.Square,
    otpSize: 4,
  }
} satisfies Story;

export const Circle: Story = {
  args: {
    fieldStyle: FieldStyle.Circle,
    otpSize: 4,
  }
} satisfies Story;
export const Advance: Story = {
  args: {
    fieldStyle: FieldStyle.Advance,
    otpSize: 6,
    iconUrl : 'otpvalidation'
  }
} satisfies Story;
