import { StoryObj, Meta } from "@storybook/react-vite";
import RdsCommentBox from "./rds-comp-comments-box";


const meta: Meta<typeof RdsCommentBox> = {
  title: "Components/Comment Box",
  component: RdsCommentBox,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    state: {
      options: [
        "default",
        "selected",
        "typing",
        "commentPosted",
        "commentHover",
        "commentThread",
      ],
      control: { type: "select" },
      description: "State of the comment box",
      defaultValue: "default",
    },
    threadTitle: {
      control: 'text',
      description: 'Thread title for commentThread state',
      defaultValue: 'Comment',
      if: { arg: 'state', eq: 'commentThread' },
    },
    text: {
      control: 'text',
      description: 'Comment text for commentThread, typing, commentPosted states',
      defaultValue: 'This is the sample text...',
      if: { arg: 'state', eq: 'commentThread' },
    },
    time: {
      control: 'text',
      description: 'Time for commentThread state',
      defaultValue: '1 hour ago',
      if: { arg: 'state', eq: 'commentThread' },
    },
      // Hide hoverText and hoverMeta controls for default, selected, typing, commentPosted states
      hoverText: {
        control: 'text',
        description: 'Hover text for commentHover state',
        defaultValue: 'This is the sample hover text...',
        if: { arg: 'state', eq: 'commentHover' },
      },
    hoverTime: {
      control: 'text',
      description: 'Hover time for commentHover state',
      defaultValue: '1 hour ago',
      if: { arg: 'state', eq: 'commentHover' },
    },
      hoverMeta: {
        control: 'text',
        description: 'Hover meta for commentHover state',
        defaultValue: '10 Replies . 2 Images . 1 GIF',
        if: { arg: 'state', eq: 'commentHover' },
      },
    meta: {
      control: 'text',
      description: 'Meta info for commentThread state',
      defaultValue: '10 Replies . 2 Images . 1 GIF',
      if: { arg: 'state', eq: 'commentThread' },
    },
    translate: {
      control: 'text',
      description: 'Translate label for commentThread state',
      defaultValue: 'Translate',
      if: { arg: 'state', eq: 'commentThread' },
    },
    imgSrc: {
      control: 'text',
      description: 'Image source for commentThread state',
      if: { arg: 'state', eq: 'commentThread' },
    },
    imgProps: {
      control: 'object',
      description: 'Props for the image element in commentThread state',
      if: { arg: 'state', eq: 'commentThread' },
    },
    svgEditProps: {
      control: 'object',
      description: 'Props for the Edit SVG in commentThread state',
      if: { arg: 'state', eq: 'commentThread' },
    },
    svgDeleteProps: {
      control: 'object',
      description: 'Props for the Delete SVG in commentThread state',
      if: { arg: 'state', eq: 'commentThread' },
    }, 
    svgEditPath: {
      control: 'text',
      description: 'SVG path data for Edit icon in commentThread state',
      if: { arg: 'state', eq: 'commentThread' },
    },
    svgDeletePath: {
      control: 'text',
      description: 'SVG path data for Delete icon in commentThread state',
      if: { arg: 'state', eq: 'commentThread' },
    },
    commentHoverName: {
      control: 'text',
      description: 'Name to display in commentHover state',
      defaultValue: 'Renne Doe',
      if: { arg: 'state', eq: 'commentHover' },
    },
    commentThreadName: {
      control: 'text',
      description: 'Name to display in commentThread state',
      defaultValue: 'Renne Doe',
      if: { arg: 'state', eq: 'commentThread' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof RdsCommentBox>;




export const Default: Story = {
  args: {
    state: "default",
    threadTitle: "Comment",
    text: "This is the sample text...",
    hoverText: "This is the sample hover text...",
    time: "1 hour ago",
    hoverTime: "1 hour ago",
    meta: "10 Replies . 2 Images . 1 GIF",
    hoverMeta: "10 Replies . 2 Images . 1 GIF",
    translate: "Translate",
    imgSrc: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?q=80&w=400&auto=format&fit=crop",
    imgProps: { alt: "Custom preview", style: { borderRadius: '8px', width: '200px', height: '140px' } },
    svgEditProps: { style: { fill: '#4caf50' } },
    svgDeleteProps: { style: { fill: '#f44336' } },
    svgEditPath: "M3 17.25V21h3.75l11.06-11.06-3.75-3.75L3 17.25zM20.71 7.04a1.003 1.003 0 0 0 0-1.42l-2.34-2.34a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z",
    svgDeletePath: "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z",
    commentHoverName: "Renne Doe",
    commentThreadName: "Renne Doe"
  }
};


