
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsList from './rds-list';
import { Avatar, Switch, ListSubheader, Paper } from '@mui/material';
import RdsCheckbox from '../rds-checkbox/rds-checkbox';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import SendIcon from '@mui/icons-material/Send';
import DraftsIcon from '@mui/icons-material/Drafts';
import InboxIcon from '@mui/icons-material/Inbox';
import StarIcon from '@mui/icons-material/Star';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import StorageIcon from '@mui/icons-material/Storage';
import DatasetIcon from '@mui/icons-material/Dataset';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import CloudIcon from '@mui/icons-material/Cloud';
import CommentIcon from '@mui/icons-material/Comment';
import { expect } from 'storybook/test';


const nestedListItems = [
  { id: 1, primary: 'Sent mail', icon: <SendIcon /> },
  { id: 2, primary: 'Drafts', icon: <DraftsIcon /> },
  {
    id: 3,
    primary: 'Inbox',
    secondary: 'Nested items below',
    icon: <InboxIcon />,
    children: [
      { id: '3-1', primary: 'Starred', icon: <StarIcon /> },
      { id: '3-2', primary: 'Important', icon: <LabelImportantIcon /> },
    ],
  },
];
const meta: Meta<typeof RdsList> = {
  title: 'Elements/List',
  component: RdsList,
  parameters: {
        status: { type: 'stable' },
    layout: 'centered',
  },
  tags: ['autodocs', 'stable'],
  argTypes: {
    dense: {
      control: { type: 'boolean' },
    },
    disablePadding: {
      control: { type: 'boolean' },
    },
    component: {
      control: { disable: true },
      table: { disable: true },
    },
    ref: {
      control: { disable: true },
      table: { disable: true },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;
export const AlignItems: Story = {
  args: {
    withDividers: true,
  className: 'rds-list--align-responsive',
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
  },
  play: async ({ canvas }) => {
    const list = await canvas.findByRole('list');
    await expect(list).toBeInTheDocument();
  },
};
const firebaseOverviewItems = [
  {
    id: 'overview',
    primary: 'Project Overview',
    icon: <HomeIcon className="rds-list__firebase-icon" />
  }
];

const firebaseBuildItems = [
  {
    id: 'auth',
    primary: 'Authentication',
    icon: <ManageAccountsIcon className="rds-list__firebase-icon" />
  },
  {
    id: 'database',
    primary: 'Database',
    icon: <DatasetIcon className="rds-list__firebase-icon" />
  },
  {
    id: 'storage',
    primary: 'Storage',
    icon: <StorageIcon className="rds-list__firebase-icon" />
  },
  {
    id: 'hosting',
    primary: 'Hosting',
    icon: <CloudIcon className="rds-list__firebase-icon" />
  }
];

export const CustomizedList: Story = {
  render: (args) => (
    <Paper className="rds-list-demo__custom-container">
      <div className="rds-list-demo__header">
        <LocalFireDepartmentIcon className="rds-list-demo__header-icon" />
        <span className="rds-list-demo__header-title">Firebase</span>
      </div>
      
      <RdsList variant="firebase" items={firebaseOverviewItems} dense={args.dense} disablePadding={args.disablePadding} />
      
      <div className="rds-list-demo__section-header">Build</div>
      <RdsList variant="firebase" items={firebaseBuildItems} dense={args.dense} disablePadding={args.disablePadding} />
    </Paper>
  )
};
export const Dense: Story = {
  args: {
    dense: true,
    withDividers: true,
    items: [
      { id: 1, primary: 'Home', icon: <HomeIcon /> },
      { id: 2, primary: 'Profile', icon: <PersonIcon /> },
      { id: 3, primary: 'Settings', icon: <SettingsIcon /> },
      { id: 4, primary: 'About', icon: <InfoIcon /> },
    ],
  },
};

export const Folder: Story = {
  args: {
    withDividers: true,
    items: [
      { id: 1, primary: 'Photos', secondary: 'Jan 9, 2014', icon: <HomeIcon /> },
      { id: 2, primary: 'Work', secondary: 'Jan 7, 2014', icon: <SettingsIcon /> },
      { id: 3, primary: 'Vacation', secondary: 'July 20, 2014', icon: <InfoIcon /> },
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
export const Inset: Story = {
  args: {
    withDividers: true,
    className: "rds-list--inset",
    items: [
      { id: 1, primary: 'Chelsea Otakan', icon: <StarIcon /> },
      { id: 2, primary: 'Eric Hoffman' },
    ]
  }
};
const interactiveTextItems = [
  { id: 1, primary: 'Single-line item' },
  { id: 2, primary: 'Single-line item' },
  { id: 3, primary: 'Single-line item' },
];

const interactiveIconItems = [
  { id: 1, primary: 'Single-line item', icon: <HomeIcon /> },
  { id: 2, primary: 'Single-line item', icon: <HomeIcon /> },
  { id: 3, primary: 'Single-line item', icon: <HomeIcon /> },
];

const interactiveAvatarItems = [
  { id: 1, primary: 'Single-line item', avatar: <Avatar>R</Avatar> },
  { id: 2, primary: 'Single-line item', avatar: <Avatar>R</Avatar> },
  { id: 3, primary: 'Single-line item', avatar: <Avatar>R</Avatar> },
];

const interactiveCombinedItems = [
  { id: 1, primary: 'Single-line item', avatar: <Avatar>R</Avatar>, secondaryAction: <CommentIcon /> },
  { id: 2, primary: 'Single-line item', avatar: <Avatar>R</Avatar>, secondaryAction: <CommentIcon /> },
  { id: 3, primary: 'Single-line item', avatar: <Avatar>R</Avatar>, secondaryAction: <CommentIcon /> },
];

export const Interactive: Story = {
  render: (args) => (
  <div className="rds-list-demo__grid rds-list-demo__grid--col-responsive">
     
      <div>
        <div className="rds-list-demo__title">Text only</div>
    <RdsList className="rds-list--align-responsive" withDividers items={interactiveTextItems} dense={args.dense} disablePadding={args.disablePadding} />
      </div>
     
      <div>
        <div className="rds-list-demo__title">Icon with text</div>
    <RdsList className="rds-list--align-responsive" withDividers items={interactiveIconItems} dense={args.dense} disablePadding={args.disablePadding} />
      </div>
     
      <div>
        <div className="rds-list-demo__title">Avatar with text</div>
    <RdsList className="rds-list--align-responsive" withDividers items={interactiveAvatarItems} dense={args.dense} disablePadding={args.disablePadding} />
      </div>
     
      <div>
        <div className="rds-list-demo__title">Avatar with text and icon</div>
    <RdsList className="rds-list--align-responsive" withDividers items={interactiveCombinedItems} dense={args.dense} disablePadding={args.disablePadding} />
      </div>
    </div>
  )
};
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
  render: (args) => {
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
          dense={args.dense}
          disablePadding={args.disablePadding}
        />
      </div>
    );
  }
};
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
    ]
  }
};

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
  render: (args) => (
    <div className="rds-list-demo__container rds-list-demo__container--sticky">
      {subheaderSections.map((section) => (
        <RdsList
          key={section.title}
          withDividers
          className="rds-list--with-subheader"
          subheader={<ListSubheader className="rds-list__subheader">{section.title}</ListSubheader>}
          items={section.items}
          dense={args.dense}
          disablePadding={args.disablePadding}
        />
      ))}
    </div>
  )
};

