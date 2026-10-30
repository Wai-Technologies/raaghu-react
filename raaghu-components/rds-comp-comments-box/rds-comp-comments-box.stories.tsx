import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
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
    state: {
      control: 'select',
      options: ['default', 'selected', 'typing', 'comment Posted', 'comment Hover', 'comment Thread'],
      description: 'Fixed visual state. Omit it for the interactive composer.',
    },
    avatarInitials: { control: 'text', description: 'Initials for the avatar' },
    placeholderText: { control: 'text', description: 'Placeholder text for the comment input' },
    typingPlaceholderText: { control: 'text', description: 'Placeholder shown while entering a comment' },
    attachmentLabels: { control: 'object', description: 'Labels for the attachment dropdown' },
    mentionInviteLabel: { control: 'text', description: 'Label for the mention invite button' },
    mentionSearchPlaceholder: { control: 'text', description: 'Placeholder for the mention search' },
    mentionUsers: { control: 'object', description: 'User list for the mention dropdown' },
    noImageText: { control: 'text', description: 'Text shown when no image is provided' },
    score: { control: 'text', description: 'Vote score in the comment thread state' },
    editLabel: { control: 'text', description: 'Label for the Edit action' },
    deleteLabel: { control: 'text', description: 'Label for the Delete action' },
    threadTitle: { control: 'text', description: 'Title of the comment thread' },
    text: { control: 'text', description: 'Comment text in the comment thread state' },
    time: { control: 'text', description: 'Timestamp in the comment thread state' },
    hoverText: { control: 'text', description: 'Comment text in the comment hover state' },
    hoverTime: { control: 'text', description: 'Timestamp in the comment hover state' },
    hoverMeta: { control: 'text', description: 'Reply metadata in the comment hover state' },
    meta: { control: 'text', description: 'Reply metadata in the comment thread state' },
    translate: { control: 'text', description: 'Translate link label in the comment thread state' },
    imgSrc: { control: 'text', description: 'Preview image in the comment thread state' },
    imgProps: { control: 'object', description: 'Props for the preview image' },
    editIcon: { control: false, description: 'Custom icon for the Edit action' },
    deleteIcon: { control: false, description: 'Custom icon for the Delete action' },
    commentHoverName: { control: 'text', description: 'Author name in the comment hover state' },
    commentThreadName: { control: 'text', description: 'Author name in the comment thread state' },
    yourLogo: { control: 'text', description: 'Avatar image for the reply box in the comment thread state' },
  },
} satisfies Meta<typeof RdsCommentBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    avatarInitials: 'RD',
    placeholderText: 'Add a comment',
  },
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelector('.rds-comments-box--composer')).toBeTruthy();
  },
};

export const Selected: Story = {
  args: { state: 'selected', avatarInitials: 'RD' },
  parameters: { controls: { include: ['avatarInitials', 'placeholderText'] } },
};

export const Typing: Story = {
  args: {
    state: 'typing',
    typingPlaceholderText: 'Placeholder',
    avatarInitials: 'RD',
    mentionUsers: ['John Doe', 'Harry Cane', 'Romella', 'Jackson', 'Stephen'],
    attachmentLabels: { computer: 'Computer', googleDrive: 'Google Drive', oneDrive: 'One Drive' },
  },
  parameters: { controls: { include: ['typingPlaceholderText', 'avatarInitials'] } },
};

export const CommentPosted: Story = {
  args: { state: 'comment Posted', avatarInitials: 'RD' },
  parameters: { controls: { include: ['avatarInitials'] } },
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelector('.rds-comments-box--posted')).toBeTruthy();
    await expect(canvasElement.querySelector('.rds-comments-box__dot')).toBeTruthy();
  },
};

export const CommentHover: Story = {
  args: {
    state: 'comment Hover',
    hoverText: 'This is the sample text...',
    hoverTime: '1 hour ago',
    hoverMeta: '10 Replies . 2 Images . 1 GIF',
    commentHoverName: 'Renne Doe',
    avatarInitials: 'RD',
    editLabel: 'Edit',
    deleteLabel: 'Delete',
  },
  parameters: {
    controls: { include: ['hoverText', 'hoverTime', 'hoverMeta', 'commentHoverName', 'avatarInitials', 'editLabel', 'deleteLabel'] },
  },
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelector('.rds-comments-box--hover')).toBeTruthy();
    await expect(canvasElement.textContent).toContain('Renne Doe');
  },
};

export const CommentThread: Story = {
  args: {
    state: 'comment Thread',
    threadTitle: 'Comment',
    text: 'This is the sample text...',
    time: '1 hour ago',
    meta: '10 Replies . 2 Images . 1 GIF',
    translate: 'Translate',
    imgSrc: '/assets/ThreadHero.png',
    imgProps: { alt: 'Custom preview' },
    commentThreadName: 'Renne Doe',
    score: '00',
    avatarInitials: 'RD',
    yourLogo: '/assets/your-logo.png',
    editLabel: 'Edit',
    deleteLabel: 'Delete',
  },
  parameters: {
    controls: {
      include: ['threadTitle', 'text', 'time', 'meta', 'translate', 'imgSrc', 'imgProps', 'commentThreadName', 'score', 'avatarInitials', 'yourLogo', 'editLabel', 'deleteLabel'],
    },
  },
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelector('.rds-comments-box--thread')).toBeTruthy();
    await expect(canvasElement.textContent).toContain('Renne Doe');
  },
};
