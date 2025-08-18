import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsAccordion, { RdsAccordionGroup } from './rds-accordion';
import { Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddIcon from '@mui/icons-material/Add';

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
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Accordion size variant',
      defaultValue: 'medium',
    },
    state: {
      control: { type: 'select' },
      options: ['default', 'hover', 'selected'],
      description: 'Accordion state variant',
      defaultValue: 'default',
    },
  ShowLeftIcon: {
      control: { type: 'boolean' },
      description: 'Show expand/collapse icon in accordion header',
      defaultValue: true,
    },
    changeleftIcon: {
      control: 'select',
      options: ['Add', 'ExpandMore', 'ArrowDropDown', 'None'],
      mapping: {
        Add: <AddIcon />,
        ExpandMore: <ExpandMoreIcon />,
        ArrowDropDown: <ArrowDropDownIcon />,
        None: null,
      },
      description: 'Custom left icon for the accordion header',
      defaultValue: null,
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
    size: 'medium',
    state: 'default',
    ShowLeftIcon: true,
  },
  render: ({ size, state, ShowLeftIcon }) => (
    <>
  <RdsAccordion title="Accordion Title 1" size={size} state={state} ShowLeftIcon={ShowLeftIcon}>
      <Typography>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
        malesuada lacus ex, sit amet blandit leo lobortis eget.
      </Typography>
      </RdsAccordion>
  <RdsAccordion title="Accordion Title 2" size={size} state={state} ShowLeftIcon={ShowLeftIcon}>
        <Typography>
          Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
        </Typography>
      </RdsAccordion>
  <RdsAccordion title="Accordion Title 3" size={size} state={state} ShowLeftIcon={ShowLeftIcon}>
        <Typography>
          Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.
        </Typography>
      </RdsAccordion>
    </>
  ),
};

export const Expanded: Story = {
  args: {
    title: 'Expanded Accordion',
    defaultExpanded: true,
  ShowLeftIcon: true,
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
  ShowLeftIcon: true,
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
  ShowLeftIcon: true,
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
  ShowLeftIcon: true,
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
