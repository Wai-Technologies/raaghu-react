
// Utility to filter props based on state
function getPropsForState(args: any) {
  const { state, ...rest } = args;
  switch (state) {
    case 'comment Thread':
      return {
        state,
        threadTitle: rest.threadTitle,
        text: rest.text,
        time: rest.time,
        meta: rest.meta,
        translate: rest.translate,
        imgSrc: rest.imgSrc,
        imgProps: rest.imgProps,
        editIcon: rest.editIcon,
        deleteIcon: rest.deleteIcon,
        commentThreadName: rest.commentThreadName,
        score: rest.score,
        avatarInitials: rest.avatarInitials,
        yourLogo: rest.yourLogo,
        editLabel: rest.editLabel,
        deleteLabel: rest.deleteLabel,
      };
    case 'comment Hover':
      return {
        state,
        hoverText: rest.hoverText,
        hoverTime: rest.hoverTime,
        hoverMeta: rest.hoverMeta,
        commentHoverName: rest.commentHoverName,
        editIcon: rest.editIcon,
        deleteIcon: rest.deleteIcon,
        avatarInitials: rest.avatarInitials,
        editLabel: rest.editLabel,
        deleteLabel: rest.deleteLabel,
      };
    case 'typing':
      return {
        state,
        typingPlaceholderText: rest.typingPlaceholderText,
        avatarInitials: rest.avatarInitials,
        mentionUsers: rest.mentionUsers,
        mentionSearchPlaceholder: rest.mentionSearchPlaceholder,
        mentionInviteLabel: rest.mentionInviteLabel,
      };
    case 'comment Posted':
      return {
        state,
        text: rest.text,
        time: rest.time,
        avatarInitials: rest.avatarInitials,
      };
    case 'selected':
      return {
        state,
        avatarInitials: rest.avatarInitials,
      };
    default:
      return {
        state,
        avatarInitials: rest.avatarInitials,
      };
  }
}

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import RdsCommentBox from './rds-comp-comments-box';

const meta: Meta<typeof RdsCommentBox> = {
  title: 'Components/Comment Box',
  component: RdsCommentBox,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    avatarInitials: { control: 'text', description: 'Initials for avatar' },
    placeholderText: { control: 'text', description: 'Placeholder text for input' },
    typingPlaceholderText: { control: 'text', description: 'Placeholder text for typing input' },
    attachmentLabels: { control: 'object', description: 'Labels for attachment dropdown' },
    mentionInviteLabel: { control: 'text', description: 'Label for mention invite button' },
    mentionSearchPlaceholder: { control: 'text', description: 'Placeholder for mention search' },
    mentionUsers: { control: 'object', description: 'User list for mention dropdown' },
    noImageText: { control: 'text', description: 'Text to show when no image is provided' },
    score: { control: 'text', description: 'Score for commentThread state' },
    editLabel: { control: 'text', description: 'Custom label for Edit action' },
    deleteLabel: { control: 'text', description: 'Custom label for Delete action' },
    threadTitle: { control: 'text', description: 'Thread title for commentThread state' },
    text: { control: 'text', description: 'Comment text for commentThread, typing, commentPosted states' },
    time: { control: 'text', description: 'Time for commentThread state' },
    hoverText: { control: 'text', description: 'Hover text for commentHover state' },
    hoverTime: { control: 'text', description: 'Hover time for commentHover state' },
    hoverMeta: { control: 'text', description: 'Hover meta for commentHover state' },
    meta: { control: 'text', description: 'Meta info for commentThread state' },
    translate: { control: 'text', description: 'Translate label for commentThread state' },
    imgSrc: { control: 'text', description: 'Image source for commentThread state' },
    imgProps: { control: 'object', description: 'Props for the image element in commentThread state' },
    editIcon: { control: 'object', description: 'Custom React node for Edit icon in dropdown' },
    deleteIcon: { control: 'object', description: 'Custom React node for Delete icon in dropdown' },
    commentHoverName: { control: 'text', description: 'Name to display in commentHover state' },
    commentThreadName: { control: 'text', description: 'Name to display in commentThread state' },
    yourLogo: { control: 'text', description: 'Logo for commentThread state' },
  },
};

