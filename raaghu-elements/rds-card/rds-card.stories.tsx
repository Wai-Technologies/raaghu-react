import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsCard from './rds-card';
import { Typography, CardContent, CardActions, Button } from '@mui/material';

const meta: Meta<typeof RdsCard> = {
  title: 'Elements/Card',
  component: RdsCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    padding: {
      control: 'text',
      description: 'Padding for the card content',
    },
    elevation: {
      control: 'number',
      description: 'Elevation (shadow) of the card',
    },
    variant: {
      control: 'select',
      options: ['elevation', 'outlined'],
      description: 'Variant of the card',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Card Title
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This is a simple card with some content. Cards contain content and actions about a single subject.
        </Typography>
      </CardContent>
    ),
  },
};

export const WithActions: Story = {
  args: {
    children: (
      <>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Card with Actions
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This card includes action buttons at the bottom.
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
          <Button size="small">Share</Button>
        </CardActions>
      </>
    ),
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: (
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Outlined Card
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This is an outlined card variant.
        </Typography>
      </CardContent>
    ),
  },
};

export const WithCustomPadding: Story = {
  args: {
    padding: '24px',
    children: (
      <Typography>
        This card has custom padding applied.
      </Typography>
    ),
  },
};

export const Elevated: Story = {
  args: {
    elevation: 8,
    children: (
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Elevated Card
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This card has increased elevation (shadow).
        </Typography>
      </CardContent>
    ),
  },
};
