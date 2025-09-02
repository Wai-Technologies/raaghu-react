
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsList from './rds-list';
import { Avatar, Checkbox, Switch, ListSubheader, Paper } from '@mui/material';
import {Home, Person, Settings, Info, Send, Drafts, Inbox, Star, LabelImportant,Storage, Dataset, ManageAccounts, LocalFireDepartment, Cloud 
} from '@mui/icons-material';
import CommentIcon from '@mui/icons-material/Comment';

// Common helper functions
const createLogHandler = (msg: string) => () => console.log(msg);
// Shared items for nested list example
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
  parameters: { layout: 'padded' },
  render: (args) => (
    <div className="rds-list-demo__center">
      <div className="rds-list-demo__hscroll">
        <div className="rds-list-demo__hscroll-inner rds-list-demo__hscroll-inner--sm">
          <RdsList {...args} />
        </div>
      </div>
    </div>
  ),
  args: {
    withDividers: true,
    alignItems: "flex-start",
    items: [
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
    ]
  }
};
// Custom themed list (like Firebase example)
// Define item arrays outside the story
const firebaseOverviewItems = [
  {
    id: 'overview',
    primary: 'Project Overview',
    icon: <Home className="rds-list__firebase-icon" />,
    onClick: createLogHandler('Project Overview clicked')
  }
];

const firebaseBuildItems = [
  {
    id: 'auth',
    primary: 'Authentication',
    icon: <ManageAccounts className="rds-list__firebase-icon" />,
    onClick: createLogHandler('Authentication clicked')
  },
  {
    id: 'database',
    primary: 'Database',
    icon: <Dataset className="rds-list__firebase-icon" />,
    onClick: createLogHandler('Database clicked')
  },
  {
    id: 'storage',
    primary: 'Storage',
    icon: <Storage className="rds-list__firebase-icon" />,
    onClick: createLogHandler('Storage clicked')
  },
  {
    id: 'hosting',
    primary: 'Hosting',
    icon: <Cloud className="rds-list__firebase-icon" />,
    onClick: createLogHandler('Hosting clicked')
  }
];

