import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
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
        status: { type: 'stable' },
    layout: 'padded',
    controls: {
      include: ['size', 'placement'],
    },
  },
  tags: ['autodocs', 'stable'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size of the menu',
      table: {
        defaultValue: { summary: 'small' },
      },
    },
    placement: {
      control: { type: 'select' },
      options: ['bottom-start', 'bottom-end', 'top-start', 'top-end'],
      description: 'Where the menu opens relative to the button',
    },
    open: {
      control: 'boolean',
      description: 'Opens or closes the menu',
    },
    items: {
      control: 'object',
      description: 'Menu items: label, icon, disabled, divider, header, shortcut, color',
    },
  },
} satisfies Meta<typeof RdsMenu>;

export default meta;
type Story = StoryObj<typeof RdsMenu>;

export const Default: Story = {
  args: {
    size: 'small',
    placement: 'bottom-start',
    open: false,
    items: [
      { id: 1, label: 'Profile' },
      { id: 2, label: 'My account' },
      { id: 3, label: 'Logout' },
    ],
  },
  render: function DefaultMenu(args) {
    const [, updateArgs] = useArgs();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = () => {
      updateArgs({ open: true });
    };

    const handleClose = () => {
      updateArgs({ open: false });
    };

    const items = (args.items || []).map(item => ({ ...item, onClick: handleClose }));

    return (
      <>
        <span ref={setAnchorEl} style={{ display: 'inline-block' }}>
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
        </span>
        <RdsMenu
          {...{ ...args, items: undefined }}
          anchorEl={anchorEl}
          open={Boolean(args.open && anchorEl)}
          onClose={handleClose}
          size={args.size ?? 'small'}
          items={items}
        />
      </>
    );
  },
};
Default.parameters = { controls: { include: ['open', 'size', 'placement', 'items'] } };

export const WithIcon: Story = {
  args: {
    items: [
      { id: 1, label: 'Profile', icon: <RdsAvatar size="smallest">M</RdsAvatar> },
      { id: 2, label: 'My account', icon: <RdsAvatar size="smallest">M</RdsAvatar> },
      { id: 3, divider: true },
      { id: 4, label: 'Add another account', icon: <PersonAdd fontSize="small" /> },
      { id: 5, label: 'Settings', icon: <Settings fontSize="small" /> },
      { id: 6, label: 'Logout', icon: <Logout fontSize="small" /> },
    ],
    size: 'small',
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
          size={args.size ?? 'small'}
          placement={args.placement}
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
export const WithCustomColor: Story = {
  args: {
    size: 'small',
    color: 'primary',
    items: [
      { id: 1, label: 'Primary', icon: <ContentCopy fontSize="small" /> },
      { id: 2, label: 'Success', icon: <ContentPaste fontSize="small" /> },
      { id: 3, label: 'Danger', icon: <Delete fontSize="small" /> },
    ],
  },
  argTypes: {
    color: {
      control: { type: 'select' },
      options: ['primary', 'success', 'error', 'warning'],
      description: 'Color theme for all menu items',
    },
  },
  parameters: { controls: { include: ['size', 'placement', 'color'] } },
  render: (args) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const items = (args.items || []).map(item => ({ ...item, color: args.color, onClick: handleClose }));

    return (
      <>
        <RdsButton text="Custom Color" color="primary" layout="text-only" shape="rectangle" size="medium" state="default" style="outlined" textCase="uppercase" onClick={handleClick} />
        <RdsMenu
          {...{ ...args, items: undefined }}
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          size={args.size ?? 'small'}
          items={items}
        />
      </>
    );
  },
};

export const WithDisabled: Story = {
  parameters: { controls: { include: ['size', 'placement', 'items'] } },
  args: {
    size: 'small',
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
          size={args.size ?? 'small'}
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
      { id: 5, label: 'Item 3', color: 'error', disabled: true, icon: <Delete fontSize="small" /> },
      { id: 6, label: 'Item 4', color: 'info', icon: <ContentPaste fontSize="small" /> },
      { id: 7, header: 'Header 2' },
      { id: 8, label: 'Item 5', color: 'warning', icon: <ContentCopy fontSize="small" /> },
    ],
    size: 'small',
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
          size={args.size ?? 'small'}
          placement={args.placement}
        />
      </div>
    );
  },
};