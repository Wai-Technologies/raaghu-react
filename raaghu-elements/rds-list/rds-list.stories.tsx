
import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsList from './rds-list';
import { Avatar, Checkbox, Switch, ListSubheader } from '@mui/material';
import { Home, Person, Settings, Info, Send, Drafts, Inbox, Star, LabelImportant } from '@mui/icons-material';
import CommentIcon from '@mui/icons-material/Comment';

const meta: Meta<typeof RdsList> = {
  title: 'Elements/List',
  component: RdsList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    dense: {
      control: { type: 'boolean' },
    },
    disablePadding: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;
// Align Items (Avatar at top)
export const AlignItems: Story = {
  render: () => (
    <RdsList
      withDividers
      items={[
        {
          id: 1,
          primary: 'Brunch this weekend?',
          secondary: "Ali Connors — I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
          avatar: <Avatar alt="Remy Sharp" src="https://mui.com/static/images/avatar/1.jpg" />,
        },
        {
          id: 2,
          primary: 'Summer BBQ',
          secondary: "to Scott, Alex, Jennifer — Wish I could come, but I'm out of town this weekend.",
          avatar: <Avatar alt="Travis Howard" src="https://mui.com/static/images/avatar/2.jpg" />,
        },
        {
          id: 3,
          primary: 'Oui Oui',
          secondary: "Sandra Adams — Do you have Paris recommendations? Have you ever been?",
          avatar: <Avatar alt="Cindy Baker" src="https://mui.com/static/images/avatar/3.jpg" />,
        },
      ]}
      alignItems="flex-start"
    />
  ),
};
export const Dense: Story = {
  args: {
    dense: true,
    withDividers: true,
    items: [
      { id: 1, primary: 'Home', icon: <Home /> },
      { id: 2, primary: 'Profile', icon: <Person /> },
      { id: 3, primary: 'Settings', icon: <Settings /> },
      { id: 4, primary: 'About', icon: <Info /> },
    ],
  },
};

// Folder List
export const Folder: Story = {
  args: {
    withDividers: true,
    items: [
      { id: 1, primary: 'Photos', secondary: 'Jan 9, 2014', icon: <Home /> },
      { id: 2, primary: 'Work', secondary: 'Jan 7, 2014', icon: <Settings /> },
      { id: 3, primary: 'Vacation', secondary: 'July 20, 2014', icon: <Info /> },
    ],
  },
};

export const Gutterless: Story = {
  render: () => (
    <RdsList
      withDividers
      items={[
        { id: 1, primary: 'Line item 1', secondaryAction: <CommentIcon /> },
        { id: 2, primary: 'Line item 2', secondaryAction: <CommentIcon /> },
        { id: 3, primary: 'Line item 3', secondaryAction: <CommentIcon /> },
      ]}
      disableGutters
    />
  ),
};
// Inset List Item (simulate with style)
export const Inset: Story = {
  render: () => (
    <RdsList
      withDividers
      className="rds-list--inset"
      items={[
        { id: 1, primary: 'Chelsea Otakan', icon: <Star /> },
        { id: 2, primary: 'Eric Hoffman' },
      ]}
    />
  ),
};

// Interactive List (with onClick)
// export const Interactive: Story = {
//   render: () => {
//     const handleClick = (msg: string) => () => alert(msg);
//     return (
//       <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
//         {/* Text only */}
//         <div>
//           <h4 style={{ margin: '8px 0' }}>Text only</h4>
//           <RdsList
//             withDividers
//             items={[
//               { id: 1, primary: 'Single-line item', onClick: handleClick('Clicked text 1') },
//               { id: 2, primary: 'Single-line item', onClick: handleClick('Clicked text 2') },
//               { id: 3, primary: 'Single-line item', onClick: handleClick('Clicked text 3') },
//             ]}
//           />
//         </div>
//         {/* Icon with text */}
//         <div>
//           <h4 style={{ margin: '8px 0' }}>Icon with text</h4>
//           <RdsList
//             withDividers
//             items={[
//               { id: 1, primary: 'Single-line item', icon: <Home />, onClick: handleClick('Clicked icon 1') },
//               { id: 2, primary: 'Single-line item', icon: <Home />, onClick: handleClick('Clicked icon 2') },
//               { id: 3, primary: 'Single-line item', icon: <Home />, onClick: handleClick('Clicked icon 3') },
//             ]}
//           />
//         </div>
//         {/* Avatar with text */}
//         <div>
//           <h4 style={{ margin: '8px 0' }}>Avatar with text</h4>
//           <RdsList
//             withDividers
//             items={[
//               { id: 1, primary: 'Single-line item', avatar: <Avatar>R</Avatar>, onClick: handleClick('Clicked avatar 1') },
//               { id: 2, primary: 'Single-line item', avatar: <Avatar>R</Avatar>, onClick: handleClick('Clicked avatar 2') },
//               { id: 3, primary: 'Single-line item', avatar: <Avatar>R</Avatar>, onClick: handleClick('Clicked avatar 3') },
//             ]}
//           />
//         </div>
//         {/* Avatar with text and icon (secondary action) */}
//         <div>
//           <h4 style={{ margin: '8px 0' }}>Avatar with text and icon</h4>
//           <RdsList
//             withDividers
//             items={[
//               { id: 1, primary: 'Single-line item', avatar: <Avatar>R</Avatar>, secondaryAction: <CommentIcon />, onClick: handleClick('Clicked avatar+icon 1') },
//               { id: 2, primary: 'Single-line item', avatar: <Avatar>R</Avatar>, secondaryAction: <CommentIcon />, onClick: handleClick('Clicked avatar+icon 2') },
//               { id: 3, primary: 'Single-line item', avatar: <Avatar>R</Avatar>, secondaryAction: <CommentIcon />, onClick: handleClick('Clicked avatar+icon 3') },
//             ]}
//           />
//         </div>
//       </div>
//     );
//   },
// };

// At the top of your file, outside the story definition:
const nestedListItems = [
  { id: 1, primary: 'Sent mail', icon: <Send /> },
  { id: 2, primary: 'Drafts', icon: <Drafts /> },
  {
    id: 3,
    primary: 'Inbox',
    secondary: 'Nested items below',
    icon: <Inbox />,
    children: [
      { id: '3-1', primary: 'Starred', icon: <Star /> },
      { id: '3-2', primary: 'Important', icon: <LabelImportant /> },
    ],
  },
];

// In your story:
export const Nested: Story = {
  render: (args) => (
    <RdsList
      {...args}
      withDividers
      items={nestedListItems}
    />
  ),
};
export const Selected: Story = {
  args: {
    withDividers: true,
    items: [
      { id: 1, primary: 'Inbox', selected: true },
      { id: 2, primary: 'Drafts' },
      { id: 3, primary: 'Trash' },
    ],
  },
};
// Sticky Subheader
export const StickySubheader: Story = {
  render: () => (
    <div className="rds-list-demo__container rds-list-demo__container--sticky">
      {/* First Section */}
      <RdsList
        withDividers
        className="rds-list--with-subheader"
        subheader={<ListSubheader className="rds-list__subheader">I'm sticky 0</ListSubheader>}
        items={[
          { id: '0-1', primary: 'Item 0' },
          { id: '0-2', primary: 'Item 1' },
          { id: '0-3', primary: 'Item 2' },
        ]}
      />
      {/* Second Section */}
      <RdsList
        withDividers
        className="rds-list--with-subheader"
        subheader={<ListSubheader className="rds-list__subheader">I'm sticky 1</ListSubheader>}
        items={[
          { id: '1-1', primary: 'Item 0' },
          { id: '1-2', primary: 'Item 1' },
        ]}
      />
      {/* Third Section */}
      <RdsList
        withDividers
        className="rds-list--with-subheader"
        subheader={<ListSubheader className="rds-list__subheader">I'm sticky 2</ListSubheader>}
        items={[
          { id: '2-1', primary: 'Item 0' },
          { id: '2-2', primary: 'Item 1' },
          { id: '2-3', primary: 'Item 2' },
        ]}
      />
      {/* Fourth Section */}
      <RdsList
        withDividers
        className="rds-list--with-subheader"
        subheader={<ListSubheader className="rds-list__subheader">I'm sticky 3</ListSubheader>}
        items={[
          { id: '3-1', primary: 'Item 0' },
          { id: '3-2', primary: 'Item 1' },
          { id: '3-3', primary: 'Item 2' },
        ]}
      />
      {/* Fifth Section */}
      <RdsList
        withDividers
        className="rds-list--with-subheader"
        subheader={<ListSubheader className="rds-list__subheader">I'm sticky 4</ListSubheader>}
        items={[
          { id: '4-1', primary: 'Item 0' },
          { id: '4-2', primary: 'Item 1' },
        ]}
      />
    </div>
  ),
};

// Gutterless List
export const WithIcons: Story = {
  args: {
    withDividers: true,
    items: [
      { id: 1, primary: 'Home', icon: <Home /> },
      { id: 2, primary: 'Profile', icon: <Person /> },
      { id: 3, primary: 'Settings', icon: <Settings /> },
    ],
  },
};

export const WithSecondaryText: Story = {
  args: {
    withDividers: true,
    items: [
      { id: 1, primary: 'Home', secondary: 'Navigate to home page', icon: <Home /> },
      { id: 2, primary: 'Profile', secondary: 'View and edit your profile', icon: <Person /> },
      { id: 3, primary: 'Settings', secondary: 'Configure application settings', icon: <Settings /> },
    ],
  },
};


export const WithDividers: Story = {
  args: {
    items: [
      { id: 1, primary: 'Item 1', secondary: 'Description 1' },
      { id: 2, primary: 'Item 2', secondary: 'Description 2' },
      { id: 3, primary: 'Item 3', secondary: 'Description 3' },
    ],
    withDividers: true,
  },
};
// List Controls: Checkbox
export const WithCheckbox: Story = {
  render: () => (
    <RdsList
      withDividers
      items={[
        { id: 1, primary: 'Line item 1', icon: <Checkbox edge="start" tabIndex={-1} disableRipple /> },
        { id: 2, primary: 'Line item 2', icon: <Checkbox edge="start" tabIndex={-1} disableRipple /> },
        { id: 3, primary: 'Line item 3', icon: <Checkbox edge="start" tabIndex={-1} disableRipple /> },
        { id: 4, primary: 'Line item 4', icon: <Checkbox edge="start" tabIndex={-1} disableRipple /> },
      ]}
    />
  ),
};

// List Controls: Switch
export const WithSwitch: Story = {
  render: () => (
    <RdsList
      withDividers
      items={[
        { id: 1, primary: 'Settings', icon: <Switch edge="end" /> },
        { id: 2, primary: 'Wi-Fi', icon: <Switch edge="end" /> },
        { id: 3, primary: 'Bluetooth', icon: <Switch edge="end" /> },
      ]}
    />
  ),
};
