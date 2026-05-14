import { StoryObj, Meta } from '@storybook/react-vite';
import { useState } from 'react';
import RdsCompChip, { RdsCompChipProps } from './rds-comp-chip';
import { Delete, Face, Favorite, CheckCircle, Error, Warning, Info, Star, Verified, Close } from '@mui/icons-material';
import { Avatar } from '@mui/material';

const meta: Meta<typeof RdsCompChip> = {
  title: 'Components/Chip',
  component: RdsCompChip,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Chips are compact elements that represent an input, attribute, or action. They can include a leading icon, avatar, or delete icon, and support multiple size and color variants.',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'The content of the component',
    },
    variant: {
      control: 'select',
      options: ['filled', 'outlined'],
      description: 'The variant to use - filled or outlined style',
    },
    size: {
      control: 'select',
      options: ['small', 'medium'],
      description: 'The size of the component - small (24px) or medium (32px)',
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'error', 'warning', 'info', 'success'],
      description: 'The color of the component when selected',
    },
    disabled: {
      control: 'boolean',
      description: 'If true, the component is disabled',
    },
    selected: {
      control: 'boolean',
      description: 'If true, the chip is selected (shows color)',
    },
    onClick: {
      action: 'clicked',
      description: 'Callback fired when the chip is clicked',
    },
    onChange: {
      action: 'changed',
      description: 'Callback fired when the chip selection state changes',
    },
    showIcon: {
      control: 'boolean',
      description: 'Show leading icon (Storybook control)',
    },
    showAvatar: {
      control: 'boolean',
      description: 'Show avatar instead of icon (Storybook control)',
    },
    showDelete: {
      control: 'boolean',
      description: 'Show delete button (Storybook control)',
    },
  } as any,
};

export default meta;
type Story = StoryObj<typeof RdsCompChip>;

// Icon mapping function
const getIcon = (iconName?: string) => {
  const icons: { [key: string]: React.ReactElement } = {
    favorite: <Favorite />,
    star: <Star />,
    verified: <Verified />,
    checkCircle: <CheckCircle />,
    delete: <Delete />,
    face: <Face />,
  };
  return icons[iconName!];
};

// Avatar component
const getAvatar = () => <Avatar sx={{ width: 32, height: 32 }}>JD</Avatar>;

// ─── Default Story ───────────────────────────────────────────────────────
export const Default: Story = {
  render: (args: any) => {
    const [deleted, setDeleted] = useState(false);
    const [selected, setSelected] = useState(args.selected || false);
    
    // Filter out custom Storybook-only controls
    const chipProps = Object.fromEntries(
      Object.entries(args).filter(([key]) => !['showAvatar', 'showDelete', 'showIcon', 'icon'].includes(key))
    );

    if (deleted) {
      return <div style={{ padding: '16px', color: '#666' }}>Chip deleted! ✓</div>;
    }

    return (
      <RdsCompChip
        {...chipProps}
        selected={selected}
        icon={args.showIcon && !args.showAvatar ? <Favorite /> : undefined}
        avatar={args.showAvatar ? getAvatar() : undefined}
        onDelete={args.showDelete ? () => setDeleted(true) : undefined}
        onChange={(value, isSelected) => setSelected(isSelected)}
      />
    );
  },
  args: {
    label: 'Chip Component',
    variant: 'filled',
    size: 'medium',
    color: 'default',
    disabled: false,
    selected: false,
    showIcon: true,
    showAvatar: false,
    showDelete: false,
  } as any,
};




