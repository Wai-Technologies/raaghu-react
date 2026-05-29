import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, fn, waitFor } from '@storybook/test';
import RdsCompAiMessageBox from './rds-comp-ai-message-box';


const meta: Meta = {
  title: "Components/AI ChatBox/Message Box",
  component: RdsCompAiMessageBox,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    avtar: {
      table: { disable: true },
    },
  },
} satisfies Meta<typeof RdsCompAiMessageBox>;

export default meta;
type Story = StoryObj<typeof RdsCompAiMessageBox>;

export const Default: Story = {
  args: {
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    src:"https://th.bing.com/th?id=OIP.xsmM2BbRCUHv5sVWog4YMQHaFW&w=293&h=212&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
    avatar :"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  play: async ({ canvasElement }) => {
    const el = canvasElement.firstElementChild;
    expect(el).toBeTruthy();
  },
} satisfies Story;