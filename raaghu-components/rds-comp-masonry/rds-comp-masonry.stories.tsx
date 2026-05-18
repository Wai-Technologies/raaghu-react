import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Box, Paper, Typography, Button, Stack } from '@mui/material';
import { Image as ImageIcon, Favorite as FavoriteIcon, Share as ShareIcon } from '@mui/icons-material';
import RdsCompMasonry from './rds-comp-masonry';

const meta: Meta<typeof RdsCompMasonry> = {
  title: 'Components/Masonry',
  component: RdsCompMasonry,
  tags: ['autodocs'],
  argTypes: {
    columns: {
      control: { type: 'number', min: 1, max: 6 },
      description: 'Number of columns for the masonry layout',
      table: { type: { summary: 'number' }, defaultValue: { summary: '3' } },
    },
    spacing: {
      control: { type: 'number', min: 8, max: 48, step: 8 },
      description: 'Spacing between items (in pixels)',
      table: { type: { summary: 'number' }, defaultValue: { summary: '24' } },
    },
    children: {
      table: { disable: true },
    },
    className: {
      table: { disable: true },
    },
  },
};

export default meta;
type Story = StoryObj<typeof RdsCompMasonry>;

// Sample data for masonry items
const sampleItems = [
  {
    id: 1,
    title: 'Landscape View',
    description: 'Beautiful mountain landscape',
    height: 200,
    color: '#f5f5f5', // light gray
  },
  {
    id: 2,
    title: 'Urban Life',
    description: 'City skyline at sunset',
    height: 300,
    color: '#f5f5f5', // light gray
  },
  {
    id: 3,
    title: 'Nature\'s Wonder',
    description: 'Forest and trees',
    height: 250,
    color: '#f5f5f5', // light gray
  },
  {
    id: 4,
    title: 'Ocean Vibes',
    description: 'Waves and water',
    height: 1020,
    color: '#f5f5f5', // light gray
  },
  {
    id: 5,
    title: 'Sky Dreams',
    description: 'Clouds and sky',
    height: 280,
    color: '#f5f5f5', // light gray
  },
  {
    id: 6,
    title: 'Desert Sand',
    description: 'Sand dunes and patterns',
    height: 240,
    color: '#f5f5f5', // light gray
  },
];

// Helper component for masonry items
const MasonryItem: React.FC<(typeof sampleItems)[0]> = ({ title, description, height, color }) => (
  <Paper
    sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
      p: 2,
      height: 'auto',
      background: color,
      color: '#212121',
    }}
  >
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: height || 150,
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        borderRadius: 1,
        mb: 1,
      }}
    >
      <ImageIcon sx={{ fontSize: 48, opacity: 0.3 }} />
    </Box>
    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#212121' }}>
      {title}
    </Typography>
    <Typography variant="caption" sx={{ opacity: 0.7, color: '#757575' }}>
      {description}
    </Typography>
    <Stack direction="row" spacing={1} sx={{ pt: 1 }}>
      <Button size="small" variant="outlined" sx={{ color: '#757575', borderColor: '#757575' }}>
        <FavoriteIcon sx={{ fontSize: 16 }} />
      </Button>
      <Button size="small" variant="outlined" sx={{ color: '#757575', borderColor: '#757575' }}>
        <ShareIcon sx={{ fontSize: 16 }} />
      </Button>
    </Stack>
  </Paper>
);

