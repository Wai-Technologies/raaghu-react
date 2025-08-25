import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ContentCut, ContentCopy, ContentPaste, Delete, KeyboardArrowDown, PersonAdd, Settings, Logout } from '@mui/icons-material';
import RdsMenu from './rds-menu';
import RdsButton from '../rds-button/rds-button';
import RdsTooltip from '../rds-tooltip/rds-tooltip';
import RdsIconButton from '../rds-icon-button/rds-icon-button';
import RdsAvatar from '../rds-avatar/rds-avatar';

const meta: Meta = {
  title: 'Elements/Menu',
  component: RdsMenu,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: { type: 'boolean' },
      description: 'Controls the open state of the menu'
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'success', 'danger', 'info', 'warning', 'inherit'],
      description: 'Sets the color of the menu items',
    },
  },
} satisfies Meta<typeof RdsMenu>;

export default meta;
type Story = StoryObj<typeof RdsMenu>;


// Note: Set open: false for Docs. Enable open in Canvas/Preview for live demo.
export const Default: Story = {
  args: {
    items: [
      { id: 1, label: 'Profile' },
      { id: 2, label: 'My account' },
      { id: 3, label: 'Logout' },
    ],
  },
  render: (args) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    // Inject onClick into each item
    const items = (args.items || []).map(item => ({ ...item, onClick: handleClose }));

    return (
      <>
        <RdsButton text="User" changeLeftIcon="add"
          changeRightIcon="save"
          color="primary"
          layout="text-only"
          shape="rectangle"
          showLeftIcon
          size="medium"
          state="default"
          style="outlined"
          textCase="uppercase" onClick={handleClick} />
        <RdsMenu
          {...{ ...args, items: undefined }}
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          items={items}
        />
      </>
    );
  },
};
Default.parameters = { controls: { include: ['open'] } };

export const WithIcon: Story = {
  args: {
    items: [
      { id: 1, label: 'Profile', icon: <RdsAvatar>M</RdsAvatar> },
      { id: 2, label: 'My account', icon: <RdsAvatar>M</RdsAvatar> },
      { id: 3, divider: true },
      { id: 4, label: 'Add another account', icon: <PersonAdd fontSize="small" /> },
      { id: 5, label: 'Settings', icon: <Settings fontSize="small" /> },
      { id: 6, label: 'Logout', icon: <Logout fontSize="small" /> },
    ],
    size: 'medium',
  },
  render: (args) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const items = (args.items || []).map(item => ({
      ...item,
      onClick: handleClose,
    }));

    return (
      <>
        <RdsTooltip title="Account settings">
          <RdsIconButton
            onClick={handleClick}
            color="primary"
            size="medium"
          >
            <RdsAvatar>
              M
            </RdsAvatar>
          </RdsIconButton>

        </RdsTooltip>
        <RdsMenu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          items={items}
          size={args.size}
        />
      </>
    );
  },
};

export const Dense: Story = {
  args: {
    size: 'small',
    items: [
      { id: 1, label: 'Dense Cut', icon: <ContentCut fontSize="small" /> },
      { id: 2, label: 'Dense Copy', icon: <ContentCopy fontSize="small" /> },
      { id: 3, label: 'Dense Paste', icon: <ContentPaste fontSize="small" /> },
    ],
  },
  render: (args) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const items = (args.items || []).map(item => ({ ...item, onClick: handleClose }));

    return (
      <>
        <RdsButton text="Dense" color="primary" layout="text-only" shape="rectangle" size="small" state="default" style="outlined" textCase="uppercase" onClick={handleClick} />
        <RdsMenu
          {...{ ...args, items: undefined }}
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          size={args.size || 'small'}
          items={items}
        />
      </>
    );
  },
};
// Custom color menu example
export const WithCustomColor: Story = {
  args: {
    size: 'medium',
    color: 'primary',
    items: [
      { id: 1, label: 'Primary', icon: <ContentCopy fontSize="small" /> },
      { id: 2, label: 'Success', icon: <ContentPaste fontSize="small" /> },
      { id: 3, label: 'Danger', icon: <Delete fontSize="small" /> },
    ],
  },
  render: (args) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    // Apply the selected color to all items when menu is opened
    const items = (args.items || []).map(item => ({ ...item, color: args.color, onClick: handleClose }));

    return (
      <>
        <RdsButton text="Custom Color" color="primary" layout="text-only" shape="rectangle" size="medium" state="default" style="outlined" textCase="uppercase" onClick={handleClick} />
        <RdsMenu
          {...{ ...args, items: undefined }}
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          size={args.size || 'medium'}
          items={items}
        />
      </>
    );
  },
};

export const WithDisabled: Story = {
  args: {
    items: [
      { id: 1, label: 'Enabled Item' },
      { id: 2, label: 'Disabled Item', disabled: true },
      { id: 3, label: 'Another Enabled Item' },
    ],
  },
  render: (args) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const items = (args.items || []).map(item => ({ ...item, onClick: handleClose }));

    return (
      <>
        <RdsButton text="With Disabled" color="primary" layout="text-only" shape="rectangle" size="medium" state="default" style="outlined" textCase="uppercase" onClick={handleClick} />
        <RdsMenu
          {...{ ...args, items: undefined }}
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          items={items}
        />
      </>
    );
  },
};

export const CustomizedMenu: Story = {
  args: {
    items: [
      { id: 1, header: 'Header 1' },
      { id: 2, label: 'Item 1', color: 'primary', icon: <ContentCut fontSize="small" /> },
      { id: 3, label: 'Item 2', color: 'success', icon: <ContentCopy fontSize="small" /> },
      { id: 4, divider: true },
      { id: 5, label: 'Item 3', color: 'danger', disabled: true, icon: <Delete fontSize="small" /> },
      { id: 6, label: 'Item 4', color: 'info', icon: <ContentPaste fontSize="small" /> },
      { id: 7, header: 'Header 2' },
      { id: 8, label: 'Item 5', color: 'warning', icon: <ContentCopy fontSize="small" /> },
    ],
    size: 'medium',
  },
  render: (args) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    // Inject onClick into each item
    const items = (args.items || []).map(item => ({
      ...item,
      onClick: handleClose,
    }));

    return (
      <div>
        <RdsButton
          id="demo-customized-button"
          aria-controls={open ? 'demo-customized-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          endIcon={<KeyboardArrowDown />}
          text="Options"
          color="primary"
          layout="text-only"
          shape="rectangle"
          size="medium"
          state="default"
          style="outlined"
          textCase="uppercase"
        />
        <RdsMenu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          items={items}
          size={args.size}
        />
      </div>
    );
  },
};