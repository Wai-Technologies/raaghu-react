import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsCompAiChatBot from './rds-comp-ai-chat-bot';

const meta: Meta<typeof RdsCompAiChatBot> = {
	title: 'Components/AI Chat Bot',
	component: RdsCompAiChatBot,
	parameters: {
		layout: 'padded',
	},
	tags: ['autodocs'],
	argTypes: {
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleMessages: { id: string; text: string; sender: 'user' | 'ai'; }[] = [
	{ id: '1', text: 'Hello AI!', sender: 'user' },
	{ id: '2', text: 'Hi! How can I help you today?', sender: 'ai' },
];

export const Default: Story = {
    args: {
        colorVariant: "#353535",
        placeholderText: "How can AI Pundit help you today?",
        icon_name: "enhancer",
        type: "default",
    }
} satisfies Story;
Default.parameters = { controls: { include: ['placeholderText'] } };
