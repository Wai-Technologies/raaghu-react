import type { Meta, StoryObj } from '@storybook/react';
import RdsCompOtpinput, { FieldStyle } from './rds-comp-otpinput'; 

const meta: Meta = {
  title: "Components/ OTP Input",
  component: RdsCompOtpinput,
  parameters: {
    layout: 'padded',
    docs: {
       description: {
        component: 
            'The **OTP Input** component is a customizable UI element designed to handle one-time password (OTP) input functionality within your application. It supports multiple field styles such as `Default`, `Square`, `Circle`, and `Advance`, and allows customization of OTP size and additional features like icons. This component is ideal for authentication workflows, verification processes, or any interface requiring secure and user-friendly OTP input. Fully customizable, the OTP Input component ensures a seamless user experience while maintaining consistency with your design system and functional requirements.'
    },
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
