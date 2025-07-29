
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
    displayType: {
      control: 'select',
      options: ['Basic', 'Board','Boxify','Cardify','Collage'],
      description: 'Type of layout display style',
    },
    hasShadow: {
      control: 'boolean',
      description: 'Whether the layout has a shadow',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample components for demonstration
const SampleCard = ({ title, color = '#e3f2fd' }: { title: string; color?: string }) => (
  <Paper sx={{ p: 2, backgroundColor: color, minHeight: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Typography variant="h6">{title}</Typography>
  </Paper>
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

export const RowLayout: Story = {
  args: {
    spacing: 2,
    direction: 'row',
    children: (
      <>
        <SampleCard title="Item 1" color="#e8f5e8" />
        <SampleCard title="Item 2" color="#fff3e0" />
        <SampleCard title="Item 3" color="#fce4ec" />
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

export const SpaceBetween: Story = {
  args: {
    spacing: 0,
    direction: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fullWidth: true,
    children: (
      <>
        <SampleCard title="Left" color="#e8f5e8" />
        <SampleCard title="Center" color="#fff3e0" />
        <SampleCard title="Right" color="#fce4ec" />
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
        <Box sx={{ flexBasis: '45%' }}>
          <SampleCard title="Card 1" color="#e3f2fd" />
        </Box>
        <Box sx={{ flexBasis: '45%' }}>
          <SampleCard title="Card 2" color="#e8f5e8" />
        </Box>
        <Box sx={{ flexBasis: '45%' }}>
          <SampleCard title="Card 3" color="#fff3e0" />
        </Box>
        <Box sx={{ flexBasis: '45%' }}>
          <SampleCard title="Card 4" color="#fce4ec" />
        </Box>
      </>
    ),
  },
};

// Board style story using displayType and hasShadow, with conditional rendering
export const Basic: Story = {
  args: {
    displayType: 'Basic',
    hasShadow: false,
    spacing: 2,
    direction: 'column',
    // children: (
    //   <Box className="layout1 layout-shadow" sx={{ minHeight: '200', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch', justifyContent: 'flex-start', bgcolor: 'transparent', p: 1, boxShadow:'0 0 6px 5px #4d525912' }}>
    //     <Box sx={{ p: '1rem', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    //       <Paper
    //         // className="content-with-full-height border-danger"
    //         elevation={3}
    //         sx={{
    //           position: 'relative',
    //           p: 2.5,
    //           border: '1px solid #d3dcea',
    //           borderRadius: 2.5,
    //           boxShadow: '0 0 6px 5px #4d525912',
    //           background: '#fff',
    //           minHeight: 200,
    //           height: '83vh',
    //           width: '100%',
             
    //           mx: 'auto',
    //         }}
    //       >
    //         {/* Blank card for layout showcase */}
    //       </Paper>
    //     </Box>
    //   </Box>
    // ),
  },
};


export const Board: Story ={
 args: {
    displayType: 'Board',
    hasShadow: false,
    spacing: 2,
    direction: 'column',
  }
}
export const Boxify: Story ={
 args: {
    displayType: 'Boxify',
    hasShadow: false,
    spacing: 2,
    direction: 'column',
  }
}

export const Cardify: Story ={
 args: {
    displayType: 'Cardify',
    hasShadow: false,
    spacing: 2,
    direction: 'column',
  }
}
export const Collage: Story ={
 args: {
    displayType: 'Collage',
    hasShadow: false,
    spacing: 2,
    direction: 'column',
  }
}