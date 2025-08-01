import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsCompLayout from './rds-comp-layout';
import { Paper, Typography, Box } from '@mui/material';

const meta: Meta<typeof RdsCompLayout> = {
  title: 'Layouts/Layout',
  component: RdsCompLayout,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    spacing: {
      control: { type: 'number', min: 0, max: 10 },
      description: 'Spacing between layout items',
    },
    direction: {
      control: 'select',
      options: ['row', 'column'],
      description: 'Flex direction of the layout',
    },
    wrap: {
      control: 'boolean',
      description: 'Whether items should wrap',
    },
    justifyContent: {
      control: 'select',
      options: ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'],
      description: 'Justify content alignment',
    },
    alignItems: {
      control: 'select',
      options: ['flex-start', 'center', 'flex-end', 'stretch', 'baseline'],
      description: 'Align items alignment',
    },
    fullHeight: {
      control: 'boolean',
      description: 'Whether layout should take full height',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether layout should take full width',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample components for demonstration
const SampleCard = ({ title }: { title: string }) => (
  <div className="rds-comp-layout__item">
    <Paper sx={{ p: 2, minHeight: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Typography variant="h6">{title}</Typography>
    </Paper>
  </div>
);

export const Default: Story = {
  args: {
    spacing: 2,
    direction: 'column',
    children: (
      <>
        <SampleCard title="Item 1" />
        <SampleCard title="Item 2" />
        <SampleCard title="Item 3" />
      </>
    ),
  },
};
export const AsymmetricGrid: Story = {
  args: {
    spacing: 2,
    direction: 'row',
    wrap: true,
    children: (
      <>
        <div className="rds-comp-layout__item" style={{ flex: '2 1 60%' }}>
          <Paper sx={{ p: 2, minHeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h6">Large Card</Typography>
          </Paper>
        </div>
        <div className="rds-comp-layout__item" style={{ flex: '1 1 35%' }}>
          <Paper sx={{ p: 2, minHeight: 290, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
            <Typography variant="h6">Small Card 1</Typography>
          </Paper>
          <Paper sx={{ p: 2, minHeight: 290, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h6">Small Card 2</Typography>
          </Paper>
        </div>
      </>
    ),
  },
}
export const DashboardGrid: Story = {
  args: {
    spacing: 2,
    direction: 'row',
    wrap: true,
    children: (
      <>
        {[...Array(6)].map((_, i) => (
          <div className="rds-comp-layout__item" key={i} style={{ flex: '1 1 30%', minWidth: 220, marginBottom: 16 }}>
            <Paper sx={{ p: 2, minHeight: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="h6">Card {i + 1}</Typography>
            </Paper>
          </div>
        ))}
      </>
    ),
  },
};
export const HeaderContentFooter: Story = {
  args: {
    spacing: 2,
    direction: 'column',
    children: (
      <>
        <div className="rds-comp-layout__item">
          <Paper sx={{ p: 2, minHeight: 60, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h6">Header</Typography>
          </Paper>
        </div>
        <div className="rds-comp-layout__item">
          <Paper sx={{ p: 2, minHeight: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h6">Main Content</Typography>
          </Paper>
        </div>
        <div className="rds-comp-layout__item">
          <Paper sx={{ p: 2, minHeight: 60, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h6">Footer</Typography>
          </Paper>
        </div>
      </>
    ),
  },
};
export const GridLikeLayout: Story = {
  args: {
    spacing: 2,
    direction: 'row',
    wrap: true,
    children: (
      <>
        <div className="rds-comp-layout__item" style={{ flexBasis: '45%' }}>
          <SampleCard title="Card 1" />
        </div>
        <div className="rds-comp-layout__item" style={{ flexBasis: '45%' }}>
          <SampleCard title="Card 2" />
        </div>
        <div className="rds-comp-layout__item" style={{ flexBasis: '45%' }}>
          <SampleCard title="Card 3" />
        </div>
        <div className="rds-comp-layout__item" style={{ flexBasis: '45%' }}>
          <SampleCard title="Card 4" />
        </div>
      </>
    ),
  },
};
export const CenteredLayout: Story = {
  args: {
    spacing: 3,
    direction: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fullHeight: true,
    sx: { minHeight: '400px' },
    children: (
      <>
        <SampleCard title="Centered Item 1" />
        <SampleCard title="Centered Item 2" />
      </>
    ),
  },
};
export const RowLayout: Story = {
  args: {
    spacing: 2,
    direction: 'row',
    children: (
      <>
        <SampleCard title="Item 1" />
        <SampleCard title="Item 2" />
        <SampleCard title="Item 3" />
      </>
    ),
  },
};
export const SpaceBetween: Story = {
  args: {
    spacing: 0,
    direction: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fullWidth: true,
    children: (
      <>
        <SampleCard title="Left" />
        <SampleCard title="Center" />
        <SampleCard title="Right" />
      </>
    ),
  },
};
export const SidebarLayout: Story = {
  args: {
    spacing: 2,
    direction: 'row',
    children: (
      <>
        <div className="rds-comp-layout__item" style={{ flex: '0 0 220px' }}>
          <Paper sx={{ p: 2, minHeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h6">Sidebar</Typography>
          </Paper>
        </div>
        <div className="rds-comp-layout__item" style={{ flex: '1 1 auto' }}>
          <Paper sx={{ p: 2, minHeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h6">Main Content</Typography>
          </Paper>
        </div>
      </>
    ),
  },
};
export const TwoColumnGrid: Story = {
  args: {
    spacing: 2,
    direction: 'row',
    wrap: true,
    children: (
      <>
        <div className="rds-comp-layout__item" style={{ flex: '1 1 48%' }}>
          <Paper sx={{ p: 2, minHeight: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h6">Left Column</Typography>
          </Paper>
        </div>
        <div className="rds-comp-layout__item" style={{ flex: '1 1 48%' }}>
          <Paper sx={{ p: 2, minHeight: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h6">Right Column</Typography>
          </Paper>
        </div>
      </>
    ),
  },
};
export const ThreeColumnGrid: Story = {
  args: {
    spacing: 2,
    direction: 'row',
    wrap: true,
    children: (
      <>
        <div className="rds-comp-layout__item" style={{ flex: '1 1 30%' }}>
          <Paper sx={{ p: 2, minHeight: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h6">Column 1</Typography>
          </Paper>
        </div>
        <div className="rds-comp-layout__item" style={{ flex: '1 1 30%' }}>
          <Paper sx={{ p: 2, minHeight: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h6">Column 2</Typography>
          </Paper>
        </div>
        <div className="rds-comp-layout__item" style={{ flex: '1 1 30%' }}>
          <Paper sx={{ p: 2, minHeight: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h6">Column 3</Typography>
          </Paper>
        </div>
      </>
    ),
  },
};