import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
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
    className: { control: "text", description: "CSS class applied to the message box container." },
    sx: { control: "object", description: "MUI system styles applied to the message box container." },
    ref: { control: false, description: "React ref to the message box container; assign it in code." },
    name: { control: "text", description: "Display name shown for the sender." },
    avatar: { control: "text", description: "Avatar image URL of the sender." },
    imageSrc: { control: "text", description: "Image shown below the message." },
    avatarAlt: { control: "text", description: "Alt text for the avatar image." },
    imageAlt: { control: "text", description: "Alt text for the attached image." },
    avtar: {
      table: { disable: true },
    },
  },
} satisfies Meta<typeof RdsCompAiMessageBox>;

export default meta;
type Story = StoryObj<typeof RdsCompAiMessageBox>;

export const Default: Story = {
  args: {
    children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imageSrc:"https://th.bing.com/th?id=OIP.xsmM2BbRCUHv5sVWog4YMQHaFW&w=293&h=212&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
    avatar :"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  play: async ({ canvasElement }) => {
    const el = canvasElement.firstElementChild;
    expect(el).toBeTruthy();
  },
} satisfies Story;