export const CustomizedList: Story = {
  render: () => (
    <Paper className="rds-list-demo__custom-container">
      <div className="rds-list-demo__header">
        <LocalFireDepartment className="rds-list-demo__header-icon" />
        <span className="rds-list-demo__header-title">Firebase</span>
      </div>
      
      {/* Overview section */}
      <RdsList variant="firebase" items={firebaseOverviewItems} />
      
      {/* Build section */}
      <div className="rds-list-demo__section-header">Build</div>
      <RdsList variant="firebase" items={firebaseBuildItems} />
    </Paper>
  )
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

export const Gutterless: Story = {
  args: {
    withDividers: true,
    disableGutters: true,
    items: [
      { id: 1, primary: 'Line item 1', secondaryAction: <CommentIcon /> },
      { id: 2, primary: 'Line item 2', secondaryAction: <CommentIcon /> },
      { id: 3, primary: 'Line item 3', secondaryAction: <CommentIcon /> },
    ]
  }
};
// Inset List Item (simulate with style)
export const Inset: Story = {
  args: {
    withDividers: true,
    className: "rds-list--inset",
    items: [
      { id: 1, primary: 'Chelsea Otakan', icon: <Star /> },
      { id: 2, primary: 'Eric Hoffman' },
    ]
  }
};
// Interactive List (with onClick)
// Define the item arrays outside the story
const interactiveTextItems = [
  { id: 1, primary: 'Single-line item', onClick: createLogHandler('Clicked text 1') },
  { id: 2, primary: 'Single-line item', onClick: createLogHandler('Clicked text 2') },
  { id: 3, primary: 'Single-line item', onClick: createLogHandler('Clicked text 3') },
];

const interactiveIconItems = [
  { id: 1, primary: 'Single-line item', icon: <Home />, onClick: createLogHandler('Clicked icon 1') },
  { id: 2, primary: 'Single-line item', icon: <Home />, onClick: createLogHandler('Clicked icon 2') },
  { id: 3, primary: 'Single-line item', icon: <Home />, onClick: createLogHandler('Clicked icon 3') },
];

const interactiveAvatarItems = [
  { id: 1, primary: 'Single-line item', avatar: <Avatar>R</Avatar>, onClick: createLogHandler('Clicked avatar 1') },
  { id: 2, primary: 'Single-line item', avatar: <Avatar>R</Avatar>, onClick: createLogHandler('Clicked avatar 2') },
  { id: 3, primary: 'Single-line item', avatar: <Avatar>R</Avatar>, onClick: createLogHandler('Clicked avatar 3') },
];

const interactiveCombinedItems = [
  { id: 1, primary: 'Single-line item', avatar: <Avatar>R</Avatar>, secondaryAction: <CommentIcon />, onClick: createLogHandler('Clicked avatar+icon 1') },
  { id: 2, primary: 'Single-line item', avatar: <Avatar>R</Avatar>, secondaryAction: <CommentIcon />, onClick: createLogHandler('Clicked avatar+icon 2') },
  { id: 3, primary: 'Single-line item', avatar: <Avatar>R</Avatar>, secondaryAction: <CommentIcon />, onClick: createLogHandler('Clicked avatar+icon 3') },
];

export const Interactive: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="rds-list-demo__center">
      <div className="rds-list-demo__hscroll">
        <div className="rds-list-demo__hscroll-inner">
          <div className="rds-list-demo__grid">
            {/* Text only */}
            <div>
              <div className="rds-list-demo__title">Text only</div>
              <RdsList withDividers items={interactiveTextItems} />
            </div>
            {/* Icon with text */}
            <div>
              <div className="rds-list-demo__title">Icon with text</div>
              <RdsList withDividers items={interactiveIconItems} />
            </div>
            {/* Avatar with text */}
            <div>
              <div className="rds-list-demo__title">Avatar with text</div>
              <RdsList withDividers items={interactiveAvatarItems} />
            </div>
            {/* Avatar with text and icon (secondary action) */}
            <div>
              <div className="rds-list-demo__title">Avatar with text and icon</div>
              <RdsList withDividers items={interactiveCombinedItems} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};
// Interactive Multiple Selection example with state management
// Define selection items outside
const multiSelectionItems = [
  { 
    id: 1, 
    primary: 'Inbox', 
    secondary: 'Inbox messages'
  },
  { 
    id: 2, 
    primary: 'Starred', 
    secondary: 'Starred messages'
  },
  { 
    id: 3, 
    primary: 'Send email', 
    secondary: 'Send a new message'
  },
  { 
    id: 4, 
    primary: 'Drafts', 
    secondary: 'Saved drafts'
  }
];

