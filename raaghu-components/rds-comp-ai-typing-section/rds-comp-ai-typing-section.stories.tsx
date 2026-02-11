import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsCompAiTypingSection from './rds-comp-ai-typing-section';

const meta: Meta<typeof RdsCompAiTypingSection> = {
	title: 'Components/AI ChatBox/Typing Section',
	component: RdsCompAiTypingSection,
	parameters: {
		layout: 'padded',
	},
	tags: ['autodocs'],
	argTypes: {
		icon_name: {
			table: { disable: true },
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        colorVariant: "#353535",
        placeholderText: "How can AI Pundit help you today?",
        icon_name: "enhancer",
        type: "default",
    }
} satisfies Story;
Default.parameters = { controls: { include: ['placeholderText'] } };
