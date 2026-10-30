import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
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
		className: { control: "text", description: "CSS class applied to the typing section container." },
		sx: { control: "object", description: "MUI system styles applied to the typing section container." },
		ref: { control: false, description: "React ref to the typing section container; assign it in code." },
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
        placeholderText: "How can Raaghu help you today?",
        iconName: "enhancer",
        type: "default",
        attachmentBadge: "Premium",
        onNewProjectClick: fn(),
        onImportFromFigmaClick: fn(),
        autocompleteOptions: [{ label: "Raaghu", value: 1 }],
    }
} satisfies Story;
Default.parameters = { controls: { include: ['placeholderText', 'className', 'sx', 'ref'] } };
