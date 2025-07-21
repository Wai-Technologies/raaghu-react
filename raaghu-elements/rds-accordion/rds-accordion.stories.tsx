import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsAccordion from './rds-accordion';
import { Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const meta: Meta<typeof RdsAccordion> = {
  title: 'Elements/Accordion',
  component: RdsAccordion,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'The title displayed in the accordion header',
    },
    defaultExpanded: {
      control: 'boolean',
      description: 'Whether the accordion is expanded by default',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the accordion is disabled',
    },
    children: {
      control: false,
      description: 'The content to display inside the accordion',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Accordion Title',
    children: (
      <Typography>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
        malesuada lacus ex, sit amet blandit leo lobortis eget.
      </Typography>
    ),
  },
};

export const Expanded: Story = {
  args: {
    title: 'Expanded Accordion',
    defaultExpanded: true,
    children: (
      <Typography>
        This accordion is expanded by default. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit.
      </Typography>
    ),
  },
};

export const Disabled: Story = {
  args: {
    title: 'Disabled Accordion',
    disabled: true,
    children: (
      <Typography>
        This accordion is disabled and cannot be expanded.
      </Typography>
    ),
  },
};

export const CustomIcon: Story = {
  args: {
    title: 'Custom Icon Accordion',
    icon: <ArrowDropDownIcon />,
    children: (
      <Typography>
        This accordion uses a custom expand icon.
      </Typography>
    ),
  },
};

export const LongContent: Story = {
  args: {
    title: 'Accordion with Long Content',
    children: (
      <div>
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit.
        </Typography>
        <Typography paragraph>
          Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque
          penatibus et magnis dis parturient montes, nascetur ridiculus mus.
        </Typography>
        <Typography>
          Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
          Nulla consequat massa quis enim.
        </Typography>
      </div>
    ),
  },
};
