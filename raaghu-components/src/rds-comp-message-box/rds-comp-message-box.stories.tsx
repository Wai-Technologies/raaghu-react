import type { Meta, StoryObj } from '@storybook/react';
import RdsMessageBox from './rds-comp-message-box';


const meta: Meta = {
  title: "Components/AI ChatBox/Message Box",
  component: RdsMessageBox,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
  },
} satisfies Meta<typeof RdsMessageBox>;

export default meta;
type Story = StoryObj<typeof RdsMessageBox>;

export const Default: Story = {
  args: {
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    src:"https://th.bing.com/th?id=OIP.xsmM2BbRCUHv5sVWog4YMQHaFW&w=293&h=212&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
    avtar :"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU"
  }
} satisfies Story;