// ─────────────────────────────────────────────────────────────────────────────
// Default Story
// ─────────────────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    columns: 3,
    spacing: 16,
    variant: 'compact',
  },
  render: (args) => {
    const itemHeight = args.variant === 'compact' ? 120 : 150;
    return (
      <RdsCompMasonry {...args}>
        {sampleItems.map((item) => (
          <MasonryItem key={item.id} {...item} height={itemHeight} />
        ))}
      </RdsCompMasonry>
    );
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// All Variants Showcase
// ─────────────────────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  render: () => (
    <Stack spacing={4}>
      <div>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Standard Variant
        </Typography>
        <RdsCompMasonry variant="standard" columns={3} spacing={24}>
          {sampleItems.slice(0, 3).map((item) => (
            <MasonryItem key={item.id} {...item} />
          ))}
        </RdsCompMasonry>
      </div>

      <div>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Compact Variant
        </Typography>
        <RdsCompMasonry variant="compact" columns={3} spacing={16}>
          {sampleItems.slice(0, 3).map((item) => (
            <MasonryItem key={item.id} {...item} height={120} />
          ))}
        </RdsCompMasonry>
      </div>

      <div>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Spacious Variant
        </Typography>
        <RdsCompMasonry variant="spacious" columns={2} spacing={32}>
          {sampleItems.slice(0, 2).map((item) => (
            <MasonryItem key={item.id} {...item} />
          ))}
        </RdsCompMasonry>
      </div>
    </Stack>
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// Columns Configuration
// ─────────────────────────────────────────────────────────────────────────────

export const ColumnVariations: Story = {
  render: () => (
    <Stack spacing={4}>
      <div>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          1 Column
        </Typography>
        <RdsCompMasonry columns={1} spacing={24}>
          {sampleItems.slice(0, 3).map((item) => (
            <MasonryItem key={item.id} {...item} />
          ))}
        </RdsCompMasonry>
      </div>

      <div>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          2 Columns
        </Typography>
        <RdsCompMasonry columns={2} spacing={24}>
          {sampleItems.slice(0, 4).map((item) => (
            <MasonryItem key={item.id} {...item} />
          ))}
        </RdsCompMasonry>
      </div>

      <div>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          3 Columns (Default)
        </Typography>
        <RdsCompMasonry columns={3} spacing={24}>
          {sampleItems.map((item) => (
            <MasonryItem key={item.id} {...item} />
          ))}
        </RdsCompMasonry>
      </div>

      <div>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          4 Columns
        </Typography>
        <RdsCompMasonry columns={4} spacing={24}>
          {sampleItems.map((item) => (
            <MasonryItem key={item.id} {...item} />
          ))}
        </RdsCompMasonry>
      </div>
    </Stack>
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// Responsive Columns
// ─────────────────────────────────────────────────────────────────────────────

export const ResponsiveColumns: Story = {
  render: () => (
    <div>
      <Typography variant="body2" sx={{ mb: 2, color: 'gray' }}>
        Resize the window to see responsive columns: xs:1, sm:2, md:3, lg:4
      </Typography>
      <RdsCompMasonry
        columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
        spacing={24}
      >
        {sampleItems.map((item) => (
          <MasonryItem key={item.id} {...item} />
        ))}
      </RdsCompMasonry>
    </div>
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// Spacing Variations
// ─────────────────────────────────────────────────────────────────────────────

export const SpacingVariations: Story = {
  render: () => (
    <Stack spacing={4}>
      <div>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Spacing: 16px
        </Typography>
        <RdsCompMasonry columns={3} spacing={16}>
          {sampleItems.slice(0, 3).map((item) => (
            <MasonryItem key={item.id} {...item} />
          ))}
        </RdsCompMasonry>
      </div>

      <div>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Spacing: 16px
        </Typography>
        <RdsCompMasonry columns={3} spacing={24}>
          {sampleItems.slice(0, 3).map((item) => (
            <MasonryItem key={item.id} {...item} />
          ))}
        </RdsCompMasonry>
      </div>

      <div>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Spacing: 24px
        </Typography>
        <RdsCompMasonry columns={3} spacing={32}>
          {sampleItems.slice(0, 3).map((item) => (
            <MasonryItem key={item.id} {...item} />
          ))}
        </RdsCompMasonry>
      </div>

      <div>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Spacing: 32px
        </Typography>
        <RdsCompMasonry columns={3} spacing={40}>
          {sampleItems.slice(0, 3).map((item) => (
            <MasonryItem key={item.id} {...item} />
          ))}
        </RdsCompMasonry>
      </div>
    </Stack>
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// Real-World Use Cases
// ─────────────────────────────────────────────────────────────────────────────

export const BlogCards: Story = {
  render: () => (
    <div>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        Blog Articles Layout
      </Typography>
      <RdsCompMasonry columns={{ xs: 1, md: 2 }} spacing={24}>
        {sampleItems.map((item) => (
          <Paper
            key={item.id}
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              height: 'auto',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 200,
                backgroundColor: '#f5f5f5',
                borderRadius: 1,
              }}
            >
              <ImageIcon sx={{ fontSize: 48, color: '#757575', opacity: 0.5 }} />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#212121' }}>
              {item.title}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {item.description}
            </Typography>
            <Typography variant="caption" sx={{ color: '#1976d2', fontWeight: 500 }}>
              Read More →
            </Typography>
          </Paper>
        ))}
      </RdsCompMasonry>
    </div>
  ),
};
