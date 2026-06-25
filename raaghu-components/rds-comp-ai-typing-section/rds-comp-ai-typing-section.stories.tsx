import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect} from 'storybook/test';
import RdsCompAiTypingSection from './rds-comp-ai-typing-section';

const meta: Meta<typeof RdsCompAiTypingSection> = {
	title: 'Components/AI ChatBox/Typing Section',
	component: RdsCompAiTypingSection,
	parameters: {
		    status: { type: 'stable' },
		layout: 'padded',
	},
	tags: ['autodocs', 'stable'],
	argTypes: {
		iconName: {
			table: { disable: true },
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    play: async ({ canvasElement }) => {
        const el = canvasElement.firstElementChild;
        expect(el).toBeTruthy();
    },
    args: {
        colorVariant: "#353535",
        placeholderText: "How can AI Pundit help you today?",
        iconName: "enhancer",
        type: "default",
    }
} satisfies Story;
Default.parameters = { controls: { include: ['placeholderText'] } };
