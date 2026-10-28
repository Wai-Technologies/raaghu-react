import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, fn, waitFor } from 'storybook/test';
import { Paper, Typography } from '@mui/material';
import RdsGrid from './rds-grid';

const meta: Meta<typeof RdsGrid> = {
  title: 'Elements/Grid',
  component: RdsGrid,
  parameters: {
        status: { type: 'stable' },
    layout: 'fullscreen',
    controls: {
      include: ['container', 'spacing'],
    },
  },
  tags: ['autodocs', 'stable'],
  argTypes: {
    container: {
      control: { type: 'boolean' },
    },
    spacing: {
      control: { type: 'number' },
    },
    children: {
      control: { disable: true },
      table: { disable: true },
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

export const Default: Story = {
  parameters: { controls: { include: ['container'] } },
  play: async ({ canvasElement }) => {
    const el = canvasElement.firstElementChild;
    expect(el).toBeTruthy();
  },
  args: {
    children: (
      <div style={{ flex: 1, padding: "15px" }}>
        <Paper sx={{ p: 2, textAlign: 'center' }}>
          <Typography>Grid Content</Typography>
        </Paper>
      </div>
    ),
  },
};

export const Container: Story = {
  args: {
    container: true,
    spacing: 2,
    sx: { p: 2 },
    children: (
      <>
        <div style={{ flex: 1 }}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography>Item 1</Typography>
          </Paper>
        </div>
        <div style={{ flex: 1 }}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography>Item 2</Typography>
          </Paper>
        </div>
      </>
    ),
  },
};

/**
 * MUI Grid v7 uses the `size` prop (replacing `xs` / `sm` / `md` / … item props).
 * Pass a number for all breakpoints, or an object for responsive widths.
 */
export const ResponsiveSize: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'MUI Grid v7: set item width with `size` (e.g. `size={6}` or `size={{ xs: 12, md: 6 }}`). Legacy `xs`/`md` props are no longer the primary API.',
      },
    },
  },
  args: {
    container: true,
    spacing: 2,
    sx: { p: 2 },
    children: (
      <>
        <RdsGrid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography>size xs:12 / md:6</Typography>
          </Paper>
        </RdsGrid>
        <RdsGrid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography>size xs:12 / md:6</Typography>
          </Paper>
        </RdsGrid>
      </>
    ),
  },
};
