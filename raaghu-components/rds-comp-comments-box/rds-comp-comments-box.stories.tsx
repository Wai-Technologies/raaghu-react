import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsCommentBox from './rds-comp-comments-box';

const meta = {
  title: 'Components/Comment Box',
  component: RdsCommentBox,
  parameters: {
    status: { type: 'stable' },
    layout: 'padded',
    controls: {
      include: ['avatarInitials', 'placeholderText', 'typingPlaceholderText', 'className', 'sx', 'ref'],
    },
  },
  tags: ['autodocs', 'stable'],
  argTypes: {
    className: { control: 'text', description: 'CSS class applied to the comment box root.' },
    sx: { control: 'object', description: 'MUI system styles applied to the comment box root.' },
    ref: { control: false, description: 'React ref to the comment box root; assign it in code.' },
    avatarInitials: { control: 'text', description: 'Initials for the avatar' },
    placeholderText: { control: 'text', description: 'Placeholder text for the comment input' },
    typingPlaceholderText: { control: 'text', description: 'Placeholder shown while entering a comment' },
  },
} satisfies Meta<typeof RdsCommentBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  args: {
    avatarInitials: 'RD',
    placeholderText: 'Add a comment',
  },
};
