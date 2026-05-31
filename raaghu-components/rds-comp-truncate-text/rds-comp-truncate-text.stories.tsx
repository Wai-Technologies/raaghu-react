import { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from '@storybook/test';
import RdsCompTruncatedText, { TruncateTextState } from './rds-comp-truncate-text';

const meta: Meta = {
  title: 'Components/Truncated Text',
  component: RdsCompTruncatedText,
  parameters: {
    layout: 'padded',
    docs: {
      source: {
        transform: (code: string) => {
          code = code.replace(/state="([^"]+)"/g, 'state={TruncateTextState.$1}');
          code = code.replace(/state:\s*"([^"]+)"/g, 'state: TruncateTextState.$1');
          return code;
        }
      }
    }
  },
  tags: ['autodocs', 'stable'],
  argTypes: {
    state: {
      options: Object.values(TruncateTextState),
      control: { type: 'select' },
      description: 'Choose between "default" (full text) or "hover" (truncated text with hover to expand).',
    },
    text: {
      control: 'text',
      description: 'The content of the text that will be truncated or displayed fully based on the component state.',
    },
    maxLength: {
      control: 'number',
      description: 'The maximum number of characters to display before truncating the text.',
    },
  },
} satisfies Meta<typeof RdsCompTruncatedText>;

export default meta;
type Story = StoryObj<typeof RdsCompTruncatedText>;

export const Default: Story = {
  args: {
    state: TruncateTextState.Hover,
    text: 'This is a sample text',
    maxLength: 16,
  },
} satisfies Story;

Default.parameters = {
  controls: { include: ['state', 'text', 'maxLength'] },
};
export const TextTruncated: Story = {
  name: 'Interaction: Text is truncated and visible',
  args: {
    state: TruncateTextState.Hover,
    text: 'This is a long text that gets truncated',
    maxLength: 15,
  },
  play: async ({ canvasElement }) => {
    // Truncated text renders a visible element
    const el = canvasElement.firstElementChild
    await expect(el).not.toBeNull()
    await expect(el).toBeVisible()
    await expect(canvasElement).toBeTruthy()
  }
} satisfies Story;