export default meta;

export const Default: StoryObj<typeof RdsCommentBox> = {
  args: {
    state: 'default',
    placeholderText: 'Placeholder',
    avatarInitials: 'RD',
  },
  parameters: {
    controls: {
      include: [
         'avatarInitials'
      ],
    },
  },
  render: (args) => <RdsCommentBox {...getPropsForState(args)} />,
};

export const Selected: StoryObj<typeof RdsCommentBox> = {
  args: {
    state: 'selected',
    avatarInitials: 'RD',
  },
  parameters: {
    controls: {
      include: [ 'avatarInitials', ],
    },
  },
  render: (args) => <RdsCommentBox {...getPropsForState(args)} />,
};

export const Typing: StoryObj<typeof RdsCommentBox> = {
  args: {
    state: 'typing',
    typingPlaceholderText: 'Placeholder...',
    avatarInitials: 'RD', 
    mentionUsers: ['John Doe', 'Harry Cane', 'Romella', 'Jackson', 'Stephen'],
    attachmentLabels: { computer: 'Computer', googleDrive: 'Google Drive', oneDrive: 'One Drive' },
  },
  parameters: {
    controls: {
      include: ['typingPlaceholderText', 'avatarInitials'],
    },
  },
  render: (args) => <RdsCommentBox {...getPropsForState(args)} />,
};

export const CommentPosted: StoryObj<typeof RdsCommentBox> = {
  args: {
    state: 'comment Posted',
    avatarInitials: 'RD',
  },
  parameters: {
    controls: {
      include: ['text', 'time', 'avatarInitials'],
    },
  },
  render: (args) => <RdsCommentBox {...getPropsForState(args)} />,
};

export const CommentHover: StoryObj<typeof RdsCommentBox> = {
  args: {
    state: 'comment Hover',
    hoverText: 'This is the sample hover text...',
    hoverTime: '1 hour ago',
    hoverMeta: '10 Replies . 2 Images . 1 GIF',
    commentHoverName: 'Renne Doe',
    avatarInitials: 'RD',
    editLabel: 'Edit',
    deleteLabel: 'Delete',
  },
  parameters: {
    controls: {
      include: ['hoverText', 'hoverTime', 'hoverMeta', 'commentHoverName', 'avatarInitials', 'editLabel', 'deleteLabel'],
    },
  },
  render: (args) => <RdsCommentBox {...getPropsForState(args)} />,
};

export const CommentThread: StoryObj<typeof RdsCommentBox> = {
  args: {
    state: 'comment Thread',
    threadTitle: 'Comment',
    text: 'This is the sample text...',
    time: '1 hour ago',
    meta: '10 Replies . 2 Images . 1 GIF',
    translate: 'Translate',
    imgSrc: '/assets/ThreadHero.png',
    imgProps: { alt: 'Custom preview', style: { borderRadius: '8px', width: '200px', height: '140px' } },
    commentThreadName: 'Renne Doe',
    score: '00',
    avatarInitials: 'RD',
    yourLogo: '/assets/your-logo.png',
    editIcon: null,
    deleteIcon: null,
    editLabel: 'Edit',
    deleteLabel: 'Delete',
  },
  parameters: {
    controls: {
      include: [
        'threadTitle', 'text', 'time', 'meta', 'translate', 'imgSrc', 'imgProps', 'editIcon', 'deleteIcon', 'commentThreadName', 'score', 'avatarInitials', 'yourLogo', 'editLabel', 'deleteLabel'
      ],
    },
  },
  render: (args) => <RdsCommentBox {...getPropsForState(args)} />,
};

