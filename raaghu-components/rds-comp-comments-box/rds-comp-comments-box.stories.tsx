
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
        svgEditProps: rest.svgEditProps,
        svgDeleteProps: rest.svgDeleteProps,
        svgEditPath: rest.svgEditPath,
        svgDeletePath: rest.svgDeletePath,
        editIcon: rest.editIcon,
        deleteIcon: rest.deleteIcon,
        commentThreadName: rest.commentThreadName,
        score: rest.score,
        avatarInitials: rest.avatarInitials,
        yourLogo: rest.yourLogo,
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
      };
    case 'typing':
      return {
        state,
        typingPlaceholderText: rest.typingPlaceholderText,
        avatarInitials: rest.avatarInitials,
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
        placeholderText: rest.placeholderText,
        attachmentLabels: rest.attachmentLabels,
        mentionInviteLabel: rest.mentionInviteLabel,
        mentionSearchPlaceholder: rest.mentionSearchPlaceholder,
        mentionUsers: rest.mentionUsers,
        noImageText: rest.noImageText,
        avatarInitials: rest.avatarInitials,
      };
  }
}

import type { Meta, StoryObj } from '@storybook/react';
import RdsCommentBox from './rds-comp-comments-box';

const meta: Meta<typeof RdsCommentBox> = {
  title: 'Components/Comment Box',
  component: RdsCommentBox,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '**Comment Box**',
      },
    },
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
    state: {
      options: [
        'default',
        'selected',
        'typing',
        'comment Posted',
        'comment Hover',
        'comment Thread',
      ],
      control: { type: 'select' },
      description: 'State of the comment box',
    },
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
    svgEditProps: { control: 'object', description: 'Props for the Edit SVG in commentThread state' },
    svgDeleteProps: { control: 'object', description: 'Props for the Delete SVG in commentThread state' },
    svgEditPath: { control: 'text', description: 'SVG path data for Edit icon in commentThread state' },
    svgDeletePath: { control: 'text', description: 'SVG path data for Delete icon in commentThread state' },
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
    attachmentLabels: { computer: 'Computer', googleDrive: 'Google Drive', oneDrive: 'One Drive' },
    mentionInviteLabel: 'Invite',
    mentionSearchPlaceholder: 'Search',
    mentionUsers: ['John Doe', 'Harry Cane', 'Romella', 'Jackson', 'Stephen'],
    noImageText: 'No image provided',
    avatarInitials: 'RD',
  },
  parameters: {
    controls: {
      include: [
        'state', 'avatarInitials'
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
      include: ['state', 'avatarInitials', ],
    },
  },
  render: (args) => <RdsCommentBox {...getPropsForState(args)} />,
};

export const Typing: StoryObj<typeof RdsCommentBox> = {
  args: {
    state: 'typing',
    typingPlaceholderText: 'Placeholder...',
    avatarInitials: 'RD',
  },
  parameters: {
    controls: {
      include: ['state', 'typingPlaceholderText', 'avatarInitials'],
    },
  },
  render: (args) => <RdsCommentBox {...getPropsForState(args)} />,
};

export const CommentPosted: StoryObj<typeof RdsCommentBox> = {
  args: {
    state: 'comment Posted',
    text: 'This is the sample text...',
    time: '1 hour ago',
    avatarInitials: 'RD',
  },
  parameters: {
    controls: {
      include: ['state', 'text', 'time', 'avatarInitials'],
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
  },
  parameters: {
    controls: {
      include: ['state', 'hoverText', 'hoverTime', 'hoverMeta', 'commentHoverName', 'avatarInitials'],
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
    // svgEditProps: { style: { fill: '#4caf50' } },
    // svgDeleteProps: { style: { fill: '#f44336' } },
    // svgEditPath: 'M3 17.25V21h3.75l11.06-11.06-3.75-3.75L3 17.25zM20.71 7.04a1.003 1.003 0 0 0 0-1.42l-2.34-2.34a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z',
    // svgDeletePath: 'M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z',
    commentThreadName: 'Renne Doe',
    score: '00',
    avatarInitials: 'RD',
    yourLogo: '/assets/your-logo.png',
    editIcon: null, // JSX removed for Storybook compatibility
    deleteIcon: null, // JSX removed for Storybook compatibility
  },
  parameters: {
    controls: {
      include: [
        'state', 'threadTitle', 'text', 'time', 'meta', 'translate', 'imgSrc', 'imgProps', 'editIcon', 'deleteIcon', 'commentThreadName', 'score', 'avatarInitials', 'yourLogo'
      ],
    },
  },

  render: (args) => <RdsCommentBox {...getPropsForState(args)} />,
};

