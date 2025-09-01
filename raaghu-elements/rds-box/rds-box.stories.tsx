import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsBox from './rds-box';
import { Button, Typography } from '@mui/material';

const meta: Meta<typeof RdsBox> = {
  title: 'Elements/Box',
  component: RdsBox,
  parameters: {
  layout: 'centered',
  // only show the `children` and `sx` controls in the Controls panel; hide all other auto-generated props
  controls: { include: ['children', 'sx'] },
  },
  tags: ['autodocs'],
  argTypes: {
  // define the controls we want visible in Controls panel
  children: { control: { type: 'text' } },
  sx: { control: { type: 'object' } },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This is a Box component',
    sx: { p: 2, border: '1px dashed grey' },
  },
};

export const WithPadding: Story = {
  args: {
    children: 'Box with padding',
    sx: { p: 4, backgroundColor: 'primary.light', color: 'white' },
  },
};

export const WithMargin: Story = {
  args: {
    children: 'Box with margin',
    sx: { m: 2, p: 2, backgroundColor: 'secondary.light', color: 'white' },
  },
};

export const FlexContainer: Story = {
  args: {
    children: [
      <Button key="1" variant="contained">Button 1</Button>,
      <Button key="2" variant="outlined">Button 2</Button>,
      <Button key="3" variant="text">Button 3</Button>,
    ],
    sx: { 
      display: 'flex', 
      gap: 2, 
      p: 2, 
      border: '1px solid grey',
      justifyContent: 'space-around',
    },
  },
};

export const GridContainer: Story = {
  args: {
    children: (
      <>
        <Typography>Item 1</Typography>
        <Typography>Item 2</Typography>
        <Typography>Item 3</Typography>
        <Typography>Item 4</Typography>
      </>
    ),
    sx: { 
      display: 'grid', 
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: 2, 
      p: 2, 
      border: '1px solid grey',
    },
  },
};

export const CustomComponent: Story = {
  args: {
    component: 'section',
    children: 'This Box renders as a section element',
    sx: { p: 2, backgroundColor: 'info.light', color: 'white' },
  },
};