export const MultipleSelection: Story = {
  render: () => {
    const [selectedItems, setSelectedItems] = React.useState<number[]>([2]);
    
    const handleCheckboxChange = (id: string | number, isChecked: boolean) => {
      const numId = typeof id === 'string' ? parseInt(id) : id;
      if (isChecked) {
        setSelectedItems(prev => [...prev, numId as number]);
      } else {
        setSelectedItems(prev => prev.filter(item => item !== numId));
      }
    };
    
    return (
      <div className="rds-list-demo__container">
        <div className="rds-list-demo__title">Interactive Multiple Selection</div>
        <RdsList
          withDividers
          withCheckboxes
          checkedItems={selectedItems}
          onCheckboxChange={handleCheckboxChange}
          items={multiSelectionItems}
        />
      </div>
    );
  }
};
// Nested list with expandable items
export const Nested: Story = {
  args: {
    withDividers: true,
    items: nestedListItems
  }
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
// Define section data outside
const subheaderSections = [
  {
    title: "I'm sticky 0",
    items: [
      { id: '0-1', primary: 'Item 0' },
      { id: '0-2', primary: 'Item 1' },
      { id: '0-3', primary: 'Item 2' },
    ]
  },
  {
    title: "I'm sticky 1",
    items: [
      { id: '1-1', primary: 'Item 0' },
      { id: '1-2', primary: 'Item 1' },
    ]
  },
  {
    title: "I'm sticky 2",
    items: [
      { id: '2-1', primary: 'Item 0' },
      { id: '2-2', primary: 'Item 1' },
      { id: '2-3', primary: 'Item 2' },
    ]
  },
  {
    title: "I'm sticky 3",
    items: [
      { id: '3-1', primary: 'Item 0' },
      { id: '3-2', primary: 'Item 1' },
      { id: '3-3', primary: 'Item 2' },
    ]
  },
  {
    title: "I'm sticky 4",
    items: [
      { id: '4-1', primary: 'Item 0' },
      { id: '4-2', primary: 'Item 1' },
    ]
  }
];

export const StickySubheader: Story = {
  render: () => (
    <div className="rds-list-demo__container rds-list-demo__container--sticky">
      {subheaderSections.map((section, index) => (
        <RdsList
          key={`section-${index}`}
          withDividers
          className="rds-list--with-subheader"
          subheader={<ListSubheader className="rds-list__subheader">{section.title}</ListSubheader>}
          items={section.items}
        />
      ))}
    </div>
  )
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
  parameters: { layout: 'padded' },
  render: (args) => (
    <div className="rds-list-demo__center">
      <div className="rds-list-demo__hscroll">
        <div className="rds-list-demo__hscroll-inner rds-list-demo__hscroll-inner--sm">
          <RdsList {...args} />
        </div>
      </div>
    </div>
  ),
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
// List Controls: Checkbox - Shows different checkbox states
// Define checkbox items outside
const checkboxItems = [
  { 
    id: 1, 
    primary: 'Checked checkbox', 
    secondary: 'This item is checked'
  },
  { 
    id: 2, 
    primary: 'Unchecked checkbox', 
    secondary: 'This item is not checked'
  },
  { 
    id: 3, 
    primary: 'Custom checkbox', 
    secondary: 'This item has a custom icon'
  },
  { 
    id: 4, 
    primary: 'Disabled checkbox', 
    secondary: 'This checkbox cannot be interacted with',
    disabled: true
  }
];

export const WithCheckbox: Story = {
  parameters: { layout: 'padded' },
  render: () => {
    const [checked, setChecked] = React.useState<(string | number)[]>([1]);
    
    const handleCheckboxChange = (id: string | number, isChecked: boolean) => {
      if (isChecked) {
        setChecked(prev => [...prev, id]);
      } else {
        setChecked(prev => prev.filter(item => item !== id));
      }
    };
    
    // Create the items array with the dynamic checkbox for item 3
    const itemsWithCustomCheckbox = checkboxItems.map(item => 
      item.id === 3 ? {
        ...item,
        icon: <Checkbox 
          edge="start" 
          indeterminate
          checked={checked.includes(3)}
          tabIndex={-1} 
        />
      } : item
    );
    
    return (
      <div>
        <div className="rds-list-demo__title">Different Checkbox States</div>
        <div className="rds-list-demo__center">
          <div className="rds-list-demo__hscroll">
            <div className="rds-list-demo__hscroll-inner rds-list-demo__hscroll-inner--sm">
              <RdsList
                withDividers
                withCheckboxes
                checkedItems={checked}
                onCheckboxChange={handleCheckboxChange}
                items={itemsWithCustomCheckbox}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
};
// List Controls: Switch
export const WithSwitch: Story = {
  args: {
    withDividers: true,
    items: [
      { id: 1, primary: 'Settings', icon: <Switch edge="end" /> },
      { id: 2, primary: 'Wi-Fi', icon: <Switch edge="end" /> },
      { id: 3, primary: 'Bluetooth', icon: <Switch edge="end" /> },
    ]
  }
};