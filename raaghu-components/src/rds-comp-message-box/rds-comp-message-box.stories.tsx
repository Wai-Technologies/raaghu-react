import type { Meta, StoryObj } from '@storybook/react';
import RdsMessageBox from './rds-comp-message-box';


const meta: Meta = {
  title: "Components/AI ChatBox/Message Box",
  component: RdsMessageBox,
  parameters: {
    layout: 'padded',
    docs:{
      description: {
  component: `The **Message Box** component is designed to display individual chat messages in the AI ChatBot interface. It supports both text and image-based messages, enabling rich media conversations. The \`message\` prop renders the content of the message, while the optional \`src\` prop displays an image when \`isImage\` is set to \`true\`. The \`avtar\` prop allows customization of the sender's avatar image, giving users a visual cue of the message source (AI or user). This component ensures consistent styling and responsive alignment within the chat interface, making it ideal for conversational UIs.`
}

    }
  },
  tags: ['autodocs'],
  argTypes: {
  },
} satisfies Meta<typeof RdsMessageBox>;

export default meta;
type Story = StoryObj<typeof RdsMessageBox>;

export const Standard: Story = {
  args: {
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    src:"https://th.bing.com/th?id=OIP.xsmM2BbRCUHv5sVWog4YMQHaFW&w=293&h=212&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
    avtar :"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU"
  }
} satisfies Story;