export const WithIcons: Story = {
  args: {
    withDividers: true,
    items: [
      { id: 1, primary: 'Home', icon: <HomeIcon /> },
      { id: 2, primary: 'Profile', icon: <PersonIcon /> },
      { id: 3, primary: 'Settings', icon: <SettingsIcon /> },
    ],
  },
};
export const WithSecondaryText: Story = {
  args: {
  withDividers: true,
  className: 'rds-list--align-responsive',
    items: [
      { id: 1, primary: 'Home', secondary: 'Navigate to home page', icon: <HomeIcon /> },
      { id: 2, primary: 'Profile', secondary: 'View and edit your profile', icon: <PersonIcon /> },
      { id: 3, primary: 'Settings', secondary: 'Configure application settings', icon: <SettingsIcon /> },
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
  render: (args) => {
    const [checked, setChecked] = React.useState<(string | number)[]>([1]);
    
    const handleCheckboxChange = (id: string | number, isChecked: boolean) => {
      if (isChecked) {
        setChecked(prev => [...prev, id]);
      } else {
        setChecked(prev => prev.filter(item => item !== id));
      }
    };
    
    const itemsWithCustomCheckbox = checkboxItems.map(item => 
      item.id === 3 ? {
        ...item,
        icon: <RdsCheckbox 
          status="indeterminate"
          checked={checked.includes(3)}
          style="square"
        />
      } : item
    );
    
    return (
      <div className="rds-list-demo__container rds-list--align-responsive">
        <div className="rds-list-demo__title">Different Checkbox States</div>
        <RdsList
          withDividers
          withCheckboxes
          checkedItems={checked}
          onCheckboxChange={handleCheckboxChange}
          className="rds-list--align-responsive"
          items={itemsWithCustomCheckbox}
          dense={args.dense}
          disablePadding={args.disablePadding}
        />
      </div>
    );
  }
};

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

export const Default: Story = { ...AlignItems };

