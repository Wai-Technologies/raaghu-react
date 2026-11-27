import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsCompAiMessageBox from './rds-comp-ai-message-box';


const meta: Meta = {
  title: "Components/AI ChatBox/Message Box",
  component: RdsCompAiMessageBox,
  parameters: {
        status: { type: 'stable' },
    layout: 'padded',
  },
  tags: ['autodocs', 'stable'],
  argTypes: {
    name: {
      control: 'text',
      description: 'Name shown next to the avatar',
    },
    message: {
      control: 'text',
      description: 'Message text',
    },
    isImage: {
      control: 'boolean',
      description: 'Show the image below the message',
    },
    src: {
      control: 'text',
      description: 'Image URL shown when isImage is true',
    },
    avatar: {
      control: 'text',
      description: 'Avatar image URL',
    },
    avtar: {
      table: { disable: true },
    },
  },
} satisfies Meta<typeof RdsCompAiMessageBox>;

export default meta;
type Story = StoryObj<typeof RdsCompAiMessageBox>;

export const Default: Story = {
  args: {
    name: "Jane Doe",
    isImage: false,
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    src:"/assets/Image1.png",
    avatar :"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
} satisfies Story